
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Play, Square, Volume2, Share2, MessageCircle, Phone, Globe, Music, Info, Home } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { RADIO_CONFIG, COLORS } from './constants';
import { PlayerStatus, SongInfo } from './types';

// Components
import Sidebar from './components/Sidebar';
import AudioPlayer from './components/AudioPlayer';
import Hero from './components/Hero';
import MetadataDisplay from './components/MetadataDisplay';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>(PlayerStatus.PAUSED);
  const [songInfo, setSongInfo] = useState<SongInfo>({ 
    title: "Direct Live", 
    artist: "HAMANIEH FLASH" 
  });
  const [dailyQuote, setDailyQuote] = useState<string>("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Donne-moi une courte citation très courte (max 10 mots) inspirante sur l'information et la vérité. En français.",
          config: { temperature: 0.7 }
        });
        setDailyQuote(response.text || "L'actualité sous un autre angle !!!");
      } catch (err) {
        setDailyQuote("L'actualité sous un autre angle !!!");
      }
    };
    fetchQuote();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#000033]">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full bg-blue-600 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full bg-red-600 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-40 flex items-center justify-between p-4 bg-black/20 backdrop-blur-xl border-b border-white/5">
        <button 
          onClick={toggleSidebar}
          className="p-3 text-white hover:bg-white/5 rounded-2xl transition-all active:scale-90"
        >
          {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
        
        <div className="flex items-center gap-1 font-black italic text-xs tracking-tighter">
           <span className="text-red-500">HAMANIEH</span>
           <span className="text-blue-500">FLASH</span>
        </div>

        <button 
          onClick={() => window.open(RADIO_CONFIG.FACEBOOK, '_blank')}
          className="p-3 text-blue-400 hover:bg-blue-400/10 rounded-2xl transition-all"
        >
          <Share2 size={22} />
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col overflow-y-auto pb-24">
        <Hero 
          playerStatus={playerStatus} 
          setPlayerStatus={setPlayerStatus}
          dailyQuote={dailyQuote}
        />
        
        <MetadataDisplay 
          songInfo={songInfo} 
          playerStatus={playerStatus} 
        />

        <div className="px-6 py-4 grid grid-cols-2 gap-4">
           <a 
            href={`https://wa.me/${RADIO_CONFIG.WHATSAPP}`}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] bg-green-600/10 border border-green-600/20 text-green-500 hover:bg-green-600/20 transition-all active:scale-95 shadow-xl"
          >
            <div className="bg-green-600 text-white p-3 rounded-2xl shadow-lg shadow-green-600/30">
              <MessageCircle size={24} />
            </div>
            <span className="font-bold text-xs uppercase tracking-widest">WhatsApp</span>
          </a>
          <a 
            href={`tel:${RADIO_CONFIG.PHONE}`}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] bg-blue-600/10 border border-blue-600/20 text-blue-500 hover:bg-blue-600/20 transition-all active:scale-95 shadow-xl"
          >
            <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-600/30">
              <Phone size={24} />
            </div>
            <span className="font-bold text-xs uppercase tracking-widest">Studio</span>
          </a>
        </div>

        <div className="px-6 py-4">
           <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-sm flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold mb-1 italic">Suivez le direct</h4>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">Disponible 24h/24 & 7j/7</p>
              </div>
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-[#000033] bg-gradient-to-tr from-blue-600 to-red-600" />
                 ))}
              </div>
           </div>
        </div>
      </main>

      {/* Bottom Sticky Player */}
      <AudioPlayer 
        status={playerStatus} 
        setStatus={setPlayerStatus}
        streamUrl={RADIO_CONFIG.STREAM_URL}
      />

      {/* Sidebar Overlay */}
      <Sidebar isOpen={isSidebarOpen} close={toggleSidebar} />
    </div>
  );
};

export default App;
