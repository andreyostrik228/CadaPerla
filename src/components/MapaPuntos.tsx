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
      const horario = p.horario ?? "Horario sin confirmar — llama antes de ir.";
      const aprox = p.coords.exacta ? "" : "<br><em>Situación aproximada.</em>";
      L.marker([p.coords.lat, p.coords.lng], { icon: icono })
        .bindPopup(`<strong>${p.nombre}</strong><br>${p.direccion}<br>${horario}${aprox}`)
        .addTo(capaMarcadores.current);
    }
  }, [puntos, estado]);

  return (
    <div className="relative">
      <div
        ref={contenedor}
        className="h-[380px] w-full rounded-xl border border-line bg-muted"
        role="application"
        aria-label="Mapa con los comedores sociales de Granada"
      />
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
