import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, ArrowRight, ArrowLeft, ShieldCheck, Activity,
    Brain, Zap, HeartPulse, Lock, TrendingUp, Sparkles
} from 'lucide-react';

const WordAnimation = ({ text, delay = 0, className = "" }) => {
    const words = text.split(" ");
    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: delay + (i * 0.04),
                        ease: [0.2, 0.65, 0.3, 0.9]
                    }}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

const OnboardingFlow = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Welcome to VitaGuard",
            description: "Your unified clinical intelligence platform for proactive health monitoring. Let's explore how we synchronize your biometric data for maximum longevity.",
            icon: <HeartPulse className="text-primary-400" size={28} />,
        },
        {
            title: "Predictive Intelligence",
            description: "Our neural engines identify health risks before they manifest into symptoms, giving you the power of early intervention through data synthesis.",
            icon: <Brain className="text-primary-400" size={28} />,
        },
        {
            title: "Bio-Metric Synthesis",
            description: "We analyze everything from resting heart rate to sleep patterns to provide a unified, evidence-based health risk score.",
            icon: <Activity className="text-cyan-400" size={28} />,
        },
        {
            title: "Clinical Systems Ready",
            description: "Setup complete. You are now equipped with the ultimate preventive healthcare tool. Let's begin your first assessment.",
            icon: <ShieldCheck className="text-emerald-400" size={28} />,
        }
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] clinical-purple-theme flex items-center justify-center p-6">
            {/* Background Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="glow-orb top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 animate-float" />
                <div className="glow-orb bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-cyan-600/5 animate-float" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-4xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[4.5rem] shadow-[0_60px_150px_-20px_rgba(0,0,0,1)] overflow-hidden relative z-10"
            >
                {/* Close Button */}
                <button
                    onClick={onComplete}
                    className="absolute top-10 right-10 p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-500 transition-colors z-20 group"
                >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Content Area */}
                <div className="p-12 md:p-20 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="min-h-[220px] flex flex-col justify-center"
                        >
                            {/* Title branding focus */}
                            <div className="mb-0">
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <div className="p-3 bg-white/5 rounded-2xl shadow-inner">
                                        {steps[currentStep].icon}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">Protocol Initialization</span>
                                </motion.div>

                                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
                                    <WordAnimation text={steps[currentStep].title} delay={0} />
                                </h1>

                                <div className="h-[1px] w-24 bg-white/10 rounded-full overflow-hidden mb-10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="h-full bg-primary-500"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mb-12">
                                <WordAnimation text={steps[currentStep].description} delay={0.2} />
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between mt-8">
                        <div className="flex gap-2">
                            {steps.map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        width: i === currentStep ? 32 : 8,
                                        backgroundColor: i === currentStep ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.1)"
                                    }}
                                    className="h-1 rounded-full transition-all duration-700"
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className={`text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                            >
                                Get Back
                            </button>

                            <button
                                onClick={handleNext}
                                className="px-12 py-5 bg-white text-black rounded-3xl flex items-center justify-center gap-3 transition-all font-black text-[12px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
                            >
                                {currentStep === steps.length - 1 ? 'Start Life Metric' : 'Next Stage'}
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default OnboardingFlow;
