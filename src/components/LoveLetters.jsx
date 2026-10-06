import React, { useState } from 'react';
import { Mail, X, Heart, Feather } from 'lucide-react';
import { loveLetters } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function LoveLetters() {
  const [activeLetter, setActiveLetter] = useState(null);

  const handleOpenLetter = (letter) => {
    soundEffects.playPop();
    setActiveLetter(letter);
  };

  const handleClose = () => {
    setActiveLetter(null);
  };

  return (
    <div className="letters-page-container">
      <div className="page-header-banner">
        <h1 className="page-header-title">💌 Cartas para Vane</h1>
        <p style={{ color: '#a3a3a3', fontSize: '1.1rem' }}>
          Palabras escritas desde el fondo de mi corazón. Ábrelas cuando quieras sentir mi abrazo.
        </p>
      </div>

      <div className="letters-grid">
        {loveLetters.map((letter) => (
          <div
            key={letter.id}
            className="letter-card-envelope"
            onClick={() => handleOpenLetter(letter)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleOpenLetter(letter)}
          >
            <div>
              <div className="envelope-seal-badge">
                <Heart size={20} fill="currentColor" />
              </div>
              <h2 className="letter-card-title">{letter.title}</h2>
              <p className="letter-card-preview">"{letter.preview}"</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <span className="letter-card-date">{letter.date}</span>
              <span style={{ fontSize: '0.85rem', color: '#ff4d6d', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Feather size={14} /> Leer carta
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Lectura de Carta en Papel Clásico */}
      {activeLetter && (
        <div className="letter-reader-modal" onClick={handleClose}>
          <div className="letter-stationery-sheet" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={handleClose}
              style={{ background: '#be123c', color: '#fff', border: 'none' }}
              aria-label="Cerrar carta"
            >
              <X size={18} />
            </button>

            <div className="letter-header-row">
              <div>
                <h2 style={{ fontSize: '2rem', color: '#881337', marginBottom: '4px' }}>
                  {activeLetter.title}
                </h2>
                <span style={{ fontSize: '0.9rem', color: '#78716c', fontStyle: 'italic' }}>
                  {activeLetter.subtitle} • {activeLetter.date}
                </span>
              </div>
            </div>

            <div className="letter-main-text">
              {activeLetter.content}
            </div>

            <div className="letter-footer-stamp">
              {activeLetter.stamp}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
