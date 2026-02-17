import type { AutomationSystem } from '@/types/automation';

/**
 * Position helper: convert column/row indices to pixel coordinates.
 * Row spacing 160 = NODE_H(92) + 40(label pad) + 16(bottom pad) + 12(gap)
 */
const p = (col: number, row: number) => ({ x: 40 + col * 340, y: 58 + row * 160 });

/** @deprecated – all templates now use p() with 160px spacing */

// ─── User Templates Storage ───────────────────────────────────────────────────

const USER_TEMPLATES_KEY = 'flowstack-user-templates';

export function loadUserTemplates(): AutomationSystem[] {
  try {
    const stored = localStorage.getItem(USER_TEMPLATES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveUserTemplates(templates: AutomationSystem[]): void {
  try {
    localStorage.setItem(USER_TEMPLATES_KEY, JSON.stringify(templates));
  } catch (e) {
    console.warn('localStorage Fehler beim Speichern:', e);
  }
}

export function deleteUserTemplate(id: string): AutomationSystem[] {
  const templates = loadUserTemplates().filter(t => t.id !== id);
  saveUserTemplates(templates);
  return templates;
}

// ─── Built-in Templates ───────────────────────────────────────────────────────

export const WORKFLOW_TEMPLATES: AutomationSystem[] = [
  // ─── Marketing Agentur Fulfillment ────────────────────────────────────────────
  {
    id: 'tpl-agentur-fulfillment',
    name: 'Marketing Agentur Fulfillment',
    description: 'Kompletter Agentur-Workflow mit 4 parallelen Lanes: Website, Social Media, Ads und E-Mail — vom Onboarding bis zum Abschluss-Reporting.',
    category: 'Agentur',
    icon: 'target',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      // ═══ Shared: Onboarding (c0–c3) ═══
      { id: 'f1',  label: 'Neukunde eingeht',       description: 'Deal in HubSpot gewonnen – Trigger',              icon: 'logo-hubspot',         type: 'trigger', ...p(0, 2) },
      { id: 'f2',  label: 'CRM-Setup',              description: 'Kundenprofil, Pipeline & Tags anlegen',           icon: 'logo-hubspot',         type: 'process', ...p(1, 2) },
      // Setup fan-out (star from CRM)
      { id: 'f3',  label: 'Willkommens-Mail',       description: 'Automatische Begrüßungs-Sequenz',                icon: 'logo-gmail',           type: 'output',  ...p(2, 0) },
      { id: 'f4',  label: 'Kundenordner',           description: 'Google Drive Struktur erstellen',                 icon: 'logo-google-drive',    type: 'output',  ...p(2, 1) },
      { id: 'f5',  label: 'Projekt-Board',          description: 'Notion-Projekt mit Aufgaben anlegen',             icon: 'logo-notion',          type: 'process', ...p(2, 2) },
      { id: 'f6',  label: 'Kick-off Termin',        description: 'Google Calendar Einladung',                       icon: 'logo-google-calendar', type: 'output',  ...p(2, 3) },
      { id: 'f7',  label: 'Team-Slack',             description: 'Team wird im Kanal informiert',                   icon: 'logo-slack',           type: 'output',  ...p(2, 4) },
      // Analyse
      { id: 'f8',  label: 'KI-Marktanalyse',        description: 'Branche, Wettbewerb & Trends analysieren',        icon: 'logo-openai',          type: 'ai',      ...p(3, 2) },

      // ═══ Strategie fan-out → 4 unabhängige Lanes (c4) ═══
      { id: 'f9',  label: 'Zielgruppen-Analyse',    description: 'KI-basiertes Audience Profiling für Website',     icon: 'logo-claude',          type: 'ai',      ...p(4, 0) },
      { id: 'f10', label: 'Social-Strategie',       description: 'Content-Typen, Formate & Posting-Plan',           icon: 'logo-instagram',       type: 'process', ...p(4, 1) },
      { id: 'f11', label: 'Strategie-Dokument',     description: 'Gesamt-Strategie & Positionierung',               icon: 'logo-google-docs',     type: 'output',  ...p(4, 2) },
      { id: 'f12', label: 'Ad-Strategie',           description: 'Targeting, Budgets & Kampagnenstruktur',          icon: 'logo-google-ads',      type: 'process', ...p(4, 3) },
      { id: 'f13', label: 'E-Mail-Strategie',       description: 'Sequenzen, Segmente & Automationen',              icon: 'logo-gmail',           type: 'process', ...p(4, 5) },

      // ═══ LANE W – Website (r0, komplett horizontal) ═══
      { id: 'f14', label: 'KI-Copywriting',         description: 'Website-Texte, Headlines & CTAs',                 icon: 'logo-claude',          type: 'ai',      ...p(5, 0) },
      { id: 'f15', label: 'Website-Erstellung',     description: 'Landing Page mit Copy aufbauen',                  icon: 'logo-wordpress',       type: 'process', ...p(6, 0) },
      { id: 'f16', label: 'Website Live',           description: 'Landing Page veröffentlichen',                    icon: 'logo-wordpress',       type: 'output',  ...p(7, 0) },

      // ═══ LANE S – Social Media (r1, komplett horizontal) ═══
      { id: 'f17', label: 'Visual-Erstellung',      description: 'Bilder, Reels & Grafiken via KI',                 icon: 'logo-openai',          type: 'ai',      ...p(5, 1) },
      { id: 'f18', label: 'Social Content',         description: 'Posts mit Captions & Visuals zusammenstellen',    icon: 'logo-meta',            type: 'process', ...p(6, 1) },
      { id: 'f19', label: 'Instagram Posting',      description: 'Posts automatisch veröffentlichen',               icon: 'logo-instagram',       type: 'output',  ...p(7, 1) },

      // ═══ LANE A – Advertising (r3–r4, komplett horizontal) ═══
      { id: 'f20', label: 'Kampagnen-Planung',      description: 'Zielgruppen, Budgets & Anzeigengruppen',          icon: 'logo-google-ads',      type: 'process', ...p(5, 3) },
      { id: 'f21', label: 'Ad-Creatives',           description: 'Anzeigen-Texte, Bilder & Videos',                 icon: 'logo-google-ads',      type: 'process', ...p(6, 3) },
      { id: 'f22', label: 'Meta Ads Upload',        description: 'Anzeigen direkt in Meta hochladen',               icon: 'logo-meta',            type: 'output',  ...p(7, 3) },
      { id: 'f23', label: 'Google Ads Upload',      description: 'Anzeigen direkt in Google Ads hochladen',         icon: 'logo-google-ads',      type: 'output',  ...p(7, 4) },

      // ═══ LANE E – E-Mail (r5, komplett horizontal) ═══
      { id: 'f24', label: 'E-Mail Texte',           description: 'Newsletter-Copy & Betreffzeilen via KI',          icon: 'logo-claude',          type: 'ai',      ...p(5, 5) },
      { id: 'f25', label: 'E-Mail Design',          description: 'Templates & Layouts gestalten',                   icon: 'logo-gmail',           type: 'process', ...p(6, 5) },
      { id: 'f26', label: 'E-Mail Kampagne',        description: 'Newsletter-Sequenz starten',                      icon: 'logo-gmail',           type: 'output',  ...p(7, 5) },

      // ═══ Shared: Monitoring & Abschluss (c8–c11) ═══
      { id: 'f27', label: 'Performance-Tracking',   description: 'KPIs aller Kanäle in Echtzeit',                  icon: 'logo-google-analytics', type: 'process', ...p(8, 2) },
      { id: 'f28', label: 'KI-Optimierung',         description: 'Automatische Kampagnen-Anpassung',               icon: 'logo-openai',          type: 'ai',      ...p(9, 1) },
      { id: 'f29', label: 'Wöchentliches Update',   description: 'Status-Report via Slack an Kunden',              icon: 'logo-slack',           type: 'output',  ...p(9, 2) },
      { id: 'f30', label: 'Ergebnis-Report',        description: 'KI-generierter Abschlussbericht',                icon: 'logo-claude',          type: 'ai',      ...p(10, 2) },
      { id: 'f31', label: 'Abschluss-PDF',          description: 'Formatierter PDF-Report für den Kunden',         icon: 'logo-google-docs',     type: 'output',  ...p(11, 1) },
      { id: 'f32', label: 'Kundenfeedback',         description: 'Bewertungs-Formular senden',                     icon: 'logo-typeform',        type: 'output',  ...p(11, 2) },
      { id: 'f33', label: 'Archivierung',           description: 'Projekt archivieren & übergeben',                icon: 'logo-google-drive',    type: 'output',  ...p(11, 3) },
    ],
    connections: [
      // ── Shared: Trigger → CRM → Setup → Analyse ──
      { from: 'f1', to: 'f2' },
      { from: 'f2', to: 'f3' },
      { from: 'f2', to: 'f4' },
      { from: 'f2', to: 'f5' },
      { from: 'f2', to: 'f6' },
      { from: 'f2', to: 'f7' },
      { from: 'f5', to: 'f8' },

      // ── Analyse → 4 Lane-Starter + Strategie-Dok (star fan-out) ──
      { from: 'f8', to: 'f9' },     // → Zielgruppen (r0)
      { from: 'f8', to: 'f10' },    // → Social-Strategie (r1)
      { from: 'f8', to: 'f11' },    // → Strategie-Dok (r2)
      { from: 'f8', to: 'f12' },    // → Ad-Strategie (r3)
      { from: 'f8', to: 'f13' },    // → E-Mail-Strategie (r5)

      // ── LANE W: Website (r0, horizontal, unabhängig) ──
      { from: 'f9',  to: 'f14' },   // ZG-Analyse → Copy
      { from: 'f14', to: 'f15' },   // Copy → Website bauen
      { from: 'f15', to: 'f16' },   // Website → Live

      // ── LANE S: Social Media (r1, horizontal, unabhängig) ──
      { from: 'f10', to: 'f17' },   // Social-Strategie → Visuals
      { from: 'f17', to: 'f18' },   // Visuals → Social Content
      { from: 'f18', to: 'f19' },   // Social Content → Instagram

      // ── LANE A: Advertising (r3, horizontal, unabhängig) ──
      { from: 'f12', to: 'f20' },   // Ad-Strategie → Kampagnen-Plan
      { from: 'f20', to: 'f21' },   // Plan → Creatives
      { from: 'f21', to: 'f22' },   // Creatives → Meta Ads
      { from: 'f21', to: 'f23' },   // Creatives → Google Ads

      // ── LANE E: E-Mail (r5, horizontal, unabhängig) ──
      { from: 'f13', to: 'f24' },   // E-Mail-Strategie → Texte
      { from: 'f24', to: 'f25' },   // Texte → Design
      { from: 'f25', to: 'f26' },   // Design → Kampagne

      // ── Alle Lanes → Tracking (merge) ──
      { from: 'f16', to: 'f27' },   // Website Live → Tracking
      { from: 'f19', to: 'f27' },   // Instagram → Tracking
      { from: 'f22', to: 'f27' },   // Meta Ads → Tracking
      { from: 'f23', to: 'f27' },   // Google Ads → Tracking
      { from: 'f26', to: 'f27' },   // E-Mail → Tracking

      // ── Monitoring → Report → Abschluss ──
      { from: 'f27', to: 'f28' },
      { from: 'f27', to: 'f29' },
      { from: 'f28', to: 'f30' },
      { from: 'f29', to: 'f30' },
      { from: 'f30', to: 'f31' },
      { from: 'f30', to: 'f32' },
      { from: 'f30', to: 'f33' },
    ],
    groups: [
      // Rows: r0=58, r1=218, r2=378, r3=538, r4=698, r5=858 | NODE_H=92
      // Group formula: top = first_node_y - 40 (label space), bottom = last_node_y + 92 + 16
      // 1-row h=148, 2-row h=308, 3-row h=468 | gap between adjacent = 12px
      // ── Shared start ──
      { id: 'gf1', label: 'Kunden-Eingang',            x: 15,   y: 338, width: 620,  height: 148, color: 'blue' },
      { id: 'gf2', label: 'Projekt-Setup',              x: 695,  y: 18,  width: 280,  height: 788, color: 'blue' },
      { id: 'gf3', label: 'KI-Analyse',                 x: 1035, y: 338, width: 280,  height: 148, color: 'purple' },
      // ── 4 Lane-Gruppen (12px gap between adjacent lanes) ──
      { id: 'gf4', label: 'Website · Konzeption → Live',       x: 1375, y: 18,  width: 1300, height: 148, color: 'blue' },
      { id: 'gf5', label: 'Social Media · Content → Posting',  x: 1375, y: 178, width: 1300, height: 148, color: 'purple' },
      { id: 'gf6', label: 'Advertising · Creatives → Upload',  x: 1375, y: 498, width: 1300, height: 308, color: 'orange' },
      { id: 'gf7', label: 'E-Mail · Texte → Versand',          x: 1375, y: 818, width: 1300, height: 148, color: 'green' },
      // ── Shared end ──
      { id: 'gf8', label: 'Monitoring & Optimierung',   x: 2735, y: 178, width: 620,  height: 308, color: 'green' },
      { id: 'gf9', label: 'Abschluss & Übergabe',       x: 3415, y: 178, width: 620,  height: 468, color: 'red' },
    ],
    outputs: [],
    executionCount: 0,
  },
  // ─── Recruiting Fulfillment ─────────────────────────────────────────────────
  // Aufgebaut nach dem Vorbild des Marketing Agentur Fulfillment Templates:
  // 27 Nodes, p() Spacing (160px), 7 Phasen, pragmatisch & übersichtlich.
  // Zusammenführen-Nodes nur wo das "alle Teile fertig"-Signal wichtig ist.
  {
    id: 'tpl-recruiting',
    name: 'Recruiting Fulfillment',
    description: 'End-to-End Fulfillment für eine Recruiting-Agentur: Vom Kundengespräch über Knowledge Processing und Asset-Produktion bis zum Handover mit Tracking.',
    category: 'Recruiting',
    icon: 'users',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      // ═══ Phase 1: Kickoff (c0–c1) ═══
      { id: 'rc1',  label: 'Formular eingereicht',     description: 'Neuer Recruiting-Kunde',                icon: 'logo-typeform',       type: 'trigger', ...p(0, 2) },
      { id: 'rc2',  label: 'Slack: Neuer Kunde',       description: 'Team über neuen Kunden informieren',     icon: 'logo-slack',          type: 'output',  ...p(1, 1) },
      { id: 'rc3',  label: 'Kundenordner & Templates', description: 'Drive-Ordner und Vorlagen anlegen',      icon: 'logo-google-drive',   type: 'output',  ...p(1, 2) },
      { id: 'rc4',  label: 'Onboarding-Termin',        description: 'Erstgespräch mit Kunden buchen',         icon: 'logo-calendly',       type: 'output',  ...p(1, 3) },

      // ═══ Phase 2: Onboarding (c2–c3) ═══
      { id: 'rc5',  label: 'Onboarding Call',           description: 'Erstgespräch mit dem Kunden',            icon: 'video',               type: 'process', ...p(2, 2) },
      { id: 'rc6',  label: 'KI-Transkription',          description: 'Gespräch transkribieren und analysieren', icon: 'logo-openai',        type: 'ai',      ...p(3, 2) },

      // ═══ Phase 3: Knowledge Processing (c4–c7) ═══
      { id: 'rc7',  label: 'Daten auslesen',            description: 'Key-Infos aus Transkript extrahieren',   icon: 'scan',                type: 'ai',      ...p(4, 2) },
      { id: 'rc8',  label: 'Employer Profile',          description: 'Arbeitgeber-Steckbrief erstellen',       icon: 'logo-google-docs',    type: 'output',  ...p(5, 1) },
      { id: 'rc9',  label: 'Stellenprofil & Personas',  description: 'Rollen- und Zielgruppen-Profile',        icon: 'logo-google-docs',    type: 'output',  ...p(5, 2) },
      { id: 'rc10', label: 'Ansprache & Compliance',    description: 'Angle Matrix und Compliance-Regeln',     icon: 'logo-google-docs',    type: 'output',  ...p(5, 3) },
      { id: 'rc11', label: 'Zusammenführen',            description: 'Alle 3 Dokumente vollständig',           icon: 'git-merge',           type: 'process', ...p(6, 2) },
      { id: 'rc12', label: 'Freigabe: Fakten',          description: 'Manuelle Faktenprüfung',                 icon: 'shield-check',        type: 'process', ...p(7, 2) },

      // ═══ Phase 4: Produktion – 3 parallele Lanes (c8–c9) ═══
      { id: 'rc13', label: 'KI: Landing Page',          description: 'Landing-Page-Texte mit KI erstellen',    icon: 'logo-claude',         type: 'ai',      ...p(8, 0) },
      { id: 'rc14', label: 'Landing Page Draft',        description: 'Entwurf als Google Doc',                 icon: 'logo-google-docs',    type: 'output',  ...p(9, 0) },
      { id: 'rc15', label: 'KI: Ad Copy',               description: 'Ad Copy pro Persona generieren',         icon: 'logo-claude',         type: 'ai',      ...p(8, 2) },
      { id: 'rc16', label: 'Ad Copy Pack',              description: 'Alle Ad Copies gesammelt',               icon: 'logo-google-docs',    type: 'output',  ...p(9, 2) },
      { id: 'rc17', label: 'KI: Creative Prompts',      description: 'Creative-Prompts generieren',            icon: 'logo-claude',         type: 'ai',      ...p(8, 4) },
      { id: 'rc18', label: 'Creative Prompt Pack',      description: 'Prompt-Pack als Google Doc',             icon: 'logo-google-docs',    type: 'output',  ...p(9, 4) },

      // ═══ Phase 5: Copy Review (c10–c11) ═══
      { id: 'rc19', label: 'Zusammenführen',            description: 'Alle 3 Asset-Pakete komplett',           icon: 'git-merge',           type: 'process', ...p(10, 2) },
      { id: 'rc20', label: 'Freigabe: Copy',            description: 'Manuelle Copy-Prüfung',                  icon: 'shield-check',        type: 'process', ...p(11, 2) },

      // ═══ Phase 6: Handover (c12–c13) ═══
      { id: 'rc21', label: 'PDF Summary Pack',          description: 'Alles als PDF zusammenfassen',           icon: 'file-type-2',         type: 'output',  ...p(12, 2) },
      { id: 'rc22', label: 'Gmail an Client',           description: 'Übergabe-Mail an Kunden senden',        icon: 'logo-gmail',          type: 'output',  ...p(13, 1) },
      { id: 'rc23', label: 'Drive speichern',           description: 'PDF im Kundenordner ablegen',            icon: 'logo-google-drive',   type: 'output',  ...p(13, 2) },
      { id: 'rc24', label: 'Slack: Handover done',      description: 'Team über Übergabe informieren',         icon: 'logo-slack',          type: 'output',  ...p(13, 3) },

      // ═══ Phase 7: Tracking (c14–c15) ═══
      { id: 'rc25', label: 'Zeitplan (wöchentl.)',      description: 'Wiederkehrender Wochenrhythmus',         icon: 'calendar',            type: 'trigger', ...p(14, 2) },
      { id: 'rc26', label: 'KPI Update',                description: 'Performance-Daten aktualisieren',        icon: 'logo-google-sheets',  type: 'process', ...p(15, 1) },
      { id: 'rc27', label: 'Slack Weekly Report',       description: 'Wöchentlichen Report posten',            icon: 'logo-slack',          type: 'output',  ...p(15, 2) },
    ],
    connections: [
      // Phase 1: Trigger → fan-out
      { from: 'rc1', to: 'rc2' }, { from: 'rc1', to: 'rc3' }, { from: 'rc1', to: 'rc4' },
      // Phase 2: Termin → Call → Transkription
      { from: 'rc4', to: 'rc5' }, { from: 'rc5', to: 'rc6' },
      // Phase 3: Analyse → 3 Documents → Zusammenführen → Freigabe
      { from: 'rc6', to: 'rc7' },
      { from: 'rc7', to: 'rc8' }, { from: 'rc7', to: 'rc9' }, { from: 'rc7', to: 'rc10' },
      { from: 'rc8', to: 'rc11' }, { from: 'rc9', to: 'rc11' }, { from: 'rc10', to: 'rc11' },
      { from: 'rc11', to: 'rc12' },
      // Phase 4: Freigabe → 3 Produktion-Lanes
      { from: 'rc12', to: 'rc13' }, { from: 'rc12', to: 'rc15' }, { from: 'rc12', to: 'rc17' },
      { from: 'rc13', to: 'rc14' }, { from: 'rc15', to: 'rc16' }, { from: 'rc17', to: 'rc18' },
      // Phase 5: 3 Assets → Zusammenführen → Copy Review
      { from: 'rc14', to: 'rc19' }, { from: 'rc16', to: 'rc19' }, { from: 'rc18', to: 'rc19' },
      { from: 'rc19', to: 'rc20' },
      // Phase 6: Review → PDF → Handover fan-out
      { from: 'rc20', to: 'rc21' },
      { from: 'rc21', to: 'rc22' }, { from: 'rc21', to: 'rc23' }, { from: 'rc21', to: 'rc24' },
      // Phase 7: Tracking (unabhängig)
      { from: 'rc25', to: 'rc26' }, { from: 'rc25', to: 'rc27' },
    ],
    groups: [
      // p() rows: r0=58, r1=218, r2=378, r3=538, r4=698
      // Group formula: x = 15 + min_col×340, y = 18 + min_row×160, w = (cols-1)×340 + 280, h = (rows-1)×160 + 148
      { id: 'grc1', label: 'Kickoff',              x: 15,   y: 178, width: 620,  height: 468, color: 'blue' },
      { id: 'grc2', label: 'Onboarding',            x: 695,  y: 338, width: 620,  height: 148, color: 'blue' },
      { id: 'grc3', label: 'Knowledge Processing',  x: 1375, y: 178, width: 1300, height: 468, color: 'purple' },
      { id: 'grc4', label: 'Produktion',             x: 2735, y: 18,  width: 620,  height: 788, color: 'purple' },
      { id: 'grc5', label: 'Copy Review',            x: 3415, y: 338, width: 620,  height: 148, color: 'orange' },
      { id: 'grc6', label: 'Handover',               x: 4095, y: 178, width: 620,  height: 468, color: 'green' },
      { id: 'grc7', label: 'Tracking',               x: 4775, y: 178, width: 620,  height: 308, color: 'gray' },
    ],
    outputs: [],
    executionCount: 0,
  },
  // ─── Buchhaltung & Rechnungen ──────────────────────────────────────────────
  {
    id: 'tpl-buchhaltung',
    name: 'Buchhaltung & Rechnungen',
    description: 'Eingangsrechnungen erfassen, Ausgangsrechnungen erstellen, überfällige Posten automatisch mahnen und monatlich einen Finance-Report generieren.',
    category: 'Finance',
    icon: 'file-text',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      { id: 'bk1',  label: 'E-Mail empfangen',      description: 'Eingehende Rechnung per E-Mail',       icon: 'logo-gmail',          type: 'trigger', ...p(0, 1) },
      { id: 'bk2',  label: 'Daten auslesen',         description: 'Betrag, Datum, Absender extrahieren',  icon: 'scan',                type: 'ai',      ...p(1, 1) },
      { id: 'bk3',  label: 'Drive Ablegen',           description: 'Rechnung im Ordner /Finance/ speichern', icon: 'logo-google-drive', type: 'output',  ...p(2, 0) },
      { id: 'bk4',  label: 'Finance Ledger',          description: 'Neue Zeile im Tracking-Sheet anlegen', icon: 'logo-google-sheets',  type: 'process', ...p(2, 1) },
      { id: 'bk5',  label: 'Slack: Neue Rechnung',   description: 'Team über neue Eingangsrechnung informieren', icon: 'logo-slack',    type: 'output',  ...p(2, 2) },
      { id: 'bk6',  label: 'Formular eingereicht',   description: 'Neue Rechnung / Angebot anlegen',      icon: 'logo-typeform',       type: 'trigger', ...p(3, 1) },
      { id: 'bk7',  label: 'Docs Rechnung',           description: 'Rechnungs-Dokument aus Template',     icon: 'logo-google-docs',    type: 'output',  ...p(4, 0) },
      { id: 'bk8',  label: 'PDF erstellen',           description: 'Rechnung als PDF generieren',          icon: 'file-type-2',         type: 'output',  ...p(4, 1) },
      { id: 'bk9',  label: 'Gmail an Kunden',         description: 'PDF-Rechnung an Kunden senden',        icon: 'logo-gmail',          type: 'output',  ...p(5, 0) },
      { id: 'bk10', label: 'Drive Outgoing',          description: 'PDF im Ordner /Outgoing/ speichern',   icon: 'logo-google-drive',   type: 'output',  ...p(5, 1) },
      { id: 'bk11', label: 'Zeitplan (täglich)',     description: 'Tägliche Prüfung offener Rechnungen',  icon: 'calendar',            type: 'trigger', ...p(6, 1) },
      { id: 'bk12', label: 'Sheets Lookup',           description: 'Offene Posten nach Fälligkeit suchen', icon: 'file-search',         type: 'process', ...p(7, 1) },
      { id: 'bk13', label: 'Überfällig?',            description: 'Prüfen ob Rechnung überfällig ist',    icon: 'git-branch',          type: 'process', ...p(8, 1) },
      { id: 'bk14', label: 'Gmail Erinnerung',       description: 'Zahlungserinnerung an Kunden senden',  icon: 'logo-gmail',          type: 'output',  ...p(9, 0) },
      { id: 'bk15', label: 'Slack Hinweis',           description: 'Team über überfällige Rechnung informieren', icon: 'logo-slack',    type: 'output',  ...p(9, 1) },
      { id: 'bk16', label: 'Sheets Status',           description: 'Status auf "Erinnert" setzen',         icon: 'logo-google-sheets',  type: 'process', ...p(9, 2) },
      { id: 'bk17', label: 'Zeitplan (monatlich)',   description: 'Monatlicher Finance-Report',            icon: 'calendar',            type: 'trigger', ...p(10, 1) },
      { id: 'bk18', label: 'KI-Analyse',             description: 'Ledger zusammenfassen: Summen & Trends', icon: 'logo-openai',        type: 'ai',      ...p(11, 1) },
      { id: 'bk19', label: 'PDF Monatsreport',       description: 'Report als PDF generieren',             icon: 'file-type-2',         type: 'output',  ...p(11, 0) },
      { id: 'bk20', label: 'Gmail intern',            description: 'Report per E-Mail intern versenden',   icon: 'logo-gmail',          type: 'output',  ...p(12, 0) },
      { id: 'bk21', label: 'Slack: Report fertig',   description: 'Monatsreport im Slack posten',         icon: 'logo-slack',          type: 'output',  ...p(12, 1) },
      { id: 'bk22', label: 'Fehlerbehandlung',       description: 'Fehler im Workflow abfangen',           icon: 'shield-alert',        type: 'process', ...p(6, 4) },
      { id: 'bk23', label: 'Slack: Error',            description: 'Finance Workflow Error melden',         icon: 'logo-slack',          type: 'output',  ...p(7, 4) },
    ],
    connections: [
      { from: 'bk1', to: 'bk2' }, { from: 'bk2', to: 'bk3' }, { from: 'bk2', to: 'bk4' }, { from: 'bk2', to: 'bk5' },
      { from: 'bk6', to: 'bk7' }, { from: 'bk6', to: 'bk8' }, { from: 'bk8', to: 'bk9' }, { from: 'bk8', to: 'bk10' },
      { from: 'bk11', to: 'bk12' }, { from: 'bk12', to: 'bk13' },
      { from: 'bk13', to: 'bk14', label: 'Ja' }, { from: 'bk13', to: 'bk15' }, { from: 'bk14', to: 'bk16' },
      { from: 'bk17', to: 'bk18' }, { from: 'bk18', to: 'bk19' }, { from: 'bk19', to: 'bk20' }, { from: 'bk18', to: 'bk21' },
      { from: 'bk22', to: 'bk23' },
    ],
    groups: [
      { id: 'gbk1', label: 'Phase 1 – Eingangsrechnungen',  x: 15,   y: 18,  width: 960,  height: 468, color: 'blue' },
      { id: 'gbk2', label: 'Phase 2 – Ausgangsrechnungen',   x: 1035, y: 18,  width: 960,  height: 308, color: 'blue' },
      { id: 'gbk3', label: 'Phase 3 – Tracking & Mahnwesen', x: 2055, y: 18,  width: 1300, height: 468, color: 'orange' },
      { id: 'gbk4', label: 'Phase 4 – Monatsabschluss',       x: 3415, y: 18,  width: 960,  height: 308, color: 'green' },
      { id: 'gbk5', label: 'Fehlerbehandlung',                x: 2055, y: 658, width: 620,  height: 148, color: 'orange' },
    ],
    outputs: [],
    executionCount: 0,
  },
  // ─── Coach Inbox Copilot ───────────────────────────────────────────────────
  {
    id: 'tpl-coach-inbox',
    name: 'Coach Inbox Copilot',
    description: 'Eingehende Anfragen automatisch klassifizieren, FAQ-Antworten per KI entwerfen, Coach-Freigabe einholen und bei unbeantworteten Nachrichten erinnern.',
    category: 'Coaching',
    icon: 'mail',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      { id: 'ci1',  label: 'E-Mail empfangen',      description: 'Neue Anfrage im Postfach',             icon: 'logo-gmail',          type: 'trigger', ...p(0, 1) },
      { id: 'ci2',  label: 'Automatisch sortieren',  description: 'Kategorie: FAQ / Buchung / Kundenfrage', icon: 'brain',             type: 'ai',      ...p(1, 0) },
      { id: 'ci3',  label: 'Inbox Tracker',           description: 'Anfrage im Tracking-Sheet erfassen',   icon: 'logo-google-sheets',  type: 'process', ...p(1, 1) },
      { id: 'ci4',  label: 'Slack: Neue Anfrage',    description: 'Team über Eingang informieren',         icon: 'logo-slack',          type: 'output',  ...p(1, 2) },
      { id: 'ci5',  label: 'FAQ?',                   description: 'Ist es eine Standardfrage?',            icon: 'git-branch',          type: 'process', ...p(2, 1) },
      { id: 'ci6',  label: 'Text generieren',         description: 'KI-Antwortentwurf für FAQ erstellen',  icon: 'logo-openai',         type: 'ai',      ...p(3, 0) },
      { id: 'ci7',  label: 'Sheets: Needs Human',    description: 'Als "Mensch nötig" markieren',          icon: 'logo-google-sheets',  type: 'process', ...p(3, 2) },
      { id: 'ci8',  label: 'Text-Template',           description: 'Ton, Signatur und CTA anwenden',       icon: 'type',                type: 'process', ...p(4, 0) },
      { id: 'ci9',  label: 'Freigabe: Coach',        description: 'Coach prüft und bestätigt Antwort',    icon: 'shield-check',        type: 'process', ...p(5, 1) },
      { id: 'ci10', label: 'Gmail senden',            description: 'Freigegebene Antwort versenden',       icon: 'logo-gmail',          type: 'output',  ...p(6, 0) },
      { id: 'ci11', label: 'Sheets: Status',          description: 'Tracking-Status aktualisieren',        icon: 'logo-google-sheets',  type: 'process', ...p(6, 1) },
      { id: 'ci12', label: 'Zeitplan (täglich)',     description: 'Tägliche Prüfung unbeantworteter Anfragen', icon: 'calendar',        type: 'trigger', ...p(7, 1) },
      { id: 'ci13', label: 'Sheets Lookup',           description: 'Offene Anfragen > 24h suchen',         icon: 'file-search',         type: 'process', ...p(8, 1) },
      { id: 'ci14', label: 'Slack Reminder',          description: 'Erinnerung: Antwort fällig',           icon: 'logo-slack',          type: 'output',  ...p(9, 0) },
      { id: 'ci15', label: 'Benachrichtigung',       description: 'Push-Notification an Coach',            icon: 'bell',                type: 'output',  ...p(9, 1) },
      { id: 'ci16', label: 'Fehlerbehandlung',       description: 'Fehler im Workflow abfangen',           icon: 'shield-alert',        type: 'process', ...p(7, 3) },
      { id: 'ci17', label: 'Slack: Error',            description: 'Inbox Copilot Error melden',           icon: 'logo-slack',          type: 'output',  ...p(8, 3) },
    ],
    connections: [
      { from: 'ci1', to: 'ci2' }, { from: 'ci2', to: 'ci3' }, { from: 'ci3', to: 'ci4' },
      { from: 'ci3', to: 'ci5' },
      { from: 'ci5', to: 'ci6', label: 'FAQ' }, { from: 'ci5', to: 'ci7', label: 'Individuell' },
      { from: 'ci6', to: 'ci8' },
      { from: 'ci8', to: 'ci9' },
      { from: 'ci9', to: 'ci10', label: 'Freigegeben' },
      { from: 'ci10', to: 'ci11' },
      { from: 'ci9', to: 'ci11', label: 'Abgelehnt' },
      { from: 'ci12', to: 'ci13' }, { from: 'ci13', to: 'ci14' }, { from: 'ci13', to: 'ci15' },
      { from: 'ci16', to: 'ci17' },
    ],
    groups: [
      { id: 'gci1', label: 'Phase 1 – Erfassung',          x: 15,   y: 18,  width: 620,  height: 468, color: 'blue' },
      { id: 'gci2', label: 'Phase 2 – Klassifizierung',     x: 695,  y: 18,  width: 620,  height: 468, color: 'purple' },
      { id: 'gci3', label: 'Phase 3 – Antwort & Freigabe',  x: 1375, y: 18,  width: 960,  height: 308, color: 'green' },
      { id: 'gci4', label: 'Phase 4 – Reminder',             x: 2395, y: 18,  width: 960,  height: 308, color: 'orange' },
      { id: 'gci5', label: 'Fehlerbehandlung',               x: 2395, y: 498, width: 620,  height: 148, color: 'orange' },
    ],
    outputs: [],
    executionCount: 0,
  },
  // ─── LinkedIn Outreach Assistant ───────────────────────────────────────────
  {
    id: 'tpl-linkedin-outreach',
    name: 'LinkedIn Outreach Assistant',
    description: 'Lead-Intake aus Sheets/CRM, KI-personalisierte Outreach-Messages, Follow-up-Sequenz mit Delays, Terminbuchung und wöchentliches KPI-Reporting.',
    category: 'Sales',
    icon: 'target',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      { id: 'lo1',  label: 'Tabelle geändert',      description: 'Neuer Lead in Leads-Sheet',            icon: 'logo-google-sheets',  type: 'trigger', ...p(0, 1) },
      { id: 'lo2',  label: 'Duplikat-Check',         description: 'Doppelte Leads verhindern',             icon: 'copy-check',          type: 'process', ...p(1, 1) },
      { id: 'lo3',  label: 'Slack: Neuer Lead',      description: 'Team über neuen Lead informieren',      icon: 'logo-slack',          type: 'output',  ...p(1, 0) },
      { id: 'lo4',  label: 'KI-Analyse',             description: '3 personalisierte Ansprache-Points ableiten', icon: 'logo-openai',   type: 'ai',      ...p(2, 1) },
      { id: 'lo5',  label: 'Lead Brief (Docs)',      description: 'Personalisierungs-Brief als Google Doc', icon: 'logo-google-docs',   type: 'output',  ...p(3, 1) },
      { id: 'lo6',  label: 'Text generieren',         description: 'Outreach-Message mit KI erstellen',    icon: 'logo-openai',         type: 'ai',      ...p(4, 1) },
      { id: 'lo7',  label: 'Freigabe',               description: 'Message vor Versand prüfen',            icon: 'shield-check',        type: 'process', ...p(5, 1) },
      { id: 'lo8',  label: 'Slack: Copy ready',      description: 'Message freigegeben und bereit',         icon: 'logo-slack',          type: 'output',  ...p(6, 0) },
      { id: 'lo9',  label: 'Sheets Status',           description: 'Lead-Status auf "Approved" setzen',    icon: 'logo-google-sheets',  type: 'process', ...p(6, 1) },
      { id: 'lo10', label: 'Warten (2 Tage)',        description: 'Auf Antwort warten',                    icon: 'clock',               type: 'process', ...p(7, 1) },
      { id: 'lo11', label: 'Antwort?',               description: 'Hat der Lead geantwortet?',              icon: 'git-branch',          type: 'process', ...p(8, 1) },
      { id: 'lo12', label: 'Text generieren (FU)',   description: 'Follow-up-Message erstellen',            icon: 'logo-openai',         type: 'ai',      ...p(9, 0) },
      { id: 'lo13', label: 'Sheets: Follow-up',      description: 'Status auf "Follow-up sent" setzen',    icon: 'logo-google-sheets',  type: 'process', ...p(9, 2) },
      { id: 'lo14', label: 'Google Calendar',         description: 'Termin-Event erstellen',                icon: 'calendar',            type: 'output',  ...p(10, 1) },
      { id: 'lo15', label: 'Gmail Bestätigung',      description: 'Terminbestätigung + Agenda senden',     icon: 'logo-gmail',          type: 'output',  ...p(11, 0) },
      { id: 'lo16', label: 'Slack: Termin gesetzt',  description: 'Team über gebuchten Termin informieren', icon: 'logo-slack',          type: 'output',  ...p(11, 1) },
      { id: 'lo17', label: 'Sheets Pipeline',         description: 'Pipeline-Status auf "Booked" setzen',  icon: 'logo-google-sheets',  type: 'process', ...p(11, 2) },
      { id: 'lo18', label: 'Zeitplan (wöchentl.)',   description: 'Wöchentliches KPI-Update',              icon: 'calendar',            type: 'trigger', ...p(12, 1) },
      { id: 'lo19', label: 'Slack KPI Summary',      description: 'Outreach-KPIs im Slack posten',         icon: 'logo-slack',          type: 'output',  ...p(13, 1) },
      { id: 'lo20', label: 'Fehlerbehandlung',       description: 'Fehler im Workflow abfangen',           icon: 'shield-alert',        type: 'process', ...p(7, 4) },
      { id: 'lo21', label: 'Slack: Error',            description: 'Outreach Assistant Error melden',       icon: 'logo-slack',          type: 'output',  ...p(8, 4) },
    ],
    connections: [
      { from: 'lo1', to: 'lo2' }, { from: 'lo1', to: 'lo3' },
      { from: 'lo2', to: 'lo4' },
      { from: 'lo4', to: 'lo5' },
      { from: 'lo5', to: 'lo6' },
      { from: 'lo6', to: 'lo7' },
      { from: 'lo7', to: 'lo8', label: 'Freigegeben' }, { from: 'lo8', to: 'lo9' },
      { from: 'lo7', to: 'lo9', label: 'Abgelehnt' },
      { from: 'lo9', to: 'lo10' },
      { from: 'lo10', to: 'lo11' },
      { from: 'lo11', to: 'lo12', label: 'Keine Antwort' },
      { from: 'lo12', to: 'lo13' },
      { from: 'lo11', to: 'lo14', label: 'Antwort' },
      { from: 'lo14', to: 'lo15' }, { from: 'lo14', to: 'lo16' }, { from: 'lo14', to: 'lo17' },
      { from: 'lo18', to: 'lo19' },
      { from: 'lo20', to: 'lo21' },
    ],
    groups: [
      { id: 'glo1', label: 'Phase 1 – Lead Intake',         x: 15,   y: 18,  width: 620,  height: 308, color: 'blue' },
      { id: 'glo2', label: 'Phase 2 – Personalization',      x: 695,  y: 178, width: 620,  height: 148, color: 'blue' },
      { id: 'glo3', label: 'Phase 3 – Message & Freigabe',   x: 1375, y: 18,  width: 960,  height: 308, color: 'purple' },
      { id: 'glo4', label: 'Phase 4 – Follow-up',            x: 2395, y: 18,  width: 960,  height: 468, color: 'orange' },
      { id: 'glo5', label: 'Phase 5 – Termin',               x: 3415, y: 18,  width: 620,  height: 468, color: 'green' },
      { id: 'glo6', label: 'Phase 6 – KPIs',                 x: 4095, y: 178, width: 620,  height: 148, color: 'gray' },
      { id: 'glo7', label: 'Fehlerbehandlung',               x: 2395, y: 658, width: 620,  height: 148, color: 'orange' },
    ],
    outputs: [],
    executionCount: 0,
  },
  // ─── E-Commerce Automation ─────────────────────────────────────────────────
  {
    id: 'tpl-ecommerce',
    name: 'E-Commerce Automation',
    description: 'Vom Bestelleingang über KI-Betrugserkennung und Fulfillment bis zur Lieferverfolgung und Retouren-Management — vollautomatisiert.',
    category: 'E-Commerce',
    icon: 'shopping-cart',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      // Phase 1: Bestelleingang (col 0-1)
      { id: 'ec1',  label: 'Neue Bestellung',          description: 'Eingehende Bestellung empfangen',             icon: 'shopping-cart',        type: 'trigger', ...p(0, 1) },
      { id: 'ec2',  label: 'Bestelldaten prüfen',      description: 'Bestelldetails validieren',                   icon: 'scan',                 type: 'process', ...p(1, 0) },
      { id: 'ec3',  label: 'CRM-Eintrag',              description: 'Kundendatensatz im CRM anlegen',              icon: 'logo-hubspot',         type: 'process', ...p(1, 1) },
      { id: 'ec4',  label: 'Slack: Neue Bestellung',   description: 'Team über neue Bestellung informieren',       icon: 'logo-slack',           type: 'output',  ...p(1, 2) },

      // Phase 2: Prüfung & Zahlung (col 2-3)
      { id: 'ec5',  label: 'KI-Betrugscheck',          description: 'Automatische Betrugserkennung',               icon: 'logo-openai',          type: 'ai',      ...p(2, 1) },
      { id: 'ec6',  label: 'Zahlungsabwicklung',       description: 'Zahlung verarbeiten',                         icon: 'credit-card',          type: 'process', ...p(3, 0) },
      { id: 'ec7',  label: 'Rechnung erstellen',       description: 'Rechnungsdokument generieren',                icon: 'file-type-2',          type: 'output',  ...p(3, 1) },
      { id: 'ec8',  label: 'Bestellbestätigung',       description: 'Bestätigungsmail an Kunden senden',           icon: 'logo-gmail',           type: 'output',  ...p(3, 2) },

      // Phase 3: Fulfillment & Versand (col 4-5)
      { id: 'ec9',  label: 'Lager-Check',              description: 'Produktverfügbarkeit prüfen',                 icon: 'search',               type: 'process', ...p(4, 1) },
      { id: 'ec10', label: 'KI-Produktempfehlung',     description: 'Personalisierte Upsell-Vorschläge',           icon: 'logo-claude',          type: 'ai',      ...p(4, 0) },
      { id: 'ec11', label: 'Versandlabel erstellen',   description: 'Versandlabel generieren',                     icon: 'truck',                type: 'process', ...p(5, 0) },
      { id: 'ec12', label: 'Tracking-Nummer',          description: 'Tracking-Informationen erfassen',             icon: 'logo-google-sheets',   type: 'output',  ...p(5, 1) },
      { id: 'ec13', label: 'Versandbenachrichtigung',  description: 'Versanddetails an Kunden senden',             icon: 'logo-gmail',           type: 'output',  ...p(5, 2) },

      // Phase 4: Lieferung & After-Sales (col 6-7)
      { id: 'ec14', label: 'Lieferstatus-Tracking',    description: 'Sendungsstatus überwachen',                   icon: 'map-pin',              type: 'process', ...p(6, 1) },
      { id: 'ec15', label: 'Lieferbestätigung',        description: 'Erfolgreiche Zustellung bestätigen',          icon: 'logo-gmail',           type: 'output',  ...p(7, 0) },
      { id: 'ec16', label: 'KI-Bewertungsanfrage',     description: 'Personalisierte Bewertungsanfrage',           icon: 'logo-claude',          type: 'ai',      ...p(7, 1) },
      { id: 'ec17', label: 'Umsatz-Tracking',          description: 'Umsatz-Dashboard aktualisieren',             icon: 'logo-google-sheets',   type: 'output',  ...p(7, 2) },

      // Phase 5: Retouren (col 8-10)
      { id: 'ec18', label: 'Retoure eingegangen',      description: 'Eingehende Retoure verarbeiten',              icon: 'undo-2',               type: 'trigger', ...p(8, 1) },
      { id: 'ec19', label: 'KI-Retoure-Analyse',       description: 'Retourengrund und Berechtigung prüfen',       icon: 'logo-openai',          type: 'ai',      ...p(9, 0) },
      { id: 'ec20', label: 'Erstattung veranlassen',   description: 'Erstattungstransaktion einleiten',            icon: 'logo-google-sheets',   type: 'process', ...p(9, 1) },
      { id: 'ec21', label: 'Erstattungsbestätigung',   description: 'Erstattungsbestätigung per Mail',             icon: 'logo-gmail',           type: 'output',  ...p(10, 0) },
      { id: 'ec22', label: 'Retoure-Report',           description: 'Retourenzusammenfassung an Team',             icon: 'logo-slack',           type: 'output',  ...p(10, 1) },
    ],
    connections: [
      // Bestelleingang
      { from: 'ec1', to: 'ec2' }, { from: 'ec1', to: 'ec3' }, { from: 'ec1', to: 'ec4' },
      // Prüfung
      { from: 'ec2', to: 'ec5' }, { from: 'ec3', to: 'ec5' },
      { from: 'ec5', to: 'ec6' }, { from: 'ec5', to: 'ec7' }, { from: 'ec5', to: 'ec8' },
      // Fulfillment
      { from: 'ec6', to: 'ec9' },
      { from: 'ec9', to: 'ec10' }, { from: 'ec9', to: 'ec11' },
      { from: 'ec11', to: 'ec12' }, { from: 'ec11', to: 'ec13' },
      // Lieferung
      { from: 'ec12', to: 'ec14' },
      { from: 'ec10', to: 'ec15' },
      { from: 'ec14', to: 'ec15' }, { from: 'ec14', to: 'ec16' }, { from: 'ec14', to: 'ec17' },
      // Retouren
      { from: 'ec18', to: 'ec19' },
      { from: 'ec19', to: 'ec20' },
      { from: 'ec20', to: 'ec21' }, { from: 'ec20', to: 'ec22' },
    ],
    groups: [
      { id: 'gec1', label: 'Bestelleingang',            x: 15,   y: 18,  width: 620,  height: 468, color: 'blue' },
      { id: 'gec2', label: 'Prüfung & Zahlung',         x: 695,  y: 18,  width: 620,  height: 468, color: 'purple' },
      { id: 'gec3', label: 'Fulfillment & Versand',      x: 1375, y: 18,  width: 620,  height: 468, color: 'blue' },
      { id: 'gec4', label: 'Lieferung & After-Sales',    x: 2055, y: 18,  width: 620,  height: 468, color: 'green' },
      { id: 'gec5', label: 'Retouren-Management',        x: 2735, y: 18,  width: 960,  height: 308, color: 'orange' },
    ],
    outputs: [],
    executionCount: 0,
  },
  // ─── Kundensupport Automation ──────────────────────────────────────────────
  {
    id: 'tpl-customer-support',
    name: 'Kundensupport Automation',
    description: 'KI-gestützte Ticket-Klassifizierung, automatisierte Antwort-Entwürfe, Agent-Review-Workflow und Kundenzufriedenheits-Tracking.',
    category: 'Support',
    icon: 'headphones',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      // Phase 1: Ticket-Eingang (col 0-1)
      { id: 'cs1',  label: 'E-Mail-Ticket',            description: 'Support-Anfrage per E-Mail',                  icon: 'logo-gmail',           type: 'trigger', ...p(0, 0) },
      { id: 'cs2',  label: 'Chat-Ticket',              description: 'Support-Anfrage per Chat',                    icon: 'message-square',       type: 'trigger', ...p(0, 2) },
      { id: 'cs3',  label: 'Ticket-Erfassung',         description: 'Ticket erstellen und zuweisen',               icon: 'logo-notion',          type: 'process', ...p(1, 1) },
      { id: 'cs4',  label: 'Slack: Neues Ticket',      description: 'Team über neues Ticket informieren',          icon: 'logo-slack',           type: 'output',  ...p(1, 0) },
      { id: 'cs5',  label: 'Sheets: Ticket-Log',       description: 'Ticket im Tracking-Sheet erfassen',           icon: 'logo-google-sheets',   type: 'output',  ...p(1, 2) },

      // Phase 2: KI-Klassifizierung (col 2-3)
      { id: 'cs6',  label: 'KI-Klassifizierung',       description: 'Ticket-Typ und Dringlichkeit bestimmen',      icon: 'logo-openai',          type: 'ai',      ...p(2, 1) },
      { id: 'cs7',  label: 'Priorität bestimmen',      description: 'Prioritätslevel zuweisen',                    icon: 'alert-triangle',       type: 'process', ...p(3, 0) },
      { id: 'cs8',  label: 'Kategorie zuweisen',       description: 'An zuständige Abteilung weiterleiten',        icon: 'git-branch',           type: 'process', ...p(3, 1) },
      { id: 'cs9',  label: 'SLA-Timer setzen',         description: 'Reaktionszeit-Tracking starten',              icon: 'timer',                type: 'process', ...p(3, 2) },

      // Phase 3: Bearbeitung (col 4-5)
      { id: 'cs10', label: 'KI-Antwort entwerfen',     description: 'Antwortvorschlag generieren',                 icon: 'logo-claude',          type: 'ai',      ...p(4, 0) },
      { id: 'cs11', label: 'FAQ-Datenbank prüfen',     description: 'Wissensdatenbank nach Treffern durchsuchen',  icon: 'file-search',          type: 'process', ...p(4, 1) },
      { id: 'cs12', label: 'Agent-Review',             description: 'Agent prüft und bearbeitet Antwort',          icon: 'shield-check',         type: 'process', ...p(5, 1) },

      // Phase 4: Antwort & Status (col 6)
      { id: 'cs13', label: 'Gmail: Antwort senden',    description: 'Freigegebene Antwort an Kunden senden',       icon: 'logo-gmail',           type: 'output',  ...p(6, 0) },
      { id: 'cs14', label: 'Ticket-Status updaten',    description: 'Ticket als gelöst markieren',                 icon: 'logo-notion',          type: 'process', ...p(6, 1) },
      { id: 'cs15', label: 'Sheets: Tracking',         description: 'Tracking-Dashboard aktualisieren',            icon: 'logo-google-sheets',   type: 'output',  ...p(6, 2) },

      // Phase 5: Follow-up & KPIs (col 7-9)
      { id: 'cs16', label: 'Warten (48h)',             description: 'Zeit für Kundenrückmeldung',                  icon: 'clock',                type: 'process', ...p(7, 1) },
      { id: 'cs17', label: 'KI-Zufriedenheitsumfrage', description: 'Personalisierte Umfrage generieren',          icon: 'logo-claude',          type: 'ai',      ...p(8, 1) },
      { id: 'cs18', label: 'Gmail: Feedback-Anfrage',  description: 'Zufriedenheitsumfrage per Mail senden',       icon: 'logo-gmail',           type: 'output',  ...p(9, 0) },
      { id: 'cs19', label: 'Slack: Ticket-Report',     description: 'Ticket-Metriken an Team posten',              icon: 'logo-slack',           type: 'output',  ...p(9, 1) },
      { id: 'cs20', label: 'KPI-Dashboard',            description: 'Support-KPI-Dashboard aktualisieren',         icon: 'logo-google-sheets',   type: 'output',  ...p(9, 2) },
    ],
    connections: [
      // Eingang
      { from: 'cs1', to: 'cs3' }, { from: 'cs2', to: 'cs3' },
      { from: 'cs3', to: 'cs4' }, { from: 'cs3', to: 'cs5' }, { from: 'cs3', to: 'cs6' },
      // Klassifizierung
      { from: 'cs6', to: 'cs7' }, { from: 'cs6', to: 'cs8' }, { from: 'cs6', to: 'cs9' },
      // Bearbeitung
      { from: 'cs7', to: 'cs11' }, { from: 'cs8', to: 'cs10' },
      { from: 'cs11', to: 'cs10' },
      { from: 'cs10', to: 'cs12' },
      // Antwort
      { from: 'cs12', to: 'cs13' }, { from: 'cs12', to: 'cs14' }, { from: 'cs12', to: 'cs15' },
      // Follow-up
      { from: 'cs14', to: 'cs16' },
      { from: 'cs16', to: 'cs17' },
      { from: 'cs17', to: 'cs18' },
      { from: 'cs18', to: 'cs19' }, { from: 'cs18', to: 'cs20' },
    ],
    groups: [
      { id: 'gcs1', label: 'Ticket-Eingang',            x: 15,   y: 18,  width: 620,  height: 468, color: 'blue' },
      { id: 'gcs2', label: 'KI-Klassifizierung',        x: 695,  y: 18,  width: 620,  height: 468, color: 'purple' },
      { id: 'gcs3', label: 'Bearbeitung & Review',       x: 1375, y: 18,  width: 620,  height: 308, color: 'purple' },
      { id: 'gcs4', label: 'Antwort & Status',           x: 2055, y: 18,  width: 280,  height: 468, color: 'green' },
      { id: 'gcs5', label: 'Follow-up & KPIs',           x: 2395, y: 18,  width: 960,  height: 468, color: 'orange' },
    ],
    outputs: [],
    executionCount: 0,
  },
  // ─── Social Media Management ───────────────────────────────────────────────
  {
    id: 'tpl-social-media',
    name: 'Social Media Management',
    description: 'KI-gesteuerte Content-Erstellung für Instagram, LinkedIn, TikTok und Facebook mit automatisiertem Publishing, Engagement-Monitoring und Performance-Analytics.',
    category: 'Marketing',
    icon: 'share-2',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      // Phase 1: Planung & Recherche (col 0-1)
      { id: 'sm1',  label: 'Redaktionsplan-Trigger',   description: 'Neuer Content-Slot ausgelöst',                icon: 'calendar',             type: 'trigger', ...p(0, 2) },
      { id: 'sm2',  label: 'KI-Trend-Analyse',         description: 'Aktuelle Trends und Themen identifizieren',   icon: 'logo-openai',          type: 'ai',      ...p(1, 1) },
      { id: 'sm3',  label: 'KI-Themen-Recherche',      description: 'Content-Ideen recherchieren und validieren',   icon: 'logo-claude',          type: 'ai',      ...p(1, 2) },
      { id: 'sm4',  label: 'Notion: Content-Plan',     description: 'Redaktionskalender aktualisieren',             icon: 'logo-notion',          type: 'output',  ...p(1, 3) },

      // Phase 2: Content-Erstellung (col 2-3)
      { id: 'sm5',  label: 'KI: Instagram Content',    description: 'Instagram Captions und Hooks generieren',      icon: 'logo-instagram',       type: 'ai',      ...p(2, 0) },
      { id: 'sm6',  label: 'KI: LinkedIn Content',     description: 'Professionelle LinkedIn Posts erstellen',      icon: 'logo-linkedin',        type: 'ai',      ...p(2, 1) },
      { id: 'sm7',  label: 'KI: TikTok Content',       description: 'TikTok Scripts und Hooks schreiben',           icon: 'logo-meta',            type: 'ai',      ...p(2, 3) },
      { id: 'sm8',  label: 'KI: Facebook Content',     description: 'Facebook Posts mit CTAs verfassen',             icon: 'logo-meta',            type: 'ai',      ...p(2, 4) },
      { id: 'sm9',  label: 'Visual-Generierung',       description: 'Bilder und Grafiken per KI erstellen',         icon: 'logo-openai',          type: 'ai',      ...p(3, 0) },
      { id: 'sm10', label: 'Hashtag-Optimierung',      description: 'Hashtags recherchieren und optimieren',        icon: 'logo-google-sheets',   type: 'process', ...p(3, 2) },
      { id: 'sm11', label: 'Captions anpassen',        description: 'Captions für jede Plattform feintunen',        icon: 'type',                 type: 'process', ...p(3, 4) },

      // Phase 3: Review & Freigabe (col 4-5)
      { id: 'sm12', label: 'Content-Review',           description: 'Interne Qualitätsprüfung',                    icon: 'shield-check',         type: 'process', ...p(4, 2) },
      { id: 'sm13', label: 'Freigabe',                 description: 'Finale Freigabe vor Veröffentlichung',         icon: 'shield-check',         type: 'process', ...p(5, 2) },

      // Phase 4: Veröffentlichung (col 6)
      { id: 'sm14', label: 'Instagram Posting',        description: 'In Instagram Feed/Stories veröffentlichen',    icon: 'logo-instagram',       type: 'output',  ...p(6, 0) },
      { id: 'sm15', label: 'LinkedIn Posting',         description: 'Auf LinkedIn veröffentlichen',                 icon: 'logo-linkedin',        type: 'output',  ...p(6, 1) },
      { id: 'sm16', label: 'TikTok Posting',           description: 'Auf TikTok veröffentlichen',                   icon: 'logo-meta',            type: 'output',  ...p(6, 3) },
      { id: 'sm17', label: 'Facebook Posting',         description: 'Auf Facebook veröffentlichen',                 icon: 'logo-meta',            type: 'output',  ...p(6, 4) },

      // Phase 5: Analytics & Reporting (col 7-9)
      { id: 'sm18', label: 'Engagement-Monitor',       description: 'Likes, Kommentare und Shares tracken',         icon: 'logo-google-analytics', type: 'process', ...p(7, 2) },
      { id: 'sm19', label: 'KI-Performance-Analyse',   description: 'Content-Performance mit KI analysieren',       icon: 'logo-claude',          type: 'ai',      ...p(8, 1) },
      { id: 'sm20', label: 'Performance-Report',       description: 'Analytics-Report generieren',                  icon: 'logo-google-docs',     type: 'output',  ...p(8, 2) },
      { id: 'sm21', label: 'Slack: Weekly Update',     description: 'Wöchentliche Performance-Zusammenfassung',     icon: 'logo-slack',           type: 'output',  ...p(8, 3) },
      { id: 'sm22', label: 'Sheets: KPI-Tracking',    description: 'KPI-Tracking-Sheet aktualisieren',             icon: 'logo-google-sheets',   type: 'output',  ...p(9, 2) },
    ],
    connections: [
      // Planung
      { from: 'sm1', to: 'sm2' }, { from: 'sm1', to: 'sm4' },
      { from: 'sm2', to: 'sm3' },
      // Content-Erstellung (fan-out)
      { from: 'sm3', to: 'sm5' }, { from: 'sm3', to: 'sm6' }, { from: 'sm3', to: 'sm7' }, { from: 'sm3', to: 'sm8' },
      { from: 'sm5', to: 'sm9' }, { from: 'sm6', to: 'sm10' }, { from: 'sm7', to: 'sm10' }, { from: 'sm8', to: 'sm11' },
      // Review
      { from: 'sm9', to: 'sm12' }, { from: 'sm10', to: 'sm12' }, { from: 'sm11', to: 'sm12' },
      { from: 'sm12', to: 'sm13' },
      // Veröffentlichung
      { from: 'sm13', to: 'sm14' }, { from: 'sm13', to: 'sm15' }, { from: 'sm13', to: 'sm16' }, { from: 'sm13', to: 'sm17' },
      // Analytics
      { from: 'sm14', to: 'sm18' }, { from: 'sm15', to: 'sm18' }, { from: 'sm16', to: 'sm18' }, { from: 'sm17', to: 'sm18' },
      { from: 'sm18', to: 'sm19' },
      { from: 'sm19', to: 'sm20' }, { from: 'sm19', to: 'sm21' },
      { from: 'sm20', to: 'sm22' },
    ],
    groups: [
      { id: 'gsm1', label: 'Planung & Recherche',        x: 15,   y: 178, width: 620,  height: 468, color: 'blue' },
      { id: 'gsm2', label: 'Content-Erstellung',          x: 695,  y: 18,  width: 620,  height: 788, color: 'purple' },
      { id: 'gsm3', label: 'Review & Freigabe',           x: 1375, y: 338, width: 620,  height: 148, color: 'orange' },
      { id: 'gsm4', label: 'Veröffentlichung',            x: 2055, y: 18,  width: 280,  height: 788, color: 'green' },
      { id: 'gsm5', label: 'Analytics & Reporting',       x: 2395, y: 178, width: 960,  height: 468, color: 'green' },
    ],
    outputs: [],
    executionCount: 0,
  },
  // ─── Mitarbeiter-Onboarding ────────────────────────────────────────────────
  {
    id: 'tpl-hr-onboarding',
    name: 'Mitarbeiter-Onboarding',
    description: 'Automatisiertes Onboarding neuer Mitarbeiter mit IT-Einrichtung, KI-generiertem Willkommenspaket, Trainingsplan, Buddy-Zuweisung und Check-in-Umfragen.',
    category: 'HR',
    icon: 'user-plus',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      // Phase 1: Erfassung & Setup (col 0-1)
      { id: 'hr1',  label: 'Neuer Mitarbeiter',        description: 'Neue Einstellung bestätigt',                  icon: 'user-plus',            type: 'trigger', ...p(0, 1) },
      { id: 'hr2',  label: 'HR-Datensatz anlegen',     description: 'Mitarbeiterprofil erstellen',                  icon: 'logo-google-sheets',   type: 'process', ...p(1, 0) },
      { id: 'hr3',  label: 'Slack: Team informieren',  description: 'Neues Teammitglied ankündigen',                icon: 'logo-slack',           type: 'output',  ...p(1, 1) },
      { id: 'hr4',  label: 'Calendar: Termine',        description: 'Onboarding-Termine erstellen',                icon: 'logo-google-calendar', type: 'output',  ...p(1, 2) },

      // Phase 2: IT & Willkommen (col 2-3)
      { id: 'hr5',  label: 'IT-Setup: Accounts',       description: 'E-Mail, Tools und Zugänge einrichten',        icon: 'logo-google-drive',    type: 'process', ...p(2, 0) },
      { id: 'hr6',  label: 'KI: Willkommenspaket',     description: 'Personalisierte Willkommensmaterialien',      icon: 'logo-claude',          type: 'ai',      ...p(2, 1) },
      { id: 'hr7',  label: 'Drive: Mitarbeiterordner', description: 'Persönlichen Dokumentenordner erstellen',     icon: 'logo-google-drive',    type: 'output',  ...p(2, 2) },
      { id: 'hr8',  label: 'Arbeitsvertrag generieren', description: 'Arbeitsvertrag erstellen',                   icon: 'logo-google-docs',     type: 'output',  ...p(3, 0) },
      { id: 'hr9',  label: 'Equipment-Bestellung',     description: 'Laptop und Peripherie bestellen',             icon: 'logo-notion',          type: 'process', ...p(3, 1) },
      { id: 'hr10', label: 'Gmail: Willkommens-Mail',  description: 'Willkommensmail mit Ersttagsinfo senden',     icon: 'logo-gmail',           type: 'output',  ...p(3, 2) },

      // Phase 3: Training & Buddy (col 4-5)
      { id: 'hr11', label: 'KI: Trainingsplan',        description: 'Personalisierten Lernpfad erstellen',         icon: 'logo-openai',          type: 'ai',      ...p(4, 1) },
      { id: 'hr12', label: 'Notion: Onboarding-Board', description: 'Aufgaben-Board mit Meilensteinen erstellen',  icon: 'logo-notion',          type: 'output',  ...p(5, 0) },
      { id: 'hr13', label: 'Buddy-Zuweisung',          description: 'Onboarding-Buddy zuweisen',                   icon: 'users',                type: 'process', ...p(5, 1) },
      { id: 'hr14', label: 'Gmail: Buddy-Info',        description: 'Buddy über neuen Mitarbeiter informieren',    icon: 'logo-gmail',           type: 'output',  ...p(5, 2) },

      // Phase 4: Check-in (col 6-7)
      { id: 'hr15', label: 'Zeitplan (Tag 7)',         description: 'Check-in-Trigger nach erster Woche',          icon: 'calendar',             type: 'trigger', ...p(6, 1) },
      { id: 'hr16', label: 'KI: Check-in Fragen',     description: 'Personalisierte Check-in-Umfrage erstellen',  icon: 'logo-claude',          type: 'ai',      ...p(7, 0) },
      { id: 'hr17', label: 'Gmail: Check-in senden',  description: 'Check-in-Umfrage an Mitarbeiter senden',      icon: 'logo-gmail',           type: 'output',  ...p(7, 1) },

      // Phase 5: Feedback & Tracking (col 8-9)
      { id: 'hr18', label: 'KI: Feedback auswerten',  description: 'Check-in-Antworten analysieren',              icon: 'logo-openai',          type: 'ai',      ...p(8, 1) },
      { id: 'hr19', label: 'Slack: HR-Report',         description: 'Onboarding-Fortschritt an HR teilen',         icon: 'logo-slack',           type: 'output',  ...p(9, 0) },
      { id: 'hr20', label: 'Sheets: Tracking',         description: 'Onboarding-Tracking-Sheet aktualisieren',    icon: 'logo-google-sheets',   type: 'output',  ...p(9, 1) },
    ],
    connections: [
      // Erfassung
      { from: 'hr1', to: 'hr2' }, { from: 'hr1', to: 'hr3' }, { from: 'hr1', to: 'hr4' },
      // IT & Willkommen
      { from: 'hr2', to: 'hr5' }, { from: 'hr2', to: 'hr6' }, { from: 'hr2', to: 'hr7' },
      { from: 'hr5', to: 'hr8' }, { from: 'hr6', to: 'hr9' }, { from: 'hr6', to: 'hr10' },
      // Training
      { from: 'hr8', to: 'hr11' }, { from: 'hr9', to: 'hr11' },
      { from: 'hr11', to: 'hr12' }, { from: 'hr11', to: 'hr13' },
      { from: 'hr13', to: 'hr14' },
      // Check-in
      { from: 'hr15', to: 'hr16' },
      { from: 'hr16', to: 'hr17' },
      // Feedback
      { from: 'hr17', to: 'hr18' },
      { from: 'hr18', to: 'hr19' }, { from: 'hr18', to: 'hr20' },
    ],
    groups: [
      { id: 'ghr1', label: 'Erfassung & Setup',         x: 15,   y: 18,  width: 620,  height: 468, color: 'blue' },
      { id: 'ghr2', label: 'IT & Willkommen',            x: 695,  y: 18,  width: 620,  height: 468, color: 'blue' },
      { id: 'ghr3', label: 'Training & Buddy',           x: 1375, y: 18,  width: 620,  height: 468, color: 'purple' },
      { id: 'ghr4', label: 'Check-in',                   x: 2055, y: 18,  width: 620,  height: 308, color: 'orange' },
      { id: 'ghr5', label: 'Feedback & Tracking',        x: 2735, y: 18,  width: 620,  height: 308, color: 'green' },
    ],
    outputs: [],
    executionCount: 0,
  },
];

