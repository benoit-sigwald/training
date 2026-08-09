// Schéma TRAINING sur Oracle ATP arxdb01 : table de correspondance sujet -> lien profond.
// Source de vérité des liens affichés sur https://arx-consulting.com/AITraining/
//
//   ORA_ADMIN_PASSWORD=... TRAINING_PASSWORD=... node 01-setup-training.js
//
// Idempotent : ré-exécutable sans erreur (ORA-01920 / ORA-00955 ignorées), MERGE sur les clés.

const oracledb = require('oracledb');
oracledb.fetchAsString = [oracledb.CLOB];

const IGNORABLE = [1920, 955, 1430, 2260, 957, 1442, 4043, 942];

async function run(conn, sql, label) {
  try { await conn.execute(sql); console.log('  OK   ', label); }
  catch (e) {
    if (IGNORABLE.includes(e.errorNum)) { console.log('  SKIP ', label, `(ORA-${e.errorNum})`); return; }
    console.error('  FAIL ', label, e.message); throw e;
  }
}

const base = {
  connectString: process.env.ORA_CONNECT,
  walletLocation: process.env.ORA_WALLET_DIR,
  configDir: process.env.ORA_WALLET_DIR,
  walletPassword: process.env.ORA_WALLET_PASSWORD,
};

const DDL = [
[`CREATE TABLE SUJET (
   CODE        VARCHAR2(20)  NOT NULL,
   PARCOURS    VARCHAR2(12)  NOT NULL,
   MODULE_NO   VARCHAR2(2)   NOT NULL,
   ORDRE       NUMBER(3)     NOT NULL,
   TITRE_FR    VARCHAR2(200) NOT NULL,
   TITRE_EN    VARCHAR2(200) NOT NULL,
   NIVEAU      NUMBER(1)     NOT NULL,
   DUREE_MIN   NUMBER(4),
   CREATED_AT  TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
   UPDATED_AT  TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
   CONSTRAINT PK_SUJET PRIMARY KEY (CODE),
   CONSTRAINT UQ_SUJET_MOD UNIQUE (PARCOURS, MODULE_NO),
   CONSTRAINT CK_SUJET_PARC CHECK (PARCOURS IN ('decouverte','avance')),
   CONSTRAINT CK_SUJET_NIV  CHECK (NIVEAU BETWEEN 1 AND 3))`,
 'table SUJET'],

// NIVEAU = marche de l'escalier des usages : 1 prompt, 2 assistants, 3 agents.

[`CREATE TABLE LIEN (
   ID          NUMBER GENERATED ALWAYS AS IDENTITY,
   SUJET_CODE  VARCHAR2(20)  NOT NULL,
   LANGUE      VARCHAR2(2)   NOT NULL,
   FOURNISSEUR VARCHAR2(40)  NOT NULL,
   TYPE_LIEN   VARCHAR2(20)  NOT NULL,
   LIBELLE     VARCHAR2(200) NOT NULL,
   URL         VARCHAR2(500) NOT NULL,
   HTTP_STATUT NUMBER(3),
   VERIFIE_LE  DATE,
   ACTIF       CHAR(1) DEFAULT 'O' NOT NULL,
   CREATED_AT  TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
   UPDATED_AT  TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
   CONSTRAINT PK_LIEN PRIMARY KEY (ID),
   CONSTRAINT FK_LIEN_SUJET FOREIGN KEY (SUJET_CODE) REFERENCES SUJET (CODE),
   CONSTRAINT UQ_LIEN UNIQUE (SUJET_CODE, LANGUE, TYPE_LIEN),
   CONSTRAINT CK_LIEN_LANG CHECK (LANGUE IN ('fr','en')),
   CONSTRAINT CK_LIEN_TYPE CHECK (TYPE_LIEN IN ('principal','complement')),
   CONSTRAINT CK_LIEN_ACTIF CHECK (ACTIF IN ('O','N')),
   CONSTRAINT CK_LIEN_URL CHECK (URL LIKE 'https://%'))`,
 'table LIEN'],

[`CREATE INDEX IX_LIEN_SUJET ON LIEN (SUJET_CODE, LANGUE)`, 'index IX_LIEN_SUJET'],
[`CREATE INDEX IX_LIEN_VERIF ON LIEN (VERIFIE_LE, HTTP_STATUT)`, 'index IX_LIEN_VERIF'],
];

