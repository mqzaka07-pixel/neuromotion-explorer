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

let fisuraBone = 'leg';
let xray = false;
function setFisuraBone(type) {
  fisuraBone = type;
  $('#boneLegBtn').classList.toggle('sel', type === 'leg');
  $('#boneArmBtn').classList.toggle('sel', type === 'arm');
  $('#fisuraCap').textContent = type === 'leg'
    ? 'Versi Tulang Kaki (Paha) — Dari kiri: tulang normal, fisura (retak, masih menyatu), fraktur (patah, terpisah). Garis merah menyala = retakan.'
    : 'Versi Tulang Lengan (Atas) — Dari kiri: tulang normal, fisura (retak, masih menyatu), fraktur (patah, terpisah). Garis merah menyala = retakan.';
}
$('#boneLegBtn').addEventListener('click', () => setFisuraBone('leg'));
$('#boneArmBtn').addEventListener('click', () => setFisuraBone('arm'));

$('#crackBtn').addEventListener('click', e => {
  xray = !xray;
  e.currentTarget.classList.toggle('sel', xray);
  e.currentTarget.textContent = xray ? 'Mode normal' : 'Mode rontgen';
});

let kneeMoving = true;
$('#kneeBtn').addEventListener('click', e => {
  kneeMoving = !kneeMoving;
  e.currentTarget.classList.toggle('sel', kneeMoving);
  e.currentTarget.textContent = kneeMoving ? 'Jeda gerak lutut' : 'Gerakkan lutut';
});

/* ---------------------------------------------------------
   4. SIMULASI ALUR GERAK SADAR / REFLEKS (Gambar + Panah ->)
   --------------------------------------------------------- */
