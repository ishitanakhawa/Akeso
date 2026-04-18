import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function CoachChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey Alex! I'm your AI Energy Coach. How are you feeling today? Any specific challenges ahead?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      let responseText = "I'm here to support you! Remember to take things one step at a time.";
      const lower = userMsg.text.toLowerCase();
      
      if (lower.includes('tired') || lower.includes('exhausted')) {
        responseText = "It sounds like you really need to recharge. Pushing through exhaustion often leads to burnout. Can you schedule a short nap or step away from your tasks for 30 minutes?";
      } else if (lower.includes('exam') || lower.includes('test') || lower.includes('interview')) {
        responseText = "Big moments can be stressful! Remember, your brain needs rest to perform well. Break your study prep into blocks and protect your sleep tonight. You've got this!";
      } else if (lower.includes('stressed') || lower.includes('anxious')) {
        responseText = "I hear you. Stress is a major energy drainer. Try to do a physically calming activity like a 10-minute walk outside or a quick breathing exercise right now. Is there one small thing you can take off your plate today?";
      }

      setMessages(prev => [...prev, { id: Date.now(), text: responseText, sender: 'ai' }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto -mt-4 sm:mt-0 p-2 sm:p-0">
      <header className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">AI Coach</h1>
        <p className="text-slate-500 font-light mt-1">Get personalized guidance based on your energy.</p>
      </header>

      <div className="flex-1 card flex flex-col p-0 overflow-hidden border border-indigo-50/80 shadow-float h-[60vh] sm:h-auto">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'ai' ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'}`}>
                {msg.sender === 'ai' ? <Bot size={18} /> : <User size={18} />}
              </div>
              <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                msg.sender === 'ai' 
                  ? 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm' 
                  : 'bg-primary text-white rounded-tr-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for advice..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-all text-slate-700"
            />
            <button 
              type="submit" 
              className={`absolute right-2 p-2.5 rounded-full transition-all ${
                input.trim() ? 'bg-primary text-white shadow-md hover:bg-primary-dark' : 'bg-slate-200 text-slate-400'
              }`}
            >
              <Send size={18} className={input.trim() ? "ml-0.5" : ""} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
