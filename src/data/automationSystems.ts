import type { AutomationSystem } from '@/types/automation';

/**
 * Position helper: convert column/row indices to pixel coordinates.
 *
 * Grid layout:
 *   x = 40 + column * 340   (340px horizontal spacing)
 *   y = 18 + row    * 160   (160px vertical spacing)
 *
 * Column 0 is the leftmost position (x=40).
 * Row 0 is the topmost position (y=18).
 *
 * Group formula: x=15+col×340, y=18+row×160-10, w=(cols-1)×340+280, h=(rows-1)×160+148
 */
const p = (col: number, row: number) => ({ x: 40 + col * 340, y: 18 + row * 160 });

export const DEMO_SYSTEMS: AutomationSystem[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. Client Onboarding — 14 Nodes
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'demo-1',
    name: 'Client Onboarding',
    description: 'Vom Erstgespräch zur fertigen Website, Werbetexten und Google Ads – vollautomatisch mit KI-Analyse, Content-Produktion und Multi-Channel-Deployment.',
    category: 'Marketing',
    icon: 'users',
    status: 'active',
    webhookUrl: '',
    nodes: [
      // ─── Phase 1: Eingang (col 0) ───
      { id: 'n1', label: 'Onboarding-Gespräch', description: 'Erstgespräch mit dem Kunden', icon: 'users', type: 'trigger', ...p(0, 1), linkedPage: '/onboarding' },
      // ─── Phase 2: KI-Verarbeitung (col 1-2) ───
      { id: 'n2', label: 'KI-Transkription', description: 'Gespräch wird transkribiert & analysiert', icon: 'logo-openai', type: 'ai', ...p(1, 1) },
      { id: 'n3', label: 'CRM: Kunde anlegen', description: 'Kontakt & Deal in HubSpot erstellen', icon: 'logo-hubspot', type: 'process', ...p(2, 0) },
      { id: 'n4', label: 'KI: Briefing erstellen', description: 'Kundenprofil, Zielgruppe & Anforderungen extrahieren', icon: 'logo-claude', type: 'ai', ...p(2, 1) },
      { id: 'n5', label: 'Slack: Team informieren', description: 'Account Manager benachrichtigen', icon: 'logo-slack', type: 'output', ...p(2, 2) },
      // ─── Phase 3: Content-Produktion (col 3-4) ───
      { id: 'n6', label: 'KI: Werbetexte', description: 'Headlines, Copy & CTAs generieren', icon: 'logo-claude', type: 'ai', ...p(3, 0) },
      { id: 'n7', label: 'KI: Website-Texte', description: 'Landing Page Struktur & Inhalte', icon: 'logo-openai', type: 'ai', ...p(3, 2) },
      { id: 'n8', label: 'Qualitäts-Check', description: 'Konsistenz, Tonalität & Vollständigkeit prüfen', icon: 'shield-check', type: 'process', ...p(4, 1) },
      // ─── Phase 4: Deployment & Ergebnis (col 5-6) ───
      { id: 'n9', label: 'Werbetext-Paket', description: 'Copy & Headlines als Google Doc', icon: 'logo-google-docs', type: 'output', ...p(5, 0) },
      { id: 'n10', label: 'Landing Page', description: 'Website erstellt & veröffentlicht', icon: 'globe', type: 'output', ...p(5, 1) },
      { id: 'n11', label: 'Google Ads', description: 'Kampagne konfiguriert & gestartet', icon: 'logo-google-ads', type: 'output', ...p(5, 2) },
      { id: 'n12', label: 'Status-Aggregation', description: 'Alle Ergebnisse zusammenführen', icon: 'git-merge', type: 'process', ...p(6, 1) },
      { id: 'n13', label: 'Slack: Projekt fertig', description: 'Team über Fertigstellung informieren', icon: 'logo-slack', type: 'output', ...p(6, 0) },
      { id: 'n14', label: 'CRM: Deal updaten', description: 'HubSpot Deal-Stage aktualisieren', icon: 'logo-hubspot', type: 'output', ...p(6, 2) },
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' }, { from: 'n2', to: 'n4' }, { from: 'n2', to: 'n5' },
      { from: 'n4', to: 'n6' }, { from: 'n4', to: 'n7' },
      { from: 'n6', to: 'n8' }, { from: 'n7', to: 'n8' },
      { from: 'n6', to: 'n9' }, { from: 'n8', to: 'n10' }, { from: 'n7', to: 'n11' },
      { from: 'n9', to: 'n12' }, { from: 'n10', to: 'n12' }, { from: 'n11', to: 'n12' },
      { from: 'n12', to: 'n13' }, { from: 'n12', to: 'n14' },
    ],
    groups: [
      { id: 'g1', label: 'Eingang',              x: 15,   y: 168, width: 280, height: 148, color: 'blue' },
      { id: 'g2', label: 'KI-Verarbeitung',      x: 355,  y: 8,   width: 620, height: 468, color: 'purple' },
      { id: 'g3', label: 'Content-Produktion',    x: 1035, y: 8,   width: 620, height: 468, color: 'blue' },
      { id: 'g4', label: 'Deployment & Ergebnis', x: 1715, y: 8,   width: 620, height: 468, color: 'green' },
    ],
    outputs: [
      { id: 'o1', name: 'Kundenmappe – Schmidt GmbH', type: 'folder', link: 'https://drive.google.com/drive/folders/example1', createdAt: '2025-01-28T14:30:00Z' },
      { id: 'o2', name: 'Gesprächstranskript – Schmidt', type: 'document', link: 'https://docs.google.com/document/d/example2', createdAt: '2025-01-28T15:00:00Z' },
      { id: 'o3', name: 'Werbetext-Paket – Schmidt GmbH', type: 'document', link: 'https://docs.google.com/document/d/example3', createdAt: '2025-01-28T16:30:00Z' },
      { id: 'o4', name: 'Landing Page – schmidt-gmbh.de', type: 'website', link: 'https://schmidt-gmbh.example.com', createdAt: '2025-01-29T10:00:00Z' },
      { id: 'o5', name: 'Google Ads Kampagne – Schmidt', type: 'other', link: 'https://ads.google.com/campaigns/example5', createdAt: '2025-01-29T11:30:00Z' },
    ],
    lastExecuted: '2025-01-29T11:30:00Z',
    executionCount: 12,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. Content Pipeline — 12 Nodes
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'demo-2',
    name: 'Content Pipeline',
    description: 'Von der Content-Idee über KI-Recherche und Erstellung bis zur Multi-Channel-Veröffentlichung und Performance-Tracking.',
    category: 'Marketing',
    icon: 'file-text',
    status: 'active',
    webhookUrl: '',
    nodes: [
      // ─── Phase 1: Eingang (col 0) ───
      { id: 'cp1', label: 'Content-Briefing', description: 'Thema & Zielgruppe definiert', icon: 'clipboard', type: 'trigger', ...p(0, 1) },
      // ─── Phase 2: Recherche & Planung (col 1-2) ───
      { id: 'cp2', label: 'KI-Recherche', description: 'Quellen, Trends & Daten gesammelt', icon: 'logo-openai', type: 'ai', ...p(1, 1) },
      { id: 'cp3', label: 'Keyword-Analyse', description: 'SEO-Keywords & Suchvolumen ermittelt', icon: 'logo-google-sheets', type: 'process', ...p(1, 2) },
      { id: 'cp4', label: 'Content-Plan', description: 'Struktur & Verteilungsplan erstellt', icon: 'logo-notion', type: 'process', ...p(2, 1) },
      // ─── Phase 3: KI-Erstellung (col 3) ───
      { id: 'cp5', label: 'KI: Blog-Artikel', description: 'SEO-optimierter Longform-Artikel', icon: 'logo-claude', type: 'ai', ...p(3, 0) },
      { id: 'cp6', label: 'KI: Social Posts', description: 'Captions, Hashtags & Hooks', icon: 'logo-claude', type: 'ai', ...p(3, 1) },
      { id: 'cp7', label: 'KI: Newsletter', description: 'E-Mail-Copy & Betreffzeilen', icon: 'logo-openai', type: 'ai', ...p(3, 2) },
      // ─── Phase 4: Publishing & Analytics (col 4-5) ───
      { id: 'cp8', label: 'Blog veröffentlichen', description: 'Artikel in WordPress hochgeladen', icon: 'logo-wordpress', type: 'output', ...p(4, 0) },
      { id: 'cp9', label: 'Social Media posten', description: 'Posts auf allen Kanälen veröffentlicht', icon: 'logo-instagram', type: 'output', ...p(4, 1) },
      { id: 'cp10', label: 'Newsletter senden', description: 'E-Mail-Kampagne gestartet', icon: 'logo-gmail', type: 'output', ...p(4, 2) },
      { id: 'cp11', label: 'Performance-Tracking', description: 'Views, Clicks & Engagement messen', icon: 'logo-google-analytics', type: 'process', ...p(5, 1) },
      { id: 'cp12', label: 'Slack: Team-Update', description: 'Ergebnisse ans Team senden', icon: 'logo-slack', type: 'output', ...p(5, 0) },
    ],
    connections: [
      { from: 'cp1', to: 'cp2' },
      { from: 'cp2', to: 'cp3' }, { from: 'cp2', to: 'cp4' },
      { from: 'cp4', to: 'cp5' }, { from: 'cp4', to: 'cp6' }, { from: 'cp4', to: 'cp7' },
      { from: 'cp5', to: 'cp8' }, { from: 'cp6', to: 'cp9' }, { from: 'cp7', to: 'cp10' },
      { from: 'cp8', to: 'cp11' }, { from: 'cp9', to: 'cp11' }, { from: 'cp10', to: 'cp11' },
      { from: 'cp11', to: 'cp12' },
    ],
    groups: [
      { id: 'gc1', label: 'Eingang',               x: 15,   y: 168, width: 280, height: 148, color: 'blue' },
      { id: 'gc2', label: 'Recherche & Planung',    x: 355,  y: 168, width: 620, height: 308, color: 'purple' },
      { id: 'gc3', label: 'KI-Erstellung',          x: 1035, y: 8,   width: 280, height: 468, color: 'purple' },
      { id: 'gc4', label: 'Publishing & Analytics',  x: 1375, y: 8,   width: 620, height: 468, color: 'green' },
    ],
    outputs: [
      { id: 'o1', name: 'Blog: KI im Mittelstand', type: 'document', link: 'https://docs.google.com/document/d/blog1', createdAt: '2025-01-25T09:00:00Z' },
      { id: 'o2', name: 'Social Media Posts – KW 04', type: 'document', link: 'https://docs.google.com/document/d/social1', createdAt: '2025-01-25T10:30:00Z' },
      { id: 'o3', name: 'Newsletter – KI Guide', type: 'email', link: 'https://mail.google.com/mail/example', createdAt: '2025-01-25T11:00:00Z' },
    ],
    lastExecuted: '2025-01-25T11:00:00Z',
    executionCount: 23,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. Lead Qualifikation — 12 Nodes
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'demo-3',
    name: 'Lead Qualifikation',
    description: 'Eingehende Leads automatisch anreichern, KI-basiert bewerten, segmentieren und mit personalisierten Follow-ups ins CRM überführen.',
    category: 'Sales',
    icon: 'target',
    status: 'active',
    webhookUrl: '',
    nodes: [
      // ─── Phase 1: Lead-Eingang (col 0) ───
      { id: 'lq1', label: 'Lead-Formular', description: 'Neue Anfrage über Formular', icon: 'logo-typeform', type: 'trigger', ...p(0, 0) },
      { id: 'lq2', label: 'E-Mail-Eingang', description: 'Neue Anfrage per Mail', icon: 'logo-gmail', type: 'trigger', ...p(0, 2) },
      // ─── Phase 2: Anreicherung (col 1-2) ───
      { id: 'lq3', label: 'Daten zusammenführen', description: 'Lead-Daten aus Quellen mergen', icon: 'git-merge', type: 'process', ...p(1, 1) },
      { id: 'lq4', label: 'KI: Firmendaten anreichern', description: 'Branche, Größe & Umsatz ergänzen', icon: 'logo-openai', type: 'ai', ...p(2, 1) },
      // ─── Phase 3: Bewertung & CRM (col 3-4) ───
      { id: 'lq5', label: 'KI: Lead-Scoring', description: 'Automatische Bewertung 0–100', icon: 'logo-claude', type: 'ai', ...p(3, 1) },
      { id: 'lq6', label: 'Segmentierung', description: 'Hot / Warm / Cold einstufen', icon: 'logo-google-sheets', type: 'process', ...p(4, 0) },
      { id: 'lq7', label: 'CRM-Eintrag', description: 'Kontakt in HubSpot anlegen', icon: 'logo-hubspot', type: 'output', ...p(4, 2) },
      // ─── Phase 4: Follow-up (col 5-6) ───
      { id: 'lq8', label: 'Slack: Hot-Lead Alert', description: 'Sales-Team sofort benachrichtigen', icon: 'logo-slack', type: 'output', ...p(5, 0) },
      { id: 'lq9', label: 'KI: Personalisierte Mail', description: 'Individuelle Follow-up-Mail generieren', icon: 'logo-claude', type: 'ai', ...p(5, 1) },
      { id: 'lq10', label: 'Follow-up senden', description: 'Personalisierte E-Mail versenden', icon: 'logo-gmail', type: 'output', ...p(6, 1) },
      { id: 'lq11', label: 'Meeting-Buchung', description: 'Automatischer Kalender-Link', icon: 'logo-google-calendar', type: 'output', ...p(6, 0) },
      { id: 'lq12', label: 'Pipeline-Update', description: 'Deal-Stage aktualisieren', icon: 'logo-hubspot', type: 'output', ...p(6, 2) },
    ],
    connections: [
      { from: 'lq1', to: 'lq3' }, { from: 'lq2', to: 'lq3' },
      { from: 'lq3', to: 'lq4' },
      { from: 'lq4', to: 'lq5' },
      { from: 'lq5', to: 'lq6' }, { from: 'lq5', to: 'lq7' },
      { from: 'lq6', to: 'lq8' }, { from: 'lq6', to: 'lq9' },
      { from: 'lq9', to: 'lq10' }, { from: 'lq9', to: 'lq11' },
      { from: 'lq8', to: 'lq12' }, { from: 'lq10', to: 'lq12' },
    ],
    groups: [
      { id: 'gl1', label: 'Lead-Eingang',       x: 15,   y: 8,   width: 280, height: 468, color: 'blue' },
      { id: 'gl2', label: 'Anreicherung',        x: 355,  y: 168, width: 620, height: 148, color: 'purple' },
      { id: 'gl3', label: 'Bewertung & CRM',     x: 1035, y: 8,   width: 620, height: 468, color: 'purple' },
      { id: 'gl4', label: 'Follow-up',           x: 1715, y: 8,   width: 620, height: 468, color: 'green' },
    ],
    outputs: [
      { id: 'o1', name: 'Lead-Report Januar 2025', type: 'spreadsheet', link: 'https://docs.google.com/spreadsheets/d/report1', createdAt: '2025-01-27T16:00:00Z' },
      { id: 'o2', name: 'Follow-up Mail – Müller AG', type: 'email', link: 'https://mail.google.com/mail/example', createdAt: '2025-01-28T09:00:00Z' },
      { id: 'o3', name: 'CRM Update – 12 neue Kontakte', type: 'other', link: 'https://app.hubspot.com/contacts/example', createdAt: '2025-01-29T14:00:00Z' },
    ],
    lastExecuted: '2025-01-29T14:00:00Z',
    executionCount: 47,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. Report Generator — 12 Nodes
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'demo-4',
    name: 'Report Generator',
    description: 'Daten aus verschiedenen Quellen automatisch sammeln, KI-analysieren und als professionellen Report über mehrere Kanäle verteilen.',
    category: 'Operations',
    icon: 'bar-chart',
    status: 'active',
    webhookUrl: '',
    nodes: [
      // ─── Phase 1: Datenquellen (col 0) ───
      { id: 'rg1', label: 'Google Sheets Import', description: 'Daten aus Sheets', icon: 'logo-google-sheets', type: 'trigger', ...p(0, 0) },
      { id: 'rg2', label: 'HubSpot Export', description: 'CRM-Daten exportiert', icon: 'logo-hubspot', type: 'trigger', ...p(0, 2) },
      // ─── Phase 2: Verarbeitung (col 1-2) ───
      { id: 'rg3', label: 'Daten zusammenführen', description: 'Quellen zu einem Datensatz vereint', icon: 'database', type: 'process', ...p(1, 1) },
      { id: 'rg4', label: 'KI: Datenanalyse', description: 'Muster, Trends & Anomalien erkannt', icon: 'logo-openai', type: 'ai', ...p(2, 1) },
      // ─── Phase 3: Report-Erstellung (col 3) ───
      { id: 'rg5', label: 'KI: Report schreiben', description: 'Automatischer Analysebericht', icon: 'logo-claude', type: 'ai', ...p(3, 1) },
      { id: 'rg6', label: 'Visualisierungen', description: 'Charts & Diagramme erzeugt', icon: 'logo-google-sheets', type: 'process', ...p(3, 0) },
      // ─── Phase 4: Distribution (col 4-5) ───
      { id: 'rg7', label: 'PDF in Drive', description: 'Report als PDF gespeichert', icon: 'logo-google-drive', type: 'output', ...p(4, 0) },
      { id: 'rg8', label: 'Dashboard', description: 'Live-Ansicht aktualisiert', icon: 'logo-google-sheets', type: 'output', ...p(4, 1) },
      { id: 'rg9', label: 'E-Mail Versand', description: 'Report an Stakeholder gesendet', icon: 'logo-gmail', type: 'output', ...p(4, 2) },
      { id: 'rg10', label: 'Slack: Report Update', description: 'Team über neuen Report informiert', icon: 'logo-slack', type: 'output', ...p(5, 0) },
      { id: 'rg11', label: 'Archiv', description: 'Report in Notion dokumentiert', icon: 'logo-notion', type: 'output', ...p(5, 1) },
      { id: 'rg12', label: 'CRM: KPIs updaten', description: 'Deal-Properties mit KPIs befüllt', icon: 'logo-hubspot', type: 'output', ...p(5, 2) },
    ],
    connections: [
      { from: 'rg1', to: 'rg3' }, { from: 'rg2', to: 'rg3' },
      { from: 'rg3', to: 'rg4' },
      { from: 'rg4', to: 'rg5' }, { from: 'rg4', to: 'rg6' },
      { from: 'rg5', to: 'rg7' }, { from: 'rg5', to: 'rg8' }, { from: 'rg5', to: 'rg9' },
      { from: 'rg6', to: 'rg7' },
      { from: 'rg7', to: 'rg10' }, { from: 'rg8', to: 'rg11' }, { from: 'rg9', to: 'rg12' },
    ],
    groups: [
      { id: 'gr1', label: 'Datenquellen',       x: 15,   y: 8,   width: 280, height: 468, color: 'blue' },
      { id: 'gr2', label: 'Verarbeitung',        x: 355,  y: 168, width: 620, height: 148, color: 'purple' },
      { id: 'gr3', label: 'Report-Erstellung',   x: 1035, y: 8,   width: 280, height: 308, color: 'purple' },
      { id: 'gr4', label: 'Distribution',         x: 1375, y: 8,   width: 620, height: 468, color: 'green' },
    ],
    outputs: [
      { id: 'o1', name: 'Monatsbericht Dezember', type: 'document', link: 'https://docs.google.com/document/d/report-dec', createdAt: '2025-01-20T08:00:00Z' },
      { id: 'o2', name: 'Performance Dashboard Q4', type: 'website', link: 'https://dashboard.example.com/q4', createdAt: '2025-01-20T09:00:00Z' },
      { id: 'o3', name: 'Executive Summary Q4', type: 'document', link: 'https://docs.google.com/document/d/exec-q4', createdAt: '2025-01-22T10:00:00Z' },
    ],
    lastExecuted: '2025-01-22T10:00:00Z',
    executionCount: 8,
  },
];

