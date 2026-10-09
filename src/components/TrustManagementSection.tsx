import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Users, FileText, CheckCircle, Clock } from 'lucide-react';

export const TrustManagementSection: React.FC = () => {
  const { language, setIsAuditModalOpen, setIsAdminModalOpen } = useLanguage();
  const isEn = language === 'en';

  return (
    <section id="trust-section" className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#701A28] tracking-widest uppercase mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>{isEn ? 'Governance & Stewardship' : 'ದೇವಸ್ಥಾನ ಆಡಳಿತ ಮತ್ತು ನಿರ್ವಹಣೆ'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 leading-tight mb-2">
            {isEn ? 'Temple Administration' : 'ದೇವಸ್ಥಾನ ಆಡಳಿತ ಮಂಡಳಿ'}
          </h2>

          <div className="inline-block px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-[#701A28] text-xs sm:text-sm font-semibold mb-4">
            {isEn ? 'Managed by Thappagondanahalli Gowdru Families' : 'ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳು ನಿರ್ವಹಿಸುತ್ತಿದ್ದಾರೆ'}
          </div>

          <p className="text-base sm:text-lg font-editorial italic text-stone-700 leading-relaxed">
            {isEn
              ? 'Transparent administration committed to safeguarding the heritage, sanctum sanctity, and community trust of Sri Anjaneya Swamy Temple, Thappagondanahalli.'
              : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಧಾರ್ಮಿಕ ಪರಂಪರೆ, ಪಾವಿತ್ರ್ಯತೆ ಮತ್ತು ಭಕ್ತರ ನಂಬಿಕೆಯನ್ನು ಕಾಪಾಡುವ ಗೌಡ್ರು ಮನೆತನಗಳ ಹಾಗೂ ಸಮಿತಿಯ ಪಾರದರ್ಶಕ ಆಡಳಿತ.'}
          </p>
        </div>

        {/* 3 Grid Pillars of Governance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-[#701A28] mb-4 border border-amber-200">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-cinzel font-bold text-stone-900 mb-2">
              {isEn ? 'Gowdru Families Stewardship' : 'ಗೌಡ್ರು ಕುಟುಂಬಗಳ ನೇತೃತ್ವ'}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed font-sans mb-4">
              {isEn
                ? 'The temple is devoutly managed by the venerable Thappagondanahalli Gowdru Families in harmonious coordination with village elders, hereditary sevakartas, and enthusiastic local youth.'
                : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನವನ್ನು ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳು ಪಾರಂಪರಿಕ ಶ್ರದ್ಧೆಯಿಂದ, ಗ್ರಾಮದ ಹಿರಿಯರು ಮತ್ತು ಯುವಕರ ಸಹಯೋಗದೊಂದಿಗೆ ನಿರ್ವಹಿಸುತ್ತಿದ್ದಾರೆ.'}
            </p>
            <div className="text-xs text-[#701A28] font-mono font-semibold">
              {isEn ? 'Status: Active Hereditary Stewardship' : 'ಸ್ಥಿತಿ: ಗೌಡ್ರು ಕುಟುಂಬಗಳ ಸಕ್ರಿಯ ಆಡಳಿತ'}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-[#B45309] mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-cinzel font-bold text-stone-900 mb-2">
              {isEn ? 'Trust Documentation' : 'ಟ್ರಸ್ಟ್ ನೊಂದಣಿ ಪ್ರಕ್ರಿಯೆ'}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed font-sans mb-4">
              {isEn
                ? 'Official trust registration number and governing bylaws are being compiled for publication. In accordance with ethical standards, no unverified credentials are invented.'
                : 'ಅಧಿಕೃತ ಟ್ರಸ್ಟ್ ನೊಂದಣಿ ಸಂಖ್ಯೆ ಮತ್ತು ನಿಯಮಾವಳಿಗಳನ್ನು ದಾಖಲಿಸುವ ಪ್ರಕ್ರಿಯೆ ನಡೆಯುತ್ತಿದೆ. ಸತ್ಯನಿಷ್ಠ ನಿಯಮದಂತೆ ಯಾವುದೇ ನಕಲಿ ಸಂಖ್ಯೆಯನ್ನು ಪ್ರಕಟಿಸಿಲ್ಲ.'}
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{isEn ? 'Confirmation in Progress' : 'ಪರಿಶೀಲನಾ ಹಂತದಲ್ಲಿದೆ'}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-emerald-700 mb-4">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-cinzel font-bold text-stone-900 mb-2">
              {isEn ? 'Audit & Verification' : 'ದಾಖಲೆಗಳ ಪಾರದರ್ಶಕತೆ'}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed font-sans mb-4">
              {isEn
                ? 'Every geographical, census, and historical data point published on this portal is indexed in an open verification dataset accessible to all devotees.'
                : 'ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ನೀಡಲಾದ ಪ್ರತಿ ಭೌಗೋಳಿಕ, ಜನಗಣತಿ ಹಾಗೂ ಐತಿಹಾಸಿಕ ಮಾಹಿತಿಯು ಪರಿಶೀಲನಾ ವರದಿಯಲ್ಲಿ ಲಭ್ಯವಿದೆ.'}
            </p>
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="text-xs font-semibold text-[#701A28] hover:underline"
            >
              {isEn ? 'Inspect Verification Record →' : 'ಪರಿಶೀಲನಾ ವರದಿ ವೀಕ್ಷಿಸಿ →'}
            </button>
          </div>

        </div>

        {/* Committee Admin Access CTA Bar */}
        <div className="p-6 rounded-2xl bg-stone-100 border border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-cinzel font-bold text-stone-900">
              {isEn ? 'Are you a Temple Committee Member or Trustee?' : 'ನೀವು ದೇವಸ್ಥಾನ ಸಮಿತಿಯ ಸದಸ್ಯರೇ ಅಥವಾ ಟ್ರಸ್ಟಿಯೇ?'}
            </h4>
            <p className="text-xs text-stone-600 font-sans mt-0.5">
              {isEn
                ? 'Sign in to update official contact numbers, upload registered trust documents, or review pending community stories.'
                : 'ಅಧಿಕೃತ ದೂರವಾಣಿ ಸಂಖ್ಯೆಗಳನ್ನು ನವೀಕರಿಸಲು ಅಥವಾ ಭಕ್ತರ ಛಾಯಾಚಿತ್ರಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಸಮಿತಿ ಪೋರ್ಟಲ್‌ಗೆ ಪ್ರವೇಶಿಸಿ.'}
            </p>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold whitespace-nowrap shadow-xs"
          >
            {isEn ? 'Committee Portal' : 'ಸಮಿತಿ ಲಾಗಿನ್ ಪೋರ್ಟಲ್'}
          </button>
        </div>

      </div>
    </section>
  );
};
