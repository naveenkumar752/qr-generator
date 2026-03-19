export type QRType = 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'vcard' | 'event' | 'social' | 'crypto';

export interface WIFIConfig {
  ssid: string;
  password?: string;
  hidden: boolean;
}

export interface SMSConfig {
  phone: string;
  message: string;
}

export interface EmailConfig {
  email: string;
  subject?: string;
  body?: string;
}

export interface LocationConfig {
  lat: string;
  lng: string;
}

export interface VCardConfig {
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  phone: string;
  email: string;
  website?: string;
}

export interface EventConfig {
  title: string;
  start: string; // YYYYMMDDTHHMMSSZ
  end: string;
  location?: string;
  description?: string;
}

export interface SocialConfig {
  platform: 'instagram' | 'twitter' | 'linkedin' | 'facebook' | 'github';
  username: string;
}

export interface CryptoConfig {
  currency: 'bitcoin' | 'ethereum' | 'solana';
  address: string;
  amount?: string;
}

export const formatQRData = (type: QRType, data: any): string => {
  switch (type) {
    case 'url':
      return data.url || '';
    case 'text':
      return data.text || '';
    case 'email':
      const { email, subject, body } = data as EmailConfig;
      return `mailto:${email}?subject=${encodeURIComponent(subject || '')}&body=${encodeURIComponent(body || '')}`;
    case 'phone':
      return `tel:${data.phone}`;
    case 'sms':
      const { phone, message } = data as SMSConfig;
      return `sms:${phone}:${message}`;
    case 'wifi':
      const { ssid, password, hidden } = data as WIFIConfig;
      return `WIFI:T:WPA;S:${ssid};P:${password || ''};H:${hidden ? 'true' : 'false'};;`;
    case 'location':
      const { lat, lng } = data as LocationConfig;
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    case 'vcard':
      const vcard = data as VCardConfig;
      return `BEGIN:VCARD\nVERSION:3.0\nN:${vcard.lastName};${vcard.firstName};;;\nFN:${vcard.firstName} ${vcard.lastName}\nORG:${vcard.organization || ''}\nTITLE:${vcard.title || ''}\nTEL;TYPE=WORK,VOICE:${vcard.phone}\nEMAIL;TYPE=PREF,INTERNET:${vcard.email}\nURL:${vcard.website || ''}\nEND:VCARD`;
    case 'event':
      const event = data as EventConfig;
      return `BEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:${event.start?.replace(/[-:]/g, '') || ''}\nDTEND:${event.end?.replace(/[-:]/g, '') || ''}\nLOCATION:${event.location || ''}\nDESCRIPTION:${event.description || ''}\nEND:VEVENT`;
    case 'social':
      const social = data as SocialConfig;
      const platformKey = social.platform || 'instagram';
      const platforms: Record<string, string> = {
        instagram: 'https://instagram.com/',
        twitter: 'https://twitter.com/',
        linkedin: 'https://linkedin.com/in/',
        facebook: 'https://facebook.com/',
        github: 'https://github.com/'
      };
      return social.username ? `${platforms[platformKey]}${social.username}` : '';
    case 'crypto':
      const crypto = data as CryptoConfig;
      const prefixes: Record<string, string> = {
        bitcoin: 'bitcoin:',
        ethereum: 'ethereum:',
        solana: 'solana:'
      };
      const amountParam = crypto.amount ? `?amount=${crypto.amount}` : '';
      return `${prefixes[crypto.currency] || ''}${crypto.address}${amountParam}`;
    default:
      return '';
  }
};
