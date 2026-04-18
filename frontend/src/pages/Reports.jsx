import React, { useState } from 'react';
import { Download, Link as LinkIcon, Mail, ShieldCheck, HeartPulse, Activity, Loader2 } from 'lucide-react';
import api from '../api/axios';

export default function Reports() {
  const [emailLoading, setEmailLoading] = useState(false);

  const downloadPDF = () => {
    const element = document.getElementById('report-content');
    const opt = {
      margin: [10, 10],
      filename: 'Akeso_Psychiatrist_Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  };

  const shareReport = async () => {
    const shareData = {
      title: 'Akeso Mental Health Report',
      text: 'AI generated emotional health report.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Report link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const emailReport = async () => {
    const email = prompt("Enter psychiatrist's email:");
    if (!email) return;

    setEmailLoading(true);
    try {
      await api.post('/send-report-email', { email });
      alert('Report sent successfully');
    } catch (err) {
      console.error('Failed to send email:', err);
      alert('Failed to send report email.');
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-10 w-full max-w-4xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4 p-1">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#333333]">Psychiatrist Report</h1>
          <p className="text-[#333333] font-medium mt-2 text-lg flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#95C8CE]" /> End-to-end encrypted for your provider.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={shareReport}
            title="Share Report"
            className="p-3 bg-[#98C3ED]/10 text-[#747986] rounded-xl hover:bg-[#98C3ED] hover:text-white shadow-sm transition-all border border-[#98C3ED]/20"
          >
            <LinkIcon size={20} />
          </button>
          <button 
            onClick={emailReport}
            title="Email Report"
            disabled={emailLoading}
            className="p-3 bg-[#98C3ED]/10 text-[#747986] rounded-xl hover:bg-[#98C3ED] hover:text-white shadow-sm transition-all border border-[#98C3ED]/20 disabled:opacity-50"
          >
            {emailLoading ? <Loader2 size={20} className="animate-spin" /> : <Mail size={20} />}
          </button>
          <button 
            onClick={downloadPDF}
            className="bg-[#98C3ED] text-white flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-[#7FB0DA] shadow-md transition-all font-bold"
          >
            <Download size={20} /> PDF
          </button>
        </div>
      </header>

      {/* Actual Report Layout */}
      <div id="report-content" className="card space-y-10 border-[#E4E4E4] bg-white p-10 rounded-[18px]">
        
        {/* Header of Report */}
        <div className="border-b border-[#E4E4E4] pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-[#333333] mb-1">Emotional health summary</h2>
              <p className="text-[#333333] font-medium">Akeso AI Generation</p>
            </div>
            <div className="bg-[#98C3ED]/10 text-[#98C3ED] px-4 py-1.5 rounded-lg font-bold text-sm">Strictly Confidential</div>
          </div>
        </div>
        
        {/* Risk Flags */}
        <div>
          <h3 className="font-bold text-[#333333] uppercase text-sm tracking-widest mb-4">Section 7: Risk Flags</h3>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-[#F9F9F9] text-[#333333] rounded-xl font-bold text-sm opacity-60">Low Risk</div>
            <div className="px-4 py-2 bg-[#FCECA4]/40 border border-[#FCECA4]/60 text-[#D6A848] rounded-xl font-bold text-sm flex items-center gap-2"><Activity size={16}/> Moderate Stress Risk</div>
            <div className="px-4 py-2 bg-[#F9F9F9] text-[#333333] rounded-xl font-bold text-sm opacity-60">Burnout Warning</div>
            <div className="px-4 py-2 bg-[#F9F9F9] text-[#333333] rounded-xl font-bold text-sm opacity-60">Emotional Instability</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ReportSection title="1. Emotional Pattern Summary">
            Stable base mood lines (avg 7.2/10), interspersed with moderate anxiety peaks during work hours.
          </ReportSection>
          
          <ReportSection title="2. Sleep Pattern Observations">
            Average duration: 6.8 hours. Quality variance is high. Fragmented rest cycles correlate &gt;80% with days where screen time exceeds 4 hours post 8:00 PM.
          </ReportSection>

          <ReportSection title="3. Stress Trigger Indicators">
            High workload intervals directly generate self-reported stress spikes. Consecutive screen time is the primary stress catalyst.
          </ReportSection>

          <ReportSection title="4. Anxiety Signals">
            Mild anxiety signals reported following sleep deprivation windows (sleep &lt; 6 hours).
          </ReportSection>

          <ReportSection title="5. Energy Fluctuation Insights">
            Mental fatigue crashes occur consistently between 2:00 PM and 3:30 PM.
          </ReportSection>

          <ReportSection title="6. Lifestyle Behavior Analysis">
            Physical activity acts as a direct counterbalance to anxiety symptoms (40% reduction observed). Low social interaction triggers emotional decline.
          </ReportSection>
        </div>

        {/* Section 8: Discussion Areas */}
        <div className="pt-6 border-t border-[#E4E4E4]">
           <h3 className="font-bold text-[#333333] text-lg mb-4 flex items-center gap-2">
            <HeartPulse className="text-[#95C8CE]" /> Section 8: Discussion areas for psychiatrist
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-[#95C8CE]/10 rounded-2xl border border-[#95C8CE]/20">
              <span className="font-bold text-[#95C8CE]">Stress Management</span>
              <p className="text-sm text-[#333333] mt-1 font-medium">Discuss specific work buffers.</p>
            </div>
            <div className="p-4 bg-[#98C3ED]/10 rounded-2xl border border-[#98C3ED]/20">
              <span className="font-bold text-[#98C3ED]">Sleep Improvement</span>
              <p className="text-sm text-[#333333] mt-1 font-medium">Establish screen curfews.</p>
            </div>
             <div className="p-4 bg-[#FCECA4]/30 rounded-2xl border border-[#FCECA4]/60">
              <span className="font-bold text-[#D6A848]">Burnout Prevention</span>
              <p className="text-sm text-[#333333] mt-1 font-medium">Intervene against afternoon fatigue.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ReportSection({ title, children }) {
  return (
    <div>
      <h3 className="font-bold text-[#333333] mb-2">{title}</h3>
      <p className="text-[#333333] font-medium leading-relaxed bg-[#F9F9F9] border border-[#E4E4E4] p-4 rounded-xl text-[15px]">
        {children}
      </p>
    </div>
  )
}
