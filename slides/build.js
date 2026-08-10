/* Genèse de l'IA — 5 slides, public varié.
   Reprend les éléments graphiques du parcours : frise, chemin des données,
   réseau de neurones, couches du centre de données, chiffres carbone.
   node build.js  →  Genese-de-l-IA.pptx                                        */

const pptxgen = require("pptxgenjs");

const DEEP = "0B1220";
const BLUE = "0071E3";
const ICE = "CDE3FF";
const LIGHT = "F7F7FA";
const WHITE = "FFFFFF";
const INK = "1D1D1F";
const MUTED = "6E6E73";
const MUTED_D = "A8B2C6";
const WARM = "E08A2E";
const HAIR = "D9DCE3";

const H1 = "Calibri";
const BODY = "Calibri Light";
const M = 0.7;
const CW = 11.933; // largeur utile

const card = () => ({ type: "outer", color: "000000", blur: 10, offset: 2, angle: 135, opacity: 0.10 });

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Arx Consulting";
pres.title = "La genèse de l'IA";
pres.subject = "Séance d'ouverture du programme AI Training";

function eyebrow(s, txt, color) {
  s.addText(txt.toUpperCase(), { x: M, y: 0.46, w: 9, h: 0.28, margin: 0, fontFace: H1, fontSize: 11, bold: true, charSpacing: 3, color });
}
function title(s, txt, color) {
  s.addText(txt, { x: M, y: 0.74, w: CW, h: 0.72, margin: 0, fontFace: H1, fontSize: 38, bold: true, color });
}
function sub(s, txt, color, w = CW) {
  s.addText(txt, { x: M, y: 1.52, w, h: 0.44, margin: 0, fontFace: BODY, fontSize: 15, color });
}
/* trait entre deux points, orienté correctement */
function link(s, x1, y1, x2, y2, color) {
  s.addShape(pres.shapes.LINE, {
    x: Math.min(x1, x2), y: Math.min(y1, y2),
    w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    line: { color, width: 1 }, flipV: y2 < y1,
  });
}

/* ============ 1 — Titre et frise ============ */
{
  const s = pres.addSlide();
  s.background = { color: DEEP };

  eyebrow(s, "Arx Consulting · AI Training · séance d'ouverture", BLUE);
  s.addText("Soixante-dix ans,\nune douzaine de noms.", {
    x: M, y: 0.92, w: 8.5, h: 1.6, margin: 0, fontFace: H1, fontSize: 42, bold: true, color: WHITE, lineSpacingMultiple: 1.05,
  });
  s.addText("Le même projet — faire faire à une machine ce qui demande de l'intelligence — a changé d'étiquette à chaque fois que la précédente s'est dévaluée.", {
    x: M, y: 2.62, w: 8.5, h: 0.8, margin: 0, fontFace: BODY, fontSize: 15, color: MUTED_D,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 9.75, y: 0.92, w: 2.88, h: 2.4, rectRadius: 0.12,
    fill: { color: "FFFFFF", transparency: 92 }, line: { color: BLUE, width: 1, transparency: 55 },
  });
  s.addText("45", { x: 9.75, y: 1.12, w: 2.88, h: 0.8, margin: 0, align: "center", fontFace: H1, fontSize: 44, bold: true, color: BLUE });
  s.addText("minutes, une seule fois,\navant le module 00", { x: 9.95, y: 1.94, w: 2.48, h: 0.62, margin: 0, align: "center", fontFace: BODY, fontSize: 13, color: ICE });
  s.addText("Aucun livrable. Un socle commun.", { x: 9.95, y: 2.62, w: 2.48, h: 0.5, margin: 0, align: "center", fontFace: BODY, fontSize: 11.5, color: ICE });

  const LY = 4.7;
  s.addShape(pres.shapes.LINE, { x: M, y: LY, w: CW, h: 0, line: { color: "2A3550", width: 2 } });

  const steps = [
    ["1805", "Les moindres carrés", "Prédire avec des chiffres", false],
    ["1922", "La météo à la main", "Le véritable ancêtre", false],
    ["1956", "Le mot est inventé", "Conférence de Dartmouth", false],
    ["1974 · 87", "Deux hivers", "Le mot devient un repoussoir", true],
    ["2012", "L'apprentissage profond", "Le moment où ça marche", false],
    ["2022", "L'accès grand public", "Une date, pas une percée", false],
  ];
  const x0 = 1.55, dx = 2.05;
  steps.forEach(([yr, t1, t2, cold], i) => {
    const cx = x0 + i * dx;
    const c = cold ? WARM : BLUE;
    s.addShape(pres.shapes.OVAL, { x: cx - 0.09, y: LY - 0.09, w: 0.18, h: 0.18, fill: { color: c } });
    s.addText(yr, { x: cx - 0.95, y: LY - 0.7, w: 1.9, h: 0.34, margin: 0, align: "center", fontFace: H1, fontSize: 16, bold: true, color: cold ? WARM : ICE });
    s.addText(t1, { x: cx - 0.95, y: LY + 0.22, w: 1.9, h: 0.34, margin: 0, align: "center", fontFace: H1, fontSize: 12.5, bold: true, color: WHITE });
    s.addText(t2, { x: cx - 0.95, y: LY + 0.58, w: 1.9, h: 0.5, margin: 0, align: "center", fontFace: BODY, fontSize: 10.5, color: MUTED_D });
  });
  s.addText("en orange, les deux hivers de l'IA", { x: 6.2, y: 5.88, w: 3.0, h: 0.3, margin: 0, align: "center", fontFace: BODY, fontSize: 10.5, italic: true, color: WARM });

  s.addText("Quand un mot nouveau apparaît, demandez ce qu'il fait que le précédent ne faisait pas. Souvent, rien.", {
    x: M, y: 6.5, w: CW, h: 0.42, margin: 0, align: "center", fontFace: BODY, fontSize: 14, italic: true, color: ICE,
  });
}

