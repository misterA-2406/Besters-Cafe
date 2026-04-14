import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { GlobalActionBar } from './GlobalActionBar';
import { Footer } from './Footer';
import { CartSheet } from './CartSheet';
import { CartProvider } from '@/src/context/CartContext';
import { ContactProvider } from '@/src/context/ContactContext';
import { Toaster } from '@/components/ui/sonner';

export const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const isMenuPage = location.pathname === '/menu';

  return (
    <ContactProvider>
      <CartProvider>
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 flex flex-col">
          <div className="bg-noise" />
          {!isMenuPage && <Navbar />}
          
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 relative z-10 flex flex-col"
            >
              {outlet}
            </motion.main>
          </AnimatePresence>

          <Footer />
          <GlobalActionBar />
          <CartSheet />
          <Toaster position="top-center" />
        </div>
      </CartProvider>
    </ContactProvider>
  );
};
