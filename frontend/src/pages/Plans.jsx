import React from 'react';
import { ArrowRight, Check, Lock, Sparkles, Star, ShieldCheck, Activity, BrainCircuit, Heart } from 'lucide-react';

export default function Plans() {
  const plans = [
    {
      name: 'Weekly Plan',
      price: '₹150',
      period: 'per week',
      desc: 'Good for trying AI insights',
      tag: null,
      features: [
        '1 Overall Mental Health Report',
        'AI emotional analysis',
        'Personalized suggestions',
        'Basic stress insights'
      ],
      button: 'Choose Weekly',
    },
    {
      name: 'Monthly Plan',
      price: '₹550',
      period: 'per month',
      desc: 'Best for regular tracking',
      tag: 'Most Popular',
      features: [
        '4 Overall Mental Health Reports',
        'AI emotional pattern tracking',
        'Personalized suggestions',
        'Burnout risk indicator',
        'Progress tracking'
      ],
      button: 'Choose Monthly',
    },
    {
      name: 'Yearly Premium Plan',
      price: '₹6,500',
      period: 'per year',
      desc: 'Best for long-term health',
      tag: 'Best Value',
      saveBadge: 'Save 40%',
      features: [
        '32 Overall Mental Health Reports',
        'Advanced AI pattern analysis',
        'Burnout prediction insights',
        'Priority AI recommendations',
        'Call psychiatrist anytime',
        'Doctor discussion support',
        'Complete emotional trend tracking'
      ],
      button: 'Choose Premium',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 animate-fade-in-up">
      
      {/* Header */}
      <div className="text-center mb-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-[#333333] mb-8">
          Choose the Right Plan for Your Mental Wellness
        </h1>
        <p className="text-xl text-[#333333] font-medium max-w-2xl mx-auto tracking-wide leading-relaxed">
          Get AI-powered emotional insights and professional support tailored to your needs.
        </p>
      </div>

      {/* Cards Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 px-4 items-stretch">
        {plans.map((plan, idx) => {
           const isPopular = plan.tag === 'Most Popular';
           const isYearly = plan.name.includes("Yearly");
           
           return (
             <div key={idx} className={`relative bg-white rounded-[20px] p-8 md:p-10 flex-1 flex flex-col group transition-all duration-500 hover:shadow-xl w-full
                ${isPopular ? 'border-2 border-[#FCECA4] shadow-lg shadow-[#FCECA4]/30 lg:-translate-y-4 lg:hover:-translate-y-6 z-10' : 'border border-[#E4E4E4] shadow-md hover:-translate-y-2'}
                ${isYearly ? 'md:col-span-2 lg:col-span-1 md:w-1/2 lg:w-full md:mx-auto' : ''}
             `}>
               
               {/* Fixed Tags inside DOM Flow */}
               {plan.tag ? (
                 <div className={`self-start inline-flex px-4 py-1.5 rounded-full font-bold text-sm shadow-sm items-center gap-2 whitespace-nowrap tracking-wide mb-6 ${isPopular ? 'bg-[#FCECA4] text-[#D6A848]' : 'bg-[#98C3ED] text-white'}`}>
                    {isPopular ? <Star size={14} fill="currentColor"/> : <Sparkles size={14}/>} {plan.tag}
                 </div>
               ) : (
                 <div className="h-[34px] mb-6 hidden lg:block"></div>
               )}

               <div className="mb-8">
                 <h3 className="text-2xl font-extrabold text-[#333333] mb-3 tracking-wide">{plan.name}</h3>
                 <div className="flex items-end gap-1 mb-3">
                   <span className="text-5xl font-extrabold text-[#333333] tracking-wide flex items-start">
                      <span className="text-2xl mt-1 mr-1">₹</span>
                      {plan.price.replace('₹', '')}
                   </span>
                   <span className="text-[#333333] font-medium mb-1 tracking-wide text-lg">/{plan.period.replace('per ', '')}</span>
                 </div>
                 <div className="flex items-center gap-2 h-6">
                    <p className="text-[#333333] font-bold text-sm tracking-wide">{plan.desc}</p>
                    {plan.saveBadge && <span className="bg-[#95C8CE]/20 text-[#95C8CE] px-2 py-0.5 rounded-md text-xs font-bold whitespace-nowrap">{plan.saveBadge}</span>}
                 </div>
               </div>

               <div className="flex-1 mt-6">
                 <ul className="space-y-5 mb-10">
                   {plan.features.map((feature, i) => (
                     <li key={i} className="flex items-start gap-4">
                       <div className={`mt-0.5 shrink-0 p-1 rounded-full ${isPopular ? 'bg-[#FCECA4]/30' : 'bg-[#98C3ED]/20'}`}>
                         <Check className={`${isPopular ? 'text-[#D6A848]' : 'text-[#98C3ED]'}`} size={16} strokeWidth={3} />
                       </div>
                       <span className="text-[#333333] font-bold tracking-wide leading-relaxed text-[15px]">{feature}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               <button className={`w-full py-4 rounded-[12px] font-extrabold text-lg tracking-wide transition-all flex justify-center items-center gap-2 mt-auto hover:shadow-lg h-16
                 ${isPopular ? 'bg-[#FCECA4] text-[#747986] hover:bg-[#F9E27E]' : 'bg-[#98C3ED] text-white hover:bg-[#7FB0DA]'}
               `}>
                 {plan.button}
                 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </button>

             </div>
           )
        })}
      </div>

      {/* Comparison Feature Row */}
      <div className="max-w-4xl mx-auto bg-white rounded-[24px] p-8 md:p-12 border border-[#E4E4E4] shadow-md mb-20 mt-12 lg:mt-20 mx-4 transition-all hover:shadow-lg">
        <h3 className="text-center font-extrabold text-3xl text-[#333333] mb-10 tracking-wide">Compare Plan Features</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#E4E4E4]/80">
                 <th className="p-5 text-[#333333] font-extrabold uppercase text-sm tracking-wider">Feature Integration</th>
                 <th className="p-5 text-center text-[#333333] font-extrabold uppercase text-sm tracking-wider w-1/5">Weekly</th>
                 <th className="p-5 text-center text-[#D6A848] font-extrabold uppercase text-sm bg-[#FCECA4]/20 rounded-t-[16px] w-1/5 tracking-wider border-b-2 border-transparent">Monthly</th>
                 <th className="p-5 text-center text-[#95C8CE] font-extrabold uppercase text-sm tracking-wider w-1/5">Yearly</th>
              </tr>
            </thead>
            <tbody className="text-[#333333] font-bold text-md">
              <tr className="border-b border-[#E4E4E4]/40 hover:bg-[#F9F9F9] transition-colors">
                 <td className="p-5">Clinical Reports Included</td>
                 <td className="p-5 text-center text-[#333333] font-extrabold">1</td>
                 <td className="p-5 text-center bg-[#FCECA4]/20 text-[#333333] font-extrabold">4</td>
                 <td className="p-5 text-center text-[#95C8CE] font-extrabold">32</td>
              </tr>
              <tr className="border-b border-[#E4E4E4]/40 hover:bg-[#F9F9F9] transition-colors">
                 <td className="p-5">AI Sub-pattern Insights</td>
                 <td className="p-5 text-center text-[#333333]">Basic</td>
                 <td className="p-5 text-center bg-[#FCECA4]/20 text-[#333333]">Advanced</td>
                 <td className="p-5 text-center text-[#95C8CE]">Predictive</td>
              </tr>
              <tr className="border-b border-[#E4E4E4]/40 hover:bg-[#F9F9F9] transition-colors">
                 <td className="p-5">Burnout Detection</td>
                 <td className="p-5 text-center text-[#E4E4E4]">—</td>
                 <td className="p-5 text-center bg-[#FCECA4]/20 align-middle"><Check size={22} className="text-[#D6A848] mx-auto" strokeWidth={3}/></td>
                 <td className="p-5 text-center align-middle"><Check size={22} className="text-[#95C8CE] mx-auto" strokeWidth={3}/></td>
              </tr>
              <tr className="hover:bg-[#F9F9F9] transition-colors">
                 <td className="p-5">Priority Doctor Support</td>
                 <td className="p-5 text-center text-[#E4E4E4]">—</td>
                 <td className="p-5 text-center bg-[#FCECA4]/20 rounded-b-[16px] text-[#E4E4E4]">—</td>
                 <td className="p-5 text-center align-middle"><Check size={22} className="text-[#95C8CE] mx-auto" strokeWidth={3}/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CSR Therapy Support Section - Polished Blocks */}
      <div className="max-w-6xl mx-auto mb-20 mt-28 px-4">
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 w-max mx-auto px-6 py-2 rounded-full bg-white border border-[#E4E4E4] shadow-sm text-[#95C8CE] font-bold text-[12px] uppercase tracking-widest mb-6">
              <Heart size={14} fill="currentColor" /> CSR Initiative
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#333333] mb-5">
              Mental Health Support for Everyone
            </h2>
            <p className="text-lg text-[#333333] font-medium max-w-2xl mx-auto tracking-wide leading-relaxed mb-8">
              As part of our CSR initiative, we collaborate with organizations and professionals to provide therapy sessions for people in need.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
               <span className="px-5 py-2 bg-white border border-[#E4E4E4] shadow-sm rounded-full text-[#333333] font-bold text-sm tracking-wide">Teenagers</span> 
               <span className="px-5 py-2 bg-white border border-[#E4E4E4] shadow-sm rounded-full text-[#333333] font-bold text-sm tracking-wide">Working Professionals</span> 
               <span className="px-5 py-2 bg-white border border-[#E4E4E4] shadow-sm rounded-full text-[#333333] font-bold text-sm tracking-wide">Senior Citizens</span> 
               <span className="px-5 py-2 bg-white border border-[#E4E4E4] shadow-sm rounded-full text-[#333333] font-bold text-sm tracking-wide">Anyone in need</span> 
            </div>
          </div>

          {/* CSR Cards: Responsive Continuous Horizontal Line */}
          <div className="flex flex-row flex-nowrap overflow-x-auto lg:justify-center gap-4 mb-12 w-full snap-x pb-4 px-2">
            
            <div className="shrink-0 w-[260px] lg:flex-1 bg-white rounded-[20px] p-6 border border-[#E4E4E4] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-center snap-center">
              <div className="w-14 h-14 rounded-[14px] bg-[#98C3ED]/15 text-[#98C3ED] flex items-center justify-center mb-4 border border-[#E4E4E4]/50">
                 <Activity size={24} />
              </div>
              <h4 className="text-[16px] font-extrabold text-[#333333] tracking-wide mb-1.5">Teenagers</h4>
              <p className="text-[#333333] font-medium tracking-wide text-[13px] leading-relaxed">
                Exam stress & peer pressure.
              </p>
            </div>

            <div className="shrink-0 w-[260px] lg:flex-1 bg-white rounded-[20px] p-6 border border-[#E4E4E4] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-center snap-center">
              <div className="w-14 h-14 rounded-[14px] bg-[#FCECA4]/30 text-[#D6A848] flex items-center justify-center mb-4 border border-[#FCECA4]/30">
                 <ShieldCheck size={24} />
              </div>
              <h4 className="text-[16px] font-extrabold text-[#333333] tracking-wide mb-1.5">Employees</h4>
              <p className="text-[#333333] font-medium tracking-wide text-[13px] leading-relaxed">
                Work stress & productivity.
              </p>
            </div>

            <div className="shrink-0 w-[260px] lg:flex-1 bg-white rounded-[20px] p-6 border border-[#E4E4E4] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-center snap-center">
              <div className="w-14 h-14 rounded-[14px] bg-[#95C8CE]/15 text-[#95C8CE] flex items-center justify-center mb-4 border border-[#E4E4E4]/50">
                 <Star size={24} />
              </div>
              <h4 className="text-[16px] font-extrabold text-[#333333] tracking-wide mb-1.5">Seniors</h4>
              <p className="text-[#333333] font-medium tracking-wide text-[13px] leading-relaxed">
                Loneliness & life transitions.
              </p>
            </div>

            <div className="shrink-0 w-[260px] lg:flex-1 bg-white rounded-[20px] p-6 border border-[#E4E4E4] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-center snap-center">
              <div className="w-14 h-14 rounded-[14px] bg-[#E4E4E4]/40 text-[#333333] flex items-center justify-center mb-4 border border-[#E4E4E4]/50">
                 <BrainCircuit size={24} />
              </div>
              <h4 className="text-[16px] font-extrabold text-[#333333] tracking-wide mb-1.5">Open Support</h4>
              <p className="text-[#333333] font-medium tracking-wide text-[13px] leading-relaxed">
                Available for anyone in need.
              </p>
            </div>

          </div>

          {/* CSR Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 mt-8 w-full">
             <button className="whitespace-nowrap shrink-0 w-full sm:w-max px-10 py-4 rounded-[16px] bg-[#98C3ED] text-white font-semibold text-[16px] tracking-wider hover:-translate-y-1 shadow-sm hover:shadow-md transition-all duration-300 text-center">
               Request Therapy Support
             </button>
             <button className="whitespace-nowrap shrink-0 w-full sm:w-max px-10 py-4 rounded-[16px] bg-[#F5F5F7] border border-[#E4E4E4] text-[#747986] font-semibold text-[16px] tracking-wider hover:-translate-y-1 shadow-sm hover:shadow-md transition-all duration-300 text-center hover:bg-[#EAEAEA]">
               Volunteer for CSR
             </button>
          </div>
          
          <div className="text-center mt-10 border-t border-[#E4E4E4] pt-8 max-w-2xl mx-auto">
             <p className="text-[#333333] font-extrabold text-[15px] tracking-wide">
               Mental health professionals, counselors, and volunteers can join this initiative to help society.
             </p>
          </div>

      </div>

      {/* Trust Section - Moved to absolute End of Page */}
      <div className="text-center flex flex-col items-center justify-center px-4 mb-10 pb-10 mt-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8 text-[#333333] font-bold bg-white px-10 py-8 rounded-[24px] border border-[#E4E4E4] shadow-md tracking-wide hover:-translate-y-1 transition-transform cursor-default w-full max-w-4xl">
           <div className="bg-[#95C8CE]/15 p-5 rounded-full text-[#95C8CE] shrink-0 border border-[#95C8CE]/20">
             <Lock size={32} />
           </div>
           <div className="text-center md:text-left">
             <div className="text-2xl mb-2 text-[#333333] font-extrabold tracking-wide">Your mental health data is encrypted and secure.</div>
             <div className="text-[#333333] text-lg font-bold">We never share data without permission.</div>
           </div>
        </div>
      </div>

    </div>
  )
}
