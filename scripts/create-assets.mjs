import { mkdir, writeFile } from "node:fs/promises";

const assets = [
  ["hero-setup.svg", "Vertex", "setup", "#0b1020", "#8b5cf6"],
  ["gpad-pro.svg", "GPad", "tablet", "#eef2ff", "#0071e3"],
  ["gbook-airborne.svg", "GBook", "laptop", "#e5e7eb", "#38bdf8"],
  ["gstudio-core.svg", "Core", "tower", "#09090b", "#a855f7"],
  ["gwatch-pulse.svg", "Pulse", "watch", "#f8fafc", "#8b5cf6"],
  ["gsound-pods.svg", "Sound", "pods", "#f8fafc", "#64748b"],
  ["store-bag.svg", "Store", "bag", "#f5f5f7", "#0071e3"],
  ["bundle-starter.svg", "Starter", "bundle", "#ecfeff", "#06b6d4"],
  ["bundle-streamer.svg", "Streamer", "bundle", "#faf5ff", "#a855f7"],
  ["gphone-rush.svg", "Rush", "phone", "#0f172a", "#22d3ee"],
  ["ghome-hub.svg", "Hub", "hub", "#111827", "#f59e0b"],
  ["arcade-plus.svg", "Arcade", "arcade", "#020617", "#84cc16"],
  ["accessories-gear.svg", "Gear", "gear", "#f8fafc", "#111827"],
  ["support-care.svg", "Care", "support", "#f8fafc", "#0071e3"],
  ["feature-display.svg", "Display", "panel", "#e0f2fe", "#0284c7"],
  ["feature-oled.svg", "OLED", "panel", "#111827", "#a855f7"],
  ["feature-network.svg", "Network", "network", "#0f172a", "#22d3ee"],
  ["feature-pulse.svg", "Pulse", "watch", "#fff7ed", "#f97316"],
  ["feature-audio.svg", "Audio", "pods", "#eef2ff", "#6366f1"],
  ["feature-room.svg", "Room", "hub", "#111827", "#f59e0b"],
  ["feature-thermal.svg", "Thermal", "tower", "#111827", "#38bdf8"],
  ["feature-lab.svg", "Lab", "setup", "#e5e7eb", "#8b5cf6"],
  ["technology-core.svg", "Tech", "network", "#020617", "#38bdf8"],
  ["history-archive.svg", "History", "timeline", "#f8fafc", "#8b5cf6"],
  ["checkout-flow.svg", "Buy", "checkout", "#f8fafc", "#0071e3"],
  ["gear-keyboard.svg", "Keys", "keyboard", "#f8fafc", "#334155"],
  ["gear-mouse.svg", "Mouse", "mouse", "#f8fafc", "#64748b"],
  ["gear-stand.svg", "Stand", "stand", "#f8fafc", "#0071e3"],
  ["gear-case.svg", "Case", "case", "#f8fafc", "#8b5cf6"],
];

const shell = (name, bg, accent, body) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 620" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${accent}"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.24"/></linearGradient>
    <linearGradient id="metal" x1="0" x2="1"><stop stop-color="#d4d4d8"/><stop offset="0.5" stop-color="#ffffff"/><stop offset="1" stop-color="#a1a1aa"/></linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="30" stdDeviation="28" flood-color="#000" flood-opacity="0.24"/></filter>
  </defs>
  <rect width="900" height="620" rx="70" fill="${bg}"/>
  <circle cx="695" cy="150" r="188" fill="url(#g)" opacity="0.36"/>
  <circle cx="180" cy="472" r="130" fill="${accent}" opacity="0.14"/>
  ${body}
  <text x="450" y="570" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="${bg === "#020617" || bg === "#09090b" || bg === "#0f172a" || bg === "#111827" ? "#fff" : "#111113"}" letter-spacing="-1.6">${name}</text>
