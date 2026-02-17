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
  // ─── Lead Generation & Nurturing ─────────────────────────────────────────────
  {
    id: 'tpl-lead-gen',
    name: 'Lead Generation & Nurturing',
    description: 'Vom Lead-Eingang über KI-Qualifizierung und Multi-Channel-Nurturing bis zur Sales-Übergabe — vollautomatisiert.',
    category: 'Agentur',
    icon: 'target',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      // Phase 1: Lead-Erfassung (col 0-1)
      { id: 'lg1',  label: 'Formular-Eingang',      description: 'Neue Anfrage über Typeform erhalten',          icon: 'logo-typeform',        type: 'trigger', ...p(0, 1) },
      { id: 'lg2',  label: 'Website Lead',           description: 'Lead über Landing Page erfasst',               icon: 'logo-wordpress',       type: 'trigger', ...p(0, 2) },
      { id: 'lg3',  label: 'CRM-Eintrag',            description: 'Kontakt in HubSpot anlegen & taggen',          icon: 'logo-hubspot',         type: 'process', ...p(1, 1) },
      { id: 'lg4',  label: 'Eingangsbestätigung',    description: 'Automatische Bestätigungs-Mail',               icon: 'logo-gmail',           type: 'output',  ...p(1, 2) },

      // Phase 2: Qualifizierung (col 2)
      { id: 'lg5',  label: 'KI-Lead-Scoring',        description: 'Automatische Bewertung nach Kriterien',        icon: 'logo-openai',          type: 'ai',      ...p(2, 1) },
      { id: 'lg6',  label: 'Segmentierung',          description: 'Hot / Warm / Cold einstufen',                  icon: 'logo-google-sheets',   type: 'process', ...p(2, 2) },

      // Phase 3: Nurturing Lanes (col 3-5)
      // Lane A: E-Mail (row 0)
      { id: 'lg7',  label: 'E-Mail Sequenz',         description: 'Mehrstufige Nurturing-Sequenz planen',         icon: 'logo-gmail',           type: 'process', ...p(3, 0) },
      { id: 'lg8',  label: 'KI-Personalisierung',    description: 'Texte auf Lead-Profil zuschneiden',            icon: 'logo-claude',          type: 'ai',      ...p(4, 0) },
      { id: 'lg9',  label: 'Follow-up Mail',         description: 'Personalisierte Nachfass-Mails senden',        icon: 'logo-gmail',           type: 'output',  ...p(5, 0) },

      // Lane B: Social Retargeting (row 1-2)
      { id: 'lg10', label: 'Retargeting-Audience',   description: 'Custom Audience aus Leads erstellen',          icon: 'logo-meta',            type: 'process', ...p(3, 1) },
      { id: 'lg11', label: 'Ad-Erstellung',          description: 'KI-generierte Anzeigen-Creatives',             icon: 'logo-openai',          type: 'ai',      ...p(4, 1) },
      { id: 'lg12', label: 'Meta Ads',               description: 'Retargeting-Kampagne starten',                 icon: 'logo-meta',            type: 'output',  ...p(5, 1) },
      { id: 'lg13', label: 'Google Ads',             description: 'Such-Retargeting aktivieren',                  icon: 'logo-google-ads',      type: 'output',  ...p(5, 2) },

      // Lane C: Content Nurture (row 3)
      { id: 'lg14', label: 'Content-Auswahl',        description: 'Passende Inhalte für Lead auswählen',          icon: 'logo-notion',          type: 'process', ...p(3, 3) },
      { id: 'lg15', label: 'Blog/Guide senden',      description: 'Relevante Ressourcen teilen',                  icon: 'logo-google-docs',     type: 'output',  ...p(4, 3) },
      { id: 'lg16', label: 'LinkedIn Connect',       description: 'Automatischer Vernetzungsvorschlag',           icon: 'logo-linkedin',        type: 'output',  ...p(5, 3) },

      // Phase 4: Sales-Übergabe (col 6-7)
      { id: 'lg17', label: 'Hot-Lead Alert',         description: 'Slack-Benachrichtigung an Sales-Team',         icon: 'logo-slack',           type: 'output',  ...p(6, 0) },
      { id: 'lg18', label: 'Meeting-Buchung',        description: 'Automatischer Kalender-Link',                  icon: 'logo-google-calendar', type: 'output',  ...p(6, 1) },
      { id: 'lg19', label: 'Übergabe-Dokument',      description: 'Lead-Profil & Historie zusammenstellen',       icon: 'logo-claude',          type: 'ai',      ...p(6, 2) },
      { id: 'lg20', label: 'Pipeline-Update',        description: 'Deal-Stage in HubSpot aktualisieren',          icon: 'logo-hubspot',         type: 'output',  ...p(7, 1) },
      { id: 'lg21', label: 'Sales-Report',           description: 'KI-generierte Lead-Zusammenfassung',           icon: 'logo-google-docs',     type: 'output',  ...p(7, 2) },
      { id: 'lg22', label: 'Tracking-Sheet',         description: 'Conversion-Daten in Sheets',                   icon: 'logo-google-sheets',   type: 'output',  ...p(7, 0) },
    ],
    connections: [
      // Erfassung
      { from: 'lg1', to: 'lg3' }, { from: 'lg2', to: 'lg3' },
      { from: 'lg3', to: 'lg4' }, { from: 'lg3', to: 'lg5' },
      // Qualifizierung
      { from: 'lg5', to: 'lg6' },
      // Fan-out zu 3 Lanes
      { from: 'lg6', to: 'lg7' }, { from: 'lg6', to: 'lg10' }, { from: 'lg6', to: 'lg14' },
      // Lane A: E-Mail
      { from: 'lg7', to: 'lg8' }, { from: 'lg8', to: 'lg9' },
      // Lane B: Social
      { from: 'lg10', to: 'lg11' }, { from: 'lg11', to: 'lg12' }, { from: 'lg11', to: 'lg13' },
      // Lane C: Content
      { from: 'lg14', to: 'lg15' }, { from: 'lg15', to: 'lg16' },
      // Merge → Sales
      { from: 'lg9', to: 'lg17' }, { from: 'lg12', to: 'lg17' }, { from: 'lg16', to: 'lg17' },
      { from: 'lg17', to: 'lg18' }, { from: 'lg17', to: 'lg19' },
      { from: 'lg19', to: 'lg20' }, { from: 'lg19', to: 'lg21' }, { from: 'lg18', to: 'lg22' },
    ],
    groups: [
      { id: 'gl1', label: 'Lead-Erfassung',                 x: 15,   y: 178, width: 280,  height: 308, color: 'blue' },
      { id: 'gl2', label: 'CRM & Bestätigung',              x: 355,  y: 178, width: 280,  height: 308, color: 'blue' },
      { id: 'gl3', label: 'KI-Qualifizierung',              x: 695,  y: 178, width: 280,  height: 308, color: 'purple' },
      { id: 'gl4', label: 'E-Mail · Nurturing → Follow-up', x: 1035, y: 18,  width: 960,  height: 148, color: 'blue' },
      { id: 'gl5', label: 'Social · Retargeting → Ads',     x: 1035, y: 178, width: 960,  height: 308, color: 'orange' },
      { id: 'gl6', label: 'Content · Nurture → Connect',    x: 1035, y: 498, width: 960,  height: 148, color: 'green' },
      { id: 'gl7', label: 'Sales-Übergabe',                 x: 2055, y: 18,  width: 280,  height: 468, color: 'purple' },
      { id: 'gl8', label: 'Abschluss & Tracking',           x: 2395, y: 18,  width: 280,  height: 468, color: 'red' },
    ],
    outputs: [],
    executionCount: 0,
  },
  // ─── Content Production Pipeline ──────────────────────────────────────────────
  {
    id: 'tpl-content-production',
    name: 'Content Production Pipeline',
    description: 'Vom Content-Brief über KI-Erstellung und Multi-Channel-Publishing bis zur Performance-Analyse — alles automatisiert.',
    category: 'Agentur',
    icon: 'file-text',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      // Phase 1: Brief & Research (col 0-1)
      { id: 'cp1',  label: 'Content-Brief',         description: 'Neuer Auftrag über Notion-Board',              icon: 'logo-notion',          type: 'trigger', ...p(0, 1) },
      { id: 'cp2',  label: 'Themen-Research',        description: 'KI-basierte Recherche zu Thema & Markt',       icon: 'logo-openai',          type: 'ai',      ...p(1, 1) },
      { id: 'cp3',  label: 'Keyword-Analyse',        description: 'SEO-Keywords & Suchvolumen ermitteln',         icon: 'logo-google-sheets',   type: 'process', ...p(1, 2) },

      // Phase 2: KI-Erstellung (col 2-3)
      { id: 'cp4',  label: 'KI-Copywriting',         description: 'Blog-Artikel, Headlines & CTAs',               icon: 'logo-claude',          type: 'ai',      ...p(2, 0) },
      { id: 'cp5',  label: 'Social-Texte',           description: 'Captions, Hashtags & Hooks',                   icon: 'logo-claude',          type: 'ai',      ...p(2, 1) },
      { id: 'cp6',  label: 'Newsletter-Text',        description: 'E-Mail-Copy & Betreffzeilen',                  icon: 'logo-claude',          type: 'ai',      ...p(2, 2) },
      { id: 'cp7',  label: 'Visual-Generierung',     description: 'Bilder, Grafiken & Thumbnails via KI',         icon: 'logo-openai',          type: 'ai',      ...p(3, 0) },
      { id: 'cp8',  label: 'Video-Script',           description: 'Reel- & Video-Skripte generieren',             icon: 'logo-claude',          type: 'ai',      ...p(3, 1) },

      // Phase 3: Publishing Lanes (col 4-6)
      // Lane A: Blog (row 0)
      { id: 'cp9',  label: 'SEO-Optimierung',        description: 'Meta-Tags, Struktur & interne Links',          icon: 'logo-google-sheets',   type: 'process', ...p(4, 0) },
      { id: 'cp10', label: 'Blog-Upload',            description: 'Artikel in WordPress/CMS hochladen',           icon: 'logo-wordpress',       type: 'process', ...p(5, 0) },
      { id: 'cp11', label: 'Blog Live',              description: 'Beitrag veröffentlichen',                      icon: 'logo-wordpress',       type: 'output',  ...p(6, 0) },

      // Lane B: Social (row 1-2)
      { id: 'cp12', label: 'Post-Planung',           description: 'Content-Kalender & Posting-Zeiten',            icon: 'logo-notion',          type: 'process', ...p(4, 1) },
      { id: 'cp13', label: 'Instagram Post',         description: 'Feed-Post & Reel veröffentlichen',             icon: 'logo-instagram',       type: 'output',  ...p(5, 1) },
      { id: 'cp14', label: 'LinkedIn Post',          description: 'Beitrag auf LinkedIn posten',                  icon: 'logo-linkedin',        type: 'output',  ...p(5, 2) },
      { id: 'cp15', label: 'Meta Post',              description: 'Facebook-Beitrag veröffentlichen',             icon: 'logo-meta',            type: 'output',  ...p(6, 1) },

      // Lane C: Newsletter (row 3)
      { id: 'cp16', label: 'E-Mail Design',          description: 'Newsletter-Template gestalten',                icon: 'logo-gmail',           type: 'process', ...p(4, 3) },
      { id: 'cp17', label: 'Empfänger-Liste',        description: 'Segmente aus CRM laden',                      icon: 'logo-hubspot',         type: 'process', ...p(5, 3) },
      { id: 'cp18', label: 'Newsletter senden',      description: 'E-Mail-Kampagne starten',                     icon: 'logo-gmail',           type: 'output',  ...p(6, 3) },

      // Phase 4: Analytics (col 7-8)
      { id: 'cp19', label: 'Performance-Tracking',   description: 'Views, Clicks & Engagement messen',            icon: 'logo-google-analytics', type: 'process', ...p(7, 1) },
      { id: 'cp20', label: 'KI-Report',              description: 'Automatischer Performance-Bericht',            icon: 'logo-claude',          type: 'ai',      ...p(8, 0) },
      { id: 'cp21', label: 'Team-Update',            description: 'Ergebnisse via Slack teilen',                  icon: 'logo-slack',           type: 'output',  ...p(8, 1) },
      { id: 'cp22', label: 'Content-Archiv',         description: 'Alles in Notion dokumentieren',                icon: 'logo-notion',          type: 'output',  ...p(8, 2) },
    ],
    connections: [
      // Brief → Research
      { from: 'cp1', to: 'cp2' }, { from: 'cp2', to: 'cp3' },
      // Research → KI-Erstellung (fan-out)
      { from: 'cp2', to: 'cp4' }, { from: 'cp2', to: 'cp5' }, { from: 'cp2', to: 'cp6' },
      { from: 'cp4', to: 'cp7' }, { from: 'cp5', to: 'cp8' },
      // Lane A: Blog
      { from: 'cp4', to: 'cp9' }, { from: 'cp7', to: 'cp9' },
      { from: 'cp9', to: 'cp10' }, { from: 'cp10', to: 'cp11' },
      // Lane B: Social
      { from: 'cp5', to: 'cp12' }, { from: 'cp8', to: 'cp12' },
      { from: 'cp12', to: 'cp13' }, { from: 'cp12', to: 'cp14' },
      { from: 'cp13', to: 'cp15' },
      // Lane C: Newsletter
      { from: 'cp6', to: 'cp16' }, { from: 'cp16', to: 'cp17' }, { from: 'cp17', to: 'cp18' },
      // Merge → Analytics
      { from: 'cp11', to: 'cp19' }, { from: 'cp15', to: 'cp19' }, { from: 'cp18', to: 'cp19' },
      { from: 'cp19', to: 'cp20' }, { from: 'cp19', to: 'cp21' },
      { from: 'cp20', to: 'cp22' },
    ],
    groups: [
      { id: 'gc1', label: 'Brief & Research',                  x: 15,   y: 178, width: 620,  height: 308, color: 'blue' },
      { id: 'gc2', label: 'KI-Erstellung',                     x: 695,  y: 18,  width: 620,  height: 468, color: 'purple' },
      { id: 'gc3', label: 'Blog · SEO → Publish',              x: 1375, y: 18,  width: 960,  height: 148, color: 'blue' },
      { id: 'gc4', label: 'Social · Planung → Posting',        x: 1375, y: 178, width: 960,  height: 308, color: 'purple' },
      { id: 'gc5', label: 'Newsletter · Design → Versand',     x: 1375, y: 498, width: 960,  height: 148, color: 'green' },
      { id: 'gc6', label: 'Analytics & Reporting',             x: 2395, y: 18,  width: 620,  height: 468, color: 'green' },
    ],
    outputs: [],
    executionCount: 0,
  },
  // ─── Client Reporting ─────────────────────────────────────────────────────────
  {
    id: 'tpl-client-reporting',
    name: 'Client Reporting Automation',
    description: 'Daten aus allen Kanälen automatisch sammeln, KI-analysieren und als professionellen Report an den Kunden senden.',
    category: 'Agentur',
    icon: 'bar-chart',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      // Phase 1: Daten sammeln (col 0-1, parallel)
      { id: 'cr1',  label: 'Google Analytics',       description: 'Website-Traffic & Conversions abrufen',         icon: 'logo-google-analytics', type: 'trigger', ...p(0, 0) },
      { id: 'cr2',  label: 'Google Ads Daten',       description: 'Kampagnen-Performance exportieren',             icon: 'logo-google-ads',      type: 'trigger', ...p(0, 1) },
      { id: 'cr3',  label: 'Meta Ads Daten',         description: 'Facebook & Instagram Ads-Metriken',             icon: 'logo-meta',            type: 'trigger', ...p(0, 2) },
      { id: 'cr4',  label: 'Social-Metriken',        description: 'Follower, Engagement & Reichweite',             icon: 'logo-instagram',       type: 'trigger', ...p(0, 3) },
      { id: 'cr5',  label: 'CRM-Daten',              description: 'Pipeline, Deals & Umsatz aus HubSpot',         icon: 'logo-hubspot',         type: 'trigger', ...p(0, 4) },

      // Phase 2: Aggregation (col 1-2)
      { id: 'cr6',  label: 'Daten-Zusammenführung',  description: 'Alle Quellen in Google Sheets mergen',          icon: 'logo-google-sheets',   type: 'process', ...p(1, 2) },
      { id: 'cr7',  label: 'Daten-Bereinigung',      description: 'Duplikate entfernen & formatieren',             icon: 'logo-google-sheets',   type: 'process', ...p(2, 2) },

      // Phase 3: KI-Analyse (col 3-4)
      { id: 'cr8',  label: 'Trend-Erkennung',        description: 'Muster & Trends identifizieren',               icon: 'logo-openai',          type: 'ai',      ...p(3, 1) },
      { id: 'cr9',  label: 'Empfehlungen',           description: 'KI-basierte Handlungsempfehlungen',             icon: 'logo-claude',          type: 'ai',      ...p(3, 2) },
      { id: 'cr10', label: 'Benchmark-Vergleich',    description: 'Branchenvergleich & Rankings',                  icon: 'logo-openai',          type: 'ai',      ...p(3, 3) },
      { id: 'cr11', label: 'ROI-Berechnung',         description: 'Return on Ad Spend berechnen',                 icon: 'logo-google-sheets',   type: 'process', ...p(4, 2) },

      // Phase 4: Report-Erstellung (col 5-6)
      { id: 'cr12', label: 'Report-Template',        description: 'Kunden-spezifisches Template laden',            icon: 'logo-google-docs',     type: 'process', ...p(5, 1) },
      { id: 'cr13', label: 'KI-Report-Texte',        description: 'Executive Summary & Insights',                  icon: 'logo-claude',          type: 'ai',      ...p(5, 2) },
      { id: 'cr14', label: 'Visualisierungen',       description: 'Charts & Dashboards generieren',                icon: 'logo-google-sheets',   type: 'process', ...p(5, 3) },
      { id: 'cr15', label: 'PDF-Export',             description: 'Formatierten Report als PDF erstellen',         icon: 'logo-google-docs',     type: 'output',  ...p(6, 2) },

      // Phase 5: Delivery (col 7)
      { id: 'cr16', label: 'Kunden-Mail',            description: 'Report per E-Mail an Kunden senden',           icon: 'logo-gmail',           type: 'output',  ...p(7, 1) },
      { id: 'cr17', label: 'Slack-Update',           description: 'Team über Versand informieren',                icon: 'logo-slack',           type: 'output',  ...p(7, 2) },
      { id: 'cr18', label: 'Archivierung',           description: 'Report in Google Drive ablegen',               icon: 'logo-google-drive',    type: 'output',  ...p(7, 3) },
    ],
    connections: [
      // Daten → Merge
      { from: 'cr1', to: 'cr6' }, { from: 'cr2', to: 'cr6' }, { from: 'cr3', to: 'cr6' },
      { from: 'cr4', to: 'cr6' }, { from: 'cr5', to: 'cr6' },
      // Aggregation
      { from: 'cr6', to: 'cr7' },
      // KI-Analyse
      { from: 'cr7', to: 'cr8' }, { from: 'cr7', to: 'cr9' }, { from: 'cr7', to: 'cr10' },
      { from: 'cr8', to: 'cr11' }, { from: 'cr9', to: 'cr11' }, { from: 'cr10', to: 'cr11' },
      // Report
      { from: 'cr11', to: 'cr12' }, { from: 'cr11', to: 'cr13' }, { from: 'cr11', to: 'cr14' },
      { from: 'cr12', to: 'cr15' }, { from: 'cr13', to: 'cr15' }, { from: 'cr14', to: 'cr15' },
      // Delivery
      { from: 'cr15', to: 'cr16' }, { from: 'cr15', to: 'cr17' }, { from: 'cr15', to: 'cr18' },
    ],
    groups: [
      { id: 'gr1', label: 'Datenquellen',                     x: 15,   y: 18,  width: 280,  height: 788, color: 'blue' },
      { id: 'gr2', label: 'Aggregation & Bereinigung',        x: 355,  y: 338, width: 620,  height: 148, color: 'blue' },
      { id: 'gr3', label: 'KI-Analyse & Insights',            x: 1035, y: 178, width: 620,  height: 468, color: 'purple' },
      { id: 'gr4', label: 'Report-Erstellung',                x: 1715, y: 178, width: 620,  height: 468, color: 'orange' },
      { id: 'gr5', label: 'Delivery & Archiv',                x: 2395, y: 178, width: 280,  height: 468, color: 'green' },
    ],
    outputs: [],
    executionCount: 0,
  },
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
  // ─── Content Factory ───────────────────────────────────────────────────────
  {
    id: 'tpl-content-factory',
    name: 'Content Factory',
    description: 'Themen sammeln, KI-Recherche, Inhalte für YouTube/Instagram/LinkedIn/Facebook parallel erstellen, als Content-Paket ablegen und Posting-Plan pflegen.',
    category: 'Content',
    icon: 'file-text',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      { id: 'cf1',  label: 'Formular eingereicht',   description: 'Neues Content-Thema eingegangen',       icon: 'logo-typeform',       type: 'trigger', ...p(0, 2) },
      { id: 'cf2',  label: 'Duplikat-Check',         description: 'Doppelte Themen verhindern',             icon: 'copy-check',          type: 'process', ...p(1, 2) },
      { id: 'cf3',  label: 'Slack: Neues Thema',     description: 'Team über neues Thema informieren',      icon: 'logo-slack',          type: 'output',  ...p(1, 1) },
      { id: 'cf4',  label: 'KI-Analyse',             description: 'Quellen recherchieren, Kernthesen ableiten', icon: 'logo-openai',     type: 'ai',      ...p(2, 2) },
      { id: 'cf5',  label: 'Research Brief',          description: 'Recherche-Ergebnis als Google Doc',     icon: 'logo-google-docs',    type: 'output',  ...p(3, 1) },
      { id: 'cf6',  label: 'Aufteilen (4 Plattf.)',  description: '4 parallele Content-Linien starten',    icon: 'split',               type: 'process', ...p(4, 2) },
      { id: 'cf7',  label: 'Text generieren (YT)',   description: 'YouTube Script: Hook → Struktur → CTA', icon: 'logo-openai',         type: 'ai',      ...p(5, 0) },
      { id: 'cf8',  label: 'YouTube Script',          description: 'Script-Draft als Google Doc',           icon: 'logo-google-docs',    type: 'output',  ...p(6, 0) },
      { id: 'cf9',  label: 'Text generieren (IG)',   description: 'Instagram Caption + Hook + Hashtags',   icon: 'logo-openai',         type: 'ai',      ...p(5, 1) },
      { id: 'cf10', label: 'Instagram Draft',         description: 'Instagram-Entwurf als Google Doc',      icon: 'logo-google-docs',    type: 'output',  ...p(6, 1) },
      { id: 'cf11', label: 'Text generieren (LI)',   description: 'LinkedIn Post: klar, B2B-fokussiert',   icon: 'logo-openai',         type: 'ai',      ...p(5, 3) },
      { id: 'cf12', label: 'LinkedIn Draft',           description: 'LinkedIn-Entwurf als Google Doc',      icon: 'logo-google-docs',    type: 'output',  ...p(6, 3) },
      { id: 'cf13', label: 'Text generieren (FB)',   description: 'Facebook Post: kurz + CTA',             icon: 'logo-openai',         type: 'ai',      ...p(5, 4) },
      { id: 'cf14', label: 'Facebook Draft',           description: 'Facebook-Entwurf als Google Doc',      icon: 'logo-google-docs',    type: 'output',  ...p(6, 4) },
      { id: 'cf15', label: 'Zusammenführen',          description: 'Alle 4 Plattform-Drafts fertig',       icon: 'git-merge',           type: 'process', ...p(7, 2) },
      { id: 'cf16', label: 'Content Pack (Docs)',    description: 'Master-Dokument mit allen Drafts',      icon: 'logo-google-docs',    type: 'output',  ...p(8, 1) },
      { id: 'cf17', label: 'Content Kalender',       description: 'Posting-Plan in Google Sheets',         icon: 'logo-google-sheets',  type: 'output',  ...p(8, 3) },
      { id: 'cf18', label: 'Freigabe: Content',      description: 'Manuelle Prüfung vor Veröffentlichung', icon: 'shield-check',        type: 'process', ...p(9, 2) },
      { id: 'cf19', label: 'Slack: Content fertig',  description: 'Team informieren: Content Pack ready',  icon: 'logo-slack',          type: 'output',  ...p(10, 2) },
      { id: 'cf20', label: 'Timer',                  description: 'Nächster Posting-Slot abwarten',        icon: 'timer',               type: 'process', ...p(11, 1) },
      { id: 'cf21', label: 'Benachrichtigung',       description: 'Post freigeben / planen',               icon: 'bell',                type: 'output',  ...p(11, 2) },
      { id: 'cf22', label: 'Fehlerbehandlung',       description: 'Fehler im Workflow abfangen',           icon: 'shield-alert',        type: 'process', ...p(0, 5) },
      { id: 'cf23', label: 'Slack: Error',            description: 'Content Factory Error melden',          icon: 'logo-slack',          type: 'output',  ...p(1, 5) },
    ],
    connections: [
      { from: 'cf1', to: 'cf2' }, { from: 'cf1', to: 'cf3' },
      { from: 'cf2', to: 'cf4' },
      { from: 'cf4', to: 'cf5' }, { from: 'cf4', to: 'cf6' },
      { from: 'cf6', to: 'cf7' }, { from: 'cf6', to: 'cf9' }, { from: 'cf6', to: 'cf11' }, { from: 'cf6', to: 'cf13' },
      { from: 'cf7', to: 'cf8' }, { from: 'cf9', to: 'cf10' }, { from: 'cf11', to: 'cf12' }, { from: 'cf13', to: 'cf14' },
      { from: 'cf8', to: 'cf15' }, { from: 'cf10', to: 'cf15' }, { from: 'cf12', to: 'cf15' }, { from: 'cf14', to: 'cf15' },
      { from: 'cf15', to: 'cf16' }, { from: 'cf15', to: 'cf17' },
      { from: 'cf16', to: 'cf18' }, { from: 'cf17', to: 'cf18' },
      { from: 'cf18', to: 'cf19', label: 'Freigegeben' },
      { from: 'cf18', to: 'cf6', label: 'Abgelehnt', fromPort: 'top', toPort: 'top' },
      { from: 'cf19', to: 'cf20' }, { from: 'cf20', to: 'cf21' },
      { from: 'cf22', to: 'cf23' },
    ],
    groups: [
      { id: 'gcf1', label: 'Phase 1 – Input',            x: 15,   y: 178, width: 620,  height: 308, color: 'blue' },
      { id: 'gcf2', label: 'Phase 2 – Recherche',         x: 695,  y: 178, width: 620,  height: 308, color: 'blue' },
      { id: 'gcf3', label: 'Phase 3 – Produktion',        x: 1375, y: 18,  width: 1300, height: 788, color: 'purple' },
      { id: 'gcf4', label: 'Phase 4 – Packaging',         x: 2735, y: 178, width: 960,  height: 468, color: 'green' },
      { id: 'gcf5', label: 'Phase 5 – Scheduling',        x: 3755, y: 178, width: 280,  height: 308, color: 'gray' },
      { id: 'gcf6', label: 'Fehlerbehandlung',            x: 15,   y: 818, width: 620,  height: 148, color: 'orange' },
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
];

