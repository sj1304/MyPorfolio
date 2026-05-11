import '../css/Nav.css';
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar({ theme, setTheme }) {
  const pathRef = useRef(null);
  const ulRef = useRef(null);
  const svgRef = useRef(null);

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
      const svg = svgRef.current;

      if (!svg || items.length === 0) return;

      const ulRect = ul.getBoundingClientRect();

      // SVG exactly over UL
      svg.style.left = `${ulRect.left}px`;
      svg.style.top = `${ulRect.top}px`;
      svg.style.width = `${ulRect.width}px`;
      svg.style.height = `${ulRect.height}px`;

      svg.setAttribute(
        "viewBox",
        `0 0 ${ulRect.width} ${ulRect.height}`
      );

      let d = "";

      let prevX = 0;
      let prevY = 0;

      items.forEach((item, index) => {
        const link = item.querySelector("a");
        if (!link) return;

        const rect = link.getBoundingClientRect();

        // exact center relative to UL
        const x =
          rect.left - ulRect.left - rect.width/4;

        const y =
          rect.top - ulRect.top + rect.height/2;

        // crooked line effect
        const crookedY =
          index % 2 === 0 ? y+40 : y+30 ;

        if (index === 0) {
          // starts EXACTLY from first li
          d += `M ${x} ${crookedY}`;
        } else {
          const midX =
  (prevX + x) / 2 +
  (index % 2 === 0 ? 0 : -30);

          d += `
            C
            ${midX} ${prevY},
            ${midX} ${crookedY},
            ${x} ${crookedY}
          `;
        }

        prevX = x;
        prevY = crookedY;
      });

      path.setAttribute("d", d);

      pathLength = path.getTotalLength();

      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;
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

      path.style.strokeDashoffset =
        pathLength * (1 - progress);

      // glowing contact
      const contactLi =
        document.querySelector(".contact-li");
      
      if (completed >= 5) {
        
path.style.opacity = "0";
        setTimeout(() => {
        contactLi?.classList.add("contact-glow");
  
  document.querySelectorAll(".sparkle")
  .forEach((sparkle) => {
    sparkle.style.visibility = "visible";
  });
}, 500);
      } else {
        path.style.opacity = "1";
         setTimeout(() => {
          contactLi?.classList.remove("contact-glow");
  
  document.querySelectorAll(".sparkle")
  .forEach((sparkle) => {
    sparkle.style.visibility = "hidden";
  });
}, 500);
      
        
      }
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

      <div className="logo">
        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        Sneha Jadhav
      </div>

      {/* 🔥 Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      {/* 🔥 Nav List */}
      <ul
        className={`nav-list ${menuOpen ? "open" : ""}`}
        ref={ulRef}
      >
        <li>
          <a href="#introduction">Who am I?</a>
        </li>

        <li>
          <a href="#skillss">What can I do?</a>
        </li>

        <li>
          <a href="#projects">What have I built?</a>
        </li>

        <li>
          <a href="#github">How consistent am I?</a>
        </li>

        <li>
          <a href="#experience_education">
            Where/What did I learn?
          </a>
        </li>

        <li className="contact-li">
  <a href="#contact">
    Contact
    <span className="sparkle s1">✦</span>
    <span className="sparkle s2">✦</span>
    <span className="sparkle s3">✦</span>
  </a>
</li>
      </ul>

      {/* 🔥 Arrow */}
      <svg
        className="nav-arrow"
        ref={svgRef}
      >
        <path
          ref={pathRef}
          id="arrowPath"
        />
      </svg>

    </nav>
  );
}

export default Navbar;
