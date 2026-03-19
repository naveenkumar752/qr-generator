"use client";

import { useState, useEffect } from "react";
import styles from "./QRControls.module.css";
import { QRType } from "@/utils/qr-handlers";
import { COLOR_PALETTES } from "@/utils/color-palettes";
import { Upload, X, Palette, Zap, Box, Square, Circle, Eye, EyeOff, Sparkles } from "lucide-react";

interface QRControlsProps {
  variant: 'content' | 'design';
  type: QRType;
  data: any;
  setData: (data: any) => void;
  options: any;
  setOptions: (options: any) => void;
}

export default function QRControls({ variant, type, data, setData, options, setOptions }: QRControlsProps) {
  const [activeDesignTab, setActiveDesignTab] = useState('Color');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    resetTheme();
  }, [type]);

  const handleDataChange = (field: string, value: any) => {
    setData({ ...data, [field]: value });
    if (variant === 'content') {
      resetTheme();
    }
  };

  const handleOptionChange = (group: string, field: string, value: any) => {
    setOptions({
      ...options,
      [group]: {
        ...options[group],
        [field]: value
      }
    });
  };

  const applyPalette = (palette: any) => {
    setOptions({
      ...options,
      dotsOptions: { 
        ...options.dotsOptions, 
        color: palette.fg,
        gradient: palette.gradientOpts ? palette.gradientOpts : undefined
      },
      backgroundOptions: { ...options.backgroundOptions, color: palette.bg },
      cornersSquareOptions: { ...options.cornersSquareOptions, color: palette.fg },
      cornersDotOptions: { ...options.cornersDotOptions, color: palette.fg }
    });
  };

  const resetTheme = () => {
    setOptions({
      ...options,
      dotsOptions: { 
        ...options.dotsOptions, 
        type: 'square',
        color: '#000000',
        gradient: undefined
      },
      backgroundOptions: { ...options.backgroundOptions, color: '#ffffff' },
      cornersSquareOptions: { 
        ...options.cornersSquareOptions, 
        type: 'square',
        color: '#000000'
      },
      cornersDotOptions: { 
        ...options.cornersDotOptions, 
        type: 'square',
        color: '#000000'
      },
      image: undefined,
      imageOptions: {
        ...options.imageOptions,
        hideBackgroundDots: true
      }
    });
  };

  const applySocialTheme = (platform: string) => {
    const baseOptions = {
      ...options,
      backgroundOptions: { ...options.backgroundOptions, color: '#ffffff' },
      imageOptions: {
        ...options.imageOptions,
        imageSize: 0.4,
        margin: 8,
        hideBackgroundDots: true
      }
    };

    switch (platform) {
      case 'instagram':
        const instaPalette = COLOR_PALETTES.find(p => p.id === 'instagram');
        setOptions({
          ...baseOptions,
          dotsOptions: { 
            ...options.dotsOptions, 
            type: 'extra-rounded',
            color: instaPalette?.fg || '#c13584',
            gradient: instaPalette?.gradientOpts
          },
          cornersSquareOptions: { type: 'extra-rounded', color: '#bc1888' },
          cornersDotOptions: { type: 'dot', color: '#dc2743' },
          image: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
          imageOptions: { ...baseOptions.imageOptions }
        });
        break;
      case 'twitter':
        setOptions({
          ...baseOptions,
          dotsOptions: { type: 'square', color: '#000000', gradient: undefined },
          cornersSquareOptions: { type: 'square', color: '#000000' },
          cornersDotOptions: { type: 'square', color: '#000000' },
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg',
          imageOptions: { ...baseOptions.imageOptions }
        });
        break;
      case 'linkedin':
        setOptions({
          ...baseOptions,
          dotsOptions: { type: 'rounded', color: '#0077b5', gradient: undefined },
          cornersSquareOptions: { type: 'extra-rounded', color: '#0077b5' },
          cornersDotOptions: { type: 'dot', color: '#0077b5' },
          image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg',
          imageOptions: { ...baseOptions.imageOptions }
        });
        break;
      case 'facebook':
        setOptions({
          ...baseOptions,
          dotsOptions: { type: 'rounded', color: '#1877F2', gradient: undefined },
          cornersSquareOptions: { type: 'extra-rounded', color: '#1877F2' },
          cornersDotOptions: { type: 'dot', color: '#1877F2' },
          image: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg',
          imageOptions: { ...baseOptions.imageOptions }
        });
        break;
      case 'github':
        setOptions({
          ...baseOptions,
          dotsOptions: { type: 'dots', color: '#181717', gradient: undefined },
          cornersSquareOptions: { type: 'extra-rounded', color: '#181717' },
          cornersDotOptions: { type: 'dot', color: '#181717' },
          image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
          imageOptions: { ...baseOptions.imageOptions }
        });
        break;
    }
  };

  if (variant === 'content') {
    const renderContentInputs = () => {
      switch (type) {
        case 'url':
          return (
            <div className={styles.inputStack}>
              <label>Website URL</label>
              <input type="text" placeholder="https://example.com" value={data.url || ''} onChange={(e) => handleDataChange('url', e.target.value)} />
            </div>
          );
        case 'text':
          return (
            <div className={styles.inputStack}>
              <label>Plain Text</label>
              <textarea placeholder="Type your text here..." value={data.text || ''} onChange={(e) => handleDataChange('text', e.target.value)} rows={4} />
            </div>
          );
        case 'email':
          return (
            <div className={styles.inputGroup}>
              <div className={styles.inputStack}>
                <label>Email Address</label>
                <input type="email" placeholder="example@email.com" value={data.email || ''} onChange={(e) => handleDataChange('email', e.target.value)} />
              </div>
              <div className={styles.inputStack}>
                <label>Subject</label>
                <input type="text" placeholder="Email Subject" value={data.subject || ''} onChange={(e) => handleDataChange('subject', e.target.value)} />
              </div>
              <div className={styles.inputStack}>
                <label>Message Body</label>
                <textarea placeholder="Email Body" value={data.body || ''} onChange={(e) => handleDataChange('body', e.target.value)} rows={3} />
              </div>
            </div>
          );
        case 'phone':
          return (
            <div className={styles.inputStack}>
              <label>Phone Number</label>
              <input type="tel" placeholder="+1 234 567 8900" value={data.phone || ''} onChange={(e) => handleDataChange('phone', e.target.value)} />
            </div>
          );
        case 'sms':
          return (
            <div className={styles.inputGroup}>
              <div className={styles.inputStack}>
                <label>Phone Number</label>
                <input type="tel" placeholder="+1 234 567 8900" value={data.phone || ''} onChange={(e) => handleDataChange('phone', e.target.value)} />
              </div>
              <div className={styles.inputStack}>
                <label>Message</label>
                <textarea placeholder="Type SMS message..." value={data.message || ''} onChange={(e) => handleDataChange('message', e.target.value)} rows={3} />
              </div>
            </div>
          );
        case 'wifi':
          return (
            <div className={styles.inputGroup}>
              <div className={styles.inputStack}>
                <label>Network Name (SSID)</label>
                <input type="text" placeholder="WiFi Network Name" value={data.ssid || ''} onChange={(e) => handleDataChange('ssid', e.target.value)} />
              </div>
              <div className={styles.inputStack}>
                <label>Password</label>
                <div className={styles.passwordWrapper}>
                  <input type={showPassword ? "text" : "password"} placeholder="WiFi Password" value={data.password || ''} onChange={(e) => handleDataChange('password', e.target.value)} />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className={styles.inputStack} style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" checked={data.hidden || false} onChange={(e) => handleDataChange('hidden', e.target.checked)} id="hidden-wifi" style={{ width: 'auto' }} />
                <label htmlFor="hidden-wifi" style={{ margin: 0 }}>Hidden Network</label>
              </div>
            </div>
          );
        case 'location':
          return (
            <div className={styles.inputGroup}>
              <div className={styles.row}>
                <div className={styles.inputStack}>
                  <label>Latitude</label>
                  <input type="text" placeholder="40.7128" value={data.lat || ''} onChange={(e) => handleDataChange('lat', e.target.value)} />
                </div>
                <div className={styles.inputStack}>
                  <label>Longitude</label>
                  <input type="text" placeholder="-74.0060" value={data.lng || ''} onChange={(e) => handleDataChange('lng', e.target.value)} />
                </div>
              </div>
            </div>
          );
        case 'vcard':
          return (
            <div className={styles.inputGroup} style={{ gap: '20px' }}>
              <div className={styles.row}>
                <div className={styles.inputStack}>
                  <label>First Name</label>
                  <input type="text" placeholder="John" value={data.firstName || ''} onChange={(e) => handleDataChange('firstName', e.target.value)} />
                </div>
                <div className={styles.inputStack}>
                  <label>Last Name</label>
                  <input type="text" placeholder="Doe" value={data.lastName || ''} onChange={(e) => handleDataChange('lastName', e.target.value)} />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputStack}>
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+1 234 567 8900" value={data.phone || ''} onChange={(e) => handleDataChange('phone', e.target.value)} />
                </div>
                <div className={styles.inputStack}>
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" value={data.email || ''} onChange={(e) => handleDataChange('email', e.target.value)} />
                </div>
              </div>
              <div className={styles.inputStack}>
                <label>Company / Organization</label>
                <input type="text" placeholder="Acme Inc." value={data.organization || ''} onChange={(e) => handleDataChange('organization', e.target.value)} />
              </div>
              <div className={styles.inputStack}>
                <label>Job Title</label>
                <input type="text" placeholder="Software Engineer" value={data.title || ''} onChange={(e) => handleDataChange('title', e.target.value)} />
              </div>
              <div className={styles.inputStack}>
                <label>Website</label>
                <input type="url" placeholder="https://example.com" value={data.website || ''} onChange={(e) => handleDataChange('website', e.target.value)} />
              </div>
            </div>
          );
        case 'event':
          return (
            <div className={styles.inputGroup}>
              <div className={styles.inputStack}>
                <label>Event Title</label>
                <input type="text" placeholder="Birthday Party" value={data.title || ''} onChange={(e) => handleDataChange('title', e.target.value)} />
              </div>
              <div className={styles.row}>
                <div className={styles.inputStack}>
                  <label>Start Time</label>
                  <input type="datetime-local" value={data.start || ''} onChange={(e) => handleDataChange('start', e.target.value)} />
                </div>
                <div className={styles.inputStack}>
                  <label>End Time</label>
                  <input type="datetime-local" value={data.end || ''} onChange={(e) => handleDataChange('end', e.target.value)} />
                </div>
              </div>
              <div className={styles.inputStack}>
                <label>Location</label>
                <input type="text" placeholder="123 Main St" value={data.location || ''} onChange={(e) => handleDataChange('location', e.target.value)} />
              </div>
              <div className={styles.inputStack}>
                <label>Description</label>
                <textarea placeholder="Event details..." value={data.description || ''} onChange={(e) => handleDataChange('description', e.target.value)} rows={3} />
              </div>
            </div>
          );
        case 'social':
          return (
            <div className={styles.inputGroup}>
              <div className={styles.inputStack}>
                <label>Platform</label>
                <select value={data.platform || 'instagram'} onChange={(e) => {
                  handleDataChange('platform', e.target.value);
                  resetTheme();
                }}>
                  <option value="instagram">Instagram</option>
                  <option value="twitter">X (Twitter)</option>
                  <option value="linkedin">LinkedIn (Username/Slug)</option>
                  <option value="facebook">Facebook</option>
                  <option value="github">GitHub</option>
                </select>
              </div>
              <div className={styles.inputStack}>
                <label>Username / Handle</label>
                <input type="text" placeholder="channelname (without @)" value={data.username || ''} onChange={(e) => handleDataChange('username', e.target.value)} />
              </div>
              <button 
                className={styles.magicBtn}
                data-platform={data.platform || 'instagram'}
                onClick={() => applySocialTheme(data.platform || 'instagram')}
              >
                <Sparkles size={16} />
                <span>Apply {data.platform ? data.platform.charAt(0).toUpperCase() + data.platform.slice(1) : 'Social'} Theme</span>
              </button>
            </div>
          );
        case 'crypto':
          return (
            <div className={styles.inputGroup}>
              <div className={styles.inputStack}>
                <label>Cryptocurrency</label>
                <select value={data.currency || 'bitcoin'} onChange={(e) => handleDataChange('currency', e.target.value)}>
                  <option value="bitcoin">Bitcoin (BTC)</option>
                  <option value="ethereum">Ethereum (ETH)</option>
                  <option value="solana">Solana (SOL)</option>
                </select>
              </div>
              <div className={styles.inputStack}>
                <label>Wallet Address</label>
                <input type="text" placeholder="Enter receive address" value={data.address || ''} onChange={(e) => handleDataChange('address', e.target.value)} />
              </div>
              <div className={styles.inputStack}>
                <label>Request Amount (Optional)</label>
                <input type="number" step="any" placeholder="0.00" value={data.amount || ''} onChange={(e) => handleDataChange('amount', e.target.value)} />
              </div>
            </div>
          );
      }
    };

    return (
      <div className={styles.container}>
        {renderContentInputs()}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.designTabs}>
        {[
          { id: 'Color', icon: Palette },
          { id: 'Shape', icon: Square },
          { id: 'Corners', icon: Box },
          { id: 'Logo', icon: Upload },
          { id: 'Level', icon: Zap }
        ].map((tab) => (
          <button 
            key={tab.id}
            className={`${styles.designTab} ${activeDesignTab === tab.id ? styles.designTabActive : ''}`}
            onClick={() => setActiveDesignTab(tab.id)}
          >
            <tab.icon size={16} />
            {tab.id}
          </button>
        ))}
      </div>

      <div className={styles.designContent}>
        {activeDesignTab === 'Color' && (
          <div className={styles.colorSection}>
            <div className={styles.sectionTitle}>Premium Palettes</div>
            <div className={styles.paletteGrid}>
              {COLOR_PALETTES.map((p) => (
                <button 
                  key={p.id} 
                  className={styles.paletteLabel}
                  onClick={() => applyPalette(p)}
                >
                  <div className={styles.palettePreview} style={{ background: p.fg }}>
                    <div className={styles.paletteSubPreview} style={{ background: p.bg }}></div>
                  </div>
                  <span>{p.name}</span>
                </button>
              ))}
            </div>

            <div className={styles.sectionTitle}>Custom Colors</div>
            <div className={styles.colorConfig}>
              <div className={styles.colorInput}>
                <label>Foreground</label>
                <div className={styles.pickerWrapper}>
                  <input type="color" value={options.dotsOptions.color} onChange={(e) => handleOptionChange('dotsOptions', 'color', e.target.value)} />
                  <input type="text" value={options.dotsOptions.color} readOnly />
                </div>
              </div>
              <div className={styles.colorInput}>
                <label>Background</label>
                <div className={styles.pickerWrapper}>
                  <input type="color" value={options.backgroundOptions.color} onChange={(e) => handleOptionChange('backgroundOptions', 'color', e.target.value)} />
                  <input type="text" value={options.backgroundOptions.color} readOnly />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeDesignTab === 'Shape' && (
          <div className={styles.optionsGrid}>
            {[
              { id: 'square', label: 'Square' },
              { id: 'rounded', label: 'Rounded' },
              { id: 'extra-rounded', label: 'Smooth' },
              { id: 'dots', label: 'Dots' },
              { id: 'classy', label: 'Classy' },
              { id: 'classy-rounded', label: 'Modern' },
            ].map((shape) => (
              <button 
                key={shape.id} 
                className={`${styles.optionBtn} ${options.dotsOptions.type === shape.id ? styles.optionActive : ''}`}
                onClick={() => handleOptionChange('dotsOptions', 'type', shape.id)}
              >
                <div className={styles.shapeIcon} data-shape={shape.id}></div>
                <span>{shape.label}</span>
              </button>
            ))}
          </div>
        )}

        {activeDesignTab === 'Corners' && (
          <div className={styles.cornersConfig}>
            <div className={styles.sectionTitle}>Corner Square</div>
            <div className={styles.optionsGrid}>
              {[
                { id: 'square', label: 'Square' },
                { id: 'dot', label: 'Dot' },
                { id: 'extra-rounded', label: 'Rounded' },
              ].map((c) => (
                <button 
                  key={c.id} 
                  className={`${styles.optionBtn} ${options.cornersSquareOptions.type === c.id ? styles.optionActive : ''}`}
                  onClick={() => handleOptionChange('cornersSquareOptions', 'type', c.id)}
                >
                   <div className={styles.cornerIcon} data-type={c.id}></div>
                   <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeDesignTab === 'Logo' && (
          <div className={styles.uploadArea}>
            <label className={styles.uploadBtn}>
              <Upload size={24} />
              <span>Upload Custom Logo</span>
              <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (re) => setOptions({ ...options, image: re.target?.result });
                  reader.readAsDataURL(file);
                }
              }} hidden />
            </label>
            <p className={styles.hint}>Supported formats: PNG, JPG, SVG. Max 2MB.</p>

            {options.imageOptions?.image && (
              <div style={{ width: '100%', marginTop: '20px' }}>
                <div className={styles.inputStack}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label>Logo Size</label>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {Math.round((options.imageOptions?.imageSize || 0.4) * 100)}%
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1.5" 
                    step="0.1"
                    value={options.imageOptions?.imageSize || 0.4} 
                    onChange={(e) => handleOptionChange('imageOptions', 'imageSize', parseFloat(e.target.value))}
                    style={{ width: '100%' }}
                  />
                  <p className={styles.hint} style={{ marginTop: '4px' }}>Adjusting too large may affect readability.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeDesignTab === 'Level' && (
          <div className={styles.optionsGrid}>
            {[
              { id: 'L', label: 'Low (7%)' },
              { id: 'M', label: 'Medium (15%)' },
              { id: 'Q', label: 'Quartile (25%)' },
              { id: 'H', label: 'High (30%)' },
            ].map((level) => (
              <button 
                key={level.id} 
                className={`${styles.optionBtn} ${options.qrOptions.errorCorrectionLevel === level.id ? styles.optionActive : ''}`}
                onClick={() => handleOptionChange('qrOptions', 'errorCorrectionLevel', level.id)}
              >
                <div className={styles.levelIcon}>{level.id}</div>
                <span>{level.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
