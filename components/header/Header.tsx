"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Header.module.scss";
import HeaderLogo from "@/shared/img/header-logo.png";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/calendar", label: "Calendar" },
    { href: "/habits", label: "Habits" },
    { href: "/nutrition", label: "Nutrition" },
    { href: "/shop", label: "Products" },
    { href: "/profile", label: "Profile" },
    { href: "/goal", label: "Goal" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={HeaderLogo} alt="Calorifyx logo" width={40} height={40} />
        <span>Calorifyx</span>
      </div>

      <nav className={styles.desktopNav}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${
              pathname === link.href ? styles.active : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button className={styles.burger} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {isOpen && (
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
