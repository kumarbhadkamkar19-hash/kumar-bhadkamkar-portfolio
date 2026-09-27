// import React, { useRef } from 'react'
// import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi'
// import { initTilt } from '../../utils/tilt'
// import './Projects.css'

// function Projects() {
//   const projectsRef = useRef(null)

//   const projects = [
//     {
//       id: 1,
//       title: 'Import–Export Corporate Platform',
//       description: 'Enterprise-level MERN stack platform for managing international trade operations, documentation, and real-time shipment tracking with role-based access control.',
//       image: '/src/assets/images/project-axelyne.jpg',
//       tech: ['React JS', 'Node JS', 'MongoDB', 'WebSocket', 'JWT'],
//       live: 'https://axelyne.com/',
//       github: 'https://github.com/kumarbhadkamkar19-hash',
//       featured: true,
//       company: 'Axelyne'
//     },
//     {
//       id: 2,
//       title: 'Capurri Premium Business Website',
//       description: 'High-performance corporate website with animated UI, SEO optimization, contact management, and responsive design for global business presence.',
//       image: '/src/assets/images/project-capurri.jpg',
//       tech: ['React JS', 'CSS3', 'GSAP', 'Vite', 'SEO'],
//       live: 'https://capurri.com/',
//       github: 'https://github.com/kumarbhadkamkar19-hash',
//       featured: true,
//       company: 'Axelyne'
//     },
//     {
//       id: 3,
//       title: 'Servixa – Real-Time Collaboration Platform',
//       description: 'Solo project: Full-stack collaboration tool with live chat, file sharing, task management, and WebSocket-powered real-time notifications.',
//       image: '/src/assets/images/project-servixa.jpg',
//       tech: ['MERN', 'Socket.IO', 'Redux', 'Express', 'Cloudinary'],
//       live: '#',
//       github: 'https://github.com/kumarbhadkamkar19-hash/servixa',
//       featured: false,
//       company: 'Personal Project'
//     },
//     {
//       id: 4,
//       title: 'E-Commerce Management System',
//       description: 'Solo project: Complete e-commerce backend with product management, cart functionality, payment integration, order tracking, and admin dashboard.',
//       image: '/src/assets/images/project-ecommerce.jpg',
//       tech: ['React', 'Node JS', 'MongoDB', 'Stripe', 'RBAC'],
//       live: '#',
//       github: 'https://github.com/kumarbhadkamkar19-hash/ecommerce-mern',
//       featured: false,
//       company: 'Personal Project'
//     }
//   ]

//   React.useEffect(() => {
//     // Initialize tilt effect on project cards
//     const cards = projectsRef.current?.querySelectorAll('.project-card')
//     cards?.forEach(card => {
//       const cleanup = initTilt(card)
//       return cleanup
//     })
//   }, [])

//   return (
//     <section className="section projects" id="projects" ref={projectsRef}>
//       <div className="container">
//         <h2 className="section-title" data-aos="fade-up">Featured Projects</h2>
//         <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
//           Enterprise solutions & innovative personal projects built with modern tech stack
//         </p>

//         <div className="projects-grid">
//           {projects.map((project, index) => (
//             <article 
//               key={project.id}
//               className={`project-card glass ${project.featured ? 'featured' : ''}`}
//               data-aos="fade-up"
//               data-aos-delay={index * 100}
//             >
//               {/* Project Image */}
//               <div className="project-image-wrapper">
//                 <img 
//                   src={project.image} 
//                   alt={project.title}
//                   className="project-image"
//                   loading="lazy"
//                 />
//                 <div className="project-overlay">
//                   <div className="project-actions">
//                     <a 
//                       href={project.live} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="action-btn live"
//                       aria-label="View Live Demo"
//                     >
//                       <FiExternalLink />
//                     </a>
//                     <a 
//                       href={project.github} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="action-btn github"
//                       aria-label="View Source Code"
//                     >
//                       <FiGithub />
//                     </a>
//                   </div>
//                 </div>
//                 {project.featured && (
//                   <span className="project-badge">Featured</span>
//                 )}
//               </div>

//               {/* Project Content */}
//               <div className="project-content">
//                 <span className="project-company">{project.company}</span>
//                 <h3>{project.title}</h3>
//                 <p className="project-description">{project.description}</p>
                
//                 <div className="project-tech">
//                   {project.tech.map(tech => (
//                     <span key={tech} className="tech-tag">{tech}</span>
//                   ))}
//                 </div>

//                 <div className="project-links">
//                   <a 
//                     href={project.live} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="btn-link"
//                   >
//                     Live Demo <FiArrowRight />
//                   </a>
//                   <a 
//                     href={project.github} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="btn-link github"
//                   >
//                     Source Code <FiGithub />
//                   </a>
//                 </div>
//               </div>

//               {/* Animated Border */}
//               <div className="project-border"></div>
//             </article>
//           ))}
//         </div>

//         {/* View More Button */}
//         <div className="projects-cta text-center" data-aos="fade-up">
//           <a href="https://github.com/kumarbhadkamkar19-hash" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
//             View All Projects on GitHub <FiGithub />
//           </a>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Projects

import React from 'react'

function Projects() {
  return (
    <div>Projects</div>
  )
}

export default Projects