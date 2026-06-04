import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CinematicIntro = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Start exit animation after a delay
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000); // Hold for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.4 } }}
                >
                    {/* Top Top Curtain */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-[#0f172a] z-10"
                        initial={{ y: 0 }}
                        exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
                    />

                    {/* Bottom Curtain */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0f172a] z-10"
                        initial={{ y: 0 }}
                        exit={{ y: "100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
                    />

                    {/* Content (Logo) */}
                    <motion.div
                        className="relative z-20 flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)", transition: { duration: 0.5 } }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-8xl md:text-[10rem] font-black text-gradient-brand tracking-tighter leading-none">
                            PA<span className="text-accent">.</span>
                        </h1>
                        <motion.div
                            className="mt-6 h-1 w-24 bg-gradient-to-r from-[#7c3aed] via-[#0066ff] to-[#00ff87] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: 96 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                        <motion.p
                            className="mt-6 text-gray-200 text-lg md:text-xl tracking-[0.4em] uppercase font-bold"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            MILIN PARIKH
                        </motion.p>
                        <motion.p
                            className="mt-3 text-gray-400 text-xs md:text-sm tracking-[0.35em] uppercase font-medium"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1, duration: 0.5 }}
                        >
                            Premium Customisation
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CinematicIntro;
