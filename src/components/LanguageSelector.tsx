import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-300 backdrop-blur-sm">
        <Globe className="w-4 h-4" />
        <span className="font-medium">
          {language === 'en' ? 'English' : language === 'te' ? 'తెలుగు' : 'हिंदी'}
        </span>
      </button>
      <div className="absolute right-0 mt-2 w-40 bg-card rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <button
          onClick={() => setLanguage('en')}
          className={`w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors rounded-t-lg ${
            language === 'en' ? 'bg-primary/10 text-primary' : ''
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('te')}
          className={`w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors ${
            language === 'te' ? 'bg-primary/10 text-primary' : ''
          }`}
        >
          తెలుగు
        </button>
        <button
          onClick={() => setLanguage('hi')}
          className={`w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors rounded-b-lg ${
            language === 'hi' ? 'bg-primary/10 text-primary' : ''
          }`}
        >
          हिंदी
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
