import React from 'react';
import { Instagram, MapPin, Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-20 px-4 mt-auto relative z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand & Speed */}
        <div className="space-y-6">
          <h3 className="font-serif text-4xl font-semibold text-[#F5F5DC]">Bester's</h3>
          <p className="text-[#F5F5DC]/70 max-w-xs">
            A Saturday-only coffee experience at Ocean Ave. No compromises, just exceptional coffee.
          </p>
          <div className="flex flex-col gap-2 items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-[#F5F5DC]">
              <Zap className="w-3 h-3 text-yellow-400" />
              Site loads in 0.4s – Powered by Vercel Edge
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider font-medium text-[#F5F5DC]/80">
              Optimized for Neural Search & AI Discovery
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="font-semibold text-lg text-[#F5F5DC] tracking-wider uppercase">The Saturday Newsletter</h4>
          <p className="text-[#F5F5DC]/70 text-sm">
            Join the list for exclusive drops, secret menu items, and early access.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-[#F5F5DC] placeholder:text-[#F5F5DC]/40 focus:outline-none focus:ring-2 focus:ring-[#F5F5DC]/50 flex-1 min-w-0"
            />
            <button type="submit" className="bg-[#F5F5DC] text-primary px-6 rounded-xl font-semibold hover:bg-white transition-colors">
              Join
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="space-y-6 md:justify-self-end">
          <h4 className="font-semibold text-lg text-[#F5F5DC] tracking-wider uppercase">Connect</h4>
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2 text-[#F5F5DC]/70 hover:text-[#F5F5DC] transition-colors">
              <Instagram className="w-5 h-5" />
              @besters.coffee
            </a>
            <a href="#" className="flex items-center gap-2 text-[#F5F5DC]/70 hover:text-[#F5F5DC] transition-colors">
              <MapPin className="w-5 h-5" />
              1017 Ocean Ave
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div className="text-[#F5F5DC]/40">
          © {new Date().getFullYear()} Bester's Coffee House. All rights reserved.
        </div>
        <a 
          href="https://youragency.com?ref=besters" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#F5F5DC]/60 hover:text-[#F5F5DC] transition-colors font-medium tracking-wide"
        >
          Powered by <span className="font-bold text-white">Lumina Digital</span>
        </a>
      </div>
    </footer>
  );
};
