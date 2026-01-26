import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Utensils, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  Leaf,
  Bell,
  Heart
} from 'lucide-react';

interface SidebarProps {
  userType: 'doctor' | 'patient';
}

const Sidebar: React.FC<SidebarProps> = ({ userType }) => {
  const { t } = useLanguage();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const doctorMenu = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/doctor/dashboard' },
    { icon: Users, label: t('myPatients'), path: '/doctor/patients' },
    { icon: Utensils, label: t('dietPlans'), path: '/doctor/diet-plans' },
    { icon: Calendar, label: t('appointments'), path: '/doctor/appointments' },
    { icon: FileText, label: t('reports'), path: '/doctor/reports' },
    { icon: Settings, label: t('settings'), path: '/doctor/settings' },
  ];

  const patientMenu = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/patient/dashboard' },
    { icon: Heart, label: t('healthDetails'), path: '/patient/health' },
    { icon: Utensils, label: t('myDietPlan'), path: '/patient/diet-plan' },
    { icon: Calendar, label: t('myAppointments'), path: '/patient/appointments' },
    { icon: FileText, label: t('myReports'), path: '/patient/reports' },
    { icon: Settings, label: t('settings'), path: '/patient/settings' },
  ];

  const menu = userType === 'doctor' ? doctorMenu : patientMenu;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="ayur-sidebar w-64 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <Leaf className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold text-sidebar-foreground">
              {t('appName')}
            </h1>
            <p className="text-xs text-sidebar-foreground/70">
              {userType === 'doctor' ? t('doctorCard') : t('patientCard')}
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-lg font-semibold text-sidebar-foreground">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sidebar-foreground truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/70 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
