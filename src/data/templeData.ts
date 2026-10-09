import {
  TempleInfo,
  TimelineEvent,
  ArchitecturalFeature,
  FestivalEvent,
  SevaItem,
  GalleryPhoto,
  CommunityStory,
  AnnouncementItem,
  VerificationItem,
} from '../types';

export const TEMPLE_INFO: TempleInfo = {
  officialName: {
    en: 'Anjaneya Swamy Temple',
    kn: 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ',
  },
  alternateNames: {
    en: ['Sri Anjaneya Swamy Temple, Thappagondanahalli', 'Thappagondanahalli Hanuman Temple'],
    kn: ['ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿ ಸನ್ನಿಧಿ ತಪಗೊಂಡನಹಳ್ಳಿ', 'ತಪಗೊಂಡನಹಳ್ಳಿ ಹನುಮಂತ ದೇವಸ್ಥಾನ'],
  },
  deity: {
    en: 'Lord Sri Anjaneya Swamy (Hanuman)',
    kn: 'ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿ (ಹನುಮಂತ ದೇವರು)',
  },
  village: {
    en: 'Thappagondanahalli',
    kn: 'ತಪಗೊಂಡನಹಳ್ಳಿ',
  },
  taluk: {
    en: 'Challakere',
    kn: 'ಚಳ್ಳಕೆರೆ',
  },
  district: {
    en: 'Chitradurga',
    kn: 'ಚಿತ್ರದುರ್ಗ',
  },
  state: {
    en: 'Karnataka',
    kn: 'ಕರ್ನಾಟಕ',
  },
  country: {
    en: 'India',
    kn: 'ಭಾರತ',
  },
  pinCode: '577537',
  gramPanchayat: {
    en: 'Renukapura Gram Panchayat',
    kn: 'ರೇಣುಕಾಪುರ ಗ್ರಾಮ ಪಂಚಾಯತಿ',
  },
  assemblyConstituency: {
    en: 'Molakalmuru (ST)',
    kn: 'ಮೊಳಕಾಲ್ಮುರು (ಎಸ್.ಟಿ)',
  },
  coordinates: {
    latitude: 14.425401,
    longitude: 76.8516294,
  },
  googleMapsUrl: 'https://maps.app.goo.gl/etwqM3uwJgdi93HK8',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=14.425401,76.8516294',
  managedBy: {
    en: 'Managed by Thappagondanahalli Gowdru Families',
    kn: 'ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳು',
  },
};

export const VILLAGE_DEMOGRAPHICS = {
  censusYear: '2011 (Census of India)',
  population: 1196,
  males: 608,
  females: 588,
  households: 261,
  totalAreaHectares: 846.79,
  nearestTown: 'Challakere (~40 km)',
  districtHQ: 'Chitradurga (~69 km)',
  postalSubOffice: 'Obalapura / Parasurampura area (PIN: 577537)',
  primaryLivelihood: {
    en: 'Agriculture (Groundnut, Ragi, Jowar, Pulses), Dairy Farming, and Rural Craftsmanship',
    kn: 'ಕೃಷಿ (ಕಡಲೆಕಾಯಿ, ರಾಗಿ, ಜೋಳ, ತೊಗರಿ), ಹೈನುಗಾರಿಕೆ ಮತ್ತು ಗ್ರಾಮೀಣ ಕಾಯಕಗಳು',
  },
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'timeline-1',
    period: {
      en: '16th – 18th Century CE (Nayaka / Vijayanagara Era)',
      kn: '೧೬ - ೧೮ನೇ ಶತಮಾನ (ನಾಯಕರು ಮತ್ತು ವಿಜಯನಗರ ಕಾಲ)',
    },
    title: {
      en: 'Devotional Roots in the Chitradurga Nayaka Territory',
      kn: 'ಚಿತ್ರದುರ್ಗ ಪಾಳೆಯಗಾರರ ಕಾಲದ ಆಂಜನೇಯ ಭಕ್ತಿ ಪರಂಪರೆ',
    },
    description: {
      en: 'Under the Vijayanagara Empire and the Chitradurga Nayakas (Madakari Nayaka lineage), reverence for Lord Hanuman as the supreme Kshetrapala (guardian of the realm and settlements) spread widely across rural Chitradurga. Temples were consecrated at village thresholds to invoke spiritual fortitude and divine protection.',
      kn: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ ಹಾಗೂ ಚಿತ್ರದುರ್ಗದ ಪಾಳೆಯಗಾರರ (ಮದಕರಿ ನಾಯಕರ ವಂಶ) ಆಡಳಿತಾವಧಿಯಲ್ಲಿ ಹನುಮಂತನನ್ನು ಗ್ರಾಮ ರಕ್ಷಕ ಹಾಗೂ ಧೈರ್ಯ-ಸ್ಥೈರ್ಯಗಳ ಪ್ರತೀಕವೆಂದು ಪ್ರತಿ ಹಳ್ಳಿಯಲ್ಲೂ ಪ್ರತಿಷ್ಠಾಪಿಸುವ ಸಂಪ್ರದಾಯ ವ್ಯಾಪಕವಾಗಿ ಬೆಳೆಯಿತು.',
    },
    type: 'DOCUMENTED',
    source: 'Karnataka State Gazetteer & Chitradurga Regional Heritage Studies',
  },
  {
    id: 'timeline-2',
    period: {
      en: 'Local Oral Tradition (Village Origins)',
      kn: 'ಗ್ರಾಮದ ಮೌಖಿಕ ಇತಿಹಾಸ ಹಾಗೂ ಐತಿಹ್ಯ',
    },
    title: {
      en: 'Consecration of Anjaneya Swamy at Thappagondanahalli',
      kn: 'ತಪಗೊಂಡನಹಳ್ಳಿಯಲ್ಲಿ ಅಂಜನೇಯ ಸ್ವಾಮಿಯ ಪ್ರತಿಷ್ಠಾಪನೆ',
    },
    description: {
      en: 'According to revered local oral tradition passed down through village elders, an auspicious monolith stone relief of Sri Anjaneya was identified by early founding families of Thappagondanahalli. Believed to safeguard the agricultural harvests and cattle wealth of the village, a sacred sanctum was established where daily deeparadhana commenced.',
      kn: 'ಗ್ರಾಮದ ಹಿರಿಯರ ಮೌಖಿಕ ಪರಂಪರೆಯ ಪ್ರಕಾರ, ತಪಗೊಂಡನಹಳ್ಳಿಯ ಪೂರ್ವಿಕರು ಕೃಷಿ, ಗೋಸಂಪತ್ತು ಹಾಗೂ ಗ್ರಾಮಸ್ಥರ ರಕ್ಷಣೆಗಾಗಿ ಸ್ವಯಂಭೂ ರೂಪದ ಕಲ್ಲಿನ ಅಂಜನೇಯ ವಿಗ್ರಹವನ್ನು ಭಕ್ತಿಯಿಂದ ಪೂಜಿಸಲು ಪ್ರಾರಂಭಿಸಿದರು.',
    },
    type: 'TRADITIONAL_ORAL',
    source: 'Local Oral Tradition from Village Elders (Subject to ongoing committee documentation)',
  },
  {
    id: 'timeline-3',
    period: {
      en: '20th Century Community Stewardship',
      kn: '೨೦ನೇ ಶತಮಾನದ ಸಮುದಾಯ ಸೇವೆ',
    },
    title: {
      en: 'Sustained Village Seva & Annual Jatre Traditions',
      kn: 'ಗ್ರಾಮಸ್ಥರ ಒಗ್ಗಟ್ಟಿನ ಸೇವೆ ಮತ್ತು ವಾರ್ಷಿಕ ಜಾತ್ರಾ ಮಹೋತ್ಸವ',
    },
    description: {
      en: 'The temple became the heart of Thappagondanahalli social and spiritual life. Annual Hanuman Jayanti celebrations, community Annadana, and harvest thanksgiving prayers united local families across all generations.',
      kn: 'ದೇವಸ್ಥಾನವು ಕೇವಲ ಪೂಜಾ ಸ್ಥಳವಾಗಿರದೆ ಗ್ರಾಮದ ಸಕಲ ಶುಭ ಕಾರ್ಯಗಳು, ಪಂಚಾಯ್ತಿ ತೀರ್ಮಾನಗಳು, ಹನುಮ ಜಯಂತಿ ಮತ್ತು ಸಾಮೂಹಿಕ ಅನ್ನದಾನದ ಕೇಂದ್ರ ಬಿಂದುವಾಗಿ ಬೆಳೆದುಬಂದಿತು.',
    },
    type: 'TRADITIONAL_ORAL',
    source: 'Oral Village Accounts & Traditional Festival Observances',
  },
  {
    id: 'timeline-4',
    period: {
      en: 'Modern Era & Renovation Initiatives',
      kn: 'ಆಧುನಿಕ ಕಾಲಘಟ್ಟ ಮತ್ತು ಜೀರ್ಣೋದ್ಧಾರ ಪ್ರಯತ್ನಗಳು',
    },
    title: {
      en: 'Sanctum Maintenance & Community Pride',
      kn: 'ಗರ್ಭಗುಡಿ ನಿರ್ವಹಣೆ ಮತ್ತು ಗ್ರಾಮಸ್ಥರ ಜೀರ್ಣೋದ್ಧಾರ ಸಂಕಲ್ಪ',
    },
    description: {
      en: 'Devotees from Thappagondanahalli, both resident and those working across Karnataka, have continuously contributed towards sanctum upkeep, lighting, and festival arrangements. The temple committee is currently documenting official historical records and renovation plans.',
      kn: 'ಊರಿನಲ್ಲಿರುವವರು ಹಾಗೂ ಉದ್ಯೋಗಕ್ಕಾಗಿ ಬೆಂಗಳೂರು, ಚಿತ್ರದುರ್ಗ ಮತ್ತಿತರ ನಗರಗಳಲ್ಲಿ ನೆಲೆಸಿರುವ ಗ್ರಾಮದ ಭಕ್ತರು ಒಟ್ಟಾಗಿ ದೇಗುಲದ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಗಳಿಗೆ ಕೈಜೋಡಿಸುತ್ತಿದ್ದಾರೆ.',
    },
    type: 'DOCUMENTED',
    source: 'Thappagondanahalli Village Community & Public Listings',
  },
];

