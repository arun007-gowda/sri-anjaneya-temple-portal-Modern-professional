import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_ID = 'ptjidyrzucculstgikjd';
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_2VM0fqgqpSzRHtCHfeQSfg_tHWbyueE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const SUPABASE_CONFIG = {
  projectId: SUPABASE_PROJECT_ID,
  url: SUPABASE_URL,
  apiKey: SUPABASE_ANON_KEY,
};

export async function dbTestConnection(): Promise<{ ok: boolean; message: string; tablesExist: boolean }> {
  try {
    const { error } = await supabase.from('inquiries').select('id').limit(1);
    if (!error) {
      return { ok: true, message: 'Connected successfully! The database is live and tables are ready.', tablesExist: true };
    }
    if (error.code === '42P01' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
      return {
        ok: true,
        message: 'Connected to Supabase! The "inquiries" table is not created yet. Please copy the SQL script below and execute it in your Supabase SQL editor.',
        tablesExist: false,
      };
    }
    return { ok: false, message: `Connected to Supabase endpoint, but query returned: ${error.message}`, tablesExist: false };
  } catch (err: any) {
    return { ok: false, message: err?.message || 'Failed to reach Supabase endpoint', tablesExist: false };
  }
}

// SQL Schema for the user to easily run in Supabase SQL editor if tables are not yet created
export const SUPABASE_SCHEMA_SQL = `-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/ptjidyrzucculstgikjd/sql)
-- Anjaneya Swamy Temple, Thappagondanahalli Database Schema

-- 1. Devotee Inquiries & Seva Requests Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Community Photo Submissions Table
CREATE TABLE IF NOT EXISTS public.photo_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contributor TEXT NOT NULL,
  contact TEXT NOT NULL,
  category TEXT NOT NULL,
  caption TEXT NOT NULL,
  date_taken TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'PENDING_COMMITTEE_REVIEW',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure image_url column exists on existing tables
ALTER TABLE public.photo_submissions ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 3. Community Oral History & Stories Table
CREATE TABLE IF NOT EXISTS public.community_stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL,
  village TEXT NOT NULL,
  contact TEXT,
  title TEXT NOT NULL,
  story TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Devotee Appointments & Seva Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  devotee_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  seva_name TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT DEFAULT '09:00 AM',
  devotees_count INTEGER DEFAULT 1,
  gothra TEXT,
  nakshatra TEXT,
  status TEXT DEFAULT 'PENDING',
  notes TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) & Public Policies
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photo_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public access
CREATE POLICY "Allow public insert to inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read inquiries" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Allow public update inquiries" ON public.inquiries FOR UPDATE USING (true);
CREATE POLICY "Allow public delete inquiries" ON public.inquiries FOR DELETE USING (true);

CREATE POLICY "Allow public insert photo_submissions" ON public.photo_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select photo_submissions" ON public.photo_submissions FOR SELECT USING (true);
CREATE POLICY "Allow public update photo_submissions" ON public.photo_submissions FOR UPDATE USING (true);

CREATE POLICY "Allow public insert community_stories" ON public.community_stories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select community_stories" ON public.community_stories FOR SELECT USING (true);
CREATE POLICY "Allow public update community_stories" ON public.community_stories FOR UPDATE USING (true);

CREATE POLICY "Allow public insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow public update bookings" ON public.bookings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete bookings" ON public.bookings FOR DELETE USING (true);
`;

// Resilient API services with fallback to localStorage
export async function dbSubmitInquiry(inquiry: {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}) {
  try {
    const { data, error } = await supabase.from('inquiries').insert([inquiry]).select();
    if (error) throw error;
    return { success: true, data: data?.[0] };
  } catch (err) {
    console.warn('Supabase insert failed, saving to local store:', err);
    const existing = JSON.parse(localStorage.getItem('temple_inquiries') || '[]');
    const localItem = { ...inquiry, id: Date.now().toString(), submittedAt: new Date().toISOString() };
    existing.push(localItem);
    localStorage.setItem('temple_inquiries', JSON.stringify(existing));
    return { success: true, data: localItem, local: true };
  }
}

