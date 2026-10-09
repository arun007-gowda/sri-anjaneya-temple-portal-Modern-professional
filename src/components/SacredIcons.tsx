import React from 'react';

export const TempleEmblem: React.FC<{ className?: string; useSaffron?: boolean }> = ({
  className = 'w-10 h-10',
  useSaffron = true,
}) => (
  <svg
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Sri Anjaneya Swamy Temple Emblem"
  >
    {/* Outer Circular Disc */}
    <circle cx="250" cy="250" r="248" fill="#000000" />

    {/* Sacred Saffron / Vermillion Temple Silhouette */}
    <g fill={useSaffron ? '#E52D08' : 'currentColor'}>
      {/* Topmost Dhwaja (Sacred Temple Flag) */}
      <path d="M248 68 H252 V94 H248 Z" />
      <path d="M246 80 C246 76 254 76 254 80 C254 84 246 84 246 80 Z" />
      <path d="M247 90 C247 86 253 86 253 90 C253 94 247 94 247 90 Z" />
      <path d="M250 68 C256 68 266 74 276 78 C268 84 260 86 250 88 Z" />

      {/* Central Shikhara (Main Spire - Top Tiers) */}
      <path d="M240 100 H260 L266 112 H234 Z" />
      <path d="M232 114 H268 L273 126 H227 Z" />
      <path d="M225 128 H275 L280 142 H220 Z" />
      <path d="M218 144 H282 L288 158 H212 Z" />
      <path d="M210 160 H290 L297 174 H203 Z" />

      {/* Chaitya Arch Motifs on Central Spire */}
      <path d="M246 148 C246 142 254 142 254 148 V156 H246 Z" fill="#000000" />
      <path d="M243 176 C243 166 257 166 257 176 V188 H243 Z" fill="#000000" />

      {/* Stepped Shikhara Sub-Tiers */}
      <path d="M201 176 H299 L306 190 H194 Z" />
      <path d="M192 192 H308 L316 206 H184 Z" />
      <path d="M241 202 C241 190 259 190 259 202 V218 H241 Z" fill="#000000" />

      {/* Symmetrical Left & Right Upper Pyramidal Towers */}
      {/* Left Upper Tower */}
      <path d="M174 184 C174 180 178 180 178 184 L177 190 H175 Z" />
      <path d="M168 190 H184 L188 200 H164 Z" />
      <path d="M162 202 H190 L196 214 H156 Z" />
      <path d="M152 216 H200 L206 228 H146 Z" />

      {/* Right Upper Tower */}
      <path d="M322 184 C322 180 326 180 326 184 L325 190 H323 Z" />
      <path d="M316 190 H332 L336 200 H312 Z" />
      <path d="M310 202 H338 L344 214 H304 Z" />
      <path d="M300 216 H348 L354 228 H294 Z" />

      {/* Mid-Level Flanking Secondary Pyramids */}
      {/* Left Mid-Outer Tower */}
      <path d="M136 208 C136 204 140 204 140 208 L139 214 H137 Z" />
      <path d="M130 214 H146 L150 224 H126 Z" />
      <path d="M122 226 H154 L160 238 H116 Z" />
      <path d="M112 240 H164 L170 252 H106 Z" />

      {/* Right Mid-Outer Tower */}
      <path d="M360 208 C360 204 364 204 364 208 L363 214 H361 Z" />
      <path d="M354 214 H370 L374 224 H350 Z" />
      <path d="M346 226 H378 L384 238 H340 Z" />
      <path d="M336 240 H388 L394 252 H330 Z" />

      {/* Far Flank Outer Pavilions */}
      {/* Left Outer Wing */}
      <path d="M96 232 C96 228 100 228 100 232 L99 238 H97 Z" />
      <path d="M90 238 H106 L110 248 H86 Z" />
      <path d="M82 250 H114 L120 262 H76 Z" />
      <path d="M72 264 H124 L128 276 H68 Z" />

      {/* Right Outer Wing */}
      <path d="M400 232 C400 228 404 228 404 232 L403 238 H401 Z" />
      <path d="M394 238 H410 L414 248 H390 Z" />
      <path d="M386 250 H418 L424 262 H380 Z" />
      <path d="M376 264 H428 L432 276 H372 Z" />

      {/* Central Grand Triangular Pediment / Mandapa Roof */}
      <path d="M250 212 L310 254 H190 Z" />
      <path d="M180 256 H320 L328 270 H172 Z" />
      <path d="M168 272 H332 L340 286 H160 Z" />

      {/* Horizontal Connecting Cornice Bands & Architraves */}
      <path d="M64 278 H436 V288 H64 Z" />
      <path d="M60 290 H440 V298 H60 Z" />

      {/* Lower Arcade / Pillared Colonnade with Arches */}
      <path d="M70 300 H88 V328 H70 Z" fill="#000000" />
      <path d="M98 300 H118 V332 H98 Z" fill="#000000" />
      <path d="M130 300 H154 V336 H130 Z" fill="#000000" />
      <path d="M168 300 H196 V340 H168 Z" fill="#000000" />

      <path d="M304 300 H332 V340 H304 Z" fill="#000000" />
      <path d="M346 300 H370 V336 H346 Z" fill="#000000" />
      <path d="M382 300 H402 V332 H382 Z" fill="#000000" />
      <path d="M412 300 H430 V328 H412 Z" fill="#000000" />

      {/* Central Grand Entrance Portal */}
      <path d="M210 294 H290 L296 308 H204 Z" />
      <path d="M250 268 L286 292 H214 Z" />
      <path d="M208 294 H292 L298 306 H202 Z" />

      {/* Colonnade Pillars & Plinths */}
      {/* Outer Left Column 1 */}
      <path d="M66 298 H72 V340 H64 V344 H74 V340 H72 Z" />
      <path d="M86 298 H92 V340 H84 V344 H94 V340 H92 Z" />
      <path d="M62 344 H98 V350 H62 Z" />

      {/* Left Column Set 2 */}
      <path d="M116 298 H124 V346 H114 V352 H126 V346 H124 Z" />
      <path d="M110 352 H130 V358 H110 Z" />

      {/* Left Column Set 3 */}
      <path d="M152 298 H162 V352 H150 V360 H164 V352 H162 Z" />
      <path d="M146 360 H168 V366 H146 Z" />

      {/* Left Inner Pillar */}
      <path d="M194 304 H208 V362 H192 V370 H210 V362 H208 Z" />
      <path d="M188 370 H214 V378 H188 Z" />

      {/* Central Grand Arch Cutout */}
      <path d="M224 380 V328 C224 314 276 314 276 328 V380 H258 V338 C258 332 242 332 242 338 V380 Z" fill="#000000" />

      {/* Central Grand Columns */}
      <path d="M212 306 H228 V376 H208 V386 H232 V376 H228 Z" />
      <path d="M206 386 H234 V394 H206 Z" />

      <path d="M272 306 H288 V376 H268 V386 H292 V376 H288 Z" />
      <path d="M266 386 H294 V394 H266 Z" />

      {/* Right Inner Pillar */}
      <path d="M292 304 H306 V362 H290 V370 H308 V362 H306 Z" />
      <path d="M286 370 H312 V378 H286 Z" />

      {/* Right Column Set 3 */}
      <path d="M338 298 H348 V352 H336 V360 H350 V352 H348 Z" />
      <path d="M332 360 H354 V366 H332 Z" />

      {/* Right Column Set 2 */}
      <path d="M376 298 H384 V346 H374 V352 H386 V346 H384 Z" />
      <path d="M370 352 H390 V358 H370 Z" />

      {/* Outer Right Column 1 */}
      <path d="M408 298 H414 V340 H406 V344 H416 V340 H414 Z" />
      <path d="M428 298 H434 V340 H426 V344 H436 V340 H434 Z" />
      <path d="M402 344 H438 V350 H402 Z" />

      {/* Lower Stepped Base Pedestals */}
      <path d="M136 366 H178 V372 H136 Z" />
      <path d="M322 366 H364 V372 H322 Z" />

      <path d="M102 358 H138 V364 H102 Z" />
      <path d="M362 358 H398 V364 H362 Z" />

      <path d="M202 394 H238 V400 H202 Z" />
      <path d="M262 394 H298 V400 H262 Z" />
      <path d="M220 380 H280 V386 H220 Z" />
      <path d="M228 386 H272 V392 H228 Z" />

      <path d="M58 350 H102 V356 H58 Z" />
      <path d="M398 350 H442 V356 H398 Z" />
    </g>
  </svg>
);

