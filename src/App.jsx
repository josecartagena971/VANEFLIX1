import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProfileSelector from './components/ProfileSelector';
import ContentModal from './components/ContentModal';
import VideoPlayer from './components/VideoPlayer';
import CinematicMovie from './components/CinematicMovie';
import Surprise from './components/Surprise';
import NotificationPanel from './components/NotificationPanel';
import MusicPlayer from './components/MusicPlayer';
import SearchBar from './components/SearchBar';
import EasterEggs from './components/EasterEggs';

import Home from './pages/Home';
import History from './pages/History';
import Photos from './pages/Photos';
import Videos from './pages/Videos';
import Favorites from './pages/Favorites';
import Letters from './pages/Letters';
import MyList from './pages/MyList';
import TenReasons from './components/TenReasons';

import { simulatedNotifications, contentRows, musicPlaylist } from './data/content';
import { useLocalStorage } from './hooks/useLocalStorage';
import { soundEffects } from './utils/audioEffects';

export default function App() {
  // Estado de perfil persistente
  const [currentProfile, setCurrentProfile] = useLocalStorage('vaneflix_profile', null);

  // Pestaña de navegación activa
  const [currentTab, setCurrentTab] = useState('home');

  // Mi Lista guardada en LocalStorage
  const [myList, setMyList] = useLocalStorage('vaneflix_mylist', []);

  // Notificaciones simuladas con estado de lectura
  const [notifications, setNotifications] = useState(simulatedNotifications);

  // Estados de Modales y Vistas
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [activeVideoItem, setActiveVideoItem] = useState(null);
  const [activeVideoPlaylist, setActiveVideoPlaylist] = useState([]);
  const [showCinematicMovie, setShowCinematicMovie] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Iniciar la música automáticamente al abrir la página o al primer clic/interacción
  useEffect(() => {
    setIsPlayingMusic(true);

    const enableAudioOnInteraction = () => {
      setIsPlayingMusic(true);
      window.removeEventListener('click', enableAudioOnInteraction);
      window.removeEventListener('touchstart', enableAudioOnInteraction);
      window.removeEventListener('keydown', enableAudioOnInteraction);
    };

    window.addEventListener('click', enableAudioOnInteraction, { once: true });
    window.addEventListener('touchstart', enableAudioOnInteraction, { once: true });
    window.addEventListener('keydown', enableAudioOnInteraction, { once: true });

    return () => {
      window.removeEventListener('click', enableAudioOnInteraction);
      window.removeEventListener('touchstart', enableAudioOnInteraction);
      window.removeEventListener('keydown', enableAudioOnInteraction);
    };
  }, []);

  // Pausar automáticamente la música de fondo de la página cuando se abra cualquier reproductor de video
  useEffect(() => {
    if (activeVideoItem || showCinematicMovie) {
      setIsPlayingMusic(false);
    }
  }, [activeVideoItem, showCinematicMovie]);

  // Lista global de videos con canciones asignadas de la carpeta (inician en el coro)
  const allVideoItems = [
    { id: "vid-1", title: "Video 1: Momento Inolvidable", image: "/images/recuerdos_reales/recuerdo_1.jpg", video: "/videos/video_1.mp4", musicIndex: 0 },
    { id: "vid-2", title: "Video 2: Risas Juntos", image: "/images/recuerdos_reales/recuerdo_2.jpg", video: "/videos/video_2.mp4", musicIndex: 1 },
    { id: "vid-3", title: "Video 3: Tarde Mágica", image: "/images/recuerdos_reales/recuerdo_3.jpg", video: "/videos/video_3.mp4", musicIndex: 2 },
    { id: "vid-4", title: "Video 4: Dulce Compañía", image: "/images/recuerdos_reales/recuerdo_4.jpg", video: "/videos/video_4.mp4", musicIndex: 3 },
    { id: "vid-5", title: "Video 5: Nuestra Historia en Movimiento", image: "/images/recuerdos_reales/recuerdo_5.jpg", video: "/videos/video_5.mp4", musicIndex: 4 },
    { id: "vid-6", title: "Video 6: Miradas y Gestos", image: "/images/recuerdos_reales/recuerdo_6.jpg", video: "/videos/video_6.mp4", musicIndex: 0 },
    { id: "vid-7", title: "Video 7: Para Toda la Vida", image: "/images/recuerdos_reales/recuerdo_7.jpg", video: "/videos/video_7.mp4", musicIndex: 1 },
    { id: "vid-8", title: "Video 8: Nuestro Momento Más Lindo", image: "/images/recuerdos_reales/recuerdo_34.jpg", video: "/videos/video_8.mp4", musicIndex: 3 }
  ];

  // Verificar si un elemento está en Mi Lista
  const isInMyList = (id) => myList.some((item) => item.id === id);

  // Agregar o remover de Mi Lista
  const handleToggleMyList = (item) => {
    if (isInMyList(item.id)) {
      setMyList(myList.filter((i) => i.id !== item.id));
    } else {
      setMyList([...myList, item]);
    }
  };

  // Reproducir video con soporte de lista de reproducción continua y mapeo dinámico
  const handlePlayVideo = (item, playlist = null) => {
    setActiveModalItem(null);
    setIsPlayingMusic(false);
    const targetPlaylist = playlist || allVideoItems;

    let foundIdx = -1;
    if (item?.videoIndex !== undefined && item.videoIndex >= 0 && item.videoIndex < targetPlaylist.length) {
      foundIdx = item.videoIndex;
    } else if (item?.video) {
      foundIdx = targetPlaylist.findIndex((p) => p.video === item.video);
      if (foundIdx === -1) {
        const vMatch = item.video.match(/video_(\d+)/);
        if (vMatch) {
          const vNum = parseInt(vMatch[1], 10);
          foundIdx = (vNum - 1) % targetPlaylist.length;
        }
      }
    }
    if (foundIdx === -1 && item?.id) {
      foundIdx = targetPlaylist.findIndex((p) => p.id === item.id);
      if (foundIdx === -1) {
        const numMatch = item.id.match(/\d+/);
        if (numMatch) {
          foundIdx = (parseInt(numMatch[0], 10) - 1) % targetPlaylist.length;
        }
      }
    }
    if (foundIdx === -1) foundIdx = 0;

    const baseVideo = targetPlaylist[foundIdx];
    const enrichedItem = {
      ...baseVideo,
      ...item,
      video: baseVideo.video,
      videoIndex: foundIdx,
      musicIndex: item?.musicIndex !== undefined ? item.musicIndex : (foundIdx % musicPlaylist.length),
      introType: item?.introType || (foundIdx % 4 === 0 ? 'birthday' : foundIdx % 4 === 1 ? 'romantic' : foundIdx % 4 === 2 ? 'cinematic' : 'memories')
    };

    setActiveVideoItem(enrichedItem);
    setActiveVideoPlaylist(targetPlaylist);
  };

  // Abrir modal de detalles
  const handleOpenModal = (item) => {
    setActiveModalItem(item);
  };

  // Cambiar de perfil (vuelve a la pantalla de selección)
  const handleSwitchProfile = () => {
    soundEffects.playPop();
    setCurrentProfile(null);
  };

  // Clic en notificación
  const handleNotificationClick = (notif) => {
    setNotifications(
      notifications.map((n) => (n.id === notif.id ? { ...n, isUnread: false } : n))
    );
    setShowNotifications(false);

    if (notif.action === 'surprise') {
      setShowSurprise(true);
    } else if (notif.action === 'memories') {
      setCurrentTab('photos');
      setIsSearching(false);
    } else if (notif.action === 'letters') {
      setCurrentTab('letters');
      setIsSearching(false);
    } else if (notif.action === 'history') {
      setCurrentTab('history');
      setIsSearching(false);
    }
  };

  // Marcar todas las notificaciones como leídas
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isUnread: false })));
  };

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  // 1. Si no ha seleccionado perfil, mostrar la pantalla "¿Quién está viendo?"
  if (!currentProfile) {
    return (
      <ProfileSelector
        onSelectProfile={(p) => {
          setCurrentProfile(p);
          setCurrentSongIndex(0); // Happy Together (primer tema con inicio en el coro a los 38s)
          setIsPlayingMusic(true);
        }}
      />
    );
  }

  // 2. Renderizar contenido principal de la plataforma de streaming
  return (
    <div className="vaneflix-app-root">
      {/* Barra de Navegación Fija */}
      <Navbar
        currentTab={isSearching ? 'search' : currentTab}
        onSelectTab={(tabId) => {
          setIsSearching(false);
          setCurrentTab(tabId);
        }}
        onOpenSurprise={() => setShowSurprise(true)}
        onOpenMovie={() => setShowCinematicMovie(true)}
        onToggleSearch={() => setIsSearching(!isSearching)}
        onToggleNotifications={() => setShowNotifications(!showNotifications)}
        unreadCount={unreadCount}
        onSwitchProfile={handleSwitchProfile}
        currentProfile={currentProfile}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={() => setIsPlayingMusic(!isPlayingMusic)}
      />

      {/* Menú de Notificaciones */}
      {showNotifications && (
        <NotificationPanel
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {/* Vista de Búsqueda o Página según Pestaña */}
      <main>
        {isSearching ? (
          <SearchBar
            onPlayVideo={handlePlayVideo}
            onOpenModal={handleOpenModal}
            isInMyList={isInMyList}
            onToggleMyList={handleToggleMyList}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <Home
                onPlayVideo={handlePlayVideo}
                onOpenModal={handleOpenModal}
                isInMyList={isInMyList}
                onToggleMyList={handleToggleMyList}
                onPlayMovie={() => setShowCinematicMovie(true)}
                onOpenSurprise={() => setShowSurprise(true)}
              />
            )}

            {currentTab === 'history' && (
              <History
                onPlayVideo={handlePlayVideo}
                onOpenModal={handleOpenModal}
                isInMyList={isInMyList}
                onToggleMyList={handleToggleMyList}
              />
            )}

            {currentTab === 'photos' && (
              <Photos
                onPlayMovie={() => setShowCinematicMovie(true)}
                isPlayingMusic={isPlayingMusic}
                onToggleMusic={() => setIsPlayingMusic(!isPlayingMusic)}
              />
            )}

            {currentTab === 'videos' && (
              <Videos
                onPlayVideo={handlePlayVideo}
                onOpenModal={handleOpenModal}
                isInMyList={isInMyList}
                onToggleMyList={handleToggleMyList}
                onPlayMovie={() => setShowCinematicMovie(true)}
              />
            )}

            {currentTab === 'favorites' && (
              <Favorites
                onPlayVideo={handlePlayVideo}
                onOpenModal={handleOpenModal}
                isInMyList={isInMyList}
                onToggleMyList={handleToggleMyList}
              />
            )}

            {currentTab === 'letters' && <Letters />}

            {currentTab === 'reasons' && (
              <div style={{ paddingTop: 'calc(var(--navbar-height) + 1rem)' }}>
                <TenReasons />
              </div>
            )}

            {currentTab === 'mylist' && (
              <MyList
                myList={myList}
                onPlayVideo={handlePlayVideo}
                onOpenModal={handleOpenModal}
                isInMyList={isInMyList}
                onToggleMyList={handleToggleMyList}
                onGoHome={() => setCurrentTab('home')}
              />
            )}
          </>
        )}
      </main>

      {/* Modal Ficha de Información / Película */}
      {activeModalItem && (
        <ContentModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
          onPlayVideo={handlePlayVideo}
          isInMyList={isInMyList}
          onToggleMyList={handleToggleMyList}
        />
      )}

      {/* Reproductor de Video HTML5 con Flujo Continuo */}
      {activeVideoItem && (
        <VideoPlayer
          item={activeVideoItem}
          playlist={activeVideoPlaylist}
          onClose={() => {
            setActiveVideoItem(null);
            setActiveVideoPlaylist([]);
            setIsPlayingMusic(true);
          }}
        />
      )}

      {/* NUEVO: Película Completa Continua (Montaje Editado de Fotos + Videos) */}
      {showCinematicMovie && (
        <CinematicMovie
          onClose={() => {
            setShowCinematicMovie(false);
            setIsPlayingMusic(true);
          }}
        />
      )}

      {/* Modo Sorpresa */}
      {showSurprise && (
        <Surprise
          onClose={() => setShowSurprise(false)}
          onPlayMusic={() => {
            const ourSongIdx = musicPlaylist.findIndex(s => s.isOurSong || s.title.toLowerCase().includes('get to love you'));
            setCurrentSongIndex(ourSongIdx !== -1 ? ourSongIdx : 1);
            setIsPlayingMusic(true);
          }}
        />
      )}

      {/* Reproductor de Música Flotante (Canción Principal: Happy Together sin cortes) */}
      <MusicPlayer
        isPlaying={isPlayingMusic}
        onTogglePlay={() => setIsPlayingMusic(!isPlayingMusic)}
      />

      {/* Detalles Románticos y Easter Eggs */}
      <EasterEggs />
    </div>
  );
}
