import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TempleEmblem, BrassDiyaIcon } from './SacredIcons';
import { TEMPLE_INFO } from '../data/templeData';
import { LegalModal } from './LegalModals';
import { MapPin, Navigation, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, scrollToSection, setActivePage, setIsAuditModalOpen, setIsAdminModalOpen } = useLanguage();
  const isEn = language === 'en';

  const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'photo-policy' | 'donation-policy' | null>(null);

  const navLinks = [
    { label: isEn ? 'Home' : 'ಮುಖಪುಟ', target: 'hero-section', page: 'home' },
    { label: isEn ? 'About Sanctum' : 'ಪರಿಚಯ', target: 'about-section', page: 'about' },
    { label: isEn ? 'Temple History' : 'ದೇವಸ್ಥಾನದ ಇತಿಹಾಸ', target: 'history-section', page: 'temple-history' },
    { label: isEn ? 'Village Heritage' : 'ಗ್ರಾಮ ಪರಂಪರೆ', target: 'village-section', page: 'village-history' },
    { label: isEn ? 'Architecture' : 'ಶಿಲ್ಪಕಲೆ', target: 'architecture-section', page: 'architecture' },
    { label: isEn ? 'Festivals & Utsavas' : 'ಉತ್ಸವಗಳು', target: 'festivals-section', page: 'festivals' },
    { label: isEn ? 'Pooja & Seva' : 'ಪೂಜೆ-ಸೇವೆ', target: 'seva-section', page: 'pooja-seva' },
    { label: isEn ? 'Photo Gallery' : 'ಚಿತ್ರಶಾಲೆ', target: 'gallery-section', page: 'gallery' },
    { label: isEn ? 'Support & Donations' : 'ಸೇವಾ ಕಾಣಿಕೆ', target: 'donation-section', page: 'donations' },
    { label: isEn ? 'Contact & Visit' : 'ಸಂಪರ್ಕ', target: 'contact-section', page: 'contact' },
  ];

  return (
    <footer className="bg-[#1C1412] text-stone-200 border-t border-stone-800">
      
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Col 1: Brand & Sacred Commitment (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-black border border-amber-500/40 p-1 shadow-md flex items-center justify-center shrink-0 overflow-hidden">
                <TempleEmblem className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-cinzel font-bold text-amber-100 tracking-tight leading-tight">
                  {TEMPLE_INFO.officialName[language]}
                </h3>
                <p className="text-xs text-amber-300 font-sans tracking-wide">
                  {isEn ? 'Managed by Thappagondanahalli Gowdru Families' : 'ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳ ಆಡಳಿತ'}
                </p>
                <p className="text-[11px] text-stone-400 font-sans">
                  {isEn ? 'Challakere Taluk, Chitradurga, Karnataka' : 'ಚಳ್ಳಕೆರೆ ತಾಲೂಕು, ಚಿತ್ರದುರ್ಗ ಜಿಲ್ಲೆ'}
                </p>
              </div>
            </div>

            <p className="text-base font-editorial italic text-stone-300 leading-relaxed max-w-sm">
              &ldquo;{isEn ? 'Faith, Heritage & Community — Thappagondanahalli' : 'ಶ್ರದ್ಧೆ, ಪರಂಪರೆ ಮತ್ತು ಸಮುದಾಯ — ತಪಗೊಂಡನಹಳ್ಳಿ'}&rdquo;
            </p>

            <p className="text-xs text-stone-400 font-sans leading-relaxed max-w-sm">
              {isEn
                ? 'Serving as the enduring spiritual anchor and guardian threshold of Thappagondanahalli village in Challakere taluk, Chitradurga district.'
                : 'ಚಿತ್ರದುರ್ಗ ಜಿಲ್ಲೆಯ ಚಳ್ಳಕೆರೆ ತಾಲೂಕಿನ ತಪಗೊಂಡನಹಳ್ಳಿಯ ಧಾರ್ಮಿಕ ಹಾಗೂ ಸಾಂಸ್ಕೃತಿಕ ಕೇಂದ್ರ ಬಿಂದು.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={TEMPLE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#701A28] hover:bg-[#58131E] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-300" />
                <span>{isEn ? 'Directions on Google Maps' : 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಮಾರ್ಗ'}</span>
              </a>

              <button
                onClick={() => setIsAuditModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium rounded-lg border border-stone-700 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isEn ? 'Data Audit' : 'ದಾಖಲೆ ಪರಿಶೀಲನೆ'}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold mb-4 pb-2 border-b border-stone-800">
              {isEn ? 'Quick Navigation' : 'ತ್ವರಿತ ಸಂಪರ್ಕಗಳು'}
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActivePage(link.page);
                    scrollToSection(link.target);
                  }}
                  className="text-left text-stone-400 hover:text-amber-200 transition-colors py-1 truncate"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Verified Coordinates & Governance (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold mb-4 pb-2 border-b border-stone-800">
              {isEn ? 'Geographic Reference' : 'ಭೌಗೋಳಿಕ ದಾಖಲೆ'}
            </h4>

            <div className="space-y-2 text-xs text-stone-400 font-sans leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Thappagondanahalli Village<br />
                  Challakere Taluk, Chitradurga<br />
                  Karnataka - 577537
                </span>
              </div>
              <div className="font-mono text-[11px] text-stone-500 pt-1">
                GPS: 14.425401° N, 76.8516294° E
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800">
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="text-xs text-stone-400 hover:text-white underline decoration-stone-600 underline-offset-4"
              >
                {isEn ? 'Temple Committee Admin Portal' : 'ದೇವಸ್ಥಾನ ಸಮಿತಿ ಆಡಳಿತ ಪೋರ್ಟಲ್'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Footer Legal & Copyright Bar */}
      <div className="border-t border-stone-800/80 bg-stone-950 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <button
              onClick={() => setLegalType('privacy')}
              className="hover:text-stone-300 transition-colors"
            >
              {isEn ? 'Privacy Policy' : 'ಗೌಪ್ಯತಾ ನೀತಿ'}
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalType('terms')}
              className="hover:text-stone-300 transition-colors"
            >
              {isEn ? 'Terms of Use' : 'ಬಳಕೆಯ ನಿಯಮಗಳು'}
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalType('photo-policy')}
              className="hover:text-stone-300 transition-colors"
            >
              {isEn ? 'Photo Policy' : 'ಛಾಯಾಚಿತ್ರ ನೀತಿ'}
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalType('donation-policy')}
              className="hover:text-stone-300 transition-colors"
            >
              {isEn ? 'Donation Disclaimer' : 'ದೇಣಿಗೆ ನೀತಿ'}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-1.5 text-center sm:text-right">
            <span>© {new Date().getFullYear()} Anjaneya Swamy Temple, Thappagondanahalli.</span>
            <span className="hidden md:inline">·</span>
            <span className="text-amber-400 font-medium">
              {isEn ? 'Managed by Thappagondanahalli Gowdru Families' : 'ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳ ಆಡಳಿತ'}
            </span>
          </div>

        </div>
      </div>

      {/* Legal Modal Popup */}
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />
    </footer>
  );
};
