'use client';

import { useState, useEffect } from 'react';
import { useOS } from '../os/os-context';
import { 
  Monitor, 
  Palette, 
  Info
} from 'lucide-react';

// Predefined wallpapers
const WALLPAPERS = [
  { id: 'default', type: 'video', value: 'background.mp4', name: 'Default Video', gradient: '' },
  { id: 'blue', type: 'gradient', value: '', name: 'Windows Blue', gradient: 'from-[#0078d4] to-[#1084d7]' },
  { id: 'dark', type: 'gradient', value: '', name: 'Dark', gradient: 'from-[#1a1a1a] to-[#2d2d2d]' },
  { id: 'purple', type: 'gradient', value: '', name: 'Purple Dream', gradient: 'from-[#667eea] to-[#764ba2]' },
  { id: 'sunset', type: 'gradient', value: '', name: 'Sunset', gradient: 'from-[#ff6b6b] to-[#feca57]' },
  { id: 'ocean', type: 'gradient', value: '', name: 'Ocean', gradient: 'from-[#2193b0] to-[#6dd5ed]' },
  { id: 'forest', type: 'gradient', value: '', name: 'Forest', gradient: 'from-[#134e5e] to-[#71b280]' },
  { id: 'rose', type: 'gradient', value: '', name: 'Rose', gradient: 'from-[#c94b4b] to-[#4b134f]' },
  { id: 'sky', type: 'gradient', value: '', name: 'Sky', gradient: 'from-[#56ccf2] to-[#2f80ed]' },
];

