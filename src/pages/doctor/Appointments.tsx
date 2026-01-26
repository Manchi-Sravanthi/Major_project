import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Doctor } from '@/contexts/AuthContext';
import { useData, Appointment } from '@/contexts/DataContext';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';
import { Plus, Calendar, Clock, Video, X } from 'lucide-react';
import { toast } from 'sonner';

const DoctorAppointments: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getPatientsByDoctor, getAppointmentsByDoctor, addAppointment, updateAppointment, addNotification } = useData();
  
  const doctor = user as Doctor;
  const patients = getPatientsByDoctor(doctor?.id || '');
  const appointments = getAppointmentsByDoctor(doctor?.id || '');
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    date: '',
    time: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const patient = patients.find(p => p.id === formData.patientId);
    if (!patient) {
      toast.error('Please select a patient');
      return;
    }

    const newAppointment: Appointment = {
      id: `appt_${Date.now()}`,
      patientId: formData.patientId,
      doctorId: doctor?.id || '',
      patientName: patient.name,
      doctorName: doctor?.name || '',
      date: formData.date,
      time: formData.time,
      status: 'scheduled',
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    };

    addAppointment(newAppointment);

    // Notify patient
    addNotification({
      id: `notif_${Date.now()}`,
      userId: formData.patientId,
      userType: 'patient',
      message: t('appointmentScheduled'),
      type: 'appointment_scheduled',
      read: false,
      createdAt: new Date().toISOString(),
    });

    toast.success('Appointment scheduled successfully');
    setShowCreateModal(false);
    setFormData({ patientId: '', date: '', time: '', notes: '' });
  };

  const handleStatusChange = (appointment: Appointment, status: 'scheduled' | 'completed' | 'cancelled') => {
    updateAppointment({ ...appointment, status });
    toast.success(`Appointment ${status}`);
  };

  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="doctor" />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{t('appointments')}</h1>
            <p className="text-muted-foreground mt-1">Manage patient appointments</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="ayur-btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {t('scheduleAppointment')}
            </button>
            <LanguageSelector />
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {sortedAppointments.map((appointment) => (
            <div key={appointment.id} className="ayur-card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-herb flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{appointment.patientName}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {appointment.time}
                    </span>
                  </div>
                  {appointment.notes && (
                    <p className="text-sm text-muted-foreground mt-1">{appointment.notes}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`status-${appointment.status}`}>
                  {t(appointment.status)}
                </span>
                
                {appointment.status === 'scheduled' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(appointment, 'completed')}
                      className="px-4 py-2 rounded-lg bg-herb/10 text-herb hover:bg-herb/20 transition-colors text-sm font-medium"
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() => handleStatusChange(appointment, 'cancelled')}
                      className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      <Video className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <Calendar className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No appointments</h3>
              <p className="text-muted-foreground mb-4">Schedule your first appointment</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="ayur-btn-primary"
              >
                {t('scheduleAppointment')}
              </button>
            </div>
          )}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
            <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4">
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h2 className="font-display text-xl font-semibold">{t('scheduleAppointment')}</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-2 rounded-full hover:bg-secondary">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Patient *</label>
                  <select
                    value={formData.patientId}
                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                    className="ayur-input"
                    required
                  >
                    <option value="">Choose a patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>{patient.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('appointmentDate')} *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="ayur-input"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('appointmentTime')} *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="ayur-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="ayur-input h-24"
                    placeholder="Additional notes..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-colors">
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
  );
};

export default DoctorAppointments;
