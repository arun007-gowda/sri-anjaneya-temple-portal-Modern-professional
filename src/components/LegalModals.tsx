import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, X, FileText, CheckCircle } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'photo-policy' | 'donation-policy' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  if (!type) return null;

  const getTitle = () => {
    switch (type) {
      case 'privacy':
        return isEn ? 'Privacy Policy' : 'ಗೌಪ್ಯತಾ ನೀತಿ';
      case 'terms':
        return isEn ? 'Terms of Use' : 'ಬಳಕೆಯ ನಿಯಮಗಳು';
      case 'photo-policy':
        return isEn ? 'Photo Submission & Copyright Policy' : 'ಛಾಯಾಚಿತ್ರ ಸಲ್ಲಿಕೆ ಹಾಗೂ ಹಕ್ಕುಸ್ವಾಮ್ಯ ನೀತಿ';
      case 'donation-policy':
        return isEn ? 'Donation Transparency Disclaimer' : 'ದೇಣಿಗೆ ಪಾರದರ್ಶಕತೆ ನೀತಿ';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#FBF9F5] border border-stone-300 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-stone-200">
          <div className="w-9 h-9 rounded-lg bg-[#701A28] text-white flex items-center justify-center">
            <FileText className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h2 className="text-xl font-cinzel font-bold text-stone-900">{getTitle()}</h2>
            <p className="text-xs text-stone-500 font-mono">
              Anjaneya Swamy Temple, Thappagondanahalli
            </p>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 pr-2 space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
          {type === 'privacy' && (
            <>
              <p>
                {isEn
                  ? 'The management of Anjaneya Swamy Temple, Thappagondanahalli is deeply committed to preserving the privacy and trust of all devotees and visitors.'
                  : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ, ತಪಗೊಂಡನಹಳ್ಳಿ ಆಡಳಿತ ಮಂಡಳಿಯು ಭಕ್ತರ ಗೌಪ್ಯತೆಯನ್ನು ಗೌರವಿಸುತ್ತದೆ.'}
              </p>
              <h4 className="font-bold text-stone-900 font-cinzel">1. Personal Data Collection</h4>
              <p>
                {isEn
                  ? 'Information submitted through our contact and story submission forms (such as name, phone number, and email) is utilized exclusively for addressing temple inquiries and coordinating community archival memories. We never sell, lease, or monetize devotee data.'
                  : 'ಸಂಪರ್ಕ ಫಾರಂ ಅಥವಾ ನೆನಪುಗಳ ಸಲ್ಲಿಕೆ ಮೂಲಕ ಪಡೆದ ಮಾಹಿತಿಯನ್ನು ಕೇವಲ ದೇವಸ್ಥಾನದ ವಿಚಾರಣೆಗಳಿಗೆ ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ.'}
              </p>
              <h4 className="font-bold text-stone-900 font-cinzel">2. No Unsolicited Telemarketing</h4>
              <p>
                {isEn
                  ? 'Devotee phone numbers are never shared with commercial entities or third-party marketers.'
                  : 'ಭಕ್ತರ ದೂರವಾಣಿ ಸಂಖ್ಯೆಗಳನ್ನು ಯಾವುದೇ ಮೂರನೇ ವ್ಯಕ್ತಿಗೆ ಅಥವಾ ವಾಣಿಜ್ಯ ಸಂಸ್ಥೆಗೆ ನೀಡುವುದಿಲ್ಲ.'}
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                {isEn
                  ? 'Welcome to the digital portal of Anjaneya Swamy Temple, Thappagondanahalli. By accessing this portal, you agree to respect its spiritual, historical, and community-oriented purpose.'
                  : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇಗುಲದ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಸ್ವಾಗತ.'}
              </p>
              <h4 className="font-bold text-stone-900 font-cinzel">1. Non-Commercial Devotional Use</h4>
              <p>
                {isEn
                  ? 'The historical narratives, architectural studies, and community oral accounts published herein are dedicated to cultural preservation. Reposting content for commercial exploitation without prior written consent is strictly prohibited.'
                  : 'ಇಲ್ಲಿರುವ ಇತಿಹಾಸ ಹಾಗೂ ಛಾಯಾಚಿತ್ರಗಳನ್ನು ವಾಣಿಜ್ಯ ಉದ್ದೇಶಕ್ಕೆ ಬಳಸುವುದನ್ನು ನಿಷೇಧಿಸಲಾಗಿದೆ.'}
              </p>
            </>
          )}

          {type === 'photo-policy' && (
            <>
              <h4 className="font-bold text-stone-900 font-cinzel">Authentic Attribution & Rights</h4>
              <p>
                {isEn
                  ? 'All images displayed on this portal represent either documented archival studies or verified community contributions specifically belonging to Thappagondanahalli. In accordance with Section 34 of our foundational mandate, photographs of other temples are never substituted.'
                  : 'ಬೇರೆ ದೇವಾಲಯಗಳ ಫೋಟೋಗಳನ್ನು ಇಲ್ಲಿ ಪ್ರದರ್ಶಿಸುವುದಿಲ್ಲ. ತಪಗೊಂಡನಹಳ್ಳಿಯ ಚಿತ್ರಗಳನ್ನು ಮಾತ್ರ ಸತ್ಯನಿಷ್ಠೆಯಿಂದ ಪ್ರಕಟಿಸಲಾಗುತ್ತದೆ.'}
              </p>
            </>
          )}

          {type === 'donation-policy' && (
            <>
              <h4 className="font-bold text-stone-900 font-cinzel">Zero Fabricated Payment Channels</h4>
              <p>
                {isEn
                  ? 'In compliance with strict anti-fraud measures, online donation banking details will only be activated after formal verification and passing of a resolution by the official temple trust. Never transfer money to any individual claiming to represent this temple without obtaining an official printed physical receipt at Thappagondanahalli.'
                  : 'ದೇವಸ್ಥಾನ ಸಮಿತಿಯು ಅನುಮೋದಿಸುವವರೆಗೆ ಯಾವುದೇ ಆನ್‌ಲೈನ್ ಬ್ಯಾಂಕ್ ಖಾತೆ ನೀಡಿಲ್ಲ. ರಸೀದಿ ಇಲ್ಲದೆ ಯಾರಿಗೂ ಹಣ ನೀಡಬೇಡಿ.'}
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-stone-200 mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
          >
            {isEn ? 'Close' : 'ಮುಚ್ಚಿ'}
          </button>
        </div>
      </div>
    </div>
  );
};
