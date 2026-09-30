import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCode,
  FiLayout,
  FiServer,
  FiDatabase,
  FiCpu,
  FiGitBranch,
  FiZap,
  FiTool,
  FiArrowRight,
} from "react-icons/fi";
import "./Skills.css";

/* ================================================
   STATUS — honest labels instead of fake percentages
   core     = used regularly in real projects
   working  = used and comfortable, not a daily driver
   learning = currently studying / building practice projects
   ================================================ */
const STATUS = {
  core: "Core",
  working: "Working Knowledge",
  learning: "Currently Learning",
};
const STATUS_ORDER = ["core", "working", "learning"];

/* filter row */
const filters = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "ai", label: "AI & LLM" },
  { id: "devops", label: "DevOps" },
];

/* ================================================
   DATA — edit skills / statuses here only.
   Move a skill between "core", "working" and "learning" to change its status.
   ================================================ */
const categories = [
  {
    id: "languages",
    title: "Languages",
    icon: FiCode,
    tags: ["frontend", "database"],
    skills: {
      core: ["HTML5", "CSS3", "JavaScript (ES6+)", "SQL"],
    },
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: FiLayout,
    tags: ["frontend"],
    skills: {
      core: [
        "React.js",
        "React Hooks",
        "Tailwind CSS",
        "Responsive UI",
        "Axios",
        "Dynamic Forms",
      ],
      working: ["Context API", "State Management", "Bootstrap"],
      learning: ["React Native"],
    },
  },
  {
    id: "backend",
    title: "Backend",
    icon: FiServer,
    tags: ["backend"],
    skills: {
      core: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "Middleware",
        "JWT Authentication",
        "Authorization",
        "RBAC",
        "Validation",
        "Global Error Handling",
        "Service Layer Architecture",
        "Nodemailer",
        "Multer",
      ],
    },
  },
  {
    id: "database",
    title: "Database",
    icon: FiDatabase,
    tags: ["database"],
    skills: {
      core: [
        "MongoDB",
        "Mongoose",
        "MongoDB Atlas",
        "Data Modeling",
        "Schema Design",
        "Pagination",
        "Search & Filtering",
      ],
      working: ["MySQL", "Aggregation", "Indexing"],
    },
  },
  {
    id: "ai",
    title: "AI & LLM",
    icon: FiCpu,
    tags: ["ai"],
    skills: {
      learning: [
        "LLM API Integration",
        "AI API Integration",
        "Prompt Engineering",
        "RAG",
        "Embeddings",
        "AI Automation",
      ],
    },
  },
  {
    id: "devops",
    title: "DevOps & Deployment",
    icon: FiGitBranch,
    tags: ["devops"],
    skills: {
      working: [
        "Git / GitHub",
        "Vercel",
        "Render",
        "Environment Configuration",
        "Cloudinary",
      ],
      learning: ["Docker", "Linux", "Nginx", "CI/CD", "VPS Deployment"],
    },
  },
  {
    id: "realtime",
    title: "Real-Time",
    icon: FiZap,
    tags: ["frontend", "backend"],
    skills: {
      working: ["Socket.IO", "WebSocket", "Live Notifications"],
      learning: ["Real-Time Communication"],
    },
  },
  {
    id: "tools",
    title: "Tools & Engineering",
    icon: FiTool,
    tags: ["backend", "devops"],
    skills: {
      working: [
        "Git / GitHub",
        "Postman",
        "VS Code",
        "CRUD Operations",
        "RBAC",
        "Multi-Tenant Architecture",
        "Soft Delete",
        "Pagination",
        "Search & Filtering",
        "API Testing",
        "Environment Configuration",
      ],
    },
  },
];

const learningBadges = [
  "Backend Development",
  "AI / LLM",
  "DevOps",
  "React Native",
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
function Skills() {
  const rootRef = useReveal();
  const [active, setActive] = useState("all");

  const visible = categories.filter(
    (c) => active === "all" || c.tags.includes(active),
  );

  return (
    <div className="sk" ref={rootRef}>
      <div className="sk-wrap">
        {/* ───────── HEADER ───────── */}
        <header className="sk-header" data-reveal>
          <span className="sk-pill">
            <span className="sk-pill-dot" />
            Technical Skills
          </span>
          <h2 className="sk-title">Technologies I Work With</h2>
          <p className="sk-lead">
            A practical technology stack focused on modern web development,
            backend systems, APIs, databases, AI integration and deployment.
          </p>
        </header>

        {/* ───────── FILTER + LEGEND ───────── */}
        <div className="sk-toolbar" data-reveal>
          <div className="sk-filters" role="group" aria-label="Filter skills">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`sk-filter ${active === f.id ? "is-active" : ""}`}
                aria-pressed={active === f.id}
                onClick={() => setActive(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <ul className="sk-legend" aria-label="Status legend">
            {STATUS_ORDER.map((s) => (
              <li key={s}>
                <span className={`sk-badge sk-badge-${s}`}>{STATUS[s]}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="sk-sr" aria-live="polite">
          Showing {visible.length} skill{" "}
          {visible.length === 1 ? "category" : "categories"}
        </p>

        {/* ───────── GRID ───────── */}
        <div className="sk-grid" data-reveal>
          {visible.map((cat, idx) => {
            const Icon = cat.icon;
            const present = STATUS_ORDER.filter((s) => cat.skills[s]?.length);
            const count = present.reduce(
              (n, s) => n + cat.skills[s].length,
              0,
            );

            return (
              <article
                className="sk-card"
                key={`${active}-${cat.id}`}
                style={{ "--i": idx }}
              >
                <header className="sk-card-head">
                  <span className="sk-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div className="sk-card-title">
                    <h3>{cat.title}</h3>
                    <ul className="sk-badges">
                      {present.map((s) => (
                        <li key={s} className={`sk-badge sk-badge-${s}`}>
                          {STATUS[s]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </header>

                <ul className="sk-chips">
                  {present.flatMap((s) =>
                    cat.skills[s].map((name) => (
                      <li
                        key={`${s}-${name}`}
                        className={`sk-chip sk-chip-${s}`}
                        title={STATUS[s]}
                      >
                        {name}
                      </li>
                    )),
                  )}
                </ul>

                <footer className="sk-card-foot">
                  {count} {count === 1 ? "technology" : "technologies"}
                </footer>
              </article>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Skills;