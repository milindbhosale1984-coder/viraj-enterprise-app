import { PlaceItem, CategoryId } from '../types';

/**
 * Parses Google Sheets CSV / TSV export into PlaceItem array.
 * Expected columns (in any case):
 * Name | Category | Owner | Mobile (or Phone) | Address | Lat/Lng (or Lat, Lng) | Price (or Offer)
 */
export function parseGoogleSheetCsv(csvText: string): PlaceItem[] {
  const lines = csvText.trim().split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  // Parse header
  const headerLine = lines[0];
  const headers = splitCsvRow(headerLine).map((h) => h.trim().toLowerCase());

  const nameIdx = headers.findIndex((h) => h.includes('name') || h.includes('नाव'));
  const categoryIdx = headers.findIndex((h) => h.includes('cat') || h.includes('वर्ग'));
  const ownerIdx = headers.findIndex((h) => h.includes('owner') || h.includes('मालक'));
  const mobileIdx = headers.findIndex((h) => h.includes('mobile') || h.includes('phone') || h.includes('फोन') || h.includes('मोबाईल'));
  const addressIdx = headers.findIndex((h) => h.includes('address') || h.includes('पत्ता'));
  const latLngIdx = headers.findIndex((h) => h.includes('lat/lng') || h.includes('latlng') || h.includes('coord') || h.includes('स्थान'));
  const latIdx = headers.findIndex((h) => h === 'lat' || h === 'latitude');
  const lngIdx = headers.findIndex((h) => h === 'lng' || h === 'longitude' || h === 'long');
  const priceIdx = headers.findIndex((h) => h.includes('price') || h.includes('offer') || h.includes('दर') || h.includes('ऑफर'));

  const parsedPlaces: PlaceItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = splitCsvRow(lines[i]);
    if (!row || row.length === 0) continue;

    const rawName = nameIdx >= 0 ? row[nameIdx]?.trim() : row[0]?.trim();
    if (!rawName) continue;

    const rawCategory = (categoryIdx >= 0 ? row[categoryIdx]?.trim().toLowerCase() : '') || 'shops';
    const rawOwner = ownerIdx >= 0 ? row[ownerIdx]?.trim() : 'Pune Local Merchant';
    const rawMobile = mobileIdx >= 0 ? row[mobileIdx]?.trim() : '+91 20 2445 0000';
    const rawAddress = addressIdx >= 0 ? row[addressIdx]?.trim() : 'Pune, Maharashtra';
    const rawPrice = priceIdx >= 0 ? row[priceIdx]?.trim() : 'Special Pune festival discount';

    let lat = 18.5204;
    let lng = 73.8567;

    if (latLngIdx >= 0 && row[latLngIdx]) {
      const parts = row[latLngIdx].split(/[,/]/).map((p) => parseFloat(p.trim()));
      if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        lat = parts[0];
        lng = parts[1];
      }
    } else if (latIdx >= 0 && lngIdx >= 0) {
      const pLat = parseFloat(row[latIdx]);
      const pLng = parseFloat(row[lngIdx]);
      if (!isNaN(pLat) && !isNaN(pLng)) {
        lat = pLat;
        lng = pLng;
      }
    }

    // Map raw category to valid CategoryId
    let catId: CategoryId = 'shops';
    if (rawCategory.includes('hotel') || rawCategory.includes('cafe') || rawCategory.includes('food')) catId = 'hotels';
    else if (rawCategory.includes('mandir') || rawCategory.includes('temple') || rawCategory.includes('tourist')) catId = 'mandir';
    else if (rawCategory.includes('hosp') || rawCategory.includes('clinic')) catId = 'hospitals';
    else if (rawCategory.includes('school') || rawCategory.includes('college') || rawCategory.includes('edu')) catId = 'schools';
    else if (rawCategory.includes('sarkari') || rawCategory.includes('pmc') || rawCategory.includes('rto') || rawCategory.includes('police')) catId = 'sarkari';
    else if (rawCategory.includes('car') || rawCategory.includes('auto') || rawCategory.includes('bike')) catId = 'cars';
    else if (rawCategory.includes('emer') || rawCategory.includes('help')) catId = 'emergency';

    const place: PlaceItem = {
      id: `sheet-${i}-${Date.now()}`,
      name: rawName,
      nameMr: rawName,
      categoryId: catId,
      owner: rawOwner,
      ownerMr: rawOwner,
      photo: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
      address: rawAddress,
      addressMr: rawAddress,
      area: 'Central Pune',
      areaMr: 'मध्यवर्ती पुणे',
      phone: rawMobile,
      mapQuery: `${rawName} ${rawAddress}`,
      openingHours: '09:00 AM - 09:00 PM',
      openingHoursMr: 'सकाळी ९:०० ते रात्री ९:००',
      currentOffer: rawPrice,
      currentOfferMr: rawPrice,
      rating: 4.8,
      reviewsCount: 12,
      tagline: 'Directly synced from User Google Sheet Database',
      taglineMr: 'थेट गुगल शीट डेटाबेसमधून जोडलेले नवीन दुकान/ठिकाण',
      lat,
      lng,
      price: rawPrice,
      highlights: ['Google Sheet Synced', 'Verified Merchant', 'Live Contact'],
      highlightsMr: ['गुगल शीट द्वारे जोडलेले', 'सत्यापित व्यावसायिक', 'थेट फोन सुविधा'],
      reviews: [
        {
          id: `rev-sheet-${i}`,
          author: 'Punekar Customer',
          rating: 5,
          date: 'Just now',
          comment: 'Found this shop on Punecha Smart Mitra via Google Sheet sync! Excellent service.',
          commentMr: 'गुगल शीटवरून जोडलेले नवीन दुकान. उत्तम माहिती व दर्जेदार सेवा!',
          helpfulCount: 3,
        },
      ],
    };

    parsedPlaces.push(place);
  }

  return parsedPlaces;
}

function splitCsvRow(rowText: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < rowText.length; i++) {
    const char = rowText[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

/**
 * Converts standard Google Sheet share link into CSV export link
 */
export function normalizeGoogleSheetUrl(url: string): string {
  const trimmed = url.trim();
  if (trimmed.includes('export?format=csv') || trimmed.includes('/pub?output=csv')) {
    return trimmed;
  }

  const match = trimmed.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const docId = match[1];
    return `https://docs.google.com/spreadsheets/d/${docId}/export?format=csv`;
  }

  return trimmed;
}

// Sample Google Sheet template data for instant testing
export const SAMPLE_GOOGLE_SHEET_CSV = `Name,Category,Owner,Mobile,Address,Lat/Lng,Price
Chitale Bandhu Sweet Express,Shops,Mandar Chitale,+91 98220 11999,FC Road near Goodluck Chowk,18.5204/73.8567,Bakharwadi 500g @ Rs 190
Puneri Misal Katta,Hotels,Sachin Pawar,+91 98900 22111,JM Road Deccan Pune,18.5230/73.8480,Special Kat Misal @ Rs 90
Dagdusheth Flower & Prasad Seva,Mandir,Ganesh Trust,+91 20 2447 9222,Budhwar Peth Pune,18.5164/73.8560,Silver Coin Prasad Box @ Rs 251
Sahyadri Super Care Diagnostics,Hospitals,Dr. Kulkarni,+91 20 6721 5000,Karve Road Pune,18.5089/73.8340,Full Body Checkup @ Rs 1499
Pune Metro One Smart Card Counter,Sarkari,Maha Metro,+91 1800 270 5555,Civil Court Interchange Pune,18.5280/73.8530,Smart Travel Card @ Rs 100`;
