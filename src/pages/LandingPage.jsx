import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Activity, LineChart, Lock, ArrowRight, CheckCircle2, Microscope, FileText, Brain, HeartPulse, Zap, Scan, ChevronRight } from 'lucide-react';
import GenZIcon from '../components/GenZIcon';
import { useAuth } from '../context/AuthContext';
import AnimatedRobot from '../components/AnimatedRobot';

const LandingPage = () => {
    const { currentUser } = useAuth();
    const [activeStep, setActiveStep] = useState(null);
    const location = useLocation();
    const [visibleSection, setVisibleSection] = useState('hero'); // 'hero', 'protocol', 'features'

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash === 'how-it-works') setVisibleSection('protocol');
        else if (hash === 'features') setVisibleSection('features');
        else setVisibleSection('hero');
    }, [location]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="overflow-x-hidden bg-white dark:bg-dark-bg selection:bg-primary-100 selection:text-primary-700 transition-colors duration-300">
            <AnimatePresence mode="wait">
                {visibleSection === 'hero' && (
                    <motion.div
                        key="hero"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {/* Hero Section - Dark Purple Theme */}
                        <section className="relative min-h-[100vh] flex items-center pt-28 pb-20 z-10 bg-[#0a0010]" style={{ background: 'linear-gradient(135deg, #0a0010 0%, #0d0020 50%, #120028 100%)' }}>
                            {/* Purple glow orbs */}
                            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-700/20 blur-[120px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={containerVariants}
                                        className="text-center lg:text-left"
                                    >
                                        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.1] mb-8 tracking-tighter" style={{ fontFamily: "'DM Serif Display', serif" }}>
                                            Prevention <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">Begins With</span> Prediction
                                        </motion.h1>

                                        <motion.p variants={itemVariants} className="text-xl text-slate-300 mb-12 max-w-xl lg:mx-0 mx-auto leading-relaxed font-medium">
                                            Bridge the gap between symptoms and clinical certainty. VitaGuard utilizes advanced diagnostic synthesis to map your biometric patterns, identifying subtle health shifts with technical precision.
                                        </motion.p>

                                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                                            <Link to={currentUser ? "/dashboard" : "/signup"} className="group text-lg px-10 py-5 text-center bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-purple-500/30 flex items-center justify-center gap-2">
                                                {currentUser ? "Go to Dashboard" : "Get Started Free"}
                                                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                            <button
                                                onClick={() => window.location.hash = '#features'}
                                                className="group text-lg px-10 py-5 text-center bg-white/10 text-white border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all backdrop-blur-md flex items-center justify-center gap-2"
                                            >
                                                Explore Features
                                            </button>
                                        </motion.div>
                                    </motion.div>

                                    <div className="relative lg:h-[600px] flex items-center justify-center">
                                        {/* Purple glow behind robot */}
                                        <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full" />

                                        {/* Animated Robot - self-contained, no external URL */}
                                        <div className="relative z-10 w-full max-w-[520px]">
                                            <AnimatedRobot />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                )}

                {visibleSection === 'protocol' && (
                    <motion.div
                        key="protocol"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <section id="how-it-works" className="py-32 bg-white dark:bg-dark-bg relative overflow-hidden transition-colors duration-300">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                                <div className="text-center mb-24">
                                    <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6">
                                        The Protocol
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
                                        Precision <span className="italic text-primary-600 dark:text-primary-400">Workflow</span>
                                    </h2>
                                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                                        Our diagnostic engine transforms raw data into clinical intelligence through a three-stage neural architecture.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                                    {[
                                        {
                                            step: "01",
                                            icon: <GenZIcon icon={Activity} color="text-white" glowColor="bg-white/20" />,
                                            title: "Biometric Intake",
                                            desc: "Our intelligent gateway synchronizes with your existing health metrics and symptoms.",
                                            color: "from-blue-600 to-indigo-600",
                                            glow: "bg-blue-400/20"
                                        },
                                        {
                                            step: "02",
                                            icon: <GenZIcon icon={LineChart} color="text-white" glowColor="bg-white/20" />,
                                            title: "Diagnostic Synthesis",
                                            desc: "Advanced computational logic maps your reported symptoms against clinical datasets.",
                                            color: "from-cyan-500 to-blue-500",
                                            glow: "bg-cyan-400/20"
                                        },
                                        {
                                            step: "03",
                                            icon: <GenZIcon icon={CheckCircle2} color="text-white" glowColor="bg-white/20" />,
                                            title: "Final Output",
                                            desc: "A high-fidelity report is generated with exact risk classifications and preventive measures.",
                                            color: "from-slate-800 to-slate-900",
                                            glow: "bg-emerald-400/10"
                                        }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                                            className="relative group cursor-pointer"
                                        >
                                            <div className="glass-card bg-white dark:bg-dark-card/40 p-10 rounded-[3rem] border border-slate-100 dark:border-dark-border/50 hover:border-white transition-all duration-700 h-full flex flex-col items-center text-center">
                                                <div className="relative mb-8">
                                                    <div className={`absolute inset-0 ${item.glow} blur-2xl rounded-full scale-150`}></div>
                                                    <div className={`relative bg-gradient-to-br ${item.color} p-6 rounded-[2rem] shadow-lg`}>
                                                        {item.icon}
                                                    </div>
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{item.title}</h3>
                                                <p className="text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </motion.div>
                )}

                {visibleSection === 'features' && (
                    <motion.div
                        key="features"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <section id="features" className="py-32 bg-slate-50/50 dark:bg-dark-bg/50 relative transition-colors duration-300">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex flex-col lg:flex-row items-center gap-20">
                                    <div className="w-full lg:w-1/2">
                                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
                                            Premium Features for Your <span className="text-primary-600">Health</span>
                                        </h2>
                                        <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 font-medium">
                                            Our platform combines medical expertise with advanced AI to give you the most accurate proactive health tools.
                                        </p>
                                        <div className="space-y-6">
                                            {[
                                                { icon: Brain, title: "Symptom Checker", desc: "Detailed analysis of your current physical symptoms." },
                                                { icon: Activity, title: "Predictive Analytics", desc: "Identify long-term health risks based on lifestyle data." },
                                                { icon: Lock, title: "Secure Data Storage", desc: "Your health records are encrypted and kept strictly private." },
                                                { icon: ShieldCheck, title: "Early Warnings", desc: "Prevent serious illness with proactive health indicators." }
                                            ].map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-4">
                                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm mt-1">
                                                        <feature.icon className="text-primary-600" size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{feature.title}</h4>
                                                        <p className="text-slate-600 dark:text-slate-300">{feature.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-4 pt-8">
                                                <div className="bg-white p-2 rounded-2xl overflow-hidden shadow-lg h-60">
                                                    <img src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=400" alt="Health 1" className="w-full h-full object-cover rounded-xl" />
                                                </div>
                                                <div className="bg-white p-2 rounded-2xl overflow-hidden shadow-lg h-40">
                                                    <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400" alt="Health 2" className="w-full h-full object-cover rounded-xl" />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="bg-white p-2 rounded-2xl overflow-hidden shadow-lg h-40">
                                                    <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" alt="Advanced Medical Lab" className="w-full h-full object-cover rounded-xl" />
                                                </div>
                                                <div className="bg-white p-2 rounded-2xl overflow-hidden shadow-lg h-60">
                                                    <img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600" alt="Modern Interface" className="w-full h-full object-cover rounded-xl" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer CTA */}
            <section className="py-32 relative z-10 overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-900 rounded-[3.5rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 blur-[120px] rounded-full -mr-64 -mt-64 animate-pulse"></div>
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                                <ShieldCheck size={18} className="text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Military Grade Encryption</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
                                Secure Your <span className="italic text-primary-400">Future</span>
                            </h2>

                            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                                Access a sophisticated diagnostic suite designed to detect early-stage <span className="text-white font-bold">Cardiovascular, Respiratory, and Metabolic</span> risk factors before they escalate.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-primary-400 font-black text-3xl mb-2">3-Factor</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Diagnostic Mapping</div>
                                </div>
                                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-emerald-400 font-black text-3xl mb-2">Dynamic</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Severity Scoring</div>
                                </div>
                                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-health-cyber font-black text-3xl mb-2">Clinical</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">PDF Documentation</div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <Link to={currentUser ? "/dashboard" : "/signup"} className="btn-premium px-16 py-8 text-2xl bg-primary-600 text-white hover:bg-primary-700 border-none shadow-2xl shadow-primary-900/40 group">
                                    {currentUser ? "Launch Personal Portal" : "Begin Diagnostic Scan"}
                                    <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                                </Link>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">No credit card or insurance required</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
