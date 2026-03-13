'use client';

import React, { useState } from 'react';
import { useOS } from './os-context';
import Image, { StaticImageData } from 'next/image';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: string | StaticImageData;
}

export function DesktopIcon({ id, label, icon }: DesktopIconProps) {
  const { dispatch } = useOS();
  const [isSelected, setIsSelected] = useState(false);

  const handleDoubleClick = () => {
    dispatch({ type: 'OPEN_WINDOW', payload: id });
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      onClick={() => setIsSelected(!isSelected)}
      className={`flex flex-col items-center gap-2 p-3 w-24 rounded cursor-pointer transition-colors ${isSelected ? 'bg-white/30 text-white' : 'text-white hover:bg-white/20'
        }`}
    >
      {typeof icon === 'object' ? (
        <Image
          src={icon}
          alt={label}
          width={50}
          height={50}
          className="pointer-events-none"
        />
      ) : (
        <div className="text-5xl select-none">{icon}</div>
      )}
      <span className="text-xs text-center line-clamp-2 font-medium">{label}</span>
    </div>
  );
}
