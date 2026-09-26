import type { ReactNode } from "react";

import { estiloTema, type Categoria } from "@/data/categorias";
import { Aviso } from "./Aviso";
import { Cabecera } from "./Cabecera";
import { PieDePagina } from "./PieDePagina";

/**
 * Esqueleto común de todas las páginas: cabecera, aviso, contenido y pie.
 *
 * `tema`: la categoría cuyos colores lleva la página entera, cabecera
 * incluida. Sin tema, la página usa los colores originales de Cada Perla
 * (los de `styles.css`, que son los mismos que los de "Comer").
 */
export function Pagina({
  tema,
  ancho = "max-w-5xl",
  children,
}: {
  tema?: Categoria;
  ancho?: "max-w-3xl" | "max-w-5xl";
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background" style={tema ? estiloTema(tema) : undefined}>
      <Cabecera />
      <Aviso tema={tema} />
      <main id="contenido" tabIndex={-1} className={`mx-auto ${ancho} px-4 py-10 outline-none`}>
        {children}
      </main>
      <PieDePagina />
    </div>
  );
}
