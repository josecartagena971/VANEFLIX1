import fs from 'fs';
import path from 'path';

const rootDir = path.resolve('.');
const musicDestDir = path.resolve('public/music');

if (!fs.existsSync(musicDestDir)) {
  fs.mkdirSync(musicDestDir, { recursive: true });
}

const files = fs.readdirSync(rootDir);
const mp3Files = files.filter(f => f.toLowerCase().endsWith('.mp3'));

console.log('Archivos MP3 encontrados en la raíz:', mp3Files);

const songConfigs = [
  {
    pattern: /ruelle|get to love you/i,
    cleanName: 'cancion_i_get_to_love_you.mp3',
    title: 'I Get To Love You (Nuestra Canción)',
    artist: 'Ruelle'
  },
  {
    pattern: /photograph/i,
    cleanName: 'cancion_photograph.mp3',
    title: 'Photograph',
    artist: 'Ed Sheeran'
  },
  {
    pattern: /wanna be yours/i,
    cleanName: 'cancion_i_wanna_be_yours.mp3',
    title: 'I Wanna Be Yours',
    artist: 'Arctic Monkeys'
  },
  {
    pattern: /just the way you are/i,
    cleanName: 'cancion_just_the_way_you_are.mp3',
    title: 'Just The Way You Are',
    artist: 'Bruno Mars'
  },
  {
    pattern: /happy together/i,
    cleanName: 'cancion_happy_together.mp3',
    title: 'Happy Together',
    artist: 'The Turtles'
  }
];

const copiedSongs = [];

// Procesar en el orden definido en songConfigs
songConfigs.forEach(config => {
  const matchingFile = mp3Files.find(f => config.pattern.test(f));
  if (matchingFile) {
    const srcPath = path.join(rootDir, matchingFile);
    const destPath = path.join(musicDestDir, config.cleanName);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copiado: "${matchingFile}" -> "${config.cleanName}"`);

    copiedSongs.push({
      id: config.cleanName.replace('.mp3', ''),
      file: config.cleanName,
      title: config.title,
      artist: config.artist,
      src: `/music/${config.cleanName}`
    });
  }
});

// Guardar copia como nuestra-cancion.mp3 para la principal
const ruelleSong = copiedSongs.find(s => s.file === 'cancion_i_get_to_love_you.mp3') || copiedSongs[0];
if (ruelleSong) {
  fs.copyFileSync(path.join(musicDestDir, ruelleSong.file), path.join(musicDestDir, 'nuestra-cancion.mp3'));
  console.log(`Copiado como nuestra-cancion.mp3: ${ruelleSong.file}`);

  // Si existe dist/music, actualizarlo también
  const distMusicDir = path.resolve('dist/music');
  if (fs.existsSync(distMusicDir)) {
    copiedSongs.forEach(s => {
      fs.copyFileSync(path.join(musicDestDir, s.file), path.join(distMusicDir, s.file));
    });
    fs.copyFileSync(path.join(musicDestDir, 'nuestra-cancion.mp3'), path.join(distMusicDir, 'nuestra-cancion.mp3'));
    console.log('Sincronizado dist/music también.');
  }
}

fs.writeFileSync('src/data/musicPlaylist.json', JSON.stringify(copiedSongs, null, 2));
console.log('✅ Lista de canciones guardada exitosamente.');
