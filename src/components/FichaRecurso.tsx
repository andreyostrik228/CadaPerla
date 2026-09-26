import { Link } from "@tanstack/react-router";
import { Check, DoorOpen, Globe, Info, Mail, MapPin, Phone, Users } from "lucide-react";

import { estiloTema, infoCategoria, type Categoria } from "@/data/categorias";
import { TEXTO_NIVEL, formatoFecha, telefonoEnlace, type Recurso } from "@/data/recursos";
import { UBICACIONES } from "@/data/ubicaciones";

/**
 * Enlace universal de Google Maps para "Cómo llegar": abre la app en
 * Android/iOS si está instalada, o la web si no — sin clave de API ni script
 * de terceros en la página, solo un enlace normal.
 *
 * Con coordenadas exactas manda el punto preciso. Si son aproximadas, manda
 * la dirección en texto: una ruta hasta unas coordenadas aproximadas deja a
 * alguien delante de un portal que no es, con la falsa confianza de una línea
 * azul en el mapa.
 */
function enlaceComoLlegar(recurso: Recurso): string | null {
  if (!recurso.direccion) return null;
  const u = UBICACIONES[recurso.id];
  const destino = u?.exacta
    ? `${u.lat},${u.lng}`
    : `${recurso.nombre}, ${recurso.direccion.split(" — ")[0]}, Granada`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`;
}

function barrioDe(recurso: Recurso): string | null {
  return recurso.barrio ?? UBICACIONES[recurso.id]?.barrio ?? null;
}

const ESTILO_NIVEL = {
  A: "border-primary/30 bg-primary/5 text-primary",
  B: "border-line bg-muted text-warm",
  C: "border-accent bg-accent/20 text-foreground",
} as const;

/**
 * `desde`: la categoría de la página en la que se enseña la ficha, para no
 * repetirla en la lista de "también en".
 */
export function FichaRecurso({
  recurso,
  desde,
}: {
  recurso: Recurso;
  desde?: Categoria | undefined;
}) {
  const comoLlegar = enlaceComoLlegar(recurso);
  const ubicacion = UBICACIONES[recurso.id];
  const barrio = barrioDe(recurso);
  const otras = recurso.categorias.filter((c) => c !== desde);

  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-white p-5">
      <h3 className="font-display text-lg font-bold text-foreground">{recurso.nombre}</h3>
      {recurso.entidad && <p className="mt-0.5 text-sm text-warm">{recurso.entidad}</p>}

      <p className="mt-3">
        <span
          className={`inline-block rounded-full border px-3 py-1 text-sm font-semibold ${ESTILO_NIVEL[recurso.nivel]}`}
        >
          {TEXTO_NIVEL[recurso.nivel]}
        </span>
      </p>

      <ul className="mt-4 space-y-1.5 text-base text-foreground">
        {recurso.ofrece.map((o) => (
          <li key={o} className="flex gap-2">
            <Check aria-hidden size={20} className="mt-0.5 shrink-0 text-primary" />
            <span>{o}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-4 space-y-2 text-base text-foreground">
        {recurso.paraQuien && (
          <li className="flex gap-2">
            <Users aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
            <span>
              <span className="text-warm">Para: </span>
              {recurso.paraQuien}
            </span>
          </li>
        )}
        {recurso.comoSeEntra && (
          <li className="flex gap-2 rounded-lg bg-accent/15 p-2">
            <DoorOpen aria-hidden size={20} className="mt-0.5 shrink-0 text-primary" />
            <strong className="font-semibold">{recurso.comoSeEntra}</strong>
          </li>
        )}
        <li className="flex gap-2">
          <MapPin aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
          {recurso.direccion ? (
            <span>
              {recurso.direccion}
              {barrio && <span className="text-warm"> · {barrio}</span>}
            </span>
          ) : (
            <span className="text-warm">No tiene un sitio al que ir: llama o escribe.</span>
          )}
        </li>
        {recurso.nota && (
          <li className="flex gap-2">
            <Info aria-hidden size={20} className="mt-0.5 shrink-0 text-warm" />
            <span className="text-warm">{recurso.nota}</span>
          </li>
        )}
      </ul>

      {recurso.notaTelefonos && (
        <p className="mt-4 text-base text-foreground">{recurso.notaTelefonos}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {recurso.telefonos.map((t) => (
          <a
            key={t}
            href={`tel:${telefonoEnlace(t)}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-base font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Phone aria-hidden size={18} />
            {t}
          </a>
        ))}
        {recurso.email && (
          <a
            href={`mailto:${recurso.email}`}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-4 py-2 text-base font-semibold break-all text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Mail aria-hidden size={18} className="shrink-0" />
            {recurso.email}
          </a>
        )}
        {comoLlegar && (
          <a
            href={comoLlegar}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-4 py-2 text-base font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <MapPin aria-hidden size={18} />
            Cómo llegar
          </a>
        )}
        {recurso.web && (
          <a
            href={recurso.web}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-base font-medium text-primary underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Globe aria-hidden size={18} />
            Su web
          </a>
        )}
      </div>

      {otras.length > 0 && (
        <p className="mt-4 flex flex-wrap items-center gap-1.5 text-sm text-warm">
          {desde ? "También en:" : "Está en:"}
          {otras.map((c) => (
            <Link
              key={c}
              to="/ayuda/$categoria"
              params={{ categoria: c }}
              style={estiloTema(c)}
              className="rounded-full bg-primary px-2.5 py-0.5 font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {infoCategoria(c).nombre}
            </Link>
          ))}
        </p>
      )}

      {/* mt-auto empuja las fuentes al fondo de la tarjeta, para que todas acaben igual en la rejilla */}
      <div className="mt-auto pt-4">
        <p className="border-t border-line pt-3 text-sm text-warm">
          {ubicacion && !ubicacion.exacta && "Situación en el mapa aproximada. "}
          {recurso.fuentes.length === 1 ? "Dato sacado de " : "Datos sacados de: "}
          {recurso.fuentes.map((f, i) => (
            <span key={f.url + (f.confirma ?? "")}>
              {i > 0 && " · "}
              <a className="underline" href={f.url} target="_blank" rel="noreferrer">
                {f.texto}
              </a>
              {f.confirma && ` (${f.confirma})`}
            </span>
          ))}
          . Comprobado el {formatoFecha(recurso.revisado)}.
        </p>
      </div>
    </article>
  );
}
