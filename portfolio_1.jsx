import { useState, useEffect } from "react";

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */

const PROJECT_CATEGORIES = [
  {
    id: "engineering",
    label: "Engineering",
    icon: "⚙️",
    projects: [
      {
        title: "Hindmarsh–Rose Neuron Control",
        description:
          "I designed a control system for the nonlinear Hindmarsh–Rose neuron model in MATLAB/Simulink. I derived the equilibrium points and a linear state-space representation, then used Routh–Hurwitz, Nyquist, and root locus methods to synthesize stabilizing controllers and checked them against the full nonlinear model.",
        tags: ["Control Systems", "MATLAB", "Simulink", "Nonlinear Dynamics"],
      },
      {
        title: "Rutgers Formula Racing",
        description:
          "I designed and analyzed suspension geometry in SolidWorks to improve mechanical grip and load distribution for our Formula SAE racecar. I helped fabricate the tubular space frame through manual machining and welding, and implemented aerodynamic fairings that cut the drag coefficient by 12% during track testing.",
        tags: ["SolidWorks", "FSAE", "Mechanical Design", "Aerodynamics"],
      },
      {
        title: "Digital Signal Processing",
        description:
          "I designed and implemented digital filters in MATLAB for audio and communications signals, working through the full pipeline from specification to realization. I built FIR and IIR filters using windowing and bilinear transform methods, analyzed their frequency responses, and validated performance against real-world signals to make sure they met passband and stopband requirements.",
        tags: ["DSP", "MATLAB", "Filter Design", "Signal Processing"],
      },
      {
        title: "Atomic Gravimeter – Wu Lab",
        description:
          "I worked on a portable cold-atom gravimeter that uses magneto-optical traps to measure gravitational field variations. I designed analog and digital circuits including feedback loops and square-wave generators, and my work contributed to a peer-reviewed publication and poster presentations.",
        tags: ["Atomic Physics", "Circuit Design", "Signal Processing"],
      },
    ],
  },
  {
    id: "ml-cs",
    label: "ML & Computer Science",
    icon: "🧠",
    projects: [
      {
        title: "Multimodal Fraud & Spam Detection",
        description:
          "I put together a multimodal ML project that tackles credit card fraud (tabular data), IEEE-CIS transaction fraud (time-series), and SMS spam (text) all in one pipeline. I trained supervised models tailored to each modality and focused on handling imbalanced classes and rare-event detection.",
        tags: ["Machine Learning", "Python", "NLP", "Classification"],
      },
      {
        title: "Lightweight Cryptography for Constrained Systems",
        description:
          "I put together a technical presentation on lightweight cryptography for IoT and embedded devices. I dug into the NIST LWC standardization process, broke down why Ascon was selected as the AEAD scheme, and proposed a runtime/energy demo comparing conventional vs. lightweight algorithms on resource-limited hardware.",
        tags: ["Cryptography", "IoT", "Embedded Systems", "Security"],
      },
    ],
  },
  {
    id: "math",
    label: "Mathematics",
    icon: "📐",
    projects: [
      {
        title: "SDE Estimator for Collective Behavior",
        description:
          "I developed a mathematical framework for estimating stochastic differential equations from swarm trajectory data. The core of this project was the mathematical analysis — I worked through sparse identification methods (SINDy and stochastic SINDy) to decompose noisy, high-dimensional trajectory data into interpretable drift and diffusion terms. I focused on the theoretical underpinnings of how these estimators converge, how basis function selection affects identifiability, and how to rigorously separate deterministic dynamics from state-dependent noise in mesoscopic models.",
        tags: ["SDEs", "SINDy", "Stochastic Analysis", "Mathematical Modeling"],
      },
      {
        title: "Quantum Harmonic Oscillator via Creation & Annihilation Operators",
        description:
          "For the Directed Reading Program, I formulated the quantum harmonic oscillator using creation and annihilation operators. The core mathematical challenge was extending the spectral theorem from finite dimensions to the infinite-dimensional case using the Riesz Representation Theorem. I used Fourier analysis and the Fourier transform to connect the abstract operator formalism to concrete eigenfunctions. I worked through how these operators satisfy commutation relations, how they act on Fock space, and how the infinite-dimensional spectral theorem guarantees the existence and properties of eigenvalues and eigenfunctions for the quantum harmonic oscillator Hamiltonian.",
        tags: ["Quantum Mechanics", "Functional Analysis", "Spectral Theory", "Fourier Analysis"],
      },
      {
        title: "Shock Formation in Nonlinear Wave Equations",
        description:
          "I co-authored a study on how smooth initial data can develop singularities in finite time for nonlinear wave equations. I worked through the method of characteristics to trace how wavefronts steepen and eventually break, forming shock discontinuities. The analysis covered both classical scalar conservation laws and wave equations on Lorentzian manifolds, where I examined how the geometry of spacetime influences where and when shocks form, connecting PDE blow-up theory with differential geometry.",
        tags: ["PDEs", "Method of Characteristics", "Shock Waves", "Differential Geometry"],
      },
    ],
  },
];

