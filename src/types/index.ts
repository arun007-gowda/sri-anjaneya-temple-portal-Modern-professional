export type Language = 'en' | 'kn';

export type VerificationStatus =
  | 'VERIFIED'
  | 'PROBABLE'
  | 'TRADITIONAL_ORAL'
  | 'PENDING_COMMITTEE_CONFIRMATION';

export interface VerificationItem {
  id: string;
  field: string;
  fieldKn: string;
  value: string;
  valueKn: string;
  status: VerificationStatus;
  source: string;
  sourceType: 'Government' | 'Census' | 'GoogleMaps' | 'OralHistory' | 'CommitteePending';
  notes?: string;
  notesKn?: string;
}

export interface TempleInfo {
  officialName: { en: string; kn: string };
  alternateNames: { en: string[]; kn: string[] };
  deity: { en: string; kn: string };
  village: { en: string; kn: string };
  taluk: { en: string; kn: string };
  district: { en: string; kn: string };
  state: { en: string; kn: string };
  country: { en: string; kn: string };
  pinCode: string;
  phone?: string;
  alternatePhone?: string;
  whatsapp?: string;
  gramPanchayat: { en: string; kn: string };
  assemblyConstituency: { en: string; kn: string };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  googleMapsUrl: string;
  directionsUrl: string;
  managedBy?: { en: string; kn: string };
}

export interface TimelineEvent {
  id: string;
  period: { en: string; kn: string };
  title: { en: string; kn: string };
  description: { en: string; kn: string };
  type: 'DOCUMENTED' | 'TRADITIONAL_ORAL';
  source?: string;
}

export interface ArchitecturalFeature {
  id: string;
  title: { en: string; kn: string };
  kannadaTerm: string;
  description: { en: string; kn: string };
  status: VerificationStatus;
}

export interface FestivalEvent {
  id: string;
  name: { en: string; kn: string };
  lunarMonth: { en: string; kn: string };
  estimatedDate: string;
  description: { en: string; kn: string };
  traditions: { en: string[]; kn: string[] };
  status: VerificationStatus;
  location: string;
}

export interface SevaItem {
  id: string;
  name: { en: string; kn: string };
  description: { en: string; kn: string };
  timing: { en: string; kn: string };
  status: VerificationStatus;
  offeringNote: { en: string; kn: string };
}

export interface GalleryPhoto {
  id: string;
  title: { en: string; kn: string };
  category: 'temple' | 'village' | 'architecture' | 'festivals' | 'tradition';
  caption: { en: string; kn: string };
  credit: string;
  date?: string;
  imageUrl?: string;
  isPlaceholder?: boolean;
  status: VerificationStatus;
}

export interface CommunityStory {
  id: string;
  author: string;
  village: string;
  date: string;
  title: { en: string; kn: string };
  story: { en: string; kn: string };
  approved: boolean;
}

export interface AnnouncementItem {
  id: string;
  date: string;
  title: { en: string; kn: string };
  content: { en: string; kn: string };
  category: { en: string; kn: string };
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface AppointmentBooking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  sevaName: string;
  date: string;
  timeSlot?: string;
  devoteesCount?: number;
  gothra?: string;
  nakshatra?: string;
  status: BookingStatus;
  notes?: string;
  cancellationReason?: string;
  createdAt: string;
  sourceTable: 'bookings' | 'appointments' | 'inquiries';
  rawRecord?: any;
}

export interface AudioTrack {
  id: string;
  chapterNumber: number;
  title: { en: string; kn: string };
  subtitle: { en: string; kn: string };
  category: { en: string; kn: string };
  durationSeconds: number;
  sentencesEn: string[];
  sentencesKn: string[];
  narratorNotes: { en: string; kn: string };
  locationPin: { en: string; kn: string };
}

export interface TempleUpdateItem {
  id: string;
  title: { en: string; kn: string };
  category: 'festival' | 'darshan' | 'announcement' | 'history' | 'seva' | 'renovation';
  content: { en: string; kn: string };
  date: string;
  contributor: string;
  source?: string;
  isPublicShared?: boolean;
  status?: 'APPROVED' | 'VERIFIED' | 'COMMUNITY';
}
