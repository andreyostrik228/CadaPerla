# Cada Perla — briefing del proyecto

> Documento de contexto para construir la web. Todo lo que hay aquí son decisiones
> ya tomadas: respétalas en lugar de proponer alternativas.

---

## 1. Qué es

**Cada Perla** es una web que le dice a una persona sin comida **a qué sitio concreto puede ir
hoy** en Granada: dirección, horario, si hace falta cita y qué llevar.

- **Eslogan:** Comida cerca de ti, hoy.
- **Ciudad:** Granada (España). Todo en español de España.
- **Dominio de ejemplo:** cadaperla.org

### El problema que resuelve

Las webs de ayuda alimentaria que existen están escritas para quien **da**: voluntarios,
donantes y entidades. La persona que hoy no tiene comida no encuentra ninguna sección que le
diga a dónde ir; tiene que llamar por teléfono o preguntar en servicios sociales.

Cada Perla le da la vuelta: **la primera opción del menú es «Necesito comida»**.

### De dónde viene el nombre

Granada es también el nombre de la fruta y el símbolo de la ciudad. Al abrirla, sus granos
parecen perlas rojas: muchas, pequeñas, todas igual de importantes. Cada perla es una persona.

---

## 2. Identidad visual

### Colores

| Uso | Hex | Dónde se aplica |
|---|---|---|
| Granate (primario) | `#7E2438` | Logo, barra de menú, titulares, botón «Buscar» |
| Ámbar (acción) | `#E9A13B` | **Solo** botones principales y la perla central del logo |
| Hueso rosado (fondo) | `#FDF6F4` | Fondo de todas las páginas |
| Blanco (superficie) | `#FFFFFF` | Tarjetas y fichas sobre el fondo |
| Línea | `#EBDAD8` | Bordes de tarjetas y separadores |
| Tinta (texto) | `#2A1F22` | Todo el texto normal |
| Gris cálido | `#8A787C` | Textos secundarios y descripciones |
| Verde (estado) | `#2F6B52` | Etiqueta «Abierto ahora» — **nunca** como color decorativo |

**Regla importante:** el ámbar es el color de «esto se puede pulsar». No usarlo para adornar.
Si algo es ámbar, tiene que ser un botón o un enlace de acción.

### Tipografía

Las dos están en Google Fonts.

- **Titulares:** `Fraunces`, pesos 600 y 700. Serifa cálida y redondeada.
- **Texto:** `Public Sans`, pesos 400, 500 y 600.
- **Tamaño mínimo del texto normal: 16 px.** Nunca menos: mucha gente entrará desde un móvil
  viejo o con la vista cansada.

### Logo

Una granada vista de frente: la corona arriba, el cuerpo circular y cinco perlas dentro. La
perla del centro va en ámbar (es «cada perla», la persona concreta); las otras cuatro son
huecos transparentes.

**No hace falta ningún archivo adjunto ni volver a dibujarlo: el logo va aquí como código.**
Copia este SVG tal cual, sin cambiar ninguna coordenada.

Guárdalo como `src/assets/simbolo-granate.svg` (o como componente React):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Cada Perla">
  <title>Cada Perla</title>
  <mask id="perlas">
    <rect width="64" height="64" fill="#000"/>
    <path d="M26.5 19 V6.5 L29.5 10.2 L32 3.5 L34.5 10.2 L37.5 6.5 V19 Z" fill="#fff"/>
    <circle cx="32" cy="39" r="21.5" fill="#fff"/>
    <circle cx="23.2" cy="30.8" r="4.6" fill="#000"/>
    <circle cx="40.8" cy="30.8" r="4.6" fill="#000"/>
    <circle cx="23.2" cy="47.2" r="4.6" fill="#000"/>
    <circle cx="40.8" cy="47.2" r="4.6" fill="#000"/>
    <circle cx="32" cy="39" r="5.8" fill="#000"/>
  </mask>
  <rect width="64" height="64" fill="#7E2438" mask="url(#perlas)"/>
  <circle cx="32" cy="39" r="5.8" fill="#E9A13B"/>