const sim = { mode: 'sadar', start: 0, running: false, step: -1, timer: null };
const SIM = {
  sadar: {
    img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDUzMCIgd2lkdGg9IjEwMDAiIGhlaWdodD0iNTMwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IkRpYWdyYW0gYWx1ciBnZXJhayBzYWRhcjogbWVuZ2FtYmlsIGJ1a3UiPgo8ZGVmcz48ZmlsdGVyIGlkPSJibCIgeD0iLTQwJSIgeT0iLTIwMCUiIHdpZHRoPSIxODAlIiBoZWlnaHQ9IjUwMCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjUiLz48L2ZpbHRlcj48ZmlsdGVyIGlkPSJibDIiIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjkiLz48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9ImcxIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNTg5NGNjIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMmM2MTkzIi8+PC9saW5lYXJHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImcyIiBjeD0iMC4zNSIgY3k9IjAuMyIgcj0iMC44Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmYWZiZmMiLz48c3RvcCBvZmZzZXQ9Ii40NSIgc3RvcC1jb2xvcj0iI2Y0ZjZmOCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzdhN2I3YyIvPjwvcmFkaWFsR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJnMyIgY3g9IjAuMzUiIGN5PSIwLjMiIHI9IjAuOCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYWJlN2UxIi8+PHN0b3Agb2Zmc2V0PSIuNDUiIHN0b3AtY29sb3I9IiMyZWM0YjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxNzYyNWIiLz48L3JhZGlhbEdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZzQiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIwIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmNmQ2YmEiLz48c3RvcCBvZmZzZXQ9Ii4zIiBzdG9wLWNvbG9yPSIjZmFlOWRhIi8+PHN0b3Agb2Zmc2V0PSIuNjIiIHN0b3AtY29sb3I9IiNmM2M5YTQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3OTY0NTIiLz48L2xpbmVhckdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iZzUiIGN4PSIwLjM1IiBjeT0iMC4zIiByPSIwLjgiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZhZGJlMyIvPjxzdG9wIG9mZnNldD0iLjQ1IiBzdG9wLWNvbG9yPSIjZjRhN2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjN2E1MzVjIi8+PC9yYWRpYWxHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Imc2IiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmNlMjhmIi8+PHN0b3Agb2Zmc2V0PSIuMyIgc3RvcC1jb2xvcj0iI2ZkZWZjMyIvPjxzdG9wIG9mZnNldD0iLjYyIiBzdG9wLWNvbG9yPSIjZmJkOTZhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjN2Q2YzM1Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Imc3IiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZWQ5YTkyIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOTEyZTI1Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Imc4IiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNTg5NGNjIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMmM2MTkzIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Imc5IiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjRkNmJiIi8+PHN0b3Agb2Zmc2V0PSIuMyIgc3RvcC1jb2xvcj0iI2Y5ZTlkYiIvPjxzdG9wIG9mZnNldD0iLjYyIiBzdG9wLWNvbG9yPSIjZjFjOWE1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzg2NDUyIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImcxMCIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y0ZDZiYiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiNmOWU5ZGIiLz48c3RvcCBvZmZzZXQ9Ii42MiIgc3RvcC1jb2xvcj0iI2YxYzlhNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzc4NjQ1MiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnMTEiIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmNGQ2YmIiLz48c3RvcCBvZmZzZXQ9Ii4zIiBzdG9wLWNvbG9yPSIjZjllOWRiIi8+PHN0b3Agb2Zmc2V0PSIuNjIiIHN0b3AtY29sb3I9IiNmMWM5YTUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3ODY0NTIiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZzEyIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjRkNmJiIi8+PHN0b3Agb2Zmc2V0PSIuMyIgc3RvcC1jb2xvcj0iI2Y5ZTlkYiIvPjxzdG9wIG9mZnNldD0iLjYyIiBzdG9wLWNvbG9yPSIjZjFjOWE1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzg2NDUyIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImcxMyIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y0ZDZiYiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiNmOWU5ZGIiLz48c3RvcCBvZmZzZXQ9Ii42MiIgc3RvcC1jb2xvcj0iI2YxYzlhNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzc4NjQ1MiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MzAiIGZpbGw9IiNmZmZmZmYiLz4KPGVsbGlwc2UgY3g9IjEyNSIgY3k9IjQ4OCIgcng9IjcwIiByeT0iOCIgZmlsbD0iIzBiMTYyMiIgb3BhY2l0eT0iMC4zIiBmaWx0ZXI9InVybCgjYmwpIi8+Cjxwb2x5Z29uIHBvaW50cz0iNzAsNDIwIDg2LDQxMC40IDE3Niw0MTAuNCAxNjAsNDIwIiBmaWxsPSIjOTNiYWRlIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTYwLDQyMCAxNzYsNDEwLjQgMTc2LDQ3Mi40IDE2MCw0ODIiIGZpbGw9IiMyMzRlNzUiLz4KPHJlY3QgeD0iNzAiIHk9IjQyMCIgd2lkdGg9IjkwIiBoZWlnaHQ9IjYyIiBmaWxsPSJ1cmwoI2cxKSIvPgo8cmVjdCB4PSI3OCIgeT0iNDI4IiB3aWR0aD0iNzQiIGhlaWdodD0iNDYiIHJ4PSIzIiBmaWxsPSIjZGJlYWZlIi8+PGxpbmUgeDE9IjExNSIgeTE9IjQyOCIgeDI9IjExNSIgeTI9IjQ3NCIgc3Ryb2tlPSIjMWQ0ZjgyIiBzdHJva2Utd2lkdGg9IjMiLz4KPHRleHQgeD0iMTE1IiB5PSI1MTYiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjIxIiBmaWxsPSIjMjQ0MDVhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNiIgcGFpbnQtb3JkZXI9InN0cm9rZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+QnVrdTwvdGV4dD4KPGVsbGlwc2UgY3g9IjExNSIgY3k9IjI2MiIgcng9IjUwIiByeT0iNyIgZmlsbD0iIzBiMTYyMiIgb3BhY2l0eT0iMC4yNSIgZmlsdGVyPSJ1cmwoI2JsKSIvPgo8Y2lyY2xlIGN4PSIxMTUiIGN5PSIyMDUiIHI9IjQ0IiBmaWxsPSJ1cmwoI2cyKSIgb3BhY2l0eT0iMSIvPgo8ZWxsaXBzZSBjeD0iMTAwLjkiIGN5PSIxODYuNSIgcng9IjEzLjIiIHJ5PSI3LjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMzgiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAxMDAuOSAxODYuNSkiLz4KPGNpcmNsZSBjeD0iMTE1IiBjeT0iMjA1IiByPSIyMiIgZmlsbD0idXJsKCNnMykiIG9wYWNpdHk9IjEiLz4KPGVsbGlwc2UgY3g9IjEwOC4wIiBjeT0iMTk1LjgiIHJ4PSI2LjYiIHJ5PSIzLjciIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMzgiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAxMDguMCAxOTUuOCkiLz4KPGNpcmNsZSBjeD0iMTE1IiBjeT0iMjA1IiByPSI5IiBmaWxsPSIjMGIxNjIyIi8+PGNpcmNsZSBjeD0iMTA4IiBjeT0iMTk4IiByPSI0IiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik02NiAyMDUgUTExNSAxNTAgMTY0IDIwNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjQ0MDVhIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8dGV4dCB4PSIxMTUiIHk9IjEzNiIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMjEiIGZpbGw9IiMyNDQwNWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2IiBwYWludC1vcmRlcj0ic3Ryb2tlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj5NYXRhPC90ZXh0Pgo8cGF0aCBkPSJNMTc1IDIwNSBDMjA1IDE3MCAyMjUgMjM1IDI1MCAxOTUgUzMwMCAyMTAgMzMwIDE3NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMGIxNjIyIiBzdHJva2Utb3BhY2l0eT0iLjI1IiBzdHJva2Utd2lkdGg9IjEzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIgNCkiLz4KPHBhdGggZD0iTTE3NSAyMDUgQzIwNSAxNzAgMjI1IDIzNSAyNTAgMTk1IFMzMDAgMjEwIDMzMCAxNzUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg2NjUxOSIgc3Ryb2tlLXdpZHRoPSIxMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNzUgMjA1IEMyMDUgMTcwIDIyNSAyMzUgMjUwIDE5NSBTMzAwIDIxMCAzMzAgMTc1IiBmaWxsPSJub25lIiBzdHJva2U9IiNmNWI4MmUiIHN0cm9rZS13aWR0aD0iNy43IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTE3NSAyMDUgQzIwNSAxNzAgMjI1IDIzNSAyNTAgMTk1IFMzMDAgMjEwIDMzMCAxNzUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZjZTljMCIgc3Ryb2tlLXdpZHRoPSIyLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuMSAtMS45KSIvPgo8dGV4dCB4PSIyNTAiIHk9IjI2MiIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMjEiIGZpbGw9IiMyNDQwNWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2IiBwYWludC1vcmRlcj0ic3Ryb2tlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj5TYXJhZiBzZW5zb3JpazwvdGV4dD4KPGVsbGlwc2UgY3g9IjQzMCIgY3k9IjMwNiIgcng9IjgwIiByeT0iOCIgZmlsbD0iIzBiMTYyMiIgb3BhY2l0eT0iMC4yNSIgZmlsdGVyPSJ1cmwoI2JsKSIvPgo8cGF0aCBkPSJNMzQwIDIxNSBDMzEwIDExMCA0MDAgNzAgNDcwIDkwIEM1NDAgMTEwIDU0MCAxOTAgNTAwIDIzNSBMNDgwIDMwMCBMMzgwIDMwMCBMMzc1IDI0NSBaIiBmaWxsPSJ1cmwoI2c0KSIgc3Ryb2tlPSIjMjQ0MDVhIiBzdHJva2Utd2lkdGg9IjMuNSIvPgo8ZWxsaXBzZSBjeD0iNDMwIiBjeT0iMTUwIiByeD0iNzUiIHJ5PSI1MiIgZmlsbD0idXJsKCNnNSkiIHN0cm9rZT0iI2IzNDg2OCIgc3Ryb2tlLXdpZHRoPSIzLjUiLz4KPHBhdGggZD0iTTM4NSAxNTAgcTE1IC0yMiAzMCAwIHQzMCAwIHQyOCAwIE0zOTUgMTI4IHExOCAxMiA0MCAwIHQzNCA4IiBmaWxsPSJub25lIiBzdHJva2U9IiNiMzQ4NjgiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjx0ZXh0IHg9IjQxNSIgeT0iNjIiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjIxIiBmaWxsPSIjMjQ0MDVhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNiIgcGFpbnQtb3JkZXI9InN0cm9rZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+T3RhazwvdGV4dD4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDMwIDMxMikgcm90YXRlKDkwLjApIiBvcGFjaXR5PSIxIj48cmVjdCB4PSItMTIiIHk9Ii0xMiIgd2lkdGg9IjkwLjAiIGhlaWdodD0iMjQiIHJ4PSIxMiIgZmlsbD0idXJsKCNnNikiLz48cmVjdCB4PSItNC44IiB5PSItNy40IiB3aWR0aD0iNzUuNiIgaGVpZ2h0PSIyLjQiIHJ4PSIxLjIiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4zMiIvPjwvZz4KPHBhdGggZD0iTTQzMCAzNzggQzQ0MCA0MDUgNDgwIDMzNSA1NDAgMzQ1IFM2MjAgMzU1IDY2MCAzNDIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzBiMTYyMiIgc3Ryb2tlLW9wYWNpdHk9Ii4yNSIgc3Ryb2tlLXdpZHRoPSIxMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyIDQpIi8+CjxwYXRoIGQ9Ik00MzAgMzc4IEM0NDAgNDA1IDQ4MCAzMzUgNTQwIDM0NSBTNjIwIDM1NSA2NjAgMzQyIiBmaWxsPSJub25lIiBzdHJva2U9IiM4NjY1MTkiIHN0cm9rZS13aWR0aD0iMTEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNNDMwIDM3OCBDNDQwIDQwNSA0ODAgMzM1IDU0MCAzNDUgUzYyMCAzNTUgNjYwIDM0MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjViODJlIiBzdHJva2Utd2lkdGg9IjcuNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik00MzAgMzc4IEM0NDAgNDA1IDQ4MCAzMzUgNTQwIDM0NSBTNjIwIDM1NSA2NjAgMzQyIiBmaWxsPSJub25lIiBzdHJva2U9IiNmY2U5YzAiIHN0cm9rZS13aWR0aD0iMi44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xLjEgLTEuOSkiLz4KPHRleHQgeD0iNTYwIiB5PSIzOTgiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjIxIiBmaWxsPSIjMjQ0MDVhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNiIgcGFpbnQtb3JkZXI9InN0cm9rZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+U2FyYWYgbW90b3JpazwvdGV4dD4KPGVsbGlwc2UgY3g9Ijc1NSIgY3k9IjM5MiIgcng9IjEwMCIgcnk9IjgiIGZpbGw9IiMwYjE2MjIiIG9wYWNpdHk9IjAuMjUiIGZpbHRlcj0idXJsKCNibCkiLz4KPHBhdGggZD0iTTY1MCAzNjAgUTc1MCAyODUgODYwIDM0NSBRNzUwIDM4MCA2NTAgMzYwIFoiIGZpbGw9InVybCgjZzcpIiBzdHJva2U9IiM4NjJiMjIiIHN0cm9rZS13aWR0aD0iMy41Ii8+CjxwYXRoIGQ9Ik02OTAgMzQ1IFE3NjAgMzA1IDgzMCAzMzgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii40IiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8dGV4dCB4PSI3NTAiIHk9IjQzMCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMjEiIGZpbGw9IiMyNDQwNWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2IiBwYWludC1vcmRlcj0ic3Ryb2tlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj5PdG90IGxlbmdhbjwvdGV4dD4KPGVsbGlwc2UgY3g9Ijg3NSIgY3k9IjMwNiIgcng9IjYwIiByeT0iNyIgZmlsbD0iIzBiMTYyMiIgb3BhY2l0eT0iMC4yNSIgZmlsdGVyPSJ1cmwoI2JsKSIvPgo8cG9seWdvbiBwb2ludHM9IjgzNSwxNTAgODQ5LDE0MS42IDkyOSwxNDEuNiA5MTUsMTUwIiBmaWxsPSIjOTNiYWRlIi8+Cjxwb2x5Z29uIHBvaW50cz0iOTE1LDE1MCA5MjksMTQxLjYgOTI5LDE5Ni42IDkxNSwyMDUiIGZpbGw9IiMyMzRlNzUiLz4KPHJlY3QgeD0iODM1IiB5PSIxNTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI1NSIgZmlsbD0idXJsKCNnOCkiLz4KPHJlY3QgeD0iODQyIiB5PSIxNTciIHdpZHRoPSI2NiIgaGVpZ2h0PSI0MSIgcng9IjMiIGZpbGw9IiNkYmVhZmUiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODUyIDI4OCkgcm90YXRlKDAuMCkiIG9wYWNpdHk9IjEiPjxyZWN0IHg9Ii0yNiIgeT0iLTI2IiB3aWR0aD0iOTguMCIgaGVpZ2h0PSI1MiIgcng9IjI2IiBmaWxsPSJ1cmwoI2c5KSIvPjxyZWN0IHg9Ii0xMC40IiB5PSItMTYuMSIgd2lkdGg9IjY2LjgiIGhlaWdodD0iNS4yIiByeD0iMi42IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMzIiLz48L2c+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDg1MCAyNjIpIHJvdGF0ZSgtOTAuMCkiIG9wYWNpdHk9IjEiPjxyZWN0IHg9Ii03IiB5PSItNyIgd2lkdGg9IjI4LjAiIGhlaWdodD0iMTQiIHJ4PSI3IiBmaWxsPSJ1cmwoI2cxMCkiLz48cmVjdCB4PSItMi44IiB5PSItNC4zIiB3aWR0aD0iMTkuNiIgaGVpZ2h0PSIxLjQiIHJ4PSIwLjciIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4zMiIvPjwvZz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODY4IDI2Mikgcm90YXRlKC05MC4wKSIgb3BhY2l0eT0iMSI+PHJlY3QgeD0iLTciIHk9Ii03IiB3aWR0aD0iMjguMCIgaGVpZ2h0PSIxNCIgcng9IjciIGZpbGw9InVybCgjZzExKSIvPjxyZWN0IHg9Ii0yLjgiIHk9Ii00LjMiIHdpZHRoPSIxOS42IiBoZWlnaHQ9IjEuNCIgcng9IjAuNyIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjMyIi8+PC9nPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4ODYgMjYyKSByb3RhdGUoLTkwLjApIiBvcGFjaXR5PSIxIj48cmVjdCB4PSItNyIgeT0iLTciIHdpZHRoPSIyOC4wIiBoZWlnaHQ9IjE0IiByeD0iNyIgZmlsbD0idXJsKCNnMTIpIi8+PHJlY3QgeD0iLTIuOCIgeT0iLTQuMyIgd2lkdGg9IjE5LjYiIGhlaWdodD0iMS40IiByeD0iMC43IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMzIiLz48L2c+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkwMiAyNjIpIHJvdGF0ZSgtOTAuMCkiIG9wYWNpdHk9IjEiPjxyZWN0IHg9Ii03IiB5PSItNyIgd2lkdGg9IjI4LjAiIGhlaWdodD0iMTQiIHJ4PSI3IiBmaWxsPSJ1cmwoI2cxMykiLz48cmVjdCB4PSItMi44IiB5PSItNC4zIiB3aWR0aD0iMTkuNiIgaGVpZ2h0PSIxLjQiIHJ4PSIwLjciIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4zMiIvPjwvZz4KPHRleHQgeD0iODc1IiB5PSIxMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjIxIiBmaWxsPSIjMjQ0MDVhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNiIgcGFpbnQtb3JkZXI9InN0cm9rZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+TWVuZ2FtYmlsIGJ1a3U8L3RleHQ+Cjwvc3ZnPg==',
    alt: 'Diagram alur gerak sadar mengambil buku',
    cap: 'Diagram gerak sadar: cahaya dari buku ditangkap mata → impuls dibawa ke otak untuk diputuskan → perintah turun ke otot lengan untuk mengambil buku.',
    center: ['Otak', 'berpikir & memutuskan'],
    stepMs: 650,
    real: '±0,2–0,3 detik',
    txt: 'Gerak sadar: rangsangan (melihat buku) diterima reseptor mata, impuls dibawa saraf sensorik ke <b>otak</b>. Otak berpikir dan memutuskan, lalu mengirim perintah lewat sumsum tulang belakang dan saraf motorik ke otot tangan. Jalurnya panjang, sehingga lebih lambat.',
    pts: [
      [115, 395], // 1. Rangsangan (buku)
      [115, 205], // 2. Reseptor (mata)
      [250, 195], // 3. Saraf sensorik
      [410, 165], // 4. Otak
      [560, 340], // 5. Saraf motorik
      [750, 355], // 6. Otot (biseps)
      [875, 215]  // 7. Respons (mengambil buku)
    ]
  },
  refleks: {
    img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDUzMCIgd2lkdGg9IjEwMDAiIGhlaWdodD0iNTMwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IkRpYWdyYW0gYWx1ciBnZXJhayByZWZsZWtzOiBtZW55ZW50dWggcGFuY2kgcGFuYXMiPgo8ZGVmcz48ZmlsdGVyIGlkPSJibCIgeD0iLTQwJSIgeT0iLTIwMCUiIHdpZHRoPSIxODAlIiBoZWlnaHQ9IjUwMCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjUiLz48L2ZpbHRlcj48ZmlsdGVyIGlkPSJibDIiIHg9Ii01MCUiIHk9Ii01MCUiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjkiLz48L2ZpbHRlcj48cmFkaWFsR3JhZGllbnQgaWQ9ImcxIiBjeD0iMC4zNSIgY3k9IjAuMyIgcj0iMC44Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmYWRiZTMiLz48c3RvcCBvZmZzZXQ9Ii40NSIgc3RvcC1jb2xvcj0iI2Y0YTdiOSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzdhNTM1YyIvPjwvcmFkaWFsR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnMiIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZjZTI4ZiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiNmZGVmYzMiLz48c3RvcCBvZmZzZXQ9Ii42MiIgc3RvcC1jb2xvcj0iI2ZiZDk2YSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzdkNmMzNSIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJnMyIgY3g9IjAuMzUiIGN5PSIwLjMiIHI9IjAuOCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+PHN0b3Agb2Zmc2V0PSIuNDUiIHN0b3AtY29sb3I9IiNmZmZmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3ZjdmN2YiLz48L3JhZGlhbEdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iZzQiIGN4PSIwLjM1IiBjeT0iMC4zIiByPSIwLjgiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2U4ZWRmMSIvPjxzdG9wIG9mZnNldD0iLjQ1IiBzdG9wLWNvbG9yPSIjYzdkMmRjIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNjM2OTZlIi8+PC9yYWRpYWxHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Imc1IiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjODM4NzhmIi8+PHN0b3Agb2Zmc2V0PSIuMyIgc3RvcC1jb2xvcj0iI2JkYmZjMyIvPjxzdG9wIG9mZnNldD0iLjYyIiBzdG9wLWNvbG9yPSIjNWE2MDZhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMmQzMDM1Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Imc2IiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmI2Zjc1Ii8+PHN0b3Agb2Zmc2V0PSIuMyIgc3RvcC1jb2xvcj0iI2IwYjJiNSIvPjxzdG9wIG9mZnNldD0iLjYyIiBzdG9wLWNvbG9yPSIjM2E0MDQ4Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMWQyMDI0Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Imc3IiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmI2Zjc1Ii8+PHN0b3Agb2Zmc2V0PSIuMyIgc3RvcC1jb2xvcj0iI2IwYjJiNSIvPjxzdG9wIG9mZnNldD0iLjYyIiBzdG9wLWNvbG9yPSIjM2E0MDQ4Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMWQyMDI0Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Imc4IiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjRkNmJiIi8+PHN0b3Agb2Zmc2V0PSIuMyIgc3RvcC1jb2xvcj0iI2Y5ZTlkYiIvPjxzdG9wIG9mZnNldD0iLjYyIiBzdG9wLWNvbG9yPSIjZjFjOWE1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzg2NDUyIi8+PC9saW5lYXJHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9Imc5IiBjeD0iMC4zNSIgY3k9IjAuMyIgcj0iMC44Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmM5YjEiLz48c3RvcCBvZmZzZXQ9Ii40NSIgc3RvcC1jb2xvcj0iI2ZmN2EzZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzdmM2QxZSIvPjwvcmFkaWFsR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJnMTAiIGN4PSIwLjM1IiBjeT0iMC4zIiByPSIwLjgiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmYzliMSIvPjxzdG9wIG9mZnNldD0iLjQ1IiBzdG9wLWNvbG9yPSIjZmY3YTNkIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjN2YzZDFlIi8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImcxMSIgY3g9IjAuMzUiIGN5PSIwLjMiIHI9IjAuOCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZjOWIxIi8+PHN0b3Agb2Zmc2V0PSIuNDUiIHN0b3AtY29sb3I9IiNmZjdhM2QiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3ZjNkMWUiLz48L3JhZGlhbEdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZzEyIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZWQ5YTkyIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOTEyZTI1Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImcxMyIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y0ZDZiYiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiNmOWU5ZGIiLz48c3RvcCBvZmZzZXQ9Ii42MiIgc3RvcC1jb2xvcj0iI2YxYzlhNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzc4NjQ1MiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnMTQiIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmNGQ2YmIiLz48c3RvcCBvZmZzZXQ9Ii4zIiBzdG9wLWNvbG9yPSIjZjllOWRiIi8+PHN0b3Agb2Zmc2V0PSIuNjIiIHN0b3AtY29sb3I9IiNmMWM5YTUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3ODY0NTIiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZzE1IiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjRkNmJiIi8+PHN0b3Agb2Zmc2V0PSIuMyIgc3RvcC1jb2xvcj0iI2Y5ZTlkYiIvPjxzdG9wIG9mZnNldD0iLjYyIiBzdG9wLWNvbG9yPSIjZjFjOWE1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzg2NDUyIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImcxNiIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y0ZDZiYiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiNmOWU5ZGIiLz48c3RvcCBvZmZzZXQ9Ii42MiIgc3RvcC1jb2xvcj0iI2YxYzlhNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzc4NjQ1MiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnMTciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmNGQ2YmIiLz48c3RvcCBvZmZzZXQ9Ii4zIiBzdG9wLWNvbG9yPSIjZjllOWRiIi8+PHN0b3Agb2Zmc2V0PSIuNjIiIHN0b3AtY29sb3I9IiNmMWM5YTUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3ODY0NTIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMDAiIGhlaWdodD0iNTMwIiBmaWxsPSIjZmZmZmZmIi8+CjxlbGxpcHNlIGN4PSI2NDAiIGN5PSI2MiIgcng9IjcyIiByeT0iNDAiIGZpbGw9InVybCgjZzEpIiBvcGFjaXR5PSIuMzUiIHN0cm9rZT0iI2IzNDg2OCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtZGFzaGFycmF5PSI5IDciLz4KPHRleHQgeD0iNzgwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM3YThhOTkiIHRleHQtYW5jaG9yPSJzdGFydCI+T3RhazwvdGV4dD4KPHRleHQgeD0iNzgwIiB5PSI4NCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI0MDAiIGZvbnQtc2l6ZT0iMTciIGZpbGw9IiM3YThhOTkiIHRleHQtYW5jaG9yPSJzdGFydCI+dGlkYWsgaWt1dCBiZWtlcmphPC90ZXh0Pgo8bGluZSB4MT0iNjQwIiB5MT0iMTAyIiB4Mj0iNjQwIiB5Mj0iMTI1IiBzdHJva2U9IiM5ZmI0YzYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWRhc2hhcnJheT0iNSA1Ii8+CjxlbGxpcHNlIGN4PSI2NDAiIGN5PSI0MzgiIHJ4PSI2MCIgcnk9IjgiIGZpbGw9IiMwYjE2MjIiIG9wYWNpdHk9IjAuMjgiIGZpbHRlcj0idXJsKCNibCkiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjQwIDE1MCkgcm90YXRlKDkwLjApIiBvcGFjaXR5PSIxIj48cmVjdCB4PSItMzQiIHk9Ii0zNCIgd2lkdGg9IjMyOC4wIiBoZWlnaHQ9IjY4IiByeD0iMzQiIGZpbGw9InVybCgjZzIpIi8+PHJlY3QgeD0iLTEzLjYiIHk9Ii0yMS4xIiB3aWR0aD0iMjg3LjIiIGhlaWdodD0iNi44IiByeD0iMy40IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMzIiLz48L2c+CjxjaXJjbGUgY3g9IjY0MCIgY3k9IjI3MCIgcj0iNDAiIGZpbGw9InVybCgjZzMpIiBvcGFjaXR5PSIxIiBzdHJva2U9IiNiOTg3MWEiIHN0cm9rZS13aWR0aD0iMiIvPgo8ZWxsaXBzZSBjeD0iNjI3LjIiIGN5PSIyNTMuMiIgcng9IjEyLjAiIHJ5PSI2LjgiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMzgiIHRyYW5zZm9ybT0icm90YXRlKC0zMCA2MjcuMiAyNTMuMikiLz4KPHBhdGggZD0iTTY0MCAyNzAgQzYxNSAyNDAgNjAwIDI2MiA2MTIgMjgwIEM2MjAgMjkyIDYzMiAyODYgNjQwIDI3MCBDNjQ4IDI4NiA2NjAgMjkyIDY2OCAyODAgQzY4MCAyNjIgNjY1IDI0MCA2NDAgMjcwIFoiIGZpbGw9InVybCgjZzQpIiBzdHJva2U9IiM2YjdmOTAiIHN0cm9rZS13aWR0aD0iMi41Ii8+Cjx0ZXh0IHg9IjcwNSIgeT0iMjYyIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1zaXplPSIyMSIgZmlsbD0iIzI0NDA1YSIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNiIgcGFpbnQtb3JkZXI9InN0cm9rZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+U3Vtc3VtPC90ZXh0Pgo8dGV4dCB4PSI3MDUiIHk9IjI4OCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMjEiIGZpbGw9IiMyNDQwNWEiIHRleHQtYW5jaG9yPSJzdGFydCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjYiIHBhaW50LW9yZGVyPSJzdHJva2UiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPnR1bGFuZzwvdGV4dD4KPHRleHQgeD0iNzA1IiB5PSIzMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjIxIiBmaWxsPSIjMjQ0MDVhIiB0ZXh0LWFuY2hvcj0ic3RhcnQiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2IiBwYWludC1vcmRlcj0ic3Ryb2tlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj5iZWxha2FuZzwvdGV4dD4KPGVsbGlwc2UgY3g9IjEwMCIgY3k9IjI1MCIgcng9IjUyIiByeT0iNyIgZmlsbD0iIzBiMTYyMiIgb3BhY2l0eT0iMC4zIiBmaWx0ZXI9InVybCgjYmwpIi8+CjxwYXRoIGQ9Ik02MCAyMDEgSDE0MCBWMjMyIFExNDAgMjQ2IDEwMCAyNDYgUTYwIDI0NiA2MCAyMzIgWiIgZmlsbD0idXJsKCNnNSkiIHN0cm9rZT0iIzJmMzQzYiIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KPGVsbGlwc2UgY3g9IjEwMCIgY3k9IjIwMSIgcng9IjQwIiByeT0iOSIgZmlsbD0iIzJmMzQzYiIvPjxlbGxpcHNlIGN4PSIxMDAiIGN5PSIyMDEiIHJ4PSIzMyIgcnk9IjYiIGZpbGw9IiMxNDE4MWQiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQgMjE0KSByb3RhdGUoMC4wKSIgb3BhY2l0eT0iMSI+PHJlY3QgeD0iLTUiIHk9Ii01IiB3aWR0aD0iMjQuMCIgaGVpZ2h0PSIxMCIgcng9IjUiIGZpbGw9InVybCgjZzYpIi8+PHJlY3QgeD0iLTIuMCIgeT0iLTMuMSIgd2lkdGg9IjE4LjAiIGhlaWdodD0iMS4wIiByeD0iMC41IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMzIiLz48L2c+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0MiAyMTQpIHJvdGF0ZSgwLjApIiBvcGFjaXR5PSIxIj48cmVjdCB4PSItNSIgeT0iLTUiIHdpZHRoPSIyNC4wIiBoZWlnaHQ9IjEwIiByeD0iNSIgZmlsbD0idXJsKCNnNykiLz48cmVjdCB4PSItMi4wIiB5PSItMy4xIiB3aWR0aD0iMTguMCIgaGVpZ2h0PSIxLjAiIHJ4PSIwLjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4zMiIvPjwvZz4KPHBhdGggZD0iTTY4IDI2MiBxOCAtMTIgMTYgMCB0MTYgMCB0MTYgMCB0MTYgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmY3YTNkIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8dGV4dCB4PSIxMDAiIHk9IjI5OCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMjEiIGZpbGw9IiMyNDQwNWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2IiBwYWludC1vcmRlcj0ic3Ryb2tlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj5QYW5jaSBwYW5hczwvdGV4dD4KPGVsbGlwc2UgY3g9IjI1MCIgY3k9IjI1MCIgcng9IjI2IiByeT0iNSIgZmlsbD0iIzBiMTYyMiIgb3BhY2l0eT0iMC4yNSIgZmlsdGVyPSJ1cmwoI2JsKSIvPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTAgMjA4KSByb3RhdGUoOTAuMCkiIG9wYWNpdHk9IjEiPjxyZWN0IHg9Ii0xNCIgeT0iLTE0IiB3aWR0aD0iNTIuMCIgaGVpZ2h0PSIyOCIgcng9IjE0IiBmaWxsPSJ1cmwoI2c4KSIvPjxyZWN0IHg9Ii01LjYiIHk9Ii04LjciIHdpZHRoPSIzNS4yIiBoZWlnaHQ9IjIuOCIgcng9IjEuNCIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjMyIi8+PC9nPgo8Y2lyY2xlIGN4PSIyNTAiIGN5PSIxOTYiIHI9IjUiIGZpbGw9InVybCgjZzkpIiBvcGFjaXR5PSIxIi8+CjxlbGxpcHNlIGN4PSIyNDguNCIgY3k9IjE5My45IiByeD0iMS41IiByeT0iMC45IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjM4IiB0cmFuc2Zvcm09InJvdGF0ZSgtMzAgMjQ4LjQgMTkzLjkpIi8+CjxjaXJjbGUgY3g9IjI0MiIgY3k9IjIxNCIgcj0iMy41IiBmaWxsPSJ1cmwoI2cxMCkiIG9wYWNpdHk9IjEiLz4KPGVsbGlwc2UgY3g9IjI0MC45IiBjeT0iMjEyLjUiIHJ4PSIxLjEiIHJ5PSIwLjYiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMzgiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAyNDAuOSAyMTIuNSkiLz4KPGNpcmNsZSBjeD0iMjU4IiBjeT0iMjE4IiByPSIzLjUiIGZpbGw9InVybCgjZzExKSIgb3BhY2l0eT0iMSIvPgo8ZWxsaXBzZSBjeD0iMjU2LjkiIGN5PSIyMTYuNSIgcng9IjEuMSIgcnk9IjAuNiIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4zOCIgdHJhbnNmb3JtPSJyb3RhdGUoLTMwIDI1Ni45IDIxNi41KSIvPgo8dGV4dCB4PSIyNTAiIHk9IjI5OCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMjEiIGZpbGw9IiMyNDQwNWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2IiBwYWludC1vcmRlcj0ic3Ryb2tlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj5LdWxpdCBqYXJpPC90ZXh0Pgo8cGF0aCBkPSJNMjcwIDIyMiBDMzMwIDE5MCAzODAgMjUyIDQ0MCAyMjIgUzU0MCAyMDAgNjA2IDIyNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMGIxNjIyIiBzdHJva2Utb3BhY2l0eT0iLjI1IiBzdHJva2Utd2lkdGg9IjEzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIgNCkiLz4KPHBhdGggZD0iTTI3MCAyMjIgQzMzMCAxOTAgMzgwIDI1MiA0NDAgMjIyIFM1NDAgMjAwIDYwNiAyMjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg2NjUxOSIgc3Ryb2tlLXdpZHRoPSIxMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0yNzAgMjIyIEMzMzAgMTkwIDM4MCAyNTIgNDQwIDIyMiBTNTQwIDIwMCA2MDYgMjI2IiBmaWxsPSJub25lIiBzdHJva2U9IiNmNWI4MmUiIHN0cm9rZS13aWR0aD0iNy43IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTI3MCAyMjIgQzMzMCAxOTAgMzgwIDI1MiA0NDAgMjIyIFM1NDAgMjAwIDYwNiAyMjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZjZTljMCIgc3Ryb2tlLXdpZHRoPSIyLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuMSAtMS45KSIvPgo8dGV4dCB4PSI0MzAiIHk9IjI5OCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMjEiIGZpbGw9IiMyNDQwNWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2IiBwYWludC1vcmRlcj0ic3Ryb2tlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj5TYXJhZiBzZW5zb3JpazwvdGV4dD4KPHBhdGggZD0iTTYwNiA0MTAgQzU2MCA0NDAgNTAwIDM4NSA0NDAgNDEyIFMzNDAgNDM2IDI5NiA0MTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzBiMTYyMiIgc3Ryb2tlLW9wYWNpdHk9Ii4yNSIgc3Ryb2tlLXdpZHRoPSIxMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyIDQpIi8+CjxwYXRoIGQ9Ik02MDYgNDEwIEM1NjAgNDQwIDUwMCAzODUgNDQwIDQxMiBTMzQwIDQzNiAyOTYgNDEyIiBmaWxsPSJub25lIiBzdHJva2U9IiM4NjY1MTkiIHN0cm9rZS13aWR0aD0iMTEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNNjA2IDQxMCBDNTYwIDQ0MCA1MDAgMzg1IDQ0MCA0MTIgUzM0MCA0MzYgMjk2IDQxMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjViODJlIiBzdHJva2Utd2lkdGg9IjcuNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik02MDYgNDEwIEM1NjAgNDQwIDUwMCAzODUgNDQwIDQxMiBTMzQwIDQzNiAyOTYgNDEyIiBmaWxsPSJub25lIiBzdHJva2U9IiNmY2U5YzAiIHN0cm9rZS13aWR0aD0iMi44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xLjEgLTEuOSkiLz4KPHRleHQgeD0iNDMwIiB5PSI0OTAiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjIxIiBmaWxsPSIjMjQ0MDVhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNiIgcGFpbnQtb3JkZXI9InN0cm9rZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+U2FyYWYgbW90b3JpazwvdGV4dD4KPGVsbGlwc2UgY3g9IjI1MCIgY3k9IjQ1NiIgcng9IjU2IiByeT0iNiIgZmlsbD0iIzBiMTYyMiIgb3BhY2l0eT0iMC4yNSIgZmlsdGVyPSJ1cmwoI2JsKSIvPgo8cGF0aCBkPSJNMjAwIDQxNSBRMjUwIDM3MiAzMDAgNDE1IFEyNTAgNDU4IDIwMCA0MTUgWiIgZmlsbD0idXJsKCNnMTIpIiBzdHJva2U9IiM4NjJiMjIiIHN0cm9rZS13aWR0aD0iMy41Ii8+CjxwYXRoIGQ9Ik0yMTggNDEyIFEyNTAgMzg4IDI4NCA0MTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii40IiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8dGV4dCB4PSIyNTAiIHk9IjQ5MCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMjEiIGZpbGw9IiMyNDQwNWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2IiBwYWludC1vcmRlcj0ic3Ryb2tlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj5PdG90IGxlbmdhbjwvdGV4dD4KPGVsbGlwc2UgY3g9IjEwMCIgY3k9IjQ1OCIgcng9IjQyIiByeT0iNiIgZmlsbD0iIzBiMTYyMiIgb3BhY2l0eT0iMC4yNSIgZmlsdGVyPSJ1cmwoI2JsKSIvPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4MiA0MzYpIHJvdGF0ZSgwLjApIiBvcGFjaXR5PSIxIj48cmVjdCB4PSItMjAiIHk9Ii0yMCIgd2lkdGg9Ijc2LjAiIGhlaWdodD0iNDAiIHJ4PSIyMCIgZmlsbD0idXJsKCNnMTMpIi8+PHJlY3QgeD0iLTguMCIgeT0iLTEyLjQiIHdpZHRoPSI1Mi4wIiBoZWlnaHQ9IjQuMCIgcng9IjIuMCIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjMyIi8+PC9nPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3OCA0MTQpIHJvdGF0ZSgtOTAuMCkiIG9wYWNpdHk9IjEiPjxyZWN0IHg9Ii03IiB5PSItNyIgd2lkdGg9IjMwLjAiIGhlaWdodD0iMTQiIHJ4PSI3IiBmaWxsPSJ1cmwoI2cxNCkiLz48cmVjdCB4PSItMi44IiB5PSItNC4zIiB3aWR0aD0iMjEuNiIgaGVpZ2h0PSIxLjQiIHJ4PSIwLjciIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4zMiIvPjwvZz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTIgNDE0KSByb3RhdGUoLTkwLjApIiBvcGFjaXR5PSIxIj48cmVjdCB4PSItNyIgeT0iLTciIHdpZHRoPSIzMC4wIiBoZWlnaHQ9IjE0IiByeD0iNyIgZmlsbD0idXJsKCNnMTUpIi8+PHJlY3QgeD0iLTIuOCIgeT0iLTQuMyIgd2lkdGg9IjIxLjYiIGhlaWdodD0iMS40IiByeD0iMC43IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMzIiLz48L2c+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwNiA0MTQpIHJvdGF0ZSgtOTAuMCkiIG9wYWNpdHk9IjEiPjxyZWN0IHg9Ii03IiB5PSItNyIgd2lkdGg9IjMwLjAiIGhlaWdodD0iMTQiIHJ4PSI3IiBmaWxsPSJ1cmwoI2cxNikiLz48cmVjdCB4PSItMi44IiB5PSItNC4zIiB3aWR0aD0iMjEuNiIgaGVpZ2h0PSIxLjQiIHJ4PSIwLjciIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4zMiIvPjwvZz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIwIDQxNCkgcm90YXRlKC05MC4wKSIgb3BhY2l0eT0iMSI+PHJlY3QgeD0iLTciIHk9Ii03IiB3aWR0aD0iMzAuMCIgaGVpZ2h0PSIxNCIgcng9IjciIGZpbGw9InVybCgjZzE3KSIvPjxyZWN0IHg9Ii0yLjgiIHk9Ii00LjMiIHdpZHRoPSIyMS42IiBoZWlnaHQ9IjEuNCIgcng9IjAuNyIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjMyIi8+PC9nPgo8cGF0aCBkPSJNNjAgNDQwIHEtMTQgLTEyIDAgLTI2IE00OCA0NDYgcS0yMiAtMTggMCAtNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmN2EzZCIgc3Ryb2tlLXdpZHRoPSIzLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8dGV4dCB4PSIxMDAiIHk9IjQ5MCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMjEiIGZpbGw9IiMyNDQwNWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI2IiBwYWludC1vcmRlcj0ic3Ryb2tlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj5UYW5nYW4gZGl0YXJpazwvdGV4dD4KPC9zdmc+',
    alt: 'Diagram alur gerak refleks menyentuh panci panas',
    cap: 'Diagram gerak refleks: jari menyentuh panci panas → impuls masuk lewat saraf sensorik ke sumsum tulang belakang → langsung berbalik ke otot lengan tanpa ke otak.',
    center: ['Sumsum tulang belakang', 'langsung membalas'],
    stepMs: 280,
    real: '±0,03–0,05 detik',
    txt: 'Gerak refleks: panas diterima reseptor kulit, impuls dibawa saraf sensorik ke <b>sumsum tulang belakang</b> yang langsung mengirim perintah ke saraf motorik tanpa menunggu otak. Jalurnya pendek, sehingga sangat cepat dan melindungi tubuh dari cedera.',
    pts: [
      [100, 165], // 1. Rangsangan (panci panas)
      [250, 165], // 2. Reseptor (kulit jari)
      [430, 165], // 3. Saraf sensorik
      [640, 270], // 4. Sumsum tulang belakang
      [430, 365], // 5. Saraf motorik
      [250, 365], // 6. Otot (efektor)
      [100, 365]  // 7. Respons (tangan ditarik)
    ]
  }
};

function drawArrowOverlay(hit) {
  const m = SIM[sim.mode];
  const svg = $('#alurSvg');
  const maxIdx = hit < 0 ? m.pts.length - 1 : Math.min(hit, m.pts.length - 1);
  let html = '<defs>' +
    '<marker id="arrowHead" markerWidth="10" markerHeight="10" refX="7" refY="3.5" orient="auto">' +
    '<polygon points="0 0, 9 3.5, 0 7" fill="#ff5722" />' +
    '</marker>' +
    '<marker id="arrowHeadActive" markerWidth="11" markerHeight="11" refX="7" refY="3.5" orient="auto">' +
    '<polygon points="0 0, 10 3.5, 0 7" fill="#f5b82e" />' +
    '</marker>' +
    '</defs>';

  for (let i = 0; i < maxIdx; i++) {
    const [x1, y1] = m.pts[i];
    const [x2, y2] = m.pts[i + 1];
    const isLatest = hit >= 0 && i === hit - 1;
    const stroke = isLatest ? '#f5b82e' : '#ff5722';
    const marker = isLatest ? 'url(#arrowHeadActive)' : 'url(#arrowHead)';
    html += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" ' +
      'stroke="' + stroke + '" stroke-width="6" stroke-linecap="round" ' +
      'stroke-dasharray="12 8" marker-end="' + marker + '" />';
  }

  for (let i = 0; i <= maxIdx; i++) {
    const [cx, cy] = m.pts[i];
    const active = hit >= 0 && i === hit;
    html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (active ? 18 : 14) + '" fill="' + (active ? '#f5b82e' : '#0b1622') + '" stroke="#ffffff" stroke-width="3" />';
    html += '<text x="' + cx + '" y="' + (cy + 5) + '" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="700" font-size="14" fill="' + (active ? '#0b1622' : '#ffffff') + '">' + (i + 1) + '</text>';
  }
  svg.innerHTML = html;
}

function drawChain(hit) {
  const m = SIM[sim.mode];
  const nodes = [
    ['Rangsangan', sim.mode === 'sadar' ? 'melihat buku' : 'panas panci'],
    ['Reseptor', sim.mode === 'sadar' ? 'mata' : 'kulit jari'],
    ['Saraf sensorik', 'ke pusat saraf'],
    m.center,
    ['Saraf motorik', 'ke otot'],
    ['Otot (efektor)', 'berkontraksi'],
    ['Respons', sim.mode === 'sadar' ? 'mengambil buku' : 'tangan ditarik']
  ];
  $('#chain').innerHTML = nodes.map((n, i) => {
    const card = '<div class="node' + (i <= hit ? ' hit' : '') + (i === 3 ? ' key' : '') + '"><span class="num">' + (i + 1) + '</span><br>' + n[0] + '<small>' + n[1] + '</small></div>';
    const arrow = i < nodes.length - 1
      ? '<span class="chain-arrow' + (i < hit ? ' hit' : '') + '" aria-hidden="true">→</span>'
      : '';
    return card + arrow;
  }).join('');
  $('#alurTxt').innerHTML = m.txt;
  drawArrowOverlay(hit);
}

function setMode(m) {
  sim.mode = m;
  stopSim();
  const data = SIM[m];
  $('#alurImg').src = data.img;
  document.querySelectorAll('.scene-card').forEach(el => el.classList.remove('active'));
  const scene = document.getElementById(m === 'sadar' ? 'sceneSadar' : 'sceneRefleks');
  if (scene) scene.classList.add('active');
  $('#alurImg').alt = data.alt;
  $('#alurCap').textContent = data.cap;
  $('#mSadar').classList.toggle('sel', m === 'sadar');
  $('#mRefleks').classList.toggle('sel', m === 'refleks');
  $('#timer').textContent = '';
  drawChain(-1);
}
function stopSim() {
  clearInterval(sim.timer);
  sim.running = false;
  sim.step = -1;
}
function playSim() {
  stopSim();
  sim.running = true;
  sim.start = performance.now();
  $('#timer').textContent = '';
  drawChain(0);
  sim.step = 0;
  sim.timer = setInterval(() => {
    sim.step++;
    drawChain(sim.step);
    if (sim.step >= 6) {
      clearInterval(sim.timer);
      setTimeout(() => { sim.running = false; }, SIM[sim.mode].stepMs);
      $('#timer').textContent = 'Waktu respons nyata: ' + SIM[sim.mode].real;
    }
  }, SIM[sim.mode].stepMs);
}
$('#mSadar').addEventListener('click', () => setMode('sadar'));
$('#mRefleks').addEventListener('click', () => setMode('refleks'));
$('#play').addEventListener('click', playSim);
drawChain(-1);

/* ---------------------------------------------------------
   5. KUIS INTERAKTIF
   --------------------------------------------------------- */
const QUIZ = [
  { q: 'Bagian sistem saraf yang menjadi pusat gerak refleks adalah ...', o: ['Otak besar', 'Sumsum tulang belakang', 'Saraf motorik', 'Reseptor'], a: 1, e: 'Pada gerak refleks, impuls diolah di sumsum tulang belakang tanpa menunggu otak.' },
  { q: 'Saraf yang membawa perintah dari pusat saraf ke otot disebut saraf ...', o: ['Sensorik', 'Motorik', 'Konektor', 'Optik'], a: 1, e: 'Saraf motorik membawa perintah ke otot sebagai efektor.' },
  { q: 'Otak dan sumsum tulang belakang termasuk ke dalam sistem saraf ...', o: ['Tepi', 'Otonom', 'Pusat', 'Sensorik'], a: 2, e: 'Otak dan sumsum tulang belakang membentuk sistem saraf pusat.' },
  { q: 'Sendi pada siku dan lutut termasuk sendi ...', o: ['Peluru', 'Putar', 'Engsel', 'Pelana'], a: 2, e: 'Sendi engsel hanya dapat bergerak ke satu arah, seperti engsel pintu.' },
  { q: 'Saat lengan ditekuk, otot yang berkontraksi adalah ...', o: ['Triseps', 'Biseps', 'Keduanya relaksasi', 'Otot jantung'], a: 1, e: 'Biseps berkontraksi dan triseps relaksasi. Saat lengan diluruskan, keadaannya berbalik.' },
  { q: 'Tanganmu langsung tertarik saat menyentuh panci panas. Gerakan ini disebut ...', o: ['Gerak sadar', 'Gerak refleks', 'Gerak lambat', 'Gerak otot polos'], a: 1, e: 'Respons cepat tanpa dipikirkan terlebih dahulu adalah gerak refleks.' },
  { q: 'Tulang disebut alat gerak pasif karena ...', o: ['Tidak dapat bergerak sendiri', 'Tidak memiliki sendi', 'Berada di dalam tubuh', 'Tidak keras'], a: 0, e: 'Tulang baru bergerak setelah ditarik oleh otot, yaitu alat gerak aktif.' },
  { q: 'Retakan halus pada tulang tanpa membuat tulang terpisah disebut ...', o: ['Fraktur', 'Fisura', 'Artritis', 'Skoliosis'], a: 1, e: 'Fisura adalah retak tulang; pada fraktur tulang patah dan terpisah.' },
  { q: 'Artritis adalah kelainan berupa ...', o: ['Tulang belakang membungkuk', 'Peradangan pada sendi', 'Retak pada tulang', 'Otot yang kaku karena lelah'], a: 1, e: 'Artritis adalah radang sendi: sendi nyeri, bengkak, dan kaku karena tulang rawan rusak.' },
  { q: 'Bagian otak yang mengatur keseimbangan dan koordinasi gerak adalah ...', o: ['Otak besar', 'Otak kecil', 'Batang otak', 'Sumsum tulang belakang'], a: 1, e: 'Otak kecil (serebelum) menjaga keseimbangan, misalnya saat bersepeda.' },
  { q: 'Detak jantung dan pernapasan diatur oleh ...', o: ['Otak besar', 'Otak kecil', 'Batang otak', 'Lobus oksipital'], a: 2, e: 'Batang otak (terutama sumsum lanjutan) mengatur kegiatan tidak sadar seperti detak jantung dan napas.' },
  { q: 'Pusat berpikir, ingatan, dan kecerdasan terletak di ...', o: ['Otak besar', 'Otak kecil', 'Batang otak', 'Saraf tepi'], a: 0, e: 'Otak besar (serebrum) adalah pusat berpikir, ingatan, dan gerak sadar.' },
  { q: 'Sendi pada bahu dan pangkal paha yang dapat bergerak ke segala arah disebut sendi ...', o: ['Engsel', 'Peluru', 'Putar', 'Mati'], a: 1, e: 'Sendi peluru memiliki bonggol bulat dalam mangkuk sendi sehingga bisa bergerak ke segala arah.' },
  { q: 'Tulang tengkorak dan tulang rusuk termasuk tulang ...', o: ['Pipa', 'Pendek', 'Pipih', 'Sesamoid'], a: 2, e: 'Tulang pipih berbentuk lebar dan tipis, berfungsi melindungi organ penting.' },
  { q: 'Tempurung lutut (patela) adalah contoh tulang ...', o: ['Sesamoid', 'Pipa', 'Tidak beraturan', 'Pipih'], a: 0, e: 'Tulang sesamoid kecil, bulat seperti biji wijen, dan tumbuh di dalam tendon.' },
  { q: 'Otot yang bercabang, lurik, dan bekerja tidak sadar tanpa lelah adalah otot ...', o: ['Rangka', 'Polos', 'Jantung', 'Biseps'], a: 2, e: 'Otot jantung lurik dan bercabang, tetapi bekerja tidak sadar dan terus-menerus.' },
  { q: 'Tulang belakang yang melengkung ke samping seperti huruf S disebut ...', o: ['Kifosis', 'Lordosis', 'Skoliosis', 'Osteoporosis'], a: 2, e: 'Skoliosis adalah kelainan lengkung tulang belakang ke arah samping.' }
];
const BEST_KEY = 'neuromotion-best';
let qi = 0, score = 0;

