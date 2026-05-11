import { motion } from 'motion/react';
import { Heart, Quote, Mail, ArrowRight, Music2, Search, HelpCircle, PackageCheck, PlayCircle, Sparkles, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Portfolio = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [audio] = useState(new Audio());

  const samples = [
    {
      title: "Atmospheric Love",
      theme: "Anniversary",
      style: "Cinematic Ambient",
      vocal: "Ethereal Harmony",
      story: "A timeless journey through a decade of shared laughter and silent understanding.",
      image: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80&w=800",
      audio: "https://suno.com/song/a72ec2c7-8076-4878-8a5c-5dea225551b6?sh=u7A8r1Yt5hjtD54i",
    },
    {
      title: "Apology",
      theme: "The Second Chance",
      style: "Soulful R&B",
      vocal: "Warm, Sincere Male",
      story: "A heartfelt journey of reconciliation and the courage to ask for a new beginning.",
      image: "https://images.unsplash.com/photo-1494028698538-2cd52a400b17?auto=format&fit=crop&q=80&w=800",
      audio: "https://suno.com/song/84588b3d-7772-4ecb-a3ca-2f9eb3677c35?sh=8DU2bGBIwZtcp0rk",
    },
    {
      title: "Celebration",
      theme: "Neon Hearts",
      style: "Vibrant Techno-Pop",
      vocal: "High-Energy Female",
      story: "A pulse-pounding anthem celebrating the electric joy of friendship and shared memories.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
      audio: "https://suno.com/song/dc4a50d2-1bac-4296-a592-80455d9f1f2c?sh=xnU6sUf2WI0mfq3R",
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const togglePlay = (idx: number) => {
    const url = samples[idx].audio;
    
    // If it's a Suno link or doesn't end in an audio extension, open in new tab
    if (url.includes('suno.com') || !url.match(/\.(mp3|wav|ogg|m4a)$/i)) {
      window.open(url, '_blank');
      return;
    }

    if (playingIndex === idx) {
      audio.pause();
      setPlayingIndex(null);
    } else {
      audio.src = url;
      audio.play();
      setPlayingIndex(idx);
    }
  };

  audio.onended = () => setPlayingIndex(null);

  return (
    <section id="samples" className="py-32 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-pink/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-brand-pink font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">Aural Artifacts</span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tighter">Sonic Stories <br /> <span className="text-brand-text-muted">We've Captured.</span></h2>
          <p className="text-brand-text-muted max-w-2xl mx-auto font-medium">Explore a few examples of how we translate emotions into professional-grade musical productions.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {samples.map((sample, idx) => (
            <motion.div 
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="bg-brand-card rounded-[40px] border border-white/5 overflow-hidden group transition-all duration-500 hover:border-brand-pink/20"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={sample.image} 
                  alt={sample.title} 
                  className={`w-full h-full object-cover transition-transform duration-[1.5s] ${hoveredIndex === idx ? 'scale-110 blur-sm' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-opacity duration-500">
                  <motion.div
                    animate={{ scale: hoveredIndex === idx ? 1.1 : 1, opacity: hoveredIndex === idx ? 1 : (playingIndex === idx ? 1 : 0) }}
                    onClick={() => togglePlay(idx)}
                    className="w-20 h-20 bg-brand-pink rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,79,163,0.5)] cursor-pointer hover:scale-110 transition-transform"
                  >
                    {playingIndex === idx ? (
                      <div className="flex gap-1 items-center">
                        <motion.div animate={{ height: [8, 20, 8] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white" />
                        <motion.div animate={{ height: [15, 5, 15] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white" />
                        <motion.div animate={{ height: [10, 25, 10] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-white" />
                      </div>
                    ) : (
                      <PlayCircle className="w-10 h-10 text-white" />
                    )}
                  </motion.div>
                </div>

                {playingIndex === idx && (
                   <div className="absolute bottom-6 left-6 right-6">
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-brand-pink" 
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 30, ease: "linear" }}
                        />
                      </div>
                   </div>
                )}

                <div className="absolute top-6 left-6">
                  <span className="bg-brand-pink text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg">
                    {sample.theme}
                  </span>
                </div>
              </div>

              <div className="p-10">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-brand-pink uppercase tracking-widest">
                  <Music2 className="w-3 h-3" /> {sample.style}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{sample.title}</h3>
                <p className="text-brand-text-muted text-sm font-medium leading-relaxed mb-8 italic">"{sample.story}"</p>
                
                <Link 
                  to="/order"
                  className="inline-flex items-center gap-2 text-brand-pink text-[11px] font-black uppercase tracking-widest group-hover:gap-4 transition-all"
                >
                  Create Similar <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const testimonials = [
    {
      text: "The emotional depth of the lyrics was beyond anything I expected. It actually felt like they had lived my story.",
      author: "Marcus V.",
      role: "Husband"
    },
    {
      text: "Superior production quality. This isn't just a novelty; it's a genuine piece of art that we play constantly.",
      author: "Elena S.",
      role: "Music Enthusiast"
    },
    {
      text: "Delivered within 24 hours. The speed didn't compromise the soul of the track at all. Absolutely stunning.",
      author: "Julian K.",
      role: "Son"
    }
  ];

  return (
    <section className="py-32 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-brand-pink font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">User Echoes</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tighter">What They <span className="text-brand-text-muted">Feel.</span></h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-brand-card p-12 rounded-[40px] border border-white/5 relative group hover:border-brand-pink/20 transition-all"
            >
              <Quote className="absolute top-8 left-8 w-10 h-10 text-brand-pink/10 group-hover:text-brand-pink/20 transition-colors" />
              <p className="text-brand-text-muted text-lg mb-10 leading-relaxed italic z-10 relative">"{t.text}"</p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center font-bold text-brand-pink">
                   {t.author[0]}
                 </div>
                 <div>
                    <span className="block font-bold text-white tracking-tight">{t.author}</span>
                    <span className="text-[10px] uppercase tracking-widest text-brand-text-muted font-bold">{t.role}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TrackSong = () => {
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate lookup
    setTimeout(() => setIsSearching(false), 2000);
  };

  return (
    <section id="track" className="py-32 bg-[#1a1a1a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="bg-brand-card p-12 rounded-[50px] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-brand-pink/10 rounded-2xl flex items-center justify-center mb-8">
                <Search className="w-7 h-7 text-brand-pink" />
              </div>
              <h2 className="text-4xl font-extrabold mb-4 text-white tracking-tight">Track Your Legacy</h2>
              <p className="text-brand-text-muted mb-10 font-medium tracking-tight">Monitor the frequency of your production in real-time.</p>
              
              <form onSubmit={handleTrack} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-pink">Account Identifier</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-brand-bg border border-white/10 rounded-2xl focus:border-brand-pink transition-all p-5 font-medium text-white outline-none" 
                    placeholder="you@email.com" 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSearching}
                  className="w-full bg-brand-pink text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-brand-pink-soft transition-all shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSearching ? "Intercepting Status..." : "Locate My Song"}
                  {!isSearching && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-12">
            <div className="glass-dark p-10 rounded-[40px] border border-white/5">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                <HelpCircle className="w-6 h-6 text-brand-pink" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">Need Uplink?</h3>
              <p className="text-brand-text-muted mb-8 font-medium leading-relaxed tracking-tight">
                Our support node is active 24/7. Average response frequency: 1-3 days.
              </p>
              <div className="space-y-4">
                <a 
                  href="mailto:melodyofus.song@gmail.com" 
                  className="flex items-center gap-5 p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-brand-pink/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] font-black text-brand-text-muted mb-1">Direct Channel</p>
                    <p className="font-bold text-white">melodyofus.song@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-brand-pink font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">Final Frequency</span>
            <h2 className="text-5xl md:text-7xl mb-8 font-extrabold text-white tracking-tighter leading-[0.9]">Initialize <br /> <span className="text-brand-text-muted">Your Project.</span></h2>
            <p className="text-lg text-brand-text-muted mb-12 leading-relaxed font-medium">
              Ready to translate your memories into a sonic masterpiece? Start the personalization engine today.
            </p>
            
            <div className="space-y-10">
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-brand-pink/10 flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-all shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-pink mb-1">Direct Frequency</p>
                  <p className="text-2xl font-bold tracking-tight text-white">melodyofus.song@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-brand-card p-10 md:p-16 rounded-[60px] border border-white/5 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full blur-[100px]"></div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Express Checkout</h3>
              <p className="text-brand-text-muted text-sm font-medium italic">"Skip the queue, start the story."</p>
            </div>
            
            <Link 
              to="/order"
              className="w-full bg-brand-pink text-white py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.5em] hover:bg-brand-pink-soft transition-all shadow-xl shadow-brand-pink/20 flex items-center justify-center gap-3"
            >
              Start Order Process <ArrowRight className="w-5 h-5" />
            </Link>
            
            <p className="mt-8 text-[9px] text-center text-brand-text-muted uppercase tracking-[0.2em] font-black">Melody Of Us will synchronize with your narrative within 24 cycles</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQ = () => {
  const faqs = [
    {
      q: "How does AI music customization work at Melody Of Us?",
      a: "Our AI customization project utilizes emotional intelligence algorithms to translate your personal narratives into melodic structures. We blend these AI-generated insights with professional human composition to create high-fidelity personalized songs."
    },
    {
      q: "What makes these personalized songs premium?",
      a: "Unlike generic AI generation, Melody Of Us prioritizes studio-grade production. Every custom music creation goes through a rigorous mixing and mastering process to ensure it matches Spotify-quality standards."
    },
    {
      q: "Can I use these custom songs for commercial projects?",
      a: "Yes, our emotional music experience is designed for both personal legacy and commercial applications. Depending on your tier, we provide full licensing for social media, podcasts, and more."
    },
    {
      q: "What is the typical turnaround for custom music?",
      a: "Standard orchestration takes 3-5 cycles. However, our expedited pipeline offers 24-hour ultra-delivery for critical moments that require immediate sonic impact."
    }
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-brand-bg relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-24">
           <span className="text-brand-pink font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">Core Knowledge</span>
           <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">Knowledge <br /><span className="text-brand-text-muted">Repository.</span></h2>
           <p className="text-brand-text-muted font-medium mb-10 max-w-sm mx-auto italic">Everything you need to know about the future of custom music creation.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`rounded-[32px] overflow-hidden transition-all duration-500 ${open === idx ? 'bg-brand-card border-brand-pink/20 border shadow-2xl scale-[1.02]' : 'bg-white/5 border border-white/5'}`}>
              <button 
                onClick={() => setOpen(open === idx ? null : idx)}
                className={`w-full text-left p-10 flex justify-between items-center transition-colors ${open === idx ? 'text-brand-pink' : 'text-white hover:text-brand-pink'}`}
              >
                <span className="font-bold text-lg tracking-tight leading-snug">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${open === idx ? 'rotate-180 text-brand-pink' : 'text-white/20'}`} />
              </button>
              <motion.div 
                initial={false}
                animate={{ height: open === idx ? 'auto' : 0, opacity: open === idx ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="p-10 pt-0 text-brand-text-muted leading-relaxed font-medium text-sm">
                  {faq.a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FeatureImage = () => {
  return (
    <section className="py-32 bg-[#1a1a1a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, clipPath: 'inset(10% 10% 10% 10%)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="relative aspect-[21/9] rounded-[60px] overflow-hidden border border-white/5 shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1518196775791-3e5801952173?auto=format&fit=crop&q=80&w=2000" 
            alt="The emotion of music" 
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent flex items-end p-16">
            <div className="max-w-xl">
              <span className="text-brand-pink font-bold uppercase tracking-[0.4em] text-[10px] block mb-4">Capturing the Unspoken</span>
              <h3 className="text-4xl md:text-6xl text-white font-extrabold leading-tight tracking-tighter uppercase">Where words fail, <br /><span className="text-brand-text-muted lowercase italic font-medium">music speaks.</span></h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="py-32 bg-brand-bg text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 pb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-brand-pink rounded-xl flex items-center justify-center font-black text-white text-xl">M</div>
              <span className="text-2xl font-black tracking-tighter uppercase">Melody Of Us</span>
            </div>
            <p className="text-brand-text-muted max-w-sm font-medium leading-relaxed">
              Leading the future of emotional intelligence in music. Crafting artifacts of sound for the moments that define a lifetime.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-pink mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-bold tracking-tight text-white/50">
              <li><a href="#how-it-works" className="hover:text-brand-pink transition-colors">Process</a></li>
              <li><a href="#samples" className="hover:text-brand-pink transition-colors">Gallery</a></li>
              <li><a href="#faq" className="hover:text-brand-pink transition-colors">Knowledge</a></li>
              <li><Link to="/order" className="text-brand-pink">Initialize Project</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase font-black tracking-[0.4em] text-brand-pink mb-8">Contact Node</h4>
            <div className="flex items-center gap-4 text-white/50 group">
              <Mail className="w-4 h-4 text-brand-pink" />
              <span className="text-sm font-bold group-hover:text-white transition-colors">melodyofus.song@gmail.com</span>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">© 2024 Melody Of Us. Secure Emotional Uplink.</p>
           <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-black text-white/20">
             <a href="#" className="hover:text-brand-pink transition-colors">Privacy Proto</a>
             <a href="#" className="hover:text-brand-pink transition-colors">Terms of Sync</a>
           </div>
        </div>
      </div>
    </footer>
  );
};