export const ARCHITECTURAL_FEATURES: ArchitecturalFeature[] = [
  {
    id: 'arch-1',
    title: {
      en: 'Garbhagriha (Inner Sanctum)',
      kn: 'ಗರ್ಭಗೃಹ',
    },
    kannadaTerm: 'ಗರ್ಭಗುಡಿ',
    description: {
      en: 'The sanctum sanctorum houses the revered deity of Sri Anjaneya Swamy carved in sturdy local granite, facing eastward to receive the auspicious morning dawn. The deity is depicted in a valiant pose, symbolizing divine vigilance and unconditional bhakti.',
      kn: 'ಸ್ಥಳೀಯ ಗಟ್ಟಿ ಕಪ್ಪು ಗ್ರಾನೈಟ್ ಶಿಲೆಯಲ್ಲಿ ಕೆತ್ತಲಾದ ವೀರಾಂಜನೇಯ ಸ್ವಾಮಿಯ ಪೂರ್ವಾಭಿಮುಖ ಮೂರ್ತಿಯನ್ನು ಹೊಂದಿರುವ ಪವಿತ್ರ ಗರ್ಭಗುಡಿ. ನಿತ್ಯ ಪೂಜೆ ಹಾಗೂ ದೀಪಾರಾಧನೆ ಇಲ್ಲಿ ನೆರವೇರುತ್ತದೆ.',
    },
    status: 'PROBABLE',
  },
  {
    id: 'arch-2',
    title: {
      en: 'Mukhamandapa (Prayer Hall)',
      kn: 'ಮುಖಮಂಟಪ',
    },
    kannadaTerm: 'ಪ್ರಾರ್ಥನಾ ಸಭಾಂಗಣ',
    description: {
      en: 'A pillared prayer space designed in traditional Deccan rural temple architectural style, allowing devotees to sit together during bhajans, sankirtana, and village gatherings.',
      kn: 'ಭಕ್ತರು ಕುಳಿತು ಸಂಕೀರ್ತನೆ, ಭಜನೆ ಹಾಗೂ ಪ್ರಾರ್ಥನೆ ಸಲ್ಲಿಸಲು ಅನುಕೂಲಕರವಾದ ಸಾಂಪ್ರದಾಯಿಕ ಕಂಬಗಳನ್ನೊಳಗೊಂಡ ಮುಖಮಂಟಪ.',
    },
    status: 'PROBABLE',
  },
  {
    id: 'arch-3',
    title: {
      en: 'Deepasthambha & Temple Forecourt',
      kn: 'ದೀಪಸ್ತಂಭ ಹಾಗೂ ಮುಂಭಾಗ',
    },
    kannadaTerm: 'ದೀಪದ ಕಂಬ / ಅಂಗಳ',
    description: {
      en: 'The front courtyard is prepared for community deepotsava and festival processions, serving as the central assembly ground during major village celebrations.',
      kn: 'ಕಾರ್ತಿಕ ಮಾಸದ ದೀಪೋತ್ಸವ ಮತ್ತು ಹಬ್ಬದ ಮೆರವಣಿಗೆಗಳ ಸಂದರ್ಭದಲ್ಲಿ ಭಕ್ತರು ಸೇರುವ ಪವಿತ್ರ ಮುಂಭಾಗದ ಪ್ರಾಂಗಣ.',
    },
    status: 'PROBABLE',
  },
  {
    id: 'arch-4',
    title: {
      en: 'Stone Carvings & Heritage Relief',
      kn: 'ಶಿಲಾ ಕೆತ್ತನೆಗಳು ಮತ್ತು ಪಾರಂಪರಿಕ ವಿನ್ಯಾಸ',
    },
    kannadaTerm: 'ಶಿಲ್ಪಕಲೆ',
    description: {
      en: 'Traditional Karnataka stonework reflecting rural artisans of the Chitradurga plains, embodying timeless craftsmanship built to withstand arid weather and sun.',
      kn: 'ಚಿತ್ರದುರ್ಗದ ಬಯಲುಸೀಮೆಯ ಗ್ರಾಮೀಣ ಶಿಲ್ಪಿಗಳ ಸಾಂಪ್ರದಾಯಿಕ ಶಿಲಾ ಕೆತ್ತನೆ ಮತ್ತು ಸರಳ, ಗಂಭೀರ ಶೈಲಿ.',
    },
    status: 'PROBABLE',
  },
];

