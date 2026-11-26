/* =========================================================
   NeuroMotion Explorer — saraf.js
   Navigasi, tab materi, simulasi alur, kuis, dan model 3D (Three.js)
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------------------------------------------------------
   1. NAVIGASI HALAMAN (hash routing)
   --------------------------------------------------------- */
const PAGES = ['beranda', 'materi', 'kelainan', 'alur', 'kuis'];

function route() {
  let h = (location.hash || '#beranda').slice(1);
  if (!PAGES.includes(h)) h = 'beranda';
  PAGES.forEach(p => $('#' + p).classList.toggle('on', p === h));
  $$('nav a').forEach(a => {
    if (a.getAttribute('href') === '#' + h) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  $('#nav').classList.remove('open');
  $('#menuBtn').setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
}
addEventListener('hashchange', route);
route();

$('#menuBtn').addEventListener('click', () => {
  const open = $('#nav').classList.toggle('open');
  $('#menuBtn').setAttribute('aria-expanded', String(open));
});

/* ---------------------------------------------------------
   2. TAB MATERI
   --------------------------------------------------------- */
function makeTabs(boxSel, panelSel, items, onChange) {
  const box = $(boxSel), panel = $(panelSel);
  function show(i) {
    [...box.children].forEach((b, j) => {
      b.classList.toggle('sel', i === j);
      b.setAttribute('aria-selected', String(i === j));
    });
    panel.innerHTML = '<h3>' + items[i].t + '</h3><p>' + items[i].d + '</p>';
    if (onChange) onChange(items[i].key);
  }
  items.forEach((it, i) => {
    const b = document.createElement('button');
    b.textContent = it.t;
    b.setAttribute('role', 'tab');
    b.addEventListener('click', () => show(i));
    box.appendChild(b);
  });
  show(0);
}

let bodyFocus = 'otak';
makeTabs('#sarafTabs', '#sarafPanel', [
  { key: 'otak', t: 'Otak', d: 'Pusat pengendali seluruh tubuh. Otak mengolah informasi dari indra, mengatur pikiran, memori, dan emosi, serta mengirim perintah untuk gerak sadar — misalnya saat kamu mengangkat tangan untuk menjawab pertanyaan guru. Otak dilindungi oleh tulang tengkorak.' },
  { key: 'sumsum', t: 'Sumsum tulang belakang', d: 'Jalur utama impuls saraf antara otak dan bagian tubuh lain. Sumsum tulang belakang terlindung di dalam ruas-ruas tulang belakang dan menjadi pusat gerak refleks, sehingga tubuh bisa merespons bahaya dengan sangat cepat.' },
  { key: 'tepi', t: 'Saraf tepi', d: 'Serabut saraf yang menyebar dari saraf pusat ke seluruh tubuh. <b>Saraf sensorik</b> membawa rangsangan dari indra ke pusat saraf, sedangkan <b>saraf motorik</b> membawa perintah dari pusat saraf ke otot (efektor).' }
], k => { bodyFocus = k; });

makeTabs('#gerakTabs', '#gerakPanel', [
  { t: 'Tulang', d: 'Tulang menopang tubuh, memberi bentuk, melindungi organ penting (tengkorak melindungi otak, rusuk melindungi jantung dan paru-paru), dan menjadi tempat melekatnya otot. Tulang tidak bisa bergerak sendiri, sehingga disebut <b>alat gerak pasif</b>. Berdasarkan bentuknya ada tulang <b>pipa, pipih, pendek, tidak beraturan,</b> dan <b>sesamoid</b>.' },
  { t: 'Sendi', d: 'Sendi adalah hubungan antartulang. <b>Sendi engsel</b> (siku, lutut) bergerak satu arah, <b>sendi peluru</b> (bahu, pinggul) ke segala arah, dan <b>sendi putar</b> (leher) memutar. Ujung tulang pada sendi dilapisi tulang rawan agar gerakan halus.' },
  { t: 'Otot', d: 'Otot berkontraksi (memendek) untuk menarik tulang sehingga tubuh bergerak, maka disebut <b>alat gerak aktif</b>. Ada tiga jenis otot: <b>otot rangka, otot polos,</b> dan <b>otot jantung</b>. Otot rangka bekerja berpasangan: saat biseps berkontraksi, triseps relaksasi, dan sebaliknya.' }
]);

let brainFocus = 'besar';
makeTabs('#otakTabs', '#otakPanel', [
  { key: 'besar', t: 'Otak besar', d: '<b>Otak besar (serebrum)</b> adalah bagian otak terbesar, terdiri dari belahan kiri dan kanan dengan permukaan berlipat-lipat. <b>Fungsi:</b> pusat berpikir, kecerdasan, ingatan, kemauan, bahasa, dan pengendali gerak sadar. Otak besar memiliki empat lobus: <b>frontal</b> (berpikir dan gerak), <b>parietal</b> (rasa raba), <b>temporal</b> (pendengaran), dan <b>oksipital</b> (penglihatan). <br><b>Contoh:</b> mengerjakan soal matematika atau mengingat kode program.' },
  { key: 'kecil', t: 'Otak kecil', d: '<b>Otak kecil (serebelum)</b> terletak di bagian belakang bawah otak besar. <b>Fungsi:</b> mengatur keseimbangan tubuh, mengoordinasikan kerja otot, dan menjaga sikap tubuh (postur) agar gerakan halus dan tepat. <br><b>Contoh:</b> menjaga badan tetap seimbang saat bersepeda atau berjalan di atas papan titian.' },
  { key: 'batang', t: 'Batang otak', d: '<b>Batang otak</b> menghubungkan otak dengan sumsum tulang belakang. Terdiri dari <b>otak tengah</b> (mesensefalon), <b>jembatan varol</b> (pons), dan <b>sumsum lanjutan</b> (medula oblongata). <b>Fungsi:</b> mengatur kegiatan yang tidak disadari, seperti detak jantung, pernapasan, tekanan darah, menelan, bersin, dan refleks pupil mata. <br><b>Contoh:</b> kamu tetap bernapas dan jantung tetap berdetak meskipun sedang tidur.' },
  { key: 'semua', t: 'Lihat semua', d: 'Ketiga bagian bekerja sama: <b>otak besar</b> memutuskan gerakan, <b>otak kecil</b> membuat gerakan seimbang dan terkoordinasi, sedangkan <b>batang otak</b> menjaga fungsi hidup dasar dan meneruskan impuls ke sumsum tulang belakang.' }
], k => { brainFocus = k; });

let boneFocus = 'pipa';
makeTabs('#tulangTabs', '#tulangPanel', [
  { key: 'pipa', t: 'Tulang pipa', d: '<b>Tulang pipa (tulang panjang)</b> berbentuk seperti pipa: panjang, bulat, dan berongga, dengan kedua ujung membesar (epifisis) serta bagian tengah (diafisis). Rongganya berisi sumsum tulang. <b>Fungsi:</b> sebagai pengungkit gerak dan tempat pembentukan sel darah. <br><b>Contoh:</b> tulang paha, tulang lengan atas, tulang hasta, tulang kering.' },
  { key: 'pipih', t: 'Tulang pipih', d: '<b>Tulang pipih</b> berbentuk lebar, tipis, dan sedikit melengkung seperti lempengan. <b>Fungsi:</b> melindungi organ penting dan tempat pembentukan sel darah merah. <br><b>Contoh:</b> tulang tengkorak (melindungi otak), tulang rusuk dan tulang dada (melindungi jantung dan paru-paru), tulang belikat.' },
  { key: 'pendek', t: 'Tulang pendek', d: '<b>Tulang pendek</b> berbentuk kecil, hampir seperti kubus, dan ukurannya pendek. <b>Fungsi:</b> memberi kekuatan sekaligus kelenturan gerak pada bagian yang banyak bergerak. <br><b>Contoh:</b> tulang pergelangan tangan (karpal) dan tulang pergelangan kaki (tarsal).' },
  { key: 'tidak', t: 'Tulang tidak beraturan', d: '<b>Tulang tidak beraturan</b> memiliki bentuk yang rumit dan tidak termasuk jenis lain. <b>Fungsi:</b> melindungi saraf dan menjadi tempat melekatnya otot. <br><b>Contoh:</b> ruas-ruas tulang belakang (melindungi sumsum tulang belakang), tulang wajah, dan tulang rahang.' },
  { key: 'sesamoid', t: 'Tulang sesamoid', d: '<b>Tulang sesamoid</b> berbentuk kecil dan bulat seperti biji wijen, tumbuh di dalam <b>tendon</b> (urat otot). <b>Fungsi:</b> melindungi tendon dari gesekan dan membantu otot bekerja lebih kuat. <br><b>Contoh:</b> tempurung lutut (patela).' }
], k => { boneFocus = k; });

let muscleFocus = 'rangka';
makeTabs('#ototTabs', '#ototPanel', [
  { key: 'rangka', t: 'Otot rangka', d: '<b>Otot rangka (otot lurik)</b> melekat pada tulang. Selnya berbentuk silinder panjang, tampak bergaris gelap-terang, dan memiliki banyak inti di tepi sel. Bekerja secara <b>sadar</b> (sesuai kehendak), cepat, tetapi mudah lelah. <br><b>Contoh:</b> otot lengan (biseps, triseps), otot paha, otot wajah saat tersenyum.' },
  { key: 'polos', t: 'Otot polos', d: '<b>Otot polos</b> menyusun dinding organ dalam. Selnya berbentuk gelendong (kedua ujung runcing), tidak bergaris, dan memiliki satu inti di tengah. Bekerja secara <b>tidak sadar</b>, lambat, dan tidak mudah lelah. <br><b>Contoh:</b> otot dinding lambung, usus, pembuluh darah, dan kandung kemih.' },
  { key: 'jantung', t: 'Otot jantung', d: '<b>Otot jantung</b> hanya terdapat di jantung. Selnya bercabang, bergaris seperti otot rangka, dengan satu atau dua inti di tengah, dan antarsel dihubungkan oleh <b>diskus interkalaris</b>. Bekerja secara <b>tidak sadar</b>, berirama, dan tidak pernah lelah. <br><b>Contoh:</b> jantung berdetak memompa darah sekitar 60–100 kali per menit.' },
  { key: 'semua', t: 'Bandingkan', d: 'Otot <b>rangka</b> dan <b>jantung</b> sama-sama lurik, tetapi hanya otot rangka yang bekerja sadar. Otot <b>polos</b> dan <b>jantung</b> sama-sama bekerja tidak sadar. Lihat tabel perbandingan di bawah.' }
], k => { muscleFocus = k; });

/* ---------------------------------------------------------
   3. LENGAN, FISURA (KAKI / LENGAN), ARTRITIS (kontrol tombol)
   --------------------------------------------------------- */
let armTarget = 0, armK = 0;
function setArm(bend) {
  armTarget = bend ? 1 : 0;
  $('#bend').classList.toggle('sel', bend);
  $('#straight').classList.toggle('sel', !bend);
  $('#armTxt').textContent = bend
    ? 'Lengan menekuk: biseps berkontraksi (memendek), triseps relaksasi.'
    : 'Lengan lurus: triseps berkontraksi, biseps relaksasi.';
}
$('#bend').addEventListener('click', () => setArm(true));
$('#straight').addEventListener('click', () => setArm(false));

let fisuraBone = localStorage.getItem('neuromotion-fisura-bone') === 'arm' ? 'arm' : 'leg';
let xray = false;
let fisuraSceneControl = null;

function updateFisuraUI() {
  $('#boneLegBtn').classList.toggle('sel', fisuraBone === 'leg');
  $('#boneArmBtn').classList.toggle('sel', fisuraBone === 'arm');
  $('#crackBtn').classList.toggle('sel', xray);
  $('#crackBtn').textContent = xray ? 'Mode normal' : 'Mode rontgen';
  $('#fisuraCap').textContent = fisuraBone === 'leg'
    ? 'Anatomi manusia tampak depan. Tulang paha kiri dan kanan disorot: normal, fisura (retak halus), dan fraktur (patah).'
    : 'Anatomi manusia tampak depan. Tulang lengan atas kiri dan kanan disorot: normal, fisura (retak halus), dan fraktur (patah).';
}
function setFisuraBone(type) {
  if (type !== 'leg' && type !== 'arm') return;
  fisuraBone = type;
  localStorage.setItem('neuromotion-fisura-bone', type);
  updateFisuraUI();
  if (fisuraSceneControl) fisuraSceneControl(type);
}
$('#boneLegBtn').addEventListener('click', () => setFisuraBone('leg'));
$('#boneArmBtn').addEventListener('click', () => setFisuraBone('arm'));
$('#crackBtn').addEventListener('click', () => {
  xray = !xray;
  updateFisuraUI();
});

updateFisuraUI();

/* ---------- Fisura: model manusia penuh, pilihan kaki/lengan tanpa reload ---------- */
viewer('fisura', { hw: 7.2, hh: 4.55, cy: -.05, auto: false, interactive: false, zoom: .9 }, async api => {
  const sk = await pack('skeleton');
  const boneNormal = mat('#eee6d5', { roughness: .62, side: THREE.DoubleSide });
  const boneX = glass('#75d9ff', .48); boneX.side = THREE.DoubleSide;
  const contextBone = glass('#8ec9e8', .22);
  const crackM = mat('#ff765e', { emissive: new THREE.Color('#ff4e3b'), emissiveIntensity: .8 });
  const viewRoots = { leg: new THREE.Group(), arm: new THREE.Group() };
  const targetMeshes = { leg: [], arm: [] };
  const positions = [-2.35, 0, 2.35];
  const states = ['normal', 'fisura', 'fraktur'];
  const labels = ['NORMAL', 'FISURA', 'FRAKTUR'];

  function isTarget(part, type) {
    return type === 'leg'
      ? /^(left|right) femur$/i.test(part.n)
      : /^(left|right) humerus$/i.test(part.n);
  }

  function makeHuman(type, x, state) {
    const figure = group(sk, part => isTarget(part, type) ? boneNormal : contextBone);
    figure.traverse(obj => {
      if (obj.isMesh && obj.userData.part && isTarget({ n: obj.userData.part }, type)) {
        targetMeshes[type].push(obj);
      }
    });

    sk.filter(part => isTarget(part, type)).forEach(part => {
      const bounds = partBox([part]);
      const center = boxC(bounds), size = boxS(bounds);
      const radius = Math.max(.075, Math.min(size.x, size.z) * .46);
      const mark = y => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, .025, 8, 32), crackM);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(center.x, y, center.z);
        figure.add(ring);
      };
      if (state === 'fisura') mark(center.y);
      if (state === 'fraktur') {
        mark(center.y - size.y * .035);
        mark(center.y + size.y * .035);
      }
    });

    const holder = new THREE.Group();
    place(holder, figure, partBox(sk), 2.45, 5.8);
    holder.position.x = x;
    viewRoots[type].add(holder);
  }

  api.g.add(viewRoots.leg, viewRoots.arm);
  for (const type of ['leg', 'arm']) {
    states.forEach((state, i) => makeHuman(type, positions[i], state));
  }
  positions.forEach((x, i) => api.label(labels[i], x, -3.08));

  fisuraSceneControl = type => {
    viewRoots.leg.visible = type === 'leg';
    viewRoots.arm.visible = type === 'arm';
  };
  fisuraSceneControl(fisuraBone);

  api.tick = t => {
    ['leg', 'arm'].forEach(type => {
      targetMeshes[type].forEach(obj => { obj.material = xray ? boneX : boneNormal; });
    });
    crackM.emissiveIntensity = (xray ? 1.2 : .65) + .18 * Math.sin(t * 3.2);
  };
});

