# 🎬 VANEFLIX — Plataforma de Streaming de Cumpleaños para Vane ❤️

Una plataforma web interactiva inspirada en la interfaz cinematográfica de Netflix, personalizada exclusivamente como un regalo de amor y cumpleaños para **Vane**.

---

## 🚀 Cómo Ejecutar el Proyecto

El proyecto está construido con **React + Vite** y CSS moderno. Para ejecutarlo localmente:

```bash
# 1. Instalar dependencias (si es la primera vez)
npm install

# 2. Iniciar el servidor local de desarrollo
npm run dev
```

Abre tu navegador en:
👉 **[http://localhost:5173/](http://localhost:5173/)**

Para compilar para producción:
```bash
npm run build
```

---

## 🎨 Características Implementadas

1. **Pantalla Inicial de Perfiles ("¿Quién está viendo?")**:
   - Perfil principal: **❤️ Vane**
   - Segundo perfil: **💝 Mi persona favorita**
   - Efecto sonoro auténtico **TUDUM** sintetizado con Web Audio API.
   - Animación de entrada fluida y transición al catálogo.

2. **Navbar Cinematográfica**:
   - Logo **VANEFLIX** con corazón animado.
   - Pestañas de navegación: *Inicio*, *Nuestra historia*, *Fotos*, *Videos*, *Momentos*, *Cartas*, *10 Razones*, *Mi lista*.
   - Botón **🎁 Sorpresa** con animación de brillo.
   - Buscador en tiempo real.
   - Notificaciones interactivas.
   - Selector / Avatar de perfil.
   - Menú responsive para móviles y tablets.

3. **Hero Principal de Estreno**:
   - Título: *"Feliz cumpleaños, Vane ❤️"*.
   - Botón *"▶ Reproducir nuestro recuerdo"*.
   - Botón *"＋ Mi lista"*.
   - Botón *"ℹ Más información"* (Abre la ficha completa de la película).

4. **Contador Regresivo en Vivo**:
   - Cuenta regresiva de Días, Horas, Minutos y Segundos para el cumpleaños.
   - Modo fiesta cuando la fecha llega: *"¡Feliz cumpleaños, Vane! ❤️"*.

5. **Carruseles de Contenido (Filas Netflix)**:
   - 🎂 **Especial de cumpleaños**: *Feliz cumpleaños Vane*, *10 razones por las que te amo*, *Lo que deseo para ti*, *Un mensaje especial*, *Nuestra próxima aventura*.
   - ❤️ **Porque eres especial**: *Tu sonrisa*, *Tus ojos*, *Tu forma de ser*, *Tus locuras*, *Tus abrazos*, *Tu manera de hacerme feliz*.
   - 📸 **Nuestros recuerdos**: *Nuestro primer recuerdo*, *Momentos juntos*, *Días especiales*, *Aventuras*, *Viajes*, *Celebraciones*.
   - 🎬 **Nuestra historia**: Serie documental de 6 episodios interactivos.
   - 💕 **Momentos favoritos**: Recuerdos entrañables de nuestra historia.
   - Hover zoom cinematográfico con controles directos (Play, Mi lista, Me encanta, Más info).

6. **Reproductor de Video HTML5 Personalizado**:
   - Controles de Play/Pause, barra de progreso (scrubber), volumen con mute, adelanto/retroceso de 10s, velocidad (0.5x a 2.0x) y pantalla completa.
   - Canvas animado romántico en caso de que aún no hayas subido tu archivo MP4 local, para que la experiencia nunca se vea rota.

7. **Galería de Recuerdos ("Nuestros Recuerdos")**:
   - Filtros por categoría (*Todos*, *Primeras Citas*, *Viajes*, *Risas*, *Especiales*).
   - Lightbox a pantalla completa con navegación Anterior / Siguiente.

8. **Serie Documental "Nuestra Historia"**:
   - Los 6 episodios (*El comienzo*, *Cuando todo empezó*, *Primeras aventuras*, *Momentos inolvidables*, *Lo que hemos vivido*, *Lo que todavía nos falta vivir*).

9. **Cartas de Amor ("Cartas para Vane")**:
   - Tarjetas estilo sobre con sello lacrado.
   - Al abrirlas, se despliega una carta en papel con tipografía romántica y fecha.

10. **10 Razones por las que te amo**:
    - Tarjetas interactivas del 01 al 10.
    - Medidor de progreso y lluvia de confeti al completar las 10 razones.

11. **Mi Lista (Favoritos)**:
    - Agrega y quita cualquier recuerdo con el botón **+**.
    - Guardado persistente en `localStorage`.

12. **Buscador en Tiempo Real**:
    - Encuentra fotos, recuerdos, cartas y episodios instantáneamente.

13. **Modo Sorpresa (🎁 SORPRESA)**:
    - Oscurece la pantalla, reproduce campanadas mágicas y lanza ráfagas de confeti continuo.
    - Muestra la dedicatoria final de cumpleaños.

14. **Música de Fondo**:
    - Widget flotante con botón Play/Pausa, volumen y disco giratorio.
    - Si no tienes tu canción MP4/MP3 cargada, activa un sintetizador de piano romántico en tiempo real.

15. **Detalles Ocultos (Easter Eggs)**:
    - Corazón flotante secreto en la esquina inferior izquierda: ¡Tócalo 3 veces para desbloquear un mensaje de amor oculto!

---

## 🛠️ Cómo Personalizar con Tus Propias Fotos, Videos y Textos

**¡No necesitas tocar ningún componente de React!**

Todo el contenido está centralizado en un solo archivo:
📁 **`src/data/content.js`**

### 1. Para Cambiar las Fotos:
Guarda tus fotos en la carpeta:
```text
public/images/
   ├── avatar-vane.jpg
   ├── hero-bg.jpg
   ├── foto1.jpg
   ├── foto2.jpg
   ...
```

### 2. Para Cambiar los Videos:
Guarda tus videos en formato MP4 en:
```text
public/videos/
   ├── recuerdo1.mp4
   ├── recuerdo2.mp4
   └── cumpleaños.mp4
```

### 3. Banda Sonora (Música Romántica):
Tus 5 canciones MP3 ya están integradas en `public/music/`:
- ❤️ **I Get To Love You (Nuestra Canción)** — Ruelle (`cancion_i_get_to_love_you.mp3` y `nuestra-cancion.mp3`)
- 🎵 **Photograph** — Ed Sheeran (`cancion_photograph.mp3`)
- 🎵 **I Wanna Be Yours** — Arctic Monkeys (`cancion_i_wanna_be_yours.mp3`)
- 🎵 **Just The Way You Are** — Bruno Mars (`cancion_just_the_way_you_are.mp3`)
- 🎵 **Happy Together** — The Turtles (`cancion_happy_together.mp3`)

El reproductor de música en la esquina inferior derecha permite avanzar/retroceder de canción y abrir el menú desplegable para elegir cualquiera de ellas. Al pulsar "Reproducir nuestra canción" en la sorpresa, se reproduce automáticamente *I Get To Love You*.
Todos los videos se reproducen silenciados para que la música de fondo sea la protagonista de la experiencia.
