/* Genèse de l'IA — 6 slides, public varié.
   Reprend les éléments graphiques du parcours : frise, chemin des données,
   réseau de neurones, couches du centre de données, chiffres carbone.
   node build.js  →  Genese-de-l-IA.pptx                                        */

const pptxgen = require("pptxgenjs");

const DEEP = "FBFBFD";   // fond des diapos, identique au site
const BLUE = "0071E3";
const ICE = "CDE3FF";
const LIGHT = "F5F5F7";   // fonds secondaires du site
const WHITE = "FFFFFF";
const INK = "1D1D1F";
const MUTED = "6E6E73";
const MUTED_D = "6E6E73";
const SKY  = "0071E3";
const WARM = "A04E00";   // orange assombri, lisible en petit corps
const BLUE_D = "005BB8"; // bleu foncé, pour les puces posées sur un fond teinté
const GOLD = "B85C00";
const HAIR = "A9A9AF";   // filet, assombri pour rester visible sur fond clair

const H1 = "Calibri";
const BODY = "Calibri Light";
const M = 0.7;
const CW = 11.933; // largeur utile

const card = () => ({ type: "outer", color: "000000", blur: 16, offset: 3, angle: 135, opacity: 0.18 });

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
function sub2(s, txt, w = CW) {
  s.addText(txt, { x: M, y: 1.52, w, h: 0.44, margin: 0, fontFace: BODY, fontSize: 15, color: MUTED_D });
}
/* trait entre deux points, orienté correctement.
   L'epaisseur porte le poids : c'est ce que le schema doit montrer. */
function link(s, x1, y1, x2, y2, color, width = 1, transparency = 0) {
  s.addShape(pres.shapes.LINE, {
    x: Math.min(x1, x2), y: Math.min(y1, y2),
    w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    line: { color, width, transparency }, flipV: y2 < y1,
  });
}

/* Les memes poids que le schema du site, pour que les deux racontent pareil. */
const POIDS = [0.35, 1.0, 0.55, 0.8, 0.3, 1.0, 0.45, 0.7, 0.9, 0.4, 0.6, 1.0,
               0.5, 0.85, 0.35, 1.0, 0.7, 0.45, 0.95, 0.3, 0.6, 0.8, 0.4, 1.0,
               0.55, 0.9, 0.35, 0.75, 1.0, 0.45, 0.65, 0.85];

/* ============ 1 — Titre et frise ============ */
{
  const s = pres.addSlide();
  s.background = { color: DEEP };

  eyebrow(s, "Arx Consulting · AI Training · séance d'ouverture", SKY);
  s.addText("Cent ans,\nune douzaine de noms.", {
    x: M, y: 0.92, w: 8.5, h: 1.6, margin: 0, fontFace: H1, fontSize: 42, bold: true, color: INK, lineSpacingMultiple: 1.05,
  });
  s.addText("Tout part d'un besoin que personne ne savait satisfaire : prévoir le temps. C'est lui qui a justifié de construire la machine — et le domaine a changé d'étiquette à chaque déception depuis.", {
    x: M, y: 2.62, w: 8.5, h: 0.8, margin: 0, fontFace: BODY, fontSize: 15, color: MUTED_D,
  });

  s.addImage({ path: "G:/My Drive/Dev/IA/AITraining/training/site/arx-logo.png",
    x: 10.46, y: 0.85, w: 2.17, h: 2.38, altText: "Arx Consulting" });

  const LY = 4.7;
  s.addShape(pres.shapes.LINE, { x: M, y: LY, w: CW, h: 0, line: { color: HAIR, width: 2 } });

  const steps = [
    ["1922", "Prévoir le temps", "Le besoin qui fera la machine", false],
    ["1950", "La météo sur ENIAC", "24 h de prévision, des semaines de calcul", false],
    ["1952", "UNIVAC prédit l'élection", "438-93, contre tous les sondages", false],
    ["1956", "Le mot est inventé", "Conférence de Dartmouth", false],
    ["1958", "Le score de crédit", "La prédiction entre dans l'économie", false],
    ["1974 · 87", "Deux hivers", "Le mot devient un repoussoir", true],
    ["2012", "L'apprentissage profond", "Le moment où ça marche", false],
    ["2022", "L'accès grand public", "Une date, pas une percée", false],
  ];
  const x0 = 1.32, dx = 1.53;
  steps.forEach(([yr, t1, t2, cold], i) => {
    const cx = x0 + i * dx;
    const c = cold ? WARM : SKY;
    s.addShape(pres.shapes.OVAL, { x: cx - 0.09, y: LY - 0.09, w: 0.18, h: 0.18, fill: { color: c } });
    s.addText(yr, { x: cx - 0.74, y: LY - 0.68, w: 1.48, h: 0.32, margin: 0, align: "center", fontFace: H1, fontSize: 14.5, bold: true, color: cold ? WARM : BLUE });
    s.addText(t1, { x: cx - 0.74, y: LY + 0.2, w: 1.48, h: 0.46, margin: 0, align: "center", fontFace: H1, fontSize: 11.5, bold: true, color: INK });
    s.addText(t2, { x: cx - 0.74, y: LY + 0.68, w: 1.48, h: 0.62, margin: 0, align: "center", fontFace: BODY, fontSize: 10, color: MUTED_D });
  });
  s.addText("en orange, les deux hivers de l'IA", { x: 7.87, y: 6.06, w: 3.0, h: 0.3, margin: 0, align: "center", fontFace: BODY, fontSize: 10.5, italic: true, color: WARM });

  s.addText("Quand un mot nouveau apparaît, demandez ce qu'il fait que le précédent ne faisait pas. Souvent, rien.", {
    x: M, y: 6.62, w: CW, h: 0.42, margin: 0, align: "center", fontFace: BODY, fontSize: 14, italic: true, color: MUTED,
  });
}

