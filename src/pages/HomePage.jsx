import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';
import { ArrowRight, PenTool, Coffee, Shirt, Sparkles } from 'lucide-react';
import StoreFrontSection from '../components/layout/StoreFrontSection';

const HomePage = () => {
    const navigate = useNavigate();
    const { trackClick } = useStore();

    React.useEffect(() => {
        trackClick('Main URL Visits (Homepage Loads)');
    }, []);

    // Floating particles config for animated background nodes
    const floatingNodes = [
        { id: 1, x: "10%", y: "20%", delay: 0, color: "#0066ff" },
        { id: 2, x: "85%", y: "15%", delay: 1, color: "#00ff87" },
        { id: 3, x: "75%", y: "75%", delay: 2, color: "#7c3aed" },
        { id: 4, x: "15%", y: "80%", delay: 1.5, color: "#0066ff" },
        { id: 5, x: "50%", y: "85%", delay: 0.5, color: "#00ff87" },
        { id: 6, x: "90%", y: "50%", delay: 2.5, color: "#0066ff" }
    ];

    const [cyberDust, setCyberDust] = React.useState([]);

    React.useEffect(() => {
        setCyberDust(
            Array.from({ length: 30 }).map((_, i) => ({
                id: i,
                size: Math.random() * 3 + 1,
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                delay: Math.random() * 5,
                duration: Math.random() * 8 + 8,
                color: ['#0066ff', '#00ff87', '#7c3aed', '#ffd700'][i % 4]
            }))
        );
    }, []);

    const orbitRings = React.useMemo(() => [
        { id: 1, size: '420px', duration: 25, clockwise: true, color: 'rgba(124, 58, 237, 0.25)' },
        { id: 2, size: '650px', duration: 35, clockwise: false, color: 'rgba(0, 102, 255, 0.20)' },
        { id: 3, size: '850px', duration: 45, clockwise: true, color: 'rgba(0, 255, 135, 0.15)' }
    ], []);

    return (
        <div className="space-y-24 pb-24 bg-gradient-to-b from-[#080710] to-[#0f0e26] text-white min-h-screen overflow-x-clip relative pt-12">
            
            {/* Cyber Dust Twinkling Particles */}
            <div className="absolute inset-0 overflow-x-clip pointer-events-none z-0">
                {cyberDust.map(particle => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full"
                        style={{
                            left: particle.x,
                            top: particle.y,
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.color,
                            boxShadow: `0 0 8px ${particle.color}`,
                            willChange: 'transform, opacity'
                        }}
                        animate={{
                            opacity: [0.1, 0.8, 0.1],
                            y: [0, -45, 0],
                            x: [0, Math.sin(particle.id) * 15, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Orbiting Neon Rings */}
            <div className="absolute inset-0 overflow-x-clip pointer-events-none z-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center">
                    {orbitRings.map(ring => (
                        <motion.div
                            key={ring.id}
                            className="absolute rounded-full border border-dashed"
                            style={{
                                width: ring.size,
                                height: ring.size,
                                borderColor: ring.color,
                                boxShadow: `0 0 20px ${ring.color}`,
                                willChange: 'transform'
                            }}
                            animate={{
                                rotate: ring.clockwise ? [0, 360] : [360, 0],
                                scale: [1, 1.12, 0.92, 1],
                                x: [0, 25, -25, 0],
                                y: [0, -30, 30, 0],
                            }}
                            transition={{
                                rotate: {
                                    duration: ring.duration,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                                scale: {
                                    duration: 10 + ring.id * 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                                x: {
                                    duration: 8 + ring.id * 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                                y: {
                                    duration: 11 + ring.id * 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
            
            {/* Neo-brutalist Interactive Floating Nodes (similar to reference web canvas but unique) */}
            <div className="absolute inset-0 pointer-events-none">
                {floatingNodes.map(node => (
                    <motion.div
                        key={node.id}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                            left: node.x,
                            top: node.y,
                            backgroundColor: node.color,
                            boxShadow: `0 0 20px ${node.color}`
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 4 + node.id,
                            repeat: Infinity,
                            delay: node.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-20 px-4">
                
                <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
                    
                    {/* Neo-Brutalist Heading with custom pink box shadow phrase */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] uppercase select-none font-sans flex flex-col items-center gap-4"
                    >
                        <span className="inline-block transform -rotate-[2.5deg] text-white hover:text-primary-light hover:rotate-0 transition-all duration-250 cursor-default">
                            get branded.
                        </span>
                        <span className="inline-block transform rotate-[1.8deg] text-white hover:text-[#00ff87] hover:rotate-0 transition-all duration-250 cursor-default">
                            get custom.
                        </span>
                        <span className="inline-block transform -rotate-[1.2deg] text-white hover:rotate-0 transition-all duration-250 cursor-default">
                            get noticed.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium pt-4 transform -rotate-[0.5deg]"
                    >
                        Serving Porbandar locally since <span className="font-extrabold text-white underline decoration-[#7c3aed] decoration-2">1979</span>, with Parikh Agency established in <span className="font-extrabold text-white underline decoration-[#7c3aed] decoration-2">2014</span>. Today, we bring you our latest collection of custom-branded merchandise — including premium <span className="relative inline-block font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-250 to-[#00ff87]">t-shirts, caps, bottles, mugs, and pens<motion.span className="absolute bottom-0 left-0 h-[2px] bg-[#00ff87] rounded-full" initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }} /></span> — built for brands that actually want to grow.
                    </motion.p>

                    {/* Dual Neo-Brutalist Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6"
                    >
                        <button
                            onClick={() => {
                                trackClick('Home: Explore Collection');
                                navigate('/products');
                            }}
                            className="w-full sm:w-auto px-8 py-4 bg-[#7c3aed] text-white rounded-2xl font-black text-lg border-3 border-gray-950 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transform -rotate-[1.2deg] hover:rotate-0 hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            Explore Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => {
                                trackClick('Home: Custom Design Studio');
                                navigate('/customise');
                            }}
                            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-950 rounded-2xl font-black text-lg border-3 border-gray-950 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transform rotate-[1.5deg] hover:rotate-0 hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            Custom Design Studio ➜
                        </button>
                    </motion.div>

                    {/* Slanted Accent Pill (Relocated below buttons) */}
                    <div className="flex justify-center pt-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: -3 }}
                            transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
                            onClick={() => navigate('/customise')}
                            className="cursor-pointer bg-[#00a896] text-white font-bold px-6 py-2 rounded-full text-sm flex items-center gap-2 border-2 border-gray-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        >
                            <Sparkles className="w-4 h-4 text-gray-950 animate-spin" />
                            <span>now offering express 24hr customisation ➜</span>
                        </motion.div>
                    </div>

                    {/* Three Collection Cards at bottom of Hero (replacing stats cards) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.7, type: "spring" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-16"
                    >
                        {/* Collection Card 1 - Custom Pens */}
                        <div 
                            onClick={() => navigate('/products', { state: { category: 'Pens' } })}
                            className="cursor-pointer bg-gradient-to-br from-[#7c3aed] to-[#0066ff] text-white p-6 rounded-2xl border-3 border-gray-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 text-left transform -rotate-[1.5deg] hover:rotate-0 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl border-2 border-gray-950 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <PenTool className="w-6 h-6 text-[#7c3aed]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black leading-none uppercase">Custom Pens</h3>
                                <p className="text-xs font-extrabold uppercase mt-1 tracking-wider text-blue-100">Elegant writing instruments</p>
                            </div>
                        </div>

                        {/* Collection Card 2 - Branded Mugs */}
                        <div 
                            onClick={() => navigate('/products', { state: { category: 'Mugs' } })}
                            className="cursor-pointer bg-gradient-to-br from-[#00a896] to-[#00ff87] text-white p-6 rounded-2xl border-3 border-gray-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 text-left transform rotate-[1.8deg] hover:rotate-0 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
                        >
                            <div className="w-12 h-12 bg-gray-950 rounded-xl border-2 border-white/20 flex items-center justify-center shrink-0">
                                <Coffee className="w-6 h-6 text-[#00ff87]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black leading-none uppercase">Branded Mugs</h3>
                                <p className="text-xs font-bold uppercase mt-1 tracking-wider text-green-100">Perfect for office & home</p>
                            </div>
                        </div>

                        {/* Collection Card 3 - Apparel */}
                        <div 
                            onClick={() => navigate('/products', { state: { category: 'Apparel' } })}
                            className="cursor-pointer bg-[#fffdf2] text-gray-950 p-6 rounded-2xl border-3 border-gray-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 text-left transform -rotate-[1.2deg] hover:rotate-0 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
                        >
                            <div className="w-12 h-12 bg-[#00ff87] rounded-xl border-2 border-gray-950 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <Shirt className="w-6 h-6 text-gray-950" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black leading-none uppercase">Apparel</h3>
                                <p className="text-xs font-extrabold uppercase mt-1 tracking-wider text-gray-800">T-shirts, caps & hoodies</p>
                            </div>
                        </div>
                    </motion.div>

                </div>




            </section>

            <StoreFrontSection />

            {/* The Next Chapter section (customizable catalog) */}
            <motion.section 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10"
            >
                {/* Left Column: Modern Merchandise Card (takes 5/12 cols on large screens) */}
                <div className="lg:col-span-6 xl:col-span-5 w-full">
                    <div className="bg-gradient-to-br from-[#7a3bed] via-[#5b36f7] to-[#0066ff] p-8 rounded-3xl border-3 border-gray-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white">
                        {/* Card Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-white rounded-2xl border-2 border-gray-950 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0">
                                <Sparkles className="w-6 h-6 text-[#7c3aed]" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase leading-none text-white">Modern Merchandise</h3>
                                <p className="text-xs md:text-sm font-semibold text-blue-100/90 mt-1.5">Our latest customizable catalog</p>
                            </div>
                        </div>

                        {/* Grid of Pills */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* T-SHIRTS */}
                            <button 
                                onClick={() => navigate('/products', { state: { category: 'Apparel' } })}
                                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border-2 border-gray-950/20 rounded-2xl px-5 py-3.5 font-bold transition-all hover:scale-[1.02] text-left cursor-pointer"
                            >
                                <span className="text-xl">👕</span>
                                <span className="font-black tracking-wide text-sm md:text-base">T-SHIRTS</span>
                            </button>

                            {/* CAPS */}
                            <button 
                                onClick={() => navigate('/products', { state: { category: 'Apparel' } })}
                                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border-2 border-gray-950/20 rounded-2xl px-5 py-3.5 font-bold transition-all hover:scale-[1.02] text-left cursor-pointer"
                            >
                                <span className="text-xl">🧢</span>
                                <span className="font-black tracking-wide text-sm md:text-base">CAPS</span>
                            </button>

                            {/* BOTTLES */}
                            <button 
                                onClick={() => navigate('/products', { state: { category: 'Accessories' } })}
                                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border-2 border-gray-950/20 rounded-2xl px-5 py-3.5 font-bold transition-all hover:scale-[1.02] text-left cursor-pointer"
                            >
                                <span className="text-xl">🧴</span>
                                <span className="font-black tracking-wide text-sm md:text-base">BOTTLES</span>
                            </button>

                            {/* MUGS */}
                            <button 
                                onClick={() => navigate('/products', { state: { category: 'Mugs' } })}
                                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border-2 border-gray-950/20 rounded-2xl px-5 py-3.5 font-bold transition-all hover:scale-[1.02] text-left cursor-pointer"
                            >
                                <span className="text-xl">☕</span>
                                <span className="font-black tracking-wide text-sm md:text-base">MUGS</span>
                            </button>

                            {/* PENS */}
                            <button 
                                onClick={() => navigate('/products', { state: { category: 'Pens' } })}
                                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border-2 border-gray-950/20 rounded-2xl px-5 py-3.5 font-bold transition-all hover:scale-[1.02] text-left cursor-pointer col-span-1"
                            >
                                <span className="text-xl">🖋️</span>
                                <span className="font-black tracking-wide text-sm md:text-base">PENS</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Narrative text (takes 7/12 cols on large screens) */}
                <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center text-left space-y-6 lg:pl-6">
                    <h2 className="text-3xl md:text-5xl font-black text-[#0066ff] uppercase tracking-tight leading-none">
                        The Next Chapter
                    </h2>
                    <div className="space-y-6 text-gray-300 font-medium text-base md:text-lg leading-relaxed">
                        <p>
                            To bring brands closer to their people in the digital age, we have expanded our legacy. We now offer premium custom-branded merchandise.
                        </p>
                        <p>
                            Whether you need custom t-shirts for your team, caps for events, engraved water bottles, photo-quality ceramic mugs, or executive writing pens, we provide high-grade digital prints and laser engravings that keep your identity sharp.
                        </p>
                    </div>
                </div>
            </motion.section>

        </div>
    );
};

export default HomePage;
