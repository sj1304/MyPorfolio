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
    tech: "HTML, CSS, JS, Spring Boot, MySQL",
    image: mentoring,
    github: "https://github.com/sj1304/Mentoring-Website",
    images: "https://drive.google.com/drive/u/1/folders/1fULLmjzdSc0cIY4bDceDOCSdL4JB7qZJ"
  },
   {
    title: "Sorting Visualizer",
    tech: "HTML, CSS, JS",
    image: sorting,
    github: "https://github.com/sj1304/Sorting-Techniques-with-UI",
    images: "https://drive.google.com/drive/u/1/folders/1zYvHp1QzvV2cBZfcIZkVMYBl4o7WcH9D",
    live: "https://snehajadhav10573-pixel.github.io/SortingBubbleandInsertion"
  },
  {
    title: "ML Model Comparison",
    tech: "React, Python, Flask, Sklearn",
    image: mlmodel,
    github: "https://github.com/sj1304/Linear-Vs-Random-forest-Comparison-Webapp",
    images: "https://drive.google.com/drive/folders/1NAB9JDVTlCKQhEiR6D6jWnZmErRaQgtP?usp=drive_link",
    live: "https://deploy-ml-model-using-netlify-2oou.vercel.app"
  },

  {
    title: "SQL Quest Game",
    tech: "C#, SQL",
    image: sqlquest,
    github: "https://github.com/sj1304/SQLQuest",
    images: "https://drive.google.com/drive/u/1/folders/1ek0XeHw6V-XkBmHhZZ37suU8cMO-9XvZ"
  },
  {
    title: "Pacman Hand Gestures",
    tech: "Python, OpenCV, Pygame",
    image: pacman,
    github: "https://github.com/sj1304/Pacman-Game-With-Hand-Gestures-files",
    images: "https://drive.google.com/drive/folders/1Gw-t3CgXJ8lgyadmJKBzA9QSmYI0Mvof?usp=drive_link"
  },
  {
    title: "Recipe App",
    tech: "HTML, CSS, JS, PHP, MySQL",
    image: recipe,
    github: "https://github.com/sj1304/Recipe-Maker-Website",
    images: "https://drive.google.com/drive/folders/1xr_axrdjnRWQmMufa8NAsLBTrr-jQqKW?usp=drive_link"
  },
  {
    title: "Tour Website",
    tech: "Java, JDBC, JSP, Servlet, MySQL",
    image: travelling,
    github: "https://github.com/sj1304/Travel-Management-System",
    images: "https://drive.google.com/drive/folders/1Nk9cz-6q07Iwl13zDXNqFJu8U4W6t1uo?usp=drive_link"
  }
  
];
    
  

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const handleNext = () => {
    setFade(true);

    setTimeout(() => {
      setIndex((prev) => (prev + 1) % projects.length);
      setFade(false);
    }, 200);
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
          <div className="flow-box tech-stack">
            <h3>Tech Stack</h3>
            <p>{p.tech}</p>
          </div>

          {/* ARROW */}
          <svg className="curve-arrow" viewBox="0 0 150 80">
            <path d="M10 60 Q75 10 140 60" />
          </svg>

          {/* DEMO */}
          <div className="flow-box button-area">
  <h3>View More</h3>
  <div className="prbuttons">

    <button onClick={() => window.open(p.github, "_blank")}>
      🔗 Git Repo
    </button>

    <button onClick={() => window.open(p.images, "_blank")}>
      🖼️ More Images
    </button>

    {p.live && (
      <button onClick={() => window.open(p.live, "_blank")}>
        🚀 Live Demo
      </button>
    )}

  </div>
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
