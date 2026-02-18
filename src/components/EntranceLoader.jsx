import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { HeartPulse, ShieldCheck, Activity, Brain, Loader2, ArrowRight, Stethoscope, Search, Cpu, Thermometer, Wind, Scan, Fingerprint, Database, Zap } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const EntranceLoader = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [logs, setLogs] = useState([]);
    const [scanPulse, setScanPulse] = useState(0);

    // Custom cursor motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const steps = [
        "Initializing Neural Engine",
        "Connecting Medical Database",
        "Scanning Biometric Stream",
        "Synthesizing Clinical Data",
        "Finalizing Assessment",
        "Secure Report Ready"
    ];

    const diagnosticLogs = [
        "Core boot sequence... OK",
        "Medical knowledge graph expanded",
        "Symptom vector analysis in progress",
        "Anonymizing patient identifiers",
        "Cross-referencing 10k+ clinical papers",
        "Encryption layer active: AES-256",
        "Stability: 99.9% | Neural Trust Level: High"
    ];

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX - 24);
            mouseY.set(e.clientY - 24);
        };
        window.addEventListener("mousemove", handleMouseMove);

        const stepTimer = setInterval(() => {
            setStep((prev) => {
                if (prev < steps.length - 1) return prev + 1;
                setIsFinished(true);
                clearInterval(stepTimer);
                return prev;
            });
        }, 2200);

        const logTimer = setInterval(() => {
            setLogs(prev => {
                const nextLog = diagnosticLogs[Math.floor(Math.random() * diagnosticLogs.length)];
                return [nextLog, ...prev.slice(0, 4)];
            });
        }, 1500);

        const pulseTimer = setInterval(() => setScanPulse(p => p + 1), 3000);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(stepTimer);
            clearInterval(logTimer);
            clearInterval(pulseTimer);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(25px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden cursor-none"
        >
            {/* Custom Interactive Scanner Cursor */}
            <motion.div
                style={{ x: cursorX, y: cursorY }}
                className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[10000] mix-blend-difference"
            >
                <motion.div
                    animate={{ scale: [1, 1.5, 1], rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-full h-full border-2 border-primary-500 rounded-full flex items-center justify-center"
                >
                    <div className="w-1 h-1 bg-primary-500 rounded-full" />
                </motion.div>
                <div className="absolute top-1/2 left-full ml-4 whitespace-nowrap">
                    <span className="text-[10px] uppercase font-black tracking-widest text-primary-500">Scanner Active</span>
                </div>
            </motion.div>

            {/* Premium Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(79,70,229,0.03),_transparent_70%)]" />
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-50/50 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-50/50 blur-[120px] rounded-full" />

            {/* Dynamic Scanning Grid */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />
            <motion.div
                animate={{ y: ["0vh", "100vh"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent z-10"
            />

            {/* Central Animated Logo/Scanner */}
            <div className="relative mb-8 z-20">
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="relative"
                >
                    {/* Outer Rings */}
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                rotate: i % 2 === 0 ? 360 : -360,
                                scale: [1, 1.1, 1],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 -m-8 rounded-full border border-primary-200"
                            style={{ padding: `${i * 20}px` }}
                        />
                    ))}

                    <div className="relative bg-white p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center justify-center">
                        <motion.div
                            animate={{
                                transform: ["perspective(1000px) rotateY(0deg)", "perspective(1000px) rotateY(360deg)"],
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            <Brain className="text-primary-600 w-20 h-20" strokeWidth={1} />
                        </motion.div>

                        {/* Internal Scanning Light */}
                        <motion.div
                            animate={{ opacity: [0.2, 0.8, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-primary-100/30 rounded-[3rem] blur-xl"
                        />
                    </div>
                </motion.div>

                {/* Floating Diagnostic Data Points */}
                <div className="absolute inset-0 flex items-center justify-center -m-40">
                    <AnimatePresence>
                        {[Activity, HeartPulse, ShieldCheck, Zap].map((Icon, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: Math.cos((idx * 90) * (Math.PI / 180)) * 160,
                                    y: Math.sin((idx * 90) * (Math.PI / 180)) * 160,
                                }}
                                className="absolute p-4 bg-white rounded-2xl shadow-lg border border-slate-50 text-slate-300"
                            >
                                <Icon size={20} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Sleek Branding & Status */}
            <div className="text-center relative z-20 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-[1px] w-8 bg-slate-200" />
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-400">System v4.0</span>
                        <div className="h-[1px] w-8 bg-slate-200" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
                        VitaGuard <span className="text-primary-600">Core</span>
                    </h1>
                </motion.div>
            </div>

            {/* Technical Diagnostic Feed (Replacing "Analyzing Report") */}
            <div className="w-80 md:w-[500px] flex flex-col items-center gap-8 relative z-20">
                <AnimatePresence mode="wait">
                    {!isFinished ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="w-full"
                        >
                            {/* Live Logs */}
                            <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-800 mb-8 h-32 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-3 opacity-20">
                                    <Database className="text-primary-400" size={14} />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <AnimatePresence>
                                        {logs.map((log, i) => (
                                            <motion.div
                                                key={log + i}
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-[10px] font-mono text-primary-400/80 uppercase tracking-wider"
                                            >
                                                <span className="text-primary-700 mr-2">/&gt;</span> {log}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Minimal Progress Bar */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-end px-1">
                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        <Loader2 size={10} className="animate-spin text-primary-600" />
                                        {steps[step]}
                                    </span>
                                    <span className="text-[10px] font-mono text-primary-600 font-bold">{Math.round(((step + 1) / steps.length) * 100)}%</span>
                                </div>
                                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        className="h-full bg-primary-600"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="action"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full flex flex-col items-center gap-6"
                        >
                            <button
                                onClick={onComplete}
                                className="group relative w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl hover:shadow-primary-600/40 hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-4 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10 text-sm">Enter Neural Portal</span>
                                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <motion.p
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]"
                            >
                                Secure Auth Handshake Complete
                            </motion.p>
                        </motion.div>
                    )
                    }
                </AnimatePresence>
            </div>

            {/* Absolute Bottom Badge */}
            <div className="absolute bottom-12 flex flex-col items-center gap-4">
                <div className="flex items-center gap-6 px-8 py-3 bg-white/50 backdrop-blur-xl rounded-full border border-slate-200/50 shadow-sm">
                    <div className="flex items-center gap-2">
                        <Fingerprint size={12} className="text-primary-500" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Biometric Identity Verified</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EntranceLoader;
