import { motion } from 'framer-motion';
import { Sparkles, Target, Users, BookOpen, Globe, Lightbulb, Heart, ArrowLeft } from 'lucide-react';
import Logo3D from '@/components/Logo3D';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Logo3D size={36} />
            <span className="text-xl font-display font-bold">Quiz It Now</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Home</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 gradient-sky relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="text-4xl mb-4 block">🧠</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">About Quiz It Now</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At Quiz It Now, we believe studying shouldn't feel slow, repetitive, or overwhelming. Our mission is simple: <strong className="text-foreground">Make learning faster, smarter, and more interactive using AI.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl font-display font-bold mb-6 text-center">🚀 Our Story</h2>
            <p className="text-muted-foreground text-center mb-8">
              We noticed a common problem — students spend hours reading notes but struggle to actually retain and test their knowledge. So we built Quiz It Now.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {['Questions', 'Quizzes', 'Active learning experiences'].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
                  <Card className="border-0 shadow-md bg-card text-center">
                    <CardContent className="p-5">
                      <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-sm">{item}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6">A tool that turns your notes into all of this — in seconds.</p>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-4 gradient-sky">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl font-display font-bold mb-6">💡 What We Do</h2>
            <p className="text-muted-foreground mb-8">Quiz It Now uses advanced artificial intelligence to:</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, text: 'Understand your study material' },
              { icon: Target, text: 'Break it down into key concepts' },
              { icon: Lightbulb, text: 'Generate meaningful questions' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
                <Card className="border-0 shadow-md bg-card">
                  <CardContent className="p-6 text-center">
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="font-semibold text-sm">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6">So instead of just reading, you <strong className="text-foreground">actively learn</strong>.</p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl font-display font-bold mb-6">🎯 Our Vision</h2>
            <p className="text-muted-foreground mb-8">We want to redefine how people study.</p>
            <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto">
              <Card className="border-0 shadow-md bg-destructive/10">
                <CardContent className="p-6 text-center">
                  <p className="text-lg font-display font-bold text-destructive">❌ From</p>
                  <p className="text-sm text-muted-foreground mt-2">Passive reading</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-mint-light">
                <CardContent className="p-6 text-center">
                  <p className="text-lg font-display font-bold text-mint">✅ To</p>
                  <p className="text-sm text-muted-foreground mt-2">Active, AI-powered learning</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 px-4 gradient-sky">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl font-display font-bold mb-8">🤝 Who We Serve</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Students', 'Lifelong learners', 'Educators', 'Anyone who wants to learn efficiently'].map((who, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
                <Card className="border-0 shadow-md bg-card">
                  <CardContent className="p-5 text-center">
                    <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="font-semibold text-sm">{who}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Next */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl font-display font-bold mb-6">🔮 What's Next</h2>
            <p className="text-muted-foreground mb-8">We're just getting started. Future plans include:</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {['Flashcards', 'Personalized learning paths', 'AI tutors', 'Multi-language support'].map((plan, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1} className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-md">
                <Globe className="w-5 h-5 text-primary shrink-0" />
                <p className="font-semibold text-sm">{plan}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 px-4 gradient-sky">
        <div className="container mx-auto text-center max-w-xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Heart className="w-10 h-10 text-pink mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold mb-3">Learning is evolving.</h2>
            <p className="text-lg text-muted-foreground">And we're here to make it smarter. ❤️</p>
            <Link to="/auth">
              <Button size="lg" className="gradient-hero border-0 mt-8 rounded-xl">🚀 Get Started Now</Button>
            </Link>
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
          <p className="text-xs text-muted-foreground">© 2026 Quiz It Now. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
