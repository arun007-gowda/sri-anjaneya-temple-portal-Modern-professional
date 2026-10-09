import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TIMELINE_EVENTS } from '../data/templeData';
import { History, BookCheck, MessageCircleHeart, Info } from 'lucide-react';

export const TempleHistoryTimeline: React.FC = () => {
  const { language, setIsAuditModalOpen } = useLanguage();
  const isEn = language === 'en';

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'DOCUMENTED' | 'TRADITIONAL_ORAL'>('ALL');

  const filteredEvents = TIMELINE_EVENTS.filter((evt) => {
    if (activeFilter === 'ALL') return true;
    return evt.type === activeFilter;
  });

  return (
    <section id="history-section" className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309] tracking-widest uppercase mb-3">
            <History className="w-4 h-4" />
            <span>{isEn ? 'Chronological Chronicle' : 'ಕಾಲಾನುಕ್ರಮ ಇತಿಹಾಸ'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 leading-tight mb-4">
            {isEn ? 'The Story of Anjaneya Swamy Temple' : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನದ ಇತಿಹಾಸ'}
          </h2>

          <p className="text-base sm:text-lg font-editorial italic text-stone-700 leading-relaxed">
            {isEn
              ? 'A faithful preservation of our heritage, maintaining a transparent distinction between documented historical records and cherished village oral traditions.'
              : 'ದಾಖಲಿತ ಇತಿಹಾಸ ಮತ್ತು ಹಿರಿಯರ ಮೌಖಿಕ ನಂಬಿಕೆಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರತ್ಯೇಕಿಸಿ ಸತ್ಯನಿಷ್ಠೆಯಿಂದ ದಾಖಲಿಸಲಾದ ಪವಿತ್ರ ಚರಿತ್ರೆ.'}
          </p>
        </div>

        {/* Filter Bar (Zero-pill compliant interactive segmented controls) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 border border-stone-200 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeFilter === 'ALL'
                  ? 'bg-white text-stone-900 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isEn ? 'All Chapters' : 'ಎಲ್ಲಾ ಅಧ್ಯಾಯಗಳು'}
            </button>
            <button
              onClick={() => setActiveFilter('DOCUMENTED')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                activeFilter === 'DOCUMENTED'
                  ? 'bg-white text-[#701A28] font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isEn ? 'Documented History' : 'ದಾಖಲಿತ ಇತಿಹಾಸ'}</span>
            </button>
            <button
              onClick={() => setActiveFilter('TRADITIONAL_ORAL')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                activeFilter === 'TRADITIONAL_ORAL'
                  ? 'bg-white text-[#B45309] font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MessageCircleHeart className="w-3.5 h-3.5 text-amber-600" />
              <span>{isEn ? 'Oral History & Traditions' : 'ಮೌಖಿಕ ಪರಂಪರೆ'}</span>
            </button>
          </div>

          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1.5 transition-colors"
          >
            <Info className="w-3.5 h-3.5 text-amber-700" />
            <span>{isEn ? 'How we classify historical claims' : 'ದಾಖಲೆಗಳ ಪರಿಶೀಲನಾ ವಿಧಾನ'}</span>
          </button>
        </div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {filteredEvents.map((evt, idx) => (
            <div
              key={evt.id}
              className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                evt.type === 'DOCUMENTED'
                  ? 'bg-white border-stone-200 shadow-xs'
                  : 'bg-amber-50/30 border-amber-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                {/* Clean unboxed metadata separator */}
                <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                  <span className="font-semibold text-[#701A28]">{evt.period[language]}</span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">
                    {evt.type === 'DOCUMENTED'
                      ? isEn
                        ? 'Documented Record'
                        : 'ದಾಖಲಿತ ಚರಿತ್ರೆ'
                      : isEn
                      ? 'Local Oral Tradition'
                      : 'ಮೌಖಿಕ ಪರಂಪರೆ'}
                  </span>
                </div>

                <div
                  className={`text-xs px-2.5 py-1 rounded font-medium ${
                    evt.type === 'DOCUMENTED'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100/70 text-amber-900 border border-amber-300/80'
                  }`}
                >
                  {evt.type === 'DOCUMENTED'
                    ? isEn
                      ? 'Historically Documented'
                      : 'ಐತಿಹಾಸಿಕವಾಗಿ ದಾಖಲಾಗಿದೆ'
                    : isEn
                    ? 'According to local tradition...'
                    : 'ಸ್ಥಳೀಯ ಮೌಖಿಕ ಪರಂಪರೆಯ ಪ್ರಕಾರ...'}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-900 mb-3">
                {evt.title[language]}
              </h3>

              <p className="text-stone-700 font-sans text-sm sm:text-base leading-relaxed mb-4">
                {evt.description[language]}
              </p>

              {evt.source && (
                <div className="pt-3 border-t border-stone-200/80 text-xs text-stone-500 flex items-center gap-2">
                  <span className="font-medium text-stone-700">{isEn ? 'Source:' : 'ಆಧಾರ:'}</span>
                  <span className="italic">{evt.source}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Committee Clarification Invitation */}
        <div className="mt-12 p-6 rounded-xl bg-stone-100 border border-dashed border-stone-300 text-center max-w-2xl mx-auto">
          <p className="text-xs text-stone-600 leading-relaxed">
            {isEn
              ? 'Notice: If you possess historical inscriptions, copper plates, or family records pertaining to Anjaneya Swamy Temple, Thappagondanahalli, please contact the temple committee so they can be formally archived.'
              : 'ಸೂಚನೆ: ತಪಗೊಂಡನಹಳ್ಳಿಯ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇಗುಲಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಾಚೀನ ಶಾಸನ, ತಾಮ್ರಪತ್ರ ಅಥವಾ ದಾಖಲೆಗಳು ನಿಮ್ಮಲ್ಲಿದ್ದರೆ, ಸಮಿತಿಯೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲು ವಿನಂತಿ.'}
          </p>
        </div>

      </div>
    </section>
  );
};
