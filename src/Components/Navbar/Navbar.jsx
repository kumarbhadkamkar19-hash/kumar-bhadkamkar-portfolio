import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { FiGithub, FiLinkedin, FiArrowUpRight, FiSend } from "react-icons/fi";
import "./Navbar.css";

/* Logo lives in /public/Favicon → reference it by URL (no import needed) */
const LOGO = "/Favicon/profile_logo_website.png";

/* id = used for active state | to = router target */
const navLinks = [
  { id: "home", name: "Home", to: "/" },
  { id: "about", name: "About", to: "/about" },
  { id: "skills", name: "Skills", to: "/#skills" },
  { id: "projects", name: "Projects", to: "/#projects" },
  { id: "services", name: "Services", to: "/#services" },
  { id: "contact", name: "Contact", to: "/#contact" },
];

/* sections that exist on the Home page (scroll-spy) */
const SPY_IDS = ["home", "skills", "projects", "services", "contact"];

const GITHUB = "https://github.com/kumarbhadkamkar19-hash";
const LINKEDIN = "https://www.linkedin.com/in/kumar-bhadkamkar/";

/* small tint wrapper → logo colour matches the red theme a little (see .logo-mark in CSS) */
function Logo() {
  return (
    <span className="logo-mark">
      <img src={LOGO} alt="Kumar Bhadkamkar logo" className="logo-img" />
    </span>
  );
}

function Navbar() {
  const { pathname } = useLocation();

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

  /* On /about the About link is active; on / it follows the scroll position */
  const onAbout = pathname.startsWith("/about");
  const activeKey = onAbout ? "about" : activeSection;

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

  /* ── Scroll: glass effect + scroll-spy (Home page only) ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (pathname !== "/") return; // no spy on /about

      for (const id of [...SPY_IDS].reverse()) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY >= top - 150) {
          setActiveSection(id);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  /* ── Close the drawer whenever the route changes ── */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

  /* Home / logo while already on "/" → just scroll to top */
  const handleNavClick = (e, to) => {
    closeMenu();
    if (to === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash) {
        window.history.replaceState(window.history.state, "", "/");
      }
    }
  };

  return (
    <>
      {/* Overlay */}
      <div ref={overlayRef} className="mobile-overlay" onClick={closeMenu} />

      <nav
        ref={navRef}
        className={`navbar ${scrolled ? "scrolled" : ""} ${isOpen ? "menu-open" : ""}`}
        aria-label="Main navigation"
      >
        <div className="nav-inner">
          {/* Logo */}
          <Link
            to="/"
            className="logo"
            ref={logoRef}
            aria-label="Kumar Bhadkamkar – Home"
            onClick={(e) => handleNavClick(e, "/")}
          >
            <Logo />
          </Link>

          {/* Desktop links */}
          <ul className="nav-links desktop">
            {navLinks.map((link, i) => (
              <li key={link.id}>
                <Link
                  to={link.to}
                  ref={(el) => (linksRef.current[i] = el)}
                  className={`nav-link ${activeKey === link.id ? "active" : ""}`}
                  aria-current={activeKey === link.id ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, link.to)}
                  onMouseEnter={() => handleLinkEnter(i)}
                  onMouseLeave={() => handleLinkLeave(i)}
                >
                  {link.name}
                  <span className="nav-underline" />
                </Link>
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
            <Logo />
          </span>
          <span className="drawer-tag">MENU</span>
        </div>

        <ul className="mobile-nav-links">
          {navLinks.map((link, i) => (
            <li key={link.id}>
              <Link
                to={link.to}
                ref={(el) => (mobileLinksRef.current[i] = el)}
                className={`mobile-nav-link ${activeKey === link.id ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, link.to)}
              >
                <span className="mobile-link-num">0{i + 1}</span>
                <span className="mobile-link-text">{link.name}</span>
                <FiArrowUpRight className="mobile-link-arrow" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="drawer-footer">
          <Link
            to="/#contact"
            className="drawer-cta"
            ref={(el) => (drawerExtraRef.current[0] = el)}
            onClick={closeMenu}
          >
            <FiSend /> Let's Talk
          </Link>

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