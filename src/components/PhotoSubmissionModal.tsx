import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dbSubmitPhoto } from '../lib/supabase';
import { copyShareLink, generateShareUrl } from './SharedLinkAdapter';
import {
  Upload,
  X,
  ShieldAlert,
  CheckCircle2,
  Image as ImageIcon,
  Link as LinkIcon,
  RefreshCw,
  AlertCircle,
  Copy,
  Check,
  Share2,
  Sparkles,
} from 'lucide-react';

export const PhotoSubmissionModal: React.FC = () => {
  const { language, isPhotoModalOpen, setIsPhotoModalOpen, scrollToSection } = useLanguage();
  const isEn = language === 'en';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    contributor: '',
    contact: '',
    category: 'temple',
    caption: '',
    dateTaken: '',
    consent: false,
  });

  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processingImage, setProcessingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedPhoto, setSubmittedPhoto] = useState<any | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isPhotoModalOpen) return null;

  // Process and compress image file using HTML5 canvas
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg(isEn ? 'Please select a valid image file (JPG, PNG, WebP).' : 'ದಯವಿಟ್ಟು ಚಿತ್ರದ ಫೈಲ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ (JPG, PNG, WebP).');
      return;
    }

    setProcessingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setImagePreview(compressedDataUrl);
          setImageUrl(compressedDataUrl);
        }
        setProcessingImage(false);
      };
      img.onerror = () => {
        setErrorMsg(isEn ? 'Could not read image file.' : 'ಚಿತ್ರವನ್ನು ಓದಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.');
        setProcessingImage(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    setImagePreview(url);
  };

  const handleClearImage = () => {
    setImageUrl('');
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!imageUrl && !imagePreview) {
      setErrorMsg(
        isEn
          ? 'Please attach an image file or provide an image link to submit.'
          : 'ದಯವಿಟ್ಟು ಛಾಯಾಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಲಿಂಕ್ ನೀಡಿ.'
      );
      return;
    }

    if (!form.consent) {
      setErrorMsg(
        isEn
          ? 'Please acknowledge that you own rights to this photograph and grant permission for temple archival documentation.'
          : 'ದಯವಿಟ್ಟು ಛಾಯಾಚಿತ್ರದ ಹಕ್ಕುಸ್ವಾಮ್ಯ ಹಾಗೂ ಸಮಿತಿಯ ಪ್ರಕಟಣಾ ಅನುಮತಿಯನ್ನು ದೃಢೀಕರಿಸಿ.'
      );
      return;
    }

    setLoading(true);
    try {
      const res = await dbSubmitPhoto({
        contributor: form.contributor,
        contact: form.contact,
        category: form.category,
        caption: form.caption,
        date_taken: form.dateTaken,
        image_url: imageUrl || imagePreview || '',
      });
      if (res && res.data) {
        setSubmittedPhoto(res.data);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit photo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPhotoShareLink = async () => {
    if (!submittedPhoto) return;
    const success = await copyShareLink(
      { photo: submittedPhoto.id, section: 'gallery-section', lang: language },
      submittedPhoto.caption || 'Temple Photo',
      'Archival photograph of Sri Anjaneya Swamy Temple, Thappagondanahalli'
    );
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleClose = () => {
    setIsPhotoModalOpen(false);
    setSubmittedPhoto(null);
    setForm({
      contributor: '',
      contact: '',
      category: 'temple',
      caption: '',
      dateTaken: '',
      consent: false,
    });
    setImagePreview(null);
    setImageUrl('');
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
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#701A28] text-white flex items-center justify-center shrink-0">
            <Upload className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h2 className="text-xl font-cinzel font-bold text-stone-900">
              {isEn ? 'Share a Temple or Village Photo' : 'ಛಾಯಾಚಿತ್ರವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ'}
            </h2>
            <p className="text-xs text-stone-600 font-sans">
              {isEn
                ? 'Sri Anjaneya Swamy Temple · Managed by Thappagondanahalli Gowdru Families'
                : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ · ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳು'}
            </p>
          </div>
        </div>

        {submittedPhoto ? (
          <div className="p-6 text-center bg-emerald-50 rounded-2xl border border-emerald-200 animate-in fade-in duration-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-xl font-cinzel font-bold text-emerald-950 mb-1">
              {isEn ? 'Photograph Live & Dynamic Link Generated!' : 'ಚಿತ್ರವು ಯಶಸ್ವಿಯಾಗಿ ಲೈವ್ ಆಗಿದೆ!'}
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto mb-5">
              {isEn
                ? 'Your photograph has been added to the public temple archive and the live gallery has upgraded automatically.'
                : 'ನಿಮ್ಮ ಛಾಯಾಚಿತ್ರವು ದೇವಸ್ಥಾನದ ಚಿತ್ರಶಾಲೆಗೆ ಸೇರ್ಪಡೆಯಾಗಿದೆ ಮತ್ತು ತಕ್ಷಣವೇ ಲೈವ್ ಆಗಿದೆ.'}
            </p>

            {/* Dynamic Share URL Container */}
            <div className="bg-white border border-emerald-300 rounded-xl p-4 text-left mb-5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {isEn ? 'Dynamic Direct Photo Link' : 'ನೇರ ಛಾಯಾಚಿತ್ರ ಲಿಂಕ್'}
                </span>
                <span className="text-[11px] text-emerald-700 font-mono">
                  ID: {submittedPhoto.id}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generateShareUrl({ photo: submittedPhoto.id, section: 'gallery-section', lang: language })}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-700 font-mono select-all focus:outline-none"
                />
                <button
                  onClick={handleCopyPhotoShareLink}
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
                  scrollToSection('gallery-section');
                  window.dispatchEvent(new CustomEvent('temple_open_shared_photo', { detail: { photoId: submittedPhoto.id } }));
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#701A28] text-white text-xs font-semibold rounded-xl hover:bg-[#58131E] transition-colors"
              >
                {isEn ? 'Open In Gallery Lightbox' : 'ಚಿತ್ರಶಾಲೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ'}
              </button>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-stone-200 text-stone-800 text-xs font-medium rounded-xl hover:bg-stone-300 transition-colors"
              >
                {isEn ? 'Close' : 'ಮುಚ್ಚಿ'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p>
                {isEn
                  ? 'Authenticity Rule: Please submit genuine photographs of Sri Anjaneya Swamy Temple, the sanctum, stone craft, or village gatherings of Thappagondanahalli.'
                  : 'ಸತ್ಯನಿಷ್ಠೆ ನಿಯಮ: ಕೇವಲ ತಪಗೊಂಡನಹಳ್ಳಿಯ ದೇವಸ್ಥಾನ, ಗರ್ಭಗುಡಿ, ಶಿಲ್ಪಕಲೆ ಅಥವಾ ಗ್ರಾಮ ಪರಿಸರದ ಚಿತ್ರಗಳನ್ನು ಮಾತ್ರ ಕಳುಹಿಸಲು ಕೋರಲಾಗಿದೆ.'}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p>{errorMsg}</p>
              </div>
            )}

            {/* Image Selection Block: File Upload or Web URL */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#701A28]" />
                  <span>{isEn ? 'Select Image' : 'ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ'} *</span>
                </label>

                {/* Mode Selector */}
                <div className="flex items-center rounded-lg bg-stone-100 p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setImageMode('upload')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                      imageMode === 'upload' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {isEn ? 'Upload File' : 'ಫೈಲ್ ಅಪ್ಲೋಡ್'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode('url')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                      imageMode === 'url' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {isEn ? 'Image URL' : 'ವೆಬ್ ಲಿಂಕ್'}
                  </button>
                </div>
              </div>

              {/* Upload Dropzone */}
              {imageMode === 'upload' ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="photoFileInput"
                  />
                  {!imagePreview ? (
                    <label
                      htmlFor="photoFileInput"
                      className="border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-stone-50/50 hover:bg-amber-50/30 transition-all text-center group"
                    >
                      {processingImage ? (
                        <div className="flex flex-col items-center">
                          <RefreshCw className="w-8 h-8 text-amber-600 animate-spin mb-2" />
                          <span className="text-xs text-stone-600">{isEn ? 'Processing photograph...' : 'ಚಿತ್ರವನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...'}</span>
                        </div>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-full bg-stone-200/70 group-hover:bg-amber-200/80 flex items-center justify-center text-stone-700 group-hover:text-amber-900 mb-2 transition-colors">
                            <Upload className="w-5 h-5" />
                          </div>
                          <p className="text-xs font-medium text-stone-800">
                            {isEn ? 'Click to select photo or take picture' : 'ಚಿತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ'}
                          </p>
                          <p className="text-[11px] text-stone-500 mt-1 font-mono">
                            Supports JPG, PNG, WebP (Automatically optimized)
                          </p>
                        </>
                      )}
                    </label>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-stone-300 bg-stone-900 max-h-56 flex items-center justify-center group">
                      <img
                        src={imagePreview}
                        alt="Submission preview"
                        className="max-h-56 w-auto object-contain mx-auto"
                      />
                      <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <label
                          htmlFor="photoFileInput"
                          className="px-3 py-1.5 bg-white text-stone-900 text-xs font-semibold rounded-lg shadow-sm cursor-pointer hover:bg-stone-100"
                        >
                          {isEn ? 'Change Photo' : 'ಚಿತ್ರ ಬದಲಾಯಿಸಿ'}
                        </label>
                        <button
                          type="button"
                          onClick={handleClearImage}
                          className="px-3 py-1.5 bg-rose-600 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-rose-700"
                        >
                          {isEn ? 'Remove' : 'ತೆಗೆದುಹಾಕಿ'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder="https://example.com/thappagondanahalli-temple.jpg"
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-300 text-xs bg-stone-50/50"
                    />
                    <LinkIcon className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  </div>
                  {imageUrl && (
                    <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-100 max-h-48 flex items-center justify-center">
                      <img
                        src={imageUrl}
                        alt="URL Preview"
                        className="max-h-48 w-auto object-contain"
                        onError={() => setErrorMsg(isEn ? 'Could not load image from this URL.' : 'ಈ ಲಿಂಕ್‌ನಿಂದ ಚಿತ್ರವನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.')}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Contributor and Contact Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  {isEn ? 'Photographer / Contributor Name' : 'ನಿಮ್ಮ ಹೆಸರು / ಛಾಯಾಗ್ರಾಹಕರು'} *
                </label>
                <input
                  type="text"
                  required
                  value={form.contributor}
                  onChange={(e) => setForm({ ...form, contributor: e.target.value })}
                  placeholder={isEn ? 'e.g. Arun Gowda' : 'ಹೆಸರು'}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  {isEn ? 'Phone or Email' : 'ದೂರವಾಣಿ ಅಥವಾ ಇಮೇಲ್'} *
                </label>
                <input
                  type="text"
                  required
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  placeholder="+91 or email"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
            </div>

            {/* Category and Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  {isEn ? 'Category' : 'ವರ್ಗ'}
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white"
                >
                  <option value="temple">{isEn ? 'Temple Sanctum / Deity' : 'ಗರ್ಭಗುಡಿ / ಮೂರ್ತಿ'}</option>
                  <option value="village">{isEn ? 'Thappagondanahalli Village' : 'ಗ್ರಾಮ ಪರಿಸರ'}</option>
                  <option value="architecture">{isEn ? 'Stone Craft & Carvings' : 'ಶಿಲ್ಪಕಲೆ'}</option>
                  <option value="festivals">{isEn ? 'Festivals & Utsavas' : 'ಉತ್ಸವಗಳು'}</option>
                  <option value="tradition">{isEn ? 'Devotional Items & Pooja' : 'ಪೂಜಾ ದ್ರವ್ಯಗಳು'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  {isEn ? 'Estimated Year / Date' : 'ವರ್ಷ / ದಿನಾಂಕ'}
                </label>
                <input
                  type="text"
                  value={form.dateTaken}
                  onChange={(e) => setForm({ ...form, dateTaken: e.target.value })}
                  placeholder="e.g. 2026 or 1990s"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white"
                />
              </div>
            </div>

            {/* Caption */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {isEn ? 'Photo Caption / Story' : 'ಚಿತ್ರದ ವಿವರಣೆ'} *
              </label>
              <textarea
                rows={2}
                required
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                placeholder={isEn ? 'Brief description of the event or view...' : 'ಚಿತ್ರದ ಬಗೆಗಿನ ಸಂಕ್ಷಿಪ್ತ ಮಾಹಿತಿ...'}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="photoConsent"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="mt-0.5 rounded text-[#701A28] focus:ring-[#701A28]"
                required
              />
              <label htmlFor="photoConsent" className="text-xs text-stone-600 cursor-pointer leading-normal">
                {isEn
                  ? 'I confirm this photograph belongs to Thappagondanahalli and grant consent for its non-commercial archival publication by the temple management.'
                  : 'ಈ ಛಾಯಾಚಿತ್ರವು ತಪಗೊಂಡನಹಳ್ಳಿಗೆ ಸಂಬಂಧಿಸಿದ್ದಾಗಿದ್ದು, ದೇವಸ್ಥಾನದ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಪ್ರಕಟಿಸಲು ಸಮ್ಮತಿಸುತ್ತೇನೆ.'}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || processingImage}
              className="w-full py-3 bg-[#701A28] hover:bg-[#58131E] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>{isEn ? 'Uploading & Submitting...' : 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...'}</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 text-amber-300" />
                  <span>{isEn ? 'Submit Photograph for Review' : 'ಪರಿಶೀಲನೆಗಾಗಿ ಸಲ್ಲಿಸಿ'}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