/* ============ 2 — Le chemin des données ============ */
{
  const s = pres.addSlide();
  s.background = { color: DEEP };

  eyebrow(s, "Étape 02 · où passent vos données", SKY);
  title(s, "Le chemin de vos données.", INK);
  sub2(s, "« Est-ce que mes données servent à entraîner le modèle ? » n'a pas de réponse unique : elle dépend de l'étape.");

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
      const rn = n === "04" || n === "07" || n === "10";   // les trois briques qui sont un réseau
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.28, y, w: cw - 0.56, h: 0.4, rectRadius: 0.08, fill: { color: on ? BLUE : LIGHT } });
      s.addText(n, { x: x + 0.42, y, w: 0.5, h: 0.4, margin: 0, valign: "middle", fontFace: H1, fontSize: 11, bold: true, color: on ? WHITE : BLUE_D });
      s.addText(label, { x: x + 0.95, y, w: cw - 1.55, h: 0.4, margin: 0, valign: "middle", fontFace: H1, fontSize: 12.5, bold: on, color: on ? WHITE : INK });
      if (rn) {
        s.addShape(pres.shapes.OVAL, { x: x + cw - 0.82, y: y + 0.09, w: 0.22, h: 0.22, fill: { color: on ? WHITE : BLUE } });
        s.addText("RN", { x: x + cw - 0.82, y: y + 0.09, w: 0.22, h: 0.22, margin: 0, align: "center", valign: "middle", fontFace: H1, fontSize: 6.5, bold: true, color: on ? BLUE : WHITE });
      }
    });

    s.addText(note, { x: x + 0.28, y: 5.38, w: cw - 0.56, h: 0.6, margin: 0, valign: "top", fontFace: BODY, fontSize: 11, color: MUTED });
  });

  s.addShape(pres.shapes.OVAL, { x: M, y: 6.10, w: 0.2, h: 0.2, fill: { color: BLUE } });
  s.addText("RN", { x: M, y: 6.10, w: 0.2, h: 0.2, margin: 0, align: "center", valign: "middle", fontFace: H1, fontSize: 6, bold: true, color: WHITE });
  s.addText("réseau de neurones — les trois seules étapes qui en sont un", { x: M + 0.28, y: 6.08, w: 5.2, h: 0.24, margin: 0, fontFace: BODY, fontSize: 10.5, color: MUTED });

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
  s.background = { color: DEEP };

  eyebrow(s, "Étape 03 · le mécanisme", SKY);
  title(s, "Ce qu'il y a dans la boîte.", INK);
  sub2(s, "Ce n'est pas un cerveau. Un neurone additionne ce qui lui arrive, chaque signal multiplié par son poids.");

  /* --- réseau --- */
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.25, w: 6.0, h: 4.05, fill: { color: WHITE }, shadow: card() });
  s.addText("Entrées, poids, couches, sortie", { x: M + 0.3, y: 2.42, w: 5.4, h: 0.3, margin: 0, fontFace: H1, fontSize: 13, bold: true, color: INK });
  s.addText("Chaque trait porte un poids : c'est ce qui est appris.", { x: M + 0.3, y: 2.72, w: 5.4, h: 0.28, margin: 0, fontFace: BODY, fontSize: 11.5, color: MUTED });

  /* bandeau des deux couches cachées */
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.42, y: 3.12, w: 2.36, h: 2.16, rectRadius: 0.12, fill: { color: "F0F6FE" }, line: { color: "F0F6FE" } });
  s.addText("COUCHES CACHÉES", { x: 2.42, y: 3.16, w: 2.36, h: 0.24, margin: 0, align: "center", fontFace: H1, fontSize: 8.5, bold: true, charSpacing: 1.6, color: BLUE_D });

  const cols = [1.55, 3.05, 4.15, 5.62];
  const rows = [[3.72, 4.32, 4.92], [3.52, 3.99, 4.46, 4.93], [3.52, 3.99, 4.46, 4.93], [4.22]];
  let wi = 0;
  for (let c = 0; c < 3; c++) {
    rows[c].forEach((y1) => rows[c + 1].forEach((y2) => {
      const p = POIDS[wi++ % POIDS.length];
      link(s, cols[c] + 0.15, y1, cols[c + 1] - 0.15, y2, BLUE, 0.5 + p * 1.9, Math.round(72 - p * 42));
    }));
  }
  rows.forEach((ys, c) => ys.forEach((y) => {
    const out = c === 3;
    s.addShape(pres.shapes.OVAL, {
      x: cols[c] - (out ? 0.23 : 0.15), y: y - (out ? 0.23 : 0.15),
      w: out ? 0.46 : 0.3, h: out ? 0.46 : 0.3,
      fill: { color: out ? BLUE : WHITE },
      line: { color: out ? BLUE : (c === 0 ? HAIR : "C9DCF3"), width: out ? 1 : 1.5 },
    });
  }));
  s.addText("0,82", { x: cols[3] - 0.23, y: rows[3][0] - 0.23, w: 0.46, h: 0.46, margin: 0, align: "center", valign: "middle", fontFace: H1, fontSize: 10, bold: true, color: WHITE });

  [["Entrées", 1.55], ["Poids", 2.30], ["Sortie", 5.62]].forEach(([txt, cx]) => {
    s.addText(txt, { x: cx - 0.6, y: 5.34, w: 1.2, h: 0.26, margin: 0, align: "center", fontFace: H1, fontSize: 11.5, bold: true, color: INK });
  });
  s.addText("une probabilité", { x: cols[3] - 0.75, y: 5.58, w: 1.5, h: 0.24, margin: 0, align: "center", fontFace: BODY, fontSize: 10, color: MUTED });

  /* la légende dit ce que l'épaisseur veut dire */
  s.addShape(pres.shapes.LINE, { x: M + 0.3, y: 5.93, w: 0.3, h: 0, line: { color: BLUE, width: 2.6, transparency: 35 } });
  s.addText("épaisseur du trait = poids appris", { x: M + 0.68, y: 5.81, w: 3.0, h: 0.24, margin: 0, fontFace: BODY, fontSize: 10, color: MUTED });

  /* une seule ligne : au-dela, le texte sort de la carte */
  s.addText("Un modèle, ce sont ces poids : des milliards de nombres figés après l'entraînement.", {
    x: M + 0.3, y: 6.02, w: 5.4, h: 0.22, margin: 0, fontFace: BODY, fontSize: 10.5, color: MUTED,
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
    x: M, y: 6.62, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11.5, color: MUTED_D,
  });
}

