import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntegratedAiChat from './integrated-ai-chat';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { MessageCircle } from 'lucide-react';

export default function ChatContainer({ isOpen }) {
  const { t } = useLanguage();
  
  // WhatsApp encoded message link
  const whatsappUrl = "https://wa.me/573147650849?text=Hola%2C%20me%20gustaría%20obtener%20más%20información%20sobre%20los%20programas%20de%20Glacier%20Elite%20Figure%20Skating%20Academy.";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] sm:h-[600px] max-h-[calc(100vh-6rem)] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-hidden relative flex flex-col">
            <IntegratedAiChat />
          </div>
          
          <div className="p-3 border-t border-border bg-muted/30">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/90 transition-all duration-200 shadow-sm active:scale-[0.98] text-sm"
            >
              <MessageCircle size={16} />
              <span>{t.chat.whatsapp}</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}