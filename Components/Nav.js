import '../css/Nav.css';
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar({theme,setTheme}) {
  const pathRef = useRef(null);
  const ulRef = useRef(null);


const toggleTheme = () => {
  setTheme(prev => (prev === "light" ? "dark" : "light"));
};
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const path = pathRef.current;
    const ul = ulRef.current;

    if (!path || !ul) return;

    const sections = [
      "intro",
      "skills",
      "projects",
      "github",
      "experience_education",
      "contact"
    ];

    let pathLength = 0;

    const updatePath = () => {
      const items = ul.querySelectorAll("li");

      let d = "";

      items.forEach((item, index) => {
        const link = item.querySelector("a");
        if (!link) return; // 🔥 safety

        const x = link.offsetLeft + link.offsetWidth / 2;
        const y = index % 2 === 0 ? 25 : 35;

        if (d === "") {
          d += `M 0 ${y} L ${x} ${y}`;
        } else {
          d += ` L ${x} ${y}`;
        }
      });

      path.setAttribute("d", d);

      pathLength = path.getTotalLength();
      path.style.strokeDasharray = pathLength;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      let completed = 0;

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section && scrollY >= section.offsetTop) {
          completed++;
        }
      });

      const progress = completed / sections.length;
      path.style.strokeDashoffset = pathLength * (1 - progress);
    };

    updatePath();
    handleScroll();

    window.addEventListener("resize", updatePath);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updatePath);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="navbar" id={theme}>

      <div className="logo"><button className="theme-btn" onClick={toggleTheme}>
    {theme === "light" ? "🌙" : "☀️"}
  </button> Sneha Jadhav  </div>

      {/* 🔥 Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      {/* 🔥 Nav List */}
      <ul className={`nav-list ${menuOpen ? "open" : ""}`} ref={ulRef}>
        <li><a href="#introduction">Who am I?</a></li>
        <li><a href="#skillss">What can I do?</a></li>
        <li><a href="#projects">What have I built?</a></li>
        <li><a href="#github">How consistent am I?</a></li>
        <li><a href="#experience_education">Where did I learn?</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      

      {/* 🔥 Arrow (hide on mobile) */}
       <svg
        className="nav-arrow"
        viewBox="0 0 1000 60"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#D4A017" />
          </linearGradient>
        </defs>

        <path ref={pathRef} id="arrowPath" />
      </svg>

    </nav>
  );
}

export default Navbar;


