/**
 * Landing Page Content Configuration
 * Brand: Flowstack Systems
 * Style: Dark theme with gold accents
 * Content: German - KI-Automatisierung für B2B-Dienstleister
 * Framework: Conversion-optimized (Baulig/APEX style)
 */

// ============================================
// Section 1: Hero
// ============================================
export const siteConfig = {
  name: "Flowstack Systems",
  eyebrow: "Für Agenturen, Berater & Dienstleister mit 500.000 € bis 5 Mio. € Umsatz",
  title: "Steigere deine Umsatzrendite auf über 50 %",
  titleAccent: "– ohne neue Mitarbeiter einzustellen oder deine Kosten mit zu skalieren.",
  tagline:
    "Wir automatisieren mit intelligenten KI-Mitarbeitern jeden manuellen Handgriff in deinem Unternehmen und verwandeln Umsatz in Gewinn.",
  bulletPoints: [
    "50 %+ Umsatzrendite bei stabiler Kostenstruktur",
    "Automatisierte Prozesse statt manueller Koordination",
    "Skalierung ohne zusätzlichen Personalaufbau",
    "Umsatzwachstum mit klarer Struktur und Kontrolle",
  ],
  cta: {
    text: "Kostenlose Prozess-Analyse sichern",
    href: "/kostenlose-beratung",
    isInternal: true,
  },
  ctaSubtext: "Unverbindlich & in 15 Minuten fertig",
  available: true,
};

