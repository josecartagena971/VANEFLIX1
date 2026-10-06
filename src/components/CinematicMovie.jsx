import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, X, Volume2, VolumeX, Maximize, Music, Heart } from 'lucide-react';
import { movieScenes } from '../data/movieTimeline';
import { musicPlaylist } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function CinematicMovie({ onClose }) {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [sceneFlash, setSceneFlash] = useState(false);
  const [videoElapsed, setVideoElapsed] = useState(0);
  const [isTrimMode, setIsTrimMode] = useState(true);

  // Música de fondo continua con Crossfade suave (sin cambios bruscos)
  const [activeSlot, setActiveSlot] = useState('A');
  const [slotASong, setSlotASong] = useState(musicPlaylist[0]); // Happy Together desde el inicio
  const [slotBSong, setSlotBSong] = useState(musicPlaylist[1]);
  const [currentMusicSong, setCurrentMusicSong] = useState(musicPlaylist[0]);
  const [songToast, setSongToast] = useState(null);

  const videoRef = useRef(null);
  const audioRefA = useRef(null);
  const audioRefB = useRef(null);
  const crossfadeIntervalRef = useRef(null);
  const isCrossfadingRef = useRef(false);
  const toastTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const currentScene = movieScenes[currentSceneIdx] || movieScenes[0];
  const isVideo = currentScene.type === 'video';

  const triggerMusicToast = (song) => {
    setSongToast(song);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setSongToast(null);
    }, 4200);
  };

  // Función de transición suave (Crossfade de 2.2 segundos sin cortes bruscos)
  const crossfadeToSong = (targetSong, startOffset = null) => {
    if (!targetSong) return;
    if (currentMusicSong.id === targetSong.id && !isCrossfadingRef.current) return;

    if (crossfadeIntervalRef.current) {
      clearInterval(crossfadeIntervalRef.current);
    }
    isCrossfadingRef.current = true;

    const fromSlot = activeSlot;
    const toSlot = fromSlot === 'A' ? 'B' : 'A';
    const outgoing = fromSlot === 'A' ? audioRefA.current : audioRefB.current;
    const incoming = toSlot === 'A' ? audioRefA.current : audioRefB.current;

    if (toSlot === 'A') {
      setSlotASong(targetSong);
    } else {
      setSlotBSong(targetSong);
    }

    setCurrentMusicSong(targetSong);
    triggerMusicToast(targetSong);

    const maxVol = isMuted ? 0 : volume;

    if (incoming) {
      incoming.src = targetSong.src;
      const targetTime = startOffset !== null
        ? startOffset
        : (targetSong.movieStartTime !== undefined ? targetSong.movieStartTime : (targetSong.startTime || 0));
      incoming.currentTime = targetTime;
      incoming.volume = 0;
      if (isPlaying) {
        incoming.play().catch(() => {});
      }
    }

    // Duración de la transición: 2200ms
    const durationMs = 2200;
    const stepMs = 50;
    const totalSteps = durationMs / stepMs;
    let step = 0;
    const initialOutVol = outgoing ? outgoing.volume : maxVol;

    crossfadeIntervalRef.current = setInterval(() => {
      step++;
      const progress = Math.min(1, step / totalSteps);

      if (outgoing) {
        outgoing.volume = Math.max(0, initialOutVol * (1 - progress));
      }
      if (incoming && !isMuted) {
        incoming.volume = Math.min(maxVol, maxVol * progress);
      }

      if (progress >= 1) {
        clearInterval(crossfadeIntervalRef.current);
        crossfadeIntervalRef.current = null;
        isCrossfadingRef.current = false;

        if (outgoing) {
          outgoing.pause();
          outgoing.volume = 0;
        }
        if (incoming && !isMuted) {
          incoming.volume = maxVol;
        }
        setActiveSlot(toSlot);
      }
    }, stepMs);
  };

  // Inicializar al abrir la película: comienza con Happy Together desde 0:00 (suave y sin cortes)
  useEffect(() => {
    if (audioRefA.current) {
      audioRefA.current.currentTime = 0;
      audioRefA.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        audioRefA.current.play().catch(() => {});
      }
    }
  }, []);

  // Transición suave y espaciada entre los actos de la película (sin cambios rápidos ni bruscos)
  useEffect(() => {
    if (!currentScene) return;

    // Acto 1: Intro, Capítulo 1 y Capítulo 2 -> "Happy Together" (The Turtles) desde 0:00
    // Acto 2: Capítulo 3 -> Transición suave con crossfade a "Photograph" (Ed Sheeran)
    // Acto 3: Capítulo 5 -> Transición suave con crossfade a "Just The Way You Are" (Bruno Mars)
    // Acto 4: Capítulo 7 y Outro -> Transición suave con crossfade a "I Get To Love You" (Nuestra Canción ❤️)
    if (currentScene.id === 'intro-1' || currentScene.id === 'chap-1') {
      crossfadeToSong(musicPlaylist[0], 0);
    } else if (currentScene.id === 'chap-3') {
      const songPhoto = musicPlaylist.find(s => s.id === 'song-2') || musicPlaylist[2];
      crossfadeToSong(songPhoto, 65);
    } else if (currentScene.id === 'chap-5') {
      const songBruno = musicPlaylist.find(s => s.id === 'song-3') || musicPlaylist[3];
      crossfadeToSong(songBruno, 48);
    } else if (currentScene.id === 'chap-7') {
      const ourSong = musicPlaylist.find(s => s.isOurSong) || musicPlaylist[1];
      crossfadeToSong(ourSong, 45);
    }
  }, [currentSceneIdx]);

  // Manejo de sincronización de Play / Pausa y Volumen para ambos slots de audio
  useEffect(() => {
    const curA = audioRefA.current;
    const curB = audioRefB.current;
    const maxVol = isMuted ? 0 : volume;

    if (!isCrossfadingRef.current) {
      if (curA) curA.volume = activeSlot === 'A' ? maxVol : 0;
      if (curB) curB.volume = activeSlot === 'B' ? maxVol : 0;
    }

    if (isPlaying) {
      if (activeSlot === 'A' && curA) curA.play().catch(() => {});
      if (activeSlot === 'B' && curB) curB.play().catch(() => {});
    } else {
      if (curA) curA.pause();
      if (curB) curB.pause();
    }
  }, [isPlaying, volume, isMuted, activeSlot]);

  // Limpiar transiciones al cerrar
  useEffect(() => {
    return () => {
      if (crossfadeIntervalRef.current) clearInterval(crossfadeIntervalRef.current);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      if (audioRefA.current) audioRefA.current.pause();
      if (audioRefB.current) audioRefB.current.pause();
    };
  }, []);

  const handleNextMusic = (e) => {
    e?.stopPropagation();
    soundEffects.playPop();
    const currentIdx = musicPlaylist.findIndex(s => s.id === currentMusicSong.id);
    const nextIdx = (currentIdx + 1) % musicPlaylist.length;
    crossfadeToSong(musicPlaylist[nextIdx]);
  };

  // Auto-hide controles tras inactividad
  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3500);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  // Manejo de teclas
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
      if (e.key === 'ArrowRight') nextScene();
      if (e.key === 'ArrowLeft') prevScene();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSceneIdx]);

  // Reset al cambiar de escena
  useEffect(() => {
    setVideoElapsed(0);
    if (videoRef.current) {
      videoRef.current.currentTime = currentScene.startTime || 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [currentSceneIdx]);

  // Transición automática para escenas de Fotos, Intro y Capítulos
  useEffect(() => {
    if (!isPlaying) return;

    if (!isVideo) {
      const durationSeconds = currentScene.duration || 4.5;
      const stepMs = 100;
      let elapsed = 0;

      timerRef.current = setInterval(() => {
        elapsed += stepMs / 1000;
        setSceneProgress((elapsed / durationSeconds) * 100);

        if (elapsed >= durationSeconds) {
          clearInterval(timerRef.current);
          nextScene();
        }
      }, stepMs);

      return () => clearInterval(timerRef.current);
    } else {
      setSceneProgress(0);
    }
  }, [currentSceneIdx, isPlaying, isVideo]);

  const triggerSceneFlash = () => {
    setSceneFlash(true);
    setTimeout(() => setSceneFlash(false), 380);
  };

  const nextScene = () => {
    soundEffects.playPop();
    triggerSceneFlash();
    if (currentSceneIdx < movieScenes.length - 1) {
      setCurrentSceneIdx((prev) => prev + 1);
      setSceneProgress(0);
      setVideoElapsed(0);
    } else {
      setIsPlaying(false);
    }
  };

  const prevScene = () => {
    soundEffects.playPop();
    triggerSceneFlash();
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx((prev) => prev - 1);
      setSceneProgress(0);
      setVideoElapsed(0);
    }
  };

  // Manejo de recorte automático de videos largos
  const handleVideoTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const start = currentScene.startTime || 0;
    const elapsed = Math.max(0, current - start);
    const maxDur = currentScene.maxDuration || 7;
    setVideoElapsed(elapsed);

    // Si está activo el modo recorte (para que no se hagan largos los videos)
    if (isTrimMode && isVideo && elapsed >= maxDur) {
      nextScene();
    }
  };

  const handleVideoEnded = () => {
    nextScene();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="cinematic-movie-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* DESTELLO DE LUZ ENTRE CAMBIO DE FOTOS / ESCENAS */}
      {sceneFlash && <div className="scene-flash-overlay" />}

      {/* SISTEMA DE AUDIO DUAL CON CROSSFADE SUAVE ENTRE CANCIONES */}
      <audio
        ref={audioRefA}
        src={slotASong.src}
        onEnded={handleNextMusic}
      />
      <audio
        ref={audioRefB}
        src={slotBSong.src}
        onEnded={handleNextMusic}
      />

      {/* NOTIFICACIÓN FLOTANTE CUANDO CAMBIA DE CANCIÓN */}
      {songToast && (
        <div
          style={{
            position: 'absolute',
            top: '82px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 90,
            background: 'rgba(15, 15, 15, 0.92)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 46, 99, 0.65)',
            borderRadius: '30px',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#fff',
            boxShadow: '0 10px 35px rgba(0,0,0,0.7)',
            animation: 'slideDownFade 0.35s ease',
            pointerEvents: 'none'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>🎵</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>
            {songToast.title} <span style={{ color: '#fda4af', fontWeight: 400 }}>• {songToast.artist}</span>
          </span>
          <span style={{ fontSize: '0.78rem', background: '#ff2e63', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
            Transición suave ❤️
          </span>
        </div>
      )}

      {/* 1. ESCENAS DE TIPO INTRO / CAPÍTULO / OUTRO */}
      {(currentScene.type === 'intro' || currentScene.type === 'chapter' || currentScene.type === 'outro') && (
        <div
          key={currentScene.id}
          style={{
            textAlign: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.8s ease',
            maxWidth: '850px'
          }}
        >
          <div style={{ color: '#E50914', fontSize: '1.2rem', fontWeight: 900, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
            {currentScene.title}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.6rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.15, marginBottom: '1.2rem' }}>
            {currentScene.subtitle}
          </h1>
          <p style={{ fontFamily: 'var(--font-romantic)', fontSize: '1.6rem', color: '#fda4af', fontStyle: 'italic' }}>
            "{currentScene.caption}"
          </p>
        </div>
      )}

      {/* 2. ESCENAS DE TIPO FOTO CON EFECTOS DINÁMICOS VARIADOS */}
      {currentScene.type === 'photo' && (
        <div key={currentScene.id} className="movie-photo-container">
          {/* Fondo atmósfera difuminado */}
          <img
            src={currentScene.image}
            alt="Atmósfera"
            className="photo-ambient-backdrop"
          />

          {/* Marco con animación seleccionada (zoom, paneo, polaroid, etc.) */}
          <div className={`movie-photo-frame effect-${currentScene.effect || 'zoom-in'}`}>
            <img
              src={currentScene.image}
              alt="Recuerdo real"
              className="movie-photo-img"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            {/* Efectos overlay específicos */}
            {currentScene.effect === 'sparkle-flare' && <div className="sparkle-beam-overlay" />}
            {currentScene.effect === 'heart-vignette' && <div className="heart-vignette-overlay" />}
          </div>

          {/* Frase / Subtítulo */}
          <div className="movie-caption-container">
            <p className="movie-caption-bubble">
              {currentScene.caption}
            </p>
          </div>
        </div>
      )}

      {/* 3. ESCENAS DE TIPO VIDEO (RECORTADO PARA FLUJO RÁPIDO + MÚSICA CONTINUA) */}
      {currentScene.type === 'video' && (
        <div
          key={currentScene.id}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000000'
          }}
        >
          <video
            ref={videoRef}
            src={currentScene.video}
            autoPlay
            playsInline
            muted={true}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={handleVideoEnded}
            onError={() => {
              setTimeout(nextScene, 1200);
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '5%',
              right: '5%',
              textAlign: 'center',
              zIndex: 10,
              pointerEvents: 'none'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: '#ffffff',
                fontWeight: 600,
                background: 'rgba(0, 0, 0, 0.65)',
                display: 'inline-block',
                padding: '6px 20px',
                borderRadius: '25px',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              {currentScene.caption}
            </p>
          </div>
        </div>
      )}


      {/* BARRA SUPERIOR */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '20px 32px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, transparent 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 50,
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#E50914', fontWeight: 900, fontFamily: 'var(--font-cinema)', fontSize: '1.6rem', letterSpacing: '1px' }}>
            VANEFLIX
          </span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
          <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>
            Nuestra Historia de Amor (Película Completa)
          </span>
        </div>

        {/* Indicador de Canción actual */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleNextMusic}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 46, 99, 0.25)',
              border: '1px solid rgba(255, 46, 99, 0.5)',
              padding: '6px 14px',
              borderRadius: '20px',
              color: '#fda4af',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Cambiar de canción con transición suave (crossfade)"
          >
            <Music size={14} />
            <span>{currentMusicSong.title} • {currentMusicSong.artist} • Siguiente ⏭</span>
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#fff',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}
            title="Salir de la película"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* CONTROLES INFERIORES */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px 36px',
          background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, transparent 100%)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              flex: 1,
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: isVideo
                  ? `${isTrimMode ? Math.min(100, (videoElapsed / (currentScene.maxDuration || 7)) * 100) : (videoRef.current?.duration ? (videoRef.current.currentTime / videoRef.current.duration) * 100 : 0)}%`
                  : `${sceneProgress}%`,
                height: '100%',
                backgroundColor: '#E50914',
                transition: 'width 0.1s linear'
              }}
            />
          </div>
          <span style={{ color: '#a3a3a3', fontSize: '0.8rem', minWidth: '85px', textAlign: 'right' }}>
            Escena {currentSceneIdx + 1} de {movieScenes.length}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={prevScene}
              disabled={currentSceneIdx === 0}
              style={{ color: currentSceneIdx === 0 ? '#555' : '#fff', padding: '6px' }}
              title="Escena anterior"
            >
              <SkipBack size={22} />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: '#ffffff',
                color: '#000000',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={isPlaying ? "Pausar" : "Reanudar"}
            >
              {isPlaying ? <Pause size={20} fill="#000" /> : <Play size={20} fill="#000" style={{ marginLeft: '2px' }} />}
            </button>

            <button
              onClick={nextScene}
              disabled={currentSceneIdx === movieScenes.length - 1}
              style={{ color: currentSceneIdx === movieScenes.length - 1 ? '#555' : '#fff', padding: '6px' }}
              title="Siguiente escena"
            >
              <SkipForward size={22} />
            </button>

            <span style={{ color: '#fda4af', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Heart size={14} fill="#fda4af" />
              {isVideo ? 'Momento Especial' : 'Nuestra Historia'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{ color: '#fff', padding: '6px' }}
              title={isMuted ? "Activar música" : "Silenciar"}
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>

            <button
              onClick={toggleFullscreen}
              style={{ color: '#fff', padding: '6px' }}
              title="Pantalla completa"
            >
              <Maximize size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
