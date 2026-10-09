import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TempleEmblem } from './SacredIcons';
import { Menu, X, ShieldCheck, Calendar, Bell, PlusCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    activePage,
    setActivePage,
    setIsAuditModalOpen,
    setIsAdminModalOpen,
    setIsDataModalOpen,
    scrollToSection,
  } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isEn = language === 'en';

  const navLinks = [
    { id: 'about', label: isEn ? 'About' : 'ಪರಿಚಯ', sectionId: 'about-section' },
    { id: 'history', label: isEn ? 'History' : 'ಇತಿಹಾಸ', sectionId: 'history-section' },
    { id: 'festivals', label: isEn ? 'Festivals' : 'ಉತ್ಸವಗಳು', sectionId: 'festivals-section' },
    { id: 'seva', label: isEn ? 'Seva & Pooja' : 'ಪೂಜೆ-ಸೇವೆ', sectionId: 'seva-section' },
    { id: 'gallery', label: isEn ? 'Gallery' : 'ಚಿತ್ರಶಾಲೆ', sectionId: 'gallery-section' },
    { id: 'contact', label: isEn ? 'Visit & Contact' : 'ಸಂಪರ್ಕ', sectionId: 'contact-section' },
  ];

  const handleNavClick = (sectionId: string, pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <button
            onClick={() => handleNavClick('hero-section', 'home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Anjaneya Swamy Temple Home"
          >
            <div className="w-12 h-12 rounded-full bg-black border border-amber-500/40 flex items-center justify-center p-0.5 shadow-md group-hover:border-amber-400 transition-all shrink-0 overflow-hidden">
              <TempleEmblem className="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-cinzel font-bold text-[#701A28] tracking-tight group-hover:text-[#58131E] transition-colors leading-tight">
                {isEn ? 'Anjaneya Swamy Temple' : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ'}
              </span>
              <span className="block text-[11px] font-sans text-stone-600 tracking-normal">
                {isEn ? 'Thappagondanahalli · Managed by Gowdru Families' : 'ತಪಗೊಂಡನಹಳ್ಳಿ · ಗೌಡ್ರು ಕುಟುಂಬಗಳ ಆಡಳಿತ'}
              </span>
            </div>
          </button>

          {/* Zone 2: Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.sectionId, link.id)}
                className={`py-1 text-sm transition-colors relative whitespace-nowrap hover:text-[#701A28] ${
                  activePage === link.id
                    ? 'text-[#701A28] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#701A28]'
                    : 'text-stone-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Language switcher, Post Data & Audit) */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Switcher */}
            <div className="flex items-center p-0.5 bg-stone-100 border border-stone-200 rounded-lg text-xs font-medium">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1.5 rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-white text-[#701A28] font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Switch to English"
              >
                English
              </button>
              <button
                onClick={() => setLanguage('kn')}
                className={`px-2.5 py-1.5 rounded-md transition-all font-kannada ${
                  language === 'kn'
                    ? 'bg-[#701A28] text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ"
              >
                ಕನ್ನಡ
              </button>
            </div>

            {/* Public Temple Bulletin / Post Update Quick Action */}
            <button
              onClick={() => setIsDataModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors shadow-2xs"
              title="Post Temple Notice, Seva Update or Historical Lore"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#B45309]" />
              <span>{isEn ? '+ Post Update' : '+ ಮಾಹಿತಿ ಸೇರಿಸಿ'}</span>
            </button>

            {/* Audit / Verified Data Badge */}
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-colors"
              title="View Source Verification Report"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{isEn ? 'Verified Record' : 'ದಾಖಲೆ ಪರಿಶೀಲನೆ'}</span>
            </button>

            {/* Committee Portal Button */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-[#701A28] bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-colors shadow-2xs"
              title="Open Temple Committee & Devotee Booking Dashboard"
            >
              <Calendar className="w-3.5 h-3.5 text-[#701A28]" />
              <span>{isEn ? 'Admin & Bookings' : 'ಆಡಳಿತ & ಬುಕಿಂಗ್'}</span>
            </button>

            {/* Plan Visit Primary Action */}
            <button
              onClick={() => handleNavClick('contact-section', 'contact')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#701A28] hover:bg-[#58131E] rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              {isEn ? 'Plan Your Visit' : 'ಭೇಟಿಯ ವಿವರ'}
            </button>
          </div>

          {/* Mobile Menu & Language Toggle for Small Devices */}
          <div className="flex items-center gap-2 sm:hidden">
            {/* Mobile Lang Button */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
              className="px-2 py-1 text-xs font-medium rounded bg-stone-100 border border-stone-300 text-[#701A28]"
            >
              {language === 'en' ? 'ಕನ್ನಡ' : 'English'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-stone-200 bg-[#FBF9F5] px-4 pt-3 pb-6 shadow-xl">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.sectionId, link.id)}
                className="text-left px-3 py-2 rounded-md text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-[#701A28]"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAuditModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg text-stone-700 bg-stone-100 border border-stone-300"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{isEn ? 'View Data Verification Report' : 'ಪರಿಶೀಲಿಸಿದ ದಾಖಲೆಗಳ ವರದಿ'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg text-[#701A28] bg-amber-50 border border-amber-300 shadow-2xs"
            >
              <Calendar className="w-4 h-4 text-[#701A28]" />
              <span>{isEn ? 'Admin & Booking Dashboard' : 'ಆಡಳಿತ ಮತ್ತು ಬುಕಿಂಗ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'}</span>
            </button>

            <a
              href="https://maps.app.goo.gl/etwqM3uwJgdi93HK8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-[#701A28] rounded-lg shadow-sm"
            >
              {isEn ? 'Open in Google Maps' : 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ವೀಕ್ಷಿಸಿ'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
