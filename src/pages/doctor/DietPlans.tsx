import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Doctor } from '@/contexts/AuthContext';
import { useData, DietPlan } from '@/contexts/DataContext';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';
import dashboardBg from '@/assets/dashboard-bg.jpg';
import { getDietByDisease, getAllDiseases } from '@/data/dietData';
import { Plus, Edit, Leaf, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';

const DoctorDietPlans: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getPatientsByDoctor, dietPlans, addDietPlan, updateDietPlan, addNotification } = useData();
  
  const doctor = user as Doctor;
  const patients = getPatientsByDoctor(doctor?.id || '');
  const doctorDietPlans = dietPlans.filter(d => d.doctorId === doctor?.id);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<DietPlan | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  
  const [formData, setFormData] = useState({
    disease: '',
    recommendedFoods: '',
    preparation: '',
    ayurvedicHerbs: '',
    formulation: '',
    doshas: '',
    lifestyle: '',
    yoga: '',
  });

  const diseases = getAllDiseases();

  const handleDiseaseSelect = (disease: string) => {
    const recommendation = getDietByDisease(disease);
    if (recommendation) {
      setFormData({
        disease: recommendation.disease,
        recommendedFoods: recommendation.dietRecommendations,
        preparation: `Preparation Method:\n${recommendation.formulation}\n\nPrevention:\n${recommendation.prevention}`,
        ayurvedicHerbs: recommendation.ayurvedicHerbs,
        formulation: recommendation.formulation,
        doshas: recommendation.doshas,
        lifestyle: recommendation.patientRecommendations,
        yoga: recommendation.yoga,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const patient = patients.find(p => p.id === selectedPatientId);
    if (!patient) {
      toast.error('Please select a patient');
      return;
    }

    if (editingPlan) {
      const updatedPlan: DietPlan = {
        ...editingPlan,
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      updateDietPlan(updatedPlan);

      // Notify patient
      addNotification({
        id: `notif_${Date.now()}`,
        userId: patient.id,
        userType: 'patient',
        message: t('dietPlanUpdated'),
        type: 'diet_updated',
        read: false,
        createdAt: new Date().toISOString(),
      });

      toast.success('Diet plan updated successfully');
    } else {
      const newPlan: DietPlan = {
        id: `diet_${Date.now()}`,
        patientId: selectedPatientId,
        doctorId: doctor?.id || '',
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addDietPlan(newPlan);

      // Notify patient
      addNotification({
        id: `notif_${Date.now()}`,
        userId: selectedPatientId,
        userType: 'patient',
        message: t('dietPlanUpdated'),
        type: 'diet_updated',
        read: false,
        createdAt: new Date().toISOString(),
      });

      toast.success('Diet plan created successfully');
    }

    setShowCreateModal(false);
    setEditingPlan(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      disease: '',
      recommendedFoods: '',
      preparation: '',
      ayurvedicHerbs: '',
      formulation: '',
      doshas: '',
      lifestyle: '',
      yoga: '',
    });
    setSelectedPatientId('');
  };

  const handleEdit = (plan: DietPlan) => {
    setEditingPlan(plan);
    setSelectedPatientId(plan.patientId);
    setFormData({
      disease: plan.disease,
      recommendedFoods: plan.recommendedFoods,
      preparation: plan.preparation,
      ayurvedicHerbs: plan.ayurvedicHerbs,
      formulation: plan.formulation,
      doshas: plan.doshas,
      lifestyle: plan.lifestyle,
      yoga: plan.yoga,
    });
    setShowCreateModal(true);
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
        <Sidebar userType="doctor" />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{t('dietPlans')}</h1>
            <p className="text-muted-foreground mt-1">Create personalized Ayurvedic diet plans</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { resetForm(); setShowCreateModal(true); }}
              className="ayur-btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t('createDietPlan')}
            </button>
            <LanguageSelector />
          </div>
        </div>

        {/* Diet Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {doctorDietPlans.map((plan) => {
            const patient = patients.find(p => p.id === plan.patientId);
            return (
              <div key={plan.id} className="ayur-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-herb to-primary flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-herb-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{patient?.name || 'Unknown Patient'}</h3>
                      <p className="text-sm text-muted-foreground">{plan.disease}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(plan)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Edit className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">{t('ayurvedicHerbs')}</p>
                    <p className="text-sm">{plan.ayurvedicHerbs}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">{t('doshas')}</p>
                    <div className="flex gap-2">
                      {plan.doshas.split(',').map((dosha, i) => (
                        <span key={i} className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                          {dosha.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">{t('recommendedFoods')}</p>
                    <p className="text-sm line-clamp-2">{plan.recommendedFoods}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                  Updated: {new Date(plan.updatedAt).toLocaleDateString()}
                </div>
              </div>
            );
          })}

          {doctorDietPlans.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <Leaf className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No diet plans yet</h3>
              <p className="text-muted-foreground mb-4">Create your first Ayurvedic diet plan</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="ayur-btn-primary"
              >
                {t('createDietPlan')}
              </button>
            </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => { setShowCreateModal(false); setEditingPlan(null); }} />
            <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-card p-6 border-b border-border flex justify-between items-center">
                <h2 className="font-display text-xl font-semibold">
                  {editingPlan ? t('editDietPlan') : t('createDietPlan')}
                </h2>
                <button onClick={() => { setShowCreateModal(false); setEditingPlan(null); }} className="p-2 rounded-full hover:bg-secondary">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Patient Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Select Patient *</label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="ayur-input"
                    required
                    disabled={!!editingPlan}
                  >
                    <option value="">Choose a patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>{patient.name} - {patient.disease || 'No condition'}</option>
                    ))}
                  </select>
                </div>

                {/* Disease Selection with Auto-fill */}
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    {t('disease')} (Auto-recommend) *
                  </label>
                  <select
                    value={formData.disease}
                    onChange={(e) => {
                      setFormData({ ...formData, disease: e.target.value });
                      handleDiseaseSelect(e.target.value);
                    }}
                    className="ayur-input"
                    required
                  >
                    <option value="">Select disease to auto-fill recommendations</option>
                    {diseases.map((disease) => (
                      <option key={disease} value={disease}>{disease}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('ayurvedicHerbs')}</label>
                    <input
                      type="text"
                      value={formData.ayurvedicHerbs}
                      onChange={(e) => setFormData({ ...formData, ayurvedicHerbs: e.target.value })}
                      className="ayur-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('doshas')}</label>
                    <input
                      type="text"
                      value={formData.doshas}
                      onChange={(e) => setFormData({ ...formData, doshas: e.target.value })}
                      className="ayur-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('recommendedFoods')}</label>
                  <textarea
                    value={formData.recommendedFoods}
                    onChange={(e) => setFormData({ ...formData, recommendedFoods: e.target.value })}
                    className="ayur-input h-32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('preparation')} (How to prepare)</label>
                  <textarea
                    value={formData.preparation}
                    onChange={(e) => setFormData({ ...formData, preparation: e.target.value })}
                    className="ayur-input h-32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('lifestyle')}</label>
                  <textarea
                    value={formData.lifestyle}
                    onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
                    className="ayur-input h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('yoga')}</label>
                  <input
                    type="text"
                    value={formData.yoga}
                    onChange={(e) => setFormData({ ...formData, yoga: e.target.value })}
                    className="ayur-input"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => { setShowCreateModal(false); setEditingPlan(null); }} className="flex-1 px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-colors">
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
        </main>
      </div>
    </div>
  );
};

export default DoctorDietPlans;