// ─── English Translations ────────────────────────────────────────────────────

export const TEMPLATE_META_EN: Record<string, { name: string; description: string }> = {
  'tpl-agentur-fulfillment': { name: 'Marketing Agency Fulfillment',    description: 'Complete agency workflow with 4 parallel lanes: Website, Social Media, Ads, and Email — from onboarding to final reporting.' },
  'tpl-recruiting':        { name: 'Recruiting Fulfillment',            description: 'End-to-end fulfillment for a recruiting agency: from client meeting through knowledge processing and asset production to launch and tracking.' },
  'tpl-buchhaltung':       { name: 'Accounting & Invoices',             description: 'Capture incoming invoices, create outgoing invoices, automatically send dunning for overdue items and generate a monthly finance report.' },
  'tpl-coach-inbox':       { name: 'Coach Inbox Copilot',               description: 'Automatically classify incoming inquiries, draft FAQ answers with AI, get coach approval and send reminders for unanswered messages.' },
  'tpl-linkedin-outreach': { name: 'LinkedIn Outreach Assistant',       description: 'Lead intake from Sheets/CRM, AI-personalized outreach messages, follow-up sequence with delays, appointment booking and weekly KPI reporting.' },
  'tpl-ecommerce':         { name: 'E-Commerce Automation',            description: 'From order intake through AI fraud detection and fulfillment to delivery tracking and returns management — fully automated.' },
  'tpl-customer-support':  { name: 'Customer Support Automation',      description: 'AI-powered ticket classification, automated response drafting, agent review workflow, and customer satisfaction tracking.' },
  'tpl-social-media':      { name: 'Social Media Management',          description: 'AI-driven content creation for Instagram, LinkedIn, TikTok and Facebook with automated publishing, engagement monitoring, and performance analytics.' },
  'tpl-hr-onboarding':     { name: 'Employee Onboarding',              description: 'Automated new hire setup with IT provisioning, AI-generated welcome packages, training plans, buddy assignment, and check-in surveys.' },
};

