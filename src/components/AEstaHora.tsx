import { Clock, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import {
  FRANJAS,
  ORIENTACION,
  formatoDuracion,
  queHayAhora,
  telefonoEnlace,
  type EstadoAhora,
  type ProximaApertura,
  type Punto,
} from "@/data/puntos";
import { FichaPunto } from "./FichaPunto";

/**
 * "Ahora" depende de la hora del navegador, que no coincide con la del
 * servidor: calcularlo durante el render ya rompió la hidratación una vez
 * (error #418 de React, ver `useAbierto` en FichaPunto). Mismo patrón aquí:
 * se calcula ya montado, y hasta entonces no se pinta nada.
 */
export function useEstadoAhora(puntos: Punto[] | null): EstadoAhora | null {
  const [estado, setEstado] = useState<EstadoAhora | null>(null);
  useEffect(() => {
    setEstado(puntos ? queHayAhora(puntos, new Date()) : null);
  }, [puntos]);
  return estado;
}

/**
 * Dos grupos, nunca uno: mezclar "abierto de verdad" con "suele tocar a
 * esta hora" bajo un único titular que dice "esto está abierto" fue el
 * primer intento de este bloque, y era falso para 3 de los 4 comedores —
 * la ficha decía "HORARIO SIN CONFIRMAR" justo debajo de un titular que
 * acababa de afirmar lo contrario. Aquí cada grupo solo dice lo que de
 * verdad sabemos. `GrupoConfirmados`, `GrupoEnFranja` y `SinNadaAbierto` se
 * exportan sueltos porque `/puntos-de-reparto` los reutiliza con su propio
 * filtro de barrio y servicio en vez de este componente entero.
 */
export function AEstaHora({ puntos }: { puntos: Punto[] }) {
  const estado = useEstadoAhora(puntos);

  return (
    <section className="rounded-xl border border-line bg-white p-5">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
        <Clock aria-hidden size={22} className="text-primary" />A esta hora
      </h2>

      {estado === null ? (
        <p className="mt-3 text-base text-warm">Mirando qué hay ahora…</p>
      ) : (
        <>
          {estado.confirmadosAbiertos.length > 0 && (
            <GrupoConfirmados puntos={estado.confirmadosAbiertos} />
          )}

          {estado.enFranja && (
            <GrupoEnFranja enFranja={estado.enFranja} conEspacioArriba={estado.confirmadosAbiertos.length > 0} />
          )}

          {estado.confirmadosAbiertos.length === 0 && !estado.enFranja && (
            <SinNadaAbierto proximo={estado.proximo} />
          )}
        </>
      )}

      {/*
        Aviso de las franjas ya va, prominente, dentro del grupo que las usa.
        Esto es solo la referencia exacta, para quien quiera verla — no es el
        aviso en sí, así que puede ir discreta.
      */}
      <p className="mt-4 border-t border-line pt-3 text-sm text-warm">
        Franjas orientativas que usamos: desayuno {FRANJAS.Desayuno.desde}–{FRANJAS.Desayuno.hasta},
        comida {FRANJAS.Comida.desde}–{FRANJAS.Comida.hasta}, merienda {FRANJAS.Merienda.desde}–
        {FRANJAS.Merienda.hasta}, cena {FRANJAS.Cena.desde}–{FRANJAS.Cena.hasta}.
      </p>
    </section>
  );
}

export function GrupoConfirmados({ puntos }: { puntos: Punto[] }) {
  return (
    <div className="mt-3">
      <p className="text-base text-foreground">
        Confirmado: <strong className="font-semibold">abierto ahora mismo.</strong>
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {puntos.map((p) => (
          <FichaPunto key={p.id} punto={p} />
        ))}
      </div>
    </div>
  );
}

export function GrupoEnFranja({
  enFranja,
  conEspacioArriba,
}: {
  enFranja: NonNullable<EstadoAhora["enFranja"]>;
  conEspacioArriba: boolean;
}) {
  return (
    <div className={conEspacioArriba ? "mt-6" : "mt-3"}>
      <p className="text-base text-foreground">
        A esta hora suele tocar{" "}
        <strong className="font-semibold">{enFranja.servicio.toLowerCase()}</strong> en estos
        sitios, pero no tenemos su horario confirmado — es una franja{" "}
        <strong className="font-semibold">orientativa</strong> que nos hemos inventado nosotros,
        no un dato real. Llama antes de ir.
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {enFranja.puntos.map((p) => (
          <FichaPunto key={p.id} punto={p} />
        ))}
      </div>
    </div>
  );
}

export function SinNadaAbierto({
  proximo,
  mensaje = "No sabemos de ningún comedor que abra a esta hora.",
  proximoFueraDelFiltro,
  onQuitarFiltros,
}: {
  proximo: ProximaApertura | null;
  mensaje?: string;
  /**
   * Solo se enseña si hay algo que abre antes fuera de un filtro activo — un
   * filtro de barrio o servicio no puede esconder que a 20 minutos hay algo
   * que ya abre. `puntos-de-reparto.tsx` lo calcula comparando contra la
   * lista sin filtrar; aquí no se decide nada, solo se pinta si llega.
   */
  proximoFueraDelFiltro?: ProximaApertura | null;
  onQuitarFiltros?: () => void;
}) {
  return (
    <div className="mt-2">
      <p className="text-base text-foreground">{mensaje}</p>

      {proximo && (
        <p className="mt-2 text-base text-foreground">
          Lo próximo en abrir:{" "}
          <strong className="font-semibold">
            {proximo.servicio.toLowerCase()} de {proximo.punto.nombre}
          </strong>
          , a las {proximo.horaTexto} ({formatoDuracion(proximo.minutosHasta)}).
        </p>
      )}

      {proximoFueraDelFiltro && (
        <p className="mt-2 text-base text-foreground">
          Quitando los filtros, hay algo antes:{" "}
          <strong className="font-semibold">
            {proximoFueraDelFiltro.servicio.toLowerCase()} de {proximoFueraDelFiltro.punto.nombre}
          </strong>
          , a las {proximoFueraDelFiltro.horaTexto} ({formatoDuracion(proximoFueraDelFiltro.minutosHasta)}
          ).{" "}
          {onQuitarFiltros && (
            <button
              type="button"
              onClick={onQuitarFiltros}
              className="font-semibold text-primary underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Quitar filtros
            </button>
          )}
        </p>
      )}

      <p className="mt-4 rounded-lg bg-accent/15 p-4 text-base text-foreground">
        ¿Necesitas ayuda ahora mismo? Llama al {ORIENTACION.nombre}:
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {ORIENTACION.telefonos.map((t) => (
          <a
            key={t}
            href={`tel:${telefonoEnlace(t)}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-base font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Phone aria-hidden size={18} />
            {t}
          </a>
        ))}
      </div>
    </div>
  );
}
