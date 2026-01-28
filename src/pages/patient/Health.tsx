import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Patient, HealthDetails } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';
import dashboardBg from '@/assets/dashboard-bg.jpg';
import { Heart, Activity, Moon, Zap, Apple, AlertCircle, Users, Save } from 'lucide-react';
import { toast } from 'sonner';

const PatientHealth: React.FC = () => {
  const { t } = useLanguage();
  const { user, login } = useAuth();
  const { updatePatient } = useData();
  
  const patient = user as Patient;
  
  const [formData, setFormData] = useState({
    disease: patient?.disease || '',
    symptoms: patient?.symptoms || '',
    medicalHistory: patient?.medicalHistory || '',
    currentMedications: patient?.healthDetails?.currentMedications || '',
    allergies: patient?.healthDetails?.allergies || '',
    sleepPatterns: patient?.healthDetails?.sleepPatterns || '',
    stressLevels: patient?.healthDetails?.stressLevels || '',
    physicalActivity: patient?.healthDetails?.physicalActivity || '',
    dietaryHabits: patient?.healthDetails?.dietaryHabits || '',
    familyHistory: patient?.healthDetails?.familyHistory || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const healthDetails: HealthDetails = {
      currentMedications: formData.currentMedications,
      allergies: formData.allergies,
      sleepPatterns: formData.sleepPatterns,
      stressLevels: formData.stressLevels,
      physicalActivity: formData.physicalActivity,
      dietaryHabits: formData.dietaryHabits,
      familyHistory: formData.familyHistory,
    };

    const updatedPatient: Patient = {
      ...patient,
      disease: formData.disease,
      symptoms: formData.symptoms,
      medicalHistory: formData.medicalHistory,
      healthDetails,
    };
    
    updatePatient(updatedPatient);
    login(updatedPatient, 'patient');
    toast.success(t('success'));
  };

  const healthFields = [
    { icon: Heart, label: t('disease'), key: 'disease', placeholder: 'e.g., Diabetes, Hypertension' },
    { icon: AlertCircle, label: t('symptoms'), key: 'symptoms', placeholder: 'Describe your symptoms', multiline: true },
    { icon: Activity, label: t('medicalHistory'), key: 'medicalHistory', placeholder: 'Previous conditions, surgeries', multiline: true },
    { icon: Apple, label: 'Current Medications', key: 'currentMedications', placeholder: 'List your current medications' },
    { icon: AlertCircle, label: 'Allergies', key: 'allergies', placeholder: 'Food or environmental allergies' },
    { icon: Moon, label: 'Sleep Patterns', key: 'sleepPatterns', placeholder: 'e.g., 6-8 hours, irregular' },
    { icon: Zap, label: 'Stress Levels', key: 'stressLevels', placeholder: 'Low, Moderate, High' },
    { icon: Activity, label: 'Physical Activity', key: 'physicalActivity', placeholder: 'e.g., Daily walking, Yoga' },
    { icon: Apple, label: 'Dietary Habits', key: 'dietaryHabits', placeholder: 'Vegetarian, Non-vegetarian, etc.' },
    { icon: Users, label: 'Family History', key: 'familyHistory', placeholder: 'Family medical conditions' },
  ];

  return (
    <div className="flex min-h-screen relative">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      >
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="relative z-10 flex w-full">
        <Sidebar userType="patient" />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{t('healthDetails')}</h1>
            <p className="text-muted-foreground mt-1">Update your health information for better treatment</p>
          </div>
          <LanguageSelector />
        </div>

        {/* Health Form */}
        <div className="max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="ayur-card">
              <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-herb" />
                Medical Information
              </h3>
              
              <div className="space-y-4">
                {healthFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <field.icon className="w-4 h-4 text-muted-foreground" />
                      {field.label}
                    </label>
                    {field.multiline ? (
                      <textarea
                        value={(formData as any)[field.key]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="ayur-input h-24"
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <input
                        type="text"
                        value={(formData as any)[field.key]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="ayur-input"
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="ayur-btn-primary flex items-center gap-2">
              <Save className="w-5 h-5" />
              {t('save')} {t('healthDetails')}
            </button>
          </form>
        </div>
        </main>
      </div>
    </div>
  );
};

export default PatientHealth;
