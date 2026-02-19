import { motion } from 'framer-motion';
import {
    X, User, Bell, LogOut, ShieldCheck,
    Activity, Award, Calendar, HeartPulse, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const ProfileDropdown = ({ isOpen, onClose, onLogout }) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const stats = [
        { label: 'Assessments', value: '12', icon: <Activity size={18} className="text-blue-400" />, sub: 'TOTAL' },
        { label: 'Day Streak', value: '5', icon: <Award size={18} className="text-amber-400" />, sub: 'CURRENT' },
        { label: 'Active Days', value: '8', icon: <Calendar size={18} className="text-purple-400" />, sub: 'VITAL' },
    ];

    const handleLinkClick = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-end p-4 pointer-events-none">
            {/* Backdrop for closing */}
            <div
                className="absolute inset-0 bg-black/20 pointer-events-auto cursor-default"
                onClick={onClose}
            />

            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="relative w-full max-w-sm bg-neutral-900 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto mt-16 mr-0 md:mr-4"
            >
                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b border-white/5">
                    <h2 className="text-xl font-bold text-white">Profile</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* User Info */}
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-indigo-500/20">
                            {currentUser?.displayName?.[0] || currentUser?.email?.[0] || 'V'}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">
                                {currentUser?.displayName || 'VitaGuard Member'}
                            </h3>
                            <p className="text-slate-400 text-sm font-medium opacity-70">
                                {currentUser?.email}
                            </p>
                        </div>
                    </div>

                    {/* Health Profile Primary Access Button - AS REQUESTED */}
                    <Link
                        to="/profile"
                        onClick={handleLinkClick}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                    >
                        <HeartPulse size={20} />
                        Visit Health Profile
                    </Link>

                    {/* Divider */}
                    <div className="h-px bg-white/5 w-full"></div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center text-center group cursor-default">
                                <div className="mb-2 opacity-80 group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <div className="text-lg font-black text-white tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mt-1 leading-none">
                                    {stat.sub}
                                    <br />
                                    {stat.label.split(' ')[0]}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-2">
                        <Link
                            to="/dashboard"
                            onClick={handleLinkClick}
                            className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all group"
                        >
                            <div className="bg-blue-500/20 p-2 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                                <Activity size={20} />
                            </div>
                            <div className="text-left flex-grow">
                                <p className="text-white font-bold leading-none">View Activity</p>
                                <p className="text-slate-500 text-xs mt-1">Check your recent progress</p>
                            </div>
                            <ChevronRight size={16} className="text-slate-700" />
                        </Link>

                        <Link
                            to="/reminders"
                            onClick={handleLinkClick}
                            className="w-full flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all group"
                        >
                            <div className="bg-purple-500/20 p-2 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                                <Bell size={20} />
                            </div>
                            <div className="text-left flex-grow">
                                <p className="text-white font-bold leading-none">Reminders & Alerts</p>
                                <p className="text-slate-500 text-xs mt-1">Configure clinical schedules</p>
                            </div>
                            <ChevronRight size={16} className="text-slate-700" />
                        </Link>
                    </div>

                    {/* Sign Out Section */}
                    <button
                        onClick={onLogout}
                        className="w-full mt-4 flex items-center gap-4 p-4 bg-rose-500/10 border border-rose-500/10 hover:bg-rose-500/20 rounded-2xl transition-all group"
                    >
                        <div className="bg-rose-500 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                            <LogOut size={20} />
                        </div>
                        <div className="text-left">
                            <p className="text-rose-500 font-bold leading-none">Sign Out</p>
                            <p className="text-rose-500/60 text-xs mt-1">Log out of your account</p>
                        </div>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileDropdown;
