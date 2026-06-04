import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Phone, MapPin, Building, Users, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const UserRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        gender: '',
        address: '',
        state: '',
        pincode: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const { confirmPassword, ...registerData } = formData;
            await register(registerData);
            navigate('/');
        } catch (err) {
            setError(err);
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
                        <UserPlus className="h-8 w-8 text-[#00ff87]" />
                    </motion.div>
                    <h2 className="text-3xl font-black uppercase text-white tracking-tight">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Join PARIKH AGENCY for exclusive offers
                    </p>
                </div>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
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
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-1">
                                Full Name
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-500 group-focus-within:text-[#0066ff] transition-colors" />
                                </div>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full pl-10 px-3 py-2.5 border border-gray-800 focus:border-[#0066ff] rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0066ff] sm:text-sm transition-all bg-[#080710] text-white"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-[#0066ff] transition-colors" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 px-3 py-2.5 border border-gray-800 focus:border-[#0066ff] rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0066ff] sm:text-sm transition-all bg-[#080710] text-white"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-1">
                                Phone Number
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-500 group-focus-within:text-[#0066ff] transition-colors" />
                                </div>
                                <input
                                    name="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="block w-full pl-10 px-3 py-2.5 border border-gray-800 focus:border-[#0066ff] rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0066ff] sm:text-sm transition-all bg-[#080710] text-white"
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                        </div>

                        {/* City and Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-1">
                                    City
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Building className="h-5 w-5 text-gray-500 group-focus-within:text-[#0066ff] transition-colors" />
                                    </div>
                                    <input
                                        name="city"
                                        type="text"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="block w-full pl-10 px-3 py-2.5 border border-gray-800 focus:border-[#0066ff] rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0066ff] sm:text-sm transition-all bg-[#080710] text-white"
                                        placeholder="Mumbai"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-1">
                                    Gender
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Users className="h-5 w-5 text-gray-500 group-focus-within:text-[#0066ff] transition-colors" />
                                    </div>
                                    <select
                                        name="gender"
                                        required
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-800 focus:border-[#0066ff] rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0066ff] sm:text-sm transition-all bg-[#080710] text-white"
                                    >
                                        <option value="" disabled className="bg-[#131125]">Select Gender</option>
                                        <option value="Male" className="bg-[#131125]">Male</option>
                                        <option value="Female" className="bg-[#131125]">Female</option>
                                        <option value="Other" className="bg-[#131125]">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-1">
                                Delivery Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-500 group-focus-within:text-[#0066ff] transition-colors" />
                                </div>
                                <textarea
                                    name="address"
                                    required
                                    rows="2"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="block w-full pl-10 px-3 py-2.5 border border-gray-800 focus:border-[#0066ff] rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0066ff] sm:text-sm transition-all bg-[#080710] text-white"
                                    placeholder="123 Main St, City, Country"
                                />
                            </div>
                        </div>

                        {/* State and Pincode */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-1">
                                    State
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-500 group-focus-within:text-[#0066ff] transition-colors" />
                                    </div>
                                    <input
                                        name="state"
                                        type="text"
                                        required
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="block w-full pl-10 px-3 py-2.5 border border-gray-800 focus:border-[#0066ff] rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0066ff] sm:text-sm transition-all bg-[#080710] text-white"
                                        placeholder="Maharashtra"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-1">
                                    Pincode
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-500 group-focus-within:text-[#0066ff] transition-colors" />
                                    </div>
                                    <input
                                        name="pincode"
                                        type="text"
                                        required
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        className="block w-full pl-10 px-3 py-2.5 border border-gray-800 focus:border-[#0066ff] rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0066ff] sm:text-sm transition-all bg-[#080710] text-white"
                                        placeholder="400001"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[#0066ff] transition-colors" />
                                    </div>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-10 px-3 py-2.5 border border-gray-800 focus:border-[#0066ff] rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0066ff] sm:text-sm transition-all bg-[#080710] text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[#0066ff] transition-colors" />
                                    </div>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="block w-full pl-10 px-3 py-2.5 border border-gray-800 focus:border-[#0066ff] rounded-lg shadow-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0066ff] sm:text-sm transition-all bg-[#080710] text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 bg-gradient-to-r from-[#7c3aed] via-[#0066ff] to-[#00ff87] text-white rounded-xl font-black text-sm border-2 border-gray-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-[#00ff87] hover:text-[#00c49f] hover:underline transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default UserRegister;
