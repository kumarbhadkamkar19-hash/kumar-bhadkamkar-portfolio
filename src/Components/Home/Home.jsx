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
  const mousePos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  /* ── Canvas: particles + ripple ──────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const points = Array.from({ length: 75 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.28 + 0.07,
    }));

    let ripples = [],
      lastMouse = { x: 0, y: 0 },
      frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mousePos.current.x,
        my = mousePos.current.y;
      const dx = mx - lastMouse.x,
        dy = my - lastMouse.y;

      if (Math.sqrt(dx * dx + dy * dy) > 8 && frame % 4 === 0) {
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
        g.addColorStop(0, `rgba(59,130,246,0)`);
        g.addColorStop(0.6, `rgba(59,130,246,${rip.alpha * 0.22})`);
        g.addColorStop(1, `rgba(59,130,246,0)`);
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59,130,246,${rip.alpha * 0.45})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dm = Math.hypot(p.x - mx, p.y - my);
        if (dm < 150) {
          const str = 1 - dm / 150;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(59,130,246,${str * 0.18})`;
          ctx.lineWidth = str * 1.1;
          ctx.stroke();
        }
        points.forEach((p2) => {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 90) * 0.07})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  /* ── GSAP: On-load master timeline ──── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Initial hidden states ──
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

      gsap.set(gsap.utils.toArray(ctaRef.current?.children ?? []), {
        opacity: 0,
        y: 22,
        scale: 0.88,
      });

      gsap.set(cardRef.current, { opacity: 0, scale: 0.88, y: 35 });
      gsap.set(ring1Ref.current, { opacity: 0, scale: 0.65 });
      gsap.set(ring2Ref.current, { opacity: 0, scale: 0.55 });
      gsap.set(statChip1Ref.current, { opacity: 0, scale: 0.45, x: 24 });
      gsap.set(statChip2Ref.current, { opacity: 0, scale: 0.45, x: -24 });

      // ── Master TL ──
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
          gsap.utils.toArray(ctaRef.current?.children ?? []),
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
        // Card
        .to(
          cardRef.current,
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power4.out" },
          0.42,
        )
        // Rings — elastic pop
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
        // Stat chips — bounce
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

      // ── ScrollTrigger: hero fades on scroll ──
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── GSAP: Card mouse tilt ────────────── */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
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

      // Rings react to distance
      const dist = Math.sqrt(dx * dx + dy * dy);
      gsap.to([ring1Ref.current, ring2Ref.current], {
        scale: 1 + dist * 0.045,
        opacity: 0.45 + dist * 0.12,
        duration: 0.4,
        ease: "power2.out",
      });

      // Stat chips drift with mouse
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

    const img = wrap.querySelector("img");

    const onEnter = () => {
      gsap.to(img, { scale: 1.08, duration: 0.55, ease: "power2.out" });
      gsap.to(shine, { opacity: 0.65, duration: 0.4, ease: "power2.out" });
      gsap.to(card, {
        boxShadow:
          "0 0 0 1px rgba(59,130,246,0.4), 0 50px 120px rgba(0,0,0,0.75), 0 0 90px rgba(59,130,246,0.2)",
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(img, { scale: 1, duration: 0.6, ease: "power3.out" });
      gsap.to(shine, { opacity: 0.18, duration: 0.5, ease: "power2.out" });
      gsap.to(card, {
        boxShadow:
          "0 0 0 1px rgba(59,130,246,0.1), 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
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
    <section className="hero-section" ref={sectionRef}>
      <canvas ref={canvasRef} className="wave-canvas" />

      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="hero-container">
        {/* LEFT */}
        <div className="hero-left">
          <div className="status-badge" ref={badgeRef}>
            <span className="status-dot" />
            <span>Available for Projects</span>
          </div>

          <h1 className="hero-name">
            <span className="name-line name-line-2  " ref={nameLine1Ref}>
              Kumar
            </span>
            <span className="name-line name-line-2" ref={nameLine2Ref}>
              Bhadkamkar
            </span>
          </h1>

          <div className="hero-role" ref={roleRef}>
            <span className="role-text">MERN Stack Developer</span>
            <span className="role-divider">·</span>
            <span className="role-sub">Future Startup Founder</span>
          </div>

          <p className="hero-summary" ref={summaryRef}>
            Building scalable, modern web applications with React.js, Node.js,
            Express.js &amp; MongoDB — clean UI, real‑time features, and
            bulletproof auth systems.
          </p>

          <div className="hero-cta" ref={ctaRef}>
            <a href="#projects" className="cta-primary">
              View Projects <FiArrowRight />
            </a>
            <a href="#contact" className="cta-accent">
              Contact Me
            </a>
            <a href="/resume.pdf" className="cta-ghost" download>
              <FiDownload /> Resume
            </a>
          </div>

          <div className="social-row" ref={socialRef}>
            <a
              href="https://github.com/kumarbhadkamkar19-hash"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FiGithub />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/kumar-bhadkamkar/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FiLinkedin />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
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

          <div className="stat-chip stat-chip-1" ref={statChip1Ref}>
            <span className="stat-num">6 Mo</span>
            <span className="stat-label">Experience</span>
          </div>
          <div className="stat-chip stat-chip-2" ref={statChip2Ref}>
            <span className="stat-num">8+</span>
            <span className="stat-label">Projects</span>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}

export default Home;