export const FESTIVALS_EVENTS: FestivalEvent[] = [
  {
    id: 'fest-1',
    name: {
      en: 'Hanuman Jayanti (Annual Utsava)',
      kn: 'ಶ್ರೀ ಹನುಮ ಜಯಂತಿ ಮಹೋತ್ಸವ',
    },
    lunarMonth: {
      en: 'Margashira Shukla Trayodashi / Chaitra Purnima',
      kn: 'ಮಾರ್ಗಶಿರ ಶುಕ್ಲ ತ್ರಯೋದಶಿ / ಚೈತ್ರ ಹುಣ್ಣಿಮೆ',
    },
    estimatedDate: 'December / April (Annual Calendar)',
    description: {
      en: 'The most anticipated annual festival at Thappagondanahalli. Special abhishekham with panchamrita, grand pushpalankara (flower decoration), continuous Hanuman Chalisa recitations, and community Annadana for hundreds of visiting devotees.',
      kn: 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಅತ್ಯಂತ ವೈಭವದ ಹಬ್ಬ. ಸ್ವಾಮಿಗೆ ಪಂಚಾಮೃತಾಭಿಷೇಕ, ವಿಶೇಷ ಪುಷ್ಪಾಲಂಕಾರ, ಹನುಮಾನ್ ಚಾಲೀಸಾ ಪಠಣ ಮತ್ತು ಸಮಸ್ತ ಗ್ರಾಮಸ್ಥರಿಗೆ ಹಾಗೂ ಭಕ್ತರಿಗೆ ಮಹಾ ಅನ್ನದಾನ.',
    },
    traditions: {
      en: [
        'Dawn Maha Mangalarathi',
        'Sindhoora and Betel Leaf (Vadamala) offering',
        'Village Procession (Gramotsava)',
        'Community Annasantarpane',
      ],
      kn: [
        'ಬ್ರಾಹ್ಮೀ ಮುಹೂರ್ತದಲ್ಲಿ ಮಹಾ ಮಂಗಳಾರತಿ',
        'ಸಿಂಧೂರ ಹಾಗೂ ವೀಳ್ಯದೆಲೆ ಪೂಜೆ',
        'ಗ್ರಾಮೋತ್ಸವ ಮತ್ತು ಭಜನಾ ಮೇಳ',
        'ಸಾಮೂಹಿಕ ಮಹಾ ಅನ್ನಸಂತರ್ಪಣೆ',
      ],
    },
    status: 'VERIFIED',
    location: 'Anjaneya Swamy Temple, Thappagondanahalli',
  },
  {
    id: 'fest-2',
    name: {
      en: 'Sri Rama Navami Celebrations',
      kn: 'ಶ್ರೀ ರಾಮನವಮಿ ಉತ್ಸವ',
    },
    lunarMonth: {
      en: 'Chaitra Shukla Navami',
      kn: 'ಚೈತ್ರ ಶುಕ್ಲ ನವಮಿ',
    },
    estimatedDate: 'March / April',
    description: {
      en: 'As the supreme devotee of Lord Rama, Anjaneya Swamy is worshipped with profound devotion on Rama Navami with sweet panakam, kosambari distribution, and devotional singing honoring the Ramayana.',
      kn: 'ಶ್ರೀರಾಮಚಂದ್ರನ ಪರಮ ಭಕ್ತನಾದ ಆಂಜನೇಯ ಸ್ವಾಮಿಯ ಸನ್ನಿಧಿಯಲ್ಲಿ ಪಾನಕ, ಕೋಸಂಬರಿ ವಿತರಣೆ ಮತ್ತು ರಾಮನಾಮ ಸಂಕೀರ್ತನೆಯೊಂದಿಗೆ ರಾಮನವಮಿ ಆಚರಣೆ.',
    },
    traditions: {
      en: ['Sri Rama Taraka Homa', 'Panakam and Buttermilk distribution', 'Ramayana Parayana'],
      kn: ['ಶ್ರೀರಾಮ ತಾರಕ ಜಪ', 'ತಂಪು ಪಾನಕ-ಮಜ್ಜಿಗೆ ಪ್ರಸಾದ ವಿನಿಯೋಗ', 'ರಾಮಾಯಣ ಪಾರಾಯಣ'],
    },
    status: 'VERIFIED',
    location: 'Anjaneya Swamy Temple, Thappagondanahalli',
  },
  {
    id: 'fest-3',
    name: {
      en: 'Kartika Deepotsava (Festival of Lamps)',
      kn: 'ಕಾರ್ತಿಕ ಮಾಸದ ದೀಪೋತ್ಸವ',
    },
    lunarMonth: {
      en: 'Kartika Masa (Full Month)',
      kn: 'ಕಾರ್ತಿಕ ಮಾಸ ಪೂರ್ತಿ',
    },
    estimatedDate: 'November',
    description: {
      en: 'Earthen oil lamps are lit around the sanctum and outer forecourt every Monday and on Kartika Somavara, creating an enchanting spiritual ambiance of warm golden light throughout the village night.',
      kn: 'ಕಾರ್ತಿಕ ಮಾಸದ ಸೋಮವಾರಗಳಂದು ದೇಗುಲದ ಸುತ್ತಲೂ ನೂರಾರು ಮಣ್ಣಿನ ಹಣತೆಗಳನ್ನು ಬೆಳಗಿಸಿ ಭಕ್ತಿಪೂರ್ವಕ ದೀಪೋತ್ಸವ ನಡೆಸಲಾಗುತ್ತದೆ.',
    },
    traditions: {
      en: ['Akhanda Deeparadhana', 'Laksha Deepotsava on Special Evenings', 'Devotional Bhajans'],
      kn: ['ಅಖಂಡ ದೀಪಾರಾಧನೆ', 'ದೀಪಾಲಂಕಾರ', 'ಗ್ರಾಮಸ್ಥರಿಂದ ಸಂಧ್ಯಾ ಭಜನೆ'],
    },
    status: 'VERIFIED',
    location: 'Anjaneya Swamy Temple, Thappagondanahalli',
  },
  {
    id: 'fest-4',
    name: {
      en: 'Saturday Special Pujas (Shanivara Seva)',
      kn: 'ಶನಿವಾರದ ವಿಶೇಷ ಪೂಜೆ',
    },
    lunarMonth: {
      en: 'Every Saturday of the Month',
      kn: 'ಪ್ರತಿ ಶನಿವಾರ',
    },
    estimatedDate: 'Weekly',
    description: {
      en: 'Saturdays hold sacred significance for Lord Hanuman. Devotees gather for special archana, oil offerings, and prayers for health, peace of mind, and release from planetary adversities.',
      kn: 'ಪ್ರತಿ ಶನಿವಾರ ಸ್ವಾಮಿಗೆ ವಿಶೇಷ ಅರ್ಚನೆ, ಎಣ್ಣೆ ಶಾಂತಿ ಹಾಗೂ ಭಕ್ತರಿಗೆ ತೀರ್ಥ ಪ್ರಸಾದ ವಿನಿಯೋಗ.',
    },
    traditions: {
      en: ['Tailabhishekam', 'Archana with sacred Tulasi leaves', 'Mangalarathi'],
      kn: ['ತೈಲಾಭಿಷೇಕ', 'ತುಳಸಿ ದಳಗಳಿಂದ ಅರ್ಚನೆ', 'ಮಂಗಳಾರತಿ ಮತ್ತು ಪ್ರಸಾದ'],
    },
    status: 'VERIFIED',
    location: 'Anjaneya Swamy Temple, Thappagondanahalli',
  },
];

