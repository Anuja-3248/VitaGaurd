import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse, Shield, Activity, Brain, ArrowRight, CheckCircle2, Scan, ChevronRight, Zap } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none opacity-20 dark:opacity-40 overflow-hidden">
                    <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary-600 rounded-full blur-[140px] opacity-20 animate-pulse"></div>
                    <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-cyan-500 rounded-full blur-[120px] opacity-20 animate-pulse delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/50 mb-10"
                        >
                            <Zap className="text-primary-600" size={14} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700 dark:text-primary-400">
                                Powered by Gemini 1.5 Flash
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-8xl font-black text-slate-800 dark:text-white tracking-tighter leading-[0.9] mb-8"
                        >
                            Predicting your health <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-cyan-500 to-indigo-500">before symptoms emerge.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto mb-12"
                        >
                            VitaGuard synthesizes biometric data and medical intelligence to provide a futuristic preventative health analysis for the next generation.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            <Link to="/assessment" className="group relative px-10 py-5 bg-primary-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-primary-500 transition-all flex items-center gap-3 overflow-hidden">
                                <span className="relative z-10">Start Biometric Scan</span>
                                <ChevronRight className="group-hover:translate-x-1 transition-transform relative z-10" size={18} />
                                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-700"></div>
                            </Link>

                            <Link to="/signup" className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-2 border-slate-100 dark:border-white/5 rounded-2xl font-black uppercase text-xs tracking-widest hover:border-primary-600/30 transition-all">
                                Create Identity
                            </Link>
                        </motion.div>
                    </div>

                    {/* Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="mt-32 relative mx-auto max-w-5xl group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-cyan-500 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden shadow-2xl aspect-[16/9] flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-3xl flex items-center justify-center">
                                    <Scan className="text-primary-600 animate-pulse" size={32} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Biological Engine Active</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: Brain, title: "Neural Synthesis", desc: "Correlating thousands of clinical data points with your unique biological profile." },
                            { icon: Activity, title: "Real-time Telemetry", desc: "Interactive body mapping that identifies pain points with precision." },
                            { icon: Shield, title: "Data Sovereignty", desc: "Your health records are encrypted and owned exclusively by you." }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="space-y-6 flex flex-col items-center text-center p-8 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-slate-100 dark:border-white/5"
                            >
                                <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5 flex items-center justify-center text-primary-600">
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tighter uppercase">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-900 dark:bg-primary-600 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center md:text-left">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-6">Your biological twin <br /> starts here.</h2>
                                <p className="text-white/70 text-lg font-medium mb-12 max-w-xl">Join 40,000+ users monitoring their health with preventative medical intelligence.</p>
                                <Link to="/signup" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all">
                                    Generate Health Identity <ArrowRight size={18} />
                                </Link>
                            </div>
                            <div className="hidden lg:grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex items-center gap-4">
                                        <CheckCircle2 className="text-white/40" size={20} />
                                        <div className="h-2 w-full bg-white/10 rounded-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
