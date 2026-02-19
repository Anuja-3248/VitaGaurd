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
        <div className="fixed inset-0 z-[1000] clinical-purple-theme flex items-center justify-center p-4 overflow-hidden">
            {/* Background Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="glow-orb top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 animate-float" />
                <div className="glow-orb top-[20%] right-[-5%] w-[30%] h-[30%] bg-cyan-600/5 animate-float" style={{ animationDelay: '-2s' }} />
                <div className="glow-orb bottom-[10%] left-[20%] w-[25%] h-[25%] bg-purple-600/10 animate-float" style={{ animationDelay: '-4s' }} />
            </div>

            <AnimatePresence mode="wait">
                {view === 'entry' ? (
                    /* High-End Entry View */
                    <motion.div
                        key="entry"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                            className="bg-primary-500/20 p-6 rounded-[2.5rem] border border-primary-500/30 mb-8 backdrop-blur-md"
                        >
                            <HeartPulse className="w-14 h-14 text-primary-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        </motion.div>

                        <h1 className="text-7xl md:text-8xl font-black text-white mb-16 tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                            VitaGuard
                        </h1>

                        <div className="flex flex-col md:flex-row gap-6">
                            <button
                                onClick={handleLogin}
                                className="flex items-center gap-3 px-12 py-5 bg-primary-600 text-white rounded-[2rem] font-black hover:bg-primary-500 transition-all shadow-[0_20px_40px_-5px_rgba(37,99,235,0.4)] active:scale-95 text-lg uppercase tracking-widest"
                            >
                                <LogIn size={22} strokeWidth={3} />
                                Access Portal
                            </button>
                            <button
                                onClick={() => setView('info')}
                                className="flex items-center gap-3 px-12 py-5 bg-white/5 text-white border border-white/10 rounded-[2rem] font-black hover:bg-white/10 transition-all backdrop-blur-md active:scale-95 text-lg uppercase tracking-widest"
                            >
                                <Info size={22} strokeWidth={3} />
                                Know More
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    /* Info View */
                    <motion.div
                        key="info"
                        initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                        exit={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                        className="relative z-10 w-full max-w-3xl bg-white/5 backdrop-blur-2xl rounded-[4rem] p-12 md:p-20 border border-white/10 shadow-[0_60px_150px_-20px_rgba(0,0,0,1)]"
                    >
                        <button
                            onClick={() => setView('entry')}
                            className="absolute top-10 right-10 p-4 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-3xl"
                        >
                            <X size={24} />
                        </button>

                        <div className="space-y-16">
                            <div>
                                <div className="flex items-center gap-2 mb-8 text-primary-400">
                                    <div className="h-0.5 w-10 bg-primary-500"></div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em]">Neural Diagnostic Protocol</p>
                                </div>
                                <h2 className="text-6xl font-black text-white mb-8 tracking-tighter">
                                    VitaGuard
                                </h2>
                                <p className="text-slate-400 text-2xl font-medium leading-relaxed max-w-2xl">
                                    A clinical-grade diagnostic synthesis platform. We map your biometric markers to provide high-precision health risk forecasting.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { Icon: ShieldCheck, label: "Data Privacy", desc: "Military-grade encryption for patient data.", color: "text-emerald-400" },
                                    { Icon: Activity, label: "Risk Mapping", desc: "Pattern matching for cardiovascular health.", color: "text-primary-400" },
                                    { Icon: HeartPulse, label: "Vitals Tracking", desc: "Real-time biometric marker analysis.", color: "text-cyan-400" },
                                    { Icon: Microscope, label: "Clinical Synthesis", desc: "Evidence-based diagnostic reporting.", color: "text-violet-400" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 p-1 bg-white/0 hover:translate-x-2 transition-transform group cursor-default">
                                        <div className={`${item.color} group-hover:scale-110 transition-transform`}><item.Icon size={32} /></div>
                                        <div>
                                            <p className="font-black text-white text-xl mb-1 tracking-tight">{item.label}</p>
                                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleLogin}
                                className="w-full py-8 bg-white text-black rounded-[2.5rem] font-black hover:scale-[1.02] transition-all flex items-center justify-center gap-4 group shadow-2xl shadow-white/5 active:scale-95"
                            >
                                <span className="text-xl uppercase tracking-[0.2em]">Deploy Protocol</span>
                                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OnboardingModal;
