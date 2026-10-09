import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  dbGetInquiries,
  dbDeleteInquiry,
  dbGetPhotos,
  dbApprovePhoto,
  dbDeletePhoto,
  dbSubmitPhoto,
  dbGetStories,
  dbApproveStory,
  dbTestConnection,
  dbGetBookings,
  SUPABASE_CONFIG,
  SUPABASE_SCHEMA_SQL,
} from '../lib/supabase';
import { AppointmentBooking } from '../types';
import { BookingDashboardView } from './BookingDashboardView';
import {
  ShieldAlert,
  X,
  Check,
  Trash2,
  MessageSquare,
  Image,
  Users,
  Database,
  Copy,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Calendar,
  Upload,
  Plus,
} from 'lucide-react';

export const AdminPortalModal: React.FC = () => {
  const { language, isAdminModalOpen, setIsAdminModalOpen } = useLanguage();
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<'BOOKINGS' | 'INQUIRIES' | 'PHOTOS' | 'STORIES' | 'SUPABASE'>('BOOKINGS');
  const [bookings, setBookings] = useState<AppointmentBooking[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [submittedPhotos, setSubmittedPhotos] = useState<any[]>([]);
  const [submittedStories, setSubmittedStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string; tablesExist: boolean } | null>(null);
  const [testing, setTesting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const [bks, inqs, photos, stories] = await Promise.all([
      dbGetBookings(),
      dbGetInquiries(),
      dbGetPhotos(),
      dbGetStories(),
    ]);
    setBookings(bks || []);
    setInquiries(inqs || []);
    setSubmittedPhotos(photos || []);
    setSubmittedStories(stories || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdminModalOpen) {
      loadData();
    }
  }, [isAdminModalOpen]);

  if (!isAdminModalOpen) return null;

  const handleDeleteInquiry = async (id: string) => {
    await dbDeleteInquiry(id);
    setInquiries((prev) => prev.filter((q) => q.id !== id));
  };

  const handleApprovePhoto = async (id: string) => {
    await dbApprovePhoto(id);
    setSubmittedPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'APPROVED' } : p))
    );
  };

  const handleDeletePhoto = async (id: string) => {
    if (confirm(isEn ? 'Are you sure you want to remove this photo?' : 'ಈ ಫೋಟೋವನ್ನು ತೆಗೆದುಹಾಕಲು ಖಚಿತವೇ?')) {
      await dbDeletePhoto(id);
      setSubmittedPhotos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    contributor: 'Thappagondanahalli Gowdru Families (Admin)',
    contact: 'Official',
    category: 'temple',
    caption: '',
    image_url: '',
    date_taken: new Date().getFullYear().toString(),
  });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const handleAdminPhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 1200;
        let w = img.width;
        let h = img.height;
        if (w > h && w > MAX) {
          h *= MAX / w;
          w = MAX;
        } else if (h > MAX) {
          w *= MAX / h;
          h = MAX;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          setNewPhoto((prev) => ({ ...prev, image_url: canvas.toDataURL('image/jpeg', 0.85) }));
        }
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAdminPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.image_url) {
      alert(isEn ? 'Please attach an image or paste a photo link.' : 'ದಯವಿಟ್ಟು ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಲಿಂಕ್ ನೀಡಿ.');
      return;
    }
    setUploadingPhoto(true);
    await dbSubmitPhoto({
      ...newPhoto,
      status: 'APPROVED',
    });
    setUploadingPhoto(false);
    setShowAddPhoto(false);
    setNewPhoto({
      contributor: 'Thappagondanahalli Gowdru Families (Admin)',
      contact: 'Official',
      category: 'temple',
      caption: '',
      image_url: '',
      date_taken: new Date().getFullYear().toString(),
    });
    loadData();
  };

  const handleApproveStory = async (id: string) => {
    await dbApproveStory(id);
    setSubmittedStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, approved: true } : s))
    );
  };

  const copySqlSchema = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(SUPABASE_CONFIG.apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 3000);
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await dbTestConnection();
      setTestResult(res);
    } catch (e: any) {
      setTestResult({ ok: false, message: e.message || 'Connection test failed', tablesExist: false });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-sm"
      onClick={() => setIsAdminModalOpen(false)}
    >
      <div
        className="bg-[#FBF9F5] border border-stone-300 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#701A28] text-white flex items-center justify-center shadow-xs">
              <Calendar className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-cinzel font-bold text-stone-900 leading-tight">
                {isEn ? 'Temple Administration & Devotee Booking Portal' : 'ದೇವಸ್ಥಾನ ಆಡಳಿತ ಮತ್ತು ಭಕ್ತರ ಬುಕಿಂಗ್ ಪೋರ್ಟಲ್'}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 font-sans">
                <span className="font-semibold text-[#701A28]">
                  {isEn ? 'Managed by Thappagondanahalli Gowdru Families' : 'ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳು'}
                </span>
                <span>·</span>
                <span className="text-emerald-700 flex items-center gap-1 font-mono font-semibold">
                  <Database className="w-3 h-3" />
                  Supabase: {SUPABASE_CONFIG.projectId}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="px-6 pt-3 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('BOOKINGS')}
            className={`py-2 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'BOOKINGS'
                ? 'border-[#701A28] text-[#701A28] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#701A28]" />
            <span>
              {isEn ? 'Appointments & Bookings' : 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ & ಬುಕಿಂಗ್'}
            </span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
              activeTab === 'BOOKINGS' ? 'bg-[#701A28] text-white' : 'bg-stone-200 text-stone-700'
            }`}>
              {bookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('INQUIRIES')}
            className={`py-2 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'INQUIRIES'
                ? 'border-[#701A28] text-[#701A28] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>
              {isEn ? 'Devotee Inquiries' : 'ಸಂದೇಶಗಳು'} ({inquiries.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('PHOTOS')}
            className={`py-2 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'PHOTOS'
                ? 'border-[#701A28] text-[#701A28] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>
              {isEn ? 'Photo Queue' : 'ಫೋಟೋ ಪರಿಶೀಲನೆ'} ({submittedPhotos.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('STORIES')}
            className={`py-2 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'STORIES'
                ? 'border-[#701A28] text-[#701A28] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>
              {isEn ? 'Oral Memories' : 'ನೆನಪುಗಳ ಪರಿಶೀಲನೆ'} ({submittedStories.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('SUPABASE')}
            className={`py-2 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'SUPABASE'
                ? 'border-[#701A28] text-[#701A28] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isEn ? 'Supabase Backend & SQL' : 'ಡೇಟಾಬೇಸ್ ಮತ್ತು SQL'}</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 0: APPOINTMENTS & BOOKINGS */}
          {activeTab === 'BOOKINGS' && (
            <BookingDashboardView
              bookings={bookings}
              onRefresh={loadData}
              loading={loading}
            />
          )}

          {/* TAB 1: INQUIRIES */}
          {activeTab === 'INQUIRIES' && (
            <div className="space-y-3">
              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  {isEn
                    ? 'No devotee inquiries yet. Submissions from Contact & Seva forms will sync here.'
                    : 'ಇನ್ನೂ ಯಾವುದೇ ಸಂದೇಶಗಳು ಬಂದಿಲ್ಲ.'}
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-1">
                        <span className="font-semibold text-stone-900">{inq.name}</span>
                        <span>·</span>
                        <span>{inq.phone}</span>
                        {inq.email && <span>· {inq.email}</span>}
                      </div>
                      <div className="text-xs font-semibold text-[#701A28] mb-1">{inq.subject}</div>
                      <p className="text-xs text-stone-700 font-sans leading-relaxed">{inq.message}</p>
                      <div className="text-[10px] text-stone-400 mt-2 font-mono">
                        {new Date(inq.created_at || inq.submittedAt || Date.now()).toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="p-1.5 text-stone-400 hover:text-red-700 rounded-md hover:bg-stone-100"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: PHOTOS */}
          {activeTab === 'PHOTOS' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-stone-100 rounded-xl border border-stone-200">
                <div>
                  <h4 className="text-xs font-bold text-stone-900 font-cinzel">
                    {isEn ? 'Archival Photo Gallery Management' : 'ಚಿತ್ರಶಾಲೆ ನಿರ್ವಹಣೆ'}
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    {isEn
                      ? 'Approved photos display live in the public gallery. You can also upload temple photos directly.'
                      : 'ಅನುಮೋದಿಸಿದ ಫೋಟೋಗಳು ನೇರವಾಗಿ ಸಾರ್ವಜನಿಕ ಚಿತ್ರಶಾಲೆಯಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.'}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddPhoto(true)}
                  className="px-3 py-1.5 bg-[#701A28] hover:bg-[#58131E] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isEn ? 'Add Temple Photo' : 'ಹೊಸ ಫೋಟೋ ಸೇರಿಸಿ'}</span>
                </button>
              </div>

              {/* Direct Photo Upload Sub-modal / Card */}
              {showAddPhoto && (
                <div className="p-4 rounded-xl bg-white border-2 border-amber-300 shadow-md space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-[#701A28]" />
                      <span>{isEn ? 'Add Official Temple Photo' : 'ದೇವಸ್ಥಾನದ ಚಿತ್ರವನ್ನು ಸೇರಿಸಿ'}</span>
                    </h5>
                    <button
                      onClick={() => setShowAddPhoto(false)}
                      className="text-stone-400 hover:text-stone-700 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveAdminPhoto} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          {isEn ? 'Upload Image File (from device)' : 'ಚಿತ್ರದ ಫೈಲ್ ಅಪ್ಲೋಡ್'}
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAdminPhotoFile}
                          className="w-full text-xs text-stone-600 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:bg-stone-200 file:text-stone-800 hover:file:bg-stone-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          {isEn ? 'Or Paste Image URL' : 'ಅಥವಾ ಚಿತ್ರದ ವೆಬ್ ಲಿಂಕ್'}
                        </label>
                        <input
                          type="url"
                          value={newPhoto.image_url}
                          onChange={(e) => setNewPhoto({ ...newPhoto, image_url: e.target.value })}
                          placeholder="https://...jpg"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-stone-50"
                        />
                      </div>
                    </div>

                    {newPhoto.image_url && (
                      <div className="p-2 bg-stone-900 rounded-lg max-h-36 flex items-center justify-center">
                        <img
                          src={newPhoto.image_url}
                          alt="Preview"
                          className="max-h-32 object-contain rounded"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          {isEn ? 'Caption / Description' : 'ಚಿತ್ರದ ವಿವರಣೆ'} *
                        </label>
                        <input
                          type="text"
                          required
                          value={newPhoto.caption}
                          onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                          placeholder={isEn ? 'e.g. Sanctum Deeparadhana or Stone Pillar' : 'ವಿವರಣೆ'}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          {isEn ? 'Category' : 'ವರ್ಗ'}
                        </label>
                        <select
                          value={newPhoto.category}
                          onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs"
                        >
                          <option value="temple">Temple Sanctum</option>
                          <option value="village">Village Landscape</option>
                          <option value="architecture">Stone Craft</option>
                          <option value="festivals">Festivals</option>
                          <option value="tradition">Pooja Tradition</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddPhoto(false)}
                        className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg text-xs font-semibold"
                      >
                        {isEn ? 'Cancel' : 'ರದ್ದು'}
                      </button>
                      <button
                        type="submit"
                        disabled={uploadingPhoto}
                        className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                      >
                        {uploadingPhoto ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        <span>{isEn ? 'Publish Immediately' : 'ತಕ್ಷಣ ಪ್ರಕಟಿಸಿ'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Photo Queue List */}
              {submittedPhotos.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  {isEn
                    ? 'No photos in the database yet. Click "Add Temple Photo" above or invite devotees to share!'
                    : 'ಇನ್ನೂ ಯಾವುದೇ ಫೋಟೋಗಳು ದಾಖಲಾಗಿಲ್ಲ. ಮೇಲೆ "ಹೊಸ ಫೋಟೋ ಸೇರಿಸಿ" ಕ್ಲಿಕ್ ಮಾಡಿ.'}
                </div>
              ) : (
                submittedPhotos.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.caption || 'Temple Photo'}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-stone-200 shrink-0 bg-stone-100"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 border border-stone-200 shrink-0">
                          <Image className="w-6 h-6" />
                        </div>
                      )}

                      <div>
                        <div className="text-xs font-bold text-stone-900 mb-1">{p.caption}</div>
                        <div className="text-xs text-stone-600">
                          {isEn ? 'Contributor: ' : 'ಕಳುಹಿಸಿದವರು: '} {p.contributor} {p.contact ? `(${p.contact})` : ''}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          Category: <span className="capitalize">{p.category}</span> {p.date_taken && `· Date: ${p.date_taken}`}
                        </div>
                        <div className="text-[10px] font-mono text-stone-400 mt-1">
                          Status:{' '}
                          <strong
                            className={
                              p.status === 'APPROVED' ? 'text-emerald-700' : 'text-amber-700'
                            }
                          >
                            {p.status || 'PENDING'}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {p.status !== 'APPROVED' && (
                        <button
                          onClick={() => handleApprovePhoto(p.id)}
                          className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 flex items-center gap-1 shrink-0"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isEn ? 'Approve' : 'ಅನುಮೋದಿಸಿ'}</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeletePhoto(p.id)}
                        className="p-2 text-stone-400 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: STORIES */}
          {activeTab === 'STORIES' && (
            <div className="space-y-3">
              {submittedStories.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  {isEn
                    ? 'No pending oral memories from villagers yet.'
                    : 'ಯಾವುದೇ ನೆನಪುಗಳು ಪರಿಶೀಲನೆಗೆ ಬಾಕಿ ಇಲ್ಲ.'}
                </div>
              ) : (
                submittedStories.map((s) => (
                  <div
                    key={s.id}
                    className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900 mb-1">{s.title}</div>
                      <div className="text-xs text-stone-600 mb-2">
                        {s.author} ({s.village})
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed italic">&ldquo;{s.story}&rdquo;</p>
                      <div className="text-[10px] font-mono text-stone-400 mt-2">
                        Approved: <strong className={s.approved ? 'text-emerald-700' : 'text-amber-700'}>{s.approved ? 'YES (Published)' : 'PENDING REVIEW'}</strong>
                      </div>
                    </div>

                    {!s.approved && (
                      <button
                        onClick={() => handleApproveStory(s.id)}
                        className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 flex items-center gap-1 shrink-0"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Approve' : 'ಅನುಮೋದಿಸಿ'}</span>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: SUPABASE CONFIG & SQL SETUP */}
          {activeTab === 'SUPABASE' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Supabase Project Linked & Active</span>
                    </div>
                    <div className="text-xs text-emerald-800 font-sans space-y-1 mt-2">
                      <div>
                        Project ID: <strong className="font-mono bg-emerald-100/70 px-1.5 py-0.5 rounded text-emerald-950">{SUPABASE_CONFIG.projectId}</strong>
                      </div>
                      <div className="break-all">
                        URL: <span className="font-mono bg-emerald-100/70 px-1.5 py-0.5 rounded text-emerald-950">{SUPABASE_CONFIG.url}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="font-mono bg-emerald-100/70 px-1.5 py-0.5 rounded text-emerald-950 truncate max-w-xs">
                          Key: {SUPABASE_CONFIG.apiKey.slice(0, 16)}...{SUPABASE_CONFIG.apiKey.slice(-8)}
                        </span>
                        <button
                          onClick={copyApiKey}
                          className="px-2 py-0.5 bg-emerald-200/80 hover:bg-emerald-300 text-emerald-900 text-[11px] font-semibold rounded flex items-center gap-1 transition-colors"
                        >
                          {copiedKey ? <Check className="w-3 h-3 text-emerald-800" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleTestConnection}
                      disabled={testing}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                      <span>{testing ? 'Testing...' : 'Test Connection'}</span>
                    </button>
                    <a
                      href={`https://supabase.com/dashboard/project/${SUPABASE_CONFIG.projectId}/sql`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shrink-0"
                    >
                      <span>SQL Editor</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Connection Test Result Feedback */}
                {testResult && (
                  <div
                    className={`mt-3 p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
                      testResult.ok && testResult.tablesExist
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                        : testResult.ok && !testResult.tablesExist
                        ? 'bg-amber-100 border-amber-300 text-amber-900'
                        : 'bg-rose-100 border-rose-300 text-rose-900'
                    }`}
                  >
                    {testResult.ok && testResult.tablesExist ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    )}
                    <div className="leading-relaxed">
                      <strong>{testResult.ok && testResult.tablesExist ? 'Status: Active & Ready' : testResult.ok ? 'Status: Connected (Action Required)' : 'Status: Notice'}</strong>
                      <p className="mt-0.5">{testResult.message}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div>
                    <h4 className="text-xs font-bold font-mono text-stone-900 uppercase">
                      Database Schema
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Copy and run this once in your Supabase SQL Editor to initialize all 3 tables & RLS policies.
                    </p>
                  </div>
                  <button
                    onClick={copySqlSchema}
                    className="px-3 py-1 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy SQL Script</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-3 bg-stone-900 text-amber-200 rounded-lg text-[11px] font-mono overflow-x-auto max-h-56 leading-relaxed">
                  {SUPABASE_SCHEMA_SQL}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-white flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono">
            {isEn ? 'Connected to Project ptjidyrzucculstgikjd' : 'ಪ್ರಾಜೆಕ್ಟ್ ptjidyrzucculstgikjd ಗೆ ಸಂಪರ್ಕಗೊಂಡಿದೆ'}
          </span>
          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="px-5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
          >
            {isEn ? 'Close Portal' : 'ಮುಚ್ಚಿ'}
          </button>
        </div>
      </div>
    </div>
  );
};