const VUES = [
[`CREATE OR REPLACE VIEW V_MODULE_LIEN AS
   SELECT s.PARCOURS, s.MODULE_NO, s.ORDRE, s.NIVEAU,
          CASE l.LANGUE WHEN 'fr' THEN s.TITRE_FR ELSE s.TITRE_EN END AS TITRE,
          l.LANGUE, l.TYPE_LIEN, l.FOURNISSEUR, l.LIBELLE, l.URL,
          l.HTTP_STATUT, l.VERIFIE_LE
     FROM SUJET s JOIN LIEN l ON l.SUJET_CODE = s.CODE
    WHERE l.ACTIF = 'O'
    ORDER BY s.PARCOURS, s.ORDRE, l.LANGUE, l.TYPE_LIEN`,
 'vue V_MODULE_LIEN'],

[`CREATE OR REPLACE VIEW V_LIEN_A_REVERIFIER AS
   SELECT SUJET_CODE, LANGUE, FOURNISSEUR, URL, HTTP_STATUT, VERIFIE_LE,
          TRUNC(SYSDATE) - VERIFIE_LE AS JOURS
     FROM LIEN
    WHERE ACTIF = 'O'
      AND (VERIFIE_LE IS NULL OR VERIFIE_LE < SYSDATE - 180 OR HTTP_STATUT <> 200)
    ORDER BY VERIFIE_LE NULLS FIRST`,
 'vue V_LIEN_A_REVERIFIER'],
];

// code, parcours, module, ordre, titre FR, titre EN, niveau escalier, durée min
const SUJETS = [
 ['DEC-00','decouverte','00', 0,"Chronomètre : où part ton temps",'Stopwatch: where your time goes',1,15],
 ['DEC-01','decouverte','01', 1,"Ce que Claude fait et ne fait pas",'What Claude does and does not do',1,15],
 ['DEC-02','decouverte','02', 2,"Écrire une demande qui marche — CRAFT",'Writing a request that works — CRAFT',1,20],
 ['DEC-03','decouverte','03', 3,"Ce qu'on ne colle jamais",'What you never paste',1,15],
 ['DEC-04','decouverte','04', 4,"Rédiger et reformuler",'Drafting and rephrasing',1,20],
 ['DEC-05','decouverte','05', 5,"Lire un document à ta place",'Reading a document for you',1,20],
 ['DEC-06','decouverte','06', 6,"Photo, capture, schéma",'Photo, screenshot, diagram',1,15],
 ['DEC-07','decouverte','07', 7,"Vérifier avant d'envoyer",'Check before you send',1,20],
 ['DEC-08','decouverte','08', 8,"Tableurs et données",'Spreadsheets and data',1,20],
 ['DEC-09','decouverte','09', 9,"Projects et instructions",'Projects and instructions',2,20],
 ['DEC-10','decouverte','10',10,"Ta tâche répétitive, une fois pour toutes",'Your repetitive task, once and for all',2,20],
 ['DEC-11','decouverte','11',11,"Démo de 5 minutes",'Five-minute demo',2,30],
 ['AVA-01','avance','01', 1,"Ce qu'est un agent — et quand ne pas en faire",'What an agent is — and when not to build one',3,45],
 ['AVA-02','avance','02', 2,"Donner des outils",'Giving it tools',3,60],
 ['AVA-03','avance','03', 3,"De Projects à Skills",'From Projects to Skills',3,45],
 ['AVA-04','avance','04', 4,"MCP et connecteurs",'MCP and connectors',3,60],
 ['AVA-05','avance','05', 5,"Un agent, de bout en bout",'An agent, end to end',3,60],
 ['AVA-06','avance','06', 6,"Tester, chiffrer, encadrer",'Test, cost, control',3,60],
];

