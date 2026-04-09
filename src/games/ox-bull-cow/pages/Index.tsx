import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useGameRoom } from '@/hooks/useGameRoom';
import { getPlayerId, getPlayerName } from '@/lib/player';
import { generateRoomCode } from '@/lib/player';
import { HomeScreen } from '@/components/game/HomeScreen';
import { ModeSelect } from '@/components/game/ModeSelect';
import { Lobby } from '@/components/game/Lobby';
import { SetSecret } from '@/components/game/SetSecret';
import { GameScreen } from '@/components/game/GameScreen';
import { ResultScreen } from '@/components/game/ResultScreen';
import { ComputerGameScreen } from '@/components/game/ComputerGameScreen';
import { toast } from 'sonner';

type Screen = 'home' | 'mode-select' | 'game' | 'computer-game';

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const joinCode = searchParams.get('join');
  const [screen, setScreen] = useState<Screen>(joinCode ? 'home' : 'home');
  const [roomCode, setRoomCode] = useState<string | null>(joinCode);
  const [playerName, setPlayerNameState] = useState(getPlayerName());
  const [computerGameSettings, setComputerGameSettings] = useState<{ mode: 'number' | 'word'; length: number } | null>(null);

  const {
    room,
    guesses,
    loading,
    error,
    isPlayer1,
    isPlayer2,
    joinRoom,
    setSecret,
    submitGuess,
  } = useGameRoom(roomCode);

  // Auto-join when player2 arrives
  useEffect(() => {
    if (room && !room.player2_id && !isPlayer1 && playerName) {
      joinRoom(playerName);
    }
  }, [room, isPlayer1, playerName, joinRoom]);

  const handleCreateGame = (name: string) => {
    setPlayerNameState(name);
    setScreen('mode-select');
  };

  const handleJoinGame = async (name: string, code: string) => {
    setPlayerNameState(name);
    setRoomCode(code);
    setScreen('game');
    // Clear URL param
    setSearchParams({});
  };

  const handleModeSelect = async (mode: 'number' | 'word', length: number, opponent: 'player' | 'computer') => {
    if (opponent === 'computer') {
      setComputerGameSettings({ mode, length });
      setScreen('computer-game');
      return;
    }

    const code = generateRoomCode();
    const playerId = getPlayerId();

    const { error: err } = await supabase.from('rooms').insert({
      room_code: code,
      game_mode: mode,
      secret_length: length,
      player1_id: playerId,
      player1_name: playerName,
      status: 'waiting',
    });

    if (err) {
      toast.error('Failed to create room');
      return;
    }

    setRoomCode(code);
    setScreen('game');
  };

  const handlePlayAgain = () => {
    setRoomCode(null);
    setComputerGameSettings(null);
    setScreen('home');
    setSearchParams({});
  };

  if (screen === 'home') {
    return (
      <HomeScreen
        onCreateGame={handleCreateGame}
        onJoinGame={handleJoinGame}
        initialCode={joinCode || undefined}
      />
    );
  }

  if (screen === 'computer-game' && computerGameSettings) {
    return (
      <ComputerGameScreen
        mode={computerGameSettings.mode}
        length={computerGameSettings.length}
        playerName={playerName}
        onPlayAgain={handlePlayAgain}
        onHome={handlePlayAgain}
      />
    );
  }

  if (screen === 'mode-select') {
    return <ModeSelect onSelect={handleModeSelect} onBack={() => setScreen('home')} />;
  }

  // Game screen - show appropriate sub-screen based on room status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-mono text-muted-foreground">Loading game...</p>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-destructive font-mono">{error || 'Room not found'}</p>
          <button onClick={handlePlayAgain} className="text-primary font-mono underline">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (room.status === 'waiting') {
    return <Lobby room={room} isPlayer1={isPlayer1} onHome={handlePlayAgain} />;
  }

  if (room.status === 'setting_secret') {
    return <SetSecret room={room} onSetSecret={setSecret} isPlayer1={isPlayer1} onHome={handlePlayAgain} />;
  }

  if (room.status === 'finished') {
    return (
      <ResultScreen
        room={room}
        guesses={guesses}
        isPlayer1={isPlayer1}
        isPlayer2={isPlayer2}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  // Playing
  return (
    <GameScreen
      room={room}
      guesses={guesses}
      isPlayer1={isPlayer1}
      isPlayer2={isPlayer2}
      onGuess={submitGuess}
      onHome={handlePlayAgain}
    />
  );
}
