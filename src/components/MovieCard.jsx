import React, { useState } from 'react';
import { Play, Plus, Check, Heart, ChevronDown } from 'lucide-react';
import { soundEffects } from '../utils/audioEffects';

export default function MovieCard({ item, onPlayVideo, onOpenModal, isInMyList, onToggleMyList }) {
  const [isLiked, setIsLiked] = useState(false);
  const isSaved = isInMyList(item.id);

  const handlePlay = (e) => {
    e.stopPropagation();
    soundEffects.playPop();
    onPlayVideo(item);
  };

  const handleToggleList = (e) => {
    e.stopPropagation();
    soundEffects.playPop();
    onToggleMyList(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    soundEffects.playPop();
    setIsLiked(!isLiked);
  };

  const handleOpenDetails = (e) => {
    e.stopPropagation();
    soundEffects.playPop();
    onOpenModal(item);
  };

  return (
    <div
      className="movie-card"
      onClick={handlePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handlePlay(e)}
    >
      <div className="movie-card-thumb-wrap">
        <img
          src={item.image}
          alt={item.title}
          className="movie-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <span className={`movie-card-top-tag badge-${item.introType || 'default'}`}>
          {item.categoryBadge || item.category}
        </span>
      </div>

      {/* Panel expandido al hacer hover (Estilo Netflix) */}
      <div className="movie-card-hover-panel">
        <div className="card-actions-row">
          <div className="card-actions-left">
            {/* Reproducir */}
            <button
              className="card-circle-btn btn-play-quick"
              onClick={handlePlay}
              title="Reproducir ahora"
            >
              <Play size={15} fill="currentColor" />
            </button>

            {/* Agregar/Quitar de mi lista */}
            <button
              className="card-circle-btn"
              onClick={handleToggleList}
              title={isSaved ? "Quitar de Mi Lista" : "Agregar a Mi Lista"}
            >
              {isSaved ? <Check size={15} color="#46d369" /> : <Plus size={15} />}
            </button>

            {/* Me encanta (Corazón) */}
            <button
              className="card-circle-btn"
              onClick={handleLike}
              title={isLiked ? "Te encanta este recuerdo" : "Marcar con amor"}
              style={{ color: isLiked ? '#ff2e63' : '#fff' }}
            >
              <Heart size={15} fill={isLiked ? '#ff2e63' : 'none'} />
            </button>
          </div>

          {/* Más información */}
          <button
            className="card-circle-btn"
            onClick={handleOpenDetails}
            title="Más información"
          >
            <ChevronDown size={17} />
          </button>
        </div>

        <div className="card-meta-line">
          <span className="card-match-score">{item.match || '100%'}</span>
          <span className="card-duration-text">{item.duration || 'Recuerdo'}</span>
          <span style={{ fontSize: '0.72rem', color: '#999' }}>{item.year || '2026'}</span>
        </div>

        <div className="card-title-hover">{item.title}</div>

        {item.tags && item.tags.length > 0 && (
          <div className="card-tags-pills">
            {item.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="card-tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
