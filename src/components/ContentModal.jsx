import React, { useEffect } from 'react';
import { X, Play, Plus, Check, Heart, Calendar, Clock, Film } from 'lucide-react';
import { soundEffects } from '../utils/audioEffects';

export default function ContentModal({ item, onClose, onPlayVideo, isInMyList, onToggleMyList }) {
  useEffect(() => {
    // Cerrar con Escape
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Bloquear scroll de fondo
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!item) return null;

  const isSaved = isInMyList(item.id);

  const handlePlay = () => {
    soundEffects.playPop();
    onPlayVideo(item);
  };

  const handleToggle = () => {
    soundEffects.playPop();
    onToggleMyList(item);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Botón Cerrar */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
          <X size={22} />
        </button>

        {/* Portada Superior */}
        <div className="modal-hero-cover">
          <img
            src={item.image}
            alt={item.title}
            className="modal-cover-img"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="modal-cover-gradient" />

          <div className="modal-hero-overlay-info">
            <h2 className="modal-hero-title">{item.title}</h2>

            <div className="modal-actions-row">
              <button className="btn-play-hero" onClick={handlePlay}>
                <Play size={20} fill="currentColor" />
                <span>Reproducir</span>
              </button>

              <button
                className="btn-mylist-hero"
                onClick={handleToggle}
                title={isSaved ? "Quitar de Mi Lista" : "Agregar a Mi Lista"}
              >
                {isSaved ? <Check size={18} color="#46d369" /> : <Plus size={18} />}
                <span>{isSaved ? 'En mi lista' : 'Mi lista'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cuerpo del Modal */}
        <div className="modal-body-layout">
          {/* Lado Izquierdo: Sinopsis y Texto */}
          <div>
            <div className="hero-meta-row" style={{ marginBottom: '1rem' }}>
              <span className="match-badge">{item.match || '100% de amor'}</span>
              <span className="rating-badge">{item.categoryBadge || item.category || 'Recuerdo'}</span>
              <span style={{ color: '#fff' }}>{item.year || '2026'}</span>
              <span style={{ color: '#a3a3a3' }}>{item.duration || 'Recuerdo eterno'}</span>
              <span className="quality-badge">HD</span>
            </div>

            <p className="modal-synopsis-text">{item.description}</p>

            {item.fullText && (
              <div className="modal-full-text-box">
                <p>"{item.fullText}"</p>
              </div>
            )}
          </div>

          {/* Lado Derecho: Metadatos estilo Netflix */}
          <div className="modal-sidebar-info">
            <div className="modal-meta-field">
              <span>Elenco principal:</span> Vane & Tú (La mejor pareja)
            </div>

            <div className="modal-meta-field">
              <span>Categoría:</span> {item.category || 'Recuerdos de amor'}
            </div>

            <div className="modal-meta-field">
              <span>Dirigido por:</span> Quien te ama con todo su corazón
            </div>

            {item.tags && item.tags.length > 0 && (
              <div className="modal-meta-field">
                <span>Etiquetas:</span>
                <div className="card-tags-pills" style={{ marginTop: '8px' }}>
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="card-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
