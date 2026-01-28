import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Patient } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';
import dashboardBg from '@/assets/dashboard-bg.jpg';
import { Calendar, Clock, Video, User } from 'lucide-react';

const PatientAppointments: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getAppointmentsByPatient } = useData();

  const patient = user as Patient;
  const appointments = getAppointmentsByPatient(patient?.id || '');

  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const upcomingAppointments = sortedAppointments.filter(a => 
    a.status === 'scheduled' && new Date(a.date) >= new Date()
  );

  const pastAppointments = sortedAppointments.filter(a => 
    a.status !== 'scheduled' || new Date(a.date) < new Date()
  );

  const handleJoinCall = (appointmentId: string) => {
    // Open video call in new window
    window.open(`https://meet.jit.si/ayurveda-consultation-${appointmentId}`, '_blank');
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
            <h1 className="font-display text-3xl font-bold text-foreground">{t('myAppointments')}</h1>
            <p className="text-muted-foreground mt-1">View and join your consultations</p>
          </div>
          <LanguageSelector />
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="ayur-card flex items-center justify-between bg-gradient-to-r from-herb/5 to-primary/5 border-herb/20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-herb to-primary flex items-center justify-center">
                    <User className="w-7 h-7 text-herb-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Dr. {appointment.doctorName}</h3>
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
                  <span className="status-scheduled">{t('scheduled')}</span>
                  <button
                    onClick={() => handleJoinCall(appointment.id)}
                    className="ayur-btn-primary flex items-center gap-2"
                  >
                    <Video className="w-5 h-5" />
                    {t('joinVideoCall')}
                  </button>
                </div>
              </div>
            ))}

            {upcomingAppointments.length === 0 && (
              <div className="ayur-card text-center py-8">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">No upcoming appointments</p>
              </div>
            )}
          </div>
        </div>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">Past Appointments</h2>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div key={appointment.id} className="ayur-card flex items-center justify-between opacity-75">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                      <User className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Dr. {appointment.doctorName}</h3>
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
                    </div>
                  </div>

                  <span className={`status-${appointment.status}`}>
                    {t(appointment.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        </main>
      </div>
    </div>
  );
};

export default PatientAppointments;
