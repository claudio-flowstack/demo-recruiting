/**
 * NodeLab V4 — Feature-rich test environment for node designs & workflow features.
 * Completely independent from WorkflowCanvas and /systems.
 *
 * Version System:
 *   V1 (original 10-node demo)
 *   V2 (22 features from competitive analysis)
 *   V3 (27 features: +Retry, Error Handler, Circuit Breaker, Schema Types, Approval Nodes)
 *   V4 (37 features: +AI Agent, MCP, Draft/Published, Breakpoints, Fork/Join, Blueprint, Condition Agent, Memory Types, Error Directives, Multiplayer Cursors)
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
  RotateCcw, AlertTriangle, UserCheck, RefreshCw, Shield,
  Hand, Activity,
  BrainCircuit, GitFork, Download, Upload, Bug,
  StepForward, MousePointer2, Plug, Brain,
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';

// ─── Types ───────────────────────────────────────────────────────────────────

type LabNodeType = 'trigger' | 'process' | 'ai' | 'output' | 'subsystem'
  | 'ifelse' | 'merge' | 'wait' | 'iterator' | 'router'
  | 'error-handler' | 'approval'
  | 'agent' | 'fork' | 'join' | 'condition-agent';
type LabNodeStatus = 'idle' | 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
type SchemaType = 'string' | 'number' | 'object' | 'array' | 'boolean';
interface SchemaPort { name: string; type: SchemaType; }
type CircuitBreakerStatus = 'closed' | 'half-open' | 'open';

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
  retryConfig?: { maxRetries: number; delay: number; backoff: 'linear' | 'exponential' | 'jitter' };
  circuitBreaker?: { status: CircuitBreakerStatus; failures: number; threshold: number };
  schemaTypes?: { inputs: SchemaPort[]; outputs: SchemaPort[] };
  approvalState?: 'waiting' | 'approved' | 'rejected';
  approvalAssignee?: string;
  approvalDeadline?: string;
  // V4
  agentReasoningTrace?: { step: number; thought: string; action: string; result: string }[];
  agentTools?: string[];
  mcpEnabled?: boolean;
  mcpProvider?: string;
  draftState?: 'draft' | 'published';
  breakpoint?: boolean;
  parallelLaneId?: string;
  parallelLanes?: string[];
  memoryType?: 'buffer' | 'window' | 'summary' | 'persistent';
  errorDirective?: 'break' | 'continue' | 'rollback' | 'resume';
  conditionPrompt?: string;
}

interface LabConnection {
  from: string;
  to: string;
  label?: string;
  pathType?: 'true' | 'false' | 'default' | 'loop' | 'error' | 'mcp' | 'parallel' | 'tool';
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
  introducedIn: 'v2' | 'v3' | 'v4';
}

interface MultiplayerCursor {
  id: string; name: string; color: string; x: number; y: number;
}

type LabVersion = 'v1' | 'v2' | 'v3' | 'v4';

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
  router:         { bg: 'rgba(236,72,153,0.07)',  border: 'rgba(236,72,153,0.18)',  accent: '#ec4899', label: 'Router',         labelEn: 'Router' },
  'error-handler': { bg: 'rgba(239,68,68,0.07)',   border: 'rgba(239,68,68,0.22)',   accent: '#ef4444', label: 'Error Handler', labelEn: 'Error Handler' },
  approval:        { bg: 'rgba(245,158,11,0.07)',  border: 'rgba(245,158,11,0.22)',  accent: '#f59e0b', label: 'Freigabe',      labelEn: 'Approval' },
  agent:              { bg: 'rgba(124,58,237,0.07)',  border: 'rgba(124,58,237,0.22)',  accent: '#7c3aed', label: 'KI-Agent',       labelEn: 'AI Agent' },
  fork:               { bg: 'rgba(14,165,233,0.07)',  border: 'rgba(14,165,233,0.18)',  accent: '#0ea5e9', label: 'Aufteilen',      labelEn: 'Fork' },
  join:               { bg: 'rgba(14,165,233,0.07)',  border: 'rgba(14,165,233,0.18)',  accent: '#0ea5e9', label: 'Zusammenf.',     labelEn: 'Join' },
  'condition-agent':  { bg: 'rgba(168,85,247,0.07)',  border: 'rgba(168,85,247,0.22)',  accent: '#a855f7', label: 'KI-Bedingung',   labelEn: 'AI Condition' },
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
  router:         { w: 160, h: 80,  radius: '40px',                iconSize: 18, fontSize: 12, descSize: 10 },
  'error-handler': { w: 200, h: 80,  radius: '12px',                iconSize: 18, fontSize: 12, descSize: 10 },
  approval:        { w: 260, h: 100, radius: '16px',                iconSize: 22, fontSize: 13, descSize: 10 },
  agent:              { w: 320, h: 130, radius: '18px',                iconSize: 28, fontSize: 15, descSize: 11 },
  fork:               { w: 120, h: 80,  radius: '40px',                iconSize: 22, fontSize: 11, descSize: 9 },
  join:               { w: 120, h: 80,  radius: '40px',                iconSize: 22, fontSize: 11, descSize: 9 },
  'condition-agent':  { w: 240, h: 100, radius: '40px',                iconSize: 22, fontSize: 13, descSize: 10 },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  zap: Zap, users: Users, database: Database, sparkles: Sparkles,
  globe: Globe, layers: Layers, bot: Bot, 'shield-check': ShieldCheck,
  webhook: Webhook, 'git-merge': GitMerge, 'git-branch': GitBranch,
  split: Split, timer: Timer, repeat: Repeat, clock: Clock,
  'bar-chart': BarChart3, pin: Pin, wand: Wand2, search: Search,
  'arrow-right': ArrowRight, 'circle-dot': CircleDot,
  'alert-triangle': AlertTriangle, 'user-check': UserCheck,
  'refresh-cw': RefreshCw, shield: Shield, hand: Hand,
  activity: Activity,
  brain: Brain, 'brain-circuit': BrainCircuit, 'git-fork': GitFork,
  download: Download, upload: Upload, bug: Bug,
  'step-forward': StepForward, 'mouse-pointer': MousePointer2, plug: Plug,
};

// ─── CSS ────────────────────────────────────────────────────────────────────

const LAB_CSS = `
@keyframes lab-bubble-in { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
@keyframes lab-data-flow { 0% { stroke-dashoffset: 20; } 100% { stroke-dashoffset: 0; } }
.lab-node-running { box-shadow: 0 0 0 2px #a855f7, 0 4px 12px rgba(168,85,247,0.1) !important; }
.lab-node-pending { box-shadow: 0 0 0 1px rgba(168,85,247,0.4) !important; }
.lab-node-completed { box-shadow: 0 0 0 2px #10b981, 0 4px 12px rgba(16,185,129,0.15) !important; }
.lab-node-failed { box-shadow: 0 0 0 2px #ef4444, 0 4px 12px rgba(239,68,68,0.1) !important; }
.lab-node-skipped { opacity: 0.4; }
.lab-node-pinned { box-shadow: 0 0 0 2px #3b82f6, 0 0 16px rgba(59,130,246,0.25) !important; }
.lab-bubble { animation: lab-bubble-in 0.3s ease-out forwards; }
.lab-circular { border-radius: 50% !important; }
.lab-connection-active { stroke-dasharray: 8 4; animation: lab-data-flow 0.6s linear infinite; }
@keyframes lab-approval-pulse { 0%, 100% { box-shadow: 0 0 0 2px #f59e0b, 0 0 12px rgba(245,158,11,0.2); } 50% { box-shadow: 0 0 0 4px #f59e0b, 0 0 24px rgba(245,158,11,0.35); } }
.lab-node-approval-waiting { animation: lab-approval-pulse 2s ease-in-out infinite; }
@keyframes lab-circuit-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
.lab-circuit-open { animation: lab-circuit-pulse 1s ease-in-out infinite; }
@keyframes lab-retry-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.lab-retry-active { animation: lab-retry-spin 1s linear infinite; }
@keyframes lab-agent-think { 0%, 100% { box-shadow: 0 0 0 2px #7c3aed, 0 0 20px rgba(124,58,237,0.2); } 50% { box-shadow: 0 0 0 3px #7c3aed, 0 0 35px rgba(124,58,237,0.4); } }
.lab-node-agent-thinking { animation: lab-agent-think 1.5s ease-in-out infinite; }
.lab-breakpoint::after { content: ''; position: absolute; top: -4px; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; border-radius: 50%; background: #ef4444; border: 2px solid white; z-index: 40; box-shadow: 0 0 8px rgba(239,68,68,0.5); }
@keyframes lab-breakpoint-pause { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.lab-breakpoint-paused { animation: lab-breakpoint-pause 1s ease-in-out infinite; }
.lab-parallel-lane { border-left: 2px dashed rgba(14,165,233,0.3); border-right: 2px dashed rgba(14,165,233,0.3); background: rgba(14,165,233,0.03); border-radius: 12px; }
@keyframes lab-mcp-pulse { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
.lab-mcp-badge { animation: lab-mcp-pulse 2s ease-in-out infinite; }
.lab-mcp-connection { stroke-dasharray: 4 6; animation: lab-data-flow 1s linear infinite; }
@keyframes lab-tool-activate { 0% { box-shadow: 0 0 0 0 rgba(124,58,237,0); } 50% { box-shadow: 0 0 0 4px rgba(124,58,237,0.3), 0 0 16px rgba(124,58,237,0.2); } 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0); } }
.lab-tool-active { animation: lab-tool-activate 1.5s ease-in-out; }
.lab-draft-badge { background: linear-gradient(135deg, #f59e0b, #fbbf24); color: white; }
.lab-published-badge { background: linear-gradient(135deg, #10b981, #34d399); color: white; }
@keyframes lab-cursor-float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-2px); } }
.lab-multiplayer-cursor { animation: lab-cursor-float 3s ease-in-out infinite; pointer-events: none; transition: left 2.5s ease-in-out, top 2.5s ease-in-out; }
@keyframes lab-reasoning-in { from { max-height: 0; opacity: 0; } to { max-height: 200px; opacity: 1; } }
.lab-reasoning-step { animation: lab-reasoning-in 0.5s ease-out forwards; }
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

// ─── V3 Demo Nodes (V2 + Error Handler, Approval, Retry, Circuit Breaker, Schema) ──

const SCHEMA_COLORS: Record<SchemaType, string> = {
  string: '#3b82f6', number: '#10b981', object: '#8b5cf6', array: '#f59e0b', boolean: '#ec4899',
};

const V3_NODES: LabNode[] = [
  // Intake Phase
  { id: 't1', label: 'Webhook Eingang',        description: 'Neuer Lead via API empfangen',               type: 'trigger',   icon: 'webhook',     x: 60,   y: 160, status: 'idle', group: 'g-intake',
    retryConfig: { maxRetries: 3, delay: 1000, backoff: 'exponential' },
    schemaTypes: { inputs: [], outputs: [{ name: 'leadId', type: 'string' }, { name: 'email', type: 'string' }, { name: 'company', type: 'string' }] },
    executionData: { input: { source: 'api', timestamp: '2026-02-17T10:30:00Z' }, output: { leadId: 'LD-4821', email: 'max@firma.de', company: 'TechCorp GmbH' }, duration: 120, items: 1 } },
  { id: 't2', label: 'Formular ausgefüllt',     description: 'Typeform-Antwort eingegangen',               type: 'trigger',   icon: 'zap',         x: 60,   y: 320, status: 'idle', group: 'g-intake',
    schemaTypes: { inputs: [], outputs: [{ name: 'name', type: 'string' }, { name: 'budget', type: 'string' }, { name: 'industry', type: 'string' }] },
    executionData: { input: { formId: 'tf-392' }, output: { name: 'Max Müller', budget: '50k-100k', industry: 'SaaS' }, duration: 85, items: 1 } },
  { id: 'p1', label: 'Daten zusammenführen',    description: 'Lead-Daten & Formular mergen',               type: 'process',   icon: 'git-merge',   x: 340,  y: 230, status: 'idle', group: 'g-intake',
    schemaTypes: { inputs: [{ name: 'lead', type: 'object' }, { name: 'form', type: 'object' }], outputs: [{ name: 'merged', type: 'object' }] },
    executionData: { input: { lead: '...', form: '...' }, output: { merged: { name: 'Max Müller', email: 'max@firma.de', budget: '50k-100k', score: null } }, duration: 45, items: 1 } },

  // AI Analysis Phase
  { id: 'a1', label: 'KI: Lead-Analyse',        description: 'Agent analysiert Branche, Unternehmensgröße, Potenzial → Score 0–100', type: 'ai', icon: 'sparkles', x: 660, y: 190, status: 'idle', group: 'g-ai',
    retryConfig: { maxRetries: 2, delay: 2000, backoff: 'exponential' },
    circuitBreaker: { status: 'closed', failures: 0, threshold: 3 },
    schemaTypes: { inputs: [{ name: 'lead', type: 'object' }], outputs: [{ name: 'score', type: 'number' }, { name: 'tier', type: 'string' }, { name: 'reasoning', type: 'string' }] },
    executionData: { input: { lead: { name: 'Max Müller', company: 'TechCorp GmbH' } }, output: { score: 87, tier: 'hot', reasoning: 'SaaS + 50k budget = high potential' }, duration: 2400, items: 1 } },
  { id: 'ie1', label: 'Score prüfen',           description: 'Score >= 70 → Hot Lead Pfad, sonst → Nurturing', type: 'ifelse', icon: 'git-branch', x: 1020, y: 200, status: 'idle', group: 'g-ai',
    schemaTypes: { inputs: [{ name: 'score', type: 'number' }], outputs: [{ name: 'path', type: 'string' }, { name: 'condition', type: 'string' }] },
    executionData: { input: { score: 87 }, output: { path: 'true', condition: 'score >= 70' }, duration: 5, items: 1 } },

  // Error Handler for AI
  { id: 'eh1', label: 'Error Handler',          description: 'Fängt Fehler von KI-Analyse ab → Fallback-Scoring',   type: 'error-handler', icon: 'alert-triangle', x: 660, y: 400, status: 'idle', group: 'g-ai',
    schemaTypes: { inputs: [{ name: 'error', type: 'object' }], outputs: [{ name: 'fallback', type: 'object' }] },
    executionData: { input: { error: { code: 'AI_TIMEOUT', node: 'a1' } }, output: { fallback: { score: 50, tier: 'nurturing', source: 'rule-based' } }, duration: 15, items: 1 } },

  // Approval Node
  { id: 'ap1', label: 'Manager-Freigabe',       description: 'Hot-Lead erfordert Manager-Approval vor CRM-Eintrag', type: 'approval', icon: 'user-check', x: 1250, y: 60, status: 'idle', group: 'g-actions',
    approvalState: 'waiting', approvalAssignee: 'Claudio D.', approvalDeadline: '2h',
    schemaTypes: { inputs: [{ name: 'lead', type: 'object' }, { name: 'score', type: 'number' }], outputs: [{ name: 'approved', type: 'boolean' }, { name: 'approver', type: 'string' }] },
    executionData: { input: { lead: 'Max Müller', score: 87 }, output: { approved: true, approver: 'Claudio D.', decision_time: '12min' }, duration: 720000, items: 1 } },

  // Hot Lead Path
  { id: 'p2', label: 'CRM-Eintrag',             description: 'Hot-Lead in HubSpot als Opportunity anlegen', type: 'process', icon: 'database',  x: 1520, y: 100, status: 'idle', group: 'g-actions',
    retryConfig: { maxRetries: 3, delay: 500, backoff: 'linear' },
    schemaTypes: { inputs: [{ name: 'leadId', type: 'string' }, { name: 'tier', type: 'string' }], outputs: [{ name: 'hubspotId', type: 'string' }, { name: 'dealStage', type: 'string' }] },
    executionData: { input: { leadId: 'LD-4821', tier: 'hot' }, output: { hubspotId: 'HS-9921', dealStage: 'Qualified' }, duration: 320, items: 1 } },
  { id: 'a2', label: 'KI: Angebots-Entwurf',    description: 'Personalisiertes Angebot basierend auf Lead-Profil', type: 'ai', icon: 'bot', x: 1520, y: 310, status: 'idle', group: 'g-actions',
    retryConfig: { maxRetries: 2, delay: 3000, backoff: 'jitter' },
    circuitBreaker: { status: 'closed', failures: 0, threshold: 5 },
    schemaTypes: { inputs: [{ name: 'profile', type: 'object' }], outputs: [{ name: 'proposal', type: 'string' }, { name: 'pdf_url', type: 'string' }] },
    executionData: { input: { profile: '...' }, output: { proposal: 'Sehr geehrter Herr Müller...', pdf_url: '/proposals/P-4821.pdf' }, duration: 3200, items: 1 } },

  // Merge
  { id: 'mg1', label: 'Pfade zusammenführen',   description: 'Hot & Nurturing Pfade vereinen',              type: 'merge',   icon: 'git-merge',   x: 1840, y: 230, status: 'idle',
    schemaTypes: { inputs: [{ name: 'pathA', type: 'object' }, { name: 'pathB', type: 'object' }], outputs: [{ name: 'merged', type: 'object' }] },
    executionData: { input: { paths: ['hot', 'nurturing'] }, output: { merged: true, source: 'hot' }, duration: 10, items: 1 } },

  // Iterator
  { id: 'it1', label: 'Kontakte verarbeiten',   description: 'Batch: Alle neuen Leads der letzten Stunde',  type: 'iterator', icon: 'repeat',      x: 2040, y: 130, status: 'idle',
    schemaTypes: { inputs: [{ name: 'items', type: 'array' }], outputs: [{ name: 'current', type: 'object' }, { name: 'index', type: 'number' }] },
    executionData: { input: { batchSize: 5 }, output: { processed: 5, current: '3/5' }, duration: 1500, items: 5 } },

  // Wait
  { id: 'w1', label: 'Warten auf Freigabe',     description: '2h Wartezeit oder Manager-Approval',         type: 'wait',    icon: 'clock',        x: 2040, y: 310, status: 'idle',
    executionData: { input: { waitFor: '2h', condition: 'approval' }, output: { waited: '45min', trigger: 'manual_approval' }, duration: 2700000, items: 1 } },

  // Router
  { id: 'rt1', label: 'Verteiler',              description: 'Route 1: E-Mail · Route 2: Slack · Route 3: CRM', type: 'router', icon: 'split', x: 2280, y: 210, status: 'idle',
    schemaTypes: { inputs: [{ name: 'leadTier', type: 'string' }], outputs: [{ name: 'routes', type: 'array' }] },
    executionData: { input: { leadTier: 'hot' }, output: { routes: ['email', 'slack', 'crm'], activeRoutes: 3 }, duration: 15, items: 3 } },

  // Outputs
  { id: 'o1', label: 'Slack Notification',       description: 'Sales-Team in #leads informieren',            type: 'output',  icon: 'zap',          x: 2540, y: 80,  status: 'idle',
    executionData: { input: { channel: '#leads' }, output: { messageId: 'msg-8832', sent: true }, duration: 210, items: 1 } },
  { id: 'o2', label: 'E-Mail senden',            description: 'Angebot + PDF an Lead verschicken',           type: 'output',  icon: 'globe',        x: 2540, y: 220, status: 'idle',
    retryConfig: { maxRetries: 5, delay: 2000, backoff: 'exponential' },
    executionData: { input: { to: 'max@firma.de' }, output: { sent: true, messageId: 'em-4421' }, duration: 450, items: 1 } },
  { id: 'o3', label: 'Dashboard Update',         description: 'KPI-Tracking & Conversion-Daten',             type: 'output',  icon: 'bar-chart',    x: 2540, y: 360, status: 'idle',
    executionData: { input: { metric: 'new_lead' }, output: { updated: true, totalLeads: 847 }, duration: 95, items: 1 } },

  // Sub-System
  { id: 's1', label: 'Follow-Up Automation',     description: 'Sub-Workflow · 8 Nodes · E-Mail-Sequenz, Reminder, Eskalation', type: 'subsystem', icon: 'layers', x: 2280, y: 420, status: 'idle',
    executionData: { input: { leadId: 'LD-4821' }, output: { sequenceStarted: true, nextEmail: '2026-02-18T09:00:00Z' }, duration: 180, items: 1 } },
];

const V3_CONNECTIONS: LabConnection[] = [
  { from: 't1', to: 'p1' }, { from: 't2', to: 'p1' },
  { from: 'p1', to: 'a1' },
  { from: 'a1', to: 'eh1', label: 'Error', pathType: 'error' },
  { from: 'a1', to: 'ie1' },
  { from: 'ie1', to: 'ap1', label: 'Score ≥ 70', pathType: 'true' },
  { from: 'ie1', to: 'a2', label: 'Score < 70', pathType: 'false' },
  { from: 'ap1', to: 'p2', label: 'Approved', pathType: 'true' },
  { from: 'p2', to: 'mg1' }, { from: 'a2', to: 'mg1' },
  { from: 'mg1', to: 'it1' }, { from: 'mg1', to: 'w1' },
  { from: 'it1', to: 'rt1' }, { from: 'w1', to: 'rt1' },
  { from: 'rt1', to: 'o1' }, { from: 'rt1', to: 'o2' }, { from: 'rt1', to: 'o3' },
  { from: 'rt1', to: 's1' },
];

const V3_GROUPS: LabGroup[] = [
  { id: 'g-intake',  label: 'Intake',            color: 'rgba(59,130,246,0.06)',  x: 30,   y: 120, w: 570, h: 280 },
  { id: 'g-ai',      label: 'AI + Resilience',   color: 'rgba(217,70,239,0.06)', x: 630,  y: 140, w: 570, h: 340 },
  { id: 'g-actions', label: 'Approval & Actions', color: 'rgba(139,92,246,0.06)', x: 1220, y: 20,  w: 620, h: 370 },
];

const V3_ANNOTATIONS: Annotation[] = [
  { id: 'ann-1', x: 660, y: 520, text: 'Error Handler fängt\nAI-Timeouts ab', color: '#fee2e2' },
  { id: 'ann-2', x: 1250, y: 180, text: 'Approval pausiert\nWorkflow bis Freigabe', color: '#fef3c7' },
  { id: 'ann-3', x: 1520, y: 430, text: 'CRM mit Retry 3x\nExponential Backoff', color: '#dbeafe' },
];

// ─── English Translations ───────────────────────────────────────────────────

const NODE_EN: Record<string, { label: string; description: string }> = {
  t1: { label: 'Webhook Intake',       description: 'New lead received via API' },
  t2: { label: 'Form Submitted',       description: 'Typeform response received' },
  p1: { label: 'Merge Data',           description: 'Combine lead data & form entries' },
  a1: { label: 'AI: Lead Analysis',    description: 'Agent analyzes industry, company size, potential → Score 0–100' },
  ie1: { label: 'Check Score',         description: 'Score >= 70 → Hot Lead path, else → Nurturing' },
  eh1: { label: 'Error Handler',       description: 'Catches AI analysis errors → Fallback scoring' },
  ap1: { label: 'Manager Approval',    description: 'Hot lead requires manager approval before CRM entry' },
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
  { id: 'execution-bubbles', name: 'Execution Bubbles', nameEn: 'Execution Bubbles', source: 'Make.com', tier: 1, enabled: true, introducedIn: 'v2',
    description: 'Grüne/Rote Blasen auf Nodes nach Ausführung. Zeigen Anzahl verarbeiteter Items.',
    descriptionEn: 'Green/Red bubbles on nodes after execution showing processed item count.' },
  { id: 'click-to-inspect', name: 'Click-to-Inspect', nameEn: 'Click-to-Inspect', source: 'Make.com', tier: 1, enabled: true, introducedIn: 'v2',
    description: 'Klick auf Node öffnet Side-Panel mit Input/Output-Daten der letzten Execution.',
    descriptionEn: 'Click on node opens side panel with input/output data from last execution.' },
  { id: 'roi-dashboard', name: 'ROI Dashboard', nameEn: 'ROI Dashboard', source: 'Zapier', tier: 1, enabled: true, introducedIn: 'v2',
    description: 'KPI-Cards mit berechneter Zeitersparnis, Executions und Erfolgsrate.',
    descriptionEn: 'KPI cards showing calculated time savings, executions and success rate.' },
  { id: 'execution-history', name: 'Execution History', nameEn: 'Execution History', source: 'n8n', tier: 1, enabled: true, introducedIn: 'v2',
    description: 'Timeline vergangener Ausführungen mit Status, Dauer und Item-Count.',
    descriptionEn: 'Timeline of past executions with status, duration and item count.' },
  { id: 'data-pinning', name: 'Data Pinning', nameEn: 'Data Pinning', source: 'n8n', tier: 2, enabled: true, introducedIn: 'v2',
    description: 'Node-Output-Daten "einfrieren" für Tests ohne erneute API-Calls.',
    descriptionEn: 'Pin node output data for testing without repeated API calls.' },
  { id: 'execution-replay', name: 'Execution Replay', nameEn: 'Execution Replay', source: 'n8n / Make', tier: 2, enabled: true, introducedIn: 'v2',
    description: 'Schritt-für-Schritt Replay mit Play/Pause/Step Controls und Timeline.',
    descriptionEn: 'Step-by-step replay with Play/Pause/Step controls and timeline.' },
  { id: 'partial-execution', name: 'Partial Execution', nameEn: 'Partial Execution', source: 'n8n', tier: 2, enabled: true, introducedIn: 'v2',
    description: 'Einzelne Nodes oder Node-Gruppen ausführen ohne ganzen Workflow zu starten.',
    descriptionEn: 'Execute individual nodes without running the entire workflow.' },
  { id: 'ifelse-routing', name: 'If-Else Routing', nameEn: 'If-Else Routing', source: 'Make.com', tier: 2, enabled: true, introducedIn: 'v2',
    description: 'Neue Node-Typen: If-Else, Router, Merge für bedingte Pfade.',
    descriptionEn: 'New node types: If-Else, Router, Merge for conditional paths.' },
  { id: 'path-merging', name: 'Path Merging', nameEn: 'Path Merging', source: 'Relay.app', tier: 2, enabled: true, introducedIn: 'v2',
    description: 'Bedingte Pfade nach Verzweigung wieder zusammenführen.',
    descriptionEn: 'Merge conditional paths back together after branching.' },
  { id: 'grouped-nodes', name: 'Grouped Nodes', nameEn: 'Grouped Nodes', source: 'Zapier', tier: 2, enabled: true, introducedIn: 'v2',
    description: 'Visuelle Container um Node-Gruppen mit Farben und Labels.',
    descriptionEn: 'Visual containers around node groups with colors and labels.' },
  { id: 'custom-colors', name: 'Custom Colors', nameEn: 'Custom Colors', source: 'Zapier', tier: 3, enabled: true, introducedIn: 'v2',
    description: 'Jeder Node kann individuelle Farbe bekommen.',
    descriptionEn: 'Each node can have an individual custom color.' },
  { id: 'annotations', name: 'Sticky Notes', nameEn: 'Sticky Notes', source: 'n8n', tier: 3, enabled: true, introducedIn: 'v2',
    description: 'Farbige Notizen direkt auf dem Canvas platzieren.',
    descriptionEn: 'Place colored notes directly on the canvas.' },
  { id: 'live-data-preview', name: 'Live Data Previews', nameEn: 'Live Data Previews', source: 'Relay.app', tier: 2, enabled: true, introducedIn: 'v2',
    description: 'Echtzeit-Datenvorschau direkt auf den Nodes.',
    descriptionEn: 'Real-time data preview directly on nodes.' },
  { id: 'iterator-vis', name: 'Iterator Visualization', nameEn: 'Iterator Visualization', source: 'Relay.app', tier: 3, enabled: true, introducedIn: 'v2',
    description: 'Klare visuelle Darstellung von Schleifen und Array-Processing.',
    descriptionEn: 'Clear visual representation of loops and array processing.' },
  { id: 'wait-steps', name: 'Wait Steps', nameEn: 'Wait Steps', source: 'Relay.app', tier: 3, enabled: true, introducedIn: 'v2',
    description: 'Visuelle Timer und Bedingungen für Warteschritte.',
    descriptionEn: 'Visual timers and conditions for wait steps.' },
  { id: 'expression-editor', name: 'Expression Editor', nameEn: 'Expression Editor', source: 'n8n', tier: 3, enabled: true, introducedIn: 'v2',
    description: 'Editor mit Variable-Browser und Syntax-Highlighting für Ausdrücke.',
    descriptionEn: 'Editor with variable browser and syntax highlighting for expressions.' },
  { id: 'custom-variables', name: 'Custom Variables', nameEn: 'Custom Variables', source: 'n8n', tier: 3, enabled: true, introducedIn: 'v2',
    description: 'Wiederverwendbare Variablen über mehrere Workflows hinweg.',
    descriptionEn: 'Reusable variables across multiple workflows.' },
  { id: 'insights-dashboard', name: 'Insights Dashboard', nameEn: 'Insights Dashboard', source: 'n8n', tier: 2, enabled: true, introducedIn: 'v2',
    description: 'Analytics mit Execution-Trends, Fehlerrate, Performance-Metriken.',
    descriptionEn: 'Analytics with execution trends, error rate, performance metrics.' },
  { id: 'workflow-versioning', name: 'Workflow Versioning', nameEn: 'Workflow Versioning', source: 'n8n', tier: 3, enabled: true, introducedIn: 'v2',
    description: 'Version History Timeline mit Rollback und Diff-View.',
    descriptionEn: 'Version history timeline with rollback and diff view.' },
  { id: 'node-clustering', name: 'Node Clustering', nameEn: 'Node Clustering', source: 'n8n', tier: 3, enabled: false, introducedIn: 'v2',
    description: 'Mehrere Nodes zu Cluster-Nodes gruppieren mit Collapse/Expand.',
    descriptionEn: 'Group multiple nodes into cluster nodes with collapse/expand.' },
  { id: 'circular-design', name: 'Circular Design', nameEn: 'Circular Design Toggle', source: 'Make.com', tier: 3, enabled: false, introducedIn: 'v2',
    description: 'Umschalten zwischen rechteckigen und runden Node-Formen.',
    descriptionEn: 'Toggle between rectangular and circular node shapes.' },
  { id: 'module-types', name: 'Modul-Typen-System', nameEn: 'Module Type System', source: 'Make.com', tier: 3, enabled: true, introducedIn: 'v2',
    description: 'Klares Typen-System mit 10 Node-Typen und visueller Kennzeichnung.',
    descriptionEn: 'Clear type system with 10 node types and visual indicators.' },
];

const V3_FEATURES: FeatureInfo[] = [
  { id: 'retry-config', name: 'Retry-Konfiguration', nameEn: 'Retry Configuration', source: 'n8n / Temporal', tier: 1, enabled: true, introducedIn: 'v3',
    description: 'Retry-Count, Delay und Backoff-Strategie (linear, exponential, jitter) pro Node. Visuelles Badge.',
    descriptionEn: 'Retry count, delay and backoff strategy (linear, exponential, jitter) per node with visual badge.' },
  { id: 'error-handlers', name: 'Error Handler Nodes', nameEn: 'Error Handler Nodes', source: 'n8n / Windmill', tier: 1, enabled: true, introducedIn: 'v3',
    description: 'Spezieller Node-Typ mit roter gestrichelter Verbindung. Fängt Fehler automatisch ab.',
    descriptionEn: 'Special node type with red dashed connection. Automatically catches errors from connected nodes.' },
  { id: 'circuit-breaker', name: 'Circuit Breaker', nameEn: 'Circuit Breaker', source: 'Temporal', tier: 1, enabled: true, introducedIn: 'v3',
    description: 'Ampel-Indikator: Grün (geschlossen), Gelb (halb-offen), Rot (offen). Stoppt nach N Fehlern.',
    descriptionEn: 'Traffic light indicator: Green (closed), Yellow (half-open), Red (open). Stops after N failures.' },
  { id: 'schema-types', name: 'Schema/Type-Visualisierung', nameEn: 'Schema/Type Visualization', source: 'Make.com / Windmill', tier: 1, enabled: true, introducedIn: 'v3',
    description: 'Farbcodierte Ports: Blau=String, Grün=Number, Lila=Object, Orange=Array, Pink=Boolean.',
    descriptionEn: 'Color-coded ports: Blue=String, Green=Number, Purple=Object, Orange=Array, Pink=Boolean.' },
  { id: 'approval-nodes', name: 'Approval / Human-in-the-Loop', nameEn: 'Approval / Human-in-the-Loop', source: 'Relay.app / n8n', tier: 1, enabled: true, introducedIn: 'v3',
    description: 'Workflow pausiert für menschliche Freigabe. Accept/Reject mit Assignee und Deadline.',
    descriptionEn: 'Workflow pauses for human approval. Accept/Reject with assignee and deadline.' },
];

// ─── V4 Features ────────────────────────────────────────────────────────

const V4_FEATURES: FeatureInfo[] = [
  { id: 'ai-agent-node', name: 'KI-Agent mit Tool-Routing', nameEn: 'AI Agent with Tool-Routing', source: 'LangChain / n8n', tier: 1, enabled: true, introducedIn: 'v4',
    description: 'Neuer Agent-Node mit verbundenen Tool-Nodes. Reasoning-Trace im Inspect-Panel.',
    descriptionEn: 'New agent node with connected tool nodes. Reasoning trace in inspect panel.' },
  { id: 'mcp-badges', name: 'MCP-Integration Badges', nameEn: 'MCP Integration Badges', source: 'Anthropic MCP', tier: 1, enabled: true, introducedIn: 'v4',
    description: 'Lila MCP-Badge auf AI/Agent-Nodes. Gestrichelte lila MCP-Verbindungen.',
    descriptionEn: 'Purple MCP badge on AI/Agent nodes. Dashed purple MCP connections.' },
  { id: 'draft-published', name: 'Draft/Published Status', nameEn: 'Draft/Published States', source: 'n8n 2.0', tier: 1, enabled: true, introducedIn: 'v4',
    description: 'Gelbes "Draft" / Grünes "Published" Badge. Publish-Button mit Bestätigung.',
    descriptionEn: 'Yellow "Draft" / Green "Published" badge. Publish button with confirmation.' },
  { id: 'breakpoints', name: 'Breakpoints & Step-Debugging', nameEn: 'Breakpoints & Step-Through', source: 'VS Code / n8n', tier: 1, enabled: true, introducedIn: 'v4',
    description: 'Rechtsklick → Breakpoint (roter Punkt). Simulation pausiert. Step Over/Continue.',
    descriptionEn: 'Right-click → breakpoint (red dot). Simulation pauses. Step Over/Continue.' },
  { id: 'parallel-lanes', name: 'Parallele Ausführung (Fork/Join)', nameEn: 'Parallel Execution (Fork/Join)', source: 'Temporal / Airflow', tier: 1, enabled: true, introducedIn: 'v4',
    description: 'Fork/Join Nodes. Mehrere Branches laufen gleichzeitig mit parallelen Execution-Bubbles.',
    descriptionEn: 'Fork/Join nodes. Multiple branches execute simultaneously with parallel bubbles.' },
  { id: 'blueprint-export', name: 'Blueprint Export/Import', nameEn: 'Blueprint Export/Import', source: 'n8n / Make.com', tier: 1, enabled: true, introducedIn: 'v4',
    description: 'Download-Button exportiert Workflow als JSON. Upload importiert mit Vorschau.',
    descriptionEn: 'Download exports workflow as JSON. Upload imports with preview.' },
  { id: 'condition-agent-node', name: 'Condition Agent Node', nameEn: 'Condition Agent Node', source: 'Flowise / Dify', tier: 2, enabled: true, introducedIn: 'v4',
    description: 'LLM-basiertes Routing mit natürlichsprachlichen Bedingungen.',
    descriptionEn: 'LLM-based routing with natural language conditions.' },
  { id: 'ai-memory-types', name: 'KI-Speichertypen', nameEn: 'AI Memory Types', source: 'LangChain', tier: 2, enabled: true, introducedIn: 'v4',
    description: 'Dropdown: Buffer/Window/Summary/Persistent. Badge zeigt Speichertyp.',
    descriptionEn: 'Dropdown: Buffer/Window/Summary/Persistent. Badge shows memory type.' },
  { id: 'error-directives', name: 'Error-Direktiven System', nameEn: 'Error Directives System', source: 'Make.com / Temporal', tier: 2, enabled: true, introducedIn: 'v4',
    description: 'Pro-Node Dropdown: Break/Continue/Rollback/Resume. Badge zeigt Strategie.',
    descriptionEn: 'Per-node dropdown: Break/Continue/Rollback/Resume. Badge shows strategy.' },
  { id: 'multiplayer-cursors', name: 'Multiplayer-Cursor (simuliert)', nameEn: 'Multiplayer Cursors (simulated)', source: 'Figma / Zapier', tier: 2, enabled: true, introducedIn: 'v4',
    description: '2-3 simulierte Cursor bewegen sich über den Canvas mit Namenslabels.',
    descriptionEn: '2-3 simulated cursors moving across the canvas with name labels.' },
];

// ─── V4 Demo Nodes ──────────────────────────────────────────────────────

const V4_NODES: LabNode[] = [
  // Intake Phase
  { id: 't1', label: 'Webhook Eingang', description: 'Neuer Lead via API empfangen', type: 'trigger', icon: 'webhook', x: 60, y: 200, status: 'idle', group: 'g-intake',
    retryConfig: { maxRetries: 3, delay: 1000, backoff: 'exponential' }, draftState: 'published',
    schemaTypes: { inputs: [], outputs: [{ name: 'leadId', type: 'string' }, { name: 'email', type: 'string' }, { name: 'company', type: 'string' }] },
    executionData: { input: { source: 'api', timestamp: '2026-02-17T10:30:00Z' }, output: { leadId: 'LD-4821', email: 'max@firma.de', company: 'TechCorp GmbH' }, duration: 120, items: 1 } },
  { id: 't2', label: 'Formular ausgefüllt', description: 'Typeform-Antwort eingegangen', type: 'trigger', icon: 'zap', x: 60, y: 370, status: 'idle', group: 'g-intake',
    draftState: 'published',
    schemaTypes: { inputs: [], outputs: [{ name: 'name', type: 'string' }, { name: 'budget', type: 'string' }, { name: 'industry', type: 'string' }] },
    executionData: { input: { formId: 'tf-392' }, output: { name: 'Max Müller', budget: '50k-100k', industry: 'SaaS' }, duration: 85, items: 1 } },
  { id: 'p1', label: 'Daten zusammenführen', description: 'Lead-Daten & Formular mergen', type: 'process', icon: 'git-merge', x: 340, y: 270, status: 'idle', group: 'g-intake',
    draftState: 'published', errorDirective: 'continue',
    schemaTypes: { inputs: [{ name: 'lead', type: 'object' }, { name: 'form', type: 'object' }], outputs: [{ name: 'merged', type: 'object' }] },
    executionData: { input: { lead: '...', form: '...' }, output: { merged: { name: 'Max Müller', email: 'max@firma.de', budget: '50k-100k' } }, duration: 45, items: 1 } },

  // AI Agent Phase
  { id: 'ag1', label: 'KI-Agent: Lead-Qualifizierung', description: 'Autonomer Agent mit Tool-Zugriff. Recherchiert Firma, prüft DB, bewertet Lead.',
    type: 'agent', icon: 'brain-circuit', x: 660, y: 170, status: 'idle', group: 'g-agent',
    mcpEnabled: true, mcpProvider: 'Anthropic Claude', memoryType: 'window', draftState: 'published',
    agentTools: ['t-search', 't-db'],
    agentReasoningTrace: [
      { step: 1, thought: 'Ich muss zuerst die Firma recherchieren, um Branche und Größe zu verstehen.', action: 'web_search("TechCorp GmbH")', result: 'SaaS-Startup, 45 MA, Series A, Berlin' },
      { step: 2, thought: 'Jetzt prüfe ich unsere DB nach früheren Kontakten mit TechCorp.', action: 'db_lookup("company=TechCorp")', result: 'Kein früherer Kontakt. Neuer Lead.' },
      { step: 3, thought: 'SaaS + Series A + 50k Budget = hoher Score. Ich vergebe 87/100.', action: 'set_score(87, tier="hot")', result: 'Score: 87, Tier: Hot Lead' },
    ],
    retryConfig: { maxRetries: 2, delay: 2000, backoff: 'exponential' },
    circuitBreaker: { status: 'closed', failures: 0, threshold: 3 },
    schemaTypes: { inputs: [{ name: 'lead', type: 'object' }], outputs: [{ name: 'score', type: 'number' }, { name: 'tier', type: 'string' }, { name: 'reasoning', type: 'string' }] },
    executionData: { input: { lead: { name: 'Max Müller', company: 'TechCorp GmbH' } }, output: { score: 87, tier: 'hot', reasoning: 'SaaS + 50k budget = high potential', tools_used: 2 }, duration: 4200, items: 1 } },
  { id: 't-search', label: 'Web-Suche', description: 'Firmen-Recherche via Google/Bing', type: 'process', icon: 'search', x: 580, y: 400, status: 'idle', group: 'g-agent',
    draftState: 'published',
    executionData: { input: { query: 'TechCorp GmbH' }, output: { results: ['SaaS-Startup', '45 MA', 'Series A'] }, duration: 800, items: 3 } },
  { id: 't-db', label: 'DB-Abfrage', description: 'CRM-Datenbank durchsuchen', type: 'process', icon: 'database', x: 820, y: 400, status: 'idle', group: 'g-agent',
    draftState: 'published',
    executionData: { input: { query: 'company=TechCorp' }, output: { found: false, message: 'Kein früherer Kontakt' }, duration: 250, items: 0 } },
  { id: 'eh1', label: 'Error Handler', description: 'Fängt Fehler von KI-Agent ab → Fallback-Scoring', type: 'error-handler', icon: 'alert-triangle', x: 660, y: 530, status: 'idle', group: 'g-agent',
    errorDirective: 'rollback',
    schemaTypes: { inputs: [{ name: 'error', type: 'object' }], outputs: [{ name: 'fallback', type: 'object' }] },
    executionData: { input: { error: { code: 'AGENT_TIMEOUT', node: 'ag1' } }, output: { fallback: { score: 50, tier: 'nurturing', source: 'rule-based' } }, duration: 15, items: 1 } },

  // Condition Agent
  { id: 'ca1', label: 'KI-Routing', description: 'LLM entscheidet: Angebot oder Nurturing?',
    type: 'condition-agent', icon: 'brain', x: 1060, y: 240, status: 'idle', group: 'g-routing',
    mcpEnabled: true, mcpProvider: 'OpenAI GPT-4', draftState: 'published',
    conditionPrompt: 'Ist dieser Lead bereit für ein direktes Angebot, oder sollte er erst durch eine Nurturing-Sequenz?',
    executionData: { input: { score: 87, tier: 'hot' }, output: { decision: 'direct_offer', confidence: 0.92, reasoning: 'Hot lead mit hohem Budget' }, duration: 1800, items: 1 } },

  // Approval
  { id: 'ap1', label: 'Manager-Freigabe', description: 'Hot-Lead erfordert Manager-Approval', type: 'approval', icon: 'user-check', x: 1360, y: 100, status: 'idle', group: 'g-actions',
    approvalState: 'waiting', approvalAssignee: 'Claudio D.', approvalDeadline: '2h',
    draftState: 'published', breakpoint: true,
    schemaTypes: { inputs: [{ name: 'lead', type: 'object' }, { name: 'score', type: 'number' }], outputs: [{ name: 'approved', type: 'boolean' }] },
    executionData: { input: { lead: 'Max Müller', score: 87 }, output: { approved: true, approver: 'Claudio D.', decision_time: '12min' }, duration: 720000, items: 1 } },

  // Fork/Join Parallel
  { id: 'fk1', label: 'Parallel Split', description: 'Teilt in 3 parallele Lanes: CRM, Angebot, Notification',
    type: 'fork', icon: 'git-fork', x: 1620, y: 240, status: 'idle',
    parallelLanes: ['lane-crm', 'lane-proposal', 'lane-notify'], draftState: 'published',
    executionData: { input: { source: 'approved_lead' }, output: { lanes: 3, started: true }, duration: 5, items: 3 } },
  { id: 'p2', label: 'CRM-Eintrag', description: 'Hot-Lead in HubSpot als Opportunity anlegen', type: 'process', icon: 'database', x: 1870, y: 80, status: 'idle',
    parallelLaneId: 'lane-crm', retryConfig: { maxRetries: 3, delay: 500, backoff: 'linear' }, errorDirective: 'resume', draftState: 'published',
    schemaTypes: { inputs: [{ name: 'leadId', type: 'string' }], outputs: [{ name: 'hubspotId', type: 'string' }] },
    executionData: { input: { leadId: 'LD-4821', tier: 'hot' }, output: { hubspotId: 'HS-9921', dealStage: 'Qualified' }, duration: 320, items: 1 } },
  { id: 'a2', label: 'KI: Angebots-Entwurf', description: 'Personalisiertes Angebot basierend auf Lead-Profil', type: 'ai', icon: 'bot', x: 1870, y: 240, status: 'idle',
    parallelLaneId: 'lane-proposal', mcpEnabled: true, mcpProvider: 'Claude', memoryType: 'summary',
    retryConfig: { maxRetries: 2, delay: 3000, backoff: 'jitter' }, circuitBreaker: { status: 'closed', failures: 0, threshold: 5 }, draftState: 'published',
    schemaTypes: { inputs: [{ name: 'profile', type: 'object' }], outputs: [{ name: 'proposal', type: 'string' }, { name: 'pdf_url', type: 'string' }] },
    executionData: { input: { profile: '...' }, output: { proposal: 'Sehr geehrter Herr Müller...', pdf_url: '/proposals/P-4821.pdf' }, duration: 3200, items: 1 } },
  { id: 'o1', label: 'Slack Notification', description: 'Sales-Team in #leads informieren', type: 'output', icon: 'zap', x: 1870, y: 400, status: 'idle',
    parallelLaneId: 'lane-notify', draftState: 'published',
    executionData: { input: { channel: '#leads' }, output: { messageId: 'msg-8832', sent: true }, duration: 210, items: 1 } },
  { id: 'jn1', label: 'Ergebnisse zusammenführen', description: 'Wartet auf alle 3 parallelen Pfade',
    type: 'join', icon: 'git-merge', x: 2150, y: 240, status: 'idle', draftState: 'published',
    executionData: { input: { lanes: ['crm', 'proposal', 'notify'] }, output: { allComplete: true, duration_total: '3.7s' }, duration: 10, items: 3 } },

  // Post-Join
  { id: 'rt1', label: 'Verteiler', description: 'Route: E-Mail, Dashboard, Follow-Up', type: 'router', icon: 'split', x: 2380, y: 240, status: 'idle', draftState: 'published',
    executionData: { input: { leadTier: 'hot' }, output: { routes: ['email', 'dashboard', 'followup'], activeRoutes: 3 }, duration: 15, items: 3 } },
  { id: 'o2', label: 'E-Mail senden', description: 'Angebot + PDF an Lead verschicken', type: 'output', icon: 'globe', x: 2620, y: 120, status: 'idle',
    retryConfig: { maxRetries: 5, delay: 2000, backoff: 'exponential' }, draftState: 'published',
    executionData: { input: { to: 'max@firma.de' }, output: { sent: true, messageId: 'em-4421' }, duration: 450, items: 1 } },
  { id: 'o3', label: 'Dashboard Update', description: 'KPI-Tracking & Conversion-Daten', type: 'output', icon: 'bar-chart', x: 2620, y: 260, status: 'idle', draftState: 'published',
    executionData: { input: { metric: 'new_lead' }, output: { updated: true, totalLeads: 847 }, duration: 95, items: 1 } },
  { id: 's1', label: 'Follow-Up Automation', description: 'Sub-Workflow · 8 Nodes · E-Mail-Sequenz, Reminder, Eskalation', type: 'subsystem', icon: 'layers', x: 2620, y: 380, status: 'idle',
    draftState: 'draft',
    executionData: { input: { leadId: 'LD-4821' }, output: { sequenceStarted: true, nextEmail: '2026-02-18T09:00:00Z' }, duration: 180, items: 1 } },
];

const V4_CONNECTIONS: LabConnection[] = [
  { from: 't1', to: 'p1' }, { from: 't2', to: 'p1' },
  { from: 'p1', to: 'ag1' },
  { from: 'ag1', to: 't-search', label: 'Tool', pathType: 'tool' },
  { from: 'ag1', to: 't-db', label: 'Tool', pathType: 'tool' },
  { from: 'ag1', to: 'eh1', label: 'Error', pathType: 'error' },
  { from: 'ag1', to: 'ca1' },
  { from: 'ca1', to: 'ap1', label: 'Angebot', pathType: 'true' },
  { from: 'ca1', to: 's1', label: 'Nurturing', pathType: 'false' },
  { from: 'ap1', to: 'fk1', label: 'Approved', pathType: 'true' },
  { from: 'fk1', to: 'p2', label: 'Lane 1', pathType: 'parallel' },
  { from: 'fk1', to: 'a2', label: 'Lane 2', pathType: 'parallel' },
  { from: 'fk1', to: 'o1', label: 'Lane 3', pathType: 'parallel' },
  { from: 'p2', to: 'jn1' }, { from: 'a2', to: 'jn1' }, { from: 'o1', to: 'jn1' },
  { from: 'jn1', to: 'rt1' },
  { from: 'rt1', to: 'o2' }, { from: 'rt1', to: 'o3' }, { from: 'rt1', to: 's1' },
];

const V4_GROUPS: LabGroup[] = [
  { id: 'g-intake',   label: 'Intake',             color: 'rgba(59,130,246,0.06)',  x: 30,   y: 160, w: 570, h: 290 },
  { id: 'g-agent',    label: 'AI Agent + Tools',    color: 'rgba(124,58,237,0.06)', x: 550,  y: 130, w: 570, h: 470 },
  { id: 'g-routing',  label: 'AI Routing',          color: 'rgba(168,85,247,0.06)', x: 1030, y: 190, w: 280, h: 160 },
  { id: 'g-actions',  label: 'Approval & Actions',  color: 'rgba(139,92,246,0.06)', x: 1330, y: 50,  w: 280, h: 200 },
  { id: 'g-parallel', label: 'Parallel Execution',  color: 'rgba(14,165,233,0.04)', x: 1590, y: 40,  w: 600, h: 440 },
];

const V4_ANNOTATIONS: Annotation[] = [
  { id: 'ann-1', x: 580, y: 560, text: 'Tool-Nodes leuchten auf\nwenn Agent sie nutzt', color: '#ede9fe' },
  { id: 'ann-2', x: 1060, y: 380, text: 'KI-Routing: LLM\nentscheidet Pfad', color: '#fae8ff' },
  { id: 'ann-3', x: 1620, y: 460, text: 'Fork/Join: 3 Lanes\nlaufen parallel', color: '#e0f2fe' },
  { id: 'ann-4', x: 2620, y: 480, text: 'Follow-Up ist noch\nim Draft-Modus', color: '#fef3c7' },
];

const V4_NODE_EN: Record<string, { label: string; description: string }> = {
  ag1: { label: 'AI Agent: Lead Qualification', description: 'Autonomous agent with tool access. Researches company, checks DB, scores lead.' },
  't-search': { label: 'Web Search', description: 'Company research via Google/Bing' },
  't-db': { label: 'DB Query', description: 'Search CRM database' },
  ca1: { label: 'AI Routing', description: 'LLM decides: Offer or Nurturing?' },
  fk1: { label: 'Parallel Split', description: 'Splits into 3 parallel lanes: CRM, Proposal, Notification' },
  jn1: { label: 'Join Results', description: 'Waits for all 3 parallel paths to complete' },
};

// ─── Mock Variables ─────────────────────────────────────────────────────────

const MOCK_VARIABLES = [
  { name: 'API_KEY', value: 'sk-***...***f8a2', scope: 'global' },
  { name: 'SLACK_CHANNEL', value: '#leads', scope: 'workflow' },
  { name: 'SCORE_THRESHOLD', value: '70', scope: 'workflow' },
  { name: 'EMAIL_TEMPLATE', value: 'welcome-v2', scope: 'workflow' },
];

// ─── Mock Workflow Versions ──────────────────────────────────────────────

const MOCK_VERSIONS = [
  { id: 'v-1', version: '1.4.0', timestamp: '2026-02-17 10:30', author: 'Claudio', status: 'current' as const, changes: [
    { type: 'added' as const, desc: 'Router-Node für Multi-Channel-Verteilung' },
    { type: 'modified' as const, desc: 'KI-Score-Schwellenwert von 60 auf 70 erhöht' },
    { type: 'added' as const, desc: 'Wartezeit-Node mit Manager-Approval' },
  ]},
  { id: 'v-2', version: '1.3.0', timestamp: '2026-02-16 14:15', author: 'Claudio', status: 'published' as const, changes: [
    { type: 'modified' as const, desc: 'E-Mail-Template auf welcome-v2 aktualisiert' },
    { type: 'removed' as const, desc: 'Alte Slack-Integration entfernt' },
  ]},
  { id: 'v-3', version: '1.2.1', timestamp: '2026-02-15 09:45', author: 'Max', status: 'published' as const, changes: [
    { type: 'modified' as const, desc: 'CRM-Mapping-Felder angepasst' },
  ]},
  { id: 'v-4', version: '1.2.0', timestamp: '2026-02-14 16:20', author: 'Claudio', status: 'published' as const, changes: [
    { type: 'added' as const, desc: 'Iterator für Batch-Verarbeitung' },
    { type: 'added' as const, desc: 'Merge-Node für Pfad-Zusammenführung' },
    { type: 'modified' as const, desc: 'If-Else Routing implementiert' },
  ]},
  { id: 'v-5', version: '1.1.0', timestamp: '2026-02-13 11:00', author: 'Max', status: 'published' as const, changes: [
    { type: 'added' as const, desc: 'KI-Analyse Node hinzugefügt' },
    { type: 'added' as const, desc: 'Angebots-Entwurf Generator' },
  ]},
  { id: 'v-6', version: '1.0.0', timestamp: '2026-02-12 08:30', author: 'Claudio', status: 'published' as const, changes: [
    { type: 'added' as const, desc: 'Initiales Workflow-Setup mit Webhook + CRM' },
  ]},
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
  const [hoveredPreviewNodeId, setHoveredPreviewNodeId] = useState<string | null>(null);
  const [showVersioning, setShowVersioning] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
  const [showVersionDiff, setShowVersionDiff] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalNodeId, setApprovalNodeId] = useState<string | null>(null);

  // V4 State
  const [debugMode, setDebugMode] = useState(false);
  const [showBlueprintExport, setShowBlueprintExport] = useState(false);
  const [showBlueprintImport, setShowBlueprintImport] = useState(false);
  const [agentReasoningStep, setAgentReasoningStep] = useState(0);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [debugPausedAt, setDebugPausedAt] = useState<string | null>(null);
  const [multiplayerCursors, setMultiplayerCursors] = useState<MultiplayerCursor[]>([
    { id: 'mc1', name: 'Max M.', color: '#3b82f6', x: 800, y: 300 },
    { id: 'mc2', name: 'Lisa K.', color: '#10b981', x: 1400, y: 150 },
    { id: 'mc3', name: 'Tim R.', color: '#f59e0b', x: 2000, y: 350 },
  ]);

  // Editor state
  // @ts-ignore: reserved for editor features
  const [dragState, setDragState] = useState<{ nodeId: string; offsetX: number; offsetY: number } | null>(null);
  // @ts-ignore: reserved for editor features
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  // @ts-ignore: reserved for editor features
  const [selectedConnIdx, setSelectedConnIdx] = useState<number | null>(null);
  // @ts-ignore: reserved for editor features
  const [connectState, setConnectState] = useState<{ fromId: string; fromX: number; fromY: number } | null>(null);
  // @ts-ignore: reserved for editor features
  const [connectMouse, setConnectMouse] = useState<{ x: number; y: number } | null>(null);
  // @ts-ignore: reserved for editor features
  const [showAddMenu, setShowAddMenu] = useState<{ x: number; y: number; canvasX: number; canvasY: number } | null>(null);
  // @ts-ignore: reserved for editor features
  const [hoveredNodeIdForPorts, setHoveredNodeIdForPorts] = useState<string | null>(null);
  // @ts-ignore: reserved for editor features
  const undoStackRef = useRef<{ nodes: LabNode[]; conns: LabConnection[] }[]>([]);
  // @ts-ignore: reserved for editor features
  const redoStackRef = useRef<{ nodes: LabNode[]; conns: LabConnection[] }[]>([]);
  // @ts-ignore: reserved for editor features
  const [canUndo, setCanUndo] = useState(false);
  // @ts-ignore: reserved for editor features
  const [canRedo, setCanRedo] = useState(false);

  // Replay state
  const [replayActive, setReplayActive] = useState(false);
  const [replayStep, setReplayStep] = useState(0);
  const replayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Feature enabled check
  const isFeatureOn = useCallback((id: string) => features.find(f => f.id === id)?.enabled ?? false, [features]);

  // ─── Editor Helpers ───────────────────────────────────────────────
  // @ts-ignore: reserved for editor features
  const screenToCanvas = useCallback((clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: (clientX - rect.left - pan.x) / zoom, y: (clientY - rect.top - pan.y) / zoom };
  }, [zoom, pan]);

  // ─── Version Switch ─────────────────────────────────────────────────
  useEffect(() => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
    setIsRunning(false);
    setReplayActive(false);
    setInspectNode(null);
    setContextMenu(null);
    setShowApprovalModal(false);
    setApprovalNodeId(null);
    if (version === 'v1') {
      setNodes(V1_NODES.map(n => ({ ...n, status: 'idle' as LabNodeStatus })));
      setAnnotations([]);
      setFeatures(FEATURES);
      setZoom(0.85);
      setPan({ x: 0, y: 0 });
    } else if (version === 'v2') {
      setNodes(V2_NODES.map(n => ({ ...n, status: 'idle' as LabNodeStatus })));
      setAnnotations(DEFAULT_ANNOTATIONS);
      setFeatures(FEATURES);
      setZoom(0.65);
      setPan({ x: 20, y: 20 });
    } else if (version === 'v3') {
      setNodes(V3_NODES.map(n => ({ ...n, status: 'idle' as LabNodeStatus })));
      setAnnotations(V3_ANNOTATIONS);
      setFeatures([...FEATURES, ...V3_FEATURES]);
      setZoom(0.55);
      setPan({ x: 20, y: 20 });
    } else {
      setNodes(V4_NODES.map(n => ({ ...n, status: 'idle' as LabNodeStatus })));
      setAnnotations(V4_ANNOTATIONS);
      setFeatures([...FEATURES, ...V3_FEATURES, ...V4_FEATURES]);
      setZoom(0.42);
      setPan({ x: 20, y: 20 });
      setDebugMode(false);
      setAgentReasoningStep(0);
    }
  }, [version]);

  // Inject CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = LAB_CSS;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // V4: Animate multiplayer cursors
  useEffect(() => {
    if (version !== 'v4') return;
    const interval = setInterval(() => {
      setMultiplayerCursors(prev => prev.map(c => ({
        ...c,
        x: 400 + Math.random() * 2000,
        y: 100 + Math.random() * 400,
      })));
    }, 3500);
    return () => clearInterval(interval);
  }, [version]);

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
    : version === 'v2'
    ? ['t1', 't2', 'p1', 'a1', 'ie1', 'p2', 'a2', 'mg1', 'it1', 'w1', 'rt1', 'o1', 'o2', 'o3', 's1']
    : version === 'v3'
    ? ['t1', 't2', 'p1', 'a1', 'ie1', 'ap1', 'p2', 'a2', 'mg1', 'it1', 'w1', 'rt1', 'o1', 'o2', 'o3', 's1']
    : ['t1', 't2', 'p1', 'ag1', 'ca1', 'ap1', 'fk1', 'p2', 'a2', 'o1', 'jn1', 'rt1', 'o2', 'o3', 's1'];

  const runSimulation = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle' as LabNodeStatus, ...(n.circuitBreaker ? { circuitBreaker: { ...n.circuitBreaker, status: 'closed' as CircuitBreakerStatus, failures: 0 } } : {}), ...(n.approvalState ? { approvalState: 'waiting' as const } : {}) })));
    setAgentReasoningStep(0);

    // V4 uses special parallel simulation
    if (version === 'v4') {
      let delay = 200;
      const seqPart1 = ['t1', 't2', 'p1', 'ag1', 'ca1', 'ap1', 'fk1'];
      const parallelNodes = ['p2', 'a2', 'o1'];
      const seqPart2 = ['jn1', 'rt1', 'o2', 'o3', 's1'];
      const pushT = (fn: () => void, d: number) => { timersRef.current.push(setTimeout(fn, d)); };

      seqPart1.forEach((id) => {
        pushT(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'pending' } : n)), delay);
        delay += 250;
        pushT(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'running' } : n)), delay);

        // Agent node: light up tools + reasoning trace
        if (id === 'ag1') {
          pushT(() => setNodes(prev => prev.map(n => n.id === 't-search' ? { ...n, status: 'running' } : n)), delay + 500);
          pushT(() => setNodes(prev => prev.map(n => n.id === 't-search' ? { ...n, status: 'completed' } : n)), delay + 1200);
          pushT(() => setNodes(prev => prev.map(n => n.id === 't-db' ? { ...n, status: 'running' } : n)), delay + 1500);
          pushT(() => setNodes(prev => prev.map(n => n.id === 't-db' ? { ...n, status: 'completed' } : n)), delay + 2200);
          pushT(() => setAgentReasoningStep(1), delay + 800);
          pushT(() => setAgentReasoningStep(2), delay + 1800);
          pushT(() => setAgentReasoningStep(3), delay + 2800);
        }

        const nodeDuration = id === 'ag1' ? 3500 : id === 'ap1' ? 2000 : id === 'ca1' ? 1800 : 600;
        delay += nodeDuration;

        // After approval, update state
        if (id === 'ap1') {
          pushT(() => setNodes(prev => prev.map(n => n.id === 'ap1' ? { ...n, approvalState: 'approved' as const } : n)), delay - 200);
        }

        pushT(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'completed' } : n)), delay);

        // Error handler flash after agent
        if (id === 'ag1') {
          pushT(() => setNodes(prev => prev.map(n => n.id === 'eh1' ? { ...n, status: 'pending' as LabNodeStatus } : n)), delay + 100);
          pushT(() => setNodes(prev => prev.map(n => n.id === 'eh1' ? { ...n, status: 'skipped' as LabNodeStatus } : n)), delay + 600);
          // Circuit breaker flash
          pushT(() => setNodes(prev => prev.map(n => n.id === 'ag1' && n.circuitBreaker ? { ...n, circuitBreaker: { ...n.circuitBreaker, status: 'half-open' as CircuitBreakerStatus, failures: 1 } } : n)), delay - 300);
          pushT(() => setNodes(prev => prev.map(n => n.id === 'ag1' && n.circuitBreaker ? { ...n, circuitBreaker: { ...n.circuitBreaker, status: 'closed' as CircuitBreakerStatus, failures: 0 } } : n)), delay + 300);
        }
        delay += 80;
      });

      // Parallel: all start simultaneously
      parallelNodes.forEach(id => pushT(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'pending' } : n)), delay));
      delay += 200;
      parallelNodes.forEach(id => pushT(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'running' } : n)), delay));
      const pDur: Record<string, number> = { p2: 800, o1: 600, a2: 2000 };
      parallelNodes.forEach(id => pushT(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'completed' } : n)), delay + (pDur[id] || 800)));
      delay += Math.max(...Object.values(pDur)) + 200;

      // Sequential part 2
      seqPart2.forEach((id, i) => {
        pushT(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'pending' } : n)), delay);
        delay += 250;
        pushT(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'running' } : n)), delay);
        delay += id.startsWith('a') ? 1500 : 600;
        pushT(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'completed' } : n)), delay);
        delay += 80;
        if (i === seqPart2.length - 1) pushT(() => setIsRunning(false), delay + 400);
      });
      return;
    }

    // V1/V2/V3 simulation
    let delay = 200;
    executionOrder.forEach((id, i) => {
      const t1 = setTimeout(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'pending' } : n)), delay);
      timersRef.current.push(t1);
      delay += 250;
      const t2 = setTimeout(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'running' } : n)), delay);
      timersRef.current.push(t2);

      const nodeDuration = id === 'ap1' ? 2000 : id.startsWith('a') ? 1500 : id.startsWith('w') ? 1200 : 600;
      delay += nodeDuration;

      if (version === 'v3' && id === 'a1') {
        const cbFlash1 = setTimeout(() => setNodes(prev => prev.map(n => n.id === 'a1' && n.circuitBreaker ? { ...n, circuitBreaker: { ...n.circuitBreaker, status: 'half-open' as CircuitBreakerStatus, failures: 1 } } : n)), delay - 400);
        timersRef.current.push(cbFlash1);
        const cbFlash2 = setTimeout(() => setNodes(prev => prev.map(n => n.id === 'a1' && n.circuitBreaker ? { ...n, circuitBreaker: { ...n.circuitBreaker, status: 'closed' as CircuitBreakerStatus, failures: 0 } } : n)), delay + 200);
        timersRef.current.push(cbFlash2);
      }

      if (version === 'v3' && id === 'ap1') {
        const apWait = setTimeout(() => setNodes(prev => prev.map(n => n.id === 'ap1' ? { ...n, approvalState: 'approved' as const } : n)), delay - 200);
        timersRef.current.push(apWait);
      }

      const t3 = setTimeout(() => setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'completed' } : n)), delay);
      timersRef.current.push(t3);

      if (version === 'v3' && id === 'a1') {
        const ehPend = setTimeout(() => setNodes(prev => prev.map(n => n.id === 'eh1' ? { ...n, status: 'pending' as LabNodeStatus } : n)), delay + 100);
        timersRef.current.push(ehPend);
        const ehSkip = setTimeout(() => setNodes(prev => prev.map(n => n.id === 'eh1' ? { ...n, status: 'skipped' as LabNodeStatus } : n)), delay + 600);
        timersRef.current.push(ehSkip);
      }

      delay += 80;
      if (i === executionOrder.length - 1) {
        const tEnd = setTimeout(() => setIsRunning(false), delay + 400);
        timersRef.current.push(tEnd);
      }
    });
  }, [isRunning, executionOrder, version]);

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
  const allEN = version === 'v4' ? { ...NODE_EN, ...V4_NODE_EN } : NODE_EN;
  const getLabel = (node: LabNode) => (lang === 'en' && allEN[node.id]) ? allEN[node.id].label : node.label;
  const getDesc = (node: LabNode) => (lang === 'en' && allEN[node.id]) ? allEN[node.id].description : node.description;
  const isDark = document.documentElement.classList.contains('dark');
  const currentConns = version === 'v1' ? V1_CONNECTIONS : version === 'v3' ? V3_CONNECTIONS : version === 'v4' ? V4_CONNECTIONS : connections;
  const currentGroups = version === 'v3' ? V3_GROUPS : version === 'v4' ? V4_GROUPS : groups;

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
      {version !== 'v1' && isFeatureOn('roi-dashboard') && (
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
              {version === 'v1' ? 'V1 — Basic' : version === 'v2' ? 'V2 — Full Features' : version === 'v3' ? 'V3 — Resilience & Types' : 'V4 — Agents & Parallel'}
              <ChevronDown size={12} />
            </button>
            {versionDropOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setVersionDropOpen(false)} />
                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-gray-200 dark:border-zinc-700 z-40 overflow-hidden">
                  {[
                    { v: 'v1' as LabVersion, label: 'V1 — Basic', desc: lang === 'de' ? '10 Nodes, Standard-Simulation' : '10 Nodes, standard simulation' },
                    { v: 'v2' as LabVersion, label: 'V2 — Full Features', desc: lang === 'de' ? '15 Nodes, 22 Features, alle Node-Typen' : '15 Nodes, 22 features, all node types' },
                    { v: 'v3' as LabVersion, label: 'V3 — Resilience & Types', desc: lang === 'de' ? '17 Nodes, 27 Features, Error Handling & Schema Types' : '17 Nodes, 27 features, error handling & schema types' },
                    { v: 'v4' as LabVersion, label: 'V4 — Agents & Parallel', desc: lang === 'de' ? '23 Nodes, 37 Features, AI Agents, Fork/Join & MCP' : '23 Nodes, 37 features, AI agents, fork/join & MCP' },
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
          {version !== 'v1' && (
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
              <button onClick={() => setShowVersioning(!showVersioning)} title={lang === 'de' ? 'Versionsverlauf' : 'Version History'}
                className={`p-2 rounded-lg text-xs transition-colors ${showVersioning ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600' : 'hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500'}`}>
                <GitBranch size={15} />
              </button>
              <div className="w-px h-5 bg-gray-300 dark:bg-zinc-700 mx-1" />
            </>
          )}

          {/* V4 Toolbar buttons */}
          {version === 'v4' && (
            <>
              <button onClick={() => setDebugMode(!debugMode)} title={lang === 'de' ? 'Debug-Modus' : 'Debug Mode'}
                className={`p-2 rounded-lg text-xs transition-colors ${debugMode ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500'}`}>
                <Bug size={15} />
              </button>
              <button onClick={() => setShowBlueprintExport(true)} title={lang === 'de' ? 'Blueprint exportieren' : 'Export Blueprint'}
                className="p-2 rounded-lg text-xs hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500 transition-colors">
                <Download size={15} />
              </button>
              <button onClick={() => setShowBlueprintImport(true)} title={lang === 'de' ? 'Blueprint importieren' : 'Import Blueprint'}
                className="p-2 rounded-lg text-xs hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500 transition-colors">
                <Upload size={15} />
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
        {showFeatureLog && version !== 'v1' && (
          <div className="w-80 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-y-auto shrink-0">
            <div className="p-3 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold">{lang === 'de' ? 'Feature-Log' : 'Feature Log'}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[10px] text-gray-500 dark:text-zinc-500">
                    {lang === 'de' ? `${features.filter(f => f.enabled).length}/${features.length} aktiv` : `${features.filter(f => f.enabled).length}/${features.length} active`}
                  </p>
                  {version === 'v3' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 font-medium">
                      +{features.filter(f => f.introducedIn === 'v3').length} {lang === 'de' ? 'neu in V3' : 'new in V3'}
                    </span>
                  )}
                  {version === 'v4' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 font-medium">
                      +{features.filter(f => f.introducedIn === 'v4').length} {lang === 'de' ? 'neu in V4' : 'new in V4'}
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => setShowFeatureLog(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><X size={14} /></button>
            </div>
            {[1, 2, 3].map(tier => {
              const versionOrder: Record<string, number> = { v4: 0, v3: 1, v2: 2, v1: 3 };
              const tierFeatures = features.filter(f => f.tier === tier).sort((a, b) => (versionOrder[a.introducedIn] ?? 9) - (versionOrder[b.introducedIn] ?? 9));
              if (tierFeatures.length === 0) return null;
              return (
              <div key={tier}>
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 bg-gray-50 dark:bg-zinc-900">
                  Tier {tier} {tier === 1 ? (lang === 'de' ? '— Höchster Impact' : '— Highest Impact') : tier === 2 ? (lang === 'de' ? '— Post-MVP' : '— Post-MVP') : (lang === 'de' ? '— Nice-to-Have' : '— Nice-to-Have')}
                </div>
                {tierFeatures.map(f => {
                  const isNew = f.introducedIn === version;
                  return (
                  <div key={f.id} className={`px-3 py-2.5 border-b border-gray-100 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors ${isNew ? 'border-l-2 border-l-purple-500 bg-purple-50/40 dark:bg-purple-500/5' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <button
                          onClick={() => toggleFeature(f.id)}
                          className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${f.enabled ? 'bg-purple-500' : 'bg-gray-300 dark:bg-zinc-600'}`}
                        >
                          <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${f.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                        <span className="text-xs font-medium truncate">{lang === 'en' ? f.nameEn : f.name}</span>
                        {isNew && <span className="text-[8px] px-1 py-px rounded bg-purple-500 text-white font-bold shrink-0 uppercase">New</span>}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${f.introducedIn === 'v4' ? 'bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400' : f.introducedIn === 'v3' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' : 'bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400'}`}>
                          {f.introducedIn.toUpperCase()}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400">{f.source}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-zinc-500 mt-1 leading-relaxed pl-10">
                      {lang === 'en' ? f.descriptionEn : f.description}
                    </p>
                  </div>
                  );
                })}
              </div>
              );
            })}
          </div>
        )}

        {/* ── HISTORY SIDEBAR ── */}
        {showHistory && version !== 'v1' && isFeatureOn('execution-history') && (
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
              {version !== 'v1' && showGroups && isFeatureOn('grouped-nodes') && currentGroups.map(g => (
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
              {version !== 'v1' && showAnnotations && isFeatureOn('annotations') && annotations.map(ann => (
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
                  const isErrorPath = conn.pathType === 'error';
                  const isMcpPath = conn.pathType === 'mcp';
                  const isToolPath = conn.pathType === 'tool';
                  const isParallelPath = conn.pathType === 'parallel';
                  const pathColor = isErrorPath ? '#ef4444'
                    : isMcpPath ? '#7c3aed'
                    : isToolPath ? '#7c3aed80'
                    : isParallelPath ? '#0ea5e9'
                    : conn.pathType === 'true' ? '#10b981'
                    : conn.pathType === 'false' ? '#f59e0b'
                    : conn.pathType === 'loop' ? '#a855f7'
                    : isActive ? NODE_STYLES[fromNode.type].accent
                    : (isDark ? 'rgba(113,113,122,0.25)' : 'rgba(156,163,175,0.35)');
                  const dashArr = isErrorPath ? '6 4' : isMcpPath ? '4 6' : isToolPath ? '3 5' : isParallelPath ? '8 4' : undefined;
                  const connClass = (isActive && !isErrorPath && !isMcpPath && !isToolPath) ? 'lab-connection-active' : isMcpPath ? 'lab-mcp-connection' : '';
                  const labelPos = conn.label ? getLabelPos(fromNode, toNode) : null;
                  const labelColor = isErrorPath ? '#ef4444' : isMcpPath ? '#7c3aed' : isParallelPath ? '#0ea5e9' : isToolPath ? '#7c3aed' : conn.pathType === 'true' ? '#10b981' : conn.pathType === 'false' ? '#f59e0b' : (isDark ? '#a1a1aa' : '#6b7280');
                  return (
                    <g key={i}>
                      <path
                        d={getPath(fromNode, toNode)}
                        fill="none"
                        stroke={pathColor}
                        strokeWidth={isErrorPath ? 2 : isMcpPath ? 1.5 : isToolPath ? 1.5 : isActive ? 2.5 : 1.5}
                        strokeLinecap="round"
                        strokeDasharray={dashArr}
                        className={connClass}
                        style={{ transition: 'stroke 0.5s, stroke-width 0.3s' }}
                      />
                      {conn.label && labelPos && (
                        <text x={labelPos.x} y={labelPos.y} textAnchor="middle" fontSize="9" fontWeight="600" fill={labelColor}>
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
                const approvalClass = node.type === 'approval' && node.approvalState === 'waiting' && node.status === 'running' ? 'lab-node-approval-waiting' : '';

                return (
                  <div key={node.id}>
                    <div
                      className={`absolute border backdrop-blur-sm select-none transition-all duration-500 ${statusClass} ${pinnedClass} ${circClass} ${approvalClass}`}
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
                        if (version !== 'v1' && isFeatureOn('click-to-inspect')) setInspectNode(node);
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault(); e.stopPropagation();
                        if (version !== 'v1' && isFeatureOn('partial-execution')) {
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
                      ) : node.type === 'error-handler' ? (
                        <div className="h-full flex items-center px-3.5 gap-3 relative">
                          <div className="absolute inset-1.5 rounded-lg border-2 border-dashed pointer-events-none" style={{ borderColor: '#ef444440' }} />
                          <div className="rounded-lg flex items-center justify-center shrink-0 relative z-10" style={{ width: 36, height: 36, background: '#ef444418' }}>
                            {renderIcon(node.icon, size.iconSize)}
                          </div>
                          <div className="min-w-0 flex-1 relative z-10">
                            <div className="font-medium truncate text-gray-900 dark:text-white" style={{ fontSize: size.fontSize }}>{getLabel(node)}</div>
                            <div className="mt-0.5 truncate text-gray-500 dark:text-zinc-500" style={{ fontSize: size.descSize }}>{getDesc(node)}</div>
                          </div>
                        </div>
                      ) : node.type === 'approval' ? (
                        <div
                          className="h-full flex items-center px-4 gap-3 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (version === 'v3' && isFeatureOn('approval-nodes')) {
                              setApprovalNodeId(node.id);
                              setShowApprovalModal(true);
                            }
                          }}
                        >
                          <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 42, height: 42, background: '#f59e0b18' }}>
                            {renderIcon(node.icon, size.iconSize)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold truncate text-gray-900 dark:text-white" style={{ fontSize: size.fontSize }}>{getLabel(node)}</div>
                            <div className="mt-0.5 truncate text-gray-500 dark:text-zinc-500" style={{ fontSize: size.descSize }}>{getDesc(node)}</div>
                            {node.approvalAssignee && (
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium">{node.approvalAssignee}</span>
                                {node.approvalDeadline && <span className="text-[9px] text-gray-400"><Clock size={8} className="inline mr-0.5" />{node.approvalDeadline}</span>}
                              </div>
                            )}
                          </div>
                          {node.approvalState === 'approved' && <CheckCircle2 size={18} className="text-green-500 shrink-0" />}
                          {node.approvalState === 'rejected' && <XCircle size={18} className="text-red-500 shrink-0" />}
                          {node.approvalState === 'waiting' && node.status !== 'completed' && <Hand size={18} className="text-amber-500 shrink-0 animate-pulse" />}
                        </div>
                      ) : node.type === 'agent' ? (
                        <div className="h-full flex items-center px-5 gap-4 relative">
                          <div className="absolute inset-0 rounded-[18px] pointer-events-none" style={{ background: `radial-gradient(ellipse at 30% 50%, ${nStyle.accent}10, transparent 70%)` }} />
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 relative z-10" style={{ background: nStyle.accent + '18' }}>
                            {renderIcon(node.icon, size.iconSize)}
                            {node.mcpEnabled && isFeatureOn('mcp-badges') && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center lab-mcp-badge">
                                <Plug size={8} className="text-white" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1 relative z-10">
                            <div className="font-bold truncate text-gray-900 dark:text-white" style={{ fontSize: size.fontSize }}>{getLabel(node)}</div>
                            <div className="mt-1 line-clamp-2 leading-tight text-gray-500 dark:text-zinc-500" style={{ fontSize: size.descSize }}>{getDesc(node)}</div>
                            {node.agentTools && node.agentTools.length > 0 && (
                              <div className="flex items-center gap-1 mt-1.5">
                                <span className="text-[8px] text-gray-400">Tools:</span>
                                {node.agentTools.map(toolId => {
                                  const tn = nodes.find(n => n.id === toolId);
                                  return tn ? <span key={toolId} className="text-[8px] px-1 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">{getLabel(tn)}</span> : null;
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (node.type === 'fork' || node.type === 'join') ? (
                        <div className="h-full flex flex-col items-center justify-center text-center px-2">
                          <div className="rounded-full flex items-center justify-center mb-1" style={{ width: 32, height: 32, background: nStyle.accent + '18' }}>
                            {renderIcon(node.icon, size.iconSize)}
                          </div>
                          <div className="font-medium truncate w-full text-gray-900 dark:text-white" style={{ fontSize: size.fontSize }}>{getLabel(node)}</div>
                          {node.type === 'fork' && node.parallelLanes && (
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 z-20">
                              {node.parallelLanes.length} lanes
                            </div>
                          )}
                        </div>
                      ) : node.type === 'condition-agent' ? (
                        <div className="h-full flex items-center px-4 gap-3 relative">
                          <div className="rounded-xl flex items-center justify-center shrink-0 relative" style={{ width: 40, height: 40, background: nStyle.accent + '18' }}>
                            {renderIcon(node.icon, size.iconSize)}
                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center">
                              <Sparkles size={8} className="text-white" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold truncate text-gray-900 dark:text-white" style={{ fontSize: size.fontSize }}>{getLabel(node)}</div>
                            <div className="mt-0.5 line-clamp-2 leading-tight text-gray-500 dark:text-zinc-500" style={{ fontSize: size.descSize }}>{getDesc(node)}</div>
                            {node.conditionPrompt && (
                              <div className="text-[8px] italic text-purple-400 mt-1 truncate">"{node.conditionPrompt.slice(0, 50)}..."</div>
                            )}
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
                      {version !== 'v1' && showBubbles && isFeatureOn('execution-bubbles') && node.status === 'completed' && node.executionData && (
                        <div className="absolute -top-3 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white z-30 lab-bubble"
                          style={{ background: '#10b981' }}>
                          {node.executionData.items}
                        </div>
                      )}

                      {/* Iterator progress indicator */}
                      {version !== 'v1' && isFeatureOn('iterator-vis') && node.type === 'iterator' && node.status === 'completed' && node.executionData && (
                        <div className="absolute -bottom-1 left-2 right-2 h-1.5 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden z-20">
                          <div className="h-full rounded-full bg-purple-500 transition-all duration-500" style={{ width: '100%' }} />
                        </div>
                      )}
                      {version !== 'v1' && isFeatureOn('iterator-vis') && node.type === 'iterator' && node.status === 'running' && node.executionData && (
                        <div className="absolute -bottom-1 left-2 right-2 h-1.5 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden z-20">
                          <div className="h-full rounded-full bg-purple-500 transition-all duration-1000 animate-pulse" style={{ width: '60%' }} />
                        </div>
                      )}
                      {version !== 'v1' && isFeatureOn('iterator-vis') && node.type === 'iterator' && (node.status === 'completed' || node.status === 'running') && node.executionData && (
                        <div className="absolute -top-4 right-2 text-[8px] font-mono font-bold text-purple-500 z-30">
                          {node.executionData.output.current?.toString() || `${node.executionData.items}/${node.executionData.items}`}
                        </div>
                      )}

                      {/* Wait step timer indicator */}
                      {version !== 'v1' && isFeatureOn('wait-steps') && node.type === 'wait' && (node.status === 'completed' || node.status === 'running') && node.executionData && (
                        <div className="absolute -top-4 left-2 right-2 flex items-center justify-center gap-1 z-30">
                          <Clock size={8} className={node.status === 'running' ? 'text-yellow-500 animate-pulse' : 'text-green-500'} />
                          <span className={`text-[8px] font-mono font-bold ${node.status === 'running' ? 'text-yellow-500' : 'text-green-500'}`}>
                            {node.executionData.output.waited?.toString() || '—'}
                          </span>
                        </div>
                      )}

                      {/* Pin indicator */}
                      {version !== 'v1' && node.pinned && isFeatureOn('data-pinning') && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30">
                          <Pin size={12} className="text-blue-500" fill="currentColor" />
                        </div>
                      )}

                      {/* V3: Retry Badge */}
                      {(version === 'v3' || version === 'v4') && isFeatureOn('retry-config') && node.retryConfig && (
                        <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center z-20 border border-white dark:border-zinc-900"
                          style={{ background: '#6366f1' }}
                          title={`Retry: ${node.retryConfig.maxRetries}x, ${node.retryConfig.backoff}`}>
                          <RefreshCw size={9} className="text-white" />
                        </div>
                      )}

                      {/* V3: Circuit Breaker Badge */}
                      {(version === 'v3' || version === 'v4') && isFeatureOn('circuit-breaker') && node.circuitBreaker && (
                        <div className={`absolute top-1 right-1 flex items-center gap-1 px-1.5 py-0.5 rounded-full z-25 ${node.circuitBreaker.status === 'open' ? 'lab-circuit-open' : ''}`}
                          style={{ background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)' }}
                          title={`Circuit Breaker: ${node.circuitBreaker.status} (${node.circuitBreaker.failures}/${node.circuitBreaker.threshold})`}>
                          <div className="w-2 h-2 rounded-full" style={{
                            background: node.circuitBreaker.status === 'closed' ? '#10b981'
                              : node.circuitBreaker.status === 'half-open' ? '#f59e0b'
                              : '#ef4444'
                          }} />
                          <span className="text-[7px] font-bold" style={{
                            color: node.circuitBreaker.status === 'closed' ? '#10b981'
                              : node.circuitBreaker.status === 'half-open' ? '#f59e0b'
                              : '#ef4444'
                          }}>
                            {node.circuitBreaker.status === 'closed' ? 'OK' : node.circuitBreaker.status === 'half-open' ? '½' : 'OPEN'}
                          </span>
                        </div>
                      )}

                      {/* V3: Schema Ports */}
                      {(version === 'v3' || version === 'v4') && isFeatureOn('schema-types') && node.schemaTypes && !circularMode && (
                        <>
                          {/* Input ports (left side) */}
                          {node.schemaTypes.inputs.map((port, pi) => (
                            <div key={`in-${pi}`} className="absolute flex items-center gap-1 pointer-events-none" style={{
                              left: -6, top: 12 + pi * 16,
                            }}>
                              <div className="w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900" style={{ background: SCHEMA_COLORS[port.type] }} />
                              <span className="text-[7px] font-mono font-medium" style={{ color: SCHEMA_COLORS[port.type] }}>{port.name}</span>
                            </div>
                          ))}
                          {/* Output ports (right side) */}
                          {node.schemaTypes.outputs.map((port, pi) => (
                            <div key={`out-${pi}`} className="absolute flex items-center gap-1 pointer-events-none flex-row-reverse" style={{
                              right: -6, top: 12 + pi * 16,
                            }}>
                              <div className="w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900" style={{ background: SCHEMA_COLORS[port.type] }} />
                              <span className="text-[7px] font-mono font-medium" style={{ color: SCHEMA_COLORS[port.type] }}>{port.name}</span>
                            </div>
                          ))}
                        </>
                      )}

                      {/* V4: Draft/Published Badge */}
                      {version === 'v4' && isFeatureOn('draft-published') && node.draftState && (
                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[7px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full z-30 ${
                          node.draftState === 'draft' ? 'lab-draft-badge' : 'lab-published-badge'
                        }`}>
                          {node.draftState === 'draft' ? 'Draft' : 'Published'}
                        </div>
                      )}

                      {/* V4: MCP Badge */}
                      {version === 'v4' && isFeatureOn('mcp-badges') && node.mcpEnabled && node.type !== 'agent' && (
                        <div className="absolute top-1 left-1 flex items-center gap-1 px-1.5 py-0.5 rounded-full z-25 lab-mcp-badge"
                          style={{ background: isDark ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.1)', border: '1px dashed rgba(124,58,237,0.4)' }}>
                          <Plug size={8} className="text-purple-500" />
                          <span className="text-[7px] font-bold text-purple-500">MCP</span>
                        </div>
                      )}

                      {/* V4: Memory Type Badge */}
                      {version === 'v4' && isFeatureOn('ai-memory-types') && node.memoryType && (
                        <div className="absolute bottom-1 left-1 flex items-center gap-1 px-1.5 py-0.5 rounded-md z-25"
                          style={{ background: isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
                          <Database size={8} className="text-violet-500" />
                          <span className="text-[7px] font-bold text-violet-500 capitalize">{node.memoryType}</span>
                        </div>
                      )}

                      {/* V4: Error Directive Badge */}
                      {version === 'v4' && isFeatureOn('error-directives') && node.errorDirective && (
                        <div className="absolute -bottom-2.5 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full z-25"
                          style={{
                            background: node.errorDirective === 'break' ? '#ef444420' : node.errorDirective === 'continue' ? '#10b98120' : node.errorDirective === 'rollback' ? '#f59e0b20' : '#3b82f620',
                            border: `1px solid ${node.errorDirective === 'break' ? '#ef444440' : node.errorDirective === 'continue' ? '#10b98140' : node.errorDirective === 'rollback' ? '#f59e0b40' : '#3b82f640'}`,
                          }}>
                          <span className="text-[7px] font-bold capitalize" style={{
                            color: node.errorDirective === 'break' ? '#ef4444' : node.errorDirective === 'continue' ? '#10b981' : node.errorDirective === 'rollback' ? '#f59e0b' : '#3b82f6',
                          }}>{node.errorDirective}</span>
                        </div>
                      )}

                      {/* V4: Breakpoint */}
                      {version === 'v4' && isFeatureOn('breakpoints') && node.breakpoint && (
                        <div className="lab-breakpoint" style={{ position: 'relative' }} />
                      )}

                      {/* Data Preview (under node) — hover to see full code */}
                      {version !== 'v1' && showDataPreview && isFeatureOn('live-data-preview') && node.status === 'completed' && node.executionData && (
                        <div
                          className="absolute -bottom-7 left-0 right-0 flex justify-center"
                          style={{ pointerEvents: 'auto', zIndex: hoveredPreviewNodeId === node.id ? 100 : 30 }}
                          onMouseEnter={(e) => { e.stopPropagation(); setHoveredPreviewNodeId(node.id); }}
                          onMouseLeave={() => setHoveredPreviewNodeId(null)}
                        >
                          <div className="px-2 py-0.5 rounded text-[8px] font-mono bg-gray-800/90 text-green-400 truncate max-w-[200px] cursor-pointer relative">
                            {JSON.stringify(node.executionData.output).slice(0, 40)}...

                            {/* Full code popup on hover */}
                            {hoveredPreviewNodeId === node.id && (
                              <div
                                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-3 min-w-[280px] max-w-[420px] max-h-[300px] overflow-auto"
                                style={{ pointerEvents: 'auto', zIndex: 200 }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Output</span>
                                  <span className="text-[8px] text-gray-500">{node.executionData!.duration}ms · {node.executionData!.items} items</span>
                                </div>
                                <pre className="text-[10px] font-mono text-green-400 whitespace-pre-wrap break-all leading-relaxed">
{JSON.stringify(node.executionData.output, null, 2)}
                                </pre>
                                <div className="border-t border-gray-700 mt-2 pt-2">
                                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Input</span>
                                  <pre className="text-[10px] font-mono text-blue-400 whitespace-pre-wrap break-all leading-relaxed mt-1">
{JSON.stringify(node.executionData.input, null, 2)}
                                  </pre>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* V4: Multiplayer Cursors */}
              {version === 'v4' && isFeatureOn('multiplayer-cursors') && multiplayerCursors.map(cur => (
                <div key={cur.id} className="absolute pointer-events-none z-40 lab-multiplayer-cursor" style={{ left: cur.x, top: cur.y, transition: 'left 2.5s ease-in-out, top 2.5s ease-in-out' }}>
                  <MousePointer2 size={16} style={{ color: cur.color }} fill={cur.color} />
                  <span className="ml-1 -mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold text-white whitespace-nowrap" style={{ background: cur.color }}>
                    {cur.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* V4: Debug Controls Overlay */}
          {version === 'v4' && debugMode && isFeatureOn('breakpoints') && debugPausedAt && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-red-500/10 backdrop-blur-lg shadow-lg border border-red-500/20 z-30">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-red-600 dark:text-red-400">
                {lang === 'de' ? 'Pausiert bei:' : 'Paused at:'} {nodes.find(n => n.id === debugPausedAt)?.label || debugPausedAt}
              </span>
              <button onClick={() => { setDebugPausedAt(null); }} className="flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-medium bg-green-500/15 text-green-600 hover:bg-green-500/25 transition-colors">
                <Play size={11} /> Continue
              </button>
              <button onClick={() => { setDebugPausedAt(null); }} className="flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-medium bg-blue-500/15 text-blue-600 hover:bg-blue-500/25 transition-colors">
                <StepForward size={11} /> Step Over
              </button>
            </div>
          )}

          {/* ── CONTEXT MENU ── */}
          {contextMenu && version !== 'v1' && (
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
                {/* Custom Color picker */}
                {isFeatureOn('custom-colors') && (
                  <>
                    <div className="border-t border-gray-100 dark:border-zinc-700" />
                    <div className="px-3 py-2">
                      <div className="text-[10px] text-gray-400 mb-1.5">{lang === 'de' ? 'Farbe' : 'Color'}</div>
                      <div className="flex items-center gap-1.5">
                        {['#3b82f6', '#8b5cf6', '#d946ef', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'].map(color => (
                          <button
                            key={color}
                            onClick={() => {
                              setNodes(prev => prev.map(n => n.id === contextMenu.nodeId ? { ...n, customColor: n.customColor === color ? undefined : color } : n));
                              setContextMenu(null);
                            }}
                            className={`w-5 h-5 rounded-full transition-transform hover:scale-110 ${nodes.find(n => n.id === contextMenu.nodeId)?.customColor === color ? 'ring-2 ring-offset-1 ring-gray-400 dark:ring-offset-zinc-800' : ''}`}
                            style={{ background: color }}
                          />
                        ))}
                        {/* Reset */}
                        <button
                          onClick={() => { setNodes(prev => prev.map(n => n.id === contextMenu.nodeId ? { ...n, customColor: undefined } : n)); setContextMenu(null); }}
                          className="w-5 h-5 rounded-full border border-dashed border-gray-300 dark:border-zinc-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-700"
                        >
                          <X size={8} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {/* V4: Breakpoint Toggle */}
                {version === 'v4' && isFeatureOn('breakpoints') && (
                  <>
                    <div className="border-t border-gray-100 dark:border-zinc-700" />
                    <button onClick={() => {
                      setNodes(prev => prev.map(n => n.id === contextMenu.nodeId ? { ...n, breakpoint: !n.breakpoint } : n));
                      setContextMenu(null);
                    }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-zinc-700/50 flex items-center gap-2">
                      <Bug size={12} className="text-red-500" />
                      {nodes.find(n => n.id === contextMenu.nodeId)?.breakpoint
                        ? (lang === 'de' ? 'Breakpoint entfernen' : 'Remove Breakpoint')
                        : (lang === 'de' ? 'Breakpoint setzen' : 'Set Breakpoint')}
                    </button>
                  </>
                )}
                {/* V4: Error Directive */}
                {version === 'v4' && isFeatureOn('error-directives') && (
                  <>
                    <div className="border-t border-gray-100 dark:border-zinc-700" />
                    <div className="px-3 py-2">
                      <div className="text-[10px] text-gray-400 mb-1.5">{lang === 'de' ? 'Fehler-Direktive' : 'Error Directive'}</div>
                      <div className="flex items-center gap-1">
                        {(['break', 'continue', 'rollback', 'resume'] as const).map(dir => {
                          const c = dir === 'break' ? '#ef4444' : dir === 'continue' ? '#10b981' : dir === 'rollback' ? '#f59e0b' : '#3b82f6';
                          const active = nodes.find(n => n.id === contextMenu.nodeId)?.errorDirective === dir;
                          return (
                            <button key={dir} onClick={() => {
                              setNodes(prev => prev.map(n => n.id === contextMenu.nodeId ? { ...n, errorDirective: active ? undefined : dir } : n));
                              setContextMenu(null);
                            }}
                              className={`px-1.5 py-1 rounded text-[9px] font-bold capitalize transition-colors ${active ? 'ring-1 ring-offset-1 dark:ring-offset-zinc-800' : 'opacity-60 hover:opacity-100'}`}
                              style={{ background: c + '20', color: c }}>
                              {dir}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
                <div className="border-t border-gray-100 dark:border-zinc-700" />
                <button onClick={() => setContextMenu(null)}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-zinc-700/50 flex items-center gap-2 text-gray-400">
                  <X size={12} /> {lang === 'de' ? 'Schließen' : 'Close'}
                </button>
              </div>
            </>
          )}

          {/* ── REPLAY CONTROLS ── */}
          {version !== 'v1' && isFeatureOn('execution-replay') && (
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
        {inspectNode && version !== 'v1' && isFeatureOn('click-to-inspect') && (
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

              {/* V3: Retry Configuration */}
              {(version === 'v3' || version === 'v4') && isFeatureOn('retry-config') && inspectNode.retryConfig && (
                <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw size={12} className="text-indigo-500" />
                    <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">Retry Configuration</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px]">
                    <div>
                      <div className="text-gray-400">{lang === 'de' ? 'Max. Versuche' : 'Max Retries'}</div>
                      <div className="font-bold text-sm">{inspectNode.retryConfig.maxRetries}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Delay</div>
                      <div className="font-bold text-sm">{inspectNode.retryConfig.delay}ms</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Backoff</div>
                      <div className="font-bold text-sm capitalize">{inspectNode.retryConfig.backoff}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* V3: Circuit Breaker Status */}
              {(version === 'v3' || version === 'v4') && isFeatureOn('circuit-breaker') && inspectNode.circuitBreaker && (
                <div className="p-3 rounded-lg border" style={{
                  background: inspectNode.circuitBreaker.status === 'closed' ? (isDark ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.05)') : inspectNode.circuitBreaker.status === 'half-open' ? (isDark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.05)') : (isDark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.05)'),
                  borderColor: inspectNode.circuitBreaker.status === 'closed' ? '#10b98130' : inspectNode.circuitBreaker.status === 'half-open' ? '#f59e0b30' : '#ef444430',
                }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={12} style={{ color: inspectNode.circuitBreaker.status === 'closed' ? '#10b981' : inspectNode.circuitBreaker.status === 'half-open' ? '#f59e0b' : '#ef4444' }} />
                    <span className="text-[10px] font-bold uppercase" style={{ color: inspectNode.circuitBreaker.status === 'closed' ? '#10b981' : inspectNode.circuitBreaker.status === 'half-open' ? '#f59e0b' : '#ef4444' }}>
                      Circuit Breaker — {inspectNode.circuitBreaker.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <div className="text-gray-400">{lang === 'de' ? 'Fehler' : 'Failures'}</div>
                      <div className="font-bold text-sm">{inspectNode.circuitBreaker.failures} / {inspectNode.circuitBreaker.threshold}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Threshold</div>
                      <div className="font-bold text-sm">{inspectNode.circuitBreaker.threshold}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* V3: Schema Types */}
              {(version === 'v3' || version === 'v4') && isFeatureOn('schema-types') && inspectNode.schemaTypes && (
                <div>
                  <div className="text-[10px] font-medium text-gray-400 uppercase mb-1.5">Schema</div>
                  {inspectNode.schemaTypes.inputs.length > 0 && (
                    <div className="mb-2">
                      <div className="text-[9px] text-gray-400 mb-1">Inputs</div>
                      <div className="flex flex-wrap gap-1">
                        {inspectNode.schemaTypes.inputs.map((p, i) => (
                          <span key={i} className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono" style={{ background: SCHEMA_COLORS[p.type] + '15', color: SCHEMA_COLORS[p.type] }}>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: SCHEMA_COLORS[p.type] }} />
                            {p.name}: {p.type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {inspectNode.schemaTypes.outputs.length > 0 && (
                    <div>
                      <div className="text-[9px] text-gray-400 mb-1">Outputs</div>
                      <div className="flex flex-wrap gap-1">
                        {inspectNode.schemaTypes.outputs.map((p, i) => (
                          <span key={i} className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono" style={{ background: SCHEMA_COLORS[p.type] + '15', color: SCHEMA_COLORS[p.type] }}>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: SCHEMA_COLORS[p.type] }} />
                            {p.name}: {p.type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* V4: Agent Reasoning Trace */}
              {(version === 'v4') && inspectNode.type === 'agent' && inspectNode.agentReasoningTrace && (
                <div className="p-3 rounded-lg bg-violet-50 dark:bg-violet-900/15 border border-violet-200 dark:border-violet-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <BrainCircuit size={12} className="text-violet-500" />
                    <span className="text-[10px] font-bold uppercase text-violet-600 dark:text-violet-400">Reasoning Trace</span>
                  </div>
                  <div className="space-y-2">
                    {inspectNode.agentReasoningTrace.slice(0, agentReasoningStep + 1).map((step, i) => (
                      <div key={i} className="text-[10px] space-y-0.5 pl-2 border-l-2 border-violet-300 dark:border-violet-700">
                        <div className="text-violet-600 dark:text-violet-400 font-medium"><span className="font-bold">Think:</span> {step.thought}</div>
                        <div className="text-purple-600 dark:text-purple-400"><span className="font-bold">Action:</span> {step.action}</div>
                        <div className="text-emerald-600 dark:text-emerald-400"><span className="font-bold">Result:</span> {step.result}</div>
                      </div>
                    ))}
                  </div>
                  {inspectNode.agentTools && (
                    <div className="mt-2 pt-2 border-t border-violet-200 dark:border-violet-800/50">
                      <div className="text-[9px] text-violet-500 uppercase font-bold mb-1">Tools</div>
                      <div className="flex flex-wrap gap-1">
                        {inspectNode.agentTools.map(t => (
                          <span key={t} className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-violet-100 dark:bg-violet-800/30 text-violet-600 dark:text-violet-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* V4: Condition Agent Details */}
              {(version === 'v4') && inspectNode.type === 'condition-agent' && inspectNode.conditionPrompt && (
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/15 border border-purple-200 dark:border-purple-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain size={12} className="text-purple-500" />
                    <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400">{lang === 'de' ? 'AI-Routing Prompt' : 'AI Routing Prompt'}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 dark:text-zinc-400 italic leading-relaxed">"{inspectNode.conditionPrompt}"</p>
                </div>
              )}

              {/* V4: Memory Type */}
              {(version === 'v4') && isFeatureOn('ai-memory-types') && inspectNode.memoryType && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800/50">
                  <Database size={12} className="text-violet-500" />
                  <div>
                    <div className="text-[9px] text-violet-500 uppercase font-bold">Memory Type</div>
                    <div className="text-xs font-bold capitalize text-violet-700 dark:text-violet-300">{inspectNode.memoryType}</div>
                  </div>
                </div>
              )}

              {/* V4: Error Directive */}
              {(version === 'v4') && isFeatureOn('error-directives') && inspectNode.errorDirective && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg border" style={{
                  background: inspectNode.errorDirective === 'break' ? '#ef444408' : inspectNode.errorDirective === 'continue' ? '#10b98108' : inspectNode.errorDirective === 'rollback' ? '#f59e0b08' : '#3b82f608',
                  borderColor: inspectNode.errorDirective === 'break' ? '#ef444425' : inspectNode.errorDirective === 'continue' ? '#10b98125' : inspectNode.errorDirective === 'rollback' ? '#f59e0b25' : '#3b82f625',
                }}>
                  <AlertTriangle size={12} style={{ color: inspectNode.errorDirective === 'break' ? '#ef4444' : inspectNode.errorDirective === 'continue' ? '#10b981' : inspectNode.errorDirective === 'rollback' ? '#f59e0b' : '#3b82f6' }} />
                  <div>
                    <div className="text-[9px] uppercase font-bold" style={{ color: inspectNode.errorDirective === 'break' ? '#ef4444' : inspectNode.errorDirective === 'continue' ? '#10b981' : inspectNode.errorDirective === 'rollback' ? '#f59e0b' : '#3b82f6' }}>
                      {lang === 'de' ? 'Fehler-Direktive' : 'Error Directive'}
                    </div>
                    <div className="text-xs font-bold capitalize">{inspectNode.errorDirective}</div>
                  </div>
                </div>
              )}

              {/* V4: Draft/Published */}
              {(version === 'v4') && isFeatureOn('draft-published') && inspectNode.draftState && (
                <div className="flex items-center justify-between p-2.5 rounded-lg" style={{
                  background: inspectNode.draftState === 'draft' ? '#f59e0b08' : '#10b98108',
                  border: `1px solid ${inspectNode.draftState === 'draft' ? '#f59e0b25' : '#10b98125'}`,
                }}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${inspectNode.draftState === 'draft' ? 'bg-amber-400' : 'bg-green-500'}`} />
                    <span className="text-xs font-bold capitalize">{inspectNode.draftState}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (inspectNode.draftState === 'draft') setShowPublishConfirm(true);
                    }}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${inspectNode.draftState === 'draft' ? 'bg-green-500/15 text-green-600 hover:bg-green-500/25' : 'bg-gray-100 dark:bg-zinc-800 text-gray-400 cursor-default'}`}>
                    {inspectNode.draftState === 'draft' ? (lang === 'de' ? 'Veröffentlichen' : 'Publish') : (lang === 'de' ? 'Veröffentlicht' : 'Published')}
                  </button>
                </div>
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
        {showInsights && version !== 'v1' && isFeatureOn('insights-dashboard') && (
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
        {showVariables && version !== 'v1' && isFeatureOn('custom-variables') && (
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

        {/* ── VERSIONING PANEL ── */}
        {showVersioning && version !== 'v1' && isFeatureOn('workflow-versioning') && (
          <div className="w-80 border-l border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-y-auto shrink-0">
            <div className="p-3 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
              <h2 className="text-sm font-bold">{lang === 'de' ? 'Versionsverlauf' : 'Version History'}</h2>
              <button onClick={() => setShowVersioning(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><X size={14} /></button>
            </div>
            <div className="p-2">
              {MOCK_VERSIONS.map((v, idx) => (
                <div
                  key={v.id}
                  className={`relative pl-6 pb-4 ${idx < MOCK_VERSIONS.length - 1 ? 'border-l-2 border-gray-200 dark:border-zinc-700 ml-2' : 'ml-2'}`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-[5px] top-1 w-3 h-3 rounded-full border-2 ${
                    v.status === 'current'
                      ? 'bg-purple-500 border-purple-300 dark:border-purple-700'
                      : 'bg-gray-300 dark:bg-zinc-600 border-gray-200 dark:border-zinc-700'
                  }`} />

                  <div
                    className={`p-2.5 rounded-lg cursor-pointer transition-colors ${
                      selectedVersionId === v.id
                        ? 'bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-300 dark:ring-purple-700'
                        : 'hover:bg-gray-50 dark:hover:bg-zinc-800/50'
                    }`}
                    onClick={() => setSelectedVersionId(selectedVersionId === v.id ? null : v.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">{v.version}</span>
                        {v.status === 'current' && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-semibold">
                            {lang === 'de' ? 'Aktuell' : 'Current'}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-gray-400">{v.author}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-zinc-500 mt-0.5">{v.timestamp}</div>

                    {/* Changes */}
                    {selectedVersionId === v.id && (
                      <div className="mt-2 space-y-1">
                        {v.changes.map((c, ci) => (
                          <div key={ci} className="flex items-start gap-1.5 text-[10px]">
                            <span className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${
                              c.type === 'added' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                              c.type === 'modified' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' :
                              'bg-red-100 dark:bg-red-900/30 text-red-600'
                            }`}>
                              {c.type === 'added' ? '+' : c.type === 'modified' ? '~' : '−'}
                            </span>
                            <span className="text-gray-600 dark:text-zinc-400">{c.desc}</span>
                          </div>
                        ))}

                        {/* Actions */}
                        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
                          {v.status !== 'current' && (
                            <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                              <RotateCcw size={10} /> {lang === 'de' ? 'Wiederherstellen' : 'Restore'}
                            </button>
                          )}
                          {idx < MOCK_VERSIONS.length - 1 && (
                            <button
                              onClick={(e) => { e.stopPropagation(); setShowVersionDiff(!showVersionDiff); }}
                              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                            >
                              <Copy size={10} /> Diff
                            </button>
                          )}
                        </div>

                        {/* Diff View */}
                        {showVersionDiff && idx < MOCK_VERSIONS.length - 1 && (
                          <div className="mt-2 p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
                            <div className="text-[9px] font-semibold text-gray-400 uppercase mb-1.5">
                              {v.version} vs {MOCK_VERSIONS[idx + 1].version}
                            </div>
                            <div className="space-y-1 font-mono text-[9px]">
                              {v.changes.map((c, di) => (
                                <div key={di} className={`px-1.5 py-0.5 rounded ${
                                  c.type === 'added' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                                  c.type === 'modified' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' :
                                  'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                                }`}>
                                  {c.type === 'added' ? '+ ' : c.type === 'modified' ? '~ ' : '- '}{c.desc}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── APPROVAL MODAL ── */}
      {showApprovalModal && approvalNodeId && (version === 'v3' || version === 'v4') && isFeatureOn('approval-nodes') && (() => {
        const aNode = nodes.find(n => n.id === approvalNodeId);
        if (!aNode) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-[440px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-zinc-800 bg-gradient-to-r from-amber-500/5 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#f59e0b18' }}>
                    <UserCheck size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{lang === 'de' ? 'Freigabe erforderlich' : 'Approval Required'}</h3>
                    <p className="text-[10px] text-gray-500 dark:text-zinc-400 mt-0.5">{getLabel(aNode)}</p>
                  </div>
                </div>
                <button onClick={() => setShowApprovalModal(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><X size={14} /></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">{lang === 'de' ? 'Zugewiesen an' : 'Assignee'}</div>
                    <div className="text-sm font-medium mt-0.5">{aNode.approvalAssignee || 'Unassigned'}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">{lang === 'de' ? 'Frist' : 'Deadline'}</div>
                    <div className="text-sm font-medium mt-0.5">{aNode.approvalDeadline || '—'}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">Status</div>
                    <div className={`text-sm font-bold mt-0.5 ${aNode.approvalState === 'approved' ? 'text-green-500' : aNode.approvalState === 'rejected' ? 'text-red-500' : 'text-amber-500'}`}>
                      {aNode.approvalState === 'approved' ? (lang === 'de' ? 'Genehmigt' : 'Approved') : aNode.approvalState === 'rejected' ? (lang === 'de' ? 'Abgelehnt' : 'Rejected') : (lang === 'de' ? 'Wartend' : 'Pending')}
                    </div>
                  </div>
                </div>
                {aNode.executionData && (
                  <div>
                    <div className="text-[10px] font-medium text-gray-400 uppercase mb-1.5">{lang === 'de' ? 'Eingangsdaten' : 'Input Data'}</div>
                    <pre className="text-[10px] font-mono bg-gray-50 dark:bg-zinc-800 rounded-lg p-2 text-gray-600 dark:text-zinc-400 max-h-24 overflow-auto">
                      {JSON.stringify(aNode.executionData.input, null, 2)}
                    </pre>
                  </div>
                )}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      setNodes(prev => prev.map(n => n.id === approvalNodeId ? { ...n, approvalState: 'approved' as const } : n));
                      setShowApprovalModal(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 text-white font-medium text-xs hover:bg-green-600 transition-colors">
                    <Check size={14} /> {lang === 'de' ? 'Genehmigen' : 'Approve'}
                  </button>
                  <button
                    onClick={() => {
                      setNodes(prev => prev.map(n => n.id === approvalNodeId ? { ...n, approvalState: 'rejected' as const } : n));
                      setShowApprovalModal(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium text-xs hover:bg-red-600 transition-colors">
                    <X size={14} /> {lang === 'de' ? 'Ablehnen' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── EXPRESSION EDITOR MODAL ── */}
      {showExprEditor && version !== 'v1' && isFeatureOn('expression-editor') && (
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
      {/* ── BLUEPRINT EXPORT MODAL ── */}
      {showBlueprintExport && version === 'v4' && isFeatureOn('blueprint-export') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[600px] max-h-[500px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-zinc-800 bg-gradient-to-r from-blue-500/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10">
                  <Download size={20} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{lang === 'de' ? 'Blueprint exportieren' : 'Export Blueprint'}</h3>
                  <p className="text-[10px] text-gray-500 dark:text-zinc-400 mt-0.5">{lang === 'de' ? 'Workflow als JSON herunterladen' : 'Download workflow as JSON'}</p>
                </div>
              </div>
              <button onClick={() => setShowBlueprintExport(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><X size={14} /></button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <pre className="text-[10px] font-mono bg-gray-50 dark:bg-zinc-800 rounded-lg p-3 text-gray-600 dark:text-zinc-400 leading-relaxed max-h-[280px] overflow-auto">
{JSON.stringify({ version: 'v4', nodes: nodes.length, connections: currentConns.length, features: features.filter(f => f.enabled).length, exported: new Date().toISOString() }, null, 2)}
              </pre>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 border-t border-gray-200 dark:border-zinc-800">
              <button onClick={() => setShowBlueprintExport(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 text-white font-medium text-xs hover:bg-blue-600 transition-colors">
                <Download size={14} /> {lang === 'de' ? 'Herunterladen' : 'Download JSON'}
              </button>
              <button onClick={() => setShowBlueprintExport(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 font-medium text-xs hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                <Copy size={14} /> {lang === 'de' ? 'Kopieren' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── BLUEPRINT IMPORT MODAL ── */}
      {showBlueprintImport && version === 'v4' && isFeatureOn('blueprint-export') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[480px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-zinc-800 bg-gradient-to-r from-emerald-500/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/10">
                  <Upload size={20} className="text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{lang === 'de' ? 'Blueprint importieren' : 'Import Blueprint'}</h3>
                  <p className="text-[10px] text-gray-500 dark:text-zinc-400 mt-0.5">{lang === 'de' ? 'JSON-Datei hochladen oder einfügen' : 'Upload or paste JSON file'}</p>
                </div>
              </div>
              <button onClick={() => setShowBlueprintImport(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><X size={14} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-8 text-center hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto text-gray-400 dark:text-zinc-500 mb-2" />
                <div className="text-xs font-medium text-gray-500 dark:text-zinc-400">{lang === 'de' ? 'JSON-Datei hierher ziehen' : 'Drag & drop JSON file here'}</div>
                <div className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">{lang === 'de' ? 'oder klicken zum Auswählen' : 'or click to browse'}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowBlueprintImport(false)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-medium text-xs hover:bg-emerald-600 transition-colors">
                  <Upload size={14} /> {lang === 'de' ? 'Importieren' : 'Import'}
                </button>
                <button onClick={() => setShowBlueprintImport(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 font-medium text-xs hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                  {lang === 'de' ? 'Abbrechen' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PUBLISH CONFIRMATION MODAL ── */}
      {showPublishConfirm && version === 'v4' && isFeatureOn('draft-published') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[400px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-zinc-800 bg-gradient-to-r from-green-500/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-500/10">
                  <Check size={20} className="text-green-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{lang === 'de' ? 'Workflow veröffentlichen?' : 'Publish Workflow?'}</h3>
                  <p className="text-[10px] text-gray-500 dark:text-zinc-400 mt-0.5">{lang === 'de' ? 'Dies wird den Workflow live schalten' : 'This will make the workflow live'}</p>
                </div>
              </div>
              <button onClick={() => setShowPublishConfirm(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"><X size={14} /></button>
            </div>
            <div className="p-5 space-y-3">
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
                <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400">
                  <AlertTriangle size={14} />
                  <span className="font-medium">{lang === 'de' ? 'Alle Nodes wechseln von Draft auf Published' : 'All nodes will switch from Draft to Published'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => {
                  setNodes(prev => prev.map(n => ({ ...n, draftState: 'published' as const })));
                  setShowPublishConfirm(false);
                }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 text-white font-medium text-xs hover:bg-green-600 transition-colors">
                  <Check size={14} /> {lang === 'de' ? 'Veröffentlichen' : 'Publish'}
                </button>
                <button onClick={() => setShowPublishConfirm(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 font-medium text-xs hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                  {lang === 'de' ? 'Abbrechen' : 'Cancel'}
                </button>
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