// ============================================
// Navigation Links
// ============================================
export const navLinks = [
  { label: "Leistungen", href: "#services" },
  { label: "Prozess", href: "#process" },
  { label: "Referenzen", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

// ============================================
// Section 2: Trust Metrics & Tools
// ============================================
export const trustMetrics = {
  headline: "Operativ erprobte Systeme. Keine Theorie.",
  subheadline: "Diese Automatisierungen laufen bereits in produktiven Agenturen und Dienstleistungsunternehmen.",
  rating: "4,9/5 Bewertung",
  metrics: [
    { value: "127+", label: "Unternehmen automatisiert" },
    { value: "2,3 Mio. €", label: "reduzierte Personalkosten" },
    { value: "847.000+", label: "manuelle Arbeitsstunden ersetzt" },
  ],
};

export const tools = [
  { name: "Make", logo: "https://cdn.simpleicons.org/make" },
  { name: "Airtable", logo: "https://cdn.simpleicons.org/airtable" },
  { name: "Notion", logo: "https://cdn.simpleicons.org/notion" },
  { name: "Slack", logo: "https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png" },
  { name: "Zapier", logo: "https://cdn.simpleicons.org/zapier" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot" },
  { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai" },
  { name: "n8n", logo: "https://cdn.simpleicons.org/n8n" },
];

// ============================================
// Section 3: Problem Section (Umsatz-Stress-Dilemma)
// ============================================
export const problemSection = {
  headline: "Skalierung scheitert an Struktur.",
  headlineAccent: "",
  intro: "In B2B-Unternehmen und Agenturen entscheiden interne Abläufe über Wachstum, nicht externe Nachfrage.",
  problems: [
    {
      icon: "Clock",
      title: "Operative Komplexität wächst schneller als Output",
      description:
        "Mit steigendem Umsatz nimmt der interne Abstimmungs- und Koordinationsaufwand zu. Diese Arbeit bindet Kapazität, ohne zusätzliche Leistung oder Marge zu erzeugen.",
      symptoms: [],
    },
    {
      icon: "TrendingDown",
      title: "Personalkosten skalieren linear, Effizienz nicht",
      description:
        "Zusätzliche Mitarbeiter erhöhen Fixkosten sofort. Produktivität und Marge steigen dagegen nur verzögert oder bleiben konstant.",
      symptoms: [],
    },
    {
      icon: "Link",
      title: "Interne Entscheidungswege begrenzen Geschwindigkeit",
      description:
        "Freigaben, Priorisierungen und Korrekturen laufen über wenige Stellen. Dadurch wird Skalierung nicht durch Nachfrage, sondern durch Struktur begrenzt.",
      symptoms: [],
    },
  ],
};

// ============================================
// Section 4: Symptome / Pain Points
// ============================================
export const symptoms = {
  headline: "Was wegfällt",
  items: [
    "Manuelle Übergaben zwischen Abteilungen",
    "Wiederkehrende Rückfragen zu identischen Themen",
    "Individuelle Sonderlösungen für Standardprozesse",
    "Abhängigkeit von einzelnen Schlüsselpersonen",
    "Operatives Nacharbeiten durch unsaubere Abläufe",
    "Wachstum mit steigender Unsicherheit in Steuerung und Marge",
  ],
  conclusion: "",
};

// ============================================
// Section 5: Vorher/Nachher Vergleich
// ============================================
export const comparison = {
  headline: "Der Unterschied liegt in der Arbeitsweise.",
  headlineAccent: "",
  before: {
    title: "Der alte Weg",
    items: [
      "Operative Aufgaben werden manuell ausgeführt",
      "Wissen und Verantwortung sind an einzelne Personen gebunden",
      "Abläufe sind nicht standardisiert und schwer reproduzierbar",
      "Wachstum erhöht Risiko, Kosten und Abhängigkeiten",
    ],
  },
  after: {
    title: "Mit Flowstack Systems",
    items: [
      "Prozesse laufen automatisiert",
      "Entscheidungen und Zuständigkeiten sind klar definiert",
      "Qualität bleibt konstant, auch bei höherem Volumen",
      "Wachstum erhöht Marge und Stabilität",
    ],
  },
  costComparison: {
    headline: "Der strukturelle Unterschied",
    employee: {
      title: "Manuell",
      cost: "Variable Kosten pro Einheit",
      availability: "Begrenzte Kapazität",
      training: "Einarbeitung erforderlich",
      absence: "Personalabhängig",
      scaling: "Linearer Kostenaufbau",
    },
    ai: {
      title: "Automatisiert",
      cost: "Fixkosten, skalierbar",
      availability: "Unbegrenzte Kapazität",
      training: "Sofort einsatzbereit",
      absence: "Systembasiert",
      scaling: "Marginale Zusatzkosten",
    },
    result: "Skalierung entsteht durch Systematisierung, nicht durch mehr Einsatz.",
  },
};

// ============================================
// Section 6: Benefits
// ============================================
export const benefits = {
  headline: "Was sich messbar verändert",
  subheadline: "",
  items: [
    {
      icon: "TrendingUp",
      title: "50 %+ Umsatzrendite",
      description:
        "Höhere Profitabilität durch automatisierte Abläufe bei stabiler Kostenstruktur.",
      metric: "",
    },
    {
      icon: "Users",
      title: "Skalierung ohne proportionalen Personalaufbau",
      description:
        "Mehr Umsatz und Kapazität, ohne zusätzliche Vollzeitstellen oder steigenden Overhead.",
      metric: "",
    },
    {
      icon: "Shield",
      title: "Stabile Abläufe bei steigendem Volumen",
      description:
        "Prozesse bleiben zuverlässig, auch wenn Anfragen, Projekte und Umsatz deutlich zunehmen.",
      metric: "",
    },
    {
      icon: "Target",
      title: "Planbarkeit statt Reibungsverluste",
      description:
        "Klare Prozesse, saubere Übergaben und kontrollierbare Kosten, auch bei weiterem Wachstum.",
      metric: "",
    },
  ],
};

// ============================================
// Section 7: Process Steps
// ============================================
export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  duration?: string;
  items: string[];
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    subtitle: "ANALYSE",
    title: "Analyse",
    description:
      "Identifikation der Prozesse, in denen heute überproportional Zeit und Kosten entstehen.",
    duration: "60 MINUTEN",
    items: [
      "Systematische Prozessaufnahme",
      "Quantifizierung von Einsparpotenzial",
      "Priorisierung nach Wirkung und Umsetzbarkeit",
    ],
  },
  {
    step: "02",
    subtitle: "IMPLEMENTIERUNG",
    title: "Implementierung",
    description:
      "Aufbau und Integration automatisierter Workflows und KI-Mitarbeiter in die bestehenden Systeme.",
    duration: "2-6 WOCHEN",
    items: [
      "Technische Umsetzung der Workflows",
      "Integration in bestehende Systemlandschaft",
      "Dokumentation und Team-Einweisung",
    ],
  },
  {
    step: "03",
    subtitle: "SKALIERUNG",
    title: "Skalierung",
    description:
      "Übertragung der Automatisierung auf weitere Bereiche und laufende Optimierung.",
    duration: "LAUFEND",
    items: [
      "Regelmäßige Performance-Analyse",
      "Erweiterung auf weitere Prozesse",
      "Kontinuierliche Verbesserung",
    ],
  },
];

// ============================================
// Section 8: Services / Was wir automatisieren
// ============================================
export interface Service {
  title: string;
  description: string;
  icon: string;
  examples: string[];
}

export const services: Service[] = [
  {
    title: "Vertrieb & Sales",
    description: "Standardisierte Lead-Bearbeitung, Qualifizierung und Angebotsprozesse.",
    icon: "Target",
    examples: [
      "Automatische Lead-Qualifizierung nach definierten Kriterien",
      "Strukturierte Follow-up-Prozesse",
      "Angebotserstellung aus standardisierten Vorlagen",
      "Lückenlose CRM-Dokumentation",
    ],
  },
  {
    title: "Marketing & Content",
    description: "Automatisierte Erstellung, Anpassung und Ausspielung von Inhalten.",
    icon: "Megaphone",
    examples: [
      "Content-Produktion aus definierten Inputs",
      "Mehrfachverwertung bestehender Inhalte",
      "Kanalübergreifende Distribution",
      "Systematisches Monitoring",
    ],
  },
  {
    title: "Fulfillment & Delivery",
    description: "Reproduzierbare Leistungserbringung mit klar definierten Abläufen.",
    icon: "Settings",
    examples: [
      "Standardisiertes Kunden-Onboarding",
      "Automatische Task-Erstellung und Tracking",
      "Transparente Projektstatusübersicht",
      "Strukturierte Briefing-Prozesse",
    ],
  },
  {
    title: "Support & Service",
    description: "Automatisierte Bearbeitung wiederkehrender Anfragen und Tickets.",
    icon: "MessageCircle",
    examples: [
      "Automatische Kategorisierung und Priorisierung",
      "Sofortige Beantwortung von Standardanfragen",
      "Intelligente Eskalation komplexer Fälle",
      "Proaktive Problemerkennung",
    ],
  },
  {
    title: "Controlling & Finanzen",
    description: "Laufende Auswertungen und Kennzahlen ohne manuelle Datenerfassung.",
    icon: "BarChart3",
    examples: [
      "Automatisch aktualisierte KPIs",
      "Projektbezogene Profitabilitätsanalysen",
      "Automatisierte Cashflow-Übersichten",
      "Systematische Rechnungsstellung",
    ],
  },
  {
    title: "Backoffice & HR",
    description: "Klare Prozesse statt individueller, personengebundener Arbeitsweisen.",
    icon: "FolderOpen",
    examples: [
      "Strukturiertes Bewerbermanagement",
      "Standardisiertes Mitarbeiter-Onboarding",
      "Automatisierte Zeiterfassung",
      "Systematisches Vertragsmanagement",
    ],
  },
];

// ============================================
// Section 9: Anti-Positionierung (False Solutions)
// ============================================
export const falseSolutions = {
  headline: "Diese Lösungen hast du wahrscheinlich schon probiert.",
  subheadline: "Sie funktionieren nicht.",
  solutions: [
    {
      title: "Ich baue das selbst mit Zapier/Make",
      icon: "Wrench",
      problem:
        "Jede Stunde mit Tutorials und Debugging ist eine Stunde weniger für Kunden und Strategie.",
    },
    {
      title: "Ich stelle einfach mehr Leute ein",
      icon: "Users",
      problem:
        "Mehr Mitarbeiter = mehr Kosten, mehr Meetings, mehr Chaos. Komplexität wächst exponentiell.",
    },
    {
      title: "Wir kaufen noch ein Tool",
      icon: "Package",
      problem:
        "Du hast 17 Tools, aber sie reden nicht miteinander. Das Problem ist die fehlende Verbindung.",
    },
  ],
  conclusion: "Das Problem ist nicht die Ausführung. Das Problem ist die fehlende Struktur.",
  transition: {
    headline: "Was wirklich funktioniert: Ein System, das denkt.",
    text: "Du brauchst keine neuen Tools. Du brauchst keine neuen Mitarbeiter. Du brauchst Prozesse, die einmal gebaut werden und dann für immer laufen.",
  },
};

// ============================================
// Section 10: Case Studies
// ============================================
export interface CaseStudy {
  category: string;
  title: string;
  challenge: string;
  solution: string;
  videoThumbnail: string;
  results: string[];
  metrics: {
    value: string;
    label: string;
  }[];
  author: {
    name: string;
    title: string;
    company: string;
    image: string;
  };
}

export const caseStudiesSection = {
  headline: "Ergebnisse aus vergleichbaren Unternehmen.",
  headlineAccent: "",
  subheadline: "",
};

export const caseStudies: CaseStudy[] = [
  {
    category: "Performance Marketing Agentur",
    title: "Operative Entlastung und Margenverbesserung",
    challenge:
      "Ausgangssituation: 70% der Geschäftsführerzeit in operativen Aufgaben gebunden.",
    solution:
      "Automatisierter Bereich: Angebotserstellung, Kunden-Reports, Lead-Qualifizierung, Team-Briefings.",
    videoThumbnail: "https://via.placeholder.com/640x360?text=Case+Study+Video",
    results: [
      "23 Stunden/Woche operative Entlastung",
      "2 Vollzeitstellen durch Automatisierung ersetzt",
      "Strategische Kapazität wiederhergestellt",
    ],
    metrics: [
      { value: "73.887€", label: "Reduzierte Personalkosten p.a." },
      { value: "47%", label: "Neue Umsatzrendite (vorher 21%)" },
    ],
    author: {
      name: "Michael Brenner",
      title: "Geschäftsführer",
      company: "Performance Marketing Agentur",
      image: "https://via.placeholder.com/80x80?text=MB",
    },
  },
  {
    category: "HR-Beratung",
    title: "Skalierung ohne proportionalen Personalaufbau",
    challenge:
      "Ausgangssituation: Kunden-Onboarding band 3 Mitarbeiter für je 2 Wochen pro Kunde.",
    solution:
      "Automatisierter Bereich: Vollständiger Onboarding-Prozess von Vertragsabschluss bis Projektstart.",
    videoThumbnail: "https://via.placeholder.com/640x360?text=Case+Study+Video",
    results: [
      "Onboarding-Zeit von 14 Tagen auf 48h reduziert",
      "31 Stunden/Woche manuelle Arbeit eliminiert",
      "40% mehr Kundenkapazität ohne Neueinstellungen",
    ],
    metrics: [
      { value: "48h", label: "Neue Onboarding-Dauer" },
      { value: "31h", label: "Wöchentlich eingesparte Arbeitszeit" },
    ],
    author: {
      name: "Sandra Lehmann",
      title: "Inhaberin",
      company: "HR-Beratung",
      image: "https://via.placeholder.com/80x80?text=SL",
    },
  },
  {
    category: "Steuerberatung für E-Commerce",
    title: "Support-Automatisierung mit Kostenreduktion",
    challenge:
      "Ausgangssituation: 4 Support-Mitarbeiter, Antwortzeiten über 24 Stunden.",
    solution:
      "Automatisierter Bereich: Anfragekategorisierung, Standard-Antworten, intelligente Eskalation.",
    videoThumbnail: "https://via.placeholder.com/640x360?text=Case+Study+Video",
    results: [
      "78% der Anfragen automatisch bearbeitet",
      "Antwortzeit auf 3 Minuten reduziert",
      "Support-Team von 4 auf 1,5 Stellen",
    ],
    metrics: [
      { value: "62.340€", label: "Reduzierte Personalkosten p.a." },
      { value: "3 Min", label: "Durchschnittliche Antwortzeit" },
    ],
    author: {
      name: "Thomas Richter",
      title: "Gründer",
      company: "Steuerberatung für E-Commerce",
      image: "https://via.placeholder.com/80x80?text=TR",
    },
  },
];

// Legacy export for backward compatibility
export const testimonials = caseStudies.map((cs) => ({
  quote: cs.title,
  description: cs.challenge,
  results: cs.results,
  author: cs.author,
}));

// ============================================
// Section 11: Team / Über uns
// ============================================
export const teamContent = {
  headline: "Fokus auf operative Umsetzung.",
  headlineAccent: "",
  description: `Wir entwickeln und implementieren Systeme, die im laufenden Betrieb zuverlässig funktionieren, nicht nur in Konzeptpapieren.`,
  stats: [
    { value: "127+", label: "Unternehmen automatisiert" },
    { value: "2,3 Mio. €", label: "reduzierte Personalkosten" },
    { value: "847.000+", label: "ersetzte Arbeitsstunden" },
    { value: "100%", label: "DSGVO-konform" },
  ],
  members: [
    {
      name: "Claudio Di Franco",
      role: "Gründer & Prozessarchitekt",
      image: "https://via.placeholder.com/400x400?text=Claudio",
      description: "Prozessarchitektur und Systemdesign für B2B-Dienstleister.",
    },
    {
      name: "Anak",
      role: "Automation Engineer",
      image: "https://via.placeholder.com/400x400?text=Anak",
      description: "Technische Implementierung, KI-Integration und Workflow-Automatisierung.",
    },
  ],
};

// ============================================
// Section 12: FAQ
// ============================================
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Für welche Unternehmen eignet sich das?",
    answer:
      "Diese Lösung eignet sich für Unternehmen mit etablierten Angeboten und wiederkehrenden Prozessen, insbesondere für Agenturen, Beratungen und B2B-Dienstleister mit einem Jahresumsatz zwischen 500.000 € und 5 Mio. €. Voraussetzung sind bestehende, standardisierbare Abläufe.",
  },
  {
    question: "Wie hoch ist die Investition?",
    answer:
      "Die Investition richtet sich nach dem Umfang der Automatisierung und wird individuell kalkuliert. Eine konkrete Einschätzung erfolgt im Erstgespräch.",
  },
  {
    question: "Wann sind erste Ergebnisse sichtbar?",
    answer:
      "Die ersten Automatisierungen gehen typischerweise nach 2 bis 4 Wochen in Betrieb. Messbare Auswirkungen auf Zeit- und Kostenstruktur zeigen sich in der Regel innerhalb von 60 bis 90 Tagen.",
  },
  {
    question: "Ist technisches Wissen erforderlich?",
    answer:
      "Nein. Die Implementierung erfolgt vollständig durch unser Team. Deine Aufgabe ist es, bestehende Prozesse zu beschreiben und Feedback zur Umsetzung zu geben.",
  },
  {
    question: "Welche Technologien werden eingesetzt?",
    answer:
      "Wir arbeiten mit etablierten KI- und Automatisierungsplattformen wie OpenAI, Claude, Make.com und n8n. Die Integration erfolgt in deine bestehende Systemlandschaft, ohne dass du Tools wechseln musst.",
  },
  {
    question: "Wie ist der Ablauf einer Zusammenarbeit?",
    answer:
      "Nach einem Erstgespräch zur Analyse folgt ein konkreter Umsetzungsplan mit Priorisierung. Die Implementierung dauert je nach Umfang 2 bis 6 Wochen, gefolgt von einer optionalen laufenden Optimierungsphase.",
  },
  {
    question: "Welche Zusicherungen gibt es?",
    answer:
      "Wir arbeiten ergebnisorientiert und definieren vor Projektstart klare, messbare Ziele. Eine pauschale Erfolgsgarantie geben wir nicht, da Ergebnisse auch von internen Faktoren abhängen.",
  },
  {
    question: "Was unterscheidet euch von anderen Anbietern?",
    answer:
      "Wir implementieren selbst, statt nur zu beraten. Der Fokus liegt auf messbaren Ergebnissen in operativen Prozessen, nicht auf Konzepten oder Schulungen.",
  },
  {
    question: "Wie wird mit Daten umgegangen?",
    answer:
      "Alle Daten bleiben in deinen Systemen. Die eingesetzten KI-Modelle sind DSGVO-konform und nutzen keine Kundendaten für Trainingszwecke. Auf Wunsch sind auch selbst gehostete Lösungen möglich.",
  },
  {
    question: "Führt Automatisierung zu Personalabbau?",
    answer:
      "Nicht zwangsläufig. Die meisten Unternehmen nutzen frei werdende Kapazitäten für wertschöpfende Aufgaben oder wachsen ohne zusätzliche Einstellungen. Personalreduktion ist kein primäres Ziel der Zusammenarbeit.",
  },
];

