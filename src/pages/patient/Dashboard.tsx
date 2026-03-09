import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Patient } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';
import NotificationsDropdown from '@/components/NotificationsDropdown';
import dashboardBg from '@/assets/dashboard-bg.jpg';
import { Heart, Utensils, Calendar, FileText } from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getDietPlansByPatient, getAppointmentsByPatient, getReportsByPatient, notifications } = useData();

  const patient = user as Patient;
  const dietPlans = getDietPlansByPatient(patient?.id || '');
  const appointments = getAppointmentsByPatient(patient?.id || '');
  const reports = getReportsByPatient(patient?.id || '');
  
  const upcomingAppointments = appointments.filter(a => 
    a.status === 'scheduled' && new Date(a.date) >= new Date()
  );
  const patientNotifications = notifications.filter(n => n.userId === patient?.id && !n.read);

  const stats = [
    { 
      icon: Utensils, 
      label: t('myDietPlan'), 
      value: dietPlans.length,
      color: 'from-herb to-primary',
      bgColor: 'bg-herb/10'
    },
    { 
      icon: Calendar, 
      label: t('myAppointments'), 
      value: upcomingAppointments.length,
      color: 'from-primary to-accent',
      bgColor: 'bg-primary/10'
    },
    { 
      icon: FileText, 
      label: t('myReports'), 
      value: reports.length,
      color: 'from-accent to-earth',
      bgColor: 'bg-accent/10'
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
        <Sidebar userType="patient" />
        
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                {t('welcome')}, {patient?.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {patient?.hospitalName}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <NotificationsDropdown userId={patient?.id || ''} />
              <LanguageSelector />
            </div>
          </div>

          {/* Health Status Card */}
          {patient?.disease && (
            <div className="ayur-card mb-6 bg-gradient-to-r from-herb/10 to-primary/10 border-herb/20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-herb/20 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-herb" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t('healthDetails')}</h3>
                  <p className="text-muted-foreground">{t('condition')}: {patient.disease}</p>
                  {patient.symptoms && <p className="text-sm text-muted-foreground">{t('symptoms')}: {patient.symptoms}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            {/* Upcoming Appointments */}
            <div className="ayur-card">
              <h3 className="font-display text-xl font-semibold mb-4">{t('myAppointments')}</h3>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAppointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Dr. {appointment.doctorName}</p>
                        <p className="text-sm text-muted-foreground">{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
                      </div>
                      <span className="status-scheduled">{t('scheduled')}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">{t('noUpcomingAppointments')}</p>
              )}
            </div>

            {/* Recent Diet Plans */}
            <div className="ayur-card">
              <h3 className="font-display text-xl font-semibold mb-4">{t('myDietPlan')}</h3>
              {dietPlans.length > 0 ? (
                <div className="space-y-3">
                  {dietPlans.slice(0, 3).map((plan) => (
                    <div key={plan.id} className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Utensils className="w-4 h-4 text-herb" />
                        <span className="font-medium">{plan.disease}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{plan.recommendedFoods}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">{t('noDietPlansYet')}</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
