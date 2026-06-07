import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { StoreProvider } from './context/StoreContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CustomisePage from './pages/CustomisePage';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import UserLogin from './pages/auth/UserLogin';
import UserRegister from './pages/auth/UserRegister';
import AdminLogin from './pages/auth/AdminLogin';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyOtp from './pages/auth/VerifyOtp';
import ResetPassword from './pages/auth/ResetPassword';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProductDetailsPage from './pages/ProductDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AboutPage from './pages/AboutPage';

import CinematicIntro from './components/layout/CinematicIntro';

function App() {
  const [showIntro, setShowIntro] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500); // Fail-safe timeout to ensure site is never stuck blank
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          {showIntro && (
            <CinematicIntro onComplete={() => setShowIntro(false)} />
          )}
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Main Store Routes - Public Browsing */}
            <Route
              path="/"
              element={<Layout />}
            >
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetailsPage />} />
              <Route path="customise" element={<CustomisePage />} />
              <Route 
                path="my-orders" 
                element={
                  <ProtectedRoute>
                    <MyOrdersPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="about" element={<AboutPage />} />
              <Route path="*" element={<div className="p-20 text-center">404 Not Found</div>} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
          </Routes>
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
