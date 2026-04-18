import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, ArrowRight, Lock, Loader2 } from 'lucide-react';
import api from '../api/axios';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email.includes('@')) {
      return setError('Please enter a valid email address.');
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    if (!isLogin) {
      if (form.password !== form.confirmPassword) {
        return setError('Passwords do not match.');
      }
      if (form.name.trim() === '') {
        return setError('Please enter your full name.');
      }
    }

    setLoading(true);
    try {
      if (!isLogin) {
        // Sign Up
        await api.post('/signup', {
          email: form.email,
          name: form.name,
          password: form.password
        });
        // Auto-login after signup or switch to login
        setIsLogin(true);
        setError('Account created! Please login.');
      } else {
        // Login
        const res = await api.post('/login', {
          email: form.email,
          password: form.password,
          name: "login_instance" // Required by schema but ignored by login logic
        });
        
        // Save user session
        localStorage.setItem('user_id', res.data.user_id);
        localStorage.setItem('user_name', res.data.name);
        
        navigate('/onboarding');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4">
      <div className="card w-full max-w-md p-8 md:p-10 relative overflow-hidden bg-white shadow-md border-0 animate-fade-in-up">
        
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-[#98C3ED]/10 rounded-[18px] flex items-center justify-center text-[#98C3ED] mb-6 shadow-sm border border-[#98C3ED]/20">
            <BrainCircuit size={32} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#333333]">
            {isLogin ? 'Welcome Back' : 'Create your Akeso account'}
          </h1>
          <p className="text-[#333333] font-medium mt-2">
            {isLogin ? 'Login to continue your mental wellness journey.' : 'Start understanding your emotional health.'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <input type="text" placeholder="Full Name" className="w-full px-5 py-4 rounded-[14px] bg-[#F9F9F9] border-2 border-transparent focus:border-[#95C8CE] focus:bg-white focus:outline-none transition-all text-[#333333] font-medium placeholder-[#333333]"
                value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>
          )}
          
          <div>
            <input type="email" placeholder="Email address" className="w-full px-5 py-4 rounded-[14px] bg-[#F9F9F9] border-2 border-transparent focus:border-[#95C8CE] focus:bg-white focus:outline-none transition-all text-[#333333] font-medium placeholder-[#333333]" 
              value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>
          
          <div>
            <input type="password" placeholder="Password" className="w-full px-5 py-4 rounded-[14px] bg-[#F9F9F9] border-2 border-transparent focus:border-[#95C8CE] focus:bg-white focus:outline-none transition-all text-[#333333] font-medium placeholder-[#333333]" 
              value={form.password} onChange={e => setForm({...form, password: e.target.value})}
            />
          </div>

          {!isLogin && (
            <div>
              <input type="password" placeholder="Confirm Password" className="w-full px-5 py-4 rounded-[14px] bg-[#F9F9F9] border-2 border-transparent focus:border-[#95C8CE] focus:bg-white focus:outline-none transition-all text-[#333333] font-medium placeholder-[#333333]" 
                value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})}
              />
            </div>
          )}

          {error && <p className={`text-sm font-bold pt-1 animate-fade-in-up ${error.includes('created') ? 'text-green-500' : 'text-red-400'}`}>{error}</p>}

          {isLogin && (
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-[#333333] font-medium text-sm">
                <input type="checkbox" className="w-4 h-4 rounded text-[#98C3ED] focus:ring-[#98C3ED] border-[#E4E4E4]" /> Remember me
              </label>
              <a href="#" className="text-sm font-bold text-[#95C8CE] hover:underline">Forgot password?</a>
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#98C3ED] text-white py-4 rounded-[16px] font-bold text-lg hover:shadow-lg hover:shadow-[#98C3ED]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-2 group"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Login' : 'Create Account')}
            {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E4E4E4] text-center">
          <p className="text-[#333333] font-medium">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); setForm({name:'', email:'', password:'', confirmPassword: ''})}} 
              className="text-[#333333] font-bold hover:text-[#98C3ED] transition-colors ml-1"
            >
              {isLogin ? 'Create Account' : 'Login'}
            </button>
          </p>
        </div>

      </div>

      <div className="mt-8 flex items-center gap-2 text-[#333333] font-medium text-sm">
        <Lock size={14} className="text-[#95C8CE]" />
        Your emotional data is encrypted.
      </div>
    </div>
  );
}
