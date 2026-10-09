import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GALLERY_PHOTOS } from '../data/templeData';
import { GalleryPhoto } from '../types';
import { GraniteTexturePlaceholder } from './SacredIcons';
import { dbGetPhotos, onTempleDataChanged } from '../lib/supabase';
import { copyShareLink } from './SharedLinkAdapter';
import {
  Image as ImageIcon,
  Upload,
  Maximize2,
  X,
  Info,
  Sparkles,
  Share2,
  Check,
  RefreshCw,
} from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const { language, setIsPhotoModalOpen } = useLanguage();
  const isEn = language === 'en';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [allPhotos, setAllPhotos] = useState<GalleryPhoto[]>(GALLERY_PHOTOS);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newlyUpgraded, setNewlyUpgraded] = useState<boolean>(false);

  // Load any approved/community photos from database & merge with static archives
  const loadLivePhotos = async () => {
    try {
      const liveList = await dbGetPhotos();
      if (liveList && liveList.length > 0) {
        const approved = liveList
          .filter((p: any) => p.status === 'APPROVED' || p.status === 'VERIFIED')
          .map((p: any) => ({
            id: p.id,
            title: {
              en: p.caption?.slice(0, 36) || 'Community Photograph',
              kn: p.caption?.slice(0, 36) || 'ಭಕ್ತರ ಛಾಯಾಚಿತ್ರ',
            },
            category: (p.category || 'temple') as any,
            caption: {
              en: p.caption,
              kn: p.caption,
            },
            credit: `${p.contributor} (${p.contact ? 'Verified' : 'Contributor'})`,
            date: p.date_taken || new Date(p.created_at || Date.now()).getFullYear().toString(),
            imageUrl: p.image_url,
            isPlaceholder: false,
            status: 'VERIFIED' as const,
            isCommunityLive: true,
          }));

        if (approved.length > 0) {
          // Merge deduplicated by id or image_url
          const seen = new Set<string>();
          const combined: GalleryPhoto[] = [];

          approved.forEach((p: any) => {
            const key = p.id || p.imageUrl;
            if (!seen.has(key)) {
              seen.add(key);
              combined.push(p);
            }
          });

          GALLERY_PHOTOS.forEach((p) => {
            if (!seen.has(p.id)) {
              seen.add(p.id);
              combined.push(p);
            }
          });

          setAllPhotos(combined);
        }
      }
    } catch (e) {
      console.warn('Could not fetch live photos for gallery:', e);
    }
  };

  useEffect(() => {
    loadLivePhotos();

    // 1. Subscribe to real-time events across tabs & local push actions
    const unsubscribe = onTempleDataChanged((type) => {
      if (type.includes('photo')) {
        loadLivePhotos();
        setNewlyUpgraded(true);
        setTimeout(() => setNewlyUpgraded(false), 5000);
      }
    });

    // 2. Periodic background sync polling every 10 seconds to catch remote pushes
    const pollInterval = setInterval(() => {
      loadLivePhotos();
    }, 10000);

    // 3. Listen for shared link open event (?photo=<id>)
    const handleOpenSharedPhoto = (e: any) => {
      const targetId = e.detail?.photoId;
      if (targetId) {
        // Search in allPhotos or fetch directly
        const found = allPhotos.find((p) => p.id === targetId);
        if (found) {
          setActiveLightboxPhoto(found);
        } else {
          dbGetPhotos().then((list) => {
            const fresh = list.find((p: any) => p.id === targetId);
            if (fresh) {
              const mapped: GalleryPhoto = {
                id: fresh.id,
                title: { en: fresh.caption || 'Shared Photograph', kn: fresh.caption || 'ಛಾಯಾಚಿತ್ರ' },
                category: fresh.category || 'temple',
                caption: { en: fresh.caption, kn: fresh.caption },
                credit: fresh.contributor || 'Community Contributor',
                imageUrl: fresh.image_url,
                isPlaceholder: false,
                status: 'VERIFIED',
              };
              setActiveLightboxPhoto(mapped);
            }
          });
        }
      }
    };
    window.addEventListener('temple_open_shared_photo', handleOpenSharedPhoto);

    return () => {
      unsubscribe();
      clearInterval(pollInterval);
      window.removeEventListener('temple_open_shared_photo', handleOpenSharedPhoto);
    };
  }, []);

  const handleSharePhoto = async (e: React.MouseEvent, photo: GalleryPhoto) => {
    e.stopPropagation();
    const success = await copyShareLink(
      { photo: photo.id, lang: language },
      photo.title[language],
      photo.caption[language]
    );
    if (success) {
      setCopiedId(photo.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const categories = [
    { id: 'all', label: isEn ? 'All Categories' : 'ಎಲ್ಲಾ ಚಿತ್ರಗಳು' },
    { id: 'temple', label: isEn ? 'Temple Sanctum' : 'ಗರ್ಭಗುಡಿ' },
    { id: 'village', label: isEn ? 'Thappagondanahalli Village' : 'ಗ್ರಾಮ ಪರಿಸರ' },
    { id: 'architecture', label: isEn ? 'Stone Craft' : 'ಶಿಲ್ಪಕಲೆ' },
    { id: 'festivals', label: isEn ? 'Festivals & Utsavas' : 'ಉತ್ಸವಗಳು' },
    { id: 'tradition', label: isEn ? 'Devotional Items' : 'ಪೂಜಾ ದ್ರವ್ಯಗಳು' },
  ];

  const filteredPhotos = allPhotos.filter((photo) => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  return (
    <section id="gallery-section" className="py-20 lg:py-28 bg-[#F7F4EE] border-b border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Upgrade Alert Banner */}
        {newlyUpgraded && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center justify-between shadow-xs animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isEn
                  ? 'Gallery dynamically upgraded! New community photograph added.'
                  : 'ಚಿತ್ರಶಾಲೆ ನವೀಕರಣಗೊಂಡಿದೆ! ಹೊಸ ಭಕ್ತರ ಛಾಯಾಚಿತ್ರ ಸೇರ್ಪಡೆಯಾಗಿದೆ.'}
              </span>
            </div>
            <span className="font-semibold text-emerald-700 uppercase tracking-wider text-[10px]">
              {isEn ? 'Live' : 'ಲೈವ್'}
            </span>
          </div>
        )}

        {/* Header & Photo Contribution CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#701A28] tracking-widest uppercase mb-3">
              <ImageIcon className="w-4 h-4" />
              <span>{isEn ? 'Visual Archives' : 'ಛಾಯಾಚಿತ್ರ ಸಂಗ್ರಹ'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 leading-tight mb-4">
              {isEn ? 'Archival Gallery' : 'ಪಾರಂಪರಿಕ ಚಿತ್ರಶಾಲೆ'}
            </h2>

            <p className="text-base sm:text-lg font-editorial italic text-stone-700 leading-relaxed">
              {isEn
                ? 'Documenting the sanctum, stone carvings, village landscapes, and festive gatherings of Sri Anjaneya Swamy Temple, Thappagondanahalli.'
                : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ದೇಗುಲ, ಪರಿಸರ ಹಾಗೂ ಉತ್ಸವಗಳ ಪವಿತ್ರ ಚಿತ್ರಣ.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPhotoModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#701A28] hover:bg-[#58131E] rounded-lg shadow-sm transition-colors shrink-0"
            >
              <Upload className="w-4 h-4 text-amber-300" />
              <span>{isEn ? 'Upload or Share a Photo' : 'ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ'}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-stone-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              id={`photo-${photo.id}`}
              onClick={() => setActiveLightboxPhoto(photo)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative"
            >
              <div className="relative h-60 bg-stone-900 overflow-hidden">
                {photo.imageUrl ? (
                  <img
                    src={photo.imageUrl}
                    alt={photo.title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <GraniteTexturePlaceholder
                    title={photo.title[language]}
                    subtitle={photo.caption[language]}
                    badge={
                      isEn
                        ? 'Archival Representation'
                        : 'ಪಾರಂಪರಿಕ ಪ್ರಾತಿನಿಧಿಕ ಚಿತ್ರ'
                    }
                    className="h-60"
                  />
                )}

                {photo.imageUrl && (
                  <div className="absolute bottom-2 left-2 bg-stone-900/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{isEn ? 'Devotee Photo' : 'ಛಾಯಾಚಿತ್ರ'}</span>
                  </div>
                )}

                {/* Top Action Cluster: Fullscreen & Share buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleSharePhoto(e, photo)}
                    className="p-1.5 rounded-full bg-stone-900/70 text-stone-200 hover:bg-stone-900 hover:text-amber-300 transition-colors"
                    title={isEn ? 'Share this photo' : 'ಚಿತ್ರದ ಲಿಂಕ್ ಹಂಚಿಕೊಳ್ಳಿ'}
                    aria-label="Share photo link"
                  >
                    {copiedId === photo.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <div className="p-1.5 rounded-full bg-stone-900/70 text-stone-200 group-hover:bg-stone-900 group-hover:text-amber-300 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-2">
                    <span className="capitalize">{photo.category}</span>
                    <span>{photo.date || '2026'}</span>
                  </div>

                  <h3 className="text-base font-cinzel font-semibold text-stone-900 group-hover:text-[#701A28] transition-colors mb-2">
                    {photo.title[language]}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                    {photo.caption[language]}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="truncate max-w-[180px]">
                    {isEn ? 'Credit: ' : 'ಕೃಪೆ: '}
                    {photo.credit}
                  </span>

                  <button
                    onClick={(e) => handleSharePhoto(e, photo)}
                    className="inline-flex items-center gap-1 text-[11px] text-[#701A28] hover:underline"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>{copiedId === photo.id ? (isEn ? 'Copied' : 'ನಕಲಿಸಲಾಗಿದೆ') : (isEn ? 'Share' : 'ಹಂಚಿ')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Rule Notice */}
        <div className="mt-12 text-center text-xs text-stone-500 flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-700" />
          <span>
            {isEn
              ? 'Photography Rule: No unverified photos from other temples are used. All public submissions undergo archival review.'
              : 'ಛಾಯಾಚಿತ್ರ ನೀತಿ: ಬೇರೆ ದೇವಾಲಯಗಳ ಚಿತ್ರಗಳನ್ನು ಬಳಸಲಾಗಿಲ್ಲ. ಸಾರ್ವಜನಿಕರ ಕೊಡುಗೆಗಳು ಪಾರಂಪರಿಕ ದಾಖಲಾತಿಗೆ ಒಳಪಡುತ್ತವೆ.'}
          </span>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md"
          onClick={() => setActiveLightboxPhoto(null)}
        >
          <div
            className="bg-[#1C1412] border border-stone-800 text-stone-100 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 flex items-center gap-2">
              {/* Share Lightbox Photo */}
              <button
                onClick={(e) => handleSharePhoto(e, activeLightboxPhoto)}
                className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors flex items-center gap-1 text-xs"
                title="Share this photo link"
              >
                {copiedId === activeLightboxPhoto.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">{isEn ? 'Copied Link' : 'ಲಿಂಕ್ ನಕಲಾಗಿದೆ'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-amber-400" />
                    <span className="text-stone-300">{isEn ? 'Share Link' : 'ಹಂಚಿಕೊಳ್ಳಿ'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveLightboxPhoto(null)}
                className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeLightboxPhoto.imageUrl ? (
              <div className="rounded-xl overflow-hidden mb-6 bg-stone-900 border border-stone-800 flex items-center justify-center max-h-[50vh]">
                <img
                  src={activeLightboxPhoto.imageUrl}
                  alt={activeLightboxPhoto.title[language]}
                  className="max-h-[50vh] w-auto object-contain"
                />
              </div>
            ) : (
              <GraniteTexturePlaceholder
                title={activeLightboxPhoto.title[language]}
                subtitle={activeLightboxPhoto.caption[language]}
                className="h-72 mb-6"
              />
            )}

            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-2 uppercase tracking-wider">
              <span>{activeLightboxPhoto.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activeLightboxPhoto.date || '2026'}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white mb-3">
              {activeLightboxPhoto.title[language]}
            </h3>

            <p className="text-sm text-stone-300 leading-relaxed mb-6 font-sans">
              {activeLightboxPhoto.caption[language]}
            </p>

            <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-400 gap-2">
              <span>
                {isEn ? 'Photo Credit: ' : 'ಛಾಯಾಚಿತ್ರ ಕೃಪೆ: '}
                <strong className="text-stone-200">{activeLightboxPhoto.credit}</strong>
              </span>

              <button
                onClick={(e) => handleSharePhoto(e, activeLightboxPhoto)}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto font-medium"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isEn ? 'Copy Shareable Link' : 'ನೇರ ಲಿಂಕ್ ನಕಲಿಸಿ'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