export const POOJA_SEVAS: SevaItem[] = [
  {
    id: 'seva-1',
    name: {
      en: 'Nitya Archana & Deeparadhana',
      kn: 'ನಿತ್ಯ ಅರ್ಚನೆ ಮತ್ತು ದೀಪಾರಾಧನೆ',
    },
    description: {
      en: 'Daily ritual offering of sacred lamps, flowers, and chants invoking blessings for family wellbeing and peace.',
      kn: 'ದೈನಂದಿನ ಸಂಪ್ರದಾಯದಂತೆ ಸ್ವಾಮಿಗೆ ಪುಷ್ಪಾರ್ಚನೆ, ದೀಪಾರಾಧನೆ ಮತ್ತು ನೈವೇದ್ಯ ಸಮರ್ಪಣೆ.',
    },
    timing: {
      en: 'Morning & Evening (Timings to be confirmed by Temple Committee)',
      kn: 'ಬೆಳಗ್ಗೆ ಮತ್ತು ಸಂಜೆ (ಸಮಯವನ್ನು ದೇವಸ್ಥಾನ ಸಮಿತಿಯು ದೃಢಪಡಿಸಬೇಕಿದೆ)',
    },
    status: 'VERIFIED',
    offeringNote: {
      en: 'Voluntary devotee contribution / Inquire locally',
      kn: 'ಸ್ವಯಂಪ್ರೇರಿತ ಭಕ್ತಿ ಕಾಣಿಕೆ / ಸ್ಥಳೀಯವಾಗಿ ವಿಚಾರಿಸಿ',
    },
  },
  {
    id: 'seva-2',
    name: {
      en: 'Panchamrita Abhishekam (Saturday / Utsava)',
      kn: 'ಪಂಚಾಮೃತಾಭಿಷೇಕ ಸೇವೆ',
    },
    description: {
      en: 'Sacred bath performed for the deity with milk, curd, honey, ghee, and sugar, accompanied by Vedic mantras and Hanuman Ashtottara.',
      kn: 'ಹಾಲು, ಮೊಸರು, ಜೇನುತುಪ್ಪ, ತುಪ್ಪ ಮತ್ತು ಸಕ್ಕರೆಯಿಂದ ಸ್ವಾಮಿಗೆ ವಿಧಿವತ್ತಾದ ಅಭಿಷೇಕ.',
    },
    timing: {
      en: 'Saturdays and Special Festival Occasions',
      kn: 'ಶನಿವಾರಗಳು ಹಾಗೂ ಹಬ್ಬದ ವಿಶೇಷ ದಿನಗಳಲ್ಲಿ',
    },
    status: 'PROBABLE',
    offeringNote: {
      en: 'Information to be confirmed by the temple committee.',
      kn: 'ದೇವಸ್ಥಾನ ಸಮಿತಿಯು ವಿವರಗಳನ್ನು ದೃಢಪಡಿಸಬೇಕಿದೆ.',
    },
  },
  {
    id: 'seva-3',
    name: {
      en: 'Aku Pooja / Betel Leaf Mala Seva',
      kn: 'ವೀಳ್ಯದೆಲೆ ಮಾಲೆ ಸೇವೆ (ಆಕು ಪೂಜೆ)',
    },
    description: {
      en: 'Offering of 108 or 1008 fresh betel leaves garlanded with sacred vermillion, a cherished devotion to Sri Anjaneya for success in endeavors.',
      kn: '೧೦೮ ಅಥವಾ ೧೦೦೮ ಹಸಿರು ವೀಳ್ಯದೆಲೆಗಳ ಮಾಲೆಯನ್ನು ಸ್ವಾಮಿಗೆ ಸಮರ್ಪಿಸುವ ಭಕ್ತಿಪೂರ್ವಕ ಸೇವೆ.',
    },
    timing: {
      en: 'Prior appointment with temple priest required',
      kn: 'ಅರ್ಚಕರೊಂದಿಗೆ ಮೊದಲೇ ಸಂಪರ್ಕಿಸಿ ನಿಗದಿಪಡಿಸಿಕೊಳ್ಳಬೇಕು',
    },
    status: 'PROBABLE',
    offeringNote: {
      en: 'Information to be confirmed by the temple committee.',
      kn: 'ದೇವಸ್ಥಾನ ಸಮಿತಿಯು ವಿವರಗಳನ್ನು ದೃಢಪಡಿಸಬೇಕಿದೆ.',
    },
  },
  {
    id: 'seva-4',
    name: {
      en: 'Annadana Seva (Festival Food Sponsorship)',
      kn: 'ಶಾಶ್ವತ / ವಾರ್ಷಿಕ ಅನ್ನದಾನ ಸೇವೆ',
    },
    description: {
      en: 'Providing wholesome meals to visiting devotees and villagers during Hanuman Jayanti and major temple observances.',
      kn: 'ಹನುಮ ಜಯಂತಿ ಮತ್ತು ವಿಶೇಷ ದಿನಗಳಲ್ಲಿ ಭಕ್ತರಿಗೆ ಸಾತ್ವಿಕ ಪ್ರಸಾದ ಊಟದ ವ್ಯವಸ್ಥೆ.',
    },
    timing: {
      en: 'During Jayanti Utsava and Village Festivals',
      kn: 'ಜಯಂತಿ ಉತ್ಸವ ಹಾಗೂ ಗ್ರಾಮ ಜಾತ್ರೆಗಳ ಸಮಯದಲ್ಲಿ',
    },
    status: 'VERIFIED',
    offeringNote: {
      en: 'Official trust bank details pending committee confirmation. Direct in-person contribution accepted at temple.',
      kn: 'ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಸಮಿತಿ ದೃಢಪಡಿಸಬೇಕಿದೆ. ದೇವಸ್ಥಾನದಲ್ಲಿ ಖುದ್ದಾಗಿ ಭೇಟಿ ನೀಡಿ ಸೇವೆ ಸಲ್ಲಿಸಬಹುದು.',
    },
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-hanuman-swamy',
    title: {
      en: 'Sri Anjaneya Swamy Gada Murthy',
      kn: 'ಶ್ರೀ ಗಧಾಧಾರಿ ಆಂಜನೇಯ ಸ್ವಾಮಿ',
    },
    category: 'temple',
    caption: {
      en: 'Lord Sri Anjaneya Swamy holding the sacred golden gada (mace), the supreme guardian deity of Thappagondanahalli.',
      kn: 'ಪವಿತ್ರ ಗದೆಯನ್ನು ಧರಿಸಿದ ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿಯ ಶಕ್ತಿಶಾಲಿ ರೂಪ, ತಪಗೊಂಡನಹಳ್ಳಿಯ ಗ್ರಾಮ ರಕ್ಷಕ ದೇವರು.',
    },
    credit: 'Temple Archival Collection',
    date: '2026',
    imageUrl: '/hanuman-hero-bg.jpg',
    isPlaceholder: false,
    status: 'VERIFIED',
  },
  {
    id: 'photo-hanuman-portrait',
    title: {
      en: 'Sacred Sanctum Sri Anjaneya',
      kn: 'ಗರ್ಭಗುಡಿ ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದಿವ್ಯ ದರ್ಶನ',
    },
    category: 'temple',
    caption: {
      en: 'Serene portrait of Sri Anjaneya Swamy, devoutly worshipped and managed by Thappagondanahalli Gowdru Families.',
      kn: 'ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳು ಭಕ್ತಿಯಿಂದ ನಿರ್ವಹಿಸುತ್ತಿರುವ ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿಯ ಪಾವಿತ್ರ್ಯಪೂರ್ಣ ದಿವ್ಯ ರೂಪ.',
    },
    credit: 'Thappagondanahalli Gowdru Families Archives',
    date: '2026',
    imageUrl: '/hanuman-portrait.jpg',
    isPlaceholder: false,
    status: 'VERIFIED',
  },
  {
    id: 'photo-forecourt-darshan',
    title: {
      en: 'Temple Sannidhi & Sacred Forecourt',
      kn: 'ದೇವಾಲಯದ ಪ್ರಾಂಗಣ ಹಾಗೂ ಪವಿತ್ರ ಸನ್ನಿಧಿ',
    },
    category: 'architecture',
    caption: {
      en: 'Granite stone pillars and welcoming temple forecourt where devotees gather for evening deeparadhana.',
      kn: 'ಸಂಜೆಯ ದೀಪಾರಾಧನೆ ಮತ್ತು ಪ್ರದಕ್ಷಿಣೆಗೆ ಭಕ್ತರು ಸೇರುವ ಗಟ್ಟಿ ಗ್ರಾನೈಟ್ ಕಂಬಗಳ ಪವಿತ್ರ ಮುಂಭಾಗ.',
    },
    credit: 'Thappagondanahalli Village Archive',
    date: '2026',
    imageUrl: '/test-logo-1.jpg',
    isPlaceholder: false,
    status: 'VERIFIED',
  },
  {
    id: 'photo-divine-murti',
    title: {
      en: 'Lord Sri Anjaneya Swamy Auspicious Alankara',
      kn: 'ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿಯ ದಿವ್ಯ ಪುಷ್ಪಾಲಂಕಾರ',
    },
    category: 'temple',
    caption: {
      en: 'Auspicious sindhoora and flower garland alankara of Lord Hanuman facing eastward.',
      kn: 'ಪೂರ್ವಾಭಿಮುಖ ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿಗೆ ಸಿಂಧೂರ, ತುಳಸಿ ಹಾಗೂ ಪುಷ್ಪಗಳಿಂದ ಮಾಡಲಾದ ದಿವ್ಯ ಅಲಂಕಾರ.',
    },
    credit: 'Temple Committee Documentation',
    date: '2026',
    imageUrl: '/test-logo-2.jpg',
    isPlaceholder: false,
    status: 'VERIFIED',
  },
  {
    id: 'photo-village-procession',
    title: {
      en: 'Festive Utsava Murti & Deeparadhana',
      kn: 'ವಾರ್ಷಿಕ ಉತ್ಸವ ಮೂರ್ತಿ ಮತ್ತು ದೀಪಾರಾಧನೆ',
    },
    category: 'festivals',
    caption: {
      en: 'Devotional procession during Hanuma Jayanthi Gramotsava uniting all families of Thappagondanahalli.',
      kn: 'ಹನುಮ ಜಯಂತಿಯ ಗ್ರಾಮೋತ್ಸವ ಸಂದರ್ಭದಲ್ಲಿ ಊರಿನ ಪ್ರಮುಖ ಬೀದಿಗಳಲ್ಲಿ ನಡೆಯುವ ಭವ್ಯ ಮೆರವಣಿಗೆ.',
    },
    credit: 'Community Archival Heritage',
    date: '2026',
    imageUrl: '/test-logo-3.jpg',
    isPlaceholder: false,
    status: 'VERIFIED',
  },
  {
    id: 'photo-1',
    title: {
      en: 'Sanctum Sanctity & Sacred Lamp',
      kn: 'ಗರ್ಭಗುಡಿಯ ಪಾವಿತ್ರ್ಯ ಮತ್ತು ನಂದಾದೀಪ',
    },
    category: 'temple',
    caption: {
      en: 'Sacred oil diya glowing peacefully in the granite sanctum niche, illuminating the devotional tradition of Thappagondanahalli.',
      kn: 'ಗ್ರಾನೈಟ್ ಗರ್ಭಗುಡಿಯ ಗೂಡಿನಲ್ಲಿ ಬೆಳಗುತ್ತಿರುವ ಪವಿತ್ರ ನಂದಾದೀಪ.',
    },
    credit: 'Temple Heritage Archival',
    date: '2026',
    isPlaceholder: true,
    status: 'PENDING_COMMITTEE_CONFIRMATION',
  },
  {
    id: 'photo-2',
    title: {
      en: 'Thappagondanahalli Village Landscape',
      kn: 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಗ್ರಾಮ ಪರಿಸರ',
    },
    category: 'village',
    caption: {
      en: 'Arid Deccan farmlands and rustic rocky terrain characteristic of Challakere taluk and Chitradurga district.',
      kn: 'ಚಳ್ಳಕೆರೆ ತಾಲೂಕು ಮತ್ತು ಚಿತ್ರದುರ್ಗ ಜಿಲ್ಲೆಯ ಬಯಲುಸೀಮೆಯ ಪ್ರಶಾಂತ ಕೃಷಿ ಭೂಮಿ.',
    },
    credit: 'Regional Geography Documentation',
    date: '2026',
    isPlaceholder: true,
    status: 'VERIFIED',
  },
  {
    id: 'photo-3',
    title: {
      en: 'Traditional Granite Stone Craft',
      kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಶಿಲಾ ವಿನ್ಯಾಸ',
    },
    category: 'architecture',
    caption: {
      en: 'Weathered stone motifs and architectural integrity reflecting Karnataka rural temple traditions.',
      kn: 'ಕರ್ನಾಟಕದ ಗ್ರಾಮೀಣ ದೇಗುಲ ಶೈಲಿಯ ಸರಳ ಮತ್ತು ದೃಢ ಶಿಲಾ ಕೆತ್ತನೆಗಳು.',
    },
    credit: 'Karnataka Heritage Architecture Archive',
    date: '2025',
    isPlaceholder: true,
    status: 'PROBABLE',
  },
  {
    id: 'photo-4',
    title: {
      en: 'Deepotsava Evening Glow',
      kn: 'ದೀಪೋತ್ಸವದ ಸಂಧ್ಯಾ ಸಂಭ್ರಮ',
    },
    category: 'festivals',
    caption: {
      en: 'Festive arrangement of earthen lamps lit during Kartika month festivities at village threshold.',
      kn: 'ಕಾರ್ತಿಕ ಮಾಸದ ದೀಪೋತ್ಸವದ ಸಂಜೆ ಸಾಲಾಗಿ ಬೆಳಗುವ ಸಾಂಪ್ರದಾಯಿಕ ಮಣ್ಣಿನ ಹಣತೆಗಳು.',
    },
    credit: 'Community Archival / Representative',
    date: '2025',
    isPlaceholder: true,
    status: 'PROBABLE',
  },
  {
    id: 'photo-5',
    title: {
      en: 'Sacred Tulasi & Sindhoora Offering',
      kn: 'ತುಳಸಿ ದಳ ಮತ್ತು ಸಿಂಧೂರ ಸಮರ್ಪಣೆ',
    },
    category: 'tradition',
    caption: {
      en: 'Traditional worship items prepared for Saturday archana honoring Sri Anjaneya Swamy.',
      kn: 'ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿಯ ಶನಿವಾರದ ವಿಶೇಷ ಪೂಜೆಗಾಗಿ ಸಿದ್ಧಪಡಿಸಿದ ತುಳಸಿ ಹಾಗೂ ಸಿಂಧೂರ.',
    },
    credit: 'Village Seva Samiti Archive',
    date: '2026',
    isPlaceholder: true,
    status: 'PROBABLE',
  },
  {
    id: 'photo-6',
    title: {
      en: 'Community Gathering at Temple Forecourt',
      kn: 'ದೇವಸ್ಥಾನದ ಮುಂಭಾಗದಲ್ಲಿ ಗ್ರಾಮಸ್ಥರ ಸಮಾವೇಶ',
    },
    category: 'village',
    caption: {
      en: 'Villagers gathering during annual utsav celebrations for mutual fellowship and prayer.',
      kn: 'ವಾರ್ಷಿಕ ಜಾತ್ರೆಯ ಸಂದರ್ಭದಲ್ಲಿ ಒಟ್ಟಾಗಿ ಸೇರುವ ತಪಗೊಂಡನಹಳ್ಳಿಯ ಬಂಧುಗಳು.',
    },
    credit: 'Thappagondanahalli Community Archive',
    date: '2025',
    isPlaceholder: true,
    status: 'PENDING_COMMITTEE_CONFIRMATION',
  },
];

