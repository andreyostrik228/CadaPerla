import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { GrupoConfirmados, GrupoEnFranja, SinNadaAbierto, useEstadoAhora } from "@/components/AEstaHora";
import { Aviso } from "@/components/Aviso";
import { Cabecera } from "@/components/Cabecera";
import { FichaPunto } from "@/components/FichaPunto";
import { MapaPuntos } from "@/components/MapaPuntos";
import { PieDePagina } from "@/components/PieDePagina";
import { PUNTOS, type ProximaApertura, type Servicio } from "@/data/puntos";

export const Route = createFileRoute("/puntos-de-reparto")({
  head: () => ({
    meta: [
      { title: "Comedores sociales de Granada — Cada Perla" },
      {
        name: "description",
        content: "Mapa y lista de los comedores sociales de Granada capital, con teléfono y horario.",
      },
      { property: "og:title", content: "Comedores sociales de Granada" },
      { property: "og:description", content: "Mapa y lista con teléfono y horario." },
    ],
  }),
  component: PuntosDeReparto,
});

const SERVICIOS: Servicio[] = ["Desayuno", "Comida", "Merienda", "Cena"];

/**
 * Si hay algo mejor fuera de los filtros activos, cuál es — para no
 * esconderle a alguien que a 20 minutos hay un sitio que ya abre solo
 * porque marcó un barrio hace diez segundos. `null` si no hay filtros
 * activos, o si lo que ya se enseña con el filtro es lo mejor que hay.
 */
function calcularProximoFueraDelFiltro(
  proximoFiltrado: ProximaApertura | null | undefined,
  proximoGlobal: ProximaApertura | null | undefined,
): ProximaApertura | null {
  if (!proximoGlobal) return null;
  if (!proximoFiltrado) return proximoGlobal;
  return proximoGlobal.minutosHasta < proximoFiltrado.minutosHasta ? proximoGlobal : null;
}

function PuntosDeReparto() {
  const [barrio, setBarrio] = useState("todos");
  const [servicio, setServicio] = useState<"todos" | Servicio>("todos");
  const [soloAhora, setSoloAhora] = useState(false);

  const barrios = useMemo(() => [...new Set(PUNTOS.map((p) => p.barrio))].sort(), []);
  const hayFiltrosActivos = barrio !== "todos" || servicio !== "todos";

  // Memoizado: sin esto, `lista` era un array nuevo en cada render, y como
  // `useEstadoAhora` depende de su identidad dentro de un useEffect, con
  // "A esta hora" activado entraba en un bucle infinito de renders (visto en
  // consola como "Maximum update depth exceeded" al marcar la casilla).
  const lista = useMemo(
    () =>
      PUNTOS.filter(
        (p) =>
          (barrio === "todos" || p.barrio === barrio) &&
          (servicio === "todos" || p.servicios.includes(servicio)),
      ),
    [barrio, servicio],
  );

  // Se reutiliza queHayAhora tal cual, pasándole ya la lista filtrada — la
  // intersección con barrio/servicio sale sola, sin lógica nueva. Solo se
  // calcula el estado "global" (sin filtros) cuando hay algún filtro activo
  // y hace falta para la comparación de "próximo" de abajo.
  const estadoFiltrado = useEstadoAhora(soloAhora ? lista : null);
  const estadoGlobal = useEstadoAhora(soloAhora && hayFiltrosActivos ? PUNTOS : null);

  const puntosVisibles =
    soloAhora && estadoFiltrado
      ? [...estadoFiltrado.confirmadosAbiertos, ...(estadoFiltrado.enFranja?.puntos ?? [])]
      : lista;

  return (
    <div className="min-h-screen bg-background">
      <Cabecera />
      <Aviso />
      <main id="contenido" tabIndex={-1} className="mx-auto max-w-5xl px-4 py-10 outline-none">
        <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">
          Comedores sociales
        </h1>
        <p className="mt-3 text-lg text-foreground">
          Los {PUNTOS.length} comedores que hemos podido localizar en Granada capital.
        </p>

        <div className="mt-6">
          <MapaPuntos puntos={puntosVisibles} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div>
            <label htmlFor="filtro-barrio" className="mr-2 text-base font-medium text-foreground">
              Barrio
            </label>
            <select
              id="filtro-barrio"
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              className="rounded-lg border border-line bg-white px-3 py-2 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <option value="todos">Todos</option>
              {barrios.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filtro-servicio" className="mr-2 text-base font-medium text-foreground">
              Qué dan
            </label>
            <select
              id="filtro-servicio"
              value={servicio}
              onChange={(e) => setServicio(e.target.value as "todos" | Servicio)}
              className="rounded-lg border border-line bg-white px-3 py-2 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <option value="todos">Todo</option>
              {SERVICIOS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 text-base font-medium text-foreground">
            <input
              type="checkbox"
              checked={soloAhora}
              onChange={(e) => setSoloAhora(e.target.checked)}
              className="size-5 accent-[#7E2438]"
            />
            A esta hora
          </label>
        </div>

        <h2 className="mt-8 font-display text-xl font-semibold text-foreground">
          {soloAhora ? "A esta hora" : "Todos los comedores"}
        </h2>
        <p className="mt-2 text-base text-warm" aria-live="polite">
          {puntosVisibles.length} {puntosVisibles.length === 1 ? "comedor" : "comedores"}.
        </p>

        {!soloAhora ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {lista.map((p) => (
              <FichaPunto key={p.id} punto={p} />
            ))}
          </div>
        ) : estadoFiltrado === null ? (
          <p className="mt-4 text-base text-warm">Mirando qué hay ahora…</p>
        ) : (
          <>
            {estadoFiltrado.confirmadosAbiertos.length > 0 && (
              <GrupoConfirmados puntos={estadoFiltrado.confirmadosAbiertos} />
            )}
            {estadoFiltrado.enFranja && (
              <GrupoEnFranja
                enFranja={estadoFiltrado.enFranja}
                conEspacioArriba={estadoFiltrado.confirmadosAbiertos.length > 0}
              />
            )}
            {estadoFiltrado.confirmadosAbiertos.length === 0 && !estadoFiltrado.enFranja && (
              <SinNadaAbierto
                proximo={estadoFiltrado.proximo}
                mensaje={
                  lista.length === 0
                    ? "Con estos filtros no hay ningún comedor."
                    : "No sabemos de ningún comedor que abra a esta hora con estos filtros."
                }
                proximoFueraDelFiltro={calcularProximoFueraDelFiltro(
                  estadoFiltrado.proximo,
                  estadoGlobal?.proximo,
                )}
                onQuitarFiltros={() => {
                  setBarrio("todos");
                  setServicio("todos");
                }}
              />
            )}
          </>
        )}
      </main>
      <PieDePagina />
    </div>
  );
}
