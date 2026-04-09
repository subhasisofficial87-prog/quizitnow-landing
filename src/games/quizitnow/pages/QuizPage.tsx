import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Brain, Trophy, ChevronRight, CheckCircle, XCircle, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import confetti from 'canvas-confetti';
import { useAuth } from '@/contexts/AuthContext';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  type: string;
}

const QuizPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { fileId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [rawQuestions, setRawQuestions] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('questions').select('*').eq('file_id', fileId).maybeSingle();
      if (data) setRawQuestions(data);
      setIsLoading(false);
    };
    fetch();
  }, [fileId]);

  const quizQuestions = useMemo<QuizQuestion[]>(() => {
    if (!rawQuestions) return [];
    const all: QuizQuestion[] = [];
    const mcqs = (rawQuestions.mcqs as any[]) || [];
    const tf = (rawQuestions.true_false as any[]) || [];
    const fill = (rawQuestions.fill_in_blanks as any[]) || [];

    mcqs.forEach((q: any) => all.push({ question: q.question, options: q.options, answer: q.answer, type: 'MCQ' }));
    tf.forEach((q: any) => all.push({ question: q.question, options: ['True', 'False'], answer: q.answer ? 'True' : 'False', type: 'True/False' }));
    fill.slice(0, 5).forEach((q: any) => all.push({ question: q.question, options: (q.options || []).slice(0, 4), answer: q.answer, type: 'Fill Blank' }));
    return all.sort(() => Math.random() - 0.5);
  }, [rawQuestions]);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<{ question: string; selected: string; correct: string; isCorrect: boolean }[]>([]);

  if (isLoading) {
    return <div className="min-h-screen gradient-sky flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen gradient-sky flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No quiz questions available.</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const q = quizQuestions[current];
  const progress = ((current + (answered ? 1 : 0)) / quizQuestions.length) * 100;

  const handleSelect = (opt: string) => { if (!answered) setSelected(opt); };

  const handleConfirm = () => {
    if (!selected) return;
    const isCorrect = selected === q.answer;
    if (isCorrect) setScore((s) => s + 1);
    setAnswered(true);
    setAnswers((prev) => [...prev, { question: q.question, selected, correct: q.answer, isCorrect }]);
  };

  const handleNext = async () => {
    if (current + 1 >= quizQuestions.length) {
      setIsComplete(true);
      const finalScore = score + (selected === q.answer ? 1 : 0);
      const pct = finalScore / quizQuestions.length;
      if (pct >= 0.7) confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });

      // Save attempt
      if (user && fileId) {
        try {
          const { data: prevAttempts } = await supabase
            .from('attempts')
            .select('attempt_number')
            .eq('file_id', fileId)
            .eq('user_id', user.id)
            .order('attempt_number', { ascending: false })
            .limit(1);
          const attemptNumber = (prevAttempts && prevAttempts.length > 0 ? (prevAttempts[0] as any).attempt_number : 0) + 1;
          await supabase.from('attempts').insert({
            user_id: user.id,
            file_id: fileId,
            score: finalScore,
            total_questions: quizQuestions.length,
            attempt_number: attemptNumber,
          });
        } catch (err) {
          console.error('Failed to save attempt:', err);
        }
      }
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setIsComplete(false); setAnswers([]);
  };

  if (isComplete) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="min-h-screen gradient-sky flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center">
          <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} className="w-24 h-24 rounded-3xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Trophy className="w-12 h-12 text-primary-foreground" />
          </motion.div>
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">
            {pct >= 90 ? '🌟 Outstanding!' : pct >= 70 ? '🎉 Great Job!' : pct >= 50 ? '👍 Good Effort!' : '💪 Keep Trying!'}
          </h2>
          <p className="text-muted-foreground mb-6">You scored</p>
          <div className="text-6xl font-display font-bold text-primary mb-2">{score}/{quizQuestions.length}</div>
          <p className="text-xl font-bold text-muted-foreground mb-8">{pct}%</p>
          <Progress value={pct} className="h-3 rounded-full mb-8" />
          <div className="space-y-2 mb-8 text-left max-h-60 overflow-y-auto">
            {answers.map((a, i) => (
              <div key={i} className={`rounded-xl px-4 py-3 text-sm flex items-start gap-2 ${a.isCorrect ? 'bg-mint-light' : 'bg-pink-light'}`}>
                {a.isCorrect ? <CheckCircle className="w-4 h-4 text-mint mt-0.5 shrink-0" /> : <XCircle className="w-4 h-4 text-pink-dark mt-0.5 shrink-0" />}
                <div>
                  <p className="font-semibold text-foreground">{a.question}</p>
                  {!a.isCorrect && <p className="text-xs text-muted-foreground">Your: {a.selected} | Correct: {a.correct}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 rounded-xl font-bold" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4 mr-1" /> Retry
            </Button>
            <Button className="flex-1 rounded-xl gradient-hero font-bold" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-sky">
      <nav className="glass-card border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => navigate(`/questions/${fileId}`)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-foreground">Quiz Mode</span>
          </div>
          <span className="text-sm font-bold text-muted-foreground">{current + 1}/{quizQuestions.length}</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Progress value={progress} className="h-2 rounded-full mb-8" />
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="glass-card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-primary bg-sky-light px-3 py-1 rounded-full">{q.type}</span>
              <span className="text-sm text-muted-foreground font-semibold">Question {current + 1}</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-6">{q.question}</h2>
            <div className="grid gap-3">
              {q.options.map((opt, j) => {
                let cls = 'bg-muted hover:bg-muted/80 text-foreground border-2 border-transparent';
                if (answered) {
                  if (opt === q.answer) cls = 'bg-mint-light text-mint border-2 border-mint';
                  else if (opt === selected && opt !== q.answer) cls = 'bg-pink-light text-pink-dark border-2 border-pink-dark';
                } else if (opt === selected) {
                  cls = 'bg-primary/10 text-primary border-2 border-primary';
                }
                return (
                  <motion.button key={j} whileTap={{ scale: 0.98 }} onClick={() => handleSelect(opt)} className={`rounded-xl px-5 py-4 text-left font-semibold transition-all ${cls}`}>
                    <span className="mr-3 text-muted-foreground font-bold">{String.fromCharCode(65 + j)}.</span>
                    {opt}
                    {answered && opt === q.answer && <CheckCircle className="w-5 h-5 inline ml-2" />}
                    {answered && opt === selected && opt !== q.answer && <XCircle className="w-5 h-5 inline ml-2" />}
                  </motion.button>
                );
              })}
            </div>
            <div className="mt-6 flex justify-end">
              {!answered ? (
                <Button className="rounded-xl gradient-hero font-bold px-8" onClick={handleConfirm} disabled={!selected}>Confirm</Button>
              ) : (
                <Button className="rounded-xl gradient-hero font-bold px-8" onClick={handleNext}>
                  {current + 1 >= quizQuestions.length ? 'See Results' : 'Next'} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground font-semibold">Score: <span className="text-primary font-bold">{score}</span> / {quizQuestions.length}</p>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
