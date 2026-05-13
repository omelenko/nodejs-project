import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Playlist = () => {
    const { id } = useParams(); // Отримуємо ID плейлиста з URL
    const [playlistData, setPlaylistData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Завантаження даних про плейлист із бекенду
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                // Використовуємо твій налаштований VITE_API_URL
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/playlists/${id}`);
                setPlaylistData(response.data);
            } catch (err) {
                console.error("Помилка завантаження плейлиста:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlaylist().catch(console.error);
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center text-white">Loading...</div>;
    if (!playlistData) return <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center text-white">Playlist not found</div>;

    return (
        <div className="min-h-screen w-full bg-[#1A1A2E] bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] font-['Inter'] text-white">



            <main className="p-8 max-w-7xl mx-auto">

                {/* Header - Динамічні дані */}
                <header className="flex flex-col md:flex-row items-end gap-8 mb-10">
                    <div
                        className="w-64 h-64 rounded-xl shadow-2xl flex-shrink-0 bg-cover bg-center border border-white/10"
                        style={{ backgroundImage: `url(${playlistData.coverImage || 'https://placehold.co/400x400?text=Playlist'})` }}
                    />

                    <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-[#717182] uppercase tracking-[0.2em]">
              {playlistData.type || 'Playlist'}
            </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none">
                            {playlistData.name}
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-[#717182] mt-2">
                            <span className="text-white font-semibold">{playlistData.owner?.username || 'User'}</span>
                            <span>•</span>
                            <span>{playlistData.tracks?.length || 0} songs</span>
                            <span>•</span>
                            <span>{playlistData.description || 'No description available'}</span>
                        </div>
                    </div>
                </header>

                {/* Action Bar */}
                <div className="flex items-center gap-6 mb-10">
                    <button className="w-16 h-16 bg-[#1DB954] hover:bg-[#1ed760] rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-xl">
                        <svg className="w-8 h-8 ml-1 fill-black" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                    <button className="text-[#717182] hover:text-white transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    </button>
                </div>

                {/* Search inside playlist */}
                <div className="relative mb-8 max-w-md">
                    <input
                        type="text"
                        placeholder="Search in playlist"
                        className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-12 outline-none focus:bg-white/10 focus:border-white/30 transition-all text-sm"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717182]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>

                {/* Tracklist Table */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="text-[#717182] text-xs uppercase tracking-widest border-b border-white/10">
                        <tr>
                            <th className="py-4 px-6 w-12 text-center">#</th>
                            <th className="py-4 px-6">Title</th>
                            <th className="py-4 px-6 hidden md:table-cell">Album</th>
                            <th className="py-4 px-6 text-right w-24">Duration</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                        {playlistData.tracks?.map((track, index) => (
                            <tr key={track.id} className="group hover:bg-white/10 transition-all cursor-pointer">
                                <td className="py-4 px-6 text-[#717182] group-hover:text-white text-center">{index + 1}</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-4">
                                        {track.coverImage && <img src={track.coverImage} className="w-10 h-10 rounded" alt="cover" />}
                                        <div className="flex flex-col">
                                            <span className="font-medium group-hover:text-white">{track.title}</span>
                                            <span className="text-sm text-[#717182]">{track.artist?.name}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-[#717182] hidden md:table-cell">{track.album?.title || 'Single'}</td>
                                <td className="py-4 px-6 text-right text-[#717182] font-mono text-sm">{track.duration}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Playlist;