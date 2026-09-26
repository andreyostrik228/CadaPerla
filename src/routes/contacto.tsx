import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, MapPin, Phone } from "lucide-react";

import { Pagina } from "@/components/Pagina";
import { Urgencias } from "@/components/Urgencias";
import { BANCO_ALIMENTOS, ORIENTACION, telefonoEnlace } from "@/data/recursos";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Teléfonos de ayuda en Granada — Cada Perla" },
      {
        name: "description",
        content: "A quién llamar en Granada si necesitas ayuda o no sabes a dónde acudir.",
      },
      { property: "og:title", content: "Teléfonos de ayuda en Granada" },
      { property: "og:description", content: "A quién llamar si necesitas ayuda en Granada." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <Pagina ancho="max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-primary">A quién llamar</h1>
      <p className="mt-3 text-lg text-foreground">
        Cada Perla no atiende a nadie por teléfono: no somos una organización de ayuda. Estos
        teléfonos sí son de quien ayuda.
      </p>

      <div className="mt-8">
        <Urgencias />
      </div>

      <section className="mt-4 rounded-xl border border-line bg-white p-6">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Si no sabes a dónde ir
        </h2>
        <p className="mt-2 text-base text-foreground">
          {ORIENTACION.nombre}. Si no tienes casa, es el primer sitio al que llamar: te orientan y
          te derivan al recurso que te corresponde.
        </p>
        <ul className="mt-4 space-y-2 text-base">
          <li className="flex gap-2">
            <MapPin aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
            <span>{ORIENTACION.direccion}</span>
          </li>
          {ORIENTACION.telefonos.map((t) => (
            <li key={t} className="flex gap-2">
              <Phone aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
              <a className="font-semibold text-primary underline" href={`tel:${telefonoEnlace(t)}`}>
                {t}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-base text-foreground">
          Para todo lo demás, los{" "}
          <Link
            to="/ayuda/$categoria"
            params={{ categoria: "servicios-sociales" }}
            className="font-semibold text-primary underline"
          >
            servicios sociales de tu distrito
          </Link>{" "}
          son la puerta de entrada.
        </p>
      </section>

      <section className="mt-4 rounded-xl border border-line bg-white p-6">
        <h2 className="font-display text-xl font-semibold text-foreground">
          {BANCO_ALIMENTOS.nombre}
        </h2>
        <p className="mt-2 text-base text-foreground">{BANCO_ALIMENTOS.queHace}</p>
        <ul className="mt-4 space-y-2 text-base">
          <li className="flex gap-2">
            <MapPin aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
            <span>{BANCO_ALIMENTOS.direccion}</span>
          </li>
          {BANCO_ALIMENTOS.telefonos.map((t) => (
            <li key={t} className="flex gap-2">
              <Phone aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
              <a className="font-semibold text-primary underline" href={`tel:${telefonoEnlace(t)}`}>
                {t}
              </a>
            </li>
          ))}
          <li className="flex gap-2">
            <Globe aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
            <a
              className="text-primary underline"
              href={BANCO_ALIMENTOS.web}
              target="_blank"
              rel="noreferrer"
            >
              {BANCO_ALIMENTOS.web.replace("https://", "")}
            </a>
          </li>
        </ul>
      </section>

      <p className="mt-8 rounded-xl border border-line bg-white p-5 text-base text-warm">
        ¿Has visto un dato mal puesto o falta un sitio? Es muy probable: los datos salen de guías
        públicas y algunas son de 2023. Escríbenos y lo corregimos.
      </p>
    </Pagina>
  );
}
