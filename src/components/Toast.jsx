import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[10000] flex flex-col items-center gap-3 w-full max-w-md pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="pointer-events-auto bg-white/95 backdrop-blur-xl border-2 border-primary/20 px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 min-w-[300px]"
              style={{ borderBottom: '4px solid #10b981' }}
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-slate-800 font-bn font-black italic">{toast.message}</span>
              <button 
                onClick={() => removeToast(toast.id)}
                className="ml-auto text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
