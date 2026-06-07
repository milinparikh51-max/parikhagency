import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PenTool, Coffee, Shirt, Sparkles, Star } from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();

    // Floating particles config for animated background nodes
    const floatingNodes = [
        { id: 1, x: "10%", y: "20%", delay: 0, color: "#0066ff" },
        { id: 2, x: "85%", y: "15%", delay: 1, color: "#00ff87" },
        { id: 3, x: "75%", y: "75%", delay: 2, color: "#7c3aed" },
        { id: 4, x: "15%", y: "80%", delay: 1.5, color: "#0066ff" },
        { id: 5, x: "50%", y: "85%", delay: 0.5, color: "#00ff87" },
        { id: 6, x: "90%", y: "50%", delay: 2.5, color: "#0066ff" }
    ];

    const cyberStreaks = [
        { id: 1, shape: 'line', width: '150px', height: '1.5px', top: '12%', leftFrom: '-20%', leftTo: '120%', delay: 0.2, duration: 5.5, color: '#0066ff', angle: -10 },
        { id: 2, shape: 'circle', width: '8px', height: '8px', top: '38%', leftFrom: '120%', leftTo: '-20%', delay: 0.5, duration: 7.2, color: '#00ff87', angle: 0 },
        { id: 3, shape: 'line', width: '200px', height: '1px', top: '68%', leftFrom: '-25%', leftTo: '115%', delay: 1.0, duration: 8.5, color: '#7c3aed', angle: -20 },
        { id: 4, shape: 'square', width: '6px', height: '6px', top: '22%', leftFrom: '-10%', leftTo: '110%', delay: 0.7, duration: 4.8, color: '#ffd700', angle: 45 },
        { id: 5, shape: 'line', width: '120px', height: '2px', top: '82%', leftFrom: '115%', leftTo: '-15%', delay: 1.2, duration: 6.0, color: '#0066ff', angle: 15 },
        { id: 6, shape: 'circle', width: '12px', height: '12px', top: '52%', leftFrom: '-15%', leftTo: '115%', delay: 0, duration: 9.0, color: '#00ff87', angle: 0 },
        { id: 7, shape: 'line', width: '180px', height: '1.5px', top: '28%', leftFrom: '120%', leftTo: '-20%', delay: 1.1, duration: 7.8, color: '#7c3aed', angle: -15 },
        { id: 8, shape: 'square', width: '8px', height: '8px', top: '72%', leftFrom: '-10%', leftTo: '110%', delay: 1.8, duration: 6.5, color: '#0066ff', angle: 30 },
        { id: 9, shape: 'circle', width: '6px', height: '6px', top: '88%', leftFrom: '-15%', leftTo: '115%', delay: 1.5, duration: 5.2, color: '#00ff87', angle: 0 },
        { id: 10, shape: 'line', width: '250px', height: '1.2px', top: '45%', leftFrom: '-30%', leftTo: '120%', delay: 0.4, duration: 7.5, color: '#ffd700', angle: -8 },
        { id: 11, shape: 'line', width: '160px', height: '1px', top: '8%', leftFrom: '115%', leftTo: '-20%', delay: 0.8, duration: 6.2, color: '#00ff87', angle: 12 },
        { id: 12, shape: 'circle', width: '10px', height: '10px', top: '45%', leftFrom: '-15%', leftTo: '115%', delay: 0.3, duration: 5.8, color: '#0066ff', angle: 0 },
        { id: 13, shape: 'square', width: '5px', height: '5px', top: '58%', leftFrom: '110%', leftTo: '-10%', delay: 1.4, duration: 6.8, color: '#7c3aed', angle: 60 },
        { id: 14, shape: 'line', width: '220px', height: '1.8px', top: '76%', leftFrom: '-25%', leftTo: '125%', delay: 0.6, duration: 7.0, color: '#ffd700', angle: -12 },
        { id: 15, shape: 'circle', width: '7px', height: '7px', top: '18%', leftFrom: '-15%', leftTo: '115%', delay: 1.7, duration: 4.5, color: '#00ff87', angle: 0 },
        { id: 16, shape: 'line', width: '130px', height: '1.4px', top: '33%', leftFrom: '120%', leftTo: '-20%', delay: 0.9, duration: 5.0, color: '#0066ff', angle: -5 },
        { id: 17, shape: 'square', width: '7px', height: '7px', top: '92%', leftFrom: '-10%', leftTo: '110%', delay: 2.0, duration: 8.0, color: '#ffd700', angle: 15 },
        { id: 18, shape: 'circle', width: '9px', height: '9px', top: '62%', leftFrom: '115%', leftTo: '-15%', delay: 1.3, duration: 5.6, color: '#7c3aed', angle: 0 }
    ];

    return (
        <div className="space-y-24 pb-24 bg-gradient-to-b from-[#080710] to-[#0f0e26] text-white min-h-screen overflow-hidden relative pt-12">
            
            {/* Cyber Light Streaks / Shooting Stars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {cyberStreaks.map(streak => (
                    <motion.div
                        key={streak.id}
                        className="absolute opacity-[0.25]"
                        style={{
                            top: streak.top,
                            width: streak.width,
                            height: streak.height,
                            backgroundColor: streak.shape !== 'line' ? streak.color : undefined,
                            background: streak.shape === 'line' 
                                ? `linear-gradient(to right, transparent, ${streak.color}, transparent)` 
                                : undefined,
                            boxShadow: `0 0 10px ${streak.color}`,
                            borderRadius: streak.shape === 'circle' ? '50%' : streak.shape === 'square' ? '2px' : undefined,
                            transform: `rotate(${streak.angle}deg)`
                        }}
                        animate={{ 
                            left: [streak.leftFrom, streak.leftTo],
                            rotate: streak.shape === 'square' ? [streak.angle, streak.angle + 360] : streak.angle
                        }}
                        transition={{
                            duration: streak.duration,
                            repeat: Infinity,
                            delay: streak.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
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
                        <span className="relative inline-block transform -rotate-[1.2deg] text-white hover:rotate-0 transition-all duration-250 cursor-default px-4">
                            {/* Half box of deep cherry red #7F1425 */}
                            <span className="absolute bottom-1.5 left-0 right-0 h-[45%] bg-[#7F1425] z-0 shadow-[0_0_15px_rgba(127,20,37,0.8)] rounded-xs"></span>
                            <span className="relative z-10">get noticed.</span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium pt-4 transform -rotate-[0.5deg]"
                    >
                        Providing premium stationery and printing services since <span className="font-extrabold text-white underline decoration-[#7c3aed] decoration-2">2014</span>. Today, we bring you our latest collection of custom-branded merchandise — including premium <span className="relative inline-block font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-250 to-[#00ff87]">t-shirts, caps, bottles, mugs, and pens<motion.span className="absolute bottom-0 left-0 h-[2px] bg-[#00ff87] rounded-full" initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }} /></span> — built for brands that actually want to grow.
                    </motion.p>

                    {/* Dual Neo-Brutalist Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6"
                    >
                        <button
                            onClick={() => navigate('/products')}
                            className="w-full sm:w-auto px-8 py-4 bg-[#7c3aed] text-white rounded-2xl font-black text-lg border-3 border-gray-950 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transform -rotate-[1.2deg] hover:rotate-0 hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            Explore Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/customise')}
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

                {/* Star Sticker in Bottom Left (Brutalist decorative node) */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-10 left-10 hidden lg:block"
                >
                    <Star className="w-16 h-16 text-[#0066ff] fill-current drop-shadow-[0_0_15px_#0066ff]" />
                </motion.div>


            </section>

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