// ============================================
// Section 13: Final CTA
// ============================================
export const finalCta = {
  headline: "Reduziere manuelle Arbeit. Erhöhe deine Marge.",
  subheadline:
    "Automatisiere deine internen Prozesse mit KI und skaliere dein Unternehmen ohne zusätzlichen Overhead.",
  description:
    "",
  cta: {
    text: "Kostenlose Prozess-Analyse sichern",
    href: "/kostenlose-beratung",
    isInternal: true,
  },
  ctaSubtext: "Unverbindliches Erstgespräch.",
  benefits: [
    "Automatisierte Prozesse statt manueller Koordination",
    "Skalierung ohne zusätzlichen Personalaufbau",
    "Klare Strukturen für stabile Margen",
  ],
  riskReversals: [
    "Kostenlos und unverbindlich",
    "Sachliche Analyse",
    "Ergebnis unabhängig von Zusammenarbeit",
  ],
  details: {
    duration: "60 Minuten",
    cost: "0€",
    pressure: "Kein Verkaufsdruck",
  },
  trust: "127+ Unternehmen im DACH-Raum",
};

// ============================================
// Section 14: ROI Urgency
// ============================================
export const roiSection = {
  headline: "Skalierung ist eine strukturelle Entscheidung.",
  subheadline: "Die Frage ist nicht, ob du mehr Umsatz machen kannst, sondern ob dein System darauf ausgelegt ist, diesen Umsatz profitabel und stabil abzubilden.",
  items: [
    { metric: "Koordination statt Wertschöpfung", cost: "Zeit und Fokus fließen in Abstimmung, nicht in Wachstum." },
    { metric: "500 €+", cost: "Marge, die täglich durch operative Reibung verloren geht." },
    { metric: "1 Einheit", cost: "Unternehmerische Energie, die nicht zurückkommt." },
  ],
};

