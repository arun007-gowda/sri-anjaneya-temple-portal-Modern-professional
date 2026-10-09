import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HeartHandshake, ShieldAlert, Check, Sparkles, Building2, Utensils } from 'lucide-react';

export const DonationSection: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const causes = [
    {
      icon: Building2,
      title: isEn ? 'Sanctum Maintenance & Renovation' : 'ಗರ್ಭಗುಡಿ ನಿರ್ವಹಣೆ ಹಾಗೂ ಜೀರ್ಣೋದ್ಧಾರ',
      desc: isEn
        ? 'Preserving the historic granite stonework, sanctum lighting, and compound walls for future generations.'
        : 'ಪುರಾತನ ಶಿಲಾ ಗರ್ಭಗುಡಿಯ ಸಂರಕ್ಷಣೆ, ವಿದ್ಯುದ್ದೀಪ ಹಾಗೂ ಪ್ರಾಕಾರದ ಸುಸ್ಥಿತಿ ನಿರ್ವಹಣೆ.',
    },
    {
      icon: Utensils,
      title: isEn ? 'Nitya Pooja & Daily Deeparadhana' : 'ನಿತ್ಯ ಪೂಜೆ ಹಾಗೂ ದೀಪಾರಾಧನೆ',
      desc: isEn
        ? 'Supporting daily oil, floral garlands, incense, and camphor offerings in the sanctum.'
        : 'ನಿತ್ಯ ದೀಪಕ್ಕೆ ಎಳ್ಳೆಣ್ಣೆ, ಹೂವು, ಹಣ್ಣು-ಕಾಯಿ ಹಾಗೂ ಧೂಪ-ದೀಪಗಳ ನಿರಂತರ ಸೇವೆ.',
    },
    {
      icon: Sparkles,
      title: isEn ? 'Maha Annadana (Community Feasts)' : 'ಮಹಾ ಅನ್ನದಾನ ಸೇವೆ',
      desc: isEn
        ? 'Providing prasada meals for thousands of devotees who travel from across Karnataka during Hanuman Jayanti.'
        : 'ಹನುಮ ಜಯಂತಿ ಮತ್ತು ವಾರ್ಷಿಕ ಜಾತ್ರೆಗೆ ಆಗಮಿಸುವ ನೂರಾರು ಭಕ್ತರಿಗೆ ಸಾತ್ವಿಕ ಅನ್ನಪ್ರಸಾದ ಸೇವೆ.',
    },
  ];

  return (
    <section id="donation-section" className="py-20 lg:py-28 bg-[#F7F4EE] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#701A28] tracking-widest uppercase mb-3">
            <HeartHandshake className="w-4 h-4" />
            <span>{isEn ? 'Devotee Contributions' : 'ಭಕ್ತರ ಸೇವಾ ಕಾಣಿಕೆ'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 leading-tight mb-4">
            {isEn ? 'Support Anjaneya Swamy Temple' : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇಗುಲದ ಸೇವೆಗೆ ಕೈಜೋಡಿಸಿ'}
          </h2>

          <p className="text-base sm:text-lg font-editorial italic text-stone-700 leading-relaxed">
            {isEn
              ? 'Our spiritual sanctuary thrives on the collective goodwill, devotion, and voluntary contributions of devotees and villagers.'
              : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿಯ ಸನ್ನಿಧಾನವು ಭಕ್ತರ ಶ್ರದ್ಧಾಭಕ್ತಿ ಹಾಗೂ ಸ್ವಯಂಪ್ರೇರಿತ ಸಹಕಾರದಿಂದ ಸದಾ ಬೆಳಗುತ್ತಿದೆ.'}
          </p>
        </div>

        {/* 3 Pillars of Devotional Support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {causes.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-[#701A28] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-cinzel font-bold text-stone-900 mb-2">
                  {c.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* MANDATORY AUTHENTICITY NOTICE & STATUS CARD */}
        <div className="bg-white rounded-2xl border border-amber-300/80 p-8 sm:p-10 shadow-sm max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-stone-900 mb-1">
                  {isEn ? 'Official Financial Transparency Policy' : 'ಅಧಿಕೃತ ಹಣಕಾಸು ಪಾರದರ್ಶಕತೆ ನೀತಿ'}
                </h3>
                <span className="text-xs font-mono text-[#B45309] font-medium uppercase tracking-wider">
                  {isEn ? 'Authenticity Protocol Enforced' : 'ಸತ್ಯನಿಷ್ಠೆ ನಿಯಮಾವಳಿ ಅನ್ವಯ'}
                </span>
              </div>

              {/* Exact user-mandated sentence */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-sm sm:text-base font-serif italic leading-relaxed">
                &ldquo;
                {isEn
                  ? 'Donation information will be published here after verification by the temple committee.'
                  : 'ದೇವಸ್ಥಾನ ಸಮಿತಿಯ ಪರಿಶೀಲನೆಯ ನಂತರ ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಖಾತೆ ಹಾಗೂ ದೇಣಿಗೆ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗುವುದು.'}
                &rdquo;
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                <p>
                  {isEn
                    ? 'In strict accordance with our authenticity and cyber-safety guidelines, this website never publishes unverified UPI IDs, personal bank accounts, or unauthorized QR codes.'
                    : 'ಸೈಬರ್ ಸುರಕ್ಷತೆ ಹಾಗೂ ಸತ್ಯನಿಷ್ಠೆಯ ನಿಯಮದಂತೆ, ಈ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಯಾವುದೇ ಅನಧಿಕೃತ ಯುಪಿಐ ಐಡಿಗಳು ಅಥವಾ ವೈಯಕ್ತಿಕ ಖಾತೆ ವಿವರಗಳನ್ನು ನೀಡಲಾಗುವುದಿಲ್ಲ.'}
                </p>
                <p>
                  {isEn
                    ? 'Devotees wishing to contribute are warmly requested to visit Anjaneya Swamy Temple in person at Thappagondanahalli village or contact the recognized village committee directly.'
                    : 'ಸೇವೆ ಸಲ್ಲಿಸಲು ಇಚ್ಛಿಸುವ ಭಕ್ತರು ತಪಗೊಂಡನಹಳ್ಳಿಯ ದೇವಸ್ಥಾನಕ್ಕೆ ಖುದ್ದಾಗಿ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ಗ್ರಾಮ ಸಮಿತಿಯ ಜವಾಬ್ದಾರಿಯುತರನ್ನು ಸಂಪರ್ಕಿಸಿ ರಸೀದಿಯೊಂದಿಗೆ ಕಾಣಿಕೆ ನೀಡಲು ವಿನಂತಿ.'}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center gap-4 text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isEn ? 'Zero fabricated payment routes' : 'ಯಾವುದೇ ನಕಲಿ ಪಾವತಿ ಲಿಂಕ್ ಇಲ್ಲ'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{isEn ? 'Physical receipt upon visit' : 'ಸ್ಥಳದಲ್ಲೇ ಅಧಿಕೃತ ರಸೀದಿ ವ್ಯವಸ್ಥೆ'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
