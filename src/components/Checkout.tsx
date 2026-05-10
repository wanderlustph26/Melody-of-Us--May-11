import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Gift, 
  Play, 
  ArrowRight, 
  Lock,
  Star,
  Music,
  ShoppingBag,
  Loader2
} from 'lucide-react';

export const Checkout = () => {
  const [email, setEmail] = useState("you@email.com");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || { recipient: 'Melody Of Us' };

  useEffect(() => {
    if (formData.email) {
      setEmail(formData.email);
    }
  }, [formData.email]);

  const handleCheckout = () => {
    setIsRedirecting(true);
    // Simulate PayPal Redirect
    setTimeout(() => {
      navigate('/thank-you');
    }, 2000);
  };

  const samples = [
    {
      title: "Sent to Me from God",
      orderedBy: "Pamela S.",
      quote: "Absolutely beautiful, you captured such special moments… we both were crying.",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      title: "Saving Grace",
      orderedBy: "Wendy B.",
      quote: "This is absolutely breathtaking. I can't believe it… I am going to have a hard time keeping this a secret until Sunday.",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      title: "Stronger Now",
      orderedBy: "Markeeta B.",
      quote: "Very very wonderful song. I absolutely loved it and so did Dave!",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-pink/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <AnimatePresence>
        {isRedirecting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-bg/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
          >
            <div className="flex flex-col items-center max-w-sm">
              <div className="w-24 h-24 bg-brand-pink/10 rounded-full flex items-center justify-center mb-8">
                <Loader2 className="w-10 h-10 text-brand-pink animate-spin" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight uppercase tracking-[0.1em]">Securing Uplink...</h2>
              <p className="text-brand-text-muted font-medium italic">Encrypting your narrative for delivery to the creative core.</p>
              
              <div className="mt-12 flex items-center justify-center gap-6 opacity-40 grayscale filter invert brightness-200">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                <div className="h-4 w-[1px] bg-white/20"></div>
                <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.3em] text-white">
                  <Lock className="w-3 h-3" /> Protected
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-pink/10 text-brand-pink px-6 py-2 rounded-full inline-flex items-center gap-3 mb-10 text-[10px] font-black uppercase tracking-[0.4em] shadow-lg shadow-brand-pink/5"
          >
            <Clock className="w-4 h-4" />
            Spot availability: 4 slots remaining today
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.8] uppercase">
            Almost <br /> <span className="text-brand-text-muted">There.</span>
          </h1>
          <p className="text-lg text-brand-text-muted font-medium max-w-xl mx-auto">
            Reviewing the parameters for your {formData.occasion || 'custom'} production. one click away from initializing glory.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-12 space-y-12">
            <div className="bg-brand-card p-10 md:p-16 rounded-[60px] border border-white/5 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                  <div className="flex items-center gap-4 text-brand-pink mb-2">
                    <Music2 className="w-6 h-6" />
                    <span className="text-[10px] uppercase font-black tracking-[0.4em]">Project Configuration</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                    <div className="space-y-2">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Protagonist</p>
                      <p className="text-2xl font-bold text-white tracking-tight">{formData.recipient}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Milestone</p>
                      <p className="text-2xl font-bold text-white tracking-tight">{formData.occasion || 'Special'}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Frequency</p>
                      <p className="text-2xl font-bold text-white tracking-tight italic capitalize">{formData.mood || 'Tailored'}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Artifact Type</p>
                      <p className="text-2xl font-bold text-white tracking-tight">{formData.genre || 'Acoustic'}</p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 mb-3 block">Uplink target email</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl focus:border-brand-pink transition-all p-5 text-lg font-medium text-white outline-none" 
                    />
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="bg-[#1a1a1a] p-10 rounded-[48px] border border-white/5 shadow-inner">
                    <div className="flex justify-between items-end mb-10 pb-10 border-b border-white/5">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink mb-2">Total investment</p>
                        <p className="text-5xl font-black text-white">$99 <span className="text-sm font-medium text-white/20 uppercase tracking-widest ml-1">USD</span></p>
                      </div>
                      <div className="text-right">
                         <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 line-through mb-1">$199</p>
                         <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">50% Legacy Discount</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-brand-pink text-white py-6 rounded-2xl font-black text-[14px] uppercase tracking-[0.6em] hover:bg-brand-pink-soft transition-all shadow-xl shadow-brand-pink/30 flex items-center justify-center gap-4 group"
                    >
                      Process Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                    
                    <div className="mt-10 flex flex-wrap justify-center gap-6 opacity-30 grayscale invert brightness-200">
                      <ShieldCheck className="w-8 h-8" />
                      <Lock className="w-8 h-8" />
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    
                    <p className="mt-8 text-center text-[9px] font-black uppercase tracking-[0.3em] text-white/20">30-Day Emotional Satisfaction Guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 grid md:grid-cols-2 gap-12">
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black text-white tracking-widest uppercase">Sonic Precedents</h2>
              <div className="h-[1px] flex-1 bg-white/5"></div>
            </div>
            
            <div className="space-y-6">
              {samples.map((sample, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-brand-card p-10 rounded-[40px] border border-white/5 hover:border-brand-pink/20 transition-all transition-duration-500"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-extrabold text-xl text-white tracking-tight">{sample.title}</h3>
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mt-1">Requested by {sample.orderedBy}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center text-brand-pink cursor-pointer hover:bg-brand-pink hover:text-white transition-all shadow-sm">
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                  <blockquote className="text-brand-text-muted italic font-medium leading-relaxed pl-6 border-l-2 border-brand-pink/30">
                    "{sample.quote}"
                  </blockquote>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-dark p-16 rounded-[60px] border border-white/5 flex flex-col justify-center">
            <h3 className="text-3xl font-extrabold text-white mb-10 tracking-tight">Artifact Specifications</h3>
            <div className="space-y-10">
              {[
                { title: "Lossless Master", desc: "Studio-grade frequency response, ready for eternity." },
                { title: "Narrative Sync", desc: "Chapters woven directly into the rhythmic DNA." },
                { title: "Express Deployment", desc: "Complete architectural review in 24-48 cycles." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-pink/10 flex-shrink-0 flex items-center justify-center text-brand-pink transform rotate-3">
                    <Music className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-md uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-sm text-brand-text-muted leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 pt-16 border-t border-white/10">
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-bg bg-brand-card flex items-center justify-center text-[10px] font-black text-brand-pink">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] uppercase font-black tracking-widest text-brand-text-muted">Trusted by 10,000+ souls</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
