import type { OnboardingFormData } from '../types/automation';

const ONBOARDING_KEY = 'flowstack-onboarding-submissions';

interface OnboardingSubmission extends OnboardingFormData {
  id: string;
  submittedAt: string;
}

export function loadOnboardingSubmissions(): OnboardingSubmission[] {
  try {
    const stored = localStorage.getItem(ONBOARDING_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function saveOnboardingSubmission(data: OnboardingFormData): string {
  const id = `onb-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
  const submissions = loadOnboardingSubmissions();
  submissions.push({ ...data, id, submittedAt: new Date().toISOString() });
  localStorage.setItem(ONBOARDING_KEY, JSON.stringify(submissions));
  return id;
}

export const emptyOnboardingForm: OnboardingFormData = {
  clientName: '',
  companyName: '',
  email: '',
  phone: '',
  position: '',
  packageTier: 'growth',
  contractStart: '',
  contractDuration: '3',
  monthlyBudget: '',
  kickoffDate: '',
  kickoffTime: '10:00',
  kickoffParticipants: '',
  kickoffNotes: '',
  websiteUrl: '',
  socialMediaUrls: '',
  existingTools: '',
  hasBrandGuidelines: 'nein',
  googleAccess: 'nein',
  industry: '',
  targetAudience: '',
  currentChallenges: '',
  previousMarketing: '',
  salesNotes: '',
  priorities: '',
  specialRequirements: '',
};
