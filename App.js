import { useState } from "react";
import './App.css';
import Intro from './Components/Intro.js';
import Nav from './Components/Nav.js';
import Projects from './Components/Projects.js';
import Skills from './Components/Skills.js';
import bgVideo from "./images/dark-theme-bg.mp4";
function App() {

  const [theme, setTheme] = useState("dark");

  return (
    <div className='container' id={theme}>
    {theme === "dark" && (
        <video autoPlay loop muted playsInline className="bg-video">
          <source src={bgVideo} type="video/mp4" />
        </video>
      )}
      <Nav theme={theme} setTheme={setTheme} />

      <section className='real-content'>
     
        <div id="introduction">
          <Intro theme={theme} />
        </div>

        <div id="skillss">
          <Skills theme={theme} />
        </div>

        <div id="projects">
          <Projects theme={theme} />
        </div>

      </section>
    </div>
  );
}

export default App;