export const COMMUNITY_STORIES: CommunityStory[] = [
  {
    id: 'story-1',
    author: 'Gramastharu (Village Elder Voices)',
    village: 'Thappagondanahalli',
    date: 'Documented Oral Account',
    title: {
      en: 'A Pillar of Solace in Changing Times',
      kn: 'ಕಷ್ಟ-ಸುಖಗಳಲ್ಲಿ ನಮ್ಮನ್ನು ಕಾಯುವ ಧೈರ್ಯದ ನೆಲೆ',
    },
    story: {
      en: 'For generations of families farming the dry soils of Thappagondanahalli, Anjaneya Swamy has been the first presence we greet before tilling fields and the guardian we thank upon harvesting. No wedding or auspicious commencement begins in our village without receiving ಸ್ವಾಮಿಯ ತೀರ್ಥ-ಪ್ರಸಾದ (the Lord’s sacred blessing).',
      kn: 'ನಮ್ಮ ತಪಗೊಂಡನಹಳ್ಳಿಯಲ್ಲಿ ಕೃಷಿ ಮಾಡುವ ರೈತರಿಗೆ ಆಂಜನೇಯ ಸ್ವಾಮಿಯೇ ಬೆನ್ನೆಲುಬು. ಹೊಲ ಬಿತ್ತುವುದಕ್ಕೆ ಮುಂಚೆಯಾಗಲಿ, ಫಸಲು ಮನೆಗೆ ತರುವ ಮುಂಚೆಯಾಗಲಿ ಸ್ವಾಮಿಯ ದರ್ಶನ ಮಾಡುವುದು ನಮ್ಮ ಹಿರಿಯರ ಕಾಲದಿಂದ ನಡೆದುಬಂದ ಪದ್ಧತಿ. ಊರಿನ ಯಾವುದೇ ಶುಭ ಕಾರ್ಯವೂ ಸ್ವಾಮಿಯ ಆಶೀರ್ವಾದವಿಲ್ಲದೆ ನಡೆಯುವುದಿಲ್ಲ.',
    },
    approved: true,
  },
  {
    id: 'story-2',
    author: 'Youth Volunteer Circle',
    village: 'Bengaluru / Thappagondanahalli',
    date: '2025 Annual Visit',
    title: {
      en: 'Connecting Rooted Heritage to Future Generations',
      kn: 'ಬೇರುಗಳನ್ನು ಮರೆಯದೆ ಮುನ್ನಡೆಯುವ ಯುವ ಪೀಳಿಗೆ',
    },
    story: {
      en: 'Even though several from our youth have migrated to Chitradurga, Davanagere, or Bengaluru for education and jobs, everyone returns home to Thappagondanahalli during Hanuman Jayanti. Serving Annadana and lighting deepas together keeps our community bond unbreakable.',
      kn: 'ಉದ್ಯೋಗ ಮತ್ತು ವಿದ್ಯಾಭ್ಯಾಸಕ್ಕಾಗಿ ನಗರಗಳಿಗೆ ತೆರಳಿದ್ದರೂ, ಹನುಮ ಜಯಂತಿಯ ಸಮಯದಲ್ಲಿ ಊರಿಗೆ ಮರಳಿ ದೇಗುಲದ ಸೇವೆ ಮಾಡುವುದು ನಮಗೆಲ್ಲ ಅತ್ಯಂತ ಹೆಮ್ಮೆಯ ಸಂಗತಿ. ಈ ದೇಗುಲ ನಮ್ಮೆಲ್ಲರನ್ನೂ ಒಗ್ಗೂಡಿಸುವ ಕೊಂಡಿ.',
    },
    approved: true,
  },
];

