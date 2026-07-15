import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import SurveyPopup from './components/SurveyPopup';
import { ToastProvider } from './components/Toast';
import { ComingSoonProvider } from './components/ComingSoonModal';
import { BkashProvider } from './components/BkashModal';
import PageViewTracker from './components/PageViewTracker';
import GoogleAd from './components/GoogleAd';
import { shouldShowAds } from './lib/adUtils';

const Home         = lazy(() => import('./pages/Home'));
const Categories   = lazy(() => import('./pages/Categories'));
const About        = lazy(() => import('./pages/About'));
const Tips         = lazy(() => import('./pages/Tips'));
const Subscription = lazy(() => import('./pages/Subscription'));
const Register     = lazy(() => import('./pages/Register'));
const SubjectPage  = lazy(() => import('./pages/SubjectPage'));
const Appointment  = lazy(() => import('./pages/Appointment'));
const NotFound     = lazy(() => import('./pages/NotFound'));

const QuizHome        = lazy(() => import('./pages/quiz/QuizHome'));
const QuizStart       = lazy(() => import('./pages/quiz/QuizStart'));
const QuizPlay        = lazy(() => import('./pages/quiz/QuizPlay'));
const QuizResult      = lazy(() => import('./pages/quiz/QuizResult'));
const QuizLeaderboard = lazy(() => import('./pages/quiz/QuizLeaderboard'));
const Privacy         = lazy(() => import('./pages/Privacy'));
const Terms           = lazy(() => import('./pages/Terms'));
const Cookies         = lazy(() => import('./pages/Cookies'));
const TipDetail       = lazy(() => import('./pages/TipDetail'));
const AdminPayments   = lazy(() => import('./pages/AdminPayments'));

const PaymentResult   = lazy(() => import('./pages/PaymentResult'));


const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--bg-app)]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-[var(--bg-border)] border-t-[#14B8A6] rounded-full animate-spin" />
      <span className="text-[#0F172A] font-bn font-bold text-sm">দয়া করে অপেক্ষা করুন...</span>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const showAds = shouldShowAds(location.pathname);

  return (
    <ToastProvider>
      <ComingSoonProvider>
        <BkashProvider>
        {/* Root Layout */}
        <div className="App relative flex min-h-screen font-body overflow-x-hidden text-slate-800">
          <PageViewTracker />
          {/* Desktop Sidebar */}
          <aside className="sidebar-desktop">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen w-full main-content">

            {/* Desktop TopBar */}
            <header className="topbar-desktop">
              <TopBar />
            </header>

            {/* Page Content */}
            <div className="flex-1 px-4 md:px-10 pt-6 pb-8 md:pb-6 w-full max-w-[1400px] mx-auto page-container">
              {/* Top Banner Ad */}
              {showAds && (
                <div className="mb-8">
                  <GoogleAd slot="2280555349" />
                </div>
              )}
              
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/"                    element={<Home />} />
                  <Route path="/categories"          element={<Categories />} />
                  <Route path="/about"               element={<About />} />
                  <Route path="/tips"                element={<Tips />} />
                  <Route path="/subscription"        element={<Subscription />} />
                  <Route path="/register"            element={<Register />} />
                  <Route path="/subject/:subjectId"  element={<SubjectPage />} />
                  <Route path="/appointment"         element={<Appointment />} />
                  <Route path="/quiz"                element={<QuizHome />} />
                  <Route path="/quiz/start"          element={<QuizStart />} />
                  <Route path="/quiz/play"           element={<QuizPlay />} />
                  <Route path="/quiz/result"         element={<QuizResult />} />
                  <Route path="/quiz/leaderboard"    element={<QuizLeaderboard />} />
                  <Route path="/privacy"             element={<Privacy />} />
                  <Route path="/terms"               element={<Terms />} />
                  <Route path="/cookies"             element={<Cookies />} />
                  <Route path="/tips/:tipId"         element={<TipDetail />} />
                  <Route path="/admin/payments"      element={<AdminPayments />} />

                  
                  <Route path="/payment-success"     element={<PaymentResult status="success" />} />
                  <Route path="/payment-fail"        element={<PaymentResult status="fail" />} />
                  <Route path="/payment-cancel"      element={<PaymentResult status="cancel" />} />

                  <Route path="*"                    element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
            
            <Footer />
          </div>

          {/* Mobile Bottom Nav */}
          <BottomNav />

          <SurveyPopup />
        </div>
        </BkashProvider>
      </ComingSoonProvider>
    </ToastProvider>
  );
}

export default App;
