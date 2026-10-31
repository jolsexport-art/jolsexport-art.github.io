# Campaña "¿Quién es La 3ra?"

Lanzada el **31 de octubre de 2026** en @salvemos_al_ecuador.

## 1. Objetivo
1. Medir cuántas personas están **de acuerdo con una tercera opción** para Ecuador.
2. Recoger los **nombres de posibles candidatos o candidatas para 2029** que propone la gente, con el porqué y la provincia.
3. Hacer crecer la cuenta con una pregunta que invita a comentar y compartir.

> Es una **consulta abierta a nuestra comunidad**, no una encuesta electoral: responde quien ve la publicación. Los resultados se presentan siempre con el número de respuestas y las fechas, nunca como "el X % del Ecuador" (fichas 05 y 06).

## 2. Lo publicado
| Fecha y hora | Publicación | Estado |
|---|---|---|
| 31 oct, 13:12 | Panfleto `01-presentacion` (foto sola) | ✔️ Publicado, público |
| 31 oct, 19:30 | Carrusel `10-campana-de-acuerdo` → `11-campana-quien-es-la-3ra` → `12-campana-como-participar` | ⏳ Programado en TikTok Studio |

**Descripción del panfleto 1:**
> Hola, Ecuador 🇪🇨 Somos ciudadanos, no políticos de siempre. Somos La 3ra: ni de unos ni de otros, de todos. ¿Desde qué provincia nos ves? Comenta 👇
>
> `#SalvemosAlEcuador #La3ra #LaTerceraOpción #Ecuador #EcuadorDecide #PolíticaEcuador`

**Descripción de la campaña:**
> ¿Estás de acuerdo con una tercera opción para Ecuador? 🇪🇨 Comenta SÍ o NO, tu provincia y el nombre de quién te gustaría ver como candidato o candidata en 2029 (y por qué). Sin insultos: solo propuestas. En diciembre publicamos el conteo 👇
>
> `#QuienEsLa3ra #SalvemosAlEcuador #La3ra #LaTerceraOpción #Ecuador2029 #Ecuador`

**Comentario fijado (cuando salga la campaña):** "Formato: SÍ o NO · nombre · provincia 👇"

## 3. Los panfletos de la campaña
| Archivo | Mensaje |
|---|---|
| `panfletos/10-campana-de-acuerdo.png` | ¿Estás de acuerdo con una tercera opción para Ecuador? SÍ / NO. Comenta y desliza |
| `panfletos/11-campana-quien-es-la-3ra.png` | ¿Quién debería ser La 3ra? Tres reglas: ni del Gobierno ni del correísmo; cualquier persona (alcalde, prefecta, profesional, líder barrial); cero insultos |
| `panfletos/12-campana-como-participar.png` | 4 pasos: SÍ/NO, nombre y por qué, provincia, compartir con 3 personas que votaron distinto. "En diciembre publicamos el conteo" |

Se regeneran con `node generar.js 10-campana-de-acuerdo 11-campana-quien-es-la-3ra 12-campana-como-participar`.

## 4. Calendario
| Fechas | Qué hacer |
|---|---|
| **31 oct – 11 nov** | Responder todos los comentarios de las primeras 2 horas. Cada 2 o 3 días, **responder con video** a un comentario con una buena propuesta (sin dar ranking). Compartir la campaña en WhatsApp y grupos. Se puede decir "ya van X respuestas", pero sin porcentajes ni nombres más votados |
| **12 – 26 nov** (campaña de las seccionales) | Seguir recogiendo respuestas. No publicar conteos, rankings ni contenido sobre candidatos seccionales. Si alguien propone a un candidato seccional, no amplificarlo |
| **19 – 29 nov** | **Nada de resultados, encuestas ni conteos** (ficha 07). Silencio total el 28 y 29 |
| **Primera semana de diciembre** | Video de resultados: número de respuestas, fechas, % de SÍ y NO **entre quienes respondieron**, los nombres más propuestos y las provincias con más participación |
| **Diciembre** | Con los nombres más propuestos, abrir la Fase 1 (ficha 00): contactar a quienes tengan trayectoria y quieran sumarse |

## 5. Cómo se cuenta
- Cada semana se leen los comentarios de la campaña y se cuentan: **SÍ**, **NO**, **nombres propuestos** (unificando la forma de escribirlos) y **provincias**.
- Se guarda **solo el conteo**, sin usuarios ni datos personales (principio de minimización, ficha 06), en `datos/campana-quien-es-la-3ra.csv` con estas columnas:
  - `fecha_corte`, `comentarios_leidos`, `si`, `no`, `otros`;
  - una fila por nombre: `nombre_propuesto`, `menciones`;
  - una fila por provincia: `provincia`, `respuestas`.
- Si un comentario dice SÍ o NO más de una vez, cuenta una sola vez por usuario.

## 6. Reglas de moderación
- **Ocultar** insultos, amenazas, racismo y datos personales (teléfonos, direcciones).
- **No ocultar** un NO ni una crítica respetuosa: la consulta tiene que ser creíble.
- En los resultados solo se publican nombres de **figuras públicas**. Si alguien propone a una persona privada (un vecino, un líder barrial), se cuenta, pero no se publica su nombre sin su permiso.
- No se acusa a nadie de nada en las respuestas (COIP, art. 182).

## 7. Para que se haga viral (sin trampas)
- **Primeras 2 horas:** responder cada comentario y pedir a 10 o 20 personas cercanas que comenten y compartan. Que no comenten todas a la misma hora.
- **Responder con video** a los mejores comentarios: alarga la conversación y TikTok lo muestra a quien comentó.
- **Stitch o dúo** con videos virales sobre política, cerrando con "¿Y tú quién crees que debería ser La 3ra?".
- **Horarios:** de 9:00 a 12:00 y desde las 19:30 (ficha 08). Nunca publicar en ráfagas.
- **Prohibido:** comprar seguidores, likes o comentarios, usar cuentas falsas y pagar promoción. TikTok no permite publicidad política (ficha 06) y eso arruinaría la medición.
