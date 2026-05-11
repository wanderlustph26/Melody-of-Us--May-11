import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Music2, 
  Heart, 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  ChevronRight, 
  Music, 
  ArrowLeft,
  Sun,
  Clock,
  CloudRain,
  Zap,
  Waves,
  Calendar,
  Mountain,
  Smile,
  Type,
  User,
  Instagram,
  Upload,
  CheckCircle2,
  Loader2,
  FileAudio
} from 'lucide-react';

const MOODS = [
  { id: 'joyful', name: 'Joyful & Bright', icon: <Sun className="w-5 h-5" /> },
  { id: 'romantic', name: 'Deeply Romantic', icon: <Heart className="w-5 h-5" /> },
  { id: 'nostalgic', name: 'Warmly Nostalgic', icon: <Clock className="w-5 h-5" /> },
  { id: 'melancholic', name: 'Sweetly Melancholic', icon: <CloudRain className="w-5 h-5" /> },
  { id: 'energetic', name: 'Bold & Energetic', icon: <Zap className="w-5 h-5" /> },
  { id: 'serene', name: 'Serene & Calm', icon: <Waves className="w-5 h-5" /> },
];

const GENRES = [
  'Acoustic Pop', 'Cinematic Piano', 'Indie Folk', 'Modern Ballad', 'Lofi / Relaxed', 'Synthwave / 80s', 'R&B / Soul', 'Country'
];

