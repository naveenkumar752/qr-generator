"use client";

import Link from "next/link";
import { QrCode } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <QrCode size={24} />
          </div>
          <span className={styles.logoText}>Smart QR</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLinkActive}>Generator</Link>
          <Link href="#" className={styles.navLink}>Templates</Link>
          <Link href="#" className={styles.navLink}>Pricing</Link>
          <Link href="#" className={styles.navLink}>About</Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.ctaBtn}>Get Started</button>
        </div>
      </div>
    </header>
  );
}
