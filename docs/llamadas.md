# Guion de llamadas — para Andrii

Objetivo: confirmar por teléfono lo que internet ya no puede darnos. Cada
bloque es una llamada de dos o tres minutos. El orden importa — está puesto
de más a menos valioso.

Antes de llamar: di quién eres y por qué llamas, en una frase. Por ejemplo:

> *"Hola, buenos días. Soy un estudiante de Granada haciendo un proyecto de
> clase sobre comedores sociales de la ciudad. ¿Le puedo hacer un par de
> preguntas rápidas sobre el horario?"*

Nadie necesita más contexto que ese para responder.

---

## 1. Ayuntamiento — el listado de los 14 centros

**La llamada más importante de todas.** Un solo teléfono puede destapar
comedores enteros que hoy no están en la web porque nadie los ha publicado.

| | |
|---|---|
| **A quién llamar** | Programa municipal de Solidaridad y Garantía Alimentaria |
| **Teléfono** | **958 27 57 00** |
| **Ya sabemos** | El programa tiene 14 centros adheridos, financiación municipal de 1.214.845 €. Solo conocemos 1 de los 14 con seguridad (San Juan de Dios). |

**Preguntas, en orden:**

1. ¿Me pueden dar el listado de los 14 centros del programa, con dirección?
   → Respuesta: ______________________________________________

2. De los que ya tenemos (San Juan de Dios, Regina Mundi, Calor y Café,
   EDICOMA), ¿cuáles están en ese programa?
   → Respuesta: ______________________________________________

3. Los comedores de Chana y Norte que reabrieron — ¿dónde están exactamente
   y qué horario tienen?
   → Respuesta: ______________________________________________

---

## 2. Comedor Social Regina Mundi — dos preguntas que hay que resolver sí o sí

| | |
|---|---|
| **Dirección** | Camino de Purchil 8 |
| **Teléfono A** (el que está en la web ahora) | **958 25 07 58** |
| **Teléfono B** (fuente distinta, sin confirmar) | **958 26 35 44** |
| **Ya sabemos** | Lunes a sábado, entrega de alimentos a mediodía, sobre las 13:00 (tres fuentes coinciden). Una fuente dice "preferencia a quien ya recibía alimentos". |

**Preguntas:**

1. Llama primero al Teléfono A. Si no contesta o el número no es el
   correcto, prueba el Teléfono B.
   → ¿Cuál de los dos contestó? ______________________________

2. ¿A qué hora exacta es el reparto, y hasta qué hora?
   → Respuesta: ______________________________________________

3. ¿Hace falta ser ya usuario, o puede ir alguien por primera vez?
   → Respuesta: ______________________________________________

4. ¿Hace falta llevar algún documento?
   → Respuesta: ______________________________________________

---

## 3. Centro Social Hogar Corazón de María (EDICOMA)

| | |
|---|---|
| **Dirección** | C/ Colegios s/n |
| **Teléfono** | **660 64 09 66** |
| **Correo** (si no contestan al teléfono) | edicoma@hotmail.es |
| **Ya sabemos** | Cena, todo el año. Dos fuentes de 2020 dicen las 20:00, pero una dice "todos los días" y otra "lunes a sábado". Desayuno solo en invierno, en fechas que cambian cada año. |

**Preguntas:**

1. ¿La cena es a las 20:00?
   → Respuesta: ______________________________________________

2. ¿Es todos los días, o de lunes a sábado?
   → Respuesta: ______________________________________________

3. ¿Este invierno hay desayuno? ¿Desde cuándo?
   → Respuesta: ______________________________________________

4. ¿Hace falta cita o algún documento?
   → Respuesta: ______________________________________________

---

## 4. Asociación Calor y Café

| | |
|---|---|
| **Dirección** | C/ El Guerra 16, Barrio de la Cruz (18014) |
| **Teléfonos** (probar en este orden) | **958 209 383** · 958 163 316 · 699 970 526 |
| **Ya sabemos** | Da desayunos y meriendas, no comidas. Ninguna fuente dice la hora. |

**Preguntas:**

1. ¿A qué hora es el desayuno? ¿Y la merienda?
   → Respuesta: ______________________________________________

2. ¿Hace falta cita o algún documento?
   → Respuesta: ______________________________________________

3. ¿Cuál de los tres teléfonos es el que hay que usar normalmente?
   → Respuesta: ______________________________________________

---

## 5. Asociación Dar Al Anwar — solo si sobra tiempo

| | |
|---|---|
| **Teléfono** | **663 522 419** |
| **Ya sabemos** | Único dato es de una guía de 2020, escrita en plena pandemia. Sin dirección. |

**Una sola pregunta, la que importa:**

1. ¿Esta asociación sigue funcionando? Si es que sí: ¿dónde y a qué horas
   reparten alimentos?
   → Respuesta: ______________________________________________

---

## Después de llamar

Con las respuestas apuntadas, el siguiente paso es actualizar
`src/data/puntos.ts` — cambiar `horario: null` por el horario real y
`verificado: false` por `true` allí donde una llamada lo haya confirmado. Esa
parte del código ya está lista para recibir los datos; lo único que falta
son las respuestas de arriba.
