import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Plus, Minus } from 'lucide-react';
import { MagneticButton } from '@/src/components/MagneticButton';
import { useCart } from '@/src/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toast } from 'sonner';

export const CartSheet = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const [hasShownToast, setHasShownToast] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      const hasHighTicket = cart.some(c => c.item.name.includes('Ethiopia Yirgacheffe Beans'));
      if (hasHighTicket && !hasShownToast) {
        setHasShownToast(true);
        toast.custom((t) => (
          <div className="bg-background border border-border p-4 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-3">
            <div>
              <h4 className="font-semibold text-primary">Wait! Don't miss your Saturday brew.</h4>
              <p className="text-sm text-primary/70">Enter your email to save your cart and get 10% off your first order.</p>
            </div>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="hello@example.com" 
                className="flex-1 bg-muted border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button 
                onClick={() => {
                  toast.dismiss(t);
                  toast.success("Cart saved! Check your email.");
                }}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        ), { duration: 10000 });
      }
    }
    setIsCartOpen(open);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col glass-slab border-l-0 sm:border-l border-white/20 p-0 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <SheetHeader className="p-6 border-b border-border/50 text-left">
          <SheetTitle className="font-serif text-3xl font-semibold text-primary">Your Order</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-primary/50 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p className="font-medium text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map(({ item, quantity }) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-primary">{item.name}</h4>
                      <span className="font-medium text-primary">${(item.price * quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-primary hover:bg-black/10 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">{quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-border/50 bg-white/5">
            <div className="flex justify-between items-center mb-6 text-primary">
              <span className="font-medium text-lg">Subtotal</span>
              <span className="font-bold text-2xl">${cartTotal.toFixed(2)}</span>
            </div>
            <MagneticButton 
              className="w-full h-16 text-lg shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
              onClick={() => {
                setIsCartOpen(false);
                navigate('/checkout');
              }}
            >
              Checkout <ChevronRight className="w-5 h-5 ml-2" />
            </MagneticButton>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
