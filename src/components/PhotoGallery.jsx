import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Heart, ZoomIn, Calendar } from 'lucide-react';
import { galleryPhotos } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [transitionKey, setTransitionKey] = useState(0);

  const categories = ['Todos', 'Primeras Citas', 'Viajes', 'Risas', 'Especiales'];

  const filteredPhotos = selectedCategory === 'Todos'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === selectedCategory);

  const handleOpenPhoto = (index) => {
    soundEffects.playPop();
    setTransitionKey(prev => prev + 1);
    setActivePhotoIndex(index);
  };

  const handleClose = () => {
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

  // Navegación con teclado en el visor de fotos
  React.useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length]);

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <div className="photos-page-container">
      <div className="page-header-banner">
        <h1 className="page-header-title">📸 Nuestros Recuerdos</h1>
        <p style={{ color: '#a3a3a3', fontSize: '1.1rem' }}>
          Una galería de instantes inolvidables. Cada foto guarda un pedacito de nuestra historia, mi niña bonita.
        </p>
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
            {/* Botón Cerrar y Contador */}
            <div style={{ position: 'absolute', top: '-42px', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#fda4af', fontSize: '0.88rem', fontWeight: 600, background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '14px' }}>
                Foto {activePhotoIndex + 1} de {filteredPhotos.length}
              </span>
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
