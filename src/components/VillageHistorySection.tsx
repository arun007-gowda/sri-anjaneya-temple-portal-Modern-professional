import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { VILLAGE_DEMOGRAPHICS, TEMPLE_INFO } from '../data/templeData';
import { Landmark, Users, Sprout, Shield, Building, MapPin, ExternalLink } from 'lucide-react';

export const VillageHistorySection: React.FC = () => {
  const { language, setIsAuditModalOpen } = useLanguage();
  const isEn = language === 'en';

  const villageTimeline = [
    {
      era: isEn ? 'Ancient / Early Deccan Era' : 'ಪ್ರಾಚೀನ ಕಾಲ',
      title: isEn ? 'Early Pastoral & Agrarian Settlement' : 'ಬಯಲುಸೀಮೆಯ ಕೃಷಿ-ಪಶುಪಾಲನಾ ನೆಲೆ',
      desc: isEn
        ? 'Situated in the central Deccan plateau characterized by majestic granite boulders and arid red soils, early pastoralist and farming communities settled along natural water catchment zones in what is now Challakere taluk.'
        : 'ಚಿತ್ರದುರ್ಗದ ಕಲ್ಲಿನ ಬೆಟ್ಟಗಳು ಹಾಗೂ ಫಲವತ್ತಾದ ಕೆಂಪು-ಕಪ್ಪು ಮಣ್ಣಿನ ಬಯಲುಸೀಮೆಯಲ್ಲಿ ಪ್ರಾಚೀನ ಕಾಲದಿಂದಲೂ ಕೃಷಿಕರು ಹಾಗೂ ಗೋಪಾಲಕರು ನೆಲೆನಿಂತ ಐತಿಹಾಸಿಕ ಭೂಮಿ.',
    },
    {
      era: isEn ? '16th – 18th Century CE' : '೧೬ - ೧೮ನೇ ಶತಮಾನ',
      title: isEn ? 'Chitradurga Nayakas & Vijayanagara Feudal Era' : 'ಚಿತ್ರದುರ್ಗ ಪಾಳೆಯಗಾರರ ಆಡಳಿತ',
      desc: isEn
        ? 'The region came under the protective governance of the Chitradurga Nayakas (Madakari Nayaka dynasty) who constructed stone forts, irrigation tanks, and established boundary shrines dedicated to Lord Hanuman for military valor and community protection.'
        : 'ವೀರ ಮದಕರಿ ನಾಯಕರ ಆಳ್ವಿಕೆಯಲ್ಲಿ ಗ್ರಾಮಗಳ ರಕ್ಷಣೆ, ಕೆರೆಗಳ ನಿರ್ಮಾಣ ಮತ್ತು ಗಡಿಕಾವಲಿಗಾಗಿ ಅಂಜನೇಯ ದೇವಸ್ಥಾನಗಳನ್ನು ಪ್ರತಿಷ್ಠಾಪಿಸುವ ಸಂಪ್ರದಾಯ ಬಲಗೊಂಡಿತು.',
    },
    {
      era: isEn ? 'Village Naming & Lineage' : 'ಗ್ರಾಮ ನಾಮಕರಣದ ಹಿನ್ನೆಲೆ',
      title: isEn ? 'The Etymology of Thappagondanahalli' : 'ತಪಗೊಂಡನಹಳ್ಳಿ ಹೆಸರಿನ ಉಗಮ',
      desc: isEn
        ? 'According to local elders and regional etymology, the name incorporates traditional Kannada honorifics ("Gonda" / "Gowda" denoting respected village stewards or pastoral leadership) settled around an ancestral lineage settlement ("Halli").'
        : 'ಸ್ಥಳೀಯ ಇತಿಹಾಸಕಾರರ ಪ್ರಕಾರ, ಗೌಡ/ಗೊಂಡ ಎಂಬ ಮುಖಂಡರ ಅಥವಾ ತಪೋಭೂಮಿಯ ಪಾವಿತ್ರ್ಯತೆಯ ಹಿನ್ನೆಲೆಯಲ್ಲಿ ಗ್ರಾಮಕ್ಕೆ ತಪಗೊಂಡನಹಳ್ಳಿ ಎಂಬ ಹೆಸರು ಸ್ಥಿರವಾಯಿತು.',
    },
    {
      era: isEn ? '20th Century Demographics' : '೨೦ನೇ ಶತಮಾನ',
      title: isEn ? 'Consolidation of Panchayat & Agrarian Fabric' : 'ಕಂದಾಯ ಗ್ರಾಮ ಹಾಗೂ ಪಂಚಾಯತ್ ರಚನೆ',
      desc: isEn
        ? 'Formally classified under the Renukapura Gram Panchayat and Challakere revenue sub-district, cultivating groundnuts (Challakere is renowned as the oilseed hub of Karnataka), ragi, jowar, and pulses.'
        : 'ಕರ್ನಾಟಕದ ಎಣ್ಣೆಕಾಳುಗಳ ಕಣಜವೆಂದೇ ಹೆಸರಾದ ಚಳ್ಳಕೆರೆ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ರೇಣುಕಾಪುರ ಗ್ರಾ.ಪಂ. ಅಡಿಯಲ್ಲಿ ಕಡಲೆಕಾಯಿ, ರಾಗಿ, ಸಜ್ಜೆ ಬೆಳೆಯುವ ಪ್ರಮುಖ ಕೃಷಿ ಗ್ರಾಮವಾಗಿ ಮುಂದುವರಿಯಿತು.',
    },
    {
      era: isEn ? 'Present Day' : 'ಇಂದಿನ ಸ್ಥಿತಿ',
      title: isEn ? 'A Thriving, Faith-Rooted Community' : 'ಒಗ್ಗಟ್ಟಿನ ಪ್ರಗತಿಪರ ಸಮುದಾಯ',
      desc: isEn
        ? 'With over 1,196 residents (2011 Census) in 261 households, Thappagondanahalli balances agricultural roots with modern aspirations, united under the protective canopy of Anjaneya Swamy Temple.'
        : '೧,೧೯೬ಕ್ಕೂ ಹೆಚ್ಚು ಜನಸಂಖ್ಯೆ, ೨೬೧ ಕುಟುಂಬಗಳನ್ನೊಳಗೊಂಡ ತಪಗೊಂಡನಹಳ್ಳಿಯು ಧಾರ್ಮಿಕ ಪರಂಪರೆ ಮತ್ತು ಆಧುನಿಕ ಶಿಕ್ಷಣ-ಅಭಿವೃದ್ಧಿಗಳನ್ನು ಸಮನ್ವಯಗೊಳಿಸಿಕೊಂಡು ಮುನ್ನಡೆಯುತ್ತಿದೆ.',
    },
  ];

  return (
    <section id="village-section" className="py-20 lg:py-28 bg-[#F7F4EE] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#701A28] tracking-widest uppercase mb-3">
            <Landmark className="w-4 h-4" />
            <span>{isEn ? 'Editorial Village Heritage' : 'ಗ್ರಾಮ ಇತಿಹಾಸ ಹಾಗೂ ಪರಂಪರೆ'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 leading-tight mb-4">
            {isEn ? 'More Than a Village. A Living Heritage.' : 'ಕೇವಲ ಗ್ರಾಮವಲ್ಲ; ಒಂದು ಜೀವಂತ ಪರಂಪರೆ.'}
          </h2>

          <p className="text-base sm:text-lg font-editorial italic text-stone-700 leading-relaxed">
            {isEn
              ? 'An exploration into the geography, ancestry, and cultural identity of Thappagondanahalli in the historic heartland of Karnataka.'
              : 'ಕರ್ನಾಟಕದ ಐತಿಹಾಸಿಕ ಚಿತ್ರದುರ್ಗ ನೆಲೆಯಲ್ಲಿ ತಪಗೊಂಡನಹಳ್ಳಿಯ ಭೌಗೋಳಿಕತೆ, ಸಂಸ್ಕೃತಿ ಮತ್ತು ಬಾಂಧವ್ಯದ ಪರಿಚಯ.'}
          </p>
        </div>

        {/* 4 Demographics & Administrative Facts Cards (Verified 2011 Census & Revenue data) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-[#701A28] mb-4">
              <Users className="w-5 h-5" />
            </div>
            <span className="block text-xs font-mono text-stone-500 uppercase tracking-wider mb-1">
              {isEn ? 'Census 2011 Population' : 'ಜನಸಂಖ್ಯೆ (೨೦೧೧ ಜನಗಣತಿ)'}
            </span>
            <div className="text-2xl font-cinzel font-bold text-stone-900 tabular-nums">
              {VILLAGE_DEMOGRAPHICS.population.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-stone-600 mt-2">
              {isEn ? '608 Males · 588 Females · 261 Households' : '೬೦೮ ಪುರುಷರು · ೫೮೮ ಮಹಿಳೆಯರು · ೨೬೧ ಕುಟುಂಬಗಳು'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-[#B45309] mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="block text-xs font-mono text-stone-500 uppercase tracking-wider mb-1">
              {isEn ? 'Geographical Area' : 'ಭೌಗೋಳಿಕ ವಿಸ್ತೀರ್ಣ'}
            </span>
            <div className="text-2xl font-cinzel font-bold text-stone-900 tabular-nums">
              846.79 <span className="text-base font-normal font-sans">hectares</span>
            </div>
            <p className="text-xs text-stone-600 mt-2">
              {isEn ? 'Challakere Taluk, Chitradurga' : 'ಚಳ್ಳಕೆರೆ ತಾಲೂಕು, ಚಿತ್ರದುರ್ಗ ಜಿಲ್ಲೆ'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-emerald-700 mb-4">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="block text-xs font-mono text-stone-500 uppercase tracking-wider mb-1">
              {isEn ? 'Primary Economy' : 'ಪ್ರಮುಖ ಕೃಷಿ ಕಸುಬು'}
            </span>
            <div className="text-base font-cinzel font-bold text-stone-900">
              {isEn ? 'Groundnut & Dryland Crops' : 'ಕಡಲೆಕಾಯಿ ಮತ್ತು ಧಾನ್ಯಗಳು'}
            </div>
            <p className="text-xs text-stone-600 mt-2">
              {isEn ? 'Ragi, Jowar, Pulses & Dairy Farming' : 'ರಾಗಿ, ಜೋಳ, ತೊಗರಿ ಮತ್ತು ಹೈನುಗಾರಿಕೆ'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-blue-700 mb-4">
              <Building className="w-5 h-5" />
            </div>
            <span className="block text-xs font-mono text-stone-500 uppercase tracking-wider mb-1">
              {isEn ? 'Local Governance' : 'ಸ್ಥಳೀಯ ಆಡಳಿತ'}
            </span>
            <div className="text-base font-cinzel font-bold text-stone-900">
              {isEn ? 'Renukapura Panchayat' : 'ರೇಣುಕಾಪುರ ಗ್ರಾ.ಪಂ.'}
            </div>
            <p className="text-xs text-stone-600 mt-2">
              {isEn ? 'Molakalmuru Constituency · PIN: 577537' : 'ಮೊಳಕಾಲ್ಮುರು ಕ್ಷೇತ್ರ · ಪಿನ್: ೫೭೭೫೩೭'}
            </p>
          </div>

        </div>

        {/* Visual Timeline of Village Evolution */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 shadow-xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-8">
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-900">
              {isEn ? 'Chronological Evolution of Thappagondanahalli' : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಐತಿಹಾಸಿಕ ಕಾಲರೇಖೆ'}
            </h3>
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="text-xs text-[#701A28] hover:underline flex items-center gap-1 font-medium"
            >
              <span>{isEn ? 'View Data Sources' : 'ದಾಖಲೆಗಳ ಆಧಾರ'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-5 before:w-0.5 before:bg-stone-200">
            {villageTimeline.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-4 sm:gap-6">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#701A28] text-white flex items-center justify-center shrink-0 shadow-sm z-10 text-xs sm:text-sm font-semibold">
                  {idx + 1}
                </div>
                <div className="bg-stone-50/70 p-5 rounded-xl border border-stone-200/80 flex-1">
                  <div className="text-xs font-mono text-[#B45309] font-medium uppercase tracking-wider mb-1">
                    {item.era}
                  </div>
                  <h4 className="text-base sm:text-lg font-cinzel font-semibold text-stone-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
