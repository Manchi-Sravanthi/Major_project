import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Patient } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';
import dashboardBg from '@/assets/dashboard-bg.jpg';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';
import { toast } from 'sonner';

const PatientSettings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user, login } = useAuth();
  const { updatePatient } = useData();
  
  const patient = user as Patient;
  
  const [formData, setFormData] = useState({
    name: patient?.name || '',
    email: patient?.email || '',
    phone: patient?.phone || '',
    age: patient?.age?.toString() || '',
    gender: patient?.gender || '',
    bloodGroup: patient?.bloodGroup || '',
    address: patient?.address || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedPatient: Patient = {
      ...patient,
      ...formData,
      age: parseInt(formData.age) || 0,
    };
    
    updatePatient(updatedPatient);
    login(updatedPatient, 'patient');
    toast.success(t('success'));
  };

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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t('patientName')}
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
                    className="ayur-input"
                    disabled
                  />
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
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('age')}</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="ayur-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('gender')}</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="ayur-input"
                  >
                    <option value="">Select</option>
                    <option value="male">{t('male')}</option>
                    <option value="female">{t('female')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('bloodGroup')}</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="ayur-input"
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {t('address')}
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="ayur-input h-24"
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
    </div>
  );
};

export default PatientSettings;