/* ============ 4 — Sur quoi ça tourne ============ */
{
  const s = pres.addSlide();
  s.background = { color: DEEP };

  eyebrow(s, "Étape 04 · l'infrastructure", SKY);
  title(s, "Sur quoi ça tourne.", INK);
  sub2(s, "Les poids ne flottent pas dans le vide. Huit couches, de la terre jusqu'à votre écran.", 9.2);

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
  s.addText("ON SE MESURE EN", { x: BX + BW + 0.35, y: TOP - 0.27, w: 2.78, h: 0.26, margin: 0, fontFace: H1, fontSize: 10, bold: true, charSpacing: 2, color: MUTED_D });

  layers.forEach(([n, name, unit, kind], i) => {
    const y = TOP + i * (BH + GAP);
    const accent = kind === "ph" ? "4A5060" : BLUE_D;
    s.addShape(pres.shapes.RECTANGLE, { x: BX, y, w: BW, h: BH, fill: { color: fills[kind] } });
    s.addShape(pres.shapes.RECTANGLE, { x: BX, y, w: 0.06, h: BH, fill: { color: accent } });
    s.addText(n, { x: BX + 0.22, y, w: 0.5, h: BH, margin: 0, valign: "middle", fontFace: H1, fontSize: 11, bold: true, color: accent });
    s.addText(name, { x: BX + 0.78, y, w: BW - 1.05, h: BH, margin: 0, valign: "middle", fontFace: H1, fontSize: 14, bold: true, color: INK });
    s.addText(unit, { x: BX + BW + 0.35, y, w: 2.78, h: BH, margin: 0, valign: "middle", fontFace: BODY, fontSize: 11.5, color: MUTED_D });
  });

  [["Logiciel", 0, 3], ["Matériel", 4, 5], ["Physique", 6, 7]].forEach(([label, a, b]) => {
    const y1 = TOP + a * (BH + GAP);
    const y2 = TOP + b * (BH + GAP) + BH;
    s.addShape(pres.shapes.LINE, { x: BX - 0.18, y: y1, w: 0, h: y2 - y1, line: { color: HAIR, width: 2 } });
    s.addText(label.toUpperCase(), {
      x: BX - 1.85, y: (y1 + y2) / 2 - 0.15, w: 1.55, h: 0.3, margin: 0, align: "right",
      fontFace: H1, fontSize: 11, bold: true, charSpacing: 2, color: MUTED_D,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 6.45, w: CW, h: 0.5, fill: { color: "E8F1FD" } });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 6.45, w: 0.07, h: 0.5, fill: { color: BLUE } });
  s.addText("On n'installe pas un centre de données où l'on veut : on l'installe où il y a du courant disponible.", {
    x: M + 0.3, y: 6.45, w: CW - 0.6, h: 0.5, margin: 0, valign: "middle", fontFace: BODY, fontSize: 13, italic: true, color: INK,
  });
}