export function SettingsWindow() {
  const { state, dispatch } = useOS();
  const [activeCategory, setActiveCategory] = useState('personalization');
  const [selectedWallpaper, setSelectedWallpaper] = useState('default');

  // Detect current theme from body class
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  const categories = [
    { id: 'personalization', name: 'Personalization', icon: Palette, color: 'bg-purple-500' },
    { id: 'system', name: 'Display', icon: Monitor, color: 'bg-blue-500' },
    { id: 'about', name: 'About', icon: Info, color: 'bg-gray-500' },
  ];


  const handleWallpaperChange = (wallpaper: typeof WALLPAPERS[0]) => {
    setSelectedWallpaper(wallpaper.id);
    
    if (wallpaper.type === 'video') {
      dispatch({
        type: 'SET_WALLPAPER',
        payload: {
          type: 'video',
          value: wallpaper.value,
          name: wallpaper.name,
        },
      });
    } else if (wallpaper.type === 'gradient') {
      dispatch({
        type: 'SET_WALLPAPER',
        payload: {
          type: 'gradient',
          value: wallpaper.gradient,
          name: wallpaper.name,
        },
      });
    }
  };

  const handleCustomWallpaper = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedWallpaper('custom');
      dispatch({
        type: 'SET_WALLPAPER',
        payload: {
          type: 'custom',
          value: event.target?.result as string,
          name: file.name,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const renderContent = () => {
    switch (activeCategory) {
      case 'personalization':
        return (
          <div className="space-y-6">
            {/* Background Section */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Background</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Choose your desktop background
              </p>
              
              <div className="grid grid-cols-3 gap-3">
                {WALLPAPERS.map((wallpaper) => (
                  <button
                    key={wallpaper.id}
                    onClick={() => handleWallpaperChange(wallpaper)}
                    className={`aspect-video border-2 rounded overflow-hidden cursor-pointer hover:border-[#0078d4] transition-colors ${
                      selectedWallpaper === wallpaper.id || 
                      (state.wallpaper.name === wallpaper.name)
                        ? 'border-[#0078d4] ring-2 ring-[#0078d4] ring-offset-2'
                        : 'border-border'
                    }`}
                  >
                    {wallpaper.type === 'video' ? (
                      <div className="w-full h-full bg-black flex items-center justify-center">
                        <span className="text-white text-xs">Default</span>
                      </div>
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${wallpaper.gradient}`} />
                    )}
                  </button>
                ))}
              </div>

              {/* Custom wallpaper upload */}
              <div className="mt-4">
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#0078d4] text-white rounded hover:bg-[#1084d7] transition-colors cursor-pointer">
                  <span>📁 Browse for image...</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomWallpaper}
                    className="hidden"
                  />
                </label>
                {state.wallpaper.type === 'custom' && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Current: {state.wallpaper.name}
                  </p>
                )}
              </div>
            </div>

            {/* Colors Section */}
            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Accent Colors</h2>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded">
                  <h3 className="font-medium text-foreground mb-3">Choose your accent color</h3>
                  <div className="grid grid-cols-8 gap-3">
                    {[
                      { color: '#0078d4', name: 'Blue' },
                      { color: '#e81123', name: 'Red' },
                      { color: '#107c10', name: 'Green' },
                      { color: '#ffb900', name: 'Yellow' },
                      { color: '#8764b8', name: 'Purple' },
                      { color: '#00b7c3', name: 'Teal' },
                      { color: '#ea005e', name: 'Pink' },
                      { color: '#ff8c00', name: 'Orange' },
                    ].map((item) => (
                      <button
                        key={item.color}
                        className="w-full aspect-square rounded border-2 border-transparent hover:border-white transition-all hover:scale-110"
                        style={{ backgroundColor: item.color }}
                        title={item.name}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    💡 Note: Accent color selection is for visual preview only
                  </p>
                </div>
              </div>
            </div>

            {/* Current Wallpaper Info */}
            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Current Settings</h2>
              <div className="p-4 border border-border rounded">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Wallpaper Type:</span>
                    <span className="text-foreground font-medium capitalize">{state.wallpaper.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Wallpaper Name:</span>
                    <span className="text-foreground font-medium">{state.wallpaper.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Theme:</span>
                    <span className="text-foreground font-medium">{isDarkMode ? 'Dark' : 'Light'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Display</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Adjust your display settings
              </p>
              
              <div className="space-y-4">
                {/* Dark Mode Toggle */}
                <div className="p-4 border border-border rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-foreground">Dark Mode</h3>
                      <p className="text-sm text-muted-foreground">Use dark theme across the system</p>
                    </div>
                    <button
                      onClick={toggleDarkMode}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        isDarkMode ? 'bg-[#0078d4]' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          isDarkMode ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Window Info */}
                <div className="p-4 border border-border rounded">
                  <h3 className="font-medium text-foreground mb-3">Window Resolution</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex justify-between">
                      <span>Width:</span>
                      <span className="text-foreground font-medium">{window.innerWidth}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Height:</span>
                      <span className="text-foreground font-medium">{window.innerHeight}px</span>
                    </div>
                  </div>
                </div>

                {/* Storage Info */}
                <div className="p-4 border border-border rounded">
                  <h3 className="font-medium text-foreground mb-3">Storage (Browser)</h3>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">LocalStorage is being used for:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Chrome browser last URL</li>
                      <li>Application state</li>
                      <li>Window positions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">System Information</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Information about this portfolio OS
              </p>
              
              <div className="space-y-3">
                {[
                  { label: 'OS Name', value: 'Portfolio Windows 10' },
                  { label: 'Version', value: 'v1.0.0' },
                  { label: 'Edition', value: 'Pro (Simulation)' },
                  { label: 'System Type', value: 'Web-based OS Simulator' },
                  { label: 'Browser', value: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                                            navigator.userAgent.includes('Firefox') ? 'Firefox' :
                                            navigator.userAgent.includes('Safari') ? 'Safari' : 'Other' },
                  { label: 'Platform', value: navigator.platform },
                  { label: 'Screen Resolution', value: `${window.screen.width} × ${window.screen.height}` },
                  { label: 'Color Depth', value: `${window.screen.colorDepth}-bit` },
                ].map((spec) => (
                  <div key={spec.label} className="p-4 border border-border rounded">
                    <p className="text-sm text-muted-foreground">{spec.label}</p>
                    <p className="text-foreground font-medium">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Tech Stack</h2>
              <div className="p-4 border border-border rounded">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Framework</p>
                    <p className="text-foreground font-medium">Next.js 15</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Language</p>
                    <p className="text-foreground font-medium">TypeScript</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Styling</p>
                    <p className="text-foreground font-medium">Tailwind CSS</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">UI Components</p>
                    <p className="text-foreground font-medium">Custom + shadcn/ui</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Features</h2>
              <div className="p-4 border border-border rounded">
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Windows 10 UI/UX Simulation</li>
                  <li>Draggable & Resizable Windows</li>
                  <li>Working Start Menu & Taskbar</li>
                  <li>Dark/Light Theme Toggle</li>
                  <li>Custom Wallpaper Support</li>
                  <li>Integrated Chrome Browser</li>
                  <li>Spotify Player Widget</li>
                  <li>Command Terminal (PowerShell)</li>
                  <li>Fluid Fire Animation Effects</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Credits</h2>
              <div className="p-4 border border-border rounded text-center">
                <p className="text-sm text-muted-foreground">
                  Built with ❤️ using Next.js, TypeScript & Tailwind CSS
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  © 2024 Portfolio OS - Not affiliated with Microsoft
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full flex bg-white/20 backdrop-blur-md dark:bg-[#ffffff]/80 border border-border rounded shadow-lg">
      {/* Sidebar */}
      <div className="w-64 bg-white/60 backdrop-blur-md dark:bg-[#2a2a2a] border-r border-border no-scrollbar overflow-auto">
        <div className="p-4">
          <h1 className="text-xl font-bold text-foreground mb-4">Settings</h1>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-colors ${
                  activeCategory === category.id
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent/50 text-foreground'
                }`}
              >
                <div className={`p-1.5 rounded ${category.color}`}>
                  <category.icon size={18} className="text-white" />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 no-scrollbar overflow-auto bg-white/20 backdrop-blur-md dark:bg-[#2a2a2a] text-foreground">
        <div className="p-8 max-w-4xl">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}