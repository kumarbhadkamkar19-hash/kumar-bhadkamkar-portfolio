import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiExternalLink,
  FiGithub,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

/* ================================================
   CONFIG
   ================================================ */
const SITE_URL = ""; // e.g. "https://kumarbhadkamkar.dev" → empty = current domain
const PAGE_PATH = "/projects";
const GITHUB_PROFILE = "https://github.com/kumarbhadkamkar19-hash";
const SCHOOL_REPO = GITHUB_PROFILE; // → .../School-Management
const TRIP_REPO = GITHUB_PROFILE; //   → .../Trip-Backend

const SEO_TITLE = "Projects | Kumar Bhadkamkar – MERN Stack Developer in Pune";
const SEO_DESC =
  "Live projects by Kumar Bhadkamkar: a multi-tenant product management platform, business websites for export, lifestyle, agri-tech and education brands, and Node.js backend APIs.";

/* ================================================
   DATA — real projects (edit here only)
   ================================================ */
const featured = {
  slug: "product-management",
  title: "Product Management Admin Panel",
  tag: "Full Stack MERN",
  kind: "Personal project",
  summary:
    "A full-stack, domain-based multi-tenant product catalogue platform with a React admin dashboard and a Node.js/Express REST API. One backend serves multiple clients with isolated data per domain.",
  stack: [
    "React.js",
    "Tailwind CSS",
    "Axios",
    "Recharts",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "JWT",
    "Cloudinary",
    "Multer",
    "Express Validator",
  ],
  metrics: [
    { v: "22+", l: "REST endpoints" },
    { v: "7", l: "API modules" },
    { v: "6", l: "Admin pages" },
    { v: "Multi", l: "Tenant" },
  ],
  live: "https://product-management-admin-okzv.vercel.app",
  study: {
    problem:
      "Businesses need to manage complex product catalogues for several clients without data leaking between them. Single-tenant systems can't isolate clients by domain, and manual catalogue work lacks strict validation, search and inventory analytics.",
    solution:
      "A domain-based multi-tenant architecture where each tenant's data is filtered and isolated by domain middleware. Admins manage Categories → SubCategories → Attributes → Products → Images with CRUD, validation, pagination, search and soft delete. Cloudinary stores images and Recharts powers the analytics dashboard.",
    useCases: [
      "Multi-tenant SaaS: one backend, isolated data per domain",
      "Catalogue management with full CRUD",
      "Media pipeline: Multer → Cloudinary, max 3 images per product",
      "Dynamic attribute engine that drives form rendering",
      "Lead management with read/unread tracking and bulk delete",
      "Analytics dashboard: published vs draft stats",
    ],
    workflow: [
      "Admin registers or logs in; a JWT is issued and role-based access applies.",
      "Auth middleware verifies the token, loads the admin and sets req.admin.",
      "Domain middleware reads the request domain (x-domain header or body), validates it and attaches req.domain.",
      "Admin manages Categories → SubCategories → Attributes → Products → Images through CRUD.",
      "Product creation validates the category relationship and uploads up to 3 images (5 MB, JPEG/PNG/WEBP) to Cloudinary.",
      "Public enquiries arrive; admin reads, searches, marks read/unread or bulk deletes them.",
      "Dashboard shows live stats and published-vs-draft charts; errors flow through one global handler.",
    ],
    layers: [
      {
        name: "Frontend",
        sub: "React.js + Tailwind CSS",
        items: [
          "Recharts analytics dashboard",
          "Dynamic forms from attribute types",
          "Debounced search with autocomplete",
          "Axios interceptors for JWT and 401 redirect",
          "Reusable pagination, modal and bulk-select",
        ],
      },
      {
        name: "Backend",
        sub: "Node.js + Express.js",
        items: [
          "7 modules, 22+ secure REST endpoints",
          "JWT authentication + RBAC",
          "Controller → Service → Model layers",
          "Express Validator + global error handler",
          "ApiFeatures util for filter, sort and pagination",
        ],
      },
      {
        name: "Database",
        sub: "MongoDB + Mongoose",
        items: [
          "Admin → Category → SubCategory → Product → Image",
          "Partial unique compound indexes",
          "Mixed type for dynamic attributes",
          "Soft delete flag with index",
          "Auto slug via pre-save hook",
        ],
      },
      {
        name: "Cloud",
        sub: "Cloudinary + Multer",
        items: [
          "Max 3 images per product, 5 MB limit",
          "Domain/product-based folders",
          "Temp file cleanup after upload",
          "Primary image auto-promotion on delete",
        ],
      },
    ],
    deploy: [
      "Frontend · Vercel",
      "Backend · Render",
      "Database · MongoDB Atlas",
      "Images · Cloudinary",
    ],
    decisions: [
      [
        "Domain-based multi-tenancy",
        "One server, many clients, data isolated by a domain field in every schema.",
      ],
      [
        "Service layer pattern",
        "Keeps HTTP, business logic and database operations separate.",
      ],
      [
        "Soft delete + partial index",
        "Data stays recoverable; unique rules apply only to active records.",
      ],
      [
        "Cloudinary storage",
        "Scalable images in organised domain/product folders.",
      ],
      ["Compound indexes", "Faster queries on domain + category + key."],
      [
        "Global error handler",
        "One place maps ValidationError, CastError and duplicate key (11000).",
      ],
    ],
    challenges: {
      Backend: [
        'Fixed Mongoose pre("save") middleware (async, no callback).',
        "Fixed MODULE_NOT_FOUND import paths.",
        'Fixed missing paramValidation handlers behind "handler must be a function".',
        "Registered globalErrorHandler in app.js.",
        "Standardised service-layer errors and fixed enquiry isRead filtering.",
      ],
      Frontend: [
        "Fixed response nesting (data.data) across pages.",
        "Aligned POST field names with the backend schema.",
        "Fixed search with useDebounce + useCallback and separate states.",
        "Added safe image fallbacks with an isPrimary badge.",
        "Fixed dashboard stats using pagination.total.",
      ],
    },
  },
};

