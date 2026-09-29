import React, { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/About/About";
import Skills from "./Components/Skills/Skills";
import Projects from "./Components/Projects/Projects";
import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import { initParticles } from "./utils/particles";
import Home from "./Components/Home/Home";

function App() {
  useEffect(() => {
    // Initialize floating particles
    initParticles();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    return () => {
      // Cleanup event listeners if needed
    };
  }, []);

  return (
    <>
      <div className="particles" id="particles"></div>
      <Navbar />
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
