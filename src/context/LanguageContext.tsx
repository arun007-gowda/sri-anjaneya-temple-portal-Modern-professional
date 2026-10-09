import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  isAuditModalOpen: boolean;
  setIsAuditModalOpen: (open: boolean) => void;
  isPhotoModalOpen: boolean;
  setIsPhotoModalOpen: (open: boolean) => void;
  isStoryModalOpen: boolean;
  setIsStoryModalOpen: (open: boolean) => void;
  isDataModalOpen: boolean;
  setIsDataModalOpen: (open: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isSevaEnquiryOpen: boolean;
  setIsSevaEnquiryOpen: (open: boolean) => void;
  selectedSevaId: string | null;
  setSelectedSevaId: (id: string | null) => void;
  scrollToSection: (sectionId: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('temple_lang');
    return (saved === 'kn' || saved === 'en') ? saved : 'en';
  });

  const [activePage, setActivePage] = useState<string>('home');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isSevaEnquiryOpen, setIsSevaEnquiryOpen] = useState<boolean>(false);
  const [selectedSevaId, setSelectedSevaId] = useState<string | null>(null);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('temple_lang', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const scrollToSection = (sectionId: string) => {
    setActivePage('home');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        activePage,
        setActivePage,
        isAuditModalOpen,
        setIsAuditModalOpen,
        isPhotoModalOpen,
        setIsPhotoModalOpen,
        isStoryModalOpen,
        setIsStoryModalOpen,
        isDataModalOpen,
        setIsDataModalOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isSevaEnquiryOpen,
        setIsSevaEnquiryOpen,
        selectedSevaId,
        setSelectedSevaId,
        scrollToSection,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
