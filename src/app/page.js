"use client";

import { useState, useEffect } from "react";

const collections = [
  {
    id: "marmi",
    name: "Marmi Classici",
    desc: "Lastre monumentali ispirate ai marmi più pregiati d'Italia. Venature profonde e finiture lucide per ambienti regali.",
    textureClass: "texture-marble",
  },
  {
    id: "pietre",
    name: "Pietra Naturale",
    desc: "Il fascino crudo della roccia spaccata. Superfici strutturate che evocano la forza e la matericità degli elementi terrestri.",
    textureClass: "texture-stone",
  },
  {
    id: "cotto",
    name: "Cotto Toscano",
    desc: "Il calore della terra cotta al sole. Toni caldi, bordi irregolari e una texture artigianale per riscoprire la tradizione.",
    textureClass: "texture-terracotta",
  },
];

const floorTypes = [
  {
    id: "marble",
    name: "Marmo Statuario",
    color: "#e6e4df",
    pattern: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(230,228,223,0.9) 100%)",
    bgSize: "60px 60px",
    extraStyles: {
      backgroundImage: "linear-gradient(45deg, rgba(197, 168, 128, 0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(197, 168, 128, 0.05) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(197, 168, 128, 0.05) 75%), linear-gradient(-45deg, transparent 75%, rgba(197, 168, 128, 0.05) 75%)",
      backgroundColor: "#f4f1ea",
    }
  },
  {
    id: "stone",
    name: "Ardesia Nera",
    color: "#252422",
    pattern: "linear-gradient(135deg, #1c1a17 0%, #252422 100%)",
    bgSize: "40px 40px",
    extraStyles: {
      backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.3) 1px, transparent 1px), linear-gradient(0deg, rgba(0, 0, 0, 0.3) 1px, transparent 1px)",
      backgroundColor: "#1c1a17",
    }
  },
  {
    id: "terracotta",
    name: "Cotto Rustico",
    color: "#8c5b47",
    pattern: "linear-gradient(135deg, #a36f58 0%, #7d4d38 100%)",
    bgSize: "50px 50px",
    extraStyles: {
      backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.15) 10%, transparent 11%)",
      backgroundColor: "#8c5b47",
    }
  }
];

const jointColors = [
  { id: "light", name: "Cemento Chiaro", color: "rgba(244, 241, 234, 0.3)" },
  { id: "dark", name: "Grigio Scuro", color: "rgba(10, 9, 8, 0.5)" },
  { id: "gold", name: "Ottone Dorato", color: "rgba(197, 168, 128, 0.4)" },
];

