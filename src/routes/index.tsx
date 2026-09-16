import { createFileRoute, Link } from "@tanstack/react-router";

import { Aviso } from "@/components/Aviso";
import { Cabecera } from "@/components/Cabecera";
import { FichaPunto } from "@/components/FichaPunto";
import { PieDePagina } from "@/components/PieDePagina";
import { PUNTOS } from "@/data/puntos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cada Perla — Comida cerca de ti, hoy en Granada" },
      {
        name: "description",
        content: "Comedores sociales de Granada: dirección, teléfono, horario y qué llevar.",
      },
      { property: "og:title", content: "Cada Perla — Comida cerca de ti, hoy" },
      {
        property: "og:description",
        content: "Comedores sociales de Granada, con dirección y teléfono.",
      },
    ],
  }),
  component: Inicio,
});

/**
 * La portada va deliberadamente corta: sin buscador y con una sola frase de
 * entrada, para que el primer comedor se vea sin tener que bajar una pantalla
 * entera en el móvil. El buscador vive en /necesito-comida, que es justo a
 * donde lleva el botón principal.
 */
function Inicio() {
  const verificados = PUNTOS.filter((p) => p.verificado).length;

  return (
    <div className="min-h-screen bg-background">
      <Cabecera />
      <Aviso />

      <main>
        <section className="mx-auto max-w-5xl px-4 pt-6 pb-2">
          <h1 className="font-display text-4xl font-bold text-primary sm:text-5xl">
            Comida cerca de ti, hoy
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-foreground">
            Dónde comer gratis en Granada: dirección, teléfono y qué hace falta llevar.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/necesito-comida"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-4 text-lg font-semibold text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Necesito comida
            </Link>
            <Link
              to="/quiero-ayudar"
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-6 py-4 text-lg font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Quiero ayudar
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-6">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Sitios a los que puedes ir
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {PUNTOS.map((p) => (
              <FichaPunto key={p.id} punto={p} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-8">
          <h2 className="sr-only">Cada Perla en cifras</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { valor: String(PUNTOS.length), texto: "comedores recogidos en Granada capital" },
              { valor: String(verificados), texto: "con el horario comprobado en su web oficial" },
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
      </main>

      <PieDePagina />
    </div>
  );
}
