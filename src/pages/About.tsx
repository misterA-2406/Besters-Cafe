import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-32 pb-40 max-w-3xl mx-auto px-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-16"
      >
        <div className="text-center space-y-6">
          <h1 className="font-serif text-6xl md:text-7xl font-semibold text-primary leading-tight">
            The Gesha Bean Journey
          </h1>
          <p className="text-xl text-primary/70 font-medium max-w-xl mx-auto leading-relaxed">
            Sourced from the high altitudes of Panama, roasted with precision in Los Angeles.
          </p>
        </div>

        <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-muted shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <img 
            src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&w=1200&q=80" 
            alt="Coffee Roasting" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg prose-stone mx-auto text-primary/80">
          <p className="font-serif text-2xl leading-relaxed text-primary">
            We believe that exceptional coffee shouldn't be confined to four walls. It should be experienced where the city meets the ocean.
          </p>
          <p>
            Every bean we serve is meticulously selected from single-origin farms that prioritize sustainable practices and unparalleled flavor profiles. Our signature Gesha pour-over is a testament to this commitment—offering delicate floral notes of jasmine and bergamot that you won't find in a standard cup.
          </p>
          
          <h2 className="font-serif text-4xl text-primary mt-12 mb-6">Saturday Rituals</h2>
          <p>
            Bester's isn't a daily habit; it's a Saturday ritual. By operating exclusively once a week, we ensure that every cup is crafted with maximum attention to detail. No rushed orders, no compromises. Just you, the ocean breeze, and the best coffee in Santa Monica.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
