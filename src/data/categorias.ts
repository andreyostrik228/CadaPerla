/**
 * Las 12 categorías de ayuda. Cada una tiene su color y su lema: la página
 * de "Comer" conserva los colores originales de Cada Perla, y las demás
 * tienen los suyos para que se note en qué parte de la web estás.
 *
 * Los colores se aplican redefiniendo las variables CSS del tema (--primary,
 * --accent, --background…) en el elemento raíz de la página, con `estiloTema`.
 * Como las clases de Tailwind (`bg-primary`, `text-primary`…) leen esas
 * variables, todo lo que está dentro cambia de color sin tocar un componente.
 *
 * Contraste comprobado (WCAG, mínimo 4.5:1) para las 12 paletas: blanco sobre
 * el primario, primario sobre el fondo, tinta sobre el acento y el gris de
 * texto secundario sobre el fondo. El peor caso es 5.8:1 (salud, primario
 * sobre fondo). Si se cambia un color, hay que volver a medirlo.
 */
import type { CSSProperties } from "react";

export type Categoria =
  | "comer"
  | "dormir"
  | "higiene-ropa"
  | "salud"
  | "salud-mental"
  | "migrantes"
  | "trabajo"
  | "mujeres"
  | "familias"
  | "servicios-sociales"
  | "calle"
  | "legal";

type Paleta = {
  primario: string;
  acento: string;
  fondo: string;
  linea: string;
  /** Tono (oklch) del gris de texto secundario y del fondo apagado. */
  tono: number;
  /** El mismo primario en hexadecimal, para los marcadores del mapa. */
  hex: string;
};

export type InfoCategoria = {
  id: Categoria;
  nombre: string;
  /** Una frase propia para cada categoría, en el lugar del lema de la portada. */
  lema: string;
  /** Qué hay en esta categoría, en una línea. */
  descripcion: string;
  /** El teléfono que se ofrece arriba de la página, si hay uno que tenga sentido para todos. */
  llamada?: { texto: string; telefono: string };
  paleta: Paleta;
};

const COASPSH = { texto: "¿No sabes a dónde ir?", telefono: "958 18 00 47" };

