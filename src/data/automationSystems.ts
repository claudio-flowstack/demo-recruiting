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
  {
    id: 'demo-1',
    name: 'Client Onboarding',
    description: 'Vom Erstgespräch zur fertigen Website, Werbetexten und Google Ads – vollautomatisch.',
    category: 'Marketing',
    icon: 'users',
    status: 'active',
    webhookUrl: '',
    nodes: [
      { id: 'n1', label: 'Onboarding-Gespräch', description: 'Erstgespräch mit dem Kunden', icon: 'users', type: 'trigger', ...p(0, 0), linkedPage: '/onboarding' },
      { id: 'n2', label: 'KI-Transkription', description: 'Gespräch wird transkribiert', icon: 'logo-openai', type: 'ai', ...p(1, 0) },
      { id: 'n3', label: 'Werbetexte', description: 'Copy & Headlines generiert', icon: 'logo-google-docs', type: 'output', ...p(2, 0) },
      { id: 'n4', label: 'Website', description: 'Landing Page erstellt', icon: 'globe', type: 'output', ...p(2, 1) },
      { id: 'n5', label: 'Google Ads', description: 'Kampagne aufgesetzt', icon: 'target', type: 'output', ...p(2, 2) },
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n2', to: 'n4' },
      { from: 'n2', to: 'n5' },
    ],
    groups: [
      { id: 'g1', label: 'Eingang', x: 15, y: 8, width: 280, height: 148, color: 'blue' },
      { id: 'g2', label: 'KI-Verarbeitung', x: 355, y: 8, width: 280, height: 148, color: 'purple' },
      { id: 'g3', label: 'Ergebnisse', x: 695, y: 8, width: 280, height: 468, color: 'green' },
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
  {
    id: 'demo-2',
    name: 'Content Pipeline',
    description: 'Von der Content-Idee zum fertigen Blogpost, Social Media Post und LinkedIn Carousel.',
    category: 'Marketing',
    icon: 'type',
    status: 'active',
    webhookUrl: '',
    nodes: [
      { id: 'n1', label: 'Content-Briefing', description: 'Thema & Zielgruppe definiert', icon: 'clipboard', type: 'trigger', ...p(0, 0) },
      { id: 'n2', label: 'KI-Recherche', description: 'Quellen & Daten gesammelt', icon: 'logo-openai', type: 'ai', ...p(1, 0) },
      { id: 'n3', label: 'Content-Erstellung', description: 'Texte KI-generiert', icon: 'logo-claude', type: 'ai', ...p(2, 0) },
      { id: 'n4', label: 'Blogpost', description: 'Artikel formatiert & bereit', icon: 'logo-notion', type: 'output', ...p(3, 0) },
      { id: 'n5', label: 'Social Media', description: 'Posts für alle Kanäle', icon: 'logo-meta', type: 'output', ...p(3, 1) },
      { id: 'n6', label: 'LinkedIn Carousel', description: 'Slides generiert', icon: 'logo-linkedin', type: 'output', ...p(3, 2) },
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n3', to: 'n5' },
      { from: 'n3', to: 'n6' },
    ],
    outputs: [
      { id: 'o1', name: 'Blog: KI im Mittelstand', type: 'document', link: 'https://docs.google.com/document/d/blog1', createdAt: '2025-01-25T09:00:00Z' },
      { id: 'o2', name: 'Social Media Posts – KW 04', type: 'document', link: 'https://docs.google.com/document/d/social1', createdAt: '2025-01-25T10:30:00Z' },
      { id: 'o3', name: 'LinkedIn Carousel – KI Guide', type: 'image', link: 'https://drive.google.com/file/d/carousel1', createdAt: '2025-01-25T11:00:00Z' },
    ],
    lastExecuted: '2025-01-25T11:00:00Z',
    executionCount: 23,
  },
  {
    id: 'demo-3',
    name: 'Lead Qualifikation',
    description: 'Eingehende Leads automatisch anreichern, bewerten und ins CRM überführen.',
    category: 'Sales',
    icon: 'target',
    status: 'active',
    webhookUrl: '',
    nodes: [
      { id: 'n1', label: 'Lead-Eingang', description: 'Neuer Kontakt empfangen', icon: 'logo-gmail', type: 'trigger', ...p(0, 0) },
      { id: 'n2', label: 'Datenanreicherung', description: 'Firmendaten ergänzt', icon: 'database', type: 'process', ...p(1, 0) },
      { id: 'n3', label: 'KI-Scoring', description: 'Lead-Qualität bewertet', icon: 'logo-openai', type: 'ai', ...p(2, 0) },
      { id: 'n4', label: 'CRM-Eintrag', description: 'In HubSpot angelegt', icon: 'logo-hubspot', type: 'output', ...p(3, 0) },
      { id: 'n5', label: 'Follow-up Mail', description: 'Personalisierte E-Mail', icon: 'logo-gmail', type: 'output', ...p(3, 1) },
      { id: 'n6', label: 'Team-Benachrichtigung', description: 'Sales-Team informiert', icon: 'logo-slack', type: 'output', ...p(2, 1) },
    ],
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n3', to: 'n5' },
      { from: 'n2', to: 'n6' },
    ],
    outputs: [
      { id: 'o1', name: 'Lead-Report Januar 2025', type: 'spreadsheet', link: 'https://docs.google.com/spreadsheets/d/report1', createdAt: '2025-01-27T16:00:00Z' },
      { id: 'o2', name: 'Follow-up Mail – Müller AG', type: 'email', link: 'https://mail.google.com/mail/example', createdAt: '2025-01-28T09:00:00Z' },
      { id: 'o3', name: 'CRM Update – 12 neue Kontakte', type: 'other', link: 'https://app.hubspot.com/contacts/example', createdAt: '2025-01-29T14:00:00Z' },
    ],
    lastExecuted: '2025-01-29T14:00:00Z',
    executionCount: 47,
  },
  {
    id: 'demo-4',
    name: 'Report Generator',
    description: 'Daten aus verschiedenen Quellen sammeln, analysieren und als fertigen Report versenden.',
    category: 'Operations',
    icon: 'bar-chart',
    status: 'draft',
    webhookUrl: '',
    nodes: [
      { id: 'n1a', label: 'Google Sheets Import', description: 'Daten aus Sheets', icon: 'logo-google-sheets', type: 'trigger', x: 40, y: 18 },
      { id: 'n1b', label: 'HubSpot Export', description: 'CRM-Daten exportiert', icon: 'logo-hubspot', type: 'trigger', x: 40, y: 18 + 160 },
      { id: 'n2', label: 'Daten zusammenführen', description: 'Quellen vereint', icon: 'database', type: 'process', ...p(1, 0) },
      { id: 'n3', label: 'KI-Analyse', description: 'Muster & Trends erkannt', icon: 'logo-openai', type: 'ai', ...p(2, 0) },
      { id: 'n4', label: 'Report erstellen', description: 'Bericht formatiert', icon: 'logo-google-docs', type: 'process', ...p(3, 0) },
      { id: 'n5', label: 'PDF in Drive', description: 'Als PDF gespeichert', icon: 'logo-google-drive', type: 'output', ...p(4, 0) },
      { id: 'n6', label: 'Dashboard', description: 'Live-Ansicht aktualisiert', icon: 'bar-chart', type: 'output', x: 40 + 4 * 340, y: 18 + 160 },
      { id: 'n7', label: 'E-Mail Versand', description: 'An Team versendet', icon: 'logo-gmail', type: 'output', x: 40 + 4 * 340, y: 18 + 2 * 160 },
    ],
    connections: [
      { from: 'n1a', to: 'n2' },
      { from: 'n1b', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n4', to: 'n6' },
      { from: 'n4', to: 'n7' },
    ],
    groups: [
      { id: 'g1', label: 'Datenquellen', x: 15, y: 8, width: 280, height: 308, color: 'blue' },
      { id: 'g2', label: 'Analyse & Verarbeitung', x: 355, y: 8, width: 960, height: 148, color: 'purple' },
      { id: 'g3', label: 'Distribution', x: 1375, y: 8, width: 280, height: 468, color: 'green' },
    ],
    outputs: [
      { id: 'o1', name: 'Monatsbericht Dezember', type: 'document', link: 'https://docs.google.com/document/d/report-dec', createdAt: '2025-01-20T08:00:00Z' },
      { id: 'o2', name: 'Performance Dashboard Q4', type: 'website', link: 'https://dashboard.example.com/q4', createdAt: '2025-01-20T09:00:00Z' },
      { id: 'o3', name: 'Executive Summary Q4', type: 'document', link: 'https://docs.google.com/document/d/exec-q4', createdAt: '2025-01-22T10:00:00Z' },
    ],
    lastExecuted: '2025-01-22T10:00:00Z',
    executionCount: 8,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SHOWCASE — Demonstrates all node types with different visual sizes
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'demo-showcase',
    name: 'KI-Agentur · Kompletter Workflow',
    description: 'Zeigt alle Node-Typen: Trigger (schmal), Prozess (standard), KI (groß & prominent), Output (kompakt) und Sub-System (Container).',
    category: 'Showcase',
    icon: 'sparkles',
    status: 'active',
    webhookUrl: '',
    nodes: [
      // ─── Trigger (210×78 — schmaler, Start-Shape) ───
      { id: 'sc1',  label: 'Neuer Lead',               description: 'Formular ausgefüllt',                       icon: 'logo-hubspot',       type: 'trigger', ...p(0, 1) },
      { id: 'sc2',  label: 'E-Mail eingehend',          description: 'Neue Anfrage per Mail',                     icon: 'logo-gmail',         type: 'trigger', ...p(0, 3) },
      // ─── Process (230×82 — Standard) ───
      { id: 'sc3',  label: 'Daten zusammenführen',       description: 'Lead-Daten & Mail-Inhalt mergen',          icon: 'git-merge',          type: 'process', ...p(1, 2) },
      { id: 'sc4',  label: 'CRM-Eintrag erstellen',     description: 'Kontakt in HubSpot anlegen',               icon: 'logo-hubspot',       type: 'process', ...p(2, 0) },
      // ─── AI (280×110 — groß, prominent, Glow) ───
      { id: 'sc5',  label: 'KI: Lead-Bewertung',        description: 'Agent bewertet Branche, Größe & Potenzial — Score 0-100', icon: 'logo-openai', type: 'ai', ...p(2, 2) },
      { id: 'sc6',  label: 'KI: Angebots-Generator',    description: 'Personalisiertes Angebot erstellen basierend auf Lead-Profil', icon: 'logo-claude', type: 'ai', ...p(4, 1) },
      // ─── Output (210×78 — kompakt) ───
      { id: 'sc7',  label: 'Slack: Benachrichtigung',   description: 'Team informieren',                          icon: 'logo-slack',         type: 'output', ...p(3, 0) },
      { id: 'sc8',  label: 'Google Doc: Angebot',       description: 'PDF-Angebot generiert',                     icon: 'logo-google-docs',   type: 'output', ...p(5, 0) },
      { id: 'sc9',  label: 'E-Mail: Angebot senden',    description: 'Automatische Angebots-Mail',                icon: 'logo-gmail',         type: 'output', ...p(5, 2) },
      { id: 'sc10', label: 'Dashboard aktualisieren',    description: 'Live-Tracking updaten',                    icon: 'logo-google-sheets',  type: 'output', ...p(5, 3) },
      // ─── Subsystem (300×120 — größte Node, Container-Look) ───
      { id: 'sc11', label: 'Follow-Up Automation',      description: 'Sub-Workflow · 8 Nodes · E-Mail-Sequenz, Reminder, Eskalation', icon: 'layers', type: 'subsystem' as const, ...p(4, 3) },
      // ─── Process: Nachbearbeitung ───
      { id: 'sc12', label: 'Lead-Score speichern',      description: 'Score in CRM-Deal ablegen',                 icon: 'database',           type: 'process', ...p(3, 3) },
    ],
    connections: [
      { from: 'sc1', to: 'sc3' }, { from: 'sc2', to: 'sc3' },
      { from: 'sc3', to: 'sc4' }, { from: 'sc3', to: 'sc5' },
      { from: 'sc5', to: 'sc7' }, { from: 'sc5', to: 'sc6' }, { from: 'sc5', to: 'sc12' },
      { from: 'sc6', to: 'sc8' }, { from: 'sc6', to: 'sc9' },
      { from: 'sc12', to: 'sc11' }, { from: 'sc12', to: 'sc10' },
    ],
    groups: [
      { id: 'gsc1', label: 'Eingang',           x: 15,           y: 18 + 160 - 10, width: 280,            height: 2 * 160 + 148, color: 'blue' },
      { id: 'gsc2', label: 'KI-Analyse & CRM',  x: 15 + 340,    y: 8,              width: 2 * 340 + 280,  height: 3 * 160 + 148, color: 'purple' },
      { id: 'gsc3', label: 'Ausgabe & Angebot',  x: 15 + 4 * 340, y: 8,            width: 340 + 280,      height: 3 * 160 + 148, color: 'green' },
    ],
    outputs: [],
    lastExecuted: '2025-02-15T10:00:00Z',
    executionCount: 34,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RECRUITING AGENCY — Master System + 4 Sub-Systems
  // Position helper with 160px vertical spacing for recruiting systems
  // pr(col, row) → { x: 40 + col * 340, y: 18 + row * 160 }
  // Group formula: x=15+col×340, y=18+row×160-10, w=(cols-1)×340+280, h=(rows-1)×160+148
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Master: Recruiting Agency Automation ──────────────────────────────────
  {
    id: 'demo-recruiting-master',
    name: 'Recruiting Agency Automation',
    description: 'Gesamtübersicht der Recruiting-Agentur: Onboarding, Content-Erstellung, Kampagnen-Monitoring und Qualitätsprüfung — alles in Sub-Systemen organisiert.',
    category: 'Recruiting',
    icon: 'users',
    status: 'active',
    webhookUrl: '',
    nodes: [
      // ─── Eingang ───
      { id: 'rm1',  label: 'Neuer Recruiting-Kunde',   description: 'Formular eingereicht oder Deal in HubSpot gewonnen', icon: 'logo-hubspot', type: 'trigger', x: 40, y: 18 + 2 * 160 },
      { id: 'rm2',  label: 'KI: Kundenprofil erstellen', description: 'Agent analysiert Branche, Größe und priorisiert', icon: 'logo-openai', type: 'ai', x: 40 + 340, y: 18 + 2 * 160 },
      { id: 'rm3',  label: 'Slack: Team-Zuweisung',     description: 'Zuständigen Account Manager benachrichtigen', icon: 'logo-slack', type: 'output', x: 40 + 340, y: 18 + 0 * 160 },
      { id: 'rm4',  label: 'CRM: Deal anlegen',         description: 'Pipeline-Eintrag mit allen Kundendaten', icon: 'logo-hubspot', type: 'output', x: 40 + 340, y: 18 + 4 * 160 },
      // ─── Sub-System Nodes ───
      { id: 'sub-demo-recruiting-sub1', label: 'Onboarding & Infrastruktur', description: '12 Nodes · Webhook-Trigger · Zugänge, Ordner, Branding, KI-Transkription', icon: 'layers', type: 'subsystem' as const, x: 40 + 2 * 340, y: 18 + 1 * 160, linkedSubSystemId: 'demo-recruiting-sub1' },
      { id: 'sub-demo-recruiting-sub4', label: 'Qualitätsprüfung & Checks', description: '15 Nodes · Webhook-Trigger · Dateien, Briefing, Zugänge, Compliance', icon: 'layers', type: 'subsystem' as const, x: 40 + 2 * 340, y: 18 + 3 * 160, linkedSubSystemId: 'demo-recruiting-sub4' },
      { id: 'sub-demo-recruiting-sub2', label: 'Content & Material-Erstellung', description: '16 Nodes · Webhook-Trigger · Landing Page, Stellenanzeigen, Ad Copy, Creative Prompts', icon: 'layers', type: 'subsystem' as const, x: 40 + 4 * 340, y: 18 + 1 * 160, linkedSubSystemId: 'demo-recruiting-sub2' },
      { id: 'sub-demo-recruiting-sub3', label: 'Kampagnen & Reporting', description: '16 Nodes · Webhook-Trigger · Meta, Google, LinkedIn Ads, KPI-Tracking', icon: 'layers', type: 'subsystem' as const, x: 40 + 4 * 340, y: 18 + 3 * 160, linkedSubSystemId: 'demo-recruiting-sub3' },
      // ─── Aggregation & Abschluss ───
      { id: 'rm5',  label: 'KI: Status-Aggregation',    description: 'Agent prüft alle Sub-Systeme auf Vollständigkeit', icon: 'logo-claude', type: 'ai', x: 40 + 6 * 340, y: 18 + 2 * 160 },
      { id: 'rm6',  label: 'Master-Dashboard Update',   description: 'Google Sheet mit Gesamtstatus aktualisieren', icon: 'logo-google-sheets', type: 'output', x: 40 + 7 * 340, y: 18 + 1 * 160 },
      { id: 'rm7',  label: 'Slack: Kunde live',         description: 'Team benachrichtigen — Kunde ist vollständig aufgesetzt', icon: 'logo-slack', type: 'output', x: 40 + 7 * 340, y: 18 + 3 * 160 },
      { id: 'rm8',  label: 'Kunde aktiv & live',        description: 'Alle Systeme laufen, Kampagnen gestartet', icon: 'check-circle', type: 'output', x: 40 + 8 * 340, y: 18 + 2 * 160 },
    ],
    connections: [
      { from: 'rm1', to: 'rm2' },
      { from: 'rm2', to: 'rm3' }, { from: 'rm2', to: 'rm4' },
      { from: 'rm2', to: 'sub-demo-recruiting-sub1', label: 'Webhook' },
      { from: 'rm2', to: 'sub-demo-recruiting-sub4', label: 'Parallel' },
      { from: 'sub-demo-recruiting-sub1', to: 'sub-demo-recruiting-sub2', label: 'Webhook' },
      { from: 'sub-demo-recruiting-sub4', to: 'sub-demo-recruiting-sub2', label: 'Check OK' },
      { from: 'sub-demo-recruiting-sub2', to: 'sub-demo-recruiting-sub3', label: 'Webhook' },
      { from: 'sub-demo-recruiting-sub3', to: 'rm5' },
      { from: 'sub-demo-recruiting-sub4', to: 'rm5' },
      { from: 'rm5', to: 'rm6' }, { from: 'rm5', to: 'rm7' },
      { from: 'rm6', to: 'rm8' }, { from: 'rm7', to: 'rm8' },
    ],
    groups: [
      { id: 'grm1', label: 'Kunden-Eingang & Analyse',           x: 15,             y: 8,              width: 620,  height: 4 * 160 + 148, color: 'blue' },
      { id: 'grm2', label: 'Sub-Workflows · Setup & Produktion', x: 15 + 2 * 340,   y: 18 + 160 - 10,  width: 2 * 340 + 280, height: 2 * 160 + 148, color: 'purple' },
      { id: 'grm3', label: 'Aggregation & Go-Live',              x: 15 + 6 * 340,   y: 18 + 160 - 10,  width: 2 * 340 + 280, height: 2 * 160 + 148, color: 'green' },
    ],
    outputs: [],
    lastExecuted: '2025-02-14T16:00:00Z',
    executionCount: 23,
  },

  // ─── Sub-System 1: Onboarding & Infrastruktur ─────────────────────────────
  {
    id: 'demo-recruiting-sub1',
    name: 'Onboarding & Infrastruktur',
    description: 'Erstgespräch, Zugänge einrichten, Ordnerstruktur anlegen, Branding-Kit sammeln — mit KI-Transkription und automatischem Employer Profile.',
    category: 'Recruiting',
    icon: 'settings',
    status: 'active',
    webhookUrl: 'https://hooks.flowstack.app/recruiting/onboarding',
    parentId: 'demo-recruiting-master',
    subSystemOrder: 0,
    nodes: [
      // ─── Trigger ───
      { id: 's1n1',  label: 'Webhook: Neuer Kunde',     description: 'Empfängt Kundendaten vom Master-System', icon: 'webhook', type: 'trigger', x: 40, y: 18 + 2 * 160 },
      // ─── Paralleles Setup ───
      { id: 's1n2',  label: 'Slack: Neuer Kunde',        description: 'Team über neuen Kunden informieren', icon: 'logo-slack', type: 'output', x: 40 + 340, y: 18 + 0 * 160 },
      { id: 's1n3',  label: 'Calendly: Termin buchen',   description: 'Onboarding-Call mit Kunde planen', icon: 'logo-calendly', type: 'output', x: 40 + 340, y: 18 + 1 * 160 },
      { id: 's1n4',  label: 'Drive: Ordner anlegen',     description: 'Komplette Ordnerstruktur im Kundenordner', icon: 'logo-google-drive', type: 'output', x: 40 + 340, y: 18 + 3 * 160 },
      { id: 's1n5',  label: 'Templates kopieren',        description: 'Briefing-, Feedback- und Reporting-Vorlagen', icon: 'logo-google-docs', type: 'process', x: 40 + 340, y: 18 + 4 * 160 },
      { id: 's1n6',  label: 'HubSpot: Deal updaten',     description: 'Status auf "Onboarding" setzen', icon: 'logo-hubspot', type: 'output', x: 40 + 340, y: 18 + 2 * 160 },
      // ─── Onboarding-Call ───
      { id: 's1n7',  label: 'Onboarding-Call',           description: 'Erstgespräch durchführen (Zoom/Meet)', icon: 'video', type: 'process', x: 40 + 2 * 340, y: 18 + 2 * 160 },
      { id: 's1n8',  label: 'KI-Transkription',          description: 'Gespräch automatisch transkribieren', icon: 'logo-openai', type: 'ai', x: 40 + 3 * 340, y: 18 + 2 * 160 },
      // ─── KI-Analyse (3 Lanes) ───
      { id: 's1n9',  label: 'KI: Daten extrahieren',     description: 'Branche, Zielgruppe, USPs, Anforderungen auslesen', icon: 'logo-claude', type: 'ai', x: 40 + 4 * 340, y: 18 + 1 * 160 },
      { id: 's1n10', label: 'Employer Profile',           description: 'Arbeitgeber-Steckbrief als Google Doc erstellen', icon: 'logo-google-docs', type: 'output', x: 40 + 5 * 340, y: 18 + 0 * 160 },
      { id: 's1n11', label: 'KI: Stellenprofil & Personas', description: 'Rollen- und Zielgruppen-Profile generieren', icon: 'logo-claude', type: 'ai', x: 40 + 4 * 340, y: 18 + 3 * 160 },
      { id: 's1n12', label: 'Persona-Dokument',           description: 'Zielgruppen-Personas als Google Doc', icon: 'logo-google-docs', type: 'output', x: 40 + 5 * 340, y: 18 + 4 * 160 },
      { id: 's1n13', label: 'Zusammenführen',             description: 'Employer Profile + Personas zusammenführen', icon: 'git-merge', type: 'process', x: 40 + 5 * 340, y: 18 + 2 * 160 },
      // ─── Branding & Abschluss ───
      { id: 's1n14', label: 'Branding-Kit sammeln',       description: 'Logo, Farben, Schriften vom Kunden einsammeln', icon: 'palette', type: 'process', x: 40 + 6 * 340, y: 18 + 2 * 160 },
      { id: 's1n15', label: 'Freigabe: Faktencheck',      description: 'Manuelle Prüfung — stimmen alle Daten?', icon: 'shield-check', type: 'process', x: 40 + 7 * 340, y: 18 + 2 * 160 },
      // ─── Webhook-Ausgänge ───
      { id: 's1n16', label: 'Webhook: → Content',         description: 'Triggert Sub-System 2 (Content-Erstellung)', icon: 'webhook', type: 'output', x: 40 + 8 * 340, y: 18 + 1 * 160 },
      { id: 's1n17', label: 'Webhook: → Checks',          description: 'Triggert Sub-System 4 (Qualitätsprüfung)', icon: 'webhook', type: 'output', x: 40 + 8 * 340, y: 18 + 3 * 160 },
      { id: 's1n18', label: 'Slack: Setup abgeschlossen', description: 'Team über abgeschlossenes Setup informieren', icon: 'logo-slack', type: 'output', x: 40 + 8 * 340, y: 18 + 2 * 160 },
    ],
    connections: [
      { from: 's1n1', to: 's1n2' }, { from: 's1n1', to: 's1n3' }, { from: 's1n1', to: 's1n4' },
      { from: 's1n1', to: 's1n5' }, { from: 's1n1', to: 's1n6' },
      { from: 's1n3', to: 's1n7' }, { from: 's1n6', to: 's1n7' },
      { from: 's1n7', to: 's1n8' },
      { from: 's1n8', to: 's1n9' }, { from: 's1n8', to: 's1n11' },
      { from: 's1n9', to: 's1n10' }, { from: 's1n9', to: 's1n13' },
      { from: 's1n11', to: 's1n12' }, { from: 's1n11', to: 's1n13' },
      { from: 's1n13', to: 's1n14' },
      { from: 's1n14', to: 's1n15' },
      { from: 's1n15', to: 's1n16' }, { from: 's1n15', to: 's1n17' }, { from: 's1n15', to: 's1n18' },
    ],
    groups: [
      { id: 'gs1a', label: 'Trigger',                 x: 15,           y: 18 + 2 * 160 - 10, width: 280,            height: 148, color: 'blue' },
      { id: 'gs1b', label: 'Paralleles Setup',        x: 15 + 340,     y: 8,                  width: 280,            height: 4 * 160 + 148, color: 'blue' },
      { id: 'gs1c', label: 'Onboarding & KI-Analyse', x: 15 + 2 * 340, y: 8,                  width: 3 * 340 + 280,  height: 4 * 160 + 148, color: 'purple' },
      { id: 'gs1d', label: 'Branding & Freigabe',     x: 15 + 6 * 340, y: 18 + 2 * 160 - 10,  width: 340 + 280,      height: 148, color: 'orange' },
      { id: 'gs1e', label: 'Webhook-Ausgänge',        x: 15 + 8 * 340, y: 18 + 160 - 10,       width: 280,            height: 2 * 160 + 148, color: 'green' },
    ],
    outputs: [],
    lastExecuted: '2025-02-14T14:00:00Z',
    executionCount: 23,
  },

  // ─── Sub-System 2: Content & Material-Erstellung ──────────────────────────
  {
    id: 'demo-recruiting-sub2',
    name: 'Content & Material-Erstellung',
    description: 'Landing-Page-Texte, Stellenanzeigen, Ad Copy, Creative-Prompts — alles KI-generiert mit Qualitäts-Review und Revision-Loop.',
    category: 'Recruiting',
    icon: 'file-text',
    status: 'active',
    webhookUrl: 'https://hooks.flowstack.app/recruiting/content',
    parentId: 'demo-recruiting-master',
    subSystemOrder: 1,
    nodes: [
      // ─── Trigger & Daten ───
      { id: 's2n1',  label: 'Webhook: Onboarding fertig',  description: 'Empfängt Daten nach abgeschlossenem Onboarding', icon: 'webhook', type: 'trigger', x: 40, y: 18 + 2 * 160 },
      { id: 's2n2',  label: 'Kundendaten laden',           description: 'Employer Profile, Personas & Briefing aus Drive', icon: 'logo-google-drive', type: 'process', x: 40 + 340, y: 18 + 2 * 160 },
      { id: 's2n3',  label: 'KI: Briefing-Analyse',        description: 'Agent analysiert Briefing und erstellt Content-Plan', icon: 'logo-claude', type: 'ai', x: 40 + 2 * 340, y: 18 + 2 * 160 },
      // ─── 4 parallele KI-Content-Lanes ───
      { id: 's2n4',  label: 'KI: Landing Page Texte',      description: 'Headline, Hero, Benefits, CTA generieren', icon: 'logo-claude', type: 'ai', x: 40 + 3 * 340, y: 18 + 0 * 160 },
      { id: 's2n5',  label: 'Landing Page Draft',          description: 'Texte als Google Doc speichern', icon: 'logo-google-docs', type: 'output', x: 40 + 4 * 340, y: 18 + 0 * 160 },
      { id: 's2n6',  label: 'KI: Stellenanzeigen',         description: 'Pro Rolle: Titel, Aufgaben, Profil, Benefits', icon: 'logo-claude', type: 'ai', x: 40 + 3 * 340, y: 18 + 1 * 160 },
      { id: 's2n7',  label: 'Stellenanzeigen Pack',        description: 'Alle Anzeigen als formatiertes Dokument', icon: 'logo-google-docs', type: 'output', x: 40 + 4 * 340, y: 18 + 1 * 160 },
      { id: 's2n8',  label: 'KI: Ad Copy Varianten',       description: 'Je 5 Varianten pro Persona × 3 Plattformen', icon: 'logo-claude', type: 'ai', x: 40 + 3 * 340, y: 18 + 3 * 160 },
      { id: 's2n9',  label: 'Ad Copy Pack',                description: 'Copy-Matrix nach Persona/Plattform sortiert', icon: 'logo-google-docs', type: 'output', x: 40 + 4 * 340, y: 18 + 3 * 160 },
      { id: 's2n10', label: 'KI: Creative Prompts',        description: 'Bild-/Video-Prompts für Midjourney & Canva', icon: 'logo-claude', type: 'ai', x: 40 + 3 * 340, y: 18 + 4 * 160 },
      { id: 's2n11', label: 'Creative Prompt Pack',        description: 'Prompt-Sammlung als Google Doc', icon: 'logo-google-docs', type: 'output', x: 40 + 4 * 340, y: 18 + 4 * 160 },
      // ─── Merge, Review & Revision ───
      { id: 's2n12', label: 'Zusammenführen',              description: 'Alle 4 Content-Pakete kombinieren', icon: 'git-merge', type: 'process', x: 40 + 5 * 340, y: 18 + 2 * 160 },
      { id: 's2n13', label: 'KI: Qualitäts-Score',        description: 'Agent bewertet Konsistenz, Ton & Vollständigkeit', icon: 'logo-openai', type: 'ai', x: 40 + 6 * 340, y: 18 + 2 * 160 },
      { id: 's2n14', label: 'Freigabe: Copy Review',      description: 'Manuelle Qualitätsprüfung aller Texte', icon: 'shield-check', type: 'process', x: 40 + 7 * 340, y: 18 + 2 * 160 },
      // ─── Ausgabe ───
      { id: 's2n15', label: 'PDF Summary Pack',           description: 'Gesamtes Content-Paket als PDF zusammenfassen', icon: 'file-type-2', type: 'output', x: 40 + 8 * 340, y: 18 + 1 * 160 },
      { id: 's2n16', label: 'Drive: Kundenordner',        description: 'Alle Materialien im Kundenordner ablegen', icon: 'logo-google-drive', type: 'output', x: 40 + 8 * 340, y: 18 + 2 * 160 },
      { id: 's2n17', label: 'Slack: Content fertig',      description: 'Team über fertige Materialien informieren', icon: 'logo-slack', type: 'output', x: 40 + 8 * 340, y: 18 + 3 * 160 },
      { id: 's2n18', label: 'Webhook: → Kampagnen',       description: 'Triggert Sub-System 3 (Kampagnen-Start)', icon: 'webhook', type: 'output', x: 40 + 9 * 340, y: 18 + 2 * 160 },
    ],
    connections: [
      { from: 's2n1', to: 's2n2' },
      { from: 's2n2', to: 's2n3' },
      { from: 's2n3', to: 's2n4' }, { from: 's2n3', to: 's2n6' }, { from: 's2n3', to: 's2n8' }, { from: 's2n3', to: 's2n10' },
      { from: 's2n4', to: 's2n5' }, { from: 's2n6', to: 's2n7' }, { from: 's2n8', to: 's2n9' }, { from: 's2n10', to: 's2n11' },
      { from: 's2n5', to: 's2n12' }, { from: 's2n7', to: 's2n12' }, { from: 's2n9', to: 's2n12' }, { from: 's2n11', to: 's2n12' },
      { from: 's2n12', to: 's2n13' },
      { from: 's2n13', to: 's2n14' },
      { from: 's2n14', to: 's2n15' }, { from: 's2n14', to: 's2n16' }, { from: 's2n14', to: 's2n17' },
      { from: 's2n16', to: 's2n18' },
    ],
    groups: [
      { id: 'gs2a', label: 'Trigger & Briefing-Analyse',       x: 15,             y: 18 + 2 * 160 - 10, width: 2 * 340 + 280,  height: 148, color: 'blue' },
      { id: 'gs2b', label: 'KI-Produktion · 4 parallele Lanes', x: 15 + 3 * 340,  y: 8,                  width: 340 + 280,      height: 4 * 160 + 148, color: 'purple' },
      { id: 'gs2c', label: 'Review & Qualitätssicherung',      x: 15 + 5 * 340,   y: 18 + 2 * 160 - 10, width: 2 * 340 + 280,  height: 148, color: 'orange' },
      { id: 'gs2d', label: 'Ausgabe & Webhook',                x: 15 + 8 * 340,   y: 18 + 160 - 10,      width: 340 + 280,      height: 2 * 160 + 148, color: 'green' },
    ],
    outputs: [],
    lastExecuted: '2025-02-14T15:00:00Z',
    executionCount: 23,
  },

  // ─── Sub-System 3: Kampagnen-Überwachung & Reporting ──────────────────────
  {
    id: 'demo-recruiting-sub3',
    name: 'Kampagnen & Reporting',
    description: 'Kampagnen auf 3 Plattformen starten, Performance automatisch tracken, KI-Reports generieren und Budget-Optimierungen vorschlagen.',
    category: 'Recruiting',
    icon: 'bar-chart-3',
    status: 'active',
    webhookUrl: 'https://hooks.flowstack.app/recruiting/campaigns',
    parentId: 'demo-recruiting-master',
    subSystemOrder: 2,
    nodes: [
      // ─── Trigger ───
      { id: 's3n1',  label: 'Webhook: Content fertig',    description: 'Materialien freigegeben, Kampagnen starten', icon: 'webhook', type: 'trigger', x: 40, y: 18 + 2 * 160 },
      // ─── Kampagnen-Setup (3 Plattformen) ───
      { id: 's3n2',  label: 'Meta Ads erstellen',         description: 'Kampagnen im Meta Business Manager aufsetzen', icon: 'logo-meta', type: 'output', x: 40 + 340, y: 18 + 1 * 160 },
      { id: 's3n3',  label: 'Google Ads erstellen',       description: 'Search & Display Kampagnen konfigurieren', icon: 'logo-google-ads', type: 'output', x: 40 + 340, y: 18 + 2 * 160 },
      { id: 's3n4',  label: 'LinkedIn Ads erstellen',     description: 'Sponsored Content Kampagnen aufsetzen', icon: 'logo-linkedin', type: 'output', x: 40 + 340, y: 18 + 3 * 160 },
      { id: 's3n5',  label: 'Tracking-Pixel setzen',      description: 'UTM-Parameter, Pixel & Conversion-Events', icon: 'code', type: 'process', x: 40 + 2 * 340, y: 18 + 2 * 160 },
      { id: 's3n6',  label: 'Slack: Kampagnen live',      description: 'Team über gestartete Kampagnen informieren', icon: 'logo-slack', type: 'output', x: 40 + 2 * 340, y: 18 + 0 * 160 },
      // ─── Monitoring-Loop ───
      { id: 's3n7',  label: 'Zeitplan (wöchentl.)',       description: 'Jeden Montag: automatischer KPI-Check', icon: 'calendar', type: 'trigger', x: 40 + 3 * 340, y: 18 + 0 * 160 },
      { id: 's3n8',  label: 'KPIs abrufen',               description: 'Daten aus Meta, Google & LinkedIn APIs', icon: 'logo-google-sheets', type: 'process', x: 40 + 4 * 340, y: 18 + 0 * 160 },
      { id: 's3n9',  label: 'KI: Performance-Analyse',    description: 'Trends erkennen, Anomalien melden, Benchmark vergleichen', icon: 'logo-openai', type: 'ai', x: 40 + 5 * 340, y: 18 + 0 * 160 },
      { id: 's3n10', label: 'KI: Anomalie erkannt?',      description: 'Agent prüft: CPA zu hoch? CTR zu niedrig?', icon: 'logo-claude', type: 'ai', x: 40 + 6 * 340, y: 18 + 0 * 160 },
      { id: 's3n11', label: 'Alert: Sofort-Benachrichtigung', description: 'Slack-Alert bei kritischen Anomalien', icon: 'logo-slack', type: 'output', x: 40 + 7 * 340, y: 18 + 0 * 160 },
      // ─── Reporting ───
      { id: 's3n12', label: 'KI: Weekly Report',          description: 'Automatischer Wochenreport mit Insights', icon: 'logo-claude', type: 'ai', x: 40 + 4 * 340, y: 18 + 2 * 160 },
      { id: 's3n13', label: 'Dashboard aktualisieren',    description: 'Live-Dashboard in Google Sheets updaten', icon: 'logo-google-sheets', type: 'output', x: 40 + 5 * 340, y: 18 + 2 * 160 },
      { id: 's3n14', label: 'Slack: Report senden',       description: 'Wöchentlichen Report ans Team posten', icon: 'logo-slack', type: 'output', x: 40 + 5 * 340, y: 18 + 3 * 160 },
      { id: 's3n15', label: 'Gmail: Client-Report',       description: 'Aufbereiteten Report per Mail an Kunden', icon: 'logo-gmail', type: 'output', x: 40 + 5 * 340, y: 18 + 4 * 160 },
      // ─── Optimierung ───
      { id: 's3n16', label: 'KI: Budget-Optimierung',     description: 'Budget-Reallokation und Targeting-Empfehlungen', icon: 'logo-claude', type: 'ai', x: 40 + 6 * 340, y: 18 + 2 * 160 },
      { id: 's3n17', label: 'Optimierungen speichern',    description: 'Empfehlungs-Log im Kundenordner', icon: 'logo-google-drive', type: 'output', x: 40 + 7 * 340, y: 18 + 2 * 160 },
      { id: 's3n18', label: 'HubSpot: KPIs updaten',      description: 'Deal-Properties mit aktuellen KPIs befüllen', icon: 'logo-hubspot', type: 'output', x: 40 + 7 * 340, y: 18 + 3 * 160 },
    ],
    connections: [
      { from: 's3n1', to: 's3n2' }, { from: 's3n1', to: 's3n3' }, { from: 's3n1', to: 's3n4' },
      { from: 's3n2', to: 's3n5' }, { from: 's3n3', to: 's3n5' }, { from: 's3n4', to: 's3n5' },
      { from: 's3n5', to: 's3n6' },
      { from: 's3n7', to: 's3n8' },
      { from: 's3n8', to: 's3n9' }, { from: 's3n8', to: 's3n12' },
      { from: 's3n9', to: 's3n10' },
      { from: 's3n10', to: 's3n11' },
      { from: 's3n12', to: 's3n13' }, { from: 's3n12', to: 's3n14' }, { from: 's3n12', to: 's3n15' },
      { from: 's3n13', to: 's3n16' },
      { from: 's3n16', to: 's3n17' }, { from: 's3n16', to: 's3n18' },
    ],
    groups: [
      { id: 'gs3a', label: 'Kampagnen-Launch · 3 Plattformen', x: 15,             y: 18 + 160 - 10,     width: 2 * 340 + 280, height: 2 * 160 + 148, color: 'blue' },
      { id: 'gs3b', label: 'Monitoring · KI-Agent Loop',       x: 15 + 3 * 340,   y: 8,                  width: 4 * 340 + 280, height: 148, color: 'purple' },
      { id: 'gs3c', label: 'Reporting · Client & Team',        x: 15 + 4 * 340,   y: 18 + 2 * 160 - 10, width: 340 + 280,     height: 2 * 160 + 148, color: 'orange' },
      { id: 'gs3d', label: 'KI-Optimierung',                   x: 15 + 6 * 340,   y: 18 + 2 * 160 - 10, width: 340 + 280,     height: 160 + 148, color: 'green' },
    ],
    outputs: [],
    lastExecuted: '2025-02-14T15:30:00Z',
    executionCount: 18,
  },

  // ─── Sub-System 4: Qualitätsprüfung & Checks ─────────────────────────────
  {
    id: 'demo-recruiting-sub4',
    name: 'Qualitätsprüfung & Checks',
    description: 'Automatische Prüfungen mit täglichem Retry-Loop: Dateien, Briefing, Zugänge, Verträge — mit KI-Bewertung und Eskalationslogik.',
    category: 'Recruiting',
    icon: 'shield-check',
    status: 'active',
    webhookUrl: 'https://hooks.flowstack.app/recruiting/checks',
    parentId: 'demo-recruiting-master',
    subSystemOrder: 3,
    nodes: [
      // ─── Trigger ───
      { id: 's4n1',  label: 'Webhook: Onboarding gestartet', description: 'Check-Prozess parallel zum Onboarding starten', icon: 'webhook', type: 'trigger', x: 40, y: 18 + 2 * 160 },
      // ─── 4 parallele Checks ───
      { id: 's4n2',  label: 'Check: Dateien vorhanden?',  description: 'Logo, Bilder, Videos im Drive prüfen', icon: 'logo-google-drive', type: 'process', x: 40 + 340, y: 18 + 0 * 160 },
      { id: 's4n3',  label: 'Reminder: Dateien fehlen',   description: 'Automatische Erinnerungsmail an Kunden', icon: 'logo-gmail', type: 'output', x: 40 + 2 * 340, y: 18 + 0 * 160 },
      { id: 's4n4',  label: 'Check: Briefing komplett?',  description: 'Typeform-Antworten auf Vollständigkeit prüfen', icon: 'logo-typeform', type: 'process', x: 40 + 340, y: 18 + 1 * 160 },
      { id: 's4n5',  label: 'Reminder: Briefing offen',   description: 'Erinnerung für fehlende Angaben', icon: 'logo-gmail', type: 'output', x: 40 + 2 * 340, y: 18 + 1 * 160 },
      { id: 's4n6',  label: 'Check: Zugänge erteilt?',    description: 'Ad-Accounts, Analytics, Search Console prüfen', icon: 'shield-check', type: 'process', x: 40 + 340, y: 18 + 3 * 160 },
      { id: 's4n7',  label: 'Reminder: Zugänge fehlen',   description: 'Erinnerung mit Schritt-für-Schritt-Anleitung', icon: 'logo-gmail', type: 'output', x: 40 + 2 * 340, y: 18 + 3 * 160 },
      { id: 's4n8',  label: 'Check: Vertrag unterschrieben?', description: 'DocuSign/PandaDoc Status prüfen', icon: 'shield-check', type: 'process', x: 40 + 340, y: 18 + 4 * 160 },
      { id: 's4n9',  label: 'Reminder: Vertrag offen',    description: 'Vertragserinnerung senden', icon: 'logo-gmail', type: 'output', x: 40 + 2 * 340, y: 18 + 4 * 160 },
      // ─── Retry-Loop ───
      { id: 's4n10', label: 'Zeitplan (täglich)',          description: 'Alle 24h: Checks wiederholen bis alles OK', icon: 'calendar', type: 'trigger', x: 40, y: 18 + 4 * 160 },
      // ─── Aggregation ───
      { id: 's4n11', label: 'Status-Aggregation',         description: 'Alle 4 Check-Ergebnisse zusammenführen', icon: 'git-merge', type: 'process', x: 40 + 3 * 340, y: 18 + 2 * 160 },
      { id: 's4n12', label: 'KI: Vollständigkeits-Score', description: 'Agent bewertet Gesamtstatus: 0–100%', icon: 'logo-openai', type: 'ai', x: 40 + 4 * 340, y: 18 + 2 * 160 },
      { id: 's4n13', label: 'KI: Eskalation nötig?',     description: 'Bei >3 Tagen offen: Eskalation empfehlen', icon: 'logo-claude', type: 'ai', x: 40 + 5 * 340, y: 18 + 1 * 160 },
      { id: 's4n14', label: 'Slack: Eskalation',          description: 'Account Manager direkt benachrichtigen', icon: 'logo-slack', type: 'output', x: 40 + 6 * 340, y: 18 + 0 * 160 },
      // ─── Ergebnis ───
      { id: 's4n15', label: 'Checkliste aktualisieren',   description: 'Google Sheet mit detailliertem Check-Status', icon: 'logo-google-sheets', type: 'output', x: 40 + 5 * 340, y: 18 + 3 * 160 },
      { id: 's4n16', label: 'Slack: Status-Update',       description: 'Team über aktuellen Check-Fortschritt informieren', icon: 'logo-slack', type: 'output', x: 40 + 6 * 340, y: 18 + 2 * 160 },
      { id: 's4n17', label: 'HubSpot: Check-Status',      description: 'Deal-Properties mit Check-Ergebnissen updaten', icon: 'logo-hubspot', type: 'output', x: 40 + 6 * 340, y: 18 + 4 * 160 },
      { id: 's4n18', label: 'Webhook: → Kampagnen',       description: 'Alle Checks bestanden → Kampagnen freigeben', icon: 'webhook', type: 'output', x: 40 + 7 * 340, y: 18 + 2 * 160 },
    ],
    connections: [
      { from: 's4n1', to: 's4n2' }, { from: 's4n1', to: 's4n4' }, { from: 's4n1', to: 's4n6' }, { from: 's4n1', to: 's4n8' },
      { from: 's4n2', to: 's4n3' }, { from: 's4n4', to: 's4n5' }, { from: 's4n6', to: 's4n7' }, { from: 's4n8', to: 's4n9' },
      { from: 's4n10', to: 's4n2' }, { from: 's4n10', to: 's4n4' }, { from: 's4n10', to: 's4n6' }, { from: 's4n10', to: 's4n8' },
      { from: 's4n2', to: 's4n11' }, { from: 's4n4', to: 's4n11' }, { from: 's4n6', to: 's4n11' }, { from: 's4n8', to: 's4n11' },
      { from: 's4n11', to: 's4n12' },
      { from: 's4n12', to: 's4n13' }, { from: 's4n12', to: 's4n15' },
      { from: 's4n13', to: 's4n14' }, { from: 's4n13', to: 's4n16' },
      { from: 's4n12', to: 's4n17' },
      { from: 's4n16', to: 's4n18' },
    ],
    groups: [
      { id: 'gs4a', label: 'Trigger & Retry-Loop',                x: 15,            y: 18 + 2 * 160 - 10, width: 280,            height: 2 * 160 + 148, color: 'blue' },
      { id: 'gs4b', label: 'Automatische Checks · 4 Prüfungen',  x: 15 + 340,      y: 8,                  width: 340 + 280,      height: 4 * 160 + 148, color: 'orange' },
      { id: 'gs4c', label: 'KI-Bewertung & Eskalation',          x: 15 + 3 * 340,  y: 18 + 160 - 10,      width: 3 * 340 + 280,  height: 160 + 148, color: 'purple' },
      { id: 'gs4d', label: 'Ergebnis & Freigabe',                x: 15 + 5 * 340,  y: 18 + 3 * 160 - 10,  width: 2 * 340 + 280,  height: 160 + 148, color: 'green' },
    ],
    outputs: [],
    lastExecuted: '2025-02-14T15:00:00Z',
    executionCount: 45,
  },
];

// ─── English Translations for Demo Systems ──────────────────────────────────

const DEMO_META_EN: Record<string, { name: string; description: string }> = {
  'demo-1': { name: 'Client Onboarding',   description: 'From the initial meeting to the finished website, ad copy and Google Ads — fully automated.' },
  'demo-2': { name: 'Content Pipeline',     description: 'From the content idea to the finished blog post, social media post and LinkedIn carousel.' },
  'demo-3': { name: 'Lead Qualification',   description: 'Automatically enrich, score and transfer incoming leads to CRM.' },
  'demo-4': { name: 'Report Generator',     description: 'Collect data from various sources, analyze and send as a finished report.' },
  'demo-showcase': { name: 'AI Agency · Complete Workflow', description: 'Shows all node types: Trigger (narrow), Process (standard), AI (large & prominent), Output (compact) and Sub-System (container).' },
  'demo-recruiting-master': { name: 'Recruiting Agency Automation', description: 'Full overview of the recruiting agency: Onboarding, content creation, campaign monitoring and quality checks — organized in sub-systems.' },
  'demo-recruiting-sub1': { name: 'Onboarding & Infrastructure', description: 'Initial meeting, set up access, create folder structure, collect branding kit.' },
  'demo-recruiting-sub2': { name: 'Content & Material Creation', description: 'Landing page copy, job ads, ad copy, creative prompts — all AI-generated and reviewed.' },
  'demo-recruiting-sub3': { name: 'Campaigns & Reporting', description: 'Launch campaigns, track performance, generate weekly reports and suggest optimizations.' },
  'demo-recruiting-sub4': { name: 'Quality Checks', description: 'Automated checks: Did the client upload files? Branding kit complete? Forms filled? Access granted?' },
};

/** Composite key: "systemId:nodeId" → { label, description } */
const DEMO_NODE_EN: Record<string, { label: string; description: string }> = {
  // ─── demo-1: Client Onboarding ───
  'demo-1:n1': { label: 'Onboarding Meeting',      description: 'Initial meeting with the client' },
  'demo-1:n2': { label: 'AI Transcription',         description: 'Conversation is transcribed' },
  'demo-1:n3': { label: 'Ad Copy',                  description: 'Copy & headlines generated' },
  'demo-1:n4': { label: 'Website',                  description: 'Landing page created' },
  'demo-1:n5': { label: 'Google Ads',               description: 'Campaign set up' },
  // ─── demo-2: Content Pipeline ───
  'demo-2:n1': { label: 'Content Briefing',          description: 'Topic & audience defined' },
  'demo-2:n2': { label: 'AI Research',               description: 'Sources & data collected' },
  'demo-2:n3': { label: 'Content Creation',          description: 'Texts AI-generated' },
  'demo-2:n4': { label: 'Blog Post',                 description: 'Article formatted & ready' },
  'demo-2:n5': { label: 'Social Media',              description: 'Posts for all channels' },
  'demo-2:n6': { label: 'LinkedIn Carousel',         description: 'Slides generated' },
  // ─── demo-3: Lead Qualification ───
  'demo-3:n1': { label: 'Lead Intake',               description: 'New contact received' },
  'demo-3:n2': { label: 'Data Enrichment',           description: 'Company data supplemented' },
  'demo-3:n3': { label: 'AI Scoring',                description: 'Lead quality evaluated' },
  'demo-3:n4': { label: 'CRM Entry',                 description: 'Created in HubSpot' },
  'demo-3:n5': { label: 'Follow-up Email',           description: 'Personalized email' },
  'demo-3:n6': { label: 'Team Notification',         description: 'Sales team informed' },
  // ─── demo-4: Report Generator ───
  'demo-4:n1a': { label: 'Google Sheets Import',     description: 'Data from Sheets' },
  'demo-4:n1b': { label: 'HubSpot Export',           description: 'CRM data exported' },
  'demo-4:n2':  { label: 'Merge Data',               description: 'Sources combined' },
  'demo-4:n3':  { label: 'AI Analysis',              description: 'Patterns & trends detected' },
  'demo-4:n4':  { label: 'Create Report',            description: 'Report formatted' },
  'demo-4:n5':  { label: 'PDF to Drive',             description: 'Saved as PDF' },
  'demo-4:n6':  { label: 'Dashboard',                description: 'Live view updated' },
  'demo-4:n7':  { label: 'Email Delivery',           description: 'Sent to team' },
  // ─── demo-showcase ───
  'demo-showcase:sc1':  { label: 'New Lead',                 description: 'Form submitted' },
  'demo-showcase:sc2':  { label: 'Incoming Email',           description: 'New inquiry via email' },
  'demo-showcase:sc3':  { label: 'Merge Data',               description: 'Combine lead data & email content' },
  'demo-showcase:sc4':  { label: 'Create CRM Entry',         description: 'Create contact in HubSpot' },
  'demo-showcase:sc5':  { label: 'AI: Lead Scoring',         description: 'Agent evaluates industry, size & potential — Score 0-100' },
  'demo-showcase:sc6':  { label: 'AI: Proposal Generator',   description: 'Create personalized proposal based on lead profile' },
  'demo-showcase:sc7':  { label: 'Slack: Notification',      description: 'Inform team' },
  'demo-showcase:sc8':  { label: 'Google Doc: Proposal',     description: 'PDF proposal generated' },
  'demo-showcase:sc9':  { label: 'Email: Send Proposal',     description: 'Automatic proposal email' },
  'demo-showcase:sc10': { label: 'Update Dashboard',         description: 'Update live tracking' },
  'demo-showcase:sc11': { label: 'Follow-Up Automation',     description: 'Sub-Workflow · 8 Nodes · Email sequence, reminders, escalation' },
  'demo-showcase:sc12': { label: 'Save Lead Score',          description: 'Store score in CRM deal' },
  // ─── demo-recruiting-master ───
  'demo-recruiting-master:rm1': { label: 'New Recruiting Client', description: 'Form submitted or deal won in HubSpot' },
  'demo-recruiting-master:rm2': { label: 'AI: Create Client Profile', description: 'Agent analyzes industry, size & prioritizes' },
  'demo-recruiting-master:rm3': { label: 'Slack: Team Assignment', description: 'Notify assigned account manager' },
  'demo-recruiting-master:rm4': { label: 'CRM: Create Deal', description: 'Pipeline entry with all client data' },
  'demo-recruiting-master:sub-demo-recruiting-sub1': { label: 'Onboarding & Infrastructure', description: '12 Nodes · Webhook Trigger · Access, folders, branding, AI transcription' },
  'demo-recruiting-master:sub-demo-recruiting-sub4': { label: 'Quality Checks', description: '15 Nodes · Webhook Trigger · Files, briefing, access, compliance' },
  'demo-recruiting-master:sub-demo-recruiting-sub2': { label: 'Content & Material Creation', description: '16 Nodes · Webhook Trigger · Landing page, job ads, ad copy, creative prompts' },
  'demo-recruiting-master:sub-demo-recruiting-sub3': { label: 'Campaigns & Reporting', description: '16 Nodes · Webhook Trigger · Meta, Google, LinkedIn Ads, KPI tracking' },
  'demo-recruiting-master:rm5': { label: 'AI: Status Aggregation', description: 'Agent checks all sub-systems for completeness' },
  'demo-recruiting-master:rm6': { label: 'Master Dashboard Update', description: 'Update Google Sheet with overall status' },
  'demo-recruiting-master:rm7': { label: 'Slack: Client Live', description: 'Notify team — client fully set up' },
  'demo-recruiting-master:rm8': { label: 'Client Active & Live', description: 'All systems running, campaigns started' },
  // ─── demo-recruiting-sub1: Onboarding & Infrastructure ───
  'demo-recruiting-sub1:s1n1':  { label: 'Webhook: New Client', description: 'Receives client data from master system' },
  'demo-recruiting-sub1:s1n2':  { label: 'Slack: New Client', description: 'Notify team about new client' },
  'demo-recruiting-sub1:s1n3':  { label: 'Calendly: Book Meeting', description: 'Schedule onboarding call with client' },
  'demo-recruiting-sub1:s1n4':  { label: 'Drive: Create Folders', description: 'Complete folder structure in client folder' },
  'demo-recruiting-sub1:s1n5':  { label: 'Copy Templates', description: 'Briefing, feedback & reporting templates' },
  'demo-recruiting-sub1:s1n6':  { label: 'HubSpot: Update Deal', description: 'Set status to "Onboarding"' },
  'demo-recruiting-sub1:s1n7':  { label: 'Onboarding Call', description: 'Conduct initial meeting (Zoom/Meet)' },
  'demo-recruiting-sub1:s1n8':  { label: 'AI Transcription', description: 'Auto-transcribe conversation' },
  'demo-recruiting-sub1:s1n9':  { label: 'AI: Extract Data', description: 'Extract industry, target group, USPs, requirements' },
  'demo-recruiting-sub1:s1n10': { label: 'Employer Profile', description: 'Create employer fact sheet as Google Doc' },
  'demo-recruiting-sub1:s1n11': { label: 'AI: Job Profiles & Personas', description: 'Generate role & target group profiles' },
  'demo-recruiting-sub1:s1n12': { label: 'Persona Document', description: 'Target group personas as Google Doc' },
  'demo-recruiting-sub1:s1n13': { label: 'Merge', description: 'Combine employer profile + personas' },
  'demo-recruiting-sub1:s1n14': { label: 'Collect Branding Kit', description: 'Logo, colors, fonts from client' },
  'demo-recruiting-sub1:s1n15': { label: 'Approval: Fact Check', description: 'Manual review — is all data correct?' },
  'demo-recruiting-sub1:s1n16': { label: 'Webhook: → Content', description: 'Triggers Sub-System 2 (Content Creation)' },
  'demo-recruiting-sub1:s1n17': { label: 'Webhook: → Checks', description: 'Triggers Sub-System 4 (Quality Checks)' },
  'demo-recruiting-sub1:s1n18': { label: 'Slack: Setup Complete', description: 'Notify team about completed setup' },
  // ─── demo-recruiting-sub2: Content & Material Creation ───
  'demo-recruiting-sub2:s2n1':  { label: 'Webhook: Onboarding Done', description: 'Receives data after completed onboarding' },
  'demo-recruiting-sub2:s2n2':  { label: 'Load Client Data', description: 'Employer profile, personas & briefing from Drive' },
  'demo-recruiting-sub2:s2n3':  { label: 'AI: Briefing Analysis', description: 'Agent analyzes briefing & creates content plan' },
  'demo-recruiting-sub2:s2n4':  { label: 'AI: Landing Page Copy', description: 'Generate headline, hero, benefits, CTA' },
  'demo-recruiting-sub2:s2n5':  { label: 'Landing Page Draft', description: 'Save texts as Google Doc' },
  'demo-recruiting-sub2:s2n6':  { label: 'AI: Job Postings', description: 'Per role: title, tasks, profile, benefits' },
  'demo-recruiting-sub2:s2n7':  { label: 'Job Postings Pack', description: 'All postings as formatted document' },
  'demo-recruiting-sub2:s2n8':  { label: 'AI: Ad Copy Variants', description: '5 variants per persona × 3 platforms' },
  'demo-recruiting-sub2:s2n9':  { label: 'Ad Copy Pack', description: 'Copy matrix sorted by persona/platform' },
  'demo-recruiting-sub2:s2n10': { label: 'AI: Creative Prompts', description: 'Image/video prompts for Midjourney & Canva' },
  'demo-recruiting-sub2:s2n11': { label: 'Creative Prompt Pack', description: 'Prompt collection as Google Doc' },
  'demo-recruiting-sub2:s2n12': { label: 'Merge', description: 'Combine all 4 content packages' },
  'demo-recruiting-sub2:s2n13': { label: 'AI: Quality Score', description: 'Agent evaluates consistency, tone & completeness' },
  'demo-recruiting-sub2:s2n14': { label: 'Approval: Copy Review', description: 'Manual quality review of all texts' },
  'demo-recruiting-sub2:s2n15': { label: 'PDF Summary Pack', description: 'Complete content package as PDF summary' },
  'demo-recruiting-sub2:s2n16': { label: 'Drive: Client Folder', description: 'Store all materials in client folder' },
  'demo-recruiting-sub2:s2n17': { label: 'Slack: Content Ready', description: 'Notify team about finished materials' },
  'demo-recruiting-sub2:s2n18': { label: 'Webhook: → Campaigns', description: 'Triggers Sub-System 3 (Campaign Start)' },
  // ─── demo-recruiting-sub3: Campaigns & Reporting ───
  'demo-recruiting-sub3:s3n1':  { label: 'Webhook: Content Ready', description: 'Materials approved, start campaigns' },
  'demo-recruiting-sub3:s3n2':  { label: 'Create Meta Ads', description: 'Campaigns in Meta Business Manager' },
  'demo-recruiting-sub3:s3n3':  { label: 'Create Google Ads', description: 'Search & Display campaigns configured' },
  'demo-recruiting-sub3:s3n4':  { label: 'Create LinkedIn Ads', description: 'Sponsored Content campaigns set up' },
  'demo-recruiting-sub3:s3n5':  { label: 'Set Tracking Pixels', description: 'UTM parameters, pixels & conversion events' },
  'demo-recruiting-sub3:s3n6':  { label: 'Slack: Campaigns Live', description: 'Notify team about launched campaigns' },
  'demo-recruiting-sub3:s3n7':  { label: 'Schedule (Weekly)', description: 'Every Monday: automatic KPI check' },
  'demo-recruiting-sub3:s3n8':  { label: 'Fetch KPIs', description: 'Data from Meta, Google & LinkedIn APIs' },
  'demo-recruiting-sub3:s3n9':  { label: 'AI: Performance Analysis', description: 'Detect trends, flag anomalies, benchmark comparison' },
  'demo-recruiting-sub3:s3n10': { label: 'AI: Anomaly Detected?', description: 'Agent checks: CPA too high? CTR too low?' },
  'demo-recruiting-sub3:s3n11': { label: 'Alert: Immediate Notification', description: 'Slack alert for critical anomalies' },
  'demo-recruiting-sub3:s3n12': { label: 'AI: Weekly Report', description: 'Automatic weekly report with insights' },
  'demo-recruiting-sub3:s3n13': { label: 'Update Dashboard', description: 'Update live dashboard in Google Sheets' },
  'demo-recruiting-sub3:s3n14': { label: 'Slack: Send Report', description: 'Post weekly report to team' },
  'demo-recruiting-sub3:s3n15': { label: 'Gmail: Client Report', description: 'Send polished report via email to client' },
  'demo-recruiting-sub3:s3n16': { label: 'AI: Budget Optimization', description: 'Budget reallocation & targeting recommendations' },
  'demo-recruiting-sub3:s3n17': { label: 'Save Optimizations', description: 'Recommendation log in client folder' },
  'demo-recruiting-sub3:s3n18': { label: 'HubSpot: Update KPIs', description: 'Fill deal properties with current KPIs' },
  // ─── demo-recruiting-sub4: Quality Checks ───
  'demo-recruiting-sub4:s4n1':  { label: 'Webhook: Onboarding Started', description: 'Check process starts parallel to onboarding' },
  'demo-recruiting-sub4:s4n2':  { label: 'Check: Files Present?', description: 'Check logo, images, videos in Drive' },
  'demo-recruiting-sub4:s4n3':  { label: 'Reminder: Files Missing', description: 'Auto reminder email to client' },
  'demo-recruiting-sub4:s4n4':  { label: 'Check: Briefing Complete?', description: 'Verify Typeform responses for completeness' },
  'demo-recruiting-sub4:s4n5':  { label: 'Reminder: Briefing Open', description: 'Reminder for missing entries' },
  'demo-recruiting-sub4:s4n6':  { label: 'Check: Access Granted?', description: 'Check ad accounts, analytics, Search Console' },
  'demo-recruiting-sub4:s4n7':  { label: 'Reminder: Access Missing', description: 'Reminder with step-by-step instructions' },
  'demo-recruiting-sub4:s4n8':  { label: 'Check: Contract Signed?', description: 'Check DocuSign/PandaDoc status' },
  'demo-recruiting-sub4:s4n9':  { label: 'Reminder: Contract Open', description: 'Send contract reminder' },
  'demo-recruiting-sub4:s4n10': { label: 'Schedule (Daily)', description: 'Every 24h: repeat checks until all OK' },
  'demo-recruiting-sub4:s4n11': { label: 'Status Aggregation', description: 'Combine all 4 check results' },
  'demo-recruiting-sub4:s4n12': { label: 'AI: Completeness Score', description: 'Agent evaluates overall status: 0–100%' },
  'demo-recruiting-sub4:s4n13': { label: 'AI: Escalation Needed?', description: 'If open >3 days: recommend escalation' },
  'demo-recruiting-sub4:s4n14': { label: 'Slack: Escalation', description: 'Directly notify account manager' },
  'demo-recruiting-sub4:s4n15': { label: 'Update Checklist', description: 'Google Sheet with detailed check status' },
  'demo-recruiting-sub4:s4n16': { label: 'Slack: Status Update', description: 'Inform team about check progress' },
  'demo-recruiting-sub4:s4n17': { label: 'HubSpot: Check Status', description: 'Update deal properties with check results' },
  'demo-recruiting-sub4:s4n18': { label: 'Webhook: → Campaigns', description: 'All checks passed → approve campaigns' },
};

/** Composite key: "systemId:groupId" → English label */
const DEMO_GROUP_EN: Record<string, string> = {
  // demo-1
  'demo-1:g1': 'Intake',            'demo-1:g2': 'AI Processing',      'demo-1:g3': 'Results',
  // demo-4
  'demo-4:g1': 'Data Sources',      'demo-4:g2': 'Analysis & Processing', 'demo-4:g3': 'Distribution',
  // demo-showcase
  'demo-showcase:gsc1': 'Intake',
  'demo-showcase:gsc2': 'AI Analysis & CRM',
  'demo-showcase:gsc3': 'Output & Proposal',
  // demo-recruiting-master
  'demo-recruiting-master:grm1': 'Client Intake & Analysis',
  'demo-recruiting-master:grm2': 'Sub-Workflows · Setup & Production',
  'demo-recruiting-master:grm3': 'Aggregation & Go-Live',
  // demo-recruiting-sub1
  'demo-recruiting-sub1:gs1a': 'Trigger',
  'demo-recruiting-sub1:gs1b': 'Parallel Setup',
  'demo-recruiting-sub1:gs1c': 'Onboarding & AI Analysis',
  'demo-recruiting-sub1:gs1d': 'Branding & Approval',
  'demo-recruiting-sub1:gs1e': 'Webhook Outputs',
  // demo-recruiting-sub2
  'demo-recruiting-sub2:gs2a': 'Trigger & Briefing Analysis',
  'demo-recruiting-sub2:gs2b': 'AI Production · 4 Parallel Lanes',
  'demo-recruiting-sub2:gs2c': 'Review & Quality Assurance',
  'demo-recruiting-sub2:gs2d': 'Output & Webhook',
  // demo-recruiting-sub3
  'demo-recruiting-sub3:gs3a': 'Campaign Launch · 3 Platforms',
  'demo-recruiting-sub3:gs3b': 'Monitoring · AI Agent Loop',
  'demo-recruiting-sub3:gs3c': 'Reporting · Client & Team',
  'demo-recruiting-sub3:gs3d': 'AI Optimization',
  // demo-recruiting-sub4
  'demo-recruiting-sub4:gs4a': 'Trigger & Retry Loop',
  'demo-recruiting-sub4:gs4b': 'Automated Checks · 4 Verifications',
  'demo-recruiting-sub4:gs4c': 'AI Evaluation & Escalation',
  'demo-recruiting-sub4:gs4d': 'Result & Approval',
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
    // Basic validation: filter out entries that are not valid system objects
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
  // Also hide sub-systems whose master is hidden
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

const DEMO_RESOURCES_DE: SystemResource[] = [
  // ─── Sub-System 1: Onboarding ───
  {
    id: 'dr-sub1-transcript', systemId: 'demo-recruiting-sub1', title: 'Transkript: Onboarding-Call Schmidt GmbH',
    type: 'transcript', linkedNodeId: 's1n7', source: 'automation', createdAt: '2025-02-10T14:30:00Z',
    content: `[00:00] Begrüßung und Vorstellung\n[02:15] Aktuelle Recruiting-Situation: 3 offene Stellen (Senior Developer, Product Manager, UX Designer)\n[08:30] Zielgruppe: Tech-Professionals 28-40, remote-affin, Süddeutschland\n[15:20] Employer Brand: "Innovation trifft Mittelstand", flache Hierarchien, 4-Tage-Woche\n[22:45] Budget: 8.000€/Monat für Ads, 3 Monate Laufzeit\n[30:10] Bestehende Kanäle: LinkedIn Company Page (2.400 Follower), keine aktiven Ads\n[35:00] Nächste Schritte und Zeitplan besprochen`,
  },
  {
    id: 'dr-sub1-profile', systemId: 'demo-recruiting-sub1', title: 'Employer Profile: Schmidt GmbH',
    type: 'document', linkedNodeId: 's1n9', source: 'automation', createdAt: '2025-02-10T15:00:00Z',
    content: `Unternehmen: Schmidt GmbH\nBranche: Software / SaaS\nStandort: München (Remote-First)\nMitarbeiter: 85\n\nUSPs als Arbeitgeber:\n• 4-Tage-Woche bei vollem Gehalt\n• Vollständig remote mit optionalem Office\n• Weiterbildungsbudget 3.000€/Jahr\n• Equity-Beteiligung ab Senior-Level\n\nTon & Stimme: Professionell aber nahbar, Tech-fokussiert, keine Corporate-Sprache\nFarben: #1E40AF (Primary), #F59E0B (Accent)\nKey-Message: "Wir bauen die Zukunft des Mittelstands — und suchen Leute, die mitgestalten wollen."`,
  },
  // ─── Sub-System 2: Content ───
  {
    id: 'dr-sub2-landing', systemId: 'demo-recruiting-sub2', title: 'Landing Page Draft: Senior Developer',
    type: 'page', linkedNodeId: 's2n4', source: 'automation', createdAt: '2025-02-11T09:00:00Z',
    content: `Headline: "Code, der den Mittelstand verändert."\nSubline: "Werde Senior Developer bei Schmidt GmbH — remote, 4-Tage-Woche, echtes Ownership."\n\nSection 1 — Hero:\n"Du willst nicht nur Features abarbeiten, sondern Produkte mitgestalten? Bei uns arbeitest du an SaaS-Lösungen, die 2.000+ Unternehmen täglich nutzen."\n\nSection 2 — Benefits:\n• 4-Tage-Woche bei vollem Gehalt\n• Remote-First mit München-Office\n• Tech-Stack: React, Node.js, PostgreSQL, AWS\n• Equity-Beteiligung\n\nSection 3 — Prozess:\n1. Kurzes Intro-Gespräch (30 Min)\n2. Technisches Deep-Dive (60 Min)\n3. Team-Kennenlernen\n4. Angebot innerhalb von 48h\n\nCTA: "Jetzt bewerben — kein Anschreiben nötig"`,
  },
  {
    id: 'dr-sub2-jobs', systemId: 'demo-recruiting-sub2', title: 'Stellenanzeigen-Pack: 3 Rollen',
    type: 'document', linkedNodeId: 's2n6', source: 'automation', createdAt: '2025-02-11T09:30:00Z',
    content: `═══ Senior Developer (m/w/d) ═══\nRemote | 80-95k€ | 4-Tage-Woche\nStack: React, Node.js, PostgreSQL\n"Du baust Features, die tausende Unternehmen nutzen."\n\n═══ Product Manager (m/w/d) ═══\nRemote | 75-90k€ | 4-Tage-Woche\nFokus: B2B SaaS, Data-Driven\n"Du definierst die Roadmap für ein Produkt mit 2.000+ Kunden."\n\n═══ UX Designer (m/w/d) ═══\nRemote | 65-80k€ | 4-Tage-Woche\nTools: Figma, Research, Design Systems\n"Du gestaltest Interfaces, die komplexe Prozesse einfach machen."`,
  },
  {
    id: 'dr-sub2-adcopy', systemId: 'demo-recruiting-sub2', title: 'Ad Copy Varianten: LinkedIn & Meta',
    type: 'document', linkedNodeId: 's2n8', source: 'automation', createdAt: '2025-02-11T10:00:00Z',
    content: `── LinkedIn Ad Copy ──\nVariante A (Pain-Point):\n"Noch eine Stelle, bei der du nur Tickets abarbeitest? Nicht bei uns. Senior Developer gesucht — 4-Tage-Woche, Remote, echtes Ownership. →"\n\nVariante B (Benefit-Led):\n"4-Tage-Woche. Volles Gehalt. Remote-First. Equity. Klingt zu gut? Ist unser Standard. Wir suchen Senior Developer. →"\n\n── Meta Ad Copy ──\nVariante A (kurz):\n"Code schreiben, der zählt. 4-Tage-Woche. Remote. Jetzt bewerben →"\n\nVariante B (Story):\n"85 Leute. 2.000 Kunden. 0 Bullshit. Schmidt GmbH sucht Developer, die mitgestalten wollen."`,
  },
  // ─── Sub-System 3: Campaigns ───
  {
    id: 'dr-sub3-report', systemId: 'demo-recruiting-sub3', title: 'Weekly Report KW 07/2025',
    type: 'dataset', linkedNodeId: 's3n8', source: 'automation', createdAt: '2025-02-14T08:00:00Z',
    content: `Performance Report — Schmidt GmbH — KW 07\n\nLinkedIn Ads:\n  Impressions: 14.230 | Clicks: 412 | CTR: 2,9%\n  Bewerbungen: 8 | Cost/Application: 48€\n  Top-Performer: Variante B (Benefit-Led) — CTR 3,7%\n\nMeta Ads:\n  Impressions: 28.500 | Clicks: 680 | CTR: 2,4%\n  Bewerbungen: 5 | Cost/Application: 62€\n  Top-Performer: Variante A (kurz) — CTR 3,1%\n\nGesamt:\n  Budget verbraucht: 1.420€ / 8.000€ (17,8%)\n  Bewerbungen gesamt: 13\n  Qualifizierte Leads: 9 (69%)\n\n⚡ Empfehlung: Budget von Meta → LinkedIn shiften (bessere Cost/Application)`,
  },
  {
    id: 'dr-sub3-optimization', systemId: 'demo-recruiting-sub3', title: 'KI-Optimierungsvorschläge KW 07',
    type: 'note', linkedNodeId: 's3n11', source: 'automation', createdAt: '2025-02-14T08:30:00Z',
    content: `Optimierungs-Empfehlungen (KI-generiert):\n\n1. Budget-Reallokation:\n   LinkedIn: 60% → 70% (bessere Qualität)\n   Meta: 40% → 30%\n\n2. Targeting-Anpassung:\n   LinkedIn: "Years of Experience 5+" hinzufügen\n   Meta: Lookalike-Audience aus bisherigen Bewerbern erstellen\n\n3. Creative-Rotation:\n   Variante B übertrifft A um 28% — neue Variante C auf Basis von B testen\n\n4. Landing Page:\n   Bounce Rate Senior Dev: 34% — CTA above-the-fold testen`,
  },
  // ─── Sub-System 4: Quality Checks ───
  {
    id: 'dr-sub4-checklist', systemId: 'demo-recruiting-sub4', title: 'Onboarding-Checkliste: Schmidt GmbH',
    type: 'dataset', linkedNodeId: 's4n12', source: 'automation', createdAt: '2025-02-10T16:00:00Z',
    content: `Onboarding-Checkliste — Schmidt GmbH\n\n✅ Logo hochgeladen (PNG + SVG)\n✅ Unternehmensfarben definiert (#1E40AF, #F59E0B)\n✅ Briefing-Formular ausgefüllt\n✅ Meta Business Manager Zugang erteilt\n✅ Google Ads Zugang erteilt\n⬜ LinkedIn Campaign Manager Zugang — AUSSTEHEND\n✅ Bildmaterial hochgeladen (12 Fotos)\n✅ Bestehende Stellenanzeigen übermittelt\n\nStatus: 7/8 erledigt (87,5%)\nBlocker: LinkedIn-Zugang fehlt — Reminder gesendet am 10.02.`,
  },
];

const DEMO_RESOURCES_EN: Record<string, { title: string; content: string }> = {
  'dr-sub1-transcript': { title: 'Transcript: Onboarding Call Schmidt GmbH', content: `[00:00] Welcome and introductions\n[02:15] Current recruiting situation: 3 open positions (Senior Developer, Product Manager, UX Designer)\n[08:30] Target audience: Tech professionals 28-40, remote-friendly, Southern Germany\n[15:20] Employer brand: "Innovation meets Mittelstand", flat hierarchies, 4-day week\n[22:45] Budget: €8,000/month for ads, 3-month duration\n[30:10] Existing channels: LinkedIn Company Page (2,400 followers), no active ads\n[35:00] Next steps and timeline discussed` },
  'dr-sub1-profile': { title: 'Employer Profile: Schmidt GmbH', content: `Company: Schmidt GmbH\nIndustry: Software / SaaS\nLocation: Munich (Remote-First)\nEmployees: 85\n\nEmployer USPs:\n• 4-day work week at full salary\n• Fully remote with optional office\n• €3,000/year education budget\n• Equity participation from Senior level\n\nTone & Voice: Professional but approachable, tech-focused, no corporate speak\nColors: #1E40AF (Primary), #F59E0B (Accent)\nKey Message: "We're building the future of SMB — and looking for people who want to shape it."` },
  'dr-sub2-landing': { title: 'Landing Page Draft: Senior Developer', content: `Headline: "Code that transforms the Mittelstand."\nSubline: "Become a Senior Developer at Schmidt GmbH — remote, 4-day week, real ownership."\n\nSection 1 — Hero:\n"Want to do more than just work through tickets? Build SaaS products used by 2,000+ companies daily."\n\nSection 2 — Benefits:\n• 4-day week at full salary\n• Remote-first with Munich office\n• Tech stack: React, Node.js, PostgreSQL, AWS\n• Equity participation\n\nSection 3 — Process:\n1. Short intro call (30 min)\n2. Technical deep-dive (60 min)\n3. Team meet & greet\n4. Offer within 48h\n\nCTA: "Apply now — no cover letter needed"` },
  'dr-sub2-jobs': { title: 'Job Postings Pack: 3 Roles', content: `═══ Senior Developer (m/f/d) ═══\nRemote | €80-95k | 4-day week\nStack: React, Node.js, PostgreSQL\n"Build features used by thousands of companies."\n\n═══ Product Manager (m/f/d) ═══\nRemote | €75-90k | 4-day week\nFocus: B2B SaaS, Data-Driven\n"Define the roadmap for a product with 2,000+ customers."\n\n═══ UX Designer (m/f/d) ═══\nRemote | €65-80k | 4-day week\nTools: Figma, Research, Design Systems\n"Design interfaces that make complex processes simple."` },
  'dr-sub2-adcopy': { title: 'Ad Copy Variants: LinkedIn & Meta', content: `── LinkedIn Ad Copy ──\nVariant A (Pain-Point):\n"Another job where you just work through tickets? Not with us. Senior Developer wanted — 4-day week, remote, real ownership. →"\n\nVariant B (Benefit-Led):\n"4-day week. Full salary. Remote-first. Equity. Sounds too good? That's our standard. We're hiring Senior Developers. →"\n\n── Meta Ad Copy ──\nVariant A (short):\n"Write code that matters. 4-day week. Remote. Apply now →"\n\nVariant B (Story):\n"85 people. 2,000 customers. 0 BS. Schmidt GmbH is looking for developers who want to shape the future."` },
  'dr-sub3-report': { title: 'Weekly Report CW 07/2025', content: `Performance Report — Schmidt GmbH — CW 07\n\nLinkedIn Ads:\n  Impressions: 14,230 | Clicks: 412 | CTR: 2.9%\n  Applications: 8 | Cost/Application: €48\n  Top Performer: Variant B (Benefit-Led) — CTR 3.7%\n\nMeta Ads:\n  Impressions: 28,500 | Clicks: 680 | CTR: 2.4%\n  Applications: 5 | Cost/Application: €62\n  Top Performer: Variant A (short) — CTR 3.1%\n\nTotal:\n  Budget spent: €1,420 / €8,000 (17.8%)\n  Total applications: 13\n  Qualified leads: 9 (69%)\n\n⚡ Recommendation: Shift budget from Meta → LinkedIn (better cost/application)` },
  'dr-sub3-optimization': { title: 'AI Optimization Suggestions CW 07', content: `Optimization Recommendations (AI-generated):\n\n1. Budget Reallocation:\n   LinkedIn: 60% → 70% (better quality)\n   Meta: 40% → 30%\n\n2. Targeting Adjustment:\n   LinkedIn: Add "Years of Experience 5+"\n   Meta: Create lookalike audience from existing applicants\n\n3. Creative Rotation:\n   Variant B outperforms A by 28% — test new Variant C based on B\n\n4. Landing Page:\n   Bounce rate Senior Dev: 34% — test CTA above-the-fold` },
  'dr-sub4-checklist': { title: 'Onboarding Checklist: Schmidt GmbH', content: `Onboarding Checklist — Schmidt GmbH\n\n✅ Logo uploaded (PNG + SVG)\n✅ Brand colors defined (#1E40AF, #F59E0B)\n✅ Briefing form completed\n✅ Meta Business Manager access granted\n✅ Google Ads access granted\n⬜ LinkedIn Campaign Manager access — PENDING\n✅ Image materials uploaded (12 photos)\n✅ Existing job postings submitted\n\nStatus: 7/8 completed (87.5%)\nBlocker: LinkedIn access missing — reminder sent Feb 10` },
};

export function getDemoResources(systemId: string, lang: 'de' | 'en'): SystemResource[] {
  const resources = DEMO_RESOURCES_DE.filter(r => r.systemId === systemId);
  if (lang === 'de') return resources;
  return resources.map(r => {
    const en = DEMO_RESOURCES_EN[r.id];
    return en ? { ...r, title: en.title, content: en.content } : r;
  });
}
