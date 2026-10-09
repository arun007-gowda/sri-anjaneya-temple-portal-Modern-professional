import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ARCHITECTURAL_FEATURES } from '../data/templeData';
import { ArchitecturalFeature } from '../types';
import { GraniteTexturePlaceholder } from './SacredIcons';
import { Columns, Maximize2, X, Info } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const { language, setIsAuditModalOpen } = useLanguage();
  const isEn = language === 'en';

  const [selectedFeature, setSelectedFeature] = useState<ArchitecturalFeature | null>(null);

  return (
    <section id="architecture-section" className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#701A28] tracking-widest uppercase mb-3">
            <Columns className="w-4 h-4" />
            <span>{isEn ? 'Structural Heritage' : 'ವಾಸ್ತುಶಿಲ್ಪ ಹಾಗೂ ಸಂರಚನೆ'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 leading-tight mb-4">
            {isEn ? 'Temple Architecture & Stonework' : 'ದೇಗುಲದ ವಾಸ್ತುಶಿಲ್ಪ ಹಾಗೂ ಶಿಲ್ಪಕಲೆ'}
          </h2>

          <p className="text-base sm:text-lg font-editorial italic text-stone-700 leading-relaxed">
            {isEn
              ? 'An authentic architectural study of the granite sanctum, hall, and heritage stone craftsmanship at Thappagondanahalli.'
              : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಗರ್ಭಗುಡಿ, ಮುಖಮಂಟಪ ಮತ್ತು ಸ್ಥಳೀಯ ಶಿಲಾ ನಿರ್ಮಾಣ ಶೈಲಿಯ ವಿನ್ಯಾಸ ಅಧ್ಯಯನ.'}
          </p>
        </div>

        {/* Feature Grid with Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARCHITECTURAL_FEATURES.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedFeature(item)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative">
                <GraniteTexturePlaceholder
                  title={item.title[language]}
                  subtitle={item.kannadaTerm}
                  badge={
                    isEn
                      ? 'Architectural Study · Click to Expand'
                      : 'ವಾಸ್ತುಶಿಲ್ಪ ವಿವರ · ವಿಸ್ತರಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ'
                  }
                  className="h-56 sm:h-64"
                />
                <button
                  className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 text-stone-200 hover:text-white backdrop-blur-xs transition-colors"
                  aria-label="Expand feature details"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-[#B45309] font-medium tracking-wide">
                    {item.kannadaTerm}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                    {isEn ? 'Field Documented' : 'ಕ್ಷೇತ್ರ ಪರಿಶೀಲಿತ'}
                  </span>
                </div>

                <h3 className="text-xl font-cinzel font-bold text-stone-900 mb-3 group-hover:text-[#701A28] transition-colors">
                  {item.title[language]}
                </h3>

                <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed font-sans mb-4">
                  {item.description[language]}
                </p>

                <div className="flex items-center text-xs font-semibold text-[#701A28] group-hover:underline">
                  <span>{isEn ? 'View Detailed Architectural Notes →' : 'ಸಂಪೂರ್ಣ ವಿವರ ವೀಕ್ಷಿಸಿ →'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Footer Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors"
          >
            <Info className="w-3.5 h-3.5 text-amber-700" />
            <span>
              {isEn
                ? 'Only verified features of Anjaneya Swamy Temple, Thappagondanahalli are documented here.'
                : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನದ ವಾಸ್ತವಿಕ ವಿವರಗಳನ್ನು ಮಾತ್ರ ಇಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗಿದೆ.'}
            </span>
          </button>
        </div>

      </div>

      {/* Interactive Detail Modal */}
      {selectedFeature && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className="bg-[#FBF9F5] border border-stone-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <GraniteTexturePlaceholder
              title={selectedFeature.title[language]}
              subtitle={selectedFeature.kannadaTerm}
              badge={isEn ? 'Verified Architectural Element' : 'ದೃಢೀಕೃತ ವಾಸ್ತುಶಿಲ್ಪ ಅಂಗ'}
              className="h-60 rounded-xl mb-6"
            />

            <div className="text-xs font-mono text-[#B45309] font-medium uppercase tracking-wider mb-1">
              {selectedFeature.kannadaTerm}
            </div>

            <h3 className="text-2xl font-cinzel font-bold text-stone-900 mb-4">
              {selectedFeature.title[language]}
            </h3>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans mb-6">
              {selectedFeature.description[language]}
            </p>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span>{isEn ? 'Status: Documented on Site' : 'ಸ್ಥಿತಿ: ಸ್ಥಳದಲ್ಲೇ ಪರಿಶೀಲಿಸಲಾಗಿದೆ'}</span>
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
              >
                {isEn ? 'Close' : 'ಮುಚ್ಚಿ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