const PROMPTING = 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices';

// sujet, langue, fournisseur, type, libellé, url
// Tous vérifiés HTTP 200 le 2026-08-09.
const LIENS = [
 ['DEC-00','fr','coursera','principal',"Productivité et outils d'IA",'https://www.coursera.org/fr-FR/learn/google-maximize-productivity-with-ai-tools'],
 ['DEC-00','en','coursera','principal','Maximise productivity with AI tools','https://www.coursera.org/learn/google-maximize-productivity-with-ai-tools'],
 ['DEC-01','fr','anthropic-academy','principal',"Capacités et limites de l'IA",'https://anthropic.skilljar.com/ai-capabilities-and-limitations'],
 ['DEC-01','en','anthropic-academy','principal','AI Capabilities and Limitations','https://anthropic.skilljar.com/ai-capabilities-and-limitations'],
 ['DEC-02','fr','claude-docs','principal',"Être clair et direct", PROMPTING+'#be-clear-and-direct'],
 ['DEC-02','en','claude-docs','principal','Be clear and direct', PROMPTING+'#be-clear-and-direct'],
 ['DEC-03','fr','coursera','principal',"Utiliser l'IA de manière responsable",'https://www.coursera.org/fr-FR/learn/google-use-ai-responsibly'],
 ['DEC-03','en','coursera','principal','Use AI responsibly','https://www.coursera.org/learn/google-use-ai-responsibly'],
 ['DEC-03','fr','anthropic','complement',"Centre de confidentialité Claude",'https://privacy.claude.com/en/'],
 ['DEC-03','en','anthropic','complement','Claude privacy center','https://privacy.claude.com/en/'],
 ['DEC-04','fr','claude-docs','principal',"Guider par l'exemple", PROMPTING+'#use-examples-effectively'],
 ['DEC-04','en','claude-docs','principal','Use examples effectively', PROMPTING+'#use-examples-effectively'],
 ['DEC-05','fr','claude-docs','principal',"Demander sur un long document", PROMPTING+'#long-context-prompting'],
 ['DEC-05','en','claude-docs','principal','Long context prompting', PROMPTING+'#long-context-prompting'],
 ['DEC-05','fr','claude-support','complement',"Déposer des fichiers dans Claude",'https://support.claude.com/en/articles/8241126-upload-files-to-claude'],
 ['DEC-05','en','claude-support','complement','Upload files to Claude','https://support.claude.com/en/articles/8241126-upload-files-to-claude'],
 ['DEC-06','fr','claude-docs','principal',"Vision — images et PDF",'https://platform.claude.com/docs/en/build-with-claude/vision'],
 ['DEC-06','en','claude-docs','principal','Vision — images and PDFs','https://platform.claude.com/docs/en/build-with-claude/vision'],
 ['DEC-07','fr','claude-docs','principal',"Réduire les hallucinations",'https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations'],
 ['DEC-07','en','claude-docs','principal','Reduce hallucinations','https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations'],
 ['DEC-08','fr','claude-support','principal',"Créer et modifier des fichiers",'https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude'],
 ['DEC-08','en','claude-support','principal','Create and edit files','https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude'],
 ['DEC-09','fr','claude-support','principal',"Qu'est-ce qu'un Project",'https://support.claude.com/en/articles/9517075-what-are-projects'],
 ['DEC-09','en','claude-support','principal','What are Projects','https://support.claude.com/en/articles/9517075-what-are-projects'],
 ['DEC-10','fr','anthropic-academy','principal',"AI Fluency — les 4D",'https://anthropic.skilljar.com/ai-fluency-framework-foundations'],
 ['DEC-10','en','anthropic-academy','principal','AI Fluency — the 4Ds','https://anthropic.skilljar.com/ai-fluency-framework-foundations'],
 ['DEC-10','fr','anthropic-academy','complement','AI Fluency for Small Businesses','https://anthropic.skilljar.com/ai-fluency-for-small-businesses'],
 ['DEC-10','en','anthropic-academy','complement','AI Fluency for Small Businesses','https://anthropic.skilljar.com/ai-fluency-for-small-businesses'],
 ['DEC-11','fr','anthropic-academy','principal',"Claude 101 — certificat",'https://anthropic.skilljar.com/claude-101'],
 ['DEC-11','en','anthropic-academy','principal','Claude 101 — certificate','https://anthropic.skilljar.com/claude-101'],
 ['AVA-01','fr','anthropic','principal','Building Effective Agents','https://www.anthropic.com/engineering/building-effective-agents'],
 ['AVA-01','en','anthropic','principal','Building Effective Agents','https://www.anthropic.com/engineering/building-effective-agents'],
 ['AVA-01','fr','anthropic-academy','complement','Introduction to subagents','https://anthropic.skilljar.com/introduction-to-subagents'],
 ['AVA-01','en','anthropic-academy','complement','Introduction to subagents','https://anthropic.skilljar.com/introduction-to-subagents'],
 ['AVA-02','fr','claude-docs','principal',"Tool use — vue d'ensemble",'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview'],
 ['AVA-02','en','claude-docs','principal','Tool use overview','https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview'],
 ['AVA-02','fr','anthropic-academy','complement','Building with the Claude API','https://anthropic.skilljar.com/claude-with-the-anthropic-api'],
 ['AVA-02','en','anthropic-academy','complement','Building with the Claude API','https://anthropic.skilljar.com/claude-with-the-anthropic-api'],
 ['AVA-03','fr','anthropic-academy','principal','Introduction to Agent Skills','https://anthropic.skilljar.com/introduction-to-agent-skills'],
 ['AVA-03','en','anthropic-academy','principal','Introduction to Agent Skills','https://anthropic.skilljar.com/introduction-to-agent-skills'],
 ['AVA-04','fr','anthropic-academy','principal','Introduction to MCP','https://anthropic.skilljar.com/introduction-to-model-context-protocol'],
 ['AVA-04','en','anthropic-academy','principal','Introduction to MCP','https://anthropic.skilljar.com/introduction-to-model-context-protocol'],
 ['AVA-05','fr','anthropic-academy','principal','MCP — Advanced Topics','https://anthropic.skilljar.com/model-context-protocol-advanced-topics'],
 ['AVA-05','en','anthropic-academy','principal','MCP — Advanced Topics','https://anthropic.skilljar.com/model-context-protocol-advanced-topics'],
 ['AVA-06','fr','claude-docs','principal',"Développer des tests",'https://platform.claude.com/docs/en/test-and-evaluate/develop-tests'],
 ['AVA-06','en','claude-docs','principal','Develop tests','https://platform.claude.com/docs/en/test-and-evaluate/develop-tests'],
];

