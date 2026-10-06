// Script to create clean local placeholder assets in public/images, public/videos, public/music
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const imgDir = path.join(publicDir, 'images');
const videoDir = path.join(publicDir, 'videos');
const musicDir = path.join(publicDir, 'music');

[imgDir, videoDir, musicDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Helper to create an artistic SVG placeholder with romantic gradients & typography
function createSvgPlaceholder(title, subtitle, icon, color1 = '#831843', color2 = '#1e1b4b') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="50%" stop-color="#2d0a27" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="rgba(244, 63, 94, 0.4)" />
      <stop offset="100%" stop-color="rgba(0, 0, 0, 0.8)" />
    </radialGradient>
    <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.08)" />
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#grad)" />
  <rect width="100%" height="100%" fill="url(#pattern)" />
  <rect width="100%" height="100%" fill="url(#glow)" />
  
  <!-- Film Strip effect lines -->
  <line x1="40" y1="30" x2="760" y2="30" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-dasharray="10,10" />
  <line x1="40" y1="420" x2="760" y2="420" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-dasharray="10,10" />
  
  <!-- Decorative Icon -->
  <text x="400" y="200" font-size="72" text-anchor="middle" dominant-baseline="central">${icon}</text>
  
  <!-- Title -->
  <text x="400" y="270" font-family="'Outfit', 'Montserrat', sans-serif" font-weight="800" font-size="32" fill="#ffffff" text-anchor="middle" letter-spacing="1">
    ${title.toUpperCase()}
  </text>
  
  <!-- Subtitle -->
  <text x="400" y="315" font-family="'Inter', sans-serif" font-weight="500" font-size="18" fill="#fda4af" text-anchor="middle" letter-spacing="0.5">
    ${subtitle}
  </text>
  
  <!-- Netflix style badge -->
  <rect x="50" y="50" width="100" height="26" rx="4" fill="#E50914" />
  <text x="100" y="67" font-family="'Montserrat', sans-serif" font-weight="800" font-size="11" fill="#ffffff" text-anchor="middle" letter-spacing="1">VANEFLIX</text>