</svg>
```

**Versión blanca** para la barra de menú granate: el mismo código, cambiando solo
`fill="#7E2438"` por `fill="#FFFFFF"` en el `<rect>`. El `id` de la máscara tiene que ser
distinto en cada copia (`perlas-blanco`), o el navegador reutilizará la primera.

Notas de uso:

- Las cuatro perlas exteriores son **transparencia real** (una máscara), no círculos del color
  del fondo. Así el logo funciona sobre cualquier fondo.
- El **logo completo** es el símbolo seguido del texto `Cada Perla` en Fraunces 700, como texto
  normal de la página. No es una imagen: no hace falta ningún PNG.
- En la barra de menú: símbolo blanco a 24 px + «Cada Perla» en Fraunces 700 blanco.
- **Favicon:** genera un PNG de 64×64 a partir de este mismo SVG.

---

## 3. Menú

Seis opciones, en este orden exacto. El orden es la decisión de diseño más importante de todo
el proyecto: **primero quien necesita ayuda, después quien la ofrece.**

| Opción | Para quién | Contenido |
|---|---|---|
| Necesito comida | Quien lo necesita | Buscador por barrio o código postal |
| Puntos de reparto | Quien lo necesita | Lista completa con mapa y horarios |
| Quiero ayudar | Quien ayuda | Voluntariado, donar y avisar de un punto nuevo |
| Qué es Cada Perla | Todos | Quiénes somos y de dónde salen los datos |
| Preguntas | Todos | Dudas frecuentes de quien va a pedir comida |
| Contacto | Todos | Teléfono, correo y horario |

Barra de menú fija arriba, fondo granate. La opción activa se marca con una línea ámbar debajo.
En móvil, menú hamburguesa.

---

## 4. Páginas

### 4.1 Inicio

De arriba abajo:

1. **Barra de menú** granate con logo blanco.
2. **Titular** en Fraunces 700: `Comida cerca de ti, hoy`
3. **Párrafo corto**, máximo dos frases:
   `Te decimos a qué sitio de Granada puedes ir hoy a por comida: dirección, horario y qué
   necesitas llevar. Es gratis y no pedimos tus datos.`
4. **Dos botones grandes**, uno al lado del otro:
   - `Necesito comida` — fondo ámbar, texto oscuro (botón principal)
   - `Quiero ayudar` — transparente con borde granate
5. **Buscador**: campo de texto con el marcador
   `Tu barrio o código postal — por ejemplo, La Chana o 18011` y botón granate `Buscar`.
6. **Tres o cuatro resultados de ejemplo** ya visibles, para que la página no aparezca vacía.
7. **Cuatro cifras** en fila: `12` puntos de reparto en Granada capital · `5` abiertos ahora
   mismo · `0 €` cuesta usar la web · `0` datos personales que pedimos.
   **Esta cifra tiene que coincidir siempre con el número real de puntos que haya en la
   sección 5** — si se añaden o quitan ejemplos, se actualiza aquí también.
8. **Pie de página** con el contacto repetido.

**Nada de carruseles ni de animaciones de entrada.** Quien llega con hambre tiene que ver los
dos botones sin desplazarse.

### 4.2 Necesito comida

El buscador, pero en grande y como protagonista de la página. Debajo, los resultados ordenados
por distancia. Sin registro, sin correo, sin contraseña, sin cookies de seguimiento.

### 4.3 Puntos de reparto

Lista completa con filtros sencillos: por barrio y por «abierto ahora». Un mapa arriba y las
fichas debajo.

**El mapa:** real e interactivo, con **Leaflet** y teselas de **OpenStreetMap**. No usar Google
Maps ni ninguna librería que pida clave de API o añada cookies de terceros — va en contra de la
regla de la sección 6. Un marcador granate por cada punto de reparto; al tocarlo, muestra el
nombre y el estado (abierto / cerrado) y enlaza a su ficha. Centrado en Granada capital por
defecto.

### 4.4 Ficha de un punto de reparto

Es el componente más importante de la web. Cada ficha lleva:

- **Nombre** del centro (en negrita, 16 px o más)
- **Etiqueta de estado**: `ABIERTO HASTA LAS 15:00` en verde `#2F6B52`, o `CERRADO AHORA` en gris
- **Distancia**: `A 700 m de ti`
- **Horario**: `Lunes a viernes, 13:00–15:00`
- **Cita**: `Sin cita` o `Hay que pedir cita`
- **Qué llevar**: `Lleva DNI si lo tienes`
- **Botón de llamar** y **botón de cómo llegar**

El texto «si lo tienes» es importante y no se debe quitar: mucha gente no tiene papeles y no
puede pensar que por eso no la van a atender.

### 4.5 Quiero ayudar

Tres bloques: hacerme voluntario, donar alimentos o dinero, y avisar de un punto de reparto que
falta en la web.

### 4.6 Qué es Cada Perla

Quiénes somos, de dónde salen los datos, cada cuánto se revisan, y que no sustituimos a ninguna
organización: solo reunimos en un sitio lo que ya existe.

