'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useOS } from './os-context';
import { DesktopIcon } from './desktop-icon';
import { Window } from './window';
import { AboutWindow } from '../windows/about-window';
import { ProjectsWindow } from '../windows/projects-window';
import { CommandsWindow } from '../windows/command-window';
import { ChromeWindow } from '../windows/chrome-window';
import { SpotifyWindow } from '../windows/spotify-window';
import { SettingsWindow } from '../windows/setting-window';
import { VideoWallpaper } from './video-wallpaper';
import { APPS_CONFIG } from '../../config/apps-config';
import { ContextMenu } from '@base-ui/react/context-menu';

const WINDOW_COMPONENTS: Record<string, React.ComponentType<any>> = {
  about: AboutWindow,
  projects: ProjectsWindow,
  chrome: ChromeWindow,
  commands: CommandsWindow,
  spotify: SpotifyWindow,
  settings: SettingsWindow,
};

export function Desktop() {
  const { state, dispatch } = useOS();

  const handleDesktopClick = () => {
    if (state.startMenuOpen) {
      dispatch({ type: 'CLOSE_START_MENU' });
    }
  };

  const handleOpenSettings = () => {
    dispatch({ type: 'OPEN_WINDOW', payload: 'settings' });
  };

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger className="flex h-[12rem] w-[15rem] z-0 select-none">
          <div
            onClick={handleDesktopClick}
            className="fixed inset-0 w-full h-full overflow-hidden"
            style={
              state.wallpaper.type === 'custom'
                ? {
                  backgroundImage: `url(${state.wallpaper.value})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
                : {}
            }
          >
            {state.wallpaper.type === 'video' && (
              <VideoWallpaper src={state.wallpaper.value} />
            )}

            {/* Gradient wallpaper */}
            {state.wallpaper.type === 'gradient' && (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${state.wallpaper.value} opacity-70`}
              />
            )}

            {/* Desktop Icons */}
            <div className="p-4 absolute top-0 left-0 bottom-12 flex flex-col flex-wrap gap-3 z-1 content-start max-h-[calc(100vh-2.5rem)]">
              {APPS_CONFIG.map((item) => (
                <DesktopIcon
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>

          {/* Base UI Context Menu */}

        </ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Positioner
            positionMethod="fixed"    
            side="right"            
            align="start"            
            sideOffset={4}         
            alignOffset={0}
            sticky={true}
            className="outline-hidden">
            <ContextMenu.Popup className="origin-[var(--transform-origin)] w-60 backdrop-blur-md bg-white/20 py-1 text-[#FA5252] dark:text-[#FA5252] border rounded border-gray-200 dark:border-gray-700 transition-[opacity] data-[ending-style]:opacity-0">
              <div className="p-2">
                <ContextMenu.Item
                  className="flex cursor-default py-2 pr-8 pl-4 text-sm hover:bg-black/20 dark:hover:bg-[#3a3a3a] transition"
                  onSelect={handleOpenSettings}
                >
                  <span>Settings</span>
                </ContextMenu.Item>
              </div>
            </ContextMenu.Popup>
          </ContextMenu.Positioner>
        </ContextMenu.Portal>
      </ContextMenu.Root>
      {/* Windows */}
      {state.windows.map((windowState) => {
        const WindowComponent = WINDOW_COMPONENTS[windowState.id];

        if (!WindowComponent || !windowState.isOpen) return null;

        return (
          <Window
            key={windowState.id}
            id={windowState.id}
            title={windowState.title}
            icon={windowState.icon}
            position={windowState.position}
            size={windowState.size}
            isMinimized={windowState.isMinimized}
            isMaximized={windowState.isMaximized}
            zIndex={windowState.zIndex}
            showFrame={windowState.showFrame ?? true}
          >
            <WindowComponent />
          </Window>
        );
      })}
    </>
  );
}