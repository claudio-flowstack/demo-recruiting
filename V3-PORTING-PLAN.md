# NodeLab → /systems Porting Plan (Modular)

> Jedes Modul ist einzeln umsetzbar. Bei der Umsetzung einfach sagen:
> "Mach Modul A1, A2, B3" oder "Mach alles V3" oder "Alles außer C4".

---

## Modul-Übersicht

| ID | Modul | Version | Abhängig von | Risiko | Zeit |
|----|-------|---------|-------------|--------|------|
| **A1** | TypeScript Types erweitern | Basis | — | Niedrig | 10 min |
| **A2** | NODE_SIZES + NODE_STYLES (16 Typen) | Basis | A1 | Niedrig | 15 min |
| **A3** | Lucide Icons Import | Basis | — | Niedrig | 5 min |
| | | | | | |
| **B1** | Node Rendering: V3 Typen (error-handler, approval, ifelse, merge, wait, iterator, router) | **V3** | A1, A2, A3 | Mittel | 30 min |
| **B2** | Node Rendering: V4 Typen (agent, fork, join, condition-agent) | **V4** | A1, A2, A3 | Mittel | 25 min |
| **B3** | NodeLab Theme Glow für neue Typen | V3+V4 | B1 und/oder B2 | Niedrig | 5 min |
| | | | | | |
| **C1** | Connection pathType: error, true/false, loop | **V3** | A1 | Mittel | 15 min |
| **C2** | Connection pathType: tool, mcp, parallel | **V4** | A1, C1 | Mittel | 10 min |
| **C3** | Connection Labels farbig nach pathType | V3+V4 | C1 | Niedrig | 5 min |
| | | | | | |
| **D1** | CSS: Approval Pulse Animation | **V3** | — | Niedrig | 3 min |
| **D2** | CSS: Retry Spin Animation | **V3** | — | Niedrig | 2 min |
| **D3** | CSS: Agent Think Animation | **V4** | — | Niedrig | 3 min |
| **D4** | CSS: MCP Pulse + MCP Connection Animation | **V4** | — | Niedrig | 3 min |
| **D5** | CSS: Breakpoint Blink + Draft/Published Gradient | **V4** | — | Niedrig | 3 min |
| | | | | | |
| **E1** | Badge: Retry Config (bottom-left) | **V3** | A1, D2 | Niedrig | 5 min |
| **E2** | Badge: Approval Assignee/Deadline (im Node) | **V3** | B1 | Niedrig | 5 min |
| **E3** | Badge: MCP (Agent Icon-Dot + Non-Agent Pill) | **V4** | A1, D4 | Niedrig | 5 min |
| **E4** | Badge: Draft/Published (top-center) | **V4** | D5 | Niedrig | 5 min |
| **E5** | Badge: AI Memory Type (bottom-left interior) | **V4** | A1 | Niedrig | 5 min |
| **E6** | Badge: Error Directive (below node) | **V4** | A1 | Niedrig | 5 min |
| **E7** | Badge: Breakpoint Indicator (red dot) | **V4** | D5 | Niedrig | 3 min |
| **E8** | Badge: Fork Lane Count | **V4** | B2 | Niedrig | 3 min |
| **E9** | Badge: Condition-Agent Sparkles + Prompt Preview | **V4** | B2 | Niedrig | 3 min |
| | | | | | |
| **F1** | Node Palette: V3 Typen hinzufügen | **V3** | A1, A2 | Niedrig | 10 min |
| **F2** | Node Palette: V4 Typen hinzufügen | **V4** | A1, A2 | Niedrig | 10 min |
| | | | | | |
| **G1** | Canvas Settings: Theme Label "V3" | UI | — | Niedrig | 2 min |
| **G2** | Canvas Settings: Badge-Toggles (MCP, Draft, etc.) | UI | E3-E7 | Niedrig | 10 min |
| | | | | | |
| **H1** | Demo-Daten: V3 Nodes in bestehendes System | **V3** | B1, C1 | Niedrig | 15 min |
| **H2** | Demo-Daten: V4 Nodes in bestehendes System | **V4** | B2, C2 | Niedrig | 15 min |

---

## Pakete (Empfohlene Kombinationen)

### Paket "V3 Komplett" — Error Handling + Approval + Routing
Module: `A1, A2, A3, B1, B3, C1, C3, D1, D2, E1, E2, F1, G1, H1`
**~1.5 Stunden** | Neue Typen: error-handler, approval, ifelse, merge, wait, iterator, router

### Paket "V4 Komplett" — Agents + Parallel + MCP (beinhaltet V3)
Module: Alles
**~3 Stunden** | Neue Typen: + agent, fork, join, condition-agent

### Paket "V3 Minimal" — Nur Rendering, keine Badges
Module: `A1, A2, A3, B1, B3, C1, F1`
**~1 Stunde** | Nodes sehen richtig aus, keine Extras

### Paket "Nur V4 Agents" — Agent + Condition-Agent ohne Fork/Join
Module: `A1, A2, A3, B2(nur agent+condition-agent), D3, D4, E3, E5, E9`
**~45 min** | AI Agents mit MCP und Memory Badges

---

## Ausgeschlossen (User-Entscheidung)

| Feature | Grund |
|---------|-------|
| **Circuit Breaker** | User-Wunsch |
| **Schema/Type Ports** | User-Wunsch |

---

## Betroffene Dateien

| Datei | Module |
|-------|--------|
| `src/types/automation.ts` | A1 |
| `src/components/automation/WorkflowCanvas.tsx` | A2, A3, B1-B3, C1-C3, D1-D5, E1-E9, F1-F2, G1-G2 |
| `src/data/automationSystems.ts` | H1, H2 |

---

# MODUL A: Basis-Infrastruktur

