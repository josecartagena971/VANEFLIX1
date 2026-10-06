import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { tenReasons } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function TenReasons() {
  const [revealedSet, setRevealedSet] = useState(new Set());

  const handleToggleCard = (number) => {
    soundEffects.playPop();
    const updated = new Set(revealedSet);
    if (updated.has(number)) {
      updated.delete(number);
    } else {
      updated.add(number);
    }
    setRevealedSet(updated);

    // Si reveló todas las 10 razones, lanzar confeti
    if (updated.size === 10) {
      soundEffects.playChime();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#ff2e63', '#fbbf24', '#ffffff']
      });
    }
  };

  const handleRevealAll = () => {
    soundEffects.playChime();
    setRevealedSet(new Set(tenReasons.map((r) => r.number)));
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  const progressPercent = (revealedSet.size / tenReasons.length) * 100;

  return (
    <section className="reasons-section">
      <div className="reasons-title-wrap">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ff4d6d', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <Sparkles size={16} /> Especial exclusivo
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginTop: '6px' }}>
          🔟 10 Razones por las que te amo
        </h2>
        <p style={{ color: '#a3a3a3', marginTop: '6px', fontSize: '1rem' }}>
          Toca cada tarjeta para descubrir cada motivo ({revealedSet.size}/10 descubiertos)
        </p>

        {/* Barra de progreso */}
        <div className="reasons-progress-track">
          <div className="reasons-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        {revealedSet.size < 10 && (
          <button
            onClick={handleRevealAll}
            style={{ marginTop: '1rem', color: '#ff4d6d', fontSize: '0.85rem', textDecoration: 'underline' }}
          >
            Descubrir todas las razones a la vez
          </button>
        )}
      </div>

      <div className="reasons-grid-layout">
        {tenReasons.map((item) => {
          const isRevealed = revealedSet.has(item.number);

          return (
            <div
              key={item.number}
              className="reason-card-interactive"
              onClick={() => handleToggleCard(item.number)}
              style={{
                borderColor: isRevealed ? '#ff2e63' : 'rgba(255,255,255,0.08)',
                background: isRevealed ? 'rgba(225, 29, 72, 0.12)' : 'rgba(39, 39, 42, 0.5)'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleToggleCard(item.number)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="reason-card-number">{item.number}</span>
                <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
              </div>

              <h3 className="reason-card-title">{item.title}</h3>
              <p className="reason-card-desc">
                {item.description}
              </p>

              <div style={{ marginTop: '12px', fontSize: '0.75rem', color: isRevealed ? '#fda4af' : '#737373', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Heart size={12} fill={isRevealed ? '#ff2e63' : 'none'} color={isRevealed ? '#ff2e63' : '#737373'} />
                {isRevealed ? 'Razón leída con amor' : 'Toca para leer'}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
