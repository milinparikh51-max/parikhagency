import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });
    const loading = false;
    const navigate = useNavigate();


    const login = async (email, password, type) => {
        // Mock Login Logic
        // In a real app, you'd hit an API endpoint.

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (type === 'admin') {
                    // Check credentials (case-insensitive for username/email)
                    const normalizedEmail = email.toLowerCase().trim();
                    const isValidAdmin = (normalizedEmail === 'milinparikh80@gmail.com' || normalizedEmail === 'admin') && password === 'admin12';

                    if (isValidAdmin) {
                        const adminUser = { id: 1, name: 'Milin Parikh', email: 'milinparikh80@gmail.com', role: 'admin' };
                        setUser(adminUser);
                        localStorage.setItem('user', JSON.stringify(adminUser));
                        resolve(adminUser);
                    } else {
                        reject('Invalid admin credentials. Try "admin" and "admin12"');
                    }
                } else {
                    // User login - check localStorage "users" database first
                    const storedUsers = JSON.parse(localStorage.getItem('parikhagency_users') || '[]');
                    const foundUser = storedUsers.find(u => u.email === email && u.password === password);

                    if (foundUser) {
                        const userObj = { ...foundUser, role: 'user' };
                        setUser(userObj);
                        localStorage.setItem('user', JSON.stringify(userObj));
                        resolve(userObj);
                    } else if (email === 'user@demo.com' && password === 'password') {
                        // Fallback demo user
                        const demoUser = { id: 2, name: 'Demo User', email, role: 'user' };
                        setUser(demoUser);
                        localStorage.setItem('user', JSON.stringify(demoUser));
                        resolve(demoUser);
                    } else {
                        // Check if email exists but wrong password (for better error msg)
                        const emailExists = storedUsers.some(u => u.email === email);
                        if (emailExists) {
                            reject('Incorrect password');
                        } else {
                            reject('User not found. Please register.');
                        }
                    }
                }
            }, 800);
        });
    };

    const register = async (userData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const storedUsers = JSON.parse(localStorage.getItem('parikhagency_users') || '[]');

                // Check if email already exists
                if (storedUsers.some(u => u.email === userData.email)) {
                    reject('Email already registered');
                    return;
                }

                // Add new user
                const newUser = { ...userData, id: Date.now() };
                const updatedUsers = [...storedUsers, newUser];
                localStorage.setItem('parikhagency_users', JSON.stringify(updatedUsers));

                // Auto login after register
                const userObj = { ...newUser, role: 'user' };
                setUser(userObj);
                localStorage.setItem('user', JSON.stringify(userObj));
                resolve(userObj);
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    // --- Password Reset Logic ---
    const initiatePasswordReset = async (email) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const storedUsers = JSON.parse(localStorage.getItem('parikhagency_users') || '[]');
                const userExists = storedUsers.find(u => u.email === email);

                if (!userExists && email !== "user@demo.com") {
                    reject("Email not found");
                    return;
                }

                // Generate OTP (Random 6 digits)
                const otp = Math.floor(100000 + Math.random() * 900000).toString();

                // Store OTP in localStorage with expiration (5 mins)
                const resetData = {
                    email,
                    otp,
                    expiresAt: Date.now() + 5 * 60 * 1000
                };
                localStorage.setItem('reset_otp', JSON.stringify(resetData));

                // SIMULATE EMAIL SENDING
                alert(`[DEMO MODE] Your OTP is: ${otp}`);
                console.log(`[DEMO MODE] OTP for ${email}: ${otp}`);

                resolve(true);
            }, 800);
        });
    };

    const verifyOtp = async (email, otp) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const storedResetData = localStorage.getItem('reset_otp');
                if (!storedResetData) {
                    reject("Session expired. Please request a new OTP.");
                    return;
                }

                const { email: storedEmail, otp: storedOtp, expiresAt } = JSON.parse(storedResetData);

                if (storedEmail !== email) {
                    reject("Invalid session.");
                    return;
                }

                if (Date.now() > expiresAt) {
                    localStorage.removeItem('reset_otp');
                    reject("OTP expired.");
                    return;
                }

                if (storedOtp !== otp) {
                    reject("Invalid OTP.");
                    return;
                }

                resolve(true);
            }, 800);
        });
    };

    const resetPassword = async (email, newPassword) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const storedUsers = JSON.parse(localStorage.getItem('parikhagency_users') || '[]');
                const userIndex = storedUsers.findIndex(u => u.email === email);

                if (userIndex === -1 && email !== "user@demo.com") {
                    reject("User not found.");
                    return;
                }

                if (email === "user@demo.com") {
                    // Cannot reset demo user
                    resolve(true); // Pretend it worked
                    return;
                }

                // Update password
                storedUsers[userIndex].password = newPassword;
                localStorage.setItem('parikhagency_users', JSON.stringify(storedUsers));

                // Clear OTP
                localStorage.removeItem('reset_otp');

                resolve(true);
            }, 800);
        });
    };

    const value = {
        user,
        login,
        register,
        logout,
        initiatePasswordReset,
        verifyOtp,
        resetPassword,
        isAuthenticated: !!user,
        role: user ? user.role : null,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
