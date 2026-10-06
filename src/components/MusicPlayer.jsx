import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, ListMusic, X } from 'lucide-react';
import { musicPlaylist } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function MusicPlayer({ isPlaying, onTogglePlay, currentSongIndex = 0, onChangeSong }) {
  const audioRef = useRef(null);
  const [songIdx, setSongIdx] = useState(currentSongIndex);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

  const currentSong = musicPlaylist[songIdx] || musicPlaylist[0];

  useEffect(() => {
    if (currentSongIndex !== undefined) {
      setSongIdx(currentSongIndex);
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, songIdx, volume, isMuted]);

  // Cuando una canción termina, pasar a la siguiente automáticamente sin parar
  const handleSongEnded = () => {
    const nextIdx = (songIdx + 1) % musicPlaylist.length;
    setSongIdx(nextIdx);
    if (onChangeSong) onChangeSong(nextIdx);
  };

  const handleNextSong = (e) => {
    e?.stopPropagation();
    soundEffects.playPop();
    const nextIdx = (songIdx + 1) % musicPlaylist.length;
    setSongIdx(nextIdx);
    if (onChangeSong) onChangeSong(nextIdx);
  };

  const handlePrevSong = (e) => {
    e?.stopPropagation();
    soundEffects.playPop();
    const prevIdx = (songIdx - 1 + musicPlaylist.length) % musicPlaylist.length;
    setSongIdx(prevIdx);
    if (onChangeSong) onChangeSong(prevIdx);
  };

  const handleSelectTrack = (idx) => {
    soundEffects.playPop();
    setSongIdx(idx);
    setShowPlaylistMenu(false);
    if (onChangeSong) onChangeSong(idx);
    if (!isPlaying && onTogglePlay) onTogglePlay();
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
      <div className="floating-music-widget" style={{ zIndex: 160 }}>
        {/* Elemento de Audio HTML5 real con la lista de canciones */}
        <audio
          ref={audioRef}
          src={currentSong.src}
          onEnded={handleSongEnded}
        />

        {/* Botón Anterior */}
        <button
          onClick={handlePrevSong}
          style={{ color: '#a3a3a3', padding: '4px' }}
          title="Canción anterior"
        >
          <SkipBack size={15} />
        </button>

        {/* Disco giratorio / Play - Pausa */}
        <button
          className={`music-disc-spin ${isPlaying ? 'playing' : ''}`}
          onClick={onTogglePlay}
          title={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
        </button>

        {/* Botón Siguiente */}
        <button
          onClick={handleNextSong}
          style={{ color: '#a3a3a3', padding: '4px' }}
          title="Siguiente canción"
        >
          <SkipForward size={15} />
        </button>

        {/* Info de la pista actual */}
        <div
          className="music-title-wrap"
          onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
          style={{ cursor: 'pointer' }}
          title="Ver lista de canciones"
        >
          <span className="music-track-name">{currentSong.title}</span>
          <span className="music-artist-name">{currentSong.artist}</span>
        </div>

        {/* Botón abrir menú de canciones */}
        <button
          onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
          style={{ color: showPlaylistMenu ? '#ff2e63' : '#a3a3a3', padding: '3px' }}
          title="Ver canciones disponibles"
        >
          <ListMusic size={16} />
        </button>

        {/* Control de volumen */}
        <button onClick={toggleMute} style={{ color: '#a3a3a3', padding: '2px' }}>
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

      {/* Menú flotante desplegable con las 4 canciones */}
      {showPlaylistMenu && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '24px',
            width: '280px',
            background: 'rgba(20, 20, 24, 0.96)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 46, 99, 0.4)',
            borderRadius: '14px',
            padding: '14px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.85)',
            zIndex: 170,
            animation: 'fadeInUp 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              🎵 Nuestra Banda Sonora ({musicPlaylist.length})
            </span>
            <button onClick={() => setShowPlaylistMenu(false)} style={{ color: '#fff' }}>
              <X size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {musicPlaylist.map((song, idx) => {
              const isCurrent = idx === songIdx;

              return (
                <div
                  key={song.id}
                  onClick={() => handleSelectTrack(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: isCurrent ? 'rgba(229, 9, 20, 0.25)' : 'rgba(255,255,255,0.03)',
                    border: isCurrent ? '1px solid rgba(229, 9, 20, 0.6)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.86rem', fontWeight: isCurrent ? 800 : 600, color: isCurrent ? '#fff' : '#e5e5e5' }}>
                        {song.title}
                      </span>
                      {song.isOurSong && (
                        <span style={{
                          fontSize: '0.62rem',
                          background: 'linear-gradient(45deg, #e11d48, #ff2e63)',
                          color: '#fff',
                          padding: '1px 6px',
                          borderRadius: '10px',
                          fontWeight: 700,
                          letterSpacing: '0.3px'
                        }}>
                          NUESTRA CANCIÓN ❤️
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: isCurrent ? '#fda4af' : '#888' }}>
                      {song.artist}
                    </div>
                  </div>

                  {isCurrent && (
                    <span style={{ color: '#46d369', fontSize: '0.75rem', fontWeight: 800 }}>
                      ▶ En reproducción
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
