/**
 * ==============================================================================
 * LÍNEA DE TIEMPO DE "NUESTRA PELÍCULA COMPLETA" (FOTOS + VIDEOS EDITADOS)
 * ==============================================================================
 * Con las frases naturales y cariñosas que siempre le dices a Vane:
 * "mi niña bonita", "preciosa", "mi corazoncini de mecolotini", "mi bonita",
 * "¡qué guapa!", "amorcito", "amorcini", "corazón de mecolotón".
 * ==============================================================================
 */

export const movieScenes = [
  // INTRO CINEMÁTICA
  {
    type: 'intro',
    id: 'intro-1',
    duration: 4,
    title: 'VANEFLIX ORIGINAL',
    subtitle: 'Nuestra Historia de Amor',
    caption: 'Una película hecha exclusivamente para mi niña bonita, mi corazoncini de mecolotini ❤️',
    bg: '#000000'
  },

  // CAPÍTULO 1: EL COMIENZO
  {
    type: 'chapter',
    id: 'chap-1',
    duration: 3.5,
    title: 'Capítulo 1: El Comienzo',
    subtitle: 'Donde todo empezó a tener sentido',
    caption: 'Cuando el destino me puso frente a ti, preciosa',
    bg: '#141414'
  },
  {
    type: 'photo',
    id: 'sc-p1',
    duration: 4.5,
    effect: 'zoom-in',
    image: '/images/recuerdos_reales/recuerdo_1.jpg',
    caption: 'El día en que tu mirada lo cambió todo, mi niña bonita.'
  },
  {
    type: 'photo',
    id: 'sc-p2',
    duration: 4.5,
    effect: 'pan-left',
    image: '/images/recuerdos_reales/recuerdo_2.jpg',
    caption: 'Nuestras primeras sonrisas cómplices, amorcito.'
  },
  {
    type: 'photo',
    id: 'sc-p3',
    duration: 4.5,
    effect: 'zoom-out',
    image: '/images/recuerdos_reales/recuerdo_3.jpg',
    caption: 'Estar a tu lado se sintió como estar en casa desde el primer segundo, mi bonita.'
  },
  {
    type: 'photo',
    id: 'sc-p4',
    duration: 4.5,
    effect: 'pan-right',
    image: '/images/recuerdos_reales/recuerdo_4.jpg',
    caption: 'Caminando de la mano sin apuro, mi corazoncini de mecolotini.'
  },

  // VIDEO 1
  {
    type: 'video',
    id: 'sc-v1',
    video: '/videos/video_1.mp4',
    thumbnail: '/images/recuerdos_reales/recuerdo_1.jpg',
    title: 'Momento Especial #1',
    caption: '¡Qué guapa te ves aquí, mi niña bonita!',
    duration: 7,
    maxDuration: 7,
    startTime: 0,
    isTrimmed: true
  },

  // CAPÍTULO 2: RISAS Y COMPLICIDAD
  {
    type: 'chapter',
    id: 'chap-2',
    duration: 3.5,
    title: 'Capítulo 2: Pura Alegría',
    subtitle: 'Tu risa que ilumina mi vida entera',
    caption: 'Tus ocurrencias me hacen el hombre más feliz, amorcini',
    bg: '#141414'
  },
  {
    type: 'photo',
    id: 'sc-p5',
    duration: 4.5,
    effect: 'tilt-romantic',
    image: '/images/recuerdos_reales/recuerdo_5.jpg',
    caption: 'Esa carita hermosa que me alegra cualquier día gris, preciosa.'
  },
  {
    type: 'photo',
    id: 'sc-p6',
    duration: 4.5,
    effect: 'polaroid-pop',
    image: '/images/recuerdos_reales/recuerdo_6.jpg',
    caption: 'Tus abrazos son mi refugio favorito en todo el mundo, amorcito.'
  },
  {
    type: 'photo',
    id: 'sc-p7',
    duration: 4.5,
    effect: 'sparkle-flare',
    image: '/images/recuerdos_reales/recuerdo_7.jpg',
    caption: 'Nuestras bromas privadas que solo tú y yo entendemos, mi amorcini.'
  },
  {
    type: 'photo',
    id: 'sc-p8',
    duration: 4.5,
    effect: 'heart-vignette',
    image: '/images/recuerdos_reales/recuerdo_8.jpg',
    caption: 'Cada salida contigo se convierte en la mejor aventura, corazón de mecolotón.'
  },

  // VIDEO 2
  {
    type: 'video',
    id: 'sc-v2',
    video: '/videos/video_2.mp4',
    thumbnail: '/images/recuerdos_reales/recuerdo_2.jpg',
    title: 'Momento Especial #2',
    caption: 'Tus risas que guardaré por siempre en el corazón, mi bonita.',
    duration: 7,
    maxDuration: 7,
    startTime: 0,
    isTrimmed: true
  },

  // CAPÍTULO 3: DÍAS MÁGICOS
  {
    type: 'chapter',
    id: 'chap-3',
    duration: 3.5,
    title: 'Capítulo 3: Días Inolvidables',
    subtitle: 'Coleccionando recuerdos de oro',
    caption: 'Contigo cada fecha es especial, mi corazoncini',
    bg: '#141414'
  },
  {
    type: 'photo',
    id: 'sc-p9',
    duration: 4.5,
    effect: 'zoom-in',
    image: '/images/recuerdos_reales/recuerdo_9.jpg',
    caption: 'Tu energía y la nobleza de tu alma, mi niña bonita.'
  },
  {
    type: 'photo',
    id: 'sc-p10',
    duration: 4.5,
    effect: 'pan-left',
    image: '/images/recuerdos_reales/recuerdo_10.jpg',
    caption: 'Un día radiante a tu lado vale más que mil vidas, preciosa.'
  },
  {
    type: 'photo',
    id: 'sc-p11',
    duration: 4.5,
    effect: 'zoom-out',
    image: '/images/recuerdos_reales/recuerdo_11.jpg',
    caption: 'El mejor equipo de todos: siempre juntos apoyándonos, mi bonita.'
  },
  {
    type: 'photo',
    id: 'sc-p12',
    duration: 4.5,
    effect: 'pan-right',
    image: '/images/recuerdos_reales/recuerdo_12.jpg',
    caption: '¡Qué guapa eres! Nunca dejo de maravillarme contigo, amorcito.'
  },

  // VIDEO 3
  {
    type: 'video',
    id: 'sc-v3',
    video: '/videos/video_3.mp4',
    thumbnail: '/images/recuerdos_reales/recuerdo_3.jpg',
    title: 'Momento Especial #3',
    caption: 'Nuestros días mágicos juntos, mi amorcini.',
    duration: 7,
    maxDuration: 7,
    startTime: 0,
    isTrimmed: true
  },

  // CAPÍTULO 4: LA DULZURA DE ESTAR JUNTOS
  {
    type: 'chapter',
    id: 'chap-4',
    duration: 3.5,
    title: 'Capítulo 4: Conexión Única',
    subtitle: 'Dos corazones en un mismo latido',
    caption: 'La paz más hermosa a tu lado, mi corazón de mecolotón',
    bg: '#141414'
  },
  {
    type: 'photo',
    id: 'sc-p13',
    duration: 4.5,
    effect: 'tilt-romantic',
    image: '/images/recuerdos_reales/recuerdo_13.jpg',
    caption: 'La calma profunda que me das con solo mirarme, mi corazoncini de mecolotini.'
  },
  {
    type: 'photo',
    id: 'sc-p14',
    duration: 4.5,
    effect: 'polaroid-pop',
    image: '/images/recuerdos_reales/recuerdo_14.jpg',
    caption: 'Momentos espontáneos llenos de cariño sincero, mi niña bonita.'
  },
  {
    type: 'photo',
    id: 'sc-p15',
    duration: 4.5,
    effect: 'sparkle-flare',
    image: '/images/recuerdos_reales/recuerdo_15.jpg',
    caption: 'Paseando de la mano bajo el sol, preciosa mía.'
  },
  {
    type: 'photo',
    id: 'sc-p16',
    duration: 4.5,
    effect: 'heart-vignette',
    image: '/images/recuerdos_reales/recuerdo_16.jpg',
    caption: 'Cada gesto tuyo me enamora una y otra vez, amorcito.'
  },

  // VIDEO 4
  {
    type: 'video',
    id: 'sc-v4',
    video: '/videos/video_4.mp4',
    thumbnail: '/images/recuerdos_reales/recuerdo_4.jpg',
    title: 'Momento Especial #4',
    caption: 'Nuestra dulce complicidad, mi amorcini.',
    duration: 7,
    maxDuration: 7,
    startTime: 0,
    isTrimmed: true
  },

  // CAPÍTULO 5: NUESTRO CAMINO
  {
    type: 'chapter',
    id: 'chap-5',
    duration: 3.5,
    title: 'Capítulo 5: Creciendo Juntos',
    subtitle: 'Construyendo un amor real y fuerte',
    caption: 'Paso a paso de la mano, mi bonita',
    bg: '#141414'
  },
  {
    type: 'photo',
    id: 'sc-p17',
    duration: 4.5,
    effect: 'zoom-in',
    image: '/images/recuerdos_reales/recuerdo_17.jpg',
    caption: 'Tus cariñitos y tu ternura infinita, mi corazón de mecolotón.'
  },
  {
    type: 'photo',
    id: 'sc-p18',
    duration: 4.5,
    effect: 'pan-left',
    image: '/images/recuerdos_reales/recuerdo_18.jpg',
    caption: 'Celebrando el presente y soñando con el futuro, preciosa.'
  },
  {
    type: 'photo',
    id: 'sc-p19',
    duration: 4.5,
    effect: 'zoom-out',
    image: '/images/recuerdos_reales/recuerdo_19.jpg',
    caption: 'Cualquier camino es perfecto si vas conmigo, mi niña bonita.'
  },
  {
    type: 'photo',
    id: 'sc-p20',
    duration: 4.5,
    effect: 'pan-right',
    image: '/images/recuerdos_reales/recuerdo_20.jpg',
    caption: '¡Qué guapa! Eres la mujer de mis sueños, amorcito.'
  },

  // VIDEO 5
  {
    type: 'video',
    id: 'sc-v5',
    video: '/videos/video_5.mp4',
    thumbnail: '/images/recuerdos_reales/recuerdo_5.jpg',
    title: 'Momento Especial #5',
    caption: 'Nuestra historia en marcha, mi corazoncini.',
    duration: 7,
    maxDuration: 7,
    startTime: 0,
    isTrimmed: true
  },

  // CAPÍTULO 6: MI PERSONA FAVORITA
  {
    type: 'chapter',
    id: 'chap-6',
    duration: 3.5,
    title: 'Capítulo 6: Mi Persona Favorita',
    subtitle: 'Por hoy, por mañana y por siempre',
    caption: 'Tú eres y serás siempre mi todo, amorcini',
    bg: '#141414'
  },
  {
    type: 'photo',
    id: 'sc-p21',
    duration: 4.5,
    effect: 'tilt-romantic',
    image: '/images/recuerdos_reales/recuerdo_21.jpg',
    caption: 'Eres el regalo más bonito que Dios me dio, mi bonita.'
  },
  {
    type: 'photo',
    id: 'sc-p22',
    duration: 4.5,
    effect: 'polaroid-pop',
    image: '/images/recuerdos_reales/recuerdo_22.jpg',
    caption: 'Tu luz que guía mis días en todo momento, mi corazoncini de mecolotini.'
  },
  {
    type: 'photo',
    id: 'sc-p23',
    duration: 4.5,
    effect: 'sparkle-flare',
    image: '/images/recuerdos_reales/recuerdo_23.jpg',
    caption: 'Esa sonrisa que me hipnotiza y me llena de paz, preciosa.'
  },
  {
    type: 'photo',
    id: 'sc-p24',
    duration: 4.5,
    effect: 'heart-vignette',
    image: '/images/recuerdos_reales/recuerdo_24.jpg',
    caption: 'Acurrucarme contigo y saber que todo está bien, amorcito.'
  },

  // VIDEO 6
  {
    type: 'video',
    id: 'sc-v6',
    video: '/videos/video_6.mp4',
    thumbnail: '/images/recuerdos_reales/recuerdo_6.jpg',
    title: 'Momento Especial #6',
    caption: 'El brillo inconfundible de tus ojitos hermosos, mi niña bonita.',
    duration: 7,
    maxDuration: 7,
    startTime: 0,
    isTrimmed: true
  },

  // CAPÍTULO 7: EL FUTURO
  {
    type: 'chapter',
    id: 'chap-7',
    duration: 3.5,
    title: 'Capítulo 7: Lo Que Viene',
    subtitle: 'Toda una vida para seguir amándote',
    caption: 'Nuestra historia apenas comienza, corazón de mecolotón',
    bg: '#141414'
  },
  {
    type: 'photo',
    id: 'sc-p25',
    duration: 4.5,
    effect: 'zoom-in',
    image: '/images/recuerdos_reales/recuerdo_25.jpg',
    caption: 'Memorias que no se borrarán jamás de mi alma, mi amorcini.'
  },
  {
    type: 'photo',
    id: 'sc-p26',
    duration: 4.5,
    effect: 'pan-left',
    image: '/images/recuerdos_reales/recuerdo_26.jpg',
    caption: 'Un abrazo infinito que trasciende cualquier tiempo, preciosa.'
  },
  {
    type: 'photo',
    id: 'sc-p27',
    duration: 4.5,
    effect: 'zoom-out',
    image: '/images/recuerdos_reales/recuerdo_27.jpg',
    caption: 'Juntos al fin del mundo, de la mano, mi niña bonita.'
  },
  {
    type: 'photo',
    id: 'sc-p28',
    duration: 4.5,
    effect: 'pan-right',
    image: '/images/recuerdos_reales/recuerdo_28.jpg',
    caption: '¡Qué guapa te ves riéndote! Te amo con locura, mi bonita.'
  },
  {
    type: 'photo',
    id: 'sc-p29',
    duration: 4.5,
    effect: 'tilt-romantic',
    image: '/images/recuerdos_reales/recuerdo_29.jpg',
    caption: 'Mis sueños son más hermosos porque estás en ellos, amorcito.'
  },
  {
    type: 'photo',
    id: 'sc-p30',
    duration: 4.5,
    effect: 'polaroid-pop',
    image: '/images/recuerdos_reales/recuerdo_30.jpg',
    caption: 'Un amor honesto, puro y eterno, mi corazoncini de mecolotini.'
  },
  {
    type: 'photo',
    id: 'sc-p31',
    duration: 4.5,
    effect: 'sparkle-flare',
    image: '/images/recuerdos_reales/recuerdo_31.jpg',
    caption: 'Ver el brillo en tus ojos y saber que eres tú la indicada, mi amorcini.'
  },
  {
    type: 'photo',
    id: 'sc-p32',
    duration: 4.5,
    effect: 'heart-vignette',
    image: '/images/recuerdos_reales/recuerdo_32.jpg',
    caption: 'Instantes mágicos de nuestra historia de amor, preciosa.'
  },
  {
    type: 'photo',
    id: 'sc-p33',
    duration: 4.5,
    effect: 'zoom-in',
    image: '/images/recuerdos_reales/recuerdo_33.jpg',
    caption: 'Por siempre y para siempre, tú y yo, mi corazón de mecolotón.'
  },

  // VIDEO 7
  {
    type: 'video',
    id: 'sc-v7',
    video: '/videos/video_7.mp4',
    thumbnail: '/images/recuerdos_reales/recuerdo_7.jpg',
    title: 'Momento Especial #7',
    caption: 'Para toda la vida... Feliz cumpleaños, mi niña bonita ❤️',
    duration: 7,
    maxDuration: 7,
    startTime: 0,
    isTrimmed: true
  },

  {
    type: 'photo',
    id: 'sc-p34',
    duration: 4.5,
    effect: 'pan-left',
    image: '/images/recuerdos_reales/recuerdo_34.jpg',
    caption: '¡Qué guapa estás, mi amorcito! Nuestro momento más fresco y especial juntos.'
  },

  // VIDEO 8
  {
    type: 'video',
    id: 'sc-v8',
    video: '/videos/video_8.mp4',
    thumbnail: '/images/recuerdos_reales/recuerdo_34.jpg',
    title: 'Momento Especial #8',
    caption: 'Tú y yo por siempre, mi corazoncini de mecolotini ❤️',
    duration: 7,
    maxDuration: 7,
    startTime: 0,
    isTrimmed: true
  },

  // OUTRO / DEDICATORIA FINAL
  {
    type: 'outro',
    id: 'outro-1',
    duration: 6,
    title: '¡FELIZ CUMPLEAÑOS, MI NIÑA BONITA! ❤️',
    subtitle: 'Felices 24 años (06/10/2002) • Gracias por formar parte de mi historia, preciosa.',
    caption: 'Te amo con todo mi corazón, mi corazoncini de mecolotini. Continuará...',
    bg: '#000000'
  }
];