export const CATEGORIAS: InfoCategoria[] = [
  {
    id: "comer",
    nombre: "Comer",
    lema: "No te vas a quedar con hambre hoy",
    descripcion: "Comedores sociales: desayunos, comidas y cenas.",
    llamada: COASPSH,
    // Los valores originales de styles.css, tal cual: esta página no cambia.
    paleta: {
      primario: "oklch(0.383 0.117 13.9)",
      acento: "oklch(0.766 0.129 71.6)",
      fondo: "oklch(0.978 0.008 25.5)",
      linea: "oklch(0.899 0.017 15.9)",
      tono: 8.5,
      hex: "#7E2438",
    },
  },
  {
    id: "dormir",
    nombre: "Dormir",
    lema: "Que la noche no te pille en la calle",
    descripcion: "Albergues, noches de emergencia y casas de acogida.",
    llamada: COASPSH,
    paleta: {
      primario: "oklch(0.363 0.092 268.7)",
      acento: "oklch(0.850 0.146 90.5)",
      fondo: "oklch(0.973 0.007 268.5)",
      linea: "oklch(0.904 0.021 268.4)",
      tono: 268.7,
      hex: "#2A3A6E",
    },
  },
  {
    id: "higiene-ropa",
    nombre: "Ducha y ropa",
    lema: "Una ducha, ropa limpia y un sitio para tus cosas",
    descripcion: "Duchas, lavandería, roperos y consigna.",
    llamada: COASPSH,
    paleta: {
      primario: "oklch(0.437 0.072 210.9)",
      acento: "oklch(0.822 0.080 185.7)",
      fondo: "oklch(0.974 0.007 197.0)",
      linea: "oklch(0.909 0.022 193.3)",
      tono: 210.9,
      hex: "#0D5C68",
    },
  },
  {
    id: "salud",
    nombre: "Salud",
    lema: "Tu salud también cuenta",
    descripcion: "Dónde te atienden y a quién llamar si te pones malo.",
    llamada: { texto: "Urgencia médica", telefono: "061" },
    paleta: {
      primario: "oklch(0.480 0.075 163.8)",
      acento: "oklch(0.831 0.118 135.0)",
      fondo: "oklch(0.973 0.008 157.1)",
      linea: "oklch(0.911 0.025 156.7)",
      tono: 163.8,
      hex: "#2F6B52",
    },
  },
  {
    id: "salud-mental",
    nombre: "Salud mental y adicciones",
    lema: "Hay alguien al otro lado del teléfono",
    descripcion: "Apoyo psicológico, alcohol, drogas, juego y la línea 024.",
    llamada: { texto: "Si piensas en hacerte daño", telefono: "024" },
    paleta: {
      primario: "oklch(0.417 0.129 290.5)",
      acento: "oklch(0.830 0.079 297.7)",
      fondo: "oklch(0.971 0.011 297.6)",
      linea: "oklch(0.903 0.032 297.7)",
      tono: 290.5,
      hex: "#4E3B8C",
    },
  },
  {
    id: "migrantes",
    nombre: "Papeles y migrantes",
    lema: "Vengas de donde vengas, esta también es tu ciudad",
    descripcion: "Papeles, asilo, orientación y apoyo a personas migrantes.",
    llamada: { texto: "Atención al Inmigrante", telefono: "958 18 00 50" },
    paleta: {
      primario: "oklch(0.479 0.131 39.5)",
      acento: "oklch(0.799 0.106 49.6)",
      fondo: "oklch(0.974 0.009 52.1)",
      linea: "oklch(0.910 0.026 52.2)",
      tono: 39.5,
      hex: "#983D1B",
    },
  },
  {
    id: "trabajo",
    nombre: "Trabajo",
    lema: "Un empujón hacia tu próximo trabajo",
    descripcion: "Oficinas de empleo, orientación y formación.",
    llamada: { texto: "Cita en la oficina de empleo", telefono: "955 62 56 95" },
    paleta: {
      primario: "oklch(0.454 0.103 247.0)",
      acento: "oklch(0.810 0.086 243.3)",
      fondo: "oklch(0.974 0.009 247.9)",
      linea: "oklch(0.910 0.025 250.0)",
      tono: 247,
      hex: "#1B5A8C",
    },
  },
  {
    id: "mujeres",
    nombre: "Mujeres",
    lema: "No estás sola",
    descripcion:
      "Violencia de género, trata y apoyo a mujeres. Si estás en peligro ahora, llama al 112.",
    llamada: { texto: "Violencia de género", telefono: "016" },
    paleta: {
      primario: "oklch(0.432 0.140 335.1)",
      acento: "oklch(0.820 0.102 341.0)",
      fondo: "oklch(0.973 0.012 337.5)",
      linea: "oklch(0.908 0.032 338.6)",
      tono: 335.1,
      hex: "#7C2A6E",
    },
  },
  {
    id: "familias",
    nombre: "Familias e infancia",
    lema: "Para ti y para los tuyos",
    descripcion: "Embarazo, crianza y familias que lo están pasando mal.",
    paleta: {
      primario: "oklch(0.474 0.107 125.9)",
      acento: "oklch(0.885 0.116 118.1)",
      fondo: "oklch(0.978 0.015 115.0)",
      linea: "oklch(0.924 0.042 117.6)",
      tono: 125.9,
      hex: "#4D6618",
    },
  },
  {
    id: "servicios-sociales",
    nombre: "Servicios sociales",
    lema: "La primera puerta a la que llamar",
    descripcion:
      "Si no sabes por dónde empezar, empieza aquí: los servicios sociales de tu barrio.",
    llamada: COASPSH,
    paleta: {
      primario: "oklch(0.411 0.041 56.1)",
      acento: "oklch(0.851 0.058 72.9)",
      fondo: "oklch(0.972 0.008 73.7)",
      linea: "oklch(0.906 0.020 70.0)",
      tono: 56.1,
      hex: "#5C4535",
    },
  },
  {
    id: "calle",
    nombre: "Si vives en la calle",
    lema: "Hay gente que sale a buscarte",
    descripcion: "Equipos que recorren Granada para atender a quien duerme en la calle.",
    llamada: COASPSH,
    paleta: {
      primario: "oklch(0.487 0.096 84.0)",
      acento: "oklch(0.868 0.128 90.2)",
      fondo: "oklch(0.976 0.016 91.5)",
      linea: "oklch(0.916 0.042 92.2)",
      tono: 84,
      hex: "#795A0B",
    },
  },
  {
    id: "legal",
    nombre: "Derechos y asesoría",
    lema: "Tus derechos no dependen de tu bolsillo",
    descripcion: "Asesoría, quejas ante el Ayuntamiento y defensa de tus derechos.",
    paleta: {
      primario: "oklch(0.380 0.028 234.3)",
      acento: "oklch(0.829 0.023 233.4)",
      fondo: "oklch(0.972 0.003 228.8)",
      linea: "oklch(0.912 0.009 232.4)",
      tono: 234.3,
      hex: "#34454F",
    },
  },
];

const POR_ID = new Map(CATEGORIAS.map((c) => [c.id, c]));

export function infoCategoria(id: Categoria): InfoCategoria {
  return POR_ID.get(id)!;
}

export function esCategoria(valor: string): valor is Categoria {
  return POR_ID.has(valor as Categoria);
}

/**
 * Variables CSS del tema de una categoría. Se ponen en el `style` del
 * elemento raíz de la página (o de una tarjeta suelta): todo lo que hay
 * dentro hereda los colores. Van en línea y no en una hoja de estilos para
 * que el servidor las pinte ya en el HTML, sin parpadeo al cargar.
 */
export function estiloTema(id: Categoria): CSSProperties {
  const { primario, acento, fondo, linea, tono } = infoCategoria(id).paleta;
  return {
    "--primary": primario,
    "--ring": primario,
    "--secondary-foreground": primario,
    "--accent": acento,
    "--background": fondo,
    "--line": linea,
    "--border": linea,
    "--input": linea,
    "--muted": `oklch(0.94 0.012 ${tono})`,
    // Misma luminosidad que el --warm de styles.css (0.525, ver el comentario
    // de allí sobre el contraste), con el tono de la categoría.
    "--warm": `oklch(0.525 0.024 ${tono})`,
  } as CSSProperties;
}
