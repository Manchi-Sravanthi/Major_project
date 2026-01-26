import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Patient, HealthDetails } from './AuthContext';

export interface DietPlan {
  id: string;
  patientId: string;
  doctorId: string;
  disease: string;
  recommendedFoods: string;
  preparation: string;
  ayurvedicHerbs: string;
  formulation: string;
  doshas: string;
  lifestyle: string;
  yoga: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
  createdAt: string;
}

export interface Report {
  id: string;
  patientId: string;
  doctorId: string;
  title: string;
  description: string;
  fileUrl: string;
  status: 'pending' | 'uploaded' | 'reviewed';
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  userType: 'doctor' | 'patient';
  message: string;
  type: 'patient_registered' | 'diet_updated' | 'appointment_scheduled' | 'report_uploaded';
  read: boolean;
  createdAt: string;
}

interface DataContextType {
  patients: Patient[];
  dietPlans: DietPlan[];
  appointments: Appointment[];
  reports: Report[];
  notifications: Notification[];
  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  addDietPlan: (plan: DietPlan) => void;
  updateDietPlan: (plan: DietPlan) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  addReport: (report: Report) => void;
  updateReport: (report: Report) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  getPatientsByDoctor: (doctorId: string) => Patient[];
  getDietPlansByPatient: (patientId: string) => DietPlan[];
  getAppointmentsByDoctor: (doctorId: string) => Appointment[];
  getAppointmentsByPatient: (patientId: string) => Appointment[];
  getReportsByPatient: (patientId: string) => Report[];
  getReportsByDoctor: (doctorId: string) => Report[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('ayurveda-patients');
    return saved ? JSON.parse(saved) : [];
  });

  const [dietPlans, setDietPlans] = useState<DietPlan[]>(() => {
    const saved = localStorage.getItem('ayurveda-dietPlans');
    return saved ? JSON.parse(saved) : [];
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('ayurveda-appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [reports, setReports] = useState<Report[]>(() => {
    const saved = localStorage.getItem('ayurveda-reports');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('ayurveda-notifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ayurveda-patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('ayurveda-dietPlans', JSON.stringify(dietPlans));
  }, [dietPlans]);

  useEffect(() => {
    localStorage.setItem('ayurveda-appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('ayurveda-reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('ayurveda-notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addPatient = (patient: Patient) => {
    setPatients(prev => [...prev, patient]);
  };

  const updatePatient = (patient: Patient) => {
    setPatients(prev => prev.map(p => p.id === patient.id ? patient : p));
  };

  const addDietPlan = (plan: DietPlan) => {
    setDietPlans(prev => [...prev, plan]);
  };

  const updateDietPlan = (plan: DietPlan) => {
    setDietPlans(prev => prev.map(p => p.id === plan.id ? plan : p));
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const updateAppointment = (appointment: Appointment) => {
    setAppointments(prev => prev.map(a => a.id === appointment.id ? appointment : a));
  };

  const addReport = (report: Report) => {
    setReports(prev => [...prev, report]);
  };

  const updateReport = (report: Report) => {
    setReports(prev => prev.map(r => r.id === report.id ? report : r));
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [...prev, notification]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getPatientsByDoctor = (doctorId: string) => {
    return patients.filter(p => p.doctorId === doctorId);
  };

  const getDietPlansByPatient = (patientId: string) => {
    return dietPlans.filter(p => p.patientId === patientId);
  };

  const getAppointmentsByDoctor = (doctorId: string) => {
    return appointments.filter(a => a.doctorId === doctorId);
  };

  const getAppointmentsByPatient = (patientId: string) => {
    return appointments.filter(a => a.patientId === patientId);
  };

  const getReportsByPatient = (patientId: string) => {
    return reports.filter(r => r.patientId === patientId);
  };

  const getReportsByDoctor = (doctorId: string) => {
    return reports.filter(r => r.doctorId === doctorId);
  };

  return (
    <DataContext.Provider value={{
      patients,
      dietPlans,
      appointments,
      reports,
      notifications,
      addPatient,
      updatePatient,
      addDietPlan,
      updateDietPlan,
      addAppointment,
      updateAppointment,
      addReport,
      updateReport,
      addNotification,
      markNotificationRead,
      getPatientsByDoctor,
      getDietPlansByPatient,
      getAppointmentsByDoctor,
      getAppointmentsByPatient,
      getReportsByPatient,
      getReportsByDoctor,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
