/**
 * NodeLab V2 — Feature-rich test environment for node designs & workflow features.
 * Completely independent from WorkflowCanvas and /systems.
 *
 * Version System: V1 (original 10-node demo) / V2 (22 features from competitive analysis)
 * Feature Log: Every feature can be inspected, toggled, and reviewed individually.
 *
 * Route: /node-lab
 */

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  Zap, Users, Database, Sparkles, Globe, Layers,
  Check, X, Loader2, Play, SkipForward, SkipBack,
  Bot, ShieldCheck, Webhook, GitMerge, Pin, PinOff,
  ZoomIn, ZoomOut, Eye, Clock,
  ChevronDown, Copy, Search,
  BarChart3, Timer, GitBranch, Split,
  Repeat, Square, Plus,
  FileText, Variable, Wand2, History,
  ArrowRight,
  CheckCircle2, XCircle, AlertCircle, CircleDot,
  Boxes, StickyNote, Code2, TrendingUp, DollarSign,
  RotateCcw,
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';

// ─── Types ───────────────────────────────────────────────────────────────────

type LabNodeType = 'trigger' | 'process' | 'ai' | 'output' | 'subsystem'
  | 'ifelse' | 'merge' | 'wait' | 'iterator' | 'router';
type LabNodeStatus = 'idle' | 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

interface LabNode {
  id: string;
  label: string;
  description: string;
  type: LabNodeType;
  icon: string;
  x: number;
  y: number;
  status: LabNodeStatus;
  pinned?: boolean;
  customColor?: string;
  executionData?: { input: Record<string, unknown>; output: Record<string, unknown>; duration: number; items: number };
  group?: string;
}

interface LabConnection {
  from: string;
  to: string;
  label?: string;
  pathType?: 'true' | 'false' | 'default' | 'loop';
}

