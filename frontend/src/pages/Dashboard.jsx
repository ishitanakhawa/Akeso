import React, { useEffect, useState } from 'react';
import { Activity, AlertTriangle, BrainCircuit, Sparkles, Send, Brain, Clock, Zap, AlertCircle, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import api from '../api/axios';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        window.location.href = '/login';
        return;
      }

      try {
        const [profileRes, analysisRes] = await Promise.all([
          api.get(`/profile/${userId}`).catch(() => ({ data: { name: 'User' } })),
          api.post(`/analyze/${userId}`).catch(err => {
            if (err.response?.status !== 404) {
              console.error('Analysis failed:', err);
            }
            return { data: null };
          })
        ]);
        setProfile(profileRes.data);
        setAnalysis(analysisRes.data);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const correlationData = [
    { name: 'Mon', sleep: 5, stress: 8, mood: 4 },
    { name: 'Tue', sleep: 6, stress: 7, mood: 5 },
    { name: 'Wed', sleep: 8, stress: 3, mood: 8 },
    { name: 'Thu', sleep: 7.5, stress: 4, mood: 7 },
    { name: 'Fri', sleep: 6.5, stress: 6, mood: 6 },
    { name: 'Sat', sleep: 9, stress: 2, mood: 9 },
    { name: 'Sun', sleep: 8, stress: 3, mood: 8 },
  ];

  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'Hello! I am your Akeso AI guide. How are you feeling today?' }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatLoading(true);

    try {
      const res = await api.post('/chat', { message: userMsg });
      setChatHistory(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (err) {
      console.error('Chat failed:', err);
      setChatHistory(prev => [...prev, { role: 'ai', text: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#98C3ED]" size={48} />
      </div>
    );
  }

  const scoreRaw = analysis?.mental_score;
  const score = (typeof scoreRaw === 'number' && !isNaN(scoreRaw)) ? scoreRaw : 72;
  const risk = analysis?.risk_level || "low";
  const recommendations = analysis?.recommendations ? (typeof analysis.recommendations === 'string' ? JSON.parse(analysis.recommendations) : analysis.recommendations) : [
    "Maintain a consistent sleep schedule",
    "Engage in at least 30 minutes of physical activity",
    "Practice mindful breathing exercises"
  ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-10 w-full">
      {/* SECTION 1: HERO GREETING */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-4 pt-4">
        <div>
          <h1 className="text-4xl sm:text-[2.75rem] font-extrabold tracking-tight text-[#333333] leading-tight">
            Good Evening, {profile?.name || 'User'}
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <Sparkles size={20} className="text-[#98C3ED]" />
            <p className="text-[#333333] font-medium text-lg">Your emotional balance is {score > 70 ? 'stable' : 'recovering'} this week.</p>
          </div>
        </div>
      </header>

      {/* TOP ROW: Score & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SECTION 2: MENTAL HEALTH SCORE */}
        <div className="card col-span-1 flex flex-col items-center justify-center text-center relative">
          <h3 className="w-full text-left font-bold text-[#333333] mb-6 absolute top-6 left-6">Mental Balance</h3>
          
          <div className="relative w-48 h-48 mt-8">
            <svg width="192" height="192" className="transform -rotate-90">
              <circle cx="96" cy="96" r="80" stroke="#E4E4E4" strokeWidth="18" fill="transparent" />
              <circle 
                cx="96" cy="96" r="80" 
                stroke="#98C3ED" strokeWidth="18" fill="transparent" 
                strokeDasharray="502" 
                strokeDashoffset={502 - (502 * score / 100)} 
                strokeLinecap="round" className="transition-all duration-1000 ease-out" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <span className="text-5xl font-black text-[#333333] tracking-tighter">{score}<span className="text-2xl text-[#333333]">/100</span></span>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center gap-1">
            <div className={`px-4 py-1.5 rounded-[18px] text-sm font-bold tracking-wide uppercase ${
              risk === 'low' ? 'bg-green-50 text-green-500' : risk === 'moderate' ? 'bg-amber-50 text-amber-500' : 'bg-red-50 text-red-500'
            }`}>
              {risk} risk
            </div>
            <div className="flex items-center gap-1 text-[#333333] font-medium text-sm mt-1">
              AI-generated behavioral alignment
            </div>
          </div>
        </div>

        {/* SECTION 4: AI INSIGHT CARD */}
        <div className="card col-span-1 lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[#333333] flex items-center gap-2 mb-4">
              <BrainCircuit className="text-[#95C8CE]" /> AI Behavioral Insights
            </h3>
            <div className="space-y-4">
              <div className="p-6 bg-[#95C8CE]/10 rounded-[18px] border border-[#95C8CE]/20">
                <p className="text-[#333333] font-medium leading-relaxed">
                  {analysis ? `Your mental score of ${score} reflects a ${risk} risk profile based on your latest check-in data. Your sleep patterns strongly correlate with your reported focus levels.` : 
                  "Please complete your daily check-in to generate sophisticated AI correlations in your behavioral patterns."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 bg-[#E4E4E4]/40 rounded-[18px] flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Activity className="text-[#333333]" size={20} />
              </div>
              <div>
                <p className="font-bold text-[#333333] tracking-tight capitalize">{risk} Risk Detected</p>
              </div>
            </div>
            
            <div className="flex-1 p-4 bg-[#FCECA4]/30 rounded-[18px] border border-[#FCECA4]/50 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <AlertTriangle className="text-[#D6A848]" size={20} />
              </div>
              <div>
                <p className="font-bold text-[#333333]">Optimization Required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: DAILY INPUT TRACKER */}
      <div>
        <div className="mb-4">
          <h3 className="font-bold text-[#333333] text-xl">Today's Data Summary</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <SignalCard label="Sleep Hours" value="7.5h" trend="↑ 1.2h" />
          <SignalCard label="Mood Level" value="7/10" trend="↑ 2" />
          <SignalCard label="Stress Level" value="5/10" trend="↓ 1" />
          <SignalCard label="Energy Level" value="6/10" trend="-" />
          <SignalCard label="Focus Level" value="8/10" trend="↑ 3" />
          <SignalCard label="Activity" value="30m" trend="↑ 10m" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION 5: WEEKLY PATTERN GRAPH */}
        <div className="card col-span-1 lg:col-span-2">
          <h3 className="font-bold text-[#333333] mb-6">Weekly Pattern Graph</h3>
          <div className="h-64 rounded-xl overflow-hidden w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patternData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#98C3ED" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#98C3ED" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTeal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#95C8CE" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#95C8CE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#333333', fontSize: 12}} dy={10} />
                <Tooltip contentStyle={{ borderRadius: '18px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }} />
                <Area type="monotone" name="Sleep" dataKey="sleep" stroke="#98C3ED" strokeWidth={3} fill="url(#colorBlue)" />
                <Area type="monotone" name="Mood" dataKey="mood" stroke="#95C8CE" strokeWidth={3} fill="url(#colorTeal)" />
                <Area type="monotone" name="Stress" dataKey="stress" stroke="#333333" strokeWidth={3} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 7: AI RECOMMENDATION ENGINE */}
        <div className="card col-span-1 p-0 overflow-hidden flex flex-col bg-white">
          <div className="p-6 border-b border-[#E4E4E4]/50 bg-[#F9F9F9]">
            <h3 className="font-bold text-[#333333] flex items-center gap-2">
              <Sparkles className="text-[#95C8CE]" size={20} /> AI Recommendations
            </h3>
          </div>
          <div className="p-6 space-y-4 flex-1 overflow-y-auto custom-scrollbar">
            {recommendations.map((rec, i) => (
              <SuggestionItem key={i} text={rec} />
            ))}
          </div>
        </div>
      </div>

      <hr className="my-12 border-[#E4E4E4]" />

      {/* MERGED: AI DEEP ANALYSIS FROM INSIGHTS */}
      <header className="mb-8 p-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#333333]">AI Deep Analysis</h2>
        <p className="text-[#333333] font-medium mt-2 text-lg">Sophisticated correlations detected in your behavioral patterns.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sleep Consistency */}
        <div className="card bg-[#98C3ED]/5 border-[#98C3ED]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#98C3ED] text-white rounded-xl flex items-center justify-center shadow-sm">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-bold text-[#333333] text-lg">Sleep Consistency Score</h3>
              <p className="text-sm font-semibold text-[#95C8CE]">84/100 (Optimal)</p>
            </div>
          </div>
          <p className="text-[#333333] font-medium leading-relaxed">
            Your sleep window irregularity has dropped by 14% this week. Maintaining this 10:30 PM to 6:30 AM schedule lowers overall daily anxiety spikes by statistically 30%.
          </p>
        </div>

        {/* Cognitive Fatigue */}
        <div className="card bg-[#FCECA4]/30 border-[#FCECA4]/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#D6A848] text-white rounded-xl flex items-center justify-center shadow-sm">
              <Brain size={24} />
            </div>
            <div>
              <h3 className="font-bold text-[#333333] text-lg">Energy Fluctuation Pattern</h3>
              <p className="text-sm font-semibold text-[#D6A848]">Moderate Caution</p>
            </div>
          </div>
          <p className="text-[#333333] font-medium leading-relaxed">
            Sustained focus drops sharply after 2:00 PM. AI recommends inserting a 15-minute complete disconnect buffer away from screens at 1:30 PM.
          </p>
        </div>

      </div>

      {/* Advanced Lifestyle Correlation */}
      <h3 className="font-extrabold text-[#333333] text-2xl pt-6">Lifestyle Correlation Analysis</h3>
      
      <div className="card p-0 overflow-hidden border-[#E4E4E4] mt-4">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#E4E4E4]">
          
          <div className="flex-1 p-8 hover:bg-[#F9F9F9] transition-colors">
            <h4 className="font-bold text-[#333333] mb-2 flex items-center gap-2"><AlertCircle size={18} className="text-[#FCECA4]"/> Stress Triggers</h4>
            <div className="mt-4 p-5 bg-[#FCECA4]/20 rounded-2xl border border-[#FCECA4]/40">
              <strong className="text-[#D6A848] block mb-1">When sleep &lt; 6 hours:</strong>
              <p className="text-[#333333] font-medium leading-relaxed">Biological stress responses increase significantly. Morning anxiety peaks between 9 AM and 11 AM.</p>
            </div>
          </div>

          <div className="flex-1 p-8 hover:bg-[#F9F9F9] transition-colors">
            <h4 className="font-bold text-[#333333] mb-2 flex items-center gap-2"><Zap size={18} className="text-[#95C8CE]"/> Energy Activators</h4>
            <div className="mt-4 p-5 bg-[#95C8CE]/10 rounded-2xl border border-[#95C8CE]/20">
              <strong className="text-[#95C8CE] block mb-1">When activity &gt; 20 minutes:</strong>
              <p className="text-[#333333] font-medium leading-relaxed">Sustained mood improves strongly. End-of-day mental fatigue drops.</p>
            </div>
          </div>

        </div>
      </div>
      
      {/* Primary Correlation Chart */}
       <div className="card p-8 border-[#E4E4E4] mt-8 mb-8">
          <h3 className="font-bold text-[#333333] text-lg mb-6">Behavior Pattern Tracking</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={correlationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#98C3ED" stopOpacity={0.5}/><stop offset="95%" stopColor="#98C3ED" stopOpacity={0}/></linearGradient>
                  <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#333333" stopOpacity={0.2}/><stop offset="95%" stopColor="#333333" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#333333', fontSize: 13, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#333333', fontSize: 13}} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Area type="monotone" dataKey="sleep" name="Sleep (Hours)" stroke="#98C3ED" strokeWidth={3} fill="url(#sleepGrad)" />
                <Area type="monotone" dataKey="stress" name="Stress Level" stroke="#333333" strokeWidth={3} fill="url(#stressGrad)" />
                <Area type="monotone" dataKey="mood" name="Mood Balance" stroke="#95C8CE" strokeWidth={3} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      {/* SECTION 8: QUICK AI CHAT */}
      <div className="space-y-6 pb-20">
        <div className="card bg-[#F9F9F9] border-[#E4E4E4] min-h-[300px] flex flex-col shadow-inner">
           <div className="flex-1 space-y-4 p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
             {chatHistory.map((chat, idx) => (
               <div key={idx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[80%] p-4 rounded-[18px] font-medium leading-relaxed shadow-sm ${
                   chat.role === 'user' ? 'bg-[#98C3ED] text-white rounded-br-none' : 'bg-white text-[#333333] border border-[#E4E4E4] rounded-bl-none'
                 }`}>
                   {chat.text}
                 </div>
               </div>
             ))}
             {chatLoading && (
               <div className="flex justify-start">
                 <div className="bg-white text-[#333333] border border-[#E4E4E4] p-4 rounded-[18px] rounded-bl-none shadow-sm flex items-center gap-2">
                   <Loader2 size={16} className="animate-spin text-[#98C3ED]" /> Thinking...
                 </div>
               </div>
             )}
           </div>
        </div>

        <form onSubmit={sendMessage} className="card bg-white p-4 !rounded-[24px] border-[#98C3ED]/30 shadow-lg">
          <div className="relative">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Why am I stressed? What should I improve today?" 
              className="input-field pl-6 pr-14 shadow-sm py-5 text-[#333333] font-bold border-none bg-[#F9F9F9] focus:ring-2 focus:ring-[#98C3ED] transition-all" 
            />
            <button 
              type="submit"
              disabled={chatLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#98C3ED] text-white rounded-xl flex items-center justify-center hover:bg-[#7FB0DA] transition-all disabled:opacity-50"
            >
              <Send size={22} className="ml-1" />
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

const patternData = [
  { day: 'Mon', mood: 5, stress: 7, sleep: 5 },
  { day: 'Tue', mood: 6, stress: 6, sleep: 6 },
  { day: 'Wed', mood: 8, stress: 4, sleep: 8 },
  { day: 'Thu', mood: 8, stress: 3, sleep: 7.5 },
  { day: 'Fri', mood: 7, stress: 5, sleep: 6.5 },
  { day: 'Sat', mood: 9, stress: 2, sleep: 9 },
  { day: 'Sun', mood: 8, stress: 4, sleep: 8 }
];

function SignalCard({ label, value, trend }) {
  return (
    <div className={`p-4 rounded-[18px] bg-white border border-[#E4E4E4] transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}>
      <p className="text-xs font-bold text-[#333333] uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-black text-[#333333] mt-1">{value}</p>
      <div className="text-sm font-medium text-[#333333] mt-1">vs yesterday: {trend}</div>
    </div>
  )
}

function SuggestionItem({ text }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-[14px] bg-[#F9F9F9] border border-[#E4E4E4]">
      <p className="text-sm font-medium text-[#333333] leading-snug">{text}</p>
    </div>
  );
}
