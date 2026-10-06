import React from 'react';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import ContentRow from '../components/ContentRow';
import TenReasons from '../components/TenReasons';
import { contentRows } from '../data/content';

export default function Home({ onPlayVideo, onOpenModal, isInMyList, onToggleMyList, onPlayMovie, onOpenSurprise }) {
  return (
    <div className="home-page-wrap">
      {/* Hero principal con botón a Película Completa */}
      <Hero
        onPlayVideo={onPlayVideo}
        onOpenModal={onOpenModal}
        isInMyList={isInMyList}
        onToggleMyList={onToggleMyList}
        onPlayMovie={onPlayMovie}
        onOpenSurprise={onOpenSurprise}
      />

      {/* Contador regresivo y banner especial de cumpleaños */}
      <Countdown onOpenSurprise={onOpenSurprise} />

      {/* Filas y carruseles de contenido */}
      <div style={{ marginTop: '1rem' }}>
        {contentRows.map((row) => (
          <ContentRow
            key={row.id}
            row={row}
            onPlayVideo={onPlayVideo}
            onOpenModal={onOpenModal}
            isInMyList={isInMyList}
            onToggleMyList={onToggleMyList}
          />
        ))}
      </div>

      {/* 10 Razones por las que te amo */}
      <TenReasons />

      {/* Footer romántico */}
      <footer style={{ padding: '4rem 4% 6rem 4%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', color: '#737373' }}>
        <p style={{ fontSize: '1.1rem', color: '#fda4af', fontFamily: 'var(--font-romantic)', marginBottom: '8px' }}>
          "06/10/2002 - Por siempre: Gracias por formar parte de mi historia. ¡Felices 24 años, mi niña bonita! Te amo ❤️"
        </p>
        <p style={{ fontSize: '0.85rem' }}>
          VANEFLIX © {new Date().getFullYear()} — Desarrollado exclusivamente con amor incondicional para mi persona favorita.
        </p>
      </footer>
    </div>
  );
}
