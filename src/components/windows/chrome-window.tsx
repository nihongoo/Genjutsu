'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Home, ExternalLink } from 'lucide-react';

export function ChromeWindow() {
    const HOME_URL = 'https://www.google.com/webhp?igu=1';
    const HOME_DISPLAY = 'https://www.google.com';

    const [url, setUrl] = useState(HOME_URL);
    const [displayUrl, setDisplayUrl] = useState(HOME_DISPLAY);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Load last visited URL from localStorage
    useEffect(() => {
        const lastUrl = localStorage.getItem('chrome-url');
        const lastDisplay = localStorage.getItem('chrome-display-url');

        if (lastUrl && lastDisplay) {
            setUrl(lastUrl);
            setDisplayUrl(lastDisplay);
        }
    }, []);

    // Save URL to localStorage whenever it changes
    const storeUrl = (newUrl: string, newDisplay: string) => {
        localStorage.setItem('chrome-url', newUrl);
        localStorage.setItem('chrome-display-url', newDisplay);
    };

    // Refresh iframe
    const refreshChrome = () => {
        if (iframeRef.current) {
            iframeRef.current.src += '';
        }
    };

    // Go to home
    const goToHome = () => {
        setUrl(HOME_URL);
        setDisplayUrl(HOME_DISPLAY);
        storeUrl(HOME_URL, HOME_DISPLAY);
        setTimeout(refreshChrome, 50);
    };

    // Handle Enter key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            let newUrl = displayUrl.trim();

            if (newUrl.length === 0) return;

            // Add https:// if missing
            if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
                newUrl = 'https://' + newUrl;
            }

            let finalUrl = newUrl;
            let finalDisplay = newUrl;

            // Special handling for Google (same as original)
            if (newUrl.includes('google.com')) {
                finalUrl = HOME_URL;
                finalDisplay = HOME_DISPLAY;
            }

            setUrl(finalUrl);
            setDisplayUrl(finalDisplay);
            storeUrl(finalUrl, finalDisplay);

            // Blur the input
            (e.target as HTMLInputElement).blur();
        }
    };

    // Open in new tab
    const openInNewTab = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="h-full w-full flex flex-col bg-[#202124]">
            {/* URL Bar */}
            <div className="w-full pt-1.5 pb-2 flex justify-start items-center text-white text-sm border-b border-gray-800">
                {/* Refresh Button */}
                <button
                    onClick={refreshChrome}
                    className="ml-2 mr-1 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    title="Refresh"
                >
                    <RotateCw size={18} className="text-gray-300" />
                </button>

                {/* Home Button */}
                <button
                    onClick={goToHome}
                    className="mr-2 ml-1 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    title="Home"
                >
                    <Home size={18} className="text-gray-300" />
                </button>

                {/* URL Input */}
                <input
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setDisplayUrl(e.target.value)}
                    value={displayUrl}
                    id="chrome-url-bar"
                    className="outline-none bg-[#303134] rounded-full px-4 py-1.5 mr-2 flex-1 text-gray-300 focus:text-white focus:bg-[#3c4043] transition-colors"
                    type="url"
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="Search or enter website name"
                />

                {/* Open in New Tab Button */}
                <button
                    onClick={openInNewTab}
                    className="mr-2 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    title="Open in new tab"
                >
                    <ExternalLink size={18} className="text-gray-300" />
                </button>
            </div>

            {/* Chrome Content */}
            <iframe
                ref={iframeRef}
                src={url}
                name="chrome-frame"
                className="flex-grow w-full border-0"
                id="chrome-screen"
                title="Chrome Browser"
            />
        </div>
    );
}