function quizStart() {
  const best = +localStorage.getItem(BEST_KEY) || 0;
  $('#quiz').innerHTML =
    '<h3>Siap menguji pemahamanmu?</h3>' +
    '<p>Kuis berisi ' + QUIZ.length + ' soal tentang sistem saraf, bagian otak, jenis tulang, sendi, otot, gerak refleks, fisura, dan artritis. Setiap jawaban langsung diperiksa dan diberi penjelasan.</p>' +
    (best ? '<p><b>Skor terbaikmu:</b> ' + best + ' dari ' + QUIZ.length + '</p>' : '') +
    '<button class="primary-btn" id="qStart">Mulai kuis</button>';
  $('#qStart').addEventListener('click', () => { qi = 0; score = 0; ask(); });
}

function ask() {
  const box = $('#quiz');
  if (qi >= QUIZ.length) return finish();
  const c = QUIZ[qi];
  box.innerHTML =
    '<div class="bar"><i style="width:' + (qi / QUIZ.length * 100) + '%"></i></div>' +
    '<div class="qmeta"><span>Soal ' + (qi + 1) + ' dari ' + QUIZ.length + '</span><span>Skor: ' + score + '</span></div>' +
    '<h3 style="margin-top:.8rem">' + c.q + '</h3>' +
    c.o.map((o, i) => '<button class="opt" data-i="' + i + '">' + String.fromCharCode(65 + i) + '. ' + o + '</button>').join('') +
    '<p class="fb" aria-live="polite"></p>' +
    '<button id="next" class="primary-btn" hidden>' + (qi === QUIZ.length - 1 ? 'Lihat skor' : 'Soal berikutnya →') + '</button>';

  $$('.opt', box).forEach(b => b.addEventListener('click', () => {
    const pick = +b.dataset.i, right = pick === c.a;
    $$('.opt', box).forEach((x, j) => {
      x.disabled = true;
      if (j === c.a) x.classList.add('ok');
      else if (j === pick) x.classList.add('no');
    });
    if (right) score++;
    const fb = $('.fb', box);
    fb.className = 'fb ' + (right ? 'good' : 'bad');
    fb.textContent = (right ? '✔ Benar! ' : '✘ Belum tepat. ') + c.e;
    $('#next').hidden = false;
    $('#next').focus();
  }));
  $('#next').addEventListener('click', () => { qi++; ask(); });
}

function finish() {
  const best = Math.max(score, +localStorage.getItem(BEST_KEY) || 0);
  localStorage.setItem(BEST_KEY, best);
  const pct = score / QUIZ.length;
  const msg = pct === 1 ? 'Sempurna! Kamu menguasai seluruh materi.'
    : pct >= .7 ? 'Hebat! Kamu sudah paham hubungan sistem saraf dan sistem gerak.'
    : 'Ayo baca lagi modul materi dan coba simulasinya, lalu ulangi kuis.';
  $('#quiz').innerHTML =
    '<div class="bar"><i style="width:100%"></i></div>' +
    '<h3>Hasil kuis</h3><div class="score-big">' + score + '/' + QUIZ.length + '</div>' +
    '<p>' + msg + '</p><p><b>Skor terbaik:</b> ' + best + ' dari ' + QUIZ.length + '</p>' +
    '<div class="tabs"><button class="primary-btn" id="again">Ulangi kuis</button><a class="btn ghost" href="#materi">Kembali ke materi</a></div>';
  $('#again').addEventListener('click', () => { qi = 0; score = 0; ask(); });
}
quizStart();

/* ---------------------------------------------------------
   6. MODEL 3D (Three.js)
   Bentuk tulang, organ, otak, dan otot memakai data anatomi asli
   BodyParts3D (© 2008 Life Science Integrated Database Center, CC BY-SA 2.1 JP)
   yang sudah disederhanakan dan dikemas di folder models/.
   --------------------------------------------------------- */
const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const viewers = [];

function mat(color, extra) {
  const c = color.startsWith('--') ? cssVar(color) : color;
  return new THREE.MeshStandardMaterial(Object.assign({ color: new THREE.Color(c), roughness: .55, metalness: .05 }, extra || {}));
}
function glass(color, opacity) {
  return mat(color, { transparent: true, opacity, depthWrite: false });
}
function mesh(geo, m, x = 0, y = 0, z = 0) {
  const o = new THREE.Mesh(geo, m);
  o.position.set(x, y, z);
  return o;
}
const v3 = p => new THREE.Vector3(p[0], p[1], p[2] || 0);
function tube(points, r, m, seg = 48) {
  return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(v3)), seg, r, 8, false), m);
}

/* warna mirip aslinya */
const COL = {
  bone: '#e9e0c9', skin: '#e3a985', heart: '#a8283a', lung: '#e3909c', liver: '#7b2c24', gall: '#5d8a3c',
  stomach: '#d48a7c', gut: '#e2a88a', colon: '#c7896d', kidney: '#8f3a2f', pancreas: '#e6c37e', spleen: '#6e2b42',
  bladder: '#d8a671', airway: '#dbc7b9', eye: '#f1f1ee', brain: '#e7bcb2', cord: '#f3e4b8', nerve: '#f5c542',
  muscle: '#b53a30', disc: '#a6d6e6', cart: '#8fd0f0'
};

/* ---------- Pemuat model anatomi (models/*.bin) ---------- */
const packCache = {};
function pack(name) {
  if (!packCache[name]) {
    packCache[name] = fetch('models/' + name + '.bin')
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.arrayBuffer(); })
      .then(buf => {
        const hl = new DataView(buf).getUint32(4, true);
        const head = JSON.parse(new TextDecoder().decode(new Uint8Array(buf, 8, hl)));
        head.parts.forEach(p => { p.buf = buf; p.base = 8 + hl; });
        return head.parts;
      });
  }
  return packCache[name];
}

/* geometri satu bagian tubuh (dibuat sekali, dipakai ulang) */
function geo(p) {
  if (p.geo) return p.geo;
  const q = new Uint16Array(p.buf, p.base + p.p, p.v * 3), pos = new Float32Array(p.v * 3);
  for (let i = 0; i < pos.length; i++) { const a = i % 3; pos[i] = p.min[a] + q[i] / 65535 * (p.max[a] - p.min[a]); }
  const idx = p.w === 4 ? new Uint32Array(p.buf, p.base + p.i, p.t * 3) : new Uint16Array(p.buf, p.base + p.i, p.t * 3);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setIndex(new THREE.BufferAttribute(idx, 1));
  g.computeVertexNormals(); g.computeBoundingBox(); g.computeBoundingSphere();
  return (p.geo = g);
}
const pick = (parts, re, not) => parts.filter(p => re.test(p.n) && !(not && not.test(p.n)));
const one = (parts, name) => parts.find(p => p.n === name);
function partBox(list) {
  const b = new THREE.Box3();
  list.forEach(p => { b.expandByPoint(v3(p.min)); b.expandByPoint(v3(p.max)); });
  return b;
}
const boxC = b => b.getCenter(new THREE.Vector3());
const boxS = b => b.getSize(new THREE.Vector3());
function group(list, m) {
  const g = new THREE.Group();
  list.forEach(p => { const o = new THREE.Mesh(geo(p), typeof m === 'function' ? m(p) : m); o.userData.part = p; g.add(o); });
  return g;
}
/* bagian geometri: hanya segitiga yang lolos filter (titik tengah segitiga) */
function subGeo(g, keep) {
  const pos = g.attributes.position, idx = g.index.array, out = [];
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const nrm = new THREE.Vector3(), e = new THREE.Vector3();
  for (let i = 0; i < idx.length; i += 3) {
    a.fromBufferAttribute(pos, idx[i]); b.fromBufferAttribute(pos, idx[i + 1]); c.fromBufferAttribute(pos, idx[i + 2]);
    nrm.subVectors(c, a).cross(e.subVectors(b, a).negate()).normalize();
    if (keep(a.add(b).add(c).divideScalar(3), nrm)) out.push(idx[i], idx[i + 1], idx[i + 2]);
  }
  const n = new THREE.BufferGeometry();
  n.setAttribute('position', pos); n.setAttribute('normal', g.attributes.normal);
  n.setIndex(out); n.computeBoundingSphere();
  return n;
}
/* salinan geometri yang "digembungkan" sepanjang normal (untuk lapisan tulang rawan) */
function inflate(g, d) {
  const n = g.clone(), p = n.attributes.position, nn = n.attributes.normal;
  for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) + nn.getX(i) * d, p.getY(i) + nn.getY(i) * d, p.getZ(i) + nn.getZ(i) * d);
  return n;
}
/* titik di permukaan mesh: tembakkan sinar dari dalam ke arah luar */
const ray = new THREE.Raycaster();
function surfaceHit(g, from, dir) {
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
  ray.set(from, dir.clone().normalize());
  const h = ray.intersectObject(m);
  return h.length ? h[h.length - 1].point : null;
}
function hitsAlong(g, from, dir) {
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
  ray.set(from, dir.clone().normalize());
  return ray.intersectObject(m).map(h => h.point);
}
/* garis tengah tulang panjang: rata-rata titik per irisan tinggi */
function centerline(p, n = 10, from = 0, to = 1) {
  const pos = geo(p).attributes.position, y0 = p.min[1], h = p.max[1] - p.min[1];
  const acc = Array.from({ length: n }, () => [0, 0, 0, 0]);
  for (let i = 0; i < pos.count; i++) {
    const t = (pos.getY(i) - y0) / h;
    if (t < from || t > to) continue;
    const k = Math.min(n - 1, Math.floor((t - from) / (to - from) * n));
    acc[k][0] += pos.getX(i); acc[k][1] += pos.getY(i); acc[k][2] += pos.getZ(i); acc[k][3]++;
  }
  return acc.filter(a => a[3]).map(a => new THREE.Vector3(a[0] / a[3], a[1] / a[3], a[2] / a[3])).sort((a, b) => b.y - a.y);
}
/* rata-rata titik di sekitar ketinggian tertentu (0 = bawah, 1 = atas) */
function sliceCenter(p, t0, t1) {
  const pos = geo(p).attributes.position, y0 = p.min[1], h = p.max[1] - p.min[1], c = new THREE.Vector3();
  let n = 0;
  for (let i = 0; i < pos.count; i++) {
    const t = (pos.getY(i) - y0) / h;
    if (t >= t0 && t <= t1) { c.x += pos.getX(i); c.y += pos.getY(i); c.z += pos.getZ(i); n++; }
  }
  return n ? c.divideScalar(n) : boxC(partBox([p]));
}
/* letak saluran sumsum di dalam ruas tulang belakang */
function canal(p) {
  const b = partBox([p]), c = boxC(b), h = b.max.y - b.min.y, zs = [];
  [-.25, -.12, 0, .12, .25].forEach(o => [-.03, 0, .03].forEach(dx => {
    const hits = hitsAlong(geo(p), new THREE.Vector3(c.x + dx, c.y + o * h, b.max.z + 1), new THREE.Vector3(0, 0, -1));
    if (hits.length >= 3) zs.push((hits[1].z + hits[2].z) / 2);
  }));
  zs.sort((a, b) => a - b);
  const z = zs.length ? zs[zs.length >> 1] : b.max.z - (b.max.z - b.min.z) * .45;
  return new THREE.Vector3(c.x, c.y, z);
}
/* haluskan deret titik (rata-rata tetangga), ujung tetap */
const smooth = pts => pts.map((v, i) => i === 0 || i === pts.length - 1 ? v : v.clone().multiplyScalar(2).add(pts[i - 1]).add(pts[i + 1]).divideScalar(4));
/* letakkan sekumpulan objek di dalam "holder": dipusatkan & diskalakan */
function place(holder, obj, box, maxW, maxH, round = true) {
  const s = boxS(box), c = boxC(box);
  const w = round ? Math.max(s.x, s.z) : s.x;
  const k = Math.min(maxW / w, maxH / s.y);
  const inner = new THREE.Group();
  inner.scale.setScalar(k);
  inner.position.copy(c).multiplyScalar(-k);
  inner.add(obj); holder.add(inner);
  return { k, c, at: r => r.clone().sub(c).multiplyScalar(k) };
}

/**
 * Membuat satu penampil 3D.
 */
