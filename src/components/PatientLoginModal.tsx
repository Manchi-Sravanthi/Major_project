import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Patient } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { getHospitalNames, getHospitalByName } from '@/data/hospitalData';
import { X, Leaf, Building2, Mail, User, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface PatientLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PatientLoginModal: React.FC<PatientLoginModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const { addPatient, patients, addNotification } = useData();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    hospitalName: '',
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const hospitals = getHospitalNames();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const hospital = getHospitalByName(formData.hospitalName);
    
    if (hospital) {
      // Check if patient already exists
      const existingPatient = patients.find(
        p => p.email.toLowerCase() === formData.email.toLowerCase() && 
             p.hospitalName === formData.hospitalName
      );

      if (existingPatient) {
        // Login existing patient
        login(existingPatient, 'patient');
        toast.success(t('loginSuccess'));
        navigate('/patient/dashboard');
      } else {
        // Create new patient
        const patientData: Patient = {
          id: `pat_${Date.now()}`,
          name: formData.name,
          email: formData.email,
          phone: '',
          age: 0,
          gender: '',
          bloodGroup: '',
          address: '',
          disease: '',
          symptoms: '',
          medicalHistory: '',
          hospitalName: hospital.name,
          doctorId: `doc_${hospital.phone}`, // Link to hospital's doctor
          registeredAt: new Date().toISOString(),
        };
        
        addPatient(patientData);
        login(patientData, 'patient');

        // Add notification for doctor
        addNotification({
          id: `notif_${Date.now()}`,
          userId: patientData.doctorId,
          userType: 'doctor',
          message: `${formData.name} ${t('newPatientRegistered')}`,
          type: 'patient_registered',
          read: false,
          createdAt: new Date().toISOString(),
        });

        toast.success(t('loginSuccess'));
        navigate('/patient/dashboard');
      }
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
        <div className="bg-gradient-to-r from-herb to-primary p-6 text-herb-foreground">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-herb-foreground/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-herb-foreground/20 flex items-center justify-center">
              <Heart className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold">{t('patientLogin')}</h2>
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

          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              <User className="w-4 h-4 inline mr-2" />
              {t('patientName')} *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="ayur-input"
              placeholder={t('patientName')}
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
              placeholder="patient@example.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full ayur-btn-primary disabled:opacity-50"
          >
            {isLoading ? t('loading') : t('registerNow')}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            {t('alreadyRegistered')}
          </p>
        </form>
      </div>
    </div>
  );
};

export default PatientLoginModal;
