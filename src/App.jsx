import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import About from './pages/About';
import Tips from './pages/Tips';
import Subscription from './pages/Subscription';
import SubjectPage from './pages/SubjectPage';
import NotFound from './pages/NotFound';
import SurveyPopup from './components/SurveyPopup';
import { ToastProvider } from './components/Toast';
import { ComingSoonProvider } from './components/ComingSoonModal';

function App() {
  return (
    <ToastProvider>
      <ComingSoonProvider>
      <div className="App selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <SurveyPopup />
        <main className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/subject/:subjectId" element={<SubjectPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </ComingSoonProvider>
    </ToastProvider>
  );
}

export default App;
