import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { History, Trophy, Clock, Hash } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface Attempt {
  id: string;
  file_id: string;
  score: number;
  total_questions: number;
  attempt_number: number;
  completed_at: string;
  file_name?: string;
}

const AttemptHistory = () => {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttempts = async () => {
      const { data, error } = await supabase
        .from('attempts')
        .select('id, file_id, score, total_questions, attempt_number, completed_at')
        .order('completed_at', { ascending: false });

      if (error) {
        console.error('Error fetching attempts:', error);
        setIsLoading(false);
        return;
      }

      if (data && data.length > 0) {
        const fileIds = [...new Set(data.map((a: any) => a.file_id))];
        const { data: files } = await supabase
          .from('files')
          .select('id, name')
          .in('id', fileIds);

        const fileMap = new Map((files || []).map((f: any) => [f.id, f.name]));
        setAttempts(
          data.map((a: any) => ({
            ...a,
            file_name: fileMap.get(a.file_id) || 'Unknown File',
          }))
        );
      }
      setIsLoading(false);
    };
    fetchAttempts();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });

  const getScoreColor = (score: number, total: number) => {
    const pct = (score / total) * 100;
    if (pct >= 80) return 'bg-mint-light text-mint';
    if (pct >= 50) return 'bg-sunshine/20 text-sunshine-dark';
    return 'bg-pink-light text-pink-dark';
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
      </div>
    );
  }

  if (attempts.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <History className="w-5 h-5 text-primary" /> Attempt History
      </h3>
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-5 py-3 font-bold text-muted-foreground">
                  <Hash className="w-3.5 h-3.5 inline mr-1" />Attempt
                </th>
                <th className="text-left px-5 py-3 font-bold text-muted-foreground">File Name</th>
                <th className="text-left px-5 py-3 font-bold text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 inline mr-1" />Time
                </th>
                <th className="text-left px-5 py-3 font-bold text-muted-foreground">
                  <Trophy className="w-3.5 h-3.5 inline mr-1" />Score
                </th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt, i) => (
                <motion.tr
                  key={attempt.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-5 py-4">
                    <Badge variant="secondary" className="rounded-full font-bold">
                      #{attempt.attempt_number}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 font-semibold text-foreground truncate max-w-[200px]">
                    {attempt.file_name}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {formatDate(attempt.completed_at)}
                  </td>
                  <td className="px-5 py-4">
                    <Badge className={`${getScoreColor(attempt.score, attempt.total_questions)} rounded-full px-3 py-1 border-0 font-bold`}>
                      {attempt.score}/{attempt.total_questions} ({Math.round((attempt.score / attempt.total_questions) * 100)}%)
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttemptHistory;
