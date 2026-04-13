import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Trophy, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProgramCard from '@/components/ProgramCard.jsx';
import TrainerCard from '@/components/TrainerCard.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const HomePage = () => {
  const { t } = useLanguage();

  const handleCTAClick = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${t.common.academyName} - ${t.common.academySub}`}</title>
        <meta name="description" content={t.hero.subtitle} />
      </Helmet>

      <Header />

      <main>
        <section 
          id="inicio" 
          className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1698839153548-314d58fd7b29)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Sparkles className="text-secondary" size={24} />
                <span className="text-secondary font-semibold tracking-wide uppercase text-sm">
                  {t.hero.badge}
                </span>
              </div>

              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight whitespace-pre-line"
                style={{ letterSpacing: '-0.02em' }}
              >
                {t.hero.title}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t.hero.subtitle}
              </p>

              <Button
                onClick={handleCTAClick}
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-6 text-lg transition-all duration-200 active:scale-[0.98]"
              >
                {t.hero.cta}
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="glass-card rounded-2xl p-6">
                <Trophy className="text-secondary mx-auto mb-3" size={32} />
                <div className="text-3xl font-bold text-white mb-1">127</div>
                <div className="text-white/80 text-sm font-medium">{t.hero.stats.medals}</div>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <Sparkles className="text-secondary mx-auto mb-3" size={32} />
                <div className="text-3xl font-bold text-white mb-1">8</div>
                <div className="text-white/80 text-sm font-medium">{t.hero.stats.years}</div>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <Heart className="text-secondary mx-auto mb-3" size={32} />
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-white/80 text-sm font-medium">{t.hero.stats.satisfaction}</div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="programas" className="py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.programs.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t.programs.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.programs.items.map((program, index) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  index={index}
                  isPremium={program.id === 'competition'}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="entrenadores" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.trainers.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t.trainers.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.trainers.items.map((trainer, index) => (
                <TrainerCard
                  key={trainer.name}
                  trainer={trainer}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="testimonios" className="py-24 ice-gradient relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(30, 58, 138, 0.3) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.testimonials.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t.testimonials.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.testimonials.items.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="py-24 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t.contact.title}
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                {t.contact.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-6 text-lg transition-all duration-200 active:scale-[0.98]"
                >
                  {t.contact.bookClass}
                  <ArrowRight size={20} className="ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-6 text-lg transition-all duration-200 active:scale-[0.98] bg-transparent"
                >
                  {t.common.moreInfo}
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <span className="text-sm font-semibold text-primary-foreground/80 block mb-2">{t.contact.emailLabel}</span>
                  <a href="mailto:info@glacierelite.com" className="text-primary-foreground hover:underline break-all">
                    info@glacierelite.com
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <span className="text-sm font-semibold text-primary-foreground/80 block mb-2">{t.contact.phoneLabel}</span>
                  <a href="" className="text-primary-foreground hover:underline">
                    +34 912 345 678
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <span className="text-sm font-semibold text-primary-foreground/80 block mb-2">{t.contact.addressLabel}</span>
                  <p className="text-primary-foreground leading-relaxed">{t.footer.address}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;