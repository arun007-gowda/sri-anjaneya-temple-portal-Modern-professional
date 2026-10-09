import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TEMPLE_INFO } from '../data/templeData';
import { dbSubmitInquiry } from '../lib/supabase';
import { MapPin, Navigation, Phone, MessageSquare, Mail, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Pilgrimage Inquiry',
    message: '',
    honeypot: '', // anti-spam field
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard for bot spam

    setLoading(true);
    await dbSubmitInquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });
    setLoading(false);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'Pilgrimage Inquiry',
        message: '',
        honeypot: '',
      });
    }, 4000);
  };

  // Pre-filled WhatsApp message URL
  const whatsappText = encodeURIComponent(
    `Namaskara! I am inquiring regarding darshan/seva at Anjaneya Swamy Temple, Thappagondanahalli, Karnataka.`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`;

  // Pre-filled Email URL
  const mailtoUrl = `mailto:contact@thappagondanahallitemple.org?subject=${encodeURIComponent(
    'Inquiry: Anjaneya Swamy Temple, Thappagondanahalli'
  )}&body=${encodeURIComponent(
    'Namaskara,\n\nI would like to inquire regarding temple visit timings, pooja seva, or festival dates.\n\nThank you.'
  )}`;

  return (
    <section id="contact-section" className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#701A28] tracking-widest uppercase mb-3">
            <MapPin className="w-4 h-4" />
            <span>{isEn ? 'Devotee Assistance & Information' : 'ಸಂಪರ್ಕ ಹಾಗೂ ಭೇಟಿ ವಿವರ'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 leading-tight mb-4">
            {isEn ? 'Contact Anjaneya Swamy Temple' : 'ಶ್ರೀ ಅಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ ಸಂಪರ್ಕ'}
          </h2>

          <p className="text-base sm:text-lg font-editorial italic text-stone-700 leading-relaxed">
            {isEn
              ? 'Reach out for visit planning, festive darshan inquiries, or community documentation.'
              : 'ದರ್ಶನ ಸಮಯ, ಪೂಜಾ ವಿಚಾರಣೆ ಅಥವಾ ಧಾರ್ಮಿಕ ಸಂದೇಹಗಳಿಗಾಗಿ ಸಂಪರ್ಕಿಸಿ.'}
          </p>
        </div>

        {/* 2-Column Layout: Contact Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Verified Address & Fast Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="text-xl font-cinzel font-bold text-stone-900 mb-4 pb-3 border-b border-stone-200">
                {isEn ? 'Temple Address' : 'ದೇವಸ್ಥಾನದ ವಿಳಾಸ'}
              </h3>

              <div className="space-y-2 text-sm text-stone-700 font-sans leading-relaxed">
                <p className="font-semibold text-stone-900">
                  {TEMPLE_INFO.officialName[language]}
                </p>
                <p>
                  {isEn ? 'Village: Thappagondanahalli' : 'ಗ್ರಾಮ: ತಪಗೊಂಡನಹಳ್ಳಿ'}
                </p>
                <p>
                  {isEn ? 'Taluk: Challakere' : 'ತಾಲೂಕು: ಚಳ್ಳಕೆರೆ'}
                </p>
                <p>
                  {isEn ? 'District: Chitradurga' : 'ಜಿಲ್ಲೆ: ಚಿತ್ರದುರ್ಗ'}
                </p>
                <p>
                  {isEn ? 'Karnataka, India' : 'ಕರ್ನಾಟಕ, ಭಾರತ'}
                </p>
                <p className="font-mono text-stone-600">
                  PIN: {TEMPLE_INFO.pinCode}
                </p>
                <div className="pt-3 border-t border-stone-100 flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-1.5 text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <Phone className="w-3.5 h-3.5 text-[#701A28] shrink-0" />
                    <span>
                      {isEn
                        ? 'Official telephone numbers are currently being confirmed by the temple committee.'
                        : 'ದೇವಸ್ಥಾನ ಸಮಿತಿಯು ಅಧಿಕೃತ ದೂರವಾಣಿ ಸಂಖ್ಯೆಯನ್ನು ದೃಢಪಡಿಸುತ್ತಿದೆ.'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-500">
                <span>{isEn ? 'Panchayat: Renukapura Gram Panchayat' : 'ಗ್ರಾಮ ಪಂಚಾಯತಿ: ರೇಣುಕಾಪುರ'}</span>
              </div>
            </div>

            {/* Functional 4 Action Buttons Cluster */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={TEMPLE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-[#701A28] hover:bg-[#58131E] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Navigation className="w-4 h-4 text-amber-300" />
                <span>{isEn ? 'Get Directions' : 'ಮಾರ್ಗದರ್ಶನ'}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isEn ? 'WhatsApp' : 'ವಾಟ್ಸಾಪ್'}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  alert(
                    isEn
                      ? 'Official phone number is currently being confirmed by the temple committee. Please use WhatsApp or send an inquiry using the form.'
                      : 'ದೇವಸ್ಥಾನ ಸಮಿತಿಯು ಅಧಿಕೃತ ದೂರವಾಣಿ ಸಂಖ್ಯೆಯನ್ನು ದೃಢಪಡಿಸುತ್ತಿದೆ. ದಯವಿಟ್ಟು ವಿಚಾರಣಾ ಫಾರಂ ಮೂಲಕ ಸಂದೇಶ ಕಳುಹಿಸಿ.'
                  );
                }}
                className="px-4 py-3 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-stone-600" />
                <span>{isEn ? 'Call Temple' : 'ಕರೆ ಮಾಡಿ'}</span>
              </button>

              <a
                href={mailtoUrl}
                className="px-4 py-3 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4 text-stone-600" />
                <span>{isEn ? 'Email' : 'ಇಮೇಲ್'}</span>
              </a>
            </div>

          </div>

          {/* Right: Functional Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
            <h3 className="text-xl font-cinzel font-bold text-stone-900 mb-2">
              {isEn ? 'Send an Inquiry to the Committee' : 'ಸಮಿತಿಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ'}
            </h3>
            <p className="text-xs text-stone-600 mb-6 font-sans">
              {isEn
                ? 'Fill this form to inquire about pooja timings, utsav dates, or village visit guidance.'
                : 'ಪೂಜಾ ಸಮಯ, ಜಾತ್ರಾ ವಿವರಗಳು ಅಥವಾ ಭೇಟಿ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಸಂದೇಶ ಕಳುಹಿಸಿ.'}
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-base font-cinzel font-bold text-emerald-900 mb-1">
                  {isEn ? 'Inquiry Recorded Successfully' : 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ದಾಖಲಿಸಿಕೊಳ್ಳಲಾಗಿದೆ'}
                </h4>
                <p className="text-xs text-emerald-700">
                  {isEn
                    ? 'The temple committee representative will attend to your request upon review.'
                    : 'ದೇವಸ್ಥಾನ ಸಮಿತಿಯ ಪ್ರತಿನಿಧಿಗಳು ನಿಮ್ಮ ವಿಚಾರಣೆಯನ್ನು ಶೀಘ್ರವೇ ಪರಿಶೀಲಿಸುತ್ತಾರೆ.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for anti-spam */}
                <input
                  type="text"
                  name="website_extra"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      {isEn ? 'Your Full Name' : 'ನಿಮ್ಮ ಹೆಸರು'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isEn ? 'Enter your name' : 'ಹೆಸರನ್ನು ನಮೂದಿಸಿ'}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#701A28] focus:ring-1 focus:ring-[#701A28]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      {isEn ? 'Phone / WhatsApp Number' : 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ'} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#701A28] focus:ring-1 focus:ring-[#701A28]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      {isEn ? 'Email Address' : 'ಇಮೇಲ್ ವಿಳಾಸ'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="devotee@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#701A28] focus:ring-1 focus:ring-[#701A28]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      {isEn ? 'Purpose of Inquiry' : 'ವಿಷಯ'}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#701A28] focus:ring-1 focus:ring-[#701A28]"
                    >
                      <option value="Pilgrimage Inquiry">
                        {isEn ? 'Temple Visit & Timings' : 'ದರ್ಶನ ಮತ್ತು ಭೇಟಿ ಸಮಯ'}
                      </option>
                      <option value="Pooja & Seva">
                        {isEn ? 'Pooja & Special Seva' : 'ಪೂಜೆ ಮತ್ತು ವಿಶೇಷ ಸೇವೆ'}
                      </option>
                      <option value="Festival Dates">
                        {isEn ? 'Hanuman Jayanti / Festivals' : 'ಹನುಮ ಜಯಂತಿ / ಉತ್ಸವಗಳು'}
                      </option>
                      <option value="Community Contribution">
                        {isEn ? 'Volunteering & Heritage Info' : 'ಸ್ವಯಂಸೇವೆ ಹಾಗೂ ಮಾಹಿತಿ'}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    {isEn ? 'Your Message or Question' : 'ನಿಮ್ಮ ಸಂದೇಶ'} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isEn
                        ? 'Please specify date of planned visit or your query...'
                        : 'ನಿಮ್ಮ ಭೇಟಿಯ ದಿನಾಂಕ ಅಥವಾ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#701A28] focus:ring-1 focus:ring-[#701A28]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#701A28] hover:bg-[#58131E] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{isEn ? 'Submit Inquiry' : 'ಸಂದೇಶ ಕಳುಹಿಸಿ'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
