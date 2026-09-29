import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FiGithub, FiLinkedin, FiArrowUpRight, FiSend } from "react-icons/fi";
import "./Navbar.css";

/* Logo lives in /public/Favicon → reference it by URL (no import needed) */
const LOGO = "/Favicon/profile_logo_website.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const GITHUB = "https://github.com/kumarbhadkamkar19-hash";
const LINKEDIN = "https://www.linkedin.com/in/kumar-bhadkamkar/";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const actionsRef = useRef(null);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const drawerExtraRef = useRef([]);
  const firstRender = useRef(true);

  /* ── Entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.set(navRef.current, { y: -80, opacity: 0 });
      gsap.set(logoRef.current, { x: -24, opacity: 0 });
      gsap.set(linksRef.current, { y: -16, opacity: 0 });
      gsap.set(actionsRef.current, { x: 24, opacity: 0 });

      tl.to(navRef.current, { y: 0, opacity: 1, duration: 0.7 }, 0)
        .to(logoRef.current, { x: 0, opacity: 1, duration: 0.6 }, 0.2)
        .to(
          linksRef.current,
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.5 },
          0.35,
        )
        .to(actionsRef.current, { x: 0, opacity: 1, duration: 0.6 }, 0.4);
    });
    return () => ctx.revert();
  }, []);

  /* ── Scroll: glass effect + active section ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = navLinks.map((l) => l.href.substring(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(id);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Drawer open / close animation ── */
  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    if (!drawer || !overlay) return;

    // first mount: drawer is already hidden by CSS (display:none)
    if (firstRender.current) {
      firstRender.current = false;
      gsap.set(drawer, { xPercent: 100 }); // GSAP owns the transform from the start
      return;
    }

    gsap.killTweensOf([drawer, overlay]);

    if (isOpen) {
      gsap.set(overlay, { display: "block", opacity: 0 });
      gsap.set(drawer, { display: "flex", xPercent: 100 });
      gsap.to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.to(drawer, { xPercent: 0, duration: 0.55, ease: "power4.out" });
      gsap.fromTo(
        mobileLinksRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.18,
        },
      );
      gsap.fromTo(
        drawerExtraRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.5,
        },
      );
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
      gsap.to(drawer, {
        xPercent: 100,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => gsap.set(drawer, { display: "none" }),
      });
    }
  }, [isOpen]);

  /* ── Lock body scroll while drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ── Close on Esc and when resized to desktop ── */
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    const onResize = () => window.innerWidth > 900 && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ── Desktop link hover ── */
  const handleLinkEnter = (i) =>
    gsap.to(linksRef.current[i], {
      y: -2,
      scale: 1.04,
      duration: 0.25,
      ease: "power2.out",
    });
  const handleLinkLeave = (i) =>
    gsap.to(linksRef.current[i], {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "elastic.out(1, 0.5)",
    });

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Overlay */}
      <div ref={overlayRef} className="mobile-overlay" onClick={closeMenu} />

      <nav
        ref={navRef}
        className={`navbar ${scrolled ? "scrolled" : ""} ${isOpen ? "menu-open" : ""}`}
      >
        <div className="nav-inner">
          {/* Logo */}
          <a href="#home" className="logo" ref={logoRef} onClick={closeMenu}>
            <img src={LOGO} alt="Kumar logo" className="logo-img" />
          </a>

          {/* Desktop links */}
          <ul className="nav-links desktop">
            {navLinks.map((link, i) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  ref={(el) => (linksRef.current[i] = el)}
                  className={`nav-link ${activeSection === link.href.substring(1) ? "active" : ""}`}
                  onMouseEnter={() => handleLinkEnter(i)}
                  onMouseLeave={() => handleLinkLeave(i)}
                >
                  {link.name}
                  <span className="nav-underline" />
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions" ref={actionsRef}>
            <div className="nav-social desktop">
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-icon"
              >
                <FiGithub />
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <FiLinkedin />
              </a>
            </div>

            {/* 3-line hamburger → X */}
            <button
              type="button"
              className={`hamburger ${isOpen ? "open" : ""}`}
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <aside ref={drawerRef} className="mobile-drawer" aria-hidden={!isOpen}>
        <div className="drawer-glow drawer-glow-1" />
        <div className="drawer-glow drawer-glow-2" />

        <div className="drawer-header">
          <span className="drawer-logo">
            <img src={LOGO} alt="Kumar logo" className="logo-img" />
          </span>
          <span className="drawer-tag">MENU</span>
        </div>

        <ul className="mobile-nav-links">
          {navLinks.map((link, i) => (
            <li key={link.name}>
              <a
                href={link.href}
                ref={(el) => (mobileLinksRef.current[i] = el)}
                className={`mobile-nav-link ${activeSection === link.href.substring(1) ? "active" : ""}`}
                onClick={closeMenu}
              >
                <span className="mobile-link-num">0{i + 1}</span>
                <span className="mobile-link-text">{link.name}</span>
                <FiArrowUpRight className="mobile-link-arrow" />
              </a>
            </li>
          ))}
        </ul>

        <div className="drawer-footer">
          <a
            href="#contact"
            className="drawer-cta"
            ref={(el) => (drawerExtraRef.current[0] = el)}
            onClick={closeMenu}
          >
            <FiSend /> Let's Talk
          </a>

          <div
            className="drawer-socials"
            ref={(el) => (drawerExtraRef.current[1] = el)}
          >
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-social"
              aria-label="GitHub"
            >
              <FiGithub /> <span>GitHub</span>
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-social"
              aria-label="LinkedIn"
            >
              <FiLinkedin /> <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;