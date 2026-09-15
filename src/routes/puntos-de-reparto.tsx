import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Aviso } from "@/components/Aviso";
import { Cabecera } from "@/components/Cabecera";
import { FichaPunto } from "@/components/FichaPunto";
import { MapaPuntos } from "@/components/MapaPuntos";
import { PieDePagina } from "@/components/PieDePagina";
import { PUNTOS, type Servicio } from "@/data/puntos";

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

function PuntosDeReparto() {
  const [barrio, setBarrio] = useState("todos");
  const [servicio, setServicio] = useState<"todos" | Servicio>("todos");

  const barrios = useMemo(() => [...new Set(PUNTOS.map((p) => p.barrio))].sort(), []);

  const lista = PUNTOS.filter(
    (p) =>
      (barrio === "todos" || p.barrio === barrio) &&
      (servicio === "todos" || p.servicios.includes(servicio)),
  );

  return (
    <div className="min-h-screen bg-background">
      <Cabecera />
      <Aviso />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">
          Comedores sociales
        </h1>
        <p className="mt-3 text-lg text-foreground">
          Los {PUNTOS.length} comedores que hemos podido localizar en Granada capital.
        </p>

        <div className="mt-6">
          <MapaPuntos puntos={lista} />
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
        </div>

        <p className="mt-6 text-base text-warm" aria-live="polite">
          {lista.length} {lista.length === 1 ? "comedor" : "comedores"}.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {lista.map((p) => (
            <FichaPunto key={p.id} punto={p} />
          ))}
        </div>
      </main>
      <PieDePagina />
    </div>
  );
}
