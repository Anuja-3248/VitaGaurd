import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Github, Twitter, Linkedin, Mail, ShieldCheck } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-white/5 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-primary-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-500">
                                <HeartPulse className="text-white" size={24} />
                            </div>
                            <span className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">
                                Vita<span className="text-primary-600">Guard</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                            Synthesizing medical intelligence with biometric data to predict and prevent health risks before they arise.
                        </p>
                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Columns */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/30 mb-8">Platform</h4>
                        <ul className="space-y-4">
                            {['Diagnostic Hub', 'Risk Analytics', 'Biometric Map', 'Community'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/30 mb-8">Resources</h4>
                        <ul className="space-y-4">
                            {['Documentation', 'Privacy Policy', 'Security Protocol', 'Clinical Basis'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Trust Column */}
                    <div className="bg-slate-50 dark:bg-white/5 rounded-[2rem] p-8 border border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-3 mb-4 text-emerald-600">
                            <ShieldCheck size={20} />
                            <span className="text-xs font-black uppercase tracking-widest leading-none">HIPAA Compliant</span>
                        </div>
                        <h4 className="text-lg font-black text-slate-800 dark:text-white mb-2 leading-tight">Data Integrity Guarantee</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">Your medical telemetry is end-to-end encrypted and never sold to third parties.</p>
                        <div className="h-1 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-primary-600 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        &copy; {new Date().getFullYear()} VITAGUARD MEDICAL INTELLIGENCE. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8">
                        <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-600">Terms of Service</Link>
                        <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-600">Compliance</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