### 4.7 Preguntas

Escritas en segunda persona y respondidas en una o dos frases:

- ¿Tengo que pagar algo? → No. Nada de lo que aparece aquí cuesta dinero.
- ¿Necesito papeles? → Depende del sitio. En cada ficha lo pone. Si no tienes, ve igualmente y pregunta.
- ¿Me vais a pedir mis datos? → No. Esta web no te pide nombre, ni correo, ni teléfono.
- ¿Puedo ir si no vivo en Granada? → Sí, pregunta en el punto más cercano.
- ¿Y si el horario que pone está mal? → Avísanos desde «Quiero ayudar» y lo corregimos.

### 4.8 Contacto

Teléfono, correo y horario juntos en la misma pantalla, sin formulario obligatorio. Repetidos
también en el pie de todas las páginas.

---

## 5. Datos de ejemplo

> **Estos datos son inventados, para la maqueta.** Los barrios son reales, los centros no.
> Antes de publicar la web de verdad habría que llamar a cada centro y confirmar sus horarios.
>
> **Usa exactamente estos 12 — ni menos, ni inventes más por tu cuenta.** Con 6 el filtro por
> barrio y el mapa se ven vacíos; con una lista más larga o distinta a esta, deja de ser
> la misma maqueta que se ha presentado en clase.

| Nombre | Barrio | Horario | Cita | Qué llevar |
|---|---|---|---|---|
| Comedor Vecinal de La Chana | La Chana | L–V, 13:00–15:00 | Sin cita | DNI si lo tienes |
| Punto de Reparto Zaidín Sur | Zaidín | Martes y jueves, 10:00–13:00 | Sin cita | Bolsa o carrito |
| Cocina Solidaria Almanjáyar | Almanjáyar | L–V, 12:30–14:30 | Sin cita | Nada |
| Reparto de Alimentos Albaicín | Albaicín | Miércoles, 17:00–19:00 | Hay que pedir cita | DNI y empadronamiento |
| Comedor del Realejo | Realejo | Sábados y domingos, 13:00–15:00 | Sin cita | Nada |
| Despensa Vecinal Norte | Cartuja | Viernes, 16:00–19:00 | Sin cita | Bolsa o carrito |
| Parroquia de Beiro | Beiro | Lunes, miércoles y viernes, 11:00–13:00 | Sin cita | Nada |
| Asociación Vecinal del Genil | Genil | Martes, 16:00–18:00 | Sin cita | Bolsa o carrito |
| Comedor Social de Ronda | Ronda | L–V, 13:30–15:00 | Sin cita | DNI si lo tienes |
| Reparto Solidario de Sacromonte | Sacromonte | Sábados, 10:00–12:00 | Sin cita | Nada |
| Centro de Día Camino de Ronda | Camino de Ronda | L–V, 9:00–11:00 | Hay que pedir cita | DNI y empadronamiento |
| Punto de Ayuda del Centro | Centro | Jueves, 17:00–19:00 | Sin cita | Bolsa o carrito |

---

## 6. Reglas técnicas

- **Móvil primero.** Casi nadie entrará desde un ordenador. Probar a 375 px de ancho.
- **Sin registro.** No hay cuentas, ni login, ni contraseñas, ni base de datos de usuarios.
- **Sin cookies de seguimiento** ni analítica de terceros.
- **Mapa:** Leaflet + OpenStreetMap (gratis, sin clave de API, sin cookies de terceros). Ver
  detalle en la sección 4.3.
- **Accesibilidad:** contraste alto, foco de teclado visible, textos alternativos en las
  imágenes, y que se pueda navegar toda la web con el tabulador.
- **Rápida:** sin vídeos de fondo ni imágenes pesadas. Alguien puede entrar con datos móviles justos.
- **Los botones dicen lo que hacen.** `Buscar`, `Llamar`, `Cómo llegar`. Nada de «Descubre más».

---

## 7. Tono de los textos

- Frases cortas. Tuteo. Nada de lenguaje administrativo.
- Nunca usar las palabras «pobre», «necesitado» ni «beneficiario» dirigiéndose al usuario.
- No dar lástima ni pedir agradecimiento: la web informa, no hace un favor.
- Ejemplo de cómo **sí**: `Puedes ir hoy de 13:00 a 15:00. No hace falta cita.`
- Ejemplo de cómo **no**: `Ponemos a su disposición un servicio de asistencia alimentaria para
  personas en situación de vulnerabilidad.`
