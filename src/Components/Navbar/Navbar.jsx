import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi'
import './Navbar.css'

const navLinks = [
  { name: 'Home',     href: '#home' },
  { name: 'About',    href: '#about' },
  { name: 'Skills',   href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact',  href: '#contact' },
]

function Navbar() {
  const [isOpen,         setIsOpen]         = useState(false)
  const [scrolled,       setScrolled]       = useState(false)
  const [activeSection,  setActiveSection]  = useState('home')

  /* ── Refs ── */
  const navRef       = useRef(null)
  const logoRef      = useRef(null)
  const linksRef     = useRef([])
  const actionsRef   = useRef(null)
  const mobileMenuRef= useRef(null)
  const overlayRef   = useRef(null)
  const mobileLinksRef = useRef([])
  const hamburgerRef = useRef(null)

  /* ── On-load entrance animation ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    gsap.set(navRef.current,   { y: -80, opacity: 0 })
    gsap.set(logoRef.current,  { x: -24, opacity: 0 })
    gsap.set(linksRef.current, { y: -16, opacity: 0 })
    gsap.set(actionsRef.current, { x: 24, opacity: 0 })

    tl.to(navRef.current,   { y: 0, opacity: 1, duration: 0.7 },          0)
      .to(logoRef.current,  { x: 0, opacity: 1, duration: 0.6 },          0.2)
      .to(linksRef.current, { y: 0, opacity: 1, stagger: 0.07, duration: 0.5 }, 0.35)
      .to(actionsRef.current,{ x: 0, opacity: 1, duration: 0.6 },         0.4)

    return () => tl.kill()
  }, [])

  /* ── Scroll: glass + active section ── */
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)

      const sections = navLinks.map(l => l.href.substring(1))
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* ── Mobile menu open/close with GSAP ── */
  useEffect(() => {
    const menu    = mobileMenuRef.current
    const overlay = overlayRef.current
    if (!menu || !overlay) return

    if (isOpen) {
      // Show overlay
      gsap.set(overlay, { display: 'block' })
      gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      // Slide menu in
      gsap.to(menu, { x: 0, duration: 0.45, ease: 'power3.out' })
      // Stagger links in
      gsap.fromTo(
        mobileLinksRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.07, duration: 0.4, ease: 'power2.out', delay: 0.15 }
      )
    } else {
      gsap.to(overlay, {
        opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      })
      gsap.to(menu, { x: '100%', duration: 0.4, ease: 'power3.in' })
    }
  }, [isOpen])

  /* ── Hamburger icon morph ── */
  useEffect(() => {
    if (!hamburgerRef.current) return
    gsap.to(hamburgerRef.current, {
      rotate: isOpen ? 90 : 0,
      scale:  isOpen ? 1.1 : 1,
      duration: 0.35,
      ease: 'back.out(1.8)',
    })
  }, [isOpen])

  /* ── Nav link hover: magnetic feel ── */
  const handleLinkEnter = (i) => {
    gsap.to(linksRef.current[i], {
      y: -2, scale: 1.04,
      duration: 0.25, ease: 'power2.out',
    })
  }
  const handleLinkLeave = (i) => {
    gsap.to(linksRef.current[i], {
      y: 0, scale: 1,
      duration: 0.35, ease: 'elastic.out(1, 0.5)',
    })
  }

  const toggleMenu = () => setIsOpen(v => !v)
  const closeMenu  = () => setIsOpen(false)

  return (
    <>
      {/* Dark overlay behind mobile menu */}
      <div ref={overlayRef} className="mobile-overlay" onClick={closeMenu} />

      <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">

          {/* Logo */}
          <a href="#home" className="logo" ref={logoRef} onClick={closeMenu}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">Kumar</span>
            <span className="logo-dot">.</span>
            <span className="logo-bracket">/&gt;</span>
          </a>

          {/* Desktop links */}
          <ul className="nav-links desktop">
            {navLinks.map((link, i) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  ref={el => linksRef.current[i] = el}
                  className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                  onClick={closeMenu}
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
              <a href="https://github.com/kumarbhadkamkar19-hash"
                 target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
                <FiGithub />
              </a>
              <a href="https://www.linkedin.com/in/kumar-bhadkamkar/"
                 target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                <FiLinkedin />
              </a>
            </div>

            <button
              ref={hamburgerRef}
              className="mobile-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      <div ref={mobileMenuRef} className="mobile-drawer">
        {/* Drawer header */}
        <div className="drawer-header">
          <span className="drawer-logo">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">Kumar</span>
            <span className="logo-dot">.</span>
            <span className="logo-bracket">/&gt;</span>
          </span>
          <button className="drawer-close" onClick={closeMenu} aria-label="Close menu">
            <FiX size={20} />
          </button>
        </div>

        <ul className="mobile-nav-links">
          {navLinks.map((link, i) => (
            <li key={link.name}>
              <a
                href={link.href}
                ref={el => mobileLinksRef.current[i] = el}
                className={`mobile-nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="mobile-link-num">0{i + 1}</span>
                <span>{link.name}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="drawer-footer">
          <a href="https://github.com/kumarbhadkamkar19-hash"
             target="_blank" rel="noopener noreferrer" className="drawer-social">
            <FiGithub /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/kumar-bhadkamkar/"
             target="_blank" rel="noopener noreferrer" className="drawer-social">
            <FiLinkedin /> LinkedIn
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar