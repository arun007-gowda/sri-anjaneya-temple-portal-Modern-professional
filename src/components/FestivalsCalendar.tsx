import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FESTIVALS_EVENTS, TEMPLE_INFO } from '../data/templeData';
import { FestivalEvent } from '../types';
import { Calendar, Clock, MapPin, Navigation, Download, CheckCircle2 } from 'lucide-react';

export const FestivalsCalendar: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  // Generate real downloadable .ics calendar file for the festival
  const downloadCalendarIcs = (event: FestivalEvent) => {
    const title = event.name.en;
    const desc = `${event.description.en} - Anjaneya Swamy Temple, Thappagondanahalli.`;
    const loc = 'Anjaneya Swamy Temple, Thappagondanahalli, Karnataka, India (14.425401, 76.8516294)';
    
    // Sample date format for recurring event
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Anjaneya Swamy Temple Thappagondanahalli//Festival Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${loc}`,
      `DTSTART:20261201T040000Z`,
      `DTEND:20261201T150000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessId(event.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  return (
    <section id="festivals-section" className="py-20 lg:py-28 bg-[#F7F4EE] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309] tracking-widest uppercase mb-3">
            <Calendar className="w-4 h-4" />
            <span>{isEn ? 'Sacred Observances' : 'ವಾರ್ಷಿಕ ಜಾತ್ರೆ ಹಾಗೂ ಉತ್ಸವಗಳು'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 leading-tight mb-4">
            {isEn ? 'Festivals & Utsavas' : 'ಉತ್ಸವಗಳು ಮತ್ತು ಹಬ್ಬಗಳ ವೇಳಾಪಟ್ಟಿ'}
          </h2>

          <p className="text-base sm:text-lg font-editorial italic text-stone-700 leading-relaxed">
            {isEn
              ? 'Traditional annual festivals observed with profound devotion by the devotees of Anjaneya Swamy Temple and Thappagondanahalli.'
              : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ಸನ್ನಿಧಾನದಲ್ಲಿ ಭಕ್ತಿಯಿಂದ ನೆರವೇರುವ ವಾರ್ಷಿಕ ಉತ್ಸವಗಳು.'}
          </p>
        </div>

        {/* Festival Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FESTIVALS_EVENTS.map((fest) => (
            <div
              key={fest.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-[#701A28] font-semibold tracking-wider">
                    {fest.lunarMonth[language]}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                    {isEn ? 'Verified Festival' : 'ದೃಢೀಕೃತ ಉತ್ಸವ'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-900 mb-3">
                  {fest.name[language]}
                </h3>

                <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans mb-6">
                  {fest.description[language]}
                </p>

                {/* Traditions List */}
                <div className="mb-6 pt-4 border-t border-stone-100">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-3">
                    {isEn ? 'Sacred Ritual Traditions:' : 'ಪ್ರಮುಖ ಪೂಜಾ ವಿಧಿವಿಧಾನಗಳು:'}
                  </h4>
                  <ul className="space-y-2">
                    {fest.traditions[language].map((trad, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] shrink-0" />
                        <span>{trad}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Location Information */}
                <div className="flex items-center gap-2 text-xs text-stone-600 mb-6 bg-stone-50 p-3 rounded-lg border border-stone-200">
                  <MapPin className="w-4 h-4 text-[#B45309] shrink-0" />
                  <span className="font-medium truncate">
                    {isEn ? 'Thappagondanahalli Village Temple' : 'ತಪಗೊಂಡನಹಳ್ಳಿ ಗ್ರಾಮ ದೇವಾಲಯ'}
                  </span>
                </div>
              </div>

              {/* Functional CTA Buttons */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => downloadCalendarIcs(fest)}
                  className="flex-1 min-w-[140px] px-3.5 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {downloadSuccessId === fest.id ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{isEn ? 'Saved (.ics)' : 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಲಾಗಿದೆ'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-stone-600" />
                      <span>{isEn ? 'Add to Calendar' : 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ'}</span>
                    </>
                  )}
                </button>

                <a
                  href={TEMPLE_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] px-3.5 py-2.5 text-xs font-semibold text-white bg-[#701A28] hover:bg-[#58131E] rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-amber-300" />
                  <span>{isEn ? 'Get Directions' : 'ಮಾರ್ಗದರ್ಶನ'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
