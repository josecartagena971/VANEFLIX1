import React from 'react';
import { Play, Plus, Check, Info, Sparkles, Film } from 'lucide-react';
import { heroContent } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function Hero({ onPlayVideo, onOpenModal, isInMyList, onToggleMyList, onPlayMovie }) {
  const isSaved = isInMyList(heroContent.id);

  const handlePlay = () => {
    soundEffects.playPop();
    onPlayVideo(heroContent);
  };

  const handleInfo = () => {
    soundEffects.playPop();
    onOpenModal(heroContent);
  };

  const handleListToggle = () => {
    soundEffects.playPop();
    onToggleMyList(heroContent);
  };

  return (
    <header className="hero-wrapper">
      {/* Imagen de fondo / backdrop */}
      <img
        src={heroContent.image}
        alt={heroContent.title}
        className="hero-background-media"
        onError={(e) => {
          e.target.src = '/images/recuerdos_reales/recuerdo_1.jpg';
        }}
      />

      {/* Degradados cinemáticos tipo Netflix */}
      <div className="hero-overlay-gradient" />
      <div className="hero-bottom-fade" />

      {/* Contenido principal del Hero */}
      <div className="hero-content">
        <div className="hero-badge-tag">
          <Sparkles size={14} />
          {heroContent.subtitle}
        </div>

        <h1 className="hero-title">{heroContent.title}</h1>

        <div className="hero-meta-row">
          <span className="match-badge">{heroContent.matchScore}</span>
          <span className="rating-badge">{heroContent.rating}</span>
          <span className="quality-badge">{heroContent.quality}</span>
          <span style={{ color: '#fda4af' }}>34 Fotos • 8 Videos Reales</span>
        </div>

        <p className="hero-description">{heroContent.description}</p>

        <div className="hero-actions-group">
          {/* Botón Ver Película Completa Continua */}
          <button
            className="btn-play-hero"
            onClick={onPlayMovie}
            id="hero-movie-button"
            style={{ background: '#E50914', color: '#fff' }}
          >
            <Film size={22} fill="currentColor" />
            <span>Ver Película Completa (Fotos + Videos)</span>
          </button>

          {/* Botón Reproducir Video Individual */}
          <button
            className="btn-play-hero"
            onClick={handlePlay}
            id="hero-play-button"
            style={{ background: 'rgba(255, 255, 255, 0.95)', color: '#000' }}
          >
            <Play size={20} fill="currentColor" />
            <span>Maratón de Videos</span>
          </button>

          {/* Botón Mi Lista */}
          <button
            className="btn-mylist-hero"
            onClick={handleListToggle}
            id="hero-mylist-button"
            title={isSaved ? "Quitar de Mi Lista" : "Agregar a Mi Lista"}
          >
            {isSaved ? <Check size={20} color="#46d369" /> : <Plus size={20} />}
            <span>{isSaved ? 'En mi lista' : 'Mi lista'}</span>
          </button>

          {/* Botón Más Información */}
          <button
            className="btn-info-hero"
            onClick={handleInfo}
            id="hero-info-button"
          >
            <Info size={20} />
            <span>Más info</span>
          </button>
        </div>
      </div>
    </header>
  );
}