// ============================================
// Footer
// ============================================
export const footerLinks = {
  social: [
    { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  ],
  legal: [
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "Impressum", href: "/impressum" },
  ],
};

// ============================================
// Meta / SEO
// ============================================
export const metaContent = {
  title: "KI-Automatisierung für Agenturen | Skalieren ohne neue Mitarbeiter | Flowstack Systems",
  description:
    "Spare 25+ Stunden pro Woche und bis zu 73.887€ Personalkosten im Monat. KI-Mitarbeiter für Agenturen, Berater und Dienstleister. ✓ Done-for-You ✓ In 14 Tagen live ✓ DSGVO-konform",
};

// ============================================
// Legacy exports for backward compatibility
// ============================================
export const emotionalReframe = {
  headline: problemSection.headline,
  subheadline: problemSection.headlineAccent,
  content: problemSection.intro,
};

export const problemMirror = {
  headline: problemSection.headline,
  subheadline: problemSection.intro,
  problems: problemSection.problems.map((p) => ({
    title: p.title,
    description: p.description,
    icon: p.icon,
  })),
};

export const targetAudience = {
  headline: "Entwickelt für Unternehmen, die strukturell skalieren wollen.",
  forWhom: {
    title: "Das ist für dich, wenn:",
    items: [
      "dein Umsatz zwischen 500.000 € und 5 Mio. € liegt",
      "operative Abläufe zunehmend komplex werden",
      "Personalkosten ein zentraler Hebel für Profitabilität sind",
      "du Skalierung als Systemfrage verstehst, nicht als reines Umsatzthema",
    ],
  },
  notForWhom: {
    title: "Das ist nichts für dich, wenn:",
    items: [
      "Prozesse noch nicht standardisiert sind",
      "du kurzfristige Einzellösungen oder Hacks suchst",
      "du operative Verantwortung nicht neu verteilen willst",
    ],
  },
};