## A1: TypeScript Types erweitern
**Version:** Basis (benötigt für alles) | **Risiko:** Niedrig | **Datei:** `src/types/automation.ts`

### A1.1: NodeType Union erweitern (Zeile 1)
```typescript
// Vorher:
export type NodeType = 'trigger' | 'process' | 'ai' | 'output' | 'subsystem';

// Nachher:
export type NodeType = 'trigger' | 'process' | 'ai' | 'output' | 'subsystem'
  // V3: Routing + Error Handling + Approval
  | 'ifelse' | 'merge' | 'wait' | 'iterator' | 'router'
  | 'error-handler' | 'approval'
  // V4: Agents + Parallel Execution
  | 'agent' | 'fork' | 'join' | 'condition-agent';
```

### A1.2: ConnectionPathType hinzufügen
```typescript
// V3 path types
export type ConnectionPathType =
  | 'default'
  // V3: Error + Conditional Routing
  | 'error' | 'true' | 'false' | 'loop'
  // V4: Agent Tools + Parallel + MCP
  | 'tool' | 'mcp' | 'parallel';

export interface NodeConnection {
  from: string;
  to: string;
  fromPort?: PortDirection;
  toPort?: PortDirection;
  label?: string;
  pathType?: ConnectionPathType;  // NEU
}
```

### A1.3: SystemNode erweitern — neue optionale Felder
```typescript
export interface SystemNode {
  // ... bestehende Felder bleiben ...

  // ── V3 Felder ──
  approvalAssignee?: string;         // Approval: wer muss freigeben
  approvalDeadline?: string;         // Approval: Deadline-Text
  retryConfig?: {                    // Retry: Wiederholungslogik
    maxRetries: number;
    backoff: string;                 // 'linear' | 'exponential' | 'jitter'
  };

  // ── V4 Felder ──
  agentTools?: string[];             // Agent: IDs anderer Nodes als Tools
  mcpEnabled?: boolean;              // MCP Integration Badge
  parallelLanes?: string[];          // Fork: Lane-Namen
  conditionPrompt?: string;          // Condition-Agent: AI Decision Prompt
  draftState?: 'draft' | 'published';
  errorDirective?: 'break' | 'continue' | 'rollback' | 'resume';
  memoryType?: 'buffer' | 'window' | 'summary' | 'persistent';
  hasBreakpoint?: boolean;
}
```

### Verifizierung A1:
```bash
npx tsc --noEmit 2>&1 | head -30
```
**Erwartung:** TS-Fehler weil NODE_SIZES/NODE_STYLES die neuen Typen nicht abdecken → wird in A2 gefixt.

---

## A2: NODE_SIZES + NODE_STYLES erweitern
**Version:** Basis | **Abhängig von:** A1 | **Risiko:** Niedrig
**Datei:** `WorkflowCanvas.tsx` Zeile 83-103

### A2.1: NODE_SIZES (Zeile 83-89) — 11 neue Einträge

```typescript
const NODE_SIZES: Record<NodeType, { w: number; h: number; radius: string; iconSize: number; fontSize: number; descSize: number; iconBoxSize: number }> = {
  // ── Bestehend (unverändert) ──
  trigger:   { w: 200, h: 72,  radius: '20px 12px 12px 20px', iconSize: 16, fontSize: 12, descSize: 10, iconBoxSize: 32 },
  process:   { w: 230, h: 82,  radius: '12px',                iconSize: 18, fontSize: 13, descSize: 10, iconBoxSize: 36 },
  ai:        { w: 300, h: 120, radius: '18px',                iconSize: 28, fontSize: 15, descSize: 11, iconBoxSize: 56 },
  output:    { w: 200, h: 72,  radius: '12px 20px 20px 12px', iconSize: 16, fontSize: 12, descSize: 10, iconBoxSize: 32 },
  subsystem: { w: 320, h: 130, radius: '18px',                iconSize: 24, fontSize: 15, descSize: 10, iconBoxSize: 48 },

  // ── V3: Routing + Error + Approval ──
  ifelse:          { w: 180, h: 80,  radius: '40px', iconSize: 20, fontSize: 12, descSize: 10, iconBoxSize: 28 },
  merge:           { w: 140, h: 60,  radius: '30px', iconSize: 16, fontSize: 11, descSize: 9,  iconBoxSize: 28 },
  wait:            { w: 180, h: 72,  radius: '12px', iconSize: 16, fontSize: 12, descSize: 10, iconBoxSize: 32 },
  iterator:        { w: 220, h: 82,  radius: '14px', iconSize: 18, fontSize: 12, descSize: 10, iconBoxSize: 32 },
  router:          { w: 160, h: 80,  radius: '40px', iconSize: 18, fontSize: 12, descSize: 10, iconBoxSize: 28 },
  'error-handler': { w: 200, h: 80,  radius: '12px', iconSize: 18, fontSize: 12, descSize: 10, iconBoxSize: 36 },
  approval:        { w: 260, h: 100, radius: '16px', iconSize: 22, fontSize: 13, descSize: 10, iconBoxSize: 42 },

  // ── V4: Agents + Parallel ──
  agent:             { w: 320, h: 130, radius: '18px', iconSize: 28, fontSize: 15, descSize: 11, iconBoxSize: 56 },
  fork:              { w: 120, h: 80,  radius: '40px', iconSize: 22, fontSize: 11, descSize: 9,  iconBoxSize: 32 },
  join:              { w: 120, h: 80,  radius: '40px', iconSize: 22, fontSize: 11, descSize: 9,  iconBoxSize: 32 },
  'condition-agent': { w: 240, h: 100, radius: '40px', iconSize: 22, fontSize: 13, descSize: 10, iconBoxSize: 40 },
};
```

