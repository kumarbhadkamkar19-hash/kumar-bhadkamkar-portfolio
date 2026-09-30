import React from 'react';
import { Link } from 'react-router-dom'; // React Router वापरून Projects page वर जाण्यासाठी
import './ProjectHome.css';

const ProjectHome = () => {
  // Home page वर दाखवण्यासाठी 3 मुख्य प्रकल्प
  const homeProjects = [
    {
      id: 1,
      type: 'FEATURED',
      category: 'PRODUCT MANAGEMENT',
      title: 'Domain-Based Product Catalog',
      description: 'Full-stack multi-tenant product catalogue management platform with React admin dashboard, secure REST APIs, and domain-based data isolation.',
      tech: ['React', 'Node.js', 'MongoDB', 'JWT', 'RBAC'],
      stats: '22+ APIs · Multi-Tenant · Cloud',
      link: '/projects', // हे बटण Full Projects page वर घेऊन जाईल
    },
    {
      id: 2,
      type: 'CLIENT WEBSITE',
      category: 'E-COMMERCE',
      title: 'Meena',
      description: 'Handcrafted ethnic wear brand with curated collections, modern storefront, mobile-first design, and seamless shopping experience.',
      tech: ['Next.js', 'Tailwind', 'Stripe', 'Framer Motion'],
      stats: 'Modern · Mobile-first · Fast Checkout',
      link: '/projects',
    },
    {
      id: 3,
      type: 'BACKEND SYSTEM',
      category: 'ENTERPRISE BACKEND',
      title: 'School Management System',
      description: 'Complete backend architecture for school administration with student, staff, and academic management featuring scalable REST APIs.',
      tech: ['Node.js', 'Express', 'MongoDB', 'Redis'],
      stats: '40+ APIs · Scalable · Secure Auth',
      link: '/projects',
    }
  ];

  return (
    <section className="project-home-section" id="home-projects">
      <div className="project-home-container">
        
        {/* Section Header */}
        <div className="project-home-header">
          <div className="header-label">
            <span className="label-dot"></span>
            <span>SELECTED WORK</span>
          </div>
          <h2 className="project-home-title">
            Projects that <span className="accent-text">matter</span>
          </h2>
          <p className="project-home-subtitle">
            A glimpse into enterprise platforms, client websites, and scalable backends.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="project-home-grid">
          {homeProjects.map((project) => (
            <div key={project.id} className="project-home-card">
              <div className="card-badge">{project.type}</div>
              <div className="card-category">{project.category}</div>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-description">{project.description}</p>
              
              <div className="card-stats">
                <span className="stats-dot"></span>
                {project.stats}
              </div>
              
              <div className="card-tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>

              {/* View Project Button -> Renders Projects.jsx */}
              <Link to={project.link} className="card-action-btn">
                View Project <span className="btn-arrow">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="project-home-footer">
          <Link to="/projects" className="view-all-btn">
            View All Projects & Case Studies <span className="btn-arrow">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ProjectHome;