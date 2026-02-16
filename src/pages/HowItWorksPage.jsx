import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, LineChart, CheckCircle2, ArrowRight } from 'lucide-react';
import GenZIcon from '../components/GenZIcon';

const HowItWorksPage = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [activeStep, setActiveStep] = useState("01");

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6"
                    >
                        The Protocol
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-8"
                    >
                        Precision <span className="italic text-primary-600">Workflow</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Our diagnostic engine transforms raw data into clinical intelligence through a three-stage neural architecture.
                    </motion.p>
                </div>

                {/* Vertical Step Connection (Desktop) */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-slate-100 dark:bg-slate-800 top-0 -z-10"></div>

                <div className="space-y-32 lg:space-y-48">
                    {[
                        {
                            step: "01",
                            icon: <GenZIcon icon={Activity} color="text-white" glowColor="bg-white/20" />,
                            title: "Biometric Intake",
                            desc: "Our intelligent gateway synchronizes with your existing health metrics and symptoms. We establish a comprehensive baseline using verified clinical markers.",
                            color: "from-blue-600 to-indigo-600",
                            glow: "bg-blue-400/20",
                            details: ["Symptom Categorization", "Baseline Calibration", "Risk Variable Matching"]
                        },
                        {
                            step: "02",
                            icon: <GenZIcon icon={LineChart} color="text-white" glowColor="bg-white/20" />,
                            title: "Diagnostic Synthesis",
                            desc: "Advanced computational logic maps your reported symptoms against clinical datasets to detect early-stage deviations before they become critical.",
                            color: "from-health-cyber to-blue-500",
                            glow: "bg-cyan-400/20",
                            details: ["Computational Logic Review", "Dynamic Risk Projection", "Deviance Mapping"]
                        },
                        {
                            step: "03",
                            icon: <GenZIcon icon={CheckCircle2} color="text-white" glowColor="bg-white/20" />,
                            title: "Clinical Synthesis",
                            desc: "A high-fidelity report is generated with exact risk classifications and preventive measures. This is actionable intelligence you can take to your doctor.",
                            color: "from-slate-800 to-slate-900",
                            glow: "bg-emerald-400/10",
                            details: ["Risk Level Classification", "Custom Precautions", "PDF Health Documentation"]
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Visual Side */}
                            <div className="w-full lg:w-1/2 flex justify-center">
                                <div className="relative group cursor-pointer w-full max-w-md">
                                    <div className={`absolute inset-0 ${item.glow} blur-3xl rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-700`}></div>
                                    <div className="glass-card bg-white/50 dark:bg-dark-card/40 p-12 rounded-[3.5rem] border-slate-100 dark:border-dark-border/50 hover:border-white dark:hover:border-dark-border hover:shadow-2xl transition-all duration-700 relative text-center">

                                        <div className="text-[120px] font-black text-slate-100 dark:text-slate-800/50 absolute -top-10 -right-4 leading-none select-none z-0">
                                            {item.step}
                                        </div>

                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className={`relative bg-gradient-to-br ${item.color} p-8 rounded-[2.5rem] shadow-lg shadow-blue-500/10 mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                                                {item.icon}
                                            </div>
                                            <div className="space-y-3">
                                                {item.details.map((detail, i) => (
                                                    <div key={i} className="bg-white dark:bg-dark-bg/60 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/5">
                                                        {detail}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2 text-center lg:text-left">
                                <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full mb-6 inline-block">
                                    Stage {item.step} Protocol
                                </span>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                                    {item.title}
                                </h3>
                                <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-8">
                                    {item.desc}
                                </p>
                                <button className="text-primary-600 text-sm font-black uppercase tracking-widest hover:text-primary-700 flex items-center gap-2 mx-auto lg:mx-0 group">
                                    Explore This Phase <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-48 text-center bg-slate-50 dark:bg-dark-card/30 rounded-[3rem] p-16">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Ready to begin the protocol?</h2>
                    <p className="text-slate-500 mb-8 max-w-2xl mx-auto">Start your complimentary biometric intake session today.</p>
                    <a href="/login" className="btn-premium px-12 py-4 shadow-xl shadow-primary-500/20">Initate Scan</a>
                </div>

            </div>
        </div>
    );
};

export default HowItWorksPage;