// ─── English Translations ────────────────────────────────────────────────────

export const TEMPLATE_META_EN: Record<string, { name: string; description: string }> = {
  'tpl-lead-gen':            { name: 'Lead Generation & Nurturing',     description: 'From lead intake through AI qualification and multi-channel nurturing to sales handoff — fully automated.' },
  'tpl-content-production':  { name: 'Content Production Pipeline',     description: 'From content brief through AI creation and multi-channel publishing to performance analysis — all automated.' },
  'tpl-client-reporting':    { name: 'Client Reporting Automation',     description: 'Automatically collect data from all channels, AI-analyze, and send as a professional report to the client.' },
  'tpl-agentur-fulfillment': { name: 'Marketing Agency Fulfillment',    description: 'Complete agency workflow with 4 parallel lanes: Website, Social Media, Ads, and Email — from onboarding to final reporting.' },
  'tpl-recruiting':        { name: 'Recruiting Fulfillment',            description: 'End-to-end fulfillment for a recruiting agency: from client meeting through knowledge processing and asset production to launch and tracking.' },
  'tpl-content-factory':   { name: 'Content Factory',                   description: 'Collect topics, AI research, create content for YouTube/Instagram/LinkedIn/Facebook in parallel, package as content bundle and maintain posting schedule.' },
  'tpl-buchhaltung':       { name: 'Accounting & Invoices',             description: 'Capture incoming invoices, create outgoing invoices, automatically send dunning for overdue items and generate a monthly finance report.' },
  'tpl-coach-inbox':       { name: 'Coach Inbox Copilot',               description: 'Automatically classify incoming inquiries, draft FAQ answers with AI, get coach approval and send reminders for unanswered messages.' },
  'tpl-linkedin-outreach': { name: 'LinkedIn Outreach Assistant',       description: 'Lead intake from Sheets/CRM, AI-personalized outreach messages, follow-up sequence with delays, appointment booking and weekly KPI reporting.' },
};

