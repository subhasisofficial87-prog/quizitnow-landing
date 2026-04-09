import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, PenTool, MessageSquare, CheckCircle, Shuffle, AlertTriangle, RotateCcw, Download, Play, Loader2 } from 'lucide-react';
import Logo3D from '@/components/Logo3D';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { GeneratedQuestions } from '@/lib/types';

const difficultyConfig = {
  easy: { label: '🟢 Easy', color: 'bg-mint-light text-mint border-0' },
  medium: { label: '🟡 Medium', color: 'bg-sunshine-light text-sunshine border-0' },
  hard: { label: '🔴 Hard', color: 'bg-pink-light text-pink-dark border-0' },
};

const QuestionsPage = () => {
  const navigate = useNavigate();
  const { fileId } = useParams();
  const [questions, setQuestions] = useState<GeneratedQuestions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('file_id', fileId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching questions:', error);
        toast.error('Failed to load questions');
      } else if (data) {
        setQuestions({
          mcqs: (Array.isArray(data.mcqs) ? data.mcqs : []) as any[],
          fillInBlanks: (Array.isArray(data.fill_in_blanks) ? data.fill_in_blanks : []) as any[],
          oneWordAnswers: (Array.isArray(data.one_word_answers) ? data.one_word_answers : []) as any[],
          trueFalse: (Array.isArray(data.true_false) ? data.true_false : []) as any[],
          matchFollowing: (Array.isArray(data.match_following) ? data.match_following : []) as any[],
          assertionReason: (Array.isArray(data.assertion_reason) ? data.assertion_reason : []) as any[],
        });
      }
      setIsLoading(false);
    };
    fetchQuestions();
  }, [fileId]);

  const handleRegenerate = async () => {
    toast.info('Regenerating questions...');
    // Delete existing questions
    await supabase.from('questions').delete().eq('file_id', fileId);

    // Get file's extracted text
    const { data: file } = await supabase.from('files').select('extracted_text, name').eq('id', fileId).single();
    if (!file) return;

    const text = file.extracted_text || `Document: ${file.name}. Generate educational questions about this subject.`;

    await supabase.from('files').update({ status: 'processing' }).eq('id', fileId);

    const { error } = await supabase.functions.invoke('generate-questions', {
      body: { fileId, extractedText: text },
    });

    if (error) {
      toast.error('Failed to regenerate questions');
    } else {
      toast.success('Questions regenerated!');
      // Refetch
      const { data } = await supabase.from('questions').select('*').eq('file_id', fileId).maybeSingle();
      if (data) {
        setQuestions({
          mcqs: (Array.isArray(data.mcqs) ? data.mcqs : []) as any[],
          fillInBlanks: (Array.isArray(data.fill_in_blanks) ? data.fill_in_blanks : []) as any[],
          oneWordAnswers: (Array.isArray(data.one_word_answers) ? data.one_word_answers : []) as any[],
          trueFalse: (Array.isArray(data.true_false) ? data.true_false : []) as any[],
          matchFollowing: (Array.isArray(data.match_following) ? data.match_following : []) as any[],
          assertionReason: (Array.isArray(data.assertion_reason) ? data.assertion_reason : []) as any[],
        });
      }
    }
  };

  const toggleAnswer = (key: string) => {
    setShowAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-sky flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!questions) {
    return (
      <div className="min-h-screen gradient-sky flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No questions found. The file may still be processing.</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-sky">
      <nav className="glass-card border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Logo3D size={40} />
            <h1 className="text-xl font-display font-bold text-foreground">Questions</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl font-bold" onClick={handleRegenerate}>
              <RotateCcw className="w-4 h-4 mr-1" /> Regenerate
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl font-bold">
              <Download className="w-4 h-4 mr-1" /> PDF
            </Button>
            <Button size="sm" className="rounded-xl gradient-hero font-bold" onClick={() => navigate(`/quiz/${fileId}`)}>
              <Play className="w-4 h-4 mr-1" /> Start Quiz
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="mcqs">
          <TabsList className="glass-card rounded-2xl p-1.5 h-auto flex-wrap gap-1 mb-8">
            <TabsTrigger value="mcqs" className="rounded-xl font-bold data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground px-4 py-2">
              <BookOpen className="w-4 h-4 mr-1.5" /> MCQs ({questions.mcqs.length})
            </TabsTrigger>
            <TabsTrigger value="fill" className="rounded-xl font-bold data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground px-4 py-2">
              <PenTool className="w-4 h-4 mr-1.5" /> Fill Blanks ({questions.fillInBlanks.length})
            </TabsTrigger>
            <TabsTrigger value="oneword" className="rounded-xl font-bold data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground px-4 py-2">
              <MessageSquare className="w-4 h-4 mr-1.5" /> One Word ({questions.oneWordAnswers.length})
            </TabsTrigger>
            <TabsTrigger value="tf" className="rounded-xl font-bold data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-1.5" /> True/False ({questions.trueFalse.length})
            </TabsTrigger>
            <TabsTrigger value="match" className="rounded-xl font-bold data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground px-4 py-2">
              <Shuffle className="w-4 h-4 mr-1.5" /> Match ({questions.matchFollowing.length})
            </TabsTrigger>
            <TabsTrigger value="assert" className="rounded-xl font-bold data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground px-4 py-2">
              <AlertTriangle className="w-4 h-4 mr-1.5" /> Assert ({questions.assertionReason.length})
            </TabsTrigger>
          </TabsList>

          {/* MCQs */}
          <TabsContent value="mcqs">
            <div className="grid gap-4">
              {questions.mcqs.map((q, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass-card rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-bold text-foreground flex-1">
                      <span className="text-primary font-display mr-2">Q{i + 1}.</span>{q.question}
                    </h3>
                    {q.difficulty && <Badge className={difficultyConfig[q.difficulty].color + ' rounded-full text-xs font-bold'}>{difficultyConfig[q.difficulty].label}</Badge>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, j) => (
                      <div key={j} className={`rounded-xl px-4 py-3 font-semibold text-sm transition-all ${
                        showAnswers[`mcq-${i}`] && opt === q.answer ? 'bg-mint-light text-mint border-2 border-mint' : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}>
                        <span className="text-muted-foreground mr-2 font-bold">{String.fromCharCode(65 + j)}.</span>
                        {opt}
                        {showAnswers[`mcq-${i}`] && opt === q.answer && <CheckCircle className="w-4 h-4 inline ml-2 text-mint" />}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => toggleAnswer(`mcq-${i}`)} className="mt-3 text-sm font-bold text-primary hover:underline">
                    {showAnswers[`mcq-${i}`] ? 'Hide Answer' : 'Show Answer'}
                  </button>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Fill in Blanks */}
          <TabsContent value="fill">
            <div className="grid gap-4">
              {questions.fillInBlanks.map((q, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass-card rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-bold text-foreground flex-1">
                      <span className="text-primary font-display mr-2">Q{i + 1}.</span>{q.question}
                    </h3>
                    {q.difficulty && <Badge className={difficultyConfig[q.difficulty].color + ' rounded-full text-xs font-bold'}>{difficultyConfig[q.difficulty].label}</Badge>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt, j) => (
                      <span key={j} className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
                        showAnswers[`fill-${i}`] && opt === q.answer ? 'bg-mint-light text-mint border border-mint' : 'bg-muted text-foreground'
                      }`}>{opt}</span>
                    ))}
                  </div>
                  <button onClick={() => toggleAnswer(`fill-${i}`)} className="mt-3 text-sm font-bold text-primary hover:underline">
                    {showAnswers[`fill-${i}`] ? 'Hide Answer' : 'Show Answer'}
                  </button>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* One Word */}
          <TabsContent value="oneword">
            <div className="grid gap-4">
              {questions.oneWordAnswers.map((q, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass-card rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-bold text-foreground flex-1">
                      <span className="text-primary font-display mr-2">Q{i + 1}.</span>{q.question}
                    </h3>
                    {q.difficulty && <Badge className={difficultyConfig[q.difficulty].color + ' rounded-full text-xs font-bold'}>{difficultyConfig[q.difficulty].label}</Badge>}
                  </div>
                  {showAnswers[`ow-${i}`] && (
                    <p className="mt-3 text-mint font-bold bg-mint-light rounded-xl px-4 py-2 inline-block">Answer: {q.answer}</p>
                  )}
                  <div><button onClick={() => toggleAnswer(`ow-${i}`)} className="mt-3 text-sm font-bold text-primary hover:underline">
                    {showAnswers[`ow-${i}`] ? 'Hide Answer' : 'Show Answer'}
                  </button></div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* True/False */}
          <TabsContent value="tf">
            <div className="grid gap-4">
              {questions.trueFalse.map((q, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass-card rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-bold text-foreground flex-1">
                      <span className="text-primary font-display mr-2">Q{i + 1}.</span>{q.question}
                    </h3>
                    {q.difficulty && <Badge className={difficultyConfig[q.difficulty].color + ' rounded-full text-xs font-bold'}>{difficultyConfig[q.difficulty].label}</Badge>}
                  </div>
                  {showAnswers[`tf-${i}`] && (
                    <p className={`mt-3 font-bold rounded-xl px-4 py-2 inline-block ${q.answer ? 'bg-mint-light text-mint' : 'bg-pink-light text-pink-dark'}`}>
                      Answer: {q.answer ? '✅ True' : '❌ False'}
                    </p>
                  )}
                  <div><button onClick={() => toggleAnswer(`tf-${i}`)} className="mt-3 text-sm font-bold text-primary hover:underline">
                    {showAnswers[`tf-${i}`] ? 'Hide' : 'Show Answer'}
                  </button></div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Match */}
          <TabsContent value="match">
            <div className="grid gap-6">
              {questions.matchFollowing.map((q, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-bold text-foreground mb-4">Match Set {i + 1}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      {q.pairs.map((p, j) => (
                        <div key={j} className="bg-sky-light rounded-xl px-4 py-3 font-semibold text-sm text-foreground">{j + 1}. {p.left}</div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {(showAnswers[`match-${i}`] ? q.pairs : [...q.pairs].sort(() => Math.random() - 0.5)).map((p, j) => (
                        <div key={j} className="bg-pink-light rounded-xl px-4 py-3 font-semibold text-sm text-foreground">{String.fromCharCode(65 + j)}. {p.right}</div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => toggleAnswer(`match-${i}`)} className="mt-3 text-sm font-bold text-primary hover:underline">
                    {showAnswers[`match-${i}`] ? 'Hide Answers' : 'Show Correct Matches'}
                  </button>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Assertion & Reason */}
          <TabsContent value="assert">
            <div className="grid gap-4">
              {questions.assertionReason.map((q, i) => {
                const answerLabels: Record<string, string> = {
                  both_correct_reason_explains: 'Both A and R are correct, and R explains A',
                  both_correct_reason_not_explains: 'Both A and R are correct, but R does not explain A',
                  assertion_correct_reason_wrong: 'A is correct but R is incorrect',
                  both_wrong: 'Both A and R are incorrect',
                };
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass-card rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="text-primary font-display font-bold">Q{i + 1}.</span>
                      {q.difficulty && <Badge className={difficultyConfig[q.difficulty].color + ' rounded-full text-xs font-bold'}>{difficultyConfig[q.difficulty].label}</Badge>}
                    </div>
                    <div className="space-y-2 mb-3">
                      <p className="font-bold text-foreground"><span className="text-primary">Assertion (A):</span> {q.assertion}</p>
                      <p className="font-bold text-foreground"><span className="text-pink">Reason (R):</span> {q.reason}</p>
                    </div>
                    {showAnswers[`ar-${i}`] && (
                      <p className="bg-mint-light text-mint font-bold rounded-xl px-4 py-2">{answerLabels[q.answer]}</p>
                    )}
                    <button onClick={() => toggleAnswer(`ar-${i}`)} className="mt-3 text-sm font-bold text-primary hover:underline">
                      {showAnswers[`ar-${i}`] ? 'Hide' : 'Show Answer'}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default QuestionsPage;
