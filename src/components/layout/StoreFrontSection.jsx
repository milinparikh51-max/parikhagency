import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, Sparkles, Pen, Book, Star } from 'lucide-react';
import shopFrontImg from '../../assets/shop_front.png';

const StoreFrontSection = () => {
    // Floating stationery items configuration
    const floatingElements = [
        { 
            icon: <Pen className="w-6 h-6 text-[#00ff87]" />, 
            x: "-10%", y: "15%", 
            duration: 6, delay: 0, 
            shadow: "shadow-[0_0_15px_rgba(0,255,135,0.4)]" 
        },
        { 
            icon: <Book className="w-7 h-7 text-[#7c3aed]" />, 
            x: "85%", y: "10%", 
            duration: 8, delay: 1, 
            shadow: "shadow-[0_0_15px_rgba(124,58,237,0.4)]" 
        },
        { 
            icon: <Sparkles className="w-5 h-5 text-[#0066ff]" />, 
            x: "75%", y: "80%", 
            duration: 5, delay: 0.5, 
            shadow: "shadow-[0_0_15px_rgba(0,102,255,0.4)]" 
        },
        { 
            icon: <span className="text-xl">✏️</span>, 
            x: "-5%", y: "70%", 
            duration: 7, delay: 1.5, 
            shadow: "shadow-none" 
        }
    ];

    return (
        <section className="relative py-24 bg-[#080710] overflow-hidden">
            {/* Glowing neon background highlights */}
            <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ff87]/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Left Column: Visual Shop Front Mockup with Floating Elements */}
                    <div className="lg:col-span-6 order-2 lg:order-1 relative">
                        
                        {/* Floating elements animation container */}
                        {floatingElements.map((elem, idx) => (
                            <motion.div
                                key={idx}
                                className={`absolute p-3.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl z-20 ${elem.shadow}`}
                                style={{ left: elem.x, top: elem.y }}
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 8, -8, 0],
                                }}
                                transition={{
                                    duration: elem.duration,
                                    repeat: Infinity,
                                    delay: elem.delay,
                                    ease: "easeInOut"
                                }}
                            >
                                {elem.icon}
                            </motion.div>
                        ))}

                        {/* Store front photo container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative group rounded-3xl p-3 bg-gradient-to-tr from-[#7c3aed]/20 via-[#0066ff]/20 to-[#00ff87]/20 border border-white/10 backdrop-blur-lg shadow-2xl overflow-hidden"
                        >
                            {/* Inner Glass Frame */}
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/5">
                                <img
                                    src={shopFrontImg}
                                    alt="Parikh Agency Store Front"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 select-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                
                                {/* Live Store Location Tag */}
                                <div className="absolute bottom-6 left-6 flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg text-white">
                                    <MapPin className="w-4 h-4 text-[#00ff87] animate-bounce" />
                                    <span className="text-xs font-black uppercase tracking-wider">Opp. Old Bata Shop, Near Dreamland Cinema, Porbandar</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Interactive floating rating tag */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="absolute -bottom-6 -right-4 md:right-4 bg-[#131125]/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl z-20 max-w-[180px] hidden sm:block"
                        >
                            <div className="flex items-center gap-1 mb-1 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                ))}
                            </div>
                            <p className="text-xs font-black text-white uppercase tracking-wider">Porbandar's Top Rated</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">Based on local customer reviews</p>
                        </motion.div>
                    </div>

                    {/* Right Column: Premium Text Section */}
                    <div className="lg:col-span-6 order-1 lg:order-2 text-left space-y-8">
                        <div className="space-y-4">
                            {/* Neon Highlighted Accent Pill */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 bg-[#7c3aed]/10 text-white font-black px-4 py-1.5 rounded-full text-xs border border-[#7c3aed]/30 uppercase tracking-widest"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-[#00ff87] animate-pulse" />
                                <span>Established 2000</span>
                            </motion.div>

                            {/* Bold Gen Z Heading with dual gradient shadows */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase text-white font-sans"
                            >
                                Porbandar's Favorite <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7c3aed] via-[#0066ff] to-[#00ff87] drop-shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                                    Stationery Hub 🚀
                                </span>
                            </motion.h2>

                            {/* High-vibe Gen Z Subtitle */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-base sm:text-lg text-gray-300 font-medium leading-relaxed max-w-xl"
                            >
                                Serving creators with trust and premium vibes since 2000. Whether you're upgrading your desk aesthetic, prepping for exams, or building custom team merchandise — we bring you the ultimate vibe check in stationery.
                            </motion.p>
                        </div>

                        {/* Interactive local stats list (Glassmorphism design) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-2 gap-4 pt-4"
                        >
                            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 hover:border-[#7c3aed]/30 transition-all duration-300">
                                <h4 className="text-3xl font-black text-[#00ff87] mb-1">25+ Yrs</h4>
                                <p className="text-xs font-black uppercase text-gray-400 tracking-wider">Local Presence</p>
                            </div>
                            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 hover:border-[#00ff87]/30 transition-all duration-300">
                                <h4 className="text-3xl font-black text-[#0066ff] mb-1">50k+</h4>
                                <p className="text-xs font-black uppercase text-gray-400 tracking-wider">Happy Creators</p>
                            </div>
                        </motion.div>

                        {/* Action buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 pt-2"
                        >
                            <a 
                                href="https://maps.app.goo.gl/tWp4GgL1CtfZ3Tf2A" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="px-8 py-4 bg-gradient-to-r from-[#7c3aed] to-[#0066ff] hover:brightness-110 text-white rounded-2xl font-black text-sm uppercase tracking-widest text-center shadow-lg shadow-blue-500/20 border border-white/10 transition-all cursor-pointer"
                            >
                                Get Directions 📍
                            </a>
                            <button 
                                onClick={() => {
                                    const element = document.getElementById('products-section') || document.querySelector('.space-y-24');
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-sm uppercase tracking-widest border border-white/10 text-center transition-all cursor-pointer"
                            >
                                Explore Products
                            </button>
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default StoreFrontSection;
