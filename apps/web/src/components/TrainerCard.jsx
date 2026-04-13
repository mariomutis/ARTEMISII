
import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const TrainerCard = ({ trainer, index }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={trainer.image}
          alt={trainer.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-card-foreground mb-2">{trainer.name}</h3>
        <p className="text-secondary font-semibold text-sm mb-3">{trainer.specialty}</p>

        <div className="flex items-center space-x-2 mb-4">
          <Award size={18} className="text-primary" />
          <span className="text-sm text-muted-foreground">
            {trainer.experience} {t.common.yearsExperience}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{trainer.bio}</p>
      </div>
    </motion.div>
  );
};

export default TrainerCard;
