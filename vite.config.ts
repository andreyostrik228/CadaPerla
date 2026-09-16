// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Nitro calcula compatibility_date con la hora LOCAL de la máquina que
// compila, pero Cloudflare lo valida contra UTC. Entre las 00:00 y las ~02:00
// hora española, Nitro ya cree que es "mañana" y escribe una fecha futura en
// dist/_worker.js/wrangler.json; Cloudflare rechaza el despliegue con
// "Can't set compatibility date in the future" — pasó la noche del
// 2026-09-17. Nitro lee COMPATIBILITY_DATE del entorno antes de calcular nada
// (node_modules/nitro/dist/_libs/compatx.mjs), así que fijarla aquí evita el
// problema de raíz sin tocar la configuración de vite-tanstack-config, cuyo
// propio comentario avisa de no añadirle plugins a mano.
//
// Valor fijo a propósito, no automático: la fecha más reciente que ya está en
// producción, en el pasado tanto en UTC como en local. NO la actualices sin
// motivo — retrasarla cambia qué flags de compatibilidad aplica Cloudflare, y
// adelantarla puede volver a caer en el mismo problema si coincide con una
// compilación de madrugada.
process.env["COMPATIBILITY_DATE"] ??= "2026-09-16";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
