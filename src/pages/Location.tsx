import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, ArrowLeft, CalendarPlus } from 'lucide-react';
import { MagneticButton } from '@/src/components/MagneticButton';

export default function Location() {
  const navigate = useNavigate();
  const [timeStatus, setTimeStatus] = useState({ isLive: false, days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // Get current time in Los Angeles
      const laTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
      
      const day = laTime.getDay();
      const hours = laTime.getHours();
      
      // Live between 8 AM and 2 PM on Saturday
      const isLive = day === 6 && hours >= 8 && hours < 14;
      
      let daysUntilSaturday = 6 - day;
      if (day === 6 && hours >= 14) {
        daysUntilSaturday = 7;
      } else if (day === 6 && hours < 8) {
        daysUntilSaturday = 0;
      }
      
      const targetDate = new Date(laTime);
      targetDate.setDate(laTime.getDate() + daysUntilSaturday);
      targetDate.setHours(8, 0, 0, 0);
      
      const diff = targetDate.getTime() - laTime.getTime();
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      
      setTimeStatus({ isLive, days: d, hours: h, minutes: m });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Bester's Coffee House//EN
BEGIN:VEVENT
SUMMARY:Bester's Coffee Saturday Ritual
DESCRIPTION:Join us for our weekly Saturday coffee ritual.
LOCATION:1017 Ocean Ave, Santa Monica, CA 90403
RRULE:FREQ=WEEKLY;BYDAY=SA
DTSTART:20240106T160000Z
DTEND:20240106T220000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'besters-ritual.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 pb-32 max-w-4xl mx-auto px-4 min-h-screen flex flex-col">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-primary/60 hover:text-primary transition-colors mb-4 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold text-primary mb-4">Live Tracker</h1>
        <p className="text-primary/80 text-lg">Find the Bester's cart this Saturday.</p>
      </div>

      <motion.div 
        className="glass-slab rounded-3xl p-2 flex-1 flex flex-col overflow-hidden relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Simulated Map */}
        <div className="flex-1 bg-muted rounded-2xl overflow-hidden relative min-h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" 
            alt="Santa Monica Map" 
            className="w-full h-full object-cover opacity-50 grayscale"
          />
          
          {/* Map Pin */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
          >
            {timeStatus.isLive ? (
              <div className="glass-slab px-4 py-2 rounded-full mb-2 flex items-center gap-2 border-[#22c55e]/30 bg-white/20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22c55e]"></span>
                </span>
                <span className="text-sm font-bold text-primary tracking-wide">LIVE NOW</span>
              </div>
            ) : (
              <div className="glass-slab px-4 py-2 rounded-full mb-2 flex items-center gap-2 border-slate-400/30 bg-white/20">
                <span className="relative flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-500"></span>
                </span>
                <span className="text-sm font-bold text-primary tracking-wide">Next Drop: Saturday @ 8:00 AM</span>
              </div>
            )}
            
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-500 ${timeStatus.isLive ? 'bg-[#22c55e] text-white' : 'bg-slate-800 text-white'}`}>
              <MapPin className="w-7 h-7" />
            </div>
          </motion.div>
        </div>

        {/* Countdown & Actions */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-3xl font-semibold text-primary">Santa Monica Pier</h3>
            <p className="text-primary/70 mt-1 text-lg">1017 Ocean Ave, Santa Monica, CA 90403</p>
            
            {!timeStatus.isLive && (
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <div className="text-sm font-semibold uppercase tracking-wider text-primary/60">Next Ritual</div>
                <div className="flex gap-2">
                  <div className="glass-slab px-3 py-1.5 rounded-lg text-center min-w-[60px]">
                    <div className="text-xl font-bold text-primary">{timeStatus.days}</div>
                    <div className="text-[10px] uppercase text-primary/60">Days</div>
                  </div>
                  <div className="glass-slab px-3 py-1.5 rounded-lg text-center min-w-[60px]">
                    <div className="text-xl font-bold text-primary">{timeStatus.hours}</div>
                    <div className="text-[10px] uppercase text-primary/60">Hrs</div>
                  </div>
                  <div className="glass-slab px-3 py-1.5 rounded-lg text-center min-w-[60px]">
                    <div className="text-xl font-bold text-primary">{timeStatus.minutes}</div>
                    <div className="text-[10px] uppercase text-primary/60">Min</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <MagneticButton 
              variant="secondary"
              className="h-14 px-6 w-full sm:w-auto glass-slab bg-white/20 text-primary hover:bg-white/30 border-white/20"
              onClick={generateICS}
            >
              <CalendarPlus className="w-5 h-5 mr-2" />
              Add to Calendar
            </MagneticButton>
            <MagneticButton 
              className="h-14 px-8 w-full sm:w-auto"
              onClick={() => window.open('https://maps.google.com/?q=1017+Ocean+Ave,+Santa+Monica,+CA', '_blank')}
            >
              Get Directions
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
