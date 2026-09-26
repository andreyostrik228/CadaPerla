import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { BuscadorRecursos } from "@/components/BuscadorRecursos";
import { Pagina } from "@/components/Pagina";
import { CATEGORIAS, estiloTema, type Categoria } from "@/data/categorias";
import { RECURSOS } from "@/data/recursos";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa de la ayuda en Granada — Cada Perla" },
      {
        name: "description",
        content:
          "Mapa y lista de todos los sitios de ayuda de Granada capital, por tipo de ayuda y distrito.",
      },
      { property: "og:title", content: "Mapa de la ayuda en Granada" },
      { property: "og:description", content: "Todos los sitios, por tipo de ayuda y distrito." },
    ],
  }),
  component: Mapa,
});

/**
 * Todo junto. Cada marcador lleva el color de la primera categoría de su
 * ficha, y los botones de arriba sirven a la vez de filtro y de leyenda.
 */
function Mapa() {
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const recursos = useMemo(
    () => (categoria ? RECURSOS.filter((r) => r.categorias.includes(categoria)) : RECURSOS),
    [categoria],
  );

  return (
    <Pagina>
      <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">Mapa de la ayuda</h1>
      <p className="mt-3 text-lg text-foreground">
        Los {RECURSOS.length} sitios y teléfonos que hemos podido localizar en Granada capital. El
        color de cada marcador es el de su tipo de ayuda.
      </p>

      <fieldset className="mt-6">
        <legend className="text-base font-medium text-foreground">Tipo de ayuda</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={categoria === null}
            onClick={() => setCategoria(null)}
            className="rounded-full border-2 border-foreground px-4 py-2 text-base font-medium text-foreground aria-pressed:bg-foreground aria-pressed:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Todo
          </button>
          {CATEGORIAS.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={categoria === c.id}
              onClick={() => setCategoria(c.id)}
              style={estiloTema(c.id)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-4 py-2 text-base font-medium text-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span aria-hidden className="size-3 rounded-full bg-primary ring-2 ring-white" />
              {c.nombre}
            </button>
          ))}
        </div>
      </fieldset>

      <BuscadorRecursos
        key={categoria ?? "todo"}
        recursos={recursos}
        categoria={categoria ?? undefined}
      />
    </Pagina>
  );
}
