import { AlertTriangle, Phone } from "lucide-react";

import { ORIENTACION, telefonoEnlace } from "@/data/puntos";

/**
 * Aviso permanente: la mayoría de los horarios aún no están confirmados con
 * cada centro, y eso hay que decirlo donde se vea, no en letra pequeña.
 * Se quita en cuanto estén todos comprobados por teléfono.
 *
 * Va en una sola línea a propósito. En móvil ocupaba 169 px (el 21% de la
 * pantalla) y empujaba el primer comedor hasta los 890 px: quien entra con
 * hambre leía cinco líneas de advertencias antes de ver a dónde ir.
 */
export function Aviso() {
  const telefono = ORIENTACION.telefonos[0] ?? "";

  return (
    <div className="border-b border-line bg-accent/15">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5">
        <p className="flex items-start gap-2 text-base text-foreground">
          <AlertTriangle aria-hidden size={18} className="mt-1 shrink-0 text-primary" />
          <span>
            <strong className="font-semibold">Llama antes de ir:</strong> la mayoría de los horarios
            no están confirmados.
          </span>
        </p>

        <a
          href={`tel:${telefonoEnlace(telefono)}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-3 py-2 text-base font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Phone aria-hidden size={16} />
          ¿Ayuda ahora? {telefono}
        </a>
      </div>
    </div>
  );
}
