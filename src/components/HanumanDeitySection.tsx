import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BrassDiyaIcon, TempleEmblem } from './SacredIcons';
import { HeartHandshake, ShieldAlert, Sparkles, Feather } from 'lucide-react';

export const HanumanDeitySection: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const virtues = [
    {
      title: isEn ? 'Nishkama Bhakti (Selfless Devotion)' : 'ನಿಷ್ಕಾಮ ಭಕ್ತಿ',
      desc: isEn
        ? 'The supreme archetype of unwavering dedication, serving the divine without seeking worldly acclaim or personal grandeur.'
        : 'ಸ್ವಾರ್ಥರಹಿತ ಶರಣಾಗತಿಯ ಪರಮ ಮಾದರಿ; ಶ್ರೀರಾಮನ ಸೇವೆಗಾಗಿ ತನ್ನ ಸಮಸ್ತ ಶಕ್ತಿ-ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಅರ್ಪಿಸಿದ ಭಕ್ತಿ ಶಿರೋಮಣಿ.',
    },
    {
      title: isEn ? 'Abhaya & Courage' : 'ಅಭಯ ಮತ್ತು ಧೈರ್ಯ',
      desc: isEn
        ? 'Revered across rural Karnataka as the dispeller of fear and guardian against distress, bestowing quiet inner resilience to farmers and seekers.'
        : 'ಭಯ-ಸಂಕಷ್ಟಗಳನ್ನು ನಿವಾರಿಸಿ ಮನಸ್ಸಿಗೆ ಸ್ಥೈರ್ಯ, ಶಾಂತಿ ಹಾಗೂ ಆತ್ಮವಿಶ್ವಾಸವನ್ನು ತುಂಬುವ ಸಾರ್ವಕಾಲಿಕ ರಕ್ಷಕ.',
    },
    {
      title: isEn ? 'Jnana & Humility' : 'ಜ್ಞಾನ ಮತ್ತು ವಿನಯ',
      desc: isEn
        ? 'Celebrated in sacred texts as possessing limitless knowledge and eloquence, yet embodying the deepest humility and gentleness.'
        : 'ಅಪಾರ ಬುದ್ಧಿ-ವಿದ್ಯೆಗಳ ಒಡೆಯನಾಗಿದ್ದರೂ, ಅತ್ಯಂತ ವಿನಮ್ರ ಭಾವದಿಂದ ಲೋಕಕಲ್ಯಾಣಕ್ಕೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುವ ಜ್ಞಾನಮೂರ್ತಿ.',
    },
    {
      title: isEn ? 'Grama Rakshaka (Guardian of Settlement)' : 'ಗ್ರಾಮ ರಕ್ಷಕ',
      desc: isEn
        ? 'Constituted at the entrance of Thappagondanahalli to watch over the harvest, cattle herds, and households with perpetual vigilance.'
        : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಗಡಿಯಲ್ಲಿ ನಿಂತು ಊರಿನ ಕೃಷಿ, ಜಾನುವಾರು ಮತ್ತು ಸಮಸ್ತ ಜನರ ಕ್ಷೇಮವನ್ನು ಕಾಯುವ ಗ್ರಾಮದೇವತೆ.',
    },
  ];

  return (
    <section id="deity-section" className="py-20 lg:py-28 bg-[#2A1513] text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black border border-amber-500/50 p-1 mb-4 shadow-xl shadow-amber-950/60 overflow-hidden">
            <TempleEmblem className="w-full h-full object-contain drop-shadow" />
          </div>

          <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEn ? 'Spiritual Significance' : 'ದೈವಿಕ ಮಹತ್ವ'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-amber-100 tracking-tight leading-tight mb-4">
            {isEn ? 'Sri Anjaneya Swamy' : 'ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿ'}
          </h2>

          <p className="text-base sm:text-lg font-editorial italic text-stone-300 leading-relaxed max-w-2xl mx-auto">
            {isEn
              ? 'Understanding the cultural, devotional, and philosophical embodiment of Lord Hanuman in the life of Thappagondanahalli.'
              : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಧಾರ್ಮಿಕ ಹಾಗೂ ಸಾಂಸ್ಕೃತಿಕ ಜೀವನದಲ್ಲಿ ಆಂಜನೇಯ ಸ್ವಾಮಿಯ ಆರಾಧನೆಯ ಮಹತ್ವ.'}
          </p>
        </div>

        {/* 2-Column Devotional Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-7 space-y-6 text-stone-300 font-sans leading-relaxed text-base sm:text-lg">
            <p>
              {isEn
                ? 'The name "Anjaneya" translates to the son of the virtuous Anjana. In the spiritual tradition of South India, Sri Anjaneya is revered not merely as a formidable celestial being, but as the embodiment of life-breath (Mukhya Prana), wisdom, restraint, and divine vigilance.'
                : 'ಆಂಜನೇಯ ಎಂದರೆ ಅಂಜನಾದೇವಿಯ ಸುಪುತ್ರ. ಭಾರತೀಯ ಸನಾತನ ಧರ್ಮದಲ್ಲಿ ಹನುಮಂತನನ್ನು ಶಕ್ತಿ, ನಿಷ್ಠೆ, ಮುಖಪ್ರಾಣ ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸದ ದಿವ್ಯ ಪ್ರತೀಕವೆಂದು ಗೌರವಿಸಲಾಗುತ್ತದೆ. ಚಿತ್ರದುರ್ಗದ ಪಾಳೆಯಗಾರರ ಇತಿಹಾಸದಲ್ಲೂ ಆಂಜನೇಯನ ಆರಾಧನೆಗೆ ಅತ್ಯಂತ ಉನ್ನತ ಸ್ಥಾನವಿದೆ.'}
            </p>

            <p>
              {isEn
                ? 'Devotees visit Anjaneya Swamy Temple at Thappagondanahalli seeking tranquility of mind, fortitude during agrarian uncertainties, and harmony among families. Worship here emphasizes humble reflection and righteous living rather than transactional superstition. When villagers bow before the sanctum, they seek the courage to face daily challenges with faith and dignity.'
                : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಭಕ್ತರು ಸ್ವಾಮಿಯ ಸನ್ನಿಧಾನಕ್ಕೆ ಆಗಮಿಸುವುದು ಮನಸ್ಸಿನ ಶಾಂತಿ, ಕೃಷಿ ಸಂಕಷ್ಟಗಳ ಸಮಯದಲ್ಲಿ ಧೈರ್ಯ ಹಾಗೂ ಸಂಸಾರ ಸುಖ-ಶಾಂತಿಗಾಗಿ. ಯಾವುದೇ ಮೂಢನಂಬಿಕೆಗಳಿಲ್ಲದೆ, ಪರಿಶುದ್ಧ ಭಕ್ತಿಯಿಂದ ದೇವರನ್ನು ಪ್ರಾರ್ಥಿಸಿ, ಸನ್ಮಾರ್ಗದಲ್ಲಿ ನಡೆಯುವ ಸಂಕಲ್ಪವನ್ನು ಇಲ್ಲಿ ಭಕ್ತರು ಕೈಗೊಳ್ಳುತ್ತಾರೆ.'}
            </p>

            <div className="pt-4 border-t border-stone-800 text-xs text-amber-300/80 italic flex items-center gap-2">
              <Feather className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {isEn
                  ? 'Devotional Ethic: The temple committee upholds respectful, rational spirituality, avoiding sensational claims.'
                  : 'ಭಕ್ತಿ ಸಿದ್ಧಾಂತ: ಯಾವುದೇ ಅತಿಶಯೋಕ್ತಿಯಿಲ್ಲದೆ ನೈಜ ಭಕ್ತಿ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಆಚಾರಗಳನ್ನು ಎತ್ತಿಹಿಡಿಯಲಾಗಿದೆ.'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-b from-[#3A1D1B] to-[#1E0F0E] p-8 rounded-2xl border border-amber-500/20 shadow-xl">
            <div className="flex items-center gap-3 border-b border-stone-800 pb-4 mb-6">
              <BrassDiyaIcon className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-cinzel font-semibold text-amber-200">
                {isEn ? 'Cherished Traditions' : 'ಸಾಂಪ್ರದಾಯಿಕ ಆಚರಣೆಗಳು'}
              </h3>
            </div>

            <ul className="space-y-4 text-sm text-stone-300 font-sans">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-amber-100 block">
                    {isEn ? 'Saturday Deeparadhana' : 'ಶನಿವಾರದ ದೀಪಾರಾಧನೆ'}
                  </strong>
                  <span>
                    {isEn
                      ? 'Devotees kindle sesame oil lamps at twilight to quieten the restless mind.'
                      : 'ಸಂಜೆ ಎಳ್ಳೆಣ್ಣೆ ದೀಪಗಳನ್ನು ಹಚ್ಚಿ ಮನಸ್ಸಿನ ಸಕಲ ಆತಂಕಗಳನ್ನು ದೂರಮಾಡುವ ಪ್ರಾರ್ಥನೆ.'}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-amber-100 block">
                    {isEn ? 'Sindhoora & Betel Leaves' : 'ಸಿಂಧೂರ ಮತ್ತು ವೀಳ್ಯದೆಲೆ ಪೂಜೆ'}
                  </strong>
                  <span>
                    {isEn
                      ? 'Symbolic of Sita Devi’s eternal blessing of long life and victory in righteous paths.'
                      : 'ಸೀತಾದೇವಿಯ ಆಶೀರ್ವಾದದ ಸಂಕೇತವಾಗಿ ಸಿಂಧೂರ ಹಾಗೂ ವಿಜಯದ ಸಂಕೇತವಾಗಿ ವೀಳ್ಯದೆಲೆ ಸಮರ್ಪಣೆ.'}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-amber-100 block">
                    {isEn ? 'Community Recitation' : 'ಹನುಮಾನ್ ಚಾಲೀಸಾ ಪಠಣ'}
                  </strong>
                  <span>
                    {isEn
                      ? 'Collective chanting during Hanuman Jayanti and village gatherings for collective harmony.'
                      : 'ಸಾಮೂಹಿಕ ಶ್ಲೋಕ ಮತ್ತು ಚಾಲೀಸಾ ಪಠಣದಿಂದ ಸೃಷ್ಟಿಯಾಗುವ ಆಧ್ಯಾತ್ಮಿಕ ಕಂಪನಗಳು.'}
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* 4 Pillars of Devotional Character */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {virtues.map((v, i) => (
            <div key={i} className="p-6 bg-stone-900/60 rounded-xl border border-stone-800">
              <h4 className="text-base font-cinzel font-semibold text-amber-200 mb-2">
                {v.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
                {v.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
