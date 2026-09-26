export interface SocialLinksConfig {
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappUrl?: string;
  instagramUrl: string;
  facebookUrl: string;
}

export const DEFAULT_SOCIAL_LINKS: SocialLinksConfig = {
  whatsappNumber: '9021745403',
  whatsappMessage: 'Namaste Viraj Enterprise Pune AI Agent',
  instagramUrl: 'https://instagram.com/virajenterprise.pune',
  facebookUrl: 'https://facebook.com/virajenterprise',
};

export const VIRAJ_ENTERPRISE_INFO = {
  name: 'VIRAJ ENTERPRISE',
  brand: 'VE VIRAJ ENTERPRISE PUNE',
  owner: 'Milind Bhosale',
  phone: '9021745403',
  whatsapp: '9172523188',
  email: 'milindbhosale1984@gmail.com',
  address: 'Bhekrai Nagar, Fursungi, Tal Haveli, Dist Pune - 412308',
  city: 'Pune',
  upiId: '9021745403@upi',
  tagline: 'Pune AI Agent • by Viraj Enterprise',
};

// Retrieve configurable social links with localStorage sync
export function getSocialLinks(): SocialLinksConfig {
  try {
    const saved = localStorage.getItem('ve_social_links');
    if (saved) {
      return { ...DEFAULT_SOCIAL_LINKS, ...JSON.parse(saved) };
    }
  } catch {}
  return DEFAULT_SOCIAL_LINKS;
}

export function saveSocialLinks(links: Partial<SocialLinksConfig>): void {
  try {
    const current = getSocialLinks();
    const updated = { ...current, ...links };
    localStorage.setItem('ve_social_links', JSON.stringify(updated));
  } catch {}
}
