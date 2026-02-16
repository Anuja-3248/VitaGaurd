import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Activity, ArrowRight } from 'lucide-react';
import GenZIcon from '../components/GenZIcon';
import OnboardingModal from '../components/OnboardingModal';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const { currentUser } = useAuth();
    const [showOnboarding, setShowOnboarding] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // If we just logged in, prevent the modal from flashing/showing again
        if (location.state?.fromLogin) {
            setShowOnboarding(false);
        } else {
            // Otherwise, always show the onboarding splash screen
            setShowOnboarding(true);
        }

        /*
        const hasSeenOnboarding = sessionStorage.getItem('vitaGuard_onboarding_seen');
        if (!hasSeenOnboarding) {
            setShowOnboarding(true);
        }
        */
    }, [location]);

    const completeOnboarding = () => {
        setShowOnboarding(false);
        sessionStorage.setItem('vitaGuard_onboarding_seen', 'true');
    };

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
            {/* Onboarding Flow */}
            <AnimatePresence>
                {showOnboarding && (
                    <OnboardingModal onComplete={completeOnboarding} />
                )}
            </AnimatePresence>

            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-100/30 dark:bg-primary-900/10 blur-[120px] rounded-full animate-float"></div>
                <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-health-cyber/10 dark:bg-health-cyber/5 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-2s' }}></div>
                <div className="absolute bottom-[10%] left-[20%] w-[25%] h-[25%] bg-health-violet/10 dark:bg-health-violet/5 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-4s' }}></div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-28 pb-20 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="text-center lg:text-left"
                        >


                            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-normal text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tighter" style={{ fontFamily: "'DM Serif Display', serif" }}>
                                Prevention <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-health-cyber">Begins With</span> Prediction
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-xl lg:mx-0 mx-auto leading-relaxed font-medium">
                                Bridge the gap between symptoms and clinical certainty. VitaGuard utilizes advanced diagnostic synthesis to map your biometric patterns, identifying subtle health shifts with technical precision.
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                                <Link to={currentUser ? "/dashboard" : "/signup"} className="btn-premium group text-lg px-10 py-5 text-center shadow-xl shadow-primary-500/20">
                                    {currentUser ? "Go to Dashboard" : "Get Started Free"}
                                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/features"
                                    className="btn-secondary group text-lg px-10 py-5 text-center"
                                >
                                    Explore Features
                                </Link>
                            </motion.div>

                        </motion.div>

                        <motion.div
                            className="relative lg:h-[600px] flex items-center justify-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="relative z-10 group">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-primary-400 to-health-cyber rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                <div className="glass-card p-3 rounded-[2.5rem] shadow-glass relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                                        alt="Doctor using tablet"
                                        className="rounded-[2rem] shadow-inner w-full h-[500px] object-cover"
                                    />
                                    {/* Floater UI 1 - Precision */}
                                    <motion.div
                                        animate={{ y: [0, -12, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -top-6 -right-12 bg-white dark:bg-dark-card p-5 rounded-[2rem] shadow-premium border-2 border-primary-100 dark:border-dark-border flex items-center gap-4 z-30"
                                    >
                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2.5 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-800/50">
                                            <Activity className="text-emerald-500 h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-widest mb-0.5">Protocol</p>
                                            <p className="text-xl font-black text-primary-900 dark:text-white leading-none">98.4% <span className="text-xs font-bold text-slate-400 dark:text-slate-500 ml-1">Precision</span></p>
                                        </div>
                                    </motion.div>

                                    {/* Floater UI 2 - Status */}
                                    <motion.div
                                        animate={{ y: [0, 12, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -bottom-8 -left-12 bg-white dark:bg-dark-card p-5 rounded-[2rem] shadow-premium border-2 border-primary-100 dark:border-dark-border flex items-center gap-4 z-30"
                                    >
                                        <div className="bg-primary-50 dark:bg-primary-900/20 p-2.5 rounded-xl shadow-sm border border-primary-100 dark:border-primary-800/50">
                                            <ShieldCheck className="text-primary-600 dark:text-primary-400 h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-widest mb-0.5">Trust Score</p>
                                            <p className="text-xl font-black text-primary-900 dark:text-white leading-none italic tracking-tighter">Verified <span className="text-xs font-bold text-health-cyber ml-1">✓</span></p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative z-10 overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-slate-900 rounded-[3.5rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 blur-[120px] rounded-full -mr-64 -mt-64 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-health-cyber/10 blur-[100px] rounded-full -ml-40 -mb-40"></div>

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                                <ShieldCheck size={18} className="text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Military Grade Encryption</span>
                            </div>

                            <h2 className="text-6xl md:text-8xl font-normal mb-8 tracking-tighter leading-none text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>
                                Secure Your <span className="italic text-primary-400 underline decoration-primary-500/30">Future</span>
                            </h2>

                            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                                Join our network of over 12,000+ individuals utilizing <span className="text-white font-bold">Predictive Synthesis</span> to stay ahead of metabolic and cardiovascular risks.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-primary-400 font-black text-3xl mb-2">45s</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Rapid Analysis</div>
                                </div>
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-emerald-400 font-black text-3xl mb-2">100%</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Private & Anonymous</div>
                                </div>
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-health-cyber font-black text-3xl mb-2">24/7</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Global Access</div>
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
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