</svg>`;
}

const images = [
  { name: 'avatar-vane.jpg', title: 'Vane', subtitle: 'La cumpleañera y dueña de mi corazón', icon: '❤️', c1: '#e11d48', c2: '#831843' },
  { name: 'avatar-favorite.jpg', title: 'Mi Persona Favorita', subtitle: 'Tú, hoy y siempre', icon: '💝', c1: '#db2777', c2: '#4c0519' },
  { name: 'hero-bg.jpg', title: 'Feliz Cumpleaños Vane', subtitle: 'Una producción original hecha con todo mi amor', icon: '🎂', c1: '#be123c', c2: '#18181b' },
  { name: 'recuerdo1.jpg', title: 'Nuestro Primer Recuerdo', subtitle: 'El día en que todo comenzó', icon: '✨', c1: '#9f1239', c2: '#31102b' },
  { name: 'recuerdo2.jpg', title: 'Momentos Juntos', subtitle: 'Risas que no se olvidan jamás', icon: '📸', c1: '#e11d48', c2: '#4c0519' },
  { name: 'recuerdo3.jpg', title: 'Días Especiales', subtitle: 'Caminatas bajo el atardecer', icon: '🌅', c1: '#f43f5e', c2: '#881337' },
  { name: 'recuerdo4.jpg', title: 'Aventuras', subtitle: 'Explorando nuevos lugares', icon: '✈️', c1: '#b91c1c', c2: '#450a0a' },
  { name: 'recuerdo5.jpg', title: 'Viajes Inolvidables', subtitle: 'Juntos en cualquier rincón', icon: '🗺️', c1: '#be185d', c2: '#500724' },
  { name: 'recuerdo6.jpg', title: 'Celebraciones', subtitle: 'Brindando por tu sonrisa', icon: '🥂', c1: '#c026d3', c2: '#4a044e' },
  { name: 'recuerdo7.jpg', title: 'Abrazos Infinitos', subtitle: 'Mi lugar seguro siempre', icon: '🫂', c1: '#e11d48', c2: '#1e1b4b' },
  { name: 'recuerdo8.jpg', title: 'Miradas Cómplices', subtitle: 'Conexión desde el primer día', icon: '👀', c1: '#be123c', c2: '#09090b' },
  { name: 'foto1.jpg', title: 'Nuestra Primera Foto', subtitle: 'Donde los ojos brillaban más', icon: '📷', c1: '#9f1239', c2: '#31102b' },
  { name: 'foto2.jpg', title: 'Tarde de Risas', subtitle: 'Tu risa que llena cualquier lugar', icon: '😊', c1: '#db2777', c2: '#4c0519' },
  { name: 'foto3.jpg', title: 'Paseo Inolvidable', subtitle: 'Manos entrelazadas sin apuro', icon: '🌿', c1: '#e11d48', c2: '#1e1b4b' },
  { name: 'foto4.jpg', title: 'Noche de Café y Charlas', subtitle: 'Horas que parecían minutos', icon: '☕', c1: '#c026d3', c2: '#3b0764' },
  { name: 'foto5.jpg', title: 'Atardecer Mágico', subtitle: 'El cielo reflejando tu luz', icon: '🌇', c1: '#f43f5e', c2: '#4c0519' },
  { name: 'foto6.jpg', title: 'Tu Mejor Sonrisa', subtitle: 'La imagen que ilumina mis días', icon: '💫', c1: '#be185d', c2: '#260416' },
  { name: 'foto7.jpg', title: 'Complicidad Pura', subtitle: 'Solo nosotros dos entendemos', icon: '💖', c1: '#9f1239', c2: '#1c1917' },
  { name: 'foto8.jpg', title: 'Abrazo en la Lluvia', subtitle: 'El calor de estar a tu lado', icon: '🌧️', c1: '#e11d48', c2: '#1e1b4b' },
  { name: 'foto9.jpg', title: 'Día de Parque', subtitle: 'Paz, tranquilidad y amor', icon: '🌸', c1: '#be123c', c2: '#4c0519' },
  { name: 'foto10.jpg', title: 'Mirada Soñadora', subtitle: 'Construyendo un futuro juntos', icon: '🌟', c1: '#db2777', c2: '#09090b' },
  { name: 'historia1.jpg', title: 'Episodio 1: El Comienzo', subtitle: 'Cómo nos conocimos por casualidad', icon: '🎬', c1: '#e11d48', c2: '#18181b' },
  { name: 'historia2.jpg', title: 'Episodio 2: Cuando Todo Empezó', subtitle: 'Las primeras miradas y mensajes', icon: '💬', c1: '#db2777', c2: '#18181b' },
  { name: 'historia3.jpg', title: 'Episodio 3: Mejores Momentos', subtitle: 'Las anécdotas que repetimos mil veces', icon: '🍿', c1: '#be185d', c2: '#18181b' },
  { name: 'historia4.jpg', title: 'Episodio 4: Las Aventuras', subtitle: 'Superando caminos de la mano', icon: '🚗', c1: '#f43f5e', c2: '#18181b' },
  { name: 'historia5.jpg', title: 'Episodio 5: Lo Aprendido', subtitle: 'Creciendo y cuidándonos día a día', icon: '🌱', c1: '#9f1239', c2: '#18181b' },
  { name: 'historia6.jpg', title: 'Episodio 6: Lo Que Viene', subtitle: 'Todo un universo por recorrer juntos', icon: '🚀', c1: '#e11d48', c2: '#18181b' },
];

images.forEach(img => {
  const content = createSvgPlaceholder(img.title, img.subtitle, img.icon, img.c1, img.c2);
  // Write as svg
  fs.writeFileSync(path.join(imgDir, img.name.replace('.jpg', '.svg')), content);
  // Also write as .jpg (browsers load svg in img src even if named .jpg when served properly or we can reference both)
  fs.writeFileSync(path.join(imgDir, img.name), content);
});

// Instructions in videos and music
fs.writeFileSync(path.join(videoDir, 'README.txt'), `Coloca aquí tus videos:
- recuerdo1.mp4
- recuerdo2.mp4
- cumpleaños.mp4

La plataforma VANEFLIX reproducirá automáticamente estos videos.`);

fs.writeFileSync(path.join(musicDir, 'README.txt'), `Coloca aquí tu canción favorita:
- nuestra-cancion.mp3

Si este archivo no existe, VANEFLIX reproducirá una melodía de piano romántica generada automáticamente.`);

console.log('✅ Archivos placeholder creados exitosamente en /public');
