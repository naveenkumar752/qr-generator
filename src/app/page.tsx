"use client";

import { useState, useMemo } from "react";
import { Link, FileText, Mail, Phone, MessageSquare, Wifi, MapPin, Contact, CalendarDays, Share2, Bitcoin } from "lucide-react";
import Tabs from "@/components/ui/Tabs";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import QRPreview from "@/components/generator/QRPreview";
import QRControls from "@/components/generator/QRControls";
import { QRType, formatQRData } from "@/utils/qr-handlers";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import styles from "./page.module.css";
import { Options } from "qr-code-styling";

const MAIN_TABS = [
  { id: "url", label: "Website", icon: Link },
  { id: "text", label: "Text", icon: FileText },
  { id: "email", label: "Email", icon: Mail },
  { id: "phone", label: "Phone", icon: Phone },
  { id: "sms", label: "SMS", icon: MessageSquare },
];

const MORE_TABS = [
  { id: "vcard", label: "vCard", icon: Contact },
  { id: "event", label: "Event", icon: CalendarDays },
  { id: "social", label: "Socials", icon: Share2 },
  { id: "crypto", label: "Crypto", icon: Bitcoin },
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "location", label: "Location", icon: MapPin },
];

/* ✅ DEFAULT STRUCTURE FOR EACH QR TYPE */
const DEFAULT_QR_DATA: Record<QRType, any> = {
  url: { url: "" },
  text: { text: "" },
  email: { email: "", subject: "", body: "" },
  phone: { phone: "" },
  sms: { phone: "", message: "" },
  wifi: { ssid: "", password: "", hidden: false },
  location: { lat: "", lng: "" },
  vcard: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organization: "",
    title: "",
    website: "",
  },
  event: {
    title: "",
    start: "",
    end: "",
    location: "",
    description: "",
  },
  social: {
    platform: "instagram",
    username: "",
  },
  crypto: {
    currency: "bitcoin",
    address: "",
    amount: "",
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<QRType>("url");
  const [qrData, setQrData] = useState<any>(DEFAULT_QR_DATA.url);
  const [logo, setLogo] = useState<string | null>(null);

  const [options, setOptions] = useLocalStorage<Options>("smart-qr-design", {
    width: 180,
    height: 180,
    type: "svg",
    data: "",
    margin: 10,
    qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "Q" },
    imageOptions: { hideBackgroundDots: true, imageSize: 1, margin: 5 },
    dotsOptions: { color: "#000000", type: "square" },
    backgroundOptions: { color: "#ffffff" },
    cornersSquareOptions: { color: "#000000", type: "square" },
    cornersDotOptions: { color: "#000000", type: "square" },
  });

  const finalOptions = useMemo(() => {
    const qrString = formatQRData(activeTab, qrData);

    return {
      ...options,
      data: qrString || "Smart QR",
      image: options.image || logo || "",
    };
  }, [options, activeTab, qrData, logo]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        setLogo(readerEvent.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.topContainer}>
        <Tabs
          tabs={MAIN_TABS}
          moreTabs={MORE_TABS}
          activeTab={activeTab}
          onChange={(id) => {
            const newTab = id as QRType;

            setActiveTab(newTab);

            /* ✅ Reset with correct data structure */
            setQrData(DEFAULT_QR_DATA[newTab]);
          }}
        />
      </div>

      <div className={styles.layoutGrid}>
        <div className="step-container">
          <section className="section-card">
            <div className="step-header">
              <span className="step-badge">1</span>
              <h2>Complete the content</h2>
            </div>

            <QRControls
              variant="content"
              type={activeTab}
              data={qrData}
              setData={setQrData}
              options={options}
              setOptions={setOptions}
            />
          </section>

          <section className="section-card">
            <div className="step-header">
              <span className="step-badge">2</span>
              <h2>Design your QR</h2>
            </div>

            <QRControls
              variant="design"
              type={activeTab}
              data={qrData}
              setData={setQrData}
              options={options}
              setOptions={setOptions}
            />
          </section>
        </div>

        <div className={styles.previewColumn}>
          <div className={styles.previewSticky}>
            <div className={styles.previewHeader}>
              <span className="step-badge">3</span>
              <h2>Download your QR</h2>
            </div>

            <QRPreview
              options={finalOptions}
              logo={logo}
              onLogoUpload={handleLogoUpload}
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}