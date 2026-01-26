import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Patient } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';
import { Leaf, Utensils, Sparkles } from 'lucide-react';

const PatientDietPlan: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getDietPlansByPatient } = useData();

  const patient = user as Patient;
  const dietPlans = getDietPlansByPatient(patient?.id || '');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="patient" />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{t('myDietPlan')}</h1>
            <p className="text-muted-foreground mt-1">Your personalized Ayurvedic diet recommendations</p>
          </div>
          <LanguageSelector />
        </div>

        {/* Diet Plans */}
        <div className="space-y-6">
          {dietPlans.map((plan) => (
            <div key={plan.id} className="ayur-card">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-herb to-primary flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-herb-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{plan.disease}</h3>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {new Date(plan.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Doshas */}
                <div className="p-4 rounded-xl bg-secondary/30">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {t('doshas')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {plan.doshas.split(',').map((dosha, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium">
                        {dosha.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ayurvedic Herbs */}
                <div className="p-4 rounded-xl bg-secondary/30">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                    <Leaf className="w-4 h-4" />
                    {t('ayurvedicHerbs')}
                  </h4>
                  <p className="text-foreground">{plan.ayurvedicHerbs}</p>
                  <p className="text-sm text-muted-foreground mt-2">{plan.formulation}</p>
                </div>

                {/* Recommended Foods */}
                <div className="p-4 rounded-xl bg-herb/10 md:col-span-2">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-herb mb-3 flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    {t('recommendedFoods')}
                  </h4>
                  <p className="text-foreground whitespace-pre-line">{plan.recommendedFoods}</p>
                </div>

                {/* Preparation Method */}
                <div className="p-4 rounded-xl bg-secondary/30 md:col-span-2">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    {t('preparation')}
                  </h4>
                  <p className="text-foreground whitespace-pre-line">{plan.preparation}</p>
                </div>

                {/* Lifestyle */}
                <div className="p-4 rounded-xl bg-secondary/30">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    {t('lifestyle')}
                  </h4>
                  <p className="text-foreground">{plan.lifestyle}</p>
                </div>

                {/* Yoga */}
                <div className="p-4 rounded-xl bg-secondary/30">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    {t('yoga')}
                  </h4>
                  <p className="text-foreground">{plan.yoga}</p>
                </div>
              </div>
            </div>
          ))}

          {dietPlans.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <Leaf className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No diet plans yet</h3>
              <p className="text-muted-foreground">Your doctor will create a personalized diet plan for you</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientDietPlan;