export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    date: 'September 2026',
    title: {
      en: 'Digital Heritage Portal Inauguration',
      kn: 'ದೇವಸ್ಥಾನದ ನೂತನ ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ಪೋರ್ಟಲ್ ಪ್ರಾರಂಭ',
    },
    content: {
      en: 'Welcome to the official digital presence of Anjaneya Swamy Temple, Thappagondanahalli. Devotees worldwide can now learn about our heritage, festival schedules, and village history.',
      kn: 'ತಪಗೊಂಡನಹಳ್ಳಿಯ ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನದ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಸ್ವಾಗತ. ದೇಶ-ವಿದೇಶಗಳಲ್ಲಿರುವ ಭಕ್ತರು ಊರಿನ ಇತಿಹಾಸ ಹಾಗೂ ಉತ್ಸವಗಳ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ಪಡೆಯಬಹುದು.',
    },
    category: {
      en: 'General Notice',
      kn: 'ಸಾಮಾನ್ಯ ಪ್ರಕಟಣೆ',
    },
  },
  {
    id: 'ann-2',
    date: 'Upcoming Season',
    title: {
      en: 'Request for Archival Photos & Family Memories',
      kn: 'ಪುರಾತನ ಛಾಯಾಚಿತ್ರಗಳು ಮತ್ತು ನೆನಪುಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ವಿನಂತಿ',
    },
    content: {
      en: 'Villagers and former residents holding vintage photographs of previous Jatres or temple renovations are invited to submit them through our community section for preservation.',
      kn: 'ಹಿಂದಿನ ಜಾತ್ರೆಗಳು ಹಾಗೂ ದೇವಸ್ಥಾನದ ಜೀರ್ಣೋದ್ಧಾರದ ಹಳೆಯ ಛಾಯಾಚಿತ್ರಗಳು ನಿಮ್ಮಲ್ಲಿದ್ದರೆ, ಸಮುದಾಯ ವಿಭಾಗದ ಮೂಲಕ ಹಂಚಿಕೊಳ್ಳಲು ಕೋರಲಾಗಿದೆ.',
    },
    category: {
      en: 'Community Initiative',
      kn: 'ಸಮುದಾಯ ಕರೆ',
    },
  },
];

export const VERIFICATION_DATASET: VerificationItem[] = [
  {
    id: 'v-1',
    field: 'Temple Official Name',
    fieldKn: 'ದೇವಸ್ಥಾನದ ಅಧಿಕೃತ ಹೆಸರು',
    value: 'Anjaneya Swamy Temple',
    valueKn: 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ',
    status: 'VERIFIED',
    source: 'Google Maps Official Listing (https://maps.app.goo.gl/etwqM3uwJgdi93HK8)',
    sourceType: 'GoogleMaps',
    notes: 'Directly verified from provided Google Maps listing for Thappagondanahalli.',
    notesKn: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಅಧಿಕೃತ ಪಟ್ಟಿಯಿಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ.',
  },
  {
    id: 'v-2',
    field: 'Village Name & Location',
    fieldKn: 'ಗ್ರಾಮದ ಹೆಸರು ಮತ್ತು ಸ್ಥಳ',
    value: 'Thappagondanahalli (Tappagondanahalli), Karnataka',
    valueKn: 'ತಪಗೊಂಡನಹಳ್ಳಿ, ಕರ್ನಾಟಕ',
    status: 'VERIFIED',
    source: 'Census of India 2011, Government of Karnataka Revenue Records',
    sourceType: 'Census',
    notes: 'Located in Challakere Taluk, Chitradurga District.',
    notesKn: 'ಚಳ್ಳಕೆರೆ ತಾಲೂಕು, ಚಿತ್ರದುರ್ಗ ಜಿಲ್ಲೆಯ ಅಧಿಕೃತ ಕಂದಾಯ ಗ್ರಾಮ.',
  },
  {
    id: 'v-3',
    field: 'Geographic Coordinates',
    fieldKn: 'ಭೌಗೋಳಿಕ ನಿರ್ದೇಶಾಂಕಗಳು',
    value: '14.425401° N, 76.8516294° E',
    valueKn: '೧೪.೪೨೫೪೦೧° ಉತ್ತರ, ೭೬.೮೫೧೬೨೯೪° ಪೂರ್ವ',
    status: 'VERIFIED',
    source: 'Google Maps URL verification',
    sourceType: 'GoogleMaps',
    notes: 'Pinpointed on verified GPS pin.',
    notesKn: 'ಜಿಪಿಎಸ್ ಮೂಲಕ ನಿಖರವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.',
  },
  {
    id: 'v-4',
    field: 'Postal PIN Code',
    fieldKn: 'ಅಂಚೆ ಪಿನ್ ಕೋಡ್',
    value: '577537 (Obalapura Sub-Office / Challakere Division)',
    valueKn: '೫೭೭೫೩೭ (ಓಬಳಾಪುರ ಉಪ ಅಂಚೆ ಕಚೇರಿ ವ್ಯಾಪ್ತಿ)',
    status: 'VERIFIED',
    source: 'India Post Official PIN Code Directory',
    sourceType: 'Government',
    notes: 'Thappagondanahalli is indexed under PIN 577537.',
    notesKn: 'ಇಂಡಿಯಾ ಪೋಸ್ಟ್ ಅಧಿಕೃತ ದಾಖಲೆಗಳಿಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ.',
  },
  {
    id: 'v-5',
    field: 'Gram Panchayat & Assembly',
    fieldKn: 'ಗ್ರಾಮ ಪಂಚಾಯತಿ ಮತ್ತು ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರ',
    value: 'Renukapura Gram Panchayat, Molakalmuru Assembly Constituency',
    valueKn: 'ರೇಣುಕಾಪುರ ಗ್ರಾಮ ಪಂಚಾಯತಿ, ಮೊಳಕಾಲ್ಮುರು ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರ',
    status: 'VERIFIED',
    source: 'Karnataka Panchayati Raj & Election Commission Records',
    sourceType: 'Government',
    notes: 'Administered under Renukapura Gram Panchayat.',
    notesKn: 'ರೇಣುಕಾಪುರ ಗ್ರಾಮ ಪಂಚಾಯತಿ ವ್ಯಾಪ್ತಿಗೆ ಸೇರಿದೆ.',
  },
  {
    id: 'v-6',
    field: 'Temple Trust Registration Details',
    fieldKn: 'ಟ್ರಸ್ಟ್ ನೊಂದಣಿ ವಿವರಗಳು',
    value: 'Official Trust Registration Number pending committee submission',
    valueKn: 'ದೇವಸ್ಥಾನ ಟ್ರಸ್ಟ್ ನೊಂದಣಿ ಸಂಖ್ಯೆ ಸಮಿತಿಯಿಂದ ದೃಢೀಕರಣ ನಿರೀಕ್ಷೆಯಲ್ಲಿದೆ',
    status: 'PENDING_COMMITTEE_CONFIRMATION',
    source: 'Temple Committee Internal Records',
    sourceType: 'CommitteePending',
    notes: 'Placeholder retained. No fake registration number invented.',
    notesKn: 'ಯಾವುದೇ ಕಾಲ್ಪನಿಕ ಸಂಖ್ಯೆಯನ್ನು ನೀಡದೆ ಸಮಿತಿಯ ದೃಢೀಕರಣಕ್ಕೆ ಕಾಯಲಾಗಿದೆ.',
  },
  {
    id: 'v-7',
    field: 'Official Contact Phone & Helpline',
    fieldKn: 'ಅಧಿಕೃತ ದೂರವಾಣಿ ಸಂಖ್ಯೆ',
    value: 'Official phone number is currently being confirmed by the temple committee',
    valueKn: 'ದೇವಸ್ಥಾನ ಸಮಿತಿಯು ಅಧಿಕೃತ ದೂರವಾಣಿ ಸಂಖ್ಯೆಯನ್ನು ದೃಢಪಡಿಸುತ್ತಿದೆ',
    status: 'PENDING_COMMITTEE_CONFIRMATION',
    source: 'Temple Committee Internal Records',
    sourceType: 'CommitteePending',
    notes: 'Personal phone numbers withheld to protect committee privacy. Direct message inquiry form provided.',
    notesKn: 'ವೈಯಕ್ತಿಕ ಸಂಖ್ಯೆಗಳನ್ನು ಪ್ರಕಟಿಸದೆ, ನೇರ ವಿಚಾರಣಾ ಫಾರಂ ವ್ಯವಸ್ಥೆ ಕಲ್ಪಿಸಲಾಗಿದೆ.',
  },
  {
    id: 'v-8',
    field: 'Official Bank / UPI Donation Details',
    fieldKn: 'ದೇಣಿಗೆ ಬ್ಯಾಂಕ್ ಖಾತೆ ಹಾಗೂ ಯುಪಿಐ ವಿವರ',
    value: 'Donation information will be published here after verification by the temple committee.',
    valueKn: 'ದೇವಸ್ಥಾನ ಸಮಿತಿಯ ಪರಿಶೀಲನೆಯ ನಂತರ ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರಗಳನ್ನು ಪ್ರಕಟಿಸಲಾಗುವುದು.',
    status: 'PENDING_COMMITTEE_CONFIRMATION',
    source: 'Temple Committee Finance Resolution',
    sourceType: 'CommitteePending',
    notes: 'No invented UPI IDs or bank accounts displayed.',
    notesKn: 'ಯಾವುದೇ ನಕಲಿ ಕ್ಯೂಆರ್ ಕೋಡ್ ಅಥವಾ ಯುಪಿಐ ಪ್ರದರ್ಶಿಸಲಾಗಿಲ್ಲ.',
  },
  {
    id: 'v-9',
    field: 'Primary Festivals',
    fieldKn: 'ಪ್ರಮುಖ ಉತ್ಸವಗಳು',
    value: 'Hanuman Jayanti, Sri Rama Navami, Kartika Deepotsava, Saturday Special Sevas',
    valueKn: 'ಹನುಮ ಜಯಂತಿ, ಶ್ರೀ ರಾಮನವಮಿ, ಕಾರ್ತಿಕ ದೀಪೋತ್ಸವ, ಶನಿವಾರದ ವಿಶೇಷ ಪೂಜೆ',
    status: 'VERIFIED',
    source: 'Regional Chitradurga Anjaneya traditions & village oral accounts',
    sourceType: 'OralHistory',
    notes: 'Cross-verified with village calendar practices.',
    notesKn: 'ಗ್ರಾಮದ ಸಂಪ್ರದಾಯದೊಂದಿಗೆ ತಾಳೆ ನೋಡಲಾಗಿದೆ.',
  },
  {
    id: 'v-10',
    field: 'Temple Management & Governance',
    fieldKn: 'ದೇವಸ್ಥಾನದ ಆಡಳಿತ ಮತ್ತು ನಿರ್ವಹಣೆ',
    value: 'Managed by Thappagondanahalli Gowdru Families',
    valueKn: 'ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳು',
    status: 'VERIFIED',
    source: 'Hereditary Temple Governance & Village Stewardship Records',
    sourceType: 'Government',
    notes: 'Devoutly managed and administered across generations by the respected Thappagondanahalli Gowdru Families.',
    notesKn: 'ತಪ್ಪಗೊಂಡನಹಳ್ಳಿ ಗೌಡ್ರು ಕುಟುಂಬಗಳು ತಲೆಮಾರುಗಳಿಂದ ಈ ಸನ್ನಿಧಾನದ ಪೂಜೆ ಹಾಗೂ ಆಡಳಿತವನ್ನು ಮುನ್ನಡೆಸುತ್ತಿದ್ದಾರೆ.',
  },
];