/* ============ 2 — Le chemin des données ============ */
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };

  eyebrow(s, "Étape 02 · où passent vos données", BLUE);
  title(s, "Le chemin de vos données.", INK);
  sub(s, "« Est-ce que mes données servent à entraîner le modèle ? » n'a pas de réponse unique : elle dépend de l'étape.", MUTED);

  const phases = [
    ["Une fois", "Préparation, hors ligne", [["01", "Vos sources"], ["02", "Extraction"], ["03", "Découpage"], ["04", "Vectorisation"], ["05", "Index"]], false, "Vos documents sont copiés et stockés chez quelqu'un."],
    ["À chaque demande", "Quelques secondes", [["06", "Votre demande"], ["07", "Recherche"], ["08", "Contexte assemblé"], ["09", "Tokens"], ["10", "Génération"]], true, "L'étape 08 est le point de sortie réel."],
    ["Autour", "Ce qui encadre", [["11", "Outils & actions"], ["12", "Vérification humaine"], ["13", "Journal & coûts"]], false, "Sans journal, impossible d'expliquer une réponse aberrante ni d'estimer un coût."],
  ];

  const cw = (CW - 0.7) / 3;
  phases.forEach(([h1, h2, items, hot, note], i) => {
    const x = M + i * (cw + 0.35);
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.15, w: cw, h: 3.87, fill: { color: WHITE }, shadow: card() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.15, w: cw, h: 0.06, fill: { color: hot ? BLUE : HAIR } });
    s.addText(h1, { x: x + 0.28, y: 2.34, w: cw - 0.56, h: 0.3, margin: 0, fontFace: H1, fontSize: 16, bold: true, color: INK });
    s.addText(h2, { x: x + 0.28, y: 2.65, w: cw - 0.56, h: 0.26, margin: 0, fontFace: BODY, fontSize: 11.5, color: MUTED });

    items.forEach(([n, label], k) => {
      const y = 2.98 + k * 0.42;
      const on = n === "08";
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.28, y, w: cw - 0.56, h: 0.4, rectRadius: 0.08, fill: { color: on ? BLUE : LIGHT } });
      s.addText(n, { x: x + 0.42, y, w: 0.5, h: 0.4, margin: 0, valign: "middle", fontFace: H1, fontSize: 11, bold: true, color: on ? WHITE : BLUE });
      s.addText(label, { x: x + 0.95, y, w: cw - 1.25, h: 0.4, margin: 0, valign: "middle", fontFace: H1, fontSize: 12.5, bold: on, color: on ? WHITE : INK });
    });

    s.addText(note, { x: x + 0.28, y: 5.38, w: cw - 0.56, h: 0.6, margin: 0, valign: "top", fontFace: BODY, fontSize: 11, color: MUTED });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 6.35, w: CW, h: 0.58, fill: { color: "E8F1FD" } });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 6.35, w: 0.07, h: 0.58, fill: { color: BLUE } });
  s.addText(
    [{ text: "Vos données sortent à l'étape 08", options: { bold: true, color: INK } },
     { text: "  —  et la fuite la plus fréquente vient de l'étape 06 : ce qu'on colle sans y penser.", options: { color: MUTED } }],
    { x: M + 0.3, y: 6.35, w: CW - 0.6, h: 0.58, margin: 0, valign: "middle", fontFace: BODY, fontSize: 13.5 }
  );
}

