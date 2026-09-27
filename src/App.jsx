import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Services from './components/Services/Services'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import { initParticles } from './utils/particles'

function App() {
  useEffect(() => {
    // Initialize floating particles
    initParticles()
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })
    
    return () => {
      // Cleanup event listeners if needed
    }
  }, [])

  return (
    <>
      <div className="particles" id="particles"></div>
      <Navbar />
      <main>
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="services"><Services /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </>
  )
}

export default App