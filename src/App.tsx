import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorPatients from "./pages/doctor/Patients";
import DoctorDietPlans from "./pages/doctor/DietPlans";
import DoctorAppointments from "./pages/doctor/Appointments";
import DoctorReports from "./pages/doctor/Reports";
import DoctorSettings from "./pages/doctor/Settings";
import PatientDashboard from "./pages/patient/Dashboard";
import PatientHealth from "./pages/patient/Health";
import PatientDietPlan from "./pages/patient/DietPlan";
import PatientAppointments from "./pages/patient/Appointments";
import PatientReports from "./pages/patient/Reports";
import PatientSettings from "./pages/patient/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <DataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor/patients" element={<DoctorPatients />} />
                <Route path="/doctor/diet-plans" element={<DoctorDietPlans />} />
                <Route path="/doctor/appointments" element={<DoctorAppointments />} />
                <Route path="/doctor/reports" element={<DoctorReports />} />
                <Route path="/doctor/settings" element={<DoctorSettings />} />
                <Route path="/patient/dashboard" element={<PatientDashboard />} />
                <Route path="/patient/health" element={<PatientHealth />} />
                <Route path="/patient/diet-plan" element={<PatientDietPlan />} />
                <Route path="/patient/appointments" element={<PatientAppointments />} />
                <Route path="/patient/reports" element={<PatientReports />} />
                <Route path="/patient/settings" element={<PatientSettings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DataProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