/* ============ 3 — Dans la boîte ============ */
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };

  eyebrow(s, "Étape 03 · le mécanisme", BLUE);
  title(s, "Ce qu'il y a dans la boîte.", INK);
  sub(s, "Ce n'est pas un cerveau. Un neurone additionne ce qui lui arrive, chaque signal multiplié par son poids.", MUTED);

  /* --- réseau --- */
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.25, w: 6.0, h: 4.05, fill: { color: WHITE }, shadow: card() });
  s.addText("Entrées, couches, sortie", { x: M + 0.3, y: 2.42, w: 5.4, h: 0.3, margin: 0, fontFace: H1, fontSize: 13, bold: true, color: INK });
  s.addText("Chaque trait porte un poids : c'est ce qui est appris.", { x: M + 0.3, y: 2.72, w: 5.4, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11.5, color: MUTED });

  const cols = [1.5, 3.0, 4.5, 6.0];
  const rows = [[3.55, 4.3, 5.05], [3.55, 4.3, 5.05], [3.55, 4.3, 5.05], [4.3]];
  for (let c = 0; c < 3; c++) {
    rows[c].forEach((y1) => rows[c + 1].forEach((y2) => link(s, cols[c] + 0.17, y1, cols[c + 1] - 0.17, y2, HAIR)));
  }
  rows.forEach((ys, c) => ys.forEach((y) => {
    s.addShape(pres.shapes.OVAL, {
      x: cols[c] - 0.17, y: y - 0.17, w: 0.34, h: 0.34,
      fill: { color: c === 3 ? "E8F1FD" : WHITE }, line: { color: c === 0 ? MUTED : BLUE, width: 2 },
    });
  }));
  [["Entrées", 0], ["Couche 1", 1], ["Couche 2", 2], ["Sortie", 3]].forEach(([t, i]) => {
    s.addText(t, { x: cols[i] - 0.72, y: 5.42, w: 1.44, h: 0.28, margin: 0, align: "center", fontFace: H1, fontSize: 11.5, bold: true, color: MUTED });
  });
  s.addText("Un modèle, ce sont ces poids : des centaines de milliards de nombres, figés à la fin de l'entraînement.", {
    x: M + 0.3, y: 5.7, w: 5.4, h: 0.5, margin: 0, fontFace: BODY, fontSize: 11.5, color: MUTED,
  });

  /* --- distributions --- */
  const bx = 7.05, bw = 5.58;
  s.addShape(pres.shapes.RECTANGLE, { x: bx, y: 2.25, w: bw, h: 4.05, fill: { color: WHITE }, shadow: card() });
  s.addText("Ce qui sort : une distribution, pas une réponse", { x: bx + 0.3, y: 2.42, w: bw - 0.6, h: 0.3, margin: 0, fontFace: H1, fontSize: 13, bold: true, color: INK });

  const dist = (y0, q, bars, color) => {
    s.addText(q, { x: bx + 0.3, y: y0, w: bw - 0.6, h: 0.26, margin: 0, fontFace: BODY, fontSize: 11.5, italic: true, color: MUTED });
    bars.forEach(([w, p], i) => {
      const y = y0 + 0.32 + i * 0.29;
      s.addText(w, { x: bx + 0.3, y, w: 1.1, h: 0.25, margin: 0, valign: "middle", fontFace: BODY, fontSize: 11, color: INK });
      s.addShape(pres.shapes.RECTANGLE, { x: bx + 1.46, y: y + 0.05, w: 3.05, h: 0.15, fill: { color: LIGHT } });
      s.addShape(pres.shapes.RECTANGLE, { x: bx + 1.46, y: y + 0.05, w: 3.05 * (p / 100), h: 0.15, fill: { color } });
      s.addText(p + " %", { x: bx + 4.6, y, w: 0.68, h: 0.25, margin: 0, valign: "middle", align: "right", fontFace: H1, fontSize: 11, bold: true, color: INK });
    });
  };
  dist(2.86, "« La capitale de la France est… »", [["Paris", 92], ["une", 3], ["Lyon", 1]], BLUE);
  dist(4.16, "« Le chiffre d'affaires 2025 de votre société est de… »", [["2,4 M€", 19], ["1,8 M€", 17], ["3,1 M€", 16]], WARM);

  s.addShape(pres.shapes.RECTANGLE, { x: bx + 0.3, y: 5.5, w: bw - 0.6, h: 0.62, fill: { color: "FBF1E4" } });
  s.addText("Il n'existe pas de case « je ne sais pas ».", {
    x: bx + 0.45, y: 5.5, w: bw - 0.9, h: 0.62, margin: 0, valign: "middle", fontFace: H1, fontSize: 12.5, bold: true, color: "8A5A12",
  });

  s.addText("En séance : basculer d'un exemple à l'autre, puis demander au groupe où le modèle pourrait dire « je ne sais pas ».", {
    x: M, y: 6.62, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11.5, color: MUTED,
  });
}

