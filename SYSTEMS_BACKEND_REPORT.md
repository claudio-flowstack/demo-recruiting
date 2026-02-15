# Flowstack — Systems (/systems) Backend Integration Report

> **Purpose:** This document describes every single feature in the `/systems` section of the Flowstack UI. For each feature it explains: what it does, what the user intention is, what a successful result looks like, and exactly what the backend needs to provide so the feature works in production.
>
> **Current state:** Everything runs 100% client-side with localStorage. There is no backend. All data, execution, and persistence is mocked or stored in the browser.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Data Model Reference](#2-data-model-reference)
3. [Dashboard Overview](#3-dashboard-overview)
4. [System CRUD](#4-system-crud)
5. [Workflow Canvas (Builder)](#5-workflow-canvas-builder)
6. [Workflow Execution](#6-workflow-execution)
7. [Execution Log](#7-execution-log)
8. [Version History](#8-version-history)
9. [System Resources](#9-system-resources)
10. [System Outputs](#10-system-outputs)
11. [Templates](#11-templates)
12. [Wizard Builder](#12-wizard-builder)
13. [Funnel Visualizer](#13-funnel-visualizer)
14. [Settings](#14-settings)
15. [Export Features](#15-export-features)
16. [Webhook Management](#16-webhook-management)
17. [Tool Integrations](#17-tool-integrations)
18. [Suggested API Endpoints](#18-suggested-api-endpoints)

---

## 1. Architecture Overview

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS (dark mode via `dark:` prefix) |
| Routing | React Router v7 |
| i18n | Custom `useLanguage()` hook (DE/EN) |
| State | React useState/useCallback (no Redux) |
| Persistence | localStorage (no backend) |

### Key Files

| File | Purpose | Lines |
|------|---------|-------|
| `src/pages/AutomationDashboardPage.tsx` | Main dashboard page — sidebar, routing, all views | ~2800 |
| `src/components/automation/WorkflowCanvas.tsx` | Visual drag-drop workflow editor | ~4100 |
| `src/components/automation/FunnelCanvas.tsx` | Funnel/marketing flow visualizer | ~2900 |
| `src/components/automation/WizardTemplateBuilder.tsx` | Step-by-step guided workflow builder | ~1950 |
| `src/types/automation.ts` | All TypeScript interfaces | ~176 |
| `src/data/automationSystems.ts` | System storage + demo data | ~229 |
| `src/data/automationTemplates.ts` | Built-in workflow templates | ~1200 |
| `src/data/resourceStorage.ts` | Resource CRUD for localStorage | ~60 |
| `src/data/paletteItems.ts` | Node palette catalog (tools list) | ~80 |
| `src/utils/wizardConverter.ts` | Wizard tree → AutomationSystem converter | ~273 |

### localStorage Keys

| Key | Stores | Type |
|-----|--------|------|
| `flowstack-automation-systems` | User-created workflow systems | `AutomationSystem[]` |
| `flowstack-hidden-demos` | IDs of hidden demo systems | `string[]` |
| `flowstack-system-resources` | Resources attached to systems | `SystemResource[]` |
| `flowstack-user-templates` | User-created templates | `AutomationSystem[]` |
| `flowstack-funnels` | Funnel boards | `FunnelBoard[]` |
| `fs_automation_settings` | Dashboard settings (toggles) | `object` |

---

## 2. Data Model Reference

### AutomationSystem (the core entity)

```typescript
interface AutomationSystem {
  id: string;                    // "user-1707123456789" or "demo-1"
  name: string;                  // Display name
  description: string;           // System description
  category: string;              // "Marketing" | "Sales" | "Operations" | ...
  icon: string;                  // Lucide icon key (e.g. "users")
  status: 'active' | 'draft';   // System status
  webhookUrl: string;            // Webhook trigger URL (currently always "")
  nodes: SystemNode[];           // Workflow steps on the canvas
  connections: NodeConnection[]; // Lines between nodes
  groups?: CanvasGroup[];        // Visual phase/group containers
  stickyNotes?: StickyNote[];    // Canvas annotation notes
  outputs: SystemOutput[];       // Generated artifacts/results
  lastExecuted?: string;         // ISO timestamp
  executionCount: number;        // Total runs
  canvasZoom?: number;           // Saved zoom level
  canvasPan?: { x: number; y: number }; // Saved pan offset
  executionLog?: ExecutionLogEntry[];    // Execution event log
  versions?: WorkflowVersion[];          // Snapshot history (max 20)
}
```

### SystemNode (a step in the workflow)

```typescript
interface SystemNode {
  id: string;
  label: string;                        // e.g. "KI-Transkription"
  description: string;                  // e.g. "Gespräch wird transkribiert"
  icon: string;                         // Lucide key OR "logo-openai" etc.
  logoUrl?: string;                     // Custom logo image URL
  type: 'trigger' | 'process' | 'ai' | 'output';
  x: number;                            // Canvas position
  y: number;
  linkedResourceType?: ResourceType;    // Links to a resource category
  linkedResourceId?: string;            // Links to a specific resource
  linkedPage?: string;                  // Internal navigation link
}
```

### Other Types

```typescript
interface NodeConnection {
  from: string; to: string;
  fromPort?: 'top'|'right'|'bottom'|'left';
  toPort?: 'top'|'right'|'bottom'|'left';
  label?: string;
}

interface CanvasGroup {
  id: string; label: string; description?: string;
  x: number; y: number; width: number; height: number;
  color: string; // 'blue'|'green'|'purple'|'orange'|'red'|'gray'
}

interface StickyNote {
  id: string; text: string;
  x: number; y: number; width: number; height: number;
  color: 'yellow'|'blue'|'green'|'pink'|'orange'|'purple'|'red'|'gray';
  fontWeight?: 'normal'|'bold';
  fontStyle?: 'normal'|'italic';
  customTextColor?: string;
  fontSize?: number;
}

interface SystemOutput {
  id: string; name: string;
  type: 'document'|'folder'|'website'|'spreadsheet'|'email'|'image'|'other';
  link: string; createdAt: string;
  contentPreview?: string;
  artifactType?: 'file'|'text'|'url'|'website'|'image';
}

interface SystemResource {
  id: string; systemId: string; title: string;
  type: 'transcript'|'document'|'note'|'dataset'|'form'|'page';
  content: string; fileReference?: string;
  createdAt: string; source?: string;
}

interface ExecutionLogEntry {
  id: string; timestamp: string;
  status: 'success'|'error'|'warning'|'running';
  message: string; nodeId?: string; duration?: number;
}

interface WorkflowVersion {
  id: string; timestamp: string; label?: string;
  nodeCount: number; connectionCount: number;
  snapshot: string; // JSON of {nodes, connections}
}
```

---

## 3. Dashboard Overview

### 3.1 System List Display

| Aspect | Detail |
|--------|--------|
| **What it does** | Shows all systems (4 built-in demos + user-created) in a grid or list view with search, status filter, and sorting |
| **Intention** | Give the user a quick overview of all their automation workflows and their current state |
| **Success criteria** | User sees all systems, can find any system quickly, and understands the status of each at a glance |
| **Current implementation** | Loads from `localStorage` via `loadUserSystems()` + `getVisibleDemoSystems()` |

**Backend needs:**
- `GET /api/systems` — Returns all systems for the authenticated user
- Query params: `?search=`, `?status=active|draft`, `?sort=name|date|status|executions`, `?order=asc|desc`
- Response should include: id, name, description, category, icon, status, executionCount, lastExecuted, nodeCount

### 3.2 KPI Statistics Cards

| Aspect | Detail |
|--------|--------|
| **What it does** | Displays 3 metric cards: Total Systems, Active Systems, Total Executions |
| **Intention** | Quick health check — how many workflows exist, how many are running, how often they fire |
| **Success criteria** | Numbers are accurate and update in real-time when systems change |
| **Current implementation** | Calculated client-side from `systems.length`, `filter(active).length`, `reduce(executionCount)` |

**Backend needs:**
- `GET /api/systems/stats` — Returns `{ totalSystems, activeSystems, totalExecutions }`
- Or compute from the system list endpoint response

### 3.3 Search, Filter, Sort

| Aspect | Detail |
|--------|--------|
| **What it does** | Search by name/description/category. Filter by status (all/active/draft). Sort by name/date/status/executions in asc/desc |
| **Intention** | Find any system quickly even with 50+ workflows |
| **Success criteria** | Instant filtering (<100ms), results match expectations |
| **Current implementation** | All client-side filtering on the full system array |

**Backend needs:**
- Same `GET /api/systems` with query params (see 3.1)
- For large datasets: server-side pagination `?page=1&limit=20`

---

## 4. System CRUD

### 4.1 Create System

| Aspect | Detail |
|--------|--------|
| **What it does** | Creates a new automation system. Three paths: (a) from template, (b) from wizard builder, (c) blank system |
| **Intention** | User wants to build a new automation workflow |
| **Success criteria** | New system appears in the list, opens in the canvas editor, has the correct initial nodes/connections if created from a template |
| **Current implementation** | Generates `id: 'user-' + Date.now()`, sets `status: 'draft'`, saves to localStorage |

**Backend needs:**
- `POST /api/systems` — Body: `{ name, description, category, icon, nodes, connections, groups }` — Returns: created system with server-generated ID
- For template creation: the template data is sent as the initial state

### 4.2 Read/Open System

| Aspect | Detail |
|--------|--------|
| **What it does** | Opens a system in the detail view with tabs: Workflow (canvas), Resources, Execution Log, Versions |
| **Intention** | User wants to view or edit an existing workflow |
| **Success criteria** | Canvas loads with all nodes/connections/groups in their saved positions. All tabs show correct data |
| **Current implementation** | `findSystem(id)` searches demo + user arrays |

**Backend needs:**
- `GET /api/systems/:id` — Returns full `AutomationSystem` object including nodes, connections, groups, stickyNotes, outputs, executionLog, versions

### 4.3 Update/Save System

| Aspect | Detail |
|--------|--------|
| **What it does** | Saves all changes to a system: node positions, connections, groups, sticky notes, metadata, zoom/pan state |
| **Intention** | Persist the user's work so nothing is lost |
| **Success criteria** | After page reload, the system looks exactly the same. A version snapshot is created automatically |
| **Current implementation** | `saveUserSystems()` overwrites the entire array in localStorage. Version snapshot appended to `system.versions[]` (max 20) |

**Backend needs:**
- `PUT /api/systems/:id` — Body: full or partial `AutomationSystem` — Returns: updated system
- Server should auto-create a version snapshot on each save
- Consider: optimistic locking (version number) to prevent concurrent edit conflicts

### 4.4 Delete System

| Aspect | Detail |
|--------|--------|
| **What it does** | Permanently removes a user-created system. For demo systems: hides them from the list (reversible) |
| **Intention** | User wants to clean up unused workflows |
| **Success criteria** | System disappears from list. User systems are permanently gone. Demo systems can be restored |
| **Current implementation** | Filters from user array + saves. Demos go to `flowstack-hidden-demos` list |

**Backend needs:**
- `DELETE /api/systems/:id` — Soft delete recommended (for undo)
- For demo systems: `POST /api/systems/:id/hide` and `POST /api/systems/:id/unhide`

### 4.5 Toggle System Status

| Aspect | Detail |
|--------|--------|
| **What it does** | Switches a system between `active` and `draft` status |
| **Intention** | `active` = workflow should be triggerable/running. `draft` = work in progress, not live |
| **Success criteria** | Status badge updates. Active systems should be callable via webhook/trigger. Draft systems should not execute |
| **Current implementation** | Toggles `status` field and saves to localStorage |

**Backend needs:**
- `PATCH /api/systems/:id/status` — Body: `{ status: 'active' | 'draft' }`
- When set to `active`: backend should register webhook listener, enable scheduled triggers, etc.
- When set to `draft`: backend should deactivate all triggers

### 4.6 Duplicate System

| Aspect | Detail |
|--------|--------|
| **What it does** | Deep-clones a system with new IDs for all nodes, connections, and groups. Sets status to `draft` |
| **Intention** | User wants to create a variation of an existing workflow without starting from scratch |
| **Success criteria** | New system appears with "(Kopie)" suffix. All nodes/connections are identical but with new IDs. Original system is unchanged |
| **Current implementation** | `structuredClone()` + new ID generation |

**Backend needs:**
- `POST /api/systems/:id/duplicate` — Returns: new system with server-generated IDs
- Server must deep-clone and re-ID all nested entities

---

## 5. Workflow Canvas (Builder)

### 5.1 Node Management

| Aspect | Detail |
|--------|--------|
| **What it does** | Add nodes from a palette of 25+ tools (OpenAI, Slack, Google Sheets, etc.). Edit node label, description, icon, type. Drag to reposition. Delete with keyboard or context menu |
| **Intention** | Build the workflow visually — each node represents one step/tool in the automation |
| **Success criteria** | Nodes appear on canvas, can be freely positioned, and display correct tool icons. Changes persist on save |
| **Current implementation** | All client-side. Nodes are `SystemNode[]` objects with x/y coordinates |

**Backend needs:**
- No separate endpoint needed — nodes are part of the system save (`PUT /api/systems/:id`)
- Backend must accept and store the full `nodes[]` array

### 5.2 Connection Management

| Aspect | Detail |
|--------|--------|
| **What it does** | Connect nodes by clicking source → target ports. Supports 4-directional ports (top/right/bottom/left). Connection labels editable via double-click. Cycle detection prevents infinite loops |
| **Intention** | Define the execution flow — which step runs after which, and in what order |
| **Success criteria** | Connections render as bezier curves. Arrows show direction. No circular dependencies possible. Labels describe the flow condition |
| **Current implementation** | Client-side only. Connections stored as `{ from, to, fromPort?, toPort?, label? }` |

**Backend needs:**
- Part of system save — `connections[]` array stored with the system
- Backend should validate: no cycles, all referenced node IDs exist
- **Important for execution:** Connection labels like "if success" / "on error" should map to execution branching rules. Backend needs to interpret these as conditional routing

### 5.3 Groups (Phases)

| Aspect | Detail |
|--------|--------|
| **What it does** | Visual colored rectangles that group related nodes. 6 colors available. Resizable and repositionable. Label and optional description |
| **Intention** | Organize complex workflows into logical phases (e.g. "Data Collection" → "AI Processing" → "Output Delivery") |
| **Success criteria** | Groups visually contain their nodes. Colors are distinguishable. Groups don't overlap accidentally |
| **Current implementation** | `CanvasGroup[]` — purely visual, no functional meaning |

**Backend needs:**
- Part of system save — `groups[]` array
- Groups are UI-only, no backend logic needed
- Optional: use groups to define execution stages/phases for monitoring

### 5.4 Sticky Notes

| Aspect | Detail |
|--------|--------|
| **What it does** | Annotation notes on the canvas. 8 colors, bold/italic, custom text color, font size. Resizable and draggable |
| **Intention** | Add documentation/comments directly on the workflow canvas |
| **Success criteria** | Notes are readable, persist across sessions, don't interfere with workflow execution |
| **Current implementation** | `StickyNote[]` array on the system |

**Backend needs:**
- Part of system save — `stickyNotes[]` array
- No backend logic — purely visual annotations

### 5.5 Canvas Zoom & Pan

| Aspect | Detail |
|--------|--------|
| **What it does** | Mouse wheel zoom (0.3x–3.0x). Drag-to-pan. Double-click to fit-to-view. Keyboard: +/-/0. Persisted zoom+pan on save |
| **Intention** | Navigate large workflows comfortably |
| **Success criteria** | Opening a saved system shows the same zoom/pan as when it was saved |

**Backend needs:**
- `canvasZoom` and `canvasPan` fields on the system — stored with save, no backend logic

### 5.6 Undo/Redo

| Aspect | Detail |
|--------|--------|
| **What it does** | Ctrl+Z / Ctrl+Y to undo/redo canvas changes. Max 50 history states |
| **Intention** | Safely experiment with changes — any mistake can be reverted |
| **Success criteria** | Every action (move, add, delete, connect) is undoable |

**Backend needs:**
- None — entirely client-side. History is in-memory and resets on page reload
- Optional: for collaborative editing, server-side operation log

### 5.7 Auto-Layout

| Aspect | Detail |
|--------|--------|
| **What it does** | BFS-based automatic node positioning. Arranges nodes in hierarchical left-to-right layers based on connection graph |
| **Intention** | Clean up messy layouts automatically |
| **Success criteria** | All nodes are visible, non-overlapping, and flow logically from triggers → processing → outputs |

**Backend needs:**
- None — client-side algorithm

### 5.8 Node Search

| Aspect | Detail |
|--------|--------|
| **What it does** | Ctrl+F opens search bar. Searches node labels. Highlights and zooms to matching nodes |
| **Intention** | Find specific nodes in large workflows |
| **Success criteria** | Matching node is highlighted and centered on screen |

**Backend needs:**
- None — client-side only

### 5.9 Linked Resources on Nodes

| Aspect | Detail |
|--------|--------|
| **What it does** | Each node can link to a resource type (e.g. "transcript") or a specific resource ID. Also supports linking to internal pages (/onboarding, /dashboard, etc.). Shows a purple badge on the node |
| **Intention** | Connect workflow steps to their input/output data. Click a node → jump to the related resource or page |
| **Success criteria** | Clicking the badge navigates to the correct resource/page. Resource data is available for the node during execution |

**Backend needs:**
- `linkedResourceType` and `linkedResourceId` on nodes tell the execution engine which resource to use as input
- `GET /api/resources/:id` — fetch the linked resource content for node execution
- Internal page links (`linkedPage`) are client-side routing, no backend needed

### 5.10 Presentation Mode

| Aspect | Detail |
|--------|--------|
| **What it does** | Read-only view that shows workflow execution progress. Nodes light up as they execute. Connection arrows animate. Status overlay hides after 3s |
| **Intention** | Present the workflow to stakeholders or watch execution progress in real-time |
| **Success criteria** | Each node visually transitions: idle → pending → running → completed/failed. Real-time streaming feel |

**Backend needs:**
- Real-time execution status updates (see Section 6)
- `nodeStates: Map<string, 'idle'|'pending'|'running'|'completed'|'failed'>` fed via WebSocket/SSE

---

## 6. Workflow Execution

### 6.1 Execute Workflow

| Aspect | Detail |
|--------|--------|
| **What it does** | Runs the entire workflow. Currently simulates: processes nodes in topological order with 600ms staggered delays. Random success/warning assignment. Updates execution count and lastExecuted timestamp |
| **Intention** | The core feature — actually run the automation: call AI APIs, send emails, update CRMs, generate documents, etc. |
| **Success criteria** | Every node executes its configured tool integration. Outputs are generated. Errors are caught and logged. The user sees real-time progress |
| **Current implementation** | 100% fake — animation only, no real API calls |

**Backend needs:**

This is the most critical backend feature. Requirements:

1. **Execution Engine:**
   - `POST /api/systems/:id/execute` — Starts execution, returns `executionId`
   - Engine reads the workflow graph (nodes + connections)
   - Executes nodes in topological order respecting connections
   - For parallel branches: executes concurrently
   - Each node calls its configured integration (OpenAI, Slack, Google Sheets, etc.)

2. **Real-Time Status Streaming:**
   - `GET /api/executions/:executionId/stream` (Server-Sent Events) or WebSocket
   - Events: `{ nodeId, status: 'pending'|'running'|'completed'|'failed', message, duration, timestamp }`
   - Frontend maps these to `nodeStates` prop on WorkflowCanvas for visual updates

3. **Node Type Handlers:**
   - `trigger` nodes: Entry points — webhook receivers, scheduled triggers, manual start
   - `process` nodes: Data transformation — filter, merge, split, lookup
   - `ai` nodes: API calls to OpenAI/Claude — send prompt, receive response
   - `output` nodes: Send email, create document, post to Slack, update CRM

4. **Error Handling:**
   - Per-node error catching with retry logic
   - Connection labels as conditional routing ("on error" → error handling path)
   - Timeout per node (configurable)
   - Full execution rollback option

5. **Result Storage:**
   - Each execution produces outputs → stored in `system.outputs[]`
   - Execution log entries → stored in `system.executionLog[]`
   - Execution count increment + lastExecuted timestamp update

---

## 7. Execution Log

### 7.1 View Execution Log

| Aspect | Detail |
|--------|--------|
| **What it does** | Timeline of execution events. Each entry shows: timestamp, status (success/error/warning/running), message, associated node, duration in ms |
| **Intention** | Debug workflow runs — see what happened at each step, where errors occurred, how long each step took |
| **Success criteria** | Log shows complete history of all runs. Errors are clearly highlighted. User can trace any failure to a specific node |
| **Current implementation** | `executionLog: ExecutionLogEntry[]` on the system — populated during mock execution |

**Backend needs:**
- `GET /api/systems/:id/executions` — Returns list of execution runs
- `GET /api/executions/:executionId/log` — Returns `ExecutionLogEntry[]` for a specific run
- Log entries created by the execution engine in real-time
- Must include: `nodeId` for tracing, `duration` for performance monitoring

### 7.2 Clear Execution Log

| Aspect | Detail |
|--------|--------|
| **What it does** | Deletes all log entries for the current system |
| **Intention** | Clean up old/test run data |
| **Success criteria** | Log is empty. No side effects on system functionality |

**Backend needs:**
- `DELETE /api/systems/:id/executions` — Clears all execution history
- Or: `DELETE /api/executions/:executionId` — Clear specific run

---

## 8. Version History

### 8.1 Automatic Snapshots

| Aspect | Detail |
|--------|--------|
| **What it does** | Every time the user saves, a snapshot of the current nodes + connections is stored as a version. Max 20 versions kept. Shows: version number, timestamp, node count, connection count |
| **Intention** | Never lose work — always be able to go back to a previous state |
| **Success criteria** | After 5 saves, 5 versions exist. Each can be inspected and restored |
| **Current implementation** | `system.versions[]` — JSON stringified snapshot pushed on save, sliced to last 20 |

**Backend needs:**
- `POST /api/systems/:id/versions` — Created automatically on system save
- `GET /api/systems/:id/versions` — Returns list of versions with metadata
- Storage: each version stores `{ nodes, connections }` as JSON blob

### 8.2 Restore Version

| Aspect | Detail |
|--------|--------|
| **What it does** | User clicks "Restore" on a version → system nodes and connections are replaced with the snapshot data. Requires confirmation dialog |
| **Intention** | Revert to a known-good state after making breaking changes |
| **Success criteria** | After restore, the canvas shows the exact state from that version. A new "current" version is created so the restore itself can be undone |

**Backend needs:**
- `POST /api/systems/:id/versions/:versionId/restore` — Replaces current system state with snapshot
- Should create a new version entry for the pre-restore state (so restore is undoable)

---

## 9. System Resources

### 9.1 Create Resource

| Aspect | Detail |
|--------|--------|
| **What it does** | Add a resource to a system. Types: transcript, document, note, dataset, form, page. Fields: title, type, content (text), fileReference (optional) |
| **Intention** | Attach relevant data to a workflow — transcripts from meetings, documents to process, datasets to analyze |
| **Success criteria** | Resource appears in the list, is searchable, and can be linked to nodes |
| **Current implementation** | `addResource()` → localStorage |

**Backend needs:**
- `POST /api/systems/:id/resources` — Body: `{ title, type, content, fileReference? }`
- For file uploads: `POST /api/systems/:id/resources/upload` — multipart form data → S3/cloud storage
- Returns: created resource with server ID

### 9.2 List & Search Resources

| Aspect | Detail |
|--------|--------|
| **What it does** | Shows all resources for a system. Filter by type. Search by title/content. Sort by date or name |
| **Intention** | Find the right resource quickly |
| **Success criteria** | All resources visible, filtering works instantly |

**Backend needs:**
- `GET /api/systems/:id/resources` — Query params: `?type=`, `?search=`, `?sort=date|name`

### 9.3 Edit Resource

| Aspect | Detail |
|--------|--------|
| **What it does** | Update title, type, or text content of an existing resource |
| **Intention** | Correct mistakes or update resource data |
| **Success criteria** | Changes are saved and reflected immediately |

**Backend needs:**
- `PUT /api/systems/:id/resources/:resourceId` — Body: partial update fields

### 9.4 Delete Resource

| Aspect | Detail |
|--------|--------|
| **What it does** | Permanently removes a resource with confirmation dialog |
| **Intention** | Remove outdated or incorrect resources |
| **Success criteria** | Resource gone from list. Any node links to this resource should show "missing" indicator |

**Backend needs:**
- `DELETE /api/systems/:id/resources/:resourceId`
- Backend should check if any nodes reference this resource and warn (or auto-unlink)

### 9.5 File Upload (Planned)

| Aspect | Detail |
|--------|--------|
| **What it does** | Currently resources only store text. The UI has a `fileReference` field but no upload UI yet |
| **Intention** | Allow uploading PDFs, images, spreadsheets, and other files as resources |
| **Success criteria** | User can drag-drop or browse files. Files are stored and retrievable. File preview in the UI |

**Backend needs:**
- `POST /api/systems/:id/resources/upload` — multipart form upload
- File storage: S3, GCS, or similar
- Return: `fileReference` URL for download/preview
- Supported types: PDF, images, CSV, XLSX, DOCX
- Max file size: define limit (e.g. 25MB)

---

## 10. System Outputs

### 10.1 Output List

| Aspect | Detail |
|--------|--------|
| **What it does** | Shows all outputs produced by workflow executions. Types: document, folder, website, spreadsheet, email, image, other. Each has: name, type, link, creation date. Filter by type |
| **Intention** | See everything the workflow has produced — the tangible results of automation |
| **Success criteria** | All outputs from all runs are listed. Links work and open the actual artifact |
| **Current implementation** | `system.outputs[]` — static demo data, no real generation |

**Backend needs:**
- `GET /api/systems/:id/outputs` — Returns all outputs
- Outputs are created by the execution engine when output nodes complete
- Each output must have a working `link` to the actual artifact (Google Doc URL, file URL, etc.)

### 10.2 Advanced Output Viewers

| Aspect | Detail |
|--------|--------|
| **What it does** | Expand an output to see rich content: JSON → interactive tree view, Table/CSV → formatted table, Image → lightbox with zoom, Text/Document → inline editable textarea |
| **Intention** | Inspect output content without leaving the dashboard |
| **Success criteria** | JSON is browsable as a tree. Tables are properly formatted. Images display correctly |

**Backend needs:**
- `GET /api/outputs/:outputId/content` — Returns the actual content based on type
- For JSON: raw JSON data
- For table/CSV: parsed headers + rows
- For images: image URL
- For text: text content

### 10.3 Edit Output Content

| Aspect | Detail |
|--------|--------|
| **What it does** | For text-type outputs, users can edit the content inline and save |
| **Intention** | Quick corrections to generated text without opening an external tool |
| **Success criteria** | Edited text is saved and shows correctly on next load |

**Backend needs:**
- `PATCH /api/outputs/:outputId` — Body: `{ contentPreview: "updated text" }`

### 10.4 Copy Output Link

| Aspect | Detail |
|--------|--------|
| **What it does** | Copies the output's link URL to clipboard |
| **Intention** | Quick sharing of workflow results |
| **Success criteria** | Link is in clipboard, shows toast confirmation |

**Backend needs:**
- None — client-side clipboard API

---

## 11. Templates

### 11.1 Browse Templates

| Aspect | Detail |
|--------|--------|
| **What it does** | Shows 10+ built-in workflow templates + user-created templates. Each shows: name, description, category, node count, connection count. Search and category filter |
| **Intention** | Don't start from scratch — pick a proven workflow pattern and customize it |
| **Success criteria** | Templates are easy to browse. Preview shows the actual workflow layout |

**Backend needs:**
- `GET /api/templates` — Returns built-in + user templates
- Query: `?search=`, `?category=`
- Consider: community/marketplace templates in the future

### 11.2 Create System from Template

| Aspect | Detail |
|--------|--------|
| **What it does** | Clicking a template deep-clones it into a new system with fresh IDs. Opens in the canvas editor |
| **Intention** | Quick-start a workflow from a proven pattern |
| **Success criteria** | New system has all template nodes/connections. IDs are unique. System is in draft status |

**Backend needs:**
- `POST /api/systems/from-template/:templateId` — Clones template into a new system
- Same as system create but with initial data from template

### 11.3 Create Custom Template

| Aspect | Detail |
|--------|--------|
| **What it does** | Modal form: name, description, category (dropdown), icon (16 options). Creates an empty template with a single trigger node |
| **Intention** | Save a workflow as a reusable starting point |
| **Success criteria** | Template appears in the template list. Can be used to create new systems |

**Backend needs:**
- `POST /api/templates` — Body: `{ name, description, category, icon, nodes, connections }`
- Optional: save from existing system → `POST /api/systems/:id/save-as-template`

### 11.4 Preview Template

| Aspect | Detail |
|--------|--------|
| **What it does** | Opens the template in a read-only canvas view. Shows stats: steps, connections, phases |
| **Intention** | Inspect what the template contains before using it |
| **Success criteria** | Full canvas rendering without edit capability |

**Backend needs:**
- `GET /api/templates/:id` — Returns full template data

### 11.5 Delete Template

| Aspect | Detail |
|--------|--------|
| **What it does** | Remove a user-created template (built-in templates cannot be deleted). Requires confirmation |
| **Intention** | Clean up unused templates |
| **Success criteria** | Template removed from list |

**Backend needs:**
- `DELETE /api/templates/:id`

---

## 12. Wizard Builder

### 12.1 Step-by-Step Workflow Creation

| Aspect | Detail |
|--------|--------|
| **What it does** | Guided builder: (1) Set metadata (name, description, category, icon), (2) Add nodes one by one from a palette, (3) Choose "sequential" or "parallel" branching, (4) Assign phases with colors, (5) Live preview shows the workflow canvas in real-time |
| **Intention** | For users who find the drag-drop canvas intimidating — build a workflow through simple step-by-step decisions |
| **Success criteria** | User can build any workflow topology (linear, branching, parallel) without touching the canvas. Result looks identical to a hand-built canvas workflow |
| **Current implementation** | Tree data structure (`WizardStep`) converted to `AutomationSystem` via `convertWizardToSystem()` |

**Backend needs:**
- No separate backend — the wizard produces a standard `AutomationSystem` object
- Same `POST /api/systems` endpoint used to save the result
- Optional: save wizard state for "resume later" → `POST /api/wizard-drafts`

### 12.2 Phase Management

| Aspect | Detail |
|--------|--------|
| **What it does** | Create named phases with colors (6 options: blue, green, purple, orange, red, gray). Assign nodes to phases. Phases become visual groups on the canvas |
| **Intention** | Organize workflow steps into logical stages for clarity |
| **Success criteria** | Canvas preview shows colored group boxes around phase-assigned nodes. No overlapping groups |

**Backend needs:**
- Phases are stored as `groups[]` on the system — no separate backend entity needed

### 12.3 Parallel Branching

| Aspect | Detail |
|--------|--------|
| **What it does** | Split workflow into parallel branches that run simultaneously. Add/remove/rename branches. Navigate into branches to add nodes. Delete entire parallel blocks |
| **Intention** | Model real automation patterns like "send email AND update CRM simultaneously" |
| **Success criteria** | Branches are visually separated in the canvas preview. Connections fan out and merge correctly |

**Backend needs:**
- The execution engine must support parallel execution — when a node has multiple outgoing connections, run target nodes concurrently
- Fan-in merge: wait for all parallel branches to complete before continuing

### 12.4 Convert to System

| Aspect | Detail |
|--------|--------|
| **What it does** | "System erstellen" button converts the wizard tree into an `AutomationSystem`. Algorithm: flatten tree → position nodes in grid (340px H, 160px V spacing) → create connections → build non-overlapping groups → calculate auto-zoom |
| **Intention** | Finalize the wizard and produce a fully functional workflow |
| **Success criteria** | Resulting system opens correctly in the canvas editor. All nodes are positioned without overlap. Groups enclose their nodes properly |

**Backend needs:**
- Same as system create — `POST /api/systems`

---

## 13. Funnel Visualizer

### 13.1 Funnel Board Management

| Aspect | Detail |
|--------|--------|
| **What it does** | Create, save, load, duplicate, delete funnel boards. Each board has: name, description, elements, connections, phases |
| **Intention** | Design marketing funnels visually — separate workspace from the workflow builder |
| **Success criteria** | Boards persist independently. Can have multiple funnels |

**Backend needs:**
- `POST /api/funnels` — Create board
- `GET /api/funnels` — List all boards
- `GET /api/funnels/:id` — Load specific board
- `PUT /api/funnels/:id` — Save board state
- `DELETE /api/funnels/:id` — Delete board
- `POST /api/funnels/:id/duplicate` — Clone board

### 13.2 Funnel Elements

| Aspect | Detail |
|--------|--------|
| **What it does** | 16 platform types (Facebook Ads, Instagram Ads, Google Ads, LinkedIn Ads, TikTok Ads, YouTube, Landing Page, Website, Form, CRM, Email, Calendar, WhatsApp/SMS, Webinar, Checkout, SEO). 11 mockup types (Smartphone, Desktop, Tablet, Social Post, various ad previews). Text elements, media, phases |
| **Intention** | Model the complete marketing funnel from ad platforms through conversion |
| **Success criteria** | User can represent their entire customer journey visually |

**Backend needs:**
- Board save stores all elements — no separate element API needed
- Optional: sync funnel metrics with real ad platform data (see 13.4)

### 13.3 Funnel Connections

| Aspect | Detail |
|--------|--------|
| **What it does** | Connect elements with customizable lines: style (solid/dashed/dotted), thickness, curve type (bezier/straight/step), color (7 options), animation (dot/dash/none), arrowhead style |
| **Intention** | Show the flow between funnel stages with visual clarity |
| **Success criteria** | Connections clearly show direction and can be styled to indicate different paths (e.g. dashed for optional, solid for main) |

**Backend needs:**
- Part of board save — no separate API

### 13.4 Funnel Metrics

| Aspect | Detail |
|--------|--------|
| **What it does** | Each element can have a metric value + label. Default labels per type (e.g. "Clicks" for ads, "Visitors" for landing page, "Purchases" for checkout). Shows conversion rates between connected elements |
| **Intention** | Track funnel performance — how many people move from one stage to the next |
| **Success criteria** | Metrics display correctly. Conversion rates calculated between connected steps. Bottlenecks are visible |
| **Current implementation** | Manual input only — user types in numbers |

**Backend needs:**
- **For real metrics:** Integration with ad platforms (Meta Ads API, Google Ads API, etc.)
- `GET /api/funnels/:id/metrics` — Returns real-time metrics per element from connected platforms
- `POST /api/funnels/:id/elements/:elementId/sync` — Pull latest metrics from platform
- OAuth connections needed for each platform (see Section 17)

### 13.5 Funnel Export

| Aspect | Detail |
|--------|--------|
| **What it does** | Export entire funnel as high-quality PNG (2x resolution). Dark/light mode aware |
| **Intention** | Share funnel designs in presentations or documents |
| **Success criteria** | Clean, high-resolution image with all elements, connections, and labels visible |

**Backend needs:**
- None for client-side PNG — optional server-side PDF export

---

## 14. Settings

### 14.1 Toggle Settings

| Aspect | Detail |
|--------|--------|
| **What it does** | 4 toggle switches: Auto-execute workflows, Enable notifications, Webhook logging, Compact view mode. Settings persist to localStorage |
| **Intention** | Customize dashboard behavior |
| **Success criteria** | Settings persist across sessions. Each toggle affects the corresponding feature |

**Backend needs:**
- `GET /api/settings` — Load user settings
- `PUT /api/settings` — Save user settings
- `auto_execute`: When enabled, workflows trigger automatically on webhook. Backend must check this flag
- `notifications`: Backend decides whether to send email/push notifications
- `webhook_logging`: Backend stores detailed webhook request/response data
- `compact_view`: UI-only, no backend impact

### 14.2 Reset to Defaults

| Aspect | Detail |
|--------|--------|
| **What it does** | Resets all 4 toggles to their default values |
| **Intention** | Quick way to restore standard behavior |
| **Success criteria** | All toggles reset to defaults |

**Backend needs:**
- `POST /api/settings/reset`

---

## 15. Export Features

### 15.1 PDF Export

| Aspect | Detail |
|--------|--------|
| **What it does** | Generates a print-friendly HTML document with: system name, category, status, description, statistics, node list (label + description), connection list, output list. Opens browser print dialog |
| **Intention** | Share a workflow documentation with stakeholders or print for meetings |
| **Success criteria** | PDF contains all system information in a clean, readable format |
| **Current implementation** | `window.open()` with inline HTML + CSS |

**Backend needs:**
- Optional: `GET /api/systems/:id/export/pdf` — Server-side PDF generation for consistent formatting
- Could use: Puppeteer, wkhtmltopdf, or a PDF library

### 15.2 PNG Canvas Export

| Aspect | Detail |
|--------|--------|
| **What it does** | Exports the canvas view as a PNG image. Builds SVG from nodes/connections/groups/sticky-notes → converts to Canvas → downloads as PNG |
| **Intention** | Share the visual workflow diagram |
| **Success criteria** | Image includes all canvas elements with correct colors and labels |

**Backend needs:**
- None for client-side — optional server-side for larger canvases

---

## 16. Webhook Management

### 16.1 Webhook URL

| Aspect | Detail |
|--------|--------|
| **What it does** | Each system has a `webhookUrl` field. Currently stored but never actually used — always empty string |
| **Intention** | Trigger workflows from external events. E.g. form submission → webhook → workflow runs |
| **Success criteria** | Each active system gets a unique webhook URL. POSTing to that URL triggers execution. Payload is available to trigger nodes |

**Backend needs:**
- `POST /api/systems/:id/webhook` — Generate unique webhook URL
- `GET /api/systems/:id/webhook` — Get current webhook URL
- `DELETE /api/systems/:id/webhook` — Deactivate webhook
- Webhook receiver: `POST /webhooks/:token` — Receives external calls, triggers execution
- Payload validation: check content type, signature verification (optional)
- Rate limiting: prevent abuse
- Webhook log: store all incoming requests + responses for debugging

---

## 17. Tool Integrations

### 17.1 Available Tools (Palette)

The node palette contains these tools — each would need a real integration:

| Tool | Node Type | What it needs to do |
|------|-----------|-------------------|
| **OpenAI** | AI | Call GPT-4 API — send prompt, receive text/completion |
| **Claude** | AI | Call Anthropic Claude API — same as OpenAI |
| **Google Sheets** | Process | Read/write spreadsheet data |
| **Google Docs** | Output | Create/edit documents |
| **Gmail** | Output | Send emails with templates |
| **Slack** | Output | Post messages to channels |
| **Google Ads** | Output | Create/update ad campaigns |
| **WordPress** | Output | Create/update blog posts |
| **WhatsApp** | Output | Send messages via WhatsApp Business API |
| **Zapier** | Trigger | Receive webhooks from Zapier |
| **n8n** | Process | Call n8n workflow endpoints |
| **Make** | Process | Trigger Make.com scenarios |
| **HubSpot** | Process | Read/write CRM contacts, deals |
| **Notion** | Output | Create/update pages/databases |
| **Meta** | Output | Post to Facebook/Instagram |
| **LinkedIn** | Output | Publish posts/articles |
| **Google Calendar** | Process | Create/read calendar events |
| **Google Drive** | Output | Upload/organize files |

**Backend needs for EACH tool:**
1. **OAuth2 flow:** `GET /api/integrations/:tool/auth` → redirect to provider → callback with token
2. **Credential storage:** Encrypted token storage per user per tool
3. **Token refresh:** Background job to refresh expired OAuth tokens
4. **Tool action execution:** `POST /api/integrations/:tool/execute` — perform the specific action
5. **Connection test:** `POST /api/integrations/:tool/test` — verify credentials work
6. **Configuration schema:** `GET /api/integrations/:tool/schema` — what fields does this tool need (e.g. channel for Slack, recipient for Gmail)

### 17.2 Integration Priority

Based on demo systems and common use cases, suggested implementation order:

1. **OpenAI** — Core AI functionality, used in 3/4 demo systems
2. **Gmail** — Email sending, used in Lead Qualification
3. **Google Sheets** — Data source, used in Report Generator
4. **Google Docs** — Document generation, used everywhere
5. **Slack** — Team notifications
6. **HubSpot** — CRM integration
7. **Google Drive** — File storage
8. **Zapier/Webhook** — External trigger support
9. **Claude** — Alternative AI provider
10. **WordPress/Social Media** — Content publishing

---

## 18. Suggested API Endpoints

### Systems
```
GET    /api/systems                          → List all systems
GET    /api/systems/stats                    → Dashboard KPIs
POST   /api/systems                          → Create system
GET    /api/systems/:id                      → Get system detail
PUT    /api/systems/:id                      → Update system
DELETE /api/systems/:id                      → Delete system
PATCH  /api/systems/:id/status               → Toggle status
POST   /api/systems/:id/duplicate            → Duplicate system
POST   /api/systems/:id/execute              → Start execution
```

### Executions
```
GET    /api/executions/:executionId          → Execution detail
GET    /api/executions/:executionId/stream   → SSE status stream
GET    /api/systems/:id/executions           → List executions
DELETE /api/systems/:id/executions           → Clear execution log
```

### Versions
```
GET    /api/systems/:id/versions             → List versions
POST   /api/systems/:id/versions/:vid/restore → Restore version
```

### Resources
```
GET    /api/systems/:id/resources            → List resources
POST   /api/systems/:id/resources            → Create resource
POST   /api/systems/:id/resources/upload     → Upload file
PUT    /api/systems/:id/resources/:rid       → Update resource
DELETE /api/systems/:id/resources/:rid       → Delete resource
```

### Outputs
```
GET    /api/systems/:id/outputs              → List outputs
GET    /api/outputs/:id/content              → Get output content
PATCH  /api/outputs/:id                      → Edit output
```

### Templates
```
GET    /api/templates                        → List templates
POST   /api/templates                        → Create template
GET    /api/templates/:id                    → Get template
DELETE /api/templates/:id                    → Delete template
POST   /api/systems/from-template/:tid       → Create from template
```

### Webhooks
```
POST   /api/systems/:id/webhook              → Generate webhook URL
GET    /api/systems/:id/webhook              → Get webhook info
DELETE /api/systems/:id/webhook              → Deactivate webhook
POST   /webhooks/:token                      → External webhook receiver
```

### Funnels
```
GET    /api/funnels                          → List funnel boards
POST   /api/funnels                          → Create board
GET    /api/funnels/:id                      → Get board
PUT    /api/funnels/:id                      → Save board
DELETE /api/funnels/:id                      → Delete board
POST   /api/funnels/:id/duplicate            → Duplicate board
GET    /api/funnels/:id/metrics              → Get real metrics
```

### Integrations
```
GET    /api/integrations                     → List available tools
GET    /api/integrations/:tool/auth          → Start OAuth flow
GET    /api/integrations/:tool/callback      → OAuth callback
POST   /api/integrations/:tool/test          → Test connection
POST   /api/integrations/:tool/execute       → Execute tool action
GET    /api/integrations/:tool/schema        → Get config fields
GET    /api/integrations/connected           → List user's connected tools
DELETE /api/integrations/:tool               → Disconnect tool
```

### Settings
```
GET    /api/settings                         → Load settings
PUT    /api/settings                         → Save settings
POST   /api/settings/reset                   → Reset defaults
```

---

## Summary

The `/systems` section contains **~50 distinct features** across 6 main areas:

| Area | Features | Backend Complexity |
|------|----------|-------------------|
| System CRUD | 6 operations | Low — standard REST |
| Workflow Canvas | 10 features | Low — mostly client-side, save is REST |
| Execution Engine | 3 features | **HIGH** — real-time processing, integrations |
| Resources & Outputs | 8 operations | Medium — file storage, content serving |
| Templates & Wizard | 6 features | Low — reuses system endpoints |
| Funnel Visualizer | 6 features | Low-Medium — separate CRUD + optional metrics |
| Tool Integrations | 18 tools | **HIGH** — OAuth, API calls, credential mgmt |
| Webhooks | 3 operations | Medium — URL generation, event handling |

**Highest priority for backend:**
1. User authentication (everything depends on this)
2. System CRUD (basic persistence)
3. Execution engine + real-time status streaming
4. Tool integrations (OpenAI first, then email/CRM)
5. Webhook triggers
6. File storage for resources
