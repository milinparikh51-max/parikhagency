import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password, 'user');
            navigate('/');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#080710] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white">
            {/* Background Decorations */}
            <motion.div
                className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-[100px]"
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#00ff87]/5 rounded-full blur-[100px]"
                animate={{ y: [0, -40, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-[#131125] p-8 rounded-2xl border-2 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative z-10"
            >
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-[#00ff87] transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
                </button>
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="mx-auto h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary/50"
                    >
                        <User className="h-8 w-8 text-[#00ff87]" />
                    </motion.div>
                    <h2 className="text-3xl font-black uppercase text-white tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Sign in to access your custom space
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-red-950/50 text-red-200 text-sm p-3 rounded-lg text-center border border-red-500/30"
                        >
                            {error}
                        </motion.div>
                    )}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-sm font-bold text-gray-300 mb-1">
                                Email address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-[#0066ff] transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 px-3 py-3 border border-gray-800 focus:border-[#0066ff] rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0066ff] text-base sm:text-sm transition-all bg-[#080710] text-white"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-sm font-bold text-gray-300 mb-1">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[#0066ff] transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 px-3 py-3 border border-gray-800 focus:border-[#0066ff] rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0066ff] text-base sm:text-sm transition-all bg-[#080710] text-white"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="flex justify-end mt-2">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 bg-gradient-to-r from-[#7c3aed] via-[#0066ff] to-[#00ff87] text-white rounded-xl font-black text-sm border-2 border-gray-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        >
                            Sign in
                        </button>
                    </motion.div>

                    <div className="text-center">
                        <p className="mt-4 text-sm text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-[#00ff87] hover:text-[#00c49f] hover:underline transition-colors">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default UserLogin;
