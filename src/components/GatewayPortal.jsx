import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Info, ArrowRight, Lock, Activity, Globe } from 'lucide-react';
import { useState } from 'react';

const WordAnimation = ({ text, delay = 0, className = "" }) => {
    const words = text.split(" ");
    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: "blur(4px)", y: 5 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: delay + (i * 0.05),
                        ease: "easeOut"
                    }}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

const GatewayPortal = ({ onEnterSite, onLogin }) => {
    return (
        <div className="fixed inset-0 z-[9999] bg-neutral-950 flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-900/20 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/10 blur-[150px] rounded-full" />

            {/* Technical Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            {/* Central Branding */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6">
                    <ShieldCheck size={12} className="text-primary-500" />
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">Global Clinical Access</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-widest leading-none">
                    <WordAnimation text="VITAGUARD OS" />
                </h1>
            </motion.div>

            {/* The Two Choice Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl z-10">
                {/* Box 1: Secure Access */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, type: "spring", damping: 20 }}
                    onClick={onLogin}
                    className="group cursor-pointer relative bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[3.5rem] hover:bg-white/10 transition-all duration-500 hover:border-primary-500/50 overflow-hidden"
                >
                    <div className="flex flex-col h-full relative z-10">
                        <div className="bg-primary-500/10 p-5 rounded-3xl w-fit mb-8 group-hover:bg-primary-500 transition-colors duration-500">
                            <Lock size={32} className="text-primary-500 group-hover:text-white transition-colors duration-500" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">SECURE ACCESS</h2>
                        <p className="text-slate-400 font-medium leading-relaxed mb-10 min-h-[60px]">
                            <WordAnimation text="Login to your personal clinical portal to review diagnostic reports and track your biometric trends." delay={0.6} />
                        </p>
                        <div className="mt-auto flex items-center gap-4 text-primary-400 font-black text-xs uppercase tracking-[0.3em]">
                            Enter Portal <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                    {/* Decorative hover glow */}
                    <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity rounded-[3.5rem]" />
                </motion.div>

                {/* Box 2: Research Protocol */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, type: "spring", damping: 20 }}
                    onClick={onEnterSite}
                    className="group cursor-pointer relative bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[3.5rem] hover:bg-white/10 transition-all duration-500 hover:border-health-cyber/50 overflow-hidden"
                >
                    <div className="flex flex-col h-full relative z-10">
                        <div className="bg-health-cyber/10 p-5 rounded-3xl w-fit mb-8 group-hover:bg-health-cyber transition-colors duration-500">
                            <Globe size={32} className="text-health-cyber group-hover:text-white transition-colors duration-500" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">KNOW MORE</h2>
                        <p className="text-slate-400 font-medium leading-relaxed mb-10 min-h-[60px]">
                            <WordAnimation text="Explore the VitaGuard protocol, our predictive diagnostic synthesis, and preventive health methodologies." delay={0.8} />
                        </p>
                        <div className="mt-auto flex items-center gap-4 text-health-cyber font-black text-xs uppercase tracking-[0.3em]">
                            Explore Protocol <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom System Status */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-16 text-center"
            >
                <div className="flex items-center gap-6 px-8 py-3 bg-white/5 border border-white/5 rounded-full">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Network: STABLE</span>
                    </div>
                    <div className="w-[1px] h-3 bg-white/10" />
                    <div className="flex items-center gap-2">
                        <Activity size={10} className="text-primary-500" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Diagnostic Engine: ACTIVE</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default GatewayPortal;
