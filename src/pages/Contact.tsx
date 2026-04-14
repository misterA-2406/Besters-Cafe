import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MagneticButton } from '@/src/components/MagneticButton';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  return (
    <div className="pt-32 pb-40 max-w-2xl mx-auto px-4 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="font-serif text-5xl md:text-6xl font-semibold text-primary mb-4">Get in Touch</h1>
        <p className="text-lg text-primary/70">Have a question about our beans or catering? Drop us a line.</p>
      </div>

      <motion.form 
        className="glass-slab rounded-3xl p-8 md:p-12 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative">
          <input 
            type="text" 
            id="name"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            className="peer w-full bg-transparent border-b-2 border-primary/20 px-0 py-3 text-primary placeholder-transparent focus:outline-none focus:border-primary transition-colors"
            placeholder="Name"
          />
          <label 
            htmlFor="name" 
            className="absolute left-0 -top-3.5 text-sm text-primary/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary font-medium"
          >
            Name
          </label>
        </div>

        <div className="relative">
          <input 
            type="email" 
            id="email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className="peer w-full bg-transparent border-b-2 border-primary/20 px-0 py-3 text-primary placeholder-transparent focus:outline-none focus:border-primary transition-colors"
            placeholder="Email"
          />
          <label 
            htmlFor="email" 
            className="absolute left-0 -top-3.5 text-sm text-primary/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary font-medium"
          >
            Email
          </label>
        </div>

        <div className="relative">
          <textarea 
            id="message"
            rows={4}
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            className="peer w-full bg-transparent border-b-2 border-primary/20 px-0 py-3 text-primary placeholder-transparent focus:outline-none focus:border-primary transition-colors resize-none"
            placeholder="Message"
          />
          <label 
            htmlFor="message" 
            className="absolute left-0 -top-3.5 text-sm text-primary/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary font-medium"
          >
            Message
          </label>
        </div>

        <MagneticButton className="w-full h-14 text-lg mt-4 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
          Send Message
        </MagneticButton>
      </motion.form>
    </div>
  );
}
