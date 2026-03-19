"use client";

import { useRef, useEffect, useState } from "react";
import { useQRCode } from "@/hooks/useQRCode";
import { exportToPDF } from "@/utils/export-utils";
import { Download, ChevronDown, FileJson, ImageIcon as ImageFile, Type as SvgIcon } from "lucide-react";
import styles from "./QRPreview.module.css";

interface QRPreviewProps {
  options: any;
  logo: string | null;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function QRPreview({ options, logo, onLogoUpload }: QRPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { qrCode, download } = useQRCode(options);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (containerRef.current && qrCode) {
      containerRef.current.innerHTML = "";
      qrCode.append(containerRef.current);
    }
  }, [qrCode, options]);

  const handleDownload = (type: 'png' | 'jpeg' | 'svg' | 'pdf') => {
    if (type === 'pdf') {
      exportToPDF("qr-container", "my-qrcode.pdf");
    } else {
      download(type);
    }
    setShowMenu(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.qrCard}>
        <div id="qr-container" ref={containerRef} className={styles.qrWrapper}></div>
      </div>
      
      <div className={styles.downloadWrapper}>
        <button 
          className={styles.downloadBtn}
          onClick={() => setShowMenu(!showMenu)}
        >
          <span>Download QR</span>
          <ChevronDown size={20} className={showMenu ? styles.rotate : ''} />
        </button>

        {showMenu && (
          <div className={styles.dropdown}>
            <button onClick={() => handleDownload('png')}>
              <ImageFile size={18} />
              <span>PNG Image</span>
            </button>
            <button onClick={() => handleDownload('jpeg')}>
              <ImageFile size={18} />
              <span>JPEG Image</span>
            </button>
            <button onClick={() => handleDownload('svg')}>
              <SvgIcon size={18} />
              <span>SVG Vector</span>
            </button>
            <button onClick={() => handleDownload('pdf')}>
              <Download size={18} />
              <span>PDF Document</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
