import { useState } from "react";
import "../css/Projects.css";
import sqlquest from "../images/sqlquest.png"
import mlmodel from "../images/mlmodel.png"
import pacman from "../images/pacman.png"
import recipe from "../images/recipeApp.png"
import sorting from "../images/sorting.png"
import mentoring from "../images/mentoring.png"
import travelling from "../images/travelling.png"
function Projects({theme}) {

  const projects = [
    {
      title: "Mentoring Website",
      tech: " HTML, CSS, JS, Spring Boot, MySQL",
      image: mentoring,
    },
    {
      title: "SQL Quest Game",
      tech: "C#, SQL",
      image: sqlquest,
    },
    {
      title: "Pacman Hand Gestures",
      tech: "Python, OpenCV, Pygame",
      image: pacman,
    },
    {
      title: "Recipe App",
      tech: " HTML, CSS, JS, PHP, MySQL",
      image: recipe,
    },
    {
      title: "Sorting Visualizer",
      tech: "HTML, CSS, JS",
      image: sorting,
    },
    {
      title: "Tour Website",
      tech: "Java, JDBC, JSP, Servlet, MySQL",
      image: travelling,
    },
    {
      title: "ML Model Comparison",
      tech: "React, Python, Flask, Sklearn",
      image: mlmodel,
    },
    
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const handleNext = () => {
    setFade(true);

    setTimeout(() => {
      setIndex((prev) => (prev + 1) % projects.length);
      setFade(false);
    }, 400);
  };

  const p = projects[index];

  return (
    <section className="projects">

      <i><h2>Projects</h2></i>

      <div className={`project-flow-main ${fade ? "fade-out" : "fade-in"}`}>

        

        <div className="flow-row">

          {/* IMAGE */}
          <div className="flow-box">
            <h3>{p.title}</h3>
            <img src={p.image} alt="" />
          </div>

          {/* ARROW */}
          <svg className="curve-arrow" viewBox="0 0 150 80">
           <path d="M10 60 Q75 10 140 60" />
          </svg>

          {/* TECH */}
          <div className="flow-box">
            <h3>Tech Stack</h3>
            <p>{p.tech}</p>
          </div>

          {/* ARROW */}
          <svg className="curve-arrow" viewBox="0 0 150 80">
            <path d="M10 60 Q75 10 140 60" />
          </svg>

          {/* DEMO */}
          <div className="flow-box">
            <h3>Demo</h3>
            <button>View</button>
          </div>

        </div>
      </div>

      <button className="next-btn" onClick={handleNext}>
        Next
      </button>

    </section>
  );
}

export default Projects;