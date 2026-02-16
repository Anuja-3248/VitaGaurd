import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Activity, LineChart, Brain, HeartPulse, UserCheck, XCircle } from 'lucide-react';
import GenZIcon from '../components/GenZIcon';

const FeaturesPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-emerald-500/10 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6"
                    >
                        Capabilities
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-8"
                    >
                        Functionality <span className="italic text-emerald-500">Overview</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        A comprehensive suite of diagnostic tools engineered for personal health sovereignty.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <GenZIcon icon={Activity} color="text-primary-500" />,
                            title: "Symptom Checker",
                            desc: "Real-time analysis of physical symptoms mapped against a clinical database of 4,000+ conditions.",
                            tag: "Diagnostic"
                        },
                        {
                            icon: <GenZIcon icon={LineChart} color="text-health-teal" />,
                            title: "Predictive Analytics",
                            desc: "Our AI forecasts potential long-term health risks based on your current lifestyle and biometric inputs.",
                            tag: "Forecast"
                        },
                        {
                            icon: <GenZIcon icon={Lock} color="text-health-green" />,
                            title: "Secure Data Storage",
                            desc: "Your health records are encrypted with AES-256 military-grade standards. We cannot see your data.",
                            tag: "Security"
                        },
                        {
                            icon: <GenZIcon icon={ShieldCheck} color="text-primary-600" />,
                            title: "Early Warnings",
                            desc: "Receive proactive alerts for metabolic or cardiovascular deviations before they become critical.",
                            tag: "Proactive"
                        },
                        {
                            icon: <GenZIcon icon={Brain} color="text-indigo-500" />,
                            title: "Neural Synthesis",
                            desc: "Deep learning algorithms connect unrelated symptoms to identify complex underlying syndromes.",
                            tag: "AI Core"
                        },
                        {
                            icon: <GenZIcon icon={UserCheck} color="text-rose-500" />,
                            title: "Physician Ready",
                            desc: "Export reports formatted specifically for clinical review, saving time during doctor visits.",
                            tag: "Clinical"
                        }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-dark-card p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-dark-border group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="bg-slate-50 dark:bg-dark-bg p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                                    {feature.icon}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-white/5 py-1 px-2 rounded-lg">{feature.tag}</span>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-primary-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Table */}
                <div className="mt-32 max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Why VitaGuard?</h2>
                        <p className="text-slate-500">See how we compare to traditional health tracking.</p>
                    </div>

                    <div className="bg-white dark:bg-dark-card rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-dark-border">
                        <div className="grid grid-cols-3 p-8 border-b border-slate-100 dark:border-dark-border bg-slate-50 dark:bg-white/5">
                            <div className="col-span-1 font-black text-slate-400 uppercase tracking-widest text-xs">Feature</div>
                            <div className="col-span-1 font-black text-center text-primary-600 uppercase tracking-widest text-xs">VitaGuard</div>
                            <div className="col-span-1 font-black text-center text-slate-400 uppercase tracking-widest text-xs">Others</div>
                        </div>
                        {[
                            { name: "Clinical Precision", vita: true, other: false },
                            { name: "AES-256 Encryption", vita: true, other: true },
                            { name: "Predictive AI", vita: true, other: false },
                            { name: "Physician Reports", vita: true, other: false },
                            { name: "Real-time Analysis", vita: true, other: true },
                        ].map((row, i) => (
                            <div key={i} className="grid grid-cols-3 p-6 border-b border-slate-100 dark:border-dark-border/50 items-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <div className="col-span-1 font-bold text-slate-700 dark:text-slate-300">{row.name}</div>
                                <div className="col-span-1 flex justify-center">
                                    {row.vita ? <ShieldCheck className="text-emerald-500" size={24} /> : <XCircle className="text-slate-300" size={24} />}
                                </div>
                                <div className="col-span-1 flex justify-center">
                                    {row.other ? <ShieldCheck className="text-slate-400" size={24} /> : <XCircle className="text-slate-200 dark:text-slate-700" size={24} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FeaturesPage;
