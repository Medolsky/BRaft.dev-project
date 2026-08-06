import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';

export default function ChatWidget() {
  const { messages, isChatOpen, setIsChatOpen, sendMessage } = useChat();
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText, user);
    setInputText('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      <button
        type="button"
        className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-2xl flex items-center justify-center text-2xl hover:scale-110 transition-transform relative group"
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Live Chat Support"
      >
        <i className={`fa-solid ${isChatOpen ? 'fa-xmark' : 'fa-headset'}`}></i>
        {!isChatOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-slate-900 rounded-full animate-ping"></span>
        )}
      </button>

      {/* Chat Window Container */}
      {isChatOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[460px] animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-slate-800/90 border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accentCyan/20 text-accentCyan flex items-center justify-center text-lg font-bold">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">WebCraft Live Chat & AI</h4>
                <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> Online • Respon Cepat
                </p>
              </div>
            </div>
            <button
              type="button"
              className="text-slate-400 hover:text-white text-lg p-1"
              onClick={() => setIsChatOpen(false)}
            >
              &times;
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-slate-400 px-1 mb-0.5">{msg.senderName} • {msg.time}</span>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-accentCyan text-black font-semibold rounded-tr-none'
                      : msg.sender === 'admin'
                      ? 'bg-purple-600 text-white font-semibold rounded-tl-none'
                      : 'bg-slate-800 text-slate-100 border border-white/10 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick FAQ Chips */}
          <div className="px-3 py-2 bg-slate-900 border-t border-white/10 flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              type="button"
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-full text-slate-300 whitespace-nowrap"
              onClick={() => sendMessage('Berapa harga paket jasa website?')}
            >
              💰 Harga Jasa
            </button>
            <button
              type="button"
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-full text-slate-300 whitespace-nowrap"
              onClick={() => sendMessage('Bagaimana cara download template?')}
            >
              📦 Download Template
            </button>
            <button
              type="button"
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-full text-slate-300 whitespace-nowrap"
              onClick={() => sendMessage('Hubungkan ke Admin')}
            >
              👨‍💻 Hubungkan Admin
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder="Ketik pesan Anda..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accentCyan"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-accentCyan text-black font-bold rounded-xl text-xs hover:scale-105 transition-transform"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
