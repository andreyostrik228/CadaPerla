import { useEffect, useRef, useState } from "react";

import type { Punto } from "@/data/puntos";

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
function crearPopup(p: Punto): HTMLElement {
  const horario = p.horario ?? "Horario sin confirmar — llama antes de ir.";
  const contenedor = document.createElement("div");

  const titulo = document.createElement("strong");
  titulo.textContent = p.nombre;
  contenedor.append(titulo, document.createElement("br"), p.direccion, document.createElement("br"), horario);

  if (!p.coords.exacta) {
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

export function MapaPuntos({ puntos }: { puntos: Punto[] }) {
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

    const icono = L.divIcon({
      className: "",
      html: `<span style="display:block;width:22px;height:22px;border-radius:50% 50% 50% 0;
             background:#7E2438;border:3px solid #fff;transform:rotate(-45deg);
             box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>`,
      iconSize: [22, 22],
      iconAnchor: [11, 22],
      popupAnchor: [0, -20],
    });

    for (const p of puntos) {
      L.marker([p.coords.lat, p.coords.lng], { icon: icono })
        .bindPopup(crearPopup(p))
        .addTo(capaMarcadores.current);
    }
  }, [puntos, estado]);

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
        className="h-[380px] w-full rounded-xl border border-line bg-muted"
        role="region"
        aria-label="Mapa con los comedores sociales de Granada"
      />
      <p className="sr-only">
        La lista de comedores debajo de este mapa tiene la misma información en texto.
      </p>
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
