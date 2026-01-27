import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Doctor } from '@/contexts/AuthContext';
import { useData, Report } from '@/contexts/DataContext';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';
import dashboardBg from '@/assets/dashboard-bg.jpg';
import { FileText, Download, Eye, File } from 'lucide-react';

const DoctorReports: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getReportsByDoctor, updateReport, patients } = useData();
  
  const doctor = user as Doctor;
  const reports = getReportsByDoctor(doctor?.id || '');

  const handleDownload = (report: Report) => {
    if (report.fileData && report.fileName) {
      // Download actual uploaded file
      const link = document.createElement('a');
      link.href = report.fileData;
      link.download = report.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback: Create a text file with report details
      const patient = patients.find(p => p.id === report.patientId);
      const content = `
Report: ${report.title}
Patient: ${patient?.name || 'Unknown'}
Date: ${new Date(report.createdAt).toLocaleDateString()}
Description: ${report.description}
Status: ${report.status}
      `.trim();

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.title.replace(/\s+/g, '_')}_report.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleMarkReviewed = (report: Report) => {
    updateReport({ ...report, status: 'reviewed' });
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
              <h1 className="font-display text-3xl font-bold text-foreground">{t('reports')}</h1>
              <p className="text-muted-foreground mt-1">{t('viewManageReports')}</p>
            </div>
            <LanguageSelector />
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {reports.map((report) => {
              const patient = patients.find(p => p.id === report.patientId);
              return (
                <div key={report.id} className="ayur-card flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-earth to-terracotta flex items-center justify-center">
                      <FileText className="w-7 h-7 text-earth-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{t('patient')}: {patient?.name || 'Unknown'}</p>
                      {report.fileName && (
                        <p className="text-xs text-primary flex items-center gap-1 mt-1">
                          <File className="w-3 h-3" />
                          {report.fileName}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">{new Date(report.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`status-${report.status}`}>
                      {t(report.status)}
                    </span>
                    
                    {report.status !== 'reviewed' && (
                      <button
                        onClick={() => handleMarkReviewed(report)}
                        className="px-4 py-2 rounded-lg bg-herb/10 text-herb hover:bg-herb/20 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        {t('markReviewed')}
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDownload(report)}
                      className="ayur-btn-primary flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {t('download')}
                    </button>
                  </div>
                </div>
              );
            })}

            {reports.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <FileText className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('noReportsYet')}</h3>
                <p className="text-muted-foreground">{t('patientReportsAppear')}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorReports;
