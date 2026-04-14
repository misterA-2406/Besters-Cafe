import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Menu as MenuIcon } from 'lucide-react';
import { MagneticButton } from '@/src/components/MagneticButton';
import { useCart } from '@/src/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const MENU_ITEMS = [
  { id: '1', name: 'Gesha Pour-Over', category: 'Espresso', price: 9.50, dietary: ['Vegan', 'GF'], image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80', description: 'Floral, jasmine, bergamot notes.' },
  { id: '2', name: 'Oat Milk Latte', category: 'Espresso', price: 7.50, dietary: ['Vegan'], image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?auto=format&fit=crop&w=400&q=80', description: 'Creamy oat milk with our signature espresso blend.' },
  { id: '3', name: 'Vanilla Sweet Cream Cold Brew', category: 'Cold Brew', price: 6.50, dietary: ['GF'], image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80', description: 'Slow-steeped cold brew topped with house-made vanilla sweet cream.' },
  { id: '4', name: 'Almond Croissant', category: 'Pastries', price: 5.50, dietary: [], image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', description: 'Flaky, buttery croissant filled with almond frangipane.' },
  { id: '5', name: 'Vegan Blueberry Muffin', category: 'Pastries', price: 4.50, dietary: ['Vegan'], image: 'https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?auto=format&fit=crop&w=400&q=80', description: 'Moist and loaded with wild blueberries.' },
  { id: '6', name: 'Ethiopia Yirgacheffe Beans', category: 'Beans', price: 22.00, dietary: ['Vegan', 'GF'], image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=400&q=80', description: '12oz whole bean. Light roast with notes of peach and black tea.' },
];

const CATEGORIES = ['Espresso', 'Cold Brew', 'Pastries', 'Beans'];

export default function Menu() {
  const { addToCart, cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [subscriptions, setSubscriptions] = useState<Record<string, boolean>>({});

  const toggleSubscription = (id: string) => {
    setSubscriptions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Bester's Coffee House Menu",
    "hasMenuSection": [
      {
        "@type": "MenuSection",
        "name": "Coffee & Pastries",
        "hasMenuItem": MENU_ITEMS.map(item => ({
          "@type": "MenuItem",
          "name": item.name,
          "description": item.description,
          "offers": {
            "@type": "Offer",
            "price": item.price,
            "priceCurrency": "USD"
          }
        }))
      }
    ]
  };

  const filteredItems = MENU_ITEMS.map(item => {
    let match = true;
    if (dietaryFilter !== 'all') {
      match = item.dietary.includes(dietaryFilter);
    }
    return { ...item, match };
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="pt-32 pb-8 max-w-5xl mx-auto px-4">
        <div>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-primary mb-6">Menu</h1>
          
          {/* Dietary Filter */}
          <div className="flex gap-3">
            {['all', 'Vegan', 'GF'].map(filter => (
              <Badge 
                key={filter}
                variant={dietaryFilter === filter ? 'default' : 'outline'}
                className={`cursor-pointer px-5 py-2 text-sm uppercase tracking-wider transition-all ${
                  dietaryFilter === filter 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-primary border-primary/20 hover:bg-primary/5'
                }`}
                onClick={() => setDietaryFilter(filter)}
              >
                {filter === 'all' ? 'All Items' : filter}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Combined Sticky Header */}
      <div className="sticky top-0 z-40 w-full glass-slab border-x-0 rounded-none py-4 mb-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="font-serif text-2xl font-bold text-primary drop-shadow-md">
              Bester's
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 border-r border-primary/20 pr-6">
                {[
                  { name: 'Menu', path: '/menu' },
                  { name: 'Story', path: '/about' },
                  { name: 'Location', path: '/location' },
                  { name: 'Catering', path: '/catering' },
                  { name: 'Contact', path: '/contact' },
                ].map(link => (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    className="text-sm font-semibold uppercase tracking-wider text-primary/60 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="md:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger className="text-primary hover:text-primary/80 transition-colors">
                  <MenuIcon className="w-5 h-5" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] glass-slab border-r border-white/20 p-6 flex flex-col z-[100]">
                  <SheetHeader className="text-left mb-8">
                    <SheetTitle className="font-serif text-3xl font-bold text-primary">Bester's</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6">
                    {[
                      { name: 'Menu', path: '/menu' },
                      { name: 'Story', path: '/about' },
                      { name: 'Location', path: '/location' },
                      { name: 'Catering', path: '/catering' },
                      { name: 'Contact', path: '/contact' },
                    ].map(link => (
                      <Link 
                        key={link.path} 
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-2xl font-serif text-primary/60 hover:text-primary transition-colors"
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
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    document.getElementById(`category-${category}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors ${
                    activeCategory === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-primary hover:bg-primary/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>
      </div>

      <div className="pb-40 max-w-5xl mx-auto px-4">
        {/* Menu Items */}
        <div className="space-y-16">
          {CATEGORIES.map(category => {
            const categoryItems = filteredItems.filter(item => item.category === category);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category} id={`category-${category}`} className="scroll-mt-40">
                <h2 className="font-serif text-4xl font-semibold text-primary mb-8 border-b border-primary/10 pb-4">{category}</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {categoryItems.map(item => {
                    const isSubscribed = subscriptions[item.id] || false;
                    const displayPrice = isSubscribed ? item.price * 0.9 : item.price;
                    
                    return (
                    <motion.div 
                      key={item.id}
                      layout
                      className={`glass-slab flex flex-col sm:flex-row gap-5 p-5 rounded-3xl transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-white/20 ${
                        item.match ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-20 grayscale'
                      }`}
                    >
                      <div className="w-full sm:w-32 h-48 sm:h-32 rounded-2xl overflow-hidden shrink-0 bg-muted">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="flex flex-col flex-1 justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-semibold text-primary leading-tight text-lg">{item.name}</h3>
                            <div className="flex flex-col items-end">
                              <span className="font-medium text-primary">${displayPrice.toFixed(2)}</span>
                              {isSubscribed && <span className="text-[10px] text-primary/60 line-through">${item.price.toFixed(2)}</span>}
                            </div>
                          </div>
                          <p className="text-sm text-primary/70 mt-2 line-clamp-2 leading-relaxed">{item.description}</p>
                          {item.dietary.length > 0 && (
                            <div className="flex gap-1.5 mt-3">
                              {item.dietary.map(d => (
                                <span key={d} className="text-[10px] uppercase tracking-wider font-bold text-primary/60 bg-primary/5 px-2 py-1 rounded-md">
                                  {d}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {item.category === 'Beans' && (
                          <div className="mt-4 flex items-center gap-2 bg-white/30 p-1 rounded-lg border border-primary/10">
                            <button 
                              onClick={() => toggleSubscription(item.id)}
                              className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${!isSubscribed ? 'bg-white shadow-sm text-primary' : 'text-primary/60 hover:text-primary'}`}
                            >
                              One-time
                            </button>
                            <button 
                              onClick={() => toggleSubscription(item.id)}
                              className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${isSubscribed ? 'bg-primary text-primary-foreground shadow-sm' : 'text-primary/60 hover:text-primary'}`}
                            >
                              Subscribe (-10%)
                            </button>
                          </div>
                        )}

                        <MagneticButton 
                          onClick={() => addToCart({ ...item, price: displayPrice, name: isSubscribed ? `${item.name} (Subscription)` : item.name })}
                          disabled={!item.match}
                          className="w-full mt-4 h-12 text-sm"
                        >
                          Add to Order
                        </MagneticButton>
                      </div>
                    </motion.div>
                  )})}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
