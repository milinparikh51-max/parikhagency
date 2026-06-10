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
    const [showWelcome, setShowWelcome] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

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
        <div className="min-h-screen flex flex-col bg-[#080710] text-white relative overflow-x-clip">
            
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
                    className="absolute -top-40 -left-40 w-96 h-96"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, rgba(0, 102, 255, 0) 70%)',
                        willChange: 'transform'
                    }}
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
                    className="absolute top-1/2 left-1/4 w-[500px] h-[500px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, rgba(124, 58, 237, 0) 70%)',
                        willChange: 'transform'
                    }}
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
                    className="absolute -bottom-40 -right-40 w-96 h-96"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 255, 135, 0.12) 0%, rgba(0, 255, 135, 0) 70%)',
                        willChange: 'transform'
                    }}
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

            <Navbar showWelcome={showWelcome} />
            <CartDrawer />
            <main className={`flex-grow transition-all duration-500 relative z-10 ${showWelcome ? 'pt-[116px]' : 'pt-20'}`}>
                <Outlet />
            </main>
            <Footer />
            
            {/* Floating WhatsApp Button */}
            <motion.a
                href="https://wa.me/916357533557"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#25d366] to-[#128c7e] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.8)] border border-white/20 cursor-pointer group"
            >
                {/* Tooltip */}
                <span className="absolute right-16 bg-[#131125] text-white text-xs font-black uppercase tracking-wider py-2 px-3.5 rounded-xl border border-white/10 shadow-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    Chat on WhatsApp 💬
                </span>

                {/* WhatsApp SVG Icon */}
                <svg 
                    className="w-7 h-7 fill-current transform group-hover:rotate-[12deg] transition-transform duration-300" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.46 3.473 1.334 4.985l-1.422 5.196 5.316-1.395a9.923 9.923 0 0 0 4.76 1.213c.004 0 .008 0 .012 0 5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm6.012 14.195c-.247.697-1.422 1.282-1.956 1.341-.53.06-1.065.233-3.415-.694-2.825-1.116-4.607-3.992-4.748-4.18-.141-.188-1.144-1.522-1.144-2.906 0-1.385.706-2.066 1.024-2.408.318-.341.67-.428.894-.428.224 0 .447.001.64.008.204.007.478-.078.749.57.275.66.94 2.298 1.02 2.463.083.165.138.357.027.576-.11.22-.165.357-.33.549-.165.193-.346.43-.495.576-.165.163-.338.341-.146.67.193.33.856 1.408 1.833 2.28 1.261 1.127 2.32 1.474 2.65 1.639.33.165.523.138.72-.088.197-.227.856-1.001 1.084-1.348.228-.348.456-.29.77-.174.314.116 1.99.938 2.33 1.107.341.169.57.252.653.393.084.141.084.819-.163 1.516z"/>
                </svg>
            </motion.a>
        </div>
    );
};

export default Layout;
