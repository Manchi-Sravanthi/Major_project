import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Doctor, Patient } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';
import { Plus, MoreVertical, X, User, Phone, Mail, MapPin, Heart, FileText } from 'lucide-react';
import { toast } from 'sonner';

const DoctorPatients: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getPatientsByDoctor, addPatient, addNotification } = useData();
  
  const doctor = user as Doctor;
  const patients = getPatientsByDoctor(doctor?.id || '');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    bloodGroup: '',
    address: '',
    disease: '',
    symptoms: '',
    medicalHistory: '',
  });

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPatient: Patient = {
      id: `pat_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      age: parseInt(formData.age) || 0,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      address: formData.address,
      disease: formData.disease,
      symptoms: formData.symptoms,
      medicalHistory: formData.medicalHistory,
      hospitalName: doctor?.hospitalName || '',
      doctorId: doctor?.id || '',
      registeredAt: new Date().toISOString(),
    };
    
    addPatient(newPatient);
    toast.success(t('success'));
    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      bloodGroup: '',
      address: '',
      disease: '',
      symptoms: '',
      medicalHistory: '',
    });
  };

  const viewPatientDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
    setActiveMenu(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="doctor" />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{t('myPatients')}</h1>
            <p className="text-muted-foreground mt-1">{patients.length} patients registered</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowAddModal(true)}
              className="ayur-btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t('addPatient')}
            </button>
            <LanguageSelector />
          </div>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div key={patient.id} className="ayur-card relative group">
              {/* 3-dot menu */}
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setActiveMenu(activeMenu === patient.id ? null : patient.id)}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-muted-foreground" />
                </button>
                {activeMenu === patient.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border z-10">
                    <button
                      onClick={() => viewPatientDetails(patient)}
                      className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors rounded-lg flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      {t('view')} Details
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-herb flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">{patient.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">{patient.disease || 'No condition'}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{patient.email}</span>
                </div>
                {patient.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{patient.phone}</span>
                  </div>
                )}
                {patient.age > 0 && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{patient.age} years, {patient.gender}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Registered: {new Date(patient.registeredAt).toLocaleDateString()}
                </span>
                {patient.bloodGroup && (
                  <span className="px-2 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                    {patient.bloodGroup}
                  </span>
                )}
              </div>
            </div>
          ))}

          {patients.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No patients yet</h3>
              <p className="text-muted-foreground mb-4">Add your first patient to get started</p>
              <button 
                onClick={() => setShowAddModal(true)}
                className="ayur-btn-primary"
              >
                {t('addPatient')}
              </button>
            </div>
          )}
        </div>

        {/* Add Patient Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-card p-6 border-b border-border flex justify-between items-center">
                <h2 className="font-display text-xl font-semibold">{t('addPatient')}</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 rounded-full hover:bg-secondary">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddPatient} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('patientName')} *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="ayur-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('email')} *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="ayur-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('phoneNumber')}</label>
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
                  <label className="block text-sm font-medium mb-2">{t('address')}</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="ayur-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('disease')}</label>
                  <input
                    type="text"
                    value={formData.disease}
                    onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                    className="ayur-input"
                    placeholder="e.g., Diabetes, Hypertension"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('symptoms')}</label>
                  <textarea
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    className="ayur-input h-24"
                    placeholder="Describe patient symptoms"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('medicalHistory')}</label>
                  <textarea
                    value={formData.medicalHistory}
                    onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                    className="ayur-input h-24"
                    placeholder="Previous conditions, surgeries, etc."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-colors">
                    {t('cancel')}
                  </button>
                  <button type="submit" className="flex-1 ayur-btn-primary">
                    {t('save')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Patient Details Modal */}
        {showDetailsModal && selectedPatient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setShowDetailsModal(false)} />
            <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-card p-6 border-b border-border flex justify-between items-center">
                <h2 className="font-display text-xl font-semibold">{t('patientDetails')}</h2>
                <button onClick={() => setShowDetailsModal(false)} className="p-2 rounded-full hover:bg-secondary">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-herb flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">{selectedPatient.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-semibold">{selectedPatient.name}</h3>
                    <p className="text-muted-foreground">{selectedPatient.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p className="text-sm text-muted-foreground">{t('age')}</p>
                    <p className="font-semibold">{selectedPatient.age || 'N/A'} years</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p className="text-sm text-muted-foreground">{t('gender')}</p>
                    <p className="font-semibold capitalize">{selectedPatient.gender || 'N/A'}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p className="text-sm text-muted-foreground">{t('bloodGroup')}</p>
                    <p className="font-semibold">{selectedPatient.bloodGroup || 'N/A'}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p className="text-sm text-muted-foreground">{t('phoneNumber')}</p>
                    <p className="font-semibold">{selectedPatient.phone || 'N/A'}</p>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground mb-1">{t('disease')}</p>
                  <p className="font-semibold">{selectedPatient.disease || 'Not specified'}</p>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground mb-1">{t('symptoms')}</p>
                  <p className="font-semibold">{selectedPatient.symptoms || 'Not specified'}</p>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground mb-1">{t('medicalHistory')}</p>
                  <p className="font-semibold">{selectedPatient.medicalHistory || 'Not specified'}</p>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground mb-1">{t('address')}</p>
                  <p className="font-semibold">{selectedPatient.address || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorPatients;