const MERGE_SUJET = `
MERGE INTO SUJET t
USING (SELECT :code CODE, :parcours PARCOURS, :mod MODULE_NO, :ordre ORDRE,
              :tfr TITRE_FR, :ten TITRE_EN, :niv NIVEAU, :duree DUREE_MIN FROM DUAL) s
   ON (t.CODE = s.CODE)
 WHEN MATCHED THEN UPDATE SET t.PARCOURS=s.PARCOURS, t.MODULE_NO=s.MODULE_NO, t.ORDRE=s.ORDRE,
        t.TITRE_FR=s.TITRE_FR, t.TITRE_EN=s.TITRE_EN, t.NIVEAU=s.NIVEAU,
        t.DUREE_MIN=s.DUREE_MIN, t.UPDATED_AT=SYSTIMESTAMP
 WHEN NOT MATCHED THEN INSERT (CODE,PARCOURS,MODULE_NO,ORDRE,TITRE_FR,TITRE_EN,NIVEAU,DUREE_MIN)
        VALUES (s.CODE,s.PARCOURS,s.MODULE_NO,s.ORDRE,s.TITRE_FR,s.TITRE_EN,s.NIVEAU,s.DUREE_MIN)`;

const MERGE_LIEN = `
MERGE INTO LIEN t
USING (SELECT :code SUJET_CODE, :lang LANGUE, :type TYPE_LIEN,
              :four FOURNISSEUR, :lib LIBELLE, :url URL FROM DUAL) s
   ON (t.SUJET_CODE = s.SUJET_CODE AND t.LANGUE = s.LANGUE AND t.TYPE_LIEN = s.TYPE_LIEN)
 WHEN MATCHED THEN UPDATE SET t.FOURNISSEUR=s.FOURNISSEUR, t.LIBELLE=s.LIBELLE, t.URL=s.URL,
        t.ACTIF='O', t.UPDATED_AT=SYSTIMESTAMP
 WHEN NOT MATCHED THEN INSERT (SUJET_CODE,LANGUE,FOURNISSEUR,TYPE_LIEN,LIBELLE,URL,HTTP_STATUT,VERIFIE_LE)
        VALUES (s.SUJET_CODE,s.LANGUE,s.FOURNISSEUR,s.TYPE_LIEN,s.LIBELLE,s.URL,200,DATE '2026-08-09')`;

