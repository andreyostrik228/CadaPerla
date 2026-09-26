import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { BuscadorRecursos } from "@/components/BuscadorRecursos";
import { Pagina } from "@/components/Pagina";
import {
  CATEGORIAS,
  esCategoria,
  estiloTema,
  infoCategoria,
  type Categoria,
} from "@/data/categorias";
import { recursosDe } from "@/data/recursos";

export const Route = createFileRoute("/ayuda/$categoria")({
  beforeLoad: ({ params }) => {
    if (!esCategoria(params.categoria)) throw notFound();
  },
  head: ({ params }) => {
    if (!esCategoria(params.categoria)) return {};
    const c = infoCategoria(params.categoria);
    return {
      meta: [
        { title: `${c.nombre} en Granada — Cada Perla` },
        { name: "description", content: c.descripcion },
        { property: "og:title", content: `${c.lema} — Cada Perla` },
        { property: "og:description", content: c.descripcion },
      ],
    };
  },
  component: PaginaCategoria,
});

function PaginaCategoria() {
  const id = Route.useParams().categoria as Categoria;
  const c = infoCategoria(id);
  const recursos = recursosDe(id);

  return (
    <Pagina tema={id}>
      <p className="text-base font-semibold tracking-wide text-warm uppercase">{c.nombre}</p>
      <h1 className="mt-1 font-display text-4xl font-bold text-primary sm:text-5xl">{c.lema}</h1>
      <p className="mt-3 max-w-2xl text-lg text-foreground">{c.descripcion}</p>

      {/* key: al cambiar de categoría desde "También en", el buscador empieza de cero */}
      <BuscadorRecursos key={id} recursos={recursos} categoria={id} />

      <nav aria-labelledby="otras-categorias" className="mt-12">
        <h2 id="otras-categorias" className="font-display text-xl font-semibold text-foreground">
          Otro tipo de ayuda
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {CATEGORIAS.filter((o) => o.id !== id).map((o) => (
            <li key={o.id}>
              <Link
                to="/ayuda/$categoria"
                params={{ categoria: o.id }}
                style={estiloTema(o.id)}
                className="inline-block rounded-full bg-primary px-4 py-2 text-base font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {o.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Pagina>
  );
}
