import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Brain, Sparkles, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import Logo3D from '@/components/Logo3D';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import studyBg from '@/assets/study-bg.jpg';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        navigate('/dashboard');
      } else {
        await signup(email, password, name);
        toast.success('Account created! Check your email to confirm, or sign in directly.');
        navigate('/dashboard');
      }
    } catch (err: any) {
      toast.error(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={studyBg} alt="Students studying" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-pink/60" />
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <Logo3D size={64} />
              <h1 className="text-5xl font-display font-bold text-primary-foreground drop-shadow-lg">Quiz It Now</h1>
            </div>
            <p className="text-xl text-primary-foreground/90 max-w-md font-medium drop-shadow">
              Ready? Quiz It Now — Upload your study material and let AI create smart questions! 📚✨
            </p>
          </motion.div>
          <motion.div className="mt-12 grid grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {[
              { icon: BookOpen, label: 'Upload & Learn', color: 'bg-primary-foreground/20' },
              { icon: Brain, label: 'AI Questions', color: 'bg-primary-foreground/20' },
              { icon: Sparkles, label: 'Quiz Mode', color: 'bg-primary-foreground/20' },
            ].map((item, i) => (
              <div key={i} className={`${item.color} backdrop-blur-sm rounded-2xl p-4 text-center`}>
                <item.icon className="w-8 h-8 text-primary-foreground mx-auto mb-2" />
                <p className="text-sm font-semibold text-primary-foreground">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 gradient-sky">
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <Logo3D size={48} />
            <h1 className="text-3xl font-display font-bold text-foreground">Quiz It Now</h1>
          </div>

          <div className="glass-card rounded-3xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground">
                {isLogin ? 'Welcome Back! 👋' : 'Join Us! 🎉'}
              </h2>
              <p className="text-muted-foreground mt-2">
                {isLogin ? 'Sign in to continue learning' : 'Create your account to get started'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="name" type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 h-12 rounded-xl border-border/60 bg-background/50" required={!isLogin} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12 rounded-xl border-border/60 bg-background/50" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 h-12 rounded-xl border-border/60 bg-background/50" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl text-base font-bold gradient-hero hover:opacity-90 transition-opacity" disabled={isLoading}>
                {isLoading ? (
                  <motion.div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} />
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <span className="font-bold text-primary">{isLogin ? 'Sign Up' : 'Sign In'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
