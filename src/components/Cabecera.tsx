import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { LogoCadaPerla } from "./LogoCadaPerla";

const OPCIONES = [
  { to: "/", label: "Necesito ayuda" },
  { to: "/mapa", label: "Mapa" },
  { to: "/quiero-ayudar", label: "Quiero ayudar" },
  { to: "/que-es-cada-perla", label: "Qué es Cada Perla" },
  { to: "/preguntas", label: "Preguntas" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Cabecera() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to="/"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <LogoCadaPerla variante="blanco" size={24} />
        </Link>

        <nav aria-label="Menú principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {OPCIONES.map((o) => (
              <li key={o.to}>
                <Link
                  to={o.to}
                  className="block rounded-sm border-b-2 border-transparent px-3 py-2 text-base font-medium text-primary-foreground transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  activeProps={{ className: "border-accent" }}
                  activeOptions={{ exact: o.to === "/" }}
                >
                  {o.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
        >
          {abierto ? <X aria-hidden size={24} /> : <Menu aria-hidden size={24} />}
          <span className="sr-only">Menú</span>
        </button>
      </div>

      {abierto && (
        <nav
          id="menu-movil"
          aria-label="Menú principal"
          className="border-t border-white/20 lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 pb-3">
            {OPCIONES.map((o) => (
              <li key={o.to}>
                <Link
                  to={o.to}
                  onClick={() => setAbierto(false)}
                  className="block border-l-4 border-transparent px-3 py-3 text-base font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  activeProps={{ className: "border-accent" }}
                  activeOptions={{ exact: o.to === "/" }}
                >
                  {o.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
