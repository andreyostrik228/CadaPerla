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
  /** Otros nombres por los que se conoce la zona (el oficial va en `barrio`). */
  aliasBarrio?: string[];
  codigoPostal?: string;
  telefonos: string[];
  /**
   * Por qué hay más de un teléfono, cuando no es obvio (varias líneas de la
   * misma entidad) — p. ej. dos fuentes públicas dan números distintos y no
   * hay forma de saber cuál es el bueno. Se muestra junto a los botones de
   * llamada, no al final de la ficha: es la explicación que hace falta antes
   * de marcar, no una nota a pie de página.
   */
  notaTelefonos?: string;
  servicios: Servicio[];
  /** Horario en texto. `null` = no se ha podido confirmar. */
  horario: string | null;
  /** `true` solo si se ha comprobado en la web oficial de la entidad. */
  verificado: boolean;
  /** Solo en los verificados: permite calcular si está abierto ahora. */
  apertura?: { dias: number[]; abre: string; cierra: string };
  requisitos: string;
  nota?: string;
  /**
   * Uno o más orígenes de los datos de la ficha. Casi siempre uno solo. Si
   * hay más de uno (p. ej. la propia entidad confirma dirección y teléfono,
   * pero una guía de terceros es la única fuente de los servicios y el
   * horario), cada fuente lleva su propio `confirma` explicando qué parte
   * de la ficha respalda — para no acreditarle a una fuente algo que no
   * dice. `confirma` se omite cuando la fuente respalda toda la ficha.
   */
  fuentes: { texto: string; url: string; confirma?: string }[];
  /** Última vez (AAAA-MM-DD) que alguien comprobó que las fuentes de arriba siguen diciendo esto. */
  revisado: string;
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
    codigoPostal: "18001",
    telefonos: ["958 27 57 00", "900 92 77 72"],
    servicios: ["Comida"],
    horario: "Todos los días, de 12:45 a 13:30",
    verificado: true,
    apertura: { dias: [0, 1, 2, 3, 4, 5, 6], abre: "12:45", cierra: "13:30" },
    requisitos:
      "Sin cita. La primera vez basta con DNI, NIE o pasaporte y puedes comer 3 días. Después te hacen un carné y piden más papeles.",
    fuentes: [
      { texto: "Web de San Juan de Dios Granada", url: "https://www.sjdgranada.es/solidaridad-granada" },
    ],
    revisado: "2026-09-17",
    coords: { lat: 37.18097, lng: -3.60306, exacta: true },
  },
  {
    id: "regina-mundi",
    nombre: "Comedor Social Regina Mundi",
    entidad: "Hijas de la Caridad",
    direccion: "Camino de Purchil 8",
    barrio: "Ronda",
    codigoPostal: "18004",
    telefonos: ["958 25 07 58", "958 26 35 44"],
    notaTelefonos:
      "Dos fuentes públicas dan teléfonos distintos y no hay forma de saber cuál es el bueno sin llamar: si el primero no contesta, prueba el segundo.",
    servicios: ["Comida"],
    horario: null,
    verificado: false,
    requisitos: "Sin confirmar. Llama antes de ir.",
    nota: "También tiene duchas (de lunes a sábado, de 10:00 a 12:00), lavadora (de lunes a viernes) y peluquería (lunes).",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: "2026-09-17",
    coords: { lat: 37.17355, lng: -3.60821, exacta: false },
  },
  {
    id: "calor-y-cafe",
    nombre: "Asociación Calor y Café",
    direccion: "C/ El Guerra 16, Bajo",
    barrio: "Beiro",
    aliasBarrio: ["Barrio de la Cruz"],
    codigoPostal: "18014",
    telefonos: ["958 20 93 83", "958 16 33 16", "699 97 05 26"],
    servicios: ["Desayuno", "Merienda"],
    horario: null,
    verificado: false,
    requisitos: "Sin confirmar. Llama antes de ir.",
    nota: "Es un centro de día: da desayunos y meriendas, no comidas. También tiene duchas de lunes a sábado por las tardes.",
    // Su propia web solo publica dirección y teléfonos — nada de servicios,
    // duchas ni horario. Esos datos siguen viniendo solo de la guía de Cruz
    // Blanca, así que se citan las dos fuentes por separado.
    fuentes: [
      {
        texto: "Web oficial de la Fundación Calor y Café",
        url: "https://calorycafe.com/contacto/",
        confirma: "dirección y teléfonos",
      },
      {
        ...GUIA_CRUZ_BLANCA,
        confirma: "qué ofrece y el resto de datos",
      },
    ],
    revisado: "2026-09-17",
    coords: { lat: 37.19458, lng: -3.61131, exacta: true },
  },
  {
    id: "edicoma",
    nombre: "Centro Social Hogar Corazón de María",
    entidad: "Asociación EDICOMA",
    direccion: "C/ Colegios s/n",
    barrio: "Centro",
    codigoPostal: "18001",
    telefonos: ["660 64 09 66"],
    servicios: ["Desayuno", "Cena"],
    horario: null,
    verificado: false,
    requisitos: "Sin confirmar. Llama antes de ir.",
    nota: "Los desayunos solo en invierno. Las cenas, todo el año.",
    fuentes: [GUIA_CRUZ_BLANCA],
    revisado: "2026-09-17",
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

/**
 * Franjas horarias españolas típicas, para el bloque "A esta hora". Es un
 * juicio nuestro, no un dato — ningún punto sin verificar tiene hora real,
 * así que esto es lo mejor que se puede decir sin inventar una. Por eso hay
 * que enseñarlas en la interfaz como lo que son ("orientativo"), y por eso
 * NUNCA se usan en un punto verificado: donde hay una hora real (`apertura`),
 * manda esa, no la franja — ver `queHayAhora`.
 */
export const FRANJAS: Record<Servicio, { desde: string; hasta: string }> = {
  Desayuno: { desde: "07:00", hasta: "11:00" },
  Comida: { desde: "13:00", hasta: "15:30" },
  Merienda: { desde: "16:00", hasta: "19:00" },
  Cena: { desde: "20:00", hasta: "22:00" },
};

export type ProximaApertura = {
  punto: Punto;
  servicio: Servicio;
  horaTexto: string;
  minutosHasta: number;
};

export type EnFranja = { puntos: Punto[]; servicio: Servicio };

export type EstadoAhora = {
  /**
   * Verificados y de verdad abiertos ahora, con hora real comprobada. Solo
   * aquí se puede decir "abierto" sin matizarlo — es la única afirmación de
   * la que este bloque puede responder.
   */
  confirmadosAbiertos: Punto[];
  /**
   * Sin verificar, dentro de la franja del servicio que le toca ahora. NUNCA
   * "abierto": solo sabemos que a esta hora suele tocar ese servicio, con
   * una franja que nos hemos inventado nosotros — así que aquí se avisa,
   * nunca se afirma. Como las franjas no se solapan entre sí, como mucho
   * hay un servicio activo a la vez, así que basta un único grupo.
   */
  enFranja: EnFranja | null;
  /** Solo si los dos de arriba están vacíos: el próximo en abrir, sea quien sea. */
  proximo: ProximaApertura | null;
};

function minutosHastaHoraDiaria(horaTexto: string, ahoraMin: number): number {
  const inicio = aMinutos(horaTexto);
  return inicio > ahoraMin ? inicio - ahoraMin : inicio + (24 * 60 - ahoraMin);
}

/**
 * Qué se sabe de comer ahora mismo — separado en dos grupos que nunca se
 * mezclan, porque no tienen el mismo grado de certeza:
 *
 * - `confirmadosAbiertos`: hora real, verificada. Se puede afirmar.
 * - `enFranja`: solo una franja orientativa que nos hemos inventado
 *   nosotros. Nunca se afirma que esté abierto, solo que "suele tocar".
 *
 * Si los dos están vacíos, `proximo` da la siguiente opción — nunca se deja
 * a alguien con hambre sin ninguna respuesta útil.
 */
export function queHayAhora(puntos: Punto[], ahora: Date): EstadoAhora {
  const ahoraMin = ahora.getHours() * 60 + ahora.getMinutes();
  const diaSemana = ahora.getDay();
  const confirmadosAbiertos: Punto[] = [];
  const candidatos: ProximaApertura[] = [];
  const enFranjaPorServicio = new Map<Servicio, Punto[]>();

  for (const punto of puntos) {
    if (punto.verificado && punto.apertura) {
      if (estaAbierto(punto, ahora)) {
        confirmadosAbiertos.push(punto);
        continue;
      }
      // Próxima apertura real: recorre los próximos 7 días hasta el primero
      // que esté en `dias` y cuya hora de apertura no haya pasado ya hoy.
      for (let delta = 0; delta < 8; delta++) {
        const dia = (diaSemana + delta) % 7;
        if (!punto.apertura.dias.includes(dia)) continue;
        const aperturaMin = aMinutos(punto.apertura.abre);
        if (delta === 0 && aperturaMin <= ahoraMin) continue;
        const minutosHasta =
          delta === 0 ? aperturaMin - ahoraMin : aperturaMin + (delta * 24 * 60 - ahoraMin);
        candidatos.push({
          punto,
          servicio: punto.servicios[0]!,
          horaTexto: punto.apertura.abre,
          minutosHasta,
        });
        break;
      }
      continue;
    }

    // Sin verificar: usamos la franja de cada servicio que ofrece.
    for (const servicio of punto.servicios) {
      const franja = FRANJAS[servicio];
      const inicio = aMinutos(franja.desde);
      const fin = aMinutos(franja.hasta);
      if (ahoraMin >= inicio && ahoraMin < fin) {
        const lista = enFranjaPorServicio.get(servicio) ?? [];
        lista.push(punto);
        enFranjaPorServicio.set(servicio, lista);
      } else {
        candidatos.push({
          punto,
          servicio,
          horaTexto: franja.desde,
          minutosHasta: minutosHastaHoraDiaria(franja.desde, ahoraMin),
        });
      }
    }
  }

  // Las franjas no se solapan (ver FRANJAS), así que como mucho hay una
  // entrada aquí. Si en el futuro se cambian las franjas y llegan a
  // solaparse, esto solo enseñaría la primera — habría que revisar entonces.
  const [servicioActivo, puntosEnFranja] = enFranjaPorServicio.entries().next().value ?? [];
  const enFranja: EnFranja | null = servicioActivo
    ? { servicio: servicioActivo, puntos: puntosEnFranja! }
    : null;

  if (confirmadosAbiertos.length > 0 || enFranja) {
    return { confirmadosAbiertos, enFranja, proximo: null };
  }

  candidatos.sort((a, b) => a.minutosHasta - b.minutosHasta);
  return { confirmadosAbiertos: [], enFranja: null, proximo: candidatos[0] ?? null };
}

export function formatoDuracion(minutos: number): string {
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  if (horas === 0) return `en ${mins} min`;
  if (mins === 0) return `en ${horas} h`;
  return `en ${horas} h ${mins} min`;
}

export function telefonoEnlace(telefono: string) {
  return "+34" + telefono.replace(/\s/g, "");
}

/**
 * Enlace universal de Google Maps para "Cómo llegar": abre la app en
 * Android/iOS si está instalada, o la web si no — sin clave de API ni script
 * de terceros en la página, solo un enlace normal. (Esto no es la librería
 * del mapa incrustado, que sigue siendo Leaflet + OpenStreetMap.)
 *
 * Con coordenadas exactas manda el punto preciso. Si son aproximadas
 * (`coords.exacta === false`, ver el tipo `Punto`), manda la dirección en
 * texto en su lugar: una ruta a pie hasta unas coordenadas aproximadas deja
 * a alguien delante de un portal que no es, con la falsa confianza de una
 * línea azul en el mapa. La ficha ya avisa de que la posición es
 * aproximada — la navegación tiene que ser igual de honesta.
 */
export function enlaceComoLlegar(punto: Punto): string {
  const destino = punto.coords.exacta
    ? `${punto.coords.lat},${punto.coords.lng}`
    : `${punto.nombre}, ${punto.direccion}, Granada`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`;
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
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
