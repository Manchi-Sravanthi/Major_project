import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getHospitalNames, validateDoctor } from '@/data/hospitalData';
import { X, Leaf, Building2, Phone, Mail, User } from 'lucide-react';
import { toast } from 'sonner';

interface DoctorLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DoctorLoginModal: React.FC<DoctorLoginModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    hospitalName: '',
    doctorName: '',
    phone: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const hospitals = getHospitalNames();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate against dataset
    const hospital = validateDoctor(formData.hospitalName, formData.phone, formData.email);
    
    if (hospital) {
      const doctorData = {
        id: `doc_${Date.now()}`,
        name: formData.doctorName,
        email: hospital.email,
        phone: hospital.phone,
        hospitalName: hospital.name,
        hospitalAddress: hospital.address,
        specialties: hospital.specialties,
        district: hospital.district,
      };
      
      login(doctorData, 'doctor');
      toast.success(t('loginSuccess'));
      navigate('/doctor/dashboard');
      onClose();
    } else {
      toast.error(t('loginFailed'));
    }
    
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-herb p-6 text-primary-foreground">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary-foreground/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Leaf className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold">{t('doctorLogin')}</h2>
              <p className="text-sm opacity-80">{t('appName')}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Hospital Selection */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              <Building2 className="w-4 h-4 inline mr-2" />
              {t('selectHospital')} *
            </label>
            <select
              value={formData.hospitalName}
              onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
              className="ayur-input"
              required
            >
              <option value="">{t('selectHospital')}</option>
              {hospitals.map((hospital) => (
                <option key={hospital} value={hospital}>{hospital}</option>
              ))}
            </select>
          </div>

          {/* Doctor Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              <User className="w-4 h-4 inline mr-2" />
              {t('doctorName')} *
            </label>
            <input
              type="text"
              value={formData.doctorName}
              onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
              className="ayur-input"
              placeholder={t('doctorName')}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              <Phone className="w-4 h-4 inline mr-2" />
              {t('phoneNumber')} *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="ayur-input"
              placeholder="9876543210"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              <Mail className="w-4 h-4 inline mr-2" />
              {t('email')} *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="ayur-input"
              placeholder="doctor@example.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full ayur-btn-primary disabled:opacity-50"
          >
            {isLoading ? t('loading') : t('login')}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            * {t('required')} - Details must match hospital records
          </p>
        </form>
      </div>
    </div>
  );
};

export default DoctorLoginModal;
