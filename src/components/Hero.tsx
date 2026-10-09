import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TEMPLE_INFO } from '../data/templeData';
import { TempleEmblem, BrassDiyaIcon } from './SacredIcons';
import {
  MapPin,
  Navigation,
  ArrowDown,
  BookOpen,
  Calendar,
  Info,
  Image as ImageIcon,
  Upload,
  RotateCcw,
  Sliders,
  X,
  Sparkles,
  Check,
  PlusCircle,
  Bell,
} from 'lucide-react';

const DEFAULT_BG = '/hanuman-hero-bg.jpg';
const ALT_BG = '/hanuman-portrait.jpg';

export const Hero: React.FC = () => {
  const { language, scrollToSection, setActivePage, setIsAuditModalOpen, setIsDataModalOpen } = useLanguage();
  const isEn = language === 'en';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Background state with persistence
  const [bgImage, setBgImage] = useState<string>(() => {
    return localStorage.getItem('temple_hero_bg') || DEFAULT_BG;
  });

  const [bgOpacity, setBgOpacity] = useState<number>(() => {
    const saved = localStorage.getItem('temple_hero_bg_opacity');
    return saved ? parseFloat(saved) : 0.72;
  });

  const [showSettings, setShowSettings] = useState(false);
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('temple_hero_bg');
    if (saved && saved !== DEFAULT_BG && saved !== ALT_BG) {
      setIsCustom(true);
    }
  }, [bgImage]);

  // Handle user uploading their exact picture (e.g. image.png)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setBgImage(dataUrl);
        setIsCustom(true);
        localStorage.setItem('temple_hero_bg', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (url: string) => {
    setBgImage(url);
    setIsCustom(false);
    localStorage.setItem('temple_hero_bg', url);
  };

  const handleOpacityChange = (val: number) => {
    setBgOpacity(val);
    localStorage.setItem('temple_hero_bg_opacity', val.toString());
  };

  const handleReset = () => {
    setBgImage(DEFAULT_BG);
    setBgOpacity(0.72);
    setIsCustom(false);
    localStorage.removeItem('temple_hero_bg');
    localStorage.removeItem('temple_hero_bg_opacity');
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[94vh] flex flex-col justify-between overflow-hidden bg-[#0A0706] text-stone-100"
    >
      {/* 1. Divine Lord Sri Hanuman Background Wallpaper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={bgImage}
          alt="Lord Sri Anjaneya Swamy Background"
          className="w-full h-full object-cover object-center filter contrast-110 brightness-95 scale-105 transition-all duration-700 ease-out"
          style={{ opacity: bgOpacity }}
          onError={() => {
            if (bgImage !== DEFAULT_BG) {
              setBgImage(DEFAULT_BG);
            }
          }}
        />

        {/* Cinematic Vignettes and Warm Divine Lighting Overlays for crystal-clear readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0706]/90 via-[#0A0706]/55 to-[#0A0706]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0706]/40 to-[#0A0706]/90" />
      </div>

      {/* 2. Atmospheric Sacred Diya Warmth & Light Beams */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-amber-600/20 via-[#B45309]/15 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      {/* Subtle Karnataka Granite Relief Texture Pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Hero Top Notice / Verification Status Bar */}
      <div className="relative z-10 border-b border-stone-800/80 bg-stone-950/70 backdrop-blur-md py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-stone-300 font-medium">
              {isEn
                ? 'Official Digital Presence · Challakere Taluk, Chitradurga'
                : 'ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ತಾಣ · ಚಳ್ಳಕೆರೆ ತಾಲೂಕು, ಚಿತ್ರದುರ್ಗ'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors underline decoration-amber-500/50 underline-offset-4"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{isEn ? 'Verification Audit Status' : 'ಮಾಹಿತಿ ದೃಢೀಕರಣ ವರದಿ'}</span>
            </button>
            <span className="text-stone-600">|</span>
            <span className="font-mono text-stone-400">PIN: 577537</span>
          </div>
        </div>
      </div>

      {/* Central Hero Profile Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center my-auto">
        
        {/* Sacred Temple Crest Lockup */}
        <div className="inline-flex items-center justify-center mb-5">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-black border-2 border-amber-400/60 p-1 shadow-2xl shadow-amber-950/70 flex items-center justify-center backdrop-blur-md group hover:border-amber-400 hover:scale-105 transition-all overflow-hidden">
            <TempleEmblem className="w-full h-full object-contain drop-shadow-xl" />
          </div>
        </div>

        {/* Location Indicator */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-300 tracking-widest uppercase mb-3 font-medium">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>{isEn ? 'Thappagondanahalli, Karnataka, India' : 'ತಪಗೊಂಡನಹಳ್ಳಿ, ಕರ್ನಾಟಕ, ಭಾರತ'}</span>
          <span className="text-stone-600">·</span>
          <span className="text-stone-400 font-mono">14.4254° N, 76.8516° E</span>
        </div>

        {/* Primary Deity & Temple Name */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-bold text-stone-100 tracking-tight leading-tight sm:leading-none mb-3 drop-shadow-lg">
          {isEn ? 'Anjaneya Swamy Temple' : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ'}
        </h1>

        <p className="text-base sm:text-xl font-cinzel text-amber-200/95 font-medium mb-3">
          {isEn ? 'Thappagondanahalli · Challakere Taluk' : 'ತಪಗೊಂಡನಹಳ್ಳಿ · ಚಳ್ಳಕೆರೆ ತಾಲೂಕು'}
        </p>

        {/* Stewardship Badge: Managed by Thappagondanahalli Gowdru Families */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-semibold mb-6 shadow-md backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>
            {isEn
              ? 'Managed by Thappagondanahalli Gowdru Families'
              : 'ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳ ಆಡಳಿತ ಮತ್ತು ನಿರ್ವಹಣೆ'}
          </span>
        </div>

        {/* Hero Headline */}
        <p className="text-xl sm:text-2xl lg:text-3xl font-editorial italic text-stone-200 max-w-3xl mx-auto mb-6 leading-relaxed drop-shadow-md">
          &ldquo;{isEn ? 'Where Faith, Heritage & Community Meet' : 'ಶ್ರದ್ಧೆ, ಪರಂಪರೆ ಮತ್ತು ಗ್ರಾಮ ಬಾಂಧವ್ಯದ ಪವಿತ್ರ ಸಂಗಮ'}&rdquo;
        </p>

        {/* Concise Introductory Sentence */}
        <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-sm">
          {isEn
            ? 'Rooted in the timeless granite soils of Challakere, the sacred shrine of Sri Anjaneya Swamy stands as the spiritual sanctuary and enduring guardian of Thappagondanahalli village and its farming families.'
            : 'ಚಿತ್ರದುರ್ಗದ ಬಯಲುಸೀಮೆಯ ತಪಗೊಂಡನಹಳ್ಳಿಯ ಹೃದಯಭಾಗದಲ್ಲಿ ನೆಲೆಸಿರುವ ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿಯ ಸನ್ನಿಧಾನವು ಸಮಸ್ತ ಗ್ರಾಮಸ್ಥರ ಹಾಗೂ ಭಕ್ತರ ಶ್ರದ್ಧಾಭಕ್ತಿಗಳ ಪವಿತ್ರ ನೆಲೆವೀಡಾಗಿದೆ.'}
        </p>

        {/* Primary Action Button Cluster */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Primary CTA: Plan Your Visit */}
          <button
            onClick={() => {
              setActivePage('contact');
              scrollToSection('contact-section');
            }}
            className="px-6 py-3.5 text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xl hover:shadow-amber-500/30 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
          >
            <Calendar className="w-4 h-4 text-stone-900" />
            <span>{isEn ? 'Plan Your Visit' : 'ಭೇಟಿಯ ವಿವರ'}</span>
          </button>

          {/* Quick Share Data / Notice Action */}
          <button
            onClick={() => setIsDataModalOpen(true)}
            className="px-5 py-3.5 text-sm font-semibold text-white bg-[#701A28]/80 hover:bg-[#701A28] border border-amber-500/40 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap backdrop-blur-sm shadow-md"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>{isEn ? '+ Share Notice / Data' : '+ ಮಾಹಿತಿ ಸೇರಿಸಿ'}</span>
          </button>

          {/* Secondary CTA: Explore Our History */}
          <button
            onClick={() => {
              setActivePage('history');
              scrollToSection('history-section');
            }}
            className="px-6 py-3.5 text-sm font-semibold text-stone-200 bg-stone-900/80 hover:bg-stone-800 border border-stone-700/80 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap backdrop-blur-sm"
          >
            <BookOpen className="w-4 h-4 text-stone-300" />
            <span>{isEn ? 'Explore Our History' : 'ಇತಿಹಾಸವನ್ನು ತಿಳಿಯಿರಿ'}</span>
          </button>

          {/* Additional CTA: Get Directions */}
          <a
            href={TEMPLE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 text-sm font-semibold text-amber-200 bg-[#701A28]/40 border border-amber-500/40 hover:bg-[#701A28]/70 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap backdrop-blur-sm"
          >
            <Navigation className="w-4 h-4 text-amber-400" />
            <span>{isEn ? 'Get Directions' : 'ಮಾರ್ಗದರ್ಶನ'}</span>
          </a>
        </div>

      </div>

      {/* Bottom Architectural Ribbon & Scroll Indicator */}
      <div className="relative z-10 border-t border-stone-800/80 bg-stone-950/80 backdrop-blur-md py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Authentic Commitment */}
          <div className="flex items-center gap-2 text-xs text-stone-400 text-center sm:text-left">
            <BrassDiyaIcon className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              {isEn
                ? 'Sri Anjaneya Swamy Temple · Challakere Taluk, Chitradurga'
                : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ · ಚಳ್ಳಕೆರೆ ತಾಲೂಕು, ಚಿತ್ರದುರ್ಗ'}
            </span>
          </div>

          {/* Background Customizer CTA & Scroll Down */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-amber-300 border border-amber-500/30 text-xs font-medium transition-all shadow-sm"
              title="Change Background Wallpaper"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{isEn ? 'Background Wallpaper' : 'ಹಿನ್ನೆಲೆ ಚಿತ್ರ'}</span>
              <Sliders className="w-3 h-3 text-stone-400" />
            </button>

            <button
              onClick={() => scrollToSection('about-section')}
              className="flex items-center gap-2 text-xs text-stone-400 hover:text-stone-200 transition-colors ml-2"
              aria-label="Scroll to introduction"
            >
              <span>{isEn ? 'Discover More' : 'ಹೆಚ್ಚಿನ ವಿವರ'}</span>
              <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
            </button>
          </div>

        </div>
      </div>

      {/* Interactive Background Settings & Photo Uploader Modal/Popover */}
      {showSettings && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-[#1C1412] border border-amber-500/30 rounded-2xl max-w-md w-full p-6 text-stone-100 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#701A28] border border-amber-500/30 flex items-center justify-center text-amber-300">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-cinzel font-bold text-amber-100">
                  {isEn ? 'Profile Background Picture' : 'ಹಿನ್ನೆಲೆ ಛಾಯಾಚಿತ್ರ ಸೆಟ್ಟಿಂಗ್ಸ್'}
                </h3>
                <p className="text-xs text-stone-400">
                  {isEn
                    ? 'Lord Sri Hanuman background wallpaper'
                    : 'ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿಯ ಹಿನ್ನೆಲೆ ಚಿತ್ರ'}
                </p>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="space-y-3 mb-5">
              <label className="block text-xs font-semibold text-amber-200">
                {isEn ? 'Select or Upload Hanuman Picture:' : 'ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಅಪ್ಲೋಡ್ ಮಾಡಿ:'}
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Preset 1: Dark Hanuman with Gada (matches user upload) */}
                <button
                  type="button"
                  onClick={() => handleSelectPreset(DEFAULT_BG)}
                  className={`p-2 rounded-xl border text-left flex flex-col items-center gap-2 transition-all relative overflow-hidden group ${
                    bgImage === DEFAULT_BG
                      ? 'border-amber-400 bg-amber-400/10 ring-2 ring-amber-400/30'
                      : 'border-stone-800 bg-stone-900/60 hover:border-stone-700'
                  }`}
                >
                  <img
                    src={DEFAULT_BG}
                    alt="Dark Hanuman with Gada"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <span className="text-[11px] font-medium text-stone-200 text-center">
                    {isEn ? 'Divine Gada Warrior' : 'ಗಧಾಧಾರಿ ಹನುಮ'}
                  </span>
                  {bgImage === DEFAULT_BG && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 p-1 rounded-full shadow">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>

                {/* Preset 2: Majestic Portrait */}
                <button
                  type="button"
                  onClick={() => handleSelectPreset(ALT_BG)}
                  className={`p-2 rounded-xl border text-left flex flex-col items-center gap-2 transition-all relative overflow-hidden group ${
                    bgImage === ALT_BG
                      ? 'border-amber-400 bg-amber-400/10 ring-2 ring-amber-400/30'
                      : 'border-stone-800 bg-stone-900/60 hover:border-stone-700'
                  }`}
                >
                  <img
                    src={ALT_BG}
                    alt="Hanuman Portrait"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <span className="text-[11px] font-medium text-stone-200 text-center">
                    {isEn ? 'Sacred Sanctum Form' : 'ಪವಿತ್ರ ದಿವ್ಯ ರೂಪ'}
                  </span>
                  {bgImage === ALT_BG && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 p-1 rounded-full shadow">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              </div>

              {/* Upload Custom Picture (User's image.png) */}
              <div className="pt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="heroCustomBgUpload"
                />
                <label
                  htmlFor="heroCustomBgUpload"
                  className="w-full py-2.5 px-3 rounded-xl border border-dashed border-amber-400/50 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Upload className="w-4 h-4 text-amber-300" />
                  <span>
                    {isCustom
                      ? (isEn ? 'Upload Another Picture (Replace)' : 'ಬೇರೆ ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ')
                      : (isEn ? 'Upload Your Custom Image (e.g. image.png)' : 'ನಿಮ್ಮ ಸ್ವಂತ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ')}
                  </span>
                </label>
                {isCustom && (
                  <p className="text-[11px] text-emerald-400 mt-1 text-center font-mono flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{isEn ? 'Custom user background active' : 'ನಿಮ್ಮ ಚಿತ್ರ ಅನ್ವಯಿಸಲಾಗಿದೆ'}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Opacity Slider */}
            <div className="p-3 bg-stone-900/70 rounded-xl border border-stone-800 space-y-2 mb-5">
              <div className="flex items-center justify-between text-xs text-stone-300">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEn ? 'Background Visibility' : 'ಚಿತ್ರದ ಪ್ರಖರತೆ'}</span>
                </span>
                <span className="font-mono text-amber-400">{Math.round(bgOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="0.95"
                step="0.05"
                value={bgOpacity}
                onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>{isEn ? 'Subtle' : 'ಮಂದ'}</span>
                <span>{isEn ? 'High Contrast' : 'ಗರಿಷ್ಠ'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-800">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isEn ? 'Reset to Default' : 'ಮರುಹೊಂದಿಸಿ'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-lg text-xs font-semibold shadow-md transition-colors"
              >
                {isEn ? 'Save & Close' : 'ಉಳಿಸಿ ಮತ್ತು ಮುಚ್ಚಿ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
