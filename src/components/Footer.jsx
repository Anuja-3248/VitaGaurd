import { Link } from 'react-router-dom';
import { HeartPulse, Mail, Phone, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-24 pb-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/5 blur-[120px] rounded-full -mr-32 -mt-32"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
                    {/* Brand & Mission */}
                    <div className="max-w-md">
                        <Link to="/" className="flex items-center space-x-2 mb-8 group">
                            <div className="bg-primary-600 p-2 rounded-xl shadow-glow transition-transform group-hover:scale-110">
                                <HeartPulse className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-3xl font-black text-white tracking-tighter italic">VitaGuard</span>
                        </Link>
                        <h3 className="text-xl font-bold text-white mb-4">Precision Preventive Intelligence</h3>
                        <p className="text-slate-400 leading-relaxed font-medium">
                            VitaGuard is a next-generation diagnostic companion that bridges the gap between raw health data and clinical intelligence. We utilize sophisticated AI protocols to detect early-stage risk markers, empowering individuals to take proactive control of their medical future.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="w-full md:w-auto">
                        <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 md:p-8 border border-white/10 shadow-2xl">
                            <h4 className="text-sm font-black text-primary-400 uppercase tracking-[0.3em] mb-6">Get In Touch</h4>
                            <p className="text-white text-lg font-bold mb-6 max-w-[220px]">
                                Have any questions? Contact Anuja Pawar.
                            </p>

                            <div className="space-y-5">
                                <motion.a
                                    href="mailto:anujap2222@gmail.com"
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="bg-slate-800 p-2.5 rounded-xl group-hover:bg-primary-600 transition-colors">
                                        <Mail size={18} className="text-primary-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</p>
                                        <p className="text-white font-bold group-hover:text-primary-400 transition-colors">anujap2222@gmail.com</p>
                                    </div>
                                </motion.a>

                                <motion.a
                                    href="tel:+918010030919"
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="bg-slate-800 p-2.5 rounded-xl group-hover:bg-primary-600 transition-colors">
                                        <Phone size={18} className="text-primary-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Direct Contact</p>
                                        <p className="text-white font-bold group-hover:text-primary-400 transition-colors">+91 80100 30919</p>
                                    </div>
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
