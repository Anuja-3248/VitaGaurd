import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Activity, HeartPulse, Microscope, X, ChevronRight, LogIn, Info, ShieldAlert } from 'lucide-react';

const OnboardingModal = ({ onComplete }) => {
    const [view, setView] = useState('entry'); // 'entry' or 'info'
    const navigate = useNavigate();

    const handleLogin = () => {
        onComplete();
        // If the user is on the 'info' view, they came via "Know More"
        const fromKnowMore = view === 'info';
        navigate('/login', { state: { fromKnowMore } });
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-hidden">
            {/* Dark Cinematic Medical Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
            >
                {/* Visual medical silhouettes placeholder background */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay"></div>
            </motion.div>

            <AnimatePresence mode="wait">
                {view === 'entry' ? (
                    /* High-End Entry View (Matching Image) */
                    <motion.div
                        key="entry"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="bg-blue-600/20 p-5 rounded-[2.5rem] border border-blue-500/30 mb-8 backdrop-blur-md"
                        >
                            <HeartPulse className="w-12 h-12 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        </motion.div>

                        {/* Title: Styled like the image with glow */}
                        <h1 className="text-7xl md:text-8xl font-bold text-white mb-16 tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]" style={{ fontFamily: 'Arial, sans-serif' }}>
                            VitaGuard
                        </h1>

                        {/* Horizontal Buttons */}
                        <div className="flex flex-row gap-6">
                            <button
                                onClick={handleLogin}
                                className="flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-[1.5rem] font-bold hover:bg-blue-700 transition-all shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] active:scale-95"
                            >
                                <LogIn size={22} strokeWidth={2.5} />
                                <span className="text-lg">Login</span>
                            </button>
                            <button
                                onClick={() => setView('info')}
                                className="flex items-center gap-3 px-10 py-5 bg-white/10 text-white border border-white/20 rounded-[1.5rem] font-bold hover:bg-white/20 transition-all backdrop-blur-md active:scale-95"
                            >
                                <Info size={22} strokeWidth={2.5} />
                                <span className="text-lg">Know More</span>
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    /* Info / Know More View (Synced Design) */
                    <motion.div
                        key="info"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative z-10 w-full max-w-2xl bg-slate-900/90 backdrop-blur-2xl rounded-[3.5rem] p-12 md:p-16 border border-white/10 shadow-2xl"
                    >
                        <button
                            onClick={() => setView('entry')}
                            className="absolute top-10 right-10 p-3 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-2xl"
                        >
                            <X size={24} />
                        </button>

                        <div className="space-y-12">
                            <div>
                                <div className="flex items-center gap-2 mb-6 text-blue-500">
                                    <div className="h-0.5 w-8 bg-blue-500"></div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">system intelligence</p>
                                </div>
                                <h2 className="text-5xl font-bold text-white mb-6 tracking-tighter" style={{ fontFamily: 'Arial, sans-serif' }}>
                                    VitaGuard
                                </h2>
                                <p className="text-slate-400 text-xl leading-relaxed">
                                    A clinical-grade diagnostic synthesis platform. We map your biometric markers to provide high-precision health risk forecasting.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { Icon: ShieldCheck, label: "Data Privacy", desc: "Military-grade encryption for patient data." },
                                    { Icon: Activity, label: "Risk Mapping", desc: "Pattern matching for cardiovascular health." },
                                    { Icon: HeartPulse, label: "Vitals Tracking", desc: "Real-time biometric marker analysis." },
                                    { Icon: Microscope, label: "Clinical Synthesis", desc: "Evidence-based diagnostic reporting." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                        <div className="text-blue-500 group-hover:scale-110 transition-transform"><item.Icon size={24} /></div>
                                        <div>
                                            <p className="font-bold text-white mb-1">{item.label}</p>
                                            <p className="text-xs text-slate-500 leading-normal">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleLogin}
                                className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black hover:bg-blue-700 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-blue-500/20"
                            >
                                <span className="text-lg uppercase tracking-widest">Proceed to Platform</span>
                                <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OnboardingModal;
