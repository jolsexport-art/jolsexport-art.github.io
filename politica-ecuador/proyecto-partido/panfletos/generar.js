// Genera los panfletos de "Salvemos al Ecuador". Uso: node generar.js (requiere playwright)
const { chromium } = require('playwright');
const path = require('path');

const MARCA = 'SALVEMOS AL ECUADOR', CUENTA = '@salvemos_al_ecuador', HASH = '#SalvemosAlEcuador';
const AMBAR = '#F5B700', NEGRO = '#111214', BLANCO = '#FFFFFF', GRIS = '#B9BCC4';

const css = (w, h, print) => `*{margin:0;padding:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;background:${NEGRO};color:${BLANCO};font-family:'Inter','DejaVu Sans',sans-serif;overflow:hidden;position:relative}
.wrap{position:absolute;inset:0;padding:${print ? '110px 110px' : '100px 150px 100px 90px'};display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:22px;font-weight:900;font-size:${print ? 58 : 40}px;letter-spacing:2px}
.brand .dot{width:${print ? 26 : 18}px;height:${print ? 26 : 18}px;border-radius:50%;background:${AMBAR}}
.tag{font-weight:800;font-size:${print ? 50 : 36}px;color:${AMBAR};letter-spacing:1px;margin-top:${print ? 90 : 70}px}
.big{font-weight:900;line-height:.98;letter-spacing:-3px}
.amb{color:${AMBAR}}
.sub{font-size:50px;line-height:1.25;color:${GRIS};font-weight:500}
.w{color:${BLANCO};font-weight:700}
.cta{background:${AMBAR};color:${NEGRO};font-weight:900;font-size:54px;padding:30px 42px;border-radius:24px;display:inline-block}
.foot{position:absolute;left:90px;right:150px;bottom:${print ? 90 : 300}px;display:flex;justify-content:space-between;align-items:flex-end;gap:30px;font-size:36px;color:${GRIS}}
.foot b{color:${BLANCO}}
.three{position:absolute;right:-60px;top:420px;font-size:1150px;font-weight:900;color:${AMBAR};opacity:.07;line-height:1}
.src{font-size:30px;color:#8A8E98}
.box{border:6px solid ${AMBAR};border-radius:28px;padding:36px 44px;font-size:60px;font-weight:800}
.li{display:flex;gap:28px;align-items:flex-start;font-size:48px;line-height:1.2;font-weight:700;margin-bottom:34px}
.n{flex:none;width:74px;height:74px;border-radius:50%;background:${AMBAR};color:${NEGRO};font-weight:900;display:flex;align-items:center;justify-content:center;font-size:42px}`;

const page = (w, h, body, print = false) => `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css(w, h, print)}</style></head>
<body><div class="three">3</div><div class="wrap"><div class="brand"><span class="dot"></span>${MARCA}</div>${body}</div></body></html>`;

const foot = (msg) => `<div class="foot"><div style="max-width:70%"><b>${CUENTA}</b><br>${msg}</div><div style="text-align:right"><b>${HASH}</b></div></div>`;

