import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const links = [
    { name: 'Menu', path: '/menu' },
    { name: 'Story', path: '/about' },
    { name: 'Location', path: '/location' },
    { name: 'Catering', path: '/catering' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-center pointer-events-none">
      <Link to="/" className="font-serif text-3xl font-bold text-primary pointer-events-auto drop-shadow-md">
        Bester's
      </Link>
      
      <div className="glass-slab px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-4 md:gap-6 pointer-events-auto shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-white/20">
        <div className="hidden md:flex items-center gap-6 border-r border-primary/20 pr-6">
          {links.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                location.pathname === link.path ? 'text-primary' : 'text-primary/60 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center border-r border-primary/20 pr-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger className="text-primary hover:text-primary/80 transition-colors">
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] glass-slab border-r border-white/20 p-6 flex flex-col z-[100]">
              <SheetHeader className="text-left mb-8">
                <SheetTitle className="font-serif text-3xl font-bold text-primary">Bester's</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6">
                {links.map(link => (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-serif transition-colors ${
                      location.pathname === link.path ? 'text-primary' : 'text-primary/60 hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <button 
          onClick={() => setIsCartOpen(true)} 
          className="relative text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase tracking-wider hidden sm:inline-block">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
