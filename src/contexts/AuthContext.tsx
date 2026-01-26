import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  hospitalName: string;
  hospitalAddress: string;
  specialties: string;
  district: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  address: string;
  disease: string;
  symptoms: string;
  medicalHistory: string;
  hospitalName: string;
  doctorId: string;
  registeredAt: string;
  healthDetails?: HealthDetails;
}

export interface HealthDetails {
  currentMedications: string;
  allergies: string;
  sleepPatterns: string;
  stressLevels: string;
  physicalActivity: string;
  dietaryHabits: string;
  familyHistory: string;
}

interface AuthContextType {
  user: Doctor | Patient | null;
  userType: 'doctor' | 'patient' | null;
  login: (user: Doctor | Patient, type: 'doctor' | 'patient') => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Doctor | Patient | null>(() => {
    const saved = localStorage.getItem('ayurveda-user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [userType, setUserType] = useState<'doctor' | 'patient' | null>(() => {
    return localStorage.getItem('ayurveda-userType') as 'doctor' | 'patient' | null;
  });

  const login = (userData: Doctor | Patient, type: 'doctor' | 'patient') => {
    setUser(userData);
    setUserType(type);
    localStorage.setItem('ayurveda-user', JSON.stringify(userData));
    localStorage.setItem('ayurveda-userType', type);
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('ayurveda-user');
    localStorage.removeItem('ayurveda-userType');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userType, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
