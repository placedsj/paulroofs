"use client";

import React, { useState, useEffect, useCallback } from 'react';

// -- SERVICES SECTION COMPONENT -- //
const ServicesSection = () => {
    const [selectedService, setSelectedService] = useState('metal');

    return (
        <section id="services" className="py-20 bg-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-zinc-50 mb-16">OUR SERVICES</h2>
                {/* --- Service Selection Tabs and Content (unchanged for brevity, copy all your original service section code here) --- */}
            </div>
        </section>
    );
};

// Boss Quarters Component
const BossQuarters = ({ onLogout }: {onLogout: () => void}) => {
    const [userId, setUserId] = useState("demo-user-123");
    // ...rest unchanged for brevity...
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-700 flex flex-col items-center p-6">
            <div className="w-full max-w-4xl flex justify-between items-center mb-6">
                <h1 className="text-5xl font-extrabold text-white uppercase tracking-wider text-shadow-outline">
                    BOSS QUARTERS
                </h1>
                <button
                    onClick={onLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                    🚪 LOGOUT
                </button>
            </div>
            {/* ...rest unchanged for brevity... */}
            <footer className="mt-12 w-full max-w-5xl text-center text-white text-lg p-4 bg-green-800 rounded-lg shadow-lg text-shadow-outline-sm">
                <p className="font-bold">PAUL'S ROOFING BOSS QUARTERS</p>
                <p className="text-sm mt-2 text-green-300">Secure Administrative Access | User ID: {userId}</p>
            </footer>
        </div>
    );
};

// -- MAIN APP COMPONENT -- //
export default function Home() {
    const [showBossQuarters, setShowBossQuarters] = useState(false);
    const [passwordAttempt, setPasswordAttempt] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Password updated as requested
    const BOSS_PASSWORD = "Paul1234!!";
    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordAttempt === BOSS_PASSWORD) {
            setIsAuthenticated(true);
            setShowBossQuarters(true);
        } else {
            alert('INCORRECT PASSWORD');
            setPasswordAttempt('');
        }
    };
    const handleLogout = () => {
        setIsAuthenticated(false);
        setShowBossQuarters(false);
        setPasswordAttempt('');
    };
    if (showBossQuarters && isAuthenticated) {
        return <BossQuarters onLogout={handleLogout} />;
    }
    return (
        <div className="min-h-screen bg-zinc-900">
            {/* Navigation - logo image instead of text */}
            <nav className="fixed top-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-700 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="h-10 flex items-center">
                          <img src="/images/logo-round.png" alt="Paul's Roofing Logo" className="h-10 w-auto" />
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <a href="#home" className="text-zinc-400 hover:text-orange-500 transition-colors">HOME</a>
                            <a href="#services" className="text-zinc-400 hover:text-orange-500 transition-colors">SERVICES</a>
                            <a href="/visualizer" className="text-zinc-400 hover:text-orange-500 transition-colors">VISUALIZER</a>
                            <a href="#about" className="text-zinc-400 hover:text-orange-500 transition-colors">ABOUT</a>
                            <a href="#contact" className="text-zinc-400 hover:text-orange-500 transition-colors">CONTACT</a>
                            <button 
                                onClick={() => setShowBossQuarters(true)}
                                className="text-zinc-400 hover:text-orange-500 transition-colors"
                            >
                                BOSS QUARTERS
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* --- Hero, About, Services, etc. (copy your original code here as needed) --- */}

            {/* Contact Section (emails updated) */}
            <section id="contact" className="py-20 bg-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-zinc-50 mb-16">GET IN TOUCH</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold text-zinc-50 mb-6">CONTACT INFORMATION</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-white text-sm">📞</span>
                                    </div>
                                    <div>
                                        <p className="text-zinc-300 font-semibold">(506) 271-4162</p>
                                        <p className="text-zinc-400 text-sm">Available 24/7 for emergencies</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-white text-sm">✉️</span>
                                    </div>
                                    <div>
                                        <p className="text-zinc-300 font-semibold">paul@paulroofs.com</p>
                                        <p className="text-zinc-400 text-sm">General inquiries</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-white text-sm">🚨</span>
                                    </div>
                                    <div>
                                        <p className="text-zinc-300 font-semibold">paul@paulroofs.com</p>
                                        <p className="text-zinc-400 text-sm">Emergency repairs</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-white text-sm">📍</span>
                                    </div>
                                    <div>
                                        <p className="text-zinc-300 font-semibold">Quispamsis, New Brunswick</p>
                                        <p className="text-zinc-400 text-sm">Serving all of Southern NB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-zinc-700 p-8 rounded-lg border border-zinc-600">
                            <h3 className="text-2xl font-bold text-zinc-50 mb-6">REQUEST A QUOTE</h3>
                            <form className="space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    className="w-full p-3 bg-zinc-600 border border-zinc-500 rounded text-zinc-100 placeholder-zinc-400"
                                />
                                <input 
                                    type="email" 
                                    placeholder="Your Email" 
                                    className="w-full p-3 bg-zinc-600 border border-zinc-500 rounded text-zinc-100 placeholder-zinc-400"
                                />
                                <input 
                                    type="tel" 
                                    placeholder="Your Phone" 
                                    className="w-full p-3 bg-zinc-600 border border-zinc-500 rounded text-zinc-100 placeholder-zinc-400"
                                />
                                <textarea 
                                    placeholder="Describe your roofing needs..." 
                                    rows={4}
                                    className="w-full p-3 bg-zinc-600 border border-zinc-500 rounded text-zinc-100 placeholder-zinc-400"
                                ></textarea>
                                <button 
                                    type="submit"
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded font-bold transition-colors"
                                >
                                    SEND REQUEST
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* --- Boss Quarters Modal, etc. (copy your original code here as needed) --- */}
            {/* Footer with logo and new email */}
            <footer className="bg-zinc-900 border-t border-zinc-700 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <img src="/images/logo-round.png" alt="Paul's Roofing Logo" className="h-12 mx-auto mb-4" />
                        <p className="text-zinc-400 mb-4">Southern New Brunswick's Premier Metal Roofing Specialist</p>
                        <p className="text-zinc-400 mb-2">Contact: <a href="mailto:paul@paulroofs.com" className="underline">paul@paulroofs.com</a></p>
                        <p className="text-zinc-500 text-sm">© 2025 Paul's Roofing. All rights reserved. | Licensed & Insured</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
