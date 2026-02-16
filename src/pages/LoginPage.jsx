import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, HeartPulse, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            toast.success('Logged in successfully!');
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            toast.error('Login failed. Check your email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-health-blue/10 px-4 pt-20">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-6">
                        <HeartPulse className="h-10 w-10 text-primary-600" />
                        <span className="text-3xl font-bold italic bg-gradient-to-r from-primary-600 to-health-teal bg-clip-text text-transparent">
                            VitaGuard
                        </span>
                    </Link>
                    <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
                    <p className="text-slate-500 mt-2">Log in to manage your health insights</p>
                    {error && <div className="mt-4 p-3 bg-rose-50 text-rose-600 rounded-xl text-sm border border-rose-100">{error}</div>}
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2 ml-1">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                    <Mail size={18} />
                                </span>
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2 ml-1">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="text-right mt-2">
                                <a href="#" className="text-sm text-primary-600 hover:underline">Forgot password?</a>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50">
                            {loading ? 'Logging in...' : 'Login'} <ArrowRight size={20} />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary-600 font-bold hover:underline">Sign up for free</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