**Form-Gruppen Referenz:**
| Form | Typen | radius |
|------|-------|--------|
| Volle Pille | ifelse, router, fork, join, condition-agent | 40px |
| Asymmetrisch links | trigger | 20px 12px 12px 20px |
| Asymmetrisch rechts | output | 12px 20px 20px 12px |
| Standard eckig | process, wait, error-handler | 12px |
| Medium rund | iterator, approval | 14-16px |
| Groß rund | ai, agent, subsystem | 18px |
| Weiche Pille | merge | 30px |

### A2.2: NODE_STYLES (Zeile 97-103) — 11 neue Einträge

```typescript
const NODE_STYLES: Record<NodeType, { bg: string; border: string; accent: string; label: string; labelEn: string }> = {
  // ── Bestehend (+ labelEn ergänzen) ──
  trigger:   { bg: 'rgba(59,130,246,0.07)',  border: 'rgba(59,130,246,0.18)', accent: '#3b82f6', label: 'Trigger',    labelEn: 'Trigger' },
  process:   { bg: 'rgba(139,92,246,0.07)',  border: 'rgba(139,92,246,0.18)', accent: '#8b5cf6', label: 'Prozess',    labelEn: 'Process' },
  ai:        { bg: 'rgba(217,70,239,0.07)',  border: 'rgba(217,70,239,0.18)', accent: '#d946ef', label: 'KI',         labelEn: 'AI' },
  output:    { bg: 'rgba(16,185,129,0.07)',  border: 'rgba(16,185,129,0.18)', accent: '#10b981', label: 'Output',     labelEn: 'Output' },
  subsystem: { bg: 'rgba(99,102,241,0.07)',  border: 'rgba(99,102,241,0.22)', accent: '#6366f1', label: 'Sub-System', labelEn: 'Sub-System' },

  // ── V3 ──
  ifelse:          { bg: 'rgba(245,158,11,0.07)',  border: 'rgba(245,158,11,0.18)', accent: '#f59e0b', label: 'Wenn/Dann',     labelEn: 'If/Else' },
  merge:           { bg: 'rgba(20,184,166,0.07)',  border: 'rgba(20,184,166,0.18)', accent: '#14b8a6', label: 'Zusammenf.',    labelEn: 'Merge' },
  wait:            { bg: 'rgba(107,114,128,0.07)', border: 'rgba(107,114,128,0.18)', accent: '#6b7280', label: 'Warten',       labelEn: 'Wait' },
  iterator:        { bg: 'rgba(168,85,247,0.07)',  border: 'rgba(168,85,247,0.18)', accent: '#a855f7', label: 'Iterator',      labelEn: 'Iterator' },
  router:          { bg: 'rgba(236,72,153,0.07)',  border: 'rgba(236,72,153,0.18)', accent: '#ec4899', label: 'Router',        labelEn: 'Router' },
  'error-handler': { bg: 'rgba(239,68,68,0.07)',   border: 'rgba(239,68,68,0.22)',  accent: '#ef4444', label: 'Error Handler', labelEn: 'Error Handler' },
  approval:        { bg: 'rgba(245,158,11,0.07)',  border: 'rgba(245,158,11,0.22)', accent: '#f59e0b', label: 'Freigabe',      labelEn: 'Approval' },

  // ── V4 ──
  agent:             { bg: 'rgba(124,58,237,0.07)',  border: 'rgba(124,58,237,0.22)', accent: '#7c3aed', label: 'KI-Agent',      labelEn: 'AI Agent' },
  fork:              { bg: 'rgba(14,165,233,0.07)',  border: 'rgba(14,165,233,0.18)', accent: '#0ea5e9', label: 'Aufteilen',     labelEn: 'Fork' },
  join:              { bg: 'rgba(14,165,233,0.07)',  border: 'rgba(14,165,233,0.18)', accent: '#0ea5e9', label: 'Zusammenf.',    labelEn: 'Join' },
  'condition-agent': { bg: 'rgba(168,85,247,0.07)',  border: 'rgba(168,85,247,0.22)', accent: '#a855f7', label: 'KI-Bedingung', labelEn: 'AI Condition' },
};
```

**Hinweis:** `labelEn` ist neu — muss auch im Type-Badge Rendering berücksichtigt werden (`style.labelEn` statt `style.label` wenn `lang === 'en'`).

### Verifizierung A2:
```bash
npx tsc --noEmit
```
**Erwartung:** Keine Fehler. Alle Record-Typen vollständig.

---

## A3: Lucide Icons Import
**Version:** Basis | **Risiko:** Niedrig
**Datei:** `WorkflowCanvas.tsx` Zeile 12-34

### Bereits vorhanden:
Clock, Cpu, Database, Sparkles, Repeat, Split, GitBranch, GitMerge, Timer, Shuffle, ShieldAlert, ShieldCheck, Bot, Brain

### Fehlen — Import hinzufügen:
```typescript
import { ..., Plug, Hand, RefreshCw } from 'lucide-react';
```

### ICONS Record erweitern (Zeile 56-75):
```typescript
'plug': Plug, 'hand': Hand, 'refresh-cw': RefreshCw,
```

---

# MODUL B: Node Rendering (Per-Type JSX)

## B1: V3 Node-Typen Rendering
**Version:** V3 | **Abhängig von:** A1, A2, A3 | **Risiko:** Mittel
**Datei:** `WorkflowCanvas.tsx` nach Zeile 3998 (nach `subsystem` Branch, vor default `return`)

### Warum kein hohes Risiko:
- `nodeW()`/`nodeH()` lesen automatisch aus NODE_SIZES → Connections passen sich an
- Snap, Drag, Export, Groups nutzen dieselben Helfer
- Wir ÄNDERN kein bestehendes Rendering, nur neue `if`-Branches

