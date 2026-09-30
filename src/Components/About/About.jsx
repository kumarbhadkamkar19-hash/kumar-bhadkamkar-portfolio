import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiGlobe,
  FiLayers,
  FiServer,
  FiGrid,
  FiCpu,
  FiCompass,
  FiDatabase,
  FiTerminal,
  FiSmartphone,
  FiBriefcase,
  FiBookOpen,
  FiEye,
  FiTarget,
  FiMapPin,
  FiArrowRight,
  FiPackage,
  FiShoppingCart,
  FiSun,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";
import "./About.css";

/* ================================================
   CONFIG  (edit here)
   ================================================ */
const SITE_URL = ""; // e.g. "https://kumarbhadkamkar.dev"  → empty = uses current domain
const PAGE_PATH = "/about";
const OG_IMAGE_PATH = "/Favicon/profile_logo_website.png"; // best: 1200×630 /og-about.png

const SEO_TITLE = "About Kumar Bhadkamkar | Full Stack MERN Developer in Pune";
const SEO_DESC =
  "Kumar Bhadkamkar is a Full Stack MERN Developer in Pune building fast, SEO-friendly websites, React web applications, secure REST APIs and scalable backend systems for businesses.";

const GITHUB = "https://github.com/kumarbhadkamkar19-hash";
const LINKEDIN = "https://www.linkedin.com/in/kumar-bhadkamkar/";

/* ================================================
   CONTENT  (data-driven → edit text without touching JSX)
   ================================================ */
const stats = [
  { value: "6+", label: "Months experience" },
  { value: "4+", label: "Projects deployed" },
  { value: "MERN", label: "Stack developer" },
  { value: "Pune", label: "Maharashtra" },
];

const stack = ["React.js", "Node.js", "Express.js", "MongoDB"];

const builds = [
  {
    icon: FiGlobe,
    title: "Business Websites",
    text: "Responsive websites designed around business goals and customer trust.",
  },
  {
    icon: FiLayers,
    title: "Web Applications",
    text: "Modern React applications with reusable components and API integration.",
  },
  {
    icon: FiServer,
    title: "Backend & REST APIs",
    text: "Secure APIs with Node.js, Express.js, authentication and database architecture.",
  },
  {
    icon: FiGrid,
    title: "Admin Dashboards",
    text: "Structured dashboards for managing users, products, content and business data.",
  },
  {
    icon: FiCpu,
    title: "AI & Automation",
    text: "Exploring AI/LLM integration and automation for practical business workflows.",
  },
  {
    icon: FiCompass,
    title: "Future Technologies",
    text: "Learning React Native, DevOps and scalable cloud-based systems.",
  },
];

/* Trust section — real work, links to the Projects section */
const work = [
  {
    icon: FiPackage,
    kind: "Client website",
    title: "Export company website",
    text: "Multi-page business website with product listings, company information and an enquiry form.",
    tags: ["React.js", "Tailwind CSS", "EmailJS"],
  },
  {
    icon: FiShoppingCart,
    kind: "Client website",
    title: "E-commerce catalogue",
    text: "Product listing and detail pages built mobile-first for easy browsing on every device.",
    tags: ["React.js", "Responsive UI", "EmailJS"],
  },
  {
    icon: FiSun,
    kind: "Client website",
    title: "Agricultural marketplace",
    text: "Marketplace-style website for the agricultural sector with product pages and enquiries.",
    tags: ["React.js", "JavaScript", "Tailwind CSS"],
  },
  {
    icon: FiShield,
    kind: "Backend platform",
    title: "Multi-tenant product platform",
    text: "One backend securely serving multiple clients, each with fully isolated, domain-based data.",
    tags: ["Node.js", "Express.js", "MongoDB", "JWT", "RBAC"],
  },
];

const trust = [
  "Responsive on every device",
  "SEO-ready structure",
  "Secure auth with JWT & RBAC",
  "Reusable, maintainable code",
];

const steps = [
  { title: "Understand", text: "Clarify goals, users and requirements." },
  { title: "Plan", text: "Define structure, stack and data flow." },
  { title: "Build", text: "Write clean, reusable components and APIs." },
  { title: "Test", text: "Check responsiveness, edge cases and security." },
  { title: "Deploy", text: "Ship to production and keep improving it." },
];

const experience = {
  role: "React Developer Intern",
  company: "Axelyne",
  place: "Pune",
  period: "01 Feb 2026 — 30 Jul 2026",
  duration: "6 months",
  points: [
    "Developed three responsive business websites using React.js and JavaScript.",
    "Built reusable components and mobile-first layouts.",
    "Integrated EmailJS for business enquiries.",
    "Worked on export, e-commerce and agricultural marketplace projects.",
  ],
};

