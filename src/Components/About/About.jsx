import React from "react";
import { Helmet } from "react-helmet-async";
import { FaArrowRight, FaCode, FaServer, FaBolt, FaUsers } from "react-icons/fa";
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb,
  SiTypescript, SiDocker, SiGit, SiLinux,
  SiNginx, SiPostman, SiJavascript, SiRedis,
} from "react-icons/si";
import "./About.css";

const stats = [
  { number: "15+", label: "Projects Completed", icon: <FaCode /> },
  { number: "20+", label: "Technologies", icon: <FaBolt /> },
  { number: "6 Mo", label: "Internship", icon: <FaUsers /> },
  { number: "30+", label: "Repositories", icon: <FaServer /> },
];

const techStack = [
  { icon: <SiReact />,      name: "React.js",   color: "#61dafb", tier: "MERN" },
  { icon: <SiNodedotjs />,  name: "Node.js",    color: "#6cc24a", tier: "MERN" },
  { icon: <SiExpress />,    name: "Express.js", color: "#cccccc", tier: "MERN" },
  { icon: <SiMongodb />,    name: "MongoDB",    color: "#47a248", tier: "MERN" },
  { icon: <SiTypescript />, name: "TypeScript", color: "#3178c6", tier: "MERN" },
  { icon: <SiJavascript />, name: "JavaScript", color: "#f7df1e", tier: "MERN" },
  { icon: <SiDocker />,     name: "Docker",     color: "#2496ed", tier: "DevOps" },
  { icon: <SiLinux />,      name: "Linux",      color: "#ffd700", tier: "DevOps" },
  { icon: <SiNginx />,      name: "Nginx",      color: "#009639", tier: "DevOps" },
  { icon: <SiGit />,        name: "Git",        color: "#f05032", tier: "DevOps" },
  { icon: <SiPostman />,    name: "Postman",    color: "#ff6c37", tier: "DevOps" },
  { icon: <SiRedis />,       name: "Redis",      color: "#dc382d", tier: "MERN" },
];

const skills = [
  "React.js", "Node.js", "Express.js", "MongoDB",
  "WebSocket", "TypeScript", "REST APIs", "Context API",
  "Docker", "Linux", "Nginx", "Git",
];

