import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Github, Twitter, Linkedin, Mail, ShieldCheck } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-dark-bg text-slate-300 pt-20 pb-12 relative overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center">
                    {/* Brand & Mission */}
                    <div className="max-w-2xl mb-12">
                        <Link to="/" className="flex items-center justify-center space-x-2 mb-6 group">
                            <div className="bg-purple-600 p-2 rounded-xl shadow-glow transition-transform group-hover:scale-110">
                                <HeartPulse className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                                Vita<span className="text-purple-600">Guard</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium mb-8">
                            Synthesizing medical intelligence with biometric data to predict and prevent health risks before they arise.
                        </p>

                        {/* Contact Details */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm font-bold text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                                <Mail size={18} className="text-purple-600" />
                                <span>contact@vitaguard.ai</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={18} className="text-purple-600" />
                                <span>Secure Medical Protocol v2.4</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4 mb-16">
                        {[Github, Twitter, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 border border-slate-100 dark:border-white/5">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        &copy; {new Date().getFullYear()} VITAGUARD MEDICAL INTELLIGENCE. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8">
                        <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-purple-600 transition-colors">Privacy & Terms</Link>
                        <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-purple-600 transition-colors">Clinical Compliance</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
