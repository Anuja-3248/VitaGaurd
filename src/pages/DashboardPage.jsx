import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Activity, Clock, ShieldAlert, FileText, Plus, ArrowRight,
    TrendingUp, User, Lock, ShieldCheck, Calendar, Lightbulb, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import GenZIcon from '../components/GenZIcon';

import { useTheme } from '../context/ThemeContext';

const DashboardPage = () => {
    const { currentUser } = useAuth();
    const { theme } = useTheme();
    const [assessments, setAssessments] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAllReports, setShowAllReports] = useState(false);
    const userName = currentUser?.displayName || "Guest";

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) return;
            try {
                // 1. Fetch Assessments
                const q = query(
                    collection(db, "assessments"),
                    where("userId", "==", currentUser.uid)
                );

                const querySnapshot = await getDocs(q);
                const fetchedAssessments = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                fetchedAssessments.sort((a, b) => {
                    const timeA = a.timestamp?.seconds || 0;
                    const timeB = b.timestamp?.seconds || 0;
                    return timeB - timeA;
                });

                setAssessments(fetchedAssessments);

                // 2. Fetch Profile Completion Status
                const profileRef = doc(db, "users", currentUser.uid);
                const profileSnap = await getDoc(profileRef);
                if (profileSnap.exists()) {
                    setUserProfile(profileSnap.data());
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentUser]);

    const isProfileComplete = userProfile?.age && userProfile?.height && userProfile?.weight;

    // Prepare chart data (reverse to show chronological order)
    const chartData = assessments.slice(0, 10).reverse().map((item, index) => {
        const date = item.timestamp?.toDate ? item.timestamp.toDate() : null;
        return {
            displayDate: date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A',
            displayTime: date ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '',
            score: item.riskScore || 0,
            id: item.id || index // Unique key for positioning
        };
    });



    const stats = [
        {
            label: "Overall Risk",
            value: assessments.length > 0 ? (assessments[0].riskScore < 15 ? "Low" : assessments[0].riskScore < 30 ? "Moderate" : "High") : "N/A",
            color: assessments.length > 0
                ? (assessments[0].riskScore < 15 ? "text-emerald-500" : assessments[0].riskScore < 30 ? "text-amber-500" : "text-rose-500")
                : "text-slate-400",
            bgColor: assessments.length > 0
                ? (assessments[0].riskScore < 15 ? "bg-emerald-50 dark:bg-emerald-500/10" : assessments[0].riskScore < 30 ? "bg-amber-50 dark:bg-amber-500/10" : "bg-rose-50 dark:bg-rose-500/10")
                : "bg-slate-50 dark:bg-slate-800",
            icon: <GenZIcon icon={ShieldCheck} color={assessments.length > 0 ? (assessments[0].riskScore < 15 ? "text-emerald-500" : assessments[0].riskScore < 30 ? "text-amber-500" : "text-rose-500") : "text-slate-400"} glowColor="bg-emerald-500/20" />,
            trend: assessments.length > 1 ? (assessments[0].riskScore < assessments[1].riskScore ? "improving" : "stable") : "baseline"
        },
        {
            label: "Last Checkup",
            value: assessments.length > 0 ? assessments[0].timestamp?.toDate?.().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "Never",
            color: "text-amber-500",
            bgColor: "bg-amber-50 dark:bg-amber-500/10",
            icon: <GenZIcon icon={Calendar} color="text-amber-500" glowColor="bg-amber-500/20" />,
            trend: assessments.length > 0 ? "recent" : "pending"
        },
        {
            label: "Active Insights",
            value: assessments.length > 0 ? "3 Alerts" : "0 Alerts",
            color: "text-violet-500",
            bgColor: "bg-violet-50 dark:bg-violet-500/10",
            icon: <GenZIcon icon={Lightbulb} color="text-violet-500" glowColor="bg-violet-500/20" />,
            trend: "analyzing"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="bg-slate-50 dark:bg-neutral-950 min-h-screen pt-36 pb-12 px-4 relative overflow-hidden transition-colors duration-300">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
                {/* Large Watermark Text */}
                <h1 className="text-[12rem] font-bold text-black/5 dark:text-white/5 whitespace-nowrap select-none transform -rotate-12 scale-150 tracking-tighter">
                    VitaGuard Intelligence
                </h1>

                {/* Subtle Glows */}
                <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-primary-100/30 dark:bg-primary-900/10 blur-[100px] rounded-full animate-float"></div>
                <div className="absolute bottom-[5%] right-[5%] w-[25%] h-[25%] bg-health-cyber/5 dark:bg-health-cyber/5 blur-[80px] rounded-full animate-float" style={{ animationDelay: '-3s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Profile Completion Multi-Banner */}
                {!loading && !isProfileComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card mb-10 overflow-hidden group shadow-premium border border-white/60 dark:border-white/20"
                    >
                        <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-health-violet p-1">
                            <div className="bg-white dark:bg-dark-card rounded-[1.4rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-6 text-center md:text-left">
                                    <div className="h-16 w-16 bg-primary-50 dark:bg-primary-900/10 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        <User size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                                            Complete Your Health Profile
                                        </h2>
                                        <p className="text-slate-500 dark:text-slate-400 font-normal max-w-lg">
                                            Unlock high-precision AI risk detection by providing your baseline metrics.
                                        </p>
                                    </div>
                                </div>
                                <Link to="/profile" className="btn-premium px-8 py-4 text-base whitespace-nowrap shadow-glow">
                                    Complete Setup <ArrowRight size={18} className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
                >
                    <motion.div variants={itemVariants}>

                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter leading-none">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">{userName}</span>
                        </h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400 mt-3 font-normal">Your health insights are updated and ready for review.</p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Link to="/assessment" className="relative group px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-300 relative z-10" />
                            <span className="relative z-10">New Assessment</span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    {stats.map((stat, idx) => {
                        const cardStyles = [
                            "bg-emerald-50/60 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-500/20 hover:shadow-emerald-500/10", // Risk
                            "bg-amber-50/60 dark:bg-amber-900/10 border-amber-100 dark:border-amber-500/20 hover:shadow-amber-500/10",     // Checkup
                            "bg-violet-50/60 dark:bg-violet-900/10 border-violet-100 dark:border-violet-500/20 hover:shadow-violet-500/10"   // Insights
                        ];

                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className={`glass-card p-6 rounded-[2rem] hover:shadow-glow transition-all duration-500 group border ${cardStyles[idx]}`}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`${stat.bgColor} ${stat.color} p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Health Trend Chart */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-8 md:p-10 rounded-[2.5rem] shadow-premium mb-12 border border-indigo-100 dark:border-indigo-500/20 bg-indigo-50/40 dark:bg-indigo-900/5 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-3xl rounded-full -mr-32 -mt-32"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative z-10">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Risk Analytics Trend</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-normal">Visualizing your progress over the last 7 scans.</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {assessments.length >= 2 && (
                                <>
                                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl text-xs font-black border border-emerald-100 shadow-sm">
                                        <ShieldCheck size={14} /> Peak Health: {Math.min(...assessments.map(a => a.riskScore))}%
                                    </div>
                                </>
                            )}
                            <div className="flex items-center gap-2 text-primary-600 bg-primary-50 px-4 py-2 rounded-xl text-xs font-black border border-primary-100 shadow-sm">
                                <TrendingUp size={14} /> Clinical Synthesis
                            </div>
                        </div>
                    </div>

                    <div className="h-[350px] w-full relative z-10">
                        {loading ? (
                            <div className="h-full flex items-center justify-center text-slate-400 font-bold animate-pulse">Synthesizing health data...</div>
                        ) : assessments.length < 2 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-6">
                                <div className="p-6 bg-slate-50 rounded-3xl opacity-50">
                                    <Activity size={48} className="text-slate-300" />
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-bold text-slate-500">Insufficient Data Points</p>
                                    <p className="text-sm">Complete 2 more assessments to unlock trend analytics.</p>
                                </div>
                                <Link to="/assessment" className="btn-premium py-3 px-6 text-sm">Start Assessment</Link>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#e2e8f0" />

                                    <ReferenceArea y1={0} y2={15} fill="#ecfdf5" fillOpacity={0.4} />
                                    <ReferenceArea y1={15} y2={30} fill="#fff7ed" fillOpacity={0.4} />
                                    <ReferenceArea y1={30} y2={100} fill="#fff1f2" fillOpacity={0.4} />

                                    <XAxis
                                        dataKey="id"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={({ x, y, payload, index }) => {
                                            const item = chartData[index];
                                            return (
                                                <g transform={`translate(${x},${y})`}>
                                                    <text x={0} y={0} dy={16} textAnchor="middle" fill={theme === 'dark' ? '#cbd5e1' : '#64748b'} style={{ fontSize: '10px', fontWeight: '500' }}>
                                                        {item?.displayDate}
                                                    </text>
                                                    <text x={0} y={0} dy={28} textAnchor="middle" fill={theme === 'dark' ? '#94a3b8' : '#94a3b8'} style={{ fontSize: '8px', fontWeight: '400' }}>
                                                        {item?.displayTime}
                                                    </text>
                                                </g>
                                            );
                                        }}
                                        height={50}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: theme === 'dark' ? '#94a3b8' : '#94a3b8', fontSize: 10, fontWeight: 500 }}
                                    />
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const score = payload[0].value;
                                                const status = score < 15 ? "Excellent" : score < 30 ? "Monitor" : "Warning";
                                                const color = score < 15 ? "text-emerald-500" : score < 30 ? "text-amber-500" : "text-rose-500";
                                                return (
                                                    <div className="glass-card p-5 rounded-[1.5rem] shadow-2xl border-white animate-slide-up">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{payload[0].payload?.displayDate || 'N/A'}</p>
                                                            <p className="text-[10px] font-bold text-primary-500">{payload[0].payload?.displayTime}</p>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className={`text-3xl font-black ${color}`}>{score}%</div>
                                                            <div className="h-10 w-[1px] bg-slate-100"></div>
                                                            <div>
                                                                <p className="text-[10px] font-black text-slate-400 uppercase">Risk Level</p>
                                                                <p className={`text-xs font-black ${color}`}>{status}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                        cursor={{ stroke: '#4f46e5', strokeWidth: 2, strokeDasharray: '6 6' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#4f46e5"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorScore)"
                                        dot={{ r: 6, fill: '#fff', stroke: '#4f46e5', strokeWidth: 3 }}
                                        activeDot={{ r: 8, fill: '#4f46e5', stroke: '#fff', strokeWidth: 4, shadow: '0 0 15px rgba(79, 70, 229, 0.4)' }}
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </motion.section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Recent Assessments */}
                        <section className="glass-card rounded-[2.5rem] shadow-premium overflow-hidden border border-cyan-100 dark:border-cyan-500/20 bg-cyan-50/40 dark:bg-cyan-900/5">
                            <div className="p-8 md:p-10 border-b border-cyan-100 dark:border-cyan-500/10 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Diagnostic Repository</h2>
                                    <p className="text-sm text-slate-400 font-normal mt-1">Authorized health record archive</p>
                                </div>
                                <button
                                    onClick={() => setShowAllReports(!showAllReports)}
                                    className="group flex items-center gap-2 text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-all uppercase tracking-widest"
                                >
                                    {showAllReports ? 'Show Less' : `View All (${assessments.length})`} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {loading ? (
                                    <div className="p-16 text-center text-slate-400 font-bold flex flex-col items-center gap-4">
                                        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                                        Synchronizing Diagnostic Database...
                                    </div>
                                ) : assessments.length === 0 ? (
                                    <div className="p-16 text-center text-slate-400">
                                        <p className="text-lg font-bold text-slate-500 mb-2">Null Repository</p>
                                        <p className="text-sm">No diagnostic records located in your clinical history.</p>
                                    </div>
                                ) : (
                                    assessments.slice(0, showAllReports ? assessments.length : 3).map((item) => (
                                        <Link
                                            key={item.id}
                                            to="/results"
                                            state={{ ...item }}
                                            className="p-6 md:p-8 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group border-b border-slate-50 dark:border-dark-border/10 last:border-0"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="bg-indigo-50 dark:bg-indigo-500/10 p-4 rounded-2xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-all shadow-sm group-hover:shadow-md">
                                                    <FileText className="text-indigo-500" size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white text-lg">Biometric Synthesis Report</p>
                                                    <p className="text-xs text-slate-400 dark:text-slate-300 font-medium uppercase tracking-widest mt-1">
                                                        {item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="text-right hidden sm:block">
                                                    <p className={`text-sm font-bold ${item.riskScore < 15 ? 'text-emerald-500' : item.riskScore < 30 ? 'text-amber-500' : 'text-rose-500'}`}>
                                                        {item.riskScore < 15 ? 'Optimal (Category I)' : item.riskScore < 30 ? 'Observation (Category II)' : 'Alert (Category III)'}
                                                    </p>
                                                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mt-1">Clinical Protocol Verified</p>
                                                </div>
                                                <div className="p-2 rounded-full border border-slate-100 dark:border-slate-800 group-hover:bg-primary-600 group-hover:text-white transition-all">
                                                    <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </section>

                        {/* Health Insight Card */}
                        <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/20 blur-[100px] rounded-full -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-700"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-health-cyber/10 blur-[60px] rounded-full -ml-20 -mb-20"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                <div className="md:w-3/5 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-health-cyber font-black text-[10px] uppercase tracking-widest mb-6">
                                        Clinical Insight
                                    </div>
                                    <h3 className="text-3xl font-black mb-4 tracking-tight italic">Optimizing for Longevity</h3>
                                    <p className="text-slate-400 mb-8 font-medium leading-relaxed">
                                        Data shows consistent cardiovascular monitoring can reduce long-term risks by up to 24%. Stay proactive.
                                    </p>
                                    <button className="btn-premium px-8 py-4 bg-white text-slate-900 hover:bg-slate-50 border-none shadow-white/5">
                                        Explore Methodology
                                    </button>
                                </div>
                                <div className="md:w-2/5 flex justify-center">
                                    <div className="h-40 w-40 bg-white/5 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-inner group-hover:rotate-12 transition-transform duration-500">
                                        <TrendingUp size={80} className="text-health-cyber opacity-40" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">


                        {/* System Lock */}
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 rounded-3xl p-6 flex items-center gap-4">
                            <div className="bg-white dark:bg-dark-card p-2 rounded-xl shadow-sm">
                                <Lock size={20} className="text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">Status</p>
                                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-500">Encrypted & Secure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DashboardPage;
