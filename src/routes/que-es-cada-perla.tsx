import { createFileRoute } from "@tanstack/react-router";

import { Pagina } from "@/components/Pagina";
import { CATEGORIAS } from "@/data/categorias";
import { RECURSOS, TEXTO_NIVEL, type Nivel } from "@/data/recursos";
import { UBICACIONES } from "@/data/ubicaciones";

export const Route = createFileRoute("/que-es-cada-perla")({
  head: () => ({
    meta: [
      { title: "Qué es Cada Perla — la ayuda que hay en Granada" },
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
  const fuentes = [...new Map(RECURSOS.flatMap((r) => r.fuentes).map((f) => [f.url, f])).values()];
  const porNivel = (n: Nivel) => RECURSOS.filter((r) => r.nivel === n).length;
  const situadas = Object.values(UBICACIONES);
  const aproximadas = situadas.filter((u) => !u.exacta).length;

  return (
    <Pagina ancho="max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-primary">Qué es Cada Perla</h1>

      <div className="mt-6 space-y-4 text-lg text-foreground">
        <p>
          Cada Perla reúne en una sola web la ayuda que hay en Granada capital, en{" "}
          {CATEGORIAS.length} apartados: comer, dormir, ducharse, salud, papeles, trabajo y más. De
          cada sitio dice dónde está, qué ofrece y a qué teléfono llamar.
        </p>
        <p>
          No somos una organización de ayuda y no atendemos a nadie: quien ayuda son los centros que
          aparecen aquí. Lo que hacemos es reunir en un sitio información que está repartida en
          guías sueltas, y enseñar siempre de dónde sale cada dato.
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
        <p>Cada ficha dice cuánto nos fiamos de su dirección y su teléfono:</p>
        <ul className="space-y-2">
          {(["A", "B", "C"] as const).map((n) => (
            <li key={n} className="rounded-xl border border-line bg-white p-4">
              <strong className="font-semibold">«{TEXTO_NIVEL[n]}»</strong>: {porNivel(n)} de{" "}
              {RECURSOS.length}.
            </li>
          ))}
        </ul>
        <p>
          No ponemos horarios: casi ninguno estaba confirmado, y preferimos que llames antes a
          mandarte a una puerta cerrada.
        </p>
        <p>
          De los {situadas.length} sitios con dirección, {aproximadas} salen en el mapa de forma
          aproximada: el mapa de OpenStreetMap encuentra la calle, pero no el portal. En esas fichas
          lo pone.
        </p>
      </div>

      <p className="mt-10 rounded-xl border border-line bg-white p-5 text-base text-warm">
        Granada es también una fruta. Al abrirla, sus granos parecen perlas rojas: muchas, pequeñas,
        todas igual de importantes. Cada perla es una persona.
      </p>
    </Pagina>
  );
}
