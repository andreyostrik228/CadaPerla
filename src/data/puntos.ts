/**
 * Datos de comedores sociales de Granada.
 *
 * REGLA DEL PROYECTO: aquí no se inventa nada. Si un dato no se ha podido
 * comprobar en una fuente pública, va como `null` y la ficha dice "sin
 * confirmar". Un horario inventado manda a alguien con hambre a un sitio
 * cerrado, así que es peor que no poner horario.
 */

export type Servicio = "Desayuno" | "Comida" | "Merienda" | "Cena";

export type Punto = {
  id: string;
  nombre: string;
  entidad?: string;
  direccion: string;
  barrio: string;
  telefonos: string[];
  servicios: Servicio[];
  /** Horario en texto. `null` = no se ha podido confirmar. */
  horario: string | null;
  /** `true` solo si se ha comprobado en la web oficial de la entidad. */
  verificado: boolean;
  /** Solo en los verificados: permite calcular si está abierto ahora. */
  apertura?: { dias: number[]; abre: string; cierra: string };
  requisitos: string;
  nota?: string;
  fuente: { texto: string; url: string };
  coords: { lat: number; lng: number; exacta: boolean };
};

const GUIA_CRUZ_BLANCA = {
  texto: "Guía de recursos para personas sin hogar (Fundación Cruz Blanca)",
  url: "https://www.fundacioncruzblanca.org/sites/default/files/guia_ext_granada.pdf",
};

/** Sitios donde se puede comer. */
export const PUNTOS: Punto[] = [
  {
    id: "san-juan-de-dios",
    nombre: "Comedor Social San Juan de Dios",
    entidad: "Orden Hospitalaria San Juan de Dios",
    direccion: "C/ San Juan de Dios 19 — entrada por la rampa del comedor, en el Hospital de San Rafael",
    barrio: "Centro",
    telefonos: ["958 27 57 00", "900 92 77 72"],
    servicios: ["Comida"],
    horario: "Todos los días, de 12:45 a 13:30",
    verificado: true,
    apertura: { dias: [0, 1, 2, 3, 4, 5, 6], abre: "12:45", cierra: "13:30" },
    requisitos:
      "Sin cita. La primera vez basta con DNI, NIE o pasaporte y puedes comer 3 días. Después te hacen un carné y piden más papeles.",
    fuente: { texto: "Web de San Juan de Dios Granada", url: "https://www.sjdgranada.es/solidaridad-granada" },
    coords: { lat: 37.18097, lng: -3.60306, exacta: true },
  },
  {
    id: "regina-mundi",
    nombre: "Comedor Social Regina Mundi",
    entidad: "Hijas de la Caridad",
    direccion: "Camino de Purchil 8",
    barrio: "Ronda",
    telefonos: ["958 25 07 58"],
    servicios: ["Comida"],
    horario: null,
    verificado: false,
    requisitos: "Sin confirmar. Llama antes de ir.",
    nota: "También tiene duchas (de lunes a sábado, de 10:00 a 12:00), lavadora (de lunes a viernes) y peluquería (lunes).",
    fuente: GUIA_CRUZ_BLANCA,
    coords: { lat: 37.17355, lng: -3.60821, exacta: false },
  },
  {
    id: "calor-y-cafe",
    nombre: "Asociación Calor y Café",
    direccion: "C/ El Guerra 16",
    barrio: "Beiro",
    telefonos: ["958 16 33 16"],
    servicios: ["Desayuno", "Merienda"],
    horario: null,
    verificado: false,
    requisitos: "Sin confirmar. Llama antes de ir.",
    nota: "Es un centro de día: da desayunos y meriendas, no comidas. También tiene duchas de lunes a sábado por las tardes.",
    fuente: GUIA_CRUZ_BLANCA,
    coords: { lat: 37.19458, lng: -3.61131, exacta: true },
  },
  {
    id: "edicoma",
    nombre: "Centro Social Hogar Corazón de María",
    entidad: "Asociación EDICOMA",
    direccion: "C/ Colegios s/n",
    barrio: "Centro",
    telefonos: ["660 64 09 66"],
    servicios: ["Desayuno", "Cena"],
    horario: null,
    verificado: false,
    requisitos: "Sin confirmar. Llama antes de ir.",
    nota: "Los desayunos solo en invierno. Las cenas, todo el año.",
    fuente: GUIA_CRUZ_BLANCA,
    coords: { lat: 37.17888, lng: -3.60249, exacta: false },
  },
];

/** Entidades a las que llamar para que te orienten. No son comedores. */
export type Ayuda = {
  id: string;
  nombre: string;
  queHace: string;
  direccion?: string;
  telefonos: string[];
  web?: string;
};

/** El primer teléfono al que llamar si no sabes a dónde ir. */
export const ORIENTACION: Ayuda = {
  id: "coaspsh",
  nombre: "Centro de Orientación y Atención Social a Personas sin Hogar",
  queHace:
    "Es el sitio al que llamar primero si no sabes a dónde ir. Te orientan y te derivan al recurso que te corresponde.",
  direccion: "C/ Santa Rosalía 6, Granada",
  telefonos: ["958 18 00 47"],
};

export const AYUDA: Ayuda[] = [
  ORIENTACION,
  {
    id: "caritas",
    nombre: "Cáritas Diocesana de Granada",
    queHace: "Atención social, ropero y ayuda a familias en toda la diócesis.",
    direccion: "C/ Doctor Azpitarte 3, Granada",
    telefonos: ["958 20 26 11"],
    web: "https://www.caritasgranada.org",
  },
  {
    id: "banco-de-alimentos",
    nombre: "Fundación Banco de Alimentos de Granada",
    queHace:
      "No atiende a personas directamente: reparte alimentos a las entidades sociales, y son ellas las que los entregan a las familias.",
    direccion: "Polígono Mercagranada, Ctra. de Córdoba s/n, Granada",
    telefonos: ["958 28 94 06"],
    web: "https://www.bancoalimentosgranada.org",
  },
];

function aMinutos(hhmm: string) {
  const [h = 0, m = 0] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Solo tiene sentido en los puntos verificados. En el resto devuelve null,
 * que la ficha traduce como "horario sin confirmar" — nunca como "cerrado".
 */
export function estaAbierto(punto: Punto, ahora: Date): boolean | null {
  if (!punto.apertura) return null;
  const { dias, abre, cierra } = punto.apertura;
  if (!dias.includes(ahora.getDay())) return false;
  const min = ahora.getHours() * 60 + ahora.getMinutes();
  return min >= aMinutos(abre) && min < aMinutos(cierra);
}

export function telefonoEnlace(telefono: string) {
  return "+34" + telefono.replace(/\s/g, "");
}
