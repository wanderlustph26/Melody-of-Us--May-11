import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Music, Heart, Sparkles, CheckCircle2, ArrowRight, Home } from 'lucide-react';

export const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-6 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-brand-pink/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-brand-pink/5 rounded-full blur-[120px]"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <div className="w-32 h-32 bg-brand-pink/10 rounded-full flex items-center justify-center mx-auto mb-12 text-brand-pink shadow-[0_0_50px_rgba(255,79,163,0.3)]">
          <CheckCircle2 className="w-16 h-16" />
        </div>

        <span className="inline-block px-6 py-2 bg-brand-pink/10 text-brand-pink text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-8 shadow-lg shadow-brand-pink/10">
          Uplink Successful
        </span>
        
        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase">
          Your Legacy <br /><span className="text-brand-text-muted">has begun.</span>
        </h1>
        
        <p className="text-lg text-brand-text-muted mb-16 font-medium balance max-w-xl mx-auto italic">
          We've received your narrative chapters. The creative core is now synchronizing to architect your custom artifact.
        </p>

        <div className="bg-brand-card p-10 md:p-16 rounded-[64px] border border-white/5 shadow-2xl mb-16 text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full blur-2xl group-hover:bg-brand-pink/10 transition-colors"></div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-10 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-brand-pink" /> Processing pipeline
          </h3>
          <ul className="space-y-10">
            <li className="flex gap-6">
              <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center shrink-0 text-brand-pink font-black text-xs border border-brand-pink/20">01</div>
              <div>
                <p className="font-black text-white mb-1 uppercase tracking-widest text-sm">Confirmation Packet</p>
                <p className="text-sm text-brand-text-muted font-medium">Detailed receipt and timeline sent to your primary email address.</p>
              </div>
            </li>
            <li className="flex gap-6">
              <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center shrink-0 text-brand-pink font-black text-xs border border-brand-pink/20">02</div>
              <div>
                <p className="font-black text-white mb-1 uppercase tracking-widest text-sm">Composer Allocation</p>
                <p className="text-sm text-brand-text-muted font-medium">We're assigning a lead artist whose sonic profile matches your requested mood.</p>
              </div>
            </li>
            <li className="flex gap-6">
              <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center shrink-0 text-brand-pink font-black text-xs border border-brand-pink/20">03</div>
              <div>
                <p className="font-black text-white mb-1 uppercase tracking-widest text-sm">Sonic Delivery</p>
                <p className="text-sm text-brand-text-muted font-medium italic">Estimated architectural completion: within 48 cycles.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => navigate('/')}
            className="bg-white text-brand-bg px-12 py-6 rounded-[24px] font-black text-[12px] uppercase tracking-[0.4em] hover:bg-brand-pink hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
          >
            <Home className="w-5 h-5" /> Return to Genesis
          </button>
          <button 
            className="glass-dark text-white border border-white/10 px-12 py-6 rounded-[24px] font-black text-[12px] uppercase tracking-[0.4em] hover:bg-white/5 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
             Track Artifact <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
