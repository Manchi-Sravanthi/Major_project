import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { hospitals } from '@/data/hospitalData';
import LanguageSelector from '@/components/LanguageSelector';
import heroBg from '@/assets/hero-bg.jpg';
import { Building2, Phone, Mail, MapPin, Stethoscope, ArrowLeft, Filter, Search } from 'lucide-react';

const Hospitals: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get unique districts
  const districts = useMemo(() => {
    const uniqueDistricts = [...new Set(hospitals.map(h => h.district))].sort();
    return uniqueDistricts;
  }, []);

  // Filter hospitals by district and search query
  const filteredHospitals = useMemo(() => {
    let result = hospitals;
    
    if (selectedDistrict !== 'all') {
      result = result.filter(h => h.district === selectedDistrict);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(h => 
        h.name.toLowerCase().includes(query) ||
        h.address.toLowerCase().includes(query) ||
        h.district.toLowerCase().includes(query) ||
        h.specialties.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [selectedDistrict, searchQuery]);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/40" />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="p-6 flex justify-between items-center border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground">{t('hospitals')}</h1>
            </div>
          </div>
          <LanguageSelector />
        </header>

        {/* Main Content */}
        <main className="p-6 max-w-7xl mx-auto">
          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchHospitals')}
                className="ayur-input pl-10 w-full"
              />
            </div>
            
            {/* Filter */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">{t('filterByDistrict')}:</span>
              </div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="ayur-input max-w-xs"
              >
                <option value="all">{t('allDistricts')}</option>
                {districts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              <span className="text-muted-foreground">
                {t('showingHospitals')}: {filteredHospitals.length}
              </span>
            </div>
          </div>

          {/* Hospitals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital, index) => (
              <div 
                key={index} 
                className="ayur-card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Hospital Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-herb flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2">
                      {hospital.name}
                    </h3>
                    <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-herb/10 text-herb font-medium">
                      {hospital.type}
                    </span>
                  </div>
                </div>

                {/* Hospital Details */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{hospital.district}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{hospital.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <a 
                      href={`tel:${hospital.phone}`} 
                      className="text-sm text-primary hover:underline"
                    >
                      {hospital.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <a 
                      href={`mailto:${hospital.email}`} 
                      className="text-sm text-primary hover:underline truncate"
                    >
                      {hospital.email}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Stethoscope className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{t('specialties')}:</span>{' '}
                      <span className="text-muted-foreground">{hospital.specialties}</span>
                    </p>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>{t('doctors')}: {hospital.numberOfDoctors}</span>
                  <span>{t('beds')}: {hospital.bedStrength}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredHospitals.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <Building2 className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('noHospitalsFound')}</h3>
              <p className="text-muted-foreground">{t('tryDifferentDistrict')}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Hospitals;
