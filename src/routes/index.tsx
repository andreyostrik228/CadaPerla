import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Pagina } from "@/components/Pagina";
import { Urgencias } from "@/components/Urgencias";
import { CATEGORIAS, estiloTema } from "@/data/categorias";
import { ORIENTACION, RECURSOS, recursosDe, telefonoEnlace } from "@/data/recursos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cada Perla — la ayuda que hay en Granada" },
      {
        name: "description",
        content:
          "Dónde comer, dormir, ducharte, ir al médico o arreglar papeles en Granada: dirección, teléfono y de dónde sale cada dato.",
      },
      { property: "og:title", content: "Cada Perla — la ayuda que hay en Granada" },
      {
        property: "og:description",
        content: "Comer, dormir, salud, papeles, trabajo y más, en Granada capital.",
      },
    ],
  }),
  component: Inicio,
});

/**
 * La portada empieza por la pregunta, no por una lista: con más de 70 sitios,
 * quien entra con prisa tiene que poder llegar en un toque a lo suyo. Cada
 * botón lleva los colores de su categoría, los mismos que verá en la página
 * a la que lleva.
 */
function Inicio() {
  const conWebPropia = RECURSOS.filter((r) => r.nivel === "A").length;

  return (
    <Pagina>
      <h1 className="font-display text-4xl font-bold text-primary sm:text-5xl">¿Qué necesitas?</h1>
      <p className="mt-3 max-w-2xl text-lg text-foreground">
        La ayuda que hay en Granada, en un solo sitio: dirección, teléfono y de dónde sale cada
        dato. Elige lo que buscas.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIAS.map((c) => {
          const n = recursosDe(c.id).length;
          return (
            <li key={c.id} style={estiloTema(c.id)}>
              <Link
                to="/ayuda/$categoria"
                params={{ categoria: c.id }}
                className="group flex h-full flex-col rounded-xl bg-primary p-5 text-primary-foreground focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="flex items-center justify-between gap-2 font-display text-2xl font-bold">
                  {c.nombre}
                  <ArrowRight
                    aria-hidden
                    size={22}
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span className="mt-1 text-base opacity-90">{c.descripcion}</span>
                <span className="mt-auto pt-3 text-sm font-semibold">
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-accent-foreground">
                    {n} {n === 1 ? "sitio" : "sitios"}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <Urgencias />
      </div>

      <section className="mt-8 rounded-xl border border-line bg-white p-5">
        <h2 className="font-display text-xl font-semibold text-foreground">
          ¿No sabes por dónde empezar?
        </h2>
        <p className="mt-2 text-base text-foreground">
          Si no tienes casa, llama al {ORIENTACION.nombre}:{" "}
          <a
            className="font-semibold text-primary underline"
            href={`tel:${telefonoEnlace(ORIENTACION.telefonos[0] ?? "")}`}
          >
            {ORIENTACION.telefonos[0]}
          </a>
          . Para todo lo demás, empieza por los{" "}
          <Link
            to="/ayuda/$categoria"
            params={{ categoria: "servicios-sociales" }}
            className="font-semibold text-primary underline"
          >
            servicios sociales de tu distrito
          </Link>
          .
        </p>
      </section>

      <section className="mt-8">
        <h2 className="sr-only">Cada Perla en cifras</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              valor: String(RECURSOS.length),
              texto: "sitios y teléfonos de ayuda en Granada capital",
            },
            { valor: String(conWebPropia), texto: "comprobados en su propia web" },
            { valor: "0 €", texto: "cuesta usar esta web" },
            { valor: "0", texto: "datos personales que pedimos" },
          ].map((c) => (
            <div key={c.texto} className="rounded-xl border border-line bg-white p-5">
              <p className="font-display text-4xl font-bold text-primary">{c.valor}</p>
              <p className="mt-1 text-base text-warm">{c.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </Pagina>
  );
}
