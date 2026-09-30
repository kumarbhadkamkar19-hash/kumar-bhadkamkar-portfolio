import React, { useState } from "react";
import "./Projects.css";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const clientProjects = [
    {
      id: 1,
      name: "Meena",
      category: "E-Commerce",
      business:
        "Handcrafted ethnic wear brand with curated collections and seamless shopping experience.",
      impact: "Modern storefront · Mobile-first · Fast checkout",
      color: "#FF174F",
      preview: "meena",
    },
    {
      id: 2,
      name: "CAPURRI",
      category: "Lifestyle Brand",
      business:
        "Premium headwear label showcasing signature caps with bold visual storytelling.",
      impact: "Brand identity · Product showcase · Clean UX",
      color: "#FF5C7A",
      preview: "capurri",
    },
    {
      id: 3,
      name: "Krushi Logic",
      category: "Agri-Tech",
      business:
        "Smart farming solutions platform connecting farmers with modern agricultural technology.",
      impact: "Rural-focused · Informative · Trust-building",
      color: "#FF174F",
      preview: "krushi",
    },
    {
      id: 4,
      name: "Vishant Impex",
      category: "Import/Export",
      business:
        "Global trading company website highlighting international supply chain capabilities.",
      impact: "Corporate · Global reach · Professional",
      color: "#FF5C7A",
      preview: "vishant",
    },
  ];

  const backendProjects = [
    {
      id: 5,
      name: "School Management System",
      category: "Enterprise Backend",
      description:
        "Complete backend architecture for school administration with student, staff, and academic management.",
      apis: "40+ REST APIs",
      features: [
        "Student Records",
        "Attendance System",
        "Fee Management",
        "Report Generation",
      ],
      stack: ["Node.js", "Express", "MongoDB", "JWT"],
    },
    {
      id: 6,
      name: "Trip Planner API",
      category: "Travel Backend",
      description:
        "Scalable backend service powering itinerary creation, booking management, and travel recommendations.",
      apis: "25+ REST APIs",
      features: [
        "Itinerary Builder",
        "Booking Engine",
        "User Preferences",
        "Recommendation Engine",
      ],
      stack: ["Node.js", "Express", "MongoDB", "Redis"],
    },
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <div className="header-label">
            <span className="label-dot"></span>
            <span>SELECTED WORK</span>
          </div>
          <h2 className="projects-title">
            Projects that <span className="accent-text">matter</span>
          </h2>
          <p className="projects-subtitle">
            A curated collection of case studies — from enterprise platforms to
            client websites and scalable backends.
          </p>
        </div>

        {/* ============ FEATURED PROJECT ============ */}
        <div className="featured-project">
          <div className="featured-badge">
            <span className="badge-number">01</span>
            <span className="badge-text">FEATURED PROJECT</span>
          </div>

          <div className="featured-grid">
            {/* Left Content */}
            <div className="featured-content">
              <div className="content-meta">
                <span className="meta-tag">PRODUCT MANAGEMENT</span>
                <span className="meta-divider">·</span>
                <span className="meta-sub">Full Stack MERN</span>
              </div>

              <h3 className="featured-title">
                Domain-Based Product Management Platform
              </h3>

              <p className="featured-description">
                A full-stack multi-tenant product catalogue management platform
                with React admin dashboard, secure REST APIs, domain-based data
                isolation and cloud image management.
              </p>

              <div className="tech-pills">
                {[
                  "React",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "JWT",
                  "RBAC",
                  "Cloudinary",
                ].map((tech) => (
                  <span key={tech} className="pill">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="featured-stats">
                <div className="stat">
                  <span className="stat-value">22+</span>
                  <span className="stat-label">APIs</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-value">Multi</span>
                  <span className="stat-label">Tenant</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-value">RBAC</span>
                  <span className="stat-label">Auth</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-value">Cloud</span>
                  <span className="stat-label">Images</span>
                </div>
              </div>

              <div className="featured-actions">
                <button className="btn-primary">
                  View Case Study
                  <span className="btn-arrow">→</span>
                </button>
                <button className="btn-secondary">
                  Live Application
                  <span className="btn-arrow">↗</span>
                </button>
              </div>
            </div>

            {/* Right Mockup */}
            <div className="featured-visual">
              <div className="dashboard-mockup">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="mockup-url">app.productmgmt.io/dashboard</div>
                </div>
                <div className="mockup-body">
                  <div className="mockup-sidebar">
                    <div className="sidebar-logo">PM</div>
                    <div className="sidebar-item active">Dashboard</div>
                    <div className="sidebar-item">Products</div>
                    <div className="sidebar-item">Categories</div>
                    <div className="sidebar-item">Users</div>
                    <div className="sidebar-item">Settings</div>
                  </div>
                  <div className="mockup-main">
                    <div className="main-header">
                      <h4>Dashboard Overview</h4>
                      <div className="header-actions">
                        <div className="action-btn">+ Add Product</div>
                      </div>
                    </div>
                    <div className="stats-row">
                      <div className="mini-stat">
                        <div className="mini-label">Products</div>
                        <div className="mini-value">1,247</div>
                      </div>
                      <div className="mini-stat">
                        <div className="mini-label">Categories</div>
                        <div className="mini-value">38</div>
                      </div>
                      <div className="mini-stat">
                        <div className="mini-label">Users</div>
                        <div className="mini-value">156</div>
                      </div>
                    </div>
                    <div className="chart-mockup">
                      <div
                        className="chart-bar"
                        style={{ height: "40%" }}
                      ></div>
                      <div
                        className="chart-bar"
                        style={{ height: "65%" }}
                      ></div>
                      <div
                        className="chart-bar"
                        style={{ height: "50%" }}
                      ></div>
                      <div
                        className="chart-bar"
                        style={{ height: "80%" }}
                      ></div>
                      <div
                        className="chart-bar"
                        style={{ height: "60%" }}
                      ></div>
                      <div
                        className="chart-bar"
                        style={{ height: "75%" }}
                      ></div>
                      <div
                        className="chart-bar"
                        style={{ height: "90%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="visual-glow"></div>
            </div>
          </div>
        </div>

        {/* ============ CLIENT PROJECTS ============ */}
        <div className="projects-block">
          <div className="block-header">
            <div className="block-label">
              <span className="label-dot"></span>
              <span>CLIENT WEBSITES</span>
            </div>
            <h3 className="block-title">Brands I've built for</h3>
            <p className="block-subtitle">
              Real businesses, real impact. Each project crafted to solve
              specific business goals.
            </p>
          </div>

          <div className="client-grid">
            {clientProjects.map((project, index) => (
              <div
                key={project.id}
                className="client-card"
                style={{ "--card-accent": project.color }}
              >
                <div className="card-number">0{index + 2}</div>

                {/* Website Screenshot Mockup */}
                <div className="client-visual">
                  <div className="browser-frame">
                    <div className="browser-top">
                      <div className="browser-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className="browser-url">
                        {project.name.toLowerCase()}.com
                      </div>
                    </div>
                    <div
                      className="website-preview"
                      data-preview={project.preview}
                    >
                      {/* Dynamic preview content based on project */}
                      <div className="preview-hero">
                        <div className="preview-nav">
                          <div className="preview-logo">
                            {project.name.charAt(0)}
                          </div>
                          <div className="preview-links">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                        <div className="preview-content">
                          <div className="preview-heading">{project.name}</div>
                          <div className="preview-subheading">
                            {project.category}
                          </div>
                          <div className="preview-cta">Shop Now</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="client-content">
                  <div className="client-category">{project.category}</div>
                  <h4 className="client-name">{project.name}</h4>
                  <p className="client-business">{project.business}</p>
                  <div className="client-impact">{project.impact}</div>
                  <div className="client-actions">
                    <button className="view-link">
                      View Project <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ BACKEND PROJECTS ============ */}
        <div className="projects-block">
          <div className="block-header">
            <div className="block-label">
              <span className="label-dot"></span>
              <span>BACKEND SYSTEMS</span>
            </div>
            <h3 className="block-title">Architecture & APIs</h3>
            <p className="block-subtitle">
              Scalable backend systems powering complex business logic.
            </p>
          </div>

          <div className="backend-grid">
            {backendProjects.map((project, index) => (
              <div key={project.id} className="backend-card">
                <div className="card-number">0{index + 6}</div>

                {/* API/Architecture Visual */}
                <div className="backend-visual">
                  <div className="api-diagram">
                    <div className="api-node client-node">
                      <div className="node-icon">👤</div>
                      <div className="node-label">Client</div>
                    </div>
                    <div className="api-connector">
                      <div className="connector-line"></div>
                      <div className="connector-label">REST</div>
                    </div>
                    <div className="api-node server-node">
                      <div className="node-icon">⚡</div>
                      <div className="node-label">API Server</div>
                    </div>
                    <div className="api-connector">
                      <div className="connector-line"></div>
                      <div className="connector-label">Query</div>
                    </div>
                    <div className="api-node db-node">
                      <div className="node-icon">🗄️</div>
                      <div className="node-label">Database</div>
                    </div>
                  </div>
                  <div className="api-endpoints">
                    <div className="endpoint">
                      <span className="method get">GET</span>
                      <span className="path">
                        /api/{project.name.toLowerCase().split(" ")[0]}/list
                      </span>
                    </div>
                    <div className="endpoint">
                      <span className="method post">POST</span>
                      <span className="path">
                        /api/{project.name.toLowerCase().split(" ")[0]}/create
                      </span>
                    </div>
                    <div className="endpoint">
                      <span className="method put">PUT</span>
                      <span className="path">
                        /api/{project.name.toLowerCase().split(" ")[0]}/:id
                      </span>
                    </div>
                  </div>
                </div>

                <div className="backend-content">
                  <div className="backend-category">{project.category}</div>
                  <h4 className="backend-name">{project.name}</h4>
                  <p className="backend-description">{project.description}</p>

                  <div className="backend-apis">
                    <span className="api-badge">{project.apis}</span>
                  </div>

                  <div className="backend-features">
                    {project.features.map((feature) => (
                      <div key={feature} className="feature-item">
                        <span className="feature-check">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="backend-stack">
                    {project.stack.map((tech) => (
                      <span key={tech} className="stack-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button className="view-link">
                    Explore Architecture <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
