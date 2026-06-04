import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { motion } from 'framer-motion';

const bgShapes = [
    { id: 1, type: 'cross', size: 16, top: '15%', left: '10%', delay: 0, duration: 25, color: '#0066ff' },
    { id: 2, type: 'circle', size: 24, top: '25%', left: '80%', delay: 2, duration: 30, color: '#00ff87' },
    { id: 3, type: 'plus', size: 20, top: '65%', left: '15%', delay: 1.5, duration: 28, color: '#7c3aed' },
    { id: 4, type: 'triangle', size: 18, top: '75%', left: '85%', delay: 3, duration: 32, color: '#0066ff' },
    { id: 5, type: 'cross', size: 14, top: '45%', left: '50%', delay: 1, duration: 27, color: '#00ff87' },
];

const Layout = () => {
    const [ripples, setRipples] = React.useState([]);

    React.useEffect(() => {
        const handleGlobalClick = (e) => {
            const id = Date.now() + Math.random();
            const color = Math.random() > 0.5 ? '#0066ff' : '#00ff87';
            const newRipple = { id, x: e.clientX, y: e.clientY, color };
            setRipples(prev => [...prev, newRipple]);
            setTimeout(() => {
                setRipples(prev => prev.filter(r => r.id !== id));
            }, 600);
        };
        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#080710] text-white relative overflow-hidden">
            
            {/* Click Ripple Effect */}
            <div className="fixed inset-0 pointer-events-none z-[99] overflow-hidden">
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        className="absolute rounded-full border-3"
                        style={{
                            left: ripple.x - 30,
                            top: ripple.y - 30,
                            width: 60,
                            height: 60,
                            borderColor: ripple.color,
                            boxShadow: `0 0 15px ${ripple.color}`
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                ))}
            </div>

            {/* Global Animated Background Blobs */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Neon Blue Blur */}
                <motion.div
                    className="absolute -top-40 -left-40 w-96 h-96 bg-[#0066ff]/10 rounded-full blur-[120px]"
                    animate={{
                        x: [0, 60, 0],
                        y: [0, 80, 0]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                {/* Neon Purple Blur */}
                <motion.div
                    className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#7c3aed]/5 rounded-full blur-[150px]"
                    animate={{
                        x: [0, -60, 0],
                        y: [0, 100, 0]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                {/* Neon Green Blur */}
                <motion.div
                    className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#00ff87]/8 rounded-full blur-[120px]"
                    animate={{
                        x: [0, -80, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Floating Wireframe Shapes */}
                {bgShapes.map(shape => (
                    <motion.div
                        key={shape.id}
                        className="absolute opacity-[0.12]"
                        style={{
                            top: shape.top,
                            left: shape.left,
                            width: shape.size,
                            height: shape.size,
                            color: shape.color
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 20, 0],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: shape.duration,
                            repeat: Infinity,
                            delay: shape.delay,
                            ease: "linear"
                        }}
                    >
                        {shape.type === 'cross' && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        )}
                        {shape.type === 'plus' && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        )}
                        {shape.type === 'circle' && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                        )}
                        {shape.type === 'triangle' && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                <polygon points="12,2 22,22 2,22"></polygon>
                            </svg>
                        )}
                    </motion.div>
                ))}
                
                {/* Cyber Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1d36_1px,transparent_1px),linear-gradient(to_bottom,#1f1d36_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.07] cyber-grid-animate" />
            </div>

            <Navbar />
            <CartDrawer />
            <main className="flex-grow pt-20 relative z-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
