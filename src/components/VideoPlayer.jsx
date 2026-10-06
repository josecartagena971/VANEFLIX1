import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, RotateCw, SkipForward, SkipBack, Music, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { musicPlaylist } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function VideoPlayer({ item, playlist = [], onClose }) {
  // Mapeo inteligente y preciso del video inicial
  let initialIdx = -1;
  if (playlist && playlist.length > 0) {
    if (item?.videoIndex !== undefined && item.videoIndex >= 0 && item.videoIndex < playlist.length) {
      initialIdx = item.videoIndex;
    } else {
      initialIdx = playlist.findIndex((p) => p.id === item?.id);
      if (initialIdx === -1 && item?.video) {
        initialIdx = playlist.findIndex((p) => p.video === item?.video);
      }
      if (initialIdx === -1 && item?.video) {
        const vMatch = item.video.match(/video_(\d+)/);
        if (vMatch) {
          initialIdx = (parseInt(vMatch[1], 10) - 1) % playlist.length;
        }
      }
    }
  }
  const safeInitialIdx = initialIdx !== -1 ? initialIdx : 0;
  const [currentIdx, setCurrentIdx] = useState(safeInitialIdx);
  const currentItem = {
    ...(playlist.length > 0 ? playlist[currentIdx] : item),
    title: (currentIdx === safeInitialIdx && item?.title) ? item.title : (playlist[currentIdx]?.title || item?.title),
    description: (currentIdx === safeInitialIdx && item?.description) ? item.description : (playlist[currentIdx]?.description || item?.description),
    introType: (currentIdx === safeInitialIdx && item?.introType) ? item.introType : (['birthday', 'romantic', 'cinematic', 'memories'][currentIdx % 4]),
    categoryBadge: (currentIdx === safeInitialIdx && item?.categoryBadge) ? item.categoryBadge : null
  };

  // Música romántica de fondo (inicia con la pista asignada para variedad)
  const initialMusicIdx = item?.musicIndex !== undefined
    ? (item.musicIndex % musicPlaylist.length)
    : (safeInitialIdx % musicPlaylist.length);
  const [musicIdx, setMusicIdx] = useState(initialMusicIdx);
  const currentMusic = musicPlaylist[musicIdx] || musicPlaylist[0];

  // Estado del overlay de inicio dinámico
  const [showIntro, setShowIntro] = useState(true);

  const videoRef = useRef(null);
  const musicAudioRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [nextCountdown, setNextCountdown] = useState(null);


  const hasNext = playlist.length > 0 && currentIdx < playlist.length - 1;
  const hasPrev = playlist.length > 0 && currentIdx > 0;
  const nextItem = hasNext ? playlist[currentIdx + 1] : null;

  // Sincronizar música de fondo con el reproductor
  useEffect(() => {
    if (musicAudioRef.current) {
      musicAudioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        musicAudioRef.current.play().catch(() => {});
      } else {
        musicAudioRef.current.pause();
      }
    }
  }, [isPlaying, musicIdx, volume, isMuted]);

  // Efecto dinámico de entrada según el tipo de tarjeta
  useEffect(() => {
    setShowIntro(true);
    const itype = currentItem.introType || 'romantic';

    if (itype === 'birthday') {
      soundEffects.playChime();
      confetti({
        particleCount: 85,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#e11d48', '#ff2e63', '#fda4af', '#ffd166', '#ffffff']
      });
    } else if (itype === 'cinematic') {
      soundEffects.playTudum();
    } else {
      soundEffects.playPop();
    }

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [currentIdx]);

  // Auto-hide controls
  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying && !nextCountdown) setShowControls(false);
      }, 3500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isPlaying, nextCountdown]);

  // Teclas rápidas
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'ArrowRight' && hasNext) playNext();
      if (e.key === 'ArrowLeft' && hasPrev) playPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleEnded = () => {
    if (hasNext) {
      setNextCountdown(3);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (nextCountdown === null) return;

    if (nextCountdown > 0) {
      const timer = setTimeout(() => {
        setNextCountdown(nextCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (nextCountdown === 0) {
      playNext();
    }
  }, [nextCountdown]);

  const playNext = () => {
    soundEffects.playPop();
    setNextCountdown(null);
    if (hasNext) {
      setCurrentIdx((prev) => prev + 1);
      setMusicIdx((prev) => (prev + 1) % musicPlaylist.length);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const playPrev = () => {
    soundEffects.playPop();
    setNextCountdown(null);
    if (hasPrev) {
      setCurrentIdx((prev) => prev - 1);
      setMusicIdx((prev) => (prev - 1 + musicPlaylist.length) % musicPlaylist.length);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    soundEffects.playPop();
    if (nextCountdown !== null) setNextCountdown(null);

    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 60);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="video-player-modal" ref={containerRef}>
      {/* MÚSICA DE FONDO ROMÁNTICA REEMPLAZANDO EL AUDIO ORIGINAL DEL VIDEO */}
      <audio
        ref={musicAudioRef}
        src={currentMusic.src}
        onEnded={() => setMusicIdx((prev) => (prev + 1) % musicPlaylist.length)}
      />

      <div className="video-container-inner" onClick={togglePlay}>
        {/* El video va SILENCIADO (muted=true) tal como pidió el usuario */}
        <video
          key={currentItem?.video || currentItem?.id}
          ref={videoRef}
          src={currentItem?.video || '/videos/video_1.mp4'}
          className="custom-html5-video"
          muted={true}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
              videoRef.current.play().catch(() => {});
              setIsPlaying(true);
            }
          }}
          onEnded={handleEnded}
          autoPlay
          playsInline
        />

        {/* OVERLAY DE ENTRADA DINÁMICA (VARIADA SEGÚN LA TARJETA) */}
        {showIntro && (
          <div
            className={`player-dynamic-intro intro-${currentItem.introType || 'romantic'}`}
            onClick={(e) => {
              e.stopPropagation();
              setShowIntro(false);
            }}
          >
            <div className="intro-badge-pill">
              {currentItem.introType === 'birthday' && '🎂 ESPECIAL DE CUMPLEAÑOS • 24 AÑOS'}
              {currentItem.introType === 'romantic' && '💖 MOMENTO ROMÁNTICO • MI NIÑA BONITA'}
              {currentItem.introType === 'cinematic' && `🎬 NUESTRA HISTORIA • CAPÍTULO ${currentIdx + 1}`}
              {currentItem.introType === 'memories' && '📸 CÁPSULA DEL TIEMPO • RECUERDO ETERNO'}
            </div>
            <h1 className="intro-title-text">{currentItem?.title}</h1>
            <p className="intro-subtitle-text">
              {currentItem.introType === 'birthday' && 'Celebrando tu vida y tus 24 vueltas al sol con todo mi amor, amorcito'}
              {currentItem.introType === 'romantic' && 'Para mi corazoncini de mecolotini, la mujer más bella de mi universo'}
              {currentItem.introType === 'cinematic' && 'Una historia de amor verdadero que seguimos escribiendo juntos'}
              {currentItem.introType === 'memories' && 'Cada segundo a tu lado está guardado en lo más profundo de mi corazón'}
            </p>
            <div className="intro-music-tag">
              <Music size={16} />
              <span>Banda Sonora: <strong>{currentMusic.title}</strong> — {currentMusic.artist}</span>
            </div>
            <button
              className="intro-skip-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowIntro(false);
              }}
            >
              Saltar intro
            </button>
          </div>
        )}

        {/* OVERLAY NETFLIX: SIGUIENTE RECUERDO AUTOMÁTICO */}
        {nextCountdown !== null && nextItem && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              bottom: '100px',
              right: '40px',
              background: 'rgba(20, 20, 24, 0.95)',
              border: '1px solid rgba(229, 9, 20, 0.5)',
              borderRadius: '12px',
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 12px 35px rgba(0,0,0,0.85)',
              zIndex: 40,
              animation: 'fadeInUp 0.3s ease'
            }}
          >
            <img
              src={nextItem.image}
              alt={nextItem.title}
              style={{ width: '80px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
            />
            <div>
              <div style={{ color: '#fda4af', fontSize: '0.8rem', fontWeight: 700 }}>
                A continuación en {nextCountdown}s...
              </div>
              <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1rem' }}>
                {nextItem.title}
              </div>
            </div>
            <button
              onClick={playNext}
              className="btn-play-hero"
              style={{ padding: '8px 16px', fontSize: '0.9rem', background: '#E50914', color: '#fff' }}
            >
              <Play size={16} fill="#fff" />
              <span>Ver ya</span>
            </button>
            <button
              onClick={() => setNextCountdown(null)}
              style={{ color: '#a3a3a3', fontSize: '0.8rem', padding: '4px' }}
            >
              Cancelar
            </button>
          </div>
        )}

        {/* Barra Superior con botón Atrás y Canción actual */}
        <div
          className="video-player-topbar"
          style={{ opacity: showControls ? 1 : 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="video-back-btn" onClick={onClose}>
            <ArrowLeft size={20} />
            <span>Volver a VANEFLIX</span>
          </button>

          <div style={{ marginLeft: '1rem', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{currentItem?.title}</span>
            {playlist.length > 1 && (
              <span style={{ color: '#fda4af', fontSize: '0.85rem' }}>
                ({currentIdx + 1} de {playlist.length})
              </span>
            )}
            {currentItem?.categoryBadge && (
              <span style={{ fontSize: '0.75rem', background: 'rgba(255,46,99,0.25)', border: '1px solid rgba(255,46,99,0.5)', padding: '2px 8px', borderRadius: '4px', color: '#ffd166', fontWeight: 700 }}>
                {currentItem.categoryBadge}
              </span>
            )}
          </div>

          {/* Insignia de Canción sonando */}
          <button
            onClick={() => setMusicIdx((prev) => (prev + 1) % musicPlaylist.length)}
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 46, 99, 0.25)',
              border: '1px solid rgba(255, 46, 99, 0.5)',
              padding: '6px 12px',
              borderRadius: '20px',
              color: '#fda4af',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Clic para cambiar de canción"
          >
            <Music size={14} />
            <span>{currentMusic.title} • {currentMusic.artist}</span>
          </button>
        </div>

        {/* Controles de reproducción inferiores */}
        <div
          className="video-player-controls"
          style={{ opacity: showControls ? 1 : 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="video-scrub-bar"
          />

          <div className="video-controls-bottom-row">
            <div className="video-ctrl-group">
              {hasPrev && (
                <button className="video-icon-btn" onClick={playPrev} title="Recuerdo anterior">
                  <SkipBack size={20} />
                </button>
              )}

              <button className="video-icon-btn" onClick={togglePlay}>
                {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
              </button>

              {hasNext && (
                <button className="video-icon-btn" onClick={playNext} title="Siguiente recuerdo">
                  <SkipForward size={20} />
                </button>
              )}

              <button
                className="video-icon-btn"
                onClick={() => {
                  const target = Math.max(0, currentTime - 10);
                  setCurrentTime(target);
                  if (videoRef.current) videoRef.current.currentTime = target;
                }}
                title="-10s"
              >
                <RotateCcw size={18} />
              </button>

              <button
                className="video-icon-btn"
                onClick={() => {
                  const target = Math.min(duration, currentTime + 10);
                  setCurrentTime(target);
                  if (videoRef.current) videoRef.current.currentTime = target;
                }}
                title="+10s"
              >
                <RotateCw size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button className="video-icon-btn" onClick={toggleMute}>
                  {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  style={{ width: '65px', accentColor: '#E50914' }}
                />
              </div>

              <div className="video-time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="video-ctrl-group">

              <select
                value={playbackSpeed}
                onChange={(e) => {
                  const s = parseFloat(e.target.value);
                  setPlaybackSpeed(s);
                  if (videoRef.current) videoRef.current.playbackRate = s;
                }}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '0.85rem'
                }}
              >
                <option value={0.75}>0.75x</option>
                <option value={1}>1.0x Normal</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>

              <button className="video-icon-btn" onClick={toggleFullscreen} title="Pantalla completa">
                <Maximize size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
