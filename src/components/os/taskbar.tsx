'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useOS } from './os-context';
import { Wifi, Volume2, Grid2x2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image, { StaticImageData } from 'next/image';
import WindowLogo from '../../assets/Window-Logo.png';

// Lazy load FluidFire component
const FluidFire = dynamic(() => import('../ui/fluid-fire').then(mod => mod.FluidFire), {
  ssr: false,
  loading: () => <div className="w-full h-full" />
});

export function Taskbar() {
  const { state, dispatch } = useOS();
  const [time, setTime] = useState('');
  const [fireWidth, setFireWidth] = useState(800);
  const [isMounted, setIsMounted] = useState(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y?: number;
    bottom?: number;
  }>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateFireWidth = () => {
      const width = window.innerWidth > 2560
        ? 800
        : window.innerWidth / 1.8;
      setFireWidth(width);
    };

    updateFireWidth();
    setIsMounted(true);

    window.addEventListener('resize', updateFireWidth);
    return () => window.removeEventListener('resize', updateFireWidth);
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenuOpen(false);
      }
    };

    if (contextMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenuOpen]);

  const handleCloseAllWindows = () => {
    // Đóng tất cả windows đang mở
    state.windows
      .filter((w) => w.isOpen)
      .forEach((window) => {
        dispatch({ type: 'CLOSE_WINDOW', payload: window.id });
      });

    setContextMenuOpen(false);
  };

  const openWindows = state.windows.filter((w) => w.isOpen);

  const config = {
    config: {
      width: fireWidth,
      height: 35,
      fps: 30,
      gridResolution: fireWidth < 400 ? 8000 : 18000,
      gravity: 0.0,
      burningFloor: true,
      burningObstacle: false,
      floorShape: 'bottom',
      floorThickness: 1,
      floorCurve: 0,
      colorScheme: 'black',
      showSwirls: false,
      swirlProbability: 25,
    },
    style: {
      canvas: {
        border: 'none',
        borderRadius: '0px',
        overflow: 'hidden',
      },
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    const menuWidth = 280;
    const menuHeight = 200;
    const taskbarHeight = 48;

    let x = e.clientX;
    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10;
    }

    const distanceFromBottom = window.innerHeight - e.clientY;

    if (distanceFromBottom < menuHeight + taskbarHeight) {
      setMenuPosition({
        x,
        bottom: window.innerHeight - e.clientY,
      });
    } else {
      setMenuPosition({
        x,
        y: e.clientY,
      });
    }

    setContextMenuOpen(true);
  };

  return (
    <>
      {/* Fire Effect Container */}
      <div
        className="fixed left-0 right-0 pointer-events-none z-[1] bg-transparent"
        style={{
          bottom: '0px',
          height: '63px',
          width: '100%',
        }}
      >
        {isMounted && (
          <div style={{
            width: '100%',
            height: '100%',
          }}>
            <FluidFire
              {...config.config}
              interactive={false}
              backgroundColor='transparent'
              style={config.style.canvas}
            />
          </div>
        )}
      </div>

      {/* Taskbar */}
      <div
        className="fixed bottom-0 left-0 right-0 h-12 flex items-center justify-between px-2 z-[9999]"
        onContextMenu={handleContextMenu}
      >
        <div className="flex items-center gap-1">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_START_MENU' })}
            className={`h-10 w-12 flex items-center justify-center hover:bg-white/10 transition ${state.startMenuOpen ? 'bg-white/10' : ''
              }`}
          >
            <Image
              src={WindowLogo}
              alt="Start"
              width={27}
              height={27}
              className="text-white"
            />
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
                {typeof window.icon === 'object' ? (
                  <Image
                    src={window.icon}
                    alt={window.title}
                    width={27}
                    height={27}
                    className="pointer-events-none"
                  />
                ) : (
                  <div className="text-xl select-none">{window.icon}</div>
                )}

                {/* ACTIVE INDICATOR */}
                {!window.isMinimized && (
                  <div className="absolute bottom-0 w-6 h-[3px] bg-[#0078d4] rounded"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/80 text-sm">
          <button className="h-10 w-10 flex items-center justify-center hover:bg-white/10">
            <Wifi size={16} />
          </button>

          <button className="h-10 w-10 flex items-center justify-center hover:bg-white/10">
            <Volume2 size={16} />
          </button>

          <div className="px-3 text-xs leading-tight text-right min-w-[3rem]">
            <div>{time || '00:00'}</div>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenuOpen && (
        <div
          ref={menuRef}
          className="fixed bg-white/95 dark:bg-[#2a2a2a]/95 backdrop-blur-lg border border-[#d0d0d0] dark:border-[#404040] shadow-2xl rounded-lg overflow-hidden z-[20000] min-w-[280px]"
          style={{
            left: `${menuPosition.x}px`,
            ...(menuPosition.bottom !== undefined
              ? { bottom: `${menuPosition.bottom}px` }
              : { top: `${menuPosition.y}px` }
            ),
          }}
        >
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-[#666666] dark:text-[#999999] uppercase">
              Taskbar settings
            </div>

            <button
              onClick={() => {

                setContextMenuOpen(false);
              }}
              className="w-full px-4 py-2 hover:bg-[#e0e0e0] dark:hover:bg-[#3a3a3a] flex items-center gap-3 transition-colors text-left"
            >
              <span className="text-xl">⚙️</span>
              <span className="text-sm">Taskbar settings</span>
            </button>

            <div className="border-t border-[#d0d0d0] dark:border-[#404040] my-2" />

            <button
              onClick={() => {
                handleCloseAllWindows();
                setContextMenuOpen(false);
              }}
              className="w-full px-4 py-2 hover:bg-[#e0e0e0] dark:hover:bg-[#3a3a3a] flex items-center gap-3 transition-colors text-left"
            >
              <span className="text-xl">❌</span>
              <span className="text-sm">Close all windows</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}