// ─── English Translations for Demo Systems ──────────────────────────────────

const DEMO_META_EN: Record<string, { name: string; description: string }> = {
  'demo-1': { name: 'Client Onboarding',   description: 'From the initial meeting to finished website, ad copy and Google Ads — fully automated with AI analysis, content production and multi-channel deployment.' },
  'demo-2': { name: 'Content Pipeline',     description: 'From content idea through AI research and creation to multi-channel publishing and performance tracking.' },
  'demo-3': { name: 'Lead Qualification',   description: 'Automatically enrich incoming leads, AI-score them, segment and convert with personalized follow-ups into CRM.' },
  'demo-4': { name: 'Report Generator',     description: 'Automatically collect data from various sources, AI-analyze and distribute as professional reports through multiple channels.' },
};

/** Composite key: "systemId:nodeId" → { label, description } */
const DEMO_NODE_EN: Record<string, { label: string; description: string }> = {
  // ─── demo-1: Client Onboarding ───
  'demo-1:n1':  { label: 'Onboarding Meeting',       description: 'Initial meeting with the client' },
  'demo-1:n2':  { label: 'AI Transcription',          description: 'Conversation is transcribed & analyzed' },
  'demo-1:n3':  { label: 'CRM: Create Client',        description: 'Create contact & deal in HubSpot' },
  'demo-1:n4':  { label: 'AI: Create Briefing',       description: 'Extract client profile, target audience & requirements' },
  'demo-1:n5':  { label: 'Slack: Notify Team',        description: 'Notify account manager' },
  'demo-1:n6':  { label: 'AI: Ad Copy',               description: 'Generate headlines, copy & CTAs' },
  'demo-1:n7':  { label: 'AI: Website Texts',         description: 'Landing page structure & content' },
  'demo-1:n8':  { label: 'Quality Check',             description: 'Check consistency, tone & completeness' },
  'demo-1:n9':  { label: 'Ad Copy Package',           description: 'Copy & headlines as Google Doc' },
  'demo-1:n10': { label: 'Landing Page',              description: 'Website created & published' },
  'demo-1:n11': { label: 'Google Ads',                description: 'Campaign configured & launched' },
  'demo-1:n12': { label: 'Status Aggregation',        description: 'Merge all results' },
  'demo-1:n13': { label: 'Slack: Project Complete',   description: 'Notify team about completion' },
  'demo-1:n14': { label: 'CRM: Update Deal',          description: 'Update HubSpot deal stage' },
  // ─── demo-2: Content Pipeline ───
  'demo-2:cp1':  { label: 'Content Briefing',        description: 'Topic & audience defined' },
  'demo-2:cp2':  { label: 'AI Research',              description: 'Sources, trends & data collected' },
  'demo-2:cp3':  { label: 'Keyword Analysis',         description: 'SEO keywords & search volume determined' },
  'demo-2:cp4':  { label: 'Content Plan',             description: 'Structure & distribution plan created' },
  'demo-2:cp5':  { label: 'AI: Blog Article',         description: 'SEO-optimized longform article' },
  'demo-2:cp6':  { label: 'AI: Social Posts',         description: 'Captions, hashtags & hooks' },
  'demo-2:cp7':  { label: 'AI: Newsletter',           description: 'Email copy & subject lines' },
  'demo-2:cp8':  { label: 'Publish Blog',             description: 'Article uploaded to WordPress' },
  'demo-2:cp9':  { label: 'Post to Social Media',     description: 'Posts published on all channels' },
  'demo-2:cp10': { label: 'Send Newsletter',          description: 'Email campaign started' },
  'demo-2:cp11': { label: 'Performance Tracking',     description: 'Measure views, clicks & engagement' },
  'demo-2:cp12': { label: 'Slack: Team Update',       description: 'Send results to team' },
  // ─── demo-3: Lead Qualification ───
  'demo-3:lq1':  { label: 'Lead Form',               description: 'New inquiry via form' },
  'demo-3:lq2':  { label: 'Email Intake',             description: 'New inquiry via email' },
  'demo-3:lq3':  { label: 'Merge Data',               description: 'Merge lead data from sources' },
  'demo-3:lq4':  { label: 'AI: Enrich Company Data',  description: 'Add industry, size & revenue' },
  'demo-3:lq5':  { label: 'AI: Lead Scoring',         description: 'Automatic scoring 0–100' },
  'demo-3:lq6':  { label: 'Segmentation',             description: 'Classify as Hot / Warm / Cold' },
  'demo-3:lq7':  { label: 'CRM Entry',                description: 'Create contact in HubSpot' },
  'demo-3:lq8':  { label: 'Slack: Hot Lead Alert',    description: 'Notify sales team immediately' },
  'demo-3:lq9':  { label: 'AI: Personalized Email',   description: 'Generate individual follow-up email' },
  'demo-3:lq10': { label: 'Send Follow-up',           description: 'Send personalized email' },
  'demo-3:lq11': { label: 'Book Meeting',             description: 'Automatic calendar link' },
  'demo-3:lq12': { label: 'Pipeline Update',          description: 'Update deal stage' },
  // ─── demo-4: Report Generator ───
  'demo-4:rg1':  { label: 'Google Sheets Import',    description: 'Data from Sheets' },
  'demo-4:rg2':  { label: 'HubSpot Export',          description: 'CRM data exported' },
  'demo-4:rg3':  { label: 'Merge Data',               description: 'Sources combined into one dataset' },
  'demo-4:rg4':  { label: 'AI: Data Analysis',        description: 'Patterns, trends & anomalies detected' },
  'demo-4:rg5':  { label: 'AI: Write Report',         description: 'Automatic analysis report' },
  'demo-4:rg6':  { label: 'Visualizations',           description: 'Charts & diagrams generated' },
  'demo-4:rg7':  { label: 'PDF to Drive',             description: 'Report saved as PDF' },
  'demo-4:rg8':  { label: 'Dashboard',                description: 'Live view updated' },
  'demo-4:rg9':  { label: 'Email Delivery',           description: 'Report sent to stakeholders' },
  'demo-4:rg10': { label: 'Slack: Report Update',     description: 'Team informed about new report' },
  'demo-4:rg11': { label: 'Archive',                  description: 'Report documented in Notion' },
  'demo-4:rg12': { label: 'CRM: Update KPIs',         description: 'Deal properties filled with KPIs' },
};

