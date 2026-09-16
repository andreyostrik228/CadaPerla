import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AEstaHora } from "@/components/AEstaHora";
import { Aviso } from "@/components/Aviso";
import { Cabecera } from "@/components/Cabecera";
import { FichaPunto } from "@/components/FichaPunto";
import { PieDePagina } from "@/components/PieDePagina";
import { ORIENTACION, PUNTOS, telefonoEnlace } from "@/data/puntos";

export const Route = createFileRoute("/necesito-comida")({
  head: () => ({
    meta: [
      { title: "Necesito comida — comedores sociales de Granada" },
      {
        name: "description",
        content: "Busca por barrio el comedor social de Granada que te pilla más cerca.",
      },
      { property: "og:title", content: "Necesito comida — Cada Perla" },
      { property: "og:description", content: "Busca por barrio en Granada." },
    ],
  }),
  component: NecesitoComida,
});

function NecesitoComida() {
  const [texto, setTexto] = useState("");
  const [consulta, setConsulta] = useState("");

  const resultados = useMemo(() => {
    const q = consulta.trim().toLowerCase();
    if (!q) return PUNTOS;
    return PUNTOS.filter(
      (p) =>
        p.barrio.toLowerCase().includes(q) ||
        p.nombre.toLowerCase().includes(q) ||
        p.direccion.toLowerCase().includes(q) ||
        p.aliasBarrio?.some((a) => a.toLowerCase().includes(q)) ||
        p.codigoPostal?.includes(q),
    );
  }, [consulta]);

  return (
    <div className="min-h-screen bg-background">
      <Cabecera />
      <Aviso />
      <main id="contenido" tabIndex={-1} className="mx-auto max-w-5xl px-4 py-10 outline-none">
        <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">¿Dónde estás?</h1>
        <p className="mt-3 text-lg text-foreground">
          Escribe tu barrio o tu código postal y te decimos qué comedores tienes cerca. Llama antes
          de ir: la mayoría de los horarios no están confirmados.
        </p>

        <div className="mt-6">
          <AEstaHora puntos={PUNTOS} />
        </div>

        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setConsulta(texto);
          }}
        >
          <label htmlFor="busqueda-grande" className="sr-only">
            Tu barrio o código postal
          </label>
          <input
            id="busqueda-grande"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Tu barrio o código postal — por ejemplo, Beiro o 18001"
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

        <p className="mt-6 text-base text-warm" aria-live="polite">
          {resultados.length} {resultados.length === 1 ? "comedor" : "comedores"} en Granada capital.
        </p>

        {resultados.length === 0 ? (
          <div className="mt-4 rounded-xl border border-line bg-white p-6">
            <p className="text-lg text-foreground">
              No tenemos ningún comedor en esa zona. Eso no quiere decir que no lo haya: esta web
              solo recoge {PUNTOS.length}.
            </p>
            <p className="mt-3 text-lg text-foreground">
              Llama al {ORIENTACION.nombre} y te orientan:{" "}
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
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {resultados.map((p) => (
              <FichaPunto key={p.id} punto={p} />
            ))}
          </div>
        )}
      </main>
      <PieDePagina />
    </div>
  );
}