const education = [
  {
    degree: "MCA",
    school: "Vishwakarma College of Arts, Commerce & Science (VCACS), Pune",
    period: "Pursuing · Graduating 2027",
    cgpa: "9.2",
    note: "First-year CGPA",
  },
  {
    degree: "B.Sc. Information Technology",
    school: "Shivaji University, Kolhapur",
    period: "2022 — 2025",
    cgpa: "8.7",
    note: "Final CGPA",
  },
];

const focus = [
  {
    icon: FiDatabase,
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Security"],
  },
  {
    icon: FiCpu,
    title: "AI / LLM",
    items: ["LLM APIs", "RAG", "AI Integration", "Automation"],
  },
  {
    icon: FiTerminal,
    title: "DevOps",
    items: ["Docker", "Linux", "Nginx", "CI/CD", "VPS"],
  },
  {
    icon: FiSmartphone,
    title: "Mobile",
    items: ["React Native", "API Integration"],
  },
];

const vision = [
  {
    icon: FiEye,
    label: "Vision",
    headline: "Technology Entrepreneur",
    text: "To grow into a technology entrepreneur building scalable solutions across web, AI automation, mobile and DevOps.",
  },
  {
    icon: FiTarget,
    label: "Mission",
    headline: "Reliable Digital Products",
    text: "To build reliable digital products that solve practical business problems through clean development and secure systems.",
  },
];

/* "On this page" index — ids must match the <Block id="…"> below */
const tocItems = [
  { id: "about-who", label: "Who I Am" },
  { id: "about-build", label: "What I Build" },
  { id: "about-work", label: "Real Work" },
  { id: "about-process", label: "How I Work" },
  { id: "about-experience", label: "Experience" },
  { id: "about-education", label: "Education" },
  { id: "about-focus", label: "Focus" },
  { id: "about-vision", label: "Vision" },
];
const TOC_IDS = tocItems.map((t) => t.id);

/* internal links = SEO + keeps visitors moving through the site */
const exploreLinks = [
  { to: "/#projects", label: "Projects" },
  { to: "/#services", label: "Services" },
  { to: "/#skills", label: "Skills" },
  { to: "/#contact", label: "Contact" },
];

/* ================================================
   SEO — meta tags, canonical, Open Graph, Twitter, JSON-LD
   (no extra library; cleans up when you leave the page)
   ================================================ */
function buildSchema(origin) {
  const url = origin + PAGE_PATH;
  const personId = `${url}#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profilepage`,
        url,
        name: SEO_TITLE,
        description: SEO_DESC,
        inLanguage: "en-IN",
        isPartOf: { "@type": "WebSite", name: "Kumar Bhadkamkar", url: origin },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Kumar Bhadkamkar",
        url,
        image: origin + OG_IMAGE_PATH,
        jobTitle: "Full Stack MERN Developer",
        description: SEO_DESC,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        knowsLanguage: ["Marathi", "English", "Hindi"],
        knowsAbout: [
          "React.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "REST API development",
          "Website development",
          "Search engine optimization",
          "JWT authentication",
          "Role-based access control",
        ],
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Shivaji University" },
          {
            "@type": "CollegeOrUniversity",
            name: "Vishwakarma College of Arts, Commerce & Science",
          },
        ],
        sameAs: [GITHUB, LINKEDIN],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: origin + "/",
          },
          { "@type": "ListItem", position: 2, name: "About", item: url },
        ],
      },
    ],
  };
}

function useSEO() {
  useEffect(() => {
    const origin = SITE_URL || window.location.origin;
    const url = origin + PAGE_PATH;
    const image = origin + OG_IMAGE_PATH;

    const undo = [];
    const prevTitle = document.title;
    document.title = SEO_TITLE;
    undo.push(() => (document.title = prevTitle));

    const setMeta = (attr, key, content) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      const created = !el;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute("content");
      el.setAttribute("content", content);
      undo.push(() =>
        created ? el.remove() : el.setAttribute("content", prev ?? ""),
      );
    };

    setMeta("name", "description", SEO_DESC);
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("name", "author", "Kumar Bhadkamkar");

    setMeta("property", "og:type", "profile");
    setMeta("property", "og:site_name", "Kumar Bhadkamkar");
    setMeta("property", "og:locale", "en_IN");
    setMeta("property", "og:title", SEO_TITLE);
    setMeta("property", "og:description", SEO_DESC);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "profile:first_name", "Kumar");
    setMeta("property", "profile:last_name", "Bhadkamkar");

    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", SEO_TITLE);
    setMeta("name", "twitter:description", SEO_DESC);
    setMeta("name", "twitter:image", image);

    // canonical
    let link = document.head.querySelector('link[rel="canonical"]');
    const linkCreated = !link;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    const prevHref = link.getAttribute("href");
    link.setAttribute("href", url);
    undo.push(() =>
      linkCreated ? link.remove() : link.setAttribute("href", prevHref ?? ""),
    );

    // JSON-LD structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "about-jsonld";
    script.text = JSON.stringify(buildSchema(origin));
    document.head.appendChild(script);
    undo.push(() => script.remove());

    return () => undo.forEach((fn) => fn());
  }, []);
}

