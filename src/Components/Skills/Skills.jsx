import React from 'react'
import { 
  FiCode, FiLayout, FiServer, FiDatabase, 
  FiGitBranch, FiZap, FiBox, FiCpu 
} from 'react-icons/fi'
import './Skills.css'

function Skills() {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <FiCode />,
      skills: [
        { name: 'HTML', level: 95, color: '#e34c26' },
        { name: 'CSS', level: 90, color: '#264de4' },
        { name: 'JavaScript', level: 90, color: '#f7df1e' },
        { name: 'TypeScript', level: 80, color: '#3178c6' },
      ]
    },
    {
      title: 'Frontend',
      icon: <FiLayout />,
      skills: [
        { name: 'React JS', level: 92, color: '#61dafb' },
        { name: 'React Native', level: 70, color: '#61dafb' },
        { name: 'Responsive UI', level: 95, color: '#3b82f6' },
        { name: 'State Management', level: 88, color: '#8b5cf6' },
      ]
    },
    {
      title: 'Backend',
      icon: <FiServer />,
      skills: [
        { name: 'Node JS', level: 88, color: '#68a063' },
        { name: 'Express JS', level: 85, color: '#000000' },
        { name: 'REST APIs', level: 90, color: '#3b82f6' },
        { name: 'Authentication', level: 87, color: '#10b981' },
      ]
    },
    {
      title: 'Database',
      icon: <FiDatabase />,
      skills: [
        { name: 'MongoDB', level: 85, color: '#47a248' },
        { name: 'Mongoose', level: 88, color: '#880000' },
        { name: 'Data Modeling', level: 82, color: '#3b82f6' },
        { name: 'Aggregation', level: 75, color: '#6366f1' },
      ]
    },
    {
      title: 'Real-Time',
      icon: <FiZap />,
      skills: [
        { name: 'WebSocket', level: 82, color: '#000000' },
        { name: 'Socket.IO', level: 80, color: '#010101' },
        { name: 'Live Chat', level: 78, color: '#22c55e' },
        { name: 'Notifications', level: 76, color: '#f59e0b' },
      ]
    },
    {
      title: 'Tools & Concepts',
      icon: <FiBox />,
      skills: [
        { name: 'Git/GitHub', level: 90, color: '#181717' },
        { name: 'Postman', level: 85, color: '#ff6c37' },
        { name: 'VS Code', level: 95, color: '#007acc' },
        { name: 'Vercel/Render', level: 88, color: '#000000' },
        { name: 'CRUD Operations', level: 92, color: '#3b82f6' },
        { name: 'RBAC', level: 80, color: '#8b5cf6' },
      ]
    }
  ]

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Technical Skills</h2>
        <p className="section-subtitle text-center" data-aos="fade-up" data-aos-delay="100">
          Premium toolkit for building scalable modern web applications
        </p>
        
        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <div 
              key={category.title} 
              className="skill-category glass"
              data-aos="fade-up"
              data-aos-delay={catIndex * 100}
            >
              <div className="skill-category-header">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              
              <div className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skill.name} 
                    className="skill-item"
                    data-aos="fade-left"
                    data-aos-delay={skillIndex * 50}
                  >
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ 
                          width: `${skill.level}%`,
                          '--skill-color': skill.color 
                        }}
                      >
                        <span className="skill-glow"></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Tech Icons */}
        <div className="skills-floating-icons">
          <div className="float-icon icon-1"><FiCode /></div>
          <div className="float-icon icon-2"><FiServer /></div>
          <div className="float-icon icon-3"><FiDatabase /></div>
          <div className="float-icon icon-4"><FiZap /></div>
        </div>
      </div>
    </section>
  )
}

export default Skills