/* ============ 5 — Ce que ça coûte ============ */
{
  const s = pres.addSlide();
  s.background = { color: DEEP };

  eyebrow(s, "Étape 05 · l'empreinte", SKY);
  title(s, "Ce que ça coûte à la planète.", INK);
  sub(s, "Deux échelles à ne jamais confondre : ce que coûte votre requête, et ce que coûte l'ensemble.", MUTED_D);

  const stats = [
    ["0,24", "Wh par requête texte", "43 secondes de cerveau humain. Il en faudrait 2 000 pour égaler une journée de réflexion.", BLUE],
    ["0,34", "Wh, autre estimation", "Une minute de cerveau. Recharger un téléphone consomme quarante fois plus.", BLUE],
    ["72 816", "tonnes de CO₂e", "L'entraînement d'un seul modèle : autant que 8 900 Français pendant un an.", GOLD],
    ["945", "TWh en 2030", "Plus de deux fois la consommation électrique de la France, qui était de 451 TWh en 2025.", GOLD],
  ];
  const cw = (CW - 3 * 0.3) / 4;
  stats.forEach(([n, unit, eq, col], i) => {
    const x = M + i * (cw + 0.3);
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.5, w: cw, h: 2.55, fill: { color: WHITE }, shadow: card() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.5, w: cw, h: 0.06, fill: { color: col } });
    s.addText(n, { x: x + 0.26, y: 2.74, w: cw - 0.52, h: 0.7, margin: 0, fontFace: H1, fontSize: 38, bold: true, color: col });
    s.addText(unit, { x: x + 0.26, y: 3.46, w: cw - 0.52, h: 0.28, margin: 0, fontFace: H1, fontSize: 13, bold: true, color: INK });
    s.addShape(pres.shapes.LINE, { x: x + 0.26, y: 3.82, w: cw - 0.52, h: 0, line: { color: HAIR, width: 1 } });
    s.addText(eq, { x: x + 0.26, y: 3.89, w: cw - 0.52, h: 1.1, margin: 0, valign: "top", fontFace: BODY, fontSize: 12, color: MUTED });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 5.5, w: CW, h: 0.64, fill: { color: "E8F1FD" } });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 5.5, w: 0.07, h: 0.64, fill: { color: SKY } });
  s.addText(
    [{ text: "Le levier n'est pas d'utiliser moins l'IA, ", options: { bold: true, color: INK } },
     { text: "c'est de ne pas envoyer trente pages à chaque question.", options: { color: MUTED } }],
    { x: M + 0.3, y: 5.5, w: CW - 0.6, h: 0.64, margin: 0, valign: "middle", fontFace: BODY, fontSize: 13.5 }
  );

  s.addText("Sources : Stanford AI Index 2026 · Google, rapport technique Gemini 2025 · AIE 2026 · RTE, bilan électrique 2025 · Insee, empreinte carbone 2024.", {
    x: M, y: 6.5, w: CW, h: 0.3, margin: 0, fontFace: BODY, fontSize: 10, color: MUTED,
  });
}