/* ---------- Artritis (radang sendi lutut) ---------- */
const BUILD_artritis = async api => {
  const sk = await pack('skeleton');
  const B = n => one(sk, n);
  const fem = B('right femur'), tib = B('right tibia'), fib = B('right fibula'), pat = B('right patella');
  const fullBodyMat = glass(COL.bone, .13);
  place(api.g, group(sk, fullBodyMat), partBox(sk), 2.35, 5.25);
  const fmin = fem.min[1], tmax = tib.max[1], R = 1.45;
  const boneM = mat('#e9e2cf', { roughness: .7, side: THREE.DoubleSide });
  const cartGood = mat(COL.cart, { roughness: .3, transparent: true, opacity: .8 });
  const cartBad = mat(COL.cart, { roughness: .85, transparent: true, opacity: .45 });
  const spurM = mat('#d8c9a3', { roughness: .9 });
  const inflame = mat('--muscle', { transparent: true, opacity: .2, depthWrite: false, emissive: new THREE.Color(cssVar('--muscle')), emissiveIntensity: .5 });
  const femG = subGeo(geo(fem), p => p.y < fmin + R);
  const tibG = subGeo(geo(tib), p => p.y > tmax - R);
  const fibG = subGeo(geo(fib), p => p.y > tmax - R);
  const P = sliceCenter(fem, 0, .035); P.y = fmin + .22;
  const tc = sliceCenter(tib, .965, 1);
  api.rot = [];
  const knees = [];

  function knee(x, sick) {
    const k = new THREE.Group(); k.position.x = x; k.rotation.y = .35;
    const obj = new THREE.Group();
    const th = sick ? .009 : .035;
    obj.add(mesh(femG, boneM), mesh(geo(pat), boneM));
    obj.add(mesh(subGeo(inflate(geo(fem), th), p => p.y < fmin + .3), sick ? cartBad : cartGood));
    const pivot = new THREE.Group(); pivot.position.copy(P); obj.add(pivot);
    const low = new THREE.Group(); low.position.copy(P).negate(); pivot.add(low);
    low.add(mesh(tibG, boneM), mesh(fibG, boneM));
    low.add(mesh(subGeo(inflate(geo(tib), th), (p, n) => p.y > tmax - .08 && n.y > .45), sick ? cartBad : cartGood));
    let swell = null, spur = null;
    if (sick) {
      const spurAt = (geoB, ctr, y, parent, i) => {
        const a = i / 9 * Math.PI * 2, dir = new THREE.Vector3(Math.cos(a), -.15, Math.sin(a)).normalize();
        const hit = surfaceHit(geoB, new THREE.Vector3(ctr.x, y, ctr.z), new THREE.Vector3(dir.x, 0, dir.z));
        if (!hit) return null;
        const c = mesh(new THREE.ConeGeometry(.035, .12, 8).translate(0, .05, 0), spurM);
        c.position.copy(hit); c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        parent.add(c);
        return hit;
      };
      for (let i = 0; i < 9; i++) { const h = spurAt(geo(tib), tc, tmax - .05, low, i); if (h && i === 0) spur = h; }
      for (let i = 0; i < 9; i += 2) spurAt(geo(fem), P, fmin + .14, obj, i + .5);
      for (let i = 0; i < 6; i++) {
        const from = P.clone().add(new THREE.Vector3(Math.cos(i * 1.3) * .25, 0, Math.sin(i * 1.3) * .2));
        const hit = hitsAlong(geo(fem), from, new THREE.Vector3(0, -1, 0))[0];
        if (hit) obj.add(mesh(new THREE.SphereGeometry(.03, 8, 6), mat('#8b2a1f'), hit.x, hit.y - .006, hit.z));
      }
      swell = mesh(new THREE.SphereGeometry(.62, 28, 20), inflame, P.x, P.y - .12, P.z);
      swell.scale.set(1, 1.25, 1);
      obj.add(swell);
    }
    const box = partBox([fem, tib]); box.min.y = tmax - R; box.max.y = fmin + R;
    const pl = place(k, obj, box, 2.6, 5.2);
    k.scale.setScalar(.43);
    k.position.y = -1.25;
    api.g.add(k); api.rot.push(k);
    knees.push({ k, pivot, sick, swell, phase: 0 });
    return { k, pl, spur };
  }

  const kn = knee(-.62, false);
  const ks = knee(.62, true);
  api.label('Lutut kiri: normal', -.85, -2.45);
  api.label('Lutut kanan: artritis', .95, -2.45);

  let last = 0;
  api.tick = t => {
    const dt = Math.min(.05, t - last); last = t;
    knees.forEach(n => {
      if (kneeMoving && !reduceMotion) n.phase += dt;
      const wave = .5 - .5 * Math.cos(n.phase * 1.4);
      n.pivot.rotation.x = n.sick ? .32 * wave + .02 * Math.sin(n.phase * 23) * wave : 1.25 * wave;
      if (n.swell) {
        const p = 1 + .05 * Math.sin(t * 3);
        n.swell.scale.set(p, 1.25 * p, p);
        inflame.emissiveIntensity = .4 + .3 * Math.sin(t * 3);
      }
    });
  };
};
viewer('artritis', { hw: 4.5, hh: 4.8, cy: -.1, auto: false }, BUILD_artritis);
/* Kartu osteoartritis: model lutut 3D mandiri yang juga bisa diputar. */
viewer('oaCard', { hw: 3.4, hh: 4.5, cy: -.1, auto: false }, BUILD_artritis);

