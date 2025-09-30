"use client";

import React from "react";
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
  // NOTE: We are removing the old showBossQuarters state/modal logic here.
  // Access to Boss Quarters is now handled by clicking the link in the Header,
  // which routes the user to the dedicated and fully-featured /boss-quarters page.
  // This keeps the homepage clean and focused on customers.

  // --- GALLERY: "OUR WORK" IMAGES ---
  const galleryImages = [
      "/images/house-garage-water.jpg",
      "/images/colored-roofs.jpg",
      "/images/roof-view.jpg",
      "/images/bible-dad-hat.jpg",
      "/images/window-roof.jpg",
      "/images/house-garage-water-2.jpg",
      // 🛠️ NEW IMAGES ADDED HERE
      "/images/new-install-metal.jpg", 
      "/images/clean-shingle-job.jpg",
      "/images/commercial-flat-roof.jpg", 
  ];

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />

      {/* Hero Section - (Content remains unchanged) */}
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
          <div className="flex justify-center space-x-4">
            <a href="#contact" className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-8 rounded-lg font-bold transition-colors">
                GET A FREE QUOTE
            </a>
            <Link href="/handbook" className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 py-3 px-8 rounded-lg font-bold transition-colors">
                HOMEOWNER HANDBOOK
            </Link>
          </div>
        </div>
      </section>

      {/* 🛠️ NEW OUR WORK GALLERY SECTION ADDED */}
      <section id="ourwork" className="py-16 bg-zinc-800">
          <h2 className="text-4xl font-bold text-center text-zinc-50 mb-12">Our Work</h2>
          <div className="flex flex-wrap justify-center gap-6">
              {galleryImages.map((img, idx) => (
                  <img 
                      key={img + idx}
                      src={img}
                      alt={`Paul's Roofing work photo ${idx + 1}`}
                      className="w-72 h-44 object-cover rounded shadow-lg border-2 border-zinc-900"
                  />
              ))}
          </div>
      </section>
      
      {/* Contact Section - Email addresses updated */}
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
                      info@paulroofs.com 
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
                      info@paulroofs.com 
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

      <Footer />
    </div>
  );
}
