import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WordAnimation = ({ text, delay = 0, className = "" }) => {
    const words = text.split(" ");
    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: delay + (i * 0.1),
                        ease: [0.2, 0.65, 0.3, 0.9]
                    }}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

const CinematicIntro = ({ onComplete }) => {
    const [stage, setStage] = useState(1);

    useEffect(() => {
        // Stage 1 duration: Paced for natural reading
        const timer1 = setTimeout(() => {
            setStage(2);
        }, 3500);

        // Stage 2 duration: 
        const timer2 = setTimeout(() => {
            onComplete();
        }, 7500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[10000] bg-neutral-950 flex items-center justify-center p-8 overflow-hidden">
            <AnimatePresence mode="wait">
                {stage === 1 && (
                    <motion.div
                        key="line1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 1 } }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight max-w-5xl">
                            <WordAnimation text="Welcome to the Vitaguard clinical headquarters!" />
                        </h1>
                    </motion.div>
                )}

                {stage === 2 && (
                    <motion.div
                        key="line2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 1 } }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white/90 tracking-tight leading-tight max-w-6xl">
                            <WordAnimation text="Initializing the most advanced clinical intelligence ever built for the individual." delay={0.5} />
                        </h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subtle scanning line effect to match clinical theme */}
            <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[1px] bg-white/5 z-0"
            />
        </div>
    );
};

export default CinematicIntro;
