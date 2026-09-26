# Plan: de 4 comedores a toda la ayuda de Granada

Empezado el **2026-09-26**. Estado: **fases 1 a 5 hechas y publicadas el
2026-09-26** (commit `bc44ca1`; copia estática `f04abe6` en github.io; desplegado
también en cada-perla.pages.dev y cadaperla.pages.dev). Los recursos encontrados y cómo se encontraron están
en `docs/recursos-candidatos.md`.

## Qué cambia

Antes Cada Perla decía a dónde ir a comer, con 4 comedores. Ahora dice dónde
encontrar **cualquier tipo de ayuda** en Granada capital: 74 fichas en 12
categorías, más 6 teléfonos de urgencias. Cada categoría tiene su propio
color y su propio lema. Por nivel: 10 A, 32 B y 32 C.

La regla de oro no cambia: **no se inventa ni un dato**. Cada ficha dice de
dónde sale, qué confirma cada fuente y cuándo se comprobó.

## Decisiones de Andrii

1. **Fuera los horarios.** Borrados `horario`, `apertura`, el bloque «A esta
   hora» y su filtro. Todas las páginas dicen «Llama antes de ir».
2. **Toda la ayuda, no solo comida.**
3. **Un color y un lema por categoría.** «Comer» conserva los colores y el lema
   originales («No te vas a quedar con hambre hoy»).
4. **Solo Granada capital.** Fuera la Escuela de Solidaridad (Atarfe) y
   AGRAJER (Cenes de la Vega).
5. **Servicios para todo el mundo** (lo dejó a mi criterio): solo la puerta de
   entrada. Salud Responde y la cita previa del SAE y del SEPE, sí; los 7
   centros de salud y las 5 oficinas del SAE, no.
6. **Nivel C se publica con aviso**: la ficha dice «Dato de una guía de 2024:
   puede haber cambiado».

Lo que tiene un dato dudoso (nivel «?» en `recursos-candidatos.md`) no se ha
publicado: la unidad móvil de Cruz Roja (prefijo de Sevilla), el Servicio de
Orientación Jurídica del Colegio de Abogados (web inaccesible), la Parroquia
Espíritu Santo y Tiempo de Dios.

## Cómo está hecho

| Archivo | Qué es |
|---|---|
| `src/data/categorias.ts` | Las 12 categorías: nombre, lema, descripción, teléfono rápido y paleta. `estiloTema()` redefine las variables CSS del tema en el elemento raíz de la página |
| `src/data/recursos.ts` | Las 74 fichas, las urgencias y el Banco de Alimentos. Sustituye a `puntos.ts` |
| `src/data/ubicaciones.ts` | **Generado** por `scripts/geocodificar.py` desde OpenStreetMap: coordenadas, barrio y distrito. 62 fichas situadas, 32 con el portal exacto |
| `src/components/Pagina.tsx` | Esqueleto común (cabecera, aviso, pie) con el tema de la categoría |
| `src/components/FichaRecurso.tsx` | Sustituye a `FichaPunto`. Sin horario; con nivel, qué ofrece, para quién, cómo se entra y enlaces a sus otras categorías |
| `src/components/MapaRecursos.tsx` | Sustituye a `MapaPuntos`. Un color de marcador por categoría |
| `src/components/BuscadorRecursos.tsx` | Buscador (sin tildes), filtro por distrito, mapa y lista |
| `src/components/Urgencias.tsx` | 112, 061, 016, 024, 091, 092 |

Borrados: `AEstaHora.tsx`, `FichaPunto.tsx`, `puntos.ts`.

Contraste de las 12 paletas comprobado con la fórmula de WCAG: el peor caso es
5,8:1 (el mínimo es 4,5:1).

## Páginas

| Dirección | Qué hay |
|---|---|
| `/` | «¿Qué necesitas?»: 12 botones con el color de su categoría, urgencias, por dónde empezar y cifras |
| `/ayuda/<categoria>` | Una por categoría, con su color y su lema: `comer`, `dormir`, `higiene-ropa`, `salud`, `salud-mental`, `migrantes`, `trabajo`, `mujeres`, `familias`, `servicios-sociales`, `calle`, `legal` |
| `/mapa` | Todo junto, con filtro por tipo de ayuda que sirve de leyenda |
| `/necesito-comida` | Redirige (301) a `/ayuda/comer` |
| `/puntos-de-reparto` | Redirige (301) a `/mapa` |
| `/quiero-ayudar`, `/que-es-cada-perla`, `/preguntas`, `/contacto` | Reescritas para la web nueva |

## Lo que queda

| Fase | Qué | Quién |
|---|---|---|
| 6 | Verificación: llamar para resolver los 7 datos que no coinciden (lista en `recursos-candidatos.md`), leer a mano la guía de Albaicín, pedir al Ayuntamiento las guías de Beiro, Chana, Norte y Ronda, y mirar icagr.es desde otro ordenador | Andrii, por teléfono |
| 7 | ~~Commit, despliegue en Cloudflare y copia estática para github.io~~ | Hecho el 2026-09-26 con la palabra de Andrii |

**Para la copia estática de github.io** (ver la memoria del proyecto: se
captura el HTML de cada ruta con curl): ahora hay que capturar **18 rutas**,
no 7: las 5 que siguen (`/`, `/quiero-ayudar`, `/que-es-cada-perla`,
`/preguntas`, `/contacto`), más `/mapa` y las 12 de `/ayuda/<categoria>`. Las 2 viejas (`/necesito-comida` y
`/puntos-de-reparto`) necesitan en la copia estática una página con
`<meta http-equiv="refresh">` hacia la nueva, porque GitHub Pages no hace
redirecciones 301.

**La imagen para compartir** (`public/og-image.png`) todavía enseña el lema
antiguo, «Comida cerca de ti, hoy». Hay que repintarla desde
`scripts/og-image.html`.

## Riesgos

- **Datos viejos.** Las fuentes son de 2023 y 2024. Cada ficha lleva `nivel`
  y `revisado`; una ficha de nivel C con más de un año habría que volver a
  mirarla.
- **Mandar a alguien a una puerta cerrada.** Sin horarios, se evita con
  «Llama antes de ir» y con `comoSeEntra`: a los albergues se entra pasando
  por el COASPSH, y las fichas lo dicen.
- **Buscadores.** La web ya **no** lleva `noindex`: se quitó el 2026-09-20
  por decisión de Andrii (commit `621bcd5`). Con 32 fichas de nivel C, puede
  aparecer en Google con datos que han cambiado. La decisión es suya.
- **Mantenimiento.** Antes había 4 fichas que revisar; ahora hay 74.
