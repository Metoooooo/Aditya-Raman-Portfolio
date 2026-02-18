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

const TOOLS_AND_FRAMEWORKS = [
  "Python", "MATLAB", "Simulink", "Git", "SQL", "Excel",
  "OpenCV", "SolidWorks", "NumPy", "SciPy", "LaTeX",
];

const DOMAIN_SKILLS = [
  {
    name: "Control Systems & Dynamical Systems",
    description: "Linear and nonlinear modeling, feedback control design, simulation, Kalman filtering, and stochastic optimal control.",
  },
  {
    name: "Machine Learning & Statistical Modeling",
    description: "Supervised ML models (k-NN, perceptron, classifiers), multimodal fraud/spam detection, high-dimensional and imbalanced datasets.",
  },
  {
    name: "Stochastic Processes & SDE Modeling",
    description: "SDE estimators using SINDy and stochastic SINDy, drift/diffusion learning from trajectory data, multi-time-step swarm simulations.",
  },
  {
    name: "Signal & Information Processing",
    description: "Experimental signal acquisition, noise handling, feedback circuits, FIR/IIR filter design, and inference-based approaches to physics and controls problems.",
  },
  {
    name: "Computer Vision & Data Modalities",
    description: "Image pipelines with contour extraction, and working across time-series, text, tabular, sequence, and image data.",
  },
  {
    name: "Experimental Physics & Hardware",
    description: "Atomic gravimetry, magneto-optical trap experiments, analog/digital circuit design, and feedback control of lab hardware.",
  },
  {
    name: "Research, Teaching & Communication",
    description: "Research across multiple labs, publications/posters, Physics TA and Learning Assistant experience.",
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
  const [expandedExp, setExpandedExp] = useState(new Set([0]));

  const toggleExp = (idx) => {
    setExpandedExp(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

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
          width: 280px;
          height: 280px;
          border-radius: 50%;
          border: 2px dashed rgba(201,169,110,0.5);
          animation: spin-slow 25s linear infinite;
        }
        .photo-ring-inner {
          position: absolute;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          border: 2px solid rgba(201,169,110,0.35);
          animation: spin-reverse 20s linear infinite;
        }
        .photo-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.25) 0%, rgba(201,169,110,0.08) 50%, transparent 70%);
          animation: pulse-glow 4s ease-in-out infinite;
        }
        .photo-glow-secondary {
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 60%);
          animation: pulse-glow 5s ease-in-out 1s infinite;
        }
        .photo-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(201,169,110,0.8);
          box-shadow: 0 0 8px rgba(201,169,110,0.6);
        }
        .photo-dot-1 { top: 5px; left: 50%; animation: pulse-glow 3s ease-in-out infinite; }
        .photo-dot-2 { bottom: 5px; left: 50%; animation: pulse-glow 3s ease-in-out 1s infinite; }
        .photo-dot-3 { left: 5px; top: 50%; animation: pulse-glow 3s ease-in-out 0.5s infinite; }
        .photo-dot-4 { right: 5px; top: 50%; animation: pulse-glow 3s ease-in-out 1.5s infinite; }
        .photo-dot-5 { top: 30px; left: 30px; width: 5px; height: 5px; animation: pulse-glow 3.5s ease-in-out 0.3s infinite; }
        .photo-dot-6 { top: 30px; right: 30px; width: 5px; height: 5px; animation: pulse-glow 3.5s ease-in-out 1.3s infinite; }
        .photo-dot-7 { bottom: 30px; left: 30px; width: 5px; height: 5px; animation: pulse-glow 3.5s ease-in-out 0.8s infinite; }
        .photo-dot-8 { bottom: 30px; right: 30px; width: 5px; height: 5px; animation: pulse-glow 3.5s ease-in-out 1.8s infinite; }

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
              <div className="photo-wrapper" style={{ width: 340, height: 340 }}>
                <div className="photo-glow-secondary" />
                <div className="photo-ring-outer" />
                <div className="photo-ring-inner" />
                <div className="photo-glow" />
                <div className="photo-dot photo-dot-1" />
                <div className="photo-dot photo-dot-2" />
                <div className="photo-dot photo-dot-3" />
                <div className="photo-dot photo-dot-4" />
                <div className="photo-dot photo-dot-5" />
                <div className="photo-dot photo-dot-6" />
                <div className="photo-dot photo-dot-7" />
                <div className="photo-dot photo-dot-8" />
                <img src="./profile-photo.jpg" alt="Aditya Raman" style={{
                  width: 200, height: 200, borderRadius: "50%",
                  border: `3px solid rgba(201,169,110,0.4)`,
                  boxShadow: "0 0 30px rgba(201,169,110,0.15), 0 0 60px rgba(201,169,110,0.05)",
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

            {/* Tools & Frameworks */}
            <h3 style={{
              fontSize: 16, fontWeight: 600, color: colors.textSecondary,
              marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              Tools & Frameworks
            </h3>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40,
            }}>
              {TOOLS_AND_FRAMEWORKS.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 500,
                    padding: "8px 18px",
                    borderRadius: 6,
                    background: "rgba(201,169,110,0.1)",
                    color: colors.accent,
                    border: `1px solid rgba(201,169,110,0.25)`,
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Domain Skills */}
            <h3 style={{
              fontSize: 16, fontWeight: 600, color: colors.textSecondary,
              marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              Domain Knowledge
            </h3>
            <div
              className="skills-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
              }}
            >
              {DOMAIN_SKILLS.map((skill, idx) => (
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
              {EXPERIENCES.map((exp, idx) => {
                const isOpen = expandedExp.has(idx);
                return (
                  <div
                    key={idx}
                    style={{
                      borderTop: idx === 0 ? "none" : `1px solid ${colors.border}`,
                    }}
                  >
                    <button
                      onClick={() => toggleExp(idx)}
                      style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "24px 0",
                        textAlign: "left",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 16,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          flexWrap: "wrap",
                          gap: 8,
                          marginBottom: 4,
                        }}>
                          <span style={{
                            fontSize: 17, fontWeight: 600, color: colors.text,
                          }}>
                            {exp.role}
                          </span>
                          {exp.period && (
                            <span style={{
                              fontSize: 13,
                              fontFamily: "'JetBrains Mono', monospace",
                              color: colors.textTertiary,
                              fontWeight: 400,
                              flexShrink: 0,
                            }}>
                              {exp.period}
                            </span>
                          )}
                        </div>
                        <span style={{
                          fontSize: 14, fontWeight: 500, color: colors.accent,
                        }}>
                          {exp.company}
                        </span>
                      </div>
                      <span style={{
                        fontSize: 18,
                        color: colors.accent,
                        flexShrink: 0,
                        transition: "transform 0.25s",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        display: "inline-block",
                        lineHeight: 1,
                      }}>
                        ›
                      </span>
                    </button>
                    <div style={{
                      overflow: "hidden",
                      maxHeight: isOpen ? 400 : 0,
                      opacity: isOpen ? 1 : 0,
                      transition: "max-height 0.3s ease, opacity 0.25s ease",
                    }}>
                      <p style={{
                        fontSize: 14, color: colors.textSecondary,
                        lineHeight: 1.7, paddingBottom: 24,
                      }}>
                        {exp.description}
                      </p>
                    </div>
                  </div>
                );
              })}
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
            <div style={{
              borderRadius: 10,
              border: `1px solid ${colors.border}`,
              overflow: "hidden",
              background: colors.bgCard,
            }}>
              <div style={{
                padding: "12px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${colors.border}`,
                background: "rgba(201,169,110,0.05)",
              }}>
                <span style={{
                  fontSize: 14, fontWeight: 500, color: colors.textSecondary,
                }}>
                  Aditya_Raman_Resume.pdf
                </span>
                <a
                  href="./resume.pdf"
                  download
                  style={{
                    fontSize: 13, fontWeight: 500, color: colors.accent,
                    textDecoration: "none",
                    padding: "6px 14px",
                    borderRadius: 5,
                    border: `1px solid rgba(201,169,110,0.3)`,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,169,110,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  ↓ Download
                </a>
              </div>
              <iframe
                src="./resume.pdf"
                title="Resume"
                style={{
                  width: "100%",
                  height: 600,
                  border: "none",
                  display: "block",
                  background: "#fff",
                }}
              />
            </div>
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
