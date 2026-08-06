import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';

export default function AdminChatConsole() {
  const { messages, sendAdminReply } = useChat();
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    sendAdminReply(replyText);
    setReplyText('');
  };

  return (
    <div className="section-padding space-y-10">
      <div className="container space-y-8">
        <div className="section-header space-y-2">
          <span className="section-tag">Admin Customer Support</span>
          <h1 className="section-title">Konsol Real-Time Live Chat Admin</h1>
          <p className="section-subtitle">Balas obrolan dan pertanyaan pengunjung serta klien secara real-time.</p>
        </div>

        <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-6 max-w-3xl mx-auto h-[600px] flex flex-col">
          <div className="border-b border-white/10 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block animate-ping"></span>
              <h3 className="text-sm font-bold text-white">Live Support Queue ({messages.length} Pesan)</h3>
            </div>
            <span className="text-xs text-accentCyan font-bold">Admin Status: Online</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-slate-950/60 rounded-2xl border border-white/10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-slate-400 px-1 mb-0.5">{msg.senderName} • {msg.time}</span>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'admin'
                      ? 'bg-purple-600 text-white font-bold rounded-tr-none'
                      : msg.sender === 'user'
                      ? 'bg-accentCyan text-black font-bold rounded-tl-none'
                      : 'bg-slate-800 text-slate-100 border border-white/10 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleReplySubmit} className="flex gap-3">
            <input
              type="text"
              placeholder="Balas pesan sebagai Support Admin..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accentCyan"
              required
            />
            <button type="submit" className="btn btn-primary btn-glow px-6 py-3 font-bold text-xs">
              <i className="fa-solid fa-paper-plane"></i> Balas Chat
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
