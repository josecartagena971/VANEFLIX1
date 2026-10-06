import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Heart, ZoomIn, Calendar, Film, Music, Play, Pause, SkipForward } from 'lucide-react';
import { galleryPhotos, musicPlaylist } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function PhotoGallery({ onPlayMovie, isPlayingMusic = true, onToggleMusic }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [transitionKey, setTransitionKey] = useState(0);
  const [isSlideshow, setIsSlideshow] = useState(false);

  const slideCountRef = useRef(0);
  const currentMusic = musicPlaylist[currentSongIndex] || musicPlaylist[0];

  const categories = ['Todos', 'Primeras Citas', 'Viajes', 'Risas', 'Especiales'];

  const filteredPhotos = selectedCategory === 'Todos'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === selectedCategory);

  const handleOpenPhoto = (index) => {
    soundEffects.playPop();
    setTransitionKey(prev => prev + 1);
    setActivePhotoIndex(index);
    setIsSlideshow(false);
  };

  const handleClose = () => {
    setIsSlideshow(false);
    setActivePhotoIndex(null);
  };

  const handlePrev = (e) => {
    e?.stopPropagation?.();
    soundEffects.playPop();
    setTransitionKey(prev => prev + 1);
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation?.();
    soundEffects.playPop();
    setTransitionKey(prev => prev + 1);
    setActivePhotoIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  };

  // Modo presentación musical automática de fotos
  useEffect(() => {
    if (!isSlideshow || activePhotoIndex === null) return;

    const timer = setInterval(() => {
      setTransitionKey((prev) => prev + 1);
      setActivePhotoIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
    }, 4000);

    return () => clearInterval(timer);
  }, [isSlideshow, activePhotoIndex, filteredPhotos.length]);

  const handleStartSlideshow = () => {
    soundEffects.playTudum();
    slideCountRef.current = 0;
    setActivePhotoIndex(0);
    setIsSlideshow(true);
    if (!isPlayingMusic && onToggleMusic) onToggleMusic();
  };

  // Navegación con teclado en el visor de fotos
  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsSlideshow(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length, currentSongIndex]);

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <div className="photos-page-container">
      <div className="page-header-banner">
        <h1 className="page-header-title">📸 Nuestros Recuerdos</h1>
        <p style={{ color: '#a3a3a3', fontSize: '1.1rem', marginBottom: '1.2rem' }}>
          Una galería de instantes inolvidables. Cada foto guarda un pedacito de nuestra historia, mi niña bonita.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
          {onPlayMovie && (
            <button
              className="btn-play-hero"
              onClick={onPlayMovie}
              style={{
                background: '#E50914',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(229, 9, 20, 0.4)',
                transition: 'all 0.2s ease'
              }}
            >
              <Film size={18} fill="#fff" />
              <span>Ver Película Completa (Fotos + Videos con Música)</span>
            </button>
          )}

          <button
            className="btn-play-hero"
            onClick={handleStartSlideshow}
            style={{
              background: 'linear-gradient(135deg, #ff2e63 0%, #e11d48 100%)',
              color: '#fff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: '8px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(255, 46, 99, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            <Play size={18} fill="#fff" />
            <span>Presentación de Fotos con Música (Combina Canciones)</span>
          </button>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="category-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => {
              soundEffects.playPop();
              setSelectedCategory(cat);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cuadrícula de fotos */}
      <div className="photo-grid-layout">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            className="photo-card-item"
            onClick={() => handleOpenPhoto(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleOpenPhoto(idx)}
          >
            <img
              src={photo.image}
              alt={photo.title}
              className="photo-card-media"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80';
              }}
            />
            <div className="photo-card-info">
              <div className="photo-card-date">
                <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                {photo.date}
              </div>
              <h3 className="photo-card-title">{photo.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#a3a3a3' }}>
                {photo.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox de Vista Ampliada con Efectos de Transición */}
      {activePhoto && (
        <div className="lightbox-modal" onClick={handleClose}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            {/* Botón Cerrar, Contador y Control de Música */}
            <div style={{ position: 'absolute', top: '-52px', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#fda4af', fontSize: '0.88rem', fontWeight: 600, background: 'rgba(0,0,0,0.6)', padding: '5px 12px', borderRadius: '14px' }}>
                  Foto {activePhotoIndex + 1} de {filteredPhotos.length}
                </span>
                {isSlideshow && (
                  <span style={{ color: '#46d369', fontSize: '0.78rem', fontWeight: 700, background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '14px' }}>
                    ▶ Modo Automático
                  </span>
                )}
              </div>

              {/* Indicador de Música en el Visor de Fotos */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    background: 'rgba(255, 46, 99, 0.25)',
                    border: '1px solid rgba(255, 46, 99, 0.6)',
                    borderRadius: '20px',
                    padding: '5px 14px',
                    color: '#fda4af',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="Canción Principal: Happy Together (Sin cortes)"
                >
                  <Music size={13} />
                  <span>Happy Together • The Turtles (Sin cortes 🎵)</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleMusic) onToggleMusic();
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title={isPlayingMusic ? "Pausar música" : "Reanudar música"}
                >
                  {isPlayingMusic ? <Pause size={14} /> : <Play size={14} fill="#fff" />}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEffects.playPop();
                    setIsSlideshow(!isSlideshow);
                  }}
                  style={{
                    background: isSlideshow ? '#ff2e63' : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    color: '#fff',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer'
                  }}
                  title={isSlideshow ? "Pausar diapositivas" : "Activar diapositivas automáticas"}
                >
                  {isSlideshow ? <Pause size={12} /> : <Play size={12} fill="#fff" />}
                  <span>{isSlideshow ? 'Pausar Auto' : 'Auto ▶'}</span>
                </button>
              </div>

              <button
                className="modal-close-btn"
                onClick={handleClose}
                style={{ position: 'relative', top: 'auto', right: 'auto' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Flecha Anterior */}
            <button className="lightbox-nav-btn lightbox-prev" onClick={handlePrev} title="Foto anterior (←)">
              <ChevronLeft size={28} />
            </button>

            {/* Imagen Ampliada con Efecto de Entrada y Suavizado */}
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
              <img
                key={transitionKey}
                src={activePhoto.image}
                alt={activePhoto.title}
                className="lightbox-img-view"
                style={{
                  animation: 'lightboxImgPop 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>

            {/* Flecha Siguiente */}
            <button className="lightbox-nav-btn lightbox-next" onClick={handleNext} title="Siguiente foto (→)">
              <ChevronRight size={28} />
            </button>

            {/* Pie de foto */}
            <div className="lightbox-caption">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff' }}>
                {activePhoto.title}
              </h2>
              <p style={{ color: '#f43f5e', fontSize: '0.9rem', marginBottom: '6px' }}>
                {activePhoto.date} • {activePhoto.category}
              </p>
              <p style={{ color: '#e5e5e5', fontSize: '1rem', lineHeight: 1.5 }}>
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
