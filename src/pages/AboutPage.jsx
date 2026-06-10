import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Printer, Sparkles, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-24 pb-24 bg-gradient-to-b from-[#080710] to-[#0f0e26] text-white min-h-screen pt-12 relative overflow-hidden">
            {/* Ambient Background Blobs */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-40 left-10 w-72 h-72 bg-[#0066ff]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto px-4 relative z-10 space-y-20">
                {/* Hero / Header */}
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: -3 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="inline-block bg-[#00ff87] text-gray-950 font-black px-6 py-2 rounded-full text-xs uppercase border-2 border-gray-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-4"
                    >
                        Established 2014
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tight font-sans"
                    >
                        Our Legacy of <br/>
                        <span className="relative inline-block px-4 pt-2">
                            <span className="absolute bottom-1.5 left-0 right-0 h-[40%] bg-[#7c3aed] z-0 rounded-xs shadow-[0_0_15px_rgba(124,58,237,0.6)]"></span>
                            <span className="relative z-10 text-white">Crafting Identity</span>
                        </span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-xl mx-auto text-base md:text-lg font-medium"
                    >
                        From premium commercial printing in Porbandar to cutting-edge custom brand merchandise nationwide.
                    </motion.p>
                </div>

                {/* Legacy Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-black uppercase text-[#00ff87]">Our Heritage & Legacy</h2>
                        <p className="text-gray-300 font-medium leading-relaxed">
                            While our local shop presence in Porbandar has been trusted by generations since <span className="text-white font-extrabold underline decoration-[#7c3aed] decoration-2">1979</span>, the Parikh Agency firm was established in <span className="text-white font-extrabold underline decoration-[#7c3aed] decoration-2">2014</span>. For over a decade, the agency has been a cornerstone of commercial printing and stationery services, providing high-quality books, diaries, brochures, office supplies, and corporate paper goods to businesses that value precision.
                        </p>
                        <p className="text-gray-300 font-medium leading-relaxed">
                            Our heritage is built on trust, impeccable craftsmanship, and a relentless commitment to our clients' presentation and identity.
                        </p>
                    </motion.div>

                    {/* Interactive Legacy Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#131125] p-8 rounded-2xl border-3 border-gray-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                    >
                        <div className="flex gap-4 items-start mb-6">
                            <div className="w-12 h-12 bg-[#7c3aed]/15 rounded-xl border-2 border-[#7c3aed] flex items-center justify-center shrink-0">
                                <Printer className="w-6 h-6 text-[#7c3aed]" />
                            </div>
                            <div>
                                <h4 className="text-lg font-extrabold uppercase text-white">Commercial Printing & Stationery</h4>
                                <p className="text-xs text-gray-400 mt-1">Agency established in 2014 • Shop roots since 1979</p>
                            </div>
                        </div>
                        <ul className="space-y-3 text-sm text-gray-300 font-medium">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
                                Executive & Customized Diaries
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
                                Corporate Stationery & Letterheads
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
                                High-Precision Offset Printing
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* New Offerings Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-8">
                    {/* Interactive Modern Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-[#7c3aed] to-[#0066ff] text-white p-8 rounded-2xl border-3 border-gray-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] order-2 md:order-1"
                    >
                        <div className="flex gap-4 items-start mb-6">
                            <div className="w-12 h-12 bg-white rounded-xl border-2 border-gray-950 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <Sparkles className="w-6 h-6 text-[#7c3aed]" />
                            </div>
                            <div>
                                <h4 className="text-lg font-extrabold uppercase text-white">Modern Merchandise</h4>
                                <p className="text-xs text-blue-100 mt-1">Our latest customizable catalog</p>
                            </div>
                        </div>
                        <ul className="grid grid-cols-2 gap-3 text-sm font-extrabold uppercase text-blue-55 tracking-wider">
                            <li className="bg-gray-950/20 px-3 py-2 rounded-lg border border-white/10">👕 T-Shirts</li>
                            <li className="bg-gray-950/20 px-3 py-2 rounded-lg border border-white/10">🧢 Caps</li>
                            <li className="bg-gray-950/20 px-3 py-2 rounded-lg border border-white/10">🧴 Bottles</li>
                            <li className="bg-gray-950/20 px-3 py-2 rounded-lg border border-white/10">☕ Mugs</li>
                            <li className="bg-gray-950/20 px-3 py-2 rounded-lg border border-white/10">✒️ Pens</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 order-1 md:order-2"
                    >
                        <h2 className="text-3xl font-black uppercase text-[#0066ff]">The Next Chapter</h2>
                        <p className="text-gray-300 font-medium leading-relaxed">
                            To bring brands closer to their people in the digital age, we have expanded our legacy. We now offer premium custom-branded merchandise.
                        </p>
                        <p className="text-gray-300 font-medium leading-relaxed">
                            Whether you need custom t-shirts for your team, caps for events, engraved water bottles, photo-quality ceramic mugs, or executive writing pens, we provide high-grade digital prints and laser engravings that keep your identity sharp.
                        </p>
                    </motion.div>
                </div>

                {/* Core Pillars */}
                <div className="space-y-12 pt-8">
                    <h3 className="text-2xl font-black text-center uppercase tracking-wide">Why Choose Us</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#131125] p-6 rounded-xl border-2 border-gray-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center space-y-4">
                            <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-400">
                                <Award className="w-6 h-6" />
                            </div>
                            <h4 className="font-extrabold uppercase">Decades of Trust</h4>
                            <p className="text-xs text-gray-400">A local presence since 1979 combined with professional printing agency expertise established in 2014.</p>
                        </div>
                        <div className="bg-[#131125] p-6 rounded-xl border-2 border-gray-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center space-y-4">
                            <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                                <Heart className="w-6 h-6" />
                            </div>
                            <h4 className="font-extrabold uppercase">Bespoke Customization</h4>
                            <p className="text-xs text-gray-400">Tailored digital print designs, thread embroideries, and metallic engravings that match your brand guidelines.</p>
                        </div>
                        <div className="bg-[#131125] p-6 rounded-xl border-2 border-gray-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center space-y-4">
                            <div className="mx-auto w-12 h-12 bg-[#7c3aed]/10 rounded-full flex items-center justify-center text-[#7c3aed]">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h4 className="font-extrabold uppercase">End-to-End Quality</h4>
                            <p className="text-xs text-gray-400">Rigorous quality checkpoints on every item to ensure colors stay vibrant and engravings last forever.</p>
                        </div>
                    </div>
                </div>

                {/* Call to action */}
                <div className="bg-[#fffdf2] text-gray-950 p-8 md:p-12 rounded-2xl border-3 border-gray-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center space-y-6">
                    <h3 className="text-2xl md:text-3xl font-black uppercase">Ready to get noticed?</h3>
                    <p className="text-sm md:text-base text-gray-700 max-w-xl mx-auto font-medium">
                        Let us help you custom build your brand identity pack. Explore our collection of premium customizable items today.
                    </p>
                    <button
                        onClick={() => navigate('/products')}
                        className="px-8 py-3 bg-[#7c3aed] text-white rounded-xl font-black border-2 border-gray-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-2 cursor-pointer text-sm uppercase"
                    >
                        Explore Products <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