const sites = [
  {
    slug: "meena-international",
    title: "Meena International",
    category: "B2B Export Website",
    role: "Frontend Developer",
    text: "Responsive B2B manufacturer and exporter website for an India-based coco peat and coir products supplier, built around specifications, manufacturing process, certifications and enquiries.",
    features: [
      "Product catalogue with specifications and quality options",
      "Manufacturing process and certification sections",
      "Responsive navigation with mobile menu",
      "Enquiry-focused call-to-action sections",
    ],
    stack: ["React.js", "JavaScript", "CSS", "React Router", "React Icons"],
    live: "https://meenainternationalgroup.com/",
  },
  {
    slug: "capurri",
    title: "CAPURRI",
    category: "Brand Website · Lifestyle",
    role: "Frontend Developer",
    text: "Premium website for a lifestyle brand offering luxury perfumes and finely crafted imitation jewellery, with an elegant green-and-gold theme.",
    features: [
      "Luxury hero slider and brand introduction",
      "Product showcase and category sections",
      "Mobile-first layout with responsive navigation",
      "Scroll animations and premium UI styling",
    ],
    stack: ["React.js", "JavaScript", "CSS", "React Icons"],
    live: "https://capurri.com/",
  },
  {
    slug: "krushi-logic",
    title: "Krushi Logic",
    category: "Business Website · Agri-Tech",
    role: "Frontend Developer",
    text: "Agri-tech business website focused on connecting farmers directly with buyers and reducing dependency on middlemen.",
    features: [
      "Problem-solution based UI sections",
      "Farmer-to-buyer workflow presentation",
      "Service and benefit showcase",
      "Enquiry and contact-focused CTAs",
    ],
    stack: ["React.js", "JavaScript", "CSS", "Responsive Design"],
    live: "https://krushilogic.com/",
  },
  {
    slug: "vishant-impex",
    title: "Vishant Impex",
    category: "Export Website · Spices & Agro",
    role: "Frontend Developer",
    text: "Export website for a supplier of premium Indian spices, vegetables and agricultural products, with a structured catalogue of 12+ products.",
    features: [
      "Category-driven catalogue with 12+ products",
      "Product details, specifications and export information",
      "About, Products, Blog, Certificates and Contact pages",
      "Enquiry integration for global buyers",
    ],
    stack: ["React.js", "JavaScript", "CSS", "React Router"],
    live: "https://vishantimpex.com/",
  },
  {
    slug: "rahitech-solution",
    title: "Rahitech Solution",
    category: "Business Website · Education",
    role: "Frontend Developer · Team contribution",
    text: "Official website for a Pune-based IT training and placement institute, built as part of a frontend team.",
    features: [
      "Responsive pages for courses and institute information",
      "Reusable UI components",
      "Student enquiry and contact sections",
      "Team-based frontend workflow",
    ],
    stack: ["React.js", "JavaScript", "CSS", "Responsive Design"],
    live: "https://rahitech.co.in/",
  },
];

