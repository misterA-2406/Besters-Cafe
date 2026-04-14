import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Coffee } from 'lucide-react';
import { MagneticButton } from '@/src/components/MagneticButton';

export const GlobalActionBar = () => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-safe pointer-events-none">
      <div className="glass-slab max-w-md mx-auto rounded-full p-2 flex items-center justify-between gap-2 pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-white/20">
        <MagneticButton 
          className="flex-1 h-14 bg-primary text-primary-foreground text-sm tracking-wider uppercase"
          onClick={() => navigate('/menu')}
        >
          <Coffee className="w-5 h-5 mr-2" />
          Order Now
        </MagneticButton>
        
        <div className="flex gap-2">
          <MagneticButton 
            className="w-14 h-14 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/20"
            title="Ready to Chat"
            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
          >
            <MessageCircle className="w-6 h-6" />
          </MagneticButton>

          <MagneticButton 
            className="w-14 h-14 rounded-full bg-white/50 text-primary hover:bg-white/80 backdrop-blur-md border border-white/40"
            onClick={() => window.open('tel:+1234567890')}
          >
            <Phone className="w-5 h-5" />
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};
