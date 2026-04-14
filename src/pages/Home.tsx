import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { MagneticButton } from '@/src/components/MagneticButton';

export default function Home() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 500], [0.4, 0]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Bester's Coffee House",
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1017 Ocean Ave",
      "addressLocality": "Santa Monica",
      "addressRegion": "CA",
      "postalCode": "90403",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0165,
      "longitude": -118.5016
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "512"
    },
    "review": [
      {
        "@type": "Review",
        "author": "Sarah Jenkins",
        "datePublished": "2023-10-14",
        "reviewBody": "The Gesha pour-over is life-changing. Best Saturday ritual in Santa Monica.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0 origin-center"
          style={{ scale }}
        >
          <img 
            src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=2000&q=80" 
            alt="Premium Coffee Bag" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" 
            style={{ opacity }}
          />
          <div className="absolute inset-0 bg-background/40" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="font-serif text-7xl md:text-9xl font-semibold text-primary leading-none tracking-tighter mb-6 drop-shadow-lg">
              Bester's
            </h1>
            <p className="text-xl md:text-3xl text-primary font-medium max-w-2xl mx-auto mb-8 drop-shadow-md">
              A Saturday-only coffee experience at Ocean Ave. No compromises, just exceptional coffee.
            </p>
            
            {/* Social Proof Counter */}
            <div className="inline-flex items-center gap-3 glass-slab px-6 py-3 rounded-full mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-white/20">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                    alt="Customer" 
                    className="w-8 h-8 rounded-full border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-primary tracking-wide">
                Serving 500+ locals every Saturday on Ocean Ave.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton 
              className="h-16 px-12 text-lg w-full sm:w-auto shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              onClick={() => navigate('/menu')}
            >
              Order Now
            </MagneticButton>
            <MagneticButton 
              variant="secondary"
              className="h-16 px-12 text-lg w-full sm:w-auto glass-slab bg-white/20 text-primary hover:bg-white/30 border-white/20"
              onClick={() => navigate('/location')}
            >
              Find the Cart
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </>
  );
}
