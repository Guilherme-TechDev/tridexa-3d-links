import { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [indexAtual, setIndexAtual] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervaloRef = useRef(null);

  const links = [
    { label: '🛒 Loja Shopee', url: 'https://s.shopee.com.br/5flEcURI5z' },
    { label: '📦 Loja Mercado Livre ( EM BREVE )', url: '#' },
{ label: '📱 WhatsApp', url: 'https://wa.me/5564999040937' },  ];

  const imagens = [
    '/img1.png',
    '/img2.jpg',
    '/img3.jpg',
    '/img4.jpg',
    '/img5.jpg',
    '/img6.jpg',
    '/img7.jpg',
    '/img8.jpg',
  ];

  // AUTO PLAY
  useEffect(() => {
    if (paused) return;

    intervaloRef.current = setInterval(() => {
      setIndexAtual((prev) => (prev + 1) % imagens.length);
    }, 3000);

    return () => clearInterval(intervaloRef.current);
  }, [paused]);

  function togglePause() {
    setPaused((prev) => !prev);
  }

  function nextSlide() {
    setIndexAtual((prev) => (prev + 1) % imagens.length);
  }

  function prevSlide() {
    setIndexAtual((prev) =>
      prev === 0 ? imagens.length - 1 : prev - 1
    );
  }

  function getVisibleDots() {
    const max = 5;
    let start = Math.max(0, indexAtual - 2);
    let end = start + max;

    if (end > imagens.length) {
      end = imagens.length;
      start = Math.max(0, end - max);
    }

    return imagens.slice(start, end).map((_, i) => start + i);
  }

  return (
    <div className="page-container">

      {/* VIDEO */}
      <video className="bg-video" src="/impressao.mp4" autoPlay loop muted />
      <div className="overlay"></div>

      {/* POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">

            <button className="close-btn" onClick={() => setShowPopup(false)}>
              ✕
            </button>

            <div className="popup-logo">
              <img src="/logo.png" alt="Logo" />
            </div>

            <h2>Bem-vindo à TRIDEXA 3D</h2>
            <p>Transformamos ideias em peças reais</p>

          </div>
        </div>
      )}

      <div className="main-content">

        {/* CARD */}
        <div className="card">

          <header className="header">
            <div className="brand">
              <img src="/logo.png" className="brand-logo" />
              <h1 className="brand-name">TRIDEXA 3D</h1>
            </div>

            <ul className="popup-list">
              <li>🔧 Impressão sob medida</li>
              <li>💬 Orçamento grátis</li>
              <li>📦 Atacado</li>
              <li>⚡ Produção rápida</li>
            </ul>
          </header>

          <main className="links-container">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className="link-button"
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </main>

        </div>

        {/* CARROSSEL */}
        <div className="recent-card">
          <h2 className="recent-title">Recentes</h2>

          <div className="carousel">

            <img
              src={imagens[indexAtual]}
              className="carousel-image"
              onError={(e) => {
                console.log("Erro na imagem:", imagens[indexAtual]);
                e.target.src = imagens[0];
              }}
              onClick={togglePause}
              alt="Projeto"
            />

            {/* PLAY / PAUSE */}
            <div className="play-pause">
              {paused ? '▶' : '⏸'}
            </div>

            {/* SETAS */}
            <button className="btn prev" onClick={prevSlide}>‹</button>
            <button className="btn next" onClick={nextSlide}>›</button>

            {/* BOLINHAS */}
            <div className="dots">
              {getVisibleDots().map((i) => (
                <span
                  key={i}
                  className={`dot ${i === indexAtual ? 'active' : ''}`}
                  onClick={() => setIndexAtual(i)}
                />
              ))}
            </div>

          </div>
        </div>

      </div>

      <footer className="footer">

  <div className="footer-social">
    <a href="https://wa.me/5564999040937" target="_blank" rel="noreferrer">
      <FaWhatsapp /> WhatsApp
    </a>

    <a href="https://www.instagram.com/tridexa.3d/" target="_blank" rel="noreferrer">
      <FaInstagram /> Instagram
    </a>
  </div>

  <p>© 2026 TRIDEXA 3D - Todos os direitos reservados</p>
  <span>By TRIDEXA</span>

</footer>

    </div>
  );
}

export default App;