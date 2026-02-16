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
        <div className="min-h-screen flex bg-neutral-950">
            {/* Left Side - Welcome Panel with Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-neutral-900 relative overflow-hidden">
                {/* Warm, personal health-related background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1200')"
                    }}
                ></div>

                {/* Lighter gradient overlay - refined to match black theme */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-neutral-900/75 to-black/90"></div>

                <div className="relative z-10 p-12 flex flex-col justify-between w-full">
                    <div>
                        <Link to="/" className="inline-flex items-center space-x-3 mb-16">
                            <div className="bg-blue-600 p-2.5 rounded-lg">
                                <HeartPulse className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-semibold text-white">VitaGuard</span>
                        </Link>

                        <div className="space-y-6 max-w-lg">
                            <h1 className="text-5xl font-semibold text-white leading-tight">
                                Join VitaGuard,<br />
                                Start Your Health Journey
                            </h1>
                            <p className="text-xl text-slate-300 leading-relaxed">
                                Create your account and get personalized health insights powered by AI. Take the first step towards a healthier you.
                            </p>
                        </div>
                    </div>

                    {/* Simple feature list */}
                    <div className="space-y-3 max-w-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            <p className="text-slate-300 text-sm">24/7 Health Monitoring</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                            <p className="text-slate-300 text-sm">AI-Powered Insights</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                            <p className="text-slate-300 text-sm">100% Secure & Private</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Mobile logo */}
                        <div className="lg:hidden text-center mb-8">
                            <Link to="/" className="inline-flex items-center space-x-3">
                                <div className="bg-blue-600 p-2.5 rounded-lg">
                                    <HeartPulse className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-semibold text-white">VitaGuard</span>
                            </Link>
                        </div>

                        <div>
                            <h2 className="text-3xl font-medium text-white mb-2">Create your account</h2>
                            <p className="text-slate-400">Join thousands of users staying proactive about health</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSignup} className="space-y-5">
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    Full name
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                                        <User size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    Email address
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                                        <Mail size={18} />
                                    </span>
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
                                        <Lock size={18} />
                                    </span>
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-start gap-3 py-2">
                                <input
                                    type="checkbox"
                                    required
                                    className="mt-1 h-4 w-4 border-slate-600 rounded bg-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                                />
                                <span className="text-xs text-slate-400 leading-normal">
                                    I agree to the <button type="button" className="text-blue-400 hover:text-blue-300 font-medium">Terms</button> and <button type="button" className="text-blue-400 hover:text-blue-300 font-medium">Privacy Policy</button>.
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? 'Creating account...' : 'Create account'}
                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </form>

                        <div className="text-center">
                            <p className="text-slate-400 text-sm">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