/** Composite key: "systemId:groupId" → English label */
const DEMO_GROUP_EN: Record<string, string> = {
  // demo-1
  'demo-1:g1': 'Intake',              'demo-1:g2': 'AI Processing',
  'demo-1:g3': 'Content Production',  'demo-1:g4': 'Deployment & Results',
  // demo-2
  'demo-2:gc1': 'Intake',             'demo-2:gc2': 'Research & Planning',
  'demo-2:gc3': 'AI Creation',        'demo-2:gc4': 'Publishing & Analytics',
  // demo-3
  'demo-3:gl1': 'Lead Intake',        'demo-3:gl2': 'Enrichment',
  'demo-3:gl3': 'Scoring & CRM',      'demo-3:gl4': 'Follow-up',
  // demo-4
  'demo-4:gr1': 'Data Sources',       'demo-4:gr2': 'Processing',
  'demo-4:gr3': 'Report Creation',    'demo-4:gr4': 'Distribution',
};

export function getLocalizedDemoSystem(sys: AutomationSystem, lang: 'de' | 'en'): AutomationSystem {
  if (lang === 'de') return sys;
  const meta = DEMO_META_EN[sys.id];
  return {
    ...sys,
    name: meta?.name || sys.name,
    description: meta?.description || sys.description,
    nodes: sys.nodes.map(n => {
      const en = DEMO_NODE_EN[`${sys.id}:${n.id}`];
      return en ? { ...n, label: en.label, description: en.description } : n;
    }),
    groups: sys.groups?.map(g => {
      const en = DEMO_GROUP_EN[`${sys.id}:${g.id}`];
      return en ? { ...g, label: en } : g;
    }),
  };
}

