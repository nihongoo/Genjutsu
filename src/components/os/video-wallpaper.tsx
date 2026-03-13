'use client';

import React, { useRef, useEffect } from 'react';

interface VideoWallpaperProps {
  src: string;
}
export function VideoWallpaper({ src }: VideoWallpaperProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ensurePlayback = () => {
      if (video.paused) {
        video.play().catch((error) => {
          console.log('Autoplay prevented:', error);
        });
      }
    };

    ensurePlayback();

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        ensurePlayback();
      }
    };

    const handleFocus = () => {
      ensurePlayback();
    };

    // Lắng nghe các sự kiện
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    video.addEventListener('pause', ensurePlayback);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      video.removeEventListener('pause', ensurePlayback);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ objectFit: 'cover' }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}