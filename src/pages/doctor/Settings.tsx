import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Doctor } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';
import { User, Mail, Phone, Building2, MapPin, Save } from 'lucide-react';
import { toast } from 'sonner';

const DoctorSettings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user, login } = useAuth();
  
  const doctor = user as Doctor;
  
  const [formData, setFormData] = useState({
    name: doctor?.name || '',
    email: doctor?.email || '',
    phone: doctor?.phone || '',
    hospitalName: doctor?.hospitalName || '',
    hospitalAddress: doctor?.hospitalAddress || '',
    specialties: doctor?.specialties || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedDoctor: Doctor = {
      ...doctor,
      ...formData,
    };
    
    login(updatedDoctor, 'doctor');
    toast.success(t('success'));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="doctor" />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{t('settings')}</h1>
            <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
          </div>
          <LanguageSelector />
        </div>

        <div className="max-w-2xl">
          {/* Language Settings */}
          <div className="ayur-card mb-6">
            <h3 className="font-display text-xl font-semibold mb-4">{t('language')}</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  language === 'en' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium">English</span>
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  language === 'te' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium">తెలుగు</span>
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  language === 'hi' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium">हिंदी</span>
              </button>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="ayur-card">
            <h3 className="font-display text-xl font-semibold mb-6">{t('personalInfo')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {t('doctorName')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="ayur-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t('email')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="ayur-input"
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t('phoneNumber')}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="ayur-input"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Hospital
                </label>
                <input
                  type="text"
                  value={formData.hospitalName}
                  className="ayur-input"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Hospital Address
                </label>
                <input
                  type="text"
                  value={formData.hospitalAddress}
                  className="ayur-input"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Specialties</label>
                <input
                  type="text"
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  className="ayur-input"
                />
              </div>

              <button type="submit" className="ayur-btn-primary flex items-center gap-2">
                <Save className="w-5 h-5" />
                {t('save')}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorSettings;
