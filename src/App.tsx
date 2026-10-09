import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TempleIntro } from './components/TempleIntro';
import { VillageHistorySection } from './components/VillageHistorySection';
import { TempleHistoryTimeline } from './components/TempleHistoryTimeline';
import { HanumanDeitySection } from './components/HanumanDeitySection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { FestivalsCalendar } from './components/FestivalsCalendar';
import { PoojaSevaSection } from './components/PoojaSevaSection';
import { PhotoGallery } from './components/PhotoGallery';
import { CommunityStoriesSection } from './components/CommunityStoriesSection';
import { TrustManagementSection } from './components/TrustManagementSection';
import { DonationSection } from './components/DonationSection';
import { HowToReachMap } from './components/HowToReachMap';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { VerificationAuditModal } from './components/VerificationAuditModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { PhotoSubmissionModal } from './components/PhotoSubmissionModal';
import { StorySubmissionModal } from './components/StorySubmissionModal';
import { SevaEnquiryModal } from './components/SevaEnquiryModal';
import { TempleDataSubmissionModal } from './components/TempleDataSubmissionModal';
import { TempleChroniclesSection } from './components/TempleChroniclesSection';
import { SharedLinkAdapter } from './components/SharedLinkAdapter';

const MainContent: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  useEffect(() => {
    // Sync document title with active language
    document.title = isEn
      ? 'Anjaneya Swamy Temple, Thappagondanahalli | History, Festivals & Visit Information'
      : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ, ತಪಗೊಂಡನಹಳ್ಳಿ | ಇತಿಹಾಸ, ಉತ್ಸವಗಳು ಹಾಗೂ ದರ್ಶನ ಮಾಹಿತಿ';
  }, [language, isEn]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] pb-16 md:pb-0">
      {/* 3-Zone Navigation Header */}
      <Navbar />

      <main className="flex-1">
        {/* Sequence strictly adhering to Prompt Section 31: */}
        {/* 1. HERO */}
        <Hero />

        {/* 2. Anjaneya Swamy Temple Introduction */}
        <TempleIntro />

        {/* 3. Thappagondanahalli Village Story & Heritage */}
        <VillageHistorySection />

        {/* 4. Historical Timeline (Documented vs Oral Tradition) */}
        <TempleHistoryTimeline />

        {/* 4.5 Archival Temple Chronicles & Daily Pooja Timings */}
        <TempleChroniclesSection />

        {/* 5. Sri Anjaneya Swamy Devotional Significance */}
        <HanumanDeitySection />

        {/* 6. Architecture & Stonework Study */}
        <ArchitectureSection />

        {/* 7. Upcoming Festivals & Calendar (.ics downloadable) */}
        <FestivalsCalendar />

        {/* 8. Pooja & Seva Offerings */}
        <PoojaSevaSection />

        {/* 9. Photo Gallery & Masonry View (Dynamic Public Photo Submissions) */}
        <PhotoGallery />

        {/* 10. Community Stories & Living Memories */}
        <CommunityStoriesSection />

        {/* 11. Temple Trust & Administration */}
        <TrustManagementSection />

        {/* 12. Support & Donations (Zero fake payment policy) */}
        <DonationSection />

        {/* 13. How to Reach & Geocoded Map */}
        <HowToReachMap />

        {/* 14. Contact & Inquiries */}
        <ContactSection />
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Mobile Sticky Quick Action Bar (<= 15% mobile viewport) */}
      <MobileBottomBar />

      {/* Global Interactive Modals & Dynamic URL Adapter */}
      <SharedLinkAdapter />
      <VerificationAuditModal />
      <AdminPortalModal />
      <PhotoSubmissionModal />
      <StorySubmissionModal />
      <SevaEnquiryModal />
      <TempleDataSubmissionModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
