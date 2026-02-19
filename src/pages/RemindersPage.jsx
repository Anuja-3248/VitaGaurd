import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell, Clock, Calendar, AlertCircle,
    CheckCircle2, Plus, X, ArrowRight,
    Activity, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const formatTime12h = (time24) => {
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
};

const RemindersPage = () => {
    const { currentUser } = useAuth();
    const [reminders, setReminders] = useState(() => {
        const saved = localStorage.getItem(`vitaGuard_reminders_${currentUser?.uid}`);
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'Daily Medical Checkup', time: '09:00', type: 'routine', enabled: true, days: ['Mon', 'Wed', 'Fri'] },
            { id: 2, title: 'Health Analysis Sync', time: '21:00', type: 'vital', enabled: true, days: ['Daily'] },
        ];
    });

    const [isAdding, setIsAdding] = useState(false);
    const [newReminder, setNewReminder] = useState({ title: '', time: '08:00', type: 'routine', frequency: 'Daily' });

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`vitaGuard_reminders_${currentUser.uid}`, JSON.stringify(reminders));
        }
    }, [reminders, currentUser]);

    // REAL-TIME ALERT MONITORING ENGINE
    useEffect(() => {
        const checkReminders = () => {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

            reminders.forEach(reminder => {
                if (reminder.enabled && reminder.time === currentTime) {
                    // Prevent double triggering within the same minute
                    const lastTriggered = sessionStorage.getItem(`last_triggered_${reminder.id}`);
                    if (lastTriggered !== currentTime) {
                        toast((t) => (
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${reminder.type === 'vital' ? 'bg-rose-500' : 'bg-blue-500'} text-white`}>
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <p className="font-black text-sm uppercase tracking-tight">Clinical Alert Triggered</p>
                                    <p className="text-xs font-medium opacity-70">{reminder.title}</p>
                                </div>
                            </div>
                        ), {
                            duration: 5000,
                            style: {
                                background: '#0a0a0a',
                                color: '#fff',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '1.5rem',
                                padding: '1rem'
                            }
                        });

                        // Play specialized alert tone (standard notification style)
                        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                        audio.play().catch(e => console.log("Audio play blocked by browser policy"));

                        sessionStorage.setItem(`last_triggered_${reminder.id}`, currentTime);
                    }
                }
            });
        };

        const interval = setInterval(checkReminders, 10000); // Check every 10 seconds
        return () => clearInterval(interval);
    }, [reminders]);

    const toggleReminder = (id) => {
        setReminders(prev => prev.map(r =>
            r.id === id ? { ...r, enabled: !r.enabled } : r
        ));
    };

    const deleteReminder = (id) => {
        setReminders(prev => prev.filter(r => r.id !== id));
        toast.success('Reminder decommissioned');
    };

    const addReminder = (e) => {
        e.preventDefault();
        if (!newReminder.title) return;

        const reminder = {
            ...newReminder,
            id: Date.now(),
            enabled: true,
            days: newReminder.frequency === 'Daily' ? ['Daily'] : ['Mon', 'Wed', 'Fri']
        };

        setReminders(prev => [...prev, reminder]);
        setIsAdding(false);
        setNewReminder({ title: '', time: '08:00', type: 'routine', frequency: 'Daily' });
        toast.success('Clinical protocol deployed');
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white pt-28 pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Diagnostic Banner */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-8 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Surveillance Protocol: Reminders & Alerts Active</span>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors mb-4 text-sm font-bold uppercase tracking-widest">
                            <ArrowRight size={16} className="rotate-180" /> Back to Headquarters
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter flex items-center gap-4">
                            Clinical Alerts <span className="text-blue-500"><Bell size={32} /></span>
                        </h1>
                        <p className="text-slate-400 mt-2 font-medium max-w-xl">
                            Configure your medical surveillance and neural checkup schedules for automated monitoring.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsAdding(true)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={20} /> Initialize New Alert
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Active Reminders List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Active Monitoring Protocols</h3>
                            <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full font-black">
                                {reminders.filter(r => r.enabled).length} ONLINE
                            </span>
                        </div>

                        <AnimatePresence mode="popLayout">
                            {reminders.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white/5 border border-dashed border-white/10 rounded-3xl p-12 text-center"
                                >
                                    <Clock className="mx-auto text-slate-700 mb-4" size={48} />
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No active alerts detected</p>
                                </motion.div>
                            ) : (
                                reminders.map((reminder) => (
                                    <motion.div
                                        key={reminder.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className={`group relative overflow-hidden bg-white/5 border border-white/10 p-6 rounded-[2rem] transition-all hover:bg-white/[0.07] ${!reminder.enabled && 'opacity-50 grayscale'}`}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-4 rounded-2xl ${reminder.type === 'vital' ? 'bg-rose-500/20 text-rose-500' : 'bg-blue-500/20 text-blue-500 shadow-glow'}`}>
                                                    {reminder.type === 'vital' ? <AlertCircle size={24} /> : <Activity size={24} />}
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-white tracking-tight">{reminder.title}</h4>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-slate-400 text-sm flex items-center gap-1 font-medium">
                                                            <Clock size={14} className="text-blue-500" /> {formatTime12h(reminder.time)}
                                                        </span>
                                                        <span className="text-slate-600 font-black text-[10px] uppercase tracking-wider">
                                                            • {reminder.days.join(', ')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => toggleReminder(reminder.id)}
                                                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${reminder.enabled ? 'bg-blue-600' : 'bg-slate-800'}`}
                                                >
                                                    <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${reminder.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                                                </button>
                                                <button
                                                    onClick={() => deleteReminder(reminder.id)}
                                                    className="p-2 text-slate-600 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Stats/Info Column */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-500/20">
                            <TrendingUp className="text-white/30 mb-4" size={32} />
                            <h3 className="text-2xl font-black text-white tracking-tighter mb-2">Clinical Streak</h3>
                            <p className="text-white/60 text-sm font-medium mb-6">You've responded to clinical alerts for 5 consecutive days. High synchronization achieved.</p>
                            <div className="text-5xl font-black text-white">05 <span className="text-sm font-bold opacity-50 uppercase tracking-widest">Days</span></div>
                        </div>

                        <div className="bg-white/5 border border-white/5 p-8 rounded-[2rem]">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Surveillance Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-400">Total Protocols</span>
                                    <span>{reminders.length}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-400">Critical Alerts</span>
                                    <span className="text-rose-500">{reminders.filter(r => r.type === 'vital').length}</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                                    <div className="h-full bg-blue-500 w-[70%]" />
                                </div>
                                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest text-center mt-2">72% Compliance Rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Modal Placeholder */}
            {isAdding && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
                    >
                        <h2 className="text-2xl font-black text-white tracking-tight mb-6">Configure Protocol</h2>
                        <form onSubmit={addReminder} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Protocol Name</label>
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors font-bold"
                                    placeholder="e.g. Heart Rate Sync"
                                    value={newReminder.title}
                                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Sync Time (AM/PM)</label>
                                    <input
                                        type="time"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors font-bold"
                                        value={newReminder.time}
                                        onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Clinic Frequency</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors font-bold appearance-none"
                                        value={newReminder.frequency}
                                        onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })}
                                    >
                                        <option value="Daily">Daily Routine</option>
                                        <option value="Custom">Other (MWF)</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Alert Severity</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setNewReminder({ ...newReminder, type: 'routine' })}
                                        className={`py-3 rounded-xl font-bold border transition-all ${newReminder.type === 'routine' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-white/5 border-white/5 text-slate-500'}`}
                                    >
                                        Routine
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewReminder({ ...newReminder, type: 'vital' })}
                                        className={`py-3 rounded-xl font-bold border transition-all ${newReminder.type === 'vital' ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-white/5 border-white/5 text-slate-500'}`}
                                    >
                                        Vital
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black transition-all active:scale-95 mt-4"
                            >
                                Deploy Profile
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default RemindersPage;
