import React, { useState, useEffect } from 'react';
import { Search, Bell, Gift, Music, Menu, X, Heart, Film } from 'lucide-react';
import { siteConfig } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function Navbar({
  currentTab,
  onSelectTab,
  onOpenSurprise,
  onOpenMovie,
  onToggleSearch,
  onToggleNotifications,
  unreadCount,
  onSwitchProfile,
  currentProfile,
  isPlayingMusic,
  onToggleMusic
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'movie', label: '🎬 Película', isAction: true },
    { id: 'history', label: 'Nuestra historia' },
    { id: 'photos', label: 'Fotos' },
    { id: 'videos', label: 'Videos' },
    { id: 'favorites', label: 'Momentos' },
    { id: 'letters', label: 'Cartas' },
    { id: 'reasons', label: '10 Razones' },
    { id: 'mylist', label: 'Mi lista' },
  ];

  const handleNavClick = (item) => {
    soundEffects.playPop();
    if (item.isAction && item.id === 'movie') {
      onOpenMovie();
    } else {
      onSelectTab(item.id);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar-fixed ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-left">
          <div
            className="vaneflix-logo"
            onClick={() => handleNavClick({ id: 'home' })}
            style={{ cursor: 'pointer' }}
          >
            {siteConfig.platformName} <span className="heart-badge">❤️</span>
          </div>

          <ul className="navbar-menu">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-link ${currentTab === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                  style={item.id === 'movie' ? { color: '#ff4d6d', fontWeight: 800 } : {}}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-right">
          {/* Botón Película Directo */}
          <button
            className="nav-action-btn"
            onClick={onOpenMovie}
            title="Ver Película Completa (Fotos + Videos continuos)"
            style={{ color: '#ff4d6d' }}
          >
            <Film size={20} />
          </button>

          {/* Botón Sorpresa */}
          <button
            className="nav-surprise-btn"
            onClick={() => {
              soundEffects.playChime();
              onOpenSurprise();
            }}
            title="Abrir sorpresa especial"
          >
            <Gift size={16} />
            <span>Sorpresa</span>
          </button>

          {/* Toggle Música */}
          <button
            className="nav-action-btn"
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Pausar música' : 'Reproducir música de fondo'}
            style={{ color: isPlayingMusic ? '#f43f5e' : '#fff' }}
          >
            <Music size={19} />
          </button>

          {/* Buscador */}
          <button
            className="nav-action-btn"
            onClick={onToggleSearch}
            title="Buscar recuerdos, fotos y cartas"
          >
            <Search size={19} />
          </button>

          {/* Notificaciones */}
          <button
            className="nav-action-btn"
            onClick={onToggleNotifications}
            title="Notificaciones"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="nav-badge-count">{unreadCount}</span>
            )}
          </button>

          {/* Avatar del perfil */}
          <div
            className="navbar-avatar-btn"
            onClick={onSwitchProfile}
            title={`Perfil actual: ${currentProfile?.name || 'Vane'}. Clic para cambiar perfil`}
          >
            <img
              src={currentProfile?.avatar || '/images/recuerdos_reales/recuerdo_1.jpg'}
              alt="Avatar"
              className="nav-avatar-img"
              onError={(e) => {
                e.target.src = '/images/recuerdos_reales/recuerdo_1.jpg';
              }}
            />
          </div>

          {/* Hamburguesa para móviles */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Menú responsive lateral para móvil */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-header">
            <div className="vaneflix-logo">
              {siteConfig.platformName} <span className="heart-badge">❤️</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#fff' }}
              aria-label="Cerrar menú"
            >
              <X size={28} />
            </button>
          </div>

          <ul className="mobile-menu-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`mobile-menu-link ${currentTab === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                >
                  <Heart size={16} color={currentTab === item.id ? '#E50914' : '#666'} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
