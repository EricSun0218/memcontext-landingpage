import React, { useState, useEffect } from 'react';
import { Github, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom'; // 添加useLocation导入
import { supabase } from '../lib/supabaseClient';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const location = useLocation(); // 获取location对象
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [noticeMessage, setNoticeMessage] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const hasSupabaseEnv = Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailPattern.test(email);

  // 从路由状态中获取传递的email
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const resetMessages = () => {
    setErrorMessage('');
    setNoticeMessage('');
  };

  const handleSignUp = async () => {
    resetMessages();
    if (!hasSupabaseEnv) {
      setErrorMessage('未配置 Supabase 环境变量，请先设置 VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY。');
      return;
    }
    if (!email || !password) {
      setErrorMessage('Please fill in your email and password.');
      return;
    }
    if (!isEmailValid) {
      setEmailTouched(true);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    if (data.session) {
      onLogin();
      return;
    }
    setNoticeMessage('Registration successful. Please check your email to complete verification.');
  };

  const handleSignIn = async () => {
    resetMessages();
    if (!hasSupabaseEnv) {
      setErrorMessage('未配置 Supabase 环境变量，请先设置 VITE_SUPABASE_URL 与 VITE_SUPABASE_ANON_KEY。');
      return;
    }
    if (!email || !password) {
      setErrorMessage('Please fill in your email and password.');
      return;
    }
    if (!isEmailValid) {
      setEmailTouched(true);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    if (data.session) {
      onLogin();
    }
  };
  return (
    <div className="min-h-screen w-full flex bg-black text-white">
      {/* Left Feature Side */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[#09090b] relative overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-xl px-12 flex flex-col justify-center h-full">
            <h1 className="text-5xl font-bold tracking-tight text-white mb-12 leading-tight">
                Build Smarter AI,<br />
                Spend Less
            </h1>

            <div className="space-y-8">
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                        <Check className="w-3.5 h-3.5 text-green-400" strokeWidth={3} />
                    </div>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                        Drop token burn by up to 60% using persistent memory instead of bloated prompts.
                    </p>
                </div>

                <div className="flex gap-4">
                     <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                        <Check className="w-3.5 h-3.5 text-green-400" strokeWidth={3} />
                    </div>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                        Cut API bills with context that scales—no re-sending the same data each call.
                    </p>
                </div>

                <div className="flex gap-4">
                     <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                        <Check className="w-3.5 h-3.5 text-green-400" strokeWidth={3} />
                    </div>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                        Simple SDKs and APIs — add MemContext to your stack in minutes, no heavy setup.
                    </p>
                </div>

                <div className="flex gap-4">
                     <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                        <Check className="w-3.5 h-3.5 text-green-400" strokeWidth={3} />
                    </div>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                        Start free. No credit card, no lock-in.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Right Login Side (Unchanged) */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black z-20 relative border-l border-zinc-900">
         <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                    <span className="text-white transform rotate-45">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    </span>
                    MemContext™
                </div>
                <p className="text-zinc-400">The unified memory API for the AI era.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Email</label>
                    <input 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        className="w-full bg-[#111] border border-zinc-800 rounded-md px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                    />
                    {emailTouched && email.length > 0 && !isEmailValid && (
                        <p className="text-xs text-red-400">Please enter a valid email address</p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full bg-[#111] border border-zinc-800 rounded-md px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                    />
                </div>
                <button 
                    onClick={handleSignIn}
                    disabled={loading}
                    className="w-full bg-transparent border border-zinc-700 hover:bg-zinc-900 text-white font-medium py-2.5 rounded-md text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : 'Already logged in'}
                </button>
                <button
                    onClick={handleSignUp}
                    disabled={loading}
                    className="w-full bg-white text-black hover:bg-zinc-200 font-medium py-2.5 rounded-md text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : 'Email Registration'}
                </button>

                {(errorMessage || noticeMessage) && (
                    <div className="text-xs text-center">
                        {errorMessage && <p className="text-red-400">{errorMessage}</p>}
                        {noticeMessage && <p className="text-emerald-400">{noticeMessage}</p>}
                    </div>
                )}

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-zinc-800"></span>
                    </div>
                    
                </div>

                <div className="grid grid-cols-2 gap-4 relative">
                    

                    
                </div>
            </div>

            <p className="text-center text-xs text-zinc-600 pt-8">
                By continuing, you agree to our <span className="text-zinc-400 hover:text-white cursor-pointer">Terms</span> and <span className="text-zinc-400 hover:text-white cursor-pointer">Privacy Policy</span>.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
