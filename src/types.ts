export type CategoryId =
  | 'hotels'
  | 'mandir'
  | 'schools'
  | 'colleges'
  | 'hospitals'
  | 'sarkari'
  | 'private_offices'
  | 'tourist'
  | 'metro'
  | 'marketing'
  | 'businesses'
  | 'restaurants'
  | 'it_parks'
  | 'shops'
  | 'cars'
  | 'emergency';

export interface PlaceReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  commentMr?: string;
  helpfulCount: number;
}

export interface PlaceItem {
  id: string;
  name: string;
  nameMr: string;
  categoryId: CategoryId;
  category?: string; // Google Sheet / API compatibility
  owner?: string;
  ownerMr?: string;
  photo: string;
  image?: string; // Google Sheet compatibility
  address: string;
  addressMr: string;
  area: string;
  areaMr: string;
  officialPhone?: string; // Strictly public / office / business phone only
  phone: string; // Compatibility alias
  mobile?: string; // Google Sheet compatibility
  mapQuery: string;
  mapDirectionUrl?: string;
  openingHours: string;
  openingHoursMr: string;
  currentOffer: string;
  currentOfferMr: string;
  rating: number;
  reviewsCount: number;
  tagline: string;
  taglineMr: string;
  lat?: number;
  lng?: number;
  price?: string;
  highlights: string[];
  highlightsMr: string[];
  reviews: PlaceReview[];
  isOfficialPublicData?: boolean;
  source?: string;
}

export interface PuneCalendarEvent {
  id: string;
  titleEn: string;
  titleMr: string;
  dateStr: string;
  timeStr: string;
  locationEn: string;
  locationMr: string;
  category: 'festival' | 'cultural' | 'civic' | 'exhibition' | 'sports';
  descriptionEn: string;
  descriptionMr: string;
  ticketInfo: string;
  calendarLink: string;
}

export interface CategoryMeta {
  id: CategoryId;
  nameEn: string;
  nameMr: string;
  iconName: string;
  descriptionEn: string;
  descriptionMr: string;
  count: number;
  accentColor: string;
}

export interface PmcNewsItem {
  id: string;
  titleEn: string;
  titleMr: string;
  timeEn: string;
  timeMr: string;
  category: 'metro' | 'pmc' | 'health' | 'traffic' | 'weather';
  urgent?: boolean;
}

export interface PuneriPatya {
  id: string;
  titleMr: string;
  quoteMr: string;
  meaningEn: string;
  location: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  source?: 'ai' | 'knowledge_base';
}

export interface HotelBookingRecord {
  id: string;
  hotelName: string;
  guestName: string;
  mobile: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: string;
  roomType: string;
  amount: number;
  timestamp: string;
  status: 'Confirmed' | 'Pending';
}

export interface LeaderItem {
  id: string;
  type: 'amdar' | 'khasdar' | 'nagarsevak';
  name: string;
  nameMr: string;
  constituency: string;
  constituencyMr: string;
  party: string;
  partyMr: string;
  officeAddress: string;
  officeAddressMr: string;
  officePhone: string;
  photo: string;
  wardNo?: string;
  source: string;
  disclaimer: string;
}

export interface MetroStation {
  id: string;
  nameEn: string;
  nameMr: string;
  line: 'purple' | 'aqua' | 'interchange';
  stationCode: string;
  stationNumber: number;
  type: 'Elevated' | 'Underground' | 'Interchange';
  firstTrain: string;
  lastTrain: string;
  feederBus: string;
  feederBusMr: string;
  lat: number;
  lng: number;
  nearbyLandmarks: string[];
  nearbyLandmarksMr: string[];
}

export interface WrongInfoReport {
  id: string;
  placeId: string;
  placeName: string;
  placeNameMr?: string;
  category: string;
  issueType: 'wrong_phone' | 'wrong_address' | 'wrong_timing' | 'permanently_closed' | 'other';
  correctionText: string;
  reportedAt: string;
  status: 'Submitted' | 'Verified';
}

export type FuelType = 'cng' | 'petrol' | 'ev';
export type FuelQueueLevel = 'kami' | 'madhyam' | 'khup';
export type FuelStatus = 'available' | 'queue' | 'out_of_stock';

export interface FuelPump {
  id: string;
  name: string;
  nameMr: string;
  type: FuelType;
  brand: string;
  address: string;
  addressMr: string;
  area: string;
  areaMr: string;
  phone: string;
  lat: number;
  lng: number;
  status: FuelStatus;
  queueLevel: FuelQueueLevel;
  lastUpdatedMinsAgo: number;
  updatedBy: string;
  price: string;
  isSponsored?: boolean;
}

export interface CivicService {
  id: string;
  name: string;
  nameMr: string;
  category: 'gas' | 'lic' | 'insurance' | 'puc';
  provider: string;
  description: string;
  descriptionMr: string;
  bookingUrl: string;
  helpline: string;
  officeAddress: string;
  officeAddressMr: string;
  timing: string;
  iconName: string;
  badge?: string;
}

export interface PunePulsePost {
  id: string;
  author: string;
  authorBadge?: string;
  avatar: string;
  category: 'traffic' | 'accident' | 'election' | 'events' | 'batmya';
  title: string;
  titleMr: string;
  content: string;
  contentMr: string;
  location: string;
  locationMr: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  imageUrl?: string;
  verified: boolean;
}

export interface PuneLiveNotification {
  id: string;
  title: string;
  titleMr: string;
  body: string;
  bodyMr: string;
  time: string;
  category: 'traffic' | 'cng' | 'alert' | 'news';
  unread: boolean;
  linkView?: string;
}

export interface BoostPlan {
  id: 'top_search' | 'fuel_top' | 'insurance_lead' | 'homepage_banner';
  title: string;
  titleMr: string;
  price: number;
  priceLabel: string;
  description: string;
  descriptionMr: string;
  features: string[];
  featuresMr: string[];
}