interface LabGroup {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Annotation {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
}

interface ExecutionRecord {
  id: string;
  timestamp: string;
  duration: number;
  status: 'success' | 'error' | 'partial';
  nodesExecuted: number;
  itemsProcessed: number;
}

interface FeatureInfo {
  id: string;
  name: string;
  nameEn: string;
  source: string;
  description: string;
  descriptionEn: string;
  tier: 1 | 2 | 3;
  enabled: boolean;
}

type LabVersion = 'v1' | 'v2';

// ─── Node Style Config ──────────────────────────────────────────────────────

const NODE_STYLES: Record<LabNodeType, { bg: string; border: string; accent: string; label: string; labelEn: string }> = {
  trigger:   { bg: 'rgba(59,130,246,0.07)',  border: 'rgba(59,130,246,0.18)',  accent: '#3b82f6', label: 'Trigger',    labelEn: 'Trigger' },
  process:   { bg: 'rgba(139,92,246,0.07)',  border: 'rgba(139,92,246,0.18)',  accent: '#8b5cf6', label: 'Prozess',    labelEn: 'Process' },
  ai:        { bg: 'rgba(217,70,239,0.07)',  border: 'rgba(217,70,239,0.18)',  accent: '#d946ef', label: 'KI',         labelEn: 'AI' },
  output:    { bg: 'rgba(16,185,129,0.07)',  border: 'rgba(16,185,129,0.18)',  accent: '#10b981', label: 'Output',     labelEn: 'Output' },
  subsystem: { bg: 'rgba(99,102,241,0.07)',  border: 'rgba(99,102,241,0.22)',  accent: '#6366f1', label: 'Sub-System', labelEn: 'Sub-System' },
  ifelse:    { bg: 'rgba(245,158,11,0.07)',  border: 'rgba(245,158,11,0.18)',  accent: '#f59e0b', label: 'Wenn/Dann',  labelEn: 'If/Else' },
  merge:     { bg: 'rgba(20,184,166,0.07)',  border: 'rgba(20,184,166,0.18)',  accent: '#14b8a6', label: 'Zusammenf.', labelEn: 'Merge' },
  wait:      { bg: 'rgba(107,114,128,0.07)', border: 'rgba(107,114,128,0.18)', accent: '#6b7280', label: 'Warten',     labelEn: 'Wait' },
  iterator:  { bg: 'rgba(168,85,247,0.07)',  border: 'rgba(168,85,247,0.18)',  accent: '#a855f7', label: 'Iterator',   labelEn: 'Iterator' },
  router:    { bg: 'rgba(236,72,153,0.07)',  border: 'rgba(236,72,153,0.18)',  accent: '#ec4899', label: 'Router',     labelEn: 'Router' },
};

const NODE_SIZES: Record<LabNodeType, { w: number; h: number; radius: string; iconSize: number; fontSize: number; descSize: number }> = {
  trigger:   { w: 200, h: 72,  radius: '20px 12px 12px 20px', iconSize: 16, fontSize: 12, descSize: 10 },
  process:   { w: 230, h: 82,  radius: '12px',                iconSize: 18, fontSize: 13, descSize: 10 },
  ai:        { w: 300, h: 120, radius: '18px',                iconSize: 28, fontSize: 15, descSize: 11 },
  output:    { w: 200, h: 72,  radius: '12px 20px 20px 12px', iconSize: 16, fontSize: 12, descSize: 10 },
  subsystem: { w: 320, h: 130, radius: '18px',                iconSize: 24, fontSize: 15, descSize: 10 },
  ifelse:    { w: 180, h: 80,  radius: '40px',                iconSize: 20, fontSize: 12, descSize: 10 },
  merge:     { w: 140, h: 60,  radius: '30px',                iconSize: 16, fontSize: 11, descSize: 9 },
  wait:      { w: 180, h: 72,  radius: '12px',                iconSize: 16, fontSize: 12, descSize: 10 },
  iterator:  { w: 220, h: 82,  radius: '14px',                iconSize: 18, fontSize: 12, descSize: 10 },
  router:    { w: 160, h: 80,  radius: '40px',                iconSize: 18, fontSize: 12, descSize: 10 },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  zap: Zap, users: Users, database: Database, sparkles: Sparkles,
  globe: Globe, layers: Layers, bot: Bot, 'shield-check': ShieldCheck,
  webhook: Webhook, 'git-merge': GitMerge, 'git-branch': GitBranch,
  split: Split, timer: Timer, repeat: Repeat, clock: Clock,
  'bar-chart': BarChart3, pin: Pin, wand: Wand2, search: Search,
  'arrow-right': ArrowRight, 'circle-dot': CircleDot,
};

// ─── CSS ────────────────────────────────────────────────────────────────────

const LAB_CSS = `
@property --lab-spin { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
@keyframes lab-spin-border { 0% { --lab-spin: 0deg; } 100% { --lab-spin: 360deg; } }
@keyframes lab-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.85; } }
@keyframes lab-bubble-in { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
@keyframes lab-data-flow { 0% { stroke-dashoffset: 20; } 100% { stroke-dashoffset: 0; } }
@keyframes lab-glow { 0%, 100% { box-shadow: 0 0 8px rgba(168,85,247,0.3); } 50% { box-shadow: 0 0 20px rgba(168,85,247,0.6); } }
.lab-node-running::before {
  content: ''; position: absolute; inset: -3px; border-radius: inherit;
  background: conic-gradient(from var(--lab-spin), #a855f7 0%, transparent 30%, transparent 70%, #a855f7 100%);
  animation: lab-spin-border 1.6s linear infinite; z-index: -1;
}
.lab-node-pending { animation: lab-pulse 2s ease-in-out infinite; }
.lab-node-completed { box-shadow: 0 0 0 2.5px #10b981, 0 0 20px rgba(16,185,129,0.2) !important; }
.lab-node-failed { box-shadow: 0 0 0 2.5px #ef4444, 0 0 20px rgba(239,68,68,0.2) !important; }
.lab-node-skipped { opacity: 0.4; }
.lab-node-pinned { box-shadow: 0 0 0 2px #3b82f6, 0 0 16px rgba(59,130,246,0.25) !important; }
.lab-bubble { animation: lab-bubble-in 0.3s ease-out forwards; }
.lab-circular { border-radius: 50% !important; }
.lab-connection-active { stroke-dasharray: 8 4; animation: lab-data-flow 0.6s linear infinite; }
`;

// ─── V1 Demo Nodes ──────────────────────────────────────────────────────────

const V1_NODES: LabNode[] = [
  { id: 't1', label: 'Webhook Eingang',     description: 'Neuer Lead empfangen',                     type: 'trigger',   icon: 'webhook',   x: 60,   y: 200, status: 'idle' },
  { id: 't2', label: 'Formular ausgefüllt',  description: 'Typeform-Antwort eingegangen',             type: 'trigger',   icon: 'zap',       x: 60,   y: 340, status: 'idle' },
  { id: 'p1', label: 'Daten zusammenführen', description: 'Lead-Daten & Formular mergen',             type: 'process',   icon: 'git-merge', x: 340,  y: 260, status: 'idle' },
  { id: 'a1', label: 'KI: Lead-Analyse',     description: 'Agent analysiert Branche, Potenzial, Score 0–100', type: 'ai', icon: 'sparkles', x: 660, y: 220, status: 'idle' },
  { id: 'p2', label: 'CRM-Eintrag',          description: 'Kontakt in HubSpot anlegen',               type: 'process',   icon: 'database',  x: 1040, y: 140, status: 'idle' },
  { id: 'a2', label: 'KI: Angebots-Entwurf', description: 'Personalisiertes Angebot generieren',      type: 'ai',        icon: 'bot',       x: 1040, y: 340, status: 'idle' },
  { id: 'o1', label: 'Slack Notification',    description: 'Sales-Team informieren',                   type: 'output',    icon: 'zap',       x: 1420, y: 100, status: 'idle' },
  { id: 'o2', label: 'E-Mail senden',         description: 'Angebot an Lead verschicken',              type: 'output',    icon: 'globe',     x: 1420, y: 260, status: 'idle' },
  { id: 'o3', label: 'Dashboard Update',      description: 'KPI-Tracking aktualisieren',               type: 'output',    icon: 'zap',       x: 1420, y: 400, status: 'idle' },
  { id: 's1', label: 'Follow-Up Automation',  description: 'Sub-Workflow · 8 Nodes · E-Mail-Sequenz',  type: 'subsystem', icon: 'layers',    x: 1040, y: 510, status: 'idle' },
];

const V1_CONNECTIONS: LabConnection[] = [
  { from: 't1', to: 'p1' }, { from: 't2', to: 'p1' },
  { from: 'p1', to: 'a1' },
  { from: 'a1', to: 'p2' }, { from: 'a1', to: 'a2' },
  { from: 'p2', to: 'o1' },
  { from: 'a2', to: 'o2' }, { from: 'a2', to: 'o3' },
  { from: 'a1', to: 's1' },
];

// ─── V2 Demo Nodes (expanded with all new node types) ──────────────────────

const V2_NODES: LabNode[] = [
  // Intake Phase
  { id: 't1', label: 'Webhook Eingang',        description: 'Neuer Lead via API empfangen',               type: 'trigger',   icon: 'webhook',     x: 60,   y: 160, status: 'idle', group: 'g-intake',
    executionData: { input: { source: 'api', timestamp: '2026-02-17T10:30:00Z' }, output: { leadId: 'LD-4821', email: 'max@firma.de', company: 'TechCorp GmbH' }, duration: 120, items: 1 } },
  { id: 't2', label: 'Formular ausgefüllt',     description: 'Typeform-Antwort eingegangen',               type: 'trigger',   icon: 'zap',         x: 60,   y: 320, status: 'idle', group: 'g-intake',
    executionData: { input: { formId: 'tf-392' }, output: { name: 'Max Müller', budget: '50k-100k', industry: 'SaaS' }, duration: 85, items: 1 } },
  { id: 'p1', label: 'Daten zusammenführen',    description: 'Lead-Daten & Formular mergen',               type: 'process',   icon: 'git-merge',   x: 340,  y: 230, status: 'idle', group: 'g-intake',
    executionData: { input: { lead: '...', form: '...' }, output: { merged: { name: 'Max Müller', email: 'max@firma.de', budget: '50k-100k', score: null } }, duration: 45, items: 1 } },

  // AI Analysis Phase
  { id: 'a1', label: 'KI: Lead-Analyse',        description: 'Agent analysiert Branche, Unternehmensgröße, Potenzial → Score 0–100', type: 'ai', icon: 'sparkles', x: 660, y: 190, status: 'idle', group: 'g-ai',
    executionData: { input: { lead: { name: 'Max Müller', company: 'TechCorp GmbH' } }, output: { score: 87, tier: 'hot', reasoning: 'SaaS + 50k budget = high potential' }, duration: 2400, items: 1 } },
  { id: 'ie1', label: 'Score prüfen',           description: 'Score >= 70 → Hot Lead Pfad, sonst → Nurturing', type: 'ifelse', icon: 'git-branch', x: 1020, y: 200, status: 'idle', group: 'g-ai',
    executionData: { input: { score: 87 }, output: { path: 'true', condition: 'score >= 70' }, duration: 5, items: 1 } },

  // Hot Lead Path
  { id: 'p2', label: 'CRM-Eintrag',             description: 'Hot-Lead in HubSpot als Opportunity anlegen', type: 'process', icon: 'database',  x: 1300, y: 100, status: 'idle', group: 'g-actions',
    executionData: { input: { leadId: 'LD-4821', tier: 'hot' }, output: { hubspotId: 'HS-9921', dealStage: 'Qualified' }, duration: 320, items: 1 } },
  { id: 'a2', label: 'KI: Angebots-Entwurf',    description: 'Personalisiertes Angebot basierend auf Lead-Profil', type: 'ai', icon: 'bot', x: 1300, y: 310, status: 'idle', group: 'g-actions',
    executionData: { input: { profile: '...' }, output: { proposal: 'Sehr geehrter Herr Müller...', pdf_url: '/proposals/P-4821.pdf' }, duration: 3200, items: 1 } },

  // Merge
  { id: 'mg1', label: 'Pfade zusammenführen',   description: 'Hot & Nurturing Pfade vereinen',              type: 'merge',   icon: 'git-merge',   x: 1620, y: 230, status: 'idle',
    executionData: { input: { paths: ['hot', 'nurturing'] }, output: { merged: true, source: 'hot' }, duration: 10, items: 1 } },

  // Iterator
  { id: 'it1', label: 'Kontakte verarbeiten',   description: 'Batch: Alle neuen Leads der letzten Stunde',  type: 'iterator', icon: 'repeat',      x: 1820, y: 130, status: 'idle',
    executionData: { input: { batchSize: 5 }, output: { processed: 5, current: '3/5' }, duration: 1500, items: 5 } },

  // Wait
  { id: 'w1', label: 'Warten auf Freigabe',     description: '2h Wartezeit oder Manager-Approval',         type: 'wait',    icon: 'clock',        x: 1820, y: 310, status: 'idle',
    executionData: { input: { waitFor: '2h', condition: 'approval' }, output: { waited: '45min', trigger: 'manual_approval' }, duration: 2700000, items: 1 } },

  // Router
  { id: 'rt1', label: 'Verteiler',              description: 'Route 1: E-Mail · Route 2: Slack · Route 3: CRM', type: 'router', icon: 'split', x: 2060, y: 210, status: 'idle',
    executionData: { input: { leadTier: 'hot' }, output: { routes: ['email', 'slack', 'crm'], activeRoutes: 3 }, duration: 15, items: 3 } },

  // Outputs
  { id: 'o1', label: 'Slack Notification',       description: 'Sales-Team in #leads informieren',            type: 'output',  icon: 'zap',          x: 2320, y: 80,  status: 'idle',
    executionData: { input: { channel: '#leads' }, output: { messageId: 'msg-8832', sent: true }, duration: 210, items: 1 } },
  { id: 'o2', label: 'E-Mail senden',            description: 'Angebot + PDF an Lead verschicken',           type: 'output',  icon: 'globe',        x: 2320, y: 220, status: 'idle',
    executionData: { input: { to: 'max@firma.de' }, output: { sent: true, messageId: 'em-4421' }, duration: 450, items: 1 } },
  { id: 'o3', label: 'Dashboard Update',         description: 'KPI-Tracking & Conversion-Daten',             type: 'output',  icon: 'bar-chart',    x: 2320, y: 360, status: 'idle',
    executionData: { input: { metric: 'new_lead' }, output: { updated: true, totalLeads: 847 }, duration: 95, items: 1 } },

  // Sub-System
  { id: 's1', label: 'Follow-Up Automation',     description: 'Sub-Workflow · 8 Nodes · E-Mail-Sequenz, Reminder, Eskalation', type: 'subsystem', icon: 'layers', x: 2060, y: 420, status: 'idle',
    executionData: { input: { leadId: 'LD-4821' }, output: { sequenceStarted: true, nextEmail: '2026-02-18T09:00:00Z' }, duration: 180, items: 1 } },
];

const V2_CONNECTIONS: LabConnection[] = [
  { from: 't1', to: 'p1' }, { from: 't2', to: 'p1' },
  { from: 'p1', to: 'a1' },
  { from: 'a1', to: 'ie1' },
  { from: 'ie1', to: 'p2', label: 'Score ≥ 70', pathType: 'true' },
  { from: 'ie1', to: 'a2', label: 'Score < 70', pathType: 'false' },
  { from: 'p2', to: 'mg1' }, { from: 'a2', to: 'mg1' },
  { from: 'mg1', to: 'it1' }, { from: 'mg1', to: 'w1' },
  { from: 'it1', to: 'rt1' }, { from: 'w1', to: 'rt1' },
  { from: 'rt1', to: 'o1' }, { from: 'rt1', to: 'o2' }, { from: 'rt1', to: 'o3' },
  { from: 'rt1', to: 's1' },
];

const V2_GROUPS: LabGroup[] = [
  { id: 'g-intake',  label: 'Intake',        color: 'rgba(59,130,246,0.06)',  x: 30,   y: 120, w: 570, h: 280 },
  { id: 'g-ai',      label: 'AI Processing', color: 'rgba(217,70,239,0.06)', x: 630,  y: 140, w: 570, h: 200 },
  { id: 'g-actions', label: 'Actions',       color: 'rgba(139,92,246,0.06)', x: 1270, y: 60,  w: 400, h: 320 },
];

// ─── English Translations ───────────────────────────────────────────────────

const NODE_EN: Record<string, { label: string; description: string }> = {
  t1: { label: 'Webhook Intake',       description: 'New lead received via API' },
  t2: { label: 'Form Submitted',       description: 'Typeform response received' },
  p1: { label: 'Merge Data',           description: 'Combine lead data & form entries' },
  a1: { label: 'AI: Lead Analysis',    description: 'Agent analyzes industry, company size, potential → Score 0–100' },
  ie1: { label: 'Check Score',         description: 'Score >= 70 → Hot Lead path, else → Nurturing' },
  p2: { label: 'CRM Entry',            description: 'Create hot lead as opportunity in HubSpot' },
  a2: { label: 'AI: Proposal Draft',   description: 'Generate personalized proposal based on lead profile' },
  mg1: { label: 'Merge Paths',         description: 'Reunite hot & nurturing paths' },
  it1: { label: 'Process Contacts',    description: 'Batch: All new leads from last hour' },
  w1: { label: 'Wait for Approval',    description: '2h wait or manager approval' },
  rt1: { label: 'Distributor',         description: 'Route 1: Email · Route 2: Slack · Route 3: CRM' },
  o1: { label: 'Slack Notification',   description: 'Notify sales team in #leads' },
  o2: { label: 'Send Email',           description: 'Send proposal + PDF to lead' },
  o3: { label: 'Dashboard Update',     description: 'KPI tracking & conversion data' },
  s1: { label: 'Follow-Up Automation', description: 'Sub-Workflow · 8 Nodes · Email sequence, reminders, escalation' },
};

// ─── Mock Execution History ─────────────────────────────────────────────────

const MOCK_HISTORY: ExecutionRecord[] = [
  { id: 'ex-1', timestamp: '2026-02-17 10:32', duration: 8.4, status: 'success', nodesExecuted: 15, itemsProcessed: 5 },
  { id: 'ex-2', timestamp: '2026-02-17 09:15', duration: 12.1, status: 'success', nodesExecuted: 15, itemsProcessed: 12 },
  { id: 'ex-3', timestamp: '2026-02-17 08:03', duration: 4.2, status: 'error', nodesExecuted: 8, itemsProcessed: 3 },
  { id: 'ex-4', timestamp: '2026-02-16 17:45', duration: 6.8, status: 'success', nodesExecuted: 15, itemsProcessed: 7 },
  { id: 'ex-5', timestamp: '2026-02-16 14:22', duration: 9.5, status: 'partial', nodesExecuted: 11, itemsProcessed: 4 },
  { id: 'ex-6', timestamp: '2026-02-16 11:10', duration: 7.2, status: 'success', nodesExecuted: 15, itemsProcessed: 8 },
  { id: 'ex-7', timestamp: '2026-02-15 16:30', duration: 5.1, status: 'success', nodesExecuted: 15, itemsProcessed: 2 },
];

// ─── Default Annotations ────────────────────────────────────────────────────

const DEFAULT_ANNOTATIONS: Annotation[] = [
  { id: 'ann-1', x: 680, y: 400, text: 'AI-Nodes brauchen ~2-3s\nfür die Analyse', color: '#fef3c7' },
  { id: 'ann-2', x: 1650, y: 400, text: 'Merge wartet auf\nbeide Pfade', color: '#dbeafe' },
];

// ─── Feature Catalogue ──────────────────────────────────────────────────────

const FEATURES: FeatureInfo[] = [
  { id: 'execution-bubbles', name: 'Execution Bubbles', nameEn: 'Execution Bubbles', source: 'Make.com', tier: 1, enabled: true,
    description: 'Grüne/Rote Blasen auf Nodes nach Ausführung. Zeigen Anzahl verarbeiteter Items.',
    descriptionEn: 'Green/Red bubbles on nodes after execution showing processed item count.' },
  { id: 'click-to-inspect', name: 'Click-to-Inspect', nameEn: 'Click-to-Inspect', source: 'Make.com', tier: 1, enabled: true,
    description: 'Klick auf Node öffnet Side-Panel mit Input/Output-Daten der letzten Execution.',
    descriptionEn: 'Click on node opens side panel with input/output data from last execution.' },
  { id: 'roi-dashboard', name: 'ROI Dashboard', nameEn: 'ROI Dashboard', source: 'Zapier', tier: 1, enabled: true,
    description: 'KPI-Cards mit berechneter Zeitersparnis, Executions und Erfolgsrate.',
    descriptionEn: 'KPI cards showing calculated time savings, executions and success rate.' },
  { id: 'execution-history', name: 'Execution History', nameEn: 'Execution History', source: 'n8n', tier: 1, enabled: true,
    description: 'Timeline vergangener Ausführungen mit Status, Dauer und Item-Count.',
    descriptionEn: 'Timeline of past executions with status, duration and item count.' },
  { id: 'data-pinning', name: 'Data Pinning', nameEn: 'Data Pinning', source: 'n8n', tier: 2, enabled: true,
    description: 'Node-Output-Daten "einfrieren" für Tests ohne erneute API-Calls.',
    descriptionEn: 'Pin node output data for testing without repeated API calls.' },
  { id: 'execution-replay', name: 'Execution Replay', nameEn: 'Execution Replay', source: 'n8n / Make', tier: 2, enabled: true,
    description: 'Schritt-für-Schritt Replay mit Play/Pause/Step Controls und Timeline.',
    descriptionEn: 'Step-by-step replay with Play/Pause/Step controls and timeline.' },
  { id: 'partial-execution', name: 'Partial Execution', nameEn: 'Partial Execution', source: 'n8n', tier: 2, enabled: true,
    description: 'Einzelne Nodes oder Node-Gruppen ausführen ohne ganzen Workflow zu starten.',
    descriptionEn: 'Execute individual nodes without running the entire workflow.' },
  { id: 'ifelse-routing', name: 'If-Else Routing', nameEn: 'If-Else Routing', source: 'Make.com', tier: 2, enabled: true,
    description: 'Neue Node-Typen: If-Else, Router, Merge für bedingte Pfade.',
    descriptionEn: 'New node types: If-Else, Router, Merge for conditional paths.' },
  { id: 'path-merging', name: 'Path Merging', nameEn: 'Path Merging', source: 'Relay.app', tier: 2, enabled: true,
    description: 'Bedingte Pfade nach Verzweigung wieder zusammenführen.',
    descriptionEn: 'Merge conditional paths back together after branching.' },
  { id: 'grouped-nodes', name: 'Grouped Nodes', nameEn: 'Grouped Nodes', source: 'Zapier', tier: 2, enabled: true,
    description: 'Visuelle Container um Node-Gruppen mit Farben und Labels.',
    descriptionEn: 'Visual containers around node groups with colors and labels.' },
  { id: 'custom-colors', name: 'Custom Colors', nameEn: 'Custom Colors', source: 'Zapier', tier: 3, enabled: true,
    description: 'Jeder Node kann individuelle Farbe bekommen.',
    descriptionEn: 'Each node can have an individual custom color.' },
  { id: 'annotations', name: 'Sticky Notes', nameEn: 'Sticky Notes', source: 'n8n', tier: 3, enabled: true,
    description: 'Farbige Notizen direkt auf dem Canvas platzieren.',
    descriptionEn: 'Place colored notes directly on the canvas.' },
  { id: 'live-data-preview', name: 'Live Data Previews', nameEn: 'Live Data Previews', source: 'Relay.app', tier: 2, enabled: true,
    description: 'Echtzeit-Datenvorschau direkt auf den Nodes.',
    descriptionEn: 'Real-time data preview directly on nodes.' },
  { id: 'iterator-vis', name: 'Iterator Visualization', nameEn: 'Iterator Visualization', source: 'Relay.app', tier: 3, enabled: true,
    description: 'Klare visuelle Darstellung von Schleifen und Array-Processing.',
    descriptionEn: 'Clear visual representation of loops and array processing.' },
  { id: 'wait-steps', name: 'Wait Steps', nameEn: 'Wait Steps', source: 'Relay.app', tier: 3, enabled: true,
    description: 'Visuelle Timer und Bedingungen für Warteschritte.',
    descriptionEn: 'Visual timers and conditions for wait steps.' },
  { id: 'expression-editor', name: 'Expression Editor', nameEn: 'Expression Editor', source: 'n8n', tier: 3, enabled: true,
    description: 'Editor mit Variable-Browser und Syntax-Highlighting für Ausdrücke.',
    descriptionEn: 'Editor with variable browser and syntax highlighting for expressions.' },
  { id: 'custom-variables', name: 'Custom Variables', nameEn: 'Custom Variables', source: 'n8n', tier: 3, enabled: true,
    description: 'Wiederverwendbare Variablen über mehrere Workflows hinweg.',
    descriptionEn: 'Reusable variables across multiple workflows.' },
  { id: 'insights-dashboard', name: 'Insights Dashboard', nameEn: 'Insights Dashboard', source: 'n8n', tier: 2, enabled: true,
    description: 'Analytics mit Execution-Trends, Fehlerrate, Performance-Metriken.',
    descriptionEn: 'Analytics with execution trends, error rate, performance metrics.' },
  { id: 'workflow-versioning', name: 'Workflow Versioning', nameEn: 'Workflow Versioning', source: 'n8n', tier: 3, enabled: true,
    description: 'Version History Timeline mit Rollback und Diff-View.',
    descriptionEn: 'Version history timeline with rollback and diff view.' },
  { id: 'node-clustering', name: 'Node Clustering', nameEn: 'Node Clustering', source: 'n8n', tier: 3, enabled: true,
    description: 'Mehrere Nodes zu Cluster-Nodes gruppieren mit Collapse/Expand.',
    descriptionEn: 'Group multiple nodes into cluster nodes with collapse/expand.' },
  { id: 'circular-design', name: 'Circular Design', nameEn: 'Circular Design Toggle', source: 'Make.com', tier: 3, enabled: false,
    description: 'Umschalten zwischen rechteckigen und runden Node-Formen.',
    descriptionEn: 'Toggle between rectangular and circular node shapes.' },
  { id: 'module-types', name: 'Modul-Typen-System', nameEn: 'Module Type System', source: 'Make.com', tier: 3, enabled: true,
    description: 'Klares Typen-System mit 10 Node-Typen und visueller Kennzeichnung.',
    descriptionEn: 'Clear type system with 10 node types and visual indicators.' },
];

// ─── Mock Variables ─────────────────────────────────────────────────────────

const MOCK_VARIABLES = [
  { name: 'API_KEY', value: 'sk-***...***f8a2', scope: 'global' },
  { name: 'SLACK_CHANNEL', value: '#leads', scope: 'workflow' },
  { name: 'SCORE_THRESHOLD', value: '70', scope: 'workflow' },
  { name: 'EMAIL_TEMPLATE', value: 'welcome-v2', scope: 'workflow' },
];

// ─── Connection Path Helper ─────────────────────────────────────────────────

function getPath(from: LabNode, to: LabNode): string {
  const sf = NODE_SIZES[from.type];
  const st = NODE_SIZES[to.type];
  const fx = from.x + sf.w;
  const fy = from.y + sf.h / 2;
  const tx = to.x;
  const ty = to.y + st.h / 2;
  const dx = Math.abs(tx - fx);
  const offset = Math.max(60, dx * 0.4);
  return `M ${fx} ${fy} C ${fx + offset} ${fy}, ${tx - offset} ${ty}, ${tx} ${ty}`;
}

function getLabelPos(from: LabNode, to: LabNode): { x: number; y: number } {
  const sf = NODE_SIZES[from.type];
  const st = NODE_SIZES[to.type];
  const fx = from.x + sf.w;
  const fy = from.y + sf.h / 2;
  const tx = to.x;
  const ty = to.y + st.h / 2;
  return { x: (fx + tx) / 2, y: (fy + ty) / 2 - 10 };
}

// ─── Component ──────────────────────────────────────────────────────────────

function NodeLabInner() {
  const { lang } = useLanguage();
  const canvasRef = useRef<HTMLDivElement>(null);

  // ─── Core State ─────────────────────────────────────────────────────
  const [version, setVersion] = useState<LabVersion>('v2');
  const [versionDropOpen, setVersionDropOpen] = useState(false);
  const [nodes, setNodes] = useState<LabNode[]>(V2_NODES);
  const [connections] = useState<LabConnection[]>(V2_CONNECTIONS);
  const [groups] = useState<LabGroup[]>(V2_GROUPS);
  const [annotations, setAnnotations] = useState<Annotation[]>(DEFAULT_ANNOTATIONS);
  const [zoom, setZoom] = useState(0.65);
  const [pan, setPan] = useState({ x: 20, y: 20 });
  const [isRunning, setIsRunning] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ─── Feature State ──────────────────────────────────────────────────
  const [features, setFeatures] = useState<FeatureInfo[]>(FEATURES);
  const [showFeatureLog, setShowFeatureLog] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [showExprEditor, setShowExprEditor] = useState(false);
  const [inspectNode, setInspectNode] = useState<LabNode | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; nodeId: string } | null>(null);
  const [circularMode, setCircularMode] = useState(false);
  const [showGroups, setShowGroups] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [showBubbles, setShowBubbles] = useState(true);
  const [showDataPreview, setShowDataPreview] = useState(true);