export const BrassDiyaIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Golden Flame */}
    <path
      d="M16 3 C14 7 12 11 16 15 C20 11 18 7 16 3 Z"
      fill="#D97706"
    />
    <path
      d="M16 6 C15 8.5 14 10.5 16 13 C18 10.5 17 8.5 16 6 Z"
      fill="#FBBF24"
    />
    {/* Brass Lamp Bowl */}
    <path
      d="M7 16 C7 21 11 23 16 23 C21 23 25 21 25 16 H7 Z"
      fill="#92400E"
    />
    {/* Lamp Pedestal Stem & Base */}
    <path
      d="M14 23 H18 V26 H14 Z"
      fill="#78350F"
    />
    <path
      d="M10 26 H22 C22 28 20 29 16 29 C12 29 10 28 10 26 Z"
      fill="#92400E"
    />
  </svg>
);

export const GraniteTexturePlaceholder: React.FC<{
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}> = ({ title, subtitle, badge = 'Photo Confirmation Pending', className = 'h-72' }) => (
  <div
    className={`relative w-full overflow-hidden bg-gradient-to-br from-stone-900 via-[#2A1810] to-stone-950 flex flex-col justify-end p-6 border border-stone-800 text-stone-200 ${className}`}
  >
    {/* Subtle Architectural Pattern Background */}
    <div
      className="absolute inset-0 opacity-15 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, #B45309 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    />
    
    {/* Ornamental Heritage Motif Silhouette */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none text-stone-400">
      <TempleEmblem className="w-36 h-36" />
    </div>

    {/* Content Overlay */}
    <div className="relative z-10">
      <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        <span>{badge}</span>
      </div>
      <h4 className="text-lg font-cinzel font-semibold text-stone-100 tracking-wide">{title}</h4>
      {subtitle && <p className="text-xs text-stone-400 mt-1 max-w-md">{subtitle}</p>}
    </div>
  </div>
);
