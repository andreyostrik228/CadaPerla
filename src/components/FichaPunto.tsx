import { CalendarClock, Clock, Info, MapPin, Phone, Utensils } from "lucide-react";
import { useEffect, useState } from "react";

import { estaAbierto, telefonoEnlace, type Punto } from "@/data/puntos";

/**
 * El estado "abierto ahora" depende de la hora, que no es la misma en el
 * servidor que en el navegador. Calcularlo durante el render rompía la
 * hidratación de React (error #418), así que se calcula ya montado.
 */
function useAbierto(punto: Punto) {
  const [abierto, setAbierto] = useState<boolean | null>(null);
  useEffect(() => {
    setAbierto(estaAbierto(punto, new Date()));
  }, [punto]);
  return abierto;
}

export function FichaPunto({ punto }: { punto: Punto }) {
  const abierto = useAbierto(punto);
  const mapa = `https://www.openstreetmap.org/?mlat=${punto.coords.lat}&mlon=${punto.coords.lng}#map=18/${punto.coords.lat}/${punto.coords.lng}`;

  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-white p-5">
      <h3 className="font-display text-lg font-bold text-foreground">{punto.nombre}</h3>
      {punto.entidad && <p className="mt-0.5 text-sm text-warm">{punto.entidad}</p>}

      <p className="mt-3">
        {punto.verificado ? (
          abierto === null ? (
            <span className="inline-block rounded-full bg-muted px-3 py-1 text-base font-semibold text-warm">
              {punto.horario}
            </span>
          ) : abierto ? (
            <span className="inline-block rounded-full bg-open/10 px-3 py-1 text-base font-semibold text-open">
              ABIERTO AHORA · cierra a las {punto.apertura?.cierra}
            </span>
          ) : (
            <span className="inline-block rounded-full bg-muted px-3 py-1 text-base font-semibold text-warm">
              CERRADO AHORA
            </span>
          )
        ) : (
          <span className="inline-block rounded-full border border-warm/40 px-3 py-1 text-base font-semibold text-warm">
            HORARIO SIN CONFIRMAR
          </span>
        )}
      </p>

      <ul className="mt-4 space-y-2 text-base text-foreground">
        <li className="flex gap-2">
          <MapPin aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
          <span>
            {punto.direccion}
            <span className="text-warm"> · {punto.barrio}</span>
          </span>
        </li>
        <li className="flex gap-2">
          <Utensils aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
          <span>{punto.servicios.join(", ")}</span>
        </li>
        <li className="flex gap-2">
          <Clock aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
          <span>
            {punto.horario ?? (
              <strong className="font-semibold">
                No hemos podido confirmar el horario. Llama antes de ir.
              </strong>
            )}
          </span>
        </li>
        <li className="flex gap-2">
          <CalendarClock aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
          <span>{punto.requisitos}</span>
        </li>
        {punto.nota && (
          <li className="flex gap-2">
            <Info aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
            <span className="text-warm">{punto.nota}</span>
          </li>
        )}
      </ul>

      {punto.notaTelefonos && (
        <p className="mt-4 text-base text-foreground">{punto.notaTelefonos}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {punto.telefonos.map((t) => (
          <a
            key={t}
            href={`tel:${telefonoEnlace(t)}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-base font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Phone aria-hidden size={18} />
            {t}
          </a>
        ))}
        <a
          href={mapa}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-4 py-2 text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <MapPin aria-hidden size={18} />
          Cómo llegar
        </a>
      </div>

      <p className="mt-4 border-t border-line pt-3 text-sm text-warm">
        {punto.coords.exacta ? "" : "Situación en el mapa aproximada. "}
        {punto.fuentes.length === 1 ? (
          <>
            Dato sacado de{" "}
            <a className="underline" href={punto.fuentes[0]!.url} target="_blank" rel="noreferrer">
              {punto.fuentes[0]!.texto}
            </a>
            .
          </>
        ) : (
          <>
            Datos sacados de:{" "}
            {punto.fuentes.map((f, i) => (
              <span key={f.url}>
                {i > 0 && " · "}
                <a className="underline" href={f.url} target="_blank" rel="noreferrer">
                  {f.texto}
                </a>
                {f.confirma && ` (${f.confirma})`}
              </span>
            ))}
            .
          </>
        )}
      </p>
    </article>
  );
}
