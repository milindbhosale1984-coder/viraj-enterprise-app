let mapsPromise: Promise<void> | null = null;

export const GOOGLE_MAPS_API_KEY = 'AIzaSyCPeOUJrAzzIZLOcyCmsktOpdTR7gNm6Rk';

export function loadGoogleMapsScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  // Already loaded
  if ((window as any).google && (window as any).google.maps) {
    return Promise.resolve();
  }

  if (mapsPromise) {
    return mapsPromise;
  }

  mapsPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = (error) => {
      console.error('Error loading Google Maps API:', error);
      reject(error);
    };

    document.head.appendChild(script);
  });

  return mapsPromise;
}
