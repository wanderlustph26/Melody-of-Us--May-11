import { motion } from 'motion/react';
import { Music, Music2, Heart, Send, Sparkles, MessageCircle, Quote, ChevronDown, Check, Play, Pause, ArrowRight, Zap, Target, Layers, Star } from 'lucide-react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-pink rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,79,163,0.4)]">
            <Music className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-bold text-white tracking-tighter uppercase">Melody Of Us</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10">
          <a href="#" className="nav-link text-brand-pink border-b-2 border-brand-pink pb-1">Home</a>
          <a href="#how-it-works" className="nav-link">How it Works</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#samples" className="nav-link">Samples</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>

        <Link to="/order" className="bg-brand-pink hover:bg-brand-pink-soft text-white px-8 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold glow-pink glow-pink-hover transition-all">
          Create Song
        </Link>
      </div>
    </nav>
  );
};

export const Hero = () => {
  const [playingPreview, setPlayingPreview] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePreview = () => {
    if (playingPreview) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setPlayingPreview(!playingPreview);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-brand-bg">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pink/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-pink/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-12 pb-24">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <span className="w-2 h-2 bg-brand-pink rounded-full animate-pulse shadow-[0_0_8px_rgba(255,79,163,1)]"></span>
              <span className="text-[10px] text-brand-text-muted font-bold uppercase tracking-widest">Premium AI Music Customization</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white leading-[0.95] tracking-tight mb-8 uppercase">
              Turn Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-pink-soft">Story</span> <br />
              Into Music
            </h1>
            <p className="text-lg md:text-xl text-brand-text-muted mb-10 leading-relaxed max-w-xl font-medium">
              Create personalized songs powered by emotion, memories, and creativity. We translate your narrative into a sonic artifact that lasts generations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
              <Link 
                to="/order" 
                className="w-full sm:w-auto bg-brand-pink text-white px-12 py-6 rounded-2xl text-[14px] uppercase tracking-[0.4em] font-black hover:bg-brand-pink-soft transition-all glow-pink glow-pink-hover flex items-center justify-center gap-3 active:scale-95"
              >
                Create Your Custom Song <ArrowRight className="w-4 h-4" />
              </Link>
              
              <button 
                onClick={togglePreview}
                className="w-full sm:w-auto flex items-center justify-center gap-6 group px-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-pink/20 group-hover:border-brand-pink transition-all shadow-inner">
                  {playingPreview ? <Pause className="w-6 h-6 text-brand-pink" /> : <Play className="w-6 h-6 text-brand-pink fill-current" />}
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 mb-1">Aural Preview</p>
                  <p className="text-sm text-white font-bold tracking-tight">"Moment Architecture"</p>
                </div>
                <audio 
                  ref={audioRef}
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
                  onEnded={() => setPlayingPreview(false)}
                />
              </button>
            </div>

            <div className="flex items-center gap-6 border-t border-white/5 pt-10">
               <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-brand-pink fill-current" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">4.9/5 Average Rating</span>
               </div>
               <div className="w-[1px] h-4 bg-white/10"></div>
               <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-brand-pink fill-current" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Voted #1 Custom Music AI</span>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative glass-dark p-8 rounded-[48px] border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
              <div className="aspect-square rounded-[32px] overflow-hidden mb-6 bg-brand-bg border border-white/5 relative">
                <img 
                  src="https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=80&w=800" 
                  alt="AI Music UI"
                  className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-brand-pink/20 rounded-full flex items-center justify-center animate-pulse">
                    <Music2 className="w-10 h-10 text-brand-pink" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ['20%', '80%', '40%', '95%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="h-full bg-brand-pink"
                  ></motion.div>
                </div>
                <div className="flex justify-between">
                  <div className="h-6 w-32 bg-white/5 rounded"></div>
                  <div className="h-6 w-16 bg-white/5 rounded"></div>
                </div>
              </div>


            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Tell Your Story",
      description: "Answer intimate prompts about memories, lessons, and your unique bond."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Shape the Vibe",
      description: "Choose the mood, genre, and vocal energy that resonates with their soul."
    },
    {
      icon: <Music2 className="w-8 h-8" />,
      title: "AI Synthesis",
      description: "Our proprietary AI engine and human composers weave your words into a melody."
    },
    {
      icon: <Send className="w-8 h-8" />,
      title: "Share Legacy",
      description: "Receive a professional studio track and lyrics to gift an unforgettable memory."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-pink font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">The Synthesis Process</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">Your story, <br /><span className="text-brand-text-muted">orchestrated.</span></h2>
          </div>
          <p className="text-brand-text-muted max-w-sm mb-2 font-medium">A seamless blend of human emotion and generative precision to create your masterpiece.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-brand-card p-10 rounded-[40px] border border-white/5 hover:border-brand-pink/30 group transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand-pink group-hover:text-white transition-all duration-500 shadow-inner">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
              <p className="text-brand-text-muted leading-relaxed font-medium text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const About = () => {
  return (
    <section id="features" className="py-32 bg-[#171717] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-[32px] overflow-hidden border border-white/5 bg-brand-bg relative group">
                  <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800" alt="Studio" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg h-full"></div>
                </div>
                <div className="aspect-square rounded-[32px] overflow-hidden border border-white/5 bg-brand-pink p-8 shadow-[0_20px_40px_rgba(255,79,163,0.3)]">
                   <p className="text-4xl font-extrabold text-white mb-2 tracking-tighter leading-none">100%</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Original Scores</p>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                 <div className="aspect-square rounded-[32px] overflow-hidden border border-white/5 bg-brand-card p-10">
                    <Zap className="w-10 h-10 text-brand-pink mb-4" />
                    <p className="font-bold text-white text-lg">Next-Day Delivery</p>
                    <p className="text-xs text-brand-text-muted font-medium mt-2">Available for urgent moments.</p>
                 </div>
                 <div className="aspect-[4/5] rounded-[32px] overflow-hidden border border-white/5 bg-brand-bg relative group">
                  <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800" alt="Music" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-bg h-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-pink font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">Precision & Soul</span>
            <h2 className="text-5xl md:text-7xl mb-10 font-extrabold text-white tracking-tighter leading-[0.9]">Premium <br />Features. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-pink-soft">Legendary Impact.</span></h2>
            
            <div className="space-y-10">
              {[
                { icon: <Target className="w-6 h-6" />, title: "Hyper-Personalized Lyrics", desc: "Our AI processes your specific memories to ensure every word feels authentically you." },
                { icon: <Layers className="w-6 h-6" />, title: "Studio Grade Production", desc: "No hobbyist gear. Every track is mixed and mastered to Spotify-ready standards." },
                { icon: <Heart className="w-6 h-6" />, title: "Emotional Intelligence", desc: "Algorithms designed to understand human sentiment and musical tension." }
              ].map((feat, i) => (
                <div key={i} className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center text-brand-pink">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{feat.title}</h4>
                    <p className="text-brand-text-muted text-sm font-medium leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-14 pt-10 border-t border-white/5 flex flex-col sm:flex-row sm:items-center gap-12">
               <Link to="/order" className="group flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-brand-pink flex items-center justify-center group-hover:bg-brand-pink transition-all">
                     <ArrowRight className="w-6 h-6 text-brand-pink group-hover:text-white" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest text-white">Create Your Masterpiece</span>
               </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


