import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Loader2, HeartPulse as HeartIcon } from 'lucide-react';

// Pages (will create these next)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import ProfilePage from './pages/ProfilePage';
import RemindersPage from './pages/RemindersPage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import OnboardingFlow from './components/OnboardingFlow';
import OnboardingModal from './components/OnboardingModal';
import CinematicIntro from './components/CinematicIntro';
import { motion, AnimatePresence } from 'framer-motion';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    if (loading) return <LoadingScreen />;
    return currentUser ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    if (loading) return <LoadingScreen />;
    return currentUser ? <Navigate to="/" /> : children;
};

const LoadingScreen = () => (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-100/40 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-100/40 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative mb-8 z-10 transition-all">
            <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-primary-400 blur-3xl opacity-20 rounded-full"
            />
            <div className="relative bg-white p-8 rounded-[2.5rem] border border-white shadow-[0_25px_60px_rgba(0,0,0,0.04)]">
                <HeartIcon className="text-primary-600 h-14 w-14 animate-pulse" />
            </div>
        </div>
        <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="flex items-center gap-3">
                <Loader2 className="animate-spin text-primary-600" size={18} />
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.5em] ml-1">Synchronizing Neural Data</span>
            </div>
            <div className="w-48 h-[2px] bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-full w-24 bg-primary-500"
                />
            </div>
        </div>
    </div>
);

function AppContent() {
    const { currentUser, loading } = useAuth();
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showIntro, setShowIntro] = useState(false);
    const [showSplash, setShowSplash] = useState(() => {
        return !sessionStorage.getItem('vitaGuard_startup_passed');
    });
    const location = useLocation();
    const navigate = useNavigate();
    const hideNavAndFooter = ['/login', '/signup'].includes(location.pathname);



    // Enhanced logic for onboarding and splash persistence
    useEffect(() => {
        if (!loading) {
            if (currentUser) {
                // If logged in, skip splash
                setShowSplash(false);

                // Check if this is a fresh login/signup redirect
                const justLoggedIn = sessionStorage.getItem('vita_gateway_passed') || sessionStorage.getItem('vitaGuard_just_logged_in');
                const hasSeenOnboarding = sessionStorage.getItem(`vitaGuard_onboarding_active_${currentUser.uid}`);
                const hasSeenIntro = sessionStorage.getItem(`vitaGuard_intro_active_${currentUser.uid}`);

                if (justLoggedIn && !hasSeenOnboarding) {
                    // We stay on the landing page (root) to show the sequences
                    if (!hasSeenIntro) {
                        setShowIntro(true);
                        setShowOnboarding(false);
                    } else {
                        setShowIntro(false);
                        setShowOnboarding(true);
                    }
                }
            }
        }
    }, [currentUser, loading, location.pathname, navigate]);

    const handleIntroComplete = () => {
        if (currentUser) {
            sessionStorage.setItem(`vitaGuard_intro_active_${currentUser.uid}`, 'true');
        }
        setShowIntro(false);
        // Explicitly trigger the next step
        setShowOnboarding(true);
    };

    const handleOnboardingComplete = () => {
        if (currentUser) {
            sessionStorage.removeItem('vitaGuard_just_logged_in');
            sessionStorage.removeItem('vita_gateway_passed');
            sessionStorage.setItem(`vitaGuard_onboarding_active_${currentUser.uid}`, 'true');
            // We stay on the Home Page now as requested, instead of navigating to dashboard
        }
        setShowOnboarding(false);
    };

    const handleSplashComplete = () => {
        sessionStorage.setItem('vitaGuard_startup_passed', 'true');
        setShowSplash(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
            <AnimatePresence mode="wait">
                {showSplash && !currentUser ? (
                    <OnboardingModal
                        key="startup-splash"
                        onComplete={handleSplashComplete}
                    />
                ) : (
                    <div key="site-content" className="flex flex-col min-h-screen">
                        {/* Render Intro/Onboarding chain */}
                        <AnimatePresence mode="wait">
                            {showIntro && <CinematicIntro key="cinematic-intro" onComplete={handleIntroComplete} />}
                            {showOnboarding && <OnboardingFlow key="onboarding-flow" onComplete={handleOnboardingComplete} />}
                        </AnimatePresence>

                        {/* 
                          Gate the main content: 
                          - Hide it if we are in the intro phase (showIntro is true or it's the flicker moment after login)
                          - Show it if we are in the onboarding phase (showOnboarding is true) so it can be blurred
                          - Show it normally if everything is complete
                        */}
                        {((!showIntro && !sessionStorage.getItem('vitaGuard_just_logged_in') && !sessionStorage.getItem('vita_gateway_passed')) || showOnboarding) && (
                            <div className={showOnboarding ? 'blur-md pointer-events-none' : ''}>
                                {!hideNavAndFooter && <Navbar />}

                                <main className="flex-grow">
                                    <Routes>
                                        <Route path="/" element={<LandingPage />} />
                                        <Route
                                            path="/login"
                                            element={
                                                <PublicRoute>
                                                    <LoginPage />
                                                </PublicRoute>
                                            }
                                        />
                                        <Route
                                            path="/signup"
                                            element={
                                                <PublicRoute>
                                                    <SignupPage />
                                                </PublicRoute>
                                            }
                                        />

                                        {/* Protected Routes */}
                                        <Route
                                            path="/dashboard"
                                            element={
                                                <PrivateRoute>
                                                    <DashboardPage />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/assessment"
                                            element={
                                                <PrivateRoute>
                                                    <AssessmentPage />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/results"
                                            element={
                                                <PrivateRoute>
                                                    <ResultsPage />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/profile"
                                            element={
                                                <PrivateRoute>
                                                    <ProfilePage />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/reminders"
                                            element={
                                                <PrivateRoute>
                                                    <RemindersPage />
                                                </PrivateRoute>
                                            }
                                        />

                                        {/* Catch-all */}
                                        <Route path="*" element={<Navigate to="/" />} />
                                    </Routes>
                                </main>

                                {!hideNavAndFooter && <Footer />}
                            </div>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Toaster position="top-right" reverseOrder={false} />
                <Router
                    future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true,
                    }}
                >
                    <ScrollToTop />
                    <AppContent />
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
