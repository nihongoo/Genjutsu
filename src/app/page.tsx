'use client';

import { OSProvider, useOS } from '../components/os/os-context';
import { Desktop } from '../components/os/desktop';
import { Taskbar } from '../components/os/taskbar';
import { StartMenu } from '../components/os/start-menu';
import { Lockscreen } from '../components/os/lock-screen';

function HomeContent() {
  const { state } = useOS();

  if (state.isShutdown) {
    return <Lockscreen />;
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <Desktop />
      <StartMenu />
      <Taskbar />
    </div>
  );
}


export default function Home() {
  return (
    <OSProvider>
      <HomeContent />
    </OSProvider>
  );
}