export const TEMPLATE_NODE_EN: Record<string, { label: string; description: string }> = {
  // ─── Lead Generation ───
  'lg1':  { label: 'Form Intake',             description: 'New inquiry received via Typeform' },
  'lg2':  { label: 'Website Lead',            description: 'Lead captured via landing page' },
  'lg3':  { label: 'CRM Entry',              description: 'Create & tag contact in HubSpot' },
  'lg4':  { label: 'Confirmation Email',      description: 'Automatic confirmation email' },
  'lg5':  { label: 'AI Lead Scoring',         description: 'Automatic evaluation by criteria' },
  'lg6':  { label: 'Segmentation',            description: 'Classify as Hot / Warm / Cold' },
  'lg7':  { label: 'Email Sequence',          description: 'Plan multi-step nurturing sequence' },
  'lg8':  { label: 'AI Personalization',      description: 'Tailor copy to lead profile' },
  'lg9':  { label: 'Follow-up Email',         description: 'Send personalized follow-up emails' },
  'lg10': { label: 'Retargeting Audience',    description: 'Create custom audience from leads' },
  'lg11': { label: 'Ad Creation',             description: 'AI-generated ad creatives' },
  'lg12': { label: 'Meta Ads',               description: 'Launch retargeting campaign' },
  'lg13': { label: 'Google Ads',             description: 'Activate search retargeting' },
  'lg14': { label: 'Content Selection',       description: 'Select relevant content for lead' },
  'lg15': { label: 'Send Blog/Guide',        description: 'Share relevant resources' },
  'lg16': { label: 'LinkedIn Connect',        description: 'Automatic connection suggestion' },
  'lg17': { label: 'Hot Lead Alert',          description: 'Slack notification to sales team' },
  'lg18': { label: 'Meeting Booking',         description: 'Automatic calendar link' },
  'lg19': { label: 'Handoff Document',        description: 'Compile lead profile & history' },
  'lg20': { label: 'Pipeline Update',         description: 'Update deal stage in HubSpot' },
  'lg21': { label: 'Sales Report',            description: 'AI-generated lead summary' },
  'lg22': { label: 'Tracking Sheet',          description: 'Conversion data in Sheets' },

  // ─── Content Production ───
  'cp1':  { label: 'Content Brief',           description: 'New assignment via Notion board' },
  'cp2':  { label: 'Topic Research',          description: 'AI-based research on topic & market' },
  'cp3':  { label: 'Keyword Analysis',        description: 'Determine SEO keywords & search volume' },
  'cp4':  { label: 'AI Copywriting',          description: 'Blog articles, headlines & CTAs' },
  'cp5':  { label: 'Social Copy',             description: 'Captions, hashtags & hooks' },
  'cp6':  { label: 'Newsletter Copy',         description: 'Email copy & subject lines' },
  'cp7':  { label: 'Visual Generation',       description: 'Images, graphics & thumbnails via AI' },
  'cp8':  { label: 'Video Script',            description: 'Generate reel & video scripts' },
  'cp9':  { label: 'SEO Optimization',        description: 'Meta tags, structure & internal links' },
  'cp10': { label: 'Blog Upload',             description: 'Upload article to WordPress/CMS' },
  'cp11': { label: 'Blog Live',               description: 'Publish post' },
  'cp12': { label: 'Post Scheduling',         description: 'Content calendar & posting times' },
  'cp13': { label: 'Instagram Post',          description: 'Publish feed post & reel' },
  'cp14': { label: 'LinkedIn Post',           description: 'Post on LinkedIn' },
  'cp15': { label: 'Meta Post',               description: 'Publish Facebook post' },
  'cp16': { label: 'Email Design',            description: 'Design newsletter template' },
  'cp17': { label: 'Recipient List',          description: 'Load segments from CRM' },
  'cp18': { label: 'Send Newsletter',         description: 'Launch email campaign' },
  'cp19': { label: 'Performance Tracking',    description: 'Measure views, clicks & engagement' },
  'cp20': { label: 'AI Report',               description: 'Automatic performance report' },
  'cp21': { label: 'Team Update',             description: 'Share results via Slack' },
  'cp22': { label: 'Content Archive',         description: 'Document everything in Notion' },

  // ─── Client Reporting ───
  'cr1':  { label: 'Google Analytics',        description: 'Fetch website traffic & conversions' },
  'cr2':  { label: 'Google Ads Data',         description: 'Export campaign performance' },
  'cr3':  { label: 'Meta Ads Data',           description: 'Facebook & Instagram ads metrics' },
  'cr4':  { label: 'Social Metrics',          description: 'Followers, engagement & reach' },
  'cr5':  { label: 'CRM Data',               description: 'Pipeline, deals & revenue from HubSpot' },
  'cr6':  { label: 'Data Consolidation',      description: 'Merge all sources in Google Sheets' },
  'cr7':  { label: 'Data Cleaning',           description: 'Remove duplicates & format' },
  'cr8':  { label: 'Trend Detection',         description: 'Identify patterns & trends' },
  'cr9':  { label: 'Recommendations',         description: 'AI-based action recommendations' },
  'cr10': { label: 'Benchmark Comparison',    description: 'Industry comparison & rankings' },
  'cr11': { label: 'ROI Calculation',         description: 'Calculate return on ad spend' },
  'cr12': { label: 'Report Template',         description: 'Load client-specific template' },
  'cr13': { label: 'AI Report Copy',          description: 'Executive summary & insights' },
  'cr14': { label: 'Visualizations',          description: 'Generate charts & dashboards' },
  'cr15': { label: 'PDF Export',              description: 'Create formatted report as PDF' },
  'cr16': { label: 'Client Email',            description: 'Send report via email to client' },
  'cr17': { label: 'Slack Update',            description: 'Inform team about delivery' },
  'cr18': { label: 'Archiving',              description: 'Store report in Google Drive' },

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


  // ─── Content Factory ───
  'cf1':  { label: 'Form Submitted',           description: 'New content topic received' },
  'cf2':  { label: 'Duplicate Check',           description: 'Prevent duplicate topics' },
  'cf3':  { label: 'Slack: New Topic',           description: 'Inform team about new topic' },
  'cf4':  { label: 'AI Analysis',               description: 'Research sources, derive key theses' },
  'cf5':  { label: 'Research Brief',             description: 'Research result as Google Doc' },
  'cf6':  { label: 'Split (4 Platforms)',        description: 'Start 4 parallel content lines' },
  'cf7':  { label: 'Generate Text (YT)',         description: 'YouTube Script: Hook → Structure → CTA' },
  'cf8':  { label: 'YouTube Script',             description: 'Script draft as Google Doc' },
  'cf9':  { label: 'Generate Text (IG)',         description: 'Instagram caption + hook + hashtags' },
  'cf10': { label: 'Instagram Draft',            description: 'Instagram draft as Google Doc' },
  'cf11': { label: 'Generate Text (LI)',         description: 'LinkedIn post: clear, B2B-focused' },
  'cf12': { label: 'LinkedIn Draft',             description: 'LinkedIn draft as Google Doc' },
  'cf13': { label: 'Generate Text (FB)',         description: 'Facebook post: short + CTA' },
  'cf14': { label: 'Facebook Draft',             description: 'Facebook draft as Google Doc' },
  'cf15': { label: 'Merge',                     description: 'All 4 platform drafts ready' },
  'cf16': { label: 'Content Pack (Docs)',        description: 'Master document with all drafts' },
  'cf17': { label: 'Content Calendar',           description: 'Posting schedule in Google Sheets' },
  'cf18': { label: 'Approval: Content',          description: 'Manual review before publishing' },
  'cf19': { label: 'Slack: Content Ready',       description: 'Inform team: content pack ready' },
  'cf20': { label: 'Timer',                     description: 'Wait for next posting slot' },
  'cf21': { label: 'Notification',              description: 'Approve / schedule post' },
  'cf22': { label: 'Error Handling',            description: 'Catch workflow errors' },
  'cf23': { label: 'Slack: Error',               description: 'Report Content Factory error' },

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
};

