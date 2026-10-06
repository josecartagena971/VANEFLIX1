import React from 'react';
import { Bookmark, Heart, Trash2, Play } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { soundEffects } from '../utils/audioEffects';

export default function MyList({ myList, onPlayVideo, onOpenModal, isInMyList, onToggleMyList, onGoHome }) {
  return (
    <div className="photos-page-container">
      <div className="page-header-banner">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#46d369', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
          <Bookmark size={16} /> Tu Selección Personal
        </div>
        <h1 className="page-header-title">➕ Mi Lista</h1>
        <p style={{ color: '#a3a3a3', fontSize: '1.1rem' }}>
          Los recuerdos, capítulos y momentos especiales que has guardado para ver una y otra vez.
        </p>
      </div>

      {myList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 1rem', background: '#18181b', borderRadius: '16px', maxWidth: '650px', margin: '0 auto', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <Heart size={54} color="#ff2e63" style={{ margin: '0 auto 1.2rem auto' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
            Aún no has agregado recuerdos a tu lista
          </h2>
          <p style={{ color: '#a3a3a3', marginBottom: '2rem', maxWidth: '450px', margin: '0 auto 2rem auto' }}>
            Navega por VANEFLIX y haz clic en el botón <strong>"+"</strong> de cualquier tarjeta para guardarla aquí.
          </p>
          <button
            className="btn-play-hero"
            onClick={onGoHome}
            style={{ background: '#E50914', color: '#fff' }}
          >
            Explorar Recuerdos
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {myList.map((item) => (
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
      )}
    </div>
  );
}
