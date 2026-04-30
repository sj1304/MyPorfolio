import { useState } from "react";
import "../css/Skills.css";

function Skills() {

  const techSkills = [
    { title: "Languages", desc: "Java, Python, C, JavaScript, PHP, C#" },
    { title: "Web Development", desc: "HTML, CSS, React, JSP, JDBC, Servlets, Spring Boot" },
    { title: "Database", desc: "MySQL, MongoDB, PostgreSQL" },
    { title: "Tools & Tech", desc: "Git, GitHub, VS Code, Eclipse, Postman, Flask" },
    { title: "Concepts", desc: "DSA, OOP, Problem Solving" }
  ];

  const nonTechSkills = [
    { title: "Communication", desc: "Clear speaking & presentation" },
    { title: "Teamwork", desc: "Collaboration & adaptability" },
    { title: "Time Management", desc: "Task prioritization" },
    { title: "Problem Solving", desc: "Analytical thinking" },
    { title: "Learning Mindset", desc: "Quick learner" }
  ];

  const [techIndex, setTechIndex] = useState(0);
  const [nonTechIndex, setNonTechIndex] = useState(0);
  const [animateTech, setAnimateTech] = useState(false);
  const [animateNonTech, setAnimateNonTech] = useState(false);

  const handleNext = (type) => {
    if (type === "tech") {
      setAnimateTech(true);
      setTimeout(() => {
        setTechIndex((prev) => (prev + 1) % techSkills.length);
        setAnimateTech(false);
      }, 300);
    } else {
      setAnimateNonTech(true);
      setTimeout(() => {
        setNonTechIndex((prev) => (prev + 1) % nonTechSkills.length);
        setAnimateNonTech(false);
      }, 300);
    }
  };

  return (
    <div id="skills">

      {/* TECH */}
      <div className="skill-section">
        <h2>Technical Skills</h2>

        <div className="card-wrapper">

  <div className="card-stack">
    {techSkills.map((item, index) => {
      let position = index - techIndex;

      if (position < 0) position += techSkills.length;

      return (
        <div
          key={index}
          className={`skill-card ${
            position === 0
              ? "active"
              : position === 1
              ? "next"
              : position === 2
              ? "next2"
              : "hidden"
          } ${animateTech && position === 0 ? "slide-out" : ""}`}
        >
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      );
    })}
  </div>

  <button className="next-btn" onClick={() => handleNext("tech")}>
    &gt;
  </button>

</div>
      </div>


      {/* NON TECH */}
      <div className="skill-section">
        <h2>Non-Technical Skills</h2>

         <div className="card-wrapper">

  <div className="card-stack">
    {nonTechSkills.map((item, index) => {
      let position = index - nonTechIndex;

      if (position < 0) position += nonTechSkills.length;

      return (
        <div
          key={index}
          className={`skill-card ${
            position === 0
              ? "active"
              : position === 1
              ? "next"
              : position === 2
              ? "next2"
              : "hidden"
          } ${animateTech && position === 0 ? "slide-out" : ""}`}
        >
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      );
    })}
  </div>

  <button className="next-btn" onClick={() => handleNext("nontech")}>
    &gt;
  </button>
        </div>
      </div>

    </div>
  );
}

export default Skills;