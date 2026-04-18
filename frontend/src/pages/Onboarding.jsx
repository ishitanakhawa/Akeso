import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Activity, Moon, Check, ShieldCheck, Loader2 } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "What is your age group?",
    options: ["Under 18", "18-24", "25-34", "35-44", "45+"]
  },
  {
    id: 2,
    question: "What is your gender?",
    options: ["Male", "Female", "Non-binary", "Prefer not to say"]
  },
  {
    id: 3,
    question: "Which best describes your current life role?",
    options: ["Student", "Corporate employee", "Freelancer", "Business owner", "Other"]
  },
  {
    id: 4,
    question: "How many hours do you usually sleep?",
    options: ["Less than 5 hours", "5-6 hours", "6-7 hours", "7-8 hours", "More than 8 hours"]
  },
  {
    id: 5,
    question: "How would you describe your stress level recently?",
    options: ["Very low", "Low", "Moderate", "High", "Very high"]
  },
  {
    id: 6,
    question: "How often do you feel anxious or overthinking?",
    options: ["Rarely", "Sometimes", "Often", "Very often"]
  },
  {
    id: 7,
    question: "How is your daily energy level?",
    options: ["Very low", "Low", "Normal", "High"]
  },
  {
    id: 8,
    question: "How physically active are you?",
    options: ["Very low activity", "Light activity", "Moderate activity", "Very active"]
  },
  {
    id: 9,
    question: "What is your main mental health goal?",
    options: ["Reduce stress", "Improve sleep", "Improve focus", "Reduce anxiety", "Emotional balance"]
  }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const currentQ = QUESTIONS.find(q => q.id === step);
  const totalSteps = QUESTIONS.length;

  const handleSelect = (option) => {
    setAnswers({ ...answers, [step]: option });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setLoading(true);
      // Simulate AI analysis delay
      setTimeout(() => {
        setLoading(false);
        setAnalysisComplete(true);
      }, 3500);
    }
  };

  if (analysisComplete) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 animate-fade-in-up">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-[#98C3ED] text-white rounded-[24px] mx-auto flex items-center justify-center shadow-lg shadow-[#98C3ED]/30 mb-6">
            <BrainCircuit size={40} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#333333]">Personalized Summary</h1>
          <p className="text-[#333333] font-medium mt-3 text-lg">Analysis complete. Here is your initial mindset profile.</p>
        </div>

        <div className="card shadow-md border-0 bg-white p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            
            <div className="flex flex-col items-center justify-center p-8 bg-[#F9F9F9] rounded-[24px] w-full md:w-1/3 border border-[#E4E4E4]">
              <span className="text-[#333333] font-bold text-sm uppercase tracking-wider mb-3">Mental Balance Score</span>
              <div className="text-6xl font-extrabold text-[#333333] flex items-baseline">
                68 <span className="text-2xl text-[#95C8CE] ml-2">/100</span>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h3 className="font-extrabold text-[#333333] text-2xl mb-4 flex items-center gap-3">
                 <ShieldCheck className="text-[#95C8CE]" size={28}/> AI Insight
              </h3>
              <p className="text-[#333333] font-medium leading-relaxed text-lg bg-[#98C3ED]/10 border border-[#98C3ED]/20 p-6 rounded-[18px] mb-8">
                Based on your answers, your stress level is moderate and sleep consistency can be improved to achieve emotional balance.
              </p>
              
              <div className="mb-8">
                 <h4 className="font-bold text-[#333333] uppercase text-sm tracking-wider mb-5">Key Focus Areas</h4>
                 <div className="flex flex-wrap gap-3">
                   <div className="px-5 py-3 bg-white border border-[#E4E4E4] rounded-full text-[#333333] font-bold shadow-sm flex items-center gap-2"><Moon size={18} className="text-[#98C3ED]"/> Sleep</div>
                   <div className="px-5 py-3 bg-white border border-[#E4E4E4] rounded-full text-[#333333] font-bold shadow-sm flex items-center gap-2"><Activity size={18} className="text-[#D6A848]"/> Stress management</div>
                   <div className="px-5 py-3 bg-white border border-[#E4E4E4] rounded-full text-[#333333] font-bold shadow-sm flex items-center gap-2"><BrainCircuit size={18} className="text-[#95C8CE]"/> Energy balance</div>
                 </div>
              </div>

               <div>
                 <h4 className="font-bold text-[#333333] uppercase text-sm tracking-wider mb-5">Recommendations</h4>
                 <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-[#333333] font-bold bg-[#F9F9F9] p-5 rounded-[16px] border border-[#E4E4E4]"><Check className="text-[#95C8CE]" size={22}/> Maintain fixed sleep schedule</li>
                    <li className="flex items-center gap-4 text-[#333333] font-bold bg-[#F9F9F9] p-5 rounded-[16px] border border-[#E4E4E4]"><Check className="text-[#95C8CE]" size={22}/> Take small breaks during work</li>
                    <li className="flex items-center gap-4 text-[#333333] font-bold bg-[#F9F9F9] p-5 rounded-[16px] border border-[#E4E4E4]"><Check className="text-[#95C8CE]" size={22}/> Include physical activity</li>
                    <li className="flex items-center gap-4 text-[#333333] font-bold bg-[#F9F9F9] p-5 rounded-[16px] border border-[#E4E4E4]"><Check className="text-[#95C8CE]" size={22}/> Try relaxation exercise</li>
                 </ul>
              </div>

            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button onClick={() => navigate('/dashboard')} className="btn-primary flex items-center justify-center gap-3 px-12 py-5 rounded-[18px] text-lg font-bold shadow-lg shadow-[#98C3ED]/30 group w-full md:w-auto h-16">
             Go to Dashboard
             <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform"/>
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-32 flex flex-col items-center justify-center animate-fade-in-up">
        <Loader2 className="animate-spin text-[#98C3ED] mb-8" size={64} />
        <h2 className="text-3xl font-extrabold text-[#333333] text-center mb-4 leading-snug">Analyzing your emotional patterns <br />using AI...</h2>
        <p className="text-[#333333] font-medium text-lg text-center">We're organizing your context to build your custom mental health profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 lg:py-16 px-4 transition-all duration-300">
       
       <div className="mb-12 text-center animate-fade-in-up">
         <div className="mb-5 flex items-center justify-between">
           <span className="text-[#333333] font-extrabold tracking-tight text-lg">Intake Questionnaire</span>
           <span className="text-[#333333] font-bold tracking-widest text-sm uppercase bg-white px-3 py-1 rounded-full shadow-sm border border-[#E4E4E4]">Question {step} of {totalSteps}</span>
         </div>
         <div className="w-full bg-white border border-[#E4E4E4] h-3 rounded-full overflow-hidden shadow-inner">
           <div className="bg-[#98C3ED] h-full transition-all duration-700 ease-in-out relative rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}>
             <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
           </div>
         </div>
       </div>

       <div className="card shadow-xl shadow-[#333333]/5 border border-[#E4E4E4] bg-white p-8 md:p-12 animate-fade-in-up" key={step}>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#333333] text-center mb-10 leading-snug">
             {currentQ.question}
          </h2>

          <div className="flex flex-col gap-4">
             {currentQ.options.map((opt, idx) => {
                const isSelected = answers[step] === opt;
                return (
                  <button 
                    key={idx}
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left p-6 rounded-[18px] font-bold text-lg transition-all duration-300 border-2 
                      ${isSelected 
                        ? 'border-[#98C3ED] bg-[#98C3ED]/10 text-[#333333] translate-x-2' 
                        : 'border-[#E4E4E4] bg-white text-[#333333] hover:border-[#95C8CE] hover:bg-[#F9F9F9]'
                      }
                    `}
                  >
                     <div className="flex items-center justify-between">
                       {opt}
                       {isSelected && <div className="w-6 h-6 rounded-full bg-[#98C3ED] text-white flex items-center justify-center pointer-events-none shadow-sm"><Check size={14} strokeWidth={3}/></div>}
                     </div>
                  </button>
                )
             })}
          </div>

          <div className="mt-12 flex justify-end pt-8 border-t border-[#E4E4E4]">
             <button 
                onClick={handleNext}
                disabled={!answers[step]}
                className={`py-4 px-10 rounded-[16px] font-bold text-lg flex items-center gap-3 transition-all h-16 ${answers[step] ? 'bg-[#98C3ED] text-white shadow-lg shadow-[#98C3ED]/30 hover:-translate-y-1' : 'bg-[#E4E4E4] text-[#747986] cursor-not-allowed'}`}
             >
                {step === totalSteps ? 'Complete Analysis' : 'Next Question'}
                <ArrowRight size={22} />
             </button>
          </div>
       </div>

    </div>
  );
}
