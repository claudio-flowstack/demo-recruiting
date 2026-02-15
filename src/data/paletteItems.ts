import type { NodeType } from '@/types/automation';

export interface PaletteItem {
  icon: string;
  tKey: string;        // Translation key for the label
  descKey: string;     // Translation key for short description
  label?: string;      // Direct label (fallback for tool logos)
  type: NodeType;
  category: string;    // Translation key for sub-category header
}

export const PALETTE_ITEMS: PaletteItem[] = [
  // ══════════════════════════════════════════════════════════════
  // TRIGGER / AUSLÖSER
  // ══════════════════════════════════════════════════════════════
  { icon: 'logo-typeform',      tKey: 'palette.formTrigger',       descKey: 'palette.formTrigger.desc',       type: 'trigger', category: 'palette.cat.trigger' },
  { icon: 'logo-calendly',      tKey: 'palette.bookingTrigger',    descKey: 'palette.bookingTrigger.desc',    type: 'trigger', category: 'palette.cat.trigger' },
  { icon: 'logo-gmail',         tKey: 'palette.emailTrigger',      descKey: 'palette.emailTrigger.desc',      type: 'trigger', category: 'palette.cat.trigger' },
  { icon: 'calendar',           tKey: 'palette.schedule',          descKey: 'palette.schedule.desc',          type: 'trigger', category: 'palette.cat.trigger' },
  { icon: 'logo-hubspot',       tKey: 'palette.crmTrigger',        descKey: 'palette.crmTrigger.desc',        type: 'trigger', category: 'palette.cat.trigger' },
  { icon: 'logo-meta',          tKey: 'palette.socialTrigger',     descKey: 'palette.socialTrigger.desc',     type: 'trigger', category: 'palette.cat.trigger' },
  { icon: 'logo-stripe',        tKey: 'palette.paymentTrigger',    descKey: 'palette.paymentTrigger.desc',    type: 'trigger', category: 'palette.cat.trigger' },
  { icon: 'logo-google-sheets', tKey: 'palette.sheetTrigger',      descKey: 'palette.sheetTrigger.desc',      type: 'trigger', category: 'palette.cat.trigger' },
  { icon: 'play',               tKey: 'palette.manualTrigger',     descKey: 'palette.manualTrigger.desc',     type: 'trigger', category: 'palette.cat.trigger' },
  { icon: 'webhook',            tKey: 'palette.webhook',           descKey: 'palette.webhook.desc',           type: 'trigger', category: 'palette.cat.trigger' },
  { icon: 'logo-zapier',        tKey: 'palette.automationTrigger', descKey: 'palette.automationTrigger.desc', type: 'trigger', category: 'palette.cat.trigger' },

  // ══════════════════════════════════════════════════════════════
  // KI / AI
  // ══════════════════════════════════════════════════════════════
  { icon: 'logo-openai',  tKey: 'palette.aiGenerate',   descKey: 'palette.aiGenerate.desc',   type: 'ai', category: 'palette.cat.ai' },
  { icon: 'logo-claude',  tKey: 'palette.aiAgent',      descKey: 'palette.aiAgent.desc',      type: 'ai', category: 'palette.cat.ai' },
  { icon: 'logo-openai',  tKey: 'palette.aiAnalysis',   descKey: 'palette.aiAnalysis.desc',   type: 'ai', category: 'palette.cat.ai' },
  { icon: 'brain',        tKey: 'palette.aiClassifier', descKey: 'palette.aiClassifier.desc', type: 'ai', category: 'palette.cat.ai' },
  { icon: 'message-square', tKey: 'palette.aiChat',     descKey: 'palette.aiChat.desc',       type: 'ai', category: 'palette.cat.ai' },
  { icon: 'file-text',    tKey: 'palette.aiSummarize',  descKey: 'palette.aiSummarize.desc',  type: 'ai', category: 'palette.cat.ai' },
  { icon: 'heart',        tKey: 'palette.aiFeedback',   descKey: 'palette.aiFeedback.desc',   type: 'ai', category: 'palette.cat.ai' },
  { icon: 'languages',    tKey: 'palette.aiTranslate',  descKey: 'palette.aiTranslate.desc',  type: 'ai', category: 'palette.cat.ai' },
  { icon: 'eye',          tKey: 'palette.aiVision',     descKey: 'palette.aiVision.desc',     type: 'ai', category: 'palette.cat.ai' },
  { icon: 'scan',         tKey: 'palette.aiExtract',    descKey: 'palette.aiExtract.desc',    type: 'ai', category: 'palette.cat.ai' },

  // ══════════════════════════════════════════════════════════════
  // LOGIK & ENTSCHEIDUNGEN
  // ══════════════════════════════════════════════════════════════
  { icon: 'git-branch',   tKey: 'palette.ifElse',       descKey: 'palette.ifElse.desc',       type: 'process', category: 'palette.cat.logic' },
  { icon: 'filter',       tKey: 'palette.filter',       descKey: 'palette.filter.desc',       type: 'process', category: 'palette.cat.logic' },
  { icon: 'split',        tKey: 'palette.split',        descKey: 'palette.split.desc',        type: 'process', category: 'palette.cat.logic' },
  { icon: 'shuffle',      tKey: 'palette.switch',       descKey: 'palette.switch.desc',       type: 'process', category: 'palette.cat.logic' },
  { icon: 'git-merge',    tKey: 'palette.merge',        descKey: 'palette.merge.desc',        type: 'process', category: 'palette.cat.logic' },
  { icon: 'repeat',       tKey: 'palette.loop',         descKey: 'palette.loop.desc',         type: 'process', category: 'palette.cat.logic' },
  { icon: 'clock',        tKey: 'palette.delay',        descKey: 'palette.delay.desc',        type: 'process', category: 'palette.cat.logic' },
  { icon: 'timer',        tKey: 'palette.timer',        descKey: 'palette.timer.desc',        type: 'process', category: 'palette.cat.logic' },
  { icon: 'scale',        tKey: 'palette.abTest',       descKey: 'palette.abTest.desc',       type: 'process', category: 'palette.cat.logic' },
  { icon: 'shield-alert', tKey: 'palette.errorHandler', descKey: 'palette.errorHandler.desc', type: 'process', category: 'palette.cat.logic' },

  // ══════════════════════════════════════════════════════════════
  // DATEN & VERARBEITUNG
  // ══════════════════════════════════════════════════════════════
  { icon: 'logo-google-sheets', tKey: 'palette.data',       descKey: 'palette.data.desc',       type: 'process', category: 'palette.cat.data' },
  { icon: 'logo-airtable',      tKey: 'palette.database',   descKey: 'palette.database.desc',   type: 'process', category: 'palette.cat.data' },
  { icon: 'logo-hubspot',       tKey: 'palette.crm',        descKey: 'palette.crm.desc',        type: 'process', category: 'palette.cat.data' },
  { icon: 'logo-salesforce',    tKey: 'palette.salesforce', descKey: 'palette.salesforce.desc', type: 'process', category: 'palette.cat.data' },
  { icon: 'logo-pipedrive',     tKey: 'palette.pipedrive',  descKey: 'palette.pipedrive.desc',  type: 'process', category: 'palette.cat.data' },
  { icon: 'bookmark',           tKey: 'palette.variable',   descKey: 'palette.variable.desc',   type: 'process', category: 'palette.cat.data' },
  { icon: 'copy-check',         tKey: 'palette.dedup',      descKey: 'palette.dedup.desc',      type: 'process', category: 'palette.cat.data' },
  { icon: 'package',            tKey: 'palette.aggregate',  descKey: 'palette.aggregate.desc',  type: 'process', category: 'palette.cat.data' },
  { icon: 'type',               tKey: 'palette.template',   descKey: 'palette.template.desc',   type: 'process', category: 'palette.cat.data' },
  { icon: 'file-json',          tKey: 'palette.transform',  descKey: 'palette.transform.desc',  type: 'process', category: 'palette.cat.data' },
  { icon: 'file-search',        tKey: 'palette.search',     descKey: 'palette.search.desc',     type: 'process', category: 'palette.cat.data' },
  { icon: 'shield-check',       tKey: 'palette.approval',   descKey: 'palette.approval.desc',   type: 'process', category: 'palette.cat.data' },
  { icon: 'code',               tKey: 'palette.code',       descKey: 'palette.code.desc',       type: 'process', category: 'palette.cat.data' },
  { icon: 'globe',              tKey: 'palette.httpRequest', descKey: 'palette.httpRequest.desc', type: 'process', category: 'palette.cat.data' },

  // ══════════════════════════════════════════════════════════════
  // OUTPUT / KOMMUNIKATION
  // ══════════════════════════════════════════════════════════════
  { icon: 'logo-gmail',      tKey: 'palette.email',        descKey: 'palette.email.desc',        type: 'output', category: 'palette.cat.comm' },
  { icon: 'logo-slack',      tKey: 'palette.slack',        descKey: 'palette.slack.desc',        type: 'output', category: 'palette.cat.comm' },
  { icon: 'logo-whatsapp',   tKey: 'palette.whatsapp',     descKey: 'palette.whatsapp.desc',     type: 'output', category: 'palette.cat.comm' },
  { icon: 'bell',            tKey: 'palette.notification', descKey: 'palette.notification.desc', type: 'output', category: 'palette.cat.comm' },
  { icon: 'smartphone',      tKey: 'palette.sms',          descKey: 'palette.sms.desc',          type: 'output', category: 'palette.cat.comm' },
  { icon: 'logo-teams',      tKey: 'palette.teams',        descKey: 'palette.teams.desc',        type: 'output', category: 'palette.cat.comm' },
  { icon: 'logo-telegram',   tKey: 'palette.telegram',     descKey: 'palette.telegram.desc',     type: 'output', category: 'palette.cat.comm' },
  { icon: 'logo-mailchimp',  tKey: 'palette.newsletter',   descKey: 'palette.newsletter.desc',   type: 'output', category: 'palette.cat.comm' },

  // ══════════════════════════════════════════════════════════════
  // OUTPUT / INHALTE & DOKUMENTE
  // ══════════════════════════════════════════════════════════════
  { icon: 'logo-google-docs',  tKey: 'palette.document',    descKey: 'palette.document.desc',    type: 'output', category: 'palette.cat.content' },
  { icon: 'logo-google-drive', tKey: 'palette.fileStorage', descKey: 'palette.fileStorage.desc', type: 'output', category: 'palette.cat.content' },
  { icon: 'logo-notion',       tKey: 'palette.notion',      descKey: 'palette.notion.desc',      type: 'output', category: 'palette.cat.content' },
  { icon: 'logo-wordpress',    tKey: 'palette.website',     descKey: 'palette.website.desc',     type: 'output', category: 'palette.cat.content' },
  { icon: 'file-type-2',       tKey: 'palette.pdf',         descKey: 'palette.pdf.desc',         type: 'output', category: 'palette.cat.content' },
  { icon: 'image-plus',        tKey: 'palette.imageCreate', descKey: 'palette.imageCreate.desc', type: 'output', category: 'palette.cat.content' },
  { icon: 'video',             tKey: 'palette.video',       descKey: 'palette.video.desc',       type: 'output', category: 'palette.cat.content' },

  // ══════════════════════════════════════════════════════════════
  // OUTPUT / SOCIAL MEDIA & ADS
  // ══════════════════════════════════════════════════════════════
  { icon: 'logo-meta',             tKey: 'palette.social',    descKey: 'palette.social.desc',    type: 'output', category: 'palette.cat.social' },
  { icon: 'logo-instagram',        tKey: 'palette.instagram', descKey: 'palette.instagram.desc', type: 'output', category: 'palette.cat.social' },
  { icon: 'logo-linkedin',         tKey: 'palette.linkedin',  descKey: 'palette.linkedin.desc',  type: 'output', category: 'palette.cat.social' },
  { icon: 'logo-tiktok',           tKey: 'palette.tiktok',    descKey: 'palette.tiktok.desc',    type: 'output', category: 'palette.cat.social' },
  { icon: 'logo-youtube',          tKey: 'palette.youtube',   descKey: 'palette.youtube.desc',   type: 'output', category: 'palette.cat.social' },
  { icon: 'logo-google-ads',       tKey: 'palette.ads',       descKey: 'palette.ads.desc',       type: 'output', category: 'palette.cat.social' },

  // ══════════════════════════════════════════════════════════════
  // OUTPUT / ANALYTICS & ZAHLUNGEN
  // ══════════════════════════════════════════════════════════════
  { icon: 'logo-google-analytics', tKey: 'palette.dashboard',  descKey: 'palette.dashboard.desc',  type: 'output', category: 'palette.cat.analytics' },
  { icon: 'logo-stripe',           tKey: 'palette.payment',    descKey: 'palette.payment.desc',    type: 'output', category: 'palette.cat.analytics' },
  { icon: 'gauge',                 tKey: 'palette.monitoring', descKey: 'palette.monitoring.desc', type: 'output', category: 'palette.cat.analytics' },
];