export const differentiator = {
  headline: comparison.headline,
  insight: {
    left: {
      title: comparison.before.title,
      description: comparison.before.items.join(" "),
    },
    right: {
      title: comparison.after.title,
      description: comparison.after.items.join(" "),
    },
  },
  conclusion: comparison.costComparison.result,
  keyInsight: "Skalierung entsteht durch Systematisierung, nicht durch mehr Einsatz.",
};

export const outcomes = {
  headline: benefits.headline,
  items: benefits.items.map((b) => ({
    title: b.title,
    description: b.description,
    icon: b.icon,
  })),
};

export const relief = {
  headline: "Was wegfällt",
  items: symptoms.items.slice(0, 6),
};

export const consequences = {
  headline: roiSection.headline,
  subheadline: roiSection.subheadline,
  items: roiSection.items.map((i) => i.cost),
  costPerDay: {
    headline: "",
    items: roiSection.items.map((i) => ({
      metric: i.metric,
      description: i.cost,
    })),
  },
};

export const aboutContent = {
  title: "Über",
  description: teamContent.description,
  stats: teamContent.stats,
};

export const expertContent = {
  label: "Wer hinter Flowstack Systems steht",
  headline: teamContent.members[0].name,
  name: teamContent.members[0].name,
  experience: "Ex-Agenturinhaber",
  image: teamContent.members[0].image,
  paragraphs: teamContent.description.split("\n\n"),
  credentials: teamContent.stats,
};

export const clientLogos = tools;
