
import React, { useState, useEffect } from 'react'
import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'
import './Footer.css'

function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/kumarbhadkamkar19-hash', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/kumar-bhadkamkar/', label: 'LinkedIn' },
    { icon: <FiMail />, href: 'mailto:kumarbhadkamkar19@gmail.com', label: 'Email' }
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <footer className="footer">
      {/* Animated Top Border */}
      <div className="footer-border"></div>
      
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand" data-aos="fade-up">
            <a href="#home" className="footer-logo">
              <span className="logo-text">Kumar</span>
              <span className="logo-dot">.</span>
            </a>
            <p className="footer-tagline">
              MERN Stack Developer & Future Startup Founder building premium digital experiences.
            </p>
            
            {/* Social Links */}
            <div className="footer-social">
              {socialLinks.map(social => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links" data-aos="fade-up" data-aos-delay="100">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact" data-aos="fade-up" data-aos-delay="200">
            <h4>Get in Touch</h4>
            <ul>
              <li>
                <FiMail />
                <a href="mailto:kumarbhadkamkar19@gmail.com">kumarbhadkamkar19@gmail.com</a>
              </li>
              <li>
                <FiMapPin />
                <span>Katraj, Pune, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Kumar Bhadkamkar. All rights reserved.
          </p>
          <p className="footer-credit">
            Built with <span className="heart">❤</span> using React + Vite
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FiArrowUp />
        <span className="back-to-top-glow"></span>
      </button>
    </footer>
  )
}

// Import FiMapPin for footer contact
import { FiMapPin } from 'react-icons/fi'

export default Footer