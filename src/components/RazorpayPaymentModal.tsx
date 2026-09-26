import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Smartphone,
  X,
  Calendar,
  Users,
  Hotel,
  Download,
  List,
} from 'lucide-react';
import { Language, translations } from '../data/translations';
import { PlaceItem, HotelBookingRecord } from '../types';

interface RazorpayPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  paymentType: 'ad_booking' | 'place_booking';
  place?: PlaceItem | null;
}

export const RazorpayPaymentModal: React.FC<RazorpayPaymentModalProps> = ({
  isOpen,
  onClose,
  language,
  paymentType,
  place,
}) => {
  const t = translations[language];
  const isHotel = place?.categoryId === 'hotels';

  const [paymentMode, setPaymentMode] = useState<'upi' | 'razorpay'>('upi');
  const [businessName, setBusinessName] = useState(
    place ? (language === 'mr' ? place.nameMr : place.name) : ''
  );
  const [guestName, setGuestName] = useState('');
  const [mobileNumber, setMobileNumber] = useState(place?.phone || '');
  const [checkInDate, setCheckInDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [roomType, setRoomType] = useState('Deluxe Puneri Room');
  const [guestsCount, setGuestsCount] = useState('2');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [savedBookings, setSavedBookings] = useState<HotelBookingRecord[]>([]);
  const [showSavedList, setShowSavedList] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    id: string;
    amount: number;
    bookingRef: string;
  } | null>(null);

  // Load saved bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pune_hotel_bookings');
      if (stored) {
        setSavedBookings(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Amount: Hotel token ₹100 as specified, or Ad booking ₹499
  const amount = paymentType === 'ad_booking' ? 499 : isHotel ? 100 : 100;
  const upiId = 'test@upi';
  const upiPayLink = `upi://pay?pa=${upiId}&pn=PuneHotelBooking&am=${amount}&cu=INR&tn=PuneSmartMitraToken`;

  const saveBookingToLocalStorage = (refId: string) => {
    const newRecord: HotelBookingRecord = {
      id: refId,
      hotelName: place ? place.name : businessName || 'Pune Hotel',
      guestName: guestName || businessName || 'Guest',
      mobile: mobileNumber || '9822012345',
      checkInDate,
      checkOutDate,
      guestsCount,
      roomType,
      amount,
      timestamp: new Date().toLocaleString(),
      status: 'Confirmed',
    };

    try {
      const existingStr = localStorage.getItem('pune_hotel_bookings');
      const existing: HotelBookingRecord[] = existingStr ? JSON.parse(existingStr) : [];
      const updated = [newRecord, ...existing];
      localStorage.setItem('pune_hotel_bookings', JSON.stringify(updated));
      setSavedBookings(updated);
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }
  };

  const handleProcessPayment = () => {
    if (!guestName && !businessName) {
      alert(language === 'mr' ? 'कृपया नाव भरा.' : 'Please enter your name.');
      return;
    }
    if (!mobileNumber) {
      alert(language === 'mr' ? 'कृपया मोबाईल नंबर भरा.' : 'Please enter mobile number.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const bookingRef = `PUNE-${isHotel ? 'HTL' : 'RES'}-${Math.floor(100000 + Math.random() * 900000)}`;
      saveBookingToLocalStorage(bookingRef);

      setPaymentSuccess(true);
      setPaymentDetails({
        id: `pay_test_${Math.random().toString(36).substring(2, 11)}`,
        amount,
        bookingRef,
      });
    }, 1000);
  };

  const handleReset = () => {
    setPaymentSuccess(false);
    setPaymentDetails(null);
    setShowSavedList(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-stone-900 border-2 border-orange-500 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switch between Book Form & Saved Bookings */}
        {savedBookings.length > 0 && !paymentSuccess && (
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-200 dark:border-stone-800">
            <button
              onClick={() => setShowSavedList(false)}
              className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer ${
                !showSavedList
                  ? 'bg-orange-600 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
              }`}
            >
              {language === 'mr' ? 'नवीन बुकिंग' : 'New Booking'}
            </button>
            <button
              onClick={() => setShowSavedList(true)}
              className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer ${
                showSavedList
                  ? 'bg-orange-600 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'माझी सेव्ह केलेली बुकिंग्ज' : 'Saved Bookings'}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-white text-[10px]">
                {savedBookings.length}
              </span>
            </button>
          </div>
        )}

        {/* Saved Bookings View */}
        {showSavedList ? (
          <div>
            <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{language === 'mr' ? 'स्थानिक बुकिंग्ज (localStorage)' : 'Saved Local Bookings'}</span>
            </h3>
            <div className="space-y-3 mb-4 max-h-72 overflow-y-auto">
              {savedBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-left"
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-stone-900 dark:text-stone-100 font-extrabold">{b.hotelName}</span>
                    <span className="text-emerald-600 font-mono">{b.id}</span>
                  </div>
                  <div className="text-stone-600 dark:text-stone-300 text-[11px] mb-1">
                    अतिथी: <strong>{b.guestName}</strong> ({b.mobile})
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span>चेक-इन: {b.checkInDate} | चेक-आऊट: {b.checkOutDate}</span>
                    <span className="font-bold text-emerald-700">₹{b.amount} Paid</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowSavedList(false)}
              className="w-full py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold cursor-pointer"
            >
              नवीन बुकिंग फॉर्मकडे जा
            </button>
          </div>
        ) : !paymentSuccess ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xl shadow-xs">
                {isHotel ? <Hotel className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero">
                  {paymentType === 'ad_booking'
                    ? language === 'mr'
                      ? 'जाहिरात नोंदणी (Post Ad - ₹499)'
                      : 'Post Ad - Business Promotion (₹499)'
                    : isHotel
                    ? language === 'mr'
                      ? 'हॉटेल बुकिंग फॉर्म (Book Now - ₹100)'
                      : 'Hotel Booking Form (Book Now - ₹100)'
                    : language === 'mr'
                    ? 'स्थानिक बुकिंग व टोकन (Book Now)'
                    : 'Instant Book / Advance Token'}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {isHotel
                    ? 'नाव, तारीख व मोबाईल भरा -> सेव्ह करा -> ₹१०० यूपीआय पे करा'
                    : 'Razorpay & UPI Instant Payment Gateway'}
                </p>
              </div>
            </div>

            {/* Hotel / Place Highlight Banner */}
            {place && (
              <div className="mb-4 p-3 rounded-2xl bg-orange-50/70 dark:bg-stone-800/80 border border-orange-200 dark:border-stone-750 flex items-center gap-3">
                <img src={place.photo} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-xs sm:text-sm text-stone-900 dark:text-stone-100 truncate">
                    {language === 'mr' ? place.nameMr : place.name}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                    {language === 'mr' ? place.areaMr : place.area} · {place.address}
                  </div>
                </div>
              </div>
            )}

            {/* Price Box */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-emerald-50 dark:from-stone-850 dark:to-stone-800 border-2 border-orange-300 dark:border-stone-700 flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 block">
                  {paymentType === 'ad_booking' ? 'जाहिरात स्लॉट' : 'हॉटेल कन्फर्मेशन टोकन'}
                </span>
                <span className="text-2xl font-black text-stone-900 dark:text-stone-100">₹{amount}</span>
                <span className="text-[11px] text-emerald-600 font-bold ml-1.5">
                  (UPI ID: {upiId})
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-stone-900 text-xs font-bold text-orange-700 dark:text-orange-300 border border-orange-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>पुणे विशेष टोकन</span>
              </div>
            </div>

            {/* Form Fields: Name, Date, Mobile */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {language === 'mr' ? 'आपले नाव (Name) *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={guestName || businessName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    setBusinessName(e.target.value);
                  }}
                  placeholder="उदा. राहुल कुलकर्णी"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {language === 'mr' ? 'तारीख (Check-in Date) *' : 'Check-in Date *'}
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {language === 'mr' ? 'मोबाईल (Mobile No) *' : 'Mobile Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="+91 98220 12345"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>
            </div>

            {/* Mode selection: UPI vs Razorpay */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMode('upi')}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  paymentMode === 'upi'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 ring-2 ring-emerald-500/20'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900 dark:text-stone-100">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>UPI Payment ({upiId})</span>
                </div>
                <p className="text-[10px] text-stone-500">₹{amount} (GPay, PhonePe, Paytm)</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('razorpay')}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  paymentMode === 'razorpay'
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/60 ring-2 ring-orange-500/20'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900 dark:text-stone-100">
                  <CreditCard className="w-3.5 h-3.5 text-orange-600" />
                  <span>Razorpay Checkout</span>
                </div>
                <p className="text-[10px] text-stone-500">Cards, NetBanking, UPI</p>
              </button>
            </div>

            {/* Action Buttons */}
            {paymentMode === 'upi' ? (
              <div className="space-y-2">
                <a
                  href={upiPayLink}
                  onClick={() => {
                    const bookingRef = `PUNE-UPI-${Math.floor(100000 + Math.random() * 900000)}`;
                    saveBookingToLocalStorage(bookingRef);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>GPay / PhonePe वरून ₹{amount} भरा (UPI ID: {upiId})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="w-full py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-100 cursor-pointer"
                >
                  {isProcessing ? 'सेव्ह करत आहे...' : 'बुकिंग सेव्ह करा आणि पावती पहा (Simulate Success)'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CreditCard className="w-4 h-4" />
                )}
                <span>Razorpay द्वारे ₹{amount} भरा व सेव्ह करा</span>
              </button>
            )}

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>डेटा सुरक्षितपणे localStorage मध्ये सेव्ह केला जातो · UPI ID: {upiId}</span>
            </div>
          </div>
        ) : (
          /* Payment & Voucher Confirmation */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100 mb-1 font-devanagari-hero">
              {isHotel ? 'हॉटेल बुकिंग कन्फर्म झाले!' : 'पेमेंट व बुकिंग यशस्वी!'}
            </h3>

            <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto mb-4 leading-relaxed">
              आपले ₹{paymentDetails?.amount} चे टोकन यशस्वीरीत्या स्वीकारले असून बुकिंग स्थानिक डेटाबेसमध्ये सेव्ह झाले आहे.
            </p>

            {/* Voucher Card */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-700 text-left text-xs space-y-2 mb-5">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-700 font-bold">
                <span className="text-emerald-700 dark:text-emerald-400">पुणे सुपर ॲप पावती / Voucher</span>
                <span className="font-mono text-stone-800 dark:text-stone-200">
                  {paymentDetails?.bookingRef}
                </span>
              </div>

              <div>
                <span className="text-stone-400">हॉटेल:</span>{' '}
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  {place ? place.name : businessName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-stone-400">अतिथी:</span> <strong>{guestName || businessName}</strong>
                </div>
                <div>
                  <span className="text-stone-400">मोबाईल:</span> <strong>{mobileNumber}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-stone-400">चेक-इन:</span> <strong>{checkInDate}</strong>
                </div>
                <div>
                  <span className="text-stone-400">टोकन:</span> <strong>₹{paymentDetails?.amount} (UPI: {upiId})</strong>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert('पावती सेव्ह झाली आहे!');
                }}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-100 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>पावती डाउनलोड करा</span>
              </button>

              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
              >
                पूर्ण झाले (Done)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
