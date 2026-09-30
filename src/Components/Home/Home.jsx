import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiLinkedin, FiDownload, FiArrowRight } from "react-icons/fi";
import "./Home.css";
import profile from "../../assets/images/profile.jpg";
gsap.registerPlugin(ScrollTrigger);

function Home() {
  /* ── Refs ─────────────────────────────── */
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const nameLine1Ref = useRef(null);
  const nameLine2Ref = useRef(null);
  const roleRef = useRef(null);
  const summaryRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const cardRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const statChip1Ref = useRef(null);
  const statChip2Ref = useRef(null);
  const profileImgRef = useRef(null);
  const imgShineRef = useRef(null);

  /* ── Canvas: particles + ripple (section-scoped, DPR aware) ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0,
      h = 0,
      points = [],
      ripples = [],
      raf = null,
      visible = true,
      frame = 0;
    const mouse = { x: -1000, y: -1000 };
    let lastMouse = { x: -1000, y: -1000 };

    const init = () => {
      w = section.clientWidth;
      h = section.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // fewer particles on small screens = smooth on phones
      const count = Math.min(75, Math.max(22, Math.floor((w * h) / 16000)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.28 + 0.07,
      }));
    };
    init();

    const ro = new ResizeObserver(init);
    ro.observe(section);

    const onPointerMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerLeave, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf && !reduceMotion) raf = requestAnimationFrame(draw);
      },
      { threshold: 0 },
    );
    io.observe(section);

    const drawFrame = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.x,
        my = mouse.y;

      if (
        Math.hypot(mx - lastMouse.x, my - lastMouse.y) > 8 &&
        frame % 4 === 0 &&
        mx > -500
      ) {
        ripples.push({ x: mx, y: my, r: 0, alpha: 0.42 });
        lastMouse = { x: mx, y: my };
      }

      ripples = ripples.filter((r) => r.alpha > 0.01);
      ripples.forEach((rip) => {
        rip.r += 2.8;
        rip.alpha *= 0.92;
        const g = ctx.createRadialGradient(
          rip.x,
          rip.y,
          rip.r * 0.5,
          rip.x,
          rip.y,
          rip.r,
        );
        g.addColorStop(0, "rgba(225,29,72,0)");
        g.addColorStop(0.6, `rgba(225,29,72,${rip.alpha * 0.22})`);
        g.addColorStop(1, "rgba(225,29,72,0)");
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(251,77,109,${rip.alpha * 0.45})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dm = Math.hypot(p.x - mx, p.y - my);
        if (dm < 150) {
          const str = 1 - dm / 150;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(251,77,109,${str * 0.2})`;
          ctx.lineWidth = str * 1.1;
          ctx.stroke();
        }
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(190,18,60,${(1 - d / 90) * 0.12})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,77,109,${p.opacity})`;
        ctx.fill();
      }
    };

    function draw() {
      if (!visible) {
        raf = null;
        return;
      }
      drawFrame();
      raf = requestAnimationFrame(draw);
    }

    if (reduceMotion) drawFrame();
    else raf = requestAnimationFrame(draw);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerLeave);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  /* ── GSAP: On-load master timeline ──── */
  useEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      gsap.set(
        [
          badgeRef.current,
          nameLine1Ref.current,
          nameLine2Ref.current,
          roleRef.current,
          summaryRef.current,
          socialRef.current,
        ],
        { opacity: 0, y: 45 },
      );

      const ctaItems = gsap.utils.toArray(ctaRef.current?.children ?? []);
      gsap.set(ctaItems, { opacity: 0, y: 22, scale: 0.88 });

      gsap.set(cardRef.current, { opacity: 0, scale: 0.88, y: 35 });
      gsap.set(ring1Ref.current, { opacity: 0, scale: 0.65 });
      gsap.set(ring2Ref.current, { opacity: 0, scale: 0.55 });
      gsap.set(statChip1Ref.current, { opacity: 0, scale: 0.45, x: 24 });
      gsap.set(statChip2Ref.current, { opacity: 0, scale: 0.45, x: -24 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.15)
        .to(nameLine1Ref.current, { opacity: 1, y: 0, duration: 0.85 }, 0.38)
        .to(nameLine2Ref.current, { opacity: 1, y: 0, duration: 0.85 }, 0.54)
        .to(roleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.72)
        .fromTo(
          summaryRef.current,
          { opacity: 0, y: 22, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85 },
          0.88,
        )
        .to(
          ctaItems,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: "back.out(1.6)",
          },
          1.08,
        )
        .to(socialRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.38)
        .to(
          cardRef.current,
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power4.out" },
          0.42,
        )
        .to(
          ring1Ref.current,
          {
            opacity: 0.45,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1,0.5)",
          },
          0.65,
        )
        .to(
          ring2Ref.current,
          {
            opacity: 0.22,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1,0.5)",
          },
          0.82,
        )
        .to(
          statChip1Ref.current,
          { opacity: 1, scale: 1, x: 0, duration: 0.75, ease: "back.out(2.2)" },
          1.15,
        )
        .to(
          statChip2Ref.current,
          { opacity: 1, scale: 1, x: 0, duration: 0.75, ease: "back.out(2.2)" },
          1.28,
        );

      // Scroll-scrub effects — desktop only (keeps phones smooth & content readable)
      mm.add("(min-width: 1025px)", () => {
        gsap.to(sectionRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          opacity: 0.25,
          scale: 0.97,
          ease: "none",
        });

        gsap.to(cardRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "55% top",
            scrub: true,
          },
          scale: 0.92,
          y: 40,
          ease: "none",
        });
      });
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  /* ── GSAP: Card mouse tilt (mouse devices only) ── */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    let bounds;
    const onEnter = () => {
      bounds = card.getBoundingClientRect();
    };
    const onMove = (e) => {
      if (!bounds) return;
      const cx = bounds.left + bounds.width / 2;
      const cy = bounds.top + bounds.height / 2;
      const dx = (e.clientX - cx) / (bounds.width / 2);
      const dy = (e.clientY - cy) / (bounds.height / 2);

      gsap.to(card, {
        rotateY: dx * 11,
        rotateX: -dy * 9,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 900,
      });

      const dist = Math.sqrt(dx * dx + dy * dy);
      gsap.to([ring1Ref.current, ring2Ref.current], {
        scale: 1 + dist * 0.045,
        opacity: 0.45 + dist * 0.12,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(statChip1Ref.current, {
        x: dx * 9,
        y: dy * 7,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(statChip2Ref.current, {
        x: -dx * 7,
        y: -dy * 5,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.4)",
        transformPerspective: 900,
      });
      gsap.to([ring1Ref.current, ring2Ref.current], {
        scale: 1,
        opacity: 0.4,
        duration: 0.65,
        ease: "power2.out",
      });
      gsap.to([statChip1Ref.current, statChip2Ref.current], {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: "elastic.out(1, 0.5)",
      });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── GSAP: Profile image hover ────────── */
  useEffect(() => {
    const wrap = profileImgRef.current;
    const shine = imgShineRef.current;
    const card = cardRef.current;
    if (!wrap || !shine || !card) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const img = wrap.querySelector("img");

    const onEnter = () => {
      gsap.to(img, { scale: 1.08, duration: 0.55, ease: "power2.out" });
      gsap.to(shine, { opacity: 0.65, duration: 0.4, ease: "power2.out" });
      gsap.to(card, {
        boxShadow:
          "0 0 0 1px rgba(225,29,72,0.45), 0 50px 120px rgba(0,0,0,0.75), 0 0 90px rgba(225,29,72,0.25)",
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(img, { scale: 1, duration: 0.6, ease: "power3.out" });
      gsap.to(shine, { opacity: 0.18, duration: 0.5, ease: "power2.out" });
      gsap.to(card, {
        boxShadow:
          "0 0 0 1px rgba(225,29,72,0.12), 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        duration: 0.5,
        ease: "power2.out",
      });
    };

    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ── JSX ─────────────────────────────── */
  return (
    <section className="hero-section" id="home" ref={sectionRef}>
      <canvas ref={canvasRef} className="wave-canvas" />

      <div className="hero-grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="hero-container">
        {/* LEFT */}
        <div className="hero-left">
          <div className="status-badge" ref={badgeRef}>
            <span className="status-dot" />
            <span>Available for Opportunities</span>
          </div>

          <h1 className="hero-name">
            <span className="name-line name-line-2" ref={nameLine1Ref}>
              Kumar
            </span>
            <span className="name-line name-line-2" ref={nameLine2Ref}>
              Bhadkamkar
            </span>
          </h1>

          <div className="hero-role" ref={roleRef}>
            <span className="role-text">Full Stack Developer</span>
            <span className="role-divider">·</span>
            <span className="role-sub">Backend &amp; AI/LLM</span>
          </div>

          <p className="hero-summary" ref={summaryRef} >
            MERN Stack Developer building secure, scalable web applications and
            REST APIs with React.js, Node.js, Express.js & MongoDB — focused on
            clean architecture, authentication, and AI/LLM integration.
          </p>

          <div className="hero-cta" ref={ctaRef}>
            <a href="#projects" className="cta-primary">
              View Projects <FiArrowRight />
            </a>
            <a href="#contact" className="cta-accent">
              Contact Me
            </a>
            <a href="/resume.pdf" className="cta-ghost" download>
              <FiDownload /> Download Resume
            </a>
          </div>

          <div className="social-row" ref={socialRef}>
            <a
              href="https://github.com/kumarbhadkamkar19-hash"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <FiGithub /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kumar-bhadkamkar/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <FiLinkedin /> LinkedIn
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <div className="card-stage">
            {/* float wrapper so CSS float never fights GSAP tilt */}
            <div className="card-float">
              <div className="profile-card" ref={cardRef}>
                <div className="ring ring-1" ref={ring1Ref} />
                <div className="ring ring-2" ref={ring2Ref} />

                <div className="profile-img-wrap" ref={profileImgRef}>
                  <img
                    src={profile}
                    alt="Kumar Bhadkamkar"
                    className="profile-img"
                  />
                  <div className="img-shine" ref={imgShineRef} />
                </div>

                <div className="card-info">
                  <span className="card-name">Kumar Bhadkamkar</span>
                  <span className="card-tag">MERN Developer</span>
                </div>

                <div className="corner-glow tl" />
                <div className="corner-glow br" />
              </div>
            </div>

            <div className="stat-chip stat-chip-1" ref={statChip1Ref}>
              <div className="stat-chip-inner">
                <span className="stat-num">6+</span>
                <span className="stat-label">Months Experience</span>
              </div>
            </div>

            <div className="stat-chip stat-chip-2" ref={statChip2Ref}>
              <div className="stat-chip-inner">
                <span className="stat-num">4+</span>
                <span className="stat-label">Deployed Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-hint" aria-label="Scroll to About">
        <div className="scroll-line" />
        <span>Scroll to explore ↓</span>
      </a>
    </section>
  );
}

export default Home;