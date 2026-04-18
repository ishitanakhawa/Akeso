import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, User, CheckCircle2, AlertCircle, Globe, Search, MapPin, Filter, Loader2 } from 'lucide-react';
import api from '../api/axios';

export default function PsychiatristConnect() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          navigate('/login');
          return;
        }
        const res = await api.get('/doctors');
        // Map backend response to UI structure if necessary
        const mapped = res.data.map(d => ({
          ...d,
          avatarInitials: (d.name || 'Dr').split(' ').map(n => n[0]).join(''),
          status: 'Available', // Mocking status logic since it depends on live connection
          statusColor: 'text-green-500',
          statusBg: 'bg-green-50',
          statusIcon: <CheckCircle2 size={14} />,
          rating: (4.5 + Math.random() * 0.5).toFixed(1),
          location: d.location || 'Remote'
        }));
        setDoctors(mapped);
      } catch (err) {
        console.error('Failed to load doctors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc => {
    const name = doc?.name || '';
    const spec = doc?.specialization || '';
    const loc = doc?.location || '';
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          spec.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'All Locations' || loc.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const locations = ['All Locations', 'New Delhi', 'Mumbai', 'Bangalore', 'Hyderabad'];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#98C3ED]" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in-up pb-20 w-full">
      <header className="text-center max-w-3xl mx-auto pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#333333] mb-4">
          Connect with Mental Health Professionals
        </h1>
        <p className="text-[#333333]/70 font-medium text-lg leading-relaxed">
          Choose a psychiatrist to share your AI emotional insights and get professional guidance tailored to your mindset patterns.
        </p>
      </header>

      {/* SEARCH & FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto w-full items-center justify-center bg-white p-4 rounded-[22px] border border-[#E4E4E4] shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333333]/40" size={20} />
          <input 
            type="text" 
            placeholder="Search doctors by name or specialty..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-[#F9F9F9] border-none rounded-[16px] focus:ring-2 focus:ring-[#98C3ED] font-medium text-[#333333] transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-56">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333333]/40" size={18} />
            <select 
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-12 pr-10 py-4 bg-[#F9F9F9] border-none rounded-[16px] focus:ring-2 focus:ring-[#98C3ED] font-bold text-[#333333] appearance-none cursor-pointer"
            >
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => (
            <div 
              key={doc.id}
              onClick={() => navigate(`/psychiatrist/${doc.id}`)}
              className="card bg-white p-6 border border-[#E4E4E4] hover:border-[#98C3ED] hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              {/* Header: Avatar & Status */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-20 h-20 bg-[#F9F9F9] rounded-full border-2 border-[#E4E4E4] flex items-center justify-center shadow-inner group-hover:border-[#98C3ED] transition-colors">
                  <span className="text-2xl font-black text-[#333333]">{doc.avatarInitials}</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${doc.statusBg} ${doc.statusColor} border border-current`}>
                  {doc.statusIcon}
                  {doc.status}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black text-[#333333] tracking-tight">{doc.name}</h3>
                  <div className="flex items-center gap-1 text-[#D6A848]">
                    <Star size={16} fill="currentColor" />
                    <span className="font-bold text-sm">{doc.rating}</span>
                  </div>
                </div>
                <p className="text-[#95C8CE] font-bold text-sm uppercase tracking-wide">
                  {doc.specialization}
                </p>
                
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-[#333333]/60 font-medium text-sm">
                    <Clock size={16} />
                    <span>{doc.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#333333]/60 font-medium text-sm">
                    <MapPin size={16} />
                    <span>{doc.location}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full mt-8 py-4 bg-[#98C3ED]/10 text-[#98C3ED] rounded-[14px] font-bold text-lg hover:bg-[#98C3ED] hover:text-white transition-all shadow-sm">
                View Dashboard
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/50 border-2 border-dashed border-[#E4E4E4] rounded-[32px] max-w-4xl mx-auto w-full">
           <User className="mx-auto text-[#E4E4E4] mb-4" size={48} />
           <p className="text-2xl font-bold text-[#333333]">No practitioners found matching your criteria.</p>
           <button 
             onClick={() => { setSearchTerm(''); setLocationFilter('All Locations'); }}
             className="mt-4 text-[#98C3ED] font-bold underline cursor-pointer"
           >
             Clear all filters
           </button>
        </div>
      )}

      {/* Bottom Info Section */}
      <div className="card bg-[#F9F9F9] border-dashed border-[#E4E4E4] p-10 text-center max-w-4xl mx-auto">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <User className="text-[#95C8CE]" size={24} />
        </div>
        <h4 className="text-xl font-bold text-[#333333] mb-2">Don't see your provider?</h4>
        <p className="text-[#333333]/60 font-medium">
          You can securely share your clinical AI reports with any professional by downloading them from the <span className="font-bold text-[#98C3ED]">Reports</span> tab.
        </p>
      </div>
    </div>
  );
}
