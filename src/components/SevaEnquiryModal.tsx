import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { POOJA_SEVAS } from '../data/templeData';
import { dbSubmitInquiry } from '../lib/supabase';
import { Sparkles, X, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';

export const SevaEnquiryModal: React.FC = () => {
  const { language, isSevaEnquiryOpen, setIsSevaEnquiryOpen, selectedSevaId } = useLanguage();
  const isEn = language === 'en';

  const seva = POOJA_SEVAS.find((s) => s.id === selectedSevaId) || POOJA_SEVAS[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isSevaEnquiryOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await dbSubmitInquiry({
      name,
      phone,
      subject: `Seva Inquiry: ${seva.name.en}`,
      message: `Preferred date: ${date}. Notes: ${notes}`,
    });
    setLoading(false);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsSevaEnquiryOpen(false);
    }, 2500);
  };

  const whatsappText = encodeURIComponent(
    `Namaskara! I am inquiring about booking/participating in "${seva.name.en}" at Anjaneya Swamy Temple, Thappagondanahalli.`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
      onClick={() => setIsSevaEnquiryOpen(false)}
    >
      <div
        className="bg-[#FBF9F5] border border-stone-300 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsSevaEnquiryOpen(false)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-cinzel font-bold text-stone-900">
              {isEn ? 'Seva & Pooja Inquiry' : 'ಪೂಜಾ ಸೇವೆ ವಿಚಾರಣೆ'}
            </h2>
            <p className="text-xs text-stone-500 font-mono">
              Anjaneya Swamy Temple, Thappagondanahalli
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-lg font-cinzel font-bold text-emerald-900 mb-1">
              {isEn ? 'Inquiry Recorded' : 'ವಿಚಾರಣೆಯನ್ನು ದಾಖಲಿಸಿಕೊಳ್ಳಲಾಗಿದೆ'}
            </h3>
            <p className="text-xs text-emerald-700">
              {isEn
                ? 'The temple committee representative will contact you regarding the schedule.'
                : 'ದೇವಸ್ಥಾನ ಸಮಿತಿಯವರು ನಿಮ್ಮನ್ನು ಶೀಘ್ರವೇ ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.'}
            </p>
          </div>
        ) : (
          <div>
            <div className="p-4 rounded-xl bg-white border border-stone-200 mb-4">
              <div className="text-xs font-mono text-[#701A28] font-semibold mb-1">
                {seva.timing[language]}
              </div>
              <h3 className="text-base font-cinzel font-bold text-stone-900 mb-1">
                {seva.name[language]}
              </h3>
              <p className="text-xs text-stone-600 font-sans">{seva.description[language]}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  {isEn ? 'Your Name' : 'ನಿಮ್ಮ ಹೆಸರು'} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    {isEn ? 'Phone / WhatsApp' : 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    {isEn ? 'Preferred Date' : 'ಭೇಟಿಯ ದಿನಾಂಕ'}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  {isEn ? 'Notes (Family Gothra / Nakshatra / Specific request)' : 'ವಿಶೇಷ ವಿವರಣೆ / ಗೋತ್ರ / ನಕ್ಷತ್ರ'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isEn ? 'Optional details...' : 'ಐಚ್ಛಿಕ ವಿವರ...'}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#701A28] hover:bg-[#58131E] text-white text-xs font-semibold rounded-lg shadow-xs"
                >
                  {isEn ? 'Submit Inquiry' : 'ವಿಚಾರಣೆ ಕಳುಹಿಸಿ'}
                </button>

                <a
                  href={`https://wa.me/?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