function viewer(name, opt, build) {
  const el = document.querySelector('[data-scene="' + name + '"]');
  if (!el) return;
  if (typeof THREE === 'undefined') {
    el.innerHTML = '<p class="msg">Model 3D membutuhkan koneksi internet untuk memuat Three.js. Sambungkan internet lalu muat ulang halaman.</p>';
    return;
  }
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
  catch (e) { el.innerHTML = '<p class="msg">Browser ini tidak mendukung grafik 3D (WebGL).</p>'; return; }

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(38, 1, .1, 400);
  const g = new THREE.Group();
  scene.add(g);
  scene.add(new THREE.HemisphereLight(0xfff6ec, 0x1a2633, .8));
  const key = new THREE.DirectionalLight(0xffffff, .85); key.position.set(4, 7, 9); scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fdcff, .45); rim.position.set(-6, 2, -6); scene.add(rim);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  el.appendChild(renderer.domElement);
  const interactive = opt.interactive !== false;
  if (interactive) {
    const hint = document.createElement('span'); hint.className = 'hint'; hint.textContent = '↔ geser untuk memutar'; el.appendChild(hint);
  }
  const loading = document.createElement('div'); loading.className = 'loading'; loading.textContent = 'Memuat model 3D…'; el.appendChild(loading);

  const st = { visible: false, ready: false, w: 0, h: 0, drag: false, idleAt: 0 };
  const api = {
    g, rot: [g], labels: [], tick: null, renderer,
    label(text, x, y, z = 0, parent) {
      const d = document.createElement('div');
      d.className = 'lb'; d.textContent = text; el.appendChild(d);
      const l = { d, v: new THREE.Vector3(x, y, z), parent, show: true };
      api.labels.push(l);
      return l;
    },
    frame(hw, hh, cy) { opt.hw = hw; opt.hh = hh; if (cy !== undefined) opt.cy = cy; fit(); }
  };

  const tanHalf = Math.tan(19 * Math.PI / 180);
  function fit() {
    st.w = el.clientWidth; st.h = el.clientHeight;
    if (!st.w || !st.h) return;
    renderer.setSize(st.w, st.h, false);
    cam.aspect = st.w / st.h;
    const cy = opt.cy || 0;
    const z = Math.max(opt.hh / tanHalf, opt.hw / (tanHalf * cam.aspect)) * 1.08 * (opt.zoom || 1);
    cam.position.set(0, cy, z);
    cam.lookAt(0, cy, 0);
    cam.updateProjectionMatrix();
  }
  new ResizeObserver(fit).observe(el);
  new IntersectionObserver(es => es.forEach(e => { st.visible = e.isIntersecting; })).observe(el);
  fit();

  Promise.resolve().then(() => build(api)).then(() => {
    loading.remove();
    st.ready = true;
  }).catch(err => {
    console.error(name, err);
    loading.textContent = 'Model 3D gagal dimuat. Periksa koneksi internet lalu muat ulang halaman.';
    loading.classList.add('err');
  });

  let lx = 0, ly = 0;
  if (interactive) {
    el.addEventListener('pointerdown', e => { st.drag = true; lx = e.clientX; ly = e.clientY; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', e => {
      if (!st.drag) return;
      const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
      api.rot.forEach(o => { o.rotation.y += dx * .01; });
      const tm = opt.tiltMax ?? .5;
      g.rotation.x = Math.max(-tm, Math.min(tm, g.rotation.x + dy * .006));
    });
    const end = () => { st.drag = false; st.idleAt = performance.now(); };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  st.render = t => {
    if (!st.ready) return;
    const idle = !st.drag && performance.now() - st.idleAt > 1800;
    if (idle && opt.auto !== false && !reduceMotion) api.rot.forEach(o => { o.rotation.y += .005; });
    if (api.tick) api.tick(t);
    scene.updateMatrixWorld(true);
    renderer.render(scene, cam);
    api.labels.forEach(l => {
      l.d.style.display = l.show ? '' : 'none';
      if (!l.show) return;
      const m = (l.parent || g).matrixWorld;
      const p = l.v.clone().applyMatrix4(m).project(cam);
      l.d.style.left = ((p.x + 1) / 2 * st.w) + 'px';
      l.d.style.top = ((1 - p.y) / 2 * st.h) + 'px';
    });
  };
  viewers.push(st);
}

function loop(ms) {
  const t = ms / 1000;
  viewers.forEach(v => { if (v.visible && v.w) v.render(t); });
  requestAnimationFrame(loop);
}
/* Mulai render loop agar semua kanvas 3D benar-benar tampil. */
requestAnimationFrame(loop);

/* sorotan bagian dengan warna asli */
function highlighter(groups, hi, allTint = 0) {
  for (const k in groups) groups[k].forEach(m => {
    m.userData.base = m.color.clone();
    m.userData.hi = new THREE.Color(hi[k].startsWith('--') ? cssVar(hi[k]) : hi[k]);
    m.userData.op = m.opacity;
    m.userData.dw = m.depthWrite;
    m.transparent = true;
  });
  const tmp = new THREE.Color();
  return (key, t) => {
    for (const k in groups) {
      const on = key === 'semua' || key === k;
      const tint = key === 'semua' ? allTint : on ? .45 + .2 * Math.sin(t * 4) : 0;
      groups[k].forEach(m => {
        tmp.copy(m.userData.base).lerp(m.userData.hi, tint);
        m.color.lerp(tmp, .15);
        m.opacity += ((on ? 1 : .13) * m.userData.op - m.opacity) * .12;
        m.depthWrite = m.userData.dw && m.opacity > .6;
      });
    }
  };
}

/* ---------- Tubuh manusia utuh (Beranda & Materi) ---------- */
const RE = {
  cranium: /^(frontal bone|left parietal bone|right parietal bone|occipital bone|left temporal bone|right temporal bone|sphenoid bone|ethmoid)$/,
  spineBone: /^(?!intervertebral).*vertebra$|^atlas$|^axis$|^sacrum$/,
  vertebra: /^(?!intervertebral).*vertebra$|^atlas$|^axis$/,
  disc: /^intervertebral disk/,
  brainStem: /^(pons|medulla oblongata|midbrain, nsn|peduncle of midbrain)$/
};
function organColor(n) {
  if (/heart/.test(n)) return COL.heart;
  if (/lung/.test(n)) return COL.lung;
  if (/liver/.test(n)) return COL.liver;
  if (/gallbladder/.test(n)) return COL.gall;
  if (/stomach/.test(n)) return COL.stomach;
  if (/colon|rectum|appendix/.test(n)) return COL.colon;
  if (/duodenum|jejunum|ileum/.test(n)) return COL.gut;
  if (/kidney/.test(n)) return COL.kidney;
  if (/pancreas/.test(n)) return COL.pancreas;
  if (/spleen/.test(n)) return COL.spleen;
  if (/bladder/.test(n)) return COL.bladder;
  if (/eyeball/.test(n)) return COL.eye;
  return COL.airway;
}

/* jalur saraf tepi mengikuti kerangka asli */
function nervePaths(sk, cord) {
  const B = n => one(sk, n), C = n => boxC(partBox([B(n)]));
  const canalOf = n => canal(B(n));
  const paths = [], main = [];
  ['left', 'right'].forEach(side => {
    const s = side === 'left' ? 1 : -1;
    const hum = centerline(B(side + ' humerus'), 8);
    const fore = centerline(B(side + ' ulna'), 6).map((u, i, a) => {
      const r = centerline(B(side + ' radius'), a.length)[i] || u;
      return u.clone().lerp(r, .5);
    });
    const med = v => v.clone().add(new THREE.Vector3(-s * .12, 0, .06));
    const arm = [canalOf('sixth cervical vertebra'), C(side + ' clavicle').add(new THREE.Vector3(0, -.15, -.15)),
      ...hum.slice(1).map(med), ...fore.slice(1, -1).map(v => v.clone().add(new THREE.Vector3(0, 0, .08))),
      C(side + ' capitate'), C(side + ' third metacarpal bone'),
      C('proximal phalanx of ' + side + ' middle finger'), C('distal phalanx of ' + side + ' middle finger')];
    paths.push(arm); main.push(arm);
    const fem = centerline(B(side + ' femur'), 8).map(v => v.clone().add(new THREE.Vector3(0, 0, -.22)));
    const tib = centerline(B(side + ' tibia'), 7).map(v => v.clone().add(new THREE.Vector3(0, 0, -.18)));
    const sac = C('sacrum'), hip = partBox([B(side + ' hip bone')]);
    const leg = [canalOf('fifth lumbar vertebra'), new THREE.Vector3(sac.x + s * .45, sac.y - .2, sac.z - .1),
      new THREE.Vector3(boxC(hip).x, hip.min.y + .6, hip.min.z + .35), ...fem.slice(1), ...tib.slice(1, -1),
      C(side + ' talus').add(new THREE.Vector3(0, 0, -.1)), C(side + ' calcaneus').add(new THREE.Vector3(0, .1, .25)),
      C(side + ' second metatarsal bone'), C('proximal phalanx of ' + side + ' second toe')];
    paths.push(leg); main.push(leg);
    ['third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'].forEach(nm => {
      const rib = B(side + ' ' + nm + ' rib');
      if (!rib) return;
      const pos = geo(rib).attributes.position, rb = partBox([rib]);
      const cz = boxC(rb).z, bins = Array.from({ length: 12 }, () => [0, 0, 0, 0]);
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), z = pos.getZ(i);
        const a = Math.atan2(z - cz, Math.abs(x));
        const k = Math.max(0, Math.min(11, Math.floor((a + Math.PI / 2) / Math.PI * 12)));
        bins[k][0] += x; bins[k][1] += pos.getY(i); bins[k][2] += z; bins[k][3]++;
      }
      const pts = bins.filter(b => b[3] > 4).map(b => new THREE.Vector3(b[0] / b[3], b[1] / b[3] - .07, b[2] / b[3]));
      if (pts.length < 3) return;
      pts.unshift(canalOf(nm + ' thoracic vertebra'));
      paths.push(pts);
    });
  });
  const c1 = cord[0];
  [1, -1].forEach(s => paths.push([c1, c1.clone().add(new THREE.Vector3(s * .35, .1, .35)), c1.clone().add(new THREE.Vector3(s * .55, .55, .8))]));
  return { paths, main };
}

async function buildHuman(api, mode) {
  const [sk, or, br] = await Promise.all([pack('skeleton'), pack('organs'), pack('brain')]);
  const hero = mode === 'hero';
  const L = {};
  const content = new THREE.Group();

  const skinM = glass(COL.skin, hero ? .17 : .1);
  L.kulit = group([one(or, 'skin')], skinM);
  L.kulit.renderOrder = 3;

  const boneM = hero ? mat(COL.bone, { roughness: .65 }) : glass(COL.bone, .28);
  const boneGlass = glass(COL.bone, hero ? .3 : .22);
  const discM = hero ? mat(COL.disc, { roughness: .4 }) : glass(COL.disc, .3);
  L.kerangka = group(sk, p => p.g === 'disc' ? discM : RE.cranium.test(p.n) || (hero && RE.spineBone.test(p.n)) ? boneGlass : boneM);

  const organMats = {};
  const organList = or.filter(p => p.n !== 'skin');
  L.organ = group(organList, p => {
    const c = organColor(p.n);
    return organMats[c] || (organMats[c] = hero ? mat(c, { roughness: .5 }) : glass(c, .2));
  });

  const parts = {
    otak: mat(COL.brain, { roughness: .6, emissive: new THREE.Color(cssVar('--nerve')), emissiveIntensity: hero ? .08 : .2, transparent: true }),
    sumsum: mat(COL.cord, { emissive: new THREE.Color(cssVar('--bone')), emissiveIntensity: .2, transparent: true }),
    tepi: mat(COL.nerve, { emissive: new THREE.Color('#f5b82e'), emissiveIntensity: .2, transparent: true })
  };
  L.saraf = new THREE.Group();
  L.saraf.add(group(br, parts.otak));

  const verts = pick(sk, RE.vertebra).sort((a, b) => b.max[1] - a.max[1]);
  const l1 = verts.findIndex(p => p.n === 'first lumbar vertebra');
  const med = partBox([one(br, 'medulla oblongata')]);
  const cordPts = smooth(smooth([new THREE.Vector3(boxC(med).x, med.min.y + .15, boxC(med).z), ...verts.slice(0, l1 + 1).map(canal)]));
  const cordEnd = canal(verts[l1 + 1]);
  L.saraf.add(tube([...cordPts, cordEnd].map(v => v.toArray()), .045, parts.sumsum, 120));

  const np = nervePaths(sk, cordPts.slice(1));
  np.paths.forEach(p => L.saraf.add(tube(p.map(v => v.toArray()), np.main.includes(p) ? .03 : .016, parts.tepi, 64)));
  const sparkM = mat('#fff1b8', { emissive: new THREE.Color('#ffcc33'), emissiveIntensity: 1.3 });
  const sparks = np.main.map((p, i) => {
    const sp = mesh(new THREE.SphereGeometry(.07, 10, 8), sparkM);
    L.saraf.add(sp);
    return { sp, curve: new THREE.CatmullRomCurve3(p), off: i * .23 };
  });

  content.add(L.saraf, L.organ, L.kerangka, L.kulit);
  const box = partBox([one(or, 'skin')]), c = boxC(box), s = boxS(box);
  content.position.copy(c).negate();
  api.g.add(content);
  api.frame(s.x / 2 * .92, s.y / 2 * 1.02, 0);
  const at = (v, dx = 0, dy = 0, dz = 0) => [v.x - c.x + dx, v.y - c.y + dy, v.z - c.z + dz];
  return { L, parts, sparks, at, sk, or, br, cordPts };
}