const EXPERIENCES = [
  {
    role: "Controls Engineering Intern",
    company: "Swarm Intelligence Lab",
    period: "Dec 2025 — Present",
    description:
      "At the Swarm Intelligence Lab, I study how animals like predators and prey make decisions and react to each other, and how those \u201crules of behavior\u201d can inspire better designs for engineered systems such as robot teams, sensor networks, or power grids. I use computer\u2011based numerical simulations and math\u2011driven models to recreate chase\u2011and\u2011escape scenarios between virtual predator and prey agents, then analyze how small changes in their feedback rules (how each reacts to what it senses) can lead to very different group outcomes like efficient hunting, safe escape, or stable coexistence. The goal of my work is to turn these insights about natural behavior into practical algorithms that engineers can reuse\u2014for example, to coordinate fleets of robots, manage resources in large networks, or control complex systems that must operate reliably under uncertainty and noise.",
  },
  {
    role: "Physics Teaching Assistant",
    company: "Rutgers University",
    period: "",
    description:
      "As a Physics Teaching Assistant at Rutgers, I helped students understand mechanics, electricity, and magnetism by breaking down complex ideas into everyday language and step\u2011by\u2011step examples. I led problem\u2011solving sessions, answered questions during office hours, and worked closely with the professor to make sure students stayed on track throughout the semester.",
  },
  {
    role: "Mentor Learning Assistant / Mentor Coordinator",
    company: "Rutgers Learning Center",
    period: "",
    description:
      "At the Rutgers Learning Center, I served as a Mentor Learning Assistant, supporting students in challenging STEM courses and guiding newer learning assistants on how to work with students effectively. I helped design and lead workshops on study strategies and communication, and I coordinated a small team of mentors so that students received consistent, reliable support.",
  },
  {
    role: "Undergraduate Physics Researcher",
    company: "Rutgers University",
    period: "",
    description:
      "As an undergraduate physics researcher, I worked on hands\u2011on experiments in atomic physics, helping to set up equipment, collect data, and interpret results with my faculty mentor. This experience taught me how to move from a scientific question to a carefully designed experiment and then to clear, data\u2011driven conclusions.",
  },
  {
    role: "Learning Assistant for Engineering / Signals and Systems",
    company: "Rutgers University",
    period: "",
    description:
      "In my engineering learning assistant roles, I helped classmates in courses like Linear Systems and Signals by rephrasing technical content into simple, intuitive explanations. I worked with instructors to adjust course materials based on where students struggled most, with the goal of making the classes more approachable and improving overall success rates.",
  },
];