export default function Home() {
  const [activeFloor, setActiveFloor] = useState("marble");
  const [activeJoint, setActiveJoint] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedFloor = floorTypes.find((f) => f.id === activeFloor) || floorTypes[0];
  const selectedJoint = jointColors.find((j) => j.id === activeJoint) || jointColors[0];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <>
      {/* Header */}
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container header-container">
          <div className="logo">
            <span className="logo-icon" />
            <div className="logo-text">
              CERAMICA<span>NOVA</span>
            </div>
          </div>
          <nav>
            <ul className="nav-links">
              <li>
                <a href="#hero" className="nav-link active">
                  Home
                </a>
              </li>
              <li>
                <a href="#collections" className="nav-link">
                  Collezioni
                </a>
              </li>
              <li>
                <a href="#visualizer" className="nav-link">
                  Visualizzatore
                </a>
              </li>
              <li>
                <a href="#contact" className="nav-link">
                  Contatti
                </a>
              </li>
            </ul>
          </nav>
          <a href="#contact">
            <button className="cta-button">Richiedi Campione</button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="container hero-grid">
          <div className="hero-content animate-fade-in">
            <span className="hero-tagline">Italian Luxury Surfaces</span>
            <h1 className="hero-title">
              Superfici d'Arte per Spazi d'Autore
            </h1>
            <p className="hero-description">
              Dal 1984 plasmiamo argilla, marmo e pietre naturali per dare vita
              a rivestimenti esclusivi. Design d'avanguardia e artigianalità
              italiana si incontrano per definire il lusso contemporaneo.
            </p>
            <div className="hero-actions">
              <a href="#collections">
                <button className="btn-primary">Esplora Collezioni</button>
              </a>
              <a href="#visualizer">
                <button className="btn-secondary">Progetta Spazio</button>
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="tile-glow" />
            <div className="tile-artwork">
              <div className="tile-segment" />
              <div className="tile-segment accent" />
              <div className="tile-segment accent" />
              <div className="tile-segment" />
            </div>
          </div>
        </div>
      </section>

      {/* Collezioni Section */}
      <section id="collections" className="section section-bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tagline">Le Nostre Collezioni</span>
            <h2 className="section-title">Materia e Ispirazione</h2>
            <p className="section-description">
              Ogni piastrella racconta una storia geologica ed estetica unica.
              Scopri le collezioni che fondono natura e design.
            </p>
          </div>
          <div className="collections-grid">
            {collections.map((col) => (
              <div key={col.id} className="collection-card">
                <div className="collection-img-wrapper">
                  <div className={col.textureClass} />
                </div>
                <div className="collection-info">
                  <h3 className="collection-title">{col.name}</h3>
                  <p className="collection-desc">{col.desc}</p>
                  <a href="#contact" className="collection-link">
                    Scopri di più <span>&rarr;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Visualizer Section */}
      <section id="visualizer" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tagline">Configuratore 3D</span>
            <h2 className="section-title">Visualizza nel tuo Spazio</h2>
            <p className="section-description">
              Seleziona la tipologia di piastrella e il colore della fuga per
              prevedere la resa estetica sul pavimento del tuo prossimo ambiente.
            </p>
          </div>

          <div className="visualizer-container">
            {/* Left Column: Interactive Preview */}
            <div className="visualizer-preview">
              <div className="room-scene">
                <div className="room-wall">
                  <div className="room-furniture">
                    <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>Showroom</span>
                  </div>
                </div>
                <div className="room-floor-container">
                  <div
                    className="room-floor"
                    style={{
                      backgroundColor: selectedFloor.color,
                      backgroundImage: selectedFloor.extraStyles.backgroundImage,
                      backgroundSize: selectedFloor.bgSize,
                      boxShadow: `inset 0 0 0 1px ${selectedJoint.color}, inset 0 20px 40px rgba(0,0,0,0.8)`,
                      borderColor: selectedJoint.color,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Controls */}
            <div className="visualizer-controls">
              {/* Tile Type Select */}
              <div className="control-group">
                <span className="control-title">1. Seleziona Superficie</span>
                <div className="options-grid">
                  {floorTypes.map((type) => (
                    <button
                      key={type.id}
                      className={`option-button ${
                        activeFloor === type.id ? "active" : ""
                      }`}
                      onClick={() => setActiveFloor(type.id)}
                    >
                      <div
                        className="option-preview-circle"
                        style={{ backgroundColor: type.color }}
                      />
                      <span>{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Joint Color Select */}
              <div className="control-group">
                <span className="control-title">2. Colore della Fuga</span>
                <div className="options-grid">
                  {jointColors.map((joint) => (
                    <button
                      key={joint.id}
                      className={`option-button ${
                        activeJoint === joint.id ? "active" : ""
                      }`}
                      onClick={() => setActiveJoint(joint.id)}
                    >
                      <div
                        className="option-preview-circle"
                        style={{
                          backgroundColor: joint.color.includes("rgba")
                            ? "#444"
                            : joint.color,
                          border: `1.5px solid ${joint.color}`,
                        }}
                      />
                      <span>{joint.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Configurator Text Info */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                }}
              >
                <strong>Abbinamento Consigliato:</strong> La finitura{" "}
                <span style={{ color: "var(--accent-gold)" }}>
                  {selectedFloor.name}
                </span>{" "}
                con fuga in tonalità{" "}
                <span style={{ color: "var(--accent-gold)" }}>
                  {selectedJoint.name}
                </span>{" "}
                crea un contrasto bilanciato ideale per soggiorni di lusso e showroom commerciali.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="section section-bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tagline">Contattaci</span>
            <h2 className="section-title">Inizia il tuo Progetto</h2>
            <p className="section-description">
              Hai bisogno di consulenza o desideri ricevere campioni fisici direttamente a casa tua? Scrivici e un esperto ti risponderà entro 24 ore.
            </p>
          </div>

          <div className="contact-grid">
            {/* Left: contact info */}
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon-box">&#128205;</div>
                <div className="contact-card-content">
                  <h3>Sede e Showroom</h3>
                  <p>Via dell'Artigianato, 14, 41049 Sassuolo (MO) - Italy</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon-box">&#128222;</div>
                <div className="contact-card-content">
                  <h3>Telefono</h3>
                  <p>+39 0536 880088</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon-box">&#9993;</div>
                <div className="contact-card-content">
                  <h3>Email</h3>
                  <p>info@ceramicanova.it</p>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <form className="contact-form" onSubmit={handleFormSubmit}>
              {formSubmitted ? (
                <div
                  style={{
                    padding: "24px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(46, 196, 182, 0.1)",
                    border: "1px solid #2ec4b6",
                    color: "#2ec4b6",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ color: "#2ec4b6", marginBottom: "8px" }}>
                    Messaggio inviato con successo!
                  </h3>
                  Grazie per averci contattato. Ti risponderemo il prima possibile.
                </div>
              ) : (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Nome Completo
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        id="name"
                        required
                        placeholder="Es: Mario Rossi"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Indirizzo Email
                      </label>
                      <input
                        className="form-input"
                        type="email"
                        id="email"
                        required
                        placeholder="Es: mario.rossi@email.it"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="project">
                      Tipo di Progetto
                    </label>
                    <select
                      className="form-input"
                      id="project"
                      style={{ appearance: "none" }}
                    >
                      <option value="residenziale">Residenziale Privato</option>
                      <option value="commerciale">Commerciale / Retail</option>
                      <option value="architetto">Studio Architettura</option>
                      <option value="richiesta-campioni">Richiesta Campioni</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">
                      Dettagli del Progetto / Messaggio
                    </label>
                    <textarea
                      className="form-textarea"
                      id="message"
                      required
                      placeholder="Descrivi brevemente lo spazio che stai progettando..."
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: "100%" }}>
                    Invia Richiesta
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="logo">
              <span className="logo-icon" />
              <div className="logo-text">
                CERAMICA<span>NOVA</span>
              </div>
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Innovazione e design ceramico d'eccellenza.
            </div>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Ceramica Nova SRL. Tutti i diritti riservati. P.IVA 01234567890.
          </div>
        </div>
      </footer>
    </>
  );
}
