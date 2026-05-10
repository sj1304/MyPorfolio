import "../css/Internship.css";

function Internship_Course({theme}) {

const scrollNext = (sliderId) => {
  const slider = document.getElementById(sliderId);

  const maxScrollLeft =
    slider.scrollWidth - slider.clientWidth;

  let cardWidth = 450;

  // smaller sliders
  if (
    sliderId === "certSlider" ||
    sliderId === "educationSlider"
  ) {
    cardWidth = 450;
  }

  // reached end
  if (slider.scrollLeft >= maxScrollLeft - 5) {

    slider.scrollTo({
      left: 0,
      behavior: "auto",
    });

  } else {

    slider.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });

  }
};

  return (
    <>

      <div className="portfolio-wrapper" id="experience">


        {/* EXPERIENCE */}
        <h2 className="section-title" id={theme}>Experience</h2>

        <div className="slider-container" id={theme}>

          <div className="cards-slider" id="internshipSlider">

            <div className="exp-card">
              <h3>Content Writing Intern</h3>
              <p>Marpu Foundation • 2023</p>

              <button>View Certificate</button>
            </div>

            <div className="exp-card">
              <h3>Social Media Marketing Intern</h3>
              <p>Sharify Adverts • 2023</p>

              <button>View Certificate</button>
            </div>

            <div className="exp-card">
              <h3>Data Analytics Intern</h3>
              <p>IBM SkillsBuild • 2023</p>


              <button>View Certificate</button>
            </div>

            <div className="exp-card">
              <h3>Email Marketing Intern</h3>
              <p>GEMA Education Technology • 2024</p>


              <button>View Certificate</button>
            </div>

          </div>

          <button
            className="intern-next-btn"
            onClick={() => scrollNext("internshipSlider")}
          >
            &gt;
          </button>

        </div>



       {/* LOWER SECTION */}
<div className="bottom-sections">

  {/* CERTIFICATIONS */}
  <div className="mini-section">

  <h2 className="section-title" id={theme}>Certifications</h2>

  <div className="slider-container" id={theme}>

    <div className="cards-slider mini-slider" id="certSlider">

      <div className="cert-card">
        <h3>Docker For Beginners</h3>
        <p>KodeKloud • 2026</p>
        <button>View Certificate</button>
      </div>

      <div className="cert-card">
        <h3>Design Thinking</h3>
        <p>RTMSSU • 2026</p>
        <button>View Certificate</button>
      </div>

    </div>

    <button
      className="intern-next-btn"
      onClick={() => scrollNext("certSlider")}
    >
      &gt;
    </button>

  </div>

</div>


{/* EDUCATION */}
<div className="mini-section">

  <h2 className="section-title" id={theme}>Education</h2>

  <div className="slider-container" id={theme}>

    <div className="cards-slider mini-slider" id="educationSlider">

      <div className="education-card">
        <h3>MSc Computer Science</h3>
        <p>Fergusson College  • 9.43</p>
        <span>2025 - 2027</span>
        
      </div>

      <div className="education-card">
        <h3>BSc Computer Science</h3>
        <p>St Mira's College  • 9.4</p>
        <span>2022 - 2025</span>
      </div>

      <div className="education-card">
        <h3>HSC</h3>
        <p>Nowrosjee Wadia College</p>
        <span>2020 - 2022</span>
      </div>

      <div className="education-card">
        <h3>SSC</h3>
        <p>St Mira's School</p>
        <span>2007 - 2020</span>
      </div>

    </div>
        
<button
            className="intern-next-btn"
            onClick={() => scrollNext("educationSlider")}
          >
            &gt;
          </button>
      </div>
</div>
</div>
    </div>
    </>
  );
}

export default Internship_Course;