### B1.1: Error-Handler — Rotes Dashed Inner-Border
```typescript
if (node.type === 'error-handler') return (
  <div className="h-full flex items-center px-3.5 gap-3 relative">
    <div className="absolute inset-1.5 rounded-lg border-2 border-dashed pointer-events-none"
         style={{ borderColor: '#ef444440' }} />
    <div className="rounded-lg flex items-center justify-center shrink-0 relative z-10"
         style={{ width: ns.iconBoxSize, height: ns.iconBoxSize, background: '#ef444418' }}>
      {renderIcon(node, ns.iconSize)}
    </div>
    <div className="min-w-0 flex-1 relative z-10">
      <div className="font-medium text-gray-900 dark:text-white truncate"
           style={{ fontSize: ns.fontSize, ...labelColor }}>{node.label}</div>
      {node.description && isDescVisible(node.id) &&
        <div className="text-gray-500 dark:text-zinc-500 mt-0.5 truncate"
             style={{ fontSize: ns.descSize, ...descColor }}>{node.description}</div>}
    </div>
  </div>
);
```

### B1.2: Approval — Assignee/Deadline Info
```typescript
if (node.type === 'approval') return (
  <div className="h-full flex items-center px-4 gap-3">
    <div className="rounded-xl flex items-center justify-center shrink-0"
         style={{ width: ns.iconBoxSize, height: ns.iconBoxSize, background: '#f59e0b18' }}>
      {renderIcon(node, ns.iconSize)}
    </div>
    <div className="min-w-0 flex-1">
      <div className="font-bold text-gray-900 dark:text-white truncate"
           style={{ fontSize: ns.fontSize, ...labelColor }}>{node.label}</div>
      {node.description && isDescVisible(node.id) &&
        <div className="text-gray-500 dark:text-zinc-500 mt-0.5 truncate"
             style={{ fontSize: ns.descSize, ...descColor }}>{node.description}</div>}
      {node.approvalAssignee && (
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30
                           text-amber-700 dark:text-amber-300 font-medium">
            {node.approvalAssignee}
          </span>
          {node.approvalDeadline && (
            <span className="text-[9px] text-gray-400">
              <Clock size={8} className="inline mr-0.5" />{node.approvalDeadline}
            </span>
          )}
        </div>
      )}
    </div>
  </div>
);
```

### B1.3: IfElse / Router / Merge — Kompakte zentrierte Pill
```typescript
if (node.type === 'ifelse' || node.type === 'router' || node.type === 'merge') return (
  <div className="h-full flex flex-col items-center justify-center text-center px-3">
    <div className="rounded-full flex items-center justify-center mb-1"
         style={{ width: 28, height: 28, background: style.accent + '18' }}>
      {renderIcon(node, ns.iconSize)}
    </div>
    <div className="font-medium text-gray-900 dark:text-white truncate w-full"
         style={{ fontSize: ns.fontSize, ...labelColor }}>
      {node.label}
    </div>
  </div>
);
```

### B1.4: Wait / Iterator — Standard-Layout
```typescript
if (node.type === 'wait' || node.type === 'iterator') return (
  <div className="h-full flex items-center px-3.5 gap-3">
    <div className="rounded-lg flex items-center justify-center shrink-0"
         style={{ width: ns.iconBoxSize, height: ns.iconBoxSize, background: style.accent + '15' }}>
      {renderIcon(node, ns.iconSize)}
    </div>
    <div className="min-w-0 flex-1">
      <div className="font-medium text-gray-900 dark:text-white truncate"
           style={{ fontSize: ns.fontSize, ...labelColor }}>{node.label}</div>
      {node.description && isDescVisible(node.id) &&
        <div className="text-gray-500 dark:text-zinc-500 mt-0.5 truncate"
             style={{ fontSize: ns.descSize, ...descColor }}>{node.description}</div>}
    </div>
  </div>
);
```

---

## B2: V4 Node-Typen Rendering
**Version:** V4 | **Abhängig von:** A1, A2, A3 | **Risiko:** Mittel
**Datei:** `WorkflowCanvas.tsx` nach Zeile 3998

### B2.1: Agent — Radial Gradient + MCP Dot + Tool Badges
```typescript
if (node.type === 'agent') return (
  <div className="h-full flex items-center px-5 gap-4 relative">
    {/* Radial gradient overlay */}
    <div className="absolute inset-0 pointer-events-none"
         style={{
           borderRadius: ns.radius,
           background: `radial-gradient(ellipse at 30% 50%, ${style.accent}10, transparent 70%)`
         }} />
    <div className="rounded-2xl flex items-center justify-center shrink-0 relative z-10"
         style={{ width: ns.iconBoxSize, height: ns.iconBoxSize, background: style.accent + '18' }}>
      {renderIcon(node, ns.iconSize)}
      {/* MCP dot on icon corner (nur wenn Modul E3 aktiv) */}
      {node.mcpEnabled && (
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600
                        flex items-center justify-center v3-mcp-badge">
          <Cpu size={8} className="text-white" />
        </div>
      )}
    </div>
    <div className="min-w-0 flex-1 relative z-10">
      <div className="font-bold text-gray-900 dark:text-white truncate"
           style={{ fontSize: ns.fontSize, ...labelColor }}>{node.label}</div>
      {node.description && isDescVisible(node.id) &&
        <div className="text-gray-500 dark:text-zinc-500 mt-1 line-clamp-2 leading-tight"
             style={{ fontSize: ns.descSize, ...descColor }}>{node.description}</div>}
      {node.agentTools && node.agentTools.length > 0 && (
        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
          <span className="text-[8px] text-gray-400">Tools:</span>
          {node.agentTools.map(toolId => {
            const tn = nodes.find(n => n.id === toolId);
            return tn ? (
              <span key={toolId} className="text-[8px] px-1 py-0.5 rounded
                    bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">
                {tn.label}
              </span>
            ) : null;
          })}
        </div>
      )}
    </div>
  </div>
);
```

