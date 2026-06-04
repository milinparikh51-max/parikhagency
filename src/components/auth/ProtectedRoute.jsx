import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Or a nice spinner
    }

    if (!user) {
        // Redirect to appropriate login based on required role (if we can infer it)
        // or just default login.
        // For admin routes, redirect to admin login.
        if (requiredRole === 'admin') {
            return <Navigate to="/admin/login" state={{ from: location }} replace />;
        }
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // User logged in but wrong role
        if (requiredRole === 'admin') {
            // Don't let users know admin exists or just redirect home
            return <Navigate to="/" replace />;
        }
        // Admin trying to access user route? Allow or deny depending on logic.
        // Usually admins can see user stuff, but let's stick to strict separation if requested.
        // The user said "different user cant see admin login option" - implies separation.
    }

    return children;
};

export default ProtectedRoute;
