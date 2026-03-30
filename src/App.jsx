import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SurveyPopup from './components/SurveyPopup';
import { ToastProvider } from './components/Toast';
import { ComingSoonProvider } from './components/ComingSoonModal';
import { Loader2 } from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const Categories = lazy(() => import('./pages/Categories'));
const About = lazy(() => import('./pages/About'));
const Tips = lazy(() => import('./pages/Tips'));
const Subscription = lazy(() => import('./pages/Subscription'));
const SubjectPage = lazy(() => import('./pages/SubjectPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const QuizHome = lazy(() => import('./pages/quiz/QuizHome'));
const QuizStart = lazy(() => import('./pages/quiz/QuizStart'));
const QuizPlay = lazy(() => import('./pages/quiz/QuizPlay'));
const QuizResult = lazy(() => import('./pages/quiz/QuizResult'));
const QuizLeaderboard = lazy(() => import('./pages/quiz/QuizLeaderboard'));

const PageLoader = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-6">
      <div className="w-16 h-16 border-4 border-slate-800 border-t-primary rounded-full animate-spin" />
      <span className="text-primary font-bn italic uppercase tracking-[0.2em] text-sm font-black animate-pulse">দয়া করে অপেক্ষা করুন...</span>
    </div>
  </div>
);

function App() {
  return (
    <ToastProvider>
      <ComingSoonProvider>
      <div className="App selection:bg-primary/20 selection:text-primary overflow-x-hidden overflow-y-clip">
        <Navbar />
        <SurveyPopup />
        <main className="min-h-[80vh]">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/subject/:subjectId" element={<SubjectPage />} />
              
              {/* Quiz Section Routes */}
              <Route path="/quiz" element={<QuizHome />} />
              <Route path="/quiz/start" element={<QuizStart />} />
              <Route path="/quiz/play" element={<QuizPlay />} />
              <Route path="/quiz/result" element={<QuizResult />} />
              <Route path="/quiz/leaderboard" element={<QuizLeaderboard />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      </ComingSoonProvider>
    </ToastProvider>
  );
}

export default App;