/* Beranda: tubuh utuh dengan lapisan yang bisa diatur */
viewer('hero', { hw: 3.4, hh: 8.4 }, async api => {
  const h = await buildHuman(api, 'hero');
  const ctr = list => boxC(partBox(list));
  const lab = (t, list, layer, dx, dy = 0) => Object.assign(api.label(t, ...h.at(ctr(list), dx, dy)), { layer });
  const labels = [
    lab('Otak', h.br, 'saraf', 0, 1.1),
    lab('Paru-paru', pick(h.or, /lung/), 'organ', 1.5, .9),
    lab('Jantung', pick(h.or, /heart/), 'organ', -.9, .2),
    lab('Hati', pick(h.or, /^liver$/), 'organ', -1.3, -.2),
    lab('Lambung', pick(h.or, /^stomach$/), 'organ', .6, -.15),
    lab('Usus', pick(h.or, /colon|jejunum|ileum/), 'organ', 0, -.6),
    lab('Tulang paha', pick(h.sk, /^right femur$/), 'kerangka', -1.1, 0),
    lab('Saraf tepi', pick(h.sk, /^left ulna$/), 'saraf', 1.1, 0)
  ];
  const on = { kulit: true, kerangka: true, organ: true, saraf: true };
  $$('#layers button').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.layer;
    on[k] = !on[k];
    b.classList.toggle('sel', on[k]);
    b.setAttribute('aria-pressed', String(on[k]));
    h.L[k].visible = on[k];
    labels.forEach(l => { l.show = on[l.layer]; });
  }));
  api.tick = t => {
    h.sparks.forEach(s => s.sp.position.copy(s.curve.getPointAt((t * .25 + s.off) % 1)));
    h.parts.otak.emissiveIntensity = .08 + .08 * Math.sin(t * 2);
  };
});

/* Materi: sistem saraf dengan sorotan bagian */
const BUILD_body = async api => {
  const h = await buildHuman(api, 'saraf');
  api.label('Otak', ...h.at(boxC(partBox(h.br)), 0, 1.1));
  api.label('Sumsum tulang belakang', ...h.at(h.cordPts[12], -1.9, 0));
  api.label('Saraf tepi', ...h.at(boxC(partBox(pick(h.sk, /^left humerus$/))), 1.0, -.5));
  const keys = ['otak', 'sumsum', 'tepi'];
  api.tick = t => {
    keys.forEach(k => {
      const on = bodyFocus === k;
      const target = on ? .55 + .3 * Math.sin(t * 4) : .03;
      const m = h.parts[k];
      m.emissiveIntensity += (target - m.emissiveIntensity) * .12;
      m.opacity += ((on ? 1 : .25) - m.opacity) * .12;
      m.depthWrite = m.opacity > .6;
    });
    const showSpark = bodyFocus === 'tepi';
    h.sparks.forEach(s => { s.sp.visible = showSpark; s.sp.position.copy(s.curve.getPointAt((t * .25 + s.off) % 1)); });
  };
};
viewer('body', { hw: 3.4, hh: 8.4 }, BUILD_body);

/* Kartu Beranda: model rangka manusia normal yang dirender langsung dan dapat diputar. */
viewer('homeNormalSkeleton', { hw: 3.4, hh: 8.4, auto: false, interactive: false, zoom: .72 }, async api => {
  const sk = await pack('skeleton');
  const bone = mat(COL.bone, { roughness: .65 });
  place(api.g, group(sk, bone), partBox(sk), 3.4, 8.4);
});

/* ---------- Bagian-bagian otak ---------- */
viewer('brain', { hw: 1.9, hh: 1.75 }, async api => {
  const br = await pack('brain');
  const kecil = pick(br, /^cerebellum$/), batang = pick(br, RE.brainStem);
  const besar = br.filter(p => !kecil.includes(p) && !batang.includes(p));
  const mB = mat(COL.brain, { roughness: .6 }), mK = mat('#dcaaa0', { roughness: .6 }), mT = mat('#e6cbb7', { roughness: .6 });
  const p = new THREE.Group(); p.rotation.y = -Math.PI / 2;
  api.g.add(p);
  const all = new THREE.Group();
  all.add(group(besar, mB), group(kecil, mK), group(batang, mT));
  const pl = place(p, all, partBox(br), 3.3, 3.1);
  const bB = partBox(besar), bK = partBox(kecil), bT = partBox(batang);
  api.label('Otak besar', ...pl.at(new THREE.Vector3(boxC(bB).x, bB.max.y + .12, boxC(bB).z)).toArray(), p);
  api.label('Otak kecil', ...pl.at(boxC(bK).add(new THREE.Vector3(0, -.3, -.45))).toArray(), p);
  api.label('Batang otak', ...pl.at(new THREE.Vector3(boxC(bT).x, bT.min.y + .1, bT.max.z + .35)).toArray(), p);
  api.label('Depan', ...pl.at(new THREE.Vector3(boxC(bB).x, boxC(bB).y, bB.max.z + .1)).toArray(), p);
  const focus = highlighter({ besar: [mB], kecil: [mK], batang: [mT] }, { besar: '--nerve', kecil: '--muscle', batang: '--bone' }, .65);
  api.tick = t => focus(brainFocus, t);
});

/* ---------- Jenis tulang berdasarkan bentuk ---------- */
viewer('bones', { hw: 7.6, hh: 2.3, cy: -.3 }, async api => {
  const sk = await pack('skeleton');
  const bone = () => mat(COL.bone, { roughness: .65 });
  const M = { pipa: [bone()], pipih: [bone()], pendek: [bone()], tidak: [bone()], sesamoid: [bone()] };
  const sets = {
    pipa: [one(sk, 'right femur')],
    pipih: [one(sk, 'right scapula')],
    pendek: pick(sk, /^right (scaphoid|lunate|triquetral|pisiform|trapezium|trapezoid|capitate|hamate)$/),
    tidak: [one(sk, 'third lumbar vertebra')],
    sesamoid: [one(sk, 'right patella')]
  };
  api.rot = [];
  const names = [['pipa', 'Pipa'], ['pipih', 'Pipih'], ['pendek', 'Pendek'], ['tidak', 'Tidak beraturan'], ['sesamoid', 'Sesamoid']];
  names.forEach(([k, n], i) => {
    const x = (i - 2) * 3;
    const h = new THREE.Group(); h.position.x = x;
    api.g.add(h); api.rot.push(h);
    const small = k === 'sesamoid';
    place(h, group(sets[k], M[k][0]), partBox(sets[k]), small ? 1.15 : 2.3, small ? 1.35 : 3.1);
    if (small) {
      const tendon = glass('#f4ead6', .35); M.sesamoid.push(tendon);
      h.add(tube([[0, 1.55, -.12], [0, .35, -.02], [0, -.35, -.02], [0, -1.55, -.12]], .3, tendon, 24));
      api.label('Tendon', .75, 1.2, 0, h);
    }
    api.label(n, x, -1.95);
  });
  const focus = highlighter(M, { pipa: '#fff6dc', pipih: '#fff6dc', pendek: '#fff6dc', tidak: '#fff6dc', sesamoid: '#fff6dc' });
  api.tick = t => focus(boneFocus, t);
});

/* ---------- Sendi (siku, bahu, leher) ---------- */
viewer('joints', { hw: 7.4, hh: 3, auto: false }, async api => {
  const sk = await pack('skeleton');
  const bn = mat(COL.bone, { roughness: .65 });
  const jm = glass('--nerve', .4);
  const B = n => one(sk, n);
  api.rot = [];
  const hum = B('right humerus');

  const hinge = new THREE.Group(); hinge.position.x = -5; hinge.rotation.y = Math.PI / 2;
  const E = sliceCenter(hum, 0, .06); E.y = hum.min[1] + .12;
  const elbow = new THREE.Group();
  const foreP = new THREE.Group(); foreP.position.copy(E);
  const fore = group([B('right ulna'), B('right radius')], bn); fore.position.copy(E).negate(); foreP.add(fore);
  elbow.add(group([hum], bn), foreP, mesh(new THREE.SphereGeometry(.32, 20, 14), jm, E.x, E.y, E.z));
  const hb = partBox([hum, B('right ulna'), B('right radius')]);
  const pH = place(hinge, elbow, hb, 3.4, 5);

  const ball = new THREE.Group(); ball.rotation.y = .5;
  const S = sliceCenter(hum, .93, 1); S.x += .07; S.y = hum.max[1] - .24;
  const shoulder = new THREE.Group();
  const armP = new THREE.Group(); armP.position.copy(S);
  const arm = group([hum], bn); arm.position.copy(S).negate(); armP.add(arm);
  shoulder.add(group([B('right scapula'), B('right clavicle')], bn), armP, mesh(new THREE.SphereGeometry(.3, 20, 14), jm, S.x, S.y, S.z));
  const pB = place(ball, shoulder, partBox([hum, B('right scapula'), B('right clavicle')]), 3.6, 5);

  const piv = new THREE.Group(); piv.position.x = 5; piv.rotation.y = .35;
  const skullList = pick(sk, /bone$|^ethmoid$|^mandible$|tooth$|nasal concha$/).filter(p => {
    const c = boxC(partBox([p])); return c.y > B('atlas').max[1] - .1 && Math.abs(c.x) < 1 && !/rib|scapula|clavicle|humerus|sternum|hip/.test(p.n);
  });
  const ax = B('axis');
  const D = sliceCenter(ax, .75, 1);
  const neck = new THREE.Group();
  const headP = new THREE.Group(); headP.position.copy(D);
  const head = group([...skullList, B('atlas')], bn); head.position.copy(D).negate(); headP.add(head);
  const lower = group([ax, B('third cervical vertebra'), B('fourth cervical vertebra')], bn);
  neck.add(headP, lower, mesh(new THREE.SphereGeometry(.22, 20, 14), jm, D.x, D.y, D.z));
  const pP = place(piv, neck, partBox([...skullList, ax, B('fourth cervical vertebra')]), 3.4, 5);

  api.g.add(hinge, ball, piv);
  api.rot.push(hinge, ball, piv);
  api.label('Sendi engsel (siku)', -5, -2.75);
  api.label('Sendi peluru (bahu)', 0, -2.75);
  api.label('Sendi putar (leher)', 5, -2.75);
  api.label('Atlas–aksis', ...pP.at(D).add(new THREE.Vector3(0, -.15, .9)).toArray(), piv);
  api.tick = t => {
    const s = reduceMotion ? 0 : t;
    foreP.rotation.x = -(.25 + .55 * (1 + Math.sin(s * 1.6)));
    armP.rotation.z = -(.35 + .3 * Math.sin(s * 1.3));
    armP.rotation.x = -.45 * Math.cos(s * .9);
    headP.rotation.y = .75 * Math.sin(s * 1.2);
  };
  void pH; void pB;
});

/* ---------- Lengan: biseps & triseps ---------- */
const BUILD_arm = async api => {
  const [sk, mu] = await Promise.all([pack('skeleton'), pack('muscles')]);
  const bn = mat(COL.bone, { roughness: .65 });
  const biM = mat(COL.muscle, { roughness: .5, emissive: new THREE.Color(cssVar('--muscle')), emissiveIntensity: 0 });
  const triM = mat(COL.muscle, { roughness: .5, emissive: new THREE.Color(cssVar('--muscle')), emissiveIntensity: 0 });
  const otherM = mat('#8e3a33', { roughness: .6 });
  const hum = one(sk, 'right humerus');
  const E = sliceCenter(hum, 0, .07); E.y = hum.min[1] + .13;
  const FLEX = 1.75;

  const root = new THREE.Group();
  root.add(group([hum], bn));
  const foreP = new THREE.Group(); foreP.position.copy(E);
  const foreList = pick(sk, /^right (ulna|radius|scaphoid|lunate|triquetral|pisiform|trapezium|trapezoid|capitate|hamate)$|^right .*metacarpal bone$|phalanx of right (thumb|index finger|middle finger|ring finger|little finger)$/);
  const fore = group(foreList, bn); fore.position.copy(E).negate(); foreP.add(fore);
  root.add(foreP);

  const deform = [];
  function addMuscle(list, m, kind) {
    list.forEach(p => {
      const g0 = geo(p), g = g0.clone();
      root.add(new THREE.Mesh(g, m));
      const b = partBox([p]);
      deform.push({ g, orig: g0.attributes.position.array.slice(), kind, b, c: boxC(b) });
    });
  }
  const bi = pick(mu, /of right biceps brachii$/), tri = pick(mu, /of right triceps brachii$/);
  addMuscle(bi, biM, 'bi');
  addMuscle(tri, triM, 'tri');
  addMuscle(pick(mu, /^right brachialis$/), otherM, 'x');
  let lastK = -1;
  function bend(k) {
    const a = -FLEX * k;
    deform.forEach(d => {
      const pos = d.g.attributes.position.array, o = d.orig, h = d.b.max.y - d.b.min.y;
      for (let i = 0; i < pos.length; i += 3) {
        let x = o[i], y = o[i + 1], z = o[i + 2];
        const u = Math.min(1, Math.max(0, (y - d.b.min.y) / h)), bell = Math.pow(Math.sin(Math.PI * u), 2);
        const f = d.kind === 'bi' ? 1 + .38 * k * bell : d.kind === 'tri' ? 1 + .14 * (1 - k) * bell - .06 * k * bell : 1 + .1 * k * bell;
        x = d.c.x + (x - d.c.x) * f; z = d.c.z + (z - d.c.z) * f;
        let w = Math.min(1, Math.max(0, (E.y + .3 - y) / .45)); w = w * w * (3 - 2 * w);
        const ang = a * w, cs = Math.cos(ang), sn = Math.sin(ang), dy = y - E.y, dz = z - E.z;
        pos[i] = x; pos[i + 1] = E.y + dy * cs - dz * sn; pos[i + 2] = E.z + dy * sn + dz * cs;
      }
      d.g.attributes.position.needsUpdate = true;
      d.g.computeVertexNormals();
    });
    foreP.rotation.x = a;
  }

  root.rotation.x = -Math.PI / 2;
  const holder = new THREE.Group(); holder.rotation.y = Math.PI / 2; holder.add(root);
  const frameBox = new THREE.Box3();
  [0, 1].forEach(k => { bend(k); holder.updateMatrixWorld(true); frameBox.union(new THREE.Box3().setFromObject(holder)); });
  bend(0);
  const c = boxC(frameBox), s = boxS(frameBox);
  holder.position.set(-c.x, -c.y, -c.z);
  api.g.add(holder);
  api.frame(s.x / 2 * 1.02, s.y / 2 * 1.1, 0);
  api.g.rotation.y = -.25;

  const cb = boxC(partBox(bi)), ct = boxC(partBox(tri));
  api.label('Biseps', cb.x, cb.y, cb.z + .55, root);
  api.label('Triseps', ct.x, ct.y + .7, ct.z - .6, root);
  api.label('Siku (sendi engsel)', E.x, E.y - .05, E.z - .55, root);
  api.tick = () => {
    armK += (armTarget - armK) * .08;
    if (Math.abs(armK - lastK) > .0005) { bend(armK); lastK = armK; }
    biM.emissiveIntensity = .45 * armK;
    triM.emissiveIntensity = .45 * (1 - armK);
  };
};
viewer('arm', { hw: 4.6, hh: 2.6, auto: false }, BUILD_arm);
setArm(false);

