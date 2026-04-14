import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  dietary: string[];
  image: string;
  description: string;
}

interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  updateQuantity: (id: string, delta: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('besters_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('besters_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.item.id === id) {
        const newQuantity = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQuantity };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, { item, quantity }) => sum + (item.price * quantity), 0);
  const cartCount = cart.reduce((sum, { quantity }) => sum + quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
