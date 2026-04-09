import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type Room = Database['public']['Tables']['rooms']['Row'];

interface LobbyProps {
  room: Room;
  isPlayer1: boolean;
  onHome: () => void;
}

export function Lobby({ room, isPlayer1, onHome }: LobbyProps) {
  const [copied, setCopied] = useState(false);
  const inviteUrl = `${window.location.origin}?join=${room.room_code}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    toast.success('Invite link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card border-border text-center">
        <CardHeader>
          <CardTitle className="font-mono text-2xl text-foreground">
            {isPlayer1 ? 'Waiting for opponent...' : 'Joining game...'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2 font-mono">ROOM CODE</p>
            <div className="text-4xl font-mono font-bold tracking-[0.5em] text-primary neon-text">
              {room.room_code}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse-neon" />
              <span className="font-mono text-sm text-foreground">{room.player1_name}</span>
              <span className="ml-auto text-xs text-muted-foreground font-mono">HOST</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <div className={`w-3 h-3 rounded-full ${room.player2_id ? 'bg-secondary' : 'bg-muted-foreground/30'}`} />
              <span className="font-mono text-sm text-muted-foreground">
                {room.player2_id ? room.player2_name : 'Waiting...'}
              </span>
            </div>
          </div>

          {isPlayer1 && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Share this link with your opponent</p>
              <Button variant="amber" className="w-full" onClick={copyLink}>
                {copied ? '✓ Copied!' : '📋 Copy Invite Link'}
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2 justify-center text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
            <span className="text-xs font-mono">
              {room.game_mode === 'number' ? '🔢' : '🔤'} {room.secret_length}-character {room.game_mode} mode
            </span>
          </div>

          <Button variant="ghost" onClick={onHome} className="w-full text-muted-foreground font-mono">
            🏠 Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
