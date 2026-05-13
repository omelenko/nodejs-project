import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyLibrary = () => {
    const [activeTab, setActiveTab] = useState('playlists');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Завантаження даних залежно від обраної вкладки
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/${activeTab}`);
                setItems(response.data);
            } catch (err) {
                console.error("Error loading library:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData().catch(console.error);
    }, [activeTab]);

    return (
        <div className="min-h-screen w-full bg-[#1A1A2E] bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] font-['Inter'] text-white">



            {/* Main Library Content */}
            <main className="p-8 max-w-7xl mx-auto">

                {/* Header Section */}
                <header className="mb-10 text-left">
                    <h1 className="text-4xl font-bold mb-2 tracking-tight">Your Library</h1>
                    <p className="text-[#717182] text-lg">Manage your playlists, albums, and artists</p>
                </header>

                {/* Filters & View Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                        {['playlists', 'albums', 'artists'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                                    activeTab === tab
                                        ? 'bg-black text-white shadow-lg'
                                        : 'text-[#717182] hover:text-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2.5 bg-black rounded-lg border border-white/10 hover:border-white/30 transition-all group">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                        </button>
                        <button className="p-2.5 bg-white/5 rounded-lg border border-white/10 hover:border-white/30 transition-all">
                            <svg className="w-5 h-5 text-[#717182]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {/* Create New Item Card */}
                    <button className="group flex flex-col items-center justify-center aspect-[4/5] bg-white/5 rounded-2xl border border-dashed border-white/20 hover:border-white/40 hover:bg-white/[0.07] transition-all">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                        </div>
                        <span className="font-medium text-white/80 group-hover:text-white">Create {activeTab.slice(0, -1)}</span>
                    </button>

                    {/* Render Items */}
                    {loading ? (
                        <div className="col-span-full py-20 text-center text-[#717182]">Loading your {activeTab}...</div>
                    ) : (
                        items.map((item) => (
                            <Link
                                to={`/${activeTab}/${item.id}`}
                                key={item.id}
                                className="group flex flex-col bg-white/5 rounded-2xl border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all overflow-hidden p-4"
                            >
                                <div className="aspect-square relative mb-4 overflow-hidden rounded-xl">
                                    <img
                                        src={item.coverImage || 'https://placehold.co/400x400'}
                                        alt={item.name}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                            <svg className="w-6 h-6 fill-black translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-semibold text-lg truncate group-hover:text-white transition-colors">
                                        {item.name || item.title}
                                    </h3>
                                    <p className="text-sm text-[#717182]">
                                        {item.trackCount || 0} songs • {item.duration || '0m'}
                                    </p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default MyLibrary;