'use client';

import React, { useState } from 'react';
import { Search, Music, Play, Heart, MoreHorizontal } from 'lucide-react';

export function SpotifyWindow() {
  const [embedUrl, setEmbedUrl] = useState('https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(0);

  const popularPlaylists = [
    {
      name: "Today's Top Hits",
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
      description: 'The hottest tracks right now'
    },
    {
      name: 'RapCaviar',
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd',
      description: 'New music from Roddy Ricch and more'
    },
    {
      name: 'Hot Country',
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX1lVhptIYRda',
      description: 'Hottest country music'
    },
    {
      name: 'Rock Classics',
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U',
      description: 'Rock legends & epic songs'
    },
    {
      name: 'Chill Hits',
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6',
      description: 'Kick back to the best new chill hits'
    },
    {
      name: 'Peaceful Piano',
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO',
      description: 'Relax and indulge with beautiful piano pieces'
    },
    {
      name: 'Deep Focus',
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ',
      description: 'Keep calm and focus'
    },
    {
      name: 'Jazz Vibes',
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0SM0LYsmbMT',
      description: 'The original chill instrumental'
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (searchQuery.includes('spotify.com')) {
      let url = searchQuery;
      url = url.replace('open.spotify.com', 'open.spotify.com/embed');
      setEmbedUrl(url);
      setSelectedPlaylist(-1);
    }
  };

  const handlePlaylistClick = (index: number) => {
    setSelectedPlaylist(index);
    setEmbedUrl(popularPlaylists[index].url);
  };

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Spotify Header */}
      <div className="flex items-center gap-4 px-6 py-3 bg-gradient-to-b from-[#1e1e1e] to-[#121212] border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center">
            <Music size={20} className="text-black" />
          </div>
          <span className="text-white font-bold text-xl">Spotify</span>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="flex items-center bg-[#242424] rounded-full px-4 py-2.5 hover:bg-[#2a2a2a] transition-colors border border-transparent hover:border-gray-700">
            <Search size={18} className="text-gray-400 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or paste Spotify link..."
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500"
            />
          </div>
        </form>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 bg-[#000000] border-r border-gray-900 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          <div className="p-6">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">
              Popular Playlists
            </h3>
            
            <div className="space-y-2">
              {popularPlaylists.map((playlist, index) => (
                <button
                  key={playlist.url}
                  onClick={() => handlePlaylistClick(index)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-all group ${
                    selectedPlaylist === index
                      ? 'bg-[#282828] text-white'
                      : 'text-gray-300 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded flex-shrink-0 flex items-center justify-center ${
                      selectedPlaylist === index ? 'bg-[#1DB954]' : 'bg-[#282828]'
                    } group-hover:bg-[#1DB954] transition-colors`}>
                      <Music size={18} className={selectedPlaylist === index ? 'text-black' : 'text-gray-400'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{playlist.name}</div>
                      <div className="text-xs text-gray-500 truncate mt-0.5">{playlist.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-8 p-4 bg-gradient-to-br from-[#1DB954]/10 to-[#1DB954]/5 rounded-lg border border-[#1DB954]/20">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <p className="text-xs font-semibold text-[#1DB954] mb-1">Pro Tip</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Paste any Spotify track, album, or playlist link in the search box to play it instantly!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Area */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-[#1a1a1a] to-[#121212]">
          <div className="flex-1 p-6">
            <iframe
              key={embedUrl}
              src={embedUrl}
              className="w-full h-full border-0 rounded-xl shadow-2xl"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Player"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gradient-to-t from-[#181818] to-[#121212] border-t border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse"></div>
          <span>Playing from Spotify</span>
        </div>
        <div className="text-xs text-gray-500">
          🎵 Paste any Spotify link to play
        </div>
      </div>
    </div>
  );
}