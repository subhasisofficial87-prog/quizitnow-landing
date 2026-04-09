import { motion } from 'framer-motion';
import { Brain, Upload, Sparkles, Zap, BookOpen, RefreshCw, Moon, Target, GraduationCap, BookMarked, Users, Smartphone, Clock, TrendingUp, ArrowRight, Check, Star, ChevronRight } from 'lucide-react';
import Logo3D from '@/components/Logo3D';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate, Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Logo3D size={36} />
            <span className="text-xl font-display font-bold">Quiz It Now</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>Log In</Button>
            <Button size="sm" className="gradient-hero border-0" onClick={() => navigate('/auth')}>Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-sky opacity-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink/10 rounded-full blur-3xl" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" /> AI-Powered Study Tool
            </span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight max-w-4xl mx-auto">
            Snap your notes.{' '}
            <span className="bg-gradient-to-r from-primary to-pink bg-clip-text text-transparent">
              Turn them into smart questions
            </span>{' '}
            instantly.
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
            Upload PDFs or images and let AI generate quizzes, flashcards, and exam-ready questions in seconds.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button size="lg" className="gradient-hero border-0 text-base px-8 h-13 rounded-xl shadow-lg hover:shadow-xl transition-shadow" onClick={() => navigate('/auth')}>
              🚀 Get Started Free <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-13 rounded-xl" onClick={() => navigate('/auth')}>
              ▶️ Try Demo
            </Button>
          </motion.div>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={4} className="text-sm text-muted-foreground mt-5">
            No credit card required • Free to start
          </motion.p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">⚡ How it works</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mt-3">Three simple steps</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Upload, emoji: '📤', title: 'Upload your notes', desc: 'PDFs, screenshots, or scanned pages — anything works.', color: 'bg-sky-light text-sky-dark' },
              { icon: Brain, emoji: '🧠', title: 'AI reads & understands', desc: 'Our AI analyzes your content like a smart tutor.', color: 'bg-pink-light text-pink-dark' },
              { icon: Sparkles, emoji: '❓', title: 'Get instant questions', desc: 'MCQs, short answers, flashcards, and more — ready to practice.', color: 'bg-mint-light text-mint' },
            ].map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-card h-full">
                  <CardContent className="pt-8 pb-6">
                    <div className="text-4xl mb-4">{step.emoji}</div>
                    <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-4`}>
                      <step.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-display font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 gradient-sky">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">🔥 Features</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mt-3">Everything you need to study smarter</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Target, title: 'Smart Question Generator', desc: 'Instantly create MCQs, fill-in-the-blanks, and exam-style questions from any content.', color: 'text-primary' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Get results in seconds — no manual work, no wasting time.', color: 'text-sunshine' },
              { icon: BookOpen, title: 'Multiple Formats', desc: 'Supports PDFs, notes, and scanned images.', color: 'text-mint' },
              { icon: Sparkles, title: 'Quiz Mode', desc: 'Turn your questions into interactive quizzes and test yourself.', color: 'text-lavender' },
              { icon: RefreshCw, title: 'Regenerate Anytime', desc: "Not satisfied? Generate new questions instantly.", color: 'text-pink' },
              { icon: Moon, title: 'Clean & Modern UI', desc: 'Built for focus, speed, and a smooth experience.', color: 'text-sky-dark' },
            ].map((f, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 bg-card h-full">
                  <CardContent className="p-6">
                    <f.icon className={`w-8 h-8 ${f.color} mb-4`} />
                    <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className="text-sm font-bold text-primary uppercase tracking-wider">🎯 Who it's for</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mt-3 mb-12">Built for learners like you</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: GraduationCap, label: 'Students preparing for exams' },
              { icon: BookMarked, label: 'Self-learners & curious minds' },
              { icon: Users, label: 'Teachers creating test material' },
              { icon: Smartphone, label: 'Anyone who wants to study faster' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
                <Card className="border-0 shadow-md bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                    <p className="font-semibold text-sm">{item.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MindSnap */}
      <section className="py-24 px-4 gradient-sky">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">💡 Why Quiz It Now</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mt-3">Why choose Quiz It Now?</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Clock, text: 'Saves hours of manual effort' },
              { icon: Brain, text: 'Improves retention with active recall' },
              { icon: Target, text: 'Makes studying interactive' },
              { icon: TrendingUp, text: 'Helps you track your progress' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1} className="flex items-center gap-4 bg-card rounded-2xl p-5 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">📊 What users say</span>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { quote: "I turned my entire syllabus into quizzes in minutes!", author: 'Early User' },
              { quote: 'This saved me hours before exams.', author: 'Student' },
            ].map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
                <Card className="border-0 shadow-lg bg-card">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-sunshine text-sunshine" />)}
                    </div>
                    <p className="italic text-foreground mb-4">"{t.quote}"</p>
                    <p className="text-sm font-bold text-muted-foreground">— {t.author}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Ready to study smarter?</h2>
            <p className="text-lg text-muted-foreground mt-4 mb-8">Turn your notes into powerful learning tools in seconds.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-hero border-0 text-base px-8 h-13 rounded-xl" onClick={() => navigate('/auth')}>
                🚀 Get Started Now
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 h-13 rounded-xl" onClick={() => navigate('/auth')}>
                🎯 Try It Free
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo3D size={32} />
            <span className="font-display font-bold">Quiz It Now</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Quiz It Now. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
