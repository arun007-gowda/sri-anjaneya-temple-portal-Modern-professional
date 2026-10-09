import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Share2, Check, Sparkles, X, Bell } from 'lucide-react';

interface SharedLinkToast {
  title: string;
  subtitle: string;
}

export function generateShareUrl(params: Record<string, string | number>): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  // Clear any old query params
  url.search = '';
  Object.entries(params).forEach(([key, val]) => {
    url.searchParams.set(key, String(val));
  });
  return url.toString();
}

export async function copyShareLink(
  params: Record<string, string | number>,
  shareTitle?: string,
  shareText?: string
): Promise<boolean> {
  const shareUrl = generateShareUrl(params);

  // If mobile Web Share API is available and user is on a touch device
  if (
    typeof navigator !== 'undefined' &&
    navigator.share &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  ) {
    try {
      await navigator.share({
        title: shareTitle || 'Anjaneya Swamy Temple, Thappagondanahalli',
        text: shareText || 'Explore the sacred heritage and live updates of Thappagondanahalli.',
        url: shareUrl,
      });
      return true;
    } catch (_) {
      // User cancelled share, fallback to clipboard
    }
  }

  // Clipboard fallback
  try {
    await navigator.clipboard.writeText(shareUrl);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

export const SharedLinkAdapter: React.FC = () => {
  const { language, setLanguage, scrollToSection } = useLanguage();
  const [toast, setToast] = useState<SharedLinkToast | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);

    // 1. Language param adoption: ?lang=kn or ?lang=en
    const langParam = urlParams.get('lang');
    if (langParam === 'kn' || langParam === 'en') {
      if (langParam !== language) {
        setLanguage(langParam);
      }
    }

    // 2. Direct section scroll: ?section=...
    const sectionParam = urlParams.get('section');
    if (sectionParam) {
      setTimeout(() => {
        scrollToSection(sectionParam);
      }, 300);
    }

    // 3. Temple Notice / Update adoption: ?update=... or ?data=...
    const updateParam = urlParams.get('update') || urlParams.get('data');
    if (updateParam) {
      setTimeout(() => {
        scrollToSection('chronicles-section');
        setToast({
          title: language === 'kn' ? 'ತಾಜಾ ಮಾಹಿತಿ ಅಳವಡಿಸಲಾಗಿದೆ' : 'Temple Notice Adopted',
          subtitle: language === 'kn' ? 'ಹಂಚಿಕೊಂಡ ಪ್ರಕಟಣೆಯನ್ನು ಕೆಳಗೆ ವೀಕ್ಷಿಸಿ' : 'View the shared temple details below',
        });
      }, 500);
    }


    // 4. Story adoption: ?story=...
    const storyParam = urlParams.get('story');
    if (storyParam) {
      setTimeout(() => {
        scrollToSection('community-section');
        const storyCard = document.getElementById(`story-${storyParam}`);
        if (storyCard) {
          storyCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          storyCard.classList.add('ring-4', 'ring-amber-400');
          setTimeout(() => storyCard.classList.remove('ring-4', 'ring-amber-400'), 4000);
        }
        setToast({
          title: language === 'kn' ? 'ಹಂಚಿಕೊಂಡ ನೆನಪು ಲೋಡ್ ಆಗಿದೆ' : 'Shared Community Memory Loaded',
          subtitle: language === 'kn' ? 'ಗ್ರಾಮಸ್ಥರ ಅನುಭವವನ್ನು ಇಲ್ಲಿ ವೀಕ್ಷಿಸಿ' : 'View the shared community memory below',
        });
      }, 500);
    }

    // 5. Photo adoption: ?photo=...
    const photoParam = urlParams.get('photo');
    if (photoParam) {
      setTimeout(() => {
        scrollToSection('gallery-section');
        // Custom event for PhotoGallery to open this photo in lightbox
        window.dispatchEvent(new CustomEvent('temple_open_shared_photo', { detail: { photoId: photoParam } }));
        setToast({
          title: language === 'kn' ? 'ಹಂಚಿಕೊಂಡ ಛಾಯಾಚಿತ್ರ ತೆರೆಯಲಾಗಿದೆ' : 'Shared Photograph Opened',
          subtitle: language === 'kn' ? 'ಪಾರಂಪರಿಕ ಚಿತ್ರಶಾಲೆಯ ಚಿತ್ರವನ್ನು ವೀಕ್ಷಿಸಿ' : 'Viewing archival photograph from shared link',
        });
      }, 500);
    }

    // 6. Direct pushed photo adoption via URL payload: ?pushPhoto=...
    const pushPhotoParam = urlParams.get('pushPhoto');
    if (pushPhotoParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(pushPhotoParam))));
        if (decoded && decoded.image_url) {
          const existing = JSON.parse(localStorage.getItem('temple_photo_submissions') || '[]');
          if (!existing.some((p: any) => p.id === decoded.id)) {
            existing.unshift(decoded);
            localStorage.setItem('temple_photo_submissions', JSON.stringify(existing));
            window.dispatchEvent(new CustomEvent('temple_data_updated', { detail: { type: 'photo_added', payload: decoded } }));
          }
          setTimeout(() => {
            scrollToSection('gallery-section');
            window.dispatchEvent(new CustomEvent('temple_open_shared_photo', { detail: { photoId: decoded.id } }));
          }, 600);
        }
      } catch (e) {
        console.debug('Could not decode pushPhoto parameter:', e);
      }
    }

    // 7. Direct pushed update adoption via URL payload: ?pushUpdate=...
    const pushUpdateParam = urlParams.get('pushUpdate');
    if (pushUpdateParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(pushUpdateParam))));
        if (decoded && decoded.title) {
          const existing = JSON.parse(localStorage.getItem('temple_public_updates') || '[]');
          if (!existing.some((u: any) => u.id === decoded.id)) {
            existing.unshift(decoded);
            localStorage.setItem('temple_public_updates', JSON.stringify(existing));
            window.dispatchEvent(new CustomEvent('temple_data_updated', { detail: { type: 'temple_update_added', payload: decoded } }));
          }
          setTimeout(() => {
            scrollToSection('community-updates-section');
            const updateCard = document.getElementById(`update-${decoded.id}`);
            if (updateCard) {
              updateCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
              updateCard.classList.add('ring-4', 'ring-amber-400');
              setTimeout(() => updateCard.classList.remove('ring-4', 'ring-amber-400'), 5000);
            }
          }, 600);
        }
      } catch (e) {
        console.debug('Could not decode pushUpdate parameter:', e);
      }
    }
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] bg-[#1C1412] text-white p-4 rounded-2xl shadow-2xl border border-amber-500/50 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 shrink-0">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-amber-300 truncate">{toast.title}</h4>
        <p className="text-xs text-stone-300 mt-0.5">{toast.subtitle}</p>
      </div>
      <button
        onClick={() => setToast(null)}
        className="p-1 text-stone-400 hover:text-white rounded-lg transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
