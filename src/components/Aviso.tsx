import { AlertTriangle, Phone } from "lucide-react";

import { infoCategoria, type Categoria } from "@/data/categorias";
import { ORIENTACION, telefonoEnlace } from "@/data/recursos";

/**
 * Aviso permanente: los datos salen de guías públicas y pueden haber
 * cambiado, así que siempre hay que llamar antes de ir. Hay que decirlo donde
 * se vea, no en letra pequeña.
 *
 * Al lado, el teléfono que más sentido tiene en cada categoría (016 en
 * Mujeres, 024 en Salud mental…). Sin categoría, el del COASPSH. Si una
 * categoría no tiene un teléfono que valga para todos, no se pone ninguno.
 *
 * Va en una sola línea a propósito. En móvil ocupaba 169 px (el 21% de la
 * pantalla) y empujaba el primer sitio hasta los 890 px: quien entra con
 * prisa leía cinco líneas de advertencias antes de ver a dónde ir.
 */
export function Aviso({ tema }: { tema?: Categoria | undefined }) {
  const llamada = tema
    ? infoCategoria(tema).llamada
    : { texto: "¿No sabes a dónde ir?", telefono: ORIENTACION.telefonos[0] ?? "" };

  return (
    <div className="border-b border-line bg-accent/15">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5">
        <p className="flex items-start gap-2 text-base text-foreground">
          <AlertTriangle aria-hidden size={18} className="mt-1 shrink-0 text-primary" />
          <span>
            <strong className="font-semibold">Llama antes de ir:</strong> los datos salen de guías
            públicas y pueden haber cambiado.
          </span>
        </p>

        {llamada && (
          <a
            href={`tel:${telefonoEnlace(llamada.telefono)}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-3 py-2 text-base font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Phone aria-hidden size={16} />
            {llamada.texto} {llamada.telefono}
          </a>
        )}
      </div>
    </div>
  );
}
