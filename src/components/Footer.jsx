import React from "react";

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
  ) },
  { href: "https://twitter.com", label: "Twitter", icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03A12.94 12.94 0 0 1 3.11.67a4.52 4.52 0 0 0 1.4 6.04A4.48 4.48 0 0 1 2.8 6.1v.06c0 2.18 1.55 4 3.62 4.42a4.52 4.52 0 0 1-2.04.08c.58 1.81 2.26 3.13 4.25 3.16A9.06 9.06 0 0 1 0 19.54a12.8 12.8 0 0 0 6.94 2.03c8.33 0 12.89-6.9 12.89-12.89 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z"/></svg>
  ) },
  { href: "https://youtube.com", label: "YouTube", icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="2"/><polygon points="10 9 15 12 10 15 10 9"/></svg>
  ) },
];

const legalLinks = [
  { href: "#", label: "Terms & Conditions" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="footer-minimal">
      <div className="footer-social">
        {socialLinks.map((item) => (
          <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
            {item.icon}
          </a>
        ))}
      </div>
      <div className="footer-legal">
        {legalLinks.map((item) => (
          <a key={item.label} href={item.href}>{item.label}</a>
        ))}
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} 1709coza. All rights reserved.
      </div>
    </footer>
  );
}
