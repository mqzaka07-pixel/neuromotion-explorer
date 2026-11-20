# AGENTS.md

Static site, no build step and no package.json. The user explicitly required exactly three separate files named `saraf.html`, `saraf.css`, `saraf.js` — keep that structure (do not merge or rename them, do not add a framework).

- `netlify.toml` publishes the repo root and rewrites `/` → `/saraf.html` (there is intentionally no index.html).
- Pages are hash-routed sections (`#beranda`, `#materi`, `#kelainan`, `#alur`, `#kuis`); `PAGES` in saraf.js must match section ids and nav links.
- 3D: Three.js r128 global from cdnjs. Each `<div class="v3d" data-scene="NAME">` is built by `viewer(NAME, opt, build)` in saraf.js. Viewers render only while visible. Labels are DOM elements projected from 3D coords (optionally relative to a parent object).
- Real anatomy meshes (BodyParts3D, CC BY-SA 2.1 JP — keep the footer credit) live in `models/{skeleton,organs,brain,muscles}.bin`, a custom packed format (magic `BP3D`, uint32 JSON length, JSON part list `{n,g,v,t,min,max,p,i,w}`, quantized uint16 positions + indices). Loaded via `pack(name)`; select parts by English name with `pick(parts, /regex/)`. Units: 10 cm, Y up, front = +Z, patient's right = −X. Viewer `build` may be async. Spinal cord, peripheral nerves, cartilage, and muscle cells are procedural (not in the dataset).
- Colors come from CSS custom properties (`--nerve`, `--bone`, `--muscle`) read at runtime via `cssVar`.
- UI text is Indonesian (school assignment content from the student's LKPD worksheet).
