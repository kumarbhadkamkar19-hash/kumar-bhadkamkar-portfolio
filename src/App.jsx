// import React, { useEffect } from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// import Navbar from "./Components/Navbar/Navbar";
// import Home from "./Components/Home/Home";
// import About from "./Components/About/About";
// import Skills from "./Components/Skills/Skills";
// import Projects from "./Components/Projects/Projects";
// import Services from "./Components/Services/Services";
// import Contact from "./Components/Contact/Contact";
// import Footer from "./Components/Footer/Footer";

// import { initParticles } from "./utils/particles";

// /* ─────────────────────────────────────────────
//    ScrollManager
//    - new page            → scroll to top
//    - /#skills, /#contact → wait for the section to mount, then smooth-scroll
//    (fixes links like "/#projects" clicked from the /about page)
//    ───────────────────────────────────────────── */
// function ScrollManager() {
//   const { pathname, hash, key } = useLocation();

//   useEffect(() => {
//     if (!hash) {
//       window.scrollTo({ top: 0, left: 0, behavior: "auto" });
//       return;
//     }

//     const id = decodeURIComponent(hash.slice(1));
//     let tries = 0;
//     let timer;

//     const tick = () => {
//       const el = document.getElementById(id);
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth", block: "start" });
//         return;
//       }
//       if (tries++ < 25) timer = setTimeout(tick, 60); // section not mounted yet
//     };

//     timer = setTimeout(tick, 80);
//     return () => clearTimeout(timer);
//   }, [pathname, hash, key]);

//   return null;
// }

// function App() {
//   useEffect(() => {
//     // Initialize floating particles
//     initParticles();
//   }, []);

//   return (
//     <BrowserRouter>
//       <ScrollManager />

//       {/* Global Particles */}
//       <div className="particles" id="particles"></div>

//       {/* Navbar */}
//       <Navbar />

//       <Routes>
//         {/* ================= HOME PAGE (single page sections) ================= */}
//         <Route
//           path="/"
//           element={
//             <>
//               <main>
//                 {/* Home already renders <section id="home"> inside itself */}
//                 <Home />

//                 <section id="skills">
//                   <Skills />
//                 </section>

//                 <section id="projects">
//                   <Projects />
//                 </section>

//                 <section id="services">
//                   <Services />
//                 </section>

//                 <section id="contact">
//                   <Contact />
//                 </section>
//               </main>

//               <Footer />
//             </>
//           }
//         />

//         {/* ================= ABOUT PAGE (separate URL: /about) ================= */}
//         <Route
//           path="/about"
//           element={
//             <>
//               <main>
//                 <About />
//               </main>

//               <Footer />
//             </>
//           }
//         />

//         {/* Unknown URL → Home */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Skills from "./Components/Skills/Skills";

 // 3 Cards वाला component
import Projects from "./Components/Projects/Projects";       // Full Page वाला component

import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";

import { initParticles } from "./utils/particles";
import ProjectHome from "./Components/ProjectHome/ProjectHome";

function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer;

    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (tries++ < 25) timer = setTimeout(tick, 60);
    };

    timer = setTimeout(tick, 80);
    return () => clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}

function App() {
  useEffect(() => {
    initParticles();
  }, []);

  return (
    <BrowserRouter>
      <ScrollManager />

      <div className="particles" id="particles"></div>
      <Navbar />

      <Routes>
        {/* ================= HOME PAGE ================= */}
        <Route
          path="/"
          element={
            <>
              <main>
                <Home />
                
                <section id="skills">
                  <Skills />
                </section>

                {/* 2. इथे full Projects ऐवजी ProjectHome (3 cards) वापरा */}
                <section id="projects-preview">
                 <ProjectHome/>
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
          }
        />

        {/* ================= ABOUT PAGE ================= */}
        <Route
          path="/about"
          element={
            <>
              <main>
                <About />
              </main>
              <Footer />
            </>
          }
        />

        
        <Route
          path="/projects"
          element={
            <>
              <main>
                <Projects />
              </main>
              <Footer />
            </>
          }
        />

        {/* Unknown URL → Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;