const SKILLS = [
  {
    name: "Scientific Programming & Tooling",
    description: "I use Python, MATLAB/Simulink, Git, SQL, and Excel daily for scripting, numerical computing, data handling, and research pipelines.",
  },
  {
    name: "Machine Learning & Statistical Modeling",
    description: "I've trained supervised ML models (k-NN, perceptron, classifiers) and built multimodal fraud/spam detection systems on high-dimensional, imbalanced datasets.",
  },
  {
    name: "Control Systems & Dynamical Systems",
    description: "I do linear and nonlinear modeling, feedback control design, and simulation. I'm also digging into Kalman filtering and stochastic optimal control.",
  },
  {
    name: "Stochastic Processes & SDE Modeling",
    description: "I build SDE estimators using SINDy and stochastic SINDy, learning drift/diffusion from trajectory data and designing multi-time-step swarm simulations.",
  },
  {
    name: "Signal & Information Processing",
    description: "I work with experimental signal acquisition, noise handling, and feedback circuits. I like thinking about physics, controls, and ML problems as inference tasks.",
  },
  {
    name: "Experimental Physics & Hardware",
    description: "I've worked with atomic gravimetry, magneto-optical trap experiments, analog/digital circuit design, and feedback control of lab hardware.",
  },
  {
    name: "Computer Vision & Data Modalities",
    description: "I've built OpenCV-based image pipelines with contour extraction, and I'm comfortable working across time-series, text, tabular, sequence, and image data.",
  },
  {
    name: "Research, Teaching & Communication",
    description: "I've done research across multiple labs, contributed to publications/posters, served as a Physics TA and Learning Assistant, and I take documentation seriously.",
  },
];

const BLOG_ENTRIES = [];

