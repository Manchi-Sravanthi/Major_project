import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, Patient } from '@/contexts/AuthContext';
import { useData, Report } from '@/contexts/DataContext';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';
import { FileText, Download, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

const PatientReports: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getReportsByPatient, addReport, addNotification } = useData();

  const patient = user as Patient;
  const reports = getReportsByPatient(patient?.id || '');

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    const newReport: Report = {
      id: `report_${Date.now()}`,
      patientId: patient?.id || '',
      doctorId: patient?.doctorId || '',
      title: formData.title,
      description: formData.description,
      fileUrl: '',
      status: 'uploaded',
      createdAt: new Date().toISOString(),
    };

    addReport(newReport);

    // Notify doctor
    addNotification({
      id: `notif_${Date.now()}`,
      userId: patient?.doctorId || '',
      userType: 'doctor',
      message: t('reportUploaded'),
      type: 'report_uploaded',
      read: false,
      createdAt: new Date().toISOString(),
    });

    toast.success('Report uploaded successfully');
    setShowUploadModal(false);
    setFormData({ title: '', description: '' });
  };

  const handleDownload = (report: Report) => {
    const content = `
Report: ${report.title}
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
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="patient" />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{t('myReports')}</h1>
            <p className="text-muted-foreground mt-1">View and upload your medical reports</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowUploadModal(true)}
              className="ayur-btn-primary flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              {t('uploadReport')}
            </button>
            <LanguageSelector />
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="ayur-card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-earth to-terracotta flex items-center justify-center">
                  <FileText className="w-7 h-7 text-earth-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <p className="text-xs text-muted-foreground">{new Date(report.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`status-${report.status}`}>
                  {t(report.status)}
                </span>
                <button
                  onClick={() => handleDownload(report)}
                  className="ayur-btn-accent flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {t('download')}
                </button>
              </div>
            </div>
          ))}

          {reports.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <FileText className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No reports yet</h3>
              <p className="text-muted-foreground mb-4">Upload your first medical report</p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="ayur-btn-primary"
              >
                {t('uploadReport')}
              </button>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setShowUploadModal(false)} />
            <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4">
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h2 className="font-display text-xl font-semibold">{t('uploadReport')}</h2>
                <button onClick={() => setShowUploadModal(false)} className="p-2 rounded-full hover:bg-secondary">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleUpload} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Report Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="ayur-input"
                    placeholder="e.g., Blood Test Report"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="ayur-input h-24"
                    placeholder="Brief description of the report"
                  />
                </div>

                <div className="p-4 rounded-lg border-2 border-dashed border-border text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">File upload simulated</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowUploadModal(false)} className="flex-1 px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-colors">
                    {t('cancel')}
                  </button>
                  <button type="submit" className="flex-1 ayur-btn-primary">
                    {t('submit')}
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

export default PatientReports;