/* ---------- Model sel otot (skematis, mikroskopis) ---------- */
function focusMats(groups) {
  Object.values(groups).flat().forEach(m => {
    m.userData.op = m.opacity;
    m.userData.dw = m.depthWrite;
    m.transparent = true;
    m.emissive.copy(m.color);
    m.emissiveIntensity = 0;
  });
  return (key, t) => {
    for (const k in groups) {
      const on = key === 'semua' || key === k;
      const glow = on && key !== 'semua' ? .22 + .12 * Math.sin(t * 4) : 0;
      groups[k].forEach(m => {
        m.opacity += ((on ? 1 : .14) * m.userData.op - m.opacity) * .12;
        m.depthWrite = m.userData.dw && m.opacity > .6;
        m.emissiveIntensity += (glow - m.emissiveIntensity) * .12;
      });
    }
  };
}
function stripeTex(repeat) {
  const c = document.createElement('canvas'); c.width = 32; c.height = 4;
  const x = c.getContext('2d');
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, 32, 4);
  x.fillStyle = '#7a7a7a'; x.fillRect(0, 0, 11, 4);
  const tx = new THREE.CanvasTexture(c);
  tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
  tx.repeat.set(repeat, 1);
  return tx;
}
const alongX = (o, dir) => o.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir.clone().normalize());

