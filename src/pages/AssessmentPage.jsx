import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, ChevronRight, ChevronLeft, Activity, Info, Loader2, CheckCircle2, Scan, ShieldCheck } from 'lucide-react';

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

            if (currentUser) {
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
                navigate(`/results/${docRef.id}`);
            } else {
                localStorage.setItem('latestAssessment', JSON.stringify({
                    ...formData,
                    riskScore: finalScore,
                    ...analysisResult.data,
                    timestamp: new Date().toISOString()
                }));
                navigate('/results/local');
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Analysis failed. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { title: "Profile", icon: <Info size={18} /> },
        { title: "Symptoms", icon: <Activity size={18} /> },
        { title: "Lifestyle", icon: <HeartPulse size={18} /> }
    ];

    const renderStep2Header = () => (
        <div className="mb-10">
            <div className="flex justify-between items-start mb-3">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Health Profiling</h2>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-primary-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-glow hover:bg-primary-500 flex items-center gap-2"
                >
                    Analyze Now <ChevronRight size={14} />
                </button>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Choose how you'd like to report your symptoms.</p>
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => setSelectionMode('both')}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectionMode === 'both' ? 'bg-primary-600 border-primary-600 text-white shadow-lg' : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-400'}`}
                >
                    Show Both
                </button>
                <button
                    onClick={() => setSelectionMode('visual')}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectionMode === 'visual' ? 'bg-primary-600 border-primary-600 text-white shadow-lg' : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-400'}`}
                >
                    3D Body Map
                </button>
                <button
                    onClick={() => setSelectionMode('text')}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectionMode === 'text' ? 'bg-primary-600 border-primary-600 text-white shadow-lg' : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-400'}`}
                >
                    Symptom List
                </button>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="bg-slate-50 dark:bg-dark-bg min-h-screen flex flex-col items-center justify-center p-6">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-8 overflow-hidden rounded-full bg-primary-100 dark:bg-primary-900/30 p-6"
                >
                    <HeartPulse className="text-primary-600 h-16 w-16" />
                </motion.div>
                <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4 tracking-tight text-center">Analyzing Your Bio-Data...</h2>
                <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">Our AI systems are correlating your symptoms with clinical risk models.</p>
                <div className="mt-12 flex items-center gap-2 text-primary-600 font-black uppercase tracking-[0.2em] text-xs">
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 dark:bg-dark-bg min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Progress Stepper */}
                <div className="mb-12 flex justify-between relative px-4">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 dark:bg-white/5 -translate-y-1/2 z-0"></div>
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
                                className="space-y-12"
                            >
                                {renderStep2Header()}

                                {/* Visual Body Map Path */}
                                {(selectionMode === 'both' || selectionMode === 'visual') && (
                                    <div className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center">
                                                    <Scan className="text-primary-600" size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-slate-800 dark:text-white leading-none mb-1">Anatomical Mapping</h3>
                                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Identify regions of discomfort</p>
                                                </div>
                                            </div>
                                            {selectionMode === 'both' && (
                                                <button
                                                    onClick={() => setSelectionMode('text')}
                                                    className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-primary-500 tracking-widest transition-all flex items-center gap-2 border border-slate-100 dark:border-white/5"
                                                >
                                                    Skip mapping <ChevronRight size={14} />
                                                </button>
                                            )}
                                        </div>
                                        <BodyVisualizer
                                            selectedRegions={formData.bodyRegions}
                                            onToggleRegion={toggleRegion}
                                        />
                                    </div>
                                )}

                                {/* Global Symptom Path */}
                                {(selectionMode === 'both' || selectionMode === 'text') && (
                                    <div className="space-y-8 pt-8 relative border-t border-slate-100 dark:border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center">
                                                    <Activity className="text-amber-600" size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-slate-800 dark:text-white leading-none mb-1">Clinical Indicators</h3>
                                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Select observed symptoms</p>
                                                </div>
                                            </div>
                                            {selectionMode === 'both' && (
                                                <button
                                                    onClick={() => setSelectionMode('visual')}
                                                    className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-amber-500 tracking-widest transition-all flex items-center gap-2 border border-slate-100 dark:border-white/5"
                                                >
                                                    Skip selection <ChevronRight size={14} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                            {['Chest Pain', 'Shortness of Breath', 'Fatigue', 'Dizziness', 'Persistent Cough', 'Nausea', 'Frequent Urination', 'Headache'].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => toggleSymptom(s)}
                                                    type="button"
                                                    className={`p-5 rounded-2xl text-left border-2 transition-all ${formData.symptoms.includes(s) ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-300 shadow-xl' : 'border-slate-50 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:border-slate-200 dark:hover:border-white/10'}`}
                                                >
                                                    <div className="flex justify-between items-center gap-2">
                                                        <span className="font-black text-[10px] uppercase tracking-tighter">{s}</span>
                                                        {formData.symptoms.includes(s) && <ShieldCheck size={16} className="text-primary-600" />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-8 p-8 bg-slate-50 dark:bg-dark-bg/40 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-inner">
                                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-4">Patient Narrative (Optional)</label>
                                    <textarea
                                        className="w-full px-6 py-5 bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-[1.5rem] focus:ring-4 focus:ring-primary-500/10 outline-none resize-none text-slate-900 dark:text-white transition-all min-h-[140px]"
                                        placeholder="Describe your symptoms in more detail..."
                                        value={formData.otherSymptoms}
                                        onChange={(e) => setFormData({ ...formData, otherSymptoms: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="flex gap-4 pt-8">
                                    <button onClick={handleBack} className="flex-1 px-8 py-5 border border-slate-200 dark:border-white/10 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Back</button>
                                    <button
                                        onClick={handleNext}
                                        className="flex-[2] btn-primary py-5 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-glow"
                                    >
                                        Calibrate Lifestyle
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
                                className="space-y-8"
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Lifestyle Factors</h2>
                                        <button
                                            onClick={handleSubmit}
                                            className="px-4 py-2 bg-slate-900 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase text-primary-500 tracking-widest transition-all border border-primary-500/30 flex items-center gap-2 hover:bg-primary-500 hover:text-white"
                                        >
                                            Skip & Analyze Now <ChevronRight size={14} />
                                        </button>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400">Environmental factors help refine the accuracy of health outcomes.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Daily Sleep (Avg)</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['less_5', '5_7', '7_9', '9_plus'].map((val) => (
                                                    <button
                                                        key={val}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, sleep: val })}
                                                        className={`p-4 rounded-2xl border-2 text-xs font-bold transition-all ${formData.sleep === val ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-300' : 'border-slate-50 bg-slate-50 dark:bg-white/5 text-slate-500 hover:border-slate-200'}`}
                                                    >
                                                        {val.replace('_', '+').replace('less', '<').toUpperCase()} HR
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Physical Activity</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['never', 'sometimes', 'regular', 'daily'].map((val) => (
                                                    <button
                                                        key={val}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, exercise: val })}
                                                        className={`p-4 rounded-2xl border-2 text-xs font-bold transition-all ${formData.exercise === val ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-300' : 'border-slate-50 bg-slate-50 dark:bg-white/5 text-slate-500 hover:border-slate-200'}`}
                                                    >
                                                        {val.toUpperCase()}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Tobacco Exposure</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['non', 'former', 'occasional', 'regular'].map((val) => (
                                                    <button
                                                        key={val}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, smoking: val })}
                                                        className={`p-4 rounded-2xl border-2 text-xs font-bold transition-all ${formData.smoking === val ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-300' : 'border-slate-50 bg-slate-50 dark:bg-white/5 text-slate-500 hover:border-slate-200'}`}
                                                    >
                                                        {val.toUpperCase()}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Alcohol Intake</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['none', 'low', 'moderate', 'high'].map((val) => (
                                                    <button
                                                        key={val}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, alcohol: val })}
                                                        className={`p-4 rounded-2xl border-2 text-xs font-bold transition-all ${formData.alcohol === val ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-300' : 'border-slate-50 bg-slate-50 dark:bg-white/5 text-slate-500 hover:border-slate-200'}`}
                                                    >
                                                        {val.toUpperCase()}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-10">
                                        <button type="button" onClick={handleBack} className="flex-1 px-8 py-5 border border-slate-200 dark:border-white/10 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Back</button>
                                        <button
                                            type="submit"
                                            className="flex-[2] btn-primary py-5 text-[10px] font-black uppercase tracking-widest shadow-2xl transition-all active:scale-[0.98]"
                                        >
                                            {formData.sleep && formData.exercise && formData.smoking && formData.alcohol
                                                ? 'Finalize Analysis'
                                                : 'Analyze with Available Data'}
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
