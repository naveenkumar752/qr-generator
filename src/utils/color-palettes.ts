export interface ColorPalette {
  id: string;
  name: string;
  fg: string;
  bg: string;
  primary: string;
  gradientOpts?: {
    type: 'linear' | 'radial';
    rotation: number;
    colorStops: { offset: number; color: string }[];
  };
}

export const COLOR_PALETTES: ColorPalette[] = [
  { id: 'classic', name: 'Classic Black', fg: '#000000', bg: '#ffffff', primary: '#000000' },
  { id: 'ocean', name: 'Deep Ocean', fg: '#1e3a8a', bg: '#eff6ff', primary: '#3b82f6' },
  { id: 'emerald', name: 'Emerald City', fg: '#064e3b', bg: '#ecfdf5', primary: '#10b981' },
  { id: 'sunset', name: 'Sunset Glow', fg: '#7c2d12', bg: '#fff7ed', primary: '#f97316' },
  { id: 'royal', name: 'Royal Gold', fg: '#451a03', bg: '#fffbeb', primary: '#d97706' },
  { id: 'neon', name: 'Neon Night', fg: '#ec4899', bg: '#0f172a', primary: '#f472b6' },
  { 
    id: 'cyber', name: 'Cyberpunk', fg: '#8b5cf6', bg: '#0f172a', primary: '#ec4899',
    gradientOpts: {
      type: 'linear', rotation: 45,
      colorStops: [{ offset: 0, color: '#ec4899' }, { offset: 1, color: '#8b5cf6' }]
    }
  },
  { 
    id: 'fire', name: 'Fireball', fg: '#ef4444', bg: '#ffffff', primary: '#f97316',
    gradientOpts: {
      type: 'radial', rotation: 0,
      colorStops: [{ offset: 0, color: '#f97316' }, { offset: 1, color: '#ef4444' }]
    }
  },
  { 
    id: 'peacock', name: 'Peacock', fg: '#0ea5e9', bg: '#ffffff', primary: '#10b981',
    gradientOpts: {
      type: 'linear', rotation: 90,
      colorStops: [{ offset: 0, color: '#10b981' }, { offset: 1, color: '#0ea5e9' }]
    }
  },
  {
    id: 'instagram', name: 'Instagram', fg: '#c13584', bg: '#ffffff', primary: '#e1306c',
    gradientOpts: {
      type: 'linear', rotation: 45,
      colorStops: [
        { offset: 0, color: '#f09433' },
        { offset: 0.25, color: '#e6683c' },
        { offset: 0.5, color: '#dc2743' },
        { offset: 0.75, color: '#cc2366' },
        { offset: 1, color: '#bc1888' }
      ]
    }
  },
];
