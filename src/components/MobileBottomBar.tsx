import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Compass, MessageSquare, Navigation, Bell } from 'lucide-react';
import { TEMPLE_INFO } from '../data/templeData';

export const MobileBottomBar: React.FC = () => {
  const { language, scrollToSection, setActivePage } = useLanguage();
  const isEn = language === 'en';

  return (
    <aside
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-2 py-2 flex items-center justify-around text-xs"
      style={{ maxHeight: '68px' }}
    >
      {/* Directions action */}
      <a
        href={TEMPLE_INFO.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1 text-stone-700 hover:text-[#701A28] transition-colors"
      >
        <MapPin className="w-4 h-4 text-stone-600 mb-0.5" />
        <span className="font-medium truncate max-w-[70px]">
          {isEn ? 'Directions' : 'ಮಾರ್ಗ'}
        </span>
      </a>

      {/* History & Heritage */}
      <button
        onClick={() => {
          setActivePage('temple-history');
          scrollToSection('history-section');
        }}
        className="flex-1 flex flex-col items-center justify-center py-1 text-stone-700 hover:text-[#701A28] transition-colors"
      >
        <Compass className="w-4 h-4 text-[#701A28] mb-0.5" />
        <span className="font-medium truncate max-w-[70px]">
          {isEn ? 'History' : 'ಇತಿಹಾಸ'}
        </span>
      </button>

      {/* Contact Form */}
      <button
        onClick={() => {
          setActivePage('contact');
          scrollToSection('contact-section');
        }}
        className="flex-1 flex flex-col items-center justify-center py-1 text-stone-700 hover:text-emerald-700 transition-colors"
      >
        <MessageSquare className="w-4 h-4 text-emerald-600 mb-0.5" />
        <span className="font-medium truncate max-w-[70px]">
          {isEn ? 'Inquiry' : 'ವಿಚಾರಣೆ'}
        </span>
      </button>

      {/* Plan Visit CTA */}
      <a
        href={TEMPLE_INFO.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center py-2 px-2 bg-[#701A28] text-white rounded-md font-semibold text-center shadow-xs"
      >
        <span className="truncate">{isEn ? 'Visit' : 'ಭೇಟಿ'}</span>
      </a>
    </aside>
  );
};