export const TEMPLATE_GROUP_EN: Record<string, string> = {
  // Lead Gen
  'gl1': 'Lead Capture',        'gl2': 'CRM & Confirmation',     'gl3': 'AI Qualification',
  'gl4': 'Email · Nurturing → Follow-up', 'gl5': 'Social · Retargeting → Ads',
  'gl6': 'Content · Nurture → Connect',   'gl7': 'Sales Handoff',  'gl8': 'Closing & Tracking',
  // Content Production
  'gc1': 'Brief & Research',    'gc2': 'AI Creation',
  'gc3': 'Blog · SEO → Publish', 'gc4': 'Social · Planning → Posting',
  'gc5': 'Newsletter · Design → Delivery', 'gc6': 'Analytics & Reporting',
  // Client Reporting
  'gr1': 'Data Sources',        'gr2': 'Aggregation & Cleaning',
  'gr3': 'AI Analysis & Insights', 'gr4': 'Report Creation', 'gr5': 'Delivery & Archive',
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
  // Content Factory
  'gcf1': 'Phase 1 – Input',            'gcf2': 'Phase 2 – Research',
  'gcf3': 'Phase 3 – Production',       'gcf4': 'Phase 4 – Packaging',
  'gcf5': 'Phase 5 – Scheduling',       'gcf6': 'Error Handling',
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
