import styles from "./Header.module.css";
import { QrCode, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logoWrapper}>
            <QrCode className={styles.logoIcon} size={32} />
          </div>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>Aura QR</h1>
            <div className={styles.badge}>
              <Sparkles size={12} className={styles.badgeIcon} />
              <span>Premium</span>
            </div>
          </div>
        </div>
        <p className={styles.tagline}>
          Create modern, professional QR codes in seconds.
        </p>
      </div>
    </header>
  );
}
