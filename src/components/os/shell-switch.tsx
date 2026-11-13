'use client';

import { useViewportMode } from '../../hooks/use-mobile';
import { Desktop } from './desktop';
import { StartMenu } from './start-menu';
import { Taskbar } from './taskbar';

export function ShellSwitch() {
  const mode = useViewportMode();

  if (mode === null) {
    return <div className="w-full h-screen overflow-hidden bg-background" />;
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <Desktop />
      <StartMenu />
      <Taskbar />
    </div>
  );
}