/* ---------- Jenis otot (bentuk sel) ---------- */
viewer('muscles', { hw: 7.2, hh: 2.0, cy: -.3 }, api => {
  const cyto = repeat => mat('--muscle', { map: repeat ? stripeTex(repeat) : null, transparent: true, opacity: .62, depthWrite: false, roughness: .6 });
  const nuc = () => mat('#6c5ce7', { roughness: .4 });
  const M = { rangka: [], polos: [], jantung: [] };
  api.rot = [];
  const H = {};
  [['rangka', 'Otot rangka'], ['polos', 'Otot polos'], ['jantung', 'Otot jantung']].forEach(([k, n], i) => {
    const x = (i - 1) * 4.9;
    const h = new THREE.Group(); h.position.x = x; h.rotation.y = -.35;
    api.g.add(h); api.rot.push(h); H[k] = h;
    api.label(n, x, -1.55);
  });

  const nR = nuc(); M.rangka.push(nR);
  [.6, 0, -.6].forEach((y, f) => {
    const c = cyto(22); M.rangka.push(c);
    H.rangka.add(tube([[-1.7, y, 0], [0, y, 0], [1.7, y, 0]], .27, c, 32));
    [-1.15, -.4, .35, 1.1].forEach((x, j) => {
      const a = 1 + f * 1.7 + j * 2.1;
      const n = mesh(new THREE.SphereGeometry(.07, 10, 8), nR, x + f * .2, y + Math.cos(a) * .24, Math.sin(a) * .24);
      n.scale.set(2.4, .8, .8); H.rangka.add(n);
    });
  });

  const nP = nuc(); M.polos.push(nP);
  const prof = [];
  for (let i = 0; i <= 24; i++) { const t = i / 24; prof.push(new THREE.Vector2(.34 * Math.pow(Math.sin(Math.PI * t), 1.3) + .004, (t - .5) * 2.8)); }
  const spindle = new THREE.LatheGeometry(prof, 24).rotateZ(Math.PI / 2);
  [[-.45, .58], [.5, 0], [-.3, -.58]].forEach(([x, y]) => {
    const c = cyto(0); M.polos.push(c);
    H.polos.add(mesh(spindle, c, x, y, 0));
    const n = mesh(new THREE.SphereGeometry(.09, 12, 10), nP, x, y, 0); n.scale.set(2.6, 1, 1); H.polos.add(n);
  });

  const nJ = nuc(), discM = mat('#5a1d16'); M.jantung.push(nJ, discM);
  const fibers = [
    { p: [[-1.7, .6], [-.3, .55], [1.7, .66]], disc: [.32, .72], nuc: [.14, .52, .88] },
    { p: [[-1.7, -.6], [.3, -.55], [1.7, -.62]], disc: [.28, .7], nuc: [.12, .5, .87] },
    { p: [[-.55, .55], [0, 0], [.55, -.55]], disc: [], nuc: [.5] }
  ];
  let discPos = null;
  fibers.forEach(f => {
    const curve = new THREE.CatmullRomCurve3(f.p.map(v3));
    const c = cyto(Math.round(curve.getLength() * 7)); M.jantung.push(c);
    H.jantung.add(tube(f.p, .24, c, 32));
    f.disc.forEach(u => {
      const d = mesh(new THREE.CylinderGeometry(.255, .255, .05, 20).rotateZ(Math.PI / 2), discM);
      d.position.copy(curve.getPointAt(u)); alongX(d, curve.getTangentAt(u)); H.jantung.add(d);
      if (!discPos) discPos = d.position.clone();
    });
    f.nuc.forEach(u => {
      const n = mesh(new THREE.SphereGeometry(.085, 12, 10), nJ);
      n.position.copy(curve.getPointAt(u)); alongX(n, curve.getTangentAt(u)); n.scale.set(2, 1, 1); H.jantung.add(n);
    });
  });

  api.label('Inti di tepi', 0, 1.1, 0, H.rangka);
  api.label('Inti di tengah', .5, .4, 0, H.polos);
  api.label('Diskus interkalaris', discPos.x, discPos.y + .5, 0, H.jantung);

  const focus = focusMats(M);
  api.tick = t => focus(muscleFocus, t);
});