  // Replay state
  const [replayActive, setReplayActive] = useState(false);
  const [replayStep, setReplayStep] = useState(0);
  const replayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Feature enabled check
  const isFeatureOn = useCallback((id: string) => features.find(f => f.id === id)?.enabled ?? false, [features]);

  // ─── Version Switch ─────────────────────────────────────────────────
  useEffect(() => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
    setIsRunning(false);
    setReplayActive(false);
    setInspectNode(null);
    setContextMenu(null);
    if (version === 'v1') {
      setNodes(V1_NODES.map(n => ({ ...n, status: 'idle' as LabNodeStatus })));
      setAnnotations([]);
      setZoom(0.85);
      setPan({ x: 0, y: 0 });
    } else {
      setNodes(V2_NODES.map(n => ({ ...n, status: 'idle' as LabNodeStatus })));
      setAnnotations(DEFAULT_ANNOTATIONS);
      setZoom(0.65);
      setPan({ x: 20, y: 20 });
    }
  }, [version]);

  // Inject CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = LAB_CSS;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // ─── Pan ────────────────────────────────────────────────────────────
  const panRef = useRef<{ startX: number; startY: number; startPan: { x: number; y: number } } | null>(null);
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setContextMenu(null);
    panRef.current = { startX: e.clientX, startY: e.clientY, startPan: { ...pan } };
  }, [pan]);
  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    if (!panRef.current) return;
    setPan({ x: panRef.current.startPan.x + (e.clientX - panRef.current.startX), y: panRef.current.startPan.y + (e.clientY - panRef.current.startY) });
  }, []);
  const handleCanvasMouseUp = useCallback(() => { panRef.current = null; }, []);

  // ─── Zoom ───────────────────────────────────────────────────────────
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(z => Math.max(0.2, Math.min(2.5, z - e.deltaY * 0.001)));
  }, []);

  // ─── Execution Simulation ──────────────────────────────────────────
  const executionOrder = version === 'v1'
    ? ['t1', 't2', 'p1', 'a1', 'p2', 'a2', 'o1', 'o2', 'o3', 's1']
    : ['t1', 't2', 'p1', 'a1', 'ie1', 'p2', 'a2', 'mg1', 'it1', 'w1', 'rt1', 'o1', 'o2', 'o3', 's1'];

  const runSimulation = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle' as LabNodeStatus })));

    let delay = 200;
    executionOrder.forEach((id, i) => {
      const t1 = setTimeout(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'pending' } : n)), delay);
      timersRef.current.push(t1);
      delay += 250;
      const t2 = setTimeout(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'running' } : n)), delay);
      timersRef.current.push(t2);
      delay += id.startsWith('a') ? 1500 : id.startsWith('w') ? 1200 : 600;
      const t3 = setTimeout(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'completed' } : n)), delay);
      timersRef.current.push(t3);
      delay += 80;
      if (i === executionOrder.length - 1) {
        const tEnd = setTimeout(() => setIsRunning(false), delay + 400);
        timersRef.current.push(tEnd);
      }
    });
  }, [isRunning, executionOrder]);

  const stopSimulation = useCallback(() => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
    setIsRunning(false);
  }, []);

  const resetNodes = useCallback(() => {
    stopSimulation();
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle' as LabNodeStatus })));
  }, [stopSimulation]);

  // ─── Replay ─────────────────────────────────────────────────────────
  const startReplay = useCallback(() => {
    setReplayActive(true);
    setReplayStep(0);
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle' as LabNodeStatus })));
  }, []);

  const stepReplay = useCallback((dir: 1 | -1) => {
    setReplayStep(prev => {
      const next = Math.max(0, Math.min(executionOrder.length - 1, prev + dir));
      setNodes(oldNodes => oldNodes.map(n => {
        const idx = executionOrder.indexOf(n.id);
        if (idx < 0) return { ...n, status: 'idle' as LabNodeStatus };
        if (idx < next) return { ...n, status: 'completed' as LabNodeStatus };
        if (idx === next) return { ...n, status: 'running' as LabNodeStatus };
        return { ...n, status: 'idle' as LabNodeStatus };
      }));
      return next;
    });
  }, [executionOrder]);

  const playReplay = useCallback(() => {
    if (replayTimerRef.current) { clearInterval(replayTimerRef.current); replayTimerRef.current = null; return; }
    replayTimerRef.current = setInterval(() => {
      setReplayStep(prev => {
        if (prev >= executionOrder.length - 1) {
          if (replayTimerRef.current) clearInterval(replayTimerRef.current);
          replayTimerRef.current = null;
          return prev;
        }
        const next = prev + 1;
        setNodes(oldNodes => oldNodes.map(n => {
          const idx = executionOrder.indexOf(n.id);
          if (idx < 0) return { ...n, status: 'idle' as LabNodeStatus };
          if (idx < next) return { ...n, status: 'completed' as LabNodeStatus };
          if (idx === next) return { ...n, status: 'running' as LabNodeStatus };
          return { ...n, status: 'idle' as LabNodeStatus };
        }));
        return next;
      });
    }, 800);
  }, [executionOrder]);

  // ─── Partial Execution ──────────────────────────────────────────────
  const executeNode = useCallback((nodeId: string) => {
    setContextMenu(null);
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'running' } : n));
    setTimeout(() => setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'completed' } : n)), 1200);
  }, []);

  // ─── Toggle Pin ─────────────────────────────────────────────────────
  const togglePin = useCallback((nodeId: string) => {
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, pinned: !n.pinned } : n));
  }, []);

  // ─── Toggle Feature ─────────────────────────────────────────────────
  const toggleFeature = useCallback((featureId: string) => {
    setFeatures(prev => prev.map(f => f.id === featureId ? { ...f, enabled: !f.enabled } : f));
    if (featureId === 'circular-design') setCircularMode(prev => !prev);
    if (featureId === 'grouped-nodes') setShowGroups(prev => !prev);
    if (featureId === 'annotations') setShowAnnotations(prev => !prev);
    if (featureId === 'execution-bubbles') setShowBubbles(prev => !prev);
    if (featureId === 'live-data-preview') setShowDataPreview(prev => !prev);
  }, []);

  // ─── Helpers ────────────────────────────────────────────────────────
  const renderIcon = (iconName: string, size: number) => {
    const Icon = ICON_MAP[iconName];
    if (!Icon) return <Sparkles size={size} className="text-current" />;
    return <Icon size={size} className="text-current" />;
  };
  const getLabel = (node: LabNode) => (lang === 'en' && NODE_EN[node.id]) ? NODE_EN[node.id].label : node.label;
  const getDesc = (node: LabNode) => (lang === 'en' && NODE_EN[node.id]) ? NODE_EN[node.id].description : node.description;
  const isDark = document.documentElement.classList.contains('dark');
  const currentConns = version === 'v1' ? V1_CONNECTIONS : connections;

  // ROI calculation
  const roi = useMemo(() => {
    const totalExec = MOCK_HISTORY.length;
    const avgDuration = MOCK_HISTORY.reduce((s, h) => s + h.duration, 0) / totalExec;
    const manualMinutes = 35;
    const timeSaved = (totalExec * manualMinutes) - (totalExec * avgDuration / 60);
    const successRate = MOCK_HISTORY.filter(h => h.status === 'success').length / totalExec * 100;
    const totalItems = MOCK_HISTORY.reduce((s, h) => s + h.itemsProcessed, 0);
    return { totalExec, avgDuration: avgDuration.toFixed(1), timeSaved: Math.round(timeSaved), successRate: successRate.toFixed(0), totalItems };
  }, []);

  // ─── RENDER ─────────────────────────────────────────────────────────
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white overflow-hidden">
      {/* ── ROI DASHBOARD (V2 only) ── */}
      {version === 'v2' && isFeatureOn('roi-dashboard') && (
        <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-200 dark:border-zinc-800 bg-gradient-to-r from-purple-500/5 via-transparent to-emerald-500/5">
          <TrendingUp size={14} className="text-purple-500" />
          <span className="text-[11px] font-medium text-gray-500 dark:text-zinc-400">{lang === 'de' ? 'Workflow-ROI' : 'Workflow ROI'}</span>
          <div className="flex items-center gap-4 ml-2">
            {[
              { label: lang === 'de' ? 'Ausführungen' : 'Executions', value: roi.totalExec.toString(), icon: <Repeat size={11} />, color: 'text-purple-500' },
              { label: lang === 'de' ? 'Ø Dauer' : 'Avg Duration', value: `${roi.avgDuration}s`, icon: <Clock size={11} />, color: 'text-blue-500' },
              { label: lang === 'de' ? 'Zeitersparnis' : 'Time Saved', value: `~${roi.timeSaved}min`, icon: <DollarSign size={11} />, color: 'text-emerald-500' },
              { label: lang === 'de' ? 'Erfolgsrate' : 'Success Rate', value: `${roi.successRate}%`, icon: <CheckCircle2 size={11} />, color: 'text-green-500' },
              { label: 'Items', value: roi.totalItems.toString(), icon: <Boxes size={11} />, color: 'text-orange-500' },
            ].map(kpi => (
              <div key={kpi.label} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/60 dark:bg-zinc-800/60">
                <span className={kpi.color}>{kpi.icon}</span>
                <span className="text-[11px] font-bold">{kpi.value}</span>
                <span className="text-[9px] text-gray-400 dark:text-zinc-500">{kpi.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b bg-white dark:bg-zinc-900/80 border-gray-200 dark:border-zinc-800 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-bold">Node Lab</h1>

          {/* Version Selector */}
          <div className="relative">
            <button
              onClick={() => setVersionDropOpen(!versionDropOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
            >
              {version === 'v1' ? 'V1 — Basic' : 'V2 — Full Features'}
              <ChevronDown size={12} />
            </button>
            {versionDropOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setVersionDropOpen(false)} />
                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-gray-200 dark:border-zinc-700 z-40 overflow-hidden">
                  {[
                    { v: 'v1' as LabVersion, label: 'V1 — Basic', desc: lang === 'de' ? '10 Nodes, Standard-Simulation' : '10 Nodes, standard simulation' },
                    { v: 'v2' as LabVersion, label: 'V2 — Full Features', desc: lang === 'de' ? '15 Nodes, 22 Features, alle Node-Typen' : '15 Nodes, 22 features, all node types' },
                  ].map(opt => (
                    <button
                      key={opt.v}
                      onClick={() => { setVersion(opt.v); setVersionDropOpen(false); }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors ${version === opt.v ? 'bg-purple-50 dark:bg-purple-900/20' : ''}`}
                    >
                      <div className="text-sm font-medium">{opt.label}</div>
                      <div className="text-[10px] text-gray-500 dark:text-zinc-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* V2 Toolbar buttons */}
          {version === 'v2' && (
            <>
              <button onClick={() => setShowFeatureLog(!showFeatureLog)} title={lang === 'de' ? 'Feature-Log' : 'Feature Log'}
                className={`p-2 rounded-lg text-xs transition-colors ${showFeatureLog ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' : 'hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500'}`}>
                <FileText size={15} />
              </button>
              <button onClick={() => setShowHistory(!showHistory)} title={lang === 'de' ? 'Execution History' : 'Execution History'}
                className={`p-2 rounded-lg text-xs transition-colors ${showHistory ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500'}`}>
                <History size={15} />
              </button>
              <button onClick={() => setShowInsights(!showInsights)} title="Insights"
                className={`p-2 rounded-lg text-xs transition-colors ${showInsights ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500'}`}>
                <BarChart3 size={15} />
              </button>
              <button onClick={() => setShowVariables(!showVariables)} title={lang === 'de' ? 'Variablen' : 'Variables'}
                className={`p-2 rounded-lg text-xs transition-colors ${showVariables ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' : 'hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500'}`}>
                <Variable size={15} />
              </button>
              <button onClick={() => setShowExprEditor(!showExprEditor)} title={lang === 'de' ? 'Expression Editor' : 'Expression Editor'}
                className={`p-2 rounded-lg text-xs transition-colors ${showExprEditor ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600' : 'hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500'}`}>
                <Code2 size={15} />
              </button>
              <div className="w-px h-5 bg-gray-300 dark:bg-zinc-700 mx-1" />
            </>
          )}

          {/* Zoom */}
          <button onClick={() => setZoom(z => Math.min(2.5, z + 0.15))} className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800"><ZoomIn size={15} /></button>
          <span className="text-[10px] text-gray-400 w-8 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.max(0.2, z - 0.15))} className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800"><ZoomOut size={15} /></button>
          <div className="w-px h-5 bg-gray-300 dark:bg-zinc-700 mx-1" />

          {/* Run / Stop / Reset */}
          <button
            onClick={isRunning ? stopSimulation : runSimulation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              isRunning ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {isRunning ? <><Square size={12} />{lang === 'de' ? 'Stop' : 'Stop'}</> : <><Play size={12} />{lang === 'de' ? 'Starten' : 'Run'}</>}
          </button>
          <button onClick={resetNodes} className="px-2 py-1.5 rounded-lg text-xs text-gray-500 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-800">
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* ── FEATURE LOG SIDEBAR ── */}
        {showFeatureLog && version === 'v2' && (
          <div className="w-80 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-y-auto shrink-0">
            <div className="p-3 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold">{lang === 'de' ? 'Feature-Log' : 'Feature Log'}</h2>
                <p className="text-[10px] text-gray-500 dark:text-zinc-500 mt-0.5">
                  {lang === 'de' ? `${features.filter(f => f.enabled).length}/${features.length} aktiv` : `${features.filter(f => f.enabled).length}/${features.length} active`}
                </p>
              </div>
              <button onClick={() => setShowFeatureLog(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><X size={14} /></button>
            </div>
            {[1, 2, 3].map(tier => (
              <div key={tier}>
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 bg-gray-50 dark:bg-zinc-900">
                  Tier {tier} {tier === 1 ? (lang === 'de' ? '— Höchster Impact' : '— Highest Impact') : tier === 2 ? (lang === 'de' ? '— Post-MVP' : '— Post-MVP') : (lang === 'de' ? '— Nice-to-Have' : '— Nice-to-Have')}
                </div>
                {features.filter(f => f.tier === tier).map(f => (
                  <div key={f.id} className="px-3 py-2.5 border-b border-gray-100 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <button
                          onClick={() => toggleFeature(f.id)}
                          className={`w-8 h-4 rounded-full transition-colors relative shrink-0 ${f.enabled ? 'bg-purple-500' : 'bg-gray-300 dark:bg-zinc-600'}`}
                        >
                          <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${f.enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
                        </button>
                        <span className="text-xs font-medium truncate">{lang === 'en' ? f.nameEn : f.name}</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 shrink-0">{f.source}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-zinc-500 mt-1 leading-relaxed pl-10">
                      {lang === 'en' ? f.descriptionEn : f.description}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── HISTORY SIDEBAR ── */}
        {showHistory && version === 'v2' && isFeatureOn('execution-history') && (
          <div className="w-72 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-y-auto shrink-0">
            <div className="p-3 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
              <h2 className="text-sm font-bold">{lang === 'de' ? 'Execution History' : 'Execution History'}</h2>
              <button onClick={() => setShowHistory(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><X size={14} /></button>
            </div>
            {MOCK_HISTORY.map(h => (
              <div key={h.id} className="px-3 py-3 border-b border-gray-100 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/30 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {h.status === 'success' && <CheckCircle2 size={13} className="text-green-500" />}
                    {h.status === 'error' && <XCircle size={13} className="text-red-500" />}
                    {h.status === 'partial' && <AlertCircle size={13} className="text-yellow-500" />}
                    <span className="text-xs font-medium">{h.timestamp}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">{h.duration}s</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 pl-5">
                  <span className="text-[10px] text-gray-500 dark:text-zinc-500">{h.nodesExecuted} Nodes</span>
                  <span className="text-[10px] text-gray-500 dark:text-zinc-500">{h.itemsProcessed} Items</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── MAIN CANVAS AREA ── */}
        <div className="flex-1 relative overflow-hidden">
          {/* Canvas */}
          <div
            ref={canvasRef}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            onWheel={handleWheel}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="absolute origin-top-left" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
              {/* Groups */}
              {version === 'v2' && showGroups && isFeatureOn('grouped-nodes') && groups.map(g => (
                <div key={g.id} className="absolute rounded-2xl border border-dashed pointer-events-none" style={{
                  left: g.x, top: g.y, width: g.w, height: g.h,
                  background: g.color,
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                }}>
                  <span className="absolute -top-3 left-4 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider"
                    style={{ background: isDark ? '#18181b' : '#f9fafb', color: isDark ? '#a1a1aa' : '#6b7280' }}>
                    {g.label}
                  </span>
                </div>
              ))}

              {/* Annotations */}
              {version === 'v2' && showAnnotations && isFeatureOn('annotations') && annotations.map(ann => (
                <div key={ann.id} className="absolute rounded-lg shadow-sm border border-yellow-300/50 p-2 text-[10px] leading-tight pointer-events-none whitespace-pre-line" style={{
                  left: ann.x, top: ann.y, background: isDark ? '#3f3f0060' : ann.color, color: isDark ? '#fef3c7' : '#92400e', minWidth: 120, maxWidth: 180,
                }}>
                  <StickyNote size={10} className="mb-1 opacity-50" />
                  {ann.text}
                </div>
              ))}

              {/* Connections */}
              <svg className="absolute inset-0 w-[3000px] h-[800px] pointer-events-none" style={{ overflow: 'visible' }}>
                {currentConns.map((conn, i) => {
                  const fromNode = nodes.find(n => n.id === conn.from);
                  const toNode = nodes.find(n => n.id === conn.to);
                  if (!fromNode || !toNode) return null;
                  const isActive = fromNode.status === 'completed' || fromNode.status === 'running';
                  const pathColor = conn.pathType === 'true' ? '#10b981'
                    : conn.pathType === 'false' ? '#f59e0b'
                    : conn.pathType === 'loop' ? '#a855f7'
                    : isActive ? NODE_STYLES[fromNode.type].accent
                    : (isDark ? 'rgba(113,113,122,0.25)' : 'rgba(156,163,175,0.35)');
                  const labelPos = conn.label ? getLabelPos(fromNode, toNode) : null;
                  return (
                    <g key={i}>
                      <path
                        d={getPath(fromNode, toNode)}
                        fill="none"
                        stroke={pathColor}
                        strokeWidth={isActive ? 2.5 : 1.5}
                        strokeLinecap="round"
                        className={isActive ? 'lab-connection-active' : ''}
                        style={{ transition: 'stroke 0.5s, stroke-width 0.3s' }}
                      />
                      {conn.label && labelPos && (
                        <text x={labelPos.x} y={labelPos.y} textAnchor="middle" fontSize="9" fontWeight="600"
                          fill={conn.pathType === 'true' ? '#10b981' : conn.pathType === 'false' ? '#f59e0b' : (isDark ? '#a1a1aa' : '#6b7280')}>
                          {conn.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Nodes */}
              {nodes.map(node => {
                const nStyle = NODE_STYLES[node.type];
                const size = NODE_SIZES[node.type];
                const statusClass = node.status === 'running' ? 'lab-node-running'
                  : node.status === 'pending' ? 'lab-node-pending'
                  : node.status === 'completed' ? 'lab-node-completed'
                  : node.status === 'failed' ? 'lab-node-failed'
                  : node.status === 'skipped' ? 'lab-node-skipped'
                  : '';
                const pinnedClass = node.pinned && isFeatureOn('data-pinning') ? 'lab-node-pinned' : '';
                const circClass = circularMode && isFeatureOn('circular-design') ? 'lab-circular' : '';

                return (
                  <div key={node.id}>
                    <div
                      className={`absolute border backdrop-blur-sm select-none transition-all duration-500 ${statusClass} ${pinnedClass} ${circClass}`}
                      style={{
                        left: node.x, top: node.y, width: size.w, height: circularMode ? size.w : size.h,
                        borderRadius: circularMode ? '50%' : size.radius,
                        background: node.customColor ? `${node.customColor}12` : (node.status === 'running' ? (isDark ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)') : nStyle.bg),
                        borderColor: node.customColor || (node.status === 'completed' ? '#10b981' : node.status === 'running' ? '#a855f7' : node.status === 'failed' ? '#ef4444' : nStyle.border),
                        boxShadow: node.type === 'ai' ? `0 0 30px ${nStyle.accent}15` : undefined,
                        zIndex: node.status === 'running' ? 20 : 10,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (version === 'v2' && isFeatureOn('click-to-inspect')) setInspectNode(node);
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault(); e.stopPropagation();
                        if (version === 'v2' && isFeatureOn('partial-execution')) {
                          setContextMenu({ x: e.clientX, y: e.clientY, nodeId: node.id });
                        }
                      }}
                    >
                      {/* Inner dashed frame for subsystem */}
                      {node.type === 'subsystem' && !circularMode && (
                        <div className="absolute inset-2.5 rounded-xl border border-dashed pointer-events-none" style={{ borderColor: nStyle.accent + '30' }} />
                      )}

                      {/* Node Content */}
                      {circularMode ? (
                        <div className="h-full flex flex-col items-center justify-center text-center px-3">
                          <div className="rounded-full flex items-center justify-center mb-1" style={{ width: 32, height: 32, background: nStyle.accent + '18' }}>
                            {renderIcon(node.icon, 16)}
                          </div>
                          <div className="font-medium truncate w-full text-gray-900 dark:text-white" style={{ fontSize: 10 }}>{getLabel(node)}</div>
                        </div>
                      ) : node.type === 'ai' ? (
                        <div className="h-full flex items-center px-5 gap-4">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: nStyle.accent + '18' }}>
                            {renderIcon(node.icon, size.iconSize)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold truncate text-gray-900 dark:text-white" style={{ fontSize: size.fontSize }}>{getLabel(node)}</div>
                            <div className="mt-1 line-clamp-2 leading-tight text-gray-500 dark:text-zinc-500" style={{ fontSize: size.descSize }}>{getDesc(node)}</div>
                          </div>
                        </div>
                      ) : node.type === 'subsystem' ? (
                        <div className="h-full flex items-center px-5 gap-4 relative z-10">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: nStyle.accent + '15' }}>
                            {renderIcon(node.icon, size.iconSize)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold truncate text-gray-900 dark:text-white" style={{ fontSize: size.fontSize }}>{getLabel(node)}</div>
                            <div className="mt-1 line-clamp-2 leading-tight text-gray-500 dark:text-zinc-500" style={{ fontSize: size.descSize }}>{getDesc(node)}</div>
                          </div>
                        </div>
                      ) : (node.type === 'ifelse' || node.type === 'router' || node.type === 'merge') ? (
                        <div className="h-full flex flex-col items-center justify-center text-center px-3">
                          <div className="rounded-full flex items-center justify-center mb-1" style={{ width: 28, height: 28, background: nStyle.accent + '18' }}>
                            {renderIcon(node.icon, size.iconSize)}
                          </div>
                          <div className="font-medium truncate w-full text-gray-900 dark:text-white" style={{ fontSize: size.fontSize }}>{getLabel(node)}</div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center px-3.5 gap-3">
                          <div className="rounded-lg flex items-center justify-center shrink-0" style={{
                            width: node.type === 'process' ? 36 : 32, height: node.type === 'process' ? 36 : 32, background: nStyle.accent + '15',
                          }}>
                            {renderIcon(node.icon, size.iconSize)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium truncate text-gray-900 dark:text-white" style={{ fontSize: size.fontSize }}>{getLabel(node)}</div>
                            <div className="mt-0.5 truncate text-gray-500 dark:text-zinc-500" style={{ fontSize: size.descSize }}>{getDesc(node)}</div>
                          </div>
                        </div>
                      )}

                      {/* Type badge */}
                      {isFeatureOn('module-types') && (
                        <div className="absolute -top-2 -right-2 text-[8px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md border" style={{
                          background: nStyle.bg, borderColor: nStyle.border, color: nStyle.accent,
                        }}>
                          {nStyle[lang === 'en' ? 'labelEn' : 'label']}
                        </div>
                      )}

                      {/* Status indicator */}
                      {(node.status === 'running' || node.status === 'completed' || node.status === 'failed') && (
                        <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center z-20 border border-white dark:border-zinc-900 transition-colors duration-300"
                          style={{ background: node.status === 'completed' ? '#10b981' : node.status === 'failed' ? '#ef4444' : '#a855f7' }}>
                          {node.status === 'running' && <Loader2 size={10} className="text-white animate-spin" />}
                          {node.status === 'completed' && <Check size={10} className="text-white" />}
                          {node.status === 'failed' && <X size={10} className="text-white" />}
                        </div>
                      )}

                      {/* Execution Bubble */}
                      {version === 'v2' && showBubbles && isFeatureOn('execution-bubbles') && node.status === 'completed' && node.executionData && (
                        <div className="absolute -top-3 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white z-30 lab-bubble"
                          style={{ background: '#10b981' }}>
                          {node.executionData.items}
                        </div>
                      )}

                      {/* Pin indicator */}
                      {version === 'v2' && node.pinned && isFeatureOn('data-pinning') && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30">
                          <Pin size={12} className="text-blue-500" fill="currentColor" />
                        </div>
                      )}

                      {/* Data Preview (under node) */}
                      {version === 'v2' && showDataPreview && isFeatureOn('live-data-preview') && node.status === 'completed' && node.executionData && (
                        <div className="absolute -bottom-7 left-0 right-0 flex justify-center pointer-events-none">
                          <div className="px-2 py-0.5 rounded text-[8px] font-mono bg-gray-800/90 text-green-400 truncate max-w-[200px]">
                            {JSON.stringify(node.executionData.output).slice(0, 40)}...
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── CONTEXT MENU ── */}
          {contextMenu && version === 'v2' && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setContextMenu(null)} />
              <div className="fixed z-40 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-gray-200 dark:border-zinc-700 overflow-hidden min-w-[180px]"
                style={{ left: contextMenu.x, top: contextMenu.y }}>
                <button onClick={() => executeNode(contextMenu.nodeId)}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-zinc-700/50 flex items-center gap-2">
                  <Play size={12} className="text-green-500" /> {lang === 'de' ? 'Node ausführen' : 'Execute Node'}
                </button>
                <button onClick={() => { togglePin(contextMenu.nodeId); setContextMenu(null); }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-zinc-700/50 flex items-center gap-2">
                  <Pin size={12} className="text-blue-500" /> {lang === 'de' ? 'Daten pinnen' : 'Pin Data'}
                </button>
                <button onClick={() => { setInspectNode(nodes.find(n => n.id === contextMenu.nodeId) || null); setContextMenu(null); }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-zinc-700/50 flex items-center gap-2">
                  <Eye size={12} className="text-purple-500" /> {lang === 'de' ? 'Daten inspizieren' : 'Inspect Data'}
                </button>
                <div className="border-t border-gray-100 dark:border-zinc-700" />
                <button onClick={() => setContextMenu(null)}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-zinc-700/50 flex items-center gap-2 text-gray-400">
                  <X size={12} /> {lang === 'de' ? 'Schließen' : 'Close'}
                </button>
              </div>
            </>
          )}

          {/* ── REPLAY CONTROLS ── */}
          {version === 'v2' && isFeatureOn('execution-replay') && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 dark:bg-zinc-800/90 backdrop-blur shadow-lg border border-gray-200 dark:border-zinc-700 z-20">
              {!replayActive ? (
                <button onClick={startReplay} className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-medium bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">
                  <History size={12} /> Replay
                </button>
              ) : (
                <>
                  <button onClick={() => stepReplay(-1)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700"><SkipBack size={14} /></button>
                  <button onClick={playReplay} className="p-1.5 rounded-full bg-purple-600 text-white hover:bg-purple-700">
                    <Play size={14} />
                  </button>
                  <button onClick={() => stepReplay(1)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700"><SkipForward size={14} /></button>
                  <div className="w-32 h-1.5 rounded-full bg-gray-200 dark:bg-zinc-700 relative mx-2">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-purple-500 transition-all" style={{ width: `${(replayStep / Math.max(1, executionOrder.length - 1)) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-500 w-10">{replayStep + 1}/{executionOrder.length}</span>
                  <button onClick={() => { setReplayActive(false); if (replayTimerRef.current) clearInterval(replayTimerRef.current); }}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700"><X size={13} /></button>
                </>
              )}
            </div>
          )}
        </div>

        {/* ── INSPECT PANEL ── */}
        {inspectNode && version === 'v2' && isFeatureOn('click-to-inspect') && (
          <div className="w-80 border-l border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-y-auto shrink-0">
            <div className="p-3 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: NODE_STYLES[inspectNode.type].accent + '18' }}>
                  {renderIcon(inspectNode.icon, 12)}
                </div>
                <span className="text-sm font-bold truncate">{getLabel(inspectNode)}</span>
              </div>
              <button onClick={() => setInspectNode(null)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><X size={14} /></button>
            </div>

            {/* Tabs: Setup | Data */}
            <div className="flex border-b border-gray-200 dark:border-zinc-800">
              {['Setup', 'Data'].map(tab => (
                <button key={tab} className="flex-1 py-2 text-xs font-medium text-center border-b-2 border-purple-500 text-purple-600">
                  {tab}
                </button>
              ))}
            </div>

            {/* Node Info */}
            <div className="p-3 space-y-3">
              <div>
                <div className="text-[10px] font-medium text-gray-400 uppercase mb-1">Type</div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: NODE_STYLES[inspectNode.type].accent + '18', color: NODE_STYLES[inspectNode.type].accent }}>
                    {NODE_STYLES[inspectNode.type][lang === 'en' ? 'labelEn' : 'label']}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-medium text-gray-400 uppercase mb-1">{lang === 'de' ? 'Beschreibung' : 'Description'}</div>
                <div className="text-xs text-gray-600 dark:text-zinc-400">{getDesc(inspectNode)}</div>
              </div>
              <div>
                <div className="text-[10px] font-medium text-gray-400 uppercase mb-1">Status</div>
                <div className="flex items-center gap-1.5">
                  {inspectNode.status === 'completed' && <CheckCircle2 size={12} className="text-green-500" />}
                  {inspectNode.status === 'idle' && <CircleDot size={12} className="text-gray-400" />}
                  {inspectNode.status === 'running' && <Loader2 size={12} className="text-purple-500 animate-spin" />}
                  <span className="text-xs capitalize">{inspectNode.status}</span>
                </div>
              </div>

              {/* Pin Toggle */}
              {isFeatureOn('data-pinning') && (
                <button onClick={() => togglePin(inspectNode.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${inspectNode.pinned ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-700'}`}>
                  {inspectNode.pinned ? <PinOff size={12} /> : <Pin size={12} />}
                  {inspectNode.pinned ? (lang === 'de' ? 'Daten lösen' : 'Unpin Data') : (lang === 'de' ? 'Daten pinnen' : 'Pin Data')}
                </button>
              )}

              {/* Execution Data */}
              {inspectNode.executionData && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-medium text-gray-400 uppercase">Input</div>
                    <button className="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><Copy size={10} className="text-gray-400" /></button>
                  </div>
                  <pre className="text-[10px] font-mono bg-gray-50 dark:bg-zinc-800 rounded-lg p-2 overflow-x-auto text-gray-600 dark:text-zinc-400 max-h-32">
                    {JSON.stringify(inspectNode.executionData.input, null, 2)}
                  </pre>

                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-medium text-gray-400 uppercase">Output</div>
                    <button className="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><Copy size={10} className="text-gray-400" /></button>
                  </div>
                  <pre className="text-[10px] font-mono bg-gray-50 dark:bg-zinc-800 rounded-lg p-2 overflow-x-auto text-green-600 dark:text-green-400 max-h-32">
                    {JSON.stringify(inspectNode.executionData.output, null, 2)}
                  </pre>

                  <div className="flex items-center gap-3 text-[10px] text-gray-400">
                    <span><Clock size={10} className="inline mr-1" />{inspectNode.executionData.duration}ms</span>
                    <span><Boxes size={10} className="inline mr-1" />{inspectNode.executionData.items} items</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── INSIGHTS PANEL ── */}
        {showInsights && version === 'v2' && isFeatureOn('insights-dashboard') && (
          <div className="w-72 border-l border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-y-auto shrink-0">
            <div className="p-3 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
              <h2 className="text-sm font-bold">Insights</h2>
              <button onClick={() => setShowInsights(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><X size={14} /></button>
            </div>
            <div className="p-3 space-y-4">
              {/* Mini Chart Mock */}
              <div>
                <div className="text-[10px] font-medium text-gray-400 uppercase mb-2">{lang === 'de' ? 'Ausführungen (7 Tage)' : 'Executions (7 days)'}</div>
                <div className="flex items-end gap-1 h-16">
                  {[3, 5, 2, 7, 4, 6, 8].map((v, i) => (
                    <div key={i} className="flex-1 rounded-t transition-all" style={{
                      height: `${(v / 8) * 100}%`,
                      background: i === 6 ? '#8b5cf6' : (isDark ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.15)'),
                    }} />
                  ))}
                </div>
                <div className="flex justify-between text-[8px] text-gray-400 mt-1">
                  <span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span><span>Sa</span><span>So</span>
                </div>
              </div>

              {/* KPIs */}
              {[
                { label: lang === 'de' ? 'Durchschnittl. Dauer' : 'Avg Duration', value: '7.6s', trend: '-12%', positive: true },
                { label: lang === 'de' ? 'Fehlerrate' : 'Error Rate', value: '14.3%', trend: '+2.1%', positive: false },
                { label: lang === 'de' ? 'Meiste Fehler' : 'Most Errors', value: 'KI: Lead-Analyse', trend: '3 errors', positive: false },
                { label: lang === 'de' ? 'Zeitersparnis/Woche' : 'Time Saved/Week', value: '~4.2h', trend: '+18%', positive: true },
              ].map(kpi => (
                <div key={kpi.label} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-zinc-800/50">
                  <div>
                    <div className="text-[10px] text-gray-400">{kpi.label}</div>
                    <div className="text-sm font-bold">{kpi.value}</div>
                  </div>
                  <span className={`text-[10px] font-medium ${kpi.positive ? 'text-green-500' : 'text-red-400'}`}>{kpi.trend}</span>
                </div>
              ))}

              {/* Heatmap Mock */}
              <div>
                <div className="text-[10px] font-medium text-gray-400 uppercase mb-2">{lang === 'de' ? 'Aktivitäts-Heatmap' : 'Activity Heatmap'}</div>
                <div className="grid grid-cols-6 gap-1">
                  {Array.from({ length: 24 }, (_, i) => {
                    const intensity = [0, 0, 0, 0, 0, 0, 1, 2, 4, 5, 3, 2, 1, 2, 4, 5, 6, 4, 2, 1, 0, 0, 0, 0][i];
                    return <div key={i} className="w-full aspect-square rounded-sm" style={{ background: `rgba(139,92,246,${intensity * 0.15})` }} />;
                  })}
                </div>
                <div className="flex justify-between text-[7px] text-gray-400 mt-1"><span>0:00</span><span>6:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div>
              </div>
            </div>
          </div>
        )}

        {/* ── VARIABLES PANEL ── */}
        {showVariables && version === 'v2' && isFeatureOn('custom-variables') && (
          <div className="w-72 border-l border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-y-auto shrink-0">
            <div className="p-3 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
              <h2 className="text-sm font-bold">{lang === 'de' ? 'Variablen' : 'Variables'}</h2>
              <button onClick={() => setShowVariables(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><X size={14} /></button>
            </div>
            <div className="p-3 space-y-2">
              {MOCK_VARIABLES.map(v => (
                <div key={v.name} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800">
                  <div>
                    <div className="text-xs font-mono font-medium">{v.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono truncate max-w-[140px]">{v.value}</div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-200 dark:bg-zinc-700 text-gray-500">{v.scope}</span>
                </div>
              ))}
              <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-gray-300 dark:border-zinc-700 text-xs text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800">
                <Plus size={12} /> {lang === 'de' ? 'Variable hinzufügen' : 'Add Variable'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── EXPRESSION EDITOR MODAL ── */}
      {showExprEditor && version === 'v2' && isFeatureOn('expression-editor') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[700px] max-h-[500px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-zinc-800">
              <h3 className="text-sm font-bold">Expression Editor</h3>
              <button onClick={() => setShowExprEditor(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><X size={14} /></button>
            </div>
            <div className="flex flex-1 min-h-0">
              {/* Variable Browser */}
              <div className="w-48 border-r border-gray-200 dark:border-zinc-800 overflow-y-auto p-2">
                <div className="text-[10px] font-bold uppercase text-gray-400 mb-2">{lang === 'de' ? 'Verfügbare Variablen' : 'Available Variables'}</div>
                {[
                  { group: '$json', vars: ['email', 'name', 'company', 'score', 'budget'] },
                  { group: '$node', vars: ['Webhook.output', 'AI_Analysis.score', 'CRM.hubspotId'] },
                  { group: '$workflow', vars: ['id', 'name', 'active'] },
                  { group: '$env', vars: ['API_KEY', 'SLACK_CHANNEL'] },
                ].map(g => (
                  <div key={g.group} className="mb-2">
                    <div className="text-[10px] font-medium text-purple-500 mb-1">{g.group}</div>
                    {g.vars.map(v => (
                      <button key={v} className="block w-full text-left text-[10px] px-2 py-1 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-600 dark:text-zinc-400 font-mono">
                        .{v}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              {/* Editor Area */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-3">
                  <div className="w-full h-full rounded-lg bg-gray-50 dark:bg-zinc-800 p-3 font-mono text-xs text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700">
                    <span className="text-purple-500">{'{{ '}</span>
                    <span className="text-blue-500">$json</span>
                    <span className="text-gray-400">.</span>
                    <span className="text-green-500">score</span>
                    <span className="text-gray-400"> {'>='} </span>
                    <span className="text-orange-500">70</span>
                    <span className="text-gray-400"> ? </span>
                    <span className="text-amber-600">"Hot Lead"</span>
                    <span className="text-gray-400"> : </span>
                    <span className="text-amber-600">"Nurturing"</span>
                    <span className="text-purple-500">{' }}'}</span>
                  </div>
                </div>
                <div className="px-3 py-2 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
                  <div className="text-[10px] text-gray-400">{lang === 'de' ? 'Vorschau:' : 'Preview:'}</div>
                  <div className="text-xs font-mono text-green-500 font-medium">"Hot Lead"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NodeLabPage() {
  useTheme();
  return (
    <LanguageProvider>
      <NodeLabInner />
    </LanguageProvider>
  );
}
