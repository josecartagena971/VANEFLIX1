/**
 * ==============================================================================
 * ARCHIVO DE DATOS CENTRAL - VANEFLIX
 * ==============================================================================
 * Con frases naturales, cariñosas y personalizadas:
 * "mi niña bonita", "preciosa", "mi corazoncini de mecolotini", "mi bonita",
 * "¡qué guapa!", "amorcito", "amorcini", "corazón de mecolotón".
 * ==============================================================================
 */

export const siteConfig = {
  platformName: "VANEFLIX",
  platformBadge: "ORIGINAL",
  partnerName: "Vane (Mi niña bonita)",
  userGreeting: "¿Quién está viendo hoy, amorcito?",
  
  // FECHA DE NACIMIENTO Y CUMPLEAÑOS DE VANE (06/10/2002)
  birthDate: "2002-10-06",
  birthDateFormatted: "06 de Octubre de 2002",
  birthDay: 6,
  birthMonth: 10,
  birthYear: 2002,
  birthdayDate: "2026-10-06T00:00:00",
  currentAge: 24,

  backgroundMusic: "/music/cancion_happy_together.mp3",
  musicTitle: "Happy Together",
  musicArtist: "The Turtles ❤️",
};

export const musicPlaylist = [
  {
    id: "song-0",
    title: "Happy Together",
    artist: "The Turtles",
    src: "/music/cancion_happy_together.mp3",
    startTime: 0, // Canción principal: completa sin cortes desde el inicio (0:00) al final
    movieStartTime: 38, // Coro para el montaje cinematográfico
    subtitle: "Canción Principal • Completa sin cortes",
    isMainSong: true
  },
  {
    id: "song-1",
    title: "I Get To Love You",
    subtitle: "Nuestra Canción ❤️",
    artist: "Ruelle",
    src: "/music/cancion_i_get_to_love_you.mp3",
    startTime: 45, // Coro romántico ("I get to love you, it's the best thing...")
    isOurSong: true
  },
  {
    id: "song-2",
    title: "Photograph",
    artist: "Ed Sheeran",
    src: "/music/cancion_photograph.mp3",
    startTime: 65 // Coro emotivo ("So you can keep me inside the pocket...")
  },
  {
    id: "song-3",
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    src: "/music/cancion_just_the_way_you_are.mp3",
    startTime: 48 // Coro apasionado ("When I see your face, there's not a thing that I would change...")
  },
  {
    id: "song-4",
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    src: "/music/cancion_i_wanna_be_yours.mp3",
    startTime: 34 // Sin intro de diálogo, directo a la voz y ritmo envolvente
  }
];

export const profiles = [
  {
    id: "vane",
    name: "Vane ❤️ (Mi Niña Bonita)",
    subtitle: "Cumpleañera VIP • 06/10/2002 (24 Años)",
    avatar: "/images/recuerdos_reales/recuerdo_1.jpg",
    isPrimary: true,
    accentColor: "#E50914"
  },
  {
    id: "favorite",
    name: "Mi Persona Favorita 💝",
    subtitle: "Preciosa, mi corazoncini de mecolotini",
    avatar: "/images/recuerdos_reales/recuerdo_2.jpg",
    isPrimary: false,
    accentColor: "#FF2E63"
  }
];

export const heroContent = {
  id: "hero-birthday-special",
  title: "Feliz cumpleaños, mi niña bonita ❤️",
  subtitle: "PRODUCCIÓN ORIGINAL • NACIDA EL 06/10/2002 (24 AÑOS)",
  tagline: "¡Qué guapa estás hoy en tus 24 años, mi amorcito!",
  description: "Hoy 06 de Octubre celebramos los 24 años de la persona más especial de mi universo. Todo este espacio fue creado exclusivamente para ti, mi bonita. Naciste el 06 de Octubre de 2002 para iluminar al mundo y llenar mis días de amor, risas y felicidad, mi amorcini, mi corazón de mecolotón.",
  image: "/images/recuerdos_reales/recuerdo_3.jpg",
  video: "/videos/video_1.mp4",
  matchScore: "100% Amor Puro",
  rating: "🎂 24 Años (06/10/2002)",
  duration: "Para Siempre",
  quality: "Ultra HD 4K",
  category: "Especial de cumpleaños",
  year: "2002 - 2026",
  tags: ["06 de Octubre de 2002", "24 Años", "Mi Niña Bonita", "Preciosa", "Amorcito", "Corazoncini de Mecolotini", "Nuestra Historia"],
  soundtrack: "Latidos de nuestro corazón",
  director: "Tu novio que te ama con locura"
};

export const contentRows = [
  {
    id: "row-birthday",
    title: "🎂 Especial de cumpleaños para mi niña bonita",
    description: "Contenido dedicado exclusivamente al día de mi corazoncini de mecolotini",
    items: [
      {
        id: "bd-1",
        title: "06 de Octubre de 2002: Nace mi niña bonita",
        category: "Especial de cumpleaños",
        categoryBadge: "🎂 06/10 • 24 Años",
        introType: "birthday",
        videoIndex: 0,
        musicIndex: 0,
        duration: "24 Años",
        year: "06/10/2002",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_4.jpg",
        video: "/videos/video_1.mp4",
        description: "El 06 de Octubre de 2002 nació la persona más hermosa del mundo. Hoy celebro tus 24 vueltas al sol, preciosa.",
        fullText: "Mi niña bonita: un 06 de Octubre de 2002 llegaste a este mundo para llenarlo de luz. Hoy, al cumplir tus 24 años, quiero desearte toda la felicidad del universo, salud, sueños cumplidos y millones de momentos mágicos a mi lado. ¡Felices 24 años, mi corazoncini de mecolotini!",
        tags: ["06/10/2002", "24 Años", "Cumpleaños", "Mi Bonita", "Amorcito"]
      },
      {
        id: "bd-2",
        title: "10 razones por las que amo a mi amorcito",
        category: "Especial de cumpleaños",
        categoryBadge: "💌 10 Razones de Amor",
        introType: "romantic",
        videoIndex: 1,
        musicIndex: 1,
        duration: "10 Razones",
        year: "2026",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_5.jpg",
        video: "/videos/video_2.mp4",
        description: "Una pequeña muestra de los millones de motivos por los que cada día me vuelvo a enamorar de ti, mi amorcini.",
        fullText: "Desde cómo sonríes hasta tu manera de transformar un día gris en el más brillante. Descubre cada motivo en la sección interactiva, mi corazoncini de mecolotini.",
        tags: ["Razones", "Amorcini", "Detalles"]
      },
      {
        id: "bd-3",
        title: "Lo que deseo para ti, preciosa",
        category: "Especial de cumpleaños",
        categoryBadge: "✨ Mis Deseos",
        introType: "birthday",
        videoIndex: 2,
        musicIndex: 2,
        duration: "Todo el año",
        year: "2026",
        match: "99%",
        image: "/images/recuerdos_reales/recuerdo_6.jpg",
        video: "/videos/video_3.mp4",
        description: "Que nunca te falte una sonrisa, mi bonita. Te mereces el mundo entero y más.",
        fullText: "Te deseo paz mental, viajes inolvidables, risas que duelan el estómago y la certeza de que siempre tendrás mi mano para sostenerte, mi corazón de mecolotón.",
        tags: ["Deseos", "Preciosa", "Metas"]
      },
      {
        id: "bd-4",
        title: "Un mensaje especial para mi amorcini",
        category: "Especial de cumpleaños",
        categoryBadge: "❤️ Mensaje del Corazón",
        introType: "romantic",
        videoIndex: 3,
        musicIndex: 3,
        duration: "3 min",
        year: "2026",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_7.jpg",
        video: "/videos/video_4.mp4",
        description: "Palabras sinceras que salen de lo más profundo de mi pecho para ti en tu día, amorcito.",
        fullText: "No hay palabras suficientes para expresar lo mucho que significas para mí, mi niña bonita. Eres mi hogar, mi paz y mi alegría favorita en todo el planeta.",
        tags: ["Mensaje", "Amorcini", "Corazón"]
      },
      {
        id: "bd-5",
        title: "Nuestra próxima aventura, mi corazón de mecolotón",
        category: "Especial de cumpleaños",
        categoryBadge: "✈️ Próxima Aventura",
        introType: "cinematic",
        videoIndex: 4,
        musicIndex: 0,
        duration: "Próximamente",
        year: "2026+",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_8.jpg",
        video: "/videos/video_5.mp4",
        description: "El regalo continúa: salidas y recuerdos que viviremos juntos muy pronto, preciosa.",
        fullText: "Este cumpleaños apenas empieza, mi niña bonita. Prepárate para lo que viene, porque lo mejor de nuestra historia aún se está escribiendo.",
        tags: ["Sorpresa", "Viajes", "Aventura"]
      }
    ]
  },
  {
    id: "row-special",
    title: "❤️ Porque eres única, preciosa",
    description: "Cada detalle tuyo que me vuelve loco de amor por ti",
    items: [
      {
        id: "sp-1",
        title: "Tu sonrisa, mi bonita",
        category: "Porque eres especial",
        categoryBadge: "✨ Tu Sonrisa",
        introType: "romantic",
        videoIndex: 5,
        musicIndex: 1,
        duration: "Instantáneo",
        year: "Favorito",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_9.jpg",
        video: "/videos/video_6.mp4",
        description: "Esa sonrisa hermosa que ilumina cualquier lugar al que entras. ¡Qué guapa te ves cuando sonríes, amorcito!",
        tags: ["Sonrisa", "Qué Guapa", "Mi Bonita"]
      },
      {
        id: "sp-2",
        title: "Tus ojitos hermosos",
        category: "Porque eres especial",
        categoryBadge: "👀 Tus Ojitos",
        introType: "romantic",
        videoIndex: 6,
        musicIndex: 2,
        duration: "Inolvidable",
        year: "Siempre",
        match: "99%",
        image: "/images/recuerdos_reales/recuerdo_10.jpg",
        video: "/videos/video_7.mp4",
        description: "El brillo en tu mirada cuando te emocionas. Me derrites el alma, mi corazoncini de mecolotini.",
        tags: ["Mirada", "Preciosa", "Profundo"]
      },
      {
        id: "sp-3",
        title: "Tu forma de ser, amorcini",
        category: "Porque eres especial",
        categoryBadge: "👑 Tu Esencia",
        introType: "cinematic",
        videoIndex: 7,
        musicIndex: 3,
        duration: "Única",
        year: "Siempre",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_11.jpg",
        video: "/videos/video_8.mp4",
        description: "Esa mezcla perfecta de ternura, fuerza y dulzura que te hace inigualable, mi niña bonita.",
        tags: ["Esencia", "Amorcini", "Ternura"]
      },
      {
        id: "sp-4",
        title: "Tus locuras que me encantan",
        category: "Porque eres especial",
        categoryBadge: "😂 Ocurrencias",
        introType: "birthday",
        videoIndex: 0,
        musicIndex: 0,
        duration: "Divertido",
        year: "Top 1",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_12.jpg",
        video: "/videos/video_1.mp4",
        description: "Tus ocurrencias espontáneas, tus bailes raros y cómo logras hacerme reír sin intentarlo, amorcito.",
        tags: ["Risas", "Ocurrencias", "Amorcito"]
      },
      {
        id: "sp-5",
        title: "Tus abrazos, mi refugio",
        category: "Porque eres especial",
        categoryBadge: "🫂 Tus Abrazos",
        introType: "memories",
        videoIndex: 1,
        musicIndex: 1,
        duration: "Infinito",
        year: "Diario",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_13.jpg",
        video: "/videos/video_2.mp4",
        description: "El mejor lugar del mundo. Un segundo en tus brazos, mi corazón de mecolotón, borra todo lo malo.",
        tags: ["Abrazos", "Refugio", "Calidez"]
      },
      {
        id: "sp-6",
        title: "Cómo me haces feliz, preciosa",
        category: "Porque eres especial",
        categoryBadge: "💖 Mi Alegría",
        introType: "romantic",
        videoIndex: 2,
        musicIndex: 2,
        duration: "24/7",
        year: "Para Siempre",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_14.jpg",
        video: "/videos/video_3.mp4",
        description: "Solo con estar a mi lado logras que mi vida sea infinitamente más bonita, mi niña bonita.",
        tags: ["Felicidad", "Mi Niña Bonita", "Amor"]
      }
    ]
  },
  {
    id: "row-memories",
    title: "📸 Nuestros recuerdos, amorcito",
    description: "Instantes congelados en el tiempo que guardo en mi corazón",
    items: [
      {
        id: "mem-1",
        title: "Nuestro primer recuerdo juntos",
        category: "Nuestros recuerdos",
        categoryBadge: "📸 1er Recuerdo",
        introType: "memories",
        videoIndex: 3,
        musicIndex: 3,
        duration: "Capítulo 1",
        year: "Inicio",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_15.jpg",
        video: "/videos/video_4.mp4",
        description: "Los nervios de ese día y la certeza inmediata de que serías mi persona favorita, mi bonita.",
        fullText: "Recuerdo cada detalle de ese día. El tiempo voló y yo solo podía pensar en lo hermosa que eres, mi corazoncini de mecolotini.",
        tags: ["Primer recuerdo", "Inicio", "Mi Bonita"]
      },
      {
        id: "mem-2",
        title: "Momentos juntos, amorcini",
        category: "Nuestros recuerdos",
        categoryBadge: "☕ Tardes Juntos",
        introType: "memories",
        videoIndex: 4,
        musicIndex: 0,
        duration: "Incontable",
        year: "Colección",
        match: "98%",
        image: "/images/recuerdos_reales/recuerdo_16.jpg",
        video: "/videos/video_5.mp4",
        description: "Tardes sin hacer nada en particular, solo disfrutando de abrazarte, preciosa.",
        tags: ["Complicidad", "Tiempo Juntos", "Amorcini"]
      },
      {
        id: "mem-3",
        title: "Días especiales con mi niña bonita",
        category: "Nuestros recuerdos",
        categoryBadge: "🌟 Días Mágicos",
        introType: "birthday",
        videoIndex: 5,
        musicIndex: 1,
        duration: "Épico",
        year: "Especial",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_17.jpg",
        video: "/videos/video_6.mp4",
        description: "Fechas que quedaron grabadas para siempre en mi memoria, ¡qué guapa te veías!",
        tags: ["Qué Guapa", "Mi Niña Bonita", "Magia"]
      },
      {
        id: "mem-4",
        title: "Nuestras aventuras, amorcito",
        category: "Nuestros recuerdos",
        categoryBadge: "🗺️ Rutas & Risas",
        introType: "cinematic",
        videoIndex: 6,
        musicIndex: 2,
        duration: "Emocionante",
        year: "Aventura",
        match: "96%",
        image: "/images/recuerdos_reales/recuerdo_18.jpg",
        video: "/videos/video_7.mp4",
        description: "Caminar sin rumbo y convertir cada tropiezo en una carcajada contigo, mi corazón de mecolotón.",
        tags: ["Ruta", "Aventura", "Amorcito"]
      },
      {
        id: "mem-5",
        title: "Viajes de la mano, preciosa",
        category: "Nuestros recuerdos",
        categoryBadge: "🚆 Viajes Juntos",
        introType: "memories",
        videoIndex: 7,
        musicIndex: 3,
        duration: "Memorias",
        year: "Ruta",
        match: "99%",
        image: "/images/recuerdos_reales/recuerdo_19.jpg",
        video: "/videos/video_8.mp4",
        description: "Nuevos paisajes, pero lo más hermoso frente a mí siempre has sido tú, mi bonita.",
        tags: ["Viaje", "Preciosa", "Mundo"]
      },
      {
        id: "mem-6",
        title: "Celebraciones con mi corazoncini",
        category: "Nuestros recuerdos",
        categoryBadge: "🥂 Nuestros Brindis",
        introType: "romantic",
        videoIndex: 0,
        musicIndex: 0,
        duration: "Fiesta",
        year: "Brindis",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_20.jpg",
        video: "/videos/video_1.mp4",
        description: "Brindar por nuestros triunfos y por todo el amor que nos tenemos, amorcini.",
        tags: ["Festejo", "Corazoncini", "Triunfo"]
      }
    ]
  },
  {
    id: "row-history",
    title: "🎬 Nuestra historia, mi niña bonita",
    description: "La mejor serie de amor jamás contada, episodio tras episodio",
    items: [
      {
        id: "ep-1",
        title: "Episodio 1: Cómo conocí a mi niña bonita",
        category: "Nuestra historia",
        categoryBadge: "🎬 Cap 1: El Origen",
        introType: "cinematic",
        videoIndex: 1,
        musicIndex: 1,
        duration: "El origen",
        year: "Temp 1",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_21.jpg",
        video: "/videos/video_2.mp4",
        description: "El día en que el destino me cruzó con la mujer de mi vida.",
        fullText: "Bastaron unas palabras para que todo cobrara sentido. Desde ese día supe que serías mi amorcito para siempre.",
        tags: ["Destino", "Mi Niña Bonita", "Inicio"]
      },
      {
        id: "ep-2",
        title: "Episodio 2: Cuando todo empezó, amorcito",
        category: "Nuestra historia",
        categoryBadge: "🎬 Cap 2: La Chispa",
        introType: "romantic",
        videoIndex: 2,
        musicIndex: 2,
        duration: "La chispa",
        year: "Temp 1",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_22.jpg",
        video: "/videos/video_3.mp4",
        description: "Mensajes hasta la madrugada, mariposas en el estómago y las primeras sonrisas, mi bonita.",
        tags: ["Inicio", "Chispa", "Amorcito"]
      },
      {
        id: "ep-3",
        title: "Episodio 3: Primeras salidas, preciosa",
        category: "Nuestra historia",
        categoryBadge: "🎬 Cap 3: Salidas",
        introType: "cinematic",
        videoIndex: 3,
        musicIndex: 3,
        duration: "Explorando",
        year: "Temp 2",
        match: "98%",
        image: "/images/recuerdos_reales/recuerdo_23.jpg",
        video: "/videos/video_4.mp4",
        description: "Nuestras primeras citas, comida rica y descubrir lo divertida que eres, mi amorcini.",
        tags: ["Citas", "Preciosa", "Amorcini"]
      },
      {
        id: "ep-4",
        title: "Episodio 4: Momentos inolvidables con mi corazoncini",
        category: "Nuestra historia",
        categoryBadge: "🎬 Cap 4: Magia Pura",
        introType: "memories",
        videoIndex: 4,
        musicIndex: 0,
        duration: "Emociones",
        year: "Temp 2",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_24.jpg",
        video: "/videos/video_5.mp4",
        description: "Esos instantes donde el tiempo se detuvo y supimos que éramos el uno para el otro.",
        tags: ["Amor", "Corazoncini", "Inolvidable"]
      },
      {
        id: "ep-5",
        title: "Episodio 5: Lo que hemos vivido, mi corazón de mecolotón",
        category: "Nuestra historia",
        categoryBadge: "🎬 Cap 5: Vivencias",
        introType: "cinematic",
        videoIndex: 5,
        musicIndex: 1,
        duration: "Crecimiento",
        year: "Temp 3",
        match: "99%",
        image: "/images/recuerdos_reales/recuerdo_25.jpg",
        video: "/videos/video_6.mp4",
        description: "Todo el camino recorrido, el respeto mutuo y cómo construimos este amor día con día.",
        tags: ["Crecimiento", "Equipo", "Madurez"]
      },
      {
        id: "ep-6",
        title: "Episodio 6: Lo que viene para nosotros dos",
        category: "Nuestra historia",
        categoryBadge: "🎬 Cap 6: Futuro",
        introType: "romantic",
        videoIndex: 6,
        musicIndex: 2,
        duration: "Próximamente",
        year: "Para Siempre",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_26.jpg",
        video: "/videos/video_7.mp4",
        description: "Un futuro brillante, miles de metas y toda una vida para seguir amándote, mi bonita.",
        tags: ["Futuro", "Promesa", "Eterno"]
      }
    ]
  },
  {
    id: "row-favorites",
    title: "💕 Momentos favoritos con mi amorcini",
    description: "Nuestras pequeñas tradiciones y recuerdos dorados",
    items: [
      {
        id: "fav-1",
        title: "Nuestro momento más lindo y reciente, amorcito",
        category: "Momentos favoritos",
        categoryBadge: "💝 Más Especial",
        introType: "romantic",
        videoIndex: 7,
        musicIndex: 3,
        duration: "Inolvidable",
        year: "Favorito",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_34.jpg",
        video: "/videos/video_8.mp4",
        description: "Un recuerdo fresco, lleno de amor y complicidad. ¡Qué guapa eres, mi niña bonita!",
        tags: ["Momento Nuevo", "Amorcito", "Calidez"]
      },
      {
        id: "fav-2",
        title: "Esa risa incontrolable, ¡qué guapa!",
        category: "Momentos favoritos",
        categoryBadge: "😂 Carcajadas",
        introType: "birthday",
        videoIndex: 2,
        musicIndex: 2,
        duration: "Pura alegría",
        year: "Siempre",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_28.jpg",
        video: "/videos/video_3.mp4",
        description: "Cuando nos reímos de cualquier tontería hasta que nos duele la panza, preciosa.",
        tags: ["Carcajadas", "Qué Guapa", "Alegría"]
      },
      {
        id: "fav-3",
        title: "Caminatas sin rumbo, mi bonita",
        category: "Momentos favoritos",
        categoryBadge: "🚶 Caminatas",
        introType: "memories",
        videoIndex: 4,
        musicIndex: 0,
        duration: "Tranquilidad",
        year: "Recuerdos",
        match: "97%",
        image: "/images/recuerdos_reales/recuerdo_29.jpg",
        video: "/videos/video_5.mp4",
        description: "Caminar tomados de la mano sintiendo paz absoluta contigo, mi amorcini.",
        tags: ["Caminata", "Manos", "Paz"]
      },
      {
        id: "fav-4",
        title: "El abrazo que curó un mal día, mi corazoncini",
        category: "Momentos favoritos",
        categoryBadge: "🫂 Tu Abrazo",
        introType: "romantic",
        videoIndex: 5,
        musicIndex: 1,
        duration: "Mágico",
        year: "Tesoro",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_30.jpg",
        video: "/videos/video_6.mp4",
        description: "Llegar cansado y sentir que en tus brazos todo vuelve a tener paz, mi niña bonita.",
        tags: ["Apoyo", "Sanación", "Cariño"]
      },
      {
        id: "fav-5",
        title: "Nuestros sueños compartidos, corazón de mecolotón",
        category: "Momentos favoritos",
        categoryBadge: "⭐ Nuestros Sueños",
        introType: "cinematic",
        videoIndex: 6,
        musicIndex: 2,
        duration: "Eterno",
        year: "Metas",
        match: "100%",
        image: "/images/recuerdos_reales/recuerdo_31.jpg",
        video: "/videos/video_7.mp4",
        description: "Imaginarnos el futuro juntos y trabajar de la mano por él, mi preciosa.",
        tags: ["Futuro", "Metas", "Equipo"]
      }
    ]
  }
];

// FOTOS DE LA GALERÍA (33 FOTOS REALES CON DESCRIPCIONES CARIÑOSAS)
export const galleryPhotos = [
  { id: "g-1", title: "Mi niña bonita hermosa", category: "Primeras Citas", date: "Comienzo de todo", image: "/images/recuerdos_reales/recuerdo_1.jpg", description: "Una mirada que lo decía todo. ¡Qué guapa estás, mi amorcito!" },
  { id: "g-2", title: "Sonrisas cómplices, preciosa", category: "Risas", date: "Tarde de risas", image: "/images/recuerdos_reales/recuerdo_2.jpg", description: "El instante en que me contagiaste tu risa, mi corazoncini de mecolotini." },
  { id: "g-3", title: "Momento mágico con mi bonita", category: "Especiales", date: "Día inolvidable", image: "/images/recuerdos_reales/recuerdo_3.jpg", description: "Contemplando el camino y sintiendo que contigo lo tengo todo, amorcini." },
  { id: "g-4", title: "Juntos siempre, amorcito", category: "Primeras Citas", date: "Caminata de amor", image: "/images/recuerdos_reales/recuerdo_4.jpg", description: "Caminando de la mano sin que importe el tiempo, mi corazón de mecolotón." },
  { id: "g-5", title: "¡Qué guapa te ves!", category: "Especiales", date: "Retrato favorito", image: "/images/recuerdos_reales/recuerdo_5.jpg", description: "Esos ojitos brillantes que iluminan cada uno de mis días, mi niña bonita." },
  { id: "g-6", title: "Abrazo que da vida, preciosa", category: "Primeras Citas", date: "Refugio de amor", image: "/images/recuerdos_reales/recuerdo_6.jpg", description: "Sentir tus brazos y saber que no hay lugar más seguro en la tierra." },
  { id: "g-7", title: "Complicidad pura, mi amorcini", category: "Risas", date: "Nuestra anécdota", image: "/images/recuerdos_reales/recuerdo_7.jpg", description: "Solo tú y yo entendemos nuestras bromas y caras raras, mi bonita." },
  { id: "g-8", title: "Tarde perfecta, corazón de mecolotón", category: "Viajes", date: "Paseo especial", image: "/images/recuerdos_reales/recuerdo_8.jpg", description: "Descubriendo nuevos rincones pero enfocados en nosotros dos, amorcito." },
  { id: "g-9", title: "Alegría incondicional, mi corazoncini", category: "Risas", date: "Felicidad total", image: "/images/recuerdos_reales/recuerdo_9.jpg", description: "Tu risa que llena de luz cualquier habitación, preciosa mía." },
  { id: "g-10", title: "Día radiante con mi niña bonita", category: "Especiales", date: "Bajo el sol", image: "/images/recuerdos_reales/recuerdo_10.jpg", description: "Un día tan brillante y dulce como tú, mi amorcini." },
  { id: "g-11", title: "El mejor equipo del mundo", category: "Viajes", date: "Aventura juntos", image: "/images/recuerdos_reales/recuerdo_11.jpg", description: "Apoyándonos el uno al otro en cada paso, mi bonita." },
  { id: "g-12", title: "Instante inolvidable, amorcito", category: "Especiales", date: "Memoria de oro", image: "/images/recuerdos_reales/recuerdo_12.jpg", description: "Una foto que siempre me arranca un suspiro, ¡qué guapa eres!" },
  { id: "g-13", title: "Cerca de ti, mi corazoncini", category: "Primeras Citas", date: "Nuestra conexión", image: "/images/recuerdos_reales/recuerdo_13.jpg", description: "La cercanía que hace palpitar mi corazón más rápido, corazón de mecolotón." },
  { id: "g-14", title: "Dulces recuerdos, preciosa", category: "Risas", date: "Risas compartidas", image: "/images/recuerdos_reales/recuerdo_14.jpg", description: "Momentos espontáneos que valen oro puro con mi niña bonita." },
  { id: "g-15", title: "Viaje de ensueño con mi bonita", category: "Viajes", date: "Ruta de amor", image: "/images/recuerdos_reales/recuerdo_15.jpg", description: "Explorando y coleccionando memorias de la mano, amorcini." },
  { id: "g-16", title: "Mirada única, amorcito", category: "Especiales", date: "Detalle hermoso", image: "/images/recuerdos_reales/recuerdo_16.jpg", description: "Ese gesto tuyo tan característico y tierno que me vuelve loco, preciosa." },
  { id: "g-17", title: "Pura ternura, mi niña bonita", category: "Primeras Citas", date: "Día tranquilo", image: "/images/recuerdos_reales/recuerdo_17.jpg", description: "La suavidad y paz que me transmites al estar a tu lado, mi corazoncini." },
  { id: "g-18", title: "Celebrando la vida juntos", category: "Especiales", date: "Festejo de amor", image: "/images/recuerdos_reales/recuerdo_18.jpg", description: "Brindando por ti, mi corazón de mecolotón, hoy y siempre." },
  { id: "g-19", title: "Caminos compartidos, mi bonita", category: "Viajes", date: "Aventuras", image: "/images/recuerdos_reales/recuerdo_19.jpg", description: "Cualquier camino se vuelve hermoso si es a tu lado, amorcito." },
  { id: "g-20", title: "Nuestra magia, amorcini", category: "Risas", date: "Día divertido", image: "/images/recuerdos_reales/recuerdo_20.jpg", description: "Diversión genuina, ¡qué guapa te ves cuando te ríes a carcajadas!" },
  { id: "g-21", title: "Mi persona favorita en el universo", category: "Especiales", date: "Siempre tú", image: "/images/recuerdos_reales/recuerdo_21.jpg", description: "Tú en tu máxima expresión: hermosa, noble y divertida, preciosa." },
  { id: "g-22", title: "Luz de mi vida, mi corazoncini", category: "Primeras Citas", date: "Recuerdo vivo", image: "/images/recuerdos_reales/recuerdo_22.jpg", description: "La certeza de saber que encontré a mi alma gemela, mi niña bonita." },
  { id: "g-23", title: "Sonrisa que me conquista cada día", category: "Risas", date: "Alegría pura", image: "/images/recuerdos_reales/recuerdo_23.jpg", description: "Esa sonrisa que me enamora cada segundo más, corazón de mecolotón." },
  { id: "g-24", title: "Parada en el camino, amorcito", category: "Viajes", date: "Descanso y amor", image: "/images/recuerdos_reales/recuerdo_24.jpg", description: "Tomar un respiro juntos y agradecer por tenerte, mi bonita." },
  { id: "g-25", title: "Tesoros compartidos, preciosa", category: "Especiales", date: "Memoria especial", image: "/images/recuerdos_reales/recuerdo_25.jpg", description: "Imágenes que atesoraré por toda la eternidad, mi amorcini." },
  { id: "g-26", title: "Abrazo infinito con mi niña bonita", category: "Primeras Citas", date: "Paz absoluta", image: "/images/recuerdos_reales/recuerdo_26.jpg", description: "Donde el tiempo se detiene y solo existimos tú y yo, amorcito." },
  { id: "g-27", title: "Destino elegido, mi corazoncini", category: "Viajes", date: "Juntos al fin del mundo", image: "/images/recuerdos_reales/recuerdo_27.jpg", description: "No importa el lugar del mapa, mi hogar eres tú, mi corazón de mecolotón." },
  { id: "g-28", title: "Risas inolvidables, ¡qué guapa!", category: "Risas", date: "Carcajadas", image: "/images/recuerdos_reales/recuerdo_28.jpg", description: "Reírnos hasta que nos duela el estómago, preciosa mía." },
  { id: "g-29", title: "Compañera de sueños, mi bonita", category: "Especiales", date: "Nuestra promesa", image: "/images/recuerdos_reales/recuerdo_29.jpg", description: "Soñando despiertos con el futuro que estamos creando, amorcini." },
  { id: "g-30", title: "Amor verdadero e incondicional", category: "Primeras Citas", date: "Incondicional", image: "/images/recuerdos_reales/recuerdo_30.jpg", description: "Un amor real, paciente y apasionado con mi niña bonita." },
  { id: "g-31", title: "El brillo en tus ojos, amorcito", category: "Especiales", date: "Reflejo del alma", image: "/images/recuerdos_reales/recuerdo_31.jpg", description: "Mirarte y saber que soy el hombre más afortunado del mundo, preciosa." },
  { id: "g-32", title: "Instante eterno con mi corazoncini", category: "Risas", date: "Pura vida", image: "/images/recuerdos_reales/recuerdo_32.jpg", description: "Momentos simples que son gigantescos a tu lado, mi bonita." },
  { id: "g-33", title: "Por siempre tú, mi corazón de mecolotón", category: "Especiales", date: "Eternidad", image: "/images/recuerdos_reales/recuerdo_33.jpg", description: "Hoy, mañana y en todas las vidas que existan, te elijo a ti, amorcini." },
  { id: "g-34", title: "Nuestro nuevo recuerdo, preciosa", category: "Especiales", date: "Momento reciente", image: "/images/recuerdos_reales/recuerdo_34.jpg", description: "¡Qué guapa estás! Cada foto nueva a tu lado es un tesoro para siempre, mi niña bonita." }
];

// CARTAS DE AMOR CON PALABRAS NATURALES Y CARIÑOSAS
export const loveLetters = [
  {
    id: "letter-1",
    title: "Para mi niña bonita",
    subtitle: "Una dedicatoria desde el alma",
    date: "Para siempre",
    preview: "Si alguna vez dudas de lo importante que eres en mi vida, abre esta carta, preciosa...",
    content: `Mi niña bonita, mi corazoncini de mecolotini,

Si alguna vez te preguntas cuánto significas para mí, quiero que leas esto y sientas en cada palabra la verdad más pura de mi corazón: llegaste a mi vida a iluminar cada rincón con tu ternura, tus ocurrencias y tu belleza.

No hay día en que no agradezca por haberte conocido, amorcito. Eres mi pensamiento favorito al despertar y mi paz más profunda al dormir.

Hoy en tu cumpleaños quiero recordarte que eres un ser humano excepcional, dulce, fuerte y bondadoso. ¡Y qué guapa estás todos los días de tu vida!

Te amo con todo mi ser, mi bonita.`,
    stamp: "💌 Tuyo por siempre, amorcini"
  },
  {
    id: "letter-2",
    title: "Lo que siento por ti, preciosa",
    subtitle: "Más allá de las palabras",
    date: "Presente continuo",
    preview: "Amarte ha sido la decisión más fácil y maravillosa que he tomado, amorcini...",
    content: `Preciosa mía, mi corazón de mecolotón,

Lo que siento por ti no cabe en explicaciones lógicas. Es una mezcla de admiración profunda, calma infinita y esa cosquillita de felicidad cada vez que veo una notificación con tu nombre en el celular.

Amo cómo me cuidas, amo cómo me escuchas y amo la forma en que construimos un amor sano, paciente y lleno de complicidad. Eres mi mejor amiga, mi cómplice y el amor de mi vida, mi amorcito.

Gracias por permitirme ser quien soy a tu lado y por quererme tanto, mi niña bonita.`,
    stamp: "❤️ Infinito, mi corazoncini"
  },
  {
    id: "letter-3",
    title: "Gracias por estar conmigo, mi bonita",
    subtitle: "Gratitud infinita",
    date: "Cada día",
    preview: "Gracias por cada risa, cada abrazo y cada palabra de aliento, amorcito...",
    content: `Mi bonita hermosa,

Hoy quiero darte las gracias por todo. Gracias por estar en mis días buenos para celebrar, pero sobre todo por quedarte en los días difíciles para abrazarme fuerte y decirme que todo estará bien.

Gracias por tus detalles, por preocuparte por mí, por tus besos que curan todo y por hacer que cualquier día ordinario se sienta como una aventura increíble, amorcini.

Tenerte como compañera de vida es el mayor privilegio del mundo. No cambiaría ni un solo segundo de lo que hemos compartido, mi corazoncini de mecolotini.`,
    stamp: "✨ Gracias por existir, preciosa"
  },
  {
    id: "letter-4",
    title: "Lo que más amo de ti, ¡qué guapa!",
    subtitle: "Tus virtudes que me enamoran",
    date: "Siempre",
    preview: "No solo amo lo evidente, amo cada pequeño detalle tuyo, mi niña bonita...",
    content: `Vane, mi niña bonita,

Amo tu corazón generoso. Amo cómo te preocupas por los que quieres. Amo tu sentido del humor que alegra cualquier momento.

Amo cuando te ríes con ganas, cuando frunces la nariz, cuando te concentras en lo que haces y cuando me miras con esos ojitos brillantes que me derriten el alma. Y por si no te lo he dicho hoy: ¡qué guapa estás, amorcito!

Amo todo de ti: lo que ya conozco y lo que aún me queda por descubrir en los próximos años a tu lado, mi corazón de mecolotón.`,
    stamp: "🌹 Eres perfecta para mí, amorcini"
  },
  {
    id: "letter-5",
    title: "Una promesa para mi corazoncini",
    subtitle: "Nuestro pacto de amor",
    date: "Hacia el futuro",
    preview: "Te prometo cuidarte, respetarte y hacerte sonreír cada día, preciosa...",
    content: `Mi corazoncini de mecolotini,

Hoy, en el día de tu cumpleaños, renuevo todas mis promesas hacia ti:

Prometo cuidarte en tus momentos difíciles y aplaudirte en cada victoria. Prometo ser tu refugio seguro, escucharte con atención y nunca dar por sentado tu amor, mi amorcito.

Prometo seguir buscando formas de arrancarte una sonrisa, tomarte de la mano al caminar y recordarte todos los días de mi vida lo increíblemente especial que eres, mi bonita.`,
    stamp: "🔒 Promesa de corazón, amorcini"
  },
  {
    id: "letter-6",
    title: "Para leer cuando estés triste, amorcito",
    subtitle: "Un abrazo en papel",
    date: "Para cuando lo necesites",
    preview: "Si hoy el mundo se siente pesado, ven aquí un momento, mi niña bonita...",
    content: `Mi niña bonita, mi corazón de mecolotón,

Si estás leyendo esto porque tuviste un mal día o sientes que las cosas no van como esperabas, respira hondo. Cierra los ojos un segundo e imagina que te estoy abrazando fuerte contra mi pecho.

Eres mucho más fuerte y capaz de lo que crees, preciosa. Este momento difícil pasará, pero mi amor por ti no va a cambiar jamás. No estás sola, nunca lo estarás mientras yo esté aquí.

Mírate al espejo: esa mujer hermosa, inteligente y dulce que ves es capaz de superar cualquier cosa. Y yo estaré a tu lado celebrando cuando lo logres. Te amo con locura, mi amorcini.`,
    stamp: "🫂 Tu refugio siempre, mi bonita"
  }
];

// 10 RAZONES POR LAS QUE TE AMO (CON SUS PALABRAS DE CARIÑO)
export const tenReasons = [
  { number: "01", title: "Tu sonrisa luminosa, mi bonita", description: "Tiene el poder instantáneo de alegrar mi día. ¡Qué guapa te ves cuando sonríes, amorcito!", icon: "✨" },
  { number: "02", title: "Tu forma de querer tan dulce", description: "Tan atenta, protectora y llena de detalles que demuestran la nobleza infinita de tu corazón, preciosa.", icon: "💖" },
  { number: "03", title: "Tu manera de hacerme reír", description: "Incluso cuando intento estar serio, tus ocurrencias logran sacarme la carcajada más sincera, mi amorcini.", icon: "😂" },
  { number: "04", title: "Tu personalidad única, mi niña bonita", description: "Auténtica, inteligente, firme y con una chispa especial que me vuelve loco de amor por ti.", icon: "🌟" },
  { number: "05", title: "Tus ocurrencias espontáneas", description: "Esa capacidad de hacerme sonreír con cualquier cosita divertida, mi corazoncini de mecolotini.", icon: "🎈" },
  { number: "06", title: "Tu mirada sincera y tierna", description: "En tus ojos encuentro paz, verdad y la certeza absoluta de que estoy en mi hogar, amorcito.", icon: "👀" },
  { number: "07", title: "Tu paciencia y tus cariñitos", description: "Cómo sabes escuchar, darme calma y ofrecerme un abrazo en el momento exacto, mi corazón de mecolotón.", icon: "🕊️" },
  { number: "08", title: "El brillo en tus ojos al hablar de tus sueños", description: "Esa pasión con la que cuentas lo que amas me cautiva por completo, preciosa.", icon: "🔥" },
  { number: "09", title: "La paz que siento a tu lado", description: "Contigo no tengo que fingir nada. A tu lado me siento en calma, seguro y feliz, mi amorcini.", icon: "🏡" },
  { number: "10", title: "Simplemente porque eres tú", description: "Con cada una de tus virtudes, tus manías y todo lo que te hace ser la mujer más extraordinaria del universo, mi niña bonita.", icon: "👑" }
];

// NOTIFICACIONES SIMULADAS DE LA PLATAFORMA
export const simulatedNotifications = [
  {
    id: "notif-1",
    icon: "🎂",
    title: "¡Felices 24 años, mi niña bonita!",
    message: "Hoy 06 de Octubre celebramos tu nacimiento (06/10/2002) y tus 24 años. La plataforma se viste de fiesta para mi corazoncini de mecolotini: ¡Feliz cumpleaños, preciosa!",
    time: "Hace 5 minutos",
    isUnread: true,
    action: "surprise"
  },
  {
    id: "notif-2",
    icon: "❤️",
    title: "Nuestros recuerdos en fotos, amorcito",
    message: "Tienes 34 fotos reales con dedicatorias esperándote en 'Fotos', mi bonita.",
    time: "Hace 1 hora",
    isUnread: true,
    action: "memories"
  },
  {
    id: "notif-3",
    icon: "💌",
    title: "Una carta para ti, mi amorcini",
    message: "Hay una carta con sello de amor lista para leer en 'Cartas', mi corazón de mecolotón.",
    time: "Hace 2 horas",
    isUnread: true,
    action: "letters"
  },
  {
    id: "notif-4",
    icon: "🎬",
    title: "Nuestra Película Completa lista",
    message: "Ven a ver nuestra historia editada con música romántica, preciosa.",
    time: "Hoy",
    isUnread: false,
    action: "history"
  }
];

// CONTENIDO DE LA SORPRESA FINAL
export const surpriseData = {
  headline: "¡FELICES 24 AÑOS, MI NIÑA BONITA! ❤️",
  subtitle: "Nacida el 06 de Octubre de 2002 • Para mi corazoncini de mecolotini, la mujer más preciosa de mi universo",
  paragraphs: [
    "Un 06 de Octubre de 2002 llegó al mundo la persona que se convertiría en mi mayor alegría, mi paz y el gran amor de mi vida.",
    "Hoy cumples 24 años y quería darte un regalo diferente, amorcito. Algo que pudieras abrir cada vez que quieras recordar lo mucho que te amo y lo infinitamente especial que eres.",
    "Cada una de las 34 fotos, cada video y cada frase que ves aquí fue hecha pensando en ti, en tu sonrisa hermosa y en todos los momentos mágicos que hemos compartido, mi amorcini.",
    "Gracias por existir, por iluminar mis días y por ser la dueña absoluta de mi corazón. ¡Qué guapa estás en tus 24 años, mi corazón de mecolotón!"
  ],
  finalQuote: "06/10/2002 - Por siempre: Gracias por formar parte de mi historia. Felices 24 años, mi niña bonita. ¡Qué guapa eres y cuánto te amo! ❤️",
  author: "Tu novio que te ama con locura"
};
