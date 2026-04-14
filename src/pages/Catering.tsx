import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticButton } from '@/src/components/MagneticButton';
import { useContact } from '@/src/context/ContactContext';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Catering() {
  const { addLead } = useContact();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    guests: '',
    type: 'Corporate Pop-up',
    email: ''
  });

  const handleNext = () => {
    if (step === 1 && !formData.date) return toast.error('Please select a date');
    if (step === 2 && !formData.guests) return toast.error('Please select guest count');
    if (step === 3 && !formData.type) return toast.error('Please select event type');
    setStep(s => s + 1);
  };

  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return toast.error('Please enter your email');
    
    addLead(formData);
    toast.success('Inquiry Received', {
      description: "We'll be in touch shortly to plan your event.",
    });
    setStep(5); // Success step
  };

  return (
    <div className="pt-32 pb-40 max-w-4xl mx-auto px-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-16"
      >
        <div className="text-center space-y-6">
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-primary leading-tight">
            Private Events &<br />Corporate Pop-ups
          </h1>
          <p className="text-xl text-primary/70 font-medium max-w-xl mx-auto leading-relaxed">
            Bring the Bester's Saturday Ritual to your office or private gathering.
          </p>
        </div>

        <div className="glass-slab rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-white/20 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 pointer-events-none" />
          
          <div className="relative z-10 max-w-xl mx-auto w-full">
            {step < 5 && (
              <div className="flex justify-between items-center mb-8">
                <div className="text-sm font-semibold text-primary/60 uppercase tracking-wider">Step {step} of 4</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-primary/20'}`} />
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif text-3xl text-primary">When is your event?</h3>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-white/50 border border-primary/20 rounded-xl px-6 py-4 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm text-lg"
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif text-3xl text-primary">How many guests?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {['10-50', '50-100', '100+'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setFormData({...formData, guests: opt});
                            setTimeout(handleNext, 300);
                          }}
                          className={`py-4 px-6 rounded-xl border transition-all text-lg font-medium ${formData.guests === opt ? 'bg-primary text-primary-foreground border-primary shadow-lg' : 'bg-white/50 border-primary/20 text-primary hover:bg-white/80'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif text-3xl text-primary">What type of event?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['Corporate Pop-up', 'Private Party', 'Wedding', 'Other'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setFormData({...formData, type: opt});
                            setTimeout(handleNext, 300);
                          }}
                          className={`py-4 px-6 rounded-xl border transition-all text-lg font-medium ${formData.type === opt ? 'bg-primary text-primary-foreground border-primary shadow-lg' : 'bg-white/50 border-primary/20 text-primary hover:bg-white/80'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif text-3xl text-primary">Where should we send the proposal?</h3>
                    <input 
                      type="email" 
                      required
                      placeholder="hello@company.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/50 border border-primary/20 rounded-xl px-6 py-4 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm text-lg placeholder:text-primary/30"
                    />
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 py-8"
                  >
                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-serif text-4xl text-primary">Request Received</h3>
                    <p className="text-lg text-primary/70">
                      Thank you! We'll review your details and send a proposal to {formData.email} within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {step < 5 && (
                <div className="flex justify-between mt-12 pt-6 border-t border-primary/10">
                  {step > 1 ? (
                    <button type="button" onClick={handlePrev} className="flex items-center text-primary/60 hover:text-primary font-medium transition-colors">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </button>
                  ) : <div></div>}
                  
                  {step < 4 ? (
                    <MagneticButton type="button" onClick={handleNext} className="px-8 h-12">
                      Next <ArrowRight className="w-4 h-4 ml-2" />
                    </MagneticButton>
                  ) : (
                    <MagneticButton type="submit" className="px-8 h-12">
                      Submit Request
                    </MagneticButton>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
