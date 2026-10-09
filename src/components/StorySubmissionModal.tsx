import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dbSubmitStory } from '../lib/supabase';
import { PenLine, X, CheckCircle2, HeartHandshake } from 'lucide-react';

export const StorySubmissionModal: React.FC = () => {
  const { language, isStoryModalOpen, setIsStoryModalOpen } = useLanguage();
  const isEn = language === 'en';

  const [form, setForm] = useState({
    author: '',
    village: 'Thappagondanahalli',
    contact: '',
    title: '',
    story: '',
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isStoryModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      alert(
        isEn
          ? 'Please acknowledge consent for your memory to be preserved and published.'
          : 'ದಯವಿಟ್ಟು ನೆನಪನ್ನು ಪ್ರಕಟಿಸಲು ಸಮ್ಮತಿಯನ್ನು ದೃಢೀಕರಿಸಿ.'
      );
      return;
    }

    setLoading(true);
    await dbSubmitStory({
      author: form.author,
      village: form.village,
      contact: form.contact,
      title: form.title,
      story: form.story,
    });
    setLoading(false);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsStoryModalOpen(false);
      setForm({
        author: '',
        village: 'Thappagondanahalli',
        contact: '',
        title: '',
        story: '',
        consent: false,
      });
    }, 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
      onClick={() => setIsStoryModalOpen(false)}
    >
      <div
        className="bg-[#FBF9F5] border border-stone-300 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsStoryModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#701A28] text-white flex items-center justify-center">
            <PenLine className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h2 className="text-xl font-cinzel font-bold text-stone-900">
              {isEn ? 'Share a Village Memory' : 'ಗ್ರಾಮದ ನೆನಪನ್ನು ಹಂಚಿಕೊಳ್ಳಿ'}
            </h2>
            <p className="text-xs text-stone-500 font-mono">
              Voices of Thappagondanahalli Community
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-lg font-cinzel font-bold text-emerald-900 mb-1">
              {isEn ? 'Memory Received With Gratitude' : 'ನಿಮ್ಮ ನೆನಪನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ'}
            </h3>
            <p className="text-xs text-emerald-700">
              {isEn
                ? 'Thank you for preserving the living history of our village. Our committee will review and archive your contribution.'
                : 'ಗ್ರಾಮದ ಇತಿಹಾಸವನ್ನು ಜೀವಂತವಾಗಿರಿಸಲು ಕೈಜೋಡಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ಸಮಿತಿಯು ಇದನ್ನು ಪರಿಶೀಲಿಸಲಿದೆ.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  {isEn ? 'Your Name' : 'ನಿಮ್ಮ ಹೆಸರು'} *
                </label>
                <input
                  type="text"
                  required
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder={isEn ? 'Full name' : 'ಪೂರ್ಣ ಹೆಸರು'}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  {isEn ? 'Village / Present Location' : 'ಗ್ರಾಮ / ಈಗಿರುವ ಊರು'} *
                </label>
                <input
                  type="text"
                  required
                  value={form.village}
                  onChange={(e) => setForm({ ...form, village: e.target.value })}
                  placeholder="e.g. Thappagondanahalli / Bengaluru"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {isEn ? 'Contact Phone or Email' : 'ದೂರವಾಣಿ ಅಥವಾ ಇಮೇಲ್'} *
              </label>
              <input
                type="text"
                required
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                placeholder="+91 / email"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {isEn ? 'Memory Title' : 'ನೆನಪಿನ ಶೀರ್ಷಿಕೆ'} *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder={isEn ? 'e.g. Festival Memories of My Grandparents' : 'ಉದಾಹರಣೆಗೆ: ಜಾತ್ರೆಯ ಸವಿ ನೆನಪು'}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {isEn ? 'Your Story or Experience' : 'ನಿಮ್ಮ ಅನುಭವ / ಕಥೆ'} *
              </label>
              <textarea
                rows={5}
                required
                value={form.story}
                onChange={(e) => setForm({ ...form, story: e.target.value })}
                placeholder={
                  isEn
                    ? 'Write your recollection of temple celebrations, village life, or devotional gratitude...'
                    : 'ದೇವಸ್ಥಾನದ ಆಚರಣೆ, ಹಿರಿಯರ ಮಾತುಗಳು ಅಥವಾ ನಿಮ್ಮ ಭಕ್ತಿಯ ಅನುಭವವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...'
                }
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="storyConsent"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="mt-1"
                required
              />
              <label htmlFor="storyConsent" className="text-xs text-stone-600 cursor-pointer">
                {isEn
                  ? 'I affirm that this account is genuine and authorize the temple trust to publish it with my name.'
                  : 'ಈ ಮಾಹಿತಿ ಸತ್ಯವಾಗಿದ್ದು, ದೇವಸ್ಥಾನದ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಪ್ರಕಟಿಸಲು ಒಪ್ಪಿಗೆ ನೀಡುತ್ತೇನೆ.'}
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#701A28] hover:bg-[#58131E] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              {isEn ? 'Submit Memory for Archive' : 'ನೆನಪನ್ನು ಸಂಗ್ರಹಕ್ಕೆ ಸಲ್ಲಿಸಿ'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
