import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  TEMPLE_CHRONICLES_DATA,
  DAILY_DARSHAN_SCHEDULE,
  TEMPLE_INFO,
} from '../data/templeData';
import {
  BookOpen,
  Clock,
  Sparkles,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Share2,
  Calendar,
  Flame,
  Sun,
  Moon,
} from 'lucide-react';
import { copyShareLink } from './SharedLinkAdapter';

export const TempleChroniclesSection: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<'schedule' | 'chronicles' | 'gowdru' | 'features'>('schedule');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareSection = async () => {
    const success = await copyShareLink(
      { section: 'temple-chronicles-section', lang: language },
      isEn ? 'Temple Chronicles & Daily Schedule' : 'ದೇವಸ್ಥಾನದ ಸಮಗ್ರ ಚರಿತ್ರೆ ಹಾಗೂ ಪೂಜಾ ಕಾಲಮಾನ',
      isEn
        ? 'Explore authentic daily pooja schedules and oral chronicles of Sri Anjaneya Swamy Temple, Thappagondanahalli.'
        : 'ತಪಗೊಂಡನಹಳ್ಳಿ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನದ ನಿತ್ಯ ಪೂಜಾ ವಿವರಗಳು ಹಾಗೂ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು.'
    );
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section
      id="temple-chronicles-section"
      className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-stone-200 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Share Section CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#701A28] tracking-widest uppercase mb-3">
              <BookOpen className="w-4 h-4 text-[#B45309]" />
              <span>{isEn ? 'Archival Documentation' : 'ಪಾರಂಪರಿಕ ದಾಖಲೆಗಳು ಹಾಗೂ ಕಾಲಮಾನ'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 leading-tight mb-4">
              {isEn ? 'Temple Chronicles & Sacred Timings' : 'ಕ್ಷೇತ್ರ ಚರಿತ್ರೆ ಹಾಗೂ ನಿತ್ಯ ಪೂಜಾ ಕಾಲಮಾನ'}
            </h2>

            <p className="text-base sm:text-lg font-editorial italic text-stone-700 leading-relaxed">
              {isEn
                ? 'Authentic historical traditions, daily darshana schedule, and hereditary Gowdru family stewardship of Sri Anjaneya Swamy Temple.'
                : 'ತಪಗೊಂಡನಹಳ್ಳಿ ಅಂಜನೇಯ ಸ್ವಾಮಿ ಸನ್ನಿಧಾನದ ನಿತ್ಯ ದರ್ಶನ ಸಮಯ, ಸ್ಥಳ ಪುರಾಣ ಹಾಗೂ ಗೌಡ್ರು ಮನೆತನಗಳ ಸೇವಾ ಪರಂಪರೆ.'}
            </p>
          </div>

          <button
            onClick={handleShareSection}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg shadow-xs transition-colors self-start md:self-auto shrink-0"
            title="Share this information"
          >
            <Share2 className="w-4 h-4 text-[#701A28]" />
            <span>{copiedLink ? (isEn ? 'Link Copied!' : 'ಲಿಂಕ್ ನಕಲಾಗಿದೆ!') : (isEn ? 'Share Temple Records' : 'ದಾಖಲೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ')}</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-2 ${
              activeTab === 'schedule'
                ? 'bg-[#701A28] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{isEn ? 'Daily Pooja Schedule' : 'ನಿತ್ಯ ಪೂಜಾ ಕಾಲಮಾನ'}</span>
          </button>

          <button
            onClick={() => setActiveTab('chronicles')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-2 ${
              activeTab === 'chronicles'
                ? 'bg-[#701A28] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{isEn ? 'Sthala Purana & Origins' : 'ಸ್ಥಳ ಪುರಾಣ & ಐತಿಹ್ಯ'}</span>
          </button>

          <button
            onClick={() => setActiveTab('gowdru')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-2 ${
              activeTab === 'gowdru'
                ? 'bg-[#701A28] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isEn ? 'Gowdru Hereditary Stewardship' : 'ಗೌಡ್ರು ಕುಟುಂಬಗಳ ಸೇವಾ ಪರಂಪರೆ'}</span>
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-2 ${
              activeTab === 'features'
                ? 'bg-[#701A28] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isEn ? 'Sacred Kshetra Features' : 'ಕ್ಷೇತ್ರದ ವೈಶಿಷ್ಟ್ಯಗಳು'}</span>
          </button>
        </div>

        {/* Tab 1: Daily Schedule */}
        {activeTab === 'schedule' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sun className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">
                    {isEn ? 'Sarva Darshana Open Daily' : 'ಪ್ರತಿದಿನ ಸರ್ವ ದರ್ಶನ ಲಭ್ಯ'}
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {isEn
                      ? 'Morning: 06:00 AM – 01:00 PM | Evening: 05:30 PM – 08:30 PM (Special Tailabhisheka every Saturday)'
                      : 'ಬೆಳಗ್ಗೆ: ೦೬:೦೦ ರಿಂದ ೦೧:೦೦ | ಸಂಜೆ: ೦೫:೩೦ ರಿಂದ ೦೮:೩೦ (ಪ್ರತಿ ಶನಿವಾರ ವಿಶೇಷ ತೈಲಾಭಿಷೇಕ)'}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{isEn ? 'Sanctum Open' : 'ದರ್ಶನ ತೆರೆದಿದೆ'}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DAILY_DARSHAN_SCHEDULE.map((slot, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-amber-700 font-mono mb-2">
                      <span className="font-semibold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        {slot.time}
                      </span>
                      <span className="text-stone-500 text-[11px]">
                        {isEn ? 'Daily Ritual' : 'ನಿತ್ಯ ಕೈಂಕರ್ಯ'}
                      </span>
                    </div>

                    <h4 className="text-base font-cinzel font-bold text-stone-900 mb-1.5">
                      {isEn ? slot.ritualEn : slot.ritualKn}
                    </h4>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {isEn ? slot.significanceEn : slot.significanceKn}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isEn ? 'Public Darshan Permitted' : 'ಸಾರ್ವಜನಿಕರಿಗೆ ಮುಕ್ತ'}
                    </span>
                    <span>Thappagondanahalli</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Sthala Purana & Origins */}
        {activeTab === 'chronicles' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 animate-in fade-in duration-300">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-cinzel font-bold text-stone-900 mb-4">
                {isEn ? 'Sthala Purana & Cultural Manifestation' : 'ಸ್ಥಳ ಪುರಾಣ ಹಾಗೂ ಐತಿಹಾಸಿಕ ಹಿನ್ನೆಲೆ'}
              </h3>
              <p className="text-stone-700 font-editorial text-base sm:text-lg leading-relaxed mb-6 italic">
                &ldquo;{isEn ? TEMPLE_CHRONICLES_DATA.sthalaPurana.en : TEMPLE_CHRONICLES_DATA.sthalaPurana.kn}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 border-t border-stone-100 text-xs">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-amber-800 font-semibold block mb-1">
                  {isEn ? 'Nayaka Lineage Influence' : 'ಚಿತ್ರದುರ್ಗ ನಾಯಕರ ಪ್ರಭಾವ'}
                </span>
                <p className="text-stone-600 leading-relaxed">
                  {isEn
                    ? 'Hanuman was venerated as the supreme warrior guardian (Vira Anjaneya) across the Madakari Nayaka realm.'
                    : 'ಚಿತ್ರದುರ್ಗದ ಮದಕರಿ ನಾಯಕರ ಆಡಳಿತದಲ್ಲಿ ಹನುಮಂತನನ್ನು ಶೌರ್ಯ, ನಿಸ್ವಾರ್ಥ ಸೇವೆ ಹಾಗೂ ಧೈರ್ಯದ ಪ್ರತೀಕವೆಂದು ಆರಾಧಿಸಲಾಯಿತು.'}
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-amber-800 font-semibold block mb-1">
                  {isEn ? 'Agrarian Kshetrapala' : 'ಕೃಷಿಕರ ಕಾವಲು ದೇವತೆ'}
                </span>
                <p className="text-stone-600 leading-relaxed">
                  {isEn
                    ? 'Farmers never begin plowing or harvesting groundnut and ragi without placing their sickles and seeds before the deity.'
                    : 'ಹಳ್ಳಿಯ ರೈತರು ಬಿತ್ತನೆ ಮತ್ತು ಕಟಾವಿಗೆ ಮುನ್ನ ತಮ್ಮ ಮೊದಲ ಕೃಷಿ ದ್ರವ್ಯಗಳನ್ನು ಸ್ವಾಮಿಯ ಪಾದಕ್ಕೆ ಸಮರ್ಪಿಸಿ ಪೂಜಿಸುತ್ತಾರೆ.'}
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-amber-800 font-semibold block mb-1">
                  {isEn ? 'Living Oral Tradition' : 'ಜೀವಂತ ಮೌಖಿಕ ಪರಂಪರೆ'}
                </span>
                <p className="text-stone-600 leading-relaxed">
                  {isEn
                    ? 'Preserved without fabrication through village elders, respecting documented historical limits.'
                    : 'ಯಾವುದೇ ಕಟ್ಟುಕಥೆಗಳಿಲ್ಲದೆ, ಗ್ರಾಮದ ಹಿರಿಯರ ಸತ್ಯನಿಷ್ಠ ಮೌಖಿಕ ನೆನಪುಗಳನ್ನು ಮಾತ್ರ ದಾಖಲಿಸಲಾಗಿದೆ.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Gowdru Hereditary Stewardship */}
        {activeTab === 'gowdru' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 animate-in fade-in duration-300">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-cinzel font-bold text-stone-900 mb-4">
                {isEn
                  ? 'Stewardship of Thappagondanahalli Gowdru Families'
                  : 'ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳ ನಿಷ್ಠಾವಂತ ಸೇವಾ ಪರಂಪರೆ'}
              </h3>
              <p className="text-stone-700 font-editorial text-base sm:text-lg leading-relaxed mb-6 italic">
                &ldquo;{isEn ? TEMPLE_CHRONICLES_DATA.gowdruStewardship.en : TEMPLE_CHRONICLES_DATA.gowdruStewardship.kn}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-stone-100 text-xs">
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60">
                <span className="font-semibold text-amber-900 block mb-1">
                  {isEn ? 'Daily Deeparadhana' : 'ನಿತ್ಯ ದೀಪಾರಾಧನೆ'}
                </span>
                <p className="text-stone-600">
                  {isEn ? 'Ensuring unbroken oil and camphor supplies for morning and evening pujas.' : 'ಮುಂಜಾನೆ ಹಾಗೂ ಸಂಜೆಯ ಪೂಜೆಗೆ ಅಗತ್ಯವಾದ ಶುದ್ಧ ಎಣ್ಣೆ ಮತ್ತು ದೀಪಾರಾಧನೆಯ ನಿರ್ವಹಣೆ.'}
                </p>
              </div>

              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60">
                <span className="font-semibold text-amber-900 block mb-1">
                  {isEn ? 'Community Annadana' : 'ಮಹಾ ಅನ್ನಸಂತರ್ಪಣೆ'}
                </span>
                <p className="text-stone-600">
                  {isEn ? 'Coordinating wholesome meals for hundreds of visiting pilgrims during Hanuma Jayanthi.' : 'ಹನುಮ ಜಯಂತಿಯಂದು ಸಹಸ್ರಾರು ಭಕ್ತರಿಗೆ ಸಾತ್ವಿಕ ಅನ್ನದಾಸೋಹದ ಆಯೋಜನೆ.'}
                </p>
              </div>

              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60">
                <span className="font-semibold text-amber-900 block mb-1">
                  {isEn ? 'Sanctum Maintenance' : 'ಗರ್ಭಗುಡಿ ಸಂರಕ್ಷಣೆ'}
                </span>
                <p className="text-stone-600">
                  {isEn ? 'Preserving granite masonry, courtyard cleanliness, and lighting infrastructure.' : 'ಕಪ್ಪು ಶಿಲಾ ಗರ್ಭಗುಡಿಯ ಶುಚಿತ್ವ ಹಾಗೂ ಆವರಣದ ಸಕಲ ವ್ಯವಸ್ಥೆಗಳ ಪಾಲನೆ.'}
                </p>
              </div>

              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60">
                <span className="font-semibold text-amber-900 block mb-1">
                  {isEn ? 'Transparent Trust' : 'ಪಾರದರ್ಶಕ ಸೇವೆ'}
                </span>
                <p className="text-stone-600">
                  {isEn ? 'Zero commercial exploitation; voluntary community contributions only.' : 'ಯಾವುದೇ ವ್ಯಾಪಾರೀಕರಣವಿಲ್ಲದೆ, ಶುದ್ಧ ಭಕ್ತಿಯ ಸಮರ್ಪಣಾ ಮನೋಭಾವ.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Sacred Kshetra Features */}
        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
            {TEMPLE_CHRONICLES_DATA.sacredFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-amber-300 transition-all"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5 text-[#B45309]" />
                  </div>
                  <h4 className="text-base font-cinzel font-bold text-stone-900 mb-2">
                    {isEn ? feat.titleEn : feat.titleKn}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {isEn ? feat.descEn : feat.descKn}
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-stone-100 text-[11px] text-stone-400 font-mono">
                  {isEn ? 'Verified Kshetra Tradition' : 'ದೃಢೀಕೃತ ಪವಿತ್ರ ಸಂಪ್ರದಾಯ'}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
