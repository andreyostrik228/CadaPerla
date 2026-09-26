import { Siren } from "lucide-react";

import { URGENCIAS, telefonoEnlace } from "@/data/recursos";

/** Los teléfonos de urgencias. Gratis y a cualquier hora. */
export function Urgencias() {
  return (
    <section
      aria-labelledby="titulo-urgencias"
      className="rounded-xl border-2 border-primary bg-white p-5"
    >
      <h2
        id="titulo-urgencias"
        className="flex items-center gap-2 font-display text-xl font-semibold text-foreground"
      >
        <Siren aria-hidden size={22} className="text-primary" />
        ¿Es urgente?
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {URGENCIAS.map((u) => (
          <li key={u.telefono}>
            <a
              href={`tel:${telefonoEnlace(u.telefono)}`}
              className="flex items-center gap-3 rounded-lg bg-primary px-4 py-3 text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="font-display text-2xl font-bold tabular-nums">{u.telefono}</span>
              <span className="text-base leading-tight">{u.para}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
