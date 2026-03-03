import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, ChevronRight, Activity, Info, Loader2, Scan, ShieldCheck, Moon, Cigarette, GlassWater } from 'lucide-react';

import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { analyzeHealthWithGemini } from '../services/gemini';
import { useAuth } from '../context/AuthContext';
import BodyVisualizer from '../components/BodyVisualizer';

const AssessmentPage = () => {
    const { currentUser } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectionMode, setSelectionMode] = useState('both'); // 'both', 'visual', or 'text'
    const [formData, setFormData] = useState({
        name: currentUser?.displayName || '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        bodyRegions: [],
        symptoms: [],
        otherSymptoms: '',
        sleep: '',
        exercise: '',
        smoking: '',
        alcohol: ''
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!currentUser) return;
            try {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData(prev => ({
                        ...prev,
                        name: data.displayName || currentUser.displayName || prev.name,
                        age: data.age || prev.age,
                        gender: data.gender || prev.gender,
                        height: data.height || prev.height,
                        weight: data.weight || prev.weight
                    }));
                }
            } catch (error) {
                console.error("Error fetching profile for pre-fill:", error);
            }
        };

        fetchUserProfile();
    }, [currentUser]);

    const navigate = useNavigate();

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const toggleSymptom = (symptom) => {
        if (formData.symptoms.includes(symptom)) {
            setFormData({ ...formData, symptoms: formData.symptoms.filter(s => s !== symptom) });
        } else {
            setFormData({ ...formData, symptoms: [...formData.symptoms, symptom] });
        }
    };

    const toggleRegion = (regionId) => {
        setFormData(prev => ({
            ...prev,
            bodyRegions: prev.bodyRegions.includes(regionId)
                ? prev.bodyRegions.filter(r => r !== regionId)
                : [...prev.bodyRegions, regionId]
        }));
    };

    const handleSubmit = async (e) => {
        e?.preventDefault?.();
        setLoading(true);

        try {
            const analysisResult = await analyzeHealthWithGemini(formData);
            const finalScore = analysisResult.data.score;

            let savedId = null;
            if (currentUser) {
                try {
                    const docRef = await addDoc(collection(db, "assessments"), {
                        userId: currentUser.uid,
                        ...formData,
                        riskScore: finalScore,
                        summary: analysisResult.data.summary,
                        details: analysisResult.data.details,
                        recommendations: analysisResult.data.recommendations,
                        tips: analysisResult.data.tips,
                        dietOptions: analysisResult.data.dietOptions,
                        aiSource: analysisResult.source,
                        timestamp: serverTimestamp()
                    });
                    savedId = docRef.id;
                } catch (err) {
                    console.error("Cloud Save Failed:", err);
                }
            }

            setLoading(false);
            navigate('/results', {
                state: {
                    id: savedId,
                    score: finalScore,
                    name: formData.name,
                    formData: formData,
                    aiAnalysis: analysisResult
                }
            });
        } catch (error) {
            console.error("Submission error:", error);
            alert("Analysis failed. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { title: "Profile", icon: <Info size={18} /> },
        { title: "Mapping", icon: <Scan size={18} /> },
        { title: "Symptoms", icon: <Activity size={18} /> },
        { title: "Lifestyle", icon: <HeartPulse size={18} /> }
    ];

    const renderStepHeader = (title, subtitle) => (
        <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight mb-2">{title}</h2>
            <p className="text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
    );

    if (loading) {
        return (
            <div className="bg-slate-50 dark:bg-[#0a0010] min-h-screen flex flex-col items-center justify-center px-4 transition-colors duration-300">
                {/* Background Orbs */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="glow-orb top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 dark:bg-purple-600/20 animate-float" />
                    <div className="glow-orb bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/5 dark:bg-purple-500/10 animate-float" />
                </div>

                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 mb-8 overflow-hidden rounded-full bg-purple-100/80 dark:bg-purple-100/10 p-6 border border-purple-500/20"
                >
                    <HeartPulse className="text-purple-600 dark:text-purple-400 h-16 w-16" />
                </motion.div>
                <h2 className="relative z-10 text-3xl font-bold text-slate-900 dark:text-white mb-4">Analyzing Your Risks...</h2>
                <p className="relative z-10 text-slate-500 dark:text-slate-400 text-center max-w-md">Our AI system is processing your symptoms and lifestyle data to provide precise health insights.</p>
                <div className="relative z-10 mt-12 flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold">
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 dark:bg-[#0a0010] min-h-screen pt-36 pb-20 px-4 selection:bg-purple-500/30 selection:text-white transition-colors duration-300">
            {/* Background Orbs - visible mainly in dark mode */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="glow-orb top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 dark:bg-purple-600/20 animate-float" />
                <div className="glow-orb top-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-400/5 dark:bg-purple-600/10 animate-float" style={{ animationDelay: '-2s' }} />
                <div className="glow-orb bottom-[10%] left-[20%] w-[25%] h-[25%] bg-purple-600/5 dark:bg-purple-600/15 animate-float" style={{ animationDelay: '-4s' }} />
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Progress Stepper */}
                <div className="mb-12 flex justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
                    <div
                        className="absolute top-1/2 left-0 h-[2px] bg-primary-600 -translate-y-1/2 z-0 transition-all duration-700"
                        style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((s, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center">
                            <motion.div
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${step > idx + 1 ? 'bg-primary-600 text-white' :
                                    step === idx + 1 ? 'bg-white dark:bg-dark-card border-2 border-primary-600 text-primary-600 shadow-xl scale-110' :
                                        'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}
                            >
                                {idx + 1}
                            </motion.div>
                            <span className={`mt-3 text-[10px] font-black uppercase tracking-widest ${step === idx + 1 ? 'text-primary-700 dark:text-primary-400' : 'text-slate-400'}`}>{s.title}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-white dark:bg-dark-card rounded-[3rem] shadow-2xl border border-slate-100 dark:border-white/5 p-8 md:p-12 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">Demographic Profile</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Initialize your health data to ensure accurate AI calibraton.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Full Legal Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-5 py-4 bg-slate-50 dark:bg-dark-bg/60 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white transition-all"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Age</label>
                                        <input
                                            type="number"
                                            className="w-full px-5 py-4 bg-slate-50 dark:bg-dark-bg/60 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white transition-all"
                                            placeholder="e.g. 25"
                                            value={formData.age}
                                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Biological Gender</label>
                                        <select
                                            className="w-full px-5 py-4 bg-slate-50 dark:bg-dark-bg/60 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white transition-all"
                                            value={formData.gender}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Height (cm)</label>
                                        <input
                                            type="number"
                                            className="w-full px-5 py-4 bg-slate-50 dark:bg-dark-bg/60 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white transition-all"
                                            placeholder="175"
                                            value={formData.height}
                                            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Weight (kg)</label>
                                        <input
                                            type="number"
                                            className="w-full px-5 py-4 bg-slate-50 dark:bg-dark-bg/60 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white transition-all"
                                            placeholder="70"
                                            value={formData.weight}
                                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="pt-8">
                                    <button onClick={handleNext} disabled={!formData.name || !formData.age || !formData.gender} className="w-full btn-primary py-5 font-black uppercase tracking-[0.2em] text-xs disabled:opacity-50">
                                        Scan Symptoms
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                {renderStepHeader("Anatomical Mapping", "Select the regions where you are experiencing discomfort.")}

                                <div className="relative group p-4 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-slate-100 dark:border-white/5">
                                    <BodyVisualizer selectedRegions={formData.bodyRegions} onToggleRegion={toggleRegion} />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button onClick={handleBack} className="flex-1 px-8 py-5 border border-slate-200 dark:border-white/10 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all">Back</button>
                                    <button onClick={handleNext} className="flex-[2] btn-primary py-5 text-sm font-bold shadow-glow">
                                        Identify Symptoms
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                {renderStepHeader("Clinical Indicators", "Select the symptoms that best describe your current condition.")}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {['Chest Pain', 'Shortness of Breath', 'Fatigue', 'Dizziness', 'Persistent Cough', 'Nausea', 'Frequent Urination', 'Headache'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => toggleSymptom(s)}
                                            type="button"
                                            className={`group p-6 rounded-[2rem] text-left border-2 transition-all duration-300 relative overflow-hidden ${formData.symptoms.includes(s) ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 shadow-xl' : 'border-slate-50 bg-slate-50 dark:bg-white/5 hover:border-purple-200 dark:hover:border-purple-900/40 hover:bg-white dark:hover:bg-purple-900/10'}`}
                                        >
                                            <div className="flex justify-between items-center relative z-10">
                                                <span className={`font-bold transition-colors ${formData.symptoms.includes(s) ? 'text-purple-900 dark:text-purple-300' : 'text-slate-600 dark:text-slate-400'}`}>{s}</span>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.symptoms.includes(s) ? 'bg-purple-600 border-purple-600' : 'border-slate-200 dark:border-white/10'}`}>
                                                    {formData.symptoms.includes(s) && <ShieldCheck size={14} className="text-white" />}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-slate-100 dark:border-white/5">
                                    <label className="block text-sm font-bold text-slate-500 mb-4">Brief Patient Narrative (Optional)</label>
                                    <textarea
                                        className="w-full px-6 py-5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-purple-500/10 outline-none resize-none text-slate-900 dark:text-white transition-all min-h-[120px]"
                                        placeholder="Add any other details about your health..."
                                        value={formData.otherSymptoms}
                                        onChange={(e) => setFormData({ ...formData, otherSymptoms: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button onClick={handleBack} className="flex-1 px-8 py-5 border border-slate-200 dark:border-white/10 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all">Back</button>
                                    <button onClick={handleNext} className="flex-[2] btn-primary py-5 text-sm font-bold shadow-glow">
                                        Calibrate Lifestyle
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                {renderStepHeader("Lifestyle Factors", "Environmental factors help refine the accuracy of health outcomes.")}

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-12">
                                        {/* Sleep Section */}
                                        <div className="relative pl-8 border-l-2 border-slate-100 dark:border-white/5">
                                            <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-purple-500 z-10" />
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                                                    <Moon size={18} />
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-700 dark:text-white">Daily Sleep Duration</h3>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                {[
                                                    { id: 'less_5', label: '< 5 Hrs' },
                                                    { id: '5_7', label: '5 - 7 Hrs' },
                                                    { id: '7_9', label: '7 - 9 Hrs' },
                                                    { id: '9_plus', label: '9+ Hrs' }
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, sleep: opt.id })}
                                                        className={`py-4 px-2 rounded-xl border-2 transition-all duration-300 font-bold text-xs ${formData.sleep === opt.id ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-300 shadow-md' : 'border-slate-50 bg-slate-50 dark:bg-white/5 text-slate-500 hover:border-purple-200'}`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Activity Section */}
                                        <div className="relative pl-8 border-l-2 border-slate-100 dark:border-white/5">
                                            <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-500 z-10" />
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                                                    <Activity size={18} />
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-700 dark:text-white">Physical Activity Level</h3>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                {[
                                                    { id: 'never', label: 'Rarely' },
                                                    { id: 'sometimes', label: 'Weekly' },
                                                    { id: 'regular', label: 'Active' },
                                                    { id: 'daily', label: 'Daily' }
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, exercise: opt.id })}
                                                        className={`py-4 px-2 rounded-xl border-2 transition-all duration-300 font-bold text-xs ${formData.exercise === opt.id ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-300 shadow-md' : 'border-slate-50 bg-slate-50 dark:bg-white/5 text-slate-500 hover:border-purple-200'}`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tobacco Section */}
                                        <div className="relative pl-8 border-l-2 border-slate-100 dark:border-white/5">
                                            <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-orange-500 z-10" />
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600">
                                                    <Cigarette size={18} />
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-700 dark:text-white">Tobacco Usage</h3>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {[
                                                    { id: 'non', label: 'Never' },
                                                    { id: 'occasional', label: 'Occasional' },
                                                    { id: 'regular', label: 'Regular' }
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, smoking: opt.id })}
                                                        className={`py-4 px-2 rounded-xl border-2 transition-all duration-300 font-bold text-xs ${formData.smoking === opt.id ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-300 shadow-md' : 'border-slate-50 bg-slate-50 dark:bg-white/5 text-slate-500 hover:border-purple-200'}`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Alcohol Section */}
                                        <div className="relative pl-8 border-l-2 border-slate-100 dark:border-white/5">
                                            <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-amber-500 z-10" />
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
                                                    <GlassWater size={18} />
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-700 dark:text-white">Alcohol Consumption</h3>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                {[
                                                    { id: 'none', label: 'None' },
                                                    { id: 'low', label: 'Low' },
                                                    { id: 'moderate', label: 'Moderate' },
                                                    { id: 'high', label: 'High' }
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, alcohol: opt.id })}
                                                        className={`py-4 px-2 rounded-xl border-2 transition-all duration-300 font-bold text-xs ${formData.alcohol === opt.id ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-300 shadow-md' : 'border-slate-50 bg-slate-50 dark:bg-white/5 text-slate-500 hover:border-purple-200'}`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-10">
                                        <button type="button" onClick={handleBack} className="flex-1 px-8 py-5 border border-slate-200 dark:border-white/10 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Back</button>
                                        <button type="submit" className="flex-[2] btn-primary py-5 text-[10px] font-black uppercase tracking-widest shadow-2xl transition-all active:scale-[0.98]">
                                            {formData.sleep && formData.exercise && formData.smoking && formData.alcohol ? 'Finalize Analysis' : 'Analyze with Available Data'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AssessmentPage;
