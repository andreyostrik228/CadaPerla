import { createFileRoute } from "@tanstack/react-router";
import { HandHeart, PackageOpen, Phone } from "lucide-react";

import { Pagina } from "@/components/Pagina";
import { BANCO_ALIMENTOS, recursosDe, telefonoEnlace } from "@/data/recursos";

export const Route = createFileRoute("/quiero-ayudar")({
  head: () => ({
    meta: [
      { title: "Quiero ayudar — voluntariado y donaciones en Granada" },
      {
        name: "description",
        content: "Cómo ser voluntario o donar alimentos en los comedores sociales de Granada.",
      },
      { property: "og:title", content: "Quiero ayudar — Cada Perla" },
      { property: "og:description", content: "Voluntariado y donaciones en Granada." },
    ],
  }),
  component: QuieroAyudar,
});

function QuieroAyudar() {
  const comedores = recursosDe("comer");

  return (
    <Pagina ancho="max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">Quiero ayudar</h1>
      <p className="mt-3 text-lg text-foreground">
        Nosotros no recogemos ni dinero ni alimentos. Si quieres ayudar, hazlo directamente con las
        entidades que sí lo hacen.
      </p>

      <section className="mt-8 rounded-xl border border-line bg-white p-6">
        <HandHeart aria-hidden size={28} className="text-primary" />
        <h2 className="mt-3 font-display text-xl font-semibold text-foreground">
          Ser voluntario en un comedor
        </h2>
        <p className="mt-2 text-base text-foreground">
          Llama al comedor que te pille más cerca y pregunta. Cada uno organiza su voluntariado por
          su cuenta.
        </p>
        <ul className="mt-4 space-y-2 text-base">
          {comedores.map((c) => (
            <li key={c.id} className="flex flex-wrap items-center gap-2">
              <Phone aria-hidden size={18} className="shrink-0 text-warm" />
              <span className="font-medium">{c.nombre}:</span>
              {c.telefonos.map((t) => (
                <a
                  key={t}
                  className="font-semibold text-primary underline"
                  href={`tel:${telefonoEnlace(t)}`}
                >
                  {t}
                </a>
              ))}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-line bg-white p-6">
        <PackageOpen aria-hidden size={28} className="text-primary" />
        <h2 className="mt-3 font-display text-xl font-semibold text-foreground">
          Donar alimentos o dinero
        </h2>
        <p className="mt-2 text-base text-foreground">
          El {BANCO_ALIMENTOS.nombre} recoge alimentos y los reparte entre las entidades sociales de
          la provincia. Es la vía más directa para que una donación llegue a muchos sitios a la vez.
        </p>
        <ul className="mt-4 space-y-2 text-base">
          {BANCO_ALIMENTOS.telefonos.map((t) => (
            <li key={t} className="flex gap-2">
              <Phone aria-hidden size={18} className="mt-0.5 shrink-0 text-warm" />
              <a className="font-semibold text-primary underline" href={`tel:${telefonoEnlace(t)}`}>
                {t}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-base">
          <a
            className="text-primary underline"
            href={BANCO_ALIMENTOS.web}
            target="_blank"
            rel="noreferrer"
          >
            {BANCO_ALIMENTOS.web.replace("https://", "")}
          </a>
        </p>
      </section>
    </Pagina>
  );
}
