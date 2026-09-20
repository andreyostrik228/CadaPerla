import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { ORIENTACION, telefonoEnlace } from "../data/puntos";

function NotFoundComponent() {
  return (
    <div
      id="contenido"
      tabIndex={-1}
      className="flex min-h-screen items-center justify-center bg-background px-4 outline-none"
    >
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-base text-muted-foreground">
          Esta página no existe o se ha movido.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link
            to="/necesito-comida"
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Necesito comida
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border-2 border-primary px-4 py-2 text-base font-medium text-primary transition-colors hover:bg-primary/10"
          >
            Ir al inicio
          </Link>
        </div>
        <p className="mt-4 text-base text-muted-foreground">
          ¿Necesitas ayuda ahora? Llama al{" "}
          <a className="font-semibold text-primary underline" href={`tel:${telefonoEnlace(ORIENTACION.telefonos[0] ?? "")}`}>
            {ORIENTACION.telefonos[0]}
          </a>
        </p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div
      id="contenido"
      tabIndex={-1}
      className="flex min-h-screen items-center justify-center bg-background px-4 outline-none"
    >
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página no ha cargado
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Algo ha fallado. Puedes volver a intentarlo o ir al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-base font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ir al inicio
          </a>
        </div>
        <p className="mt-4 text-base text-muted-foreground">
          ¿Necesitas ayuda ahora? Llama al{" "}
          <a className="font-semibold text-primary underline" href={`tel:${telefonoEnlace(ORIENTACION.telefonos[0] ?? "")}`}>
            {ORIENTACION.telefonos[0]}
          </a>
        </p>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cada Perla — Comida cerca de ti, hoy" },
      {
        name: "description",
        content:
          "Comedores sociales de Granada: dirección, teléfono y qué hace falta llevar. Gratis, sin datos personales, y cada dato con su fuente.",
      },
      { property: "og:title", content: "Cada Perla — Comida cerca de ti, hoy" },
      {
        property: "og:description",
        content:
          "Comedores sociales de Granada: dónde están, qué dan de comer y a qué teléfono llamar.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://andreyostrik228.github.io/" },
      { property: "og:image", content: "https://andreyostrik228.github.io/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://andreyostrik228.github.io/og-image.png" },
      // Aquí hubo un `noindex, nofollow` mientras la mayoría de los horarios
      // seguían sin confirmar. Se retira por decisión de Andrii (2026-09-20):
      // el bloqueo también impedía que cualquier herramienta automática
      // abriera la web, y el sitio ya no afirma tener horarios que no tiene —
      // cada ficha marca "HORARIO SIN CONFIRMAR" y enseña su fuente.
      // Sigue pendiente confirmar los horarios por teléfono (docs/llamadas.md).
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Fuentes autoalojadas (ver styles.css) — sin preconnect ni stylesheet
      // de Google Fonts: cero peticiones a terceros para cargar la tipografía.
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Saltar al contenido
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
