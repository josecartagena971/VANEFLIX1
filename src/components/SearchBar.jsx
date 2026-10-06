import React, { useState } from 'react';
import { Search as SearchIcon, X, Film, Camera, Mail, Heart } from 'lucide-react';
import { contentRows, galleryPhotos, loveLetters, tenReasons } from '../data/content';
import MovieCard from './MovieCard';

export default function SearchBar({ onPlayVideo, onOpenModal, isInMyList, onToggleMyList, onSelectLetter }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Aplanar todos los contenidos indexables
  const allRowItems = contentRows.flatMap((r) => r.items);

  const filteredMovies = allRowItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const filteredLetters = loveLetters.filter((letter) =>
    letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPhotos = galleryPhotos.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalResults = filteredMovies.length + filteredLetters.length + filteredPhotos.length;

  return (
    <div className="search-view-container">
      <div className="search-input-header">
        <SearchIcon className="search-icon-inside" size={22} />
        <input
          type="text"
          className="search-input-field"
          placeholder="Busca por 'recuerdos', 'sonrisa', 'viajes', 'cartas'..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#fff' }}
          >
            <X size={20} />
          </button>
        )}
      </div>

      {searchTerm.trim() ? (
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
            Resultados para: <span style={{ color: '#E50914' }}>"{searchTerm}"</span> ({totalResults})
          </h2>

          {totalResults === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#a3a3a3' }}>
              <Heart size={48} color="#f43f5e" style={{ margin: '0 auto 1rem auto' }} />
              <h3>No encontramos recuerdos con esa palabra exacta</h3>
              <p style={{ marginTop: '6px' }}>
                Prueba buscando "sonrisa", "viajes", "cumpleaños" o "carta".
              </p>
            </div>
          ) : (
            <>
              {/* Recuerdos y películas */}
              {filteredMovies.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#fda4af', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Film size={18} /> Recuerdos y Especiales ({filteredMovies.length})
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.2rem' }}>
                    {filteredMovies.map((item) => (
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
              )}

              {/* Cartas */}
              {filteredLetters.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#fda4af', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={18} /> Cartas de Amor ({filteredLetters.length})
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
                    {filteredLetters.map((l) => (
                      <div
                        key={l.id}
                        className="letter-card-envelope"
                        style={{ minHeight: 'auto' }}
                        onClick={() => onSelectLetter && onSelectLetter(l)}
                      >
                        <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>{l.title}</h4>
                        <p style={{ color: '#a3a3a3', fontSize: '0.85rem', margin: '8px 0' }}>{l.preview}</p>
                        <span style={{ color: '#ff2e63', fontSize: '0.8rem' }}>Leer carta</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fotos */}
              {filteredPhotos.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#fda4af', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Camera size={18} /> Fotos ({filteredPhotos.length})
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {filteredPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        style={{ background: '#1c1c1f', borderRadius: '8px', overflow: 'hidden' }}
                      >
                        <img
                          src={photo.image}
                          alt={photo.title}
                          style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '8px 12px' }}>
                          <h5 style={{ color: '#fff' }}>{photo.title}</h5>
                          <span style={{ fontSize: '0.75rem', color: '#888' }}>{photo.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#737373' }}>
          <p>Escribe cualquier palabra para buscar entre nuestros recuerdos, fotos y cartas.</p>
        </div>
      )}
    </div>
  );
}