/* ══════════════════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════════════════ */

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("engineering");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["hero", "projects", "skills", "experience", "blog", "resume", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const NAV_ITEMS = [
    { id: "hero", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "blog", label: "Blog" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  /* ─── Styles ─── */
  const colors = {
    bg: "#1a1a2e",
    bgAlt: "#16162a",
    bgCard: "#22223a",
    text: "#e8e4df",
    textSecondary: "#b0a999",
    textTertiary: "#7a7468",
    accent: "#c9a96e",
    accentHover: "#d4b97e",
    border: "#2e2e45",
  };

  const sectionStyle = (alt = false) => ({
    padding: "100px 24px",
    background: alt ? colors.bgAlt : colors.bg,
  });

  const containerStyle = {
    maxWidth: 900,
    margin: "0 auto",
  };

  const sectionHeading = {
    fontSize: 28,
    fontWeight: 700,
    color: colors.text,
    marginBottom: 40,
    letterSpacing: "-0.01em",
  };

  const activeProjects = PROJECT_CATEGORIES.find(c => c.id === activeCategory)?.projects || [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #1a1a2e; color: #e8e4df; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(201,169,110,0.25); color: #e8e4df; }
        a { color: inherit; text-decoration: none; }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .photo-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .photo-ring-outer {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          border: 1px dashed rgba(201,169,110,0.3);
          animation: spin-slow 25s linear infinite;
        }
        .photo-ring-inner {
          position: absolute;
          width: 235px;
          height: 235px;
          border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.15);
          animation: spin-reverse 20s linear infinite;
        }
        .photo-glow {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%);
          animation: pulse-glow 4s ease-in-out infinite;
        }
        .photo-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(201,169,110,0.6);
        }
        .photo-dot-1 { top: 10px; left: 50%; animation: pulse-glow 3s ease-in-out infinite; }
        .photo-dot-2 { bottom: 10px; left: 50%; animation: pulse-glow 3s ease-in-out 1s infinite; }
        .photo-dot-3 { left: 10px; top: 50%; animation: pulse-glow 3s ease-in-out 0.5s infinite; }
        .photo-dot-4 { right: 10px; top: 50%; animation: pulse-glow 3s ease-in-out 1.5s infinite; }

        .photo-container {
          animation: float 6s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .hero-heading { font-size: 48px !important; }
          .nav-links { display: none !important; }
          .hero-layout { flex-direction: column-reverse !important; text-align: center !important; }
          .hero-links { justify-content: center !important; }
          .photo-wrapper { margin-bottom: 16px; }
          .category-tabs { flex-wrap: wrap !important; }
        }
        @media (max-width: 480px) {
          .hero-heading { font-size: 38px !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: colors.bg }}>

        {/* ═══ NAV ═══ */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 24px",
          height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(26,26,46,0.95)" : "rgba(26,26,46,0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${scrolled ? colors.border : "transparent"}`,
          transition: "all 0.3s",
        }}>
          <button
            onClick={() => scrollTo("hero")}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 18, fontWeight: 700, color: colors.text,
              fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em",
            }}
          >
            Aditya Raman
          </button>
          <div className="nav-links" style={{ display: "flex", gap: 4 }}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                  color: activeSection === item.id ? colors.accent : colors.textSecondary,
                  fontSize: 14,
                  fontWeight: activeSection === item.id ? 600 : 400,
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* ═══ HERO ═══ */}
        <section id="hero" style={{ ...sectionStyle(), paddingTop: 150, paddingBottom: 100 }}>
          <div className="hero-layout" style={{ ...containerStyle, display: "flex", alignItems: "center", gap: 56, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <p style={{
                fontSize: 16, fontWeight: 500, color: colors.accent,
                marginBottom: 20, letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}>
                Hey, I'm
              </p>
              <h1 className="hero-heading" style={{
                fontSize: 72, fontWeight: 900, color: colors.text,
                lineHeight: 1.05, marginBottom: 24, letterSpacing: "-0.03em",
              }}>
                Aditya Raman
              </h1>
              <p style={{
                fontSize: 22, color: colors.textSecondary,
                lineHeight: 1.5, marginBottom: 16, maxWidth: 600,
                fontWeight: 400,
              }}>
                I'm an engineer who loves working at the crossroads of control systems, signal processing, and electrical engineering.
              </p>
              <p style={{
                fontSize: 16, color: colors.textTertiary,
                lineHeight: 1.8, marginBottom: 36, maxWidth: 600,
              }}>
                I like building things where math, hardware, and software all have to work together.
                Most of my time goes into designing feedback controllers, running simulations,
                and figuring out how to make real systems behave the way the theory says they should.
                When I'm not doing that, I'm probably playing basketball or videogames.
              </p>
              <div className="hero-links" style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                {[
                  { label: "Email", href: "mailto:avr72@scarletmail.rutgers.edu" },
                  { label: "LinkedIn", href: "https://linkedin.com" },
                ].map((link, i) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 14, fontWeight: 500, color: colors.accent,
                      borderBottom: `1px solid ${colors.accent}40`,
                      paddingBottom: 2,
                      transition: "border-color 0.2s",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Profile photo with animated effects */}
            <div className="photo-container">
              <div className="photo-wrapper" style={{ width: 270, height: 270 }}>
                <div className="photo-ring-outer" />
                <div className="photo-ring-inner" />
                <div className="photo-glow" />
                <div className="photo-dot photo-dot-1" />
                <div className="photo-dot photo-dot-2" />
                <div className="photo-dot photo-dot-3" />
                <div className="photo-dot photo-dot-4" />
                <img src="/profile-photo.jpg" alt="Aditya Raman" style={{
                  width: 200, height: 200, borderRadius: "50%",
                  border: `2px solid ${colors.border}`,
                  objectFit: "cover",
                  position: "relative",
                  zIndex: 2,
                }} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PROJECTS WITH TABS ═══ */}
        <section id="projects" style={sectionStyle(true)}>
          <div style={containerStyle}>
            <h2 style={sectionHeading}>Projects</h2>

            {/* Category Tabs */}
            <div className="category-tabs" style={{
              display: "flex",
              gap: 8,
              marginBottom: 32,
            }}>
              {PROJECT_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 8,
                    border: activeCategory === cat.id
                      ? `1px solid ${colors.accent}`
                      : `1px solid ${colors.border}`,
                    background: activeCategory === cat.id
                      ? "rgba(201,169,110,0.12)"
                      : colors.bgCard,
                    color: activeCategory === cat.id
                      ? colors.accent
                      : colors.textSecondary,
                    fontSize: 14,
                    fontWeight: activeCategory === cat.id ? 600 : 400,
                    fontFamily: "'Inter', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Project Cards */}
            <div
              className="projects-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 20,
              }}
            >
              {activeProjects.map((project, idx) => (
                <div
                  key={`${activeCategory}-${idx}`}
                  style={{
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 10,
                    padding: "28px 24px",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <h3 style={{
                    fontSize: 17, fontWeight: 600, color: colors.text,
                    marginBottom: 10,
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontSize: 14, color: colors.textSecondary,
                    lineHeight: 1.7, marginBottom: 16,
                  }}>
                    {project.description}
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 500,
                          padding: "3px 10px",
                          borderRadius: 4,
                          background: "rgba(201,169,110,0.1)",
                          color: colors.accent,
                          border: `1px solid rgba(201,169,110,0.2)`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SKILLS ═══ */}
        <section id="skills" style={sectionStyle()}>
          <div style={containerStyle}>
            <h2 style={sectionHeading}>Skills</h2>
            <div
              className="skills-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
              }}
            >
              {SKILLS.map((skill, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "20px",
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: colors.bgCard,
                    transition: "box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h3 style={{
                    fontSize: 14, fontWeight: 600, color: colors.text,
                    marginBottom: 6, lineHeight: 1.4,
                  }}>
                    {skill.name}
                  </h3>
                  <p style={{
                    fontSize: 13, color: colors.textTertiary,
                    lineHeight: 1.6, margin: 0,
                  }}>
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCE ═══ */}
        <section id="experience" style={sectionStyle(true)}>
          <div style={containerStyle}>
            <h2 style={sectionHeading}>Experience</h2>
            <div>
              {EXPERIENCES.map((exp, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "28px 0",
                    borderTop: idx === 0 ? "none" : `1px solid ${colors.border}`,
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 4,
                    flexWrap: "wrap",
                    gap: 8,
                  }}>
                    <h3 style={{
                      fontSize: 17, fontWeight: 600, color: colors.text,
                      margin: 0,
                    }}>
                      {exp.role}
                    </h3>
                    {exp.period && (
                      <span style={{
                        fontSize: 13,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: colors.textTertiary,
                        fontWeight: 400,
                      }}>
                        {exp.period}
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: 14, fontWeight: 500, color: colors.accent,
                    marginBottom: 8,
                  }}>
                    {exp.company}
                  </p>
                  <p style={{
                    fontSize: 14, color: colors.textSecondary,
                    lineHeight: 1.7,
                  }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ BLOG ═══ */}
        <section id="blog" style={sectionStyle()}>
          <div style={containerStyle}>
            <h2 style={sectionHeading}>Blog</h2>
            <div style={{
              padding: "48px 24px",
              borderRadius: 10,
              border: `1px dashed ${colors.border}`,
              textAlign: "center",
            }}>
              <p style={{
                fontSize: 18, fontWeight: 600, color: colors.textSecondary,
                marginBottom: 8,
              }}>
                Work in Progress
              </p>
              <p style={{
                fontSize: 14, color: colors.textTertiary,
                lineHeight: 1.7,
              }}>
                I'm working on getting this section up and running. Check back soon!
              </p>
            </div>
          </div>
        </section>

        {/* ═══ RESUME ═══ */}
        <section id="resume" style={sectionStyle(true)}>
          <div style={containerStyle}>
            <h2 style={sectionHeading}>Resume</h2>
            <p style={{
              fontSize: 16, color: colors.textSecondary,
              lineHeight: 1.8, marginBottom: 24, maxWidth: 500,
            }}>
              Download my full resume for a detailed look at my experience, education, and skills.
            </p>
            <a
              href="/resume.pdf"
              download
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 28px", borderRadius: 6,
                background: colors.accent, color: "#1a1a2e",
                fontWeight: 600, fontSize: 14, cursor: "pointer",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.accentHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = colors.accent; }}
            >
              ↓ Download Resume (PDF)
            </a>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" style={{ ...sectionStyle(), paddingBottom: 80 }}>
          <div style={containerStyle}>
            <h2 style={sectionHeading}>Get in Touch</h2>
            <p style={{
              fontSize: 16, color: colors.textSecondary,
              lineHeight: 1.8, marginBottom: 24, maxWidth: 500,
            }}>
              Want to collaborate or just talk about engineering?
              Feel free to reach out — I'm always happy to connect.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { label: "avr72@scarletmail.rutgers.edu", href: "mailto:avr72@scarletmail.rutgers.edu" },
                { label: "LinkedIn", href: "https://linkedin.com" },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 14, fontWeight: 500, color: colors.accent,
                    borderBottom: `1px solid ${colors.accent}40`,
                    paddingBottom: 2,
                    transition: "border-color 0.2s",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer style={{
          padding: "32px 24px",
          borderTop: `1px solid ${colors.border}`,
          textAlign: "center",
        }}>
          <p style={{ color: colors.textTertiary, fontSize: 13 }}>
            © 2026 Aditya Raman
          </p>
        </footer>
      </div>
    </>
  );
}
