import React from 'react';
import { Film, Play, Sparkles, Check, Plus } from 'lucide-react';
import { soundEffects } from '../utils/audioEffects';

export default function Videos({ onPlayVideo, onOpenModal, isInMyList, onToggleMyList, onPlayMovie }) {
  // 7 videos reales con miniaturas de fotos reales
  const realVideos = [
    {
      id: "vid-real-1",
      title: "Video 1: Momento Inolvidable",
      category: "Videos",
      duration: "Especial",
      year: "2026",
      match: "100%",
      image: "/images/recuerdos_reales/recuerdo_1.jpg",
      video: "/videos/video_1.mp4",
      musicIndex: 0,
      description: "Uno de nuestros recuerdos más hermosos en movimiento.",
      tags: ["Video Real", "Amor", "Recuerdos"]
    },
    {
      id: "vid-real-2",
      title: "Video 2: Risas Juntos",
      category: "Videos",
      duration: "Especial",
      year: "2026",
      match: "100%",
      image: "/images/recuerdos_reales/recuerdo_2.jpg",
      video: "/videos/video_2.mp4",
      musicIndex: 1,
      description: "Tu sonrisa y la alegría que siempre compartimos.",
      tags: ["Video Real", "Risas", "Complicidad"]
    },
    {
      id: "vid-real-3",
      title: "Video 3: Tarde Mágica",
      category: "Videos",
      duration: "Especial",
      year: "2026",
      match: "99%",
      image: "/images/recuerdos_reales/recuerdo_3.jpg",
      video: "/videos/video_3.mp4",
      musicIndex: 2,
      description: "Un instante grabado que vale más que mil palabras.",
      tags: ["Video Real", "Magia", "Aventuras"]
    },
    {
      id: "vid-real-4",
      title: "Video 4: Dulce Compañía",
      category: "Videos",
      duration: "Especial",
      year: "2026",
      match: "100%",
      image: "/images/recuerdos_reales/recuerdo_4.jpg",
      video: "/videos/video_4.mp4",
      musicIndex: 3,
      description: "Estar a tu lado y registrar nuestra complicidad.",
      tags: ["Video Real", "Ternura", "Juntos"]
    },
    {
      id: "vid-real-5",
      title: "Video 5: Nuestra Historia en Movimiento",
      category: "Videos",
      duration: "Especial",
      year: "2026",
      match: "100%",
      image: "/images/recuerdos_reales/recuerdo_5.jpg",
      video: "/videos/video_5.mp4",
      musicIndex: 4,
      description: "Recorriendo caminos y construyendo memorias.",
      tags: ["Video Real", "Nuestra Historia"]
    },
    {
      id: "vid-real-6",
      title: "Video 6: Miradas y Gestos",
      category: "Videos",
      duration: "Especial",
      year: "2026",
      match: "100%",
      image: "/images/recuerdos_reales/recuerdo_6.jpg",
      video: "/videos/video_6.mp4",
      musicIndex: 0,
      description: "Ese brillo único en tus ojos que me vuelve loco.",
      tags: ["Video Real", "Miradas", "Amor"]
    },
    {
      id: "vid-real-7",
      title: "Video 7: Para Toda la Vida",
      category: "Videos",
      duration: "Especial",
      year: "2026",
      match: "100%",
      image: "/images/recuerdos_reales/recuerdo_7.jpg",
      video: "/videos/video_7.mp4",
      musicIndex: 1,
      description: "Un resumen de lo afortunado que soy de tenerte.",
      tags: ["Video Real", "Eternidad", "Cumpleaños"]
    },
    {
      id: "vid-real-8",
      title: "Video 8: Nuestro Momento Más Lindo",
      category: "Videos",
      duration: "Especial",
      year: "2026",
      match: "100%",
      image: "/images/recuerdos_reales/recuerdo_34.jpg",
      video: "/videos/video_8.mp4",
      musicIndex: 3,
      description: "¡Qué guapa estás, mi amorcito! Nuestro momento más fresco y especial juntos.",
      tags: ["Video Nuevo", "Amorcito", "Recuerdos"]
    }
  ];

  return (
    <div className="photos-page-container">
      <div className="page-header-banner">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ff2e63', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
          <Film size={16} /> Colección Audiovisual Continua
        </div>
        <h1 className="page-header-title">🎥 8 Videos de Nuestra Historia</h1>
        <p style={{ color: '#a3a3a3', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Reproducción continua sin interrupciones. Cuando un video termina, avanza automáticamente al siguiente.
        </p>

        {/* Botones de Maratón y Película Completa */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className="btn-play-hero"
            onClick={onPlayMovie}
            style={{ background: '#E50914', color: '#fff' }}
          >
            <Film size={20} fill="#fff" />
            <span>Ver Película Completa (Fotos + Videos)</span>
          </button>

          <button
            className="btn-play-hero"
            onClick={() => onPlayVideo(realVideos[0], realVideos)}
            style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fff' }}
          >
            <Play size={18} fill="#fff" />
            <span>Iniciar Maratón de Videos (1 al 7)</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.8rem' }}>
        {realVideos.map((item, idx) => {
          const isSaved = isInMyList(item.id);

          return (
            <div
              key={item.id}
              style={{
                background: '#18181b',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(229,9,20,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
              onClick={() => {
                soundEffects.playPop();
                onPlayVideo(item, realVideos);
              }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'rgba(229, 9, 20, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      boxShadow: '0 4px 15px rgba(229,9,20,0.5)'
                    }}
                  >
                    <Play size={24} fill="currentColor" style={{ marginLeft: '3px' }} />
                  </div>
                </div>
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}
                >
                  HD 1080p
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(229, 9, 20, 0.85)',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}
                >
                  Video {idx + 1} de 7
                </span>
              </div>

              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ color: '#46d369', fontWeight: 800, fontSize: '0.82rem' }}>Flujo continuo</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEffects.playPop();
                      onToggleMyList(item);
                    }}
                    style={{
                      color: isSaved ? '#46d369' : '#fff',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title={isSaved ? "Quitar de Mi Lista" : "Agregar a Mi Lista"}
                  >
                    {isSaved ? <Check size={16} /> : <Plus size={16} />}
                  </button>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#fff', marginBottom: '4px' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#a3a3a3', fontSize: '0.88rem', lineHeight: 1.4 }}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