const V = [1080, 1920];
const flyers = {
  '01-presentacion': [...V, `
    <div class="tag">HOLA, ECUADOR</div>
    <div class="big" style="font-size:132px;margin-top:40px">SOMOS<br>CIUDADANOS,<br><span class="amb">NO<br>POLÍTICOS<br>DE SIEMPRE.</span></div>
    <div class="sub" style="margin-top:56px">Creemos que el Ecuador merece <span class="w">otra opción</span>: ni de unos ni de otros, <span class="w">de todos</span>.</div>
    <div style="margin-top:56px"><span class="cta">Síguenos y súmate</span></div>
    ${foot('Comenta desde qué provincia nos ves')}`],
  '02-otra-opcion': [...V, `
    <div class="tag">ECUADOR 2029</div>
    <div class="big" style="font-size:146px;margin-top:40px">¿Y SI<br>HUBIERA<br><span class="amb">OTRA<br>OPCIÓN?</span></div>
    <div class="sub" style="margin-top:60px">Ecuador no tiene por qué elegir siempre entre los mismos dos.</div>
    <div style="margin-top:60px"><span class="cta">Comenta SÍ o NO</span></div>
    ${foot('Queremos saber cuántos somos')}`],
  '03-seguridad': [...V, `
    <div class="tag">DATOS QUE DUELEN</div>
    <div class="big amb" style="font-size:220px;margin-top:30px">9.216</div>
    <div class="sub w" style="font-size:56px">homicidios en 2025. El año más violento de nuestra historia.</div>
    <div class="big amb" style="font-size:190px;margin-top:40px">23</div>
    <div class="sub w" style="font-size:56px">asesinatos al día en 2026.</div>
    <div class="sub" style="margin-top:40px">La seguridad tiene que ser un <b class="amb">resultado</b>, no un eslogan.</div>
    <div class="src" style="margin-top:28px">Fuentes: OECO (2025 y 1.er semestre 2026); Infobae, 18-10-2026.</div>
    ${foot('¿Qué propuesta exigirías? Comenta')}`],
  '04-apagones': [...V, `
    <div class="tag">OTRA VEZ SIN LUZ</div>
    <div class="big" style="font-size:128px;margin-top:40px">2024:<br><span class="amb">APAGONES.</span><br>2026:<br><span class="amb">OTRA VEZ.</span></div>
    <div class="sub w" style="margin-top:50px;font-size:56px">Cortes de hasta 10 horas diarias este año.</div>
    <div class="sub" style="margin-top:30px">La energía no se arregla con contratos de emergencia. <span class="w">Se planifica.</span></div>
    <div class="src" style="margin-top:28px">Fuente: declaraciones del Gobierno, NTN24, 24-09-2026.</div>
    ${foot('¿Cuántas horas sin luz tuviste? Comenta')}`],
  '05-votar-por-miedo': [...V, `
    <div class="tag">ELECCIÓN TRAS ELECCIÓN</div>
    <div class="big" style="font-size:136px;margin-top:40px">VOTAR<br>POR MIEDO<br><span class="amb">NO ES<br>ELEGIR.</span></div>
    <div style="display:flex;gap:28px;margin-top:70px">
      <div class="box" style="flex:1;text-align:center;border-color:#555;color:${GRIS}">A</div>
      <div class="box" style="flex:1;text-align:center;border-color:#555;color:${GRIS}">B</div>
      <div class="box" style="flex:1;text-align:center;background:${AMBAR};color:${NEGRO}">C?</div></div>
    <div class="sub" style="margin-top:50px">Construyamos la puerta C entre todos.</div>
    ${foot('¿Alguna vez votaste por el menos malo?')}`],
  '06-lo-que-nos-une': [...V, `
    <div class="tag">NO IMPORTA POR QUIÉN VOTASTE</div>
    <div class="big" style="font-size:126px;margin-top:40px">LO QUE<br><span class="amb">NOS UNE:</span></div>
    <div class="big" style="font-size:112px;margin-top:50px;line-height:1.15">Seguridad.<br>Luz.<br>Trabajo.</div>
    <div class="sub" style="margin-top:50px">Llegar vivos a casa. Que no se vaya la luz. Que nuestros hijos no tengan que irse del país.</div>
    <div style="margin-top:50px"><span class="cta">¿Es mucho pedir?</span></div>
    ${foot('Compártelo con alguien que votó distinto')}`],
  '07-encuesta': [...V, `
    <div class="tag">ENCUESTA ABIERTA</div>
    <div class="big" style="font-size:102px;margin-top:40px">¿VOTARÍAS POR UNA <span class="amb">TERCERA OPCIÓN</span> EN 2029?</div>
    <div style="display:flex;flex-direction:column;gap:26px;margin-top:56px">
      <div class="box" style="background:${AMBAR};color:${NEGRO}">SÍ, la necesitamos</div>
      <div class="box" style="color:${BLANCO};border-color:#555">NO, me quedo con los mismos</div></div>
    <div class="sub" style="margin-top:40px;font-size:46px">Vota y comenta <span class="w">tu provincia</span>. Publicaremos los resultados.</div>
    ${foot('Consulta abierta a nuestra comunidad')}`],
  '08-compromisos': [...V, `
    <div class="tag">NUESTRA PALABRA</div>
    <div class="big" style="font-size:112px;margin-top:40px;margin-bottom:60px">5 <span class="amb">COMPROMISOS</span></div>
    <div class="li"><span class="n">1</span><span>Datos siempre con fuente.</span></div>
    <div class="li"><span class="n">2</span><span>Criticamos ideas y resultados, nunca insultamos personas.</span></div>
    <div class="li"><span class="n">3</span><span>Cero cuentas falsas y cero seguidores comprados.</span></div>
    <div class="li"><span class="n">4</span><span>Respeto a quien votó por cualquier opción.</span></div>
    <div class="li"><span class="n">5</span><span>Cuentas claras de cada dólar.</span></div>
    ${foot('Si no cumplimos, exígenos')}`],
  '09-impreso-a5': [1748, 2480, `
    <div class="tag">ECUADOR 2029</div>
    <div class="big" style="font-size:220px;margin-top:70px">¿Y SI HUBIERA <span class="amb">OTRA OPCIÓN?</span></div>
    <div class="sub" style="font-size:76px;margin-top:90px">Ni de unos ni de otros: <b style="color:${BLANCO}">de Ecuador.</b><br>Seguridad con resultados. Luz. Trabajo. Cero corrupción.</div>
    <div style="display:flex;gap:80px;align-items:center;margin-top:110px">
      <div style="flex:none;width:500px;height:500px;border:8px dashed ${AMBAR};border-radius:28px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:50px;color:${GRIS}">PEGAR AQUÍ<br>CÓDIGO QR<br>del formulario</div>
      <div><div class="cta" style="font-size:96px">ÚNETE</div><div class="sub" style="font-size:64px;margin-top:40px">Síguenos en TikTok:<br><b style="color:${BLANCO}">${CUENTA}</b></div></div></div>
    <div class="foot" style="font-size:54px;left:110px;right:110px"><div><b>${HASH}</b></div><div class="src" style="font-size:38px">Material ciudadano · Impreso por [responsable]</div></div>`, true],
};

(async () => {
  const browser = await chromium.launch();
  for (const [name, [w, h, body, print]] of Object.entries(flyers)) {
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.setContent(page(w, h, body, print), { waitUntil: 'load' });
    await p.screenshot({ path: path.join(__dirname, `${name}.png`) });
    await p.close();
    console.log('ok', name);
  }
  await browser.close();
})();
