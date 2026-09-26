import { CategoryId, PlaceItem } from '../types';
import { PUNE_CATEGORIES, PMC_NEWS, PUNERI_PATYA } from './categoriesData';
import { PLACES_PART_1 } from './placesPart1';
import { PLACES_PART_2 } from './placesPart2';
import { PUNE_SUPER_PLACES } from './superAppData';
import { PUNE_DATABASE_KING_PLACES } from './puneDatabaseKing';

import { PUNE_COORDINATES_MAP } from './puneCoordinates';

export { PUNE_CATEGORIES, PMC_NEWS, PUNERI_PATYA };

const RAW_PUNE_PLACES: PlaceItem[] = [
  ...PUNE_DATABASE_KING_PLACES,
  ...PUNE_SUPER_PLACES,
  ...PLACES_PART_1,
  ...PLACES_PART_2,
];

export const ALL_PUNE_PLACES: PlaceItem[] = RAW_PUNE_PLACES.map((p) => {
  const coord = PUNE_COORDINATES_MAP[p.id];
  const officialPhoneNum = p.officialPhone || p.phone || '020-25501000';
  return {
    ...p,
    officialPhone: officialPhoneNum,
    phone: officialPhoneNum,
    lat: p.lat ?? coord?.lat ?? 18.5204,
    lng: p.lng ?? coord?.lng ?? 73.8567,
    price: p.price ?? coord?.price ?? p.currentOffer,
  };
});

export interface AreaOption {
  en: string;
  mr: string;
}

export const PUNE_AREAS: AreaOption[] = [
  { en: 'All Areas', mr: 'सर्व परिसर' },
  { en: 'Budhwar Peth', mr: 'बुधवार पेठ' },
  { en: 'Sadashiv Peth', mr: 'सदाशिव पेठ' },
  { en: 'Narayan Peth', mr: 'नारायण पेठ' },
  { en: 'Shaniwar Peth', mr: 'शनिवार पेठ' },
  { en: 'Bhavani Peth', mr: 'भवानी पेठ' },
  { en: 'Rasta Peth', mr: 'रास्ता पेठ' },
  { en: 'FC Road', mr: 'एफसी रोड' },
  { en: 'Deccan Gymkhana', mr: 'डेक्कन जिमखाना' },
  { en: 'Shivajinagar', mr: 'शिवाजीनगर' },
  { en: 'Camp', mr: 'कॅम्प' },
  { en: 'Swargate', mr: 'स्वारगेट' },
  { en: 'Erandwane', mr: 'एरंडवणे' },
  { en: 'Viman Nagar', mr: 'विमान नगर' },
  { en: 'Kalyani Nagar', mr: 'कल्याणी नगर' },
  { en: 'Hadapsar', mr: 'हडपसर' },
  { en: 'Baner', mr: 'बाणेर' },
  { en: 'Aundh', mr: 'औंध' },
  { en: 'Wakad', mr: 'वाकड' },
  { en: 'Katraj', mr: 'कात्रज' },
  { en: 'Pashan', mr: 'पाषाण' },
  { en: 'Bavdhan', mr: 'बावधन' },
  { en: 'Senapati Bapat Road', mr: 'सेनापती बापट रोड' },
  { en: 'Sinhagad Road', mr: 'सिंहगड रोड' },
  { en: 'Sangamwadi', mr: 'संगमवाडी' },
  { en: 'Station Road', mr: 'स्टेशन रोड' },
  { en: 'Wanowrie', mr: 'वानवडी' },
  { en: 'Law College Road', mr: 'लॉ कॉलेज रोड' },
];

export function getPlacesByCategory(categoryId: CategoryId): PlaceItem[] {
  return ALL_PUNE_PLACES.filter((p) => p.categoryId === categoryId);
}

export function searchPlaces(
  query: string,
  categoryId?: CategoryId | 'all',
  area?: string
): PlaceItem[] {
  const cleanQ = query.trim().toLowerCase();

  return ALL_PUNE_PLACES.filter((place) => {
    // Category match
    if (categoryId && categoryId !== 'all' && place.categoryId !== categoryId) {
      return false;
    }

    // Area match
    if (area && area !== 'All Areas' && area !== 'सर्व परिसर') {
      if (place.area !== area && place.areaMr !== area) {
        return false;
      }
    }

    // Text match
    if (!cleanQ) return true;

    return (
      place.name.toLowerCase().includes(cleanQ) ||
      place.nameMr.includes(cleanQ) ||
      place.address.toLowerCase().includes(cleanQ) ||
      place.addressMr.includes(cleanQ) ||
      place.tagline.toLowerCase().includes(cleanQ) ||
      place.taglineMr.includes(cleanQ) ||
      place.highlights.some((h) => h.toLowerCase().includes(cleanQ)) ||
      place.highlightsMr.some((h) => h.includes(cleanQ)) ||
      place.area.toLowerCase().includes(cleanQ) ||
      place.areaMr.includes(cleanQ)
    );
  });
}
