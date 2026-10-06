import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { soundEffects } from '../utils/audioEffects';

export default function ContentRow({ row, onPlayVideo, onOpenModal, isInMyList, onToggleMyList }) {
  const rowTrackRef = useRef(null);

  const scroll = (direction) => {
    soundEffects.playPop();
    if (rowTrackRef.current) {
      const scrollAmount = direction === 'left' ? -650 : 650;
      rowTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="content-row-container">
      <div className="content-row-header">
        <div>
          <h2 className="content-row-title">{row.title}</h2>
          {row.description && (
            <p className="content-row-desc">{row.description}</p>
          )}
        </div>
      </div>

      <div className="row-slider-wrapper">
        {/* Flecha Izquierda */}
        <button
          className="slider-arrow-btn slider-arrow-left"
          onClick={() => scroll('left')}
          aria-label="Desplazar a la izquierda"
        >
          <ChevronLeft size={30} />
        </button>

        {/* Pista de tarjetas */}
        <div className="row-scroll-track" ref={rowTrackRef}>
          {row.items.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              onPlayVideo={onPlayVideo}
              onOpenModal={onOpenModal}
              isInMyList={isInMyList}
              onToggleMyList={onToggleMyList}
            />
          ))}
        </div>

        {/* Flecha Derecha */}
        <button
          className="slider-arrow-btn slider-arrow-right"
          onClick={() => scroll('right')}
          aria-label="Desplazar a la derecha"
        >
          <ChevronRight size={30} />
        </button>
      </div>
    </section>
  );
}
