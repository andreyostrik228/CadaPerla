import { AlertTriangle, Phone } from "lucide-react";

import { telefonoEnlace } from "@/data/puntos";

/**
 * Aviso permanente: la mayoría de los horarios aún no están confirmados con
 * cada centro, y eso hay que decirlo donde se vea, no en letra pequeña.
 * Se quita en cuanto estén todos comprobados por teléfono.
 */
export function Aviso() {
  return (
    <div className="border-b border-line bg-accent/15">
      <div className="mx-auto flex max-w-5xl gap-3 px-4 py-3">
        <AlertTriangle aria-hidden size={20} className="mt-0.5 shrink-0 text-primary" />
        <p className="text-base text-foreground">
          Todos los sitios que aparecen son reales, pero la mayoría de los horarios aún no están
          confirmados: <strong className="font-semibold">llama antes de ir.</strong> Si necesitas
          ayuda ahora, llama al{" "}
          <a className="font-semibold text-primary underline" href={`tel:${telefonoEnlace("958 18 00 47")}`}>
            <Phone aria-hidden size={15} className="inline" /> 958 18 00 47
          </a>{" "}
          — el centro de orientación del Ayuntamiento de Granada.
        </p>
      </div>
    </div>
  );
}
