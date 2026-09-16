# Investigación de recursos de ayuda alimentaria en Granada capital

Fecha de la búsqueda: **2026-09-17**. Encargo: revisar los 4 comedores que ya
están en la web, apurar dos vetas concretas (Banco de Alimentos y
Ayuntamiento) y repasar las webs oficiales de EDICOMA y San Juan de Dios por
si se había pasado algo — que fue justo lo que pasó con Calor y Café.

## Números honestos

**13 candidatos examinados en total (9 de la primera pasada + 4 nuevos). 1
verificado. 4 en guía (3 ya publicados + Dar Al Anwar). 8 descartados. Y dos
teléfonos y un barrio corregidos en los que ya estaban.**

El techo de lo publicado en fuentes citables ya está tocado del todo. La
única vía que queda abierta es la llamada — ver `docs/llamadas.md`.

---

## Corrección importante en uno de los 4 ya publicados

### Asociación Calor y Café — dos datos mal en `puntos.ts`

Repasando su propia web ([calorycafe.com/contacto](https://calorycafe.com/contacto/))
con más cuidado de lo que se hizo la primera vez:

> *"Calle El Guerra nº 16, Bajo. Barrio de la Cruz, Granada, C.P. 18014"*
> Teléfonos: **958 209 383**, **958 163 316**, **699 970 526**

**`puntos.ts` solo tiene un teléfono** (`958 16 33 16`, que es el segundo de
los tres, con espacios distintos) **y dice "Beiro"** en vez de "Barrio de la
Cruz". Las dos cosas pueden ser ciertas a la vez — Barrio de la Cruz es una
zona dentro del distrito de Beiro — pero el buscador de la web compara texto
literal: alguien que escriba "Barrio de la Cruz", que es como lo llama la
gente, hoy no encuentra nada.

Propuesta de arreglo en la sección de abajo (`puntos.ts` no se ha tocado
todavía).

---

## Códigos postales de los 4 — de dónde sale cada uno

Ahora los cuatro tienen código postal, con dos niveles de certeza distintos.
Se dice así de claro para no hacer pasar una cosa por otra:

| Comedor | CP | Fuente | Qué tan seguro es |
|---|---|---|---|
| San Juan de Dios | 18001 | [Buscador de códigos postales por calle](https://www.codigospostales.com/codigo-postal-de/SAN-JUAN-DE-DIOS/Granada/180/18001) — el de la calle San Juan de Dios en Granada. | Es el CP de la calle entera, no confirmado número por número, pero San Juan de Dios 19 es una calle corta y sin cruce de distrito conocido: riesgo bajo. |
| Regina Mundi | 18004 | [Buscador de códigos postales por calle](https://www.codigospostales.com/codigo-postal-de/PURCHIL,Camino/Granada/180/18004) — el de Camino de Purchil. | **Es el CP de la calle, no verificado específicamente para el número 8.** Camino de Purchil es más larga; si cruza de distrito postal en algún tramo, el número 8 podría no coincidir. No se ha comprobado con Correos ni con la propia entidad. |
| Calor y Café | 18014 | Su propia web ([calorycafe.com/contacto](https://calorycafe.com/contacto/)): *"C.P.18014"*, literal. | El más seguro de los cuatro: lo da la propia entidad para su propia dirección. |
| EDICOMA | 18001 | Su propia web ([comedorcorazondemaria.org](https://comedorcorazondemaria.org/)): *"CP 18001 Granada"*, literal. | Igual de seguro: lo da la propia entidad. |

El riesgo de un CP impreciso es bajo comparado con un horario impreciso: como
mucho, una búsqueda por ese código no encuentra el comedor que sí existe —
nunca manda a nadie a una dirección equivocada, porque el buscador por CP es
un atajo hacia la ficha, no la dirección que se muestra o se usa para el
mapa.

---

## Ya publicados — revisión uno a uno

### 1. Comedor Social San Juan de Dios — `VERIFICADO`, un correo dudoso (no usar)

Los datos ya publicados (horario 12:45–13:30 todos los días, sin cita) se
confirman otra vez.

⚠️ **El correo "comunicación.granada@sjd.es" no se ha podido verificar y
huele a error.** Lleva una tilde en la parte local (antes de la @), que
ninguna institución española usa en la práctica — lo más probable es que sea
un efecto de maquetación de la página, no la dirección real. Buscando por
separado sí aparecen otras direcciones reales de la misma organización, sin
tilde: `residencia.granada@sjd.es`, `granada1@sjd.es`. Ninguna de las dos es
la de comunicación, así que **no se añade ningún correo de San Juan de Dios
a `puntos.ts`** hasta confirmarlo por teléfono. Queda aquí solo como aviso
para no repetir el error.

### 2. Comedor Social Regina Mundi — `GUÍA`, discrepancia de teléfono sin resolver

Tres fuentes de terceros coinciden en que da de comer **de lunes a sábado a
las 13:00** — Colegio de Trabajo Social (2020), Fundación Cruz Blanca (2024),
Hijas de la Caridad (ficha del centro, sin horario pero confirma actividad).

⚠️ **El teléfono sigue sin resolverse — dos fuentes públicas, dos números
distintos:**

| Fuente | Teléfono |
|---|---|
| Fundación Cruz Blanca (el que está en la web ahora) | 958 25 07 58 |
| Guía municipal de recursos sociales (Casa de Acogida Granada) | 958 26 35 44 |

No se ha encontrado ninguna fuente que desempate. Se mantienen los dos, sin
elegir — ver la propuesta de `puntos.ts` más abajo.

**Dato nuevo con peso:** "Preferencia las personas que ya recibían
alimentos" (Colegio de Trabajo Social) — sugiere que podría no admitir gente
nueva sin más, o dar preferencia a quien ya iba. Si se confirma llamando,
tiene que decirlo la ficha: mandar a alguien a un sitio donde no le van a
atender es tan malo como mandarlo a uno cerrado.

### 3. Asociación Calor y Café — `GUÍA`, dos datos corregidos (ver arriba)

Confirmado con su propia web: dirección ("C/ El Guerra 16, Bajo" — el "Bajo"
también lo dice su web y ayuda a encontrar la puerta), "Barrio de la Cruz",
**tres** teléfonos, código postal **18014**. El horario de desayunos y
meriendas sigue sin publicarse en ningún sitio — no sube a `VERIFICADO`.

⚠️ **Aviso sobre una atribución que se corrigió.** En un primer momento se
cambió la `fuente` de la ficha entera a la web oficial, porque ahí salían el
teléfono y la dirección. Error: esa web **no dice nada** de qué ofrece
(desayunos y meriendas, no comidas), ni de las duchas — eso sigue viniendo
solo de la guía de Cruz Blanca. Ahora la ficha cita las dos fuentes por
separado, cada una con lo que confirma exactamente.

### 4. Centro Social Hogar Corazón de María (EDICOMA) — `GUÍA`, un dato nuevo (correo)

Repasada su web ([comedorcorazondemaria.org](https://comedorcorazondemaria.org/))
con el mismo cuidado. Dirección y teléfono, sin cambios. Nuevo:

> **edicoma@hotmail.es** — no estaba en `puntos.ts`.

No menciona ningún barrio por su nombre (solo "Granada" en general); el
`barrio: "Centro"` actual es una suposición razonable por el código postal
18001, no un dato de su web — merece la pena decirlo así al llamar.

El horario de cena sigue sin ser oficial: dos fuentes de terceros de 2020
coinciden en las 20:00 pero difieren en si es "todos los días" o "lunes a
sábado". No sube a `VERIFICADO`.

---

## Las dos vetas pedidas

### Veta 1 — `bancoalimentosgranada.org/beneficiarios/`: no vacía, pero no da comedores nuevos

La página **sí tiene un listado**, y es largo: más de 90 entidades bajo
"Granada Capital" que reciben alimentos del Banco de Alimentos, agrupadas
por delegación. Es una fuente pública real y citable — pero por lo que dice
la propia página, **solo da nombres de entidades, no direcciones ni
teléfonos individuales**, y clasifica cada una por tipo (residencia,
convento, parroquia, asociación...) sin decir cuáles reparten comida a
gente de la calle y cuáles son para uso interno.

Confirma que **"Comedor Social Regina Mundi"** es una entidad real y activa
(coincide con lo que ya sabíamos), y de paso aparecen otras dos entradas
relacionadas con el mismo sitio: "Parroquia Regina Mundi" y "Residencia
Regina Mundi" — el mismo complejo, tres registros distintos.

Del resto de la lista, ningún nombre dice explícitamente "comedor social" ni
nada equivalente salvo Regina Mundi. Hay nombres que suenan a que podrían
repartir comida a quien lo necesite (Fundación Casas Diocesanas de Acogida,
Hermanitas de los Pobres, Hogar Nazaret, Asociación Puerta del Cielo...),
pero sin una fuente que diga qué hace cada una, añadirlos sería adivinar. Se
dejan en el listado completo, más abajo, como pista para futuras llamadas —
no como candidatos a `GUÍA`.

**Un nombre que llamó la atención y se investigó aparte: Fundación Hogar Fray
Leopoldo.** Fray Leopoldo es una figura muy conocida en Granada, famoso en
vida por repartir pan a los pobres por las calles. Comprobado: hoy esa
tradición sobrevive como un acto simbólico — panecillos benditos que se
reparten en misas concretas en su santuario — no como un servicio de comida
para quien pasa hambre hoy. `DESCARTADO` explícitamente, para que quede
claro que se miró y no vale, no que se pasó por alto.

### Veta 2 — `granada.org`: dos puertas de entrada municipales, con dirección y teléfono

No son comedores — son los Centros Municipales de Servicios Sociales
Comunitarios de los dos distritos donde el Ayuntamiento anunció en prensa
que reabría comedores sociales (Chana y Norte). Es la vía documentada hacia
esos comedores, aunque el comedor en sí no tenga ficha propia pública
todavía:

| Centro | Dirección | Teléfono | Horario |
|---|---|---|---|
| C.M.S.S.C. Norte | Plaza del Rey Badis, s/n, 18013 | 958 180 094 | L–V, 9:00–15:00 |
| C.M.S.S.C. Chana | C/ Dr. Medina Olmos, s/n | 958 18 00 64 | (no publicado) |

`DESCARTADO` como puntos de comida — son oficinas de servicios sociales, no
sitios donde comer — pero son exactamente el teléfono al que llamar para
preguntar por los comedores de Chana y Norte. Están en `docs/llamadas.md`.

---

## Candidato ya conocido, sin cambios

### Asociación Dar Al Anwar — `GUÍA`, advertencia fuerte sin cambios

Recogida y reparto de alimentos, tel. 663 522 419, martes y viernes
11:00–13:00 y 18:00–20:00. Única fuente, de 2020, escrita en plena pandemia,
sin dirección. Sigue siendo pista para llamada, no dato para publicar.

---

## Descartados (8)

| Candidato | Por qué se descarta |
|---|---|
| Comedores municipales de Chana y Norte (como comedor) | Reales, pero sin ficha propia con dirección/horario. La puerta de entrada (el centro municipal) sí está documentada — ver Veta 2. |
| Cruz Roja Granada | Ruta nocturna móvil, no un comedor en dirección fija. Vale como contacto, no como punto de reparto. |
| Palacio de Deportes (comedor de emergencia) | Dispositivo COVID de 2020, cerrado a gente nueva ya entonces. Casi seguro inexistente hoy en esta forma. |
| Cáritas Diocesana (nivel parroquial) | Reparte a través de 94 Cáritas parroquiales sin listado público de cuáles tienen comedor. Cáritas central ya está como contacto de orientación. |
| Fundación Hogar Fray Leopoldo | Investigado a fondo (Veta 1). Hoy es una práctica simbólica en misas, no un servicio de comida. |
| El resto del listado de beneficiarios del Banco de Alimentos (~85 nombres) | Sin fuente que diga qué hace cada uno ni si atiende a gente nueva. Ver el listado completo abajo para futuras llamadas. |

<details>
<summary>Listado completo de "Granada Capital" en bancoalimentosgranada.org/beneficiarios — para futuras llamadas, ningún nombre añadido a la web todavía</summary>

Adra Granada · Asociación Abuela Solidaria · Asociación Betel · Asociación
Calor Y Café · Asociación Calor Y Café (Pisos De Acogida) · Asociación de
Ayuda Al Refugiado · Asociación de Mujeres Gitanas «Romi» · Asociación de
Parados Granada Norte · Asociación Saharauis Tiris · Asociación de Vecinos
Zaidín Vergeles · Asociación Juvenil Amigos de Almanjáyar · Asociación
Proyecto Marista-Tierra de Todos · Asociación Puerta Del Cielo · Asociación
Red Madre Granada · Asociación Santo Domingo De Guzmán · Asociación S.C.
Cristiana Zona Norte · Asociación S.C. de Adultos Cartuja · Asociación
Tirapalante de La Chana · Carmelitas Calzadas de la A.O. · Carmelitas
Descalzas de San José · Casa Nuestra Sra. del Perpetuo Socorro · Centro
Infantil San Francisco Javier · Centro Nueva Esperanza · Colegio Divino
Maestro · Colegio San José De Almanjáyar · Comedor Social Regina Mundi ·
Comendadoras de Santiago · Comunidad Católica Shalom · Comunidad Religiosas
Adoratrices · Comunidad Hermanas Trinitarias · Convento Santo Ángel Custodio
· Convento Esclavas del Santísimo · Convento Dominicas de La Piedad ·
Convento Dominicas de Zafra · Convento de La Encarnación · Convento de La
Magdalena · Convento Salesas de La Visitación · Convento San Antón ·
Convento Santo Tomás de Villanueva · Convento Siervas de María ·
Edicoma-Hogar Corazón de María · Escuela Hogar Divina Infantita · Escuela
Hogar Madre Teresa · Franciscanas del Buen Consejo · Fraternidad Católica
Misionera Verbum Dei · Fundación Atenea · Fundación Hogar Fray Leopoldo ·
Fundación Casas Diocesanas de Acogida · Fundación de Solidaridad Amaranta ·
Fundación Hermanos Obreros De María · Fundación P.S. Juan De Ávila Virgen
del Pilar · Fundación Proyecto Don Bosco · Guardería Santa Rosalía ·
Hermandad De Caridad Y Refugio · Hermandad Virgen de Las Angustias ·
Hermanitas de Los Pobres · Hermanos Franciscanos de La Cruz Blanca · Hijas
de La Caridad San Vicente De Paúl · Hogar Nazaret · Hogar Nuestra Señora del
Pilar · Inst. Benéfica Sagrado Corazón · Inst. Servidoras del Señor y la
Virgen de Matará · Integración para la Vida Inpavi · Misioneras Combonianas
· Misioneras Cruzadas de la Iglesia · Monasterio de La Concepción ·
Monasterio de San Bernardo · Monasterio de San Jerónimo · Monasterio de
Santa Isabel La Real · Ocrem-Organización creada para marginados · Parroquia
Nuestra Señora del Carmen · Parroquia Regina Mundi · Parroquia San Emilio ·
Parroquia San Agustín · Parroquia San Juan de Ávila · Parroquia Ntra. Sra.
de los Dolores · Parroquia San Ildefonso · Parroquia Santa María Micaela ·
Residencia Divina Infantita · Residencia Regina Mundi · Residencia
Misioneras Claretianas · Servicios Sociales de San Juan De Dios

Fuente: [bancoalimentosgranada.org/beneficiarios](https://www.bancoalimentosgranada.org/beneficiarios/), consultado 2026-09-17.

</details>

---

## Lo que de verdad movería la aguja

El listado de internet está agotado. Lo único que queda es llamar — el
guion está en `docs/llamadas.md`, con este orden de prioridad:

1. **958 27 57 00** — pedir la lista completa de los 14 centros del
   programa municipal de Solidaridad y Garantía Alimentaria.
2. **Regina Mundi**, los dos teléfonos — cuál es el bueno, y si admiten
   gente nueva.
3. **EDICOMA y Calor y Café** — confirmar el horario, ya con todos los
   teléfonos correctos.
4. **San Juan de Dios** no necesita llamada — ya está verificado.

`src/data/puntos.ts` no se ha tocado. La propuesta de cómo incorporar estos
hallazgos (los tres teléfonos de Calor y Café, el alias de barrio, Regina
Mundi con los dos teléfonos) va en el mensaje al equipo, para acordar el
diseño antes de escribir código.
