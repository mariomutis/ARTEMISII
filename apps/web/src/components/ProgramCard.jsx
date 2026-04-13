import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const ProgramCard = ({ program, index, isPremium = false }) => {
  const { t } = useLanguage();

  const tierColors = {
    beginner: 'border-blue-200 hover:border-blue-300',
    intermediate: 'border-blue-300 hover:border-blue-400',
    advanced: 'border-blue-400 hover:border-blue-500',
    competition: 'border-secondary hover:border-secondary/80'
  };

  const tierAccents = {
    beginner: 'bg-blue-50 text-blue-800',
    intermediate: 'bg-blue-100 text-blue-900',
    advanced: 'bg-blue-200 text-blue-950',
    competition: 'bg-secondary/10 text-secondary-foreground'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative bg-card rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full ${
        tierColors[program.id]
      } ${isPremium ? 'scale-105 ring-2 ring-secondary shadow-lg' : ''}`}
    >
      {isPremium && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-primary px-4 py-1 rounded-full text-xs font-semibold">
          {t.common.recommended}
        </div>
      )}

      <div className={`inline-block px-3 py-1 self-start rounded-lg text-xs font-semibold mb-4 ${tierAccents[program.id]}`}>
        {program.levelLabel}
      </div>

      <h3 className="text-2xl font-bold text-card-foreground mb-3">{program.name}</h3>
      <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{program.description}</p>

      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3 text-sm text-card-foreground">
          <Calendar size={18} className="text-primary" />
          <span>{program.classesPerWeek} {t.common.classesPerWeek}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-card-foreground">
          <Users size={18} className="text-primary" />
          <span>{t.common.smallGroups}</span>
        </div>
      </div>

      <div className="border-t border-border pt-6 mt-auto">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-3xl font-bold text-primary">{program.price}$</span>
            <span className="text-muted-foreground text-sm">{t.common.perMonth}</span>
          </div>
        </div>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 active:scale-[0.98]"
        >
          {t.common.moreInfo}
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ProgramCard;