const timeline = [
  { year: "2022", label: "Started IT Degree", sub: "B.Sc. IT — Shivaji University" },
  { year: "2023", label: "First MERN Project", sub: "Built full-stack apps with auth" },
  { year: "2024", label: "Axelyne Internship", sub: "Live client work, 6 months" },
  { year: "2025", label: "Going Deeper", sub: "DevOps, Docker, real-time systems" },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Kumar Bhadkamkar — MERN Stack Developer</title>
        <meta
          name="description"
          content="MERN Stack Developer skilled in React, Node.js, Express.js, MongoDB, WebSocket, TypeScript, Docker. Building scalable web applications."
        />
      </Helmet>

      <section className="about section" id="about">

        {/* ── Floating particles ── */}
        <div className="about-particles" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`about-particle ap-${i}`} />
          ))}
        </div>

        {/* ── Ambient orbs ── */}
        <div className="about-orb about-orb-1" aria-hidden="true" />
        <div className="about-orb about-orb-2" aria-hidden="true" />

        <div className="container about__container">

          {/* ════ HERO HEADER ════ */}
          <div className="about__header">
            <span className="about__eyebrow animate-fade-in-up">
              <span className="about__dot" />
              About Me
            </span>
            <h1 className="about__title animate-fade-in-up delay-100">
              MERN Stack
              <span className="about__title-accent"> Developer</span>
            </h1>
            <p className="about__lead animate-fade-in-up delay-200">
              Building scalable, modern web applications with React.js, Node.js,
              Express.js &amp; MongoDB — clean UI, real‑time features, and
              bulletproof auth systems.
            </p>
          </div>

          {/* ════ STATS ROW — auto flip-bounce ════ */}
          <div className="about__stats">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="about__stat-card"
                style={{ animationDelay: `${i * 0.18}s` }}
              >
                <div className="about__stat-flip">
                  <div className="about__stat-front">
                    <span className="about__stat-icon">{s.icon}</span>
                    <span className="about__stat-num">{s.number}</span>
                  </div>
                  <div className="about__stat-back">
                    <span className="about__stat-label">{s.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ════ MAIN GRID ════ */}
          <div className="about__grid">

            {/* LEFT — bio + skills */}
            <div className="about__left">
              <div className="about__bio card card-red">
                <span className="badge badge-red mb-2">Who I Am</span>
                <h3>Full-Stack Web Developer</h3>
                <p>
                  MERN Stack Developer with hands-on experience building scalable
                  frontend and backend web applications. Skilled in authentication
                  systems, CRUD operations, REST APIs, Context API,
                  real-time communication, responsive UI, and optimised backend
                  architecture.
                </p>
                <p className="mt-2">
                  My goal is to build modern digital products and grow into a
                  successful technology startup through clean development and
                  premium user experiences.
                </p>
              </div>

              {/* Skills chips — bounce in stagger */}
              <div className="about__skills-wrap">
                <span className="badge badge-dark mb-2">Tech Skills</span>
                <div className="about__skills">
                  {skills.map((sk, i) => (
                    <span
                      key={sk}
                      className="about__skill"
                      style={{ animationDelay: `${i * 0.07}s` }}
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="about__ctaRow">
                <a href="#contact" className="btn btn-primary btn-lg">
                  Hire Me <FaArrowRight />
                </a>
                <a href="#projects" className="btn btn-outline btn-lg">
                  View Projects
                </a>
              </div>
            </div>

            {/* RIGHT — info cards */}
            <div className="about__right">
              <div className="about__info-card glass-intense">
                <h4 className="about__info-title">
                  <span className="glow-dot" /> Experience
                </h4>
                <p>
                  <strong>Axelyne</strong> — Live client handling, Google Meet
                  communication, project planning, and full‑stack MERN
                  development.
                </p>
              </div>

              <div className="about__info-card glass-intense">
                <h4 className="about__info-title">
                  <span className="glow-dot" /> Education
                </h4>
                <p>
                  B.Sc. in Information Technology
                  <br />
                  <strong>Shivaji University, Kolhapur</strong>
                </p>
              </div>

              <div className="about__info-card glass-intense">
                <h4 className="about__info-title">
                  <span className="glow-dot" /> Languages
                </h4>
                <p>Marathi &nbsp;·&nbsp; English &nbsp;·&nbsp; Hindi</p>
              </div>

              <div className="about__info-card about__startup glass-intense">
                <h4 className="about__info-title">
                  <span className="glow-dot" /> Startup Vision
                </h4>
                <p>
                  Building modern digital products and growing into a technology
                  startup through clean development, scalable backend systems,
                  and premium user experiences.
                </p>
              </div>
            </div>
          </div>

          {/* ════ TECH STACK — auto bounce orbit cards ════ */}
          <div className="about__tech-section">
            <div className="section-title">
              <h2>Tech Stack</h2>
              <p className="mt-2">Tools &amp; technologies I work with daily</p>
            </div>

            <div className="about__tech-tiers">
              {["MERN", "DevOps"].map((tier) => (
                <div key={tier} className="about__tech-tier">
                  <span className="about__tier-badge">{tier}</span>
                  <div className="about__tech-grid">
                    {techStack
                      .filter((t) => t.tier === tier)
                      .map((t, i) => (
                        <div
                          key={t.name}
                          className="about__tech-card"
                          style={{ animationDelay: `${i * 0.12}s` }}
                        >
                          <span
                            className="about__tech-icon"
                            style={{ color: t.color }}
                          >
                            {t.icon}
                          </span>
                          <span className="about__tech-name">{t.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ════ TIMELINE ════ */}
          <div className="about__timeline-section">
            <div className="section-title">
              <h2>My Journey</h2>
            </div>
            <div className="about__timeline">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className="about__tl-item"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="about__tl-line" />
                  <div className="about__tl-dot">
                    <span className="about__tl-dot-inner" />
                  </div>
                  <div className="about__tl-content card">
                    <span className="about__tl-year">{item.year}</span>
                    <h4>{item.label}</h4>
                    <p>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;