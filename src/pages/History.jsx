import React from 'react';
import { Play, Plus, Check, Clock, Heart, Sparkles } from 'lucide-react';
import { contentRows } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function History({ onPlayVideo, onOpenModal, isInMyList, onToggleMyList }) {
  const historyRow = contentRows.find((r) => r.id === 'row-history') || { items: [] };

  return (
    <div className="photos-page-container">
      <div className="page-header-banner">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ff2e63', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
          <Sparkles size={16} /> Serie Documental Original
        </div>
        <h1 className="page-header-title">🎬 Nuestra Historia</h1>
        <p style={{ color: '#a3a3a3', fontSize: '1.1rem' }}>
          Temporada 1 a la Eternidad. Los capítulos más importantes de cómo nos conocimos y construimos este amor.
        </p>
      </div>

      <div style={{ maxWidth: '950px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {historyRow.items.map((ep, idx) => {
          const isSaved = isInMyList(ep.id);

          return (
            <div
              key={ep.id}
              style={{
                background: '#18181b',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'grid',
                gridTemplateColumns: '180px 1fr auto',
                gap: '1.5rem',
                padding: '16px',
                alignItems: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(229,9,20,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
              onClick={() => {
                soundEffects.playPop();
                onOpenModal(ep);
              }}
            >
              {/* Miniatura del episodio */}
              <div style={{ position: 'relative', width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden' }}>
                <img
                  src={ep.image}
                  alt={ep.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEffects.playPop();
                    onPlayVideo(ep);
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    opacity: 0.9
                  }}
                  title="Reproducir episodio"
                >
                  <Play size={28} fill="currentColor" />
                </button>
              </div>

              {/* Información del episodio */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fda4af', fontSize: '0.82rem', fontWeight: 700 }}>
                  <span>Episodio {idx + 1}</span>
                  <span>•</span>
                  <span>{ep.duration}</span>
                  <span>•</span>
                  <span style={{ color: '#46d369' }}>100% Amor</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#fff', margin: '4px 0 6px 0' }}>
                  {ep.title}
                </h3>
                <p style={{ color: '#a3a3a3', fontSize: '0.9rem', lineHeight: 1.45 }}>
                  {ep.description}
                </p>
              </div>

              {/* Acciones */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  className="card-circle-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEffects.playPop();
                    onToggleMyList(ep);
                  }}
                  title={isSaved ? "Quitar de Mi Lista" : "Agregar a Mi Lista"}
                >
                  {isSaved ? <Check size={16} color="#46d369" /> : <Plus size={16} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