export const TEMPLATE_NODE_EN: Record<string, { label: string; description: string }> = {
  // ─── Agentur Fulfillment ───
  'f1':  { label: 'New Client Arrives',       description: 'Deal won in HubSpot — Trigger' },
  'f2':  { label: 'CRM Setup',               description: 'Create client profile, pipeline & tags' },
  'f3':  { label: 'Welcome Email',            description: 'Automatic welcome sequence' },
  'f4':  { label: 'Client Folder',            description: 'Create Google Drive structure' },
  'f5':  { label: 'Project Board',            description: 'Create Notion project with tasks' },
  'f6':  { label: 'Kick-off Meeting',         description: 'Google Calendar invitation' },
  'f7':  { label: 'Team Slack',               description: 'Team notified in channel' },
  'f8':  { label: 'AI Market Analysis',       description: 'Analyze industry, competition & trends' },
  'f9':  { label: 'Audience Analysis',        description: 'AI-based audience profiling for website' },
  'f10': { label: 'Social Strategy',          description: 'Content types, formats & posting plan' },
  'f11': { label: 'Strategy Document',        description: 'Overall strategy & positioning' },
  'f12': { label: 'Ad Strategy',              description: 'Targeting, budgets & campaign structure' },
  'f13': { label: 'Email Strategy',           description: 'Sequences, segments & automations' },
  'f14': { label: 'AI Copywriting',           description: 'Website copy, headlines & CTAs' },
  'f15': { label: 'Website Creation',         description: 'Build landing page with copy' },
  'f16': { label: 'Website Live',             description: 'Publish landing page' },
  'f17': { label: 'Visual Creation',          description: 'Images, reels & graphics via AI' },
  'f18': { label: 'Social Content',           description: 'Assemble posts with captions & visuals' },
  'f19': { label: 'Instagram Posting',        description: 'Publish posts automatically' },
  'f20': { label: 'Campaign Planning',        description: 'Audiences, budgets & ad groups' },
  'f21': { label: 'Ad Creatives',             description: 'Ad copy, images & videos' },
  'f22': { label: 'Meta Ads Upload',          description: 'Upload ads directly to Meta' },
  'f23': { label: 'Google Ads Upload',        description: 'Upload ads directly to Google Ads' },
  'f24': { label: 'Email Copy',               description: 'Newsletter copy & subject lines via AI' },
  'f25': { label: 'Email Design',             description: 'Design templates & layouts' },
  'f26': { label: 'Email Campaign',           description: 'Launch newsletter sequence' },
  'f27': { label: 'Performance Tracking',     description: 'Real-time KPIs across all channels' },
  'f28': { label: 'AI Optimization',          description: 'Automatic campaign adjustment' },
  'f29': { label: 'Weekly Update',            description: 'Status report via Slack to client' },
  'f30': { label: 'Results Report',           description: 'AI-generated final report' },
  'f31': { label: 'Final PDF',                description: 'Formatted PDF report for the client' },
  'f32': { label: 'Client Feedback',          description: 'Send review form' },
  'f33': { label: 'Archiving',               description: 'Archive project & hand over' },

  // ─── Recruiting Fulfillment ───
  'rc1':  { label: 'Form Submitted',             description: 'New recruiting client' },
  'rc2':  { label: 'Slack: New Client',           description: 'Notify team about new client' },
  'rc3':  { label: 'Client Folder & Templates',   description: 'Create Drive folder and templates' },
  'rc4':  { label: 'Onboarding Appointment',      description: 'Schedule initial meeting with client' },
  'rc5':  { label: 'Onboarding Call',             description: 'Initial meeting with the client' },
  'rc6':  { label: 'AI Transcription',            description: 'Transcribe and analyze conversation' },
  'rc7':  { label: 'Extract Data',               description: 'Extract key information from transcript' },
  'rc8':  { label: 'Employer Profile',            description: 'Create employer fact sheet' },
  'rc9':  { label: 'Job Profile & Personas',      description: 'Role and target audience profiles' },
  'rc10': { label: 'Messaging & Compliance',      description: 'Angle matrix and compliance rules' },
  'rc11': { label: 'Merge',                      description: 'All 3 documents complete' },
  'rc12': { label: 'Approval: Facts',            description: 'Manual fact-check review' },
  'rc13': { label: 'AI: Landing Page',            description: 'Generate landing page copy with AI' },
  'rc14': { label: 'Landing Page Draft',          description: 'Draft as Google Doc' },
  'rc15': { label: 'AI: Ad Copy',                description: 'Generate ad copy per persona' },
  'rc16': { label: 'Ad Copy Pack',               description: 'All ad copies collected' },
  'rc17': { label: 'AI: Creative Prompts',        description: 'Generate creative prompts' },
  'rc18': { label: 'Creative Prompt Pack',        description: 'Prompt pack as Google Doc' },
  'rc19': { label: 'Merge',                      description: 'All 3 asset packages complete' },
  'rc20': { label: 'Approval: Copy',             description: 'Manual copy review' },
  'rc21': { label: 'PDF Summary Pack',           description: 'Compile everything as PDF' },
  'rc22': { label: 'Gmail to Client',            description: 'Send handover email to client' },
  'rc23': { label: 'Save to Drive',              description: 'Store PDF in client folder' },
  'rc24': { label: 'Slack: Handover Done',        description: 'Notify team about handover' },
  'rc25': { label: 'Schedule (Weekly)',           description: 'Recurring weekly rhythm' },
  'rc26': { label: 'KPI Update',                 description: 'Update performance data' },
  'rc27': { label: 'Slack Weekly Report',         description: 'Post weekly report' },


  // ─── Accounting & Invoices ───
  'bk1':  { label: 'Email Received',            description: 'Incoming invoice via email' },
  'bk2':  { label: 'Extract Data',              description: 'Extract amount, date, sender' },
  'bk3':  { label: 'Store in Drive',            description: 'Save invoice in /Finance/ folder' },
  'bk4':  { label: 'Finance Ledger',            description: 'Create new row in tracking sheet' },
  'bk5':  { label: 'Slack: New Invoice',         description: 'Inform team about new incoming invoice' },
  'bk6':  { label: 'Form Submitted',            description: 'Create new invoice / quote' },
  'bk7':  { label: 'Docs Invoice',              description: 'Invoice document from template' },
  'bk8':  { label: 'Create PDF',                description: 'Generate invoice as PDF' },
  'bk9':  { label: 'Gmail to Client',           description: 'Send PDF invoice to client' },
  'bk10': { label: 'Drive Outgoing',            description: 'Save PDF in /Outgoing/ folder' },
  'bk11': { label: 'Schedule (Daily)',           description: 'Daily check of open invoices' },
  'bk12': { label: 'Sheets Lookup',             description: 'Search open items by due date' },
  'bk13': { label: 'Overdue?',                  description: 'Check if invoice is overdue' },
  'bk14': { label: 'Gmail Reminder',            description: 'Send payment reminder to client' },
  'bk15': { label: 'Slack Notice',              description: 'Inform team about overdue invoice' },
  'bk16': { label: 'Sheets Status',             description: 'Set status to "Reminded"' },
  'bk17': { label: 'Schedule (Monthly)',         description: 'Monthly finance report' },
  'bk18': { label: 'AI Analysis',               description: 'Summarize ledger: totals & trends' },
  'bk19': { label: 'PDF Monthly Report',        description: 'Generate report as PDF' },
  'bk20': { label: 'Gmail Internal',            description: 'Send report internally via email' },
  'bk21': { label: 'Slack: Report Ready',       description: 'Post monthly report in Slack' },
  'bk22': { label: 'Error Handling',            description: 'Catch workflow errors' },
  'bk23': { label: 'Slack: Error',              description: 'Report Finance Workflow error' },

  // ─── Coach Inbox Copilot ───
  'ci1':  { label: 'Email Received',            description: 'New inquiry in inbox' },
  'ci2':  { label: 'Auto Classify',             description: 'Category: FAQ / Booking / Client question' },
  'ci3':  { label: 'Inbox Tracker',             description: 'Log inquiry in tracking sheet' },
  'ci4':  { label: 'Slack: New Inquiry',         description: 'Inform team about incoming inquiry' },
  'ci5':  { label: 'FAQ?',                      description: 'Is it a standard question?' },
  'ci6':  { label: 'Generate Text',             description: 'Create AI draft answer for FAQ' },
  'ci7':  { label: 'Sheets: Needs Human',       description: 'Mark as "human needed"' },
  'ci8':  { label: 'Text Template',             description: 'Apply tone, signature and CTA' },
  'ci9':  { label: 'Approval: Coach',           description: 'Coach reviews and confirms answer' },
  'ci10': { label: 'Send Gmail',                description: 'Send approved answer' },
  'ci11': { label: 'Sheets: Status',            description: 'Update tracking status' },
  'ci12': { label: 'Schedule (Daily)',           description: 'Daily check of unanswered inquiries' },
  'ci13': { label: 'Sheets Lookup',             description: 'Search open inquiries > 24h' },
  'ci14': { label: 'Slack Reminder',            description: 'Reminder: answer due' },
  'ci15': { label: 'Notification',              description: 'Push notification to coach' },
  'ci16': { label: 'Error Handling',            description: 'Catch workflow errors' },
  'ci17': { label: 'Slack: Error',              description: 'Report Inbox Copilot error' },

  // ─── LinkedIn Outreach Assistant ───
  'lo1':  { label: 'Sheet Changed',             description: 'New lead in leads sheet' },
  'lo2':  { label: 'Duplicate Check',           description: 'Prevent duplicate leads' },
  'lo3':  { label: 'Slack: New Lead',            description: 'Inform team about new lead' },
  'lo4':  { label: 'AI Analysis',               description: 'Derive 3 personalized approach points' },
  'lo5':  { label: 'Lead Brief (Docs)',          description: 'Personalization brief as Google Doc' },
  'lo6':  { label: 'Generate Text',             description: 'Create outreach message with AI' },
  'lo7':  { label: 'Approval',                  description: 'Review message before sending' },
  'lo8':  { label: 'Slack: Copy Ready',          description: 'Message approved and ready' },
  'lo9':  { label: 'Sheets Status',             description: 'Set lead status to "Approved"' },
  'lo10': { label: 'Wait (2 Days)',             description: 'Wait for response' },
  'lo11': { label: 'Response?',                 description: 'Did the lead respond?' },
  'lo12': { label: 'Generate Text (FU)',        description: 'Create follow-up message' },
  'lo13': { label: 'Sheets: Follow-up',         description: 'Set status to "Follow-up sent"' },
  'lo14': { label: 'Google Calendar',           description: 'Create appointment event' },
  'lo15': { label: 'Gmail Confirmation',        description: 'Send confirmation + agenda' },
  'lo16': { label: 'Slack: Appointment Set',    description: 'Inform team about booked appointment' },
  'lo17': { label: 'Sheets Pipeline',           description: 'Set pipeline status to "Booked"' },
  'lo18': { label: 'Schedule (Weekly)',          description: 'Weekly KPI update' },
  'lo19': { label: 'Slack KPI Summary',         description: 'Post outreach KPIs in Slack' },
  'lo20': { label: 'Error Handling',            description: 'Catch workflow errors' },
  'lo21': { label: 'Slack: Error',              description: 'Report Outreach Assistant error' },

  // ─── E-Commerce Automation ───
  'ec1':  { label: 'New Order',                  description: 'Incoming order received' },
  'ec2':  { label: 'Check Order Data',           description: 'Validate order details' },
  'ec3':  { label: 'CRM Entry',                  description: 'Create customer record in CRM' },
  'ec4':  { label: 'Slack: New Order',            description: 'Notify team about new order' },
  'ec5':  { label: 'AI Fraud Check',              description: 'Automated fraud detection' },
  'ec6':  { label: 'Payment Processing',          description: 'Process payment transaction' },
  'ec7':  { label: 'Create Invoice',              description: 'Generate invoice document' },
  'ec8':  { label: 'Order Confirmation',           description: 'Send confirmation email to customer' },
  'ec9':  { label: 'Inventory Check',              description: 'Verify product availability' },
  'ec10': { label: 'AI Product Recommendation',    description: 'Personalized upsell suggestions' },
  'ec11': { label: 'Shipping Label',               description: 'Generate shipping label' },
  'ec12': { label: 'Tracking Number',              description: 'Record tracking information' },
  'ec13': { label: 'Shipping Notification',        description: 'Send shipping details to customer' },
  'ec14': { label: 'Delivery Tracking',            description: 'Monitor shipment status' },
  'ec15': { label: 'Delivery Confirmation',        description: 'Confirm successful delivery' },
  'ec16': { label: 'AI Review Request',            description: 'Generate personalized review request' },
  'ec17': { label: 'Revenue Tracking',             description: 'Update revenue dashboard' },
  'ec18': { label: 'Return Received',              description: 'Process incoming return' },
  'ec19': { label: 'AI Return Analysis',           description: 'Analyze return reason and eligibility' },
  'ec20': { label: 'Process Refund',               description: 'Initiate refund transaction' },
  'ec21': { label: 'Refund Confirmation',          description: 'Send refund confirmation email' },
  'ec22': { label: 'Return Report',                description: 'Post return summary to team' },

  // ─── Customer Support Automation ───
  'cs1':  { label: 'Email Ticket',               description: 'Support request via email' },
  'cs2':  { label: 'Chat Ticket',                description: 'Support request via chat' },
  'cs3':  { label: 'Ticket Capture',             description: 'Create and assign ticket' },
  'cs4':  { label: 'Slack: New Ticket',           description: 'Notify team about new ticket' },
  'cs5':  { label: 'Sheets: Ticket Log',          description: 'Log ticket in tracking sheet' },
  'cs6':  { label: 'AI Classification',           description: 'Classify ticket type and urgency' },
  'cs7':  { label: 'Set Priority',               description: 'Assign priority level' },
  'cs8':  { label: 'Assign Category',            description: 'Route to appropriate department' },
  'cs9':  { label: 'Set SLA Timer',              description: 'Start response time tracking' },
  'cs10': { label: 'AI Draft Response',           description: 'Generate response suggestion' },
  'cs11': { label: 'Check FAQ Database',          description: 'Search knowledge base for matches' },
  'cs12': { label: 'Agent Review',               description: 'Agent reviews and edits response' },
  'cs13': { label: 'Send Response',              description: 'Send approved response to customer' },
  'cs14': { label: 'Update Ticket Status',        description: 'Mark ticket as resolved' },
  'cs15': { label: 'Sheets: Tracking',            description: 'Update tracking dashboard' },
  'cs16': { label: 'Wait (48h)',                  description: 'Allow time for customer response' },
  'cs17': { label: 'AI Satisfaction Survey',       description: 'Generate personalized survey' },
  'cs18': { label: 'Gmail: Feedback Request',      description: 'Send satisfaction survey email' },
  'cs19': { label: 'Slack: Ticket Report',         description: 'Post ticket metrics to team' },
  'cs20': { label: 'KPI Dashboard',               description: 'Update support KPI dashboard' },

  // ─── Social Media Management ───
  'sm1':  { label: 'Editorial Calendar Trigger',   description: 'New content slot triggered' },
  'sm2':  { label: 'AI Trend Analysis',            description: 'Identify current trends and topics' },
  'sm3':  { label: 'AI Topic Research',            description: 'Research and validate content ideas' },
  'sm4':  { label: 'Notion: Content Plan',         description: 'Update editorial calendar' },
  'sm5':  { label: 'AI: Instagram Content',        description: 'Generate Instagram captions and hooks' },
  'sm6':  { label: 'AI: LinkedIn Content',         description: 'Create professional LinkedIn posts' },
  'sm7':  { label: 'AI: TikTok Content',           description: 'Write TikTok scripts and hooks' },
  'sm8':  { label: 'AI: Facebook Content',         description: 'Compose Facebook posts with CTAs' },
  'sm9':  { label: 'Visual Generation',            description: 'Create images and graphics via AI' },
  'sm10': { label: 'Hashtag Optimization',         description: 'Research and optimize hashtags' },
  'sm11': { label: 'Caption Refinement',           description: 'Polish captions for each platform' },
  'sm12': { label: 'Content Review',               description: 'Internal quality review' },
  'sm13': { label: 'Approval',                     description: 'Final approval before publishing' },
  'sm14': { label: 'Instagram Posting',            description: 'Publish to Instagram feed/stories' },
  'sm15': { label: 'LinkedIn Posting',             description: 'Publish to LinkedIn' },
  'sm16': { label: 'TikTok Posting',               description: 'Publish to TikTok' },
  'sm17': { label: 'Facebook Posting',             description: 'Publish to Facebook' },
  'sm18': { label: 'Engagement Monitor',           description: 'Track likes, comments and shares' },
  'sm19': { label: 'AI Performance Analysis',      description: 'Analyze content performance with AI' },
  'sm20': { label: 'Performance Report',           description: 'Generate analytics report' },
  'sm21': { label: 'Slack: Weekly Update',         description: 'Share weekly performance summary' },
  'sm22': { label: 'Sheets: KPI Tracking',         description: 'Update KPI tracking sheet' },

  // ─── Employee Onboarding ───
  'hr1':  { label: 'New Employee',                description: 'New hire confirmed' },
  'hr2':  { label: 'Create HR Record',            description: 'Set up employee profile' },
  'hr3':  { label: 'Slack: Notify Team',           description: 'Announce new team member' },
  'hr4':  { label: 'Calendar: Schedule',           description: 'Create onboarding appointments' },
  'hr5':  { label: 'IT Setup: Accounts',           description: 'Provision email, tools and access' },
  'hr6':  { label: 'AI: Welcome Package',          description: 'Generate personalized welcome materials' },
  'hr7':  { label: 'Drive: Employee Folder',       description: 'Create personal document folder' },
  'hr8':  { label: 'Generate Contract',            description: 'Create employment contract' },
  'hr9':  { label: 'Order Equipment',              description: 'Request laptop and peripherals' },
  'hr10': { label: 'Welcome Email',                description: 'Send welcome email with first-day info' },
  'hr11': { label: 'AI: Training Plan',            description: 'Create personalized learning path' },
  'hr12': { label: 'Notion: Onboarding Board',     description: 'Set up task board with milestones' },
  'hr13': { label: 'Buddy Assignment',             description: 'Assign onboarding buddy' },
  'hr14': { label: 'Gmail: Buddy Info',            description: 'Notify buddy with new hire details' },
  'hr15': { label: 'Schedule (Day 7)',             description: 'First-week check-in trigger' },
  'hr16': { label: 'AI: Check-in Questions',       description: 'Generate personalized check-in survey' },
  'hr17': { label: 'Gmail: Send Check-in',         description: 'Send check-in survey to new hire' },
  'hr18': { label: 'AI: Evaluate Feedback',        description: 'Analyze check-in responses' },
  'hr19': { label: 'Slack: HR Report',             description: 'Share onboarding progress with HR' },
  'hr20': { label: 'Sheets: Tracking',             description: 'Update onboarding tracking sheet' },
};

