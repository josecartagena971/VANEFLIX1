import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { musicPlaylist } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function MusicPlayer({ isPlaying, onTogglePlay }) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);

  // Canción principal exclusiva de la plataforma: Happy Together (The Turtles)
  // Reproducida sin cortes desde el inicio (0:00) hasta el final de forma continua
  const mainSong = musicPlaylist[0];

  // Sincronizar reproducción y volumen de la canción principal
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, isMuted]);

  // Al terminar la canción, reinicia suavemente desde el inicio (0:00) sin cortes
  const handleSongEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // Reiniciar manualmente la canción desde el inicio
  const handleRestartSong = (e) => {
    e?.stopPropagation();
    soundEffects.playPop();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
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
    <div className="floating-music-widget" style={{ zIndex: 160 }}>
      {/* Elemento de Audio HTML5: Happy Together completa de 0:00 al final sin cortes */}
      <audio
        ref={audioRef}
        src={mainSong.src}
        loop={true}
        onEnded={handleSongEnded}
      />

      {/* Botón Reiniciar desde el inicio */}
      <button
        onClick={handleRestartSong}
        style={{ color: '#a3a3a3', padding: '4px' }}
        title="Reiniciar canción desde el inicio (0:00)"
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
        title="Canción Principal: Happy Together (Completa sin cortes)"
      >
        <span className="music-track-name">
          {mainSong.title}
          <span style={{ fontSize: '0.72rem', color: '#ff2e63', fontWeight: 700, marginLeft: '6px' }}>
            Completa sin cortes 🎵
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
  );
}
