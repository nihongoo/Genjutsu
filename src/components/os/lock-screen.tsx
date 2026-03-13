'use client';

import React, { useState, useEffect } from 'react';
import { useOS } from './os-context';

export function Lockscreen() {
    const { dispatch } = useOS();

    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [isBooting, setIsBooting] = useState(true);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            setTime(
                now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                })
            );

            setDate(
                now.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                })
            );
        };

        updateTime();

        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const bootTimer = setTimeout(() => {
            setIsBooting(false);
        }, 2000);

        return () => clearTimeout(bootTimer);
    }, []);

    const handleUnlock = () => {
        dispatch({ type: 'BOOT' });
    };

    /* ---------------- BOOT SCREEN ---------------- */

    if (isBooting) {
        return (
            <div className="fixed inset-0 bg-black flex items-center justify-center text-white z-[99999]">
                <div className="flex flex-col items-center gap-8">
                    <div className="text-5xl font-light tracking-[0.3em]">
                        WINDOWS
                    </div>
                    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    /* ---------------- LOGIN SCREEN ---------------- */

    if (showLogin) {
        return (
            <div className="fixed inset-0 z-[99999]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://wallpapercave.com/wp/wp2757874.jpg')",
                    }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Login box */}
                <div className="relative h-full flex items-center justify-center">
                    <div className="bg-black/60 backdrop-blur-xl p-12 rounded text-center text-white shadow-2xl">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl mb-6 mx-auto shadow-lg">
                            👤
                        </div>

                        <div className="text-2xl font-light mb-8">Portfolio</div>

                        <button
                            onClick={handleUnlock}
                            className="w-full px-8 py-3 bg-[#0078d4] hover:bg-[#106ebe] rounded text-white font-medium transition-all shadow-lg hover:shadow-xl"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ---------------- LOCK SCREEN ---------------- */

    return (
        <div className="fixed inset-0 z-[99999]">
            <div
                className="absolute inset-0 bg-cover bg-center cursor-pointer"
                style={{
                    backgroundImage:
                        "url('https://wallpapercave.com/wp/wp2757874.jpg')",
                }}
                onClick={() => setShowLogin(true)}
            >
                {/* Dark overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Main content */}
                <div className="relative h-full flex flex-col">
                    {/* CLOCK - Centered vertically and horizontally */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center select-none">
                            <div className="text-[120px] font-extralight tracking-tight text-white drop-shadow-2xl">
                                {time}
                            </div>
                            <div className="text-3xl font-light text-white drop-shadow-lg mt-2">
                                {date}
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM TEXT */}
                    <div className="pb-20 text-center">
                        <div className="inline-flex items-center gap-2 text-white/90 text-base drop-shadow-lg">
                            <svg 
                                className="w-5 h-5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" 
                                />
                            </svg>
                            <span>Click anywhere to continue</span>
                        </div>
                    </div>
                </div>

                {/* CORNER INFO */}
                <div className="absolute bottom-6 right-6 text-sm text-white/70 drop-shadow">
                    Windows 10 • Portfolio OS
                </div>
            </div>
        </div>
    );
}