import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X } from 'lucide-react';
import { soundEffects } from '../utils/audioEffects';

export default function EasterEggs() {
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  const handleHeartClick = () => {
    soundEffects.playPop();
    const newCount = heartCount + 1;
    setHeartCount(newCount);

    if (newCount === 3) {
      soundEffects.playChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.1, y: 0.9 },
        colors: ['#ff2e63', '#fda4af', '#fff']
      });
      setShowSecretModal(true);
      setHeartCount(0);
    }
  };

  return (
    <>
      {/* Botón flotante sutil de secreto en la esquina inferior izquierda */}
      <button
        onClick={handleHeartClick}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: 'rgba(255, 46, 99, 0.2)',
          border: '1px solid rgba(255, 46, 99, 0.4)',
          color: '#ff2e63',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        title="Un secreto escondido... (Toca 3 veces)"
      >
        <Heart size={20} fill="#ff2e63" />
      </button>

      {/* Modal de mensaje secreto desbloqueado */}
      {showSecretModal && (
        <div className="letter-reader-modal" onClick={() => setShowSecretModal(false)}>
          <div className="letter-stationery-sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px', textAlign: 'center' }}>
            <button
              className="modal-close-btn"
              onClick={() => setShowSecretModal(false)}
              style={{ background: '#be123c', color: '#fff', border: 'none' }}
            >
              <X size={18} />
            </button>

            <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🤫❤️</div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#9f1239', marginBottom: '1rem' }}>
              ¡Para mi corazoncini de mecolotini!
            </h2>

            <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: '#27272a', fontStyle: 'italic', marginBottom: '1.5rem' }}>
              "Si encontraste este rincón secreto es porque eres tan curiosa como preciosa, mi niña bonita.
              Solo quería recordarte que ¡qué guapa estás siempre, amorcito! y que cada segundo a tu lado vale una vida entera.
              Te amo más de lo que cualquier plataforma podría expresar, mi amorcini, mi corazón de mecolotón."
            </p>

            <div style={{ fontWeight: 800, color: '#e11d48' }}>
              Siempre tuyo, mi bonita ❤️
            </div>
          </div>
        </div>
      )}
    </>
  );
}
