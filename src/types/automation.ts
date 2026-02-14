export type NodeType = 'trigger' | 'process' | 'ai' | 'output';

export type OutputType = 'document' | 'folder' | 'website' | 'spreadsheet' | 'email' | 'image' | 'other';

export interface SystemNode {
  id: string;
  label: string;
  description: string;
  icon: string;           // Lucide key (e.g. 'users') OR tool logo key (e.g. 'logo-google-drive')
  logoUrl?: string;       // Optional: custom logo URL (rendered as <img>)
  type: NodeType;
  x: number;              // Pixel x-position on canvas
  y: number;              // Pixel y-position on canvas
  linkedResourceType?: ResourceType;  // Auto-link to resources of this type
  linkedResourceId?: string;          // Specific resource item ID within the type
  linkedPage?: string;    // Internal page path (e.g. '/onboarding') – clickable from canvas
}

export type PortDirection = 'top' | 'right' | 'bottom' | 'left';

export interface NodeConnection {
  from: string;
  to: string;
  fromPort?: PortDirection;
  toPort?: PortDirection;
}

export type ArtifactSourceType = 'file' | 'text' | 'url' | 'website' | 'image';

export interface SystemOutput {
  id: string;
  name: string;
  type: OutputType;
  link: string;
  createdAt: string;
  contentPreview?: string;            // Text content for inline display/editing
  artifactType?: ArtifactSourceType;  // Original artifact type for display logic
}

export interface CanvasGroup {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export type StickyNoteColor = 'yellow' | 'blue' | 'green' | 'pink' | 'orange' | 'purple' | 'red' | 'gray';

export interface StickyNote {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: StickyNoteColor;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  customTextColor?: string;
  fontSize?: number;
}

// ── Resources ──────────────────────────────────────────
export type ResourceType = 'transcript' | 'document' | 'note' | 'dataset' | 'form' | 'page';

export interface SystemResource {
  id: string;
  systemId: string;
  title: string;
  type: ResourceType;
  content: string;
  fileReference?: string;
  createdAt: string;
  source?: string;
}

export interface OnboardingFormData {
  // Kundeninformationen
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  position: string;
  // Projekt-Details
  packageTier: string;
  contractStart: string;
  contractDuration: string;
  monthlyBudget: string;
  // Kickoff-Call
  kickoffDate: string;
  kickoffTime: string;
  kickoffParticipants: string;
  kickoffNotes: string;
  // Zugänge & Assets
  websiteUrl: string;
  socialMediaUrls: string;
  existingTools: string;
  hasBrandGuidelines: string;
  googleAccess: string;
  // Zielgruppe & Business
  industry: string;
  targetAudience: string;
  currentChallenges: string;
  previousMarketing: string;
  // Interne Notizen
  salesNotes: string;
  priorities: string;
  specialRequirements: string;
}

export interface AutomationSystem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  status: 'active' | 'draft';
  webhookUrl: string;
  nodes: SystemNode[];
  connections: NodeConnection[];
  groups?: CanvasGroup[];
  stickyNotes?: StickyNote[];
  outputs: SystemOutput[];
  lastExecuted?: string;
  executionCount: number;
}
