import styles from "./Footer.module.css";
import { Github, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <p className={styles.copy}>
            Developed with <Heart size={14} className={styles.heart} /> by <strong>Naveen Kumar</strong>
          </p>
        </div>
        <div className={styles.socials}>
          <a 
            href="https://github.com/naveenkumar752" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/naveenkumar752/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
