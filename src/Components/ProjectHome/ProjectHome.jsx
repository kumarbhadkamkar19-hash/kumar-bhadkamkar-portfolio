import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiExternalLink,
  FiGithub,
  FiShoppingBag,
  FiSun,
  FiPackage,
  FiBookOpen,
  FiServer,
} from "react-icons/fi";
import "./ProjectHome.css";

/* ================================================
   LINKS — replace with your exact repo URLs when ready
   ================================================ */
const GITHUB_PROFILE = "https://github.com/kumarbhadkamkar19-hash";
const SCHOOL_REPO = GITHUB_PROFILE; // → .../School-Management
const TRIP_REPO = GITHUB_PROFILE; //   → .../Trip-Backend

/* ================================================
   3 FEATURED PROJECTS (shown as big cards)
   ================================================ */
const featured = [
  {
    no: "01",
    tag: "Full Stack MERN",
    title: "Product Management Platform",
    role: "Personal project · Full stack",
    text: "Domain-based multi-tenant platform with a React admin dashboard, JWT authentication, RBAC, hierarchical catalogue management and Cloudinary image uploads.",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Cloudinary",
    ],
    metrics: [
      { v: "22+", l: "REST APIs" },
      { v: "7", l: "API modules" },
      { v: "Multi", l: "Tenant" },
    ],
    links: [
      {
        label: "Live Demo",
        href: "https://product-management-admin-okzv.vercel.app",
        primary: true,
        icon: FiExternalLink,
      },
    ],
    flagship: true,
  },
  {
    no: "02",
    tag: "B2B Export Website",
    title: "Meena International",
    role: "Frontend Developer",
    text: "Responsive B2B website for a coco peat and coir products manufacturer and exporter, with product specifications, manufacturing process, certifications and enquiry-driven CTAs.",
    stack: ["React.js", "JavaScript", "CSS", "React Router", "React Icons"],
    metrics: [
      { v: "B2B", l: "Export site" },
      { v: "Live", l: "In production" },
      { v: "Frontend", l: "My role" },
    ],
    links: [
      {
        label: "Live Website",
        href: "https://meenainternationalgroup.com/",
        primary: true,
        icon: FiExternalLink,
      },
    ],
  },
  {
    no: "03",
    tag: "Backend API",
    title: "School Management System API",
    role: "Backend Developer",
    text: "Enterprise-style backend with role-based access for Admin, Teacher, Parent and Finance, covering attendance, assignments, timetables, notices and fee management.",
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "RBAC"],
    metrics: [
      { v: "20", l: "REST APIs" },
      { v: "4", l: "User roles" },
      { v: "RBAC", l: "Access control" },
    ],
    links: [
      {
        label: "View Code",
        href: SCHOOL_REPO,
        primary: true,
        icon: FiGithub,
      },
    ],
  },
];


/* ================================================
   HOOK — one gentle reveal per block
   ================================================ */
function useReveal() {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return rootRef;
}

/* ================================================
   COMPONENT
   ================================================ */
function ProjectHome() {
  const rootRef = useReveal();

  return (
    <div className="ph" ref={rootRef}>
      <div className="ph-wrap">
        {/* ───────── HEADER ───────── */}
        <header className="ph-header" data-reveal>
          <div className="ph-header-text">
            <span className="ph-pill">
              <span className="ph-pill-dot" />
              Projects
            </span>
            <h2 className="ph-title">Selected Work</h2>
            <p className="ph-lead">
              Real projects, from live client websites to full-stack and backend
              systems.
            </p>
          </div>

          <Link to="/projects" className="ph-head-link">
            View all projects <FiArrowRight aria-hidden="true" />
          </Link>
        </header>

        {/* ───────── 3 FEATURED CARDS ───────── */}
        <div className="ph-grid" data-reveal>
          {featured.map((p) => (
            <article
              className={`ph-card ${p.flagship ? "ph-card-flagship" : ""}`}
              key={p.title}
            >
              <div className="ph-card-top">
                <span className="ph-no">{p.no}</span>
                <span className="ph-tag">{p.tag}</span>
                {p.flagship && <span className="ph-featured">Featured</span>}
              </div>

              <div className="ph-card-main">
                <h3 className="ph-card-title">{p.title}</h3>
                <p className="ph-role">{p.role}</p>
                <p className="ph-text">{p.text}</p>
              </div>

              <ul className="ph-chips" aria-label={`${p.title} tech stack`}>
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>

              <dl className="ph-metrics">
                {p.metrics.map((m) => (
                  <div className="ph-metric" key={m.l}>
                    <dt className="ph-metric-v">{m.v}</dt>
                    <dd className="ph-metric-l">{m.l}</dd>
                  </div>
                ))}
              </dl>

              <div className="ph-actions">
                {p.links.map(({ label, href, primary,  icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ph-btn ${primary ? "ph-btn-primary" : "ph-btn-outline"}`}
                  >
                    {label}
                    {React.createElement(Icon, { "aria-hidden": "true" })}
                    <span className="ph-sr"> (opens in a new tab)</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

    
      </div>
    </div>
  );
}

export default ProjectHome;
