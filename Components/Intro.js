import { useEffect, useState } from "react";
import ProfilePic from "../images/ProfilePic.png";
import "../css/Intro.css";
import {FaDownload,FaCode} from 'react-icons/fa';

function Intro({theme}) {

    const h1Text = "Aspiring Software Developer";
    const codeText = "<p>use nav or scroll to see more!</p>";

    const [h1Display, setH1Display] = useState("");
    const [h1Index, setH1Index] = useState(0);

    const [showParagraph, setShowParagraph] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [showName, setShowName] = useState(false);

    // 🔹 Bubble + terminal control
    const [showBubble, setShowBubble] = useState(false);
    const [showTerminal, setShowTerminal] = useState(false);

    const [codeDisplay, setCodeDisplay] = useState("");
    const [codeIndex, setCodeIndex] = useState(0);

    // 🔹 dots control
    const [dotStep, setDotStep] = useState(0);

    // 🔹 H1 typing
    useEffect(() => {
        if (h1Index < h1Text.length) {
            const timeout = setTimeout(() => {
                setH1Display(prev => prev + h1Text[h1Index]);
                setH1Index(h1Index + 1);
            }, 100);

            return () => clearTimeout(timeout);
        }

        if (h1Index === h1Text.length) {
            setShowParagraph(true);
            setShowButtons(true);
            setShowName(true);

            // start bubble cycle
            startBubbleCycle();
        }

    }, [h1Index]);

    // 🔁 Bubble + terminal repeating cycle
    const startBubbleCycle = () => {
        setTimeout(() => {
            setShowBubble(true);

            // show dots one by one
            setDotStep(0);
            setTimeout(() => setDotStep(1), 6000);
            setTimeout(() => setDotStep(2), 6500);
            setTimeout(() => setDotStep(3), 7000);

            // show terminal after dots
            setTimeout(() => {
                setShowTerminal(true);
                setCodeDisplay("");
                setCodeIndex(0);
            }, 8000);

            // hide everything after 10s
            setTimeout(() => {
                setShowTerminal(false);
                setShowBubble(false);

                // restart cycle
                startBubbleCycle();
            }, 20000);

        }, 3000);
    };

    // 🔹 typing inside terminal
    useEffect(() => {
        if (showTerminal && codeIndex < codeText.length) {
            const timeout = setTimeout(() => {
                setCodeDisplay(prev => prev + codeText[codeIndex]);
                setCodeIndex(codeIndex + 1);
            }, 50);

            return () => clearTimeout(timeout);
        }
    }, [codeIndex, showTerminal]);

    const DownloadResume = () => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Sneha_Jadhav_Resume.pdf";
        link.click();
    };

    return (
        <div id="intro">

            <div className="left_intro" id={theme}>
                <img className="profile_pic" src={ProfilePic} alt="Profile" />

                {showBubble && (
                    <div className="terminal-container">

                        {/* dots one by one */}
                        {dotStep >= 1 && <span className="dot small"></span>}
                        {dotStep >= 2 && <span className="dot medium"></span>}
                        {dotStep >= 3 && <span className="dot large"></span>}

                        {/* terminal */}
                        {showTerminal && (
                            <div className="terminal-box">
                                <div className="terminal-header">
                                    <span className="circle red"></span>
                                    <span className="circle yellow"></span>
                                    <span className="circle green"></span>
                                </div>

                                <p className="terminal-text">
                                    {codeDisplay}
                                    <span className="cursor">|</span>
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {showName && (
                    <h2 className="fade-in">Sneha Jadhav</h2>

                )}
                <div className="name-decoration">
    <span></span>
    <div className="diamond"></div>
    <span></span>
  </div>
            </div>

            <div className="right_intro">
                <h1 className="typing-h1">
                    {h1Display}
                    <span className="cursor">|</span>
                </h1>

                {showParagraph && (
                    <p>
                        A motivated computer science student passionate about building practical,
                        user-friendly software and continuously learning new technologies.
                    </p>
                )}

                {showButtons && (
                    <div className="buttons">
                        <button className="download" onClick={DownloadResume}>
                            <FaDownload className="icon" />
                            Download Resume
                        </button>

                        <button>
                              <FaCode className="icon" />
                            <a href="#projects">My Projects</a>
                        </button>

                        <button className="mywork" >
                            <div>✨</div>
                            <a href="mywork.html">My work</a>
                            
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Intro;