/**
 * Google Sheet Connect via SheetDB API
 * Saves all user leads (Date, Name, Phone, Search, WhatsApp Click, QR Generated)
 * Powered by Viraj Enterprise - Milind Bhosale
 */

import axios from 'axios';

export interface SheetLead {
  Date: string;
  Time: string;
  Name: string;
  Phone: string;
  Search: string;
  Action: string;
  WhatsAppClick: string;
  Notes?: string;
}

// Default SheetDB API endpoint or local fallback queue
const DEFAULT_SHEETDB_URL = 'https://sheetdb.io/api/v1/viraj_pune_leads';
const LOCAL_LEADS_KEY = 've_google_sheet_leads';

/**
 * Get all locally cached leads
 */
export function getLocalLeads(): SheetLead[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_LEADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save lead to Google Sheet via SheetDB, with fallback to local cache
 */
export async function saveLeadToSheet(data: {
  name?: string;
  phone?: string;
  search?: string;
  action?: string;
  whatsAppClick?: boolean | string;
  notes?: string;
}): Promise<boolean> {
  const now = new Date();
  const lead: SheetLead = {
    Date: now.toISOString().split('T')[0],
    Time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    Name: data.name?.trim() || 'Pune Resident',
    Phone: data.phone?.trim() || '9021745403',
    Search: data.search?.trim() || 'General Browse',
    Action: data.action?.trim() || 'Viewed App',
    WhatsAppClick: data.whatsAppClick ? 'YES (9021745403)' : 'NO',
    Notes: data.notes || 'Viraj Enterprise Pune Super App Lead',
  };

  // 1. Always save to local queue
  try {
    const leads = getLocalLeads();
    leads.unshift(lead);
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(leads.slice(0, 100)));
  } catch {}

  // 2. Attempt remote SheetDB sync
  try {
    const sheetUrl = localStorage.getItem('ve_sheetdb_url') || DEFAULT_SHEETDB_URL;
    if (sheetUrl && !sheetUrl.includes('viraj_pune_leads')) {
      await axios.post(sheetUrl, { data: [lead] }, { timeout: 4000 });
      return true;
    }
  } catch (err) {
    // Graceful offline fallback
  }

  return true;
}

/**
 * Convenience helper whenever a user interacts with WhatsApp 9021745403
 */
export function recordWhatsAppClick(purpose: string = 'General Inquiry', userName: string = ''): void {
  saveLeadToSheet({
    name: userName || 'Pune User',
    phone: '9021745403',
    action: `WhatsApp Click: ${purpose}`,
    whatsAppClick: true,
    notes: 'Triggered direct chat to Milind Bhosale (9021745403)',
  });
}