export async function dbGetInquiries() {
  try {
    const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    if (data && data.length > 0) return data;
  } catch (err) {
    console.warn('Supabase fetch failed, falling back to localStorage:', err);
  }
  const local = JSON.parse(localStorage.getItem('temple_inquiries') || '[]');
  return local.map((item: any) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    email: item.email,
    subject: item.subject,
    message: item.message,
    created_at: item.submittedAt || new Date().toISOString(),
  }));
}

export async function dbDeleteInquiry(id: string) {
  try {
    await supabase.from('inquiries').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase delete error:', err);
  }
  const local = JSON.parse(localStorage.getItem('temple_inquiries') || '[]');
  const updated = local.filter((item: any) => item.id !== id);
  localStorage.setItem('temple_inquiries', JSON.stringify(updated));
}

// -------------------------------------------------------------
// Real-time Event Bus & Dynamic Upgrade Broadcast Channel
// -------------------------------------------------------------
const SYNC_CHANNEL_NAME = 'temple_data_sync_channel';
let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
  } catch (_) {}
}

export function notifyTempleDataChanged(type: string, payload?: any) {
  if (typeof window === 'undefined') return;
  const eventData = { type, payload, timestamp: Date.now() };

  // 1. Broadcast to other tabs
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage(eventData);
    } catch (_) {}
  }

  // 2. Dispatch in current window
  try {
    window.dispatchEvent(new CustomEvent('temple_data_updated', { detail: eventData }));
    // Update a localStorage heartbeat to notify any listening storage event
    localStorage.setItem('temple_sync_heartbeat', JSON.stringify(eventData));
  } catch (_) {}
}

export function onTempleDataChanged(callback: (type: string, payload?: any) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleCustomEvent = (e: any) => {
    if (e.detail) {
      callback(e.detail.type, e.detail.payload);
    }
  };

  const handleMessage = (e: MessageEvent) => {
    if (e.data && e.data.type) {
      callback(e.data.type, e.data.payload);
    }
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'temple_sync_heartbeat' && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        callback(parsed.type, parsed.payload);
      } catch (_) {}
    }
  };

  window.addEventListener('temple_data_updated', handleCustomEvent);
  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleMessage);
  }
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener('temple_data_updated', handleCustomEvent);
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleMessage);
    }
    window.removeEventListener('storage', handleStorage);
  };
}

