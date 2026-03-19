"use client";

import { useState, useEffect, useCallback } from "react";
import QRCodeStyling, {
  Options,
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType
} from "qr-code-styling";

export const useQRCode = (options: Options) => {
  const [qrCode, setQrCode] = useState<QRCodeStyling>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const qr = new QRCodeStyling(options);
      setQrCode(qr);
    }
  }, []);

  useEffect(() => {
    if (qrCode) {
      qrCode.update(options);
    }
  }, [qrCode, options]);

  const download = useCallback((extension: 'png' | 'jpeg' | 'webp' | 'svg') => {
    if (qrCode) {
      qrCode.download({ extension });
    }
  }, [qrCode]);

  return { qrCode, download };
};
