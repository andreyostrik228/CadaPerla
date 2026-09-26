/**
 * Todos los sitios de ayuda de Granada capital que recoge la web.
 *
 * REGLA DEL PROYECTO: aquí no se inventa nada. Cada ficha dice de dónde sale
 * y cuándo se comprobó. Si dos fuentes no coinciden, se ponen las dos y se
 * dice. Si un dato no está en ninguna fuente, no se pone.
 *
 * No hay horarios, por decisión de Andrii (2026-09-26): casi ninguno estaba
 * confirmado, y un horario falso manda a alguien a una puerta cerrada. Todas
 * las fichas dicen "llama antes de ir".
 *
 * Las coordenadas y el barrio de OpenStreetMap no están aquí: van en
 * `ubicaciones.ts`, que genera `scripts/geocodificar.py` a partir de las
 * direcciones de este archivo. Por eso cada ficha va con el mismo formato
 * (`id` y `direccion` en su propia línea): el script las lee con una
 * expresión regular.
 *
 * El detalle de la búsqueda (qué se miró, qué se descartó y por qué) está en
 * `docs/recursos-candidatos.md`.
 */
import type { Categoria } from "./categorias";

/**
 * Qué tan fiables son la dirección y el teléfono de la ficha:
 * - A: comprobados en la web de la propia entidad (o del organismo que la lleva).
 * - B: salen de una guía oficial del Ayuntamiento de Granada, de 2023.
 * - C: salen solo de una guía de otra organización (2024–2025). Pueden haber cambiado.
 */
export type Nivel = "A" | "B" | "C";

export type Fuente = {
  texto: string;
  url: string;
  /** Qué parte de la ficha respalda, cuando no la respalda entera. */
  confirma?: string;
};

export type Recurso = {
  id: string;
  nombre: string;
  entidad?: string;
  categorias: Categoria[];
  ofrece: string[];
  /** Solo si una fuente lo dice. */
  paraQuien?: string;
  /** Cómo se accede, solo si una fuente lo dice (p. ej. "te deriva el COASPSH"). */
  comoSeEntra?: string;
  /** `null`: no tiene un sitio al que ir (líneas de teléfono, equipos de calle). */
  direccion: string | null;
  /** Barrio que da una fuente. Si no, se usa el de OpenStreetMap (`ubicaciones.ts`). */
  barrio?: string;
  aliasBarrio?: string[];
  codigoPostal?: string;
  telefonos: string[];
  /** Por qué hay varios teléfonos, cuando no es obvio. */
  notaTelefonos?: string;
  email?: string;
  web?: string;
  nota?: string;
  nivel: Nivel;
  fuentes: Fuente[];
  /** Última vez (AAAA-MM-DD) que se comprobó que las fuentes siguen diciendo esto. */
  revisado: string;
};

// ---------------------------------------------------------------- fuentes

const GUIA_CRUZ_BLANCA: Fuente = {
  texto: "Guía de recursos para personas sin hogar (Fundación Cruz Blanca, PDF de mayo de 2024)",
  url: "https://www.fundacioncruzblanca.org/sites/default/files/guia_ext_granada.pdf",
};
const CASA_ACOGIDA: Fuente = {
  texto: "Recursos sociales, web de la Casa de Acogida Madre de Dios",
  url: "https://www.casadeacogidagranada.org/recursos-sociales/",
};
const GUIA_CENTRO: Fuente = {
  texto: "Guía de recursos sociales del distrito Centro (Ayuntamiento de Granada, 2023)",
  url: "https://www.granada.org/ob3.nsf/in/GUIARECURSOS/$file/GuiaRecursosCentro.pdf",
};
const GUIA_GENIL: Fuente = {
  texto: "Guía de recursos sociales del distrito Genil (Ayuntamiento de Granada, 2023)",
  url: "https://www.granada.org/ob3.nsf/in/GUIARECURSOS/$file/GuiaRecursosGenil.pdf",
};
const GUIA_ZAIDIN: Fuente = {
  texto: "Guía de recursos sociales del distrito Zaidín (Ayuntamiento de Granada, 2023)",
  url: "https://www.granada.org/ob3.nsf/in/GUIARECURSOS/$file/GuiaRecursosZaidin.pdf",
};
const FICHA_COASPSH: Fuente = {
  texto: "Ficha del COASPSH en la web del Ayuntamiento de Granada",
  url: "https://www.granada.org/inet/wpim.nsf/wwtod/97ebb04a9c655d3fc12588b60055e1fc",
};

/** El centro municipal que deriva a los albergues. Varias fichas remiten a él. */
const DERIVA_COASPSH =
  "Al albergue se llega derivado desde el COASPSH (C/ Santa Rosalía 6, teléfono 958 18 00 47). Llama allí primero.";

const HOY = "2026-09-26";

// ---------------------------------------------------------------- recursos

