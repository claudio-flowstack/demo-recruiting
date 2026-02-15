/**
 * Funnel-specific platform logos for the Funnel Visualizer.
 * These are registered into the main TOOL_LOGOS registry in ToolLogos.tsx.
 */

const size = 20;

// ─── TikTok ──────────────────────────────────────────────────────────────────

export const TikTok = () => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M16.6 5.82A4.28 4.28 0 0115.54 3h-3.09v12.4a2.59 2.59 0 01-2.59 2.5c-1.43 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.07 2.49 5.44 5.59 5.44 3.32 0 5.74-2.65 5.74-5.63V9.41A7.35 7.35 0 0019.54 11V7.77c-1.13 0-2.48-.72-2.94-1.95z" fill="currentColor" opacity={0.7}/>
  </svg>
);

// ─── Google Ads ──────────────────────────────────────────────────────────────

export const GoogleAds = () => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3.27 16.27l6-10.37a2.12 2.12 0 013.64 0l6 10.37a2.12 2.12 0 01-1.82 3.18H5.09a2.12 2.12 0 01-1.82-3.18z" fill="#FBBC04" opacity={0.25}/>
    <circle cx="17.5" cy="17.5" r="3" fill="#4285F4" opacity={0.6}/>
    <rect x="3" y="14" width="6" height="6" rx="1" fill="#34A853" opacity={0.5}/>
    <path d="M8.5 5.5l4 7" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

// ─── Instagram ───────────────────────────────────────────────────────────────

export const Instagram = () => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="#E4405F" strokeWidth="1.5" fill="#E4405F" opacity={0.12}/>
    <circle cx="12" cy="12" r="4" stroke="#E4405F" strokeWidth="1.5" fill="none"/>
    <circle cx="17.5" cy="6.5" r="1.2" fill="#E4405F"/>
  </svg>
);

// ─── Calendly ────────────────────────────────────────────────────────────────

export const Calendly = () => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#006BFF" strokeWidth="1.5" fill="#006BFF" opacity={0.12}/>
    <path d="M12 7v5l3.5 2" stroke="#006BFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="1" fill="#006BFF"/>
  </svg>
);

// ─── Stripe ──────────────────────────────────────────────────────────────────

export const Stripe = () => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="#635BFF" opacity={0.12}/>
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="#635BFF" strokeWidth="1.5" fill="none"/>
    <path d="M13.5 8.5c-1.5-.5-3-.5-3 1s1.5 1.5 3 2 3 1 3 3-1.5 2-3 1.5" stroke="#635BFF" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="7" x2="12" y2="9" stroke="#635BFF" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="15" x2="12" y2="17" stroke="#635BFF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── YouTube ─────────────────────────────────────────────────────────────────

export const YouTube = () => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000" opacity={0.15}/>
    <rect x="2" y="5" width="20" height="14" rx="4" stroke="#FF0000" strokeWidth="1.5" fill="none"/>
    <path d="M10 8.5v7l6-3.5-6-3.5z" fill="#FF0000" opacity={0.7}/>
  </svg>
);

// ─── Typeform ────────────────────────────────────────────────────────────────

export const Typeform = () => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" opacity={0.1}/>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.5}/>
    <line x1="7" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={0.5}/>
    <circle cx="8" cy="12" r="1.5" fill="currentColor" opacity={0.5}/>
    <line x1="11" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={0.5}/>
    <circle cx="8" cy="17" r="1.5" fill="currentColor" opacity={0.5}/>
    <line x1="11" y1="17" x2="15" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={0.5}/>
  </svg>
);

// ─── Telegram ───────────────────────────────────────────────────────────────

export const Telegram = () => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#26A5E4"/>
    <path d="M6.5 11.5l9.2-4.2c.4-.2.8.2.7.6L14.8 15c-.1.3-.5.4-.7.2l-2.3-1.7-1.1 1.1c-.2.2-.5.1-.5-.2v-2l5.5-5c.1-.1 0-.2-.1-.1l-6.8 4.2-2.5-.8c-.3-.1-.3-.5 0-.7z" fill="white"/>
  </svg>
);

// ─── Microsoft Teams ────────────────────────────────────────────────────────

export const MicrosoftTeams = () => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="17" cy="7" r="3" fill="#5B5FC7" opacity={0.4}/>
    <rect x="12" y="5" width="9" height="11" rx="1.5" fill="#5B5FC7" opacity={0.6}/>
    <rect x="3" y="7" width="11" height="11" rx="1.5" fill="#5B5FC7"/>
    <text x="8.5" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Arial, sans-serif">T</text>
  </svg>
);

// ─── Mailchimp ──────────────────────────────────────────────────────────────

export const Mailchimp = () => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#FFE01B" opacity={0.2}/>
    <circle cx="12" cy="12" r="10" stroke="#FFE01B" strokeWidth="1.5" fill="none"/>
    <path d="M8 16c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#241C15" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="9.5" cy="10" r="1.2" fill="#241C15"/>
    <circle cx="14.5" cy="10" r="1.2" fill="#241C15"/>
    <path d="M7 7c1-1.5 2.5-2 5-2s4 .5 5 2" stroke="#241C15" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
  </svg>
);

// ─── Pipedrive ──────────────────────────────────────────────────────────────

export const Pipedrive = () => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="#017737" opacity={0.15}/>
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="#017737" strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="9" r="3" stroke="#017737" strokeWidth="1.8" fill="none"/>
    <line x1="12" y1="12" x2="12" y2="19" stroke="#017737" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