requestAnimationFrame(loop);

/* ---------- Fallback gambar ----------
   Jika sebuah <img> gagal dimuat (file tidak ada di folder images/,
   salah nama, atau link eksternal mati), tampilkan placeholder yang
   menyebut nama file yang kurang. Berlaku juga untuk gambar yang
   diganti lewat JS (mis. #alurImg di setMode). */
document.addEventListener('error', function (e) {
  const img = e.target;
  if (!(img instanceof HTMLImageElement)) return;
  if (img.src.startsWith('data:image/svg+xml')) return; // placeholder sendiri, jangan diulang
  let nama = 'gambar';
  try { nama = decodeURIComponent((new URL(img.src, location.href)).pathname.split('/').pop()) || nama; } catch (_) {}
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 530">' +
    '<rect width="1000" height="530" fill="#eef3f7"/>' +
    '<rect x="20" y="20" width="960" height="490" rx="24" fill="none" stroke="#9fb4c6" stroke-width="4" stroke-dasharray="14 10"/>' +
    '<text x="500" y="250" text-anchor="middle" font-family="sans-serif" font-size="44" font-weight="700" fill="#24405a">Gambar belum tersedia</text>' +
    '<text x="500" y="310" text-anchor="middle" font-family="monospace" font-size="32" fill="#5b7387">' + esc(nama.slice(0, 40)) + '</text>' +
    '</svg>';
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}, true);

/* =========================================================
   GAMBAR ORGAN 3D DIAM (tidak bisa diputar)
   Model anatomi asli (models/*.bin) dirender SATU KALI di latar
   belakang menjadi gambar biasa untuk kartu-kartu. Mesin 3D-nya
   langsung dimatikan lagi, jadi ringan. Jika gagal (offline / model
   tidak ada) gambar ilustrasi bawaan di HTML tetap tampil.
   ========================================================= */
const BUILD_ra = async api => {            /* tangan: sendi jari meradang */
  const sk = await pack('skeleton');
  const bn = mat(COL.bone, { roughness: .65 });
  const hand = pick(sk, /^right (scaphoid|lunate|triquetral|pisiform|trapezium|trapezoid|capitate|hamate)$|^right .*metacarpal bone$|phalanx of right (thumb|index finger|middle finger|ring finger|little finger)$/);
  if (hand.length < 10) throw new Error('tulang tangan tidak ditemukan');
  const obj = new THREE.Group();
  obj.add(group(hand, bn));
  const swollen = mat('#e0402e', { roughness: .5, transparent: true, opacity: .62, emissive: new THREE.Color('#ff3b24'), emissiveIntensity: .35 });
  const halo = mat('#ff5a45', { transparent: true, opacity: .16, depthWrite: false, emissive: new THREE.Color('#ff5a45'), emissiveIntensity: .5 });
  const joint = (p, r) => {
    const b = partBox([p]), c = boxC(b);
    obj.add(mesh(new THREE.SphereGeometry(r, 20, 14), swollen, c.x, b.min.y + .04, c.z));
    obj.add(mesh(new THREE.SphereGeometry(r * 1.55, 20, 14), halo, c.x, b.min.y + .04, c.z));
  };
  pick(sk, /^right .*metacarpal bone$/).forEach(p => joint(p, .15));
  pick(sk, /^proximal phalanx of right (index|middle|ring|little) finger$/).forEach(p => joint(p, .125));
  const holder = new THREE.Group(); holder.rotation.z = Math.PI / 2; holder.add(obj);
  holder.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(holder), c = boxC(box), s = boxS(box);
  holder.position.set(-c.x, -c.y, -c.z);
  api.g.add(holder);
  api.frame(s.x / 2 * 1.12, s.y / 2 * 1.5, 0);
  api.g.rotation.x = .25; api.g.rotation.y = -.35;
};

