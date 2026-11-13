'use client';

import { OSProvider, useOS } from '../components/os/os-context';
import { ShellSwitch } from '../components/os/shell-switch';
import { Lockscreen } from '../components/os/lock-screen';

function HomeContent() {
  const { state } = useOS();

  if (state.isShutdown) {
    return <Lockscreen />;
  }

  return <ShellSwitch />;
}


export default function Home() {
  return (
    <OSProvider>
      <HomeContent />
    </OSProvider>
  );
}
