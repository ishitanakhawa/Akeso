import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Smile, Frown, Coffee, Zap, Moon, Activity, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function CheckIn() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    sleep: 7, mood: 8, stress: 3, anxiety: 2, energy: 7, focus: 8, activityMinutes: 30, screenTime: 4, social: 5, meditation: 10, journal: ""
  });

  const updateForm = (key, value) => {
    const parsed = parseFloat(value);
    setForm(prev => ({ ...prev, [key]: isNaN(parsed) ? 0 : parsed }));
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      // 1. Submit the 9 variables for daily check-in
      await api.post(`/questions/${userId}`, {
        sleep_hours: form.sleep,
        stress_level: form.stress,
        energy_level: form.energy,
        activity_level: form.activityMinutes,
        focus_level: form.focus,
        mood_level: form.mood,
        anxiety_level: form.anxiety,
        life_role: "User", // Mock mapping as requested by system architecture
        goal: "Improve wellness"
      });

      // 2. Trigger AI analysis
      await api.post(`/analyze/${userId}`);

      navigate('/dashboard');
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if(step < 4) setStep(step + 1);
    else handleSubmit();
  };

  return (
    <div className="w-full max-w-2xl mx-auto min-h-[80vh] flex flex-col justify-center animate-fade-in-up pb-12">
      
      {/* Progress Bar */}
      <div className="flex gap-2 w-full mb-12">
        {[1,2,3,4].map(i => (
          <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-[#98C3ED]' : 'bg-[#E4E4E4]'}`} />
        ))}
      </div>

      <div className="card border-0 !shadow-none !bg-transparent p-0 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#98C3ED]/5 rounded-full blur-[80px] pointer-events-none -z-10"></div>
        
        {step === 1 && (
          <StepContainer title="How did you rest today?" subtitle="Tracking baseline physical restoration signals.">
            <div className="space-y-6 bg-white p-8 rounded-[18px] border border-[#E4E4E4]">
              <SliderRow label="Sleep Hours" value={form.sleep} max="14" step="0.5" callback={(v) => updateForm('sleep', v)} icon={<Moon className="text-[#98C3ED]" />} />
              <SliderRow label="Activity (mins)" value={form.activityMinutes} max="120" step="10" callback={(v) => updateForm('activityMinutes', v)} icon={<Activity className="text-[#98C3ED]" />} />
              <SliderRow label="Meditation (mins)" value={form.meditation} max="60" step="5" callback={(v) => updateForm('meditation', v)} icon={<Zap className="text-[#95C8CE]" />} />
            </div>
          </StepContainer>
        )}

        {step === 2 && (
          <StepContainer title="How is your emotional balance?" subtitle="Logging primary mood and tension markers.">
            <div className="space-y-6 bg-white p-8 rounded-[18px] border border-[#E4E4E4]">
              <SliderRow label="Mood" value={form.mood} max="10" callback={(v) => updateForm('mood', v)} emoji={form.mood > 5 ? <Smile className="text-[#95C8CE]" /> : <Frown className="text-[#333333]" />} />
              <SliderRow label="Stress" value={form.stress} max="10" callback={(v) => updateForm('stress', v)} icon={<Activity className="text-[#Fceca4]" />} />
              <SliderRow label="Anxiety" value={form.anxiety} max="10" callback={(v) => updateForm('anxiety', v)} icon={<Zap className="text-[#Fceca4]" />} />
            </div>
          </StepContainer>
        )}

        {step === 3 && (
          <StepContainer title="What is your cognitive state?" subtitle="Identifying cognitive fatigue and focus parameters.">
             <div className="space-y-6 bg-white p-8 rounded-[18px] border border-[#E4E4E4]">
              <SliderRow label="Energy" value={form.energy} max="10" callback={(v) => updateForm('energy', v)} icon={<Zap className="text-[#98C3ED]" />} />
              <SliderRow label="Focus" value={form.focus} max="10" callback={(v) => updateForm('focus', v)} icon={<Coffee className="text-[#95C8CE]" />} />
              <SliderRow label="Social Interaction" value={form.social} max="10" callback={(v) => updateForm('social', v)} icon={<Smile className="text-[#333333]" />} />
              <SliderRow label="Screen Time (h)" value={form.screenTime} max="16" step="1" callback={(v) => updateForm('screenTime', v)} icon={<Activity className="text-[#333333]" />} />
            </div>
          </StepContainer>
        )}

        {step === 4 && (
          <StepContainer title="Journaling (Optional)" subtitle="Reflect on your day. Your emotional data is encrypted and securely stored.">
            <div className="bg-white p-8 rounded-[18px] border border-[#E4E4E4]">
              <textarea 
                className="w-full h-40 input-field resize-none rounded-[14px]" 
                placeholder="Write your thoughts..."
                value={form.journal}
                onChange={(e) => updateForm('journal', e.target.value)}
              />
            </div>
          </StepContainer>
        )}

        <div className="mt-10 flex justify-between items-center">
          {step > 1 ? (
            <button disabled={loading} onClick={() => setStep(step - 1)} className="text-[#333333] font-bold hover:text-[#98C3ED] px-4 py-2 transition-colors">Back</button>
          ) : <div></div>}
          
          <button 
            disabled={loading}
            onClick={nextStep} 
            className="btn-primary flex items-center justify-center gap-2 group ml-auto px-10 min-w-[160px]"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (step === 4 ? 'Save & Analyze' : 'Continue')} 
            {!loading && (step === 4 ? <CheckCircle size={20} /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>)}
          </button>
        </div>

      </div>
    </div>
  );
}

function StepContainer({ title, subtitle, children }) {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#333333] mb-3">{title}</h2>
      <p className="text-lg text-[#333333] font-medium mb-10">{subtitle}</p>
      {children}
    </div>
  )
}

function SliderRow({ label, value, max, step="1", callback, icon, emoji }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3 font-bold text-[#333333] text-lg">
          {emoji || icon} {label}
        </div>
        <span className="font-black text-xl text-[#333333]">{value}</span>
      </div>
      <input 
        type="range" min="0" max={max} step={step} 
        value={value} onChange={(e) => callback(e.target.value)} 
        className="w-full h-3 bg-[#E4E4E4] rounded-lg appearance-none cursor-pointer" 
        style={{ accentColor: '#98C3ED' }}
      />
    </div>
  )
}
