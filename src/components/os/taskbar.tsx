'use client';

import React, { useState, useEffect } from 'react';
import { useOS } from './os-context';
import { Wifi, Volume2, Grid2x2 } from 'lucide-react';
export function Taskbar() {
  const { state, dispatch } = useOS();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const openWindows = state.windows.filter((w) => w.isOpen);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#2b2b2b] flex items-center justify-between px-2 z-[9999] overflow-visible">
      
      {/* SVG Filter Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="taskbar-fire-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.015 0.08" 
              numOctaves={6}
              result="turbulence" 
              seed={1}
            >
              <animate 
                attributeName="seed" 
                from="1" 
                to="100" 
                dur="3s" 
                repeatCount="indefinite"
              />
            </feTurbulence>
            
            <feDisplacementMap 
              in2="turbulence" 
              in="SourceGraphic" 
              scale={15}
              xChannelSelector="R" 
              yChannelSelector="G"
            />
            
            <feColorMatrix 
              type="matrix" 
              values="1.5 0 0 0 0  0.8 0.5 0 0 0  0 0 0.2 0 0  0 0 0 1 0"
            />
          </filter>
          
          <linearGradient id="taskbar-fire-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#ffff00', stopOpacity: 0.9 }}>
              <animate 
                attributeName="stop-color" 
                values="#ffff00;#ffaa00;#ffff00" 
                dur="1.5s" 
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" style={{ stopColor: '#ff6b00', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ff0000', stopOpacity: 0.9 }}>
              <animate 
                attributeName="stop-color" 
                values="#ff0000;#ff3300;#ff0000" 
                dur="1.5s" 
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
      </svg>

      {/* Fire Border Overlay */}
      <svg 
        className="absolute left-0 right-0 pointer-events-none" 
        style={{ 
          top: '-3px',
          height: '8px',
          width: '100%',
          overflow: 'visible'
        }}
        preserveAspectRatio="none"
        viewBox="0 0 1000 10"
      >
        <line 
          x1="0" 
          y1="5" 
          x2="1000" 
          y2="5" 
          stroke="url(#taskbar-fire-gradient)" 
          strokeWidth="5" 
          filter="url(#taskbar-fire-filter)"
        />
      </svg>

      {/* LEFT AREA */}
      <div className="flex items-center gap-1">

        {/* START BUTTON */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_START_MENU' })}
          className={`h-10 w-12 flex items-center justify-center hover:bg-white/10 transition ${
            state.startMenuOpen ? 'bg-white/10' : ''
          }`}
        >
          <Grid2x2 size={20} className="text-white" />
        </button>

        <div className="flex items-center ml-1">

          {openWindows.map((window) => (
            <button
              key={window.id}
              onClick={() => {
                if (window.isMinimized) {
                  dispatch({ type: 'MINIMIZE_WINDOW', payload: window.id });
                } else {
                  dispatch({ type: 'FOCUS_WINDOW', payload: window.id });
                }
              }}
              className={`relative h-10 w-12 flex items-center justify-center hover:bg-white/10 transition`}
              title={window.title}
            >

              <span className="text-lg">{window.icon}</span>

              {/* ACTIVE INDICATOR */}
              {!window.isMinimized && (
                <div className="absolute bottom-0 w-6 h-[3px] bg-[#0078d4] rounded"></div>
              )}

            </button>
          ))}

        </div>

      </div>

      {/* RIGHT AREA */}
      <div className="flex items-center gap-2 text-white/80 text-sm">

        <button className="h-10 w-10 flex items-center justify-center hover:bg-white/10">
          <Wifi size={16} />
        </button>

        <button className="h-10 w-10 flex items-center justify-center hover:bg-white/10">
          <Volume2 size={16} />
        </button>

        {/* CLOCK */}
        <div className="px-3 text-xs leading-tight text-right">
          <div>{time}</div>
        </div>

      </div>

    </div>
  );
}