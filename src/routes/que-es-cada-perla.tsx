import { createFileRoute } from "@tanstack/react-router";

import { Aviso } from "@/components/Aviso";
import { Cabecera } from "@/components/Cabecera";
import { PieDePagina } from "@/components/PieDePagina";
import { PUNTOS } from "@/data/puntos";

export const Route = createFileRoute("/que-es-cada-perla")({
  head: () => ({
    meta: [
      { title: "Qué es Cada Perla — comedores sociales de Granada" },
      {
        name: "description",
        content: "Qué es este proyecto, de dónde salen los datos y qué no está confirmado.",
      },
      { property: "og:title", content: "Qué es Cada Perla" },
      { property: "og:description", content: "Qué es el proyecto y de dónde salen los datos." },
    ],
  }),
  component: QueEs,
});

function QueEs() {
  const fuentes = [...new Map(PUNTOS.flatMap((p) => p.fuentes).map((f) => [f.url, f])).values()];

  return (
    <div className="min-h-screen bg-background">
      <Cabecera />
      <Aviso />
      <main id="contenido" tabIndex={-1} className="mx-auto max-w-3xl px-4 py-10 outline-none">
        <h1 className="font-display text-3xl font-bold text-primary">Qué es Cada Perla</h1>

        <div className="mt-6 space-y-4 text-lg text-foreground">
          <p>
            Cada Perla reúne en una sola página los comedores sociales de Granada capital: dónde
            están, qué dan de comer, qué hace falta llevar y a qué teléfono llamar.
          </p>
          <p>
            No somos una organización de ayuda y no atendemos a nadie: quien da de comer son los
            centros que aparecen aquí. Lo que hacemos es reunir en un sitio información que está
            repartida en guías sueltas, y enseñar siempre de dónde sale cada dato.
          </p>
        </div>

        <h2 className="mt-10 font-display text-2xl font-semibold text-foreground">
          De dónde salen los datos
        </h2>
        <ul className="mt-4 space-y-2 text-lg text-foreground">
          {fuentes.map((f) => (
            <li key={f.url}>
              <a className="text-primary underline" href={f.url} target="_blank" rel="noreferrer">
                {f.texto}
              </a>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-2xl font-semibold text-foreground">
          Qué no está confirmado
        </h2>
        <div className="mt-4 space-y-4 text-lg text-foreground">
          <p>
            De los {PUNTOS.length} comedores, solo el de San Juan de Dios tiene el horario
            comprobado en su propia web. Los demás salen de una guía de recursos que no lleva fecha
            de publicación, así que sus horarios pueden haber cambiado.
          </p>
          <p>
            Por eso esas fichas no dicen una hora: dicen{" "}
            <strong>«horario sin confirmar, llama antes de ir»</strong>. Preferimos quedarnos
            cortos a mandar a alguien con hambre a un sitio cerrado.
          </p>
          <p>
            Las direcciones de dos comedores aparecen en el mapa de forma aproximada, porque el
            portal no tiene número exacto. En esas fichas lo pone.
          </p>
        </div>

        <p className="mt-10 rounded-xl border border-line bg-white p-5 text-base text-warm">
          Granada es también una fruta. Al abrirla, sus granos parecen perlas rojas: muchas,
          pequeñas, todas igual de importantes. Cada perla es una persona.
        </p>
      </main>
      <PieDePagina />
    </div>
  );
}
