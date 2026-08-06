import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

const FAQ_RESPONSES = [
  {
    keywords: ['harga', 'paket', 'biaya'],
    response: 'Paket jasa kami dimulai dari Rp 750.000 untuk Landing Page UMKM, Rp 1.500.000 untuk Website Skripsi/Business lengkap, dan paket Custom Enterprise.'
  },
  {
    keywords: ['template', 'lisensi', 'download'],
    response: 'Setelah pembayaran sukses, file ZIP template dan License Key dapat diunduh secara instan melalui Dashboard Akun Anda di menu Downloads!'
  },
  {
    keywords: ['skripsi', 'mahasiswa', 'tugas'],
    response: 'Paket Mahasiswa mencakup pendampingan penjelasan alur koding, arsitektur database, dan revisi gratis hingga ujian sidang Anda ACC!'
  },
  {
    keywords: ['admin', 'hubungkan', 'live chat', 'operator'],
    response: 'Pesan Anda telah diteruskan ke Konsol Admin Live Chat. Customer Support WebCraft akan segera membalas obrolan Anda!'
  }
];

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('webcraft_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        sender: 'bot',
        senderName: 'WebCraft AI Bot',
        text: 'Halo! Selamat datang di WebCraft Marketplace & Agency. Ada yang bisa kami bantu mengenai jasa website atau template?',
        time: 'Just now'
      }
    ];
  });

  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('webcraft_messages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text, senderUser = null) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      senderName: senderUser?.name || 'Visitor',
      text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);

    // Check AI bot auto-response
    const lowerText = text.toLowerCase();
    const match = FAQ_RESPONSES.find(item =>
      item.keywords.some(kw => lowerText.includes(kw))
    );

    setTimeout(() => {
      if (match) {
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          senderName: 'WebCraft AI Bot',
          text: match.response,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          senderName: 'WebCraft AI Bot',
          text: 'Terima kasih atas pesan Anda! Tim Admin Live Chat WebCraft telah menerima notifikasi dan akan membalas segera.',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      }
    }, 800);
  };

  const sendAdminReply = (replyText) => {
    const adminMsg = {
      id: Date.now(),
      sender: 'admin',
      senderName: 'WebCraft Support Admin',
      text: replyText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, adminMsg]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isChatOpen,
        setIsChatOpen,
        sendMessage,
        sendAdminReply
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