/* ================================================
   HOOKS
   ================================================ */
/* one gentle reveal per block */
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return rootRef;
}

/* which section is currently in view → highlights the TOC chip */
function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        }),
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* ================================================
   SMALL COMPONENTS
   ================================================ */
function Toc({ items, active }) {
  const listRef = useRef(null);

  // keep the active chip centred on small screens
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) return;
    const el = list.querySelector(`[data-id="${active}"]`);
    if (el) {
      list.scrollTo({
        left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(window.history.state, "", `#${id}`);
  };

  return (
    <nav className="ab-toc" aria-label="On this page">
      <ul ref={listRef}>
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              data-id={id}
              className={active === id ? "is-active" : ""}
              aria-current={active === id ? "true" : undefined}
              onClick={(e) => go(e, id)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Block({ id, num, title, sub, action, children }) {
  return (
    <section className="ab-block" id={id} aria-labelledby={`${id}-title`}>
      <header className="ab-head" data-reveal>
        <span className="ab-head-num">{num}</span>
        <span className="ab-head-line" aria-hidden="true" />
        <div className="ab-head-text">
          <h2 className="ab-h2" id={`${id}-title`}>
            {title}
          </h2>
          {sub && <p className="ab-sub">{sub}</p>}
        </div>
        {action && (
          <Link to={action.to} className="ab-head-link">
            {action.label} <FiArrowRight aria-hidden="true" />
          </Link>
        )}
      </header>
      {children}
    </section>
  );
}

/* ================================================
   PAGE
   ================================================ */
function About() {
  useSEO();
  const rootRef = useReveal();
  const activeId = useActiveSection(TOC_IDS);

  return (
    <div className="ab" id="about" ref={rootRef}>
      <div className="ab-wrap">
        {/* ───────── HERO (compact) ───────── */}
        <header className="ab-hero" data-reveal>
          <span className="ab-pill">
            <span className="ab-pill-dot" />
            About Kumar Bhadkamkar
          </span>

          <h1 className="ab-title">
            Building Digital Products That Perform, Rank &amp; Scale
          </h1>

          <p className="ab-lead">
            I'm Kumar Bhadkamkar, a Full Stack MERN Developer based in Pune,
            Maharashtra, focused on building modern websites, web applications
            and scalable backend systems.
          </p>

          <dl className="ab-stats">
            {stats.map((s) => (
              <div className="ab-stat" key={s.label}>
                <dt className="ab-stat-value">{s.value}</dt>
                <dd className="ab-stat-label">{s.label}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* sticky section index */}
        <Toc items={tocItems} active={activeId} />

        {/* ───────── 01 WHO I AM ───────── */}
        <Block id="about-who" num="01" title="Who I Am">
          <div className="ab-card ab-who" data-reveal>
            <p>
              I'm a Full Stack MERN Developer focused on building responsive,
              secure and maintainable digital products using React.js, Node.js,
              Express.js and MongoDB.
            </p>
            <p>
              I enjoy turning business requirements into practical digital
              solutions — from websites and web applications to backend APIs and
              admin systems.
            </p>
            <ul className="ab-chips" aria-label="Core stack and location">
              {stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
              <li className="ab-chip-loc">
                <FiMapPin aria-hidden="true" /> Pune, India
              </li>
              <li>Marathi · English · Hindi</li>
            </ul>
          </div>
        </Block>

        {/* ───────── 02 WHAT I BUILD ───────── */}
        <Block
          id="about-build"
          num="02"
          title="What I Build"
          action={{ to: "/#services", label: "View services" }}
        >
          <div className="ab-grid-3" data-reveal>
            {builds.map(({ icon: BuildIcon, title, text }) => (
              <article className="ab-card ab-build" key={title}>
                <span className="ab-icon">
                  <BuildIcon aria-hidden="true" />
                </span>
                <h3 className="ab-h3">{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </Block>

        {/* ───────── 03 REAL WORK (trust) ───────── */}
        <Block
          id="about-work"
          num="03"
          title="Real Work, in Project"
          sub="Websites and backends built for real businesses"
          action={{ to: "/#projects", label: "Explore all projects" }}
        >
          <div className="ab-grid-2" data-reveal>
            {work.map(({ icon: WorkIcon, kind, title, text, tags }) => (
              <article className="ab-card ab-work" key={title}>
                <div className="ab-work-top">
                  <span className="ab-icon ab-icon-sm">
                    <WorkIcon aria-hidden="true" />
                  </span>
                  <span className="ab-kind">{kind}</span>
                  <span className="ab-live">Deployed</span>
                </div>
                <h3 className="ab-h3">{title}</h3>
                <p>{text}</p>
                <ul className="ab-tags">
                  {tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <ul className="ab-trust" data-reveal aria-label="What you can expect">
            {trust.map((t) => (
              <li key={t}>
                <FiCheckCircle aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </Block>

        {/* ───────── 04 HOW I WORK ───────── */}
        <Block id="about-process" num="04" title="How I Work">
          <ol className="ab-steps" data-reveal>
            {steps.map((s, i) => (
              <li className="ab-step" key={s.title} style={{ "--i": i }}>
                <span className="ab-step-dot">{i + 1}</span>
                <div className="ab-step-body">
                  <h3 className="ab-h3">{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Block>

        {/* ───────── 05 EXPERIENCE ───────── */}
        <Block id="about-experience" num="05" title="Experience">
          <div className="ab-timeline" data-reveal>
            <span className="ab-tl-dot" aria-hidden="true" />
            <article className="ab-card ab-exp">
              <div className="ab-exp-top">
                <span className="ab-icon ab-icon-sm">
                  <FiBriefcase aria-hidden="true" />
                </span>
                <div className="ab-exp-title">
                  <h3 className="ab-h3">{experience.role}</h3>
                  <p className="ab-exp-company">
                    {experience.company} · {experience.place}
                  </p>
                </div>
                <div className="ab-exp-when">
                  <span>{experience.period}</span>
                  <span className="ab-badge">{experience.duration}</span>
                </div>
              </div>
              <ul className="ab-list">
                {experience.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          </div>
        </Block>

        {/* ───────── 06 EDUCATION ───────── */}
        <Block id="about-education" num="06" title="Education">
          <div className="ab-grid-2" data-reveal>
            {education.map((e) => (
              <article className="ab-card ab-edu" key={e.degree}>
                <div className="ab-edu-info">
                  <span className="ab-icon ab-icon-sm">
                    <FiBookOpen aria-hidden="true" />
                  </span>
                  <h3 className="ab-h3">{e.degree}</h3>
                  <p className="ab-edu-school">{e.school}</p>
                  <p className="ab-edu-period">{e.period}</p>
                </div>
                <div className="ab-cgpa">
                  <span className="ab-cgpa-num">{e.cgpa}</span>
                  <span className="ab-cgpa-label">CGPA</span>
                  <span className="ab-cgpa-note">{e.note}</span>
                </div>
              </article>
            ))}
          </div>
        </Block>

        {/* ───────── 07 CURRENT FOCUS ───────── */}
        <Block
          id="about-focus"
          num="07"
          title="Current Focus"
          sub="Currently learning and exploring"
          action={{ to: "/#skills", label: "See all skills" }}
        >
          <div className="ab-grid-4" data-reveal>
            {focus.map(({ title, items }) => (
              <article className="ab-card ab-focus" key={title}>
                <h3 className="ab-h3">{title}</h3>
                <ul className="ab-tags">
                  {items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Block>

        {/* ───────── 08 VISION & MISSION ───────── */}
        <Block id="about-vision" num="08" title="Vision & Mission">
          <div className="ab-grid-2" data-reveal>
            {vision.map((item) => {
              const Icon = item.icon;

              return (
                <article className="ab-card ab-vm" key={item.label}>
                  <div className="ab-vm-top">
                    <span className="ab-icon ab-icon-sm">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="ab-vm-label">{item.label}</span>
                  </div>
                  <h3 className="ab-vm-headline">{item.headline}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </Block>

        {/* ───────── CTA ───────── */}
        <aside className="ab-cta" data-reveal aria-labelledby="ab-cta-title">
          <h2 className="ab-cta-title" id="ab-cta-title">
            Let's Build Something Useful
          </h2>
          <p className="ab-cta-text">
            Have a website, web application or backend project in mind? Let's
            discuss your idea and turn it into a practical digital product.
          </p>

          <div className="ab-cta-btns">
            <Link to="/#contact" className="ab-btn ab-btn-primary">
              Start a Project <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/#projects" className="ab-btn ab-btn-outline">
              Explore Projects
            </Link>
          </div>

          <ul className="ab-avail" aria-label="Availability">
            <li>Full-time roles</li>
            <li>Freelance projects</li>
            <li>Collaborations</li>
          </ul>

          <nav className="ab-links" aria-label="Keep exploring">
            <span className="ab-links-label">Keep exploring</span>
            {exploreLinks.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}

export default About;