### B2.2: Fork / Join — Zentrierte Pill
```typescript
if (node.type === 'fork' || node.type === 'join') return (
  <div className="h-full flex flex-col items-center justify-center text-center px-2">
    <div className="rounded-full flex items-center justify-center mb-1"
         style={{ width: 32, height: 32, background: style.accent + '18' }}>
      {renderIcon(node, ns.iconSize)}
    </div>
    <div className="font-medium text-gray-900 dark:text-white truncate w-full"
         style={{ fontSize: ns.fontSize, ...labelColor }}>
      {node.label}
    </div>
    {/* Lane-Count Badge (nur wenn Modul E8 aktiv) */}
    {node.type === 'fork' && node.parallelLanes && (
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2
                      text-[8px] font-bold px-1.5 py-0.5 rounded-full
                      bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 z-20">
        {node.parallelLanes.length} Lanes
      </div>
    )}
  </div>
);
```

### B2.3: Condition-Agent — Pink Sparkles + Prompt Preview
```typescript
if (node.type === 'condition-agent') return (
  <div className="h-full flex items-center px-4 gap-3 relative">
    <div className="rounded-xl flex items-center justify-center shrink-0 relative"
         style={{ width: ns.iconBoxSize, height: ns.iconBoxSize, background: style.accent + '18' }}>
      {renderIcon(node, ns.iconSize)}
      {/* Sparkles badge (nur wenn Modul E9 aktiv) */}
      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-pink-500
                      flex items-center justify-center">
        <Sparkles size={8} className="text-white" />
      </div>
    </div>
    <div className="min-w-0 flex-1">
      <div className="font-bold text-gray-900 dark:text-white truncate"
           style={{ fontSize: ns.fontSize, ...labelColor }}>{node.label}</div>
      {node.description && isDescVisible(node.id) &&
        <div className="text-gray-500 dark:text-zinc-500 mt-0.5 line-clamp-2 leading-tight"
             style={{ fontSize: ns.descSize, ...descColor }}>{node.description}</div>}
      {node.conditionPrompt && (
        <div className="text-[8px] italic text-purple-400 mt-1 truncate">
          "{node.conditionPrompt.slice(0, 50)}..."
        </div>
      )}
    </div>
  </div>
);
```

---

## B3: NodeLab Theme Glow für neue Typen
**Version:** V3+V4 | **Abhängig von:** B1 und/oder B2 | **Risiko:** Niedrig
**Datei:** `WorkflowCanvas.tsx` Zeile 3893-3906 (case 'nodelab')

```typescript
case 'nodelab': {
  themeClass = 'absolute border backdrop-blur-sm select-none';
  const nlGlow =
    (node.type === 'ai' || node.type === 'agent')
      ? `0 0 30px ${style.accent}25, 0 0 60px ${style.accent}0c`
    : node.type === 'subsystem'
      ? `0 0 24px ${style.accent}20, 0 0 48px ${style.accent}0a`
    : (node.type === 'approval' || node.type === 'condition-agent')
      ? `0 0 22px ${style.accent}20`
    : `0 0 18px ${style.accent}18`;

  themeStyle = {
    background: (node.type === 'ai' || node.type === 'agent' || node.type === 'subsystem')
      ? (isDark ? style.accent + '0c' : style.accent + '0a')
      : (isDark ? style.accent + '09' : style.accent + '07'),
    borderColor: style.accent + (isDark ? '40' : '35'),
    boxShadow: nlGlow,
  };
  break;
}
```

---

# MODUL C: Connection Rendering

## C1: V3 Connection pathTypes (error, true/false, loop)
**Version:** V3 | **Abhängig von:** A1 | **Risiko:** Mittel
**Datei:** `WorkflowCanvas.tsx` Zeile 3426-3451

**Aktuell:** V3 Mode nutzt nur Source-Node Accent-Farbe.
**Neu:** pathType bestimmt Farbe, Dash-Pattern, Breite.

```typescript
{connStyleMode === 'v3' ? (() => {
  const isActive = fromStatus === 'completed' || fromStatus === 'running';
  const fromStyle = NODE_STYLES[fromNode.type];
  const pt = conn.pathType || 'default';

  let v3Color: string;
  let v3Dash: string | undefined;
  let v3Width: number;

  switch (pt) {
    // ── V3 Path Types ──
    case 'error':
      v3Color = '#ef4444'; v3Dash = '6 4'; v3Width = 2;
      break;
    case 'true':
      v3Color = '#10b981'; v3Width = isActive ? 2.5 : 1.5;
      break;
    case 'false':
      v3Color = '#f59e0b'; v3Width = isActive ? 2.5 : 1.5;
      break;
    case 'loop':
      v3Color = '#a855f7'; v3Width = isActive ? 2.5 : 1.5;
      break;

    // ── V4 Path Types (nur wenn C2 aktiv) ──
    case 'tool':
      v3Color = 'rgba(124,58,237,0.5)'; v3Dash = '3 5'; v3Width = 1.5;
      break;
    case 'mcp':
      v3Color = '#7c3aed'; v3Dash = '4 6'; v3Width = 1.5;
      break;
    case 'parallel':
      v3Color = '#0ea5e9'; v3Dash = '8 4'; v3Width = isActive ? 2.5 : 1.5;
      break;

    // ── Default: bisheriges Verhalten ──
    default:
      v3Color = isActive
        ? fromStyle.accent
        : fromStyle.accent + (isDark ? '70' : '55');
      v3Width = isActive ? 2.5 : 1.8;
      break;
  }

  if (isSelected) { v3Color = fromStyle.accent; v3Width = 3; }
  const v3Class = (isActive && !isSelected && !v3Dash) ? 'v2-connection-active' : '';

  return (
    <>
      {isActive && (
        <path d={pathD} stroke={v3Color} strokeWidth={v3Width * 3}
              fill="none" opacity={0.1} />
      )}
      <path d={pathD} stroke={v3Color}
            strokeWidth={isHovered ? v3Width + 0.5 : v3Width}
            strokeLinecap="round" strokeDasharray={v3Dash} fill="none"
            className={v3Class}
            style={{ transition: 'stroke 0.5s, stroke-width 0.3s' }} />
    </>
  );
})() : ( /* classic mode unverändert */ )}
```

