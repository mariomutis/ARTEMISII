
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

export default function FloatingChatButton({ isOpen, toggle }) {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip shortly after mount
    const initialTimer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 1500);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    // Auto-hide tooltip after 5 seconds if it's shown
    if (showTooltip) {
      const hideTimer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(hideTimer);
    }
  }, [showTooltip]);

  const handleToggle = () => {
    setShowTooltip(false);
    toggle();
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center">
      <AnimatePresence>
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute right-[calc(100%+1rem)] bg-card text-card-foreground border border-border shadow-lg px-4 py-2.5 rounded-2xl rounded-br-none whitespace-nowrap"
          >
            <p className="text-sm font-medium">{t.chat.artemisGreeting}</p>
            {/* Tooltip triangle tail */}
            <div className="absolute top-full right-0 -mr-1 -mt-2 w-3 h-3 bg-card border-r border-b border-border rotate-[-45deg] translate-y-1/2"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        animate={!isOpen && showTooltip ? { y: [0, -8, 0] } : {}}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 relative"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
