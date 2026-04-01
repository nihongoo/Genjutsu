'use client';

import React from 'react';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface ContextMenuProps {
  items: MenuItem[];
  position: {
    x: number;
    y?: number;
    bottom?: number;
  };
  menuRef?: React.RefObject<HTMLDivElement>;
}

export function ContextMenu({ items, position, menuRef }: ContextMenuProps) {
  return (
    <div
      ref={menuRef}
      className="fixed bg-white/95 dark:bg-[#2a2a2a]/95 backdrop-blur-lg border border-[#d0d0d0] dark:border-[#404040] shadow-2xl rounded-lg overflow-hidden z-[20000] min-w-[220px]"
      style={{
        left: `${position.x}px`,
        ...(position.bottom !== undefined
          ? { bottom: `${position.bottom}px` }
          : { top: `${position.y}px` }),
      }}
    >
      <div className="py-1">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="w-full px-4 py-2 flex items-center gap-3 text-left text-sm hover:bg-[#e0e0e0] dark:hover:bg-[#3a3a3a] transition-colors"
          >
            {/* icon */}
            <span className="w-5 flex justify-center">
              {item.icon ?? <span className="w-5" />} 
            </span>

            {/* label */}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}