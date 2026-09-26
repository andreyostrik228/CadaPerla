import { createFileRoute } from "@tanstack/react-router";

import { Pagina } from "@/components/Pagina";

const PREGUNTAS = [
  {
    p: "¿Tengo que pagar algo?",
    r: "Por usar esta web, no. Los sitios que aparecen aquí son de ayuda social, pero no podemos asegurar que todo lo que hacen sea gratis: pregúntalo al llamar.",
  },
  {
    p: "¿Necesito papeles?",
    r: "Depende del sitio. En el comedor de San Juan de Dios la primera vez basta con DNI, NIE o pasaporte. En los demás no lo sabemos: pregunta por teléfono antes de ir.",
  },
  {
    p: "¿Me vais a pedir mis datos?",
    r: "No. Esta web no te pide nombre, ni correo, ni teléfono.",
  },
  {
    p: "¿Por qué no ponéis horarios?",
    r: "Porque casi ninguno estaba confirmado, y un horario equivocado te manda a una puerta cerrada. Por eso cada ficha tiene su teléfono: llama antes de ir.",
  },
  {
    p: "¿Puedo ir directamente a un albergue?",
    r: "Según la guía del Ayuntamiento, a los albergues se llega derivado desde el COASPSH, en la calle Santa Rosalía 6 (958 18 00 47). Llama allí primero.",
  },
  {
    p: "¿Qué quiere decir «Comprobado en su propia web»?",
    r: "Que la dirección y el teléfono los hemos visto en la web de la propia entidad. Si pone «guía del Ayuntamiento», salen de una guía oficial de 2023. Si pone «guía de 2024», salen de una guía de otra organización y es más fácil que hayan cambiado.",
  },
  {
    p: "¿Está toda la ayuda de Granada?",
    r: "No. Solo la que hemos podido encontrar en guías públicas. Seguro que hay más.",
  },
];

export const Route = createFileRoute("/preguntas")({
  head: () => ({
    meta: [
      { title: "Preguntas frecuentes — Cada Perla Granada" },
      {
        name: "description",
        content: "Dudas sobre pedir ayuda en Granada: papeles, precio, horarios y datos.",
      },
      { property: "og:title", content: "Preguntas frecuentes — Cada Perla" },
      { property: "og:description", content: "Dudas sobre pedir ayuda en Granada." },
    ],
  }),
  component: Preguntas,
});

function Preguntas() {
  return (
    <Pagina ancho="max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-primary">Preguntas</h1>
      <dl className="mt-6 space-y-4">
        {PREGUNTAS.map((q) => (
          <div key={q.p} className="rounded-xl border border-line bg-white p-5">
            <dt className="font-display text-lg font-semibold text-foreground">{q.p}</dt>
            <dd className="mt-2 text-base text-foreground">{q.r}</dd>
          </div>
        ))}
      </dl>
    </Pagina>
  );
}
