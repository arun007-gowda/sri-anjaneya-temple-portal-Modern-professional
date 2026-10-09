import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TEMPLE_INFO } from '../data/templeData';
import { BrassDiyaIcon } from './SacredIcons';
import { ArrowRight, Sparkles, MapPin, Compass, Maximize2, X, Shield } from 'lucide-react';

export const TempleIntro: React.FC = () => {
  const { language, scrollToSection, setActivePage } = useLanguage();
  const isEn = language === 'en';

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const portraitUrl = '/hanuman-portrait.jpg';

  return (
    <section
      id="about-section"
      className="relative py-20 lg:py-28 bg-[#FBF9F5] border-b border-stone-200 overflow-hidden"
    >
      {/* Unique Sacred Background Architecture & Subtle Motifs */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#701A28_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Gentle Divine Amber Backlight Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#701A28]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Sacred Divine Canvas */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div
              onClick={() => setLightboxOpen(true)}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-900/20 group cursor-pointer bg-stone-950 aspect-[4/5] max-h-[520px] mx-auto transition-transform duration-300 hover:scale-[1.01]"
            >
              {/* Divine Hanuman Picture */}
              <img
                src={portraitUrl}
                alt="Lord Sri Anjaneya Swamy Thappagondanahalli"
                className="w-full h-full object-cover object-center filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Atmospheric Bottom & Top Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-transparent" />

              {/* Decorative Sacred Temple Brass Corners */}
              <div className="absolute top-3.5 left-3.5 border-t-2 border-l-2 border-amber-400/70 w-6 h-6 pointer-events-none" />
              <div className="absolute top-3.5 right-3.5 border-t-2 border-r-2 border-amber-400/70 w-6 h-6 pointer-events-none" />
              <div className="absolute bottom-3.5 left-3.5 border-b-2 border-l-2 border-amber-400/70 w-6 h-6 pointer-events-none" />
              <div className="absolute bottom-3.5 right-3.5 border-b-2 border-r-2 border-amber-400/70 w-6 h-6 pointer-events-none" />

              {/* Top Sacred Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
                  <BrassDiyaIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEn ? 'Kshetrapala of Thappagondanahalli' : 'ಗ್ರಾಮ ರಕ್ಷಕ ಶ್ರೀ ಆಂಜನೇಯ'}</span>
                </div>

                <div className="w-8 h-8 rounded-full bg-stone-900/70 backdrop-blur-md text-stone-200 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors shadow">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[10px] font-mono tracking-wider uppercase text-amber-300 block mb-1">
                  {isEn ? 'Spiritual Anchor & Solace' : 'ಪವಿತ್ರ ಸನ್ನಿಧಿ ಮತ್ತು ಧೈರ್ಯದ ನೆಲೆ'}
                </span>
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-stone-100 drop-shadow">
                  {isEn ? 'Sri Anjaneya Swamy Sanctum' : 'ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿ ಸನ್ನಿಧಾನ'}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 mt-0.5 font-sans">
                  {isEn
                    ? 'Worshipped with deeparadhana, betel leaf offerings, and continuous community devotion across generations.'
                    : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಗೌಡ್ರು ಕುಟುಂಬಗಳು ಮತ್ತು ಗ್ರಾಮಸ್ಥರ ಭಕ್ತಿ-ಶ್ರದ್ಧೆಗಳ ಪವಿತ್ರ ನೆಲೆವೀಡು.'}
                </p>
              </div>
            </div>

            {/* Quick Geo-Identity Strip */}
            <div className="mt-4 p-4 rounded-xl bg-white border border-stone-200 shadow-xs flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#B45309]" />
                <span className="font-semibold text-stone-800">
                  {isEn ? 'Taluk: Challakere' : 'ತಾಲೂಕು: ಚಳ್ಳಕೆರೆ'}
                </span>
              </div>
              <span className="text-stone-400">·</span>
              <div>
                <span className="font-semibold text-stone-800">
                  {isEn ? 'District: Chitradurga' : 'ಜಿಲ್ಲೆ: ಚಿತ್ರದುರ್ಗ'}
                </span>
              </div>
              <span className="text-stone-400">·</span>
              <div className="font-mono text-stone-700 font-medium">577537</div>
            </div>
          </div>

          {/* Right Column: Editorial Prose & Authentic Temple Story */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            
            {/* Curatorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#701A28] tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isEn ? 'Sacred Village Sanctuary' : 'ಗ್ರಾಮದ ಪವಿತ್ರ ಸನ್ನಿಧಿ'}</span>
            </div>

            {/* Section Heading */}
            <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-stone-900 leading-tight mb-6">
              {isEn
                ? 'Welcome to Anjaneya Swamy Temple, Thappagondanahalli'
                : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ, ತಪಗೊಂಡನಹಳ್ಳಿಗೆ ಹೃತ್ಪೂರ್ವಕ ಸ್ವಾಗತ'}
            </h2>

            {/* Editorial Body Prose */}
            <div className="space-y-4 text-stone-700 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                {isEn
                  ? 'Dedicated to Lord Sri Anjaneya Swamy (Hanuman)—the eternal symbol of selfless devotion, unyielding courage, and righteous strength—this temple serves as the beating spiritual heart of Thappagondanahalli, a traditional agrarian village situated in Challakere taluk of historic Chitradurga district.'
                  : 'ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿಯ (ಹನುಮಂತ ದೇವರು) ಸನ್ನಿಧಾನವು ಚಳ್ಳಕೆರೆ ತಾಲೂಕಿನ ತಪಗೊಂಡನಹಳ್ಳಿ ಗ್ರಾಮದ ಆಧಾರಸ್ತಂಭವಾಗಿದೆ. ಭಕ್ತಿ, ನಿಷ್ಠೆ, ಧೈರ್ಯ ಹಾಗೂ ಗ್ರಾಮ ಸಂರಕ್ಷಣೆಯ ಸಂಕೇತವಾಗಿ ಸ್ವಾಮಿಯು ಶತಮಾನಗಳಿಂದಲೂ ಈ ನೆಲದ ಕೃಷಿಕರನ್ನು ಹಾಗೂ ಭಕ್ತರನ್ನು ಅನುಗ್ರಹಿಸುತ್ತಿದ್ದಾರೆ.'}
              </p>

              <p>
                {isEn
                  ? 'In rural Karnataka, the Anjaneya temple is never merely a monument; it is the living threshold where the community gathers to celebrate seasonal harvest bounties, seek divine solace before sowing, and invoke blessings for family milestones. Every morning mangalarathi marks the quiet awakening of the village, and every evening lamp carries the collective prayers of its elders and children.'
                  : 'ಕರ್ನಾಟಕದ ಬಯಲುಸೀಮೆಯ ಗ್ರಾಮೀಣ ಸಂಸ್ಕೃತಿಯಲ್ಲಿ ಅಂಜನೇಯ ದೇವಾಲಯವು ಕೇವಲ ಪೂಜಾ ಸ್ಥಳವಲ್ಲ; ಅದು ಗ್ರಾಮದ ಸಕಲ ಹಬ್ಬ-ಹರಿದಿನಗಳು, ಸಂಕಷ್ಟ-ಸಂಭ್ರಮಗಳು ಮತ್ತು ಸಾಮಾಜಿಕ ಸೌಹಾರ್ದತೆಯ ಸಮಾಗಮ ಸ್ಥಾನ. ಮುಂಜಾನೆಯ ಮಂಗಳಾರತಿಯಿಂದ ಸಂಜೆಯ ದೀಪಾರಾಧನೆಯವರೆಗೆ ಈ ದೇಗುಲವು ಗ್ರಾಮಸ್ಥರಿಗೆ ಅಪಾರ ಮನಃಶಾಂತಿಯನ್ನು ನೀಡುತ್ತದೆ.'}
              </p>

              {/* Stewardship Highlight: Thappagondanahalli Gowdru Families */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/60 border border-amber-200/90 text-amber-950 text-sm shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <Shield className="w-4 h-4 text-[#701A28]" />
                  <span className="font-bold text-[#701A28] font-cinzel">
                    {isEn ? 'Stewardship & Governance:' : 'ಪಾರಂಪರಿಕ ಆಡಳಿತ ಮತ್ತು ಮೇಲ್ವಿಚಾರಣೆ:'}
                  </span>
                </div>
                <p className="leading-relaxed">
                  {isEn
                    ? 'The sacred shrine and all continuous pooja traditions are reverently managed by the esteemed Thappagondanahalli Gowdru Families, whose generations of dedicated care have safeguarded the sanctum, organized the annual festivals, and maintained community fellowship.'
                    : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿಯ ಸನ್ನಿಧಾನದ ನಿತ್ಯ ಪೂಜೆ, ಜಾತ್ರಾ ಮಹೋತ್ಸವಗಳು ಮತ್ತು ದೇವಸ್ಥಾನದ ಸಮಗ್ರ ಆಡಳಿತವನ್ನು ತಲೆಮಾರುಗಳಿಂದ ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳು ಅತ್ಯಂತ ಭಕ್ತಿ-ಶ್ರದ್ಧೆಗಳಿಂದ ಮುನ್ನಡೆಸಿಕೊಂಡು ಬರುತ್ತಿದ್ದಾರೆ.'}
                </p>
              </div>

              <p className="text-stone-600 text-sm">
                {isEn
                  ? 'All historical accounts published here are strictly distinguished between verified administrative archives and cherished local oral traditions, honoring our foundational commitment to truth and community heritage.'
                  : 'ಇಲ್ಲಿ ಪ್ರಕಟಿಸಲಾದ ಎಲ್ಲಾ ಮಾಹಿತಿಯನ್ನು ಅಧಿಕೃತ ದಾಖಲೆಗಳು ಹಾಗೂ ಗ್ರಾಮದ ಪಾರಂಪರಿಕ ಮೌಖಿಕ ಇತಿಹಾಸದ ಆಧಾರದ ಮೇಲೆ ಸತ್ಯನಿಷ್ಠವಾಗಿ ಪ್ರಸ್ತುತಪಡಿಸಲಾಗಿದೆ.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setActivePage('temple-history');
                  scrollToSection('history-section');
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#701A28] hover:bg-[#58131E] rounded-lg transition-colors group shadow-sm"
              >
                <span>{isEn ? 'Read Full History' : 'ಸಂಪೂರ್ಣ ಇತಿಹಾಸ ಓದಿ'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setActivePage('village-history');
                  scrollToSection('village-section');
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors"
              >
                <Compass className="w-4 h-4 text-stone-600" />
                <span>{isEn ? 'Explore Thappagondanahalli Village' : 'ತಪಗೊಂಡನಹಳ್ಳಿ ಗ್ರಾಮದ ವಿವರ'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox for Portrait */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="bg-[#1C1412] border border-stone-800 rounded-2xl max-w-2xl w-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={portraitUrl}
              alt="Sri Anjaneya Swamy"
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="p-3 text-center">
              <h4 className="text-base font-cinzel font-bold text-amber-200">
                {isEn ? 'Lord Sri Anjaneya Swamy' : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ'}
              </h4>
              <p className="text-xs text-stone-400 font-sans mt-0.5">
                {isEn
                  ? 'Thappagondanahalli · Managed by Gowdru Families'
                  : 'ತಪಗೊಂಡನಹಳ್ಳಿ · ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳು'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
