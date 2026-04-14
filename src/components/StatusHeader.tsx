import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const StatusHeader = () => {
  const [status, setStatus] = useState<'live' | 'countdown'>('countdown');
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();

      // Saturday is 6. Live between 9 AM (9) and 2 PM (14)
      if (day === 6 && hours >= 9 && hours < 14) {
        setStatus('live');
      } else {
        setStatus('countdown');
        // Calculate next Saturday 9 AM
        const nextSaturday = new Date(now);
        nextSaturday.setDate(now.getDate() + ((6 - day + 7) % 7));
        if (day === 6 && hours >= 14) {
          nextSaturday.setDate(nextSaturday.getDate() + 7);
        }
        nextSaturday.setHours(9, 0, 0, 0);

        const diff = nextSaturday.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeRemaining(`${days}d ${hrs}h`);
        } else {
          setTimeRemaining(`${hrs}h ${mins}m`);
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
      <AnimatePresence mode="wait">
        {status === 'live' ? (
          <motion.div
            key="live"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="glass-slab pointer-events-auto flex items-center gap-2 px-5 py-2 rounded-full"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide text-primary">LIVE AT OCEAN AVE</span>
          </motion.div>
        ) : (
          <motion.div
            key="countdown"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="glass-slab pointer-events-auto flex items-center gap-2 px-5 py-2 rounded-full"
          >
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            <span className="text-sm font-semibold tracking-wide text-primary/80">
              NEXT DROP: <span className="text-primary">{timeRemaining}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