</svg>`;

const shapes = {
  laptop: (a) => `<g filter="url(#shadow)"><rect x="205" y="155" width="490" height="300" rx="30" fill="#1f1f25"/><rect x="230" y="180" width="440" height="248" rx="20" fill="url(#g)"/><rect x="155" y="458" width="590" height="34" rx="17" fill="url(#metal)"/><rect x="395" y="460" width="110" height="7" rx="4" fill="#71717a"/></g>`,
  tablet: (a) => `<g filter="url(#shadow)"><rect x="225" y="110" width="450" height="360" rx="46" fill="#18181b"/><rect x="252" y="137" width="396" height="306" rx="30" fill="url(#g)"/><circle cx="450" cy="456" r="6" fill="#3f3f46"/></g>`,
  phone: (a) => `<g filter="url(#shadow)"><rect x="340" y="80" width="220" height="430" rx="48" fill="#111113"/><rect x="360" y="112" width="180" height="360" rx="32" fill="url(#g)"/><rect x="420" y="96" width="60" height="8" rx="4" fill="#3f3f46"/></g>`,
  tower: (a) => `<g filter="url(#shadow)"><rect x="345" y="90" width="210" height="420" rx="46" fill="#17171d"/><rect x="377" y="132" width="146" height="250" rx="32" fill="url(#g)" opacity="0.72"/><circle cx="450" cy="431" r="22" fill="${a}"/><rect x="406" y="472" width="88" height="9" rx="5" fill="#52525b"/></g>`,
  watch: (a) => `<g filter="url(#shadow)"><rect x="398" y="58" width="104" height="126" rx="34" fill="#27272a"/><rect x="398" y="436" width="104" height="126" rx="34" fill="#27272a"/><rect x="330" y="165" width="240" height="290" rx="70" fill="#18181b"/><rect x="360" y="195" width="180" height="230" rx="48" fill="url(#g)"/><path d="M405 313l33 32 66-95" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  pods: (a) => `<g filter="url(#shadow)"><rect x="326" y="145" width="96" height="260" rx="48" fill="#fff"/><rect x="478" y="145" width="96" height="260" rx="48" fill="#fff"/><rect x="355" y="326" width="40" height="180" rx="20" fill="#e5e7eb"/><rect x="505" y="326" width="40" height="180" rx="20" fill="#e5e7eb"/><circle cx="374" cy="207" r="28" fill="${a}" opacity="0.18"/><circle cx="526" cy="207" r="28" fill="${a}" opacity="0.18"/></g>`,
  setup: (a) => `<g filter="url(#shadow)"><rect x="165" y="132" width="570" height="330" rx="34" fill="#17171d"/><rect x="192" y="160" width="516" height="274" rx="22" fill="url(#g)"/><rect x="405" y="462" width="90" height="58" fill="#27272f"/><rect x="315" y="512" width="270" height="24" rx="12" fill="#52525b"/></g>`,
  bag: (a) => `<g filter="url(#shadow)"><path d="M290 230h320l-34 282H324z" fill="#fff"/><path d="M365 230c0-62 31-100 85-100s85 38 85 100" fill="none" stroke="#111113" stroke-width="22" stroke-linecap="round"/><rect x="330" y="282" width="240" height="120" rx="32" fill="url(#g)"/></g>`,
  bundle: (a) => `<g filter="url(#shadow)"><rect x="190" y="210" width="270" height="190" rx="30" fill="#18181b"/><rect x="212" y="232" width="226" height="146" rx="18" fill="url(#g)"/><rect x="500" y="150" width="170" height="300" rx="38" fill="#111113"/><rect x="520" y="180" width="130" height="228" rx="24" fill="url(#g)" opacity="0.85"/></g>`,
  hub: (a) => `<g filter="url(#shadow)"><rect x="300" y="170" width="300" height="250" rx="62" fill="#f8fafc"/><circle cx="450" cy="295" r="86" fill="url(#g)"/><circle cx="450" cy="295" r="34" fill="#fff" opacity="0.95"/></g>`,
  arcade: (a) => `<g filter="url(#shadow)"><rect x="225" y="155" width="450" height="300" rx="54" fill="#15151a"/><circle cx="345" cy="306" r="58" fill="url(#g)"/><rect x="510" y="250" width="44" height="112" rx="22" fill="#fff"/><rect x="476" y="284" width="112" height="44" rx="22" fill="#fff"/></g>`,
  gear: (a) => `<g filter="url(#shadow)"><rect x="190" y="260" width="360" height="120" rx="34" fill="#f8fafc"/><rect x="230" y="288" width="280" height="28" rx="14" fill="${a}" opacity="0.34"/><path d="M630 210c70 48 70 180 0 226-70-46-70-178 0-226Z" fill="#fff"/><circle cx="638" cy="306" r="24" fill="${a}" opacity="0.32"/></g>`,
  support: (a) => `<g filter="url(#shadow)"><circle cx="450" cy="260" r="145" fill="#fff"/><path d="M390 255l45 45 86-112" fill="none" stroke="${a}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/><rect x="290" y="432" width="320" height="54" rx="27" fill="url(#g)"/></g>`,
  panel: (a) => `<g filter="url(#shadow)"><rect x="160" y="135" width="580" height="350" rx="38" fill="#18181b"/><rect x="190" y="165" width="520" height="290" rx="24" fill="url(#g)"/><path d="M240 382c80-100 160-50 230-122 68-70 118-32 190-112" fill="none" stroke="#fff" stroke-opacity="0.74" stroke-width="16" stroke-linecap="round"/></g>`,
  network: (a) => `<g filter="url(#shadow)"><circle cx="450" cy="300" r="70" fill="url(#g)"/><circle cx="260" cy="190" r="44" fill="#fff"/><circle cx="640" cy="190" r="44" fill="#fff"/><circle cx="260" cy="430" r="44" fill="#fff"/><circle cx="640" cy="430" r="44" fill="#fff"/><path d="M300 210l105 62M600 210l-105 62M300 410l105-62M600 410l-105-62" stroke="${a}" stroke-width="16" stroke-linecap="round"/></g>`,
  timeline: (a) => `<g filter="url(#shadow)"><path d="M230 180h440M230 300h440M230 420h440" stroke="#d4d4d8" stroke-width="18" stroke-linecap="round"/><circle cx="300" cy="180" r="34" fill="${a}"/><circle cx="450" cy="300" r="34" fill="${a}"/><circle cx="600" cy="420" r="34" fill="${a}"/><rect x="330" y="150" width="240" height="60" rx="30" fill="#fff"/><rect x="260" y="270" width="240" height="60" rx="30" fill="#fff"/><rect x="480" y="390" width="180" height="60" rx="30" fill="#fff"/></g>`,
  checkout: (a) => `<g filter="url(#shadow)"><rect x="230" y="125" width="440" height="360" rx="42" fill="#fff"/><rect x="285" y="190" width="330" height="34" rx="17" fill="${a}" opacity="0.22"/><rect x="285" y="258" width="330" height="34" rx="17" fill="${a}" opacity="0.36"/><rect x="285" y="326" width="220" height="34" rx="17" fill="${a}" opacity="0.5"/><rect x="352" y="405" width="196" height="50" rx="25" fill="${a}"/></g>`,
  keyboard: (a) => `<g filter="url(#shadow)"><rect x="185" y="225" width="530" height="190" rx="36" fill="#fff"/><g fill="${a}" opacity="0.35"><rect x="230" y="270" width="58" height="34" rx="10"/><rect x="305" y="270" width="58" height="34" rx="10"/><rect x="380" y="270" width="58" height="34" rx="10"/><rect x="455" y="270" width="58" height="34" rx="10"/><rect x="530" y="270" width="58" height="34" rx="10"/><rect x="305" y="330" width="250" height="34" rx="10"/></g></g>`,
  mouse: (a) => `<g filter="url(#shadow)"><path d="M450 120c92 0 150 80 150 205 0 116-58 185-150 185s-150-69-150-185c0-125 58-205 150-205Z" fill="#fff"/><path d="M450 142v130" stroke="${a}" stroke-width="14" stroke-linecap="round"/><circle cx="450" cy="304" r="20" fill="${a}" opacity="0.45"/></g>`,
  stand: (a) => `<g filter="url(#shadow)"><rect x="260" y="120" width="380" height="260" rx="36" fill="#18181b"/><rect x="292" y="152" width="316" height="196" rx="20" fill="url(#g)"/><path d="M450 380v88" stroke="#71717a" stroke-width="32" stroke-linecap="round"/><rect x="310" y="474" width="280" height="28" rx="14" fill="#a1a1aa"/></g>`,
  case: (a) => `<g filter="url(#shadow)"><rect x="260" y="135" width="380" height="360" rx="56" fill="#fff"/><rect x="300" y="175" width="300" height="280" rx="40" fill="none" stroke="${a}" stroke-width="28" opacity="0.42"/><rect x="390" y="115" width="120" height="42" rx="21" fill="#e5e7eb"/></g>`,
};

const mark = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true">
  <defs><linearGradient id="m" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#111113"/><stop offset="0.56" stop-color="#33333a"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs>
  <path fill="url(#m)" d="M39.7 7.4c4.8 2.9 8 8.3 8 14.6 0 11.5-9.4 19.8-15.7 34.6C25.7 41.8 16.3 33.5 16.3 22c0-9.3 6.7-16.8 15-16.8 2.9 0 5.3.8 8.4 2.2Z"/>
  <path fill="#fff" opacity="0.92" d="M36.2 5.1c.8 5.4-2.7 10.1-8.1 10.8-.7-5.5 2.8-10.1 8.1-10.8Z"/>
</svg>`;

await mkdir("public/assets", { recursive: true });
await writeFile("public/assets/gcherry-mark.svg", mark);
for (const [file, name, kind, bg, accent] of assets) {
  await writeFile(`public/assets/${file}`, shell(name, bg, accent, shapes[kind](accent)));
}
console.log(`Created ${assets.length + 1} SVG assets.`);
