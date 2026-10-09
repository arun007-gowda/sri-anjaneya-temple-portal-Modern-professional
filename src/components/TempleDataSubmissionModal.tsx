import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dbSubmitTempleUpdate } from '../lib/supabase';
import { generateShareUrl, copyShareLink } from './SharedLinkAdapter';
import {
  FileText,
  X,
  Sparkles,
  CheckCircle2,
  Share2,
  Calendar,
  Clock,
  Send,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

export const TempleDataSubmissionModal: React.FC = () => {
  const { language, isDataModalOpen, setIsDataModalOpen, scrollToSection } = useLanguage();
  const isEn = language === 'en';

  const [form, setForm] = useState({
    title: '',
    category: 'announcement' as 'festival' | 'darshan' | 'announcement' | 'history' | 'seva' | 'renovation',
    content: '',
    date: new Date().toISOString().slice(0, 10),
    contributor: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isDataModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!form.title.trim()) {
      setErrorMsg(isEn ? 'Please provide a title for the temple update.' : 'ದಯವಿಟ್ಟು ಮಾಹಿತಿಯ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.');
      return;
    }
    if (!form.content.trim()) {
      setErrorMsg(isEn ? 'Please provide detailed content or notice details.' : 'ದಯವಿಟ್ಟು ವಿವರವಾದ ಮಾಹಿತಿ ಅಥವಾ ಪ್ರಕಟಣೆಯನ್ನು ನಮೂದಿಸಿ.');
      return;
    }
    if (!form.contributor.trim()) {
      setErrorMsg(isEn ? 'Please state your name or family affiliation.' : 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಅಥವಾ ಮನೆತನದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.');
      return;
    }

    setLoading(true);
    try {
      const result = await dbSubmitTempleUpdate({
        title: {
          en: form.title.trim(),
          kn: form.title.trim(),
        },
        category: form.category,
        content: {
          en: form.content.trim(),
          kn: form.content.trim(),
        },
        date: form.date,
        contributor: form.contributor.trim(),
      });

      if (result && result.data) {
        setSubmittedData(result.data);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit update. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyShareLink = async () => {
    if (!submittedData) return;
    const success = await copyShareLink(
      { update: submittedData.id, section: 'community-updates-section', lang: language },
      submittedData.title[language] || submittedData.title.en,
      submittedData.content[language] || submittedData.content.en
    );
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleClose = () => {
    setIsDataModalOpen(false);
    setSubmittedData(null);
    setForm({
      title: '',
      category: 'announcement',
      content: '',
      date: new Date().toISOString().slice(0, 10),
      contributor: '',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-sm overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="bg-[#FBF9F5] border border-stone-300 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedData ? (
          <div className="text-center py-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-300 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-cinzel font-bold text-stone-900 mb-2">
              {isEn ? 'Temple Update Live & Adopted!' : 'ಮಾಹಿತಿ ಪ್ರಕಟಗೊಂಡಿದೆ!'}
            </h3>

            <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
              {isEn
                ? 'Your submission has dynamically updated the temple bulletin board and is immediately rendered across the live site.'
                : 'ನಿಮ್ಮ ಪ್ರಕಟಣೆಯು ದೇವಸ್ಥಾನದ ಜಾಲತಾಣದಲ್ಲಿ ತಕ್ಷಣವೇ ಅಳವಡಿಸಲ್ಪಟ್ಟಿದೆ ಹಾಗೂ ನೇರವಾಗಿ ಪ್ರಸಾರವಾಗುತ್ತಿದೆ.'}
            </p>

            {/* Generated Share Link Box */}
            <div className="bg-amber-50 border border-amber-300/80 rounded-xl p-4 text-left mb-6 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
                  {isEn ? 'Dynamic Shared Link' : 'ಹಂಚಿಕೊಳ್ಳಬಹುದಾದ ಲಿಂಕ್'}
                </span>
                <span className="text-[11px] text-amber-700 font-mono">
                  ID: {submittedData.id}
                </span>
              </div>
              <p className="text-xs text-stone-700 font-medium mb-3">
                {isEn
                  ? 'Anyone opening this link will see your temple update highlighted and auto-cued on their screen:'
                  : 'ಈ ಲಿಂಕ್ ಅನ್ನು ತೆರೆಯುವ ಯಾವುದೇ ಭಕ್ತರಿಗೆ ಈ ಪ್ರಕಟಣೆ ತಕ್ಷಣವೇ ಎದ್ದು ಕಾಣಿಸುತ್ತದೆ:'}
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generateShareUrl({ update: submittedData.id, section: 'community-updates-section', lang: language })}
                  className="w-full text-xs bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-700 font-mono select-all focus:outline-none"
                />
                <button
                  onClick={handleCopyShareLink}
                  className="px-4 py-2 bg-[#701A28] hover:bg-[#58131E] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? (isEn ? 'Copied' : 'ನಕಲು') : (isEn ? 'Copy' : 'ನಕಲಿಸಿ')}</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  handleClose();
                  scrollToSection('community-updates-section');
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#701A28] text-white text-sm font-semibold rounded-xl hover:bg-[#58131E] transition-colors"
              >
                {isEn ? 'View On Bulletin Board' : 'ಸೂಚನಾ ಫಲಕದಲ್ಲಿ ವೀಕ್ಷಿಸಿ'}
              </button>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-stone-200 text-stone-800 text-sm font-medium rounded-xl hover:bg-stone-300 transition-colors"
              >
                {isEn ? 'Done' : 'ಮುಗಿಯಿತು'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-cinzel font-bold text-stone-900">
                  {isEn ? 'Publish Temple Update & Data' : 'ದೇವಸ್ಥಾನದ ಮಾಹಿತಿ / ಪ್ರಕಟಣೆ ಸೇರಿಸಿ'}
                </h3>
                <p className="text-xs text-stone-600">
                  {isEn
                    ? 'Share public notices, special pooja updates, historical oral notes, or seva changes.'
                    : 'ವಿಶೇಷ ಪೂಜೆಗಳು, ಹಬ್ಬದ ವಿವರಗಳು, ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು ಅಥವಾ ಪ್ರಕಟಣೆಗಳನ್ನು ನೇರವಾಗಿ ಹಂಚಿಕೊಳ್ಳಿ.'}
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {isEn ? 'Update Category' : 'ವಿಷಯದ ವಿಭಾಗ'}
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  className="w-full text-xs bg-white border border-stone-300 rounded-lg px-3 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="announcement">{isEn ? 'Public Notice / Announcement' : 'ಸಾರ್ವಜನಿಕ ಪ್ರಕಟಣೆ'}</option>
                  <option value="festival">{isEn ? 'Festival & Utsava Update' : 'ಉತ್ಸವ ಹಾಗೂ ಜಾತ್ರಾ ಮಾಹಿತಿ'}</option>
                  <option value="darshan">{isEn ? 'Darshan & Pooja Timings' : 'ದರ್ಶನ ಮತ್ತು ಪೂಜಾ ಕಾಲಮಾನ'}</option>
                  <option value="history">{isEn ? 'Historical Record / Oral Lore' : 'ಇತಿಹಾಸ ಮತ್ತು ಮೌಖಿಕ ಪರಂಪರೆ'}</option>
                  <option value="seva">{isEn ? 'Seva & Annadana Details' : 'ಸೇವೆ & ಅನ್ನದಾನದ ವಿವರ'}</option>
                  <option value="renovation">{isEn ? 'Renovation & Temple Work' : 'ಜೀರ್ಣೋದ್ಧಾರ & ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿ'}</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {isEn ? 'Headline / Notice Title' : 'ಶೀರ್ಷಿಕೆ'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    isEn
                      ? 'e.g. Special Hanuman Jayanti Mahabhisheka Timings'
                      : 'ಉದಾ: ವಿಶೇಷ ಹನುಮ ಜಯಂತಿ ಮಹಾಭಿಷೇಕದ ಕಾಲಮಾನ'
                  }
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full text-xs bg-white border border-stone-300 rounded-lg px-3 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {isEn ? 'Details & Description' : 'ಸಮಗ್ರ ಮಾಹಿತಿ & ವಿವರ'} *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    isEn
                      ? 'Provide complete dates, auspicious hours, arrangements, or historical insights...'
                      : 'ದಿನಾಂಕ, ಮುಹೂರ್ತ, ಪ್ರಸಾದ ವಿನಿಯೋಗ ಅಥವಾ ಇತಿಹಾಸದ ಸಮಗ್ರ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...'
                  }
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full text-xs bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Contributor Name & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isEn ? 'Your Name / Family Name' : 'ನಿಮ್ಮ ಹೆಸರು / ಮನೆತನ'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isEn ? 'e.g. Gowdru S. Manjunath' : 'ಉದಾ: ಗೌಡ್ರು ಎಸ್. ಮಂಜುನಾಥ್'}
                    value={form.contributor}
                    onChange={(e) => setForm({ ...form, contributor: e.target.value })}
                    className="w-full text-xs bg-white border border-stone-300 rounded-lg px-3 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isEn ? 'Date of Notice / Event' : 'ದಿನಾಂಕ'}
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full text-xs bg-white border border-stone-300 rounded-lg px-3 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-800"
                >
                  {isEn ? 'Cancel' : 'ರದ್ದುಮಾಡಿ'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#701A28] hover:bg-[#58131E] rounded-lg shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {loading ? (
                    <span>{isEn ? 'Publishing...' : 'ಪ್ರಕಟಿಸಲಾಗುತ್ತಿದೆ...'}</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Publish & Generate Share Link' : 'ಪ್ರಕಟಿಸಿ & ಲಿಂಕ್ ಪಡೆಯಿರಿ'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