export const TEMPLATE_GROUP_EN: Record<string, string> = {
  // Fulfillment
  'gf1': 'Client Intake',       'gf2': 'Project Setup',          'gf3': 'AI Analysis',
  'gf4': 'Website · Concept → Live',       'gf5': 'Social Media · Content → Posting',
  'gf6': 'Advertising · Creatives → Upload', 'gf7': 'Email · Copy → Delivery',
  'gf8': 'Monitoring & Optimization', 'gf9': 'Closing & Handoff',
  // Recruiting Fulfillment
  'grc1': 'Kickoff',                    'grc2': 'Onboarding',
  'grc3': 'Knowledge Processing',       'grc4': 'Production',
  'grc5': 'Copy Review',                'grc6': 'Handover',
  'grc7': 'Tracking',
  // Buchhaltung
  'gbk1': 'Phase 1 – Incoming Invoices', 'gbk2': 'Phase 2 – Outgoing Invoices',
  'gbk3': 'Phase 3 – Tracking & Dunning', 'gbk4': 'Phase 4 – Monthly Close',
  'gbk5': 'Error Handling',
  // Coach Inbox
  'gci1': 'Phase 1 – Intake',           'gci2': 'Phase 2 – Classification',
  'gci3': 'Phase 3 – Answer & Approval', 'gci4': 'Phase 4 – Reminder',
  'gci5': 'Error Handling',
  // LinkedIn Outreach
  'glo1': 'Phase 1 – Lead Intake',      'glo2': 'Phase 2 – Personalization',
  'glo3': 'Phase 3 – Message & Approval', 'glo4': 'Phase 4 – Follow-up',
  'glo5': 'Phase 5 – Appointment',      'glo6': 'Phase 6 – KPIs',
  'glo7': 'Error Handling',
  // E-Commerce
  'gec1': 'Order Intake',               'gec2': 'Verification & Payment',
  'gec3': 'Fulfillment & Shipping',     'gec4': 'Delivery & After-Sales',
  'gec5': 'Returns Management',
  // Customer Support
  'gcs1': 'Ticket Intake',              'gcs2': 'AI Classification',
  'gcs3': 'Processing & Review',        'gcs4': 'Response & Status',
  'gcs5': 'Follow-up & KPIs',
  // Social Media
  'gsm1': 'Planning & Research',        'gsm2': 'Content Creation',
  'gsm3': 'Review & Approval',          'gsm4': 'Publishing',
  'gsm5': 'Analytics & Reporting',
  // HR Onboarding
  'ghr1': 'Intake & Setup',             'ghr2': 'IT & Welcome',
  'ghr3': 'Training & Buddy',           'ghr4': 'Check-in',
  'ghr5': 'Feedback & Tracking',
};

export function getLocalizedTemplate(tpl: AutomationSystem, lang: 'de' | 'en'): AutomationSystem {
  if (lang === 'de') return tpl;
  const meta = TEMPLATE_META_EN[tpl.id];
  return {
    ...tpl,
    name: meta?.name || tpl.name,
    description: meta?.description || tpl.description,
    nodes: tpl.nodes.map(n => {
      const en = TEMPLATE_NODE_EN[n.id];
      return en ? { ...n, label: en.label, description: en.description } : n;
    }),
    groups: tpl.groups?.map(g => {
      const en = TEMPLATE_GROUP_EN[g.id];
      return en ? { ...g, label: en } : g;
    }),
  };
}
