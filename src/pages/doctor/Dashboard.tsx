import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Doctor } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';
import NotificationsDropdown from '@/components/NotificationsDropdown';
import dashboardBg from '@/assets/dashboard-bg.jpg';
import { Users, Utensils, Calendar, FileText } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { 
    getPatientsByDoctor, 
    dietPlans, 
    getAppointmentsByDoctor, 
    getReportsByDoctor,
    notifications 
  } = useData();

  const doctor = user as Doctor;
  const patients = getPatientsByDoctor(doctor?.id || '');
  const appointments = getAppointmentsByDoctor(doctor?.id || '');
  const reports = getReportsByDoctor(doctor?.id || '');
  
  const todayAppointments = appointments.filter(a => {
    const today = new Date().toDateString();
    return new Date(a.date).toDateString() === today && a.status === 'scheduled';
  });

  const pendingReports = reports.filter(r => r.status === 'pending' || r.status === 'uploaded');

  const stats = [
    { 
      icon: Users, 
      label: t('totalPatients'), 
      value: patients.length,
      color: 'from-primary to-herb',
      bgColor: 'bg-primary/10'
    },
    { 
      icon: Utensils, 
      label: t('totalDietPlans'), 
      value: dietPlans.filter(d => d.doctorId === doctor?.id).length,
      color: 'from-herb to-accent',
      bgColor: 'bg-herb/10'
    },
    { 
      icon: Calendar, 
      label: t('todayAppointments'), 
      value: todayAppointments.length,
      color: 'from-accent to-terracotta',
      bgColor: 'bg-accent/10'
    },
    { 
      icon: FileText, 
      label: t('pendingReports'), 
      value: pendingReports.length,
      color: 'from-earth to-terracotta',
      bgColor: 'bg-earth/10'
    },
  ];

  return (
    <div className="flex min-h-screen relative">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      >
        <div className="absolute inset-0 bg-background/40" />
      </div>

      <div className="relative z-10 flex w-full">
        <Sidebar userType="doctor" />
        
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                {t('welcome')}, Dr. {doctor?.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {doctor?.hospitalName} • {doctor?.specialties}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <NotificationsDropdown userId={doctor?.id || ''} />
              <LanguageSelector />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="ayur-stat-card group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </span>
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Patients */}
            <div className="ayur-card">
              <h3 className="font-display text-xl font-semibold mb-4">{t('myPatients')}</h3>
              {patients.length > 0 ? (
                <div className="space-y-3">
                  {patients.slice(0, 5).map((patient) => (
                    <div key={patient.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-semibold text-primary">{patient.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.disease || t('noConditionSpecified')}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(patient.registeredAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">{t('noPatientsYet')}</p>
              )}
            </div>

            {/* Today's Appointments */}
            <div className="ayur-card">
              <h3 className="font-display text-xl font-semibold mb-4">{t('todayAppointments')}</h3>
              {todayAppointments.length > 0 ? (
                <div className="space-y-3">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.time}</p>
                      </div>
                      <span className="status-scheduled">{t('scheduled')}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">{t('noAppointmentsToday')}</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
