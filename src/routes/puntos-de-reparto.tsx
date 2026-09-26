import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Dirección antigua del mapa de comedores. Se mantiene para no romper
 * enlaces que ya estén por ahí; ahora es el mapa general.
 */
export const Route = createFileRoute("/puntos-de-reparto")({
  beforeLoad: () => {
    throw redirect({ to: "/mapa", statusCode: 301 });
  },
});
