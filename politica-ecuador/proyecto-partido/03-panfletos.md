# Panfletos (digitales e impresos)

Las imágenes están en `panfletos/` y se regeneran con `node panfletos/generar.js`. Ahí se editan los textos, colores y datos.

## Identidad visual
- **Colores:**
  - ámbar `#F5B700`, que evoca el amarillo de la bandera y no pertenece a ADN ni al correísmo;
  - negro `#111214`;
  - blanco;
  - gris `#B9BCC4`.
- **Tipografía:** Inter (gratuita), en peso Black para los titulares.
- **Símbolo:** un "3" gigante y translúcido de fondo (la tercera opción).
- **Zona segura de TikTok:** el contenido importante queda fuera de los 300 px inferiores y de los 150 px de la derecha, donde TikTok pone la descripción y los botones.

## Panfletos incluidos
| Archivo | Formato | Uso | Mensaje |
|---|---|---|---|
| `01-otra-opcion.png` | 1080×1920 | TikTok (modo foto), historias, estados de WhatsApp | ¿Y si hubiera otra opción? Comenta SÍ o NO |
| `02-seguridad-datos.png` | 1080×1920 | Carrusel con datos | 9.216 homicidios en 2025; 23 al día en 2026 (con fuente) |
| `03-votar-por-miedo.png` | 1080×1920 | Pregunta emocional | Votar por miedo no es elegir: A, B o C |
| `04-lo-que-nos-une.png` | 1080×1920 | Mensaje para unir | Seguridad. Luz. Trabajo. ¿Es mucho pedir? |
| `05-encuesta.png` | 1080×1920 | Campaña de medición | ¿Votarías por una tercera opción en 2029? |
| `06-impreso-a5-unete.png` | A5 a 300 dpi (1748×2480) | Volante impreso para universidades, mercados y eventos | Únete, con un espacio para el código QR del formulario |

## Carrusel recomendado (modo foto de TikTok)
**Orden:** 01, luego 03, luego 02, luego 04 y al final 05. Así la secuencia va de la pregunta a la emoción, de la emoción al dato, del dato a lo que nos une, y termina con la acción.

**Descripción sugerida:**
> En 2025 casi 9 de cada 10 votos fueron para los mismos dos. ¿Fue convicción o falta de opciones? Desliza y responde: ¿votarías por una tercera opción en 2029? 👇
> `#LaTerceraOpción #Ecuador #EcuadorDecide #TúDecides #PolíticaEcuador`

## Volante impreso (A5)
1. Crea el formulario (ver `05-campana-medicion.md`) y genera un código QR gratuito con su enlace.
2. Pega el código QR en el recuadro punteado: puedes editar `generar.js` para insertar la imagen, o hacerlo en Canva.
3. Reemplaza `@[tu_cuenta]` y `[responsable]` con los datos reales. Es buena práctica identificar quién imprime el material político.
4. Imprime en papel couché de 115 a 150 g. Se aprovecha mejor imprimiendo 2 volantes por hoja A4.
5. **No repartas volantes durante el silencio electoral** ni en los recintos de votación. Desde el 12 de noviembre (campaña seccional), evita repartirlos junto a material de candidatos.

## Textos adicionales para nuevos panfletos
- "Ni de unos ni de otros: **de Ecuador**."
- "Dos crisis de luz en tres años. **La energía se planifica.**"
- "Tu voto no debería ser **contra alguien**, sino **por algo**."
- "Mi prima se fue. Mi amigo se fue. **Yo me quedé. Que valga la pena.**"
- "¿Cuántos somos? **Comenta tu provincia.**"
- "Crear un partido exige 200.000 personas. **¿Somos más?**"

## Cómo actualizar los datos
Antes de cada publicación revisa la ficha `../10-panorama-politico-actual.md`. Si una cifra cambia (homicidios, apagones), edítala en `generar.js` y vuelve a generar la imagen. **Nunca publiques una cifra sin fuente.**
