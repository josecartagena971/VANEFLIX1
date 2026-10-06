import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { contentRows } from '../data/content';
import MovieCard from '../components/MovieCard';

export default function Favorites({ onPlayVideo, onOpenModal, isInMyList, onToggleMyList }) {
  const favoritesRow = contentRows.find((r) => r.id === 'row-favorites') || { items: [] };
  const specialRow = contentRows.find((r) => r.id === 'row-special') || { items: [] };

  return (
    <div className="photos-page-container">
      <div className="page-header-banner">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ff2e63', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
          <Sparkles size={16} /> Lo Más Especial
        </div>
        <h1 className="page-header-title">💕 Momentos Favoritos</h1>
        <p style={{ color: '#a3a3a3', fontSize: '1.1rem' }}>
          Aquellos instantes cotidianos y mágicos que hacen que amarte sea lo mejor de mi vida.
        </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={22} color="#ff2e63" fill="#ff2e63" /> Momentos Dorados
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {favoritesRow.items.map((item) => (
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
      </div>

      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ✨ Porque Eres Única
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {specialRow.items.map((item) => (
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
      </div>
    </div>
  );
}
