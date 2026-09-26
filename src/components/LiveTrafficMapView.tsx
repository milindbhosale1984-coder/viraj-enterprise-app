import React, { useState, useEffect, useRef } from 'react';
import {
  Car,
  AlertTriangle,
  MapPin,
  Maximize2,
  Minimize2,
  RefreshCw,
  PlusCircle,
  Clock,
  ShieldAlert,
  Send,
  X,
  PhoneCall,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { Language } from '../data/translations';
import { loadGoogleMapsScript } from '../utils/googleMapsLoader';

interface LiveTrafficMapViewProps {
  language: Language;
}

interface JamReport {
  id: string;
  locationEn: string;
  locationMr: string;
  severity: 'slow' | 'heavy' | 'gridlock';
  reasonEn: string;
  reasonMr: string;
  alternateRouteEn: string;
  alternateRouteMr: string;
  reportedBy: string;
  timestamp: string;
  lat: number;
  lng: number;
}

const INITIAL_JAM_REPORTS: JamReport[] = [
  {
    id: 'jam-1',
    locationEn: 'University Circle / Ganeshkhind Road',
    locationMr: 'पुणे विद्यापीठ चौक / गणेशखिंड रस्ता',
    severity: 'heavy',
    reasonEn: 'Ongoing Metro flyover pillar construction & evening peak rush',
    reasonMr: 'मेट्रो उड्डाणपुलाचे काम व संध्याकाळची गर्दी',
    alternateRouteEn: 'Use Senapati Bapat Road or Pashan Road bypass via Abhimanshree',
    alternateRouteMr: 'सेनापती बापट रस्ता किंवा पाषाण-अभिमानश्री मार्गाचा वापर करा',
    reportedBy: 'प्रमोद जोशी (नागरिक)',
    timestamp: '५ मिनिटांपूर्वी',
    lat: 18.5375,
    lng: 73.8285,
  },
  {
    id: 'jam-2',
    locationEn: 'Hinjawadi Phase 1 Shivaji Chowk',
    locationMr: 'हिंजवडी फेज १ शिवाजी चौक (IT Park)',
    severity: 'heavy',
    reasonEn: 'Shift change traffic & road widening work',
    reasonMr: 'आयटी शिफ्ट बदल व रस्ता रुंदीकरण',
    alternateRouteEn: 'Take Wakad-Marunji link road or Blue Ridge internal road',
    alternateRouteMr: 'वाकड-मारुंजी लिंक रोड अथवा ब्ल्यू रिज अंतर्गत रस्ता घ्या',
    reportedBy: 'रोहन कुलकर्णी (IT Professional)',
    timestamp: '१२ मिनिटांपूर्वी',
    lat: 18.5913,
    lng: 73.7389,
  },
  {
    id: 'jam-3',
    locationEn: 'Swargate Bus Station Chowk',
    locationMr: 'स्वारगेट बस स्थानक चौक',
    severity: 'slow',
    reasonEn: 'MSRTC buses entry/exit & pedestrian crowding',
    reasonMr: 'एसटी बस ये-जा व पादचाऱ्यांची गर्दी',
    alternateRouteEn: 'Take Sarasbaug - Nehru Road bypass route',
    alternateRouteMr: 'सारसबाग ते नेहरू रोड बायपास मार्गाने जा',
    reportedBy: 'अमोल शिंदे',
    timestamp: '२२ मिनिटांपूर्वी',
    lat: 18.5018,
    lng: 73.8586,
  },
  {
    id: 'jam-4',
    locationEn: 'Chandani Chowk & Kothrud Flyover',
    locationMr: 'चांदणी चौक व कोथरूड उड्डाणपूल',
    severity: 'slow',
    reasonEn: 'Highway merge traffic towards Mumbai-Bangalore bypass',
    reasonMr: 'मुंबई-बंगळुरू महामार्ग जंक्शन वाहनांची रीघ',
    alternateRouteEn: 'Traffic moving steadily; keep to right lane for Highway',
    alternateRouteMr: 'वाहतूक हळूहळू सुरू आहे; हायवेसाठी उजव्या लेनचा वापर करा',
    reportedBy: 'पुणे ट्रॅफिक वॉच',
    timestamp: '३५ मिनिटांपूर्वी',
    lat: 18.5074,
    lng: 73.7844,
  },
  {
    id: 'jam-5',
    locationEn: 'Hadapsar Gadital Chowk (Solapur Rd)',
    locationMr: 'हडपसर गाडीतळ चौक (सोलापूर रोड)',
    severity: 'gridlock',
    reasonEn: 'Truck breakdown on bridge near Saswad road turn',
    reasonMr: 'पुलावर मालवाहू ट्रक बंद पडल्याने चक्काजाम',
    alternateRouteEn: 'Use Magarpatta Road or BT Kawade Road detour',
    alternateRouteMr: 'मगरपट्टा रस्ता अथवा बीटी कवडे रोडने वळसा घ्या',
    reportedBy: 'संतोष गायकवाड',
    timestamp: '४५ मिनिटांपूर्वी',
    lat: 18.5022,
    lng: 73.9288,
  },
];

const PUNE_CHOKEPOINTS = [
  { nameMr: 'चांदणी चौक', nameEn: 'Chandani Chowk', lat: 18.5074, lng: 73.7844 },
  { nameMr: 'विद्यापीठ चौक', nameEn: 'University Circle', lat: 18.5375, lng: 73.8285 },
  { nameMr: 'हिंजवडी चौक', nameEn: 'Hinjawadi Chowk', lat: 18.5913, lng: 73.7389 },
  { nameMr: 'स्वारगेट चौक', nameEn: 'Swargate Chowk', lat: 18.5018, lng: 73.8586 },
  { nameMr: 'हडपसर गाडीतळ', nameEn: 'Hadapsar Gadital', lat: 18.5022, lng: 73.9288 },
  { nameMr: 'कात्रज बोगदा', nameEn: 'Katraj Ghat', lat: 18.4485, lng: 73.8588 },
  { nameMr: 'बंडगार्डन पूल', nameEn: 'Bund Garden Bridge', lat: 18.5385, lng: 73.8825 },
];

export const LiveTrafficMapView: React.FC<LiveTrafficMapViewProps> = ({ language }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const trafficLayerRef = useRef<any>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [trafficActive, setTrafficActive] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [jamReports, setJamReports] = useState<JamReport[]>(INITIAL_JAM_REPORTS);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // New report form state
  const [reportLocation, setReportLocation] = useState('University Circle / विद्यापीठ चौक');
  const [reportSeverity, setReportSeverity] = useState<'slow' | 'heavy' | 'gridlock'>('heavy');
  const [reportReason, setReportReason] = useState('');
  const [reportRoute, setReportRoute] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Initialize Google Maps with Traffic Layer
  useEffect(() => {
    let isMounted = true;

    loadGoogleMapsScript()
      .then(() => {
        if (!isMounted || !mapContainerRef.current) return;
        const google = (window as any).google;
        if (!google || !google.maps) return;

        const map = new google.maps.Map(mapContainerRef.current, {
          center: { lat: 18.5204, lng: 73.8567 }, // Central Pune
          zoom: 13,
          mapTypeId: 'roadmap',
          zoomControl: true,
          streetViewControl: true,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }],
            },
          ],
        });

        mapInstanceRef.current = map;

        // Add Traffic Layer
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayerRef.current = trafficLayer;
        trafficLayer.setMap(map);

        setMapLoaded(true);
      })
      .catch((err) => {
        console.error('Error loading Google Map with Traffic Layer:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTrafficLayer = () => {
    if (!trafficLayerRef.current || !mapInstanceRef.current) return;
    if (trafficActive) {
      trafficLayerRef.current.setMap(null);
      setTrafficActive(false);
    } else {
      trafficLayerRef.current.setMap(mapInstanceRef.current);
      setTrafficActive(true);
    }
  };

  const focusChokepoint = (lat: number, lng: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat, lng });
      mapInstanceRef.current.setZoom(15);
    }
  };

  const handleSubmitJamReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason.trim()) {
      alert(language === 'mr' ? 'कृपया ट्रॅफिकचे कारण किंवा स्थिती लिहा.' : 'Please enter the traffic condition or cause.');
      return;
    }

    const newReport: JamReport = {
      id: `jam-${Date.now()}`,
      locationEn: reportLocation,
      locationMr: reportLocation,
      severity: reportSeverity,
      reasonEn: reportReason,
      reasonMr: reportReason,
      alternateRouteEn: reportRoute || 'Proceed with patience or use navigation app',
      alternateRouteMr: reportRoute || 'पर्यायी रस्त्याचा वापर करा अथवा सावकाश पुढे जा',
      reportedBy: reporterName.trim() || (language === 'mr' ? 'जागरूक पुणेकर' : 'Alert Punekar'),
      timestamp: language === 'mr' ? 'आत्ताच' : 'Just now',
      lat: 18.5204,
      lng: 73.8567,
    };

    setJamReports((prev) => [newReport, ...prev]);
    setReportSuccess(true);

    setTimeout(() => {
      setReportSuccess(false);
      setIsReportModalOpen(false);
      setReportReason('');
      setReportRoute('');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-200 text-xs font-bold mb-3 border border-white/20">
            <Car className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'पुणे थेट गुगल ट्रॅफिक मॅप' : 'Pune Live Google Traffic Map'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-devanagari-hero">
            {language === 'mr' ? 'थेट पुणे वाहतूक व ट्रॅफिक जाम रिपोर्ट' : 'Live Pune Traffic & Citizen Jam Reports'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed">
            {language === 'mr'
              ? 'गुगल मॅप्स ट्रॅफिक लेयरद्वारे संपूर्ण पुण्यातील रस्त्यांवरील लाइव्ह गर्दी, चांदणी चौक, हिंजवडी व विद्यापीठ चौकातील स्थिती आणि नागरिकांचे ट्रॅफिक अलर्ट.'
              : 'Real-time Pune traffic conditions powered by Google Maps Traffic API. View congestion hotspots and report traffic jams directly.'}
          </p>
        </div>

        {/* Action Button: Report Jam */}
        <div className="relative z-10 mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white font-extrabold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all active:scale-95 cursor-pointer ring-2 ring-white/30"
          >
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>{language === 'mr' ? 'ट्रॅफिक जाम रिपोर्ट करा (Report Jam)' : 'Report Traffic Jam'}</span>
          </button>

          <a
            href="tel:02026208225"
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-2 border border-white/20 backdrop-blur-md transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
            <span>{language === 'mr' ? 'ट्रॅफिक पोलीस: 020-26208225' : 'Traffic Helpline: 020-26208225'}</span>
          </a>
        </div>
      </div>

      {/* Map Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs mb-4">
        {/* Chokepoint shortcuts */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          <span className="text-xs font-bold text-stone-500 dark:text-stone-400 shrink-0 mr-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-orange-600" />
            <span>{language === 'mr' ? 'महत्त्वाचे चौक:' : 'Hotspots:'}</span>
          </span>
          {PUNE_CHOKEPOINTS.map((cp, idx) => (
            <button
              key={idx}
              onClick={() => focusChokepoint(cp.lat, cp.lng)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-orange-100 dark:hover:bg-orange-950/70 hover:text-orange-700 dark:hover:text-orange-300 transition-colors whitespace-nowrap cursor-pointer shrink-0 border border-stone-200 dark:border-stone-750"
            >
              {language === 'mr' ? cp.nameMr : cp.nameEn}
            </button>
          ))}
        </div>

        {/* Map View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTrafficLayer}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              trafficActive
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>{trafficActive ? 'Traffic Layer ON' : 'Traffic Layer OFF'}</span>
          </button>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 rounded-xl transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Traffic Map Canvas */}
      <div
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-stone-200 dark:border-stone-800 shadow-md mb-8 transition-all ${
          isFullScreen ? 'fixed inset-4 z-50 rounded-2xl shadow-2xl' : 'h-[500px] sm:h-[580px]'
        }`}
      >
        <div ref={mapContainerRef} className="w-full h-full bg-stone-200 dark:bg-stone-800" />

        {/* Top-Right Legend Box */}
        <div className="absolute top-4 right-4 z-10 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-lg text-[11px]">
          <div className="font-extrabold text-stone-900 dark:text-stone-100 mb-1.5">
            {language === 'mr' ? 'ट्रॅफिक लेयर रंग' : 'Traffic Color Key'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-stone-600 dark:text-stone-300">{language === 'mr' ? 'मोकळा रस्ता (>४० किमी/तास)' : 'Fast Flow'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1.5 rounded-full bg-amber-500"></span>
              <span className="text-stone-600 dark:text-stone-300">{language === 'mr' ? 'हळूवार वाहतूक' : 'Slow Moving'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1.5 rounded-full bg-rose-500"></span>
              <span className="text-stone-600 dark:text-stone-300">{language === 'mr' ? 'जड गर्दी (Heavy Jam)' : 'Congestion'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1.5 rounded-full bg-rose-900"></span>
              <span className="text-stone-600 dark:text-stone-300">{language === 'mr' ? 'पूर्ण चक्काजाम (Standstill)' : 'Total Gridlock'}</span>
            </div>
          </div>
        </div>

        {/* Floating Quick Action in Map */}
        <div className="absolute bottom-4 left-4 z-10">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-4 py-2 text-xs font-extrabold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xl flex items-center gap-1.5 cursor-pointer backdrop-blur-md border border-white/20"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'येथे जाम आहे का? नोंदवा' : 'Report Jam Here'}</span>
          </button>
        </div>
      </div>

      {/* Community Jam Alerts Feed */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero">
                {language === 'mr' ? 'पुणेकरांचे थेट ट्रॅफिक अलर्ट' : 'Pune Community Jam Alerts'}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {language === 'mr' ? 'नागरिकांनी नोंदवलेले ताजे ट्रॅफिक अपडेट्स व पर्यायी मार्ग' : 'Live crowd-sourced traffic updates and bypass routes'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 rounded-xl hover:bg-rose-100 cursor-pointer flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'नवीन अलर्ट जोडा' : 'Add Alert'}</span>
          </button>
        </div>

        {/* Jam cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jamReports.map((report) => (
            <div
              key={report.id}
              className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 hover:border-orange-400 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      report.severity === 'gridlock'
                        ? 'bg-rose-600 text-white'
                        : report.severity === 'heavy'
                        ? 'bg-orange-500 text-white'
                        : 'bg-amber-500 text-stone-900'
                    }`}
                  >
                    {report.severity === 'gridlock'
                      ? 'पूर्ण चक्काजाम'
                      : report.severity === 'heavy'
                      ? 'जड ट्रॅफिक'
                      : 'हळूवार वाहतूक'}
                  </span>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {language === 'mr' ? report.locationMr : report.locationEn}
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{report.timestamp}</span>
                </span>
              </div>

              <p className="text-xs text-stone-700 dark:text-stone-300 font-medium mb-2">
                <strong>कारण:</strong> {language === 'mr' ? report.reasonMr : report.reasonEn}
              </p>

              <div className="text-[11px] p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300">
                <strong>सुचवलेला पर्यायी मार्ग:</strong>{' '}
                {language === 'mr' ? report.alternateRouteMr : report.alternateRouteEn}
              </div>

              <div className="mt-2 text-[10px] text-stone-400 text-right">
                नोंद: {report.reportedBy}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REPORT JAM MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-stone-900 border-2 border-rose-500 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {!reportSuccess ? (
              <form onSubmit={handleSubmitJamReport}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero">
                      {language === 'mr' ? 'ट्रॅफिक जाम नोंदवा (Report Jam)' : 'Report Traffic Congestion'}
                    </h3>
                    <p className="text-xs text-stone-500">पुणेकर बंधू-भगिनींना वेळेत सतर्क करा</p>
                  </div>
                </div>

                {/* Location Selection & GPS */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                      ठिकाण / चौक निवडा
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (pos) => {
                              const gpsText = `GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
                              setReportLocation(gpsText);
                              if (mapInstanceRef.current) {
                                mapInstanceRef.current.panTo({
                                  lat: pos.coords.latitude,
                                  lng: pos.coords.longitude,
                                });
                                mapInstanceRef.current.setZoom(16);
                              }
                            },
                            () => {
                              alert('कृपया ब्राऊझरमध्ये लोकेशनची परवानगी द्या.');
                            }
                          );
                        }
                      }}
                      className="text-[11px] font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>चालू GPS लोकेशन वापरा</span>
                    </button>
                  </div>
                  <select
                    value={reportLocation}
                    onChange={(e) => setReportLocation(e.target.value)}
                    className="w-full py-2 px-3 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value="University Circle / विद्यापीठ चौक">विद्यापीठ चौक / गणेशखिंड रोड</option>
                    <option value="Hinjawadi Phase 1 / हिंजवडी चौक">हिंजवडी फेज १ शिवाजी चौक</option>
                    <option value="Chandani Chowk / चांदणी चौक">चांदणी चौक / कोथरूड</option>
                    <option value="Swargate / स्वारगेट चौक">स्वारगेट बस स्थानक चौक</option>
                    <option value="Hadapsar Gadital / हडपसर गाडीतळ">हडपसर गाडीतळ चौक</option>
                    <option value="Senapati Bapat Road / सेनापती बापट रोड">सेनापती बापट रोड</option>
                    <option value="Deccan Gymkhana / डेक्कन">डेक्कन जिमखाना / संभाजी पूल</option>
                    <option value="Kharadi Bypass / खराडी बायपास">खराडी बायपास / नगर रोड</option>
                    <option value="Katraj Ghat / कात्रज घाट">कात्रज बोगदा / जुना घाट</option>
                    <option value="Bund Garden / बंडगार्डन पूल">बंडगार्डन पूल / येरवडा</option>
                  </select>
                </div>

                {/* Severity */}
                <div className="mb-3">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    ट्रॅफिकची तीव्रता (Severity)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setReportSeverity('slow')}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        reportSeverity === 'slow'
                          ? 'bg-amber-100 border-amber-500 text-amber-900'
                          : 'bg-stone-50 dark:bg-stone-800 border-stone-200 text-stone-600'
                      }`}
                    >
                      हळू वाहतूक
                    </button>
                    <button
                      type="button"
                      onClick={() => setReportSeverity('heavy')}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        reportSeverity === 'heavy'
                          ? 'bg-orange-100 border-orange-500 text-orange-900'
                          : 'bg-stone-50 dark:bg-stone-800 border-stone-200 text-stone-600'
                      }`}
                    >
                      जड जॅम (Heavy)
                    </button>
                    <button
                      type="button"
                      onClick={() => setReportSeverity('gridlock')}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        reportSeverity === 'gridlock'
                          ? 'bg-rose-100 border-rose-500 text-rose-900'
                          : 'bg-stone-50 dark:bg-stone-800 border-stone-200 text-stone-600'
                      }`}
                    >
                      चक्काजाम!
                    </button>
                  </div>
                </div>

                {/* Reason / Details */}
                <div className="mb-3">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    जामचे कारण / माहिती *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. मेट्रोचे काम सुरू आहे, अपघात झाला आहे, बस बंद पडली..."
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full py-2 px-3 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                {/* Alternate Route Suggestion */}
                <div className="mb-3">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    सुचवलेला पर्यायी मार्ग (पर्यायी रस्ता)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. सेनापती बापट रोडने जा, अंतर्गत गल्लीतून वळा..."
                    value={reportRoute}
                    onChange={(e) => setReportRoute(e.target.value)}
                    className="w-full py-2 px-3 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                {/* Reporter Name */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    आपले नाव (ऐच्छिक)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. सागर पाटील"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className="w-full py-2 px-3 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-100"
                  >
                    रद्द करा
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>रिपोर्ट सबमिट करा</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
                  धन्यवाद! ट्रॅफिक अलर्ट नोंदवला गेला!
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  तुमच्या रिपोर्टमुळे इतर पुणेकरांचा वेळ वाचण्यास मदत होईल.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
