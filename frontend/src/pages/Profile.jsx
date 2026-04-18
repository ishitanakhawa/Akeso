import React, { useState } from 'react';
import { Check, Lock, User } from 'lucide-react';

export default function Profile() {
  const [form, setForm] = useState({
    name: 'Jai Suthar', age: '25', gender: 'Male', role: 'Student', workStyle: 'Hybrid', stressLevel: 5, sleepSchedule: 'Regular', activityLevel: 'Moderate', goals: ['Reduce stress', 'Improve focus']
  });
  const [saved, setSaved] = useState(false);

  const submitProfile = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleGoal = (goal) => {
    setForm(prev => {
      const goals = prev.goals.includes(goal) ? prev.goals.filter(g => g !== goal) : [...prev.goals, goal];
      return { ...prev, goals };
    });
  }

  const goalsList = ["Reduce stress", "Improve focus", "Improve sleep", "Reduce anxiety", "Increase productivity", "Emotional stability"];

  return (
    <div className="animate-fade-in-up pb-10 w-full max-w-4xl mx-auto">
      <header className="mb-8 pt-4 border-b border-[#E4E4E4] pb-8 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#333333]">Profile Settings</h1>
          <p className="text-[#333333] font-medium mt-2 text-lg">Update your context to tune AI behavior.</p>
        </div>
        <div className="w-16 h-16 bg-[#98C3ED] text-white rounded-full flex justify-center items-center shadow-sm">
          <User size={30} />
        </div>
      </header>

      <form onSubmit={submitProfile} className="card border-[#E4E4E4] space-y-8">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-2">Full Name</label>
            <input type="text" className="w-full px-5 py-4 rounded-[14px] bg-[#F9F9F9] border-2 border-transparent focus:border-[#95C8CE] focus:bg-white focus:outline-none transition-all text-[#333333] font-medium" 
              value={form.name} onChange={e => setForm({...form, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-2">Age</label>
            <input type="number" className="w-full px-5 py-4 rounded-[14px] bg-[#F9F9F9] border-2 border-transparent focus:border-[#95C8CE] focus:bg-white focus:outline-none transition-all text-[#333333] font-medium" 
              value={form.age} onChange={e => setForm({...form, age: e.target.value})}
            />
          </div>
        </div>

        {/* Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-2">Gender</label>
            <select className="w-full px-5 py-4 rounded-[14px] bg-[#F9F9F9] border-2 border-transparent focus:border-[#95C8CE] focus:outline-none text-[#333333] font-medium cursor-pointer"
              value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}
            >
              <option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#333333] mb-2">Life Role</label>
            <select className="w-full px-5 py-4 rounded-[14px] bg-[#F9F9F9] border-2 border-transparent focus:border-[#95C8CE] focus:outline-none text-[#333333] font-medium cursor-pointer"
              value={form.role} onChange={e => setForm({...form, role: e.target.value})}
            >
              <option>Student</option><option>Corporate Employee</option><option>Freelancer</option><option>Business Owner</option>
              <option>Job Seeker</option><option>Homemaker</option><option>Retired</option><option>Other</option>
            </select>
          </div>
           <div>
            <label className="block text-sm font-bold text-[#333333] mb-2">Work Style</label>
            <select className="w-full px-5 py-4 rounded-[14px] bg-[#F9F9F9] border-2 border-transparent focus:border-[#95C8CE] focus:outline-none text-[#333333] font-medium cursor-pointer"
              value={form.workStyle} onChange={e => setForm({...form, workStyle: e.target.value})}
            >
              <option>Work from home</option><option>Office work</option><option>Hybrid</option><option>Irregular schedule</option>
            </select>
          </div>
        </div>

        <hr className="border-[#E4E4E4] border-dashed" />

         {/* Goals Multi-Select */}
         <div>
            <label className="block text-md font-bold text-[#333333] mb-4">Mental Health Goals</label>
            <div className="flex flex-wrap gap-3">
              {goalsList.map(goal => {
                const active = form.goals.includes(goal);
                return (
                  <button type="button" key={goal} onClick={() => toggleGoal(goal)} 
                    className={`px-5 py-3 rounded-full border border-[#E4E4E4] text-sm font-bold transition-all flex items-center gap-2 ${active ? 'bg-[#98C3ED] text-white border-[#98C3ED] shadow-sm' : 'bg-white text-[#333333] hover:bg-[#F9F9F9]'}`}
                  >
                    {active && <Check size={16} />}
                    {goal}
                  </button>
                )
              })}
            </div>
         </div>

        <div className="pt-6 flex justify-end items-center gap-4">
          {saved && <span className="text-[#95C8CE] font-bold flex items-center gap-2"><Check size={18}/> Options Saved!</span>}
          <button type="submit" className="bg-[#98C3ED] text-white px-10 py-4 rounded-[16px] font-bold text-lg hover:shadow-lg hover:shadow-[#98C3ED]/30 hover:-translate-y-0.5 transition-all">
            Save Configuration
          </button>
        </div>

      </form>
      
      <div className="mt-8 flex justify-center items-center gap-2 text-[#333333] font-medium text-sm">
        <Lock size={14} className="text-[#95C8CE]" />
        Your information is private and used only to improve AI insights.
      </div>
    </div>
  );
}