**WICHTIG:** Der `default` Case muss EXAKT das bisherige Verhalten beibehalten.

---

## C2: V4 Connection pathTypes (tool, mcp, parallel)
**Version:** V4 | **Abhängig von:** C1 | **Risiko:** Niedrig

Bereits im C1 Switch-Statement enthalten (die V4 cases). Wenn C1 gebaut wird, kann man entscheiden:
- **Mit V4:** Alle cases einbauen
- **Ohne V4:** Die 3 V4-cases weglassen (tool/mcp/parallel landen dann im default)

---

## C3: Connection Labels farbig nach pathType
**Version:** V3+V4 | **Abhängig von:** C1 | **Risiko:** Niedrig
**Datei:** `WorkflowCanvas.tsx` ~Zeile 3473-3500

```typescript
// Vor dem Label-Rendering berechnen:
const connLabelColor = (() => {
  const pt = conn.pathType;
  if (!pt || pt === 'default') return isDark ? '#d4d4d8' : '#374151';
  switch (pt) {
    case 'error': return '#ef4444';
    case 'true': return '#10b981';
    case 'false': return '#f59e0b';
    case 'loop': return '#a855f7';
    case 'mcp': case 'tool': return '#7c3aed';
    case 'parallel': return '#0ea5e9';
    default: return isDark ? '#d4d4d8' : '#374151';
  }
})();

// Im Label-Pill `color:` Attribut verwenden:
color: connLabelColor,
```

---

# MODUL D: CSS Animationen

Alle CSS-Module sind unabhängig. Jedes fügt `@keyframes` + Klassen zum bestehenden `<style>` Block hinzu.

## D1: Approval Pulse Animation
**Version:** V3 | **Risiko:** Niedrig

```css
@keyframes v3-approval-pulse {
  0%, 100% { box-shadow: 0 0 0 2px #f59e0b, 0 0 12px rgba(245,158,11,0.2); }
  50%       { box-shadow: 0 0 0 4px #f59e0b, 0 0 24px rgba(245,158,11,0.35); }
}
.v3-approval-waiting { animation: v3-approval-pulse 2s ease-in-out infinite; }
```
**Verwendung:** Approval-Node bekommt Klasse `v3-approval-waiting` wenn Status=running/pending.

---

## D2: Retry Spin Animation
**Version:** V3 | **Risiko:** Niedrig

```css
@keyframes v3-retry-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```
**Verwendung:** Retry Badge Icon (`RefreshCw`) dreht sich bei aktivem Retry.

---

## D3: Agent Think Animation
**Version:** V4 | **Risiko:** Niedrig

```css
@keyframes v3-agent-think {
  0%, 100% { box-shadow: 0 0 0 2px #7c3aed, 0 0 20px rgba(124,58,237,0.2); }
  50%       { box-shadow: 0 0 0 3px #7c3aed, 0 0 35px rgba(124,58,237,0.4); }
}
.v3-agent-thinking { animation: v3-agent-think 1.5s ease-in-out infinite; }
```
**Verwendung:** Agent-Node bekommt Klasse `v3-agent-thinking` wenn Status=running.

---

## D4: MCP Pulse + MCP Connection
**Version:** V4 | **Risiko:** Niedrig

```css
@keyframes v3-mcp-pulse {
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 1; }
}
.v3-mcp-badge { animation: v3-mcp-pulse 2s ease-in-out infinite; }

@keyframes v3-data-flow {
  0%   { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}
.v3-mcp-connection {
  stroke-dasharray: 4 6;
  animation: v3-data-flow 1s linear infinite;
}
```

---

## D5: Breakpoint Blink + Draft/Published Gradients
**Version:** V4 | **Risiko:** Niedrig

```css
@keyframes v3-breakpoint-pause {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.v3-draft-badge { background: linear-gradient(135deg, #f59e0b, #fbbf24); color: white; }
.v3-published-badge { background: linear-gradient(135deg, #10b981, #34d399); color: white; }
```

---

# MODUL E: Badges (alle optional, unabhängig voneinander)

Alle Badges werden im Node-JSX nach den bestehenden Badges eingefügt (~Zeile 4073+).

## E1: Retry Badge (V3)
**Abhängig von:** A1 (retryConfig Feld), D2 (Spin-Animation)
```typescript
{node.retryConfig && (
  <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center
                  justify-center z-20 border border-white dark:border-zinc-900"
       style={{ background: '#6366f1' }}
       title={`Retry: ${node.retryConfig.maxRetries}x, ${node.retryConfig.backoff}`}>
    <Repeat size={9} className="text-white" />
  </div>
)}
```

## E2: Approval Assignee/Deadline (V3)
**Abhängig von:** B1 (Approval Rendering)
Bereits in B1.2 eingebaut — Assignee-Pill + Clock-Deadline im Node-Body.

## E3: MCP Badge (V4)
**Abhängig von:** A1 (mcpEnabled Feld), D4 (Pulse-Animation)

