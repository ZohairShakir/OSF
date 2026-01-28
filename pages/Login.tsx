import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LogoNavbar } from '../components/BrandLogos';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'admin'>('client');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;

    setError(null);
    setIsLoggingIn(true);
    
    try {
      await login(email, password, role);
      navigate(role === 'admin' ? '/dashboard/admin' : '/dashboard/client');
    } catch (err: any) {
      setError(err.message || 'Identity verification failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card rounded-[3rem] p-10 md:p-12 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600"></div>
        <div className="text-center mb-10 flex flex-col items-center">
          <Link to="/" className="inline-block mb-2">
            <LogoNavbar size="md" />
          </Link>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-4">Security Protocol Active</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Select Portal</label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                type="button" 
                onClick={() => setRole('client')}
                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${role === 'client' ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-slate-950 border-white/5 text-slate-500'}`}
              >
                Client
              </button>
              <button 
                type="button" 
                onClick={() => setRole('admin')}
                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${role === 'admin' ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-slate-950 border-white/5 text-slate-500'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com" 
                className="w-full bg-slate-950 border border-white/10 rounded-2xl px-12 py-4 text-white focus:outline-none focus:border-indigo-600 transition-all text-sm font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-950 border border-white/10 rounded-2xl px-12 py-4 text-white focus:outline-none focus:border-indigo-600 transition-all text-sm font-bold"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoggingIn}
            className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-indigo-600/30 group disabled:opacity-50"
          >
            {isLoggingIn ? "Verifying..." : "Initialize Session"} 
            {!isLoggingIn && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="text-center text-slate-500 text-[10px] font-black uppercase tracking-widest mt-10">
          First-time deployment? <Link to="/signup" className="text-indigo-500 hover:underline">Start your project</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;