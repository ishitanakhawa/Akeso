import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, TrendingUp, AlertOctagon, ArrowLeft, Loader2 } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import api from '../api/axios';

export default function DoctorDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get(`/doctor/${id || 1}`);
        setData(res.data);
      } catch (err) {
        console.error('Failed to load doctor dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#98C3ED]" size={48} />
      </div>
    );
  }

  const miniChartData = [
    { val: 40 }, { val: 50 }, { val: 45 }, { val: 60 }, { val: 75 }, { val: 80 }
  ];

  // Map backend patients to UI structure
  const patients = data?.patients.map((p, idx) => ({
    name: p.name,
    status: p.status,
    insight: p.insight || "AI behavioral tracking in progress. Pattern detection pending more samples.",
    trend: idx === 1 ? [{val:80},{val:60},{val:55},{val:40},{val:30},{val:25}] : 
           idx === 2 ? [{val:30},{val:45},{val:60},{val:70},{val:85},{val:90}] : miniChartData,
    bg: p.status === 'Burnout Risk' ? "bg-[#FCECA4]" : p.status === 'Improving' ? "bg-[#95C8CE]/20" : "bg-[#FCECA4]/30",
    textColor: p.status === 'Improving' ? "text-[#95C8CE]" : "text-[#D6A848]"
  })) || [];

  return (
    <div className="space-y-8 animate-fade-in-up pb-10 w-full">
      <header className="mb-4 pt-4 flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-[#E4E4E4] pb-8">
        <div>
          <button 
            onClick={() => navigate('/psychiatrist')}
            className="flex items-center gap-2 text-[#333333] hover:text-[#98C3ED] transition-colors mb-4 font-bold text-sm"
          >
            <ArrowLeft size={16} /> Back to Directory
          </button>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#333333]">Psychiatrist Dashboard</h1>
          <p className="text-[#333333] font-medium mt-2 text-lg uppercase tracking-wide">
            Dr. {id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Harrison'} • 4 Active Patient Alerts
          </p>
        </div>
      </header>

      {/* Provider Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatWidget label="Patients Monitored" value={data?.patients_monitored || "0"} icon={<Users className="text-[#98C3ED]"/>} />
        <StatWidget label="Burnout Warnings" value={data?.burnout_alerts || "0"} icon={<AlertOctagon className="text-[#D6A848]"/>} alert />
        <StatWidget label="Improving Trends" value={data?.improving_trends || "0"} icon={<TrendingUp className="text-[#95C8CE]"/>} />
      </div>

      {/* Patient List */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-[#333333]">Priority Case Review</h2>
        </div>

        <div className="space-y-4">
          {patients.map((patient, idx) => (
            <PatientReviewRow key={idx} {...patient} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatWidget({ label, value, icon, alert }) {
  return (
    <div className={`card flex flex-col justify-between p-7 ${alert ? 'border-[#FCECA4] border-2 ring-4 ring-[#FCECA4]/10 bg-white' : 'border-[#E4E4E4] bg-white'}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center ${alert ? 'bg-[#FCECA4]/30' : 'bg-[#F9F9F9] border border-[#E4E4E4]'}`}>
          {React.cloneElement(icon, { size: 28 })}
        </div>
      </div>
      <div>
        <p className="text-4xl font-black text-[#333333] tracking-tighter">{value}</p>
        <p className="text-sm font-bold text-[#333333] mt-2 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  )
}

function PatientReviewRow({ name, status, insight, trend, bg, textColor }) {
  return (
    <div className="card !p-6 flex flex-col md:flex-row items-center gap-6 border-[#E4E4E4] bg-white hover:border-[#98C3ED] shadow-sm hover:shadow-md transition-all group">
      
      <div className="w-16 h-16 bg-[#F9F9F9] rounded-full flex items-center justify-center shrink-0 border border-[#E4E4E4] shadow-inner">
        <span className="font-extrabold text-[#333333] text-xl">{name.charAt(0)}</span>
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
          <h3 className="font-black text-2xl text-[#333333]">{name}</h3>
          <span className={`px-4 py-1.5 rounded-[12px] text-xs font-bold uppercase tracking-wider ${bg} ${textColor} border border-current opacity-80`}>
            {status}
          </span>
        </div>
        <p className="text-[15px] font-medium text-[#333333]/70 leading-relaxed max-w-2xl">{insight}</p>
      </div>

      <div className="w-36 h-14 md:mr-8 opacity-60 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trend}>
            <Area type="monotone" dataKey="val" strokeWidth={3} stroke="#98C3ED" fill="#98C3ED" fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
