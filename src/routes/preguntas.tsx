import { createFileRoute } from "@tanstack/react-router";

import { Aviso } from "@/components/Aviso";
import { Cabecera } from "@/components/Cabecera";
import { PieDePagina } from "@/components/PieDePagina";

const PREGUNTAS = [
  { p: "¿Tengo que pagar algo?", r: "No. Nada de lo que aparece aquí cuesta dinero." },
  {
    p: "¿Necesito papeles?",
    r: "Depende del sitio. En San Juan de Dios la primera vez basta con DNI, NIE o pasaporte. En los demás no lo sabemos: pregunta por teléfono antes de ir.",
  },
  { p: "¿Me vais a pedir mis datos?", r: "No. Esta web no te pide nombre, ni correo, ni teléfono." },
  {
    p: "¿Por qué muchas fichas no dicen la hora?",
    r: "Porque no hemos podido confirmarla. Preferimos decir «llama antes» a darte una hora que quizá ya no sea la buena.",
  },
  {
    p: "¿Están todos los comedores de Granada?",
    r: "No. Solo los que hemos podido localizar en guías públicas. Seguro que hay más.",
  },
  {
    p: "¿Y si el horario que pone está mal?",
    r: "Es posible, y lo sentimos. Llama al centro para confirmarlo: en cada ficha está su teléfono.",
  },
];

export const Route = createFileRoute("/preguntas")({
  head: () => ({
    meta: [
      { title: "Preguntas frecuentes — Cada Perla Granada" },
      { name: "description", content: "Dudas sobre pedir comida en Granada: papeles, precio y datos." },
      { property: "og:title", content: "Preguntas frecuentes — Cada Perla" },
      { property: "og:description", content: "Dudas sobre pedir comida en Granada." },
    ],
  }),
  component: Preguntas,
});

function Preguntas() {
  return (
    <div className="min-h-screen bg-background">
      <Cabecera />
      <Aviso />
      <main id="contenido" tabIndex={-1} className="mx-auto max-w-3xl px-4 py-10 outline-none">
        <h1 className="font-display text-3xl font-bold text-primary">Preguntas</h1>
        <dl className="mt-6 space-y-4">
          {PREGUNTAS.map((q) => (
            <div key={q.p} className="rounded-xl border border-line bg-white p-5">
              <dt className="font-display text-lg font-semibold text-foreground">{q.p}</dt>
              <dd className="mt-2 text-base text-foreground">{q.r}</dd>
            </div>
          ))}
        </dl>
      </main>
      <PieDePagina />
    </div>
  );
}
