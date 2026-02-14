import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, ArrowRight, Zap, Users, Briefcase, CheckCircle, Calendar, Globe, Target, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { siteConfig } from '@/config/content';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import { saveOnboardingSubmission, emptyOnboardingForm } from '@/data/onboardingStorage';
import { addResource } from '@/data/resourceStorage';
import type { SystemResource, OnboardingFormData } from '@/types/automation';

const inputCls = 'w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder:text-gray-600 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors';
const selectCls = inputCls;
function OnboardingContent() {
  const { t, lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const systemId = searchParams.get('system') || 'demo-6';

  const [formData, setFormData] = useState<OnboardingFormData>(emptyOnboardingForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    client: true,
    project: true,
    kickoff: true,
    access: true,
    business: true,
    internal: true,
  });

  useEffect(() => {
    document.title = t('onboarding.pageTitle');
    window.scrollTo(0, 0);
  }, [lang, t]);

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwuWXRv4p1s62FUBNIuAE7-O5E2qWZZRsWgqsOZbHxfCkDB9yP8mWY9EUCKlXGk5Df5ow/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to localStorage
      saveOnboardingSubmission(formData);

      // Build resource summary
      const summary = [
        `── ${t('onboarding.section.client')} ──`,
        `${t('onboarding.clientName')}: ${formData.clientName}`,
        `${t('onboarding.companyName')}: ${formData.companyName}`,
        `${t('onboarding.email')}: ${formData.email}`,
        `${t('onboarding.phone')}: ${formData.phone}`,
        `${t('onboarding.position')}: ${formData.position}`,
        '',
        `── ${t('onboarding.section.project')} ──`,
        `${t('onboarding.packageTier')}: ${formData.packageTier}`,
        `${t('onboarding.contractStart')}: ${formData.contractStart}`,
        `${t('onboarding.contractDuration')}: ${formData.contractDuration} ${t('onboarding.months')}`,
        `${t('onboarding.monthlyBudget')}: ${formData.monthlyBudget}`,
        '',
        `── ${t('onboarding.section.kickoff')} ──`,
        `${t('onboarding.kickoffDate')}: ${formData.kickoffDate}`,
        `${t('onboarding.kickoffTime')}: ${formData.kickoffTime}`,
        `${t('onboarding.kickoffParticipants')}:`,
        formData.kickoffParticipants,
        `${t('onboarding.kickoffNotes')}:`,
        formData.kickoffNotes,
        '',
        `── ${t('onboarding.section.access')} ──`,
        `${t('onboarding.websiteUrl')}: ${formData.websiteUrl}`,
        `${t('onboarding.socialMediaUrls')}:`,
        formData.socialMediaUrls,
        `${t('onboarding.existingTools')}:`,
        formData.existingTools,
        `${t('onboarding.hasBrandGuidelines')}: ${formData.hasBrandGuidelines}`,
        `${t('onboarding.googleAccess')}: ${formData.googleAccess}`,
        '',
        `── ${t('onboarding.section.business')} ──`,
        `${t('onboarding.industry')}: ${formData.industry}`,
        `${t('onboarding.targetAudience')}:`,
        formData.targetAudience,
        `${t('onboarding.currentChallenges')}:`,
        formData.currentChallenges,
        `${t('onboarding.previousMarketing')}:`,
        formData.previousMarketing,
        '',
        `── ${t('onboarding.section.internal')} ──`,
        `${t('onboarding.salesNotes')}:`,
        formData.salesNotes,
        `${t('onboarding.priorities')}:`,
        formData.priorities,
        `${t('onboarding.specialRequirements')}:`,
        formData.specialRequirements,
      ].join('\n');

      // Create system resource
      const resource: SystemResource = {
        id: `res-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        systemId,
        title: `Onboarding: ${formData.companyName || formData.clientName}`,
        type: 'document',
        content: summary,
        createdAt: new Date().toISOString(),
        source: 'onboarding-form',
      };
      addResource(resource);

      // Send to Google Apps Script to trigger automation
      try {
        const params = new URLSearchParams();
        // Flatten all form data into params
        for (const [key, value] of Object.entries(formData)) {
          params.append(key, value);
        }
        params.append('formType', 'client-onboarding');
        params.append('submittedAt', new Date().toISOString());

        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: params,
          mode: 'no-cors',
        });
      } catch {
        // Google Script send is best-effort (no-cors)
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Onboarding submission error:', error);
      alert(lang === 'en' ? 'An error occurred while saving. Please try again.' : 'Beim Speichern ist ein Fehler aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success view
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0e] text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold mb-3">{t('onboarding.success')}</h1>
          <p className="text-gray-400 mb-4">{t('onboarding.successHint')}</p>
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 mb-8">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">{formData.companyName}</span>
              {formData.kickoffDate && (
                <span className="text-gray-400"> &middot; Kickoff: {formData.kickoffDate} {formData.kickoffTime && `um ${formData.kickoffTime}`}</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <Link
              to="/systems"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all text-sm"
            >
              {t('onboarding.backToSystems')}
            </Link>
            <button
              onClick={() => {
                setFormData(emptyOnboardingForm);
                setIsSuccess(false);
              }}
              className="px-6 py-3 bg-gray-800/50 border border-gray-700/50 text-gray-300 font-medium rounded-xl hover:bg-gray-800 transition-all text-sm"
            >
              {t('onboarding.addAnother')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const CollapsibleSection = ({ id, icon: Icon, label, children }: { id: string; icon: React.ElementType; label: string; children: React.ReactNode }) => (
    <div>
      <button
        type="button"
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between gap-3 pt-5 pb-2 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">{label}</span>
        </div>
        {expandedSections[id] ? (
          <ChevronUp className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
        )}
      </button>
      {expandedSections[id] && (
        <div className="space-y-4 pt-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0e] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="max-w-7xl mx-auto bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl px-6 py-3">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">{siteConfig.name}</span>
              </Link>
              <Link to="/systems" className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all font-medium text-sm">
                {t('onboarding.backToSystems')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left: Info (2 cols) */}
            <div className="lg:col-span-2">
              <span className="inline-block px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold mb-6 border border-purple-500/20">
                {t('onboarding.badge')}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {t('onboarding.headline')}
              </h1>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                {t('onboarding.description')}
              </p>

              {/* Checklist */}
              <div className="space-y-4 mb-10">
                <ul className="space-y-3">
                  {([
                    t('onboarding.checklist1'),
                    t('onboarding.checklist2'),
                    t('onboarding.checklist3'),
                    t('onboarding.checklist4'),
                    t('onboarding.checklist5'),
                  ] as string[]).map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-purple-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Elements */}
              <div className="space-y-3">
                <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t('onboarding.trustAuto')}</p>
                    <p className="text-xs text-gray-500">{t('onboarding.trustAutoDesc')}</p>
                  </div>
                </div>
                <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t('onboarding.trustKickoff')}</p>
                    <p className="text-xs text-gray-500">{t('onboarding.trustKickoffDesc')}</p>
                  </div>
                </div>
                <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t('onboarding.trustPro')}</p>
                    <p className="text-xs text-gray-500">{t('onboarding.trustProDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form (3 cols) */}
            <div className="lg:col-span-3 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-[2rem] blur-xl" />
              <div className="relative bg-gray-900/80 border border-gray-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-1">{t('onboarding.formTitle')}</h2>
                <p className="text-sm text-gray-500 mb-6">{t('onboarding.formSubtitle')}</p>

                <form onSubmit={handleSubmit} className="space-y-1">

                  {/* ── Section 1: Kundeninformationen ── */}
                  <CollapsibleSection id="client" icon={Users} label={t('onboarding.section.client')}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t('onboarding.clientName')} *</label>
                        <input type="text" name="clientName" required value={formData.clientName} onChange={handleChange} placeholder={t('onboarding.clientNamePlaceholder')} className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t('onboarding.companyName')} *</label>
                        <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} placeholder={t('onboarding.companyNamePlaceholder')} className={inputCls} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t('onboarding.email')} *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder={t('onboarding.emailPlaceholder')} className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t('onboarding.phone')} *</label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder={t('onboarding.phonePlaceholder')} className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.position')}</label>
                      <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder={t('onboarding.positionPlaceholder')} className={inputCls} />
                    </div>
                  </CollapsibleSection>

                  {/* ── Section 2: Projekt-Details ── */}
                  <CollapsibleSection id="project" icon={Briefcase} label={t('onboarding.section.project')}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t('onboarding.packageTier')} *</label>
                        <select name="packageTier" required value={formData.packageTier} onChange={handleChange} className={selectCls}>
                          <option value="starter">{t('onboarding.packageStarter')}</option>
                          <option value="growth">{t('onboarding.packageGrowth')}</option>
                          <option value="enterprise">{t('onboarding.packageEnterprise')}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t('onboarding.monthlyBudget')}</label>
                        <input type="number" name="monthlyBudget" min={0} value={formData.monthlyBudget} onChange={handleChange} placeholder={t('onboarding.monthlyBudgetPlaceholder')} className={inputCls} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t('onboarding.contractStart')} *</label>
                        <input type="date" name="contractStart" required value={formData.contractStart} onChange={handleChange} className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t('onboarding.contractDuration')}</label>
                        <select name="contractDuration" value={formData.contractDuration} onChange={handleChange} className={selectCls}>
                          <option value="1">1 {t('onboarding.month')}</option>
                          <option value="3">3 {t('onboarding.months')}</option>
                          <option value="6">6 {t('onboarding.months')}</option>
                          <option value="12">12 {t('onboarding.months')}</option>
                        </select>
                      </div>
                    </div>
                  </CollapsibleSection>

                  {/* ── Section 3: Kickoff-Call ── */}
                  <CollapsibleSection id="kickoff" icon={Calendar} label={t('onboarding.section.kickoff')}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t('onboarding.kickoffDate')}</label>
                        <input type="date" name="kickoffDate" value={formData.kickoffDate} onChange={handleChange} className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t('onboarding.kickoffTime')}</label>
                        <input type="time" name="kickoffTime" value={formData.kickoffTime} onChange={handleChange} className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.kickoffParticipants')}</label>
                      <textarea name="kickoffParticipants" rows={2} value={formData.kickoffParticipants} onChange={handleChange} placeholder={t('onboarding.kickoffParticipantsPlaceholder')} className={inputCls + ' resize-none'} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.kickoffNotes')}</label>
                      <textarea name="kickoffNotes" rows={3} value={formData.kickoffNotes} onChange={handleChange} placeholder={t('onboarding.kickoffNotesPlaceholder')} className={inputCls + ' resize-none'} />
                    </div>
                  </CollapsibleSection>

                  {/* ── Section 4: Zugänge & Assets ── */}
                  <CollapsibleSection id="access" icon={Globe} label={t('onboarding.section.access')}>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.websiteUrl')}</label>
                      <input type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} placeholder={t('onboarding.websiteUrlPlaceholder')} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.socialMediaUrls')}</label>
                      <textarea name="socialMediaUrls" rows={3} value={formData.socialMediaUrls} onChange={handleChange} placeholder={t('onboarding.socialMediaUrlsPlaceholder')} className={inputCls + ' resize-none'} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.existingTools')}</label>
                      <textarea name="existingTools" rows={2} value={formData.existingTools} onChange={handleChange} placeholder={t('onboarding.existingToolsPlaceholder')} className={inputCls + ' resize-none'} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t('onboarding.hasBrandGuidelines')}</label>
                        <select name="hasBrandGuidelines" value={formData.hasBrandGuidelines} onChange={handleChange} className={selectCls}>
                          <option value="nein">{t('onboarding.no')}</option>
                          <option value="ja">{t('onboarding.yes')}</option>
                          <option value="teilweise">{t('onboarding.partial')}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t('onboarding.googleAccess')}</label>
                        <select name="googleAccess" value={formData.googleAccess} onChange={handleChange} className={selectCls}>
                          <option value="nein">{t('onboarding.no')}</option>
                          <option value="ja">{t('onboarding.yes')}</option>
                          <option value="wird-eingerichtet">{t('onboarding.willSetup')}</option>
                        </select>
                      </div>
                    </div>
                  </CollapsibleSection>

                  {/* ── Section 5: Zielgruppe & Business ── */}
                  <CollapsibleSection id="business" icon={Target} label={t('onboarding.section.business')}>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.industry')}</label>
                      <input type="text" name="industry" value={formData.industry} onChange={handleChange} placeholder={t('onboarding.industryPlaceholder')} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.targetAudience')}</label>
                      <textarea name="targetAudience" rows={3} value={formData.targetAudience} onChange={handleChange} placeholder={t('onboarding.targetAudiencePlaceholder')} className={inputCls + ' resize-none'} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.currentChallenges')}</label>
                      <textarea name="currentChallenges" rows={3} value={formData.currentChallenges} onChange={handleChange} placeholder={t('onboarding.currentChallengesPlaceholder')} className={inputCls + ' resize-none'} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.previousMarketing')}</label>
                      <textarea name="previousMarketing" rows={2} value={formData.previousMarketing} onChange={handleChange} placeholder={t('onboarding.previousMarketingPlaceholder')} className={inputCls + ' resize-none'} />
                    </div>
                  </CollapsibleSection>

                  {/* ── Section 6: Interne Notizen ── */}
                  <CollapsibleSection id="internal" icon={FileText} label={t('onboarding.section.internal')}>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.salesNotes')}</label>
                      <textarea name="salesNotes" rows={4} value={formData.salesNotes} onChange={handleChange} placeholder={t('onboarding.salesNotesPlaceholder')} className={inputCls + ' resize-none'} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.priorities')}</label>
                      <textarea name="priorities" rows={3} value={formData.priorities} onChange={handleChange} placeholder={t('onboarding.prioritiesPlaceholder')} className={inputCls + ' resize-none'} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">{t('onboarding.specialRequirements')}</label>
                      <textarea name="specialRequirements" rows={3} value={formData.specialRequirements} onChange={handleChange} placeholder={t('onboarding.specialRequirementsPlaceholder')} className={inputCls + ' resize-none'} />
                    </div>
                  </CollapsibleSection>

                  {/* Submit */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t('onboarding.submitting') : (
                        <>
                          {t('onboarding.submit')}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-600 text-center mt-3">
                      {t('onboarding.submitHint')}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link to="/" className="hover:text-white transition-colors">{lang === 'de' ? 'Startseite' : 'Home'}</Link>
              <Link to="/systems" className="hover:text-white transition-colors">{lang === 'de' ? 'Systeme' : 'Systems'}</Link>
            </div>
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} {siteConfig.name}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <LanguageProvider>
      <OnboardingContent />
    </LanguageProvider>
  );
}
