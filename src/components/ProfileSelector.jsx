import React from 'react';
import { profiles, siteConfig } from '../data/content';
import { soundEffects } from '../utils/audioEffects';

export default function ProfileSelector({ onSelectProfile }) {
  const handleSelect = (profile) => {
    // Reproducir el auténtico TUDUM de Netflix
    soundEffects.playTudum();
    // Animación suave de transición
    setTimeout(() => {
      onSelectProfile(profile);
    }, 400);
  };

  return (
    <div className="profile-screen-container">
      <div className="profile-brand-top">
        <div className="vaneflix-logo">
          {siteConfig.platformName} <span className="heart-badge">❤️</span>
        </div>
      </div>

      <h1 className="profile-title">{siteConfig.userGreeting}</h1>

      <div className="profile-grid">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="profile-card"
            onClick={() => handleSelect(profile)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSelect(profile)}
          >
            <div className="profile-avatar-wrapper">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="profile-avatar-img"
                onError={(e) => {
                  // Fallback visual si el archivo local está cargando
                  e.target.src = profile.isPrimary
                    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                    : 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="profile-badge-overlay">
                {profile.isPrimary ? '🎂 Cumpleañera VIP • 24 Años' : 'Amor de mi vida'}
              </div>
            </div>
            <div className="profile-name">
              {profile.name}
            </div>
            <span className="profile-subtitle">{profile.subtitle}</span>
          </div>
        ))}
      </div>

      <button
        className="profile-enter-btn"
        onClick={() => handleSelect(profiles[0])}
      >
        Entrar como {profiles[0].name}
      </button>
    </div>
  );
}
