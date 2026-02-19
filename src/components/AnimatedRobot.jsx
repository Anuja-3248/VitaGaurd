import React from 'react';

const AnimatedRobot = () => {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center p-4 overflow-hidden select-none">
            {/* ── BALANCED HIGH-CLARITY IMAGE ── */}
            <div className="relative h-full max-w-4xl group">
                <img
                    src="/Anti.jpg"
                    alt="Clinical AI Analysis"
                    className="h-full w-auto object-contain rounded-3xl shadow-2xl border-2 border-white/20"
                />

                {/* Sharp Clinical Accents */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
        </div>
    );
};

export default AnimatedRobot;
