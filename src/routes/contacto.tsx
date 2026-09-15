import { createFileRoute } from "@tanstack/react-router";
import { Globe, MapPin, Phone } from "lucide-react";

import { Aviso } from "@/components/Aviso";
import { Cabecera } from "@/components/Cabecera";
import { PieDePagina } from "@/components/PieDePagina";
import { AYUDA, telefonoEnlace } from "@/data/puntos";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Teléfonos de ayuda en Granada — Cada Perla" },
      {
        name: "description",
        content: "A quién llamar en Granada si necesitas comida o no sabes a dónde acudir.",
      },
      { property: "og:title", content: "Teléfonos de ayuda en Granada" },
      { property: "og:description", content: "A quién llamar si necesitas comida en Granada." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <div className="min-h-screen bg-background">
      <Cabecera />
      <Aviso />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-3xl font-bold text-primary">A quién llamar</h1>
        <p className="mt-3 text-lg text-foreground">
          Cada Perla no atiende a nadie por teléfono: es un trabajo de clase, no una organización.
          Estas sí son las entidades reales de Granada, y estos son sus teléfonos.
        </p>

        <div className="mt-8 space-y-4">
          {AYUDA.map((a) => (
            <section key={a.id} className="rounded-xl border border-line bg-white p-6">
              <h2 className="font-display text-xl font-semibold text-foreground">{a.nombre}</h2>
              <p className="mt-2 text-base text-foreground">{a.queHace}</p>

              <ul className="mt-4 space-y-2 text-base">
                {a.direccion && (
                  <li className="flex gap-2">
                    <MapPin aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
                    <span>{a.direccion}</span>
                  </li>
                )}
                {a.telefonos.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Phone aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
                    <a className="font-semibold text-primary underline" href={`tel:${telefonoEnlace(t)}`}>
                      {t}
                    </a>
                  </li>
                ))}
                {a.web && (
                  <li className="flex gap-2">
                    <Globe aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
                    <a
                      className="text-primary underline"
                      href={a.web}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {a.web.replace("https://", "")}
                    </a>
                  </li>
                )}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-8 rounded-xl border border-line bg-white p-5 text-base text-warm">
          ¿Has visto un horario mal puesto o falta un comedor? Es muy probable: los datos salen de
          guías públicas y algunos son antiguos. Díselo a tu profesor o a quien te haya pasado esta
          web, y se corrige.
        </p>
      </main>
      <PieDePagina />
    </div>
  );
}