Agent-Dot ist in B2.1 eingebaut. Non-Agent MCP Pill:
```typescript
{node.mcpEnabled && node.type !== 'agent' && (
  <div className="absolute top-1 left-1 flex items-center gap-1 px-1.5 py-0.5
                  rounded-full z-25 v3-mcp-badge"
       style={{
         background: isDark ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.1)',
         border: '1px dashed rgba(124,58,237,0.4)',
       }}>
    <Cpu size={8} className="text-purple-500" />
    <span className="text-[7px] font-bold text-purple-500">MCP</span>
  </div>
)}
```

## E4: Draft/Published Badge (V4)
**Abhängig von:** A1 (draftState Feld), D5 (Gradient CSS)
```typescript
{node.draftState && (
  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[7px] font-bold uppercase
                   tracking-wider px-2 py-0.5 rounded-full z-30
                   ${node.draftState === 'draft' ? 'v3-draft-badge' : 'v3-published-badge'}`}>
    {node.draftState === 'draft' ? 'Draft' : 'Published'}
  </div>
)}
```

## E5: AI Memory Type Badge (V4)
**Abhängig von:** A1 (memoryType Feld)
```typescript
{node.memoryType && (
  <div className="absolute bottom-1 left-1 flex items-center gap-1 px-1.5 py-0.5 rounded-md z-25"
       style={{
         background: isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.08)',
         border: '1px solid rgba(139,92,246,0.2)',
       }}>
    <Database size={8} className="text-violet-500" />
    <span className="text-[7px] font-bold text-violet-500 capitalize">{node.memoryType}</span>
  </div>
)}
```

## E6: Error Directive Badge (V4)
**Abhängig von:** A1 (errorDirective Feld)
```typescript
{node.errorDirective && (
  <div className="absolute -bottom-2.5 right-2 flex items-center gap-0.5 px-1.5 py-0.5
                  rounded-full z-25"
       style={{
         background: node.errorDirective === 'break' ? '#ef444420'
           : node.errorDirective === 'continue' ? '#10b98120'
           : node.errorDirective === 'rollback' ? '#f59e0b20' : '#3b82f620',
         border: `1px solid ${
           node.errorDirective === 'break' ? '#ef444440'
           : node.errorDirective === 'continue' ? '#10b98140'
           : node.errorDirective === 'rollback' ? '#f59e0b40' : '#3b82f640'}`,
       }}>
    <span className="text-[7px] font-bold capitalize"
          style={{
            color: node.errorDirective === 'break' ? '#ef4444'
              : node.errorDirective === 'continue' ? '#10b981'
              : node.errorDirective === 'rollback' ? '#f59e0b' : '#3b82f6',
          }}>
      {node.errorDirective}
    </span>
  </div>
)}
```

## E7: Breakpoint Indicator (V4)
**Abhängig von:** A1 (hasBreakpoint Feld), D5 (Blink CSS)
```typescript
{node.hasBreakpoint && (
  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full z-30
                  border-2 border-white dark:border-zinc-900"
       style={{ background: '#ef4444', boxShadow: '0 0 8px rgba(239,68,68,0.5)' }} />
)}
```

## E8: Fork Lane Count Badge (V4)
**Abhängig von:** B2 (Fork Rendering)
Bereits in B2.2 eingebaut — Lane-Count Pill unter Fork-Nodes.

## E9: Condition-Agent Sparkles + Prompt (V4)
**Abhängig von:** B2 (Condition-Agent Rendering)
Bereits in B2.3 eingebaut — Pink Sparkles Dot + italic Prompt-Preview.

---

# MODUL F: Node Palette

## F1: V3 Typen in Palette (V3)
**Abhängig von:** A1, A2 | **Risiko:** Niedrig

| Type | Default Icon | DE | EN |
|------|-------------|----|----|
| ifelse | `git-branch` | Wenn/Dann | If/Else |
| merge | `git-merge` | Zusammenführen | Merge |
| wait | `timer` | Warten | Wait |
| iterator | `repeat` | Iterator | Iterator |
| router | `shuffle` | Router | Router |
| error-handler | `shield-alert` | Error Handler | Error Handler |
| approval | `shield-check` | Freigabe | Approval |

## F2: V4 Typen in Palette (V4)
**Abhängig von:** A1, A2 | **Risiko:** Niedrig

| Type | Default Icon | DE | EN |
|------|-------------|----|----|
| agent | `bot` | KI-Agent | AI Agent |
| fork | `split` | Aufteilen | Fork |
| join | `git-merge` | Zusammenführen | Join |
| condition-agent | `brain` | KI-Bedingung | AI Condition |

---

# MODUL G: Canvas Settings UI

## G1: Theme Label Update (UI)
```
Vorher: { key: 'nodelab', de: 'NodeLab V2', en: 'NodeLab V2' }
Nachher: { key: 'nodelab', de: 'NodeLab V3', en: 'NodeLab V3' }
```

## G2: Badge-Toggles (UI)
**Abhängig von:** E3-E7 | Neue Toggles im Settings Panel:

```
[x] Type-Badges         (bereits vorhanden)
[x] MCP-Badges          (NEU, steuert E3)
[x] Draft/Published     (NEU, steuert E4)
[x] Error Directives    (NEU, steuert E6)
[x] Breakpoints         (NEU, steuert E7)
[x] Memory Types        (NEU, steuert E5)
```

Alle standardmäßig AN. Jeder Toggle braucht einen eigenen `useState<boolean>`.

---

# MODUL H: Demo-Daten

## H1: V3 Demo-Nodes (V3)
**Abhängig von:** B1, C1

In einem Subsystem des Recruiting-Systems hinzufügen:
- 1x `ifelse` — "Bewerbung qualifiziert?"
- 1x `approval` — "Kundenfreigabe" (approvalAssignee: 'PM', approvalDeadline: '24h')
- 1x `error-handler` — "Fehlerbehandlung"
- Connections mit `pathType: 'true'` / `'false'` / `'error'`

## H2: V4 Demo-Nodes (V4)
**Abhängig von:** B2, C2

In einem Subsystem hinzufügen:
- 1x `agent` — "KI-Analyse Agent" (mcpEnabled, agentTools, memoryType: 'window')
- 1x `condition-agent` — "KI-Routing" (conditionPrompt: "Qualität > 80%?")
- 1x `fork` / 1x `join` — Parallele Verarbeitung (parallelLanes: ['CRM', 'Notify', 'Report'])
- Connections mit `pathType: 'tool'` / `'parallel'`

---

# Ausführungsreihenfolge

```
┌─────────────────────────────────────────┐
│  IMMER ZUERST: A1 → A3 → A2            │  Basis (30 min)
│  ├── tsc --noEmit Checkpoint ──         │
└────────────────┬────────────────────────┘
                 │
     ┌───────────┴───────────┐
     │                       │
