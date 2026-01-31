
import React from 'react';
import { Home, Mail, Phone, Facebook, Info, Music2 } from 'lucide-react';

export const COLORS = {
  NAVY: '#000033',
  RED: '#CC0000',
  BLUE: '#0055FF',
  GOLD: '#D4AF37',
  GOLD_LIGHT: '#F9D71C'
};

export const RADIO_CONFIG = {
  NAME: 'HAMANIEH FLASH',
  // Le logo est retiré pour éviter les problèmes d'affichage d'images externes
  STREAM_URL: 'https://ecmanager5.pro-fhi.net:2860/zggshqmg/1/stream',
  STREAM_URL_ALT: 'http://ecmanager5.pro-fhi.net:2870/;?type=http&nocache=1769866646',
  WHATSAPP: '+2250757443661',
  PHONE: '+2250757443661',
  EMAIL: 'hamaniehflashnet@gmail.com',
  FACEBOOK: 'https://www.facebook.com/hamaniehflash',
  TIKTOK: 'https://www.tiktok.com/@hamaniehflashnet?_r=1&_t=ZS-93SBAJJdF5B',
  HERO_IMAGE: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
};

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: RADIO_CONFIG.FACEBOOK, icon: <Facebook className="w-5 h-5" /> },
];