/* ============ 4 — Sur quoi ça tourne ============ */
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };

  eyebrow(s, "Étape 04 · l'infrastructure", BLUE);
  title(s, "Sur quoi ça tourne.", INK);
  sub(s, "Les poids ne flottent pas dans le vide. Huit couches, de la terre jusqu'à votre écran.", MUTED, 9.2);

  const layers = [
    ["08", "Votre application", "des clics", "sw"],
    ["07", "L'API", "des requêtes par minute", "sw"],
    ["06", "Le service d'inférence", "des jetons par seconde", "sw"],
    ["05", "L'orchestration", "des machines", "sw"],
    ["04", "Le réseau interne", "des gigaoctets par seconde", "hw"],
    ["03", "Le calcul", "des processeurs graphiques", "hw"],
    ["02", "Le refroidissement", "des litres d'eau", "ph"],
    ["01", "Le site et l'électricité", "des mégawatts", "ph"],
  ];
  const fills = { sw: "E8F1FD", hw: "CFE3FB", ph: "E4E7ED" };
  const BX = 2.2, BW = 7.3, BH = 0.4, GAP = 0.08, TOP = 2.35;
  s.addText("ON SE MESURE EN", { x: BX + BW + 0.35, y: TOP - 0.27, w: 2.78, h: 0.26, margin: 0, fontFace: H1, fontSize: 10, bold: true, charSpacing: 2, color: MUTED });

  layers.forEach(([n, name, unit, kind], i) => {
    const y = TOP + i * (BH + GAP);
    const accent = kind === "ph" ? "5A6070" : BLUE;
    s.addShape(pres.shapes.RECTANGLE, { x: BX, y, w: BW, h: BH, fill: { color: fills[kind] } });
    s.addShape(pres.shapes.RECTANGLE, { x: BX, y, w: 0.06, h: BH, fill: { color: accent } });
    s.addText(n, { x: BX + 0.22, y, w: 0.5, h: BH, margin: 0, valign: "middle", fontFace: H1, fontSize: 11, bold: true, color: accent });
    s.addText(name, { x: BX + 0.78, y, w: BW - 1.05, h: BH, margin: 0, valign: "middle", fontFace: H1, fontSize: 14, bold: true, color: INK });
    s.addText(unit, { x: BX + BW + 0.35, y, w: 2.78, h: BH, margin: 0, valign: "middle", fontFace: BODY, fontSize: 11.5, color: MUTED });
  });

  [["Logiciel", 0, 3], ["Matériel", 4, 5], ["Physique", 6, 7]].forEach(([label, a, b]) => {
    const y1 = TOP + a * (BH + GAP);
    const y2 = TOP + b * (BH + GAP) + BH;
    s.addShape(pres.shapes.LINE, { x: BX - 0.18, y: y1, w: 0, h: y2 - y1, line: { color: HAIR, width: 2 } });
    s.addText(label.toUpperCase(), {
      x: BX - 1.85, y: (y1 + y2) / 2 - 0.15, w: 1.55, h: 0.3, margin: 0, align: "right",
      fontFace: H1, fontSize: 11, bold: true, charSpacing: 2, color: MUTED,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 6.45, w: CW, h: 0.5, fill: { color: "EDEFF3" } });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 6.45, w: 0.07, h: 0.5, fill: { color: BLUE } });
  s.addText("On n'installe pas un centre de données où l'on veut : on l'installe où il y a du courant disponible.", {
    x: M + 0.3, y: 6.45, w: CW - 0.6, h: 0.5, margin: 0, valign: "middle", fontFace: BODY, fontSize: 13, italic: true, color: INK,
  });
}

