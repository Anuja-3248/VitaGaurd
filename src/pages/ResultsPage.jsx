import { Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, ArrowLeft, Download, Info, Loader2, Sparkles, Cpu, Activity, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRef, useState, useEffect } from 'react';
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

    const [assessmentData, setAssessmentData] = useState(location.state?.aiAnalysis || location.state || null);
    const [loading, setLoading] = useState(!assessmentData && !!id);
    const reportRef = useRef(null);
    const pdfTemplateRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const fetchAssessment = async () => {
            if (!id || assessmentData) return;
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
                console.error("Error fetching report:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAssessment();
    }, [id, assessmentData]);

    const result = (() => {
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
    })();

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
    }, [result]);

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
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${result.source === 'gemini' ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 border-violet-100' : 'bg-slate-50 dark:bg-dark-card text-slate-500'}`}>
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
                                        <span className="text-4xl font-black text-slate-800 dark:text-white">{result.score}%</span>
                                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Severity</span>
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border mb-6 ${getRiskColor(result.riskLevel)}`}>
                                        <span className="font-black text-lg uppercase tracking-tight">{result.riskLevel} Risk</span>
                                    </div>
                                    <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">Medical Synthesis Complete</h1>
                                    <p className="text-slate-500 dark:text-slate-300 text-lg leading-relaxed">{result.summary}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 py-8 px-8 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {result.details.map((detail, idx) => (
                                <div key={idx} className="bg-white dark:bg-dark-card p-6 rounded-[2rem] border border-slate-100 dark:border-white/5">
                                    <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">{detail.category}</p>
                                    <div className="flex justify-between items-end">
                                        <span className="text-xl font-black text-slate-800 dark:text-white uppercase">{detail.risk}</span>
                                        <span className="text-slate-400 text-sm font-bold">{detail.score}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full mt-4 overflow-hidden">
                                        <motion.div className="h-full bg-primary-600" initial={{ width: 0 }} animate={{ width: `${detail.score}%` }} transition={{ duration: 1, delay: 0.5 + idx * 0.2 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-7 space-y-8">
                        <div className="bg-white dark:bg-dark-card rounded-[2.5rem] p-10 shadow-lg border border-slate-100 dark:border-white/5">
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-3">🛡️ Clinical Precautions</h3>
                            <ul className="space-y-6">
                                {result.recommendations.map((rec, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-1" />
                                        <p className="text-slate-600 dark:text-slate-300 font-bold leading-relaxed">{rec}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {result.dietOptions && result.dietOptions.length > 0 && (
                            <div className="bg-white dark:bg-dark-card rounded-[2.5rem] p-10 shadow-lg border-2 border-primary-50 dark:border-primary-900/10">
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-3">🥗 Nutritional Strategy</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {result.dietOptions.slice(0, 4).map((diet, idx) => (
                                        <div key={idx} className="bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-300 text-xs font-black uppercase">
                                            {diet}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-[50px] rounded-full"></div>
                            <h3 className="text-2xl font-black mb-4">Need expert care?</h3>
                            <p className="text-slate-400 mb-8 font-bold">This is an AI summary. For complex cases, consult specialists.</p>
                            <button className="w-full bg-primary-600 text-white font-black uppercase text-xs tracking-widest py-5 rounded-2xl shadow-glow">Find a Specialist</button>
                        </div>
                        {result.tips && result.tips.length > 0 && (
                            <div className="bg-white dark:bg-dark-card rounded-[2.5rem] p-10 border border-slate-100 dark:border-white/5 shadow-lg">
                                <h4 className="font-black text-slate-800 dark:text-white mb-6 uppercase tracking-widest text-xs">Bio-Optimizer Tips</h4>
                                <div className="space-y-4">
                                    {result.tips.map((tip, idx) => (
                                        <div key={idx} className="flex gap-4 group">
                                            <div className="w-8 h-8 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-black text-[10px] shrink-0">{idx + 1}</div>
                                            <p className="text-slate-500 text-xs font-bold leading-relaxed">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <HealthChatBot reportData={result} />
        </div>
    );
};

export default ResultsPage;
