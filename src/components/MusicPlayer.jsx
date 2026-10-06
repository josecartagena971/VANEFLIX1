import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { musicPlaylist } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function MusicPlayer({ isPlaying, onTogglePlay }) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);

  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);

  // Canción principal exclusiva de la plataforma: Happy Together (The Turtles)
  const mainSong = musicPlaylist[0];

  // Inicia directamente cantando ("Imagine me and you, I do..."), quitando el silencio e intro instrumental
  const VOCAL_START_TIME = mainSong?.startTime || 4.6;

  // Intento de reproducción de audio respetando las políticas del navegador
  const attemptPlay = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
    if (audioRef.current.currentTime < VOCAL_START_TIME - 0.5) {
      try {
        audioRef.current.currentTime = VOCAL_START_TIME;
      } catch (e) {}
    }

    const promise = audioRef.current.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          setIsAutoplayBlocked(false);
        })
        .catch((error) => {
          // Si el navegador bloqueó el autoplay por política de seguridad (NotAllowedError)
          if (error.name === 'NotAllowedError') {
            setIsAutoplayBlocked(true);
          }
        });
    }
  };

  // Ajustar el tiempo para que inicie cantando de inmediato al cargar metadata
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = VOCAL_START_TIME;
      } catch (e) {}
      if (isPlaying) {
        attemptPlay();
      }
    }
  };

  const handleCanPlay = () => {
    if (audioRef.current && audioRef.current.currentTime < VOCAL_START_TIME - 0.5) {
      try {
        audioRef.current.currentTime = VOCAL_START_TIME;
      } catch (e) {}
    }
    if (isPlaying) {
      attemptPlay();
    }
  };

  // Sincronizar reproducción y volumen de la canción principal
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        attemptPlay();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, isMuted, VOCAL_START_TIME]);

  // Escuchadores globales: cualquier primer clic, toque, tecla o scroll en cualquier parte de la pantalla desbloquea el audio de inmediato
  useEffect(() => {
    if (!isPlaying) return;

    const handleUnlockAudio = () => {
      if (audioRef.current && isPlaying) {
        attemptPlay();
      }
    };

    const events = ['pointerdown', 'mousedown', 'touchstart', 'click', 'keydown', 'scroll', 'wheel'];
    events.forEach((evt) => {
      window.addEventListener(evt, handleUnlockAudio, { passive: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleUnlockAudio);
      });
    };
  }, [isPlaying, volume, isMuted]);

  // Al terminar la canción, reinicia suavemente directo al inicio del canto
  const handleSongEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = VOCAL_START_TIME;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // Reiniciar manualmente la canción directo al canto
  const handleRestartSong = (e) => {
    e?.stopPropagation();
    soundEffects.playPop();
    if (audioRef.current) {
      audioRef.current.currentTime = VOCAL_START_TIME;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Aviso interactivo si el navegador bloqueó la música al recargar la página */}
      {isAutoplayBlocked && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            attemptPlay();
            setIsAutoplayBlocked(false);
          }}
          className="autoplay-banner-hint"
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '25px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, rgba(229, 9, 20, 0.95), rgba(255, 46, 99, 0.95))',
            color: '#fff',
            padding: '10px 18px',
            borderRadius: '30px',
            boxShadow: '0 8px 25px rgba(229, 9, 20, 0.5), 0 0 15px rgba(255, 46, 99, 0.4)',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'pulse 1.8s infinite',
            userSelect: 'none'
          }}
          title="Toca para encender la música de fondo"
        >
          <span style={{ fontSize: '1.1rem' }}>🎵</span>
          <span>Toca aquí para encender la música de mi niña hermosa ❤️</span>
        </div>
      )}

      <div className="floating-music-widget" style={{ zIndex: 160 }}>
        {/* Elemento de Audio HTML5: Happy Together sin silencio, directo cantando */}
        <audio
          ref={audioRef}
          src={mainSong.src}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={handleCanPlay}
          loop={true}
          onEnded={handleSongEnded}
        />

        {/* Botón Reiniciar directo al inicio del canto */}
        <button
          onClick={handleRestartSong}
          style={{ color: '#a3a3a3', padding: '4px' }}
          title="Reiniciar canción directo al inicio del canto"
        >
          <RotateCcw size={15} />
        </button>

        {/* Disco giratorio / Play - Pausa */}
        <button
          className={`music-disc-spin ${isPlaying ? 'playing' : ''}`}
          onClick={onTogglePlay}
          title={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
        </button>

        {/* Info de la canción principal */}
        <div
          className="music-title-wrap"
          style={{ cursor: 'pointer' }}
          onClick={handleRestartSong}
          title="Canción Principal: Happy Together (Directo cantando)"
        >
          <span className="music-track-name">
            {mainSong.title}
            <span style={{ fontSize: '0.72rem', color: '#ff2e63', fontWeight: 700, marginLeft: '6px' }}>
              Directo cantando 🎤❤️
            </span>
          </span>
          <span className="music-artist-name">{mainSong.artist} • Canción Principal</span>
        </div>

        {/* Control de volumen */}
        <button onClick={toggleMute} style={{ color: '#a3a3a3', padding: '2px' }} title={isMuted ? "Activar sonido" : "Silenciar"}>
          {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={isMuted ? 0 : volume}
          onChange={handleVolume}
          style={{ width: '45px', accentColor: '#ff2e63' }}
          title="Volumen de música"
        />
      </div>
    </>
  );
}