/* ============ 5 — Ce que ça coûte ============ */
{
  const s = pres.addSlide();
  s.background = { color: DEEP };

  eyebrow(s, "Étape 05 · l'empreinte", BLUE);
  title(s, "Ce que ça coûte à la planète.", WHITE);
  sub(s, "Deux échelles à ne jamais confondre : ce que coûte votre requête, et ce que coûte l'ensemble.", MUTED_D);

  const stats = [
    ["0,24", "Wh par requête texte", "43 secondes de cerveau humain. Il en faudrait 2 000 pour égaler une journée de réflexion.", BLUE],
    ["0,34", "Wh, autre estimation", "Une minute de cerveau. Recharger un téléphone consomme quarante fois plus.", BLUE],
    ["72 816", "tonnes de CO₂e", "L'entraînement d'un seul modèle : autant que 8 900 Français pendant un an.", WARM],
    ["945", "TWh en 2030", "Plus de deux fois la consommation électrique de la France, qui était de 451 TWh en 2025.", WARM],
  ];
  const cw = (CW - 3 * 0.3) / 4;
  stats.forEach(([n, unit, eq, col], i) => {
    const x = M + i * (cw + 0.3);
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.5, w: cw, h: 2.55, fill: { color: "FFFFFF", transparency: 93 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.5, w: cw, h: 0.06, fill: { color: col } });
    s.addText(n, { x: x + 0.26, y: 2.74, w: cw - 0.52, h: 0.7, margin: 0, fontFace: H1, fontSize: 38, bold: true, color: col });
    s.addText(unit, { x: x + 0.26, y: 3.46, w: cw - 0.52, h: 0.28, margin: 0, fontFace: H1, fontSize: 13, bold: true, color: WHITE });
    s.addShape(pres.shapes.LINE, { x: x + 0.26, y: 3.82, w: cw - 0.52, h: 0, line: { color: "2A3550", width: 1 } });
    s.addText(eq, { x: x + 0.26, y: 3.89, w: cw - 0.52, h: 1.1, margin: 0, valign: "top", fontFace: BODY, fontSize: 12, color: ICE });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 5.5, w: CW, h: 0.64, fill: { color: "FFFFFF", transparency: 95 } });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 5.5, w: 0.07, h: 0.64, fill: { color: BLUE } });
  s.addText(
    [{ text: "Le levier n'est pas d'utiliser moins l'IA, ", options: { bold: true, color: WHITE } },
     { text: "c'est de ne pas envoyer trente pages à chaque question.", options: { color: ICE } }],
    { x: M + 0.3, y: 5.5, w: CW - 0.6, h: 0.64, margin: 0, valign: "middle", fontFace: BODY, fontSize: 13.5 }
  );

  s.addText("Sources : Stanford AI Index 2026 · Google, rapport technique Gemini 2025 · AIE 2026 · RTE, bilan électrique 2025 · Insee, empreinte carbone 2024.", {
    x: M, y: 6.5, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10, color: "9AA6BC",
  });
}

pres.writeFile({ fileName: "G:/My Drive/Dev/IA/AITraining/training/slides/Genese-de-l-IA.pptx" })
  .then((f) => console.log("écrit :", f));
