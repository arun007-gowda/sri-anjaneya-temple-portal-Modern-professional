import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { COMMUNITY_STORIES } from '../data/templeData';
import { CommunityStory } from '../types';
import { dbGetStories, onTempleDataChanged } from '../lib/supabase';
import { copyShareLink } from './SharedLinkAdapter';
import { Users, PenLine, Quote, CheckCircle2, Share2, Check, Sparkles } from 'lucide-react';

export const CommunityStoriesSection: React.FC = () => {
  const { language, setIsStoryModalOpen } = useLanguage();
  const isEn = language === 'en';

  const [allStories, setAllStories] = useState<CommunityStory[]>(COMMUNITY_STORIES);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newlyUpgraded, setNewlyUpgraded] = useState<boolean>(false);

  const loadLiveStories = async () => {
    try {
      const liveList = await dbGetStories();
      if (liveList && liveList.length > 0) {
        const mappedLive: CommunityStory[] = liveList.map((s: any) => ({
          id: s.id,
          author: s.author || 'Devotee / ಭಕ್ತರು',
          village: s.village || 'Thappagondanahalli',
          date: s.created_at ? new Date(s.created_at).toLocaleDateString() : '2026',
          title: {
            en: s.title || 'Community Memory',
            kn: s.title || 'ಸಮುದಾಯದ ನೆನಪು',
          },
          story: {
            en: s.story || '',
            kn: s.story || '',
          },
          approved: true,
        }));

        // Merge deduplicated
        const seen = new Set<string>();
        const combined: CommunityStory[] = [];

        mappedLive.forEach((s) => {
          if (!seen.has(s.id)) {
            seen.add(s.id);
            combined.push(s);
          }
        });

        COMMUNITY_STORIES.forEach((s) => {
          if (!seen.has(s.id)) {
            seen.add(s.id);
            combined.push(s);
          }
        });

        setAllStories(combined);
      }
    } catch (e) {
      console.warn('Could not load live stories:', e);
    }
  };

  useEffect(() => {
    loadLiveStories();

    // 1. Subscribe to real-time events
    const unsubscribe = onTempleDataChanged((type) => {
      if (type.includes('story')) {
        loadLiveStories();
        setNewlyUpgraded(true);
        setTimeout(() => setNewlyUpgraded(false), 5000);
      }
    });

    // 2. Periodic sync polling
    const interval = setInterval(() => {
      loadLiveStories();
    }, 10000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleShareStory = async (storyId: string, title: string, text: string) => {
    const success = await copyShareLink({ story: storyId, lang: language }, title, text);
    if (success) {
      setCopiedId(storyId);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section id="community-section" className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Upgrade Alert Banner */}
        {newlyUpgraded && (
          <div className="mb-6 p-3 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs flex items-center justify-between shadow-xs animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {isEn
                  ? 'Community stories upgraded dynamically with new submission!'
                  : 'ಹೊಸ ಭಕ್ತರ ಅನುಭವ ಹಂಚಿಕೆಯೊಂದಿಗೆ ಪುಟವು ನವೀಕರಣಗೊಂಡಿದೆ!'}
              </span>
            </div>
            <span className="font-semibold text-amber-700 uppercase tracking-wider text-[10px]">
              {isEn ? 'Live' : 'ಲೈವ್'}
            </span>
          </div>
        )}

        {/* Header & Submit Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309] tracking-widest uppercase mb-3">
              <Users className="w-4 h-4" />
              <span>{isEn ? 'Voices of Thappagondanahalli' : 'ಗ್ರಾಮಸ್ಥರ ನೆನಪುಗಳು ಹಾಗೂ ಅನುಭವ'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 leading-tight mb-4">
              {isEn ? 'From Thappagondanahalli' : 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಹೃದಯಂತರಂಗ'}
            </h2>

            <p className="text-base sm:text-lg font-editorial italic text-stone-700 leading-relaxed">
              {isEn
                ? 'Preserving the lived memories, oral accounts, and personal faith of families whose lives are intertwined with Anjaneya Swamy.'
                : 'ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿಯ ಸನ್ನಿಧಾನದೊಂದಿಗೆ ಬೆಸೆದುಕೊಂಡ ತಪಗೊಂಡನಹಳ್ಳಿ ಕುಟುಂಬಗಳ ಜೀವನಾನುಭವ ಮತ್ತು ಮೌಖಿಕ ನೆನಪುಗಳು.'}
            </p>
          </div>

          <button
            onClick={() => setIsStoryModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#701A28] hover:bg-[#58131E] rounded-lg shadow-xs transition-colors self-start md:self-auto shrink-0"
          >
            <PenLine className="w-4 h-4 text-amber-300" />
            <span>{isEn ? 'Submit Your Memory' : 'ನಿಮ್ಮ ನೆನಪನ್ನು ಹಂಚಿಕೊಳ್ಳಿ'}</span>
          </button>
        </div>

        {/* Stories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {allStories.map((item) => (
            <div
              key={item.id}
              id={`story-${item.id}`}
              className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-amber-500/40" />
                  <button
                    onClick={() => handleShareStory(item.id, item.title[language] || item.title.en, item.story[language] || item.story.en)}
                    className="p-1.5 text-stone-400 hover:text-[#701A28] rounded-lg hover:bg-stone-50 transition-colors inline-flex items-center gap-1 text-xs"
                    title={isEn ? 'Share this story link' : 'ಈ ನೆನಪಿನ ಲಿಂಕ್ ಹಂಚಿಕೊಳ್ಳಿ'}
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">{isEn ? 'Copied' : 'ನಕಲಾಗಿದೆ'}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="text-stone-500">{isEn ? 'Share' : 'ಹಂಚಿ'}</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-xl font-cinzel font-bold text-stone-900 mb-3">
                  {item.title[language] || item.title.en}
                </h3>
                <p className="text-stone-700 font-sans text-sm sm:text-base leading-relaxed mb-6 italic">
                  &ldquo;{item.story[language] || item.story.en}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
                <div>
                  <span className="font-semibold text-stone-800 block font-sans text-sm">
                    {item.author}
                  </span>
                  <span>{item.village}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Community Record' : 'ದಾಖಲಾದ ನೆನಪು'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Archival Moderation Notice */}
        <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/60 text-xs text-stone-700 text-center flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {isEn
              ? 'Shared living memories are archived respectfully to preserve the oral history of Thappagondanahalli Gowdru stewardship.'
              : 'ಗ್ರಾಮದ ಹಿರಿಯರ ಹಾಗೂ ಭಕ್ತರ ಮೌಖಿಕ ನೆನಪುಗಳು ಗೌಡ್ರು ಮನೆತನಗಳ ಆಡಳಿತದ ಇತಿಹಾಸವನ್ನು ಮುಂದಿನ ಪೀಳಿಗೆಗೆ ತಲುಪಿಸಲು ಸಹಕಾರಿಯಾಗಿವೆ.'}
          </span>
        </div>

      </div>
    </section>
  );
};
