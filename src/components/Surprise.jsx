import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, X, Sparkles, Music } from 'lucide-react';
import { surpriseData, siteConfig } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function Surprise({ onClose, onPlayMusic }) {
  useEffect(() => {
    // Sonido mágico y activación de la música romántica
    soundEffects.playChime();
    if (onPlayMusic) onPlayMusic();

    // Ráfaga de confeti continuo
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#e11d48', '#ff2e63', '#fda4af', '#ffd166']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#e11d48', '#ff2e63', '#fda4af', '#ffd166']
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Bloquear scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleLaunchMoreConfetti = () => {
    soundEffects.playChime();
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#e11d48', '#ff2e63', '#f43f5e', '#ffd166', '#ffffff']
    });
  };

  return (
    <div className="surprise-full-overlay" onClick={onClose}>
      <div className="surprise-card-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar sorpresa"
        >
          <X size={20} />
        </button>

        <div className="surprise-heart-icon">💖</div>

        <h1 className="surprise-headline">{surpriseData.headline}</h1>
        <p className="surprise-subtitle">{surpriseData.subtitle}</p>

        <div className="surprise-paragraphs-wrap">
          {surpriseData.paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div className="surprise-final-quote">
          "{surpriseData.finalQuote}"
        </div>

        <div className="surprise-btn-group">
          <button
            className="btn-play-hero"
            onClick={handleLaunchMoreConfetti}
            style={{ background: '#e11d48', color: '#fff' }}
          >
            <Sparkles size={18} />
            <span>¡Más confeti y amor!</span>
          </button>

          {onPlayMusic && (
            <button
              className="btn-mylist-hero"
              onClick={() => {
                onPlayMusic();
                handleLaunchMoreConfetti();
              }}
            >
              <Music size={18} />
              <span>Reproducir nuestra canción</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