export const OrderForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    personalDetails: {
      fullName: '',
      email: '',
      socialHandle: ''
    },
    musicDetails: {
      genre: '',
      mood: '',
      inspirationArtist: '',
      occasion: '',
      description: '',
      lyrics: '',
      tempo: 'Moderate',
      deadline: ''
    },
    addons: {
      expedited: false,
      extraVerse: false
    }
  });

  const BASE_PRICE = 20;
  const ADDON_PRICE = 10;

  const calculateTotal = () => {
    let total = BASE_PRICE;
    if (formData.addons.expedited) total += ADDON_PRICE;
    if (formData.addons.extraVerse) total += ADDON_PRICE;
    return total;
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate validation/prep
      await new Promise(resolve => setTimeout(resolve, 800));

      // Redirect to checkout with order data
      navigate('/checkout', { 
        state: { 
          orderData: {
            ...formData,
            totalPrice: calculateTotal()
          } 
        } 
      });
    } catch (error) {
      console.error('Preparation error:', error);
      alert('Failed to prepare order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if (isSuccess) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-brand-pink/20 rounded-full flex items-center justify-center mb-8 text-brand-pink"
          >
            <CheckCircle2 className="w-12 h-12" />
          </motion.div>
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Transmission Received.</h2>
          <p className="text-brand-text-muted text-lg font-medium max-w-sm">
            Your narrative has been successfully uploaded to our creative core. Synchronizing...
          </p>
        </div>
      );
    }

    switch(step) {
      case 1:
        return (
          <div className="space-y-8">
            <header>
              <div className="w-16 h-16 bg-brand-pink/10 rounded-2xl flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-brand-pink" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight uppercase">Step 1: The Identity</h2>
              <p className="text-brand-text-muted font-medium">Whose story are we about to orchestrate?</p>
            </header>
            
            <div className="space-y-6">
              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink mb-3 block ml-2">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g., Lianne Barnedo"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl focus:border-brand-pink transition-all outline-none text-white"
                  value={formData.personalDetails.fullName}
                  onChange={(e) => setFormData({
                    ...formData, 
                    personalDetails: {...formData.personalDetails, fullName: e.target.value}
                  })}
                />
              </div>
              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink mb-3 block ml-2">Email Address</label>
                <input
                  type="email"
                  placeholder="lianne@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl focus:border-brand-pink transition-all outline-none text-white"
                  value={formData.personalDetails.email}
                  onChange={(e) => setFormData({
                    ...formData, 
                    personalDetails: {...formData.personalDetails, email: e.target.value}
                  })}
                />
              </div>
              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink mb-3 block ml-2">Social Handle (Optional)</label>
                <div className="relative">
                  <Instagram className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input
                    type="text"
                    placeholder="@username"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 pl-16 text-xl focus:border-brand-pink transition-all outline-none text-white"
                    value={formData.personalDetails.socialHandle}
                    onChange={(e) => setFormData({
                      ...formData, 
                      personalDetails: {...formData.personalDetails, socialHandle: e.target.value}
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-10">
            <header>
              <div className="w-16 h-16 bg-brand-pink/10 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-brand-pink" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight uppercase">Step 2: Music Parameters</h2>
              <p className="text-brand-text-muted font-medium">Fine-tuning the frequency of your legacy.</p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink mb-3 block ml-2">Music Genre</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-lg focus:border-brand-pink transition-all outline-none text-white appearance-none"
                    value={formData.musicDetails.genre}
                    onChange={(e) => setFormData({
                      ...formData,
                      musicDetails: {...formData.musicDetails, genre: e.target.value}
                    })}
                  >
                    <option value="" disabled className="bg-brand-bg">Select Genre</option>
                    {GENRES.map(g => <option key={g} value={g} className="bg-brand-bg">{g}</option>)}
                  </select>
                </div>
                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink mb-3 block ml-2">Mood / Vibe</label>
                  <div className="grid grid-cols-2 gap-3">
                    {MOODS.map(m => (
                      <button 
                        key={m.id}
                        onClick={() => setFormData({
                          ...formData,
                          musicDetails: {...formData.musicDetails, mood: m.name}
                        })}
                        className={`p-4 rounded-xl border flex items-center gap-3 transition-all text-sm font-bold ${formData.musicDetails.mood === m.name ? 'bg-brand-pink/10 border-brand-pink text-white' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'}`}
                      >
                        {m.icon} {m.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink mb-3 block ml-2">Inspiration Artist</label>
                  <input
                    type="text"
                    placeholder="e.g., Taylor Swift, Hans Zimmer"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-lg focus:border-brand-pink transition-all outline-none text-white"
                    value={formData.musicDetails.inspirationArtist}
                    onChange={(e) => setFormData({
                      ...formData, 
                      musicDetails: {...formData.musicDetails, inspirationArtist: e.target.value}
                    })}
                  />
                </div>
                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink mb-3 block ml-2">Song Occasion</label>
                  <input
                    type="text"
                    placeholder="e.g., 10th Anniversary Wedding"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-lg focus:border-brand-pink transition-all outline-none text-white"
                    value={formData.musicDetails.occasion}
                    onChange={(e) => setFormData({
                      ...formData, 
                      musicDetails: {...formData.musicDetails, occasion: e.target.value}
                    })}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink mb-3 block ml-2">Song Description</label>
                  <textarea
                    placeholder="Briefly describe the story or specific details you want included..."
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-6 text-base focus:border-brand-pink transition-all outline-none resize-none text-white"
                    value={formData.musicDetails.description}
                    onChange={(e) => setFormData({
                      ...formData, 
                      musicDetails: {...formData.musicDetails, description: e.target.value}
                    })}
                  />
                </div>
                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink mb-3 block ml-2">Lyrics or Message</label>
                  <textarea
                    placeholder="Paste specific lyrics, poems, or a heartfelt message here..."
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-6 text-base focus:border-brand-pink transition-all outline-none resize-none text-white"
                    value={formData.musicDetails.lyrics}
                    onChange={(e) => setFormData({
                      ...formData, 
                      musicDetails: {...formData.musicDetails, lyrics: e.target.value}
                    })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink mb-3 block ml-2">Preferred Tempo</label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-base focus:border-brand-pink transition-all outline-none text-white appearance-none"
                      value={formData.musicDetails.tempo}
                      onChange={(e) => setFormData({
                        ...formData,
                        musicDetails: {...formData.musicDetails, tempo: e.target.value}
                      })}
                    >
                      <option value="Slow" className="bg-brand-bg">Slow</option>
                      <option value="Moderate" className="bg-brand-bg">Moderate</option>
                      <option value="Fast" className="bg-brand-bg">Fast</option>
                    </select>
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink mb-3 block ml-2">Deadline</label>
                    <input
                      type="date"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-base focus:border-brand-pink transition-all outline-none text-white [color-scheme:dark]"
                      value={formData.musicDetails.deadline}
                      onChange={(e) => setFormData({
                        ...formData, 
                        musicDetails: {...formData.musicDetails, deadline: e.target.value}
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
             <header>
              <div className="w-16 h-16 bg-brand-pink/10 rounded-2xl flex items-center justify-center mb-6">
                <Upload className="w-8 h-8 text-brand-pink" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight uppercase">Step 3: Reference Assets</h2>
              <p className="text-brand-text-muted font-medium">Upload audio that inspires your vision.</p>
            </header>

            <div 
              className="border-2 border-dashed border-white/10 rounded-[40px] p-20 flex flex-col items-center justify-center bg-white/5 hover:border-brand-pink/50 transition-all cursor-pointer group"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input 
                id="file-upload"
                type="file" 
                multiple 
                hidden 
                onChange={handleFileUpload}
              />
              <div className="w-20 h-20 bg-brand-pink/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <FileAudio className="w-10 h-10 text-brand-pink" />
              </div>
              <p className="text-xl font-bold text-white mb-2 tracking-tight">Drop files here or browse</p>
              <p className="text-brand-text-muted font-medium text-sm">Supporting MP3, WAV, M4A (Max 25MB total)</p>
            </div>

            {files.length > 0 && (
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink block ml-2">Uploaded Files ({files.length})</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {files.map((f, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4 truncate">
                        <Music className="w-5 h-5 text-brand-pink shrink-0" />
                        <span className="text-sm font-medium text-white truncate">{f.name}</span>
                      </div>
                      <button 
                         onClick={(e) => { e.stopPropagation(); setFiles(files.filter((_, idx) => idx !== i)); }}
                         className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-brand-pink transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-10">
            <header>
              <div className="w-16 h-16 bg-brand-pink/10 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-brand-pink" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight uppercase">Step 4: Final Enhancements</h2>
              <p className="text-brand-text-muted font-medium">Select optional add-ons to elevate your legacy.</p>
            </header>

            <div className="space-y-6">
              <div className="grid gap-4">
                <button
                  onClick={() => setFormData({
                    ...formData,
                    addons: { ...formData.addons, expedited: !formData.addons.expedited }
                  })}
                  className={`p-8 rounded-3xl border text-left transition-all relative overflow-hidden group ${formData.addons.expedited ? 'bg-brand-pink/10 border-brand-pink shadow-[0_0_40px_rgba(255,79,163,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Expedited Delivery</h3>
                      <p className="text-brand-text-muted text-sm font-medium">Receive your custom track within 48 hours.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-brand-pink">+$10</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setFormData({
                    ...formData,
                    addons: { ...formData.addons, extraVerse: !formData.addons.extraVerse }
                  })}
                  className={`p-8 rounded-3xl border text-left transition-all relative overflow-hidden group ${formData.addons.extraVerse ? 'bg-brand-pink/10 border-brand-pink shadow-[0_0_40px_rgba(255,79,163,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Extra Verse / Length</h3>
                      <p className="text-brand-text-muted text-sm font-medium">Add an additional verse or extend the song duration.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-brand-pink">+$10</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mt-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-muted mb-1">Estimated Total</p>
                    <p className="text-sm font-medium text-white/60">Base Price ($20) + Selected Add-ons</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-white">${calculateTotal()}</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink">USD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch(step) {
      case 1: return formData.personalDetails.fullName && formData.personalDetails.email.includes('@');
      case 2: return formData.musicDetails.genre && formData.musicDetails.mood && formData.musicDetails.occasion && formData.musicDetails.description.length > 30;
      case 3: return true; // File upload optional
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/30 hover:text-brand-pink transition-colors mb-12 font-black text-[10px] uppercase tracking-[0.4em]"
        >
          <ArrowLeft className="w-3 h-3" /> Abort Configuration
        </button>

        {!isSuccess && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink">Initialization Phase {step} of 4</span>
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 w-12 rounded-full transition-all duration-500 ${i + 1 <= step ? 'bg-brand-pink shadow-[0_0_10px_rgba(255,79,163,0.5)]' : 'bg-white/5'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-card p-10 md:p-16 rounded-[60px] border border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {!isSuccess && (
              <div className="flex gap-6 mt-16 pt-16 border-t border-white/5">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="flex-1 py-6 rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] border border-white/10 hover:bg-white/5 transition-all text-white/40"
                  >
                    Previous Phase
                  </button>
                )}
                <button
                  onClick={step === 4 ? handleSubmit : nextStep}
                  className="flex-[2] bg-brand-pink text-white py-6 rounded-[24px] font-black text-[14px] uppercase tracking-[0.4em] hover:bg-brand-pink-soft transition-all shadow-xl shadow-brand-pink/20 flex items-center justify-center gap-3 disabled:opacity-20 disabled:grayscale transition-all duration-300"
                  disabled={!isStepValid() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Preparing Checkout...
                    </>
                  ) : (
                    <>
                      {step === 4 ? 'Proceed to Payment' : 'Continue Synchronization'}
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