/* ---------- Letak tiga jenis otot di tubuh ---------- */
viewer('muscleOrgans', { hw: 7.2, hh: 2.25, cy: -.2 }, async api => {
  const [sk, mu, or] = await Promise.all([pack('skeleton'), pack('muscles'), pack('organs')]);
  const bn = mat(COL.bone, { roughness: .65 });
  const mR = mat(COL.muscle, { roughness: .5 }), mP = mat(COL.stomach, { roughness: .5 }), mJ = mat(COL.heart, { roughness: .45 });
  api.rot = [];
  const mk = (x, ry) => { const h = new THREE.Group(); h.position.x = x; h.rotation.y = ry; api.g.add(h); api.rot.push(h); return h; };
  const armBones = [one(sk, 'right humerus'), one(sk, 'right ulna'), one(sk, 'right radius')];
  const armMus = pick(mu, /of right (biceps|triceps) brachii$|^right brachialis$|^right coracobrachialis$/);
  const armG = new THREE.Group(); armG.add(group(armBones, bn), group(armMus, mR));
  place(mk(-4.9, Math.PI / 2.4), armG, partBox([...armBones, ...armMus]), 2.6, 3.6);
  place(mk(0, 0), group([one(or, 'stomach')], mP), partBox([one(or, 'stomach')]), 2.8, 3);
  place(mk(4.9, 0), group([one(or, 'wall of heart')], mJ), partBox([one(or, 'wall of heart')]), 2.6, 3);
  api.label('Otot rangka', -4.9, -2.05);
  api.label('Otot polos', 0, -2.05);
  api.label('Otot jantung', 4.9, -2.05);
  const focus = highlighter({ rangka: [mR], polos: [mP], jantung: [mJ] }, { rangka: '--muscle', polos: '--muscle', jantung: '--muscle' });
  api.tick = t => focus(muscleFocus, t);
});

/* ---------- Kelainan tulang belakang ---------- */
const BUILD_spine = async api => {
  const sk = await pack('skeleton');
  const list = pick(sk, RE.spineBone).concat(pick(sk, RE.disc));
  const spineBox = partBox(list), fullBox = partBox(sk);
  const top = spineBox.max.y, H = spineBox.max.y - spineBox.min.y;
  const A = .6;
  const gauss = (t, m, w) => Math.exp(-Math.pow((t - m) / w, 2));
  const defs = [
    ['Normal', () => [0, 0], -Math.PI / 2],
    ['Skoliosis', t => { const u = Math.min(1, t / .9); return [A * Math.sin(2 * Math.PI * u) * Math.sin(Math.PI * u), 0]; }, 0],
    ['Kifosis', t => [0, -A * 1.05 * gauss(t, .4, .17)], -Math.PI / 2],
    ['Lordosis', t => [0, A * .95 * gauss(t, .78, .11)], -Math.PI / 2]
  ];
  const bone = new THREE.Color(COL.bone), bad = new THREE.Color(cssVar('--muscle'));
  const discM = mat(COL.disc, { roughness: .4 });
  const bodyM = glass(COL.bone, .16);
  api.rot = [];
  defs.forEach(([name, f, ry], i) => {
    const x = (i - 1.5) * 3.6;
    const holder = new THREE.Group(); holder.position.x = x; holder.rotation.y = ry;
    const figure = new THREE.Group();
    figure.add(group(sk, bodyM));
    const col = new THREE.Group();
    list.forEach(p => {
      const c = boxC(partBox([p])), t = (top - c.y) / H, e = .01;
      const [dx, dz] = f(t), [ax, az] = f(t - e), [bx, bz] = f(t + e);
      const sx = (bx - ax) / (2 * e) / -H, sz = (bz - az) / (2 * e) / -H;
      const piece = new THREE.Group();
      piece.position.set(c.x + dx, c.y, c.z + dz);
      piece.rotation.set(Math.atan(sz), 0, -Math.atan(sx));
      let m = discM;
      if (p.g !== 'disc') {
        m = mat(COL.bone, { roughness: .55, emissive: new THREE.Color(COL.disc), emissiveIntensity: .12 });
        m.color.copy(bone).lerp(bad, Math.min(1, Math.hypot(dx, dz) / A) * .85);
      }
      const o = new THREE.Mesh(geo(p), m); o.position.copy(c).negate();
      piece.add(o); col.add(piece);
    });
    figure.add(col);
    place(holder, figure, fullBox, 2.55, 5.35);
    api.g.add(holder); api.rot.push(holder);
    api.label(name, x, -2.95);
  });
};
viewer('spine', { hw: 7.7, hh: 3.4, cy: -.15 }, BUILD_spine);

/* ---------- Fisura: tiga model anatomi manusia utuh dengan cedera pada tulang sasaran ---------- */
viewer('fisura', { hw: 4.45, hh: 3.25, cy: 0, auto: false, interactive: false }, async api => {
  const sk = await pack('skeleton');
  const states = ['normal', 'fisura', 'fraktur'];
  const names = ['NORMAL', 'FISURA / RETAK', 'FRAKTUR / PATAH'];
  const xPositions = [-2.8, 0, 2.8];
  const target = {
    leg: /^(left|right) femur$/i,
    arm: /^(left|right) humerus$/i
  };
  const fissureMat = mat('#f0a04b', { roughness: .5, emissive: new THREE.Color('#b85b20'), emissiveIntensity: .22 });
  const fractureMat = mat('#ed685c', { roughness: .48, emissive: new THREE.Color('#a82e29'), emissiveIntensity: .25 });
  const xrayMat = glass('#82dfff', .58);
  const crackMat = mat('#ff624e', { emissive: new THREE.Color('#ff382b'), emissiveIntensity: .9 });
  const models = [];

  for (let i = 0; i < states.length; i++) {
    const localApi = { g: new THREE.Group(), frame: () => {} };
    const human = await buildHuman(localApi, 'hero');
    human.L.organ.visible = false;
    human.L.saraf.visible = false;
    human.L.kulit.visible = true;
    human.L.kulit.material.transparent = true;
    human.L.kulit.material.opacity = .32;
    human.L.kulit.material.depthWrite = false;

    const targetMeshes = [];
    human.L.kerangka.traverse(o => {
      if (!o.isMesh || !o.userData.part) return;
      const partName = o.userData.part.n || '';
      o.userData.baseBoneMaterial = o.material;
      o.userData.partName = partName;
      if (target.leg.test(partName) || target.arm.test(partName)) targetMeshes.push(o);
    });

    const marks = new THREE.Group();
    localApi.g.add(marks);
    if (states[i] !== 'normal') {
      for (const kind of ['leg', 'arm']) {
        human.sk.filter(p => target[kind].test(p.n)).forEach(p => {
          const bounds = partBox([p]), center = boxC(bounds), size = boxS(bounds);
          const radius = Math.max(.055, Math.min(size.x, size.z) * .82);
          const addRing = y => {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, .022, 10, 32), crackMat);
            ring.rotation.x = Math.PI / 2;
            ring.position.set(...human.at(center).map((v, axis) => axis === 1 ? v + (y - center.y) : v));
            marks.add(ring);
          };
          if (states[i] === 'fisura') addRing(center.y);
          else {
            addRing(center.y - size.y * .035);
            addRing(center.y + size.y * .035);
          }
        });
      }
    }

    const box = new THREE.Box3().setFromObject(localApi.g);
    const holder = new THREE.Group();
    place(holder, localApi.g, box, 1.35, 4.55, false);
    holder.position.x = xPositions[i];
    api.g.add(holder);
    models.push({ human, marks, targetMeshes, state: states[i] });
  }

  xPositions.forEach((x, i) => api.label(names[i], x, -2.55));
  api.tick = t => {
    models.forEach(model => {
      model.marks.visible = model.state !== 'normal' && (fisuraBone === 'leg' || fisuraBone === 'arm');
      model.human.L.kulit.material.opacity = xray ? .055 : .32;
      model.human.L.kerangka.traverse(o => {
        if (!o.isMesh || !o.userData.part) return;
        if (xray) o.material = xrayMat;
        else {
          const selected = target[fisuraBone].test(o.userData.partName || '');
          o.material = selected && model.state === 'fisura' ? fissureMat
            : selected && model.state === 'fraktur' ? fractureMat
            : o.userData.baseBoneMaterial;
        }
      });
    });
    crackMat.emissiveIntensity = .75 + .2 * Math.sin(t * 3.4);
  };
});

/* ---------- Artritis dan osteoartritis: anatomi manusia utuh dengan sorotan sendi lutut ---------- */
const BUILD_artritis = async api => {
  const human = await buildHuman(api, 'hero');
  human.L.organ.visible = false;
  human.L.saraf.visible = false;
  human.L.kulit.visible = true;
  human.L.kulit.material.transparent = true;
  human.L.kulit.material.opacity = .3;
  human.L.kulit.material.depthWrite = false;

  const normalJoint = mat('#62c8ef', { transparent: true, opacity: .72, emissive: new THREE.Color('#35b6e8'), emissiveIntensity: .5, depthWrite: false });
  const arthritisJoint = mat('#ef7667', { transparent: true, opacity: .78, emissive: new THREE.Color('#e74e3c'), emissiveIntensity: .65, depthWrite: false });
  const normalBone = mat('#77cbed', { roughness: .48, emissive: new THREE.Color('#2d9bc4'), emissiveIntensity: .16 });
  const inflamedBone = mat('#e88776', { roughness: .48, emissive: new THREE.Color('#a93e35'), emissiveIntensity: .2 });

  human.L.kerangka.traverse(o => {
    if (!o.isMesh || !o.userData.part) return;
    const name = (o.userData.part.n || '').toLowerCase();
    o.userData.baseBoneMaterial = o.material;
    if (/^left (femur|tibia|fibula|patella)$/.test(name)) o.material = normalBone;
    if (/^right (femur|tibia|fibula|patella)$/.test(name)) o.material = inflamedBone;
  });

  const centerAt = side => {
    const fem = human.sk.find(p => p.n.toLowerCase() === side + ' femur');
    const tib = human.sk.find(p => p.n.toLowerCase() === side + ' tibia');
    if (!fem || !tib) return new THREE.Vector3();
    const center = boxC(partBox([fem])).add(boxC(partBox([tib]))).multiplyScalar(.5);
    return new THREE.Vector3(...human.at(center));
  };
  const leftCenter = centerAt('left'), rightCenter = centerAt('right');
  const leftHalo = new THREE.Mesh(new THREE.SphereGeometry(.2, 24, 18), normalJoint);
  const rightHalo = new THREE.Mesh(new THREE.SphereGeometry(.24, 24, 18), arthritisJoint);
  leftHalo.position.copy(leftCenter);
  rightHalo.position.copy(rightCenter);
  api.g.add(leftHalo, rightHalo);

  api.tick = t => {
    const pulse = 1 + (kneeMoving && !reduceMotion ? .055 * Math.sin(t * 3.2) : 0);
    leftHalo.scale.setScalar(pulse);
    rightHalo.scale.setScalar(pulse);
  };
};
viewer('artritis', { hw: 3.0, hh: 4.65, cy: 0, auto: false, interactive: false }, BUILD_artritis);
viewer('oaCard', { hw: 2.35, hh: 4.65, cy: 0, auto: false, interactive: false }, BUILD_artritis);

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