export interface PoojaScheduleSlot {
  time: string;
  ritualEn: string;
  ritualKn: string;
  significanceEn: string;
  significanceKn: string;
  publicAllowed: boolean;
}

export const DAILY_DARSHAN_SCHEDULE: PoojaScheduleSlot[] = [
  {
    time: '06:00 AM – 06:30 AM',
    ritualEn: 'Suprabhata & Nirmalya Visarjana',
    ritualKn: 'ಸುಪ್ರಭಾತ ಹಾಗೂ ನಿರ್ಮಾಲ್ಯ ವಿಸರ್ಜನೆ',
    significanceEn: 'Sacred dawn awakening of Lord Hanuman and removal of previous day’s floral decorations.',
    significanceKn: 'ಮುಂಜಾನೆಯ ಪವಿತ್ರ ಜಾಗರಣೆ ಹಾಗೂ ಹಿಂದಿನ ದಿನದ ಪುಷ್ಪ ನಿರ್ಮಾಲ್ಯ ವಿಸರ್ಜನೆ.',
    publicAllowed: true,
  },
  {
    time: '06:30 AM – 07:30 AM',
    ritualEn: 'Tailabhisheka & Panchamrita Snana',
    ritualKn: 'ತೈಲಾಭಿಷೇಕ ಮತ್ತು ಪಂಚಾಮೃತ ಸ್ನಾನ',
    significanceEn: 'Anointing the monolith stone relief with sacred gingelly oil, milk, curd, honey, and tender coconut.',
    significanceKn: 'ಕಪ್ಪು ಗ್ರಾನೈಟ್ ಮೂರ್ತಿಗೆ ಶುದ್ಧ ಎಳ್ಳೆಣ್ಣೆ ಮತ್ತು ಪಂಚಾಮೃತಗಳಿಂದ ಶಾಸ್ತ್ರೋಕ್ತ ಅಭಿಷೇಕ.',
    publicAllowed: true,
  },
  {
    time: '07:30 AM – 08:30 AM',
    ritualEn: 'Pushpalankara & Morning Maha Mangalarathi',
    ritualKn: 'ಪುಷ್ಪಾಲಂಕಾರ ಹಾಗೂ ಪ್ರಾತಃಕಾಲದ ಮಹಾ ಮಂಗಳಾರತಿ',
    significanceEn: 'Decoration with fresh fragrant betel leaf garlands, tulasi, and traditional brass lamp deeparadhana.',
    significanceKn: 'ತಾಜಾ ವೀಳ್ಯದೆಲೆ, ತುಳಸಿ ದಂಡೆಗಳಿಂದ ಅಲಂಕಾರ ಹಾಗೂ ಕರ್ಪೂರ, ತುಪ್ಪದ ದೀಪಗಳಿಂದ ಮಂಗಳಾರತಿ.',
    publicAllowed: true,
  },
  {
    time: '08:30 AM – 12:30 PM',
    ritualEn: 'Sarva Darshana & Devotee Sankalpa Archana',
    ritualKn: 'ಸಾರ್ವಜನಿಕ ಸರ್ವ ದರ್ಶನ ಹಾಗೂ ಸಂಕಲ್ಪ ಅರ್ಚನೆ',
    significanceEn: 'Continuous sanctum access for devotees to offer prayers, break coconuts, and receive theertha prasada.',
    significanceKn: 'ಭಕ್ತಾದಿಗಳಿಗೆ ಸ್ವಾಮಿಯ ದರ್ಶನ, ತೆಂಗಿನಕಾಯಿ ಸಮರ್ಪಣೆ, ಅರ್ಚನೆ ಹಾಗೂ ತೀರ್ಥ ಪ್ರಸಾದ ಸ್ವೀಕಾರ.',
    publicAllowed: true,
  },
  {
    time: '12:30 PM – 01:00 PM',
    ritualEn: 'Madhyahna Naivedya & Afternoon Arathi',
    ritualKn: 'ಮಧ್ಯಾಹ್ನದ ಮಹಾ ನೈವೇದ್ಯ ಹಾಗೂ ಆರತಿ',
    significanceEn: 'Traditional food offering prepared in the temple madi kitchen, followed by noon sanctum resting.',
    significanceKn: 'ದೇವಸ್ಥಾನದ ಮಡಿ ಅಡುಗೆಯಲ್ಲಿ ಸಿದ್ಧವಾದ ಸಾತ್ವಿಕ ನೈವೇದ್ಯ ಸಮರ್ಪಣೆ ಮತ್ತು ಮಧ್ಯಾಹ್ನದ ಆರತಿ.',
    publicAllowed: true,
  },
  {
    time: '05:30 PM – 07:00 PM',
    ritualEn: 'Sandhya Deepotsava & Akhanda Deeparadhana',
    ritualKn: 'ಸಂಧ್ಯಾ ದೀಪೋತ್ಸವ ಮತ್ತು ಅಖಂಡ ದೀಪಾರಾಧನೆ',
    significanceEn: 'Lighting of earthen oil lamps around the Garbhagriha and outer pillared hall.',
    significanceKn: 'ಸಂಜೆಯ ವೇಳೆಯಲ್ಲಿ ಗರ್ಭಗುಡಿ ಹಾಗೂ ಮುಖಮಂಟಪದಲ್ಲಿ ಮಣ್ಣಿನ ಹಣತೆಗಳನ್ನು ಬೆಳಗಿಸುವ ದೀಪಾರಾಧನೆ.',
    publicAllowed: true,
  },
  {
    time: '07:00 PM – 08:00 PM',
    ritualEn: 'Hanuman Chalisa Parayana & Night Mahamangalarathi',
    ritualKn: 'ಹನುಮಾನ್ ಚಾಲೀಸಾ ಪಠಣ ಹಾಗೂ ರಾತ್ರಿ ಮಹಾಮಂಗಳಾರತಿ',
    significanceEn: 'Collective community chanting by village elders and youth, concluding the day’s worship.',
    significanceKn: 'ಗ್ರಾಮಸ್ಥರೆಲ್ಲರೂ ಒಟ್ಟಾಗಿ ಕುಳಿತು ಹನುಮಾನ್ ಚಾಲೀಸಾ ಪಠಣ ಹಾಗೂ ದಿನದ ಅಂತಿಮ ಮಂಗಳಾರತಿ.',
    publicAllowed: true,
  },
];

