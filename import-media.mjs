import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('WhatsApp Unknown 2026-10-05 at 11.01.05 PM');
const destImgDir = path.resolve('public/images');
const destVideoDir = path.resolve('public/videos');
const destMediaDir = path.resolve('public/images/recuerdos_reales');

if (!fs.existsSync(destMediaDir)) fs.mkdirSync(destMediaDir, { recursive: true });
if (!fs.existsSync(destVideoDir)) fs.mkdirSync(destVideoDir, { recursive: true });

const files = fs.readdirSync(srcDir);
const imageFiles = files.filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'));
const videoFiles = files.filter(f => f.endsWith('.mp4'));

console.log(`Encontradas ${imageFiles.length} fotos y ${videoFiles.length} videos.`);

// 1. Copiar y catalogar fotos
const photoCatalog = [];
imageFiles.forEach((file, idx) => {
  const srcPath = path.join(srcDir, file);
  const cleanName = `recuerdo_${idx + 1}.jpg`;
  const destPath = path.join(destMediaDir, cleanName);
  fs.copyFileSync(srcPath, destPath);

  photoCatalog.push({
    original: file,
    cleanName: cleanName,
    publicUrl: `/images/recuerdos_reales/${cleanName}`
  });
});

// Asignar fotos clave
// Avatar Vane
if (photoCatalog[0]) {
  fs.copyFileSync(path.join(destMediaDir, photoCatalog[0].cleanName), path.join(destImgDir, 'avatar-vane.jpg'));
}
// Avatar Mi persona favorita
if (photoCatalog[1]) {
  fs.copyFileSync(path.join(destMediaDir, photoCatalog[1].cleanName), path.join(destImgDir, 'avatar-favorite.jpg'));
}
// Hero de fondo
if (photoCatalog[2]) {
  fs.copyFileSync(path.join(destMediaDir, photoCatalog[2].cleanName), path.join(destImgDir, 'hero-bg.jpg'));
}

// Sobrescribir fotos principales (foto1.jpg a foto10.jpg, recuerdo1.jpg a recuerdo8.jpg, historia1.jpg a historia6.jpg)
photoCatalog.slice(0, 10).forEach((item, idx) => {
  fs.copyFileSync(path.join(destMediaDir, item.cleanName), path.join(destImgDir, `foto${idx + 1}.jpg`));
});

photoCatalog.slice(10, 18).forEach((item, idx) => {
  fs.copyFileSync(path.join(destMediaDir, item.cleanName), path.join(destImgDir, `recuerdo${idx + 1}.jpg`));
});

photoCatalog.slice(18, 24).forEach((item, idx) => {
  fs.copyFileSync(path.join(destMediaDir, item.cleanName), path.join(destImgDir, `historia${idx + 1}.jpg`));
});

// 2. Copiar y catalogar videos
const videoCatalog = [];
videoFiles.forEach((file, idx) => {
  const srcPath = path.join(srcDir, file);
  const cleanName = `video_${idx + 1}.mp4`;
  const destPath = path.join(destVideoDir, cleanName);
  fs.copyFileSync(srcPath, destPath);

  videoCatalog.push({
    original: file,
    cleanName: cleanName,
    publicUrl: `/videos/${cleanName}`
  });
});

// Mapear los videos principales
if (videoCatalog[0]) {
  fs.copyFileSync(path.join(destVideoDir, videoCatalog[0].cleanName), path.join(destVideoDir, 'cumpleaños.mp4'));
}
if (videoCatalog[1]) {
  fs.copyFileSync(path.join(destVideoDir, videoCatalog[1].cleanName), path.join(destVideoDir, 'recuerdo1.mp4'));
}
if (videoCatalog[2]) {
  fs.copyFileSync(path.join(destVideoDir, videoCatalog[2].cleanName), path.join(destVideoDir, 'recuerdo2.mp4'));
}

// Guardar manifiesto JSON de fotos y videos
fs.writeFileSync('src/data/mediaManifest.json', JSON.stringify({
  photos: photoCatalog,
  videos: videoCatalog
}, null, 2));

console.log('✅ Todas las fotos y videos fueron copiados y clasificados exitosamente.');
