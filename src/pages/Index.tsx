import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import DoctorLoginModal from '@/components/DoctorLoginModal';
import PatientLoginModal from '@/components/PatientLoginModal';
import heroBg from '@/assets/hero-bg.jpg';
import { Leaf, Stethoscope, Heart, Sparkles, ChevronRight, Building2 } from 'lucide-react';

const Index: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 ayur-hero-overlay" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center animate-float">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-primary-foreground">{t('appName')}</h1>
          </div>
          <LanguageSelector />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Traditional Ayurvedic Healthcare</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">{t('homeTitle')}</h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">{t('homeSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
            <button onClick={() => setShowDoctorModal(true)} className="group relative bg-card/90 backdrop-blur-md rounded-2xl p-8 text-left transition-all duration-500 hover:scale-105 border border-border overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-herb flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{t('doctorCard')}</h3>
                <p className="text-muted-foreground mb-6">{t('doctorCardDesc')}</p>
                <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300">
                  <span>{t('login')}</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </button>

            <button onClick={() => setShowPatientModal(true)} className="group relative bg-card/95 backdrop-blur-md rounded-2xl p-8 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-border overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-herb/20 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-herb to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-herb-foreground" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{t('patientCard')}</h3>
                <p className="text-muted-foreground mb-6">{t('patientCardDesc')}</p>
                <div className="flex items-center gap-2 text-herb font-medium group-hover:gap-4 transition-all duration-300">
                  <span>{t('registerNow')}</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </button>

            <button onClick={() => navigate('/hospitals')} className="group relative bg-card/95 backdrop-blur-md rounded-2xl p-8 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-border overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-earth flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{t('hospitalsCard')}</h3>
                <p className="text-muted-foreground mb-6">{t('hospitalsCardDesc')}</p>
                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-4 transition-all duration-300">
                  <span>{t('viewHospitals')}</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </button>
          </div>
        </main>

        <footer className="p-6 text-center text-primary-foreground/60 text-sm">© 2024 Ayurveda Healthcare</footer>
      </div>

      <DoctorLoginModal isOpen={showDoctorModal} onClose={() => setShowDoctorModal(false)} />
      <PatientLoginModal isOpen={showPatientModal} onClose={() => setShowPatientModal(false)} />
    </div>
  );
};

export default Index;
