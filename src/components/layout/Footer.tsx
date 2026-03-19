"use client";

import Link from "next/link";
import { QrCode, Twitter, Github, Linkedin } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <QrCode size={20} />
              </div>
              <span className={styles.logoText}>Smart QR</span>
            </div>
            <p className={styles.description}>
              The world's most advanced QR code generator. Built for professionals and businesses.
            </p>
            <div className={styles.social}>
              <Link href="#"><Twitter size={20} /></Link>
              <Link href="#"><Github size={20} /></Link>
              <Link href="#"><Linkedin size={20} /></Link>
            </div>
          </div>

          <div className={styles.column}>
            <h3>Product</h3>
            <Link href="#">Generator</Link>
            <Link href="#">Templates</Link>
            <Link href="#">Analytics</Link>
            <Link href="#">API Documentation</Link>
          </div>

          <div className={styles.column}>
            <h3>Company</h3>
            <Link href="#">About Us</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>

          <div className={styles.column}>
            <h3>Help</h3>
            <Link href="#">FAQs</Link>
            <Link href="#">Support Center</Link>
            <Link href="#">Refund Policy</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 Smart QR Generator. All rights reserved.</p>
          <div className={styles.status}>
            <span className={styles.statusDot}></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
