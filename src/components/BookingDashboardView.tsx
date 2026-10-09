import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppointmentBooking, BookingStatus } from '../types';
import {
  dbUpdateBooking,
  dbCancelBooking,
  dbConfirmBooking,
  dbDeleteBooking,
  dbCreateBooking,
} from '../lib/supabase';
import { POOJA_SEVAS } from '../data/templeData';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  Clock4,
  AlertTriangle,
  Edit2,
  Trash2,
  Plus,
  Search,
  RefreshCw,
  MessageSquare,
  X,
  Check,
  Filter,
  FileText,
} from 'lucide-react';

interface BookingDashboardViewProps {
  bookings: AppointmentBooking[];
  onRefresh: () => Promise<void>;
  loading: boolean;
}

export const BookingDashboardView: React.FC<BookingDashboardViewProps> = ({
  bookings,
  onRefresh,
  loading,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | BookingStatus>('ALL');
  const [dateFilter, setDateFilter] = useState<'ALL' | 'TODAY' | 'UPCOMING'>('ALL');

  // Edit State
  const [editingBooking, setEditingBooking] = useState<AppointmentBooking | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<AppointmentBooking>>({});
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  // Cancel Dialog State
  const [cancellingBooking, setCancellingBooking] = useState<AppointmentBooking | null>(null);
  const [cancellationReason, setCancellationReason] = useState('Devotee requested cancellation');
  const [customReason, setCustomReason] = useState('');

  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    name: '',
    phone: '',
    email: '',
    sevaName: POOJA_SEVAS[0]?.name.en || 'Special Pooja',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '09:00 AM - 10:30 AM',
    devoteesCount: 1,
    gothra: '',
    nakshatra: '',
    status: 'CONFIRMED' as BookingStatus,
    notes: '',
  });
  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);

  // Statistics
  const totalCount = bookings.length;
  const confirmedCount = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const pendingCount = bookings.filter((b) => b.status === 'PENDING').length;
  const cancelledCount = bookings.filter((b) => b.status === 'CANCELLED').length;

  // Filter Bookings
  const todayStr = new Date().toISOString().split('T')[0];
  const filteredBookings = bookings.filter((b) => {
    // Status filter
    if (statusFilter !== 'ALL' && b.status !== statusFilter) return false;

    // Date filter
    if (dateFilter === 'TODAY' && b.date !== todayStr) return false;
    if (dateFilter === 'UPCOMING' && b.date < todayStr) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = b.name.toLowerCase().includes(q);
      const matchPhone = b.phone.toLowerCase().includes(q);
      const matchEmail = (b.email || '').toLowerCase().includes(q);
      const matchSeva = b.sevaName.toLowerCase().includes(q);
      const matchDate = b.date.includes(q);
      const matchNotes = (b.notes || '').toLowerCase().includes(q);
      return matchName || matchPhone || matchEmail || matchSeva || matchDate || matchNotes;
    }

    return true;
  });

  // Action Handlers
  const handleQuickConfirm = async (booking: AppointmentBooking) => {
    await dbConfirmBooking(booking.id, booking.sourceTable);
    await onRefresh();
  };

  const handleOpenCancelDialog = (booking: AppointmentBooking) => {
    setCancellingBooking(booking);
    setCancellationReason('Devotee requested cancellation');
    setCustomReason('');
  };

  const handleConfirmCancel = async () => {
    if (!cancellingBooking) return;
    const finalReason = cancellationReason === 'Custom' ? customReason : cancellationReason;
    await dbCancelBooking(cancellingBooking.id, finalReason, cancellingBooking.sourceTable);
    setCancellingBooking(null);
    await onRefresh();
  };

  const handleDelete = async (booking: AppointmentBooking) => {
    if (window.confirm(isEn ? 'Permanently delete this booking record from database?' : 'ಈ ಬುಕಿಂಗ್ ದಾಖಲೆಯನ್ನು ಡೇಟಾಬೇಸ್‌ನಿಂದ ಅಳಿಸಬೇಕೇ?')) {
      await dbDeleteBooking(booking.id, booking.sourceTable);
      await onRefresh();
    }
  };

  const handleOpenEdit = (booking: AppointmentBooking) => {
    setEditingBooking(booking);
    setEditFormData({
      name: booking.name,
      phone: booking.phone,
      email: booking.email || '',
      sevaName: booking.sevaName,
      date: booking.date,
      timeSlot: booking.timeSlot || '09:00 AM',
      devoteesCount: booking.devoteesCount || 1,
      gothra: booking.gothra || '',
      nakshatra: booking.nakshatra || '',
      status: booking.status,
      notes: booking.notes || '',
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;
    setIsSubmittingEdit(true);
    await dbUpdateBooking(editingBooking.id, editFormData, editingBooking.sourceTable);
    setIsSubmittingEdit(false);
    setEditingBooking(null);
    await onRefresh();
  };

  const handleSaveCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingCreate(true);
    await dbCreateBooking(newBooking);
    setIsSubmittingCreate(false);
    setIsCreateOpen(false);
    setNewBooking({
      name: '',
      phone: '',
      email: '',
      sevaName: POOJA_SEVAS[0]?.name.en || 'Special Pooja',
      date: new Date().toISOString().split('T')[0],
      timeSlot: '09:00 AM - 10:30 AM',
      devoteesCount: 1,
      gothra: '',
      nakshatra: '',
      status: 'CONFIRMED',
      notes: '',
    });
    await onRefresh();
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            {isEn ? 'Confirmed' : 'ದೃಢೀಕರಿಸಲಾಗಿದೆ'}
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock4 className="w-3 h-3 text-amber-600" />
            {isEn ? 'Pending Review' : 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ'}
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3 h-3 text-rose-600" />
            {isEn ? 'Cancelled' : 'ರದ್ದುಮಾಡಲಾಗಿದೆ'}
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
            <Check className="w-3 h-3 text-blue-600" />
            {isEn ? 'Completed' : 'ಪೂರ್ಣಗೊಂಡಿದೆ'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setStatusFilter('ALL')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'ALL'
              ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
              : 'bg-white border-stone-200 hover:border-stone-300 text-stone-800'
          }`}
        >
          <div className="text-[11px] font-mono uppercase tracking-wider opacity-75">
            {isEn ? 'All Bookings' : 'ಒಟ್ಟು ಬುಕಿಂಗ್'}
          </div>
          <div className="text-2xl font-bold font-mono mt-1">{totalCount}</div>
        </div>

        <div
          onClick={() => setStatusFilter('CONFIRMED')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'CONFIRMED'
              ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
              : 'bg-white border-stone-200 hover:border-emerald-300 text-stone-800'
          }`}
        >
          <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 flex items-center justify-between">
            <span>{isEn ? 'Confirmed' : 'ದೃಢೀಕೃತ'}</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-900 mt-1">{confirmedCount}</div>
        </div>

        <div
          onClick={() => setStatusFilter('PENDING')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'PENDING'
              ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
              : 'bg-white border-stone-200 hover:border-amber-300 text-stone-800'
          }`}
        >
          <div className="text-[11px] font-mono uppercase tracking-wider text-amber-700 flex items-center justify-between">
            <span>{isEn ? 'Pending' : 'ಬಾಕಿ'}</span>
            <Clock4 className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-900 mt-1">{pendingCount}</div>
        </div>

        <div
          onClick={() => setStatusFilter('CANCELLED')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'CANCELLED'
              ? 'bg-rose-700 text-white border-rose-700 shadow-sm'
              : 'bg-white border-stone-200 hover:border-rose-300 text-stone-800'
          }`}
        >
          <div className="text-[11px] font-mono uppercase tracking-wider text-rose-700 flex items-center justify-between">
            <span>{isEn ? 'Cancelled' : 'ರದ್ದು'}</span>
            <XCircle className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-900 mt-1">{cancelledCount}</div>
        </div>
      </div>

      {/* 2. Search & Controls Bar */}
      <div className="p-3 bg-white border border-stone-200 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEn ? 'Search by name, phone, seva, or notes...' : 'ಹೆಸರು, ಫೋನ್, ಸೇವೆ ಅಥವಾ ಟಿಪ್ಪಣಿಯಿಂದ ಹುಡುಕಿ...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#701A28]"
          />
        </div>

        {/* Date Filter & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center p-0.5 bg-stone-100 rounded-lg border border-stone-200 text-xs">
            <button
              onClick={() => setDateFilter('ALL')}
              className={`px-2 py-1 rounded-md transition-colors ${
                dateFilter === 'ALL' ? 'bg-white font-semibold text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              {isEn ? 'All Dates' : 'ಎಲ್ಲಾ'}
            </button>
            <button
              onClick={() => setDateFilter('TODAY')}
              className={`px-2 py-1 rounded-md transition-colors ${
                dateFilter === 'TODAY' ? 'bg-white font-semibold text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              {isEn ? 'Today' : 'ಇಂದು'}
            </button>
            <button
              onClick={() => setDateFilter('UPCOMING')}
              className={`px-2 py-1 rounded-md transition-colors ${
                dateFilter === 'UPCOMING' ? 'bg-white font-semibold text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              {isEn ? 'Upcoming' : 'ಮುಂದಿನ'}
            </button>
          </div>

          <button
            onClick={() => onRefresh()}
            disabled={loading}
            className="p-2 text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-stone-50 rounded-lg transition-colors"
            title="Refresh database records"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-3 py-1.5 bg-[#701A28] hover:bg-[#58131E] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isEn ? 'New Appointment' : 'ಹೊಸ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್'}</span>
          </button>
        </div>
      </div>

      {/* 3. Appointment Records List */}
      <div className="space-y-3">
        {filteredBookings.length === 0 ? (
          <div className="p-8 text-center bg-white border border-dashed border-stone-300 rounded-xl">
            <Calendar className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-800">
              {isEn ? 'No appointment records found' : 'ಯಾವುದೇ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ'}
            </p>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              {isEn
                ? 'Devotee pilgrimage inquiries and seva bookings in your Supabase database will appear here automatically.'
                : 'ನಿಮ್ಮ ಸುಪಾಬೇಸ್ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿರುವ ಭಕ್ತರ ಸೇವಾ ವಿಚಾರಣೆಗಳು ಮತ್ತು ಬುಕಿಂಗ್‌ಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.'}
            </p>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="mt-4 px-4 py-2 bg-[#701A28] text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{isEn ? 'Add First Appointment' : 'ಮೊದಲ ಬುಕಿಂಗ್ ಸೇರಿಸಿ'}</span>
            </button>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border bg-white transition-all shadow-xs ${
                b.status === 'CANCELLED'
                  ? 'border-rose-200 bg-rose-50/20 opacity-80'
                  : b.status === 'CONFIRMED'
                  ? 'border-emerald-200 hover:border-emerald-400'
                  : 'border-stone-200 hover:border-amber-400'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                {/* Left: Devotee & Seva Info */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#701A28]" />
                      <span>{b.name}</span>
                    </h3>
                    {getStatusBadge(b.status)}
                    <span className="text-[11px] font-mono text-stone-400">
                      ID: {b.id.slice(0, 8)}...
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-amber-900 bg-amber-50 inline-block px-2 py-0.5 rounded border border-amber-200/60">
                    🕉️ {b.sevaName}
                  </div>

                  {/* Devotee Contact Links */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-1">
                    {b.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-stone-400" />
                        <a
                          href={`tel:${b.phone}`}
                          className="font-mono text-[#701A28] hover:underline font-semibold"
                        >
                          {b.phone}
                        </a>
                        <a
                          href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Namaskara ${b.name}, regards from Anjaneya Swamy Temple, Thappagondanahalli regarding your appointment on ${b.date}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700 font-semibold text-[11px] flex items-center gap-0.5 ml-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    )}
                    {b.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-stone-400" />
                        <a href={`mailto:${b.email}`} className="text-stone-700 hover:underline">
                          {b.email}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Appointment Timing & Count */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-700 pt-1 font-sans">
                    <span className="flex items-center gap-1 font-mono font-medium text-stone-900">
                      <Calendar className="w-3.5 h-3.5 text-[#701A28]" />
                      <strong>{b.date}</strong>
                    </span>
                    <span className="flex items-center gap-1 text-stone-600 font-mono">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {b.timeSlot || '09:00 AM'}
                    </span>
                    {b.devoteesCount && b.devoteesCount > 1 && (
                      <span className="text-stone-500">
                        {b.devoteesCount} {isEn ? 'Devotees' : 'ಭಕ್ತರು'}
                      </span>
                    )}
                    {b.gothra && (
                      <span className="text-stone-500">
                        {isEn ? 'Gothra:' : 'ಗೋತ್ರ:'} <em>{b.gothra}</em>
                      </span>
                    )}
                  </div>

                  {/* Devotee Message / Notes */}
                  {b.notes && (
                    <div className="mt-2 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200/80 leading-relaxed font-sans">
                      <span className="font-semibold text-stone-900">{isEn ? 'Devotee Notes:' : 'ಭಕ್ತರ ವಿವರಣೆ:'} </span>
                      {b.notes}
                    </div>
                  )}

                  {/* Cancellation Reason if Cancelled */}
                  {b.status === 'CANCELLED' && (
                    <div className="mt-2 text-xs text-rose-800 bg-rose-50 p-2.5 rounded-lg border border-rose-200 flex items-start gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>{isEn ? 'Cancellation Reason:' : 'ರದ್ದತಿ ಕಾರಣ:'}</strong>{' '}
                        {b.cancellationReason || 'Cancelled by administration / devotee request.'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Action Buttons */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {b.status === 'PENDING' && (
                    <button
                      onClick={() => handleQuickConfirm(b)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
                      title="Confirm this appointment"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Confirm' : 'ದೃಢೀಕರಿಸಿ'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-stone-600" />
                    <span>{isEn ? 'Edit' : 'ತಿದ್ದು'}</span>
                  </button>

                  {b.status !== 'CANCELLED' && (
                    <button
                      onClick={() => handleOpenCancelDialog(b)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>{isEn ? 'Cancel' : 'ರದ್ದುಮಾಡಿ'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(b)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                    title="Delete record permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 4. Edit Appointment Modal */}
      {editingBooking && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
          onClick={() => setEditingBooking(null)}
        >
          <div
            className="bg-white border border-stone-300 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-[#701A28]" />
                <span>{isEn ? 'Edit Appointment Details' : 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ತಿದ್ದುಪಡಿ'}</span>
              </h3>
              <button
                onClick={() => setEditingBooking(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  {isEn ? 'Devotee Name' : 'ಭಕ್ತರ ಹೆಸರು'}
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.name || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Phone Number' : 'ದೂರವಾಣಿ'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.phone || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Email' : 'ಇಮೇಲ್'}
                  </label>
                  <input
                    type="email"
                    value={editFormData.email || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  {isEn ? 'Seva / Pooja / Purpose' : 'ಸೇವೆ / ಪೂಜೆ'}
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.sevaName || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, sevaName: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Appointment Date' : 'ದಿನಾಂಕ'}
                  </label>
                  <input
                    type="date"
                    required
                    value={editFormData.date || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Time Slot' : 'ಸಮಯ'}
                  </label>
                  <input
                    type="text"
                    value={editFormData.timeSlot || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, timeSlot: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Status' : 'ಸ್ಥಿತಿ'}
                  </label>
                  <select
                    value={editFormData.status || 'CONFIRMED'}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, status: e.target.value as BookingStatus })
                    }
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-semibold"
                  >
                    <option value="CONFIRMED">CONFIRMED (ದೃಢೀಕರಿಸಲಾಗಿದೆ)</option>
                    <option value="PENDING">PENDING (ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ)</option>
                    <option value="COMPLETED">COMPLETED (ಪೂರ್ಣಗೊಂಡಿದೆ)</option>
                    <option value="CANCELLED">CANCELLED (ರದ್ದುಮಾಡಲಾಗಿದೆ)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Devotees Count' : 'ಭಕ್ತರ ಸಂಖ್ಯೆ'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={editFormData.devoteesCount || 1}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, devoteesCount: parseInt(e.target.value) || 1 })
                    }
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  {isEn ? 'Committee Notes / Devotee Message' : 'ಟಿಪ್ಪಣಿಗಳು'}
                </label>
                <textarea
                  rows={3}
                  value={editFormData.notes || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingBooking(null)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-50"
                >
                  {isEn ? 'Cancel' : 'ರದ್ದು'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="px-4 py-2 bg-[#701A28] text-white rounded-lg text-xs font-semibold hover:bg-[#58131E] transition-colors"
                >
                  {isSubmittingEdit ? 'Saving...' : isEn ? 'Save Changes' : 'ಉಳಿಸಿ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Cancel Appointment Modal */}
      {cancellingBooking && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
          onClick={() => setCancellingBooking(null)}
        >
          <div
            className="bg-white border border-stone-300 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-rose-900 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>{isEn ? 'Cancel Appointment' : 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ರದ್ದುಮಾಡಿ'}</span>
              </h3>
              <button
                onClick={() => setCancellingBooking(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-700">
              {isEn ? 'Are you sure you want to cancel the booking for ' : 'ಖಚಿತವಾಗಿ ಈ ಬುಕಿಂಗ್ ರದ್ದುಮಾಡಬೇಕೆ? '}
              <strong>{cancellingBooking.name}</strong> ({cancellingBooking.sevaName}) on{' '}
              <strong className="font-mono">{cancellingBooking.date}</strong>?
            </p>

            <div className="space-y-2 text-xs">
              <label className="font-semibold text-stone-800 block">
                {isEn ? 'Reason for Cancellation' : 'ರದ್ದತಿಗೆ ಕಾರಣ'}
              </label>
              <select
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-lg"
              >
                <option value="Devotee requested cancellation">Devotee requested cancellation / ಭಕ್ತರ ಕೋರಿಕೆ</option>
                <option value="Devotee postponed / rescheduled">Devotee postponed to future date</option>
                <option value="Temple special festival / renovation schedule">Temple ritual schedule conflict</option>
                <option value="Devotee unreachable on phone">Devotee unreachable / no response</option>
                <option value="Duplicate entry">Duplicate entry</option>
                <option value="Custom">Other custom reason...</option>
              </select>

              {cancellationReason === 'Custom' && (
                <input
                  type="text"
                  placeholder="Specify cancellation reason..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                />
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => setCancellingBooking(null)}
                className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-50"
              >
                {isEn ? 'Keep Active' : 'ಹಿಂದಕ್ಕೆ'}
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-rose-700 text-white rounded-lg text-xs font-semibold hover:bg-rose-800 transition-colors"
              >
                {isEn ? 'Confirm Cancellation' : 'ರದ್ದು ದೃಢೀಕರಿಸಿ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Create New Appointment Modal */}
      {isCreateOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className="bg-white border border-stone-300 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#701A28]" />
                <span>{isEn ? 'Add New Seva Appointment' : 'ಹೊಸ ಸೇವಾ ಬುಕಿಂಗ್ ಸೇರಿಸಿ'}</span>
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  {isEn ? 'Devotee Full Name *' : 'ಭಕ್ತರ ಹೆಸರು *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arun G U"
                  value={newBooking.name}
                  onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Phone Number *' : 'ದೂರವಾಣಿ *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9019094609"
                    value={newBooking.phone}
                    onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Email (Optional)' : 'ಇಮೇಲ್'}
                  </label>
                  <input
                    type="email"
                    placeholder="devotee@example.com"
                    value={newBooking.email}
                    onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  {isEn ? 'Select Pooja / Seva *' : 'ಪೂಜೆ / ಸೇವೆ ಆಯ್ಕೆಮಾಡಿ *'}
                </label>
                <select
                  value={newBooking.sevaName}
                  onChange={(e) => setNewBooking({ ...newBooking, sevaName: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                >
                  {POOJA_SEVAS.map((s) => (
                    <option key={s.id} value={s.name.en}>
                      {s.name.en} ({s.name.kn})
                    </option>
                  ))}
                  <option value="Pilgrimage & Darshan Visit">Pilgrimage & Darshan Visit (ತೀರ್ಥಯಾತ್ರೆ ಭೇಟಿ)</option>
                  <option value="Special Saturday Hanuman Pooja">Special Saturday Hanuman Pooja</option>
                  <option value="Vehicle Pooja (Vahana Pooja)">Vehicle Pooja (ವಾಹನ ಪೂಜೆ)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Date *' : 'ದಿನಾಂಕ *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={newBooking.date}
                    onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Time Slot' : 'ಸಮಯ'}
                  </label>
                  <select
                    value={newBooking.timeSlot}
                    onChange={(e) => setNewBooking({ ...newBooking, timeSlot: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  >
                    <option value="09:00 AM - 10:30 AM">09:00 AM - 10:30 AM (Morning Seva)</option>
                    <option value="10:30 AM - 12:30 PM">10:30 AM - 12:30 PM (Maha Mangalarathi)</option>
                    <option value="05:30 PM - 07:00 PM">05:30 PM - 07:00 PM (Evening Seva)</option>
                    <option value="Custom Time Slot">Custom Time Slot</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Devotees Count' : 'ಸಂಖ್ಯೆ'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newBooking.devoteesCount}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, devoteesCount: parseInt(e.target.value) || 1 })
                    }
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Gothra (Optional)' : 'ಗೋತ್ರ'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kashyapa"
                    value={newBooking.gothra}
                    onChange={(e) => setNewBooking({ ...newBooking, gothra: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {isEn ? 'Initial Status' : 'ಸ್ಥಿತಿ'}
                  </label>
                  <select
                    value={newBooking.status}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, status: e.target.value as BookingStatus })
                    }
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-semibold"
                  >
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  {isEn ? 'Devotee Notes / Sankalpa Details' : 'ವಿವರಣೆ / ಸಂಕಲ್ಪ'}
                </label>
                <textarea
                  rows={2}
                  placeholder="Devotee specific requests, family names for archana, etc."
                  value={newBooking.notes}
                  onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-50"
                >
                  {isEn ? 'Cancel' : 'ರದ್ದು'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingCreate}
                  className="px-4 py-2 bg-[#701A28] text-white rounded-lg text-xs font-semibold hover:bg-[#58131E] transition-colors"
                >
                  {isSubmittingCreate ? 'Saving...' : isEn ? 'Save Booking to Database' : 'ಬುಕಿಂಗ್ ಉಳಿಸಿ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
