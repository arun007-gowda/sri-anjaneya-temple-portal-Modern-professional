import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { POOJA_SEVAS } from '../data/templeData';
import { SevaItem } from '../types';
import { Sparkles, Clock, MessageSquare, AlertCircle } from 'lucide-react';

export const PoojaSevaSection: React.FC = () => {
  const { language, setIsSevaEnquiryOpen, setSelectedSevaId } = useLanguage();
  const isEn = language === 'en';

  const handleEnquire = (seva: SevaItem) => {
    setSelectedSevaId(seva.id);
    setIsSevaEnquiryOpen(true);
  };

  return (
    <section id="seva-section" className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#701A28] tracking-widest uppercase mb-3">
            <Sparkles className="w-4 h-4" />
            <span>{isEn ? 'Sacred Worship Offerings' : 'ಪೂಜಾ ಸೇವೆಗಳು'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 leading-tight mb-4">
            {isEn ? 'Seva & Pooja at Anjaneya Swamy Temple' : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ಸನ್ನಿಧಿಯಲ್ಲಿ ಸೇವಾ ವಿವರಗಳು'}
          </h2>

          <p className="text-base sm:text-lg font-editorial italic text-stone-700 leading-relaxed">
            {isEn
              ? 'Worship services performed in accordance with traditional Vedic and rural Agamic practices. Offerings are conducted in person at the temple.'
              : 'ಸಾಂಪ್ರದಾಯಿಕ ವಿಧಿ-ವಿಧಾನಗಳಂತೆ ನೆರವೇರುವ ಸೇವೆಗಳು. ಭಕ್ತರು ಖುದ್ದಾಗಿ ದೇವಸ್ಥಾನಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ಸೇವೆ ಸಲ್ಲಿಸಬಹುದು.'}
          </p>
        </div>

        {/* Notice on Authenticity */}
        <div className="mb-10 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="leading-relaxed">
            {isEn
              ? 'Notice: Online automated payment bookings are intentionally disabled until officially approved by the temple committee. Please use the enquiry action below or contact the local committee upon visiting Thappagondanahalli.'
              : 'ಸೂಚನೆ: ದೇವಸ್ಥಾನ ಸಮಿತಿಯು ಅಧಿಕೃತವಾಗಿ ಅನುಮೋದಿಸುವವರೆಗೆ ಆನ್‌ಲೈನ್ ಪಾವತಿ ವ್ಯವಸ್ಥೆಯನ್ನು ಜಾರಿಗೆ ತಂದಿಲ್ಲ. ಭಕ್ತರು ಖುದ್ದಾಗಿ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ಕೆಳಗಿನ ವಿಚಾರಣಾ ಫಾರಂ ಮೂಲಕ ಸಂಪರ್ಕಿಸಬಹುದು.'}
          </p>
        </div>

        {/* Seva Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {POOJA_SEVAS.map((seva) => (
            <div
              key={seva.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg sm:text-xl font-cinzel font-bold text-stone-900">
                    {seva.name[language]}
                  </h3>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded font-medium shrink-0 ${
                      seva.status === 'VERIFIED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-stone-100 text-stone-600 border border-stone-200'
                    }`}
                  >
                    {seva.status === 'VERIFIED'
                      ? isEn
                        ? 'Daily Tradition'
                        : 'ನಿತ್ಯ ಸೇವೆ'
                      : isEn
                      ? 'Committee Confirmation Pending'
                      : 'ಸಮಿತಿ ದೃಢೀಕರಣ ನಿರೀಕ್ಷೆಯಲ್ಲಿದೆ'}
                  </span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed font-sans mb-4">
                  {seva.description[language]}
                </p>

                <div className="space-y-2 py-3 border-t border-stone-100 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span className="font-medium text-stone-800">{isEn ? 'Schedule:' : 'ಸಮಯ:'}</span>
                    <span>{seva.timing[language]}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-stone-700 shrink-0">{isEn ? 'Offering:' : 'ಕಾಣಿಕೆ:'}</span>
                    <span className="italic text-stone-600">{seva.offeringNote[language]}</span>
                  </div>
                </div>
              </div>

              {/* Seva Action */}
              <div className="pt-4 border-t border-stone-200 mt-4 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-mono">
                  {isEn ? 'In-person / Local' : 'ಸ್ಥಳದಲ್ಲೇ ನಿರ್ವಹಣೆ'}
                </span>
                <button
                  onClick={() => handleEnquire(seva)}
                  className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Enquire About Seva' : 'ಸೇವೆಯ ಬಗ್ಗೆ ವಿಚಾರಿಸಿ'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
