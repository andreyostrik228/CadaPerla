import { useEffect, useRef, useState } from "react";

import { infoCategoria, type Categoria } from "@/data/categorias";
import type { Recurso } from "@/data/recursos";
import { UBICACIONES } from "@/data/ubicaciones";

/**
 * Mapa con Leaflet y teselas de OpenStreetMap: gratis, sin clave de API y sin
 * cookies de terceros.
 *
 * Leaflet se carga metiendo su <script> en la página, no con un import. Al
 * importarlo, el empaquetador lo colocaba en un trozo compartido que el
 * servidor cargaba al arrancar, y Leaflet toca `window` nada más ejecutarse:
 * eso tumbaba el renderizado en servidor de TODAS las páginas con
 * "window is not defined". Cargándolo así, el servidor no lo ve nunca.
 *
 * El archivo se sirve desde nuestro propio dominio (public/leaflet), no desde
 * un CDN, para no depender de terceros.
 */

declare global {
  interface Window {
    L?: any;
  }
}

const LEAFLET_JS = "/leaflet/leaflet.js";

/**
 * Construye el contenido del popup con el DOM, no con una plantilla de texto:
 * `bindPopup` de Leaflet mete un string tal cual como HTML, así que interpolar
 * `nombre`/`direccion` ahí sería una puerta abierta a HTML/JS inyectado si
 * algún día esos datos dejan de ser fijos a mano. `textContent` los escapa
 * solo por construcción.
 */
function crearPopup(r: Recurso, exacta: boolean): HTMLElement {
  const contenedor = document.createElement("div");

  const titulo = document.createElement("strong");
  titulo.textContent = r.nombre;
  contenedor.append(
    titulo,
    document.createElement("br"),
    r.direccion ?? "",
    document.createElement("br"),
  );

  const telefono = r.telefonos[0];
  contenedor.append(telefono ? `Llama antes de ir: ${telefono}` : "Llama antes de ir.");

  if (!exacta) {
    const aprox = document.createElement("em");
    aprox.textContent = "Situación aproximada.";
    contenedor.append(document.createElement("br"), aprox);
  }

  return contenedor;
}

function cargarLeaflet(): Promise<any> {
  if (window.L) return Promise.resolve(window.L);

  return new Promise((resolve, reject) => {
    const existente = document.querySelector<HTMLScriptElement>(`script[src="${LEAFLET_JS}"]`);
    if (existente) {
      existente.addEventListener("load", () => resolve(window.L));
      existente.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = LEAFLET_JS;
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * `color`: la categoría cuyo color llevan los marcadores. En la página de una
 * categoría es esa; en el mapa general, cada marcador lleva el color de la
 * primera categoría de su ficha.
 */
export function MapaRecursos({
  recursos,
  color,
}: {
  recursos: Recurso[];
  color?: Categoria | undefined;
}) {
  const contenedor = useRef<HTMLDivElement>(null);
  const mapa = useRef<any>(null);
  const capaMarcadores = useRef<any>(null);
  const [estado, setEstado] = useState<"cargando" | "listo" | "error">("cargando");

  // Crear el mapa una sola vez.
  useEffect(() => {
    let vivo = true;

    cargarLeaflet()
      .then((L) => {
        if (!vivo || !contenedor.current || mapa.current) return;

        mapa.current = L.map(contenedor.current, { scrollWheelZoom: false }).setView(
          [37.1803, -3.6043],
          13,
        );
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; colaboradores de <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(mapa.current);
        capaMarcadores.current = L.layerGroup().addTo(mapa.current);
        setEstado("listo");
      })
      .catch(() => vivo && setEstado("error"));

    return () => {
      vivo = false;
      if (mapa.current) {
        mapa.current.remove();
        mapa.current = null;
      }
    };
  }, []);

  // Repintar los marcadores cada vez que cambian los puntos filtrados.
  useEffect(() => {
    if (estado !== "listo" || !capaMarcadores.current || !window.L) return;
    const L = window.L;
    capaMarcadores.current.clearLayers();

    const iconos = new Map<string, unknown>();
    const icono = (hex: string) => {
      if (!iconos.has(hex)) {
        iconos.set(
          hex,
          L.divIcon({
            className: "",
            html: `<span style="display:block;width:22px;height:22px;border-radius:50% 50% 50% 0;
                   background:${hex};border:3px solid #fff;transform:rotate(-45deg);
                   box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>`,
            iconSize: [22, 22],
            iconAnchor: [11, 22],
            popupAnchor: [0, -20],
          }),
        );
      }
      return iconos.get(hex);
    };

    for (const r of recursos) {
      const u = UBICACIONES[r.id];
      if (!u) continue;
      const hex = infoCategoria(color ?? r.categorias[0]!).paleta.hex;
      L.marker([u.lat, u.lng], { icon: icono(hex) })
        .bindPopup(crearPopup(r, u.exacta))
        .addTo(capaMarcadores.current);
    }
  }, [recursos, color, estado]);

  return (
    // `isolate` crea un contexto de apilamiento propio: sin esto, los
    // z-index internos de Leaflet (controles hasta 800, popups 700) compiten
    // directamente contra la cabecera (z-50) en la raíz del documento — y
    // ganan, así que el botón "+" del zoom se pintaba encima de la cabecera
    // pegajosa al desplazar. Con `isolate`, todo lo de Leaflet queda
    // encerrado dentro de este contenedor, por debajo de la cabecera.
    <div className="relative isolate">
      {/*
        `role="region"`, no "application": ese rol le dice al lector de
        pantalla que le ceda al mapa todas las teclas, quitándole al usuario
        su navegación normal — un antipatrón para un mapa de solo consulta.
        La lista de fichas debajo tiene la misma información en texto, así
        que se anuncia por si alguien con lector de pantalla prefiere saltar
        el mapa directamente.
      */}
      <div
        ref={contenedor}
        className="h-[240px] w-full rounded-xl sm:h-[380px] border border-line bg-muted"
        role="region"
        aria-label="Mapa con los sitios de ayuda de Granada"
      />
      <p className="sr-only">La lista debajo de este mapa tiene la misma información en texto.</p>
      {estado !== "listo" && (
        <p className="absolute inset-0 flex items-center justify-center rounded-xl text-base text-warm">
          {estado === "cargando"
            ? "Cargando el mapa…"
            : "No se ha podido cargar el mapa. La lista de abajo funciona igual."}
        </p>
      )}
    </div>
  );
}
