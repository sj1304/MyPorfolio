import { useEffect, useState } from "react";
import {GitHubCalendar} from "react-github-calendar";
import "../css/Github.css";

function GitHub() {
  const username = "sj1304";

  const [repos, setRepos] = useState(0);
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(true);
  const [contributions, setContributions] = useState(0);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ USER DATA
        const userRes = await fetch(
          `https://api.github.com/users/${username}`
        );
        const userData = await userRes.json();

        // 🚨 Handle rate limit
        if (userData.message) {
          console.error(userData.message);
          setRepos("—");
          return;
        }

        setRepos(userData.public_repos || 0);

        // ✅ REPO DATA
        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=50`
        );
        const repoData = await repoRes.json();

        if (!Array.isArray(repoData)) {
          console.error("Repo fetch failed");
          return;
        }

        // ✅ LANGUAGE COUNT (SAFE HYBRID)
        let langCount = {};

        // 1️⃣ Primary language (FAST + SAFE)
        repoData.forEach((repo) => {
          if (repo.language) {
            langCount[repo.language] =
              (langCount[repo.language] || 0) + 1;
          }
        });

        // 2️⃣ Small boost (ONLY 5 repos → no rate limit)
        await Promise.all(
          repoData.slice(0, 5).map(async (repo) => {
            try {
              const res = await fetch(repo.languages_url);
              if (!res.ok) return;

              const data = await res.json();

              for (let lang in data) {
                langCount[lang] =
                  (langCount[lang] || 0) + data[lang];
              }
            } catch (err) {}
          })
        );

        // ✅ CONVERT TO %
        const total = Object.values(langCount).reduce(
          (a, b) => a + b,
          0
        );

        let langPercent = {};

        for (let lang in langCount) {
          langPercent[lang] = (
            (langCount[lang] / total) *
            100
          ).toFixed(1);
        }

        setLanguages(langPercent);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  return (
    <div className="github-container">
      <div className="github-card">
        <h2 className="github-title">GitHub Dashboard</h2>

        <div className="github-main">
          {/* 📊 GRAPH */}
          <div className="github-calendar">
          <GitHubCalendar
  username={username}
  blockSize={isMobile ? 10 : 16}
  blockMargin={isMobile ? 2 : 5}
  fontSize={isMobile ? 10 : 16}
  theme={{
    light: [
      "#b6c7bc",
      "#8be48b",
      "#70b765",
      "#239a3b",
      "#196127"
    ]
  }}
  // ⬅️ month/day text size
  transformData={(data) => {
    const now = new Date();
    const past = new Date();
    past.setMonth(now.getMonth() - 5);

    const filtered = data.filter((day) => {
      const date = new Date(day.date);
      return date >= past && date <= now;
    });

    const total = filtered.reduce(
      (sum, d) => sum + d.count,
      0
    );

    setContributions((prev) =>
      prev === total ? prev : total
    );

    return filtered;
  }}
/>
          </div>

          {/* 📦 STATS */}
          <div className="github-stats">
            <div className="stat-box">
              <div className="stat-number">{contributions}</div>
              <div className="stat-label">Contributions</div>
            </div>

            <div className="stat-box">
              <div className="stat-number">{repos}</div>
              <div className="stat-label">Repositories</div>
            </div>
          </div>
        </div>

        {/* 🧠 LANGUAGES */}
        <div className="language-section">
          <h3 className="github-subtitle">Languages Used</h3>

          {loading ? (
            <p className="loading">Loading...</p>
          ) : (
            <ul className="language-list">
              {Object.entries(languages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8)
                .map(([lang, percent]) => (
                  <li className="language-item" key={lang}>
                    <span className="lang-name">{lang}</span>

                    <div className="bar">
                      <div
                        className="fill"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>

                    
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default GitHub;