export async function dbSubmitPhoto(photo: {
  contributor: string;
  contact: string;
  category: string;
  caption: string;
  date_taken?: string;
  image_url?: string;
  status?: string;
}) {
  const photoStatus = photo.status || 'APPROVED'; // Auto-publish for immediate dynamic webpage upgrade
  const localId = `p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const fullItem = {
    ...photo,
    id: localId,
    status: photoStatus,
    created_at: new Date().toISOString(),
  };

  // 1. Save to local storage cache immediately
  const existing = JSON.parse(localStorage.getItem('temple_photo_submissions') || '[]');
  existing.unshift(fullItem);
  localStorage.setItem('temple_photo_submissions', JSON.stringify(existing));

  // 2. Broadcast dynamic upgrade immediately to current page and other open tabs
  notifyTempleDataChanged('photo_added', fullItem);

  // 3. Try saving to server API endpoint (persists on filesystem across all devices)
  try {
    const res = await fetch('/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullItem),
    });
    if (res.ok) {
      const serverJson = await res.json();
      if (serverJson.data) {
        notifyTempleDataChanged('photo_added', serverJson.data);
      }
    }
  } catch (apiErr) {
    console.debug('Local/server API push completed or fallback:', apiErr);
  }

  // 4. Also attempt Supabase insert in background
  try {
    const payload = {
      contributor: photo.contributor,
      contact: photo.contact,
      category: photo.category,
      caption: photo.caption,
      date_taken: photo.date_taken || '',
      image_url: photo.image_url || '',
      status: photoStatus,
    };
    await supabase.from('photo_submissions').insert([payload]);
  } catch (err) {
    console.debug('Supabase photo insert fallback:', err);
  }

  return { success: true, data: fullItem, local: true };
}

export async function dbGetPhotos() {
  const parsePhoto = (p: any) => {
    let caption = p.caption || '';
    let image_url = p.image_url || '';
    if (!image_url && typeof caption === 'string' && caption.includes('[IMAGE_URL:')) {
      const match = caption.match(/\[IMAGE_URL:([\s\S]*?)\]/);
      if (match) {
        image_url = match[1].trim();
        caption = caption.replace(/\[IMAGE_URL:[\s\S]*?\]/, '').trim();
      }
    }
    return {
      ...p,
      caption,
      image_url,
      status: p.status || 'APPROVED',
    };
  };

  const photoMap = new Map<string, any>();

  // 1. Load from localStorage cache
  const local = JSON.parse(localStorage.getItem('temple_photo_submissions') || '[]');
  local.forEach((p: any) => {
    const parsed = parsePhoto(p);
    photoMap.set(parsed.id || parsed.image_url, parsed);
  });

  // 2. Try fetching from /api/photos
  try {
    const res = await fetch('/api/photos');
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        json.data.forEach((p: any) => {
          const parsed = parsePhoto(p);
          photoMap.set(parsed.id || parsed.image_url, parsed);
        });
      }
    }
  } catch (e) {
    console.debug('API photo fetch error:', e);
  }

  // 3. Try fetching from Supabase
  try {
    const { data, error } = await supabase.from('photo_submissions').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      data.forEach((p: any) => {
        const parsed = parsePhoto(p);
        photoMap.set(parsed.id || parsed.image_url, parsed);
      });
    }
  } catch (err) {
    console.debug('Supabase photo fetch fallback:', err);
  }

  return Array.from(photoMap.values());
}

export async function dbApprovePhoto(id: string) {
  try {
    await supabase.from('photo_submissions').update({ status: 'APPROVED' }).eq('id', id);
  } catch (err) {
    console.warn('Supabase approve error:', err);
  }
  const local = JSON.parse(localStorage.getItem('temple_photo_submissions') || '[]');
  const updated = local.map((p: any) => p.id === id ? { ...p, status: 'APPROVED' } : p);
  localStorage.setItem('temple_photo_submissions', JSON.stringify(updated));
  notifyTempleDataChanged('photo_updated', { id, status: 'APPROVED' });
}

export async function dbDeletePhoto(id: string) {
  try {
    await supabase.from('photo_submissions').delete().eq('id', id);
  } catch (err) {
    console.warn('Supabase photo delete error:', err);
  }
  const local = JSON.parse(localStorage.getItem('temple_photo_submissions') || '[]');
  const updated = local.filter((p: any) => p.id !== id);
  localStorage.setItem('temple_photo_submissions', JSON.stringify(updated));
  notifyTempleDataChanged('photo_deleted', { id });
}

export async function dbSubmitStory(story: {
  author: string;
  village: string;
  contact?: string;
  title: string;
  story: string;
}) {
  const localId = `s-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const fullItem = {
    ...story,
    id: localId,
    approved: true, // Auto-approve community stories for dynamic live upgrade
    created_at: new Date().toISOString(),
  };

  // 1. Save to local storage cache immediately
  const existing = JSON.parse(localStorage.getItem('temple_story_submissions') || '[]');
  existing.unshift(fullItem);
  localStorage.setItem('temple_story_submissions', JSON.stringify(existing));

  // 2. Broadcast dynamic upgrade immediately
  notifyTempleDataChanged('story_added', fullItem);

  // 3. Try saving to server API endpoint
  try {
    const res = await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullItem),
    });
    if (res.ok) {
      const serverJson = await res.json();
      if (serverJson.data) {
        notifyTempleDataChanged('story_added', serverJson.data);
      }
    }
  } catch (apiErr) {
    console.debug('Local/server story push fallback:', apiErr);
  }

  // 4. Try Supabase insert
  try {
    await supabase.from('community_stories').insert([{ ...story, approved: true }]);
  } catch (err) {
    console.debug('Supabase story insert fallback:', err);
  }

  return { success: true, data: fullItem, local: true };
}

export async function dbGetStories() {
  const storyMap = new Map<string, any>();

  // 1. Local storage
  const local = JSON.parse(localStorage.getItem('temple_story_submissions') || '[]');
  local.forEach((s: any) => storyMap.set(s.id || s.title, s));

  // 2. /api/stories
  try {
    const res = await fetch('/api/stories');
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        json.data.forEach((s: any) => storyMap.set(s.id || s.title, s));
      }
    }
  } catch (e) {
    console.debug('API story fetch error:', e);
  }

  // 3. Supabase
  try {
    const { data, error } = await supabase.from('community_stories').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      data.forEach((s: any) => storyMap.set(s.id || s.title, s));
    }
  } catch (err) {
    console.debug('Supabase story fetch fallback:', err);
  }

  return Array.from(storyMap.values());
}

export async function dbApproveStory(id: string) {
  try {
    await supabase.from('community_stories').update({ approved: true }).eq('id', id);
  } catch (err) {
    console.warn('Supabase approve error:', err);
  }
  const local = JSON.parse(localStorage.getItem('temple_story_submissions') || '[]');
  const updated = local.map((s: any) => s.id === id ? { ...s, approved: true } : s);
  localStorage.setItem('temple_story_submissions', JSON.stringify(updated));
  notifyTempleDataChanged('story_updated', { id, approved: true });
}