(async () => {
  const adminPwd = process.env.ORA_ADMIN_PASSWORD;
  const userPwd  = process.env.TRAINING_PASSWORD;
  if (!adminPwd || !userPwd) throw new Error('ORA_ADMIN_PASSWORD et TRAINING_PASSWORD requis');

  console.log('== 1. ADMIN : creation de l utilisateur TRAINING ==');
  const admin = await oracledb.getConnection({ ...base, user: 'ADMIN', password: adminPwd });
  await run(admin, `CREATE USER TRAINING IDENTIFIED BY "${userPwd}" DEFAULT TABLESPACE DATA QUOTA UNLIMITED ON DATA`, 'CREATE USER');
  await run(admin, `GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW, CREATE SEQUENCE TO TRAINING`, 'GRANT base');
  await admin.close();

  console.log('== 2. TRAINING : DDL ==');
  const c = await oracledb.getConnection({ ...base, user: 'TRAINING', password: userPwd });
  for (const [sql, l] of DDL)  await run(c, sql, l);
  for (const [sql, l] of VUES) await run(c, sql, l);

  console.log('== 3. Chargement des sujets ==');
  for (const [code, parcours, mod, ordre, tfr, ten, niv, duree] of SUJETS) {
    await c.execute(MERGE_SUJET, { code, parcours, mod, ordre, tfr, ten, niv, duree });
  }
  await c.commit();
  console.log(`  ${SUJETS.length} sujets`);

  console.log('== 4. Chargement des liens ==');
  for (const [code, lang, four, type, lib, url] of LIENS) {
    await c.execute(MERGE_LIEN, { code, lang, four, type, lib, url });
  }
  await c.commit();
  console.log(`  ${LIENS.length} liens`);

  console.log('== 5. Verification ==');
  const q = async (sql) => (await c.execute(sql)).rows;
  console.log('  sujets           :', (await q('SELECT COUNT(*) FROM SUJET'))[0][0]);
  console.log('  liens            :', (await q('SELECT COUNT(*) FROM LIEN'))[0][0]);
  console.log('  liens principaux :', (await q("SELECT COUNT(*) FROM LIEN WHERE TYPE_LIEN='principal'"))[0][0]);
  const orphelins = await q(`SELECT s.CODE, l.LANGUE FROM SUJET s
      CROSS JOIN (SELECT 'fr' LANGUE FROM DUAL UNION ALL SELECT 'en' FROM DUAL) l
      WHERE NOT EXISTS (SELECT 1 FROM LIEN x WHERE x.SUJET_CODE=s.CODE
                        AND x.LANGUE=l.LANGUE AND x.TYPE_LIEN='principal')`);
  console.log('  sujets sans lien principal :', orphelins.length ? orphelins : 'aucun');
  await c.close();
  console.log('== termine ==');
})().catch(e => { console.error(e); process.exit(1); });
