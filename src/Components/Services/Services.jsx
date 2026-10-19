import React from "react";
import { Link } from "react-router-dom";
import {
  FiGlobe,
  FiShoppingBag,
  FiLayers,
  FiGrid,
  FiServer,
  FiZap,
  FiRefreshCw,
  FiSmartphone,
  FiArrowUpRight,
} from "react-icons/fi";
import "./Services.css";

const services = [
  {
    number: "01",
    icon: <FiGlobe />,
    title: "Business Website Development",
    description:
      "Professional, responsive websites designed to present your business clearly, build trust, and make it easy for customers to connect with you.",
    tags: ["Business", "Corporate", "Responsive"],
  },
  {
    number: "02",
    icon: <FiShoppingBag />,
    title: "E-Commerce & Product Catalogue",
    description:
      "Product-focused websites with structured catalogues, categories, product details, and enquiry or shopping flows.",
    tags: ["E-Commerce", "Catalogue", "Products"],
  },
  {
    number: "03",
    icon: <FiLayers />,
    title: "Full Stack Web Applications",
    description:
      "Custom MERN applications combining modern React interfaces with secure APIs, database integration, authentication, and business logic.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    number: "04",
    icon: <FiGrid />,
    title: "Admin Dashboards & CMS",
    description:
      "Custom dashboards that help businesses manage products, users, categories, images, enquiries, and operational data.",
    tags: ["Dashboard", "CRUD", "RBAC"],
  },
  {
    number: "05",
    icon: <FiServer />,
    title: "REST API & Backend Development",
    description:
      "Structured backend systems and REST APIs with authentication, validation, role-based access, and reliable data handling.",
    tags: ["REST API", "JWT", "Express"],
  },
  {
    number: "06",
    icon: <FiZap />,
    title: "SEO & Performance Optimization",
    description:
      "Clean, mobile-first websites built with performance and maintainability in mind, with optimized structure and fast-loading experiences.",
    tags: ["Performance", "Mobile", "SEO"],
  },
  {
    number: "07",
    icon: <FiRefreshCw />,
    title: "Website Redesign & Improvement",
    description:
      "Modernize outdated websites with improved UI, mobile responsiveness, usability, structure, and overall performance.",
    tags: ["Redesign", "UI/UX", "Optimization"],
  },
  {
    number: "08",
    icon: <FiSmartphone />,
    title: "React Native Mobile Apps",
    description:
      "Practical cross-platform mobile applications using React Native and Expo, with a focus on useful mobile experiences and API integration.",
    tags: ["React Native", "Expo", "Mobile"],
  },
];

function Services() {
  return (
    <section className="services-section" id="services">

      {/* Ambient background */}
      <div className="services-orb orb-one"></div>
      <div className="services-orb orb-two"></div>
      <div className="services-orb orb-three"></div>

      <div className="services-grid-bg"></div>

      <div className="services-container">

        {/* HEADER */}
        <div className="services-heading">

          <div className="services-eyebrow">
            <span className="eyebrow-line"></span>
            WHAT I CAN BUILD
            <span className="eyebrow-dot"></span>
          </div>

          <h1>
            Digital solutions
            <br />
            <span>built for real businesses.</span>
          </h1>

          <p>
            From high-quality business websites to full-stack applications
            and backend systems, I build practical digital solutions focused
            on performance, usability, and long-term maintainability.
          </p>

          <div className="services-trust">
            <span>✦</span>
            Business-focused development
            <span className="trust-separator">•</span>
            <span>✦</span>
            Modern technologies
            <span className="trust-separator">•</span>
            <span>✦</span>
            Clean architecture
          </div>

        </div>

        {/* SERVICES */}
        <div className="services-grid">

          {services.map((service) => (
            <article
              className="service-card"
              key={service.number}
            >

              <div className="card-shine"></div>

              <div className="service-top">

                <div className="service-number">
                  <span>/</span>
                  {service.number}
                </div>

                <div className="service-icon">
                  {service.icon}
                </div>

              </div>

              <div className="service-content">

                <h2>{service.title}</h2>

                <p>{service.description}</p>

                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

              </div>

              <Link
                to="/projects"
                className="service-link"
              >
                <span>View related work</span>
                <FiArrowUpRight />
              </Link>

            </article>
          ))}

        </div>

        {/* CTA */}
        <div className="services-bottom">

          <div className="cta-decoration">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="cta-content">
            <div className="cta-label">
              <span></span>
              HAVE A PROJECT IN MIND?
            </div>

            <h2>
              Let's build something
              <span> meaningful.</span>
            </h2>

            <p>
              Tell me what you're looking to build. I'll help you understand
              the right technical approach for your project.
            </p>
          </div>

          <Link
            to="/#contact"
            className="services-cta"
          >
            <span>Start a conversation</span>
            <FiArrowUpRight />
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Services;