export const RECURSOS: Recurso[] = [
  // ------------------------------------------------------------ comer
  {
    id: "san-juan-de-dios",
    nombre: "Comedor Social San Juan de Dios",
    entidad: "Orden Hospitalaria San Juan de Dios",
    categorias: ["comer"],
    ofrece: ["Comida", "Botiquín"],
    comoSeEntra:
      "Sin cita. La primera vez basta con DNI, NIE o pasaporte y puedes comer 3 días. Después te hacen un carné y piden más papeles.",
    direccion:
      "C/ San Juan de Dios 19 — entrada por la rampa del comedor, en el Hospital de San Rafael",
    barrio: "Centro",
    codigoPostal: "18001",
    telefonos: ["958 27 57 00", "900 92 77 72"],
    nivel: "A",
    fuentes: [
      {
        texto: "Web de San Juan de Dios Granada",
        url: "https://www.sjdgranada.es/solidaridad-granada",
        confirma: "el comedor y cómo se entra",
      },
      { ...GUIA_CRUZ_BLANCA, confirma: "el botiquín" },
    ],
    revisado: "2026-09-17",
  },
  {
    id: "regina-mundi",
    nombre: "Comedor Social Regina Mundi",
    entidad: "Hijas de la Caridad",
    categorias: ["comer", "higiene-ropa"],
    ofrece: ["Comida", "Duchas", "Lavadora", "Peluquería"],
    direccion: "Camino de Purchil 8",
    barrio: "Ronda",
    codigoPostal: "18004",
    telefonos: ["958 26 35 44", "958 25 07 58"],
    notaTelefonos:
      "Dos fuentes dan teléfonos distintos. La más reciente (la web de la Casa de Acogida) da el primero: si no contesta, prueba el segundo.",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA, { ...CASA_ACOGIDA, confirma: "el primer teléfono" }],
    revisado: HOY,
  },
  {
    id: "calor-y-cafe",
    nombre: "Asociación Calor y Café",
    categorias: ["comer", "higiene-ropa"],
    ofrece: [
      "Desayunos y meriendas (no comidas)",
      "Duchas",
      "Ropero",
      "Consigna para dejar tus cosas",
    ],
    direccion: "C/ El Guerra 16, Bajo",
    barrio: "Beiro",
    aliasBarrio: ["Barrio de la Cruz"],
    codigoPostal: "18014",
    telefonos: ["958 20 93 83", "958 16 33 16", "699 97 05 26"],
    nivel: "A",
    fuentes: [
      {
        texto: "Web oficial de la Fundación Calor y Café",
        url: "https://calorycafe.com/contacto/",
        confirma: "dirección y teléfonos",
      },
      { ...GUIA_CRUZ_BLANCA, confirma: "qué ofrece" },
    ],
    revisado: HOY,
  },
  {
    id: "edicoma",
    nombre: "Centro Social Hogar Corazón de María",
    entidad: "Asociación EDICOMA",
    categorias: ["comer", "higiene-ropa", "familias"],
    ofrece: [
      "Desayuno y cena",
      "Comedor para niños y niñas",
      "Aseo y peluquería",
      "Ropero, también para niños y niñas",
      "Acompañamiento a personas mayores",
    ],
    direccion: "C/ Colegios s/n",
    codigoPostal: "18001",
    telefonos: ["660 64 09 66"],
    email: "edicoma@hotmail.es",
    nota: "Los desayunos, solo en invierno. Las cenas, todo el año.",
    nivel: "B",
    fuentes: [
      GUIA_CENTRO,
      { ...GUIA_CRUZ_BLANCA, confirma: "desayuno en invierno y cena todo el año" },
    ],
    revisado: HOY,
  },

  // ------------------------------------------------------------ dormir
  {
    id: "coaspsh",
    nombre: "Centro de Orientación y Atención a Personas sin Hogar (COASPSH)",
    entidad: "Ayuntamiento de Granada",
    categorias: ["dormir", "servicios-sociales", "calle"],
    ofrece: [
      "Primera atención si no tienes casa",
      "Información y orientación",
      "Atención social y psicológica",
      "Derivación a los albergues (Madre de Dios, OCREM)",
    ],
    paraQuien: "Personas sin hogar",
    comoSeEntra: "Es la puerta de entrada: si no sabes a dónde ir, empieza aquí.",
    direccion: "C/ Santa Rosalía 6",
    codigoPostal: "18007",
    telefonos: ["958 18 00 47"],
    email: "personassinhogar@granada.org",
    nivel: "B",
    fuentes: [FICHA_COASPSH, { ...GUIA_ZAIDIN, confirma: "qué hace y a dónde deriva" }],
    revisado: HOY,
  },
  {
    id: "madre-de-dios",
    nombre: "Casa de Acogida Madre de Dios",
    entidad: "Fundación Casas Diocesanas de Acogida",
    categorias: ["dormir"],
    ofrece: [
      "Albergue",
      "Noches de emergencia (Servicio de Alta Tolerancia)",
      "Centro de día y talleres",
      "Programa de adicciones",
    ],
    paraQuien: "Hombres",
    comoSeEntra: DERIVA_COASPSH,
    direccion: "C/ Varela 20",
    codigoPostal: "18009",
    telefonos: ["958 22 54 89"],
    email: "info@casadeacogidagranada.org",
    web: "https://www.casadeacogidagranada.org",
    nivel: "A",
    fuentes: [
      {
        texto: "Web de la Casa de Acogida Madre de Dios",
        url: "https://www.casadeacogidagranada.org/recursos-sociales/",
        confirma: "dirección y teléfono",
      },
      { ...GUIA_CENTRO, confirma: "albergue, centro de día y adicciones" },
      { ...GUIA_ZAIDIN, confirma: "que es para hombres y que se llega desde el COASPSH" },
      { ...GUIA_CRUZ_BLANCA, confirma: "noches de emergencia" },
    ],
    revisado: HOY,
  },
  {
    id: "encuentro-y-acogida",
    nombre: "Centro Municipal de Encuentro y Acogida",
    entidad: "Fundación Atenea",
    categorias: ["dormir", "higiene-ropa", "salud-mental", "calle"],
    ofrece: [
      "Noches de emergencia (Centro de Alta Tolerancia)",
      "Ducha y lavandería",
      "Apoyo inmediato si consumes drogas o estás en la calle",
      "Información y asesoramiento",
    ],
    direccion: "C/ Arandas 14, Bajo",
    codigoPostal: "18001",
    telefonos: ["643 94 31 98", "958 20 39 43"],
    notaTelefonos:
      "La fuente más reciente (la web de la Casa de Acogida) da el primero; las guías de 2023 y 2024, el segundo.",
    nivel: "B",
    fuentes: [
      GUIA_CENTRO,
      { ...GUIA_CRUZ_BLANCA, confirma: "noches de emergencia" },
      { ...CASA_ACOGIDA, confirma: "el primer teléfono" },
    ],
    revisado: HOY,
  },
  {
    id: "ocrem",
    nombre: "Asociación OCREM",
    categorias: ["dormir", "mujeres", "familias"],
    ofrece: ["Casa de acogida (8 plazas)", "Noches de emergencia"],
    paraQuien: "Mujeres y familias con menores sin hogar",
    comoSeEntra: DERIVA_COASPSH,
    direccion: "C/ Arzobispo Pedro de Castro 7, Edificio Columba I",
    codigoPostal: "18013",
    telefonos: ["958 15 94 87"],
    email: "ocrem@ocrem.org",
    web: "http://ocrem.org",
    nota: "La web de la Casa de Acogida da otra dirección, C/ San Blas 41. Puede que una sea la oficina y otra la casa: pregunta al llamar.",
    nivel: "A",
    fuentes: [
      {
        texto: "Web de OCREM",
        url: "http://ocrem.org/que-hacemos/centros-acogida-mujeres-y-familias/",
        confirma: "dirección, teléfono, plazas y para quién",
      },
      { ...GUIA_CRUZ_BLANCA, confirma: "noches de emergencia" },
      { ...GUIA_ZAIDIN, confirma: "que se llega desde el COASPSH" },
    ],
    revisado: HOY,
  },
  {
    id: "cruz-roja",
    nombre: "Cruz Roja Granada",
    categorias: ["dormir", "migrantes", "trabajo"],
    ofrece: [
      "Habitaciones o pensiones",
      "Atención a personas migrantes",
      "Empleo y formación",
      "Centro de día y actividades",
    ],
    direccion: "Cuesta Escoriaza 8A",
    telefonos: ["958 22 14 20"],
    nota: "La guía del Ayuntamiento de 2023 da otra dirección: Av. de la Constitución 18. El teléfono coincide en las tres fuentes.",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA, CASA_ACOGIDA, { ...GUIA_CENTRO, confirma: "empleo y formación" }],
    revisado: HOY,
  },
  {
    id: "cruz-blanca",
    nombre: "Fundación Cruz Blanca",
    categorias: ["dormir", "calle", "migrantes"],
    ofrece: [
      "Vivienda de autonomía (4 plazas)",
      "Unidad móvil que sale a la calle una vez a la semana",
      "Atención a personas migrantes",
    ],
    paraQuien: "Personas sin hogar",
    direccion: "C/ Periodista Eugenio Sellés 11, local 2",
    telefonos: ["858 89 39 00"],
    nivel: "A",
    fuentes: [
      {
        texto: "Web de la Fundación Cruz Blanca",
        url: "https://www.fundacioncruzblanca.org/sinhogarismo",
        confirma: "teléfono, vivienda y unidad móvil",
      },
      { ...GUIA_CRUZ_BLANCA, confirma: "dirección y atención a migrantes" },
    ],
    revisado: HOY,
  },
  {
    id: "provivienda",
    nombre: "Provivienda",
    categorias: ["dormir", "migrantes"],
    ofrece: [
      "Vivienda para personas sin hogar (Housing First)",
      "Mediación para conseguir o mantener una vivienda",
      "Atención a solicitantes de asilo y protección internacional",
    ],
    direccion: "C/ Camino de Ronda 172, local",
    codigoPostal: "18003",
    telefonos: ["958 10 10 30"],
    web: "https://www.provivienda.org",
    nivel: "A",
    fuentes: [
      {
        texto: "Web de Provivienda",
        url: "https://www.provivienda.org/contacto/",
        confirma: "dirección y teléfono",
      },
      { ...GUIA_CENTRO, confirma: "qué ofrece" },
    ],
    revisado: HOY,
  },
  {
    id: "inserta-andalucia",
    nombre: "Inserta Andalucía",
    categorias: ["dormir", "migrantes"],
    ofrece: ["Recurso residencial", "Centro de día y talleres", "Atención a personas migrantes"],
    direccion: "C/ Poeta Vicente Aleixandre 4",
    telefonos: ["632 50 34 42", "958 11 52 06", "689 56 51 39"],
    notaTelefonos:
      "El primero es el de la fuente más reciente (web de la Casa de Acogida); los otros dos, de la guía de 2024.",
    nota: "La guía de 2024 da como dirección C/ Cruz de Granada, local 3, con entrada por C/ Poeta Vicente Aleixandre.",
    nivel: "C",
    fuentes: [CASA_ACOGIDA, GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "vivienda-digna",
    nombre: "Fundación Vivienda Digna",
    categorias: ["dormir"],
    ofrece: ["Recurso residencial"],
    direccion: null,
    telefonos: [],
    email: "grviviendadigna@gmail.com",
    nota: "La guía solo da un correo: no publica dirección ni teléfono.",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "betel",
    nombre: "Asociación Betel",
    categorias: ["dormir", "salud-mental"],
    ofrece: ["Acogida", "Rehabilitación de drogas", "Talleres ocupacionales y ayuda para trabajar"],
    paraQuien: "Personas en exclusión o con problemas de drogas",
    direccion: "Av. de América 53",
    codigoPostal: "18008",
    telefonos: ["958 13 14 10"],
    nota: "La guía de 2024 da otra dirección y otro teléfono (Camino de Ronda 93, 958 25 82 39); las otras dos fuentes coinciden en estos.",
    nivel: "B",
    fuentes: [GUIA_ZAIDIN, CASA_ACOGIDA],
    revisado: HOY,
  },
  {
    id: "remar",
    nombre: "Remar",
    categorias: ["dormir"],
    ofrece: ["Recurso residencial"],
    direccion: "C/ Pedro Machuca 8",
    telefonos: ["600 43 91 24"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA, CASA_ACOGIDA],
    revisado: HOY,
  },
  {
    id: "reto-esperanza",
    nombre: "Reto a la Esperanza",
    categorias: ["dormir"],
    ofrece: ["Recurso residencial"],
    direccion: "Carretera de Málaga 142",
    telefonos: ["958 27 17 52"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "betesda",
    nombre: "Betesda",
    categorias: ["dormir"],
    ofrece: ["Recurso residencial"],
    direccion: "C/ Márquez de Mondéjar 42, bajo",
    telefonos: ["858 81 32 88", "665 32 26 38"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },

  // ------------------------------------------------------------ ducha y ropa
  {
    id: "san-juan-de-dios-duchas",
    nombre: "Duchas de San Juan de Dios",
    entidad: "Orden Hospitalaria San Juan de Dios",
    categorias: ["higiene-ropa"],
    ofrece: ["Duchas"],
    direccion: "C/ San Juan de Dios 15",
    telefonos: ["958 20 67 62"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "caritas",
    nombre: "Cáritas Diocesana de Granada",
    categorias: ["higiene-ropa", "servicios-sociales"],
    ofrece: ["Ropero", "Acogida a través de las Cáritas de cada parroquia"],
    direccion: "C/ Doctor Azpitarte 3",
    telefonos: ["958 20 26 11"],
    web: "https://www.caritasgranada.org",
    nivel: "C",
    fuentes: [
      { ...GUIA_CRUZ_BLANCA, confirma: "dirección, teléfono y ropero" },
      { ...GUIA_ZAIDIN, confirma: "que las parroquias son la puerta de entrada a Cáritas" },
    ],
    revisado: HOY,
  },
  {
    id: "hermanicos-san-jose",
    nombre: "Hermanicos de San José",
    categorias: ["higiene-ropa"],
    ofrece: ["Ropero", "Consigna para dejar tus cosas"],
    direccion: "C/ Palencia 27",
    telefonos: ["625 33 93 36"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },

  // ------------------------------------------------------------ salud
  {
    id: "medicos-del-mundo",
    nombre: "Médicos del Mundo",
    categorias: ["salud", "migrantes"],
    ofrece: [
      "Apoyo sociosanitario a familias de la comunidad rumana gitana de La Chana",
      "Prevención y protección de personas migrantes frente a los delitos de odio",
    ],
    paraQuien: "Comunidad rumana gitana y personas migrantes",
    direccion: "Carretera Antigua de Málaga 92, local 1, bajo A (entrada por C/ Higuera)",
    codigoPostal: "18015",
    telefonos: ["858 95 40 81", "676 31 78 85"],
    email: "granada@medicosdelmundo.org",
    nota: "Su web no habla de una consulta médica abierta a todo el mundo en Granada: pregunta antes de ir.",
    nivel: "A",
    fuentes: [
      {
        texto: "Web de Médicos del Mundo Andalucía",
        url: "https://www.medicosdelmundo.org/donde-trabajamos/europa/espana/andalucia/",
      },
    ],
    revisado: HOY,
  },
  {
    id: "centro-ets",
    nombre: "Centro de Enfermedades de Transmisión Sexual",
    entidad: "Servicio Andaluz de Salud",
    categorias: ["salud"],
    ofrece: ["Pruebas de enfermedades de transmisión sexual", "Prevención y consejo"],
    direccion: "Av. de Madrid 15",
    codigoPostal: "18001",
    telefonos: ["958 02 88 27", "958 02 24 00"],
    nivel: "B",
    fuentes: [GUIA_CENTRO],
    revisado: HOY,
  },
  {
    id: "salud-responde",
    nombre: "Salud Responde",
    entidad: "Junta de Andalucía",
    categorias: ["salud"],
    ofrece: ["Pedir cita con tu centro de salud por teléfono"],
    direccion: null,
    telefonos: ["955 54 50 60"],
    nivel: "B",
    fuentes: [
      { ...GUIA_CENTRO, confirma: "es el teléfono que da la guía para los centros de salud" },
    ],
    revisado: HOY,
  },

  // ------------------------------------------------------------ salud mental y adicciones
  {
    id: "agrafem",
    nombre: "AGRAFEM",
    entidad: "Asociación Granadina de Familiares y Personas con Enfermedad Mental",
    categorias: ["salud-mental", "legal"],
    ofrece: ["Asesoramiento y apoyo terapéutico", "Atención social", "Asesoramiento jurídico"],
    paraQuien: "Personas con enfermedad mental y sus familias",
    direccion: "C/ Alhamar 33, entresuelo izquierda",
    codigoPostal: "18004",
    telefonos: ["691 01 36 59", "958 27 91 55"],
    email: "info@agrafem.org",
    nivel: "B",
    fuentes: [GUIA_CENTRO, GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "sapame",
    nombre: "SAPAME, Salud para la Mente",
    categorias: ["salud-mental"],
    ofrece: ["Grupos de apoyo mutuo", "Talleres y actividades"],
    paraQuien: "Personas con un trastorno de salud mental",
    direccion: "C/ Almona del Boquerón 10",
    codigoPostal: "18001",
    telefonos: ["958 29 01 43", "692 02 74 56"],
    web: "https://sapamegranada.org",
    nivel: "B",
    fuentes: [GUIA_CENTRO],
    revisado: HOY,
  },
  {
    id: "salud-mental-zaidin",
    nombre: "Unidad de Salud Mental Comunitaria Zaidín",
    entidad: "Servicio Andaluz de Salud",
    categorias: ["salud-mental", "salud"],
    ofrece: ["Salud mental en la sanidad pública"],
    direccion: "Av. de América 14, 5.ª planta",
    codigoPostal: "18006",
    telefonos: ["958 89 77 28"],
    nivel: "B",
    fuentes: [GUIA_ZAIDIN],
    revisado: HOY,
  },
  {
    id: "drogodependencias",
    nombre: "Centro Provincial de Drogodependencias",
    entidad: "Diputación de Granada",
    categorias: ["salud-mental"],
    ofrece: ["Orientación", "Tratamiento y terapia", "Seguimiento"],
    direccion: "C/ San Juan de Dios 11",
    codigoPostal: "18001",
    telefonos: ["958 20 21 01", "958 20 22 31"],
    notaTelefonos:
      "La guía de 2024 y la web de la Casa de Acogida dan el primero; la guía del Ayuntamiento de 2023, el segundo.",
    nivel: "B",
    fuentes: [GUIA_CENTRO, GUIA_CRUZ_BLANCA, CASA_ACOGIDA],
    revisado: HOY,
  },
  {
    id: "proyecto-hombre",
    nombre: "Proyecto Hombre Granada",
    categorias: ["salud-mental", "familias"],
    ofrece: [
      "Tratamiento de adicciones para adultos",
      "Jóvenes y adolescentes",
      "Apoyo a familias",
    ],
    direccion: "C/ Santa Paula 20",
    codigoPostal: "18001",
    telefonos: ["958 29 60 27"],
    email: "ph@proyectohombregranada.org",
    web: "https://proyectohombregranada.org",
    nivel: "A",
    fuentes: [
      {
        texto: "Web de Proyecto Hombre Granada",
        url: "https://proyectohombregranada.org/",
        confirma: "dirección y teléfono",
      },
      { ...GUIA_CENTRO, confirma: "qué ofrece" },
    ],
    revisado: HOY,
  },
  {
    id: "grexales",
    nombre: "GREXALES",
    categorias: ["salud-mental"],
    ofrece: ["Ayuda con el alcohol"],
    direccion: "C/ Chile 10",
    telefonos: ["958 15 00 96"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA, CASA_ACOGIDA],
    revisado: HOY,
  },

  // ------------------------------------------------------------ papeles y migrantes
  {
    id: "sai",
    nombre: "Servicio de Atención al Inmigrante (SAI)",
    entidad: "Ayuntamiento de Granada",
    categorias: ["migrantes"],
    ofrece: [
      "Información y orientación",
      "Informes de inserción social",
      "Informes de vivienda para traer a tus hijos (reagrupación familiar)",
    ],
    direccion: "C/ Santa Rosalía 6, planta baja",
    codigoPostal: "18007",
    telefonos: ["958 18 00 47", "958 18 00 50"],
    email: "sai@granada.org",
    nivel: "B",
    fuentes: [GUIA_ZAIDIN, GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "granada-acoge",
    nombre: "Granada Acoge",
    categorias: ["migrantes", "legal", "trabajo"],
    ofrece: [
      "Atención social",
      "Atención jurídica",
      "Protección internacional (asilo)",
      "Búsqueda de empleo",
      "Apoyo para conseguir vivienda",
      "Lengua y cultura",
    ],
    direccion: "C/ Almona de San Juan de Dios 12",
    telefonos: ["958 20 08 36"],
    web: "https://www.granadaacoge.com",
    nivel: "A",
    fuentes: [
      {
        texto: "Web de Granada Acoge",
        url: "https://www.granadaacoge.com/refugio-para-inmigrantes-en-andalucia",
        confirma: "dirección y teléfono",
      },
      { ...GUIA_CENTRO, confirma: "qué ofrece" },
    ],
    revisado: HOY,
  },
  {
    id: "amani",
    nombre: "Amani",
    categorias: ["migrantes"],
    ofrece: ["Atención a personas migrantes"],
    direccion: null,
    telefonos: ["653 07 19 26", "605 41 71 76"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA, CASA_ACOGIDA],
    revisado: HOY,
  },
  {
    id: "rasd",
    nombre: "RASD",
    categorias: ["migrantes"],
    ofrece: ["Atención a personas migrantes"],
    direccion: "C/ Chile 15",
    telefonos: ["958 40 58 06"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "asociacion-marroqui",
    nombre: "Asociación Marroquí para la Integración de Inmigrantes",
    categorias: ["migrantes"],
    ofrece: ["Acción social", "Formación", "Mediación intercultural"],
    direccion: "C/ Margarita Xirgu s/n",
    codigoPostal: "18005",
    telefonos: ["645 49 53 04"],
    email: "granada.asociacionmarroqui@gmail.com",
    nivel: "B",
    fuentes: [GUIA_ZAIDIN],
    revisado: HOY,
  },
  {
    id: "save-the-children",
    nombre: "Save the Children",
    categorias: ["migrantes", "familias"],
    ofrece: ["Atención a niños, niñas y jóvenes migrantes"],
    direccion: null,
    telefonos: ["900 90 75 23"],
    nota: "Llamada gratuita.",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "albihar",
    nombre: "Fundación Albihar",
    categorias: ["migrantes", "trabajo"],
    ofrece: ["Inserción laboral", "Apoyo a personas migrantes", "Apoyo a personas mayores"],
    direccion: "C/ Alhóndiga 6, 4.º B",
    codigoPostal: "18001",
    telefonos: ["958 13 39 01"],
    email: "albihar@fundacionalbihar.org",
    nivel: "B",
    fuentes: [GUIA_CENTRO],
    revisado: HOY,
  },
  {
    id: "ager",
    nombre: "Asociación Granadina de Emigrantes Retornados (AGER)",
    categorias: ["migrantes"],
    ofrece: ["Defensa de los derechos de emigrantes y retornados"],
    paraQuien: "Personas que emigraron y han vuelto a España",
    direccion: "C/ Monachil 6",
    codigoPostal: "18007",
    telefonos: ["958 13 53 33"],
    nivel: "B",
    fuentes: [GUIA_ZAIDIN],
    revisado: HOY,
  },

  // ------------------------------------------------------------ trabajo
  {
    id: "sae-cita-previa",
    nombre: "Servicio Andaluz de Empleo (SAE), cita previa",
    entidad: "Junta de Andalucía",
    categorias: ["trabajo"],
    ofrece: [
      "Inscribirte como demandante de empleo",
      "Es el paso previo para pedir el paro al SEPE",
    ],
    direccion: null,
    telefonos: ["955 62 56 95"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "sepe-cita-previa",
    nombre: "SEPE, cita previa",
    entidad: "Servicio Público de Empleo Estatal",
    categorias: ["trabajo"],
    ofrece: ["Pedir el paro y otras prestaciones por desempleo"],
    comoSeEntra: "Antes tienes que estar inscrito en el SAE.",
    direccion: null,
    telefonos: ["91 926 79 70"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "andalucia-orienta",
    nombre: "Andalucía Orienta, centro de referencia",
    entidad: "Servicio Andaluz de Empleo",
    categorias: ["trabajo"],
    ofrece: ["Orientación para buscar trabajo", "Itinerario personalizado de inserción"],
    paraQuien: "Personas inscritas como demandantes de empleo",
    direccion: "Av. de América 8, bajo",
    codigoPostal: "18006",
    telefonos: ["958 05 84 96", "671 56 52 11"],
    nivel: "B",
    fuentes: [GUIA_ZAIDIN, GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "empleo-municipal",
    nombre: "Centro Municipal de Formación y Empleo",
    entidad: "Ayuntamiento de Granada",
    categorias: ["trabajo"],
    ofrece: ["Orientación laboral", "Formación", "Ayuda para montar tu negocio"],
    direccion: "C/ Horno de San Matías 4",
    codigoPostal: "18009",
    telefonos: ["958 18 00 81"],
    email: "empleo@granada.org",
    nivel: "B",
    fuentes: [GUIA_CENTRO],
    revisado: HOY,
  },
  {
    id: "don-bosco",
    nombre: "Fundación Don Bosco",
    categorias: ["trabajo", "familias"],
    ofrece: ["Programas para encontrar trabajo", "Programa socioeducativo", "Atención residencial"],
    paraQuien: "Personas en riesgo de exclusión social",
    direccion: "Av. de América 10-12",
    codigoPostal: "18006",
    telefonos: ["958 13 84 02"],
    email: "granada@fundaciondonbosco.es",
    nivel: "B",
    fuentes: [GUIA_ZAIDIN],
    revisado: HOY,
  },

  // ------------------------------------------------------------ mujeres
  {
    id: "centro-mujer-municipal",
    nombre: "Centro Municipal de Información a la Mujer",
    entidad: "Ayuntamiento de Granada",
    categorias: ["mujeres"],
    ofrece: ["Información", "Atención psicológica", "Atención social"],
    direccion: "Complejo Los Mondragones, Av. Fuerzas Armadas s/n, edificio E, bajo derecha",
    telefonos: ["958 24 81 52"],
    email: "cmam@granada.org",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "instituto-mujer",
    nombre: "Instituto Andaluz de la Mujer en Granada",
    entidad: "Junta de Andalucía",
    categorias: ["mujeres"],
    ofrece: ["Información y atención a mujeres"],
    direccion: "C/ San Matías 17",
    telefonos: ["958 02 58 00"],
    email: "c.mujer.granada.iam@juntadeandalucia.es",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "sava",
    nombre: "SAVA, Servicio de Atención a Víctimas de Andalucía",
    entidad: "Junta de Andalucía",
    categorias: ["mujeres", "legal"],
    ofrece: ["Apoyo jurídico, psicológico y social a víctimas de cualquier delito"],
    direccion: null,
    telefonos: ["662 97 91 69", "662 97 91 76", "662 97 91 77"],
    notaTelefonos:
      "El primero es el de la jurista; el segundo, trabajo social; el tercero, psicología.",
    email: "sava.granada.iuse@juntadeandalucia.es",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "ufam",
    nombre: "UFAM, Policía Nacional",
    categorias: ["mujeres"],
    ofrece: ["Unidad de Atención a la Familia y a la Mujer"],
    direccion: null,
    telefonos: ["958 80 80 00"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "emume",
    nombre: "EMUME, Guardia Civil",
    categorias: ["mujeres"],
    ofrece: ["Equipo de la Mujer y el Menor"],
    direccion: null,
    telefonos: ["958 18 54 00"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "amaranta",
    nombre: "Fundación Amaranta",
    categorias: ["mujeres", "trabajo"],
    ofrece: [
      "Apoyo a mujeres en prostitución o víctimas de trata",
      "Ayuda para encontrar trabajo a víctimas de violencia de género",
    ],
    paraQuien: "Mujeres y adolescentes",
    direccion: "C/ Gran Vía de Colón 56",
    codigoPostal: "18010",
    telefonos: ["646 88 76 25"],
    email: "granada@fundacionamaranta.org",
    nota: "La guía del Ayuntamiento de 2023 daba otro teléfono (958 02 90 00). Aquí va el de su web.",
    nivel: "A",
    fuentes: [
      {
        texto: "Web de la Fundación Amaranta, sede de Granada",
        url: "https://www.fundacionamaranta.org/sedes/sede-granada/",
        confirma: "teléfono y correo",
      },
      { ...GUIA_CENTRO, confirma: "dirección y qué ofrece" },
    ],
    revisado: HOY,
  },
  {
    id: "activa",
    nombre: "Activa, Asociación de Mujeres",
    categorias: ["mujeres", "legal"],
    ofrece: [
      "Atención psicológica, social y jurídica",
      "Atención a víctimas de violencia de género y a sus hijos e hijas",
    ],
    direccion: "C/ Recogidas 24, portal B, escalera B, 2.º B",
    codigoPostal: "18002",
    telefonos: ["958 25 43 06"],
    email: "aammactiva@gmail.com",
    nivel: "B",
    fuentes: [GUIA_CENTRO],
    revisado: HOY,
  },
  {
    id: "punto-mujer-zaidin",
    nombre: "Punto de Información a la Mujer del Zaidín",
    entidad: "Ayuntamiento de Granada",
    categorias: ["mujeres"],
    ofrece: ["Información y orientación"],
    direccion: "C/ Andrés Segovia 60 (Centro Cívico del Zaidín)",
    codigoPostal: "18007",
    barrio: "Zaidín",
    telefonos: ["958 13 09 85"],
    nivel: "B",
    fuentes: [GUIA_ZAIDIN],
    revisado: HOY,
  },

  // ------------------------------------------------------------ familias
  {
    id: "red-madre",
    nombre: "Red Madre",
    categorias: ["familias", "mujeres"],
    ofrece: [
      "Apoyo durante el embarazo: médico, psicológico y legal",
      "Ayuda material para el cuidado del bebé",
      "Acompañamiento durante el embarazo",
    ],
    direccion: "C/ Margarita Xirgu s/n (Hotel de Asociaciones Gloria Mas)",
    codigoPostal: "18007",
    telefonos: ["658 90 69 85", "918 33 32 18"],
    notaTelefonos:
      "El primero es el de Granada, según la guía del Ayuntamiento; el segundo, el general de la fundación, que sale en su web.",
    nivel: "B",
    fuentes: [
      GUIA_ZAIDIN,
      {
        texto: "Web de la Fundación Red Madre",
        url: "https://www.redmadre.es/",
        confirma: "el teléfono general",
      },
    ],
    revisado: HOY,
  },
  {
    id: "aldaima",
    nombre: "Aldaima, Asociación de Apoyo a la Infancia Andaluza",
    categorias: ["familias"],
    ofrece: [
      "Acogimiento familiar",
      "Apoyo a adolescentes, jóvenes y familias vulnerables",
      "Intervención terapéutica",
    ],
    direccion: "C/ Recogidas 24, portal B, escalera B, 2.º B",
    codigoPostal: "18002",
    telefonos: ["958 25 52 03"],
    email: "asociacion@aldaima.org",
    nivel: "B",
    fuentes: [GUIA_CENTRO],
    revisado: HOY,
  },
  {
    id: "tratamiento-familiar",
    nombre: "Equipos de Tratamiento Familiar",
    entidad: "Ayuntamiento de Granada",
    categorias: ["familias"],
    ofrece: ["Apoyo a familias con dificultades"],
    direccion: "Camino de Ronda 81, 1.ª planta",
    telefonos: ["958 18 00 33"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },

  // ------------------------------------------------------------ servicios sociales
  // Los 8 centros municipales, uno por distrito. Los datos salen de la guía
  // de Cruz Blanca; los de Centro, Genil y Zaidín coinciden también con la
  // guía del Ayuntamiento de su distrito (nivel B). El barrio es el nombre
  // del propio centro.
  {
    id: "servicios-sociales-albaicin",
    nombre: "Servicios Sociales Comunitarios Albaicín",
    entidad: "Ayuntamiento de Granada",
    categorias: ["servicios-sociales"],
    ofrece: ["Información, orientación y valoración social", "Prestaciones y ayudas"],
    direccion: "Plaza Aliatar s/n",
    barrio: "Albaicín",
    telefonos: ["958 18 00 15"],
    email: "albayzin.derechossociales@granada.org",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "servicios-sociales-beiro",
    nombre: "Servicios Sociales Comunitarios Beiro",
    entidad: "Ayuntamiento de Granada",
    categorias: ["servicios-sociales"],
    ofrece: ["Información, orientación y valoración social", "Prestaciones y ayudas"],
    direccion: "Plaza Ciudad de los Cármenes 1 (Av. de Madrid)",
    barrio: "Beiro",
    telefonos: ["958 18 00 28"],
    email: "beiro.derechossociales@granada.org",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "servicios-sociales-centro",
    nombre: "Servicios Sociales Comunitarios Centro",
    entidad: "Ayuntamiento de Granada",
    categorias: ["servicios-sociales"],
    ofrece: [
      "Información, orientación y valoración social",
      "Prestaciones económicas",
      "Convivencia e inclusión social",
    ],
    direccion: "C/ Palacios 1",
    barrio: "Centro",
    codigoPostal: "18009",
    telefonos: ["958 18 00 97"],
    email: "centro.derechossociales@granada.org",
    nivel: "B",
    fuentes: [GUIA_CENTRO, GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "servicios-sociales-chana",
    nombre: "Servicios Sociales Comunitarios Chana",
    entidad: "Ayuntamiento de Granada",
    categorias: ["servicios-sociales"],
    ofrece: ["Información, orientación y valoración social", "Prestaciones y ayudas"],
    direccion: "C/ Doctor Medina Olmos s/n",
    barrio: "Chana",
    telefonos: ["958 18 00 64"],
    email: "chana.derechossociales@granada.org",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "servicios-sociales-genil",
    nombre: "Servicios Sociales Comunitarios Genil",
    entidad: "Ayuntamiento de Granada",
    categorias: ["servicios-sociales"],
    ofrece: ["Información, orientación y valoración social", "Prestaciones y ayudas"],
    direccion: "Av. Cervantes 29",
    barrio: "Genil",
    codigoPostal: "18008",
    telefonos: ["958 18 00 55"],
    email: "genil.derechossociales@granada.org",
    nivel: "B",
    fuentes: [GUIA_GENIL, GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "servicios-sociales-norte",
    nombre: "Servicios Sociales Comunitarios Norte",
    entidad: "Ayuntamiento de Granada",
    categorias: ["servicios-sociales"],
    ofrece: ["Información, orientación y valoración social", "Prestaciones y ayudas"],
    direccion: "Plaza del Rey Badis s/n",
    barrio: "Norte",
    telefonos: ["958 18 00 94"],
    email: "norte.derechossociales@granada.org",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "servicios-sociales-ronda",
    nombre: "Servicios Sociales Comunitarios Ronda",
    entidad: "Ayuntamiento de Granada",
    categorias: ["servicios-sociales"],
    ofrece: ["Información, orientación y valoración social", "Prestaciones y ayudas"],
    direccion: "Plaza de la Ilusión, esquina C/ Julio Verne",
    barrio: "Ronda",
    telefonos: ["958 18 00 59"],
    email: "ronda.derechossociales@granada.org",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "servicios-sociales-zaidin",
    nombre: "Servicios Sociales Comunitarios Zaidín",
    entidad: "Ayuntamiento de Granada",
    categorias: ["servicios-sociales"],
    ofrece: ["Información, orientación y valoración social", "Prestaciones y ayudas"],
    direccion: "C/ Andrés Segovia 60",
    barrio: "Zaidín",
    telefonos: ["958 13 09 85"],
    email: "zaidin.derechossociales@granada.org",
    nivel: "B",
    fuentes: [GUIA_ZAIDIN, GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  // Cáritas no publica qué parroquias de la capital tienen acogida; solo hay
  // fuente de estas cinco, las del Zaidín.
  {
    id: "caritas-vianney",
    nombre: "Cáritas parroquial San Juan María Vianney",
    categorias: ["servicios-sociales"],
    ofrece: ["Acogida y orientación de Cáritas"],
    direccion: "C/ Félix Rodríguez de la Fuente 16",
    codigoPostal: "18006",
    telefonos: ["958 12 55 85"],
    nivel: "B",
    fuentes: [GUIA_ZAIDIN],
    revisado: HOY,
  },
  {
    id: "caritas-san-pio",
    nombre: "Cáritas parroquial San Pío X",
    categorias: ["servicios-sociales"],
    ofrece: ["Acogida y orientación de Cáritas"],
    direccion: "C/ San Pío X",
    codigoPostal: "18007",
    telefonos: ["958 13 52 68"],
    nivel: "B",
    fuentes: [GUIA_ZAIDIN],
    revisado: HOY,
  },
  {
    id: "caritas-corpus-christi",
    nombre: "Cáritas parroquial Santísimo Corpus Christi",
    categorias: ["servicios-sociales"],
    ofrece: ["Acogida y orientación de Cáritas"],
    direccion: "C/ Garellano 3B",
    codigoPostal: "18007",
    telefonos: ["958 81 04 55"],
    nivel: "B",
    fuentes: [GUIA_ZAIDIN],
    revisado: HOY,
  },
  {
    id: "caritas-angel-custodio",
    nombre: "Cáritas parroquial Santo Ángel Custodio",
    categorias: ["servicios-sociales"],
    ofrece: ["Acogida y orientación de Cáritas"],
    direccion: "C/ Palencia 24",
    codigoPostal: "18008",
    telefonos: ["958 81 20 08"],
    nivel: "B",
    fuentes: [GUIA_ZAIDIN],
    revisado: HOY,
  },
  {
    id: "caritas-dolores",
    nombre: "Cáritas parroquial Nuestra Señora de los Dolores",
    categorias: ["servicios-sociales"],
    ofrece: ["Acogida y orientación de Cáritas"],
    direccion: "C/ Cruz de Lagos",
    codigoPostal: "18006",
    telefonos: ["958 13 06 06"],
    nivel: "B",
    fuentes: [GUIA_ZAIDIN],
    revisado: HOY,
  },
  {
    id: "delegacion-inclusion",
    nombre: "Delegación Territorial de Inclusión Social, Juventud, Familias e Igualdad",
    entidad: "Junta de Andalucía",
    categorias: ["servicios-sociales"],
    ofrece: ["Dependencia", "Pensiones", "Protección de menores"],
    direccion: "C/ Ancha de Gracia 6",
    codigoPostal: "18002",
    telefonos: ["958 02 46 00"],
    nivel: "B",
    fuentes: [GUIA_CENTRO],
    revisado: HOY,
  },

  // ------------------------------------------------------------ en la calle
  {
    id: "solidarios",
    nombre: "Solidarios para el Desarrollo",
    categorias: ["calle"],
    ofrece: ["Acompañamiento a personas que viven en la calle", "Actividades"],
    direccion: "Espacio V Centenario, Av. de Madrid, planta 1",
    telefonos: ["627 90 09 47"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA, CASA_ACOGIDA],
    revisado: HOY,
  },
  {
    id: "existe-mas-mundo",
    nombre: "Existe + mundo",
    categorias: ["calle"],
    ofrece: ["Salidas a la calle por la noche"],
    direccion: null,
    telefonos: ["635 13 87 75", "602 45 73 96"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "trigales",
    nombre: "Asociación Trigales",
    categorias: ["calle"],
    ofrece: ["Acompañamiento a personas que viven en la calle"],
    direccion: "Camino de Ronda 65",
    telefonos: ["685 35 66 43"],
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "primero-vivienda",
    nombre: "Primero Vivienda",
    categorias: ["calle"],
    ofrece: ["Acompañamiento a personas que viven en la calle"],
    direccion: null,
    telefonos: [],
    email: "primeroviviendagranada@gmail.com",
    nota: "La guía solo da un correo: no publica dirección ni teléfono.",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },

  // ------------------------------------------------------------ derechos y asesoría
  {
    id: "defensor-ciudadania",
    nombre: "Defensor de la Ciudadanía",
    entidad: "Ayuntamiento de Granada",
    categorias: ["legal"],
    ofrece: [
      "Quejas y ayuda en tus trámites con el Ayuntamiento",
      "Intermediación si no puedes pagar la hipoteca",
      "Punto de atención LGTBI",
      "Mediación entre vecinos",
    ],
    direccion: "C/ Horno de San Matías 6",
    telefonos: ["958 24 69 46"],
    email: "defensorciudadano@granada.org",
    nivel: "C",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: HOY,
  },
  {
    id: "apdha",
    nombre: "Asociación Pro Derechos Humanos de Andalucía (APDHA)",
    categorias: ["legal", "migrantes"],
    ofrece: ["Defensa de derechos: cárceles, migraciones y marginación"],
    direccion: "C/ Martín Bohórquez 30",
    codigoPostal: "18005",
    telefonos: ["958 52 00 23"],
    nivel: "B",
    fuentes: [GUIA_CENTRO],
    revisado: HOY,
  },
  {
    id: "arcoiris",
    nombre: "Arcoiris Granada",
    categorias: ["legal"],
    ofrece: ["Colectivo LGTBIQ+: defensa de derechos"],
    direccion: null,
    telefonos: ["661 51 03 79"],
    email: "arcoirisdegranada@gmail.com",
    nivel: "B",
    fuentes: [GUIA_ZAIDIN],
    revisado: HOY,
  },
];

// ---------------------------------------------------------------- orientación y urgencias

/** El primer teléfono al que llamar si no sabes a dónde ir. */
export const ORIENTACION = RECURSOS.find((r) => r.id === "coaspsh")!;

export type Urgencia = { telefono: string; para: string; fuente: Fuente };

export const URGENCIAS: Urgencia[] = [
  { telefono: "112", para: "Emergencias", fuente: GUIA_CRUZ_BLANCA },
  { telefono: "061", para: "Urgencias médicas", fuente: GUIA_CRUZ_BLANCA },
  { telefono: "016", para: "Violencia de género", fuente: GUIA_CRUZ_BLANCA },
  {
    telefono: "024",
    para: "Si piensas en quitarte la vida",
    fuente: {
      texto: "Ministerio de Sanidad, línea 024",
      url: "https://www.sanidad.gob.es/linea024/home.htm",
    },
  },
  { telefono: "091", para: "Policía Nacional", fuente: GUIA_CRUZ_BLANCA },
  { telefono: "092", para: "Policía Local", fuente: GUIA_CRUZ_BLANCA },
];

/**
 * El Banco de Alimentos no atiende a personas: reparte a las entidades.
 * No es una ficha de ayuda, pero sale en "Quiero ayudar" y en "Contacto".
 */
export const BANCO_ALIMENTOS = {
  nombre: "Fundación Banco de Alimentos de Granada",
  queHace:
    "No atiende a personas directamente: reparte alimentos a las entidades sociales, y son ellas las que los entregan a las familias.",
  direccion: "Polígono Mercagranada, Ctra. de Córdoba s/n, Granada",
  telefonos: ["958 28 94 06"],
  web: "https://www.bancoalimentosgranada.org",
};

// ---------------------------------------------------------------- utilidades

export function recursosDe(categoria: Categoria): Recurso[] {
  return RECURSOS.filter((r) => r.categorias.includes(categoria));
}

/** Los números cortos (112, 016…) se marcan tal cual: con +34 delante no funcionan. */
export function telefonoEnlace(telefono: string) {
  const digitos = telefono.replace(/\s/g, "");
  return digitos.length <= 4 ? digitos : "+34" + digitos;
}

export const TEXTO_NIVEL: Record<Nivel, string> = {
  A: "Comprobado en su propia web",
  B: "Dato de una guía del Ayuntamiento (2023)",
  C: "Dato de una guía de 2024: puede haber cambiado",
};

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/**
 * Convierte "2026-09-17" en "17 de septiembre de 2026" sin pasar por `Date`:
 * parsear una fecha así con `Date` la ancla a medianoche UTC, y formatearla
 * con la zona horaria del servidor o del navegador puede desplazarla un día
 * — el mismo tipo de trampa que ya rompió la hidratación en otro sitio.
 */
export function formatoFecha(iso: string): string {
  const [anio, mes, dia] = iso.split("-").map(Number);
  return `${dia} de ${MESES[mes! - 1]} de ${anio}`;
}
