import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, HeartPulse, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signup(email, password, name);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create an account. ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-20 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary-100/50 blur-[100px] rounded-full animate-float"></div>
                <div className="absolute bottom-[20%] right-[-5%] w-80 h-80 bg-health-violet/5 blur-[80px] rounded-full animate-float" style={{ animationDelay: '-3s' }}></div>
            </div>

            <div className="max-w-md w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
                        <div className="bg-primary-600 p-2 rounded-xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                            <HeartPulse className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-3xl font-black bg-gradient-to-r from-primary-700 to-health-cyber bg-clip-text text-transparent tracking-tight">
                            VitaGuard
                        </span>
                    </Link>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Create Account</h2>
                    <p className="text-slate-500 mt-2 font-medium italic">Join thousand of users staying proactive about health</p>
                    {error && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mt-6 p-4 bg-rose-50 text-rose-600 rounded-2xl text-sm border border-rose-100 font-bold"
                        >
                            {error}
                        </motion.div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-10 rounded-[2.5rem] shadow-premium relative overflow-hidden"
                >
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-health-cyber/5 blur-2xl rounded-full -ml-16 -mb-16"></div>

                    <form onSubmit={handleSignup} className="space-y-5 relative z-10">
                        <div>
                            <label className="block text-slate-700 text-xs font-black uppercase tracking-widest mb-3 ml-1 opacity-70">Full Name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                    <User size={18} />
                                </span>
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-700 text-xs font-black uppercase tracking-widest mb-3 ml-1 opacity-70">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                    <Mail size={18} />
                                </span>
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-700 text-xs font-black uppercase tracking-widest mb-3 ml-1 opacity-70">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-3 py-2 px-1">
                            <input type="checkbox" required className="mt-1 h-4 w-4 border-slate-300 rounded text-primary-600 focus:ring-primary-500 transition-colors" />
                            <span className="text-xs text-slate-500 leading-normal font-medium">
                                I agree to the <button type="button" className="text-primary-600 font-bold hover:underline">Terms</button> and <button type="button" className="text-primary-600 font-bold hover:underline">Privacy Policy</button>.
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-premium py-4 shadow-glow disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Create Account'}
                            <ArrowRight size={20} className="ml-2" />
                        </button>
                    </form>

                    <div className="mt-10 text-center relative z-10">
                        <p className="text-slate-500 font-medium">
                            Already a member?{' '}
                            <Link to="/login" className="text-primary-600 font-black hover:text-primary-700 transition-colors underline underline-offset-4 decoration-primary-200 hover:decoration-primary-500">
                                Log in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignupPage;
