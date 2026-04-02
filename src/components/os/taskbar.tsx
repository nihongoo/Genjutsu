'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useOS } from './os-context';
import { Inbox as InboxComponent } from '../ui/inbox';
import { Wifi, Volume2, Inbox } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ContextMenu } from '@base-ui/react/context-menu';
import WindowLogo from '../../assets/Window-Logo.png';

// Lazy load FluidFire
const FluidFire = dynamic(() => import('../ui/fluid-fire').then(mod => mod.FluidFire), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export function Taskbar() {
  const { state, dispatch } = useOS();
  const [time, setTime] = useState('');
  const [fireWidth, setFireWidth] = useState(800);
  const [isMounted, setIsMounted] = useState(false);
  const [inboxOpen, setIsInboxOpen] = useState(false);
  const [isHoveringBottom, setIsHoveringBottom] = useState(false);

  // resize fire
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

  // time
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

  const hasMaximizedWindow = state.windows.some(
    (w) => w.isOpen && w.isMaximized
  );

  const shouldHide = hasMaximizedWindow && !isHoveringBottom;

  const handleCloseAllWindows = () => {
    state.windows
      .filter((w) => w.isOpen)
      .forEach((window) => {
        dispatch({ type: 'CLOSE_WINDOW', payload: window.id });
      });
  };

  const handleOpenSettings = () => {
    dispatch({ type: 'OPEN_WINDOW', payload: 'settings' });
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
    },
  };

  return (
    <>
      {/* Hover detect zone */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[1]"
        style={{ height: '40px', pointerEvents: 'none' }}
      >
        <div
          onMouseEnter={() => setIsHoveringBottom(true)}
          className="w-full h-full"
          style={{ pointerEvents: 'auto' }}
        />
      </div>

      {/* Fire */}
      <div
        className="fixed left-0 right-0 pointer-events-none z-[1]"
        style={{ bottom: '0px', height: '63px' }}
      >
        {isMounted && (
          <FluidFire
            {...config.config}
            interactive={false}
            backgroundColor="transparent"
            style={config.style.canvas}
          />
        )}
      </div>

      <ContextMenu.Root>
        <ContextMenu.Trigger className="flex h-[12rem] w-[15rem] items-center justify-center select-none">

          <div
            className={`fixed bottom-0 left-0 right-0 h-12 flex items-center justify-between px-2 z-[9999]
          transition-all duration-300
          ${shouldHide ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}
        `}
            style={{
              pointerEvents: shouldHide ? 'none' : 'auto',
            }}
            onMouseLeave={() => setIsHoveringBottom(false)}
          >
            {/* LEFT */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => dispatch({ type: 'TOGGLE_START_MENU' })}
                className={`h-10 w-12 flex items-center justify-center hover:bg-white/10 ${state.startMenuOpen ? 'bg-white/10' : ''
                  }`}
              >
                <Image src={WindowLogo} alt="Start" width={27} height={27} />
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
                    className="relative h-10 w-12 flex items-center justify-center hover:bg-white/10"
                  >
                    {typeof window.icon === 'object' ? (
                      <Image src={window.icon} alt="" width={27} height={27} />
                    ) : (
                      <div>{window.icon}</div>
                    )}

                    {!window.isMinimized && (
                      <div className="absolute bottom-0 w-6 h-[3px] bg-white/80 rounded" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <button className="h-10 w-10 flex items-center justify-center hover:bg-white/10">
                <Wifi size={16} />
              </button>

              <button className="h-10 w-10 flex items-center justify-center hover:bg-white/10">
                <Volume2 size={16} />
              </button>

              <div className="px-3 text-xs text-right">
                {time || '00:00'}
              </div>

              <div
                className="px-2 cursor-pointer"
                onClick={() => setIsInboxOpen(!inboxOpen)}
              >
                <Inbox size={16} />
              </div>
            </div>
          </div>

        </ContextMenu.Trigger>

        {/* Inbox */}
        <InboxComponent visible={inboxOpen} setVisible={setIsInboxOpen} />
        <ContextMenu.Portal>
          <ContextMenu.Positioner
            positionMethod="fixed"
            side="right" 
            align="start" 
            sideOffset={4}
            alignOffset={0}
            sticky={true}
            className="outline-hidden z-[99999]">
            <ContextMenu.Popup className="origin-[var(--transform-origin)] backdrop-blur-md bg-white/20 py-1 text-[#FA5252] dark:text-[#FA5252] border rounded border-gray-200 dark:border-gray-700 transition-[opacity] data-[ending-style]:opacity-0">
              <ContextMenu.Item 
              className="flex cursor-default py-2 pr-8 pl-4 text-sm hover:bg-black/20 dark:hover:bg-[#3a3a3a] transition"
              onClick={handleCloseAllWindows}>
                Close All Windows
              </ContextMenu.Item>
              <ContextMenu.Item 
              className="flex cursor-default py-2 pr-8 pl-4 text-sm hover:bg-black/20 dark:hover:bg-[#3a3a3a] transition"
              onClick={handleOpenSettings}>
                Open Setting
              </ContextMenu.Item>
            </ContextMenu.Popup>
          </ContextMenu.Positioner>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    </>
  );
}