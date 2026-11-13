'use client';

import React, { useState, ReactNode, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { X, Minus, Square } from 'lucide-react';
import { useOS } from './os-context';
import dynamic from 'next/dynamic';
import type { StaticImageData } from 'next/image';

// Lazy load FluidFire
const FluidFire = dynamic(() => import('../ui/fluid-fire'), {
  ssr: false,
  loading: () => <div className="w-full h-8" />
});

interface WindowProps {
  id: string;
  title: string;
  icon: string | StaticImageData;
  children: ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  showFrame: boolean;
}

export function Window({
  id,
  title,
  children,
  position,
  size,
  isMinimized,
  isMaximized,
  zIndex,
  showFrame,
}: WindowProps) {
  const { dispatch } = useOS();
  const [fireWidth, setFireWidth] = useState(size.width / 1.8);
  const [isMounted, setIsMounted] = useState(false);
  const [viewport, setViewport] = useState<{ width: number; height: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragCleanupRef = useRef<(() => void) | null>(null);

  const stopDragging = useCallback(() => {
    dragCleanupRef.current?.();
    dragCleanupRef.current = null;
  }, []);

  useLayoutEffect(() => {
    const updateViewport = () => {
      stopDragging();
      setViewport({
        width: Math.min(window.innerWidth, window.visualViewport?.width ?? window.innerWidth),
        height: Math.min(window.innerHeight, window.visualViewport?.height ?? window.innerHeight),
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.visualViewport?.addEventListener('resize', updateViewport);
    window.addEventListener('blur', stopDragging);

    return () => {
      stopDragging();
      window.removeEventListener('resize', updateViewport);
      window.visualViewport?.removeEventListener('resize', updateViewport);
      window.removeEventListener('blur', stopDragging);
    };
  }, [stopDragging]);

  useEffect(() => {
    if (isMinimized) stopDragging();
  }, [isMinimized, stopDragging]);

  const isMobile = viewport !== null && viewport.width < 768;
  const availableHeight = viewport ? Math.max(0, viewport.height - 48) : size.height;
  const fittedWidth = viewport ? Math.min(size.width, viewport.width) : size.width;
  const fittedHeight = Math.min(size.height, availableHeight);
  const width = isMobile ? viewport.width : fittedWidth;
  const height = isMobile && isMaximized ? availableHeight : fittedHeight;
  const x = isMobile ? 0 : Math.max(0, Math.min(position.x, (viewport?.width ?? width + position.x) - width));
  const y = Math.max(0, Math.min(position.y, availableHeight - height));

  useEffect(() => {
    setFireWidth(width);
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [width]);

  const handleTitlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || isMaximized || (e.target as HTMLElement).closest('button')) return;
    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    e.preventDefault();
    stopDragging();
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.userSelect = 'none';
    const offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const titleBar = e.currentTarget;
    const pointerId = e.pointerId;
    titleBar.setPointerCapture(pointerId);

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      dispatch({
        type: 'MOVE_WINDOW',
        payload: {
          id,
          x: Math.max(0, Math.min(event.clientX - offset.x, (viewport?.width ?? width) - width)),
          y: Math.max(0, Math.min(event.clientY - offset.y, availableHeight - height)),
        },
      });
    };
    const handlePointerEnd = (event: PointerEvent) => {
      if (event.pointerId === pointerId) stopDragging();
    };

    dragCleanupRef.current = () => {
      document.body.style.userSelect = previousUserSelect;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerEnd);
      window.removeEventListener('pointercancel', handlePointerEnd);
      titleBar.removeEventListener('lostpointercapture', handlePointerEnd);
      if (titleBar.hasPointerCapture(pointerId)) titleBar.releasePointerCapture(pointerId);
    };
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerEnd);
    window.addEventListener('pointercancel', handlePointerEnd);
    titleBar.addEventListener('lostpointercapture', handlePointerEnd);
  };

  if (isMinimized) return null;

  const windowStyle = {
    position: 'fixed' as const,
    left: isMaximized ? 0 : `${x}px`,
    top: isMaximized ? (isMobile ? 0 : -32) : `${y}px`,
    width: isMaximized && !isMobile ? '100%' : `${width}px`,
    height: isMaximized && !isMobile ? `calc(100% + 32px)` : `${height}px`,
    zIndex: zIndex,
  };

  const config = {
    config: {
      width: fireWidth,
      height: 35,
      fps: 30,
      gridResolution: fireWidth < 400 ? 8000 : 10000,
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

  if (showFrame == true) {


    return (
      <div
        ref={windowRef}
        style={windowStyle}
        className="flex flex-col shadow-lg"
        onPointerDownCapture={() => dispatch({ type: 'FOCUS_WINDOW', payload: id })}
      >
        <div
          className="left-0 right-0 pointer-events-none z-[1]"
          style={{
            height: '32px',
            width: '100%',
            background : 'transparent',
            containIntrinsicSize: '100% 32px',
          }}
        >
          {isMounted && (
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              bottom: 0,
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

        {/* Title Bar */}
        <div
          onPointerDown={handleTitlePointerDown}
          style={{ touchAction: 'none' }}
          className="flex bg-blue items-center justify-between h-8 bg-[#d12b58] text-white px-2 cursor-move select-none flex-shrink-0"
        >
          <div className="flex items-center gap-2 pl-10 justify-center flex-1">
            <span className="text-sm font-medium">{title}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => dispatch({ type: 'MINIMIZE_WINDOW', payload: id })}
              className="p-1 hover:bg-white/20 active:bg-white/30 transition-colors"
              title="Minimize"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={() => dispatch({ type: 'MAXIMIZE_WINDOW', payload: id })}
              className="p-1 hover:bg-white/20 active:bg-white/30 transition-colors"
              title="Maximize"
            >
              <Square size={16} />
            </button>
            <button
              onClick={() => dispatch({ type: 'CLOSE_WINDOW', payload: id })}
              className="p-1 hover:bg-red-500 active:bg-red-600 transition-colors"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto no-scrollbar bg-white/20 backdrop-blur-md dark:bg-[#2a2a2a] text-foreground">
          {children}
        </div>
      </div>
    );
  }
  else{
    return (
      <div
        ref={windowRef}
        style={windowStyle}
        className="flex flex-col dark:bg-[#2a2a2a] dark:border-[#404040] shadow-lg"
        onPointerDownCapture={() => dispatch({ type: 'FOCUS_WINDOW', payload: id })}
      >
        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-white/20 backdrop-blur-md dark:bg-[#2a2a2a] text-foreground">
          {children}
        </div>
      </div>
    );
  }
}