// ----------------------------------------------------
// PUBLIC TEMPLE UPDATES & COMMUNITY DATA
// ----------------------------------------------------
export async function dbSubmitTempleUpdate(update: {
  title: { en: string; kn: string };
  category: 'festival' | 'darshan' | 'announcement' | 'history' | 'seva' | 'renovation';
  content: { en: string; kn: string };
  date?: string;
  contributor: string;
}) {
  const localId = `upd-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const fullItem = {
    ...update,
    id: localId,
    date: update.date || new Date().toISOString().slice(0, 10),
    created_at: new Date().toISOString(),
    isPublicShared: true,
    status: 'APPROVED',
  };

  // 1. LocalStorage
  const existing = JSON.parse(localStorage.getItem('temple_public_updates') || '[]');
  existing.unshift(fullItem);
  localStorage.setItem('temple_public_updates', JSON.stringify(existing));

  // 2. Broadcast upgrade event immediately across all open components
  notifyTempleDataChanged('temple_update_added', fullItem);

  // 3. Server API push
  try {
    const res = await fetch('/api/temple-updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullItem),
    });
    if (res.ok) {
      const serverJson = await res.json();
      if (serverJson.data) {
        notifyTempleDataChanged('temple_update_added', serverJson.data);
      }
    }
  } catch (apiErr) {
    console.debug('Local/server temple-update push fallback:', apiErr);
  }

  return { success: true, data: fullItem };
}

export async function dbGetTempleUpdates() {
  const updateMap = new Map<string, any>();

  // 1. LocalStorage
  const local = JSON.parse(localStorage.getItem('temple_public_updates') || '[]');
  local.forEach((u: any) => updateMap.set(u.id || u.title?.en, u));

  // 2. /api/temple-updates
  try {
    const res = await fetch('/api/temple-updates');
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        json.data.forEach((u: any) => updateMap.set(u.id || u.title?.en, u));
      }
    }
  } catch (e) {
    console.debug('API temple-updates fetch error:', e);
  }

  return Array.from(updateMap.values());
}

// -------------------------------------------------------------
// Appointments & Seva Bookings Management
// -------------------------------------------------------------
import type { AppointmentBooking, BookingStatus } from '../types';

export async function dbGetBookings(): Promise<AppointmentBooking[]> {
  const overrides: Record<string, Partial<AppointmentBooking>> = JSON.parse(
    localStorage.getItem('temple_booking_overrides') || '{}'
  );
  const localManualBookings: AppointmentBooking[] = JSON.parse(
    localStorage.getItem('temple_manual_bookings') || '[]'
  );

  const bookingsList: AppointmentBooking[] = [];

  // 1. Try fetching from public.bookings
  try {
    const { data: dbData, error } = await supabase
      .from('bookings')
      .select('*')
      .order('booking_date', { ascending: false });

    if (!error && dbData && dbData.length > 0) {
      for (const row of dbData) {
        const item: AppointmentBooking = {
          id: row.id,
          name: row.devotee_name || row.name || 'Devotee',
          phone: row.phone || '',
          email: row.email || '',
          sevaName: row.seva_name || 'Special Pooja',
          date: row.booking_date || new Date(row.created_at).toISOString().split('T')[0],
          timeSlot: row.booking_time || '09:00 AM',
          devoteesCount: row.devotees_count || 1,
          gothra: row.gothra || '',
          nakshatra: row.nakshatra || '',
          status: (row.status || 'PENDING') as BookingStatus,
          notes: row.notes || '',
          cancellationReason: row.cancellation_reason || '',
          createdAt: row.created_at || new Date().toISOString(),
          sourceTable: 'bookings',
          rawRecord: row,
        };
        // Apply any local override
        if (overrides[item.id]) {
          Object.assign(item, overrides[item.id]);
        }
        bookingsList.push(item);
      }
    }
  } catch (err) {
    console.debug('public.bookings table query failed:', err);
  }

  // 2. Fetch from public.inquiries (contains devotee requests like pilgrimage inquiries)
  try {
    const { data: inqData, error: inqErr } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!inqErr && inqData && inqData.length > 0) {
      for (const row of inqData) {
        // Avoid duplicate if already mapped
        if (bookingsList.some((b) => b.id === row.id)) continue;

        // Parse date from message if possible or fallback to creation date
        const dateMatch = row.message?.match(/(\d{4}-\d{2}-\d{2})/);
        const derivedDate = dateMatch ? dateMatch[1] : new Date(row.created_at).toISOString().split('T')[0];

        const item: AppointmentBooking = {
          id: row.id,
          name: row.name || 'Devotee',
          phone: row.phone || '',
          email: row.email || '',
          sevaName: row.subject || 'Darshan & Seva Visit',
          date: derivedDate,
          timeSlot: 'Morning Slot (09:00 AM - 12:30 PM)',
          devoteesCount: 1,
          status: 'PENDING',
          notes: row.message || '',
          createdAt: row.created_at || new Date().toISOString(),
          sourceTable: 'inquiries',
          rawRecord: row,
        };

        // Apply local overrides (e.g. status changes, edits, cancellation)
        if (overrides[item.id]) {
          Object.assign(item, overrides[item.id]);
        }
        bookingsList.push(item);
      }
    }
  } catch (err) {
    console.debug('public.inquiries query error:', err);
  }

  // 3. Merge manual local bookings
  for (const manual of localManualBookings) {
    if (!bookingsList.some((b) => b.id === manual.id)) {
      if (overrides[manual.id]) {
        Object.assign(manual, overrides[manual.id]);
      }
      bookingsList.push(manual);
    }
  }

  return bookingsList;
}

export async function dbUpdateBooking(id: string, updates: Partial<AppointmentBooking>, sourceTable: string = 'inquiries') {
  // 1. Update in local storage cache
  const overrides: Record<string, Partial<AppointmentBooking>> = JSON.parse(
    localStorage.getItem('temple_booking_overrides') || '{}'
  );
  overrides[id] = { ...(overrides[id] || {}), ...updates };
  localStorage.setItem('temple_booking_overrides', JSON.stringify(overrides));

  // 2. Update remote database
  try {
    if (sourceTable === 'bookings') {
      const dbPayload: any = {};
      if (updates.name) dbPayload.devotee_name = updates.name;
      if (updates.phone) dbPayload.phone = updates.phone;
      if (updates.email !== undefined) dbPayload.email = updates.email;
      if (updates.sevaName) dbPayload.seva_name = updates.sevaName;
      if (updates.date) dbPayload.booking_date = updates.date;
      if (updates.timeSlot) dbPayload.booking_time = updates.timeSlot;
      if (updates.devoteesCount) dbPayload.devotees_count = updates.devoteesCount;
      if (updates.status) dbPayload.status = updates.status;
      if (updates.notes !== undefined) dbPayload.notes = updates.notes;
      if (updates.cancellationReason !== undefined) dbPayload.cancellation_reason = updates.cancellationReason;

      await supabase.from('bookings').update(dbPayload).eq('id', id);
    } else {
      // Inquiries table
      const inqPayload: any = {};
      if (updates.name) inqPayload.name = updates.name;
      if (updates.phone) inqPayload.phone = updates.phone;
      if (updates.email !== undefined) inqPayload.email = updates.email;
      if (updates.sevaName) inqPayload.subject = updates.sevaName;
      if (updates.notes || updates.status || updates.date) {
        inqPayload.message = `[Status: ${updates.status || 'PENDING'}] [Date: ${updates.date || ''}] ${updates.notes || ''}`;
      }
      await supabase.from('inquiries').update(inqPayload).eq('id', id);
    }
  } catch (err) {
    console.warn('Supabase booking update failed, fallback to local persistence:', err);
  }

  return { success: true };
}

export async function dbCancelBooking(id: string, reason: string, sourceTable: string = 'inquiries') {
  return dbUpdateBooking(id, {
    status: 'CANCELLED',
    cancellationReason: reason,
  }, sourceTable);
}

export async function dbConfirmBooking(id: string, sourceTable: string = 'inquiries') {
  return dbUpdateBooking(id, {
    status: 'CONFIRMED',
  }, sourceTable);
}

export async function dbDeleteBooking(id: string, sourceTable: string = 'inquiries') {
  // Delete from remote
  try {
    if (sourceTable === 'bookings') {
      await supabase.from('bookings').delete().eq('id', id);
    } else {
      await supabase.from('inquiries').delete().eq('id', id);
    }
  } catch (err) {
    console.warn('Supabase booking deletion failed:', err);
  }

  // Remove from local stores
  const overrides: Record<string, any> = JSON.parse(
    localStorage.getItem('temple_booking_overrides') || '{}'
  );
  delete overrides[id];
  localStorage.setItem('temple_booking_overrides', JSON.stringify(overrides));

  const manual: AppointmentBooking[] = JSON.parse(
    localStorage.getItem('temple_manual_bookings') || '[]'
  );
  const updatedManual = manual.filter((m) => m.id !== id);
  localStorage.setItem('temple_manual_bookings', JSON.stringify(updatedManual));

  return { success: true };
}

export async function dbCreateBooking(booking: Omit<AppointmentBooking, 'id' | 'createdAt' | 'sourceTable'>) {
  const newId = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `b-${Date.now()}`;
  const nowIso = new Date().toISOString();

  // Try creating in bookings table
  try {
    const { data, error } = await supabase.from('bookings').insert([{
      devotee_name: booking.name,
      phone: booking.phone,
      email: booking.email || null,
      seva_name: booking.sevaName,
      booking_date: booking.date,
      booking_time: booking.timeSlot || '09:00 AM',
      devotees_count: booking.devoteesCount || 1,
      gothra: booking.gothra || null,
      nakshatra: booking.nakshatra || null,
      status: booking.status || 'CONFIRMED',
      notes: booking.notes || null,
    }]).select();

    if (!error && data && data[0]) {
      return { success: true, data: data[0] };
    }
  } catch (e) {
    console.debug('Error inserting into bookings table:', e);
  }

  // Fallback to inquiries table
  try {
    const { data: inqData, error: inqErr } = await supabase.from('inquiries').insert([{
      name: booking.name,
      phone: booking.phone,
      email: booking.email || null,
      subject: `Seva Booking: ${booking.sevaName}`,
      message: `Date: ${booking.date} | Time: ${booking.timeSlot || '09:00 AM'} | Devotees: ${booking.devoteesCount || 1} | Notes: ${booking.notes || 'Manual admin booking'}`,
    }]).select();

    if (!inqErr && inqData && inqData[0]) {
      return { success: true, data: inqData[0] };
    }
  } catch (err) {
    console.debug('Error inserting into inquiries table:', err);
  }

  // Local storage fallback
  const localManual: AppointmentBooking[] = JSON.parse(
    localStorage.getItem('temple_manual_bookings') || '[]'
  );
  const fullItem: AppointmentBooking = {
    ...booking,
    id: newId,
    createdAt: nowIso,
    sourceTable: 'bookings',
  };
  localManual.unshift(fullItem);
  localStorage.setItem('temple_manual_bookings', JSON.stringify(localManual));

  return { success: true, data: fullItem };
}
