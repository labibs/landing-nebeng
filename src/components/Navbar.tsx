"use client";

import { motion } from "framer-motion";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.logo}>Numpak</div>
      <div className={styles.links}>
        <a href="#features">Fitur</a>
        <a href="#safety">Keamanan</a>
        <button className={styles.navButton}>Download</button>
      </div>
    </motion.nav>
  );
}
