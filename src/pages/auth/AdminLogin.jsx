import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password, 'admin');
            navigate('/admin');
        } catch (err) {
            setError(err || 'Invalid admin credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-md w-full space-y-8 bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/50 relative z-10"
            >
                <div className="text-center">
                    <motion.div
                        initial={{ rotate: -180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="mx-auto h-20 w-20 bg-gradient-to-tr from-gray-700 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3"
                    >
                        <ShieldCheck className="h-10 w-10 text-white" />
                    </motion.div>
                    <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tight">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Secure Access Environment
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-red-900/30 text-red-200 text-sm p-3 rounded-lg text-center border border-red-500/30 backdrop-blur-sm"
                        >
                            {error}
                        </motion.div>
                    )}
                    <div className="rounded-lg shadow-sm -space-y-px">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="text"
                                required
                                className="appearance-none rounded-t-lg relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-900/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 text-base sm:text-sm transition-colors"
                                placeholder="Admin ID / Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-b-lg relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-900/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 text-base sm:text-sm transition-colors"
                                placeholder="Secure Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all backdrop-blur-sm border-white/10 hover:shadow-lg shadow-black/50"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <Lock className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                            </span>
                            Authenticate Access
                        </button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