// ─── Storage Keys ──────────────────────────────────────────────────────────────

export const STORAGE_KEY = 'flowstack-automation-systems';
const HIDDEN_DEMOS_KEY = 'flowstack-hidden-demos';

// ─── User Systems CRUD ─────────────────────────────────────────────────────────

export function loadUserSystems(): AutomationSystem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (s: unknown): s is AutomationSystem =>
        typeof s === 'object' && s !== null &&
        typeof (s as AutomationSystem).id === 'string' &&
        typeof (s as AutomationSystem).name === 'string' &&
        Array.isArray((s as AutomationSystem).nodes),
    );
  } catch {
    return [];
  }
}

export function saveUserSystems(systems: AutomationSystem[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(systems));
    return true;
  } catch (e) {
    console.warn('localStorage Fehler beim Speichern:', e);
    return false;
  }
}

// ─── Hidden Demo Systems ───────────────────────────────────────────────────────

export function getHiddenDemoIds(): string[] {
  try {
    const stored = localStorage.getItem(HIDDEN_DEMOS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function hideDemoSystem(id: string): void {
  try {
    const hidden = getHiddenDemoIds();
    if (!hidden.includes(id)) {
      localStorage.setItem(HIDDEN_DEMOS_KEY, JSON.stringify([...hidden, id]));
    }
  } catch (e) {
    console.warn('localStorage Fehler:', e);
  }
}

export function unhideDemoSystem(id: string): void {
  try {
    const hidden = getHiddenDemoIds().filter(h => h !== id);
    localStorage.setItem(HIDDEN_DEMOS_KEY, JSON.stringify(hidden));
  } catch (e) {
    console.warn('localStorage Fehler:', e);
  }
}

// ─── Aggregation ───────────────────────────────────────────────────────────────

export function getVisibleDemoSystems(): AutomationSystem[] {
  const hidden = new Set(getHiddenDemoIds());
  const masterHidden = DEMO_SYSTEMS.filter(d => hidden.has(d.id) && !d.parentId);
  const masterHiddenIds = new Set(masterHidden.map(d => d.id));
  return DEMO_SYSTEMS.filter(d => !hidden.has(d.id) && !(d.parentId && masterHiddenIds.has(d.parentId)));
}

export function getAllSystems(): AutomationSystem[] {
  return [...getVisibleDemoSystems(), ...loadUserSystems()];
}

export function findSystem(id: string): AutomationSystem | undefined {
  return getAllSystems().find(s => s.id === id);
}

// ── Sub-System helpers ────────────────────────────────────────

export function getSubSystems(parentId: string): AutomationSystem[] {
  return getAllSystems()
    .filter(s => s.parentId === parentId)
    .sort((a, b) => (a.subSystemOrder ?? 0) - (b.subSystemOrder ?? 0));
}

export function getTopLevelSystems(): AutomationSystem[] {
  return getAllSystems().filter(s => !s.parentId);
}

export function isMasterSystem(systemId: string): boolean {
  return getAllSystems().some(s => s.parentId === systemId);
}

export function getParentSystem(childId: string): AutomationSystem | undefined {
  const child = findSystem(childId);
  if (!child?.parentId) return undefined;
  return findSystem(child.parentId);
}

// ── Demo Resources ──────────────────────────────────────────────────────────

import type { SystemResource } from '../types/automation';

export function getDemoResources(_systemId: string, _lang: 'de' | 'en'): SystemResource[] {
  return [];
}