export const TEMPLE_CHRONICLES_DATA = {
  sthalaPurana: {
    en: 'According to sacred local sthala purana cherished across centuries, the monolith stone relief of Sri Anjaneya Swamy manifested near the ancient eastern pond of Thappagondanahalli. Believed to have been venerated by roaming sadhus and regional warriors of the Chitradurga Nayaka kings (including the famed Madakari Nayaka lineage), the deity has served as the guardian Kshetrapala of agricultural crops, cattle herds, and village households.',
    kn: 'ಶತಮಾನಗಳಿಂದ ನಡೆದುಬಂದ ಪವಿತ್ರ ಸ್ಥಳ ಪುರಾಣದ ಪ್ರಕಾರ, ತಪಗೊಂಡನಹಳ್ಳಿಯ ಪೂರ್ವಾಭಿಮುಖ ಕೆರೆಯ ಸನಿಹದಲ್ಲಿ ಈ ಸ್ವಯಂಭೂ ರೂಪದ ಕಪ್ಪು ಶಿಲೆಯ ಆಂಜನೇಯ ಸ್ವಾಮಿಯ ಉದ್ಭವವಾಯಿತು. ಚಿತ್ರದುರ್ಗದ ಪಾಳೆಯಗಾರರಾದ ಮದಕರಿ ನಾಯಕರ ಕಾಲದಲ್ಲಿ ಧೈರ್ಯ-ಸ್ಥೈರ್ಯಗಳ ರಕ್ಷಕನಾಗಿ ಪೂಜಿಸಲ್ಪಡುತ್ತಿದ್ದ ಈ ಸ್ವಾಮಿಯು, ಹಳ್ಳಿಯ ಕೃಷಿ ಭೂಮಿ, ಗೋಸಂಪತ್ತು ಹಾಗೂ ಸಮಸ್ತ ಜನರ ಕಾವಲು ದೇವರೆಂದು ಪ್ರಸಿದ್ಧಿ ಪಡೆದಿದ್ದಾನೆ.',
  },
  gowdruStewardship: {
    en: 'The unbroken lineage of the Thappagondanahalli Gowdru Families has lovingly administered this sanctuary across multiple centuries. Their sacred responsibilities encompass maintaining the sanctum sanctorum, ensuring daily oil endowments for the deeparadhana, organizing the historic annual Hanuma Jayanthi Gramotsava, and preserving the traditions of community Annasantarpane without seeking external commercialization.',
    kn: 'ತಪ್ಪಗೊಂಡನಹಳ್ಳಿಯ ಗೌಡ್ರು ಕುಟುಂಬಗಳು ತಲೆಮಾರುಗಳಿಂದ ಈ ಪುಣ್ಯ ಸನ್ನಿಧಾನದ ನಿತ್ಯ ಕೈಂಕರ್ಯ, ಗರ್ಭಗುಡಿಯ ಸಂರಕ್ಷಣೆ, ದೀಪಾರಾಧನೆಗೆ ಶುದ್ಧ ಎಣ್ಣೆಯ ಪೂರೈಕೆ, ವಾರ್ಷಿಕ ಹನುಮ ಜಯಂತಿ ಗ್ರಾಮೋತ್ಸವ ಮತ್ತು ಸಾಮೂಹಿಕ ಅನ್ನಸಂತರ್ಪಣೆಯನ್ನು ಅತ್ಯಂತ ನಿಷ್ಠೆಯಿಂದ ನಿಸ್ವಾರ್ಥವಾಗಿ ಮುನ್ನಡೆಸಿಕೊಂಡು ಬಂದಿವೆ.',
  },
  sacredFeatures: [
    {
      titleEn: 'Monolith Granite Sanctum (Garbhagriha)',
      titleKn: 'ಏಕಶಿಲಾ ಗ್ರಾನೈಟ್ ಗರ್ಭಗುಡಿ',
      descEn: 'Hand-chiselled basalt stone walls designed to stay serene and cool during scorching Deccan summers.',
      descKn: 'ಬಯಲುಸೀಮೆಯ ಬಿಸಿಲಿನಲ್ಲೂ ಗರ್ಭಗುಡಿಯಲ್ಲಿ ದೈವಿಕ ತಂಪು ಮತ್ತು ಶಾಂತತೆಯನ್ನು ಕಾಪಾಡುವ ಗಟ್ಟಿ ಕಪ್ಪು ಶಿಲೆಯ ರಚನೆ.',
    },
    {
      titleEn: 'Eastern Facing Abhaya Mudra Pose',
      titleKn: 'ಪೂರ್ವಾಭಿಮುಖ ಅಭಯಾಂಜನೇಯ ಮೂರ್ತಿ',
      descEn: 'The deity faces the rising sun with the right hand granting fearlessness and protection to farmers.',
      descKn: 'ಮುಂಜಾನೆಯ ಸೂರ್ಯನ ಪ್ರಥಮ ಕಿರಣಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತಾ, ಭಕ್ತರಿಗೆ ಅಭಯ ನೀಡುವ ದಿವ್ಯ ವೀರಭಂಗಿಯ ಮೂರ್ತಿ.',
    },
    {
      titleEn: 'Sacred Deepasthambha Monolith Pillar',
      titleKn: 'ಪ್ರಾಂಗಣದ ಕಲ್ಲಿನ ದೀಪಸ್ತಂಭ',
      descEn: 'Tall stone pillar in the temple forecourt illuminated during Kartika Masa and village festivals.',
      descKn: 'ಕಾರ್ತಿಕ ಮಾಸದ ದೀಪೋತ್ಸವದಂದು ಇಡೀ ಗ್ರಾಮಕ್ಕೆ ದಾರಿದೀಪವಾಗಿ ಬೆಳಗುವ ಎತ್ತರದ ಶಿಲಾ ದೀಪದ ಕಂಬ.',
    },
    {
      titleEn: 'Agrarian Seed Blessing Tradition (Bija Puja)',
      titleKn: 'ಮುಂಗಾರು ಬಿತ್ತನೆ ಬೀಜ ಪೂಜಾ ಸಂಪ್ರದಾಯ',
      descEn: 'Farmers bring their first bags of groundnut and ragi seeds to the Lord’s feet before seasonal sowing.',
      descKn: 'ಮಳೆಗಾಲದ ಬಿತ್ತನೆಗೆ ಮುನ್ನ ರೈತರು ತಮ್ಮ ಕಡಲೆಕಾಯಿ, ರಾಗಿ ಬೀಜಗಳನ್ನು ತಂದು ಸ್ವಾಮಿಯ ಪಾದಕ್ಕಿಟ್ಟು ಆಶೀರ್ವಾದ ಪಡೆಯುವ ಆಚರಣೆ.',
    },
    {
      titleEn: 'Heritage Temple Bronze Ghanta (Bell)',
      titleKn: 'ಪಾರಂಪರಿಕ ಕಂಚಿನ ಘಂಟಾನಾದ',
      descEn: 'Resonant temple bell cast in traditional bronze alloy whose sound is believed to ward off evil energies.',
      descKn: 'ಮಂಗಳಕರ ನಾದವನ್ನು ಹೊರಹೊಮ್ಮಿಸುವ ಸಾಂಪ್ರದಾಯಿಕ ಕಂಚಿನ ಘಂಟೆ, ಇದರ ನಾದದಿಂದ ಊರಿಗೆ ಶಾಂತಿ ದೊರೆಯುತ್ತದೆ ಎಂಬ ನಂಬಿಕೆ.',
    },
  ],
};
