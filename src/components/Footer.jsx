import { Link } from 'react-router-dom';
import { HeartPulse, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-6">
                            <HeartPulse className="h-8 w-8 text-primary-400" />
                            <span className="text-2xl font-bold text-white italic">VitaGuard</span>
                        </Link>
                        <p className="text-slate-400 mb-6">
                            Empowering early health detection through intelligent symptom analysis and risk prediction.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-primary-400 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-primary-400 transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="hover:text-primary-400 transition-colors"><Github size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
                            <li><a href="#how-it-works" className="hover:text-primary-400 transition-colors">How It Works</a></li>
                            <li><a href="#features" className="hover:text-primary-400 transition-colors">Features</a></li>
                            <li><Link to="/assessment" className="hover:text-primary-400 transition-colors">Start Assessment</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Stay Updated</h3>
                        <p className="text-slate-400 mb-4 text-sm">Get the latest health insights and updates.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-slate-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-primary-400 outline-none"
                            />
                            <button className="bg-primary-600 hover:bg-primary-700 text-white rounded-r-lg px-4 py-2 transition-colors">
                                <Mail size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} VitaGuard System. Built for early risk detection. For educational purposes only.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
