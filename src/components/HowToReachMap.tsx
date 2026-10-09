import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TEMPLE_INFO } from '../data/templeData';
import { MapPin, Navigation, Car, Train, Plane, ExternalLink, Compass } from 'lucide-react';

export const HowToReachMap: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <section id="map-section" className="py-20 lg:py-28 bg-[#F7F4EE] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#701A28] tracking-widest uppercase mb-3">
            <Compass className="w-4 h-4" />
            <span>{isEn ? 'Pilgrimage & Travel Guide' : 'ತಲುಪುವ ಮಾರ್ಗ ಮತ್ತು ಪ್ರಯಾಣ ಮಾಹಿತಿ'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 leading-tight mb-4">
            {isEn ? 'Find Your Way to Anjaneya Swamy Temple' : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ಸನ್ನಿಧಾನಕ್ಕೆ ಮಾರ್ಗದರ್ಶನ'}
          </h2>

          <p className="text-base sm:text-lg font-editorial italic text-stone-700 leading-relaxed">
            {isEn
              ? 'Exact geographical coordinates and verified transport routes to Thappagondanahalli village in Challakere taluk.'
              : 'ತಪಗೊಂಡನಹಳ್ಳಿಗೆ ರಸ್ತೆ, ರೈಲು ಹಾಗೂ ವಿಮಾನ ಮಾರ್ಗಗಳ ಮೂಲಕ ಸುಲಭವಾಗಿ ತಲುಪುವ ಸಂಪೂರ್ಣ ವಿವರಗಳು.'}
          </p>
        </div>

        {/* Interactive Map Visual Card with Exact Coordinates */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Map Preview Canvas / Direct Link */}
            <div className="lg:col-span-7 bg-stone-900 relative min-h-[320px] lg:min-h-[420px] flex flex-col justify-between p-8 text-stone-100 overflow-hidden">
              {/* Subtle Map Grid Background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, #B45309 1.5px, transparent 1.5px)`,
                  backgroundSize: '28px 28px',
                }}
              />

              {/* Pinpoint Landmark Display */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono mb-3 border border-amber-500/30">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>GPS: 14.425401, 76.8516294</span>
                </div>
                <h3 className="text-2xl font-cinzel font-bold text-white mb-1">
                  {TEMPLE_INFO.officialName[language]}
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm font-sans">
                  {isEn
                    ? 'Thappagondanahalli, Challakere Taluk, Chitradurga, Karnataka 577537'
                    : 'ತಪಗೊಂಡನಹಳ್ಳಿ, ಚಳ್ಳಕೆರೆ ತಾಲೂಕು, ಚಿತ್ರದುರ್ಗ ಜಿಲ್ಲೆ ೫೭೭೫೩೭'}
                </p>
              </div>

              {/* Centered Map Pointer Illustration */}
              <div className="relative z-10 my-auto text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#701A28] border-2 border-amber-400 shadow-2xl animate-pulse">
                  <Navigation className="w-8 h-8 text-amber-300" />
                </div>
                <p className="text-xs text-stone-400 mt-3 font-mono">
                  {isEn ? 'Official Google Maps Coordinates Verified' : 'ಅಧಿಕೃತ ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ನಿರ್ದೇಶಾಂಕಗಳು'}
                </p>
              </div>

              {/* Functional CTA to Open Google Maps */}
              <div className="relative z-10 flex flex-wrap items-center gap-3 pt-4 border-t border-stone-800">
                <a
                  href={TEMPLE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{isEn ? 'Open in Google Maps' : 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ವೀಕ್ಷಿಸಿ'}</span>
                </a>

                <a
                  href={TEMPLE_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-xs font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>{isEn ? 'Get Turn-by-Turn Directions' : 'ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ'}</span>
                </a>
              </div>
            </div>

            {/* Right: Regional Geographic Context */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-cinzel font-bold text-stone-900 mb-4 pb-3 border-b border-stone-200">
                  {isEn ? 'Geographic Reference' : 'ಭೌಗೋಳಿಕ ಪರಿಸರ'}
                </h4>

                <dl className="space-y-4 text-xs sm:text-sm text-stone-700">
                  <div>
                    <dt className="font-semibold text-stone-900 mb-0.5">
                      {isEn ? 'Taluk Headquarters' : 'ತಾಲೂಕು ಕೇಂದ್ರ'}:
                    </dt>
                    <dd className="text-stone-600">
                      {isEn
                        ? 'Challakere (~40 km via Parasurampura road)'
                        : 'ಚಳ್ಳಕೆರೆ (ಸುಮಾರು ೪೦ ಕಿ.ಮೀ)'}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-stone-900 mb-0.5">
                      {isEn ? 'District Headquarters' : 'ಜಿಲ್ಲಾ ಕೇಂದ್ರ'}:
                    </dt>
                    <dd className="text-stone-600">
                      {isEn
                        ? 'Chitradurga (~69 km, renowned for historic 7-ringed fort)'
                        : 'ಚಿತ್ರದುರ್ಗ (ಸುಮಾರು ೬೯ ಕಿ.ಮೀ, ಐತಿಹಾಸಿಕ ಏಳು ಸುತ್ತಿನ ಕೋಟೆ ನಗರಿ)'}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-stone-900 mb-0.5">
                      {isEn ? 'Gram Panchayat' : 'ಗ್ರಾಮ ಪಂಚಾಯತಿ'}:
                    </dt>
                    <dd className="text-stone-600">
                      {isEn ? 'Renukapura Gram Panchayat' : 'ರೇಣುಕಾಪುರ ಗ್ರಾಮ ಪಂಚಾಯತಿ'}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-stone-900 mb-0.5">
                      {isEn ? 'Postal Code' : 'ಅಂಚೆ ಸೂಚ್ಯಂಕ'}:
                    </dt>
                    <dd className="text-stone-600 font-mono">577537</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500">
                {isEn
                  ? 'Parking: Adequate space available in the village temple forecourt for private cars, bikes, and pilgrimage vans.'
                  : 'ವಾಹನ ನಿಲುಗಡೆ: ದೇವಸ್ಥಾನದ ಮುಂಭಾಗದ ಪ್ರಾಂಗಣದಲ್ಲಿ ಕಾರು, ಬೈಕ್ ಮತ್ತು ವಾಹನಗಳಿಗೆ ಸ್ಥಳಾವಕಾಶವಿದೆ.'}
              </div>
            </div>

          </div>
        </div>

        {/* 3 Transport Mode Cards (Road, Rail, Air) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: By Road */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-[#701A28] mb-6">
              <Car className="w-6 h-6" />
            </div>

            <div className="text-xs font-mono text-[#B45309] font-medium uppercase tracking-wider mb-1">
              {isEn ? 'Road Network' : 'ರಸ್ತೆ ಸಾರಿಗೆ'}
            </div>

            <h3 className="text-xl font-cinzel font-bold text-stone-900 mb-4">
              {isEn ? 'By Road' : 'ರಸ್ತೆಯ ಮೂಲಕ'}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              <p>
                <strong className="text-stone-900 block">
                  {isEn ? 'From Challakere (~40 km):' : 'ಚಳ್ಳಕೆರೆಯಿಂದ (~೪೦ ಕಿ.ಮೀ):'}
                </strong>
                {isEn
                  ? 'Drive towards Parasurampura / Pavagada route, branching onto all-weather rural roads towards Thappagondanahalli.'
                  : 'ಪರಶುರಾಂಪುರ / ಪಾವಗಡ ಮಾರ್ಗವಾಗಿ ಸಾಗಿ ತಪಗೊಂಡನಹಳ್ಳಿ ಕಡೆಗೆ ಸಂಪರ್ಕ ಕಲ್ಪಿಸುವ ರಸ್ತೆ.'}
              </p>
              <p>
                <strong className="text-stone-900 block">
                  {isEn ? 'From Chitradurga (~69 km):' : 'ಚಿತ್ರದುರ್ಗದಿಂದ (~೬೯ ಕಿ.ಮೀ):'}
                </strong>
                {isEn
                  ? 'Connected via NH-150A to Challakere, then through Parasurampura.'
                  : 'ರಾಷ್ಟ್ರೀಯ ಹೆದ್ದಾರಿ ೧೫೦ಎ ಮೂಲಕ ಚಳ್ಳಕೆರೆ ತಲುಪಿ ನಂತರ ಪರಶುರಾಂಪುರ ಮಾರ್ಗ.'}
              </p>
              <p>
                <strong className="text-stone-900 block">
                  {isEn ? 'Public Transport:' : 'ಸಾರಿಗೆ ಬಸ್ಸುಗಳು:'}
                </strong>
                {isEn
                  ? 'Regular KSRTC buses operate from Challakere to Parasurampura and surrounding villages.'
                  : 'ಕೆ.ಎಸ್.ಆರ್.ಟಿ.ಸಿ ಬಸ್ಸುಗಳು ಚಳ್ಳಕೆರೆ ಮತ್ತು ಹತ್ತಿರದ ಕೇಂದ್ರಗಳಿಂದ ಲಭ್ಯವಿವೆ.'}
              </p>
            </div>
          </div>

          {/* Card 2: By Rail */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-blue-700 mb-6">
              <Train className="w-6 h-6" />
            </div>

            <div className="text-xs font-mono text-blue-700 font-medium uppercase tracking-wider mb-1">
              {isEn ? 'Railway Access' : 'ರೈಲ್ವೆ ಸಂಪರ್ಕ'}
            </div>

            <h3 className="text-xl font-cinzel font-bold text-stone-900 mb-4">
              {isEn ? 'By Rail' : 'ರೈಲಿನ ಮೂಲಕ'}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              <p>
                <strong className="text-stone-900 block">
                  {isEn ? 'Thallak Station (~35 km):' : 'ತಳಕು ರೈಲ್ವೆ ನಿಲ್ದಾಣ (~೩೫ ಕಿ.ಮೀ):'}
                </strong>
                {isEn
                  ? 'Nearest rural railway station on the Rayadurg-Chitradurga railway section.'
                  : 'ರಾಯದುರ್ಗ-ಚಿತ್ರದುರ್ಗ ರೈಲು ಮಾರ್ಗದಲ್ಲಿರುವ ಸಮೀಪದ ನಿಲ್ದಾಣ.'}
              </p>
              <p>
                <strong className="text-stone-900 block">
                  {isEn ? 'Challakere Station (~40 km):' : 'ಚಳ್ಳಕೆರೆ ರೈಲ್ವೆ ನಿಲ್ದಾಣ (~೪೦ ಕಿ.ಮೀ):'}
                </strong>
                {isEn
                  ? 'Major local station with passenger and express connectivity.'
                  : 'ಪ್ರಮುಖ ರೈಲು ಸಂಪರ್ಕ ಹೊಂದಿರುವ ತಾಲೂಕು ನಿಲ್ದಾಣ.'}
              </p>
              <p>
                <strong className="text-stone-900 block">
                  {isEn ? 'Chitradurga Junction (~69 km):' : 'ಚಿತ್ರದುರ್ಗ ಜಂಕ್ಷನ್ (~೬೯ ಕಿ.ಮೀ):'}
                </strong>
                {isEn
                  ? 'Well-connected junction connecting Bengaluru, Ballari, and Hubballi.'
                  : 'ಬೆಂಗಳೂರು, ಬಳ್ಳಾರಿ ಮತ್ತು ಹುಬ್ಬಳ್ಳಿ ಮಾರ್ಗದ ಪ್ರಮುಖ ಜಂಕ್ಷನ್.'}
              </p>
            </div>
          </div>

          {/* Card 3: By Air */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-amber-700 mb-6">
              <Plane className="w-6 h-6" />
            </div>

            <div className="text-xs font-mono text-amber-700 font-medium uppercase tracking-wider mb-1">
              {isEn ? 'Airport Access' : 'ವಿಮಾನ ಸಾರಿಗೆ'}
            </div>

            <h3 className="text-xl font-cinzel font-bold text-stone-900 mb-4">
              {isEn ? 'By Air' : 'ವಿಮಾನದ ಮೂಲಕ'}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              <p>
                <strong className="text-stone-900 block">
                  {isEn ? 'Bellary / Jindal Vijayanagar (~62 - 100 km):' : 'ಬಳ್ಳಾರಿ / ಜಿಂದಾಲ್ ವಿಮಾನ ನಿಲ್ದಾಣ (~೬೨ - ೧೦೦ ಕಿ.ಮೀ):'}
                </strong>
                {isEn
                  ? 'Closest regional airports for domestic charter and regional connectivity.'
                  : 'ಹತ್ತಿರದ ಪ್ರಾದೇಶಿಕ ವಿಮಾನ ನಿಲ್ದಾಣ.'}
              </p>
              <p>
                <strong className="text-stone-900 block">
                  {isEn ? 'Hubballi Airport (~260 km):' : 'ಹುಬ್ಬಳ್ಳಿ ವಿಮಾನ ನಿಲ್ದಾಣ (~೨೬೦ ಕಿ.ಮೀ):'}
                </strong>
                {isEn
                  ? 'Direct domestic flights from Mumbai, Delhi, Hyderabad, and Chennai.'
                  : 'ದೇಶದ ಪ್ರಮುಖ ನಗರಗಳಿಗೆ ನಿಯಮಿತ ವಿಮಾನ ಸಂಪರ್ಕ.'}
              </p>
              <p>
                <strong className="text-stone-900 block">
                  {isEn ? 'Bengaluru (BLR) (~230 km):' : 'ಬೆಂಗಳೂರು ಕೆಂಪೇಗೌಡ ಅಂತಾರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ (~೨೩೦ ಕಿ.ಮೀ):'}
                </strong>
                {isEn
                  ? 'Major international hub connected via NH-48 / Chitradurga expressway.'
                  : 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ, ರಾಷ್ಟ್ರೀಯ ಹೆದ್ದಾರಿ ೪೮ ಮೂಲಕ ಸಂಪರ್ಕ.'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
