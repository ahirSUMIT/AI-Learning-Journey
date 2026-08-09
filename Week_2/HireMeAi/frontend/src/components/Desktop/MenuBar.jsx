// MenuBar.jsx - macOS style top menu bar with live clock
import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Search, Command } from 'lucide-react';

export default function MenuBar({ activeAppTitle = 'HireMeAI' }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      setTime(now.toLocaleDateString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="mac-menubar">
      <div className="menubar-left">
        <span className="apple-logo"></span>
        <span className="active-app-name">{activeAppTitle}</span>
        <span className="menubar-item">File</span>
        <span className="menubar-item">Edit</span>
        <span className="menubar-item">View</span>
        <span className="menubar-item">Window</span>
        <span className="menubar-item">Help</span>
      </div>
      <div className="menubar-right">
        <span className="menubar-icon"><Wifi size={14} /></span>
        <span className="menubar-icon"><Battery size={16} /></span>
        <span className="menubar-icon"><Search size={14} /></span>
        <span className="clock-display">{time}</span>
      </div>
    </header>
  );
}