const BUILD_gout = async api => {          /* kaki: sendi jempol + kristal asam urat */
  const sk = await pack('skeleton');
  const bn = mat(COL.bone, { roughness: .65 });
  const foot = pick(sk, /^right .*(talus|calcaneus|navicular|cuboid|cuneiform|metatarsal)|phalanx of right .*toe$/);
  if (foot.length < 8) throw new Error('tulang kaki tidak ditemukan');
  const obj = new THREE.Group();
  obj.add(group(foot, bn));
  const m1 = one(sk, 'right first metatarsal bone') || pick(sk, /^right .*metatarsal/)[0];
  const b1 = partBox([m1]), c1 = boxC(b1);
  const J = new THREE.Vector3(c1.x, c1.y, b1.max.z - .06);
  const swollen = mat('#e0402e', { roughness: .5, transparent: true, opacity: .6, emissive: new THREE.Color('#ff3b24'), emissiveIntensity: .35 });
  const halo = mat('#ff5a45', { transparent: true, opacity: .16, depthWrite: false, emissive: new THREE.Color('#ff5a45'), emissiveIntensity: .5 });
  obj.add(mesh(new THREE.SphereGeometry(.2, 24, 16), swollen, J.x, J.y, J.z));
  obj.add(mesh(new THREE.SphereGeometry(.32, 24, 16), halo, J.x, J.y, J.z));
  const needle = mat('#fff3c4', { roughness: .3, emissive: new THREE.Color('#ffd54a'), emissiveIntensity: .55 });
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 26; i++) {
    const n = mesh(new THREE.CylinderGeometry(.004, .012, .13 + rnd() * .08, 5), needle);
    const a = rnd() * Math.PI * 2, r = .1 + rnd() * .16;
    n.position.set(J.x + Math.cos(a) * r * .8, J.y + (rnd() - .5) * .3, J.z + Math.sin(a) * r);
    n.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3);
    obj.add(n);
  }
  const holder = new THREE.Group(); holder.rotation.y = -Math.PI / 2; holder.add(obj);
  holder.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(holder), c = boxC(box), s = boxS(box);
  holder.position.set(-c.x, -c.y, -c.z);
  api.g.add(holder);
  api.frame(s.x / 2 * 1.12, s.y / 2 * 1.7, 0);
  api.g.rotation.x = .3;
};

/* potong tampilan tubuh utuh: f = bagian tinggi yang ditampilkan, mid = pusat (× setengah tinggi) */
const cropBody = (f, mid) => (api, opt) => { const H = opt.hh; opt.hh = H * f; opt.cy = H * mid; };

async function stillShot(build, opt0, pose, W = 660, H = 310) {
  const opt = Object.assign({}, opt0);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(W, H, false);
  try {
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(38, W / H, .1, 400), g = new THREE.Group();
    scene.add(g);
    scene.add(new THREE.HemisphereLight(0xfff6ec, 0x1a2633, .85));
    const key = new THREE.DirectionalLight(0xffffff, .9); key.position.set(4, 7, 9); scene.add(key);
    const rim = new THREE.DirectionalLight(0x9fdcff, .5); rim.position.set(-6, 2, -6); scene.add(rim);
    const api = {
      g, rot: [g], labels: [], tick: null, renderer,
      label: () => ({ show: false, v: new THREE.Vector3(), d: document.createElement('div') }),
      frame(hw, hh, cy) { opt.hw = hw; opt.hh = hh; if (cy !== undefined) opt.cy = cy; }
    };
    await build(api);
    if (pose) pose(api, opt);
    const tanHalf = Math.tan(19 * Math.PI / 180), cy = opt.cy || 0;
    const z = Math.max(opt.hh / tanHalf, opt.hw / (tanHalf * cam.aspect)) * 1.08;
    cam.position.set(0, cy, z); cam.lookAt(0, cy, 0); cam.updateProjectionMatrix();
    for (let i = 0; i < 120; i++) if (api.tick) api.tick(i / 30);
    scene.updateMatrixWorld(true);
    renderer.render(scene, cam);
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const cx = cv.getContext('2d');
    const bg = cx.createRadialGradient(W * .5, H * .4, 10, W * .5, H * .5, W * .6);
    bg.addColorStop(0, '#24496b'); bg.addColorStop(1, '#0c1825');
    cx.fillStyle = bg; cx.fillRect(0, 0, W, H);
    cx.drawImage(renderer.domElement, 0, 0);
    return cv.toDataURL('image/jpeg', .9);
  } finally {
    renderer.dispose();
    if (renderer.forceContextLoss) renderer.forceContextLoss();
  }
}

/* Beranda: tubuh manusia utuh dengan rangka normal sebagai fokus. */
const BUILD_normalHuman = async api => {
  const h = await buildHuman(api, 'hero');
  h.L.kulit.visible = false;
  h.L.organ.visible = false;
  h.L.saraf.visible = false;
  h.L.kerangka.visible = true;
};

const STILL_JOBS = [
  { id: 'saraf',  build: BUILD_body,     opt: { hw: 3.4, hh: 8.4 }, pose: cropBody(.34, .66), set: () => { bodyFocus = 'otak'; } },
  // Kartu Beranda sistem gerak memakai foto sumber; kartu kelainan memakai rangka manusia 3D normal.
  { id: 'refleks', build: BUILD_body,    opt: { hw: 3.4, hh: 8.4 }, pose: cropBody(.42, .08), set: () => { bodyFocus = 'tepi'; } },
  { id: 'tulangBeranda', build: BUILD_normalHuman, opt: { hw: 3.4, hh: 8.4 } },
  { id: 'ra',     build: BUILD_ra,       opt: { hw: 3, hh: 2 } },
  { id: 'gout',   build: BUILD_gout,     opt: { hw: 3, hh: 2 } }
];

async function runStills() {
  if (typeof THREE === 'undefined') return;
  for (const job of STILL_JOBS) {
    const img = document.querySelector('img[data-still="' + job.id + '"]');
    if (!img) continue;
    const keep = { bodyFocus, armK, armTarget };
    try {
      if (job.set) job.set();
      const url = await stillShot(job.build, job.opt, job.pose);
      img.src = url; img.classList.add('shot');
    } catch (e) {
      console.warn('Gambar 3D "' + job.id + '" memakai ilustrasi cadangan:', e);
    } finally {
      bodyFocus = keep.bodyFocus; armK = keep.armK; armTarget = keep.armTarget;
    }
    await new Promise(r => setTimeout(r, 80));
  }
}
(function () {
  const go = () => setTimeout(async () => { await runStills(); await runAlurStills(); }, 700);
  if (document.readyState === 'complete') go(); else addEventListener('load', go);
})();

/* =========================================================
   DIAGRAM ALUR 3D (diam): adegan disusun dari model organ asli
   (otak + tengkorak, bola mata, otot biseps, tulang tangan) lalu
   dirender sekali menjadi gambar 1000×530 yang pas dengan panah
   di Simulasi Alur. Jika gagal, ilustrasi bawaan tetap dipakai.
   ========================================================= */
