import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '@/src/components/MagneticButton';
import { useCart } from '@/src/context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal } = useCart();
  const [step, setStep] = useState(1);

  if (cart.length === 0 && step === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="font-serif text-4xl font-semibold text-primary mb-4">Your cart is empty</h1>
        <MagneticButton onClick={() => navigate('/menu')} className="px-8 h-12">
          Return to Menu
        </MagneticButton>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 max-w-2xl mx-auto px-4 min-h-screen">
      <div className="mb-8">
        {step === 1 && (
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-primary/60 hover:text-primary transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
        )}
        <h1 className="font-serif text-5xl md:text-6xl font-semibold text-primary mb-4">
          {step === 1 ? 'Checkout' : 'Order Confirmed'}
        </h1>
      </div>

      <motion.div 
        className="glass-slab rounded-3xl p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {step === 1 ? (
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-lg text-primary mb-4">Order Summary</h3>
              <div className="space-y-3">
                {cart.map((c) => (
                  <div key={c.item.id} className="flex justify-between text-primary/80">
                    <span>{c.quantity}x {c.item.name}</span>
                    <span>${(c.item.price * c.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-border/50 pt-3 mt-3 flex justify-between font-bold text-primary text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-primary">Payment Details</h3>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Name on Card" 
                  className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-3 text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input 
                  type="text" 
                  placeholder="Card Number" 
                  className="w-full bg-white/5 border border-primary/20 rounded-xl px-4 py-3 text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-1/2 bg-white/5 border border-primary/20 rounded-xl px-4 py-3 text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <input 
                    type="text" 
                    placeholder="CVC" 
                    className="w-1/2 bg-white/5 border border-primary/20 rounded-xl px-4 py-3 text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            <MagneticButton 
              className="w-full h-14 text-lg"
              onClick={() => {
                // Simulate payment processing
                setTimeout(() => setStep(2), 800);
              }}
            >
              Pay ${cartTotal.toFixed(2)}
            </MagneticButton>
          </div>
        ) : (
          <motion.div 
            className="flex flex-col items-center text-center py-12"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="w-20 h-20 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl font-semibold text-primary mb-2">Thank you!</h2>
            <p className="text-primary/70 mb-8 max-w-sm">
              Your order has been received. We'll have it ready for you at the cart in 5-10 minutes.
            </p>
            <MagneticButton 
              className="h-12 px-8"
              onClick={() => {
                localStorage.removeItem('besters_cart');
                window.location.href = '/';
              }}
            >
              Back to Home
            </MagneticButton>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
