import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { type Categoria } from "@/data/categorias";
import { ORIENTACION, telefonoEnlace, type Recurso } from "@/data/recursos";
import { UBICACIONES } from "@/data/ubicaciones";
import { FichaRecurso } from "./FichaRecurso";
import { MapaRecursos } from "./MapaRecursos";

/** Los 8 distritos de Granada, en el orden en que los lista el Ayuntamiento. */
const DISTRITOS = ["Albaicín", "Beiro", "Centro", "Chana", "Genil", "Norte", "Ronda", "Zaidín"];

function distritoDe(r: Recurso): string | null {
  return UBICACIONES[r.id]?.distrito ?? null;
}

/** Todo el texto por el que se puede encontrar una ficha, en minúsculas y sin tildes. */
function textoBuscable(r: Recurso): string {
  const u = UBICACIONES[r.id];
  return sinTildes(
    [
      r.nombre,
      r.entidad,
      r.direccion,
      r.barrio,
      ...(r.aliasBarrio ?? []),
      r.codigoPostal,
      u?.barrio,
      u?.distrito,
      ...r.ofrece,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function sinTildes(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/**
 * Buscador, filtro por distrito, mapa y lista de fichas. Lo usan la página de
 * cada categoría y el mapa general.
 *
 * `categoria`: la de la página (los marcadores llevan su color y las fichas
 * no la repiten en "también en").
 */
export function BuscadorRecursos({
  recursos,
  categoria,
  nombreSingular = "sitio",
  nombrePlural = "sitios",
}: {
  recursos: Recurso[];
  categoria?: Categoria | undefined;
  nombreSingular?: string;
  nombrePlural?: string;
}) {
  const [texto, setTexto] = useState("");
  const [consulta, setConsulta] = useState("");
  const [distrito, setDistrito] = useState("todos");

  // Memoizado: el mapa repinta los marcadores cuando cambia la identidad de
  // esta lista, así que no puede ser un array nuevo en cada render.
  const resultados = useMemo(() => {
    const q = sinTildes(consulta.trim());
    return recursos.filter(
      (r) =>
        (distrito === "todos" || distritoDe(r) === distrito) &&
        (!q || textoBuscable(r).includes(q)),
    );
  }, [recursos, consulta, distrito]);

  const sinSitio = resultados.filter((r) => !UBICACIONES[r.id]).length;

  return (
    <>
      <form
        className="mt-6 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setConsulta(texto);
        }}
      >
        <label htmlFor="busqueda" className="sr-only">
          Tu barrio, tu código postal o lo que buscas
        </label>
        <input
          id="busqueda"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Tu barrio o código postal — por ejemplo, Zaidín o 18001"
          className="w-full rounded-lg border border-line bg-white px-4 py-4 text-lg text-foreground placeholder:text-warm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Search aria-hidden size={20} />
          Buscar
        </button>
      </form>

      <div className="mt-4">
        <label htmlFor="filtro-distrito" className="mr-2 text-base font-medium text-foreground">
          Distrito
        </label>
        <select
          id="filtro-distrito"
          value={distrito}
          onChange={(e) => setDistrito(e.target.value)}
          className="rounded-lg border border-line bg-white px-3 py-2 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <option value="todos">Todos</option>
          {DISTRITOS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <MapaRecursos recursos={resultados} color={categoria} />
      </div>

      <h2 className="mt-8 font-display text-xl font-semibold text-foreground">Resultados</h2>
      <p className="mt-2 text-base text-warm" aria-live="polite">
        {resultados.length} {resultados.length === 1 ? nombreSingular : nombrePlural}
        {sinSitio > 0 &&
          ` · ${sinSitio} sin dirección, así que no ${sinSitio === 1 ? "sale" : "salen"} en el mapa: se ${sinSitio === 1 ? "contacta" : "contactan"} por teléfono o por correo`}
        .
      </p>

      {resultados.length === 0 ? (
        <div className="mt-4 rounded-xl border border-line bg-white p-6">
          <p className="text-lg text-foreground">
            No tenemos nada con esa búsqueda. Eso no quiere decir que no lo haya: esta web solo
            recoge lo que sale en guías públicas.
          </p>
          <p className="mt-3 text-lg text-foreground">
            Llama al {ORIENTACION.nombre} y te orientan:{" "}
            <a
              className="font-semibold text-primary underline"
              href={`tel:${telefonoEnlace(ORIENTACION.telefonos[0] ?? "")}`}
            >
              {ORIENTACION.telefonos[0]}
            </a>
          </p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {resultados.map((r) => (
            <FichaRecurso key={r.id} recurso={r} desde={categoria} />
          ))}
        </div>
      )}
    </>
  );
}