async function alurShot(mode) {
  const W = 1500, H = 795, K = 1.5;
  const [br, sk, mu, or] = await Promise.all([pack('brain'), pack('skeleton'), pack('muscles'), pack('organs')]);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(W, H, false);
  try {
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(0, 1000, 530, 0, -1000, 1000);
    cam.position.set(0, 0, 500);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8fa3b5, .95));
    const key = new THREE.DirectionalLight(0xffffff, .95); key.position.set(-300, 500, 700); scene.add(key);
    const fill = new THREE.DirectionalLight(0xbfd8ff, .35); fill.position.set(400, -100, 300); scene.add(fill);

    const Y = y => 530 - y;
    const at = (x, y, z = 0) => { const h = new THREE.Group(); h.position.set(x, Y(y), z); scene.add(h); return h; };
    const nerveM = mat('#f5b82e', { roughness: .35, emissive: new THREE.Color('#c98a00'), emissiveIntensity: .3 });
    const nerve = (pts, r = 6) => scene.add(tube(pts.map(p => [p[0], Y(p[1]), 12]), r, nerveM, 90));
    const cordM = mat('#fbd96a', { roughness: .45, emissive: new THREE.Color('#b9871a'), emissiveIntensity: .12 });
    const cord = (x1, y1, x2, y2, r) => {
      scene.add(tube([[x1, Y(y1), 6], [x2, Y(y2), 6]], r, cordM, 8));
      [[x1, y1], [x2, y2]].forEach(p => scene.add(mesh(new THREE.SphereGeometry(r, 20, 14), cordM, p[0], Y(p[1]), 6)));
    };
    const bookMats = (cover, pages) => [pages, cover, pages, cover, cover, cover].map(c => mat(c, { roughness: .55 }));
    const book = (x, y, w, h, d, ry, rx) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bookMats('#3b82c4', '#f3f6f9'));
      const g = at(x, y, 20); g.rotation.set(rx, ry, 0); g.add(b);
    };
    const handRe = /^right (scaphoid|lunate|triquetral|pisiform|trapezium|trapezoid|capitate|hamate)$|^right .*metacarpal bone$|phalanx of right (thumb|index finger|middle finger|ring finger|little finger)$/;
    const hand = (x, y, hh, rz) => {
      const list = pick(sk, handRe);
      if (list.length < 10) throw new Error('tulang tangan tidak ditemukan');
      const obj = group(list, mat('#efe6d0', { roughness: .55 }));
      const holder = at(x, y, 30); holder.rotation.z = rz;
      place(holder, obj, partBox(list), 90, hh);
    };
    const muscle = (x, y, len) => {
      const list = pick(mu, /of right biceps brachii$/);
      if (!list.length) throw new Error('otot biseps tidak ditemukan');
      const holder = at(x, y, 10); holder.rotation.z = Math.PI / 2;
      place(holder, group(list, mat('#b23a2f', { roughness: .45 })), partBox(list), 999, len);
    };
    const eye = (x, y, size) => {
      const holder = at(x, y, 30);
      const eb = pick(or, /left eyeball/)[0] || pick(or, /eyeball/)[0];
      const obj = new THREE.Group();
      let box, front;
      if (eb) {
        obj.add(group([eb], mat('#f6f3ec', { roughness: .28 })));
        box = partBox([eb]); front = box.max.z; const c = boxC(box);
        const r = (box.max.x - box.min.x) * .27;
        obj.add(mesh(new THREE.CircleGeometry(r, 40), mat('#2a9d95', { roughness: .3 }), c.x, c.y, front + .002));
        obj.add(mesh(new THREE.CircleGeometry(r * .45, 32), mat('#0b1622'), c.x, c.y, front + .003));
      } else {
        obj.add(mesh(new THREE.SphereGeometry(.12, 40, 28), mat('#f6f3ec', { roughness: .28 })));
        box = new THREE.Box3(new THREE.Vector3(-.12, -.12, -.12), new THREE.Vector3(.12, .12, .12));
        obj.add(mesh(new THREE.CircleGeometry(.034, 40), mat('#2a9d95'), 0, 0, .1195));
        obj.add(mesh(new THREE.CircleGeometry(.016, 32), mat('#0b1622'), 0, 0, .1205));
      }
      place(holder, obj, box, size, size);
      holder.rotation.y = -.5; holder.rotation.x = .12;
    };
    /* kepala: otak asli di dalam tengkorak kaca; kembalikan titik pangkal batang otak (piksel diagram) */
    const head = (x, y, w, opacity, withSkull) => {
      const kecil = pick(br, /^cerebellum$/), batang = pick(br, RE.brainStem);
      const besar = br.filter(p => !kecil.includes(p) && !batang.includes(p));
      const op = opacity < 1 ? { transparent: true, opacity, depthWrite: false } : {};
      const all = new THREE.Group();
      all.add(group(besar, mat(COL.brain, Object.assign({ roughness: .55 }, op))),
              group(kecil, mat('#d99f94', Object.assign({ roughness: .55 }, op))),
              group(batang, mat('#e6cbb7', Object.assign({ roughness: .55 }, op))));
      const cran = withSkull ? pick(sk, RE.cranium) : [];
      if (cran.length) all.add(group(cran, glass('#eee6d3', .2)));
      const box = partBox(cran.length ? cran.concat(br) : br);
      const holder = at(x, y, 20); holder.rotation.y = -Math.PI / 2;
      const pl = place(holder, all, box, w, w);
      const bb = partBox(batang);
      return { x: x - (boxC(bb).z - pl.c.z) * pl.k, y: y + (pl.c.y - bb.min.y) * pl.k };
    };

    const shadows = [];
    if (mode === 'sadar') {
      book(115, 452, 90, 62, 34, -.45, .28);
      eye(115, 205, 92);
      const hd = head(430, 168, 250, 1, true);
      nerve([[175, 205], [205, 186], [228, 222], [252, 196], [292, 206], [335, 178], [372, 172]]);
      cord(hd.x, hd.y - 10, hd.x, 380, 12);
      nerve([[hd.x, 380], [hd.x + 14, 398], [480, 372], [520, 348], [560, 346], [610, 356], [662, 342]]);
      muscle(755, 350, 230);
      book(875, 178, 80, 55, 30, -.4, .25);
      hand(875, 292, 120, Math.PI);
      shadows.push([125, 488, 70, 9], [430, 318, 90, 9], [755, 400, 105, 8], [875, 352, 60, 7]);
    } else {
      /* otak digambar samar: tidak ikut bekerja */
      head(640, 70, 160, .32, false);
      cord(640, 126, 640, 420, 28);
      const disc = new THREE.Group(); disc.position.set(640, Y(270), 44); scene.add(disc);
      disc.add(mesh(new THREE.CircleGeometry(40, 48), mat('#ffffff', { roughness: .8 })));
      const wing = mat('#aab9c6', { roughness: .8 });
      [[-17, 12, .5], [17, 12, -.5], [-15, -14, -.4], [15, -14, .4]].forEach(w => {
        const sh = new THREE.Shape(); sh.absellipse(0, 0, 13, 22, 0, Math.PI * 2, false, 0);
        const m = new THREE.Mesh(new THREE.ShapeGeometry(sh, 24), wing); m.position.set(w[0], w[1], .5); m.rotation.z = w[2]; disc.add(m);
      });
      disc.add(mesh(new THREE.CircleGeometry(5, 20), mat('#ffffff'), 0, 0, 1));
      /* panci panas */
      const pot = at(100, 224, 20); pot.rotation.x = .5;
      const metal = mat('#555b64', { metalness: .55, roughness: .38 });
      pot.add(mesh(new THREE.CylinderGeometry(40, 36, 46, 48), metal));
      const hot = mesh(new THREE.CircleGeometry(33, 48), mat('#ff7a3d', { emissive: new THREE.Color('#ff4d00'), emissiveIntensity: .8 }), 0, 23.4, 0); hot.rotation.x = -Math.PI / 2; pot.add(hot);
      const rim = mesh(new THREE.TorusGeometry(37, 3.5, 12, 48), metal, 0, 23, 0); rim.rotation.x = Math.PI / 2; pot.add(rim);
      [-1, 1].forEach(s => pot.add(mesh(new THREE.BoxGeometry(24, 7, 9), metal, s * 50, 10, 0)));
      /* jari */
      const skin = mat('#f1c9a5', { roughness: .6 });
      const fin = at(250, 222, 20);
      fin.add(mesh(new THREE.CylinderGeometry(14, 14, 50, 24), skin), mesh(new THREE.SphereGeometry(14, 24, 16), skin, 0, -25, 0), mesh(new THREE.SphereGeometry(14, 24, 16), skin, 0, 25, 0));
      [[0, 30], [-7, 14], [8, 10]].forEach(d => fin.add(mesh(new THREE.SphereGeometry(4, 12, 10), mat('#ff7a3d', { emissive: new THREE.Color('#ff5a1f'), emissiveIntensity: .6 }), d[0], d[1], 12)));
      nerve([[270, 222], [310, 205], [350, 222], [395, 240], [440, 222], [490, 212], [540, 208], [606, 226]]);
      nerve([[606, 410], [570, 432], [520, 418], [480, 395], [440, 412], [390, 425], [340, 430], [296, 412]]);
      muscle(250, 415, 125);
      hand(100, 428, 96, Math.PI + .25);
      shadows.push([100, 252, 52, 7], [250, 460, 60, 6], [100, 480, 48, 6], [640, 448, 62, 8]);
    }
    scene.updateMatrixWorld(true);
    renderer.render(scene, cam);

    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const c = cv.getContext('2d');
    const bg = c.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#ffffff'); bg.addColorStop(1, '#e6eef5');
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    shadows.forEach(([sx, sy, rx, ry]) => {
      c.save(); c.translate(sx * K, sy * K); c.scale(1, ry / rx);
      const g = c.createRadialGradient(0, 0, 0, 0, 0, rx * K);
      g.addColorStop(0, 'rgba(11,22,34,.32)'); g.addColorStop(1, 'rgba(11,22,34,0)');
      c.fillStyle = g; c.beginPath(); c.arc(0, 0, rx * K, 0, Math.PI * 2); c.fill(); c.restore();
    });
    c.drawImage(renderer.domElement, 0, 0);
    const txt = (t, x, y, size = 21, col = '#24405a', align = 'center', wt = 700) => {
      c.font = wt + ' ' + size * K + 'px Arial, sans-serif'; c.textAlign = align;
      c.lineJoin = 'round'; c.lineWidth = 6 * K; c.strokeStyle = '#ffffff'; c.strokeText(t, x * K, y * K);
      c.fillStyle = col; c.fillText(t, x * K, y * K);
    };
    if (mode === 'sadar') {
      [['Buku', 115, 516], ['Mata', 115, 136], ['Saraf sensorik', 250, 262], ['Otak', 415, 62],
       ['Saraf motorik', 560, 398], ['Otot lengan', 750, 430], ['Mengambil buku', 875, 124]].forEach(l => txt(l[0], l[1], l[2]));
    } else {
      txt('Otak', 780, 60, 20, '#7a8a99', 'left'); txt('tidak ikut bekerja', 780, 84, 17, '#7a8a99', 'left', 400);
      [['Sumsum', 262], ['tulang', 288], ['belakang', 314]].forEach(l => txt(l[0], 705, l[1], 21, '#24405a', 'left'));
      [['Panci panas', 100, 298], ['Kulit jari', 250, 298], ['Saraf sensorik', 430, 298], ['Saraf motorik', 430, 490],
       ['Otot lengan', 250, 490], ['Tangan ditarik', 100, 490]].forEach(l => txt(l[0], l[1], l[2]));
    }
    return cv.toDataURL('image/jpeg', .92);
  } finally {
    renderer.dispose();
    if (renderer.forceContextLoss) renderer.forceContextLoss();
  }
}

async function runAlurStills() {
  if (typeof THREE === 'undefined') return;
  for (const mode of ['sadar', 'refleks']) {
    try {
      const url = await alurShot(mode);
      SIM[mode].img = url;
      if (sim.mode === mode) $('#alurImg').src = url;
    } catch (e) {
      console.warn('Diagram alur 3D "' + mode + '" memakai ilustrasi cadangan:', e);
    }
    await new Promise(r => setTimeout(r, 80));
  }
}