┌────▼────┐            ┌─────▼─────┐
│ V3 PATH │            │ V4 PATH   │
│         │            │           │
│ B1      │            │ B2        │  Node Rendering
│ C1, C3  │            │ C2        │  Connections
│ D1, D2  │            │ D3,D4,D5  │  CSS
│ E1, E2  │            │ E3-E9     │  Badges
│ F1      │            │ F2        │  Palette
│ H1      │            │ H2        │  Demo
│         │            │           │
│ ~1.5h   │            │ ~1.5h     │
└────┬────┘            └─────┬─────┘
     │                       │
     └───────────┬───────────┘
                 │
     ┌───────────▼───────────┐
     │  B3 + G1 + G2         │  Gemeinsam (15 min)
     │  vite build Checkpoint │
     │  Playwright Test       │
     └───────────────────────┘
```

---

# Risiko-Matrix

| Modul | Risiko | Grund | Mitigation |
|-------|--------|-------|------------|
| A1-A3 | Niedrig | Nur Types + Imports | tsc --noEmit |
| B1, B2 | **Mittel** | Großer JSX-Block | Jeden Branch einzeln testen, NICHTS Bestehendes ändern |
| B3 | Niedrig | Nur Glow-Werte anpassen | — |
| C1 | **Mittel** | Ändert Connection-Rendering | Default-Case MUSS bisheriges Verhalten halten |
| C2, C3 | Niedrig | Additive Cases | — |
| D1-D5 | Niedrig | Rein additive CSS | `v3-` Prefix für alle Klassen |
| E1-E9 | Niedrig | Optional, rein additives JSX | Optional-Chaining für neue Felder |
| F1-F2 | Niedrig | UI-Additions | — |
| G1-G2 | Niedrig | Settings UI | — |
| H1-H2 | Niedrig | Nur Daten | — |

---

# Debugging-Checkliste

### Nodes nicht sichtbar / falsche Größe:
1. `console.log(node.type, NODE_SIZES[node.type])` — Type existiert im Record?
2. `nodeW(node)` / `nodeH(node)` — Richtige Werte?
3. Neuer `if`-Branch steht VOR dem default `return`?
4. NODE_SIZES hat alle 16 Typen?

### Connections falsche Farbe:
1. `console.log(conn.pathType)` — Ist pathType gesetzt?
2. `connStyleMode === 'classic'` testen → funktioniert wie vorher?
3. Default-Case im Switch → bisheriges Verhalten?

### TypeScript Fehler:
1. Alle 16 Typen in NODE_SIZES UND NODE_STYLES?
2. Hyphen-Typen korrekt: `'error-handler'`, `'condition-agent'`
3. `ConnectionPathType` exportiert?
4. `labelEn` Feld überall ergänzt?

### Badges unsichtbar:
1. z-Index >= 20?
2. Feld auf Node gesetzt? (`node.retryConfig`, `node.draftState`, etc.)
3. CSS-Klasse korrekt? (`v3-draft-badge`, nicht `v3-draft`)

### Animationen laufen nicht:
1. DevTools → Elements → `<style>` Tag enthält `@keyframes`?
2. Klassenname exakt gleich wie Animation?
3. CSS wird im `<style>` Tag injiziert (nicht extern)?

---

# Regressions-Tests (nach jeder Phase)

1. Client Onboarding öffnen → unverändert?
2. Marketing Fulfillment öffnen → unverändert?
3. Recruiting Master → Subsystem Drill-Down → funktioniert?
4. Theme wechseln (Classic, Glass, etc.) → funktioniert?
5. Connection Mode: V3 ↔ Classic → funktioniert?
6. Add Node → alle Typen sichtbar + erstellbar?
7. Drag & Drop → Snapping korrekt bei verschiedenen Größen?
8. Connections zwischen verschiedenen Node-Größen → Bezier korrekt?

---

# Ausgeschlossen (User-Entscheidung)

| Feature | Version | Grund |
|---------|---------|-------|
| **Circuit Breaker** | V3 | User-Wunsch: ausgeschlossen |
| **Schema/Type Ports** | V3 | User-Wunsch: ausgeschlossen |

# Nicht portiert (technische Gründe)

| Feature | Version | Grund |
|---------|---------|-------|
| **Multiplayer Cursors** | V4 | Kein Backend, rein simuliertes Demo-Feature |
| **Agent Reasoning Trace** | V4 | Inspect Panel Feature, nicht Canvas-Rendering |
| **Simulation Engine** | V2+ | Separate Logik, nicht Teil des visuellen Portings |
| **Iterator Progress Bar** | V2 | Benötigt Simulation Engine (Items zählen) |
| **Wait Timer Display** | V2 | Benötigt Simulation Engine (Countdown) |
| **Blueprint Export/Import** | V4 | Separates Feature, nicht visuelles Porting |
| **Data Preview Hover Popup** | V2 | Bereits in /systems implementiert ✅ |
| **Execution Replay Controls** | V2 | Benötigt Simulation Engine |
