// Genera los panfletos PNG. Uso: node generar.js  (requiere playwright)
const { chromium } = require('playwright');
const path = require('path');

const AMBAR = '#F5B700', NEGRO = '#111214', BLANCO = '#FFFFFF', GRIS = '#B9BCC4';
const base = (w, h, body) => `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;background:${NEGRO};color:${BLANCO};font-family:'Inter','DejaVu Sans',sans-serif;overflow:hidden;position:relative}
.wrap{position:absolute;inset:0;padding:100px 150px 100px 90px;display:flex;flex-direction:column}
.tag{font-weight:800;font-size:44px;color:${AMBAR};letter-spacing:1px}
.big{font-weight:900;line-height:.98;letter-spacing:-3px}
.amb{color:${AMBAR}}
.sub{font-size:52px;line-height:1.25;color:${GRIS};font-weight:500}
.cta{background:${AMBAR};color:${NEGRO};font-weight:900;font-size:58px;padding:34px 44px;border-radius:24px;display:inline-block}
.foot{position:absolute;left:90px;right:150px;bottom:300px;display:flex;justify-content:space-between;align-items:flex-end;font-size:38px;color:${GRIS}}
.three{position:absolute;right:-60px;top:380px;font-size:1150px;font-weight:900;color:${AMBAR};opacity:.08;line-height:1}
.src{font-size:32px;color:#8A8E98}
.box{border:6px solid ${AMBAR};border-radius:28px;padding:40px 46px;font-size:64px;font-weight:800}
</style></head><body><div class="three">3</div><div class="wrap">${body}</div></body></html>`;

const foot = (extra='') => `<div class="foot"><div style="max-width:68%"><b style="color:${BLANCO}">#LaTerceraOpción</b><br>${extra}</div><div style="text-align:right">Ecuador 2029</div></div>`;

const flyers = {
  '01-otra-opcion': [1080,1920, `
    <div class="tag">ECUADOR 2029</div>
    <div class="big" style="font-size:150px;margin-top:120px">¿Y SI<br>HUBIERA<br><span class="amb">OTRA<br>OPCIÓN?</span></div>
    <div class="sub" style="margin-top:70px">Ecuador no tiene por qué elegir siempre entre los mismos dos.</div>
    <div style="margin-top:80px"><span class="cta">Comenta SÍ o NO</span></div>
    ${foot('Síguenos y súmate')}`],
  '02-seguridad-datos': [1080,1920, `
    <div class="tag">DATOS QUE DUELEN</div>
    <div class="big amb" style="font-size:230px;margin-top:60px">9.216</div>
    <div class="sub" style="color:${BLANCO};font-weight:700;font-size:60px">homicidios en 2025.<br>El año más violento de nuestra historia.</div>
    <div class="big amb" style="font-size:200px;margin-top:50px">23</div>
    <div class="sub" style="color:${BLANCO};font-weight:700;font-size:60px">asesinatos al día en 2026.</div>
    <div class="sub" style="margin-top:44px">La seguridad tiene que ser un <b style="color:${AMBAR}">resultado</b>, no un eslogan.</div>
    <div class="src" style="margin-top:40px">Fuentes: OECO (2025, primer semestre 2026); Infobae, 18-10-2026.</div>
    ${foot('¿Qué propuesta exigirías? Comenta')}`],
  '03-votar-por-miedo': [1080,1920, `
    <div class="tag">ELECCIÓN TRAS ELECCIÓN</div>
    <div class="big" style="font-size:140px;margin-top:110px">VOTAR<br>POR MIEDO<br><span class="amb">NO ES<br>ELEGIR.</span></div>
    <div style="display:flex;gap:30px;margin-top:90px">
      <div class="box" style="flex:1;text-align:center;border-color:#555;color:${GRIS}">A</div>
      <div class="box" style="flex:1;text-align:center;border-color:#555;color:${GRIS}">B</div>
      <div class="box" style="flex:1;text-align:center;background:${AMBAR};color:${NEGRO}">C?</div>
    </div>
    <div class="sub" style="margin-top:60px">Construyamos la puerta C entre todos.</div>
    ${foot('¿Alguna vez votaste por el menos malo?')}`],
  '04-lo-que-nos-une': [1080,1920, `
    <div class="tag">NO IMPORTA POR QUIÉN VOTASTE</div>
    <div class="big" style="font-size:130px;margin-top:110px">LO QUE<br><span class="amb">NOS UNE:</span></div>
    <div class="big" style="font-size:118px;margin-top:80px;line-height:1.15">Seguridad.<br>Luz.<br>Trabajo.</div>
    <div class="sub" style="margin-top:80px">Llegar vivos a casa. Que no se vaya la luz. Que nuestros hijos no tengan que irse del país.</div>
    <div style="margin-top:70px"><span class="cta">¿Es mucho pedir?</span></div>
    ${foot('Compártelo con alguien que votó distinto')}`],
  '05-encuesta': [1080,1920, `
    <div class="tag">ENCUESTA ABIERTA</div>
    <div class="big" style="font-size:104px;margin-top:70px">¿VOTARÍAS POR UNA <span class="amb">TERCERA OPCIÓN</span> EN 2029?</div>
    <div style="display:flex;flex-direction:column;gap:28px;margin-top:60px">
      <div class="box" style="background:${AMBAR};color:${NEGRO}">SÍ, la necesitamos</div>
      <div class="box" style="color:${BLANCO};border-color:#555">NO, me quedo con los mismos</div>
    </div>
    <div class="sub" style="margin-top:44px;font-size:46px">Vota en el video y comenta <b style="color:${BLANCO}">tu provincia</b>. Publicaremos los resultados.</div>
    ${foot('Consulta abierta a nuestra comunidad')}`],
  '06-impreso-a5-unete': [1748,2480, `
    <div class="tag" style="font-size:64px">ECUADOR 2029</div>
    <div class="big" style="font-size:230px;margin-top:150px">¿Y SI HUBIERA <span class="amb">OTRA OPCIÓN?</span></div>
    <div class="sub" style="font-size:78px;margin-top:100px">Ni de unos ni de otros: <b style="color:${BLANCO}">de Ecuador.</b><br>Seguridad con resultados. Luz. Trabajo. Cero corrupción.</div>
    <div style="display:flex;gap:80px;align-items:center;margin-top:130px">
      <div style="width:520px;height:520px;border:8px dashed ${AMBAR};border-radius:28px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:52px;color:${GRIS}">PEGAR AQUÍ<br>CÓDIGO QR<br>del formulario</div>
      <div><div class="cta" style="font-size:96px">ÚNETE</div><div class="sub" style="font-size:66px;margin-top:40px">Escanea y dinos qué país quieres.<br>TikTok: <b style="color:${BLANCO}">@[tu_cuenta]</b></div></div>
    </div>
    <div class="foot" style="font-size:56px;left:90px;right:90px;bottom:90px"><div><b style="color:${BLANCO}">#LaTerceraOpción</b></div><div class="src" style="font-size:40px">Material ciudadano · Impreso por [responsable]</div></div>`],
};

(async () => {
  const browser = await chromium.launch();
  for (const [name, [w, h, body]] of Object.entries(flyers)) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.setContent(base(w, h, body), { waitUntil: 'load' });
    await page.screenshot({ path: path.join(__dirname, `${name}.png`) });
    await page.close();
    console.log('ok', name);
  }
  await browser.close();
})();
