import { Link } from "@tanstack/react-router";

import { ORIENTACION, telefonoEnlace } from "@/data/puntos";
import { LogoCadaPerla } from "./LogoCadaPerla";

export function PieDePagina() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2">
        <div>
          <LogoCadaPerla size={32} />
          <p className="mt-3 max-w-sm text-base text-warm">
            Reunimos en un sitio los comedores sociales de Granada capital. No somos una
            organización de ayuda: quien atiende son los centros que aparecen aquí.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">
            ¿Necesitas ayuda ahora?
          </h2>
          <p className="mt-3 text-base text-foreground">
            Llama al {ORIENTACION.nombre}:
            <br />
            {ORIENTACION.telefonos.map((t) => (
              <a
                key={t}
                className="font-semibold text-primary underline"
                href={`tel:${telefonoEnlace(t)}`}
              >
                {t}
              </a>
            ))}
          </p>
          <p className="mt-4 text-base">
            <Link to="/contacto" className="font-medium text-primary underline">
              Ver todos los teléfonos de ayuda
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-base text-warm">
          Cada Perla · Granada. Esta web es gratis y no pide datos personales.
        </p>
      </div>
    </footer>
  );
}
