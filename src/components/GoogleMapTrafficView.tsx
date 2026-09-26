import React, { useEffect, useRef, useState } from 'react';
import { PlaceItem } from '../types';
import { Language, translations } from '../data/translations';
import { loadGoogleMapsScript } from '../utils/googleMapsLoader';
import {
  Layers,
  MapPin,
  Compass,
  Maximize2,
  Minimize2,
  Navigation,
  Phone,
  Tag,
  Star,
  ExternalLink,
  Car,
  Clock,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

interface GoogleMapTrafficViewProps {
  places: PlaceItem[];
  language: Language;
  selectedPlace?: PlaceItem | null;
  onSelectPlace?: (place: PlaceItem) => void;
  fullScreenMode?: boolean;
  onToggleFullScreen?: () => void;
}

export const GoogleMapTrafficView: React.FC<GoogleMapTrafficViewProps> = ({
  places,
  language,
  selectedPlace,
  onSelectPlace,
  fullScreenMode = false,
  onToggleFullScreen,
}) => {
  const t = translations[language];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const trafficLayerRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [trafficEnabled, setTrafficEnabled] = useState(true);
  const [activeMarkerPlace, setActiveMarkerPlace] = useState<PlaceItem | null>(selectedPlace || null);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  // Initialize Map
  useEffect(() => {
    let isMounted = true;

    loadGoogleMapsScript()
      .then(() => {
        if (!isMounted || !mapContainerRef.current) return;
        const google = (window as any).google;
        if (!google || !google.maps) return;

        // Central Pune default center (Deccan / Shaniwar Wada area)
        const initialCenter = selectedPlace?.lat && selectedPlace?.lng
          ? { lat: selectedPlace.lat, lng: selectedPlace.lng }
          : { lat: 18.5204, lng: 73.8567 };

        const map = new google.maps.Map(mapContainerRef.current, {
          center: initialCenter,
          zoom: selectedPlace ? 15 : 13,
          mapTypeId: mapType,
          disableDefaultUI: false,
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

        // Traffic Layer
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayerRef.current = trafficLayer;
        if (trafficEnabled) {
          trafficLayer.setMap(map);
        }

        setMapLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load Google Maps:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Update Markers when places or active place change
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;
    const google = (window as any).google;
    if (!google) return;

    // Clear old markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const bounds = new google.maps.LatLngBounds();
    let hasCoords = false;

    places.forEach((place) => {
      if (place.lat && place.lng) {
        hasCoords = true;
        const pos = { lat: place.lat, lng: place.lng };
        bounds.extend(pos);

        const isSelected = activeMarkerPlace?.id === place.id;

        // Distinct category marker colors
        const pinColor =
          place.categoryId === 'mandir'
            ? '#ea580c' // Orange
            : place.categoryId === 'hotels'
            ? '#d97706' // Amber
            : place.categoryId === 'hospitals'
            ? '#059669' // Emerald
            : place.categoryId === 'sarkari'
            ? '#ca8a04' // Yellow-gold
            : place.categoryId === 'cars'
            ? '#0284c7' // Sky blue
            : place.categoryId === 'emergency'
            ? '#dc2626' // Rose red
            : '#7c3aed'; // Purple for shops/schools

        const marker = new google.maps.Marker({
          position: pos,
          map: mapInstanceRef.current,
          title: language === 'mr' ? place.nameMr : place.name,
          animation: isSelected ? google.maps.Animation.BOUNCE : undefined,
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: isSelected ? 6.5 : 5,
            fillColor: pinColor,
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        marker.addListener('click', () => {
          setActiveMarkerPlace(place);
          if (onSelectPlace) onSelectPlace(place);
          mapInstanceRef.current.panTo(pos);
          mapInstanceRef.current.setZoom(15);
        });

        markersRef.current.push(marker);
      }
    });

    // If a place was pre-selected, focus on it
    if (selectedPlace?.lat && selectedPlace?.lng) {
      mapInstanceRef.current.panTo({ lat: selectedPlace.lat, lng: selectedPlace.lng });
      mapInstanceRef.current.setZoom(16);
      setActiveMarkerPlace(selectedPlace);
    } else if (hasCoords && places.length > 1) {
      // Fit all pins
      mapInstanceRef.current.fitBounds(bounds, 50);
    }
  }, [mapLoaded, places, selectedPlace, language]);

  // Toggle Traffic Layer
  const handleToggleTraffic = () => {
    if (!trafficLayerRef.current || !mapInstanceRef.current) return;
    if (trafficEnabled) {
      trafficLayerRef.current.setMap(null);
      setTrafficEnabled(false);
    } else {
      trafficLayerRef.current.setMap(mapInstanceRef.current);
      setTrafficEnabled(true);
    }
  };

  // Toggle Map Type
  const handleToggleMapType = () => {
    if (!mapInstanceRef.current) return;
    const nextType = mapType === 'roadmap' ? 'satellite' : 'roadmap';
    mapInstanceRef.current.setMapTypeId(nextType);
    setMapType(nextType);
  };

  // Reset Center to Pune Center (18.5204, 73.8567)
  const handleResetCenter = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.panTo({ lat: 18.5204, lng: 73.8567 });
    mapInstanceRef.current.setZoom(13);
  };

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border-2 border-orange-400 dark:border-stone-800 shadow-xl bg-stone-100 dark:bg-stone-900 transition-all ${
        fullScreenMode
          ? 'fixed inset-0 z-50 rounded-none border-0 h-screen w-screen'
          : 'h-[540px] sm:h-[620px]'
      }`}
    >
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Loading Skeleton */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-stone-100 dark:bg-stone-900 flex flex-col items-center justify-center p-6 text-center z-10">
          <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mb-4" />
          <h4 className="text-base font-bold text-stone-800 dark:text-stone-200">
            {language === 'mr' ? 'गुगल मॅप्स व थेट वाहतूक लोड होत आहे...' : 'Loading Google Maps & Live Pune Traffic...'}
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm">
            {language === 'mr'
              ? 'पुण्यातील सर्व प्रमुख ठिकाणे, सिग्नल व ट्रॅफिक लेयरसह थेट स्क्रीनवर दिसत आहेत.'
              : 'Streaming live Pune traffic congestion layer and verified GPS coordinates.'}
          </p>
        </div>
      )}

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Title Badge */}
        <div className="pointer-events-auto bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-orange-300 dark:border-stone-700 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100 font-devanagari-hero">
                {language === 'mr' ? 'थेट गुगल मॅप व ट्रॅफिक' : 'Live Google Map & Traffic'}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
                {places.length} Pins
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Traffic Toggle Button */}
          <button
            onClick={handleToggleTraffic}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
              trafficEnabled
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 ring-2 ring-emerald-400/40'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
            }`}
            title="Toggle Live Traffic Congestion"
          >
            <Car className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {language === 'mr' ? 'ट्रॅफिक लेयर' : 'Traffic Layer'}:
            </span>
            <span>{trafficEnabled ? (language === 'mr' ? 'चालू' : 'ON') : (language === 'mr' ? 'बंद' : 'OFF')}</span>
          </button>

          {/* Satellite Toggle */}
          <button
            onClick={handleToggleMapType}
            className="p-2 rounded-xl bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 shadow-md border border-stone-200 dark:border-stone-700"
            title="Switch Satellite / Terrain"
          >
            <Layers className="w-4 h-4 text-orange-600" />
          </button>

          {/* Reset Center */}
          <button
            onClick={handleResetCenter}
            className="p-2 rounded-xl bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 shadow-md border border-stone-200 dark:border-stone-700"
            title="Reset to Central Pune"
          >
            <RotateCcw className="w-4 h-4 text-emerald-600" />
          </button>

          {/* Full Screen Toggle */}
          {onToggleFullScreen && (
            <button
              onClick={onToggleFullScreen}
              className="p-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white shadow-md transition-colors"
              title={fullScreenMode ? 'Exit Full Screen' : 'Full Screen Traffic Map'}
            >
              {fullScreenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Traffic Legend Pill */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-auto bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-md hidden sm:flex items-center gap-3 text-[11px] font-semibold">
        <span className="text-stone-500 dark:text-stone-400">पुणे वाहतूक:</span>
        <span className="flex items-center gap-1 text-emerald-600">
          <span className="w-2.5 h-1 bg-emerald-500 rounded-full" /> मोकळा (Fast)
        </span>
        <span className="flex items-center gap-1 text-amber-500">
          <span className="w-2.5 h-1 bg-amber-500 rounded-full" /> संथ (Medium)
        </span>
        <span className="flex items-center gap-1 text-rose-600">
          <span className="w-2.5 h-1 bg-rose-600 rounded-full" /> जाम (Congested)
        </span>
      </div>

      {/* Active Selected Place Card Overlay */}
      {activeMarkerPlace && (
        <div className="absolute bottom-4 right-4 z-20 pointer-events-auto max-w-sm w-[90vw] sm:w-80 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl border-2 border-orange-500/80 shadow-2xl p-3.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
              {language === 'mr' ? activeMarkerPlace.areaMr : activeMarkerPlace.area}
            </span>
            <button
              onClick={() => setActiveMarkerPlace(null)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs px-1"
            >
              ✕
            </button>
          </div>

          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
            {language === 'mr' ? activeMarkerPlace.nameMr : activeMarkerPlace.name}
          </h4>

          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mb-2">
            {language === 'mr' ? activeMarkerPlace.addressMr : activeMarkerPlace.address}
          </p>

          {/* Timings & Price */}
          <div className="text-[11px] text-stone-600 dark:text-stone-300 space-y-1 mb-3 bg-stone-50 dark:bg-stone-800/80 p-2 rounded-lg border border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="truncate">
                {language === 'mr' ? activeMarkerPlace.openingHoursMr : activeMarkerPlace.openingHours}
              </span>
            </div>
            {activeMarkerPlace.price && (
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
                <Tag className="w-3 h-3 shrink-0" />
                <span className="truncate">{activeMarkerPlace.price}</span>
              </div>
            )}
          </div>

          {/* Action Buttons: Direction, Call, Share */}
          <div className="grid grid-cols-3 gap-1.5">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${
                activeMarkerPlace.lat && activeMarkerPlace.lng
                  ? `${activeMarkerPlace.lat},${activeMarkerPlace.lng}`
                  : encodeURIComponent(activeMarkerPlace.mapQuery)
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 py-1.5 px-2 text-[11px] font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-xs"
              title="Google Maps Direction"
            >
              <Navigation className="w-3 h-3" />
              <span>{t.directions}</span>
            </a>

            <a
              href={`tel:${activeMarkerPlace.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-1 py-1.5 px-2 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 rounded-lg shadow-xs"
              title="Call Phone"
            >
              <Phone className="w-3 h-3" />
              <span>{t.callNow}</span>
            </a>

            <button
              onClick={() => {
                const shareData = {
                  title: activeMarkerPlace.name,
                  text: `${activeMarkerPlace.name} (${activeMarkerPlace.nameMr}) - ${activeMarkerPlace.address}`,
                  url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    activeMarkerPlace.mapQuery
                  )}`,
                };
                if (navigator.share) {
                  navigator.share(shareData).catch(() => {});
                } else {
                  navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
                  alert(
                    language === 'mr'
                      ? 'ठिकाणाची माहिती व लिंक कॉपी झाली!'
                      : 'Place info & Google Map link copied to clipboard!'
                  );
                }
              }}
              className="flex items-center justify-center gap-1 py-1.5 px-2 text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 rounded-lg shadow-xs cursor-pointer"
              title="Share Place"
            >
              <ExternalLink className="w-3 h-3" />
              <span>{language === 'mr' ? 'शेअर' : 'Share'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