/* ============ 6 — Et après ============ */
{
  const s = pres.addSlide();
  s.background = { color: DEEP };

  eyebrow(s, "La suite du programme", SKY);
  title(s, "Et après la genèse.", INK);
  sub2(s, "Deux parcours, dans l'ordre. Le premier s'adresse à tout le monde, le second ne s'ouvre qu'après le module 07.");

  const dec = [
    ["00", "Chronomètre", "mesurer trois tâches avant de commencer"],
    ["01", "Ce que Claude fait", "et ce qu'il ne fait pas"],
    ["02", "CRAFT", "contexte, rôle, action, format, tonalité"],
    ["03", "Confidentialité", "ce qu'on ne colle jamais"],
    ["04", "Rédiger et reformuler", "changer le ton sans changer le fond"],
    ["05", "Lire un document", "demander un angle, pas un résumé"],
    ["06", "Photo et capture", "sortir du clavier"],
    ["07", "Vérifier avant d'envoyer", "chiffres, noms, dates, citations"],
    ["08", "Tableurs et données", "de l'export brut au tableau lisible"],
    ["09", "Projects", "arrêter de réexpliquer son contexte"],
    ["10", "Tâche répétitive", "en faire un modèle réutilisable"],
    ["11", "Démo de 5 minutes", "avant, après, temps gagné"],
  ];
  const ava = [
    ["00", "Le slash", "trois environnements, deux natures"],
    ["01", "Qu'est-ce qu'un agent", "qui décide de l'étape suivante"],
    ["02", "Donner des outils", "lire, interroger, envoyer"],
    ["03", "De Projects à Skills", "capitaliser ce qui marche"],
    ["04", "MCP et connecteurs", "brancher les vraies données"],
    ["05", "Un agent de bout en bout", "sur une tâche volontairement étroite"],
    ["06", "Tester, chiffrer, encadrer", "coût, journal, procédure d'arrêt"],
  ];

  /* colonne découverte */
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.2, w: 5.9, h: 4.1, fill: { color: WHITE }, shadow: card() });
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.2, w: 5.9, h: 0.06, fill: { color: BLUE } });
  s.addText("Découverte · 12 modules", { x: M + 0.3, y: 2.4, w: 5.3, h: 0.3, margin: 0, fontFace: H1, fontSize: 16, bold: true, color: INK });
  s.addText("4 semaines · 15 à 20 min par module · aucun prérequis", { x: M + 0.3, y: 2.7, w: 5.3, h: 0.26, margin: 0, fontFace: BODY, fontSize: 11, color: MUTED });
  dec.forEach(([n, ttl, desc], i) => {
    const y = 3.05 + i * 0.26;
    s.addText(n, { x: M + 0.3, y, w: 0.36, h: 0.26, margin: 0, valign: "middle", fontFace: H1, fontSize: 10, bold: true, color: BLUE_D });
    s.addText([{ text: ttl + " — ", options: { bold: true, color: INK } }, { text: desc, options: { color: MUTED } }],
      { x: M + 0.72, y, w: 4.9, h: 0.26, margin: 0, valign: "middle", fontFace: BODY, fontSize: 11.5 });
  });

  /* colonne avancé */
  s.addShape(pres.shapes.RECTANGLE, { x: 6.9, y: 2.2, w: 3.4, h: 4.1, fill: { color: WHITE }, shadow: card() });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.9, y: 2.2, w: 3.4, h: 0.06, fill: { color: GOLD } });
  s.addText("Avancé · 7 modules", { x: 7.2, y: 2.4, w: 2.8, h: 0.3, margin: 0, fontFace: H1, fontSize: 16, bold: true, color: INK });
  s.addText("45 à 60 min · après le module 07", { x: 7.2, y: 2.7, w: 2.8, h: 0.26, margin: 0, fontFace: BODY, fontSize: 11, color: MUTED });
  ava.forEach(([n, ttl, desc], i) => {
    const y = 3.05 + i * 0.44;
    s.addText(n, { x: 7.2, y, w: 0.36, h: 0.24, margin: 0, valign: "middle", fontFace: H1, fontSize: 10, bold: true, color: GOLD });
    s.addText(ttl, { x: 7.6, y, w: 2.45, h: 0.24, margin: 0, valign: "middle", fontFace: H1, fontSize: 11.5, bold: true, color: INK });
    s.addText(desc, { x: 7.6, y: y + 0.21, w: 2.45, h: 0.24, margin: 0, valign: "middle", fontFace: BODY, fontSize: 10.5, color: MUTED });
  });

  /* QR */
  s.addShape(pres.shapes.RECTANGLE, { x: 10.6, y: 2.2, w: 2.03, h: 4.1, fill: { color: WHITE }, shadow: card() });
  s.addShape(pres.shapes.RECTANGLE, { x: 10.6, y: 2.2, w: 2.03, h: 0.06, fill: { color: BLUE } });
  s.addText("Le programme complet", { x: 10.75, y: 2.4, w: 1.73, h: 0.5, margin: 0, align: "center", fontFace: H1, fontSize: 13, bold: true, color: INK });
  s.addImage({ path: "G:/My Drive/Dev/IA/AITraining/training/slides/qr-aitraining.png",
    x: 10.98, y: 3.0, w: 1.27, h: 1.27, altText: "QR code vers arx-consulting.com/AITraining" });
  s.addText("arx-consulting.com\n/AITraining", { x: 10.72, y: 4.37, w: 1.79, h: 0.55, margin: 0, align: "center", fontFace: BODY, fontSize: 10.5, color: BLUE });
  s.addText("Frise, chemin des données, limites, mythes et sources — tout est consultable et cliquable.",
    { x: 10.75, y: 5.0, w: 1.73, h: 1.2, margin: 0, align: "center", fontFace: BODY, fontSize: 10.5, color: MUTED });

  s.addImage({ path: "G:/My Drive/Dev/IA/AITraining/training/site/arx-logo.png",
    x: M, y: 6.55, w: 0.35, h: 0.38, altText: "Arx Consulting" });
  s.addText("Arx Consulting · programme de formation interne", { x: 1.18, y: 6.58, w: 6, h: 0.32, margin: 0, valign: "middle", fontFace: BODY, fontSize: 11, color: MUTED_D });
  s.addText("Une obligation européenne de maîtrise de l'IA s'applique depuis février 2025. Ce programme en constitue la trace.",
    { x: 6.5, y: 6.58, w: 6.13, h: 0.32, margin: 0, align: "right", valign: "middle", fontFace: BODY, fontSize: 11, color: MUTED_D });
}
pres.writeFile({ fileName: "G:/My Drive/Dev/IA/AITraining/training/slides/Genese-de-l-IA.pptx" })
  .then((f) => console.log("écrit :", f));
