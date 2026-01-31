
import React from 'react';

export interface SongInfo {
  title: string;
  artist: string;
}

export enum PlayerStatus {
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  LOADING = 'LOADING',
  ERROR = 'ERROR'
}

export interface NavigationLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  isExternal?: boolean;
}