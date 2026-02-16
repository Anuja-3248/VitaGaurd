import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

// Pages (will create these next)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import ProfilePage from './pages/ProfilePage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

function AppContent() {
    const location = useLocation();
    const hideNavAndFooter = ['/login', '/signup'].includes(location.pathname);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
            {!hideNavAndFooter && <Navbar />}

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    {/* Protected Routes (mocked) */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/assessment" element={<AssessmentPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* Catch-all */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>

            {!hideNavAndFooter && <Footer />}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Toaster position="top-right" reverseOrder={false} />
                <Router>
                    <ScrollToTop />
                    <AppContent />
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
