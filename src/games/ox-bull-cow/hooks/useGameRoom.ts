import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getPlayerId } from '@/lib/player';
import type { Database } from '@/integrations/supabase/types';

type Room = Database['public']['Tables']['rooms']['Row'];
type Guess = Database['public']['Tables']['guesses']['Row'];

export function useGameRoom(roomCode: string | null) {
  const [room, setRoom] = useState<Room | null>(null);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const playerId = getPlayerId();

  const fetchRoom = useCallback(async () => {
    if (!roomCode) return;
    const { data, error: err } = await supabase
      .from('rooms')
      .select('*')
      .eq('room_code', roomCode)
      .single();
    if (err) {
      setError('Room not found');
      setLoading(false);
      return;
    }
    // Never expose secret to player 2
    if (data.player1_id !== playerId && data.player2_id !== playerId) {
      // This player is player 2 joining
    }
    if (data.player2_id === playerId || data.player1_id === playerId) {
      // Hide secret from player 2
      if (data.player2_id === playerId) {
        data.secret = null;
      }
    }
    setRoom(data);
    setLoading(false);
  }, [roomCode, playerId]);

  const fetchGuesses = useCallback(async () => {
    if (!room?.id) return;
    const { data } = await supabase
      .from('guesses')
      .select('*')
      .eq('room_id', room.id)
      .order('guess_number', { ascending: true });
    if (data) setGuesses(data);
  }, [room?.id]);

  // Subscribe to room changes
  useEffect(() => {
    if (!roomCode) return;
    fetchRoom();

    const channel = supabase
      .channel(`room-${roomCode}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'rooms',
        filter: `room_code=eq.${roomCode}`,
      }, (payload) => {
        const newRoom = payload.new as Room;
        // Hide secret from player 2
        if (newRoom.player2_id === playerId) {
          newRoom.secret = null;
        }
        setRoom(newRoom);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [roomCode, fetchRoom, playerId]);

  // Subscribe to guesses
  useEffect(() => {
    if (!room?.id) return;
    fetchGuesses();

    const channel = supabase
      .channel(`guesses-${room.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'guesses',
        filter: `room_id=eq.${room.id}`,
      }, () => {
        fetchGuesses();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [room?.id, fetchGuesses]);

  const joinRoom = async (playerName: string) => {
    if (!room) return;
    const { error: err } = await supabase
      .from('rooms')
      .update({
        player2_id: playerId,
        player2_name: playerName,
        status: 'setting_secret',
      })
      .eq('id', room.id)
      .is('player2_id', null);
    if (err) setError('Failed to join room');
  };

  const setSecret = async (secret: string) => {
    if (!room) return;
    const { error: err } = await supabase
      .from('rooms')
      .update({ secret, status: 'playing' })
      .eq('id', room.id);
    if (err) setError('Failed to set secret');
  };

  const submitGuess = async (guess: string) => {
    if (!room?.secret) {
      // Need to compute on client for now since we don't have the secret
      // Actually we compute server-side via edge function
    }
    // Use edge function to compute bulls/cows
    const { data, error: err } = await supabase.functions.invoke('submit-guess', {
      body: {
        room_id: room!.id,
        player_id: playerId,
        guess: guess.toLowerCase(),
      },
    });
    if (err) {
      setError('Failed to submit guess');
      return null;
    }
    return data;
  };

  const isPlayer1 = room?.player1_id === playerId;
  const isPlayer2 = room?.player2_id === playerId;

  return {
    room,
    guesses,
    loading,
    error,
    playerId,
    isPlayer1,
    isPlayer2,
    joinRoom,
    setSecret,
    submitGuess,
    setError,
  };
}
