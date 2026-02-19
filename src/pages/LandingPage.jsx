import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Activity, LineChart, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-primary-50 via-white to-health-blue/10">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#3b82f6" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.2,87.1,-15.6,86.1,-0.6C85.1,14.5,79.5,28.9,71.2,41.9C62.9,54.9,51.8,66.4,38.4,73.5C25,80.7,9.4,83.5,-6.3,81.4C-22,79.4,-37.7,72.4,-51,62.3C-64.3,52.2,-75.1,39.1,-80.7,24.1C-86.3,9.1,-86.7,-7.8,-82.1,-23.1C-77.5,-38.4,-67.9,-52.1,-55,-59.8C-42.1,-67.5,-25.9,-69.2,-10.8,-73.4C4.3,-77.6,19.3,-84.3,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block py-1 px-4 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-6">
                                Next-Gen Health Analysis
                            </span>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight mb-6">
                                Detect Health Risks <span className="text-primary-600">Early</span>. Act Before It's Serious.
                            </h1>
                            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                                Our intelligent system analyzes your symptoms and lifestyle to provide personalized health insights and early warning indicators.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/signup" className="btn-primary flex items-center justify-center gap-2 text-lg">
                                    Get Started <ArrowRight size={20} />
                                </Link>
                                <a href="#how-it-works" className="btn-secondary flex items-center justify-center text-lg">
                                    Learn More
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            className="relative"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="glass-card p-4 rounded-3xl relative z-10">
                                <img
                                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                                    alt="Doctor using tablet"
                                    className="rounded-2xl shadow-inner w-full h-[400px] object-cover"
                                />
                                <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl animate-pulse-soft hidden md:block">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-health-green/20 p-2 rounded-full">
                                            <ShieldCheck className="text-health-green h-8 w-8" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium">Risk Analysis</p>
                                            <p className="text-xl font-bold text-slate-800 underline decoration-health-green decoration-2">98.4% Accuracy</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-health-teal/20 blur-3xl rounded-full"></div>
                            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-200/20 blur-3xl rounded-full"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle">Three simple steps to understand your health better and stay ahead of potential risks.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Activity className="text-primary-600" />,
                                title: "Enter Data",
                                desc: "Provide your symptoms, lifestyle habits, and health history through our secure portal."
                            },
                            {
                                icon: <LineChart className="text-health-teal" />,
                                title: "AI Analysis",
                                desc: "Our advanced algorithms process your data to identify patterns and potential risk markers."
                            },
                            {
                                icon: <CheckCircle2 className="text-health-green" />,
                                title: "Get Insights",
                                desc: "Receive a comprehensive report with clear risk levels and personalized recommendations."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="bg-white p-4 rounded-2xl w-fit mb-6 shadow-sm">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-800">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 leading-tight">
                                Powerful Features for Your <span className="text-primary-600">Peace of Mind</span>
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { icon: <Activity className="text-primary-500" />, title: "Symptom Checker", desc: "Detailed analysis of your current physical symptoms." },
                                    { icon: <LineChart className="text-health-teal" />, title: "Predictive Analytics", desc: "Identify long-term health risks based on lifestyle data." },
                                    { icon: <Lock className="text-health-green" />, title: "Secure Data Storage", desc: "Your health records are encrypted and kept strictly private." },
                                    { icon: <ShieldCheck className="text-primary-600" />, title: "Early Warnings", desc: "Prevent serious illness with proactive health indicators." }
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="bg-white p-3 rounded-xl shadow-sm mt-1">{feature.icon}</div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-800 mb-1">{feature.title}</h4>
                                            <p className="text-slate-600">{feature.desc}</p>
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
                                        <img src="https://images.unsplash.com/photo-1579684381251-1da014f08e51?auto=format&fit=crop&q=80&w=400" alt="Health 3" className="w-full h-full object-cover rounded-xl" />
                                    </div>
                                    <div className="bg-white p-2 rounded-2xl overflow-hidden shadow-lg h-60">
                                        <img src="https://images.unsplash.com/photo-1484889158910-57ad217b19a5?auto=format&fit=crop&q=80&w=400" alt="Health 4" className="w-full h-full object-cover rounded-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-primary-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32 rounded-full"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-3xl -ml-32 -mb-32 rounded-full"></div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to take control of your health?</h2>
                            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                                Join thousands of users who are already using VitaGuard to stay proactive about their wellness.
                            </p>
                            <Link to="/signup" className="bg-white text-primary-600 hover:bg-primary-50 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg inline-flex items-center gap-2">
                                Get Started Now <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
