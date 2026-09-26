import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Dirección antigua de la página de comida. Se mantiene para no romper
 * enlaces que ya estén por ahí; ahora es la categoría "Comer".
 */
export const Route = createFileRoute("/necesito-comida")({
  beforeLoad: () => {
    throw redirect({ to: "/ayuda/$categoria", params: { categoria: "comer" }, statusCode: 301 });
  },
});