const backends = [
  {
    slug: "school-management-api",
    title: "School Management System API",
    category: "Enterprise Backend",
    role: "Backend Developer",
    text: "Enterprise-style backend for multi-role school workflows, with dynamic role-based access across four user roles.",
    metrics: [
      { v: "20", l: "REST APIs" },
      { v: "6", l: "Modules" },
      { v: "4", l: "User roles" },
    ],
    modules: [
      { name: "Admin", note: "Profile, employee onboarding, student CRUD" },
      { name: "Authentication", note: "Register and login" },
      { name: "Teacher", note: "Attendance, assignments, timetable" },
      {
        name: "Parent portal",
        note: "Profiles, attendance, assignments, fees, notices",
      },
      { name: "Finance", note: "Fee structures" },
      { name: "Notices", note: "Broadcast to multiple roles" },
    ],
    features: [
      "RBAC through a custom roleMiddleware (ADMIN, TEACHER, PARENT, FINANCE)",
      "ES Modules with strict routes / middleware / controller layers",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "RBAC"],
    code: SCHOOL_REPO,
  },
  {
    slug: "trip-management-api",
    title: "Trip Management API",
    category: "Backend API",
    role: "Backend Developer",
    text: "Modular REST API for personal trip planning, item checklists and itinerary tracking with secure authentication.",
    metrics: [
      { v: "11", l: "REST APIs" },
      { v: "3", l: "Modules" },
      { v: "JWT", l: "Protected" },
    ],
    modules: [
      { name: "Auth", count: 3, note: "register, login, profile" },
      {
        name: "Trips",
        count: 5,
        note: "create, list, detail, summary, delete",
      },
      { name: "Items", count: 3, note: "add, delete, toggle collected" },
    ],
    features: [
      "JWT middleware protects the profile routes",
      "Checklist items toggle between collected / not collected",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT"],
    code: TRIP_REPO,
  },
];

const heroStats = [
  { v: "6", l: "Live projects" },
  { v: "5", l: "Business websites" },
  { v: "3", l: "Backend systems" },
  { v: "50+", l: "API endpoints" },
];

const filters = [
  { id: "all", label: "All", count: 8 },
  { id: "fullstack", label: "Full Stack", count: 1 },
  { id: "website", label: "Websites", count: 5 },
  { id: "backend", label: "Backend", count: 2 },
];

const csTabs = [
  { id: "overview", label: "Overview" },
  { id: "workflow", label: "Workflow" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Decisions" },
  { id: "challenges", label: "Challenges" },
];

/* ================================================
   GLSL — hero background (flowing crimson noise)
   ================================================ */
const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uMouse;
  uniform float uScroll;
  uniform float uSmall;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) {
      if (i >= 5 - int(uSmall)) break;   // fewer octaves on small screens
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);

    float t = uTime * 0.07;
    vec2 q = vec2(fbm(p * 2.0 + t), fbm(p * 2.0 + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p * 2.0 + 4.0 * q + vec2(1.7, 9.2) + t * 1.2),
                  fbm(p * 2.0 + 4.0 * q + vec2(8.3, 2.8) - t));
    float f = fbm(p * 2.0 + 4.0 * r);

    float d = length(p - m);
    float glow = smoothstep(0.6, 0.0, d);

    vec3 base    = vec3(0.020, 0.008, 0.014);
    vec3 crimson = vec3(0.62, 0.07, 0.22);
    vec3 pink    = vec3(0.98, 0.30, 0.43);

    vec3 col = mix(base, crimson, smoothstep(0.25, 0.85, f) * 0.55);
    col += pink * pow(f, 4.0) * 0.30 * (1.0 - uScroll * 0.7);
    col += pink * glow * 0.20;

    float vig = smoothstep(1.1, 0.2, length(uv - 0.5) * 1.3);
    col *= mix(0.45, 1.0, vig);
    col += (hash(uv * uRes + uTime) - 0.5) * 0.018;   // film grain

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ================================================
   HOOKS
   ================================================ */

/* Three.js + GLSL background (lazy-loaded, pauses off-screen, cleans up) */
function useShaderBackground(canvasRef, heroRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      let THREE;
      try {
        THREE = await import("three"); // code-split: only loads on this page
      } catch {
        return;
      }
      if (disposed) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const small = window.innerWidth < 700;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: false,
          alpha: false,
          powerPreference: "low-power",
        });
      } catch {
        return; // no WebGL → CSS gradient fallback stays visible
      }

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5),
      );

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const uniforms = {
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(0.72, 0.45) },
        uScroll: { value: 0 },
        uSmall: { value: small ? 1 : 0 },
      };
      const material = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms,
        depthTest: false,
        depthWrite: false,
      });
      const geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));

      const target = new THREE.Vector2(0.72, 0.45);
      let visible = true;

      const render = () => renderer.render(scene, camera);

      const resize = () => {
        const w = hero.clientWidth;
        const h = hero.clientHeight;
        renderer.setSize(w, h, false);
        uniforms.uRes.value.set(w, h);
        if (reduce) render();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(hero);

      const onMove = (e) => {
        const r = hero.getBoundingClientRect();
        target.set(
          (e.clientX - r.left) / r.width,
          1 - (e.clientY - r.top) / r.height,
        );
      };
      hero.addEventListener("pointermove", onMove, { passive: true });

      const io = new IntersectionObserver(
        ([entry]) => (visible = entry.isIntersecting),
        { threshold: 0 },
      );
      io.observe(hero);

      const st = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => (uniforms.uScroll.value = self.progress),
      });

      const tick = (time) => {
        if (!visible) return;
        uniforms.uTime.value = time;
        uniforms.uMouse.value.lerp(target, 0.05);
        render();
      };

      if (reduce) render();
      else gsap.ticker.add(tick);
      canvas.classList.add("is-ready");

      cleanup = () => {
        gsap.ticker.remove(tick);
        ro.disconnect();
        io.disconnect();
        st.kill();
        hero.removeEventListener("pointermove", onMove);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.forceContextLoss?.();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [canvasRef, heroRef]);
}

