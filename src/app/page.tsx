"use client";

import React, { useState } from "react";

export default function Home() {
  const [showBossQuarters, setShowBossQuarters] = useState(false);
  const [passwordAttempt, setPasswordAttempt] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Password updated!
  const BOSS_PASSWORD = "Paul1234!!";

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordAttempt === BOSS_PASSWORD) {
      setIsAuthenticated(true);
      setShowBossQuarters(true);
    } else {
      alert("INCORRECT PASSWORD");
      setPasswordAttempt("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowBossQuarters(false);
    setPasswordAttempt("");
  };

  if (showBossQuarters && isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-700 flex flex-col items-center p-6">
        <div className="w-full max-w-4xl flex justify-between items-center mb-6">
          <h1 className="text-5xl font-extrabold text-white uppercase tracking-wider text-shadow-outline">
            BOSS QUARTERS
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
          >
            🚪 LOGOUT
          </button>
        </div>
        <p className="text-xl text-white mb-10 text-center max-w-3xl text-shadow-outline-sm">
          PROJECT MANAGEMENT | QUOTES | INVOICES | ADMIN TOOLS
        </p>
        <footer className="mt-12 w-full max-w-5xl text-center text-white text-lg p-4 bg-green-800 rounded-lg shadow-lg text-shadow-outline-sm">
          <p className="font-bold">PAUL'S ROOFING BOSS QUARTERS</p>
          <p className="text-sm mt-2 text-green-300">
            Secure Administrative Access | User ID: demo-user-123
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="h-10 flex items-center">
              <img
                src="/images/logo-round.png"
                alt="Paul's Roofing Logo"
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#home"
                className="text-zinc-400 hover:text-orange-500 transition-colors"
              >
                HOME
              </a>
              <a
                href="#services"
                className="text-zinc-400 hover:text-orange-500 transition-colors"
              >
                SERVICES
              </a>
              <a
                href="/visualizer"
                className="text-zinc-400 hover:text-orange-500 transition-colors"
              >
                VISUALIZER
              </a>
              <a
                href="#about"
                className="text-zinc-400 hover:text-orange-500 transition-colors"
              >
                ABOUT
              </a>
              <a
                href="#contact"
                className="text-zinc-400 hover:text-orange-500 transition-colors"
              >
                CONTACT
              </a>
              {/* BOSS QUARTERS LINK */}
              <a
                href="/boss-quarters"
                className="text-sm font-semibold text-sky-700 hover:text-sky-900 px-3 py-2"
              >
                BOSS QUARTERS 🛠️
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="hero-bg min-h-screen flex items-center justify-center pt-20"
      >
        <div className="text-center px-4">
          <img
            src="/images/logo-round.png"
            alt="Paul's Roofing Logo"
            className="h-32 w-auto mb-6 mx-auto"
          />
          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-50 mb-6 text-shadow-outline">
            THE LAST ROOF YOU’LL EVER NEED
          </h1>
          <p className="text-lg text-zinc-300 text-center mb-8 max-w-xl mx-auto">
            Specializing in metal roofing and expert repairs for Southern New
            Brunswick.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-zinc-50 mb-16">
            GET IN TOUCH
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-zinc-50 mb-6">
                CONTACT INFORMATION
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-sm">📞</span>
                  </div>
                  <div>
                    <p className="text-zinc-300 font-semibold">
                      (506) 271-4162
                    </p>
                    <p className="text-zinc-400 text-sm">
                      Available 24/7 for emergencies
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-sm">✉️</span>
                  </div>
                  <div>
                    <p className="text-zinc-300 font-semibold">
                      paul@paulroofs.com
                    </p>
                    <p className="text-zinc-400 text-sm">General inquiries</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-sm">🚨</span>
                  </div>
                  <div>
                    <p className="text-zinc-300 font-semibold">
                      paul@paulroofs.com
                    </p>
                    <p className="text-zinc-400 text-sm">Emergency repairs</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-sm">📍</span>
                  </div>
                  <div>
                    <p className="text-zinc-300 font-semibold">
                      Quispamsis, New Brunswick
                    </p>
                    <p className="text-zinc-400 text-sm">
                      Serving all of Southern NB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-zinc-700 p-8 rounded-lg border border-zinc-600">
              <h3 className="text-2xl font-bold text-zinc-50 mb-6">
                REQUEST A QUOTE
              </h3>
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

      {/* Boss Quarters Password Modal */}
      {showBossQuarters && !isAuthenticated && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-600 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-zinc-50 mb-6 text-center">
              🔐 BOSS QUARTERS ACCESS
            </h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordAttempt}
                onChange={(e) => setPasswordAttempt(e.target.value)}
                className="w-full p-3 bg-zinc-700 border border-zinc-600 rounded text-zinc-100 placeholder-zinc-400"
                autoFocus
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded font-bold transition-colors"
                >
                  ACCESS
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBossQuarters(false);
                    setPasswordAttempt("");
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </form>
            <p className="text-zinc-400 text-sm text-center mt-4">
              Access restricted to authorized personnel only.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img
              src="/images/logo-round.png"
              alt="Paul's Roofing Logo"
              className="h-12 mx-auto mb-4"
            />
            <p className="text-zinc-400 mb-4">
              Southern New Brunswick's Premier Metal Roofing Specialist
            </p>
            <p className="text-zinc-400 mb-2">
              Contact:{" "}
              <a
                href="mailto:paul@paulroofs.com"
                className="underline"
              >
                paul@paulroofs.com
              </a>
            </p>
            <p className="text-zinc-500 text-sm">
              © 2025 Paul's Roofing. All rights reserved. | Licensed & Insured
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
