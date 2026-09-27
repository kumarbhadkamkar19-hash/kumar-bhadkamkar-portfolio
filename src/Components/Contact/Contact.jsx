import React, { useState, useRef, useEffect } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from "react-icons/fi";
import "./Contact.css";

const WHATSAPP_NUMBER = "919561955903";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const contactInfo = [
  {
    icon: <FiMail />,
    label: "Email",
    value: "kumarbhadkamkar19@gmail.com",
    link: "mailto:kumarbhadkamkar19@gmail.com",
  },
  {
    icon: <FiPhone />,
    label: "Phone",
    value: "+91 95619 55903",
    link: "tel:+919561955903",
  },
  {
    icon: <FiMapPin />,
    label: "Location",
    value: "Katraj, Pune, India",
    link: "https://maps.google.com/?q=Katraj,Pune",
  },
];

function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const timeoutRef = useRef(null);

  // Component unmount zalyavar timer clear karto
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const { name, email, subject, message } = formData;

    const text = `New Portfolio Inquiry

Name: ${name.trim()}
Email: ${email.trim()}
Subject: ${subject.trim()}

Message:
${message.trim()}`;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text,
    )}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    setFormData(INITIAL_FORM);
    setIsSubmitting(false);
    setSubmitStatus("success");

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">
          Get In Touch
        </h2>
        <p
          className="section-subtitle text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Open for frontend projects, portfolio websites, modern UI development,
          and startup collaboration opportunities
        </p>

        <div className="contact-grid">
          {/* Contact Form */}
          <form
            className="contact-form glass"
            onSubmit={handleSubmit}
            data-aos="fade-right"
          >
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Project inquiry, collaboration, etc."
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tell me about your project or idea..."
                className="form-input form-textarea"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : submitStatus === "success" ? (
                <>
                  <FiCheck />
                  Message Sent!
                </>
              ) : (
                <>
                  Send Message <FiSend />
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <p className="form-success">
                Thank you! I'll get back to you within 24-48 hours. 🚀
              </p>
            )}
          </form>

          {/* Contact Info */}
          <div className="contact-info" data-aos="fade-left">
            <div className="info-cards">
              {contactInfo.map((info, index) => {
                const isExternal = info.link.startsWith("http");
                return (
                  <a
                    key={info.label}
                    href={info.link}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="info-card glass"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <span className="info-icon">{info.icon}</span>
                    <div className="info-content">
                      <span className="info-label">{info.label}</span>
                      <span className="info-value">{info.value}</span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Connect */}
            <div className="social-connect glass mt-3">
              <h4>Connect on Social</h4>
              <div className="social-buttons">
                <a
                  href="https://github.com/kumarbhadkamkar19-hash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn github"
                >
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/kumar-bhadkamkar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn linkedin"
                >
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="availability-badge glass-red">
              <span className="badge-dot"></span>
              Currently available for new projects
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
