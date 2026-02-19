import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, ShieldCheck, Activity, Brain, Cpu, Zap, Crosshair, Thermometer } from 'lucide-react';

const BodyVisualizer = ({ selectedRegions, onToggleRegion }) => {
    const [isFront, setIsFront] = useState(true);
    const [scannedLine, setScannedLine] = useState(0);
    const [hoveredRegion, setHoveredRegion] = useState(null);

    // Dynamic scanning line effect
    useEffect(() => {
        const interval = setInterval(() => {
            setScannedLine(prev => (prev + 1) % 100);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const regions = [
        // --- FRONT VIEW ---
        { id: 'head_cranium', name: 'Brain / Cranium', side: 'front', path: 'M 100,8 c -14,0 -22,10 -22,24 s 8,24 22,24 s 22,-10 22,-24 s -8,-24 -22,-24 z' },
        { id: 'face_eyes', name: 'Facial / Ocular', side: 'front', path: 'M 90,32 q 4,-4 8,0 q -4,4 -8,0 z M 102,32 q 4,-4 8,0 q -4,4 -8,0 z' },
        { id: 'throat_thyroid', name: 'Throat / Thyroid', side: 'front', path: 'M 88,60 q 12,3 24,0 l 2,12 q -14,5 -28,0 z' },
        { id: 'shoulder_l', name: 'L. Shoulder / Deltoid', side: 'front', path: 'M 62,68 q 8,-5 12,5 l -5,12 q -10,-8 -12,-12 z' },
        { id: 'shoulder_r', name: 'R. Shoulder / Deltoid', side: 'front', path: 'M 138,68 q -8,-5 -12,5 l 5,12 q 10,-8 12,-12 z' },
        { id: 'chest_upper', name: 'Upper Chest / Heart', side: 'front', path: 'M 75,72 q 25,-4 50,0 l -5,25 q -20,-4 -40,0 z' },
        { id: 'chest_lower', name: 'Lower Chest / Lungs', side: 'front', path: 'M 72,98 q 28,-3 56,0 l -6,22 q -22,-4 -44,0 z' },
        { id: 'abdomen_upper', name: 'Upper Abdomen', side: 'front', path: 'M 78,122 q 22,-2 44,0 l -4,25 q -18,3 -36,0 z' },
        { id: 'abdomen_lower', name: 'Lower Abdomen', side: 'front', path: 'M 82,148 q 18,2 36,0 l -3,25 q -15,4 -30,0 z' },
        { id: 'pelvis_groin', name: 'Pelvic / Groin Area', side: 'front', path: 'M 85,175 q 15,3 30,0 l -2,20 q -13,4 -26,0 z' },
        { id: 'bicep_l', name: 'L. Upper Arm', side: 'front', path: 'M 58,85 q -5,15 -8,35 l 10,2 q 2,-20 8,-35 z' },
        { id: 'bicep_r', name: 'R. Upper Arm', side: 'front', path: 'M 142,85 q 5,15 8,35 l -10,2 q -2,-20 -8,-35 z' },
        { id: 'forearm_l', name: 'L. Forearm', side: 'front', path: 'M 48,125 q -4,15 -6,30 l 12,2 q 2,-15 6,-30 z' },
        { id: 'forearm_r', name: 'R. Forearm', side: 'front', path: 'M 152,125 q 4,15 6,30 l -12,2 q -2,-15 -6,-30 z' },
        { id: 'hand_l', name: 'L. Hand / Wrist', side: 'front', path: 'M 35,160 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0' },
        { id: 'hand_r', name: 'R. Hand / Wrist', side: 'front', path: 'M 153,160 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0' },
        { id: 'thigh_l', name: 'L. Thigh', side: 'front', path: 'M 82,198 q -10,35 -14,70 l 18,0 q 3,-35 6,-70 z' },
        { id: 'thigh_r', name: 'R. Thigh', side: 'front', path: 'M 118,198 q 10,35 14,70 l -18,0 q -3,-35 -6,-70 z' },
        { id: 'knee_l', name: 'L. Knee Joint', side: 'front', path: 'M 65,272 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0' },
        { id: 'knee_r', name: 'R. Knee Joint', side: 'front', path: 'M 125,272 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0' },
        { id: 'shin_l', name: 'L. Lower Leg', side: 'front', path: 'M 68,285 q -5,25 -8,50 l 15,0 q 2,-25 3,-50 z' },
        { id: 'shin_r', name: 'R. Lower Leg', side: 'front', path: 'M 132,285 q 5,25 8,50 l -15,0 q -2,-25 -3,-50 z' },
        { id: 'foot_l', name: 'L. Foot', side: 'front', path: 'M 60,335 q 5,5 15,0 l 2,10 q -10,5 -20,0 z' },
        { id: 'foot_r', name: 'R. Foot', side: 'front', path: 'M 140,335 q -5,5 -15,0 l -2,10 q 10,5 20,0 z' },

        // --- BACK VIEW ---
        { id: 'head_back', name: 'Back of Head', side: 'back', path: 'M 100,8 c -14,0 -22,10 -22,24 s 8,24 22,24 s 22,-10 22,-24 s -8,-24 -22,-24 z' },
        { id: 'neck_back', name: 'Cervical Spine', side: 'back', path: 'M 90,60 q 10,3 20,0 l 2,12 q -12,5 -24,0 z' },
        { id: 'upper_back_traps', name: 'Upper back', side: 'back', path: 'M 72,72 q 28,-3 56,0 l -5,20 q -23,-3 -46,0 z' },
        { id: 'mid_back_spine', name: 'Mid Back Spine', side: 'back', path: 'M 75,95 q 25,-2 50,0 l -4,35 q -21,2 -42,0 z' },
        { id: 'lumbar_lower_back', name: 'Lower Back', side: 'back', path: 'M 78,135 q 22,-2 44,0 l -3,40 q -19,2 -38,0 z' },
        { id: 'renal_flank_l', name: 'L. Kidney', side: 'back', path: 'M 84,145 q -4,10 0,18' },
        { id: 'renal_flank_r', name: 'R. Kidney', side: 'back', path: 'M 116,145 q 4,10 0,18' },
        { id: 'glutes_pelvis', name: 'Gluteal area', side: 'back', path: 'M 82,185 q 18,6 36,0 l -2,30 q -16,4 -32,0 z' },
        { id: 'hamstring_l', name: 'L. Hamstring', side: 'back', path: 'M 82,218 q -10,32 -14,65 l 18,0 q 3,-32 6,-65 z' },
        { id: 'hamstring_r', name: 'R. Hamstring', side: 'back', path: 'M 118,218 q 10,32 14,65 l -18,0 q -3,-32 -6,-65 z' },
        { id: 'calf_l', name: 'L. Calf', side: 'back', path: 'M 68,285 q -5,25 -8,50 l 15,0 q 2,-25 3,-50 z' },
        { id: 'calf_r', name: 'R. Calf', side: 'back', path: 'M 132,285 q 5,25 8,50 l -15,0 q -2,-25 -3,-50 z' },
        { id: 'heel_l', name: 'L. Heel', side: 'back', path: 'M 60,335 h 15 v 8 h -15 z' },
        { id: 'heel_r', name: 'R. Heel', side: 'back', path: 'M 125,335 h 15 v 8 h -15 z' }
    ];

    const categories = [
        { name: 'Cranial & Vital', parts: ['head_cranium', 'face_eyes', 'head_back'], icon: <Brain size={12} /> },
        { name: 'Organs & Core', parts: ['throat_thyroid', 'chest_upper', 'chest_lower', 'abdomen_upper', 'abdomen_lower', 'renal_flank_l', 'renal_flank_r'], icon: <Activity size={12} /> },
        { name: 'Spinal / Posterior', parts: ['neck_back', 'upper_back_traps', 'mid_back_spine', 'lumbar_lower_back', 'glutes_pelvis'], icon: <Activity size={12} /> },
        { name: 'Upper Extremities', parts: ['shoulder_l', 'shoulder_r', 'bicep_l', 'bicep_r', 'forearm_l', 'forearm_r', 'hand_l', 'hand_r'], icon: <Zap size={12} /> },
        { name: 'Lower Extremities', parts: ['thigh_l', 'thigh_r', 'knee_l', 'knee_r', 'shin_l', 'shin_r', 'calf_l', 'calf_r', 'foot_l', 'foot_r', 'heel_l', 'heel_r'], icon: <Cpu size={12} /> }
    ];

    const handleCategoryAction = (regionId) => {
        const region = regions.find(r => r.id === regionId);
        if (region.side !== (isFront ? 'front' : 'back')) {
            setIsFront(region.side === 'front');
        }
        onToggleRegion(regionId);
    };

    return (
        <div className="flex flex-col xl:flex-row items-stretch gap-6 glass-card p-4 rounded-[2.5rem] bg-slate-950/90 shadow-2xl overflow-hidden min-h-[700px]">
            {/* Diagnostic Sidebar (The "Options" part) - MOVED TO LEFT AS REQUESTED */}
            <div className="flex-1 flex flex-col bg-slate-900/40 rounded-[2rem] p-6 relative">
                <div className="mb-6">
                    <h3 className="text-xl font-black text-white flex items-center gap-3">
                        <Crosshair className="text-cyan-400" size={20} />
                        DIAGNOSTIC_PICKER
                    </h3>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-6 max-h-[500px] custom-scrollbar">
                    {categories.map((cat, i) => (
                        <div key={i} className="space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase text-cyan-500/60 tracking-widest">{cat.name}</span>
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/10 to-transparent" />
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                {regions.filter(r => cat.parts.includes(r.id)).map((region) => (
                                    <button
                                        key={region.id}
                                        onMouseEnter={() => setHoveredRegion(region.id)}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                        onClick={() => handleCategoryAction(region.id)}
                                        className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${selectedRegions.includes(region.id)
                                            ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-[1.02]'
                                            : hoveredRegion === region.id
                                                ? 'bg-slate-800 text-white'
                                                : 'bg-slate-950/20 text-slate-400 hover:text-slate-200'
                                            }`}
                                    >
                                        <span className="font-bold text-xs truncate">{region.name}</span>
                                        {selectedRegions.includes(region.id) && <ShieldCheck size={14} className="text-white" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Diagnostic Footer */}
                <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center bg-slate-950/80 p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                            <Thermometer size={16} className="text-cyan-400" />
                            <div>
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Logged</span>
                                <span className="text-lg font-black text-white">{selectedRegions.length} Regions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualizer Column - MOVED TO RIGHT */}
            <div className="flex-[1.2] flex flex-col items-center justify-between p-4 md:p-6 bg-slate-900/40 rounded-[2rem] relative min-h-[600px]">
                {/* HUD Header */}
                <div className="w-full flex justify-between items-center z-20 px-2">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black tracking-[0.4em] text-cyan-400 opacity-70">NEURAL_SCAN_V4</span>
                        <h2 className="text-2xl font-black text-white tracking-tighter">AI-Biometric</h2>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/80 rounded-xl border border-cyan-500/30">
                        <div className={`w-2 h-2 rounded-full ${isFront ? 'bg-emerald-500' : 'bg-cyan-500'} animate-pulse`} />
                        <span className="text-[10px] font-black text-white">{isFront ? 'ANTERIOR' : 'POSTERIOR'}</span>
                    </div>
                </div>

                {/* 3D Model Area - NO REDUNDANT OUTLINES */}
                <div className="relative w-full max-w-[320px] h-[550px] perspective-2000 my-2 flex items-center justify-center">
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-10">
                        <div className="w-full h-[1px] bg-cyan-400 shadow-[0_0_20px_#22d3ee]" style={{ top: `${scannedLine}%`, position: 'absolute' }}></div>
                    </div>

                    <motion.div
                        animate={{ rotateY: isFront ? 0 : 180 }}
                        transition={{ type: 'spring', stiffness: 45, damping: 15, mass: 1.1 }}
                        style={{ transformStyle: 'preserve-3d' }}
                        className="relative w-full h-full drop-shadow-[0_0_40px_rgba(34,211,238,0.1)]"
                    >
                        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                            <defs>
                                <filter id="bioglow">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>
                        </svg>

                        {/* ANTERIOR VIEW */}
                        <motion.div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                            <svg viewBox="0 0 200 350" className="w-full h-full">
                                {regions.filter(r => r.side === 'front').map((region) => (
                                    <motion.path
                                        key={region.id}
                                        d={region.path}
                                        whileHover={{ scale: 1.05, strokeWidth: 1.5 }}
                                        onClick={() => onToggleRegion(region.id)}
                                        onMouseEnter={() => setHoveredRegion(region.id)}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                        className={`cursor-pointer transition-all duration-300 ${selectedRegions.includes(region.id) || hoveredRegion === region.id
                                            ? 'fill-cyan-500 stroke-white drop-shadow-[0_0_15px_#22d3ee]'
                                            : 'fill-cyan-400/10 stroke-cyan-400/20 hover:fill-cyan-400/40'
                                            }`}
                                        filter={selectedRegions.includes(region.id) || hoveredRegion === region.id ? 'url(#bioglow)' : ''}
                                    />
                                ))}
                            </svg>
                        </motion.div>

                        {/* POSTERIOR VIEW */}
                        <motion.div
                            className="absolute inset-0 backface-hidden"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                            <svg viewBox="0 0 200 350" className="w-full h-full">
                                {regions.filter(r => r.side === 'back').map((region) => (
                                    <motion.path
                                        key={region.id}
                                        d={region.path}
                                        whileHover={{ scale: 1.05, strokeWidth: 1.5 }}
                                        onClick={() => onToggleRegion(region.id)}
                                        onMouseEnter={() => setHoveredRegion(region.id)}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                        className={`cursor-pointer transition-all duration-300 ${selectedRegions.includes(region.id) || hoveredRegion === region.id
                                            ? 'fill-cyan-500 stroke-white drop-shadow-[0_0_15px_#22d3ee]'
                                            : 'fill-cyan-400/10 stroke-cyan-400/20 hover:fill-cyan-400/40'
                                            }`}
                                    />
                                ))}
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Perspective Toggle */}
                <button
                    onClick={() => setIsFront(!isFront)}
                    className="z-20 flex items-center gap-3 px-10 py-4 bg-slate-900 border border-cyan-500/40 text-white rounded-2xl font-black text-sm tracking-widest hover:bg-cyan-900/20 transition-all shadow-glow"
                >
                    <RotateCw size={18} className={`text-cyan-400 ${!isFront ? 'rotate-180' : ''} transition-transform duration-700`} />
                    FLIP_PERSPECTIVE
                </button>
            </div>

            {/* Custom Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .perspective-2000 { perspective: 2000px; }
                .backface-hidden { backface-visibility: hidden; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.2); border-radius: 10px; }
                .shadow-glow { box-shadow: 0 0 20px rgba(34, 211, 238, 0.15); }
            `}} />
        </div>
    );
};

export default BodyVisualizer;
