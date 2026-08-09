// Dock.jsx - macOS Launch Dock
import React from 'react';
import { Bot, Briefcase, FileText, Terminal } from 'lucide-react';

export default function Dock({ openApps, activeAppId, onToggleApp }) {
  const dockItems = [
    { id: 'hireme', label: 'HireMeAI', icon: Bot, gradient: 'linear-gradient(135deg, #6366f1, #3b82f6)' },
    { id: 'projects', label: 'Projects', icon: Briefcase, gradient: 'linear-gradient(135deg, #10b981, #059669)' },
    { id: 'resume', label: 'Resume', icon: FileText, gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    { id: 'terminal', label: 'Terminal', icon: Terminal, gradient: 'linear-gradient(135deg, #374151, #111827)' }
  ];

  return (
    <div className="mac-dock-container">
      <div className="mac-dock">
        {dockItems.map((item) => {
          const IconComp = item.icon;
          const isOpen = openApps.includes(item.id);
          const isActive = activeAppId === item.id;

          return (
            <div key={item.id} className="dock-item-wrapper">
              <button
                className={`dock-item ${isActive ? 'active' : ''}`}
                style={{ background: item.gradient }}
                onClick={() => onToggleApp(item.id)}
                title={item.label}
              >
                <IconComp size={24} color="#ffffff" />
              </button>
              {isOpen && <div className="dock-dot" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
