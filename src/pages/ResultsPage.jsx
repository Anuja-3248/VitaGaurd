import { Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, ArrowLeft, Download, Info, Loader2, Sparkles, Cpu, Activity, TrendingUp, Timer, Zap, MapPin, Heart, Wind, Droplets, Calendar, ChevronRight, CircleDashed, Flame, Moon, Cigarette, GlassWater } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRef, useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import MedicalReportTemplate from '../components/MedicalReportTemplate';
import HealthChatBot from '../components/HealthChatBot';
import GenZIcon from '../components/GenZIcon';
import confetti from 'canvas-confetti';

const ResultsPage = () => {
    const { currentUser } = useAuth();
    const { id } = useParams();
    const location = useLocation();

    const [assessmentData, setAssessmentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const reportRef = useRef(null);
    const pdfTemplateRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showHighRiskAlert, setShowHighRiskAlert] = useState(false);
    const [chatTrigger, setChatTrigger] = useState(null);

    // Synchronize data when location or ID changes
    useEffect(() => {
        const syncData = async () => {
            // Case 1: Active Navigation State (highest priority)
            if (location.state) {
                setAssessmentData(location.state.aiAnalysis || location.state);
                setLoading(false);
                return;
            }

            // Case 2: Direct URL access with ID
            if (id) {
                setLoading(true);
                try {
                    if (id === 'local') {
                        const localData = localStorage.getItem('latestAssessment');
                        if (localData) setAssessmentData(JSON.parse(localData));
                    } else {
                        const docRef = doc(db, "assessments", id);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) setAssessmentData(docSnap.data());
                    }
                } catch (error) {
                    console.error("Data Fetching Failed:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        syncData();
    }, [id, location.state, location.key]);

    const result = useMemo(() => {
        if (!assessmentData) return null;
        const data = assessmentData.data || assessmentData;
        const score = data.riskScore !== undefined ? data.riskScore : (data.score || 0);
        const riskLevel = score < 16 ? "Low" : score <= 35 ? "Moderate" : "High";

        return {
            ...data,
            score,
            riskLevel,
            userName: assessmentData.name || assessmentData.userName || currentUser?.displayName || "User",
            date: assessmentData.timestamp?.toDate ? assessmentData.timestamp.toDate().toLocaleDateString() : new Date().toLocaleDateString(),
            summary: data.summary || `Based on your diagnostic record, your biometric synthesis indicates a ${riskLevel} health risk level (${score}%).`,
            details: data.details || [
                { category: "Cardiovascular", risk: score > 30 ? "Monitor" : "Optimal", score: Math.max(5, Math.min(100, score - 5)) },
                { category: "Respiratory", risk: score > 40 ? "Monitor" : "Optimal", score: Math.max(5, Math.min(100, score - 10)) },
                { category: "Metabolic", risk: score > 20 ? "Monitor" : "Optimal", score: Math.max(5, Math.min(100, score + 5)) }
            ],
            recommendations: data.recommendations || ["Continue monitoring biometric trends regularly."],
            tips: data.tips || ["Stay hydrated", "Maintain regular sleep"],
            dietOptions: data.dietOptions || ["Increase intake of leafy greens."],
            source: assessmentData.source || data.aiSource || 'historical'
        };
    }, [assessmentData, currentUser]);

    useEffect(() => {
        if (result?.riskLevel === "Low") {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);
                confetti({ startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, particleCount: 50 * (timeLeft / duration), origin: { x: Math.random(), y: Math.random() - 0.2 } });
            }, 250);
            return () => clearInterval(interval);
        }

        // Show high risk alert for any score >= 36%
        if (result?.score >= 36) {
            // Check if this specific result ID has been acknowledged already
            const isAcknowledged = sessionStorage.getItem(`acknowledged_risk_${id}`);
            if (!isAcknowledged) {
                setShowHighRiskAlert(true);
            }
        }
    }, [result, id]);

    const handleDownloadPDF = async () => {
        if (!pdfTemplateRef.current) return;
        setIsGenerating(true);
        try {
            const canvas = await html2canvas(pdfTemplateRef.current, { scale: 2, useCORS: true, logging: false, backgroundColor: "#ffffff" });
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`VitaGuard_Report_${result.userName.replace(/\s+/g, '_')}.pdf`);
        } catch (error) {
            console.error("PDF Generation Error:", error);
            alert("Failed to generate report.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (loading) return (
        <div className="bg-slate-50 dark:bg-dark-bg min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="mb-6"><Loader2 className="text-primary-600 w-12 h-12" /></motion.div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Retrieving Analysis...</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Connecting to VitaGuard secure nodes.</p>
        </div>
    );

    if (!result) return (
        <div className="bg-slate-50 dark:bg-dark-bg min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-rose-100 dark:bg-rose-900/30 p-6 rounded-full mb-6"><ShieldAlert className="text-rose-600 w-12 h-12" /></div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">Analysis Not Found</h2>
            <Link to="/assessment" className="btn-primary px-8 py-4 rounded-2xl">Start New Assessment</Link>
        </div>
    );

    const ringColor = result.riskLevel === "Low" ? "stroke-emerald-500" : result.riskLevel === "Moderate" ? "stroke-amber-500" : "stroke-rose-500";
    const getRiskColor = (level) => {
        switch (level) {
            case "Low": return "text-emerald-500 bg-emerald-50 border-emerald-100";
            case "Moderate": return "text-amber-500 bg-amber-50 border-amber-100";
            case "High": return "text-rose-600 bg-rose-50 border-rose-100";
            default: return "text-slate-600 bg-slate-50";
        }
    };

    return (
        <div className="clinical-purple-theme min-h-screen pt-36 pb-20 px-4 selection:bg-purple-500/30 selection:text-white">
            {/* Background Orbs to match Home Page */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="glow-orb top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 animate-float" />
                <div className="glow-orb top-[20%] right-[-5%] w-[30%] h-[30%] bg-cyan-600/5 animate-float" style={{ animationDelay: '-2s' }} />
                <div className="glow-orb bottom-[10%] left-[20%] w-[25%] h-[25%] bg-purple-600/10 animate-float" style={{ animationDelay: '-4s' }} />
            </div>

            {/* Hidden Medical Template for PDF Generation */}
            <MedicalReportTemplate
                ref={pdfTemplateRef}
                result={result}
                formData={assessmentData.formData || {}}
            />

            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 font-medium transition-colors">
                        <ArrowLeft size={18} /> Back to Dashboard
                    </Link>
                    <div className="flex gap-4 items-center">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest border ${result.source === 'gemini' ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 border-violet-100' : 'bg-slate-50 dark:bg-dark-card text-slate-500'}`}>
                            {result.source === 'gemini' ? <Sparkles size={14} /> : <Cpu size={14} />}
                            {result.source === 'gemini' ? 'Gemini AI' : 'Local Engine'}
                        </div>
                        <button onClick={handleDownloadPDF} disabled={isGenerating} className="p-2 bg-white dark:bg-dark-card rounded-xl border border-slate-200 dark:border-white/5 text-slate-400 hover:text-primary-600 transition-colors disabled:opacity-50">
                            {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-12 bg-white dark:bg-dark-card rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-white/5 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <div className="flex flex-col md:flex-row items-center gap-12">
                                <div className="relative flex items-center justify-center">
                                    <svg className="w-48 h-48 -rotate-90">
                                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50 dark:text-white/5" />
                                        <motion.circle
                                            cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                                            strokeDasharray={553} initial={{ strokeDashoffset: 553 }}
                                            animate={{ strokeDashoffset: 553 - (553 * result.score) / 100 }} transition={{ duration: 1.5 }}
                                            className={ringColor}
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-4xl font-bold text-slate-800 dark:text-white">{result.score}%</span>
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Severity</span>
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border mb-6 ${getRiskColor(result.riskLevel)}`}>
                                        <span className="font-bold text-lg uppercase tracking-tight">{result.riskLevel} Risk</span>
                                    </div>
                                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4 tracking-tight">Your Health Report</h1>
                                    <p className="text-slate-500 dark:text-slate-300 text-lg leading-relaxed">{result.summary}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 py-8 px-8 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {result.details.map((detail, idx) => (
                                <div key={idx} className="bg-white dark:bg-dark-card p-6 rounded-[2rem] border border-slate-100 dark:border-white/5">
                                    <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">{detail.category}</p>
                                    <div className="flex justify-between items-end">
                                        <span className="text-xl font-bold text-slate-800 dark:text-white uppercase">{detail.risk}</span>
                                        <span className="text-slate-400 text-sm font-bold">{detail.score}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full mt-4 overflow-hidden">
                                        <motion.div className="h-full bg-primary-600" initial={{ width: 0 }} animate={{ width: `${detail.score}%` }} transition={{ duration: 1, delay: 0.5 + idx * 0.2 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* New Insight Section to explain the "Gap" */}
                        <div className="mt-8 px-12 pb-12">
                            <div className="p-6 bg-primary-50/50 dark:bg-primary-900/10 rounded-[2rem] border border-primary-100 dark:border-primary-900/20 flex flex-col md:flex-row items-center gap-6">
                                <div className="p-4 bg-white dark:bg-dark-card rounded-2xl shadow-sm text-primary-600">
                                    <Info size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">Risk Logic Insight</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                        {result.score > 35 && (result.details?.find(d => d.category === 'Lifestyle')?.score < 25)
                                            ? "Your high score is being driven primarily by reported clinical symptoms rather than lifestyle. Your healthy habits are currently providing a protective buffer."
                                            : "Your assessment shows that specific lifestyle calibrations combined with clinical indicators are contributing to your severity score."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-7 space-y-8">
                        {/* Clinical Precautions - THE USER WANTS THIS KEPT */}
                        <div className="bg-white dark:bg-dark-card rounded-[2.5rem] p-10 shadow-lg border border-slate-100 dark:border-white/5" id="precautions-section">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
                                🛡️ Clinical Precautions
                            </h3>
                            <ul className="space-y-6">
                                {result.recommendations.map((rec, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-1" />
                                        <p className="text-slate-600 dark:text-slate-300 font-bold leading-relaxed">{rec}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Lifestyle Impact - Simplified & Fixed */}
                        <div className="bg-white dark:bg-dark-card rounded-[2.5rem] p-10 shadow-xl border border-slate-100 dark:border-white/5 relative overflow-hidden">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3">
                                <Zap className="text-amber-500 fill-amber-500/20" size={24} /> Daily Lifestyle Check
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-10">How your daily habits are affecting your health score</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {(() => {
                                    // Robust data sourcing
                                    const source = location.state?.formData || assessmentData?.formData || (assessmentData?.sleep ? assessmentData : {}) || {};

                                    const getInsight = (field, val) => {
                                        const cleanVal = String(val || '').toLowerCase().trim();
                                        if (!cleanVal || cleanVal === 'undefined' || cleanVal === 'null') {
                                            return { label: 'Not Provided', score: 0, status: 'Unknown', color: 'slate' };
                                        }

                                        const mapping = {
                                            sleep: {
                                                less_5: { label: "< 5 Hrs", score: 30, status: 'Risk', color: 'rose' },
                                                '5_7': { label: "5 - 7 Hrs", score: 65, status: 'Unstable', color: 'amber' },
                                                '7_9': { label: "7 - 9 Hrs", score: 100, status: 'Healthy', color: 'emerald' },
                                                '9_plus': { label: "9+ Hrs", score: 90, status: 'Healthy', color: 'emerald' }
                                            },
                                            exercise: {
                                                never: { label: "Rarely", score: 35, status: 'Risk', color: 'rose' },
                                                rarely: { label: "Rarely", score: 35, status: 'Risk', color: 'rose' },
                                                sometimes: { label: "Weekly", score: 60, status: 'Unstable', color: 'amber' },
                                                regular: { label: "Active", score: 85, status: 'Healthy', color: 'emerald' },
                                                daily: { label: "Daily", score: 100, status: 'Healthy', color: 'emerald' }
                                            },
                                            smoking: {
                                                non: { label: "Never", score: 100, status: 'Healthy', color: 'emerald' },
                                                never: { label: "Never", score: 100, status: 'Healthy', color: 'emerald' },
                                                occasional: { label: "Occasional", score: 50, status: 'Unstable', color: 'amber' },
                                                regular: { label: "Regular", score: 20, status: 'Risk', color: 'rose' }
                                            },
                                            alcohol: {
                                                none: { label: "None", score: 100, status: 'Healthy', color: 'emerald' },
                                                never: { label: "None", score: 100, status: 'Healthy', color: 'emerald' },
                                                low: { label: "Low", score: 90, status: 'Healthy', color: 'emerald' },
                                                moderate: { label: "Moderate", score: 60, status: 'Unstable', color: 'amber' },
                                                high: { label: "High", score: 30, status: 'Risk', color: 'rose' }
                                            }
                                        };

                                        const res = mapping[field]?.[cleanVal];
                                        if (res) return res;

                                        // Fallback smart matching
                                        if (cleanVal.includes('less') || cleanVal.includes('poor') || cleanVal.includes('risk'))
                                            return { label: val, score: 30, status: 'Risk', color: 'rose' };
                                        if (cleanVal.includes('moderate') || cleanVal.includes('sometimes') || cleanVal.includes('fair'))
                                            return { label: val, score: 60, status: 'Unstable', color: 'amber' };
                                        if (cleanVal.includes('never') || cleanVal.includes('none') || cleanVal.includes('healthy'))
                                            return { label: val, score: 100, status: 'Healthy', color: 'emerald' };

                                        return { label: val, score: 50, status: 'Unstable', color: 'amber' };
                                    };

                                    const items = [
                                        { key: 'Sleep Quality', ...getInsight('sleep', source.sleep), icon: <Moon size={20} /> },
                                        { key: 'Workout Frequency', ...getInsight('exercise', source.exercise), icon: <Activity size={20} /> },
                                        { key: 'Tobacco Usage', ...getInsight('smoking', source.smoking), icon: <Cigarette size={20} /> },
                                        { key: 'Alcohol Intake', ...getInsight('alcohol', source.alcohol), icon: <GlassWater size={20} /> }
                                    ];

                                    if (items.length === 0) return <p className="text-slate-500 text-sm font-bold text-center w-full py-10">No lifestyle data available.</p>;

                                    const colorMap = {
                                        rose: { text: 'text-rose-500', bg: 'bg-rose-500/10', glow: 'bg-rose-500/5' },
                                        amber: { text: 'text-amber-500', bg: 'bg-amber-500/10', glow: 'bg-amber-500/5' },
                                        emerald: { text: 'text-emerald-500', bg: 'bg-emerald-500/10', glow: 'bg-emerald-500/5' },
                                        purple: { text: 'text-purple-500', bg: 'bg-purple-500/10', glow: 'bg-purple-500/5' },
                                        slate: { text: 'text-slate-500', bg: 'bg-slate-500/10', glow: 'bg-slate-500/5' }
                                    };

                                    return items.map((item, idx) => {
                                        const colors = colorMap[item.color] || colorMap.slate;
                                        return (
                                            <motion.div key={idx} whileHover={{ y: -5 }} className="relative p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 overflow-hidden group transition-all duration-300">
                                                <div className="flex flex-col items-center text-center relative z-10">
                                                    <div className="relative w-28 h-28 mb-4">
                                                        <svg className="w-full h-full transform -rotate-90">
                                                            <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-200 dark:text-white/10" />
                                                            <motion.circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="transparent"
                                                                strokeDasharray={301.6} initial={{ strokeDashoffset: 301.6 }}
                                                                animate={{ strokeDashoffset: 301.6 - (301.6 * item.score) / 100 }}
                                                                transition={{ duration: 1.5, delay: 0.5 + idx * 0.1 }}
                                                                className={colors.text}
                                                            />
                                                        </svg>
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                            <div className={`p-3 ${colors.bg} rounded-2xl mb-1 ${colors.text}`}>
                                                                {item.icon}
                                                            </div>
                                                            <span className="text-[12px] font-black text-slate-800 dark:text-white leading-none">{item.score}%</span>
                                                            <span className="text-[7px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter mt-0.5">Health</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{item.key}</span>
                                                    <h4 className="text-sm font-bold text-slate-800 dark:text-white capitalize mb-4 tracking-tight">{item.label}</h4>
                                                    <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${colors.bg} ${colors.text}`}>
                                                        {item.status}
                                                    </div>
                                                </div>
                                                <div className={`absolute -bottom-10 -right-10 w-24 h-24 ${colors.glow} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                            </motion.div>
                                        );
                                    });
                                })()}
                            </div>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/20 blur-[60px] rounded-full"></div>
                            <h3 className="text-2xl font-bold mb-4 relative z-10">Track Improvement</h3>
                            <p className="text-slate-400 mb-8 font-bold text-sm leading-relaxed relative z-10">
                                Most users see a <span className="text-emerald-400">12-15% reduction</span> in severity score after following the 7-day roadmap.
                            </p>
                            <Link to="/assessment" className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-5 px-8 rounded-2xl border border-white/10 transition-all group">
                                <span>Start Next Scan</span>
                                <CircleDashed className="group-hover:rotate-180 transition-transform duration-700" size={20} />
                            </Link>
                        </div>

                        <div className="bg-white dark:bg-dark-card rounded-[2.5rem] p-10 border border-slate-100 dark:border-white/5 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                    <Sparkles size={20} className="text-purple-600" />
                                </div>
                                <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-widest text-[10px]">Longevity Calibration</h4>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed mb-8">
                                Your data indicates that optimizing sleep by +1.5 hours would reduce cardiovascular load by ~8%.
                            </p>
                            <button className="w-full flex items-center justify-center gap-2 py-4 border-2 border-slate-50 dark:border-white/5 rounded-2xl text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:border-primary-500/30 hover:text-primary-500 transition-all">
                                View Deep Insights <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showHighRiskAlert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-white dark:bg-dark-card max-w-lg w-full rounded-[3rem] p-10 border border-rose-500/30 shadow-2xl text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-rose-500 animate-pulse" />
                            <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-rose-200">
                                <ShieldAlert size={40} className="text-rose-600 animate-bounce" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">High Risk Detected</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                                Our AI synthesis has identified indicators that require immediate clinical attention. Please consult a qualified healthcare professional.
                            </p>
                            <div className="space-y-4">
                                <button
                                    onClick={() => {
                                        sessionStorage.setItem(`acknowledged_risk_${id}`, 'true');
                                        setShowHighRiskAlert(false);
                                    }}
                                    className="w-full py-5 bg-rose-600 text-white rounded-2xl font-bold text-sm tracking-widest uppercase shadow-lg shadow-rose-600/20 active:scale-95 transition-all"
                                >
                                    I Understand
                                </button>
                                <button
                                    onClick={() => {
                                        sessionStorage.setItem(`acknowledged_risk_${id}`, 'true');
                                        setShowHighRiskAlert(false);
                                        setChatTrigger({
                                            id: Date.now(),
                                            query: "Analyze my high-risk clinical markers. What are the top 3 factors I should address first based on this report?"
                                        });
                                    }}
                                    className="w-full py-5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 hover:bg-white dark:hover:bg-white/10"
                                >
                                    <Sparkles size={16} className="text-primary-500" />
                                    Consult AI Assistant
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <HealthChatBot reportData={result} autoTrigger={chatTrigger} />
        </div>
    );
};

export default ResultsPage;
