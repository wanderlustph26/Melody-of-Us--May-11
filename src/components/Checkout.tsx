import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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
  Music2,
  ShoppingBag,
  Loader2,
  AlertCircle
} from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // PayPal Client ID (In a real app, this should be in an env variable)
  const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "test";

  useEffect(() => {
    if (!orderData) {
      navigate('/order');
      return;
    }
    if (orderData.personalDetails?.email) {
      setEmail(orderData.personalDetails.email);
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  const handlePaymentSuccess = async (details: any) => {
    setIsProcessing(true);
    try {
      // In a real app, we would send the payment details and orderData to our backend here
      const response = await fetch('/api/complete-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: details.id,
          payerEmail: details.payer.email_address,
          orderData: orderData
        })
      });

      if (response.ok) {
        navigate('/thank-you', { state: { successful: true } });
      } else {
        setPaymentError("Order processing failed. Please contact support.");
      }
    } catch (error) {
      console.error("Completion error:", error);
      setPaymentError("System error during order completion.");
    } finally {
      setIsProcessing(false);
    }
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
    }
  ];

  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency: "USD" }}>
      <div className="min-h-screen bg-brand-bg pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-pink/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <AnimatePresence>
          {isProcessing && (
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
                <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight uppercase tracking-[0.1em]">Finalizing Genesis...</h2>
                <p className="text-brand-text-muted font-medium italic">Your payment is confirmed. Securely transmitting your story to our composers...</p>
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
              <Lock className="w-4 h-4" />
              Secure Checkout: Step 2 of 2
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.8] uppercase">
              Final <br /> <span className="text-brand-text-muted">Review.</span>
            </h1>
            <p className="text-lg text-brand-text-muted font-medium max-w-xl mx-auto">
              Confirm your {orderData.musicDetails.occasion || 'custom'} production parameters and proceed to secure checkout.
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
                        <p className="text-2xl font-bold text-white tracking-tight truncate">{orderData.personalDetails.fullName}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Milestone</p>
                        <p className="text-2xl font-bold text-white tracking-tight truncate">{orderData.musicDetails.occasion}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Frequency</p>
                        <p className="text-2xl font-bold text-white tracking-tight italic capitalize">{orderData.musicDetails.mood}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Artifact Type</p>
                        <p className="text-2xl font-bold text-white tracking-tight">{orderData.musicDetails.genre}</p>
                      </div>
                    </div>

                    <div className="pt-6">
                      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 mb-4 block">Uplink target email</p>
                        <div className="flex items-center gap-4 text-xl font-medium text-white">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          {email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="bg-[#1a1a1a] p-10 rounded-[48px] border border-white/5 shadow-inner">
                      <div className="space-y-4 mb-10 pb-10 border-b border-white/5">
                        <div className="flex justify-between items-center text-sm font-medium text-brand-text-muted">
                          <span>Base Production</span>
                          <span className="text-white">$20.00</span>
                        </div>
                        {orderData.addons.expedited && (
                          <div className="flex justify-between items-center text-sm font-medium text-brand-text-muted">
                            <span>Expedited Delivery</span>
                            <span className="text-white">+$10.00</span>
                          </div>
                        )}
                        {orderData.addons.extraVerse && (
                          <div className="flex justify-between items-center text-sm font-medium text-brand-text-muted">
                            <span>Extra Verse / Length</span>
                            <span className="text-white">+$10.00</span>
                          </div>
                        )}
                        <div className="pt-6 flex justify-between items-end">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink mb-2">Total investment</p>
                            <p className="text-5xl font-black text-white">${orderData.totalPrice.toFixed(2)} <span className="text-sm font-medium text-white/20 uppercase tracking-widest ml-1">USD</span></p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative z-0">
                        {paymentError && (
                          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-bold">
                            <AlertCircle className="w-5 h-5" /> {paymentError}
                          </div>
                        )}
                        <PayPalButtons 
                          style={{ layout: "vertical", color: "gold", shape: "pill", label: "checkout" }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [{
                                amount: {
                                  currency_code: "USD",
                                  value: orderData.totalPrice.toString()
                                },
                                description: `Custom Music for ${orderData.personalDetails.fullName}`
                              }]
                            });
                          }}
                          onApprove={async (data, actions) => {
                            if (actions.order) {
                              const details = await actions.order.capture();
                              await handlePaymentSuccess(details);
                            }
                          }}
                          onError={(err) => {
                            console.error("PayPal Error:", err);
                            setPaymentError("Payment process interrupted. Please try again.");
                          }}
                        />
                      </div>
                      
                      <div className="mt-10 flex flex-wrap justify-center gap-6 opacity-30 grayscale invert brightness-200">
                        <ShieldCheck className="w-8 h-8" />
                        <Lock className="w-8 h-8" />
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};