/* Lenis smooth scroll — only on this page, synced with ScrollTrigger */
function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);
}

/* SEO — title, description, canonical, Open Graph, JSON-LD list */
function useSEO() {
  useEffect(() => {
    const origin = SITE_URL || window.location.origin;
    const url = origin + PAGE_PATH;
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
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", SEO_TITLE);
    setMeta("property", "og:description", SEO_DESC);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", SEO_TITLE);
    setMeta("name", "twitter:description", SEO_DESC);

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

    const catalog = [
      { name: featured.title, url: featured.live },
      ...sites.map((s) => ({ name: s.title, url: s.live })),
      ...backends.map((b) => ({ name: b.title, url: `${url}#${b.slug}` })),
    ];
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "projects-jsonld";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: SEO_TITLE,
      description: SEO_DESC,
      url,
      author: { "@type": "Person", name: "Kumar Bhadkamkar" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: catalog.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          url: c.url,
        })),
      },
    });
    document.head.appendChild(script);
    undo.push(() => script.remove());

    return () => undo.forEach((fn) => fn());
  }, []);
}

/* ================================================
   SMALL COMPONENTS
   ================================================ */
const ease = [0.22, 1, 0.36, 1];

function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </Tag>
  );
}

function Chips({ items, label }) {
  return (
    <ul className="pj-chips" aria-label={label}>
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

function BlockHead({ id, no, label, title, sub }) {
  return (
    <Reveal className="pj-block-head">
      <span className="pj-block-no">{no}</span>
      <span className="pj-block-line" aria-hidden="true" />
      <div>
        <p className="pj-block-label">{label}</p>
        <h2 className="pj-block-title" id={id}>
          {title}
        </h2>
        {sub && <p className="pj-block-sub">{sub}</p>}
      </div>
    </Reveal>
  );
}

/* illustrative dashboard mockup — no fake numbers, shapes only */
function DashboardMock() {
  return (
    <div className="pj-mock" aria-hidden="true">
      <div className="pj-mock-bar">
        <span />
        <span />
        <span />
        <em>product-management-admin-okzv.vercel.app</em>
      </div>
      <div className="pj-mock-body">
        <aside className="pj-mock-side">
          <b>PM</b>
          {[
            "Dashboard",
            "Categories",
            "Attributes",
            "Products",
            "Enquiries",
          ].map((t, i) => (
            <i key={t} className={i === 0 ? "on" : ""}>
              {t}
            </i>
          ))}
        </aside>
        <div className="pj-mock-main">
          <div className="pj-mock-head">
            <strong>Dashboard</strong>
            <span>+ Add Product</span>
          </div>
          <div className="pj-mock-tiles">
            {["Categories", "Products", "Published"].map((t) => (
              <div key={t}>
                <small>{t}</small>
                <span />
              </div>
            ))}
          </div>
          <div className="pj-mock-chart">
            {[40, 65, 50, 80, 60, 75, 90].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* website preview card with framer-motion 3D tilt */
function Preview({ title, category, domain, index }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 160,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), {
    stiffness: 160,
    damping: 18,
  });
  const canTilt =
    !reduce &&
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;

  const onMove = (e) => {
    if (!canTilt) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      className="pj-prev-wrap"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        className="pj-prev"
        style={
          canTilt
            ? { rotateX: rx, rotateY: ry, transformPerspective: 900 }
            : undefined
        }
        aria-hidden="true"
      >
        <div className="pj-prev-bar">
          <span />
          <span />
          <span />
          <em>{domain}</em>
        </div>
        <div
          className="pj-prev-body"
          style={{ "--a": `${135 + index * 22}deg` }}
        >
          <div className="pj-prev-nav">
            <b>{title.charAt(0)}</b>
            <i />
            <i />
            <i />
          </div>
          <p className="pj-prev-name">{title}</p>
          <p className="pj-prev-cat">{category}</p>
          <span className="pj-prev-cta" />
        </div>
      </motion.div>
    </div>
  );
}

function ActionLink({ href, children, primary, icon: Icon = FiExternalLink }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`pj-btn ${primary ? "pj-btn-primary" : "pj-btn-outline"}`}
      whileTap={{ scale: 0.97 }}
    >
      {children}
      {Icon && <Icon aria-hidden="true" />}
      <span className="pj-sr"> (opens in a new tab)</span>
    </motion.a>
  );
}

function SiteCard({ p, no, index }) {
  const domain = new URL(p.live).hostname.replace(/^www\./, "");
  return (
    <motion.article
      className="pj-card"
      id={p.slug}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.7, ease, delay: (index % 2) * 0.08 }}
    >
      <Preview
        title={p.title}
        category={p.category}
        domain={domain}
        index={index}
      />

      <div className="pj-card-body">
        <div className="pj-meta">
          <span className="pj-no">{no}</span>
          <span className="pj-cat">{p.category}</span>
        </div>
        <h3 className="pj-card-title">{p.title}</h3>
        <p className="pj-role">{p.role}</p>
        <p className="pj-desc">{p.text}</p>

        <ul className="pj-feats">
          {p.features.map((f) => (
            <li key={f}>
              <FiCheck aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        <Chips items={p.stack} label={`${p.title} tech stack`} />

        <div className="pj-actions">
          <ActionLink href={p.live} primary>
            Live Website
          </ActionLink>
        </div>
      </div>
    </motion.article>
  );
}

function BackendCard({ p, no, index }) {
  const hasCounts = p.modules.every((m) => typeof m.count === "number");
  return (
    <motion.article
      className="pj-card pj-card-api"
      id={p.slug}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.7, ease, delay: index * 0.08 }}
    >
      <div className="pj-api">
        <dl className="pj-api-metrics">
          {p.metrics.map((m) => (
            <div key={m.l}>
              <dt>{m.v}</dt>
              <dd>{m.l}</dd>
            </div>
          ))}
        </dl>

        {hasCounts && (
          <div className="pj-seg" aria-hidden="true">
            {p.modules.map((m, i) => (
              <motion.span
                key={m.name}
                style={{ flex: m.count, transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.12 }}
              />
            ))}
          </div>
        )}

        <ul className="pj-mods">
          {p.modules.map((m) => (
            <li key={m.name}>
              <span className="pj-mod-name">{m.name}</span>
              {hasCounts && (
                <span className="pj-mod-count">{m.count} APIs</span>
              )}
              <span className="pj-mod-note">{m.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pj-card-body">
        <div className="pj-meta">
          <span className="pj-no">{no}</span>
          <span className="pj-cat">{p.category}</span>
        </div>
        <h3 className="pj-card-title">{p.title}</h3>
        <p className="pj-role">{p.role}</p>
        <p className="pj-desc">{p.text}</p>

        <ul className="pj-feats">
          {p.features.map((f) => (
            <li key={f}>
              <FiCheck aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        <Chips items={p.stack} label={`${p.title} tech stack`} />

        <div className="pj-actions">
          <ActionLink href={p.code} primary icon={FiGithub}>
            View Code
          </ActionLink>
        </div>
      </div>
    </motion.article>
  );
}

/* tabbed case study for the featured project */
function CaseStudy({ study }) {
  const [tab, setTab] = useState("overview");

  return (
    <motion.div
      className="pj-cs"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      onAnimationComplete={() => ScrollTrigger.refresh()}
    >
      <div className="pj-cs-inner">
        <LayoutGroup id="pj-cs-tabs">
          <div
            className="pj-tabs"
            role="tablist"
            aria-label="Case study sections"
          >
            {csTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`pj-tab ${tab === t.id ? "is-active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="pj-tab-pill"
                    className="pj-tab-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="pj-tab-label">{t.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            className="pj-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease }}
          >
            {tab === "overview" && (
              <div className="pj-panel-grid">
                <div>
                  <h4>Problem</h4>
                  <p>{study.problem}</p>
                </div>
                <div>
                  <h4>Solution</h4>
                  <p>{study.solution}</p>
                </div>
                <div className="pj-span-2">
                  <h4>Use cases</h4>
                  <ul className="pj-feats pj-feats-2">
                    {study.useCases.map((u) => (
                      <li key={u}>
                        <FiCheck aria-hidden="true" />
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tab === "workflow" && (
              <ol className="pj-steps">
                {study.workflow.map((s, i) => (
                  <li key={s}>
                    <span className="pj-step-no">{i + 1}</span>
                    <p>{s}</p>
                  </li>
                ))}
              </ol>
            )}

            {tab === "architecture" && (
              <>
                <div className="pj-layers">
                  {study.layers.map((l) => (
                    <div className="pj-layer" key={l.name}>
                      <h4>{l.name}</h4>
                      <span className="pj-layer-sub">{l.sub}</span>
                      <ul>
                        {l.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Chips items={study.deploy} label="Deployment" />
              </>
            )}

            {tab === "decisions" && (
              <ul className="pj-decisions">
                {study.decisions.map(([d, why]) => (
                  <li key={d}>
                    <strong>{d}</strong>
                    <span>{why}</span>
                  </li>
                ))}
              </ul>
            )}

            {tab === "challenges" && (
              <div className="pj-panel-grid">
                {Object.entries(study.challenges).map(([side, list]) => (
                  <div key={side}>
                    <h4>{side}</h4>
                    <ul className="pj-feats">
                      {list.map((c) => (
                        <li key={c}>
                          <FiCheck aria-hidden="true" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Featured() {
  const [open, setOpen] = useState(false);
  const f = featured;

  /* parallax on the dashboard mockup (framer-motion, follows Lenis scroll) */
  const featRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: featRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section className="pj-block" aria-labelledby="pj-feat-heading">
      <BlockHead
        id="pj-feat-heading"
        no="01"
        label="Featured project"
        title="Full Stack Platform"
      />

      <article className="pj-feat" id={f.slug} ref={featRef}>
        <div className="pj-feat-grid">
          <div className="pj-feat-copy">
            <div className="pj-meta">
              <span className="pj-tag">{f.tag}</span>
              <span className="pj-kind">{f.kind}</span>
            </div>
            <h3 className="pj-feat-title">{f.title}</h3>
            <p className="pj-desc">{f.summary}</p>

            <Chips items={f.stack} label="Tech stack" />

            <dl className="pj-metrics">
              {f.metrics.map((m) => (
                <div key={m.l}>
                  <dt>{m.v}</dt>
                  <dd>{m.l}</dd>
                </div>
              ))}
            </dl>

            <div className="pj-actions">
              <ActionLink href={f.live} primary>
                Live Application
              </ActionLink>
              <motion.button
                type="button"
                className="pj-btn pj-btn-outline"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                whileTap={{ scale: 0.97 }}
              >
                {open ? "Hide case study" : "View case study"}
                <FiChevronDown
                  aria-hidden="true"
                  style={{
                    transform: open ? "rotate(180deg)" : "none",
                    transition: "transform .3s",
                  }}
                />
              </motion.button>
            </div>
          </div>

          <div className="pj-feat-visual">
            <motion.div
              className="pj-feat-visual-in"
              style={reduce ? undefined : { y: parallaxY }}
            >
              <DashboardMock />
            </motion.div>
            <p className="pj-mock-cap">Illustrative preview</p>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && <CaseStudy study={f.study} />}
        </AnimatePresence>
      </article>
    </section>
  );
}

function Sites() {
  return (
    <section className="pj-block" aria-labelledby="pj-sites-heading">
      <BlockHead
        id="pj-sites-heading"
        no="02"
        label="Business websites"
        title="Brands I've built for"
        sub="Live websites for real businesses: export, lifestyle, agri-tech and education."
      />
      <div className="pj-grid">
        {sites.map((p, i) => (
          <SiteCard key={p.slug} p={p} index={i} no={`0${i + 2}`} />
        ))}
      </div>
    </section>
  );
}

function Backends() {
  return (
    <section className="pj-block" aria-labelledby="pj-api-heading">
      <BlockHead
        id="pj-api-heading"
        no="03"
        label="Backend systems"
        title="Architecture & APIs"
        sub="Secure, modular REST APIs with JWT authentication and role-based access."
      />
      <div className="pj-grid">
        {backends.map((p, i) => (
          <BackendCard key={p.slug} p={p} index={i} no={`0${i + 7}`} />
        ))}
      </div>
    </section>
  );
}

/* ================================================
   PAGE
   ================================================ */
function Projects() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState("all");

  useSEO();
  useLenis();
  useShaderBackground(canvasRef, heroRef);

  /* GSAP: hero intro, scroll progress, parallax, CTA reveal */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(rootRef.current);

    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions.motion) return;

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".pj-pill", { y: 16, autoAlpha: 0, duration: 0.7 }, 0.1)
        .from(".pj-word-in", { yPercent: 115, duration: 1, stagger: 0.07 }, 0.2)
        .from(".pj-lead", { y: 18, autoAlpha: 0, duration: 0.8 }, 0.7)
        .from(
          ".pj-stat",
          { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.7 },
          0.85,
        );

      gsap.to(".pj-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
      });

      gsap.set("[data-fade]", { autoAlpha: 0, y: 26 });
      ScrollTrigger.batch("[data-fade]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          }),
      });
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, []);

  /* page height changes when the filter changes */
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => clearTimeout(t);
  }, [active]);

  const show = (type) => active === "all" || active === type;
  const words = ["Work", "I've", "Built", "and", "Deployed"];

  return (
    <MotionConfig reducedMotion="user">
      <div className="pj" ref={rootRef}>
        <div className="pj-progress" aria-hidden="true">
          <div className="pj-progress-bar" />
        </div>

        {/* ───────── HERO (three.js + GLSL) ───────── */}
        <header className="pj-hero" ref={heroRef}>
          <canvas ref={canvasRef} className="pj-canvas" aria-hidden="true" />
          <div className="pj-hero-shade" aria-hidden="true" />

          <div className="pj-wrap pj-hero-inner">
            <span className="pj-pill">
              <span className="pj-pill-dot" />
              Projects
            </span>

            <h1 className="pj-title">
              {words.map((w, i) => (
                <span className="pj-word" key={w}>
                  <span
                    className={`pj-word-in ${i === words.length - 1 ? "pj-accent" : ""}`}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </h1>

            <p className="pj-lead">
              Real websites and backend systems built for businesses, from
              client websites to a multi-tenant platform.
            </p>

            <dl className="pj-stats">
              {heroStats.map((s) => (
                <div className="pj-stat" key={s.l}>
                  <dt>{s.v}</dt>
                  <dd>{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="pj-wrap">
          {/* ───────── FILTER ───────── */}
          <div className="pj-toolbar" data-fade>
            <LayoutGroup id="pj-filters">
              <div
                className="pj-filters"
                role="group"
                aria-label="Filter projects"
              >
                {filters.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`pj-filter ${active === f.id ? "is-active" : ""}`}
                    aria-pressed={active === f.id}
                    onClick={() => setActive(f.id)}
                  >
                    {active === f.id && (
                      <motion.span
                        layoutId="pj-filter-pill"
                        className="pj-filter-pill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}
                    <span className="pj-filter-label">
                      {f.label} <sup>{f.count}</sup>
                    </span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
          </div>

          {/* ───────── CONTENT ───────── */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease }}
            >
              {show("fullstack") && <Featured />}
              {show("website") && <Sites />}
              {show("backend") && <Backends />}
            </motion.div>
          </AnimatePresence>

          {/* ───────── CTA ───────── */}
          <aside className="pj-cta" data-fade aria-labelledby="pj-cta-title">
            <h2 className="pj-cta-title" id="pj-cta-title">
              Have a Project in Mind?
            </h2>
            <p className="pj-cta-text">
              Let's discuss your idea and turn it into a practical digital
              product.
            </p>
            <div className="pj-cta-btns">
              <Link to="/#contact" className="pj-btn pj-btn-primary">
                Start a Project <FiArrowRight aria-hidden="true" />
              </Link>
              <Link to="/about" className="pj-btn pj-btn-outline">
                About Me <FiArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </MotionConfig>
  );
}

export default Projects;
