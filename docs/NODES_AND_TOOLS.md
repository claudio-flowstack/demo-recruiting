# Flowstack Systems — Nodes & Tools Reference

> **Last updated:** 2026-02-15
>
> This document lists every available node and tool in the Flowstack Workflow Builder.
> Update this file whenever nodes are added, renamed, or removed.

---

## Overview

| Category | Count | Description |
|----------|-------|-------------|
| Trigger / Auslöser | 11 | Events that start a workflow |
| KI / AI | 10 | Artificial intelligence actions |
| KI Sub-Nodes | 4 | Attachable modules for AI agents (inside node edit) |
| Logik & Entscheidungen | 10 | Control flow and branching |
| Daten & Verarbeitung | 14 | Data sources, CRM, transforms |
| Kommunikation | 8 | Email, chat, messaging |
| Inhalte & Dokumente | 7 | Document creation and storage |
| Social Media & Ads | 6 | Social platforms and advertising |
| Analytics & Zahlungen | 3 | Payments and monitoring |
| **Total** | **73** | |

---

## 1. Trigger / Auslöser

Triggers define **when** a workflow starts. Each trigger listens for a specific event.

| Node | Icon | Description |
|------|------|-------------|
| **Formular eingereicht** | Typeform | Startet wenn ein Formular ausgefüllt wird. Typisch: Kontaktformular, Bewerbung, Umfrage. |
| **Termin gebucht** | Calendly | Startet wenn jemand einen Termin bucht. Typisch: Erstgespräch, Beratung, Demo-Call. |
| **E-Mail empfangen** | Gmail | Startet wenn eine neue E-Mail in einem bestimmten Postfach eingeht. |
| **Zeitplan / Wiederkehrend** | Calendar | Läuft automatisch nach Zeitplan — täglich, wöchentlich, monatlich. Ideal für Reports, Monitoring. |
| **Neuer Kontakt im CRM** | HubSpot | Startet wenn ein neuer Lead oder Kontakt im CRM erscheint. Typisch: Lead-Qualifizierung. |
| **Social-Media-Aktivität** | Meta | Startet bei Kommentar, Like, DM oder neuer Nachricht auf Social Media. |
| **Zahlung eingegangen** | Stripe | Startet wenn eine Zahlung über Stripe eingeht. Typisch: Willkommens-E-Mail, Onboarding. |
| **Tabelle geändert** | Google Sheets | Startet wenn eine neue Zeile hinzugefügt oder eine bestehende Zeile geändert wird. |
| **Manueller Start** | Play-Button | Workflow wird per Klick manuell gestartet. Nützlich für Tests und einmalige Aktionen. |
| **Webhook / API** | Webhook | Empfängt HTTP-Signale von externen Tools. Für technische Integrationen und benutzerdefinierte Trigger. |
| **Externe Automatisierung** | Zapier | Wird von Zapier, Make oder n8n gestartet. Verbindet Flowstack mit externen Automatisierungsplattformen. |

---

## 2. KI / AI

AI nodes nutzen Künstliche Intelligenz um Inhalte zu erstellen, Daten zu analysieren und Entscheidungen zu treffen.

| Node | Icon | Description |
|------|------|-------------|
| **Text generieren** | OpenAI | Texte, E-Mails, Blogposts, Ad-Copy oder andere Inhalte mit KI erstellen. Der vielseitigste KI-Node. |
| **KI-Agent** | Claude | Intelligenter Agent der komplexe Aufgaben selbstständig löst. Kann Tools nutzen, recherchieren, Entscheidungen treffen. |
| **KI-Analyse** | OpenAI | Daten analysieren und Erkenntnisse gewinnen. Reports erstellen, Trends erkennen, Empfehlungen geben. |
| **Automatisch sortieren** | Brain | Einträge automatisch in Kategorien einteilen. Beispiel: Leads nach Qualität sortieren, Support-Tickets nach Thema. |
| **KI-Chatbot** | MessageSquare | Chatbot oder Konversation mit KI. Für Kundenservice, FAQ-Beantwortung, interaktive Beratung. |
| **Zusammenfassen** | FileText | Lange Texte, Meeting-Transkripte oder Dokumente automatisch zusammenfassen. Spart Lesezeit. |
| **Feedback-Analyse** | Heart | Stimmung in Bewertungen, Kommentaren und Reviews erkennen. Positiv, negativ, neutral — automatisch. |
| **Übersetzen** | Languages | Texte automatisch in andere Sprachen übersetzen. Für mehrsprachige Kampagnen und internationales Marketing. |
| **Bilderkennung** | Eye | Bilder, Screenshots und Fotos analysieren. Inhalte erkennen, Texte extrahieren, Qualität bewerten. |
| **Daten auslesen** | Scan | Kontaktdaten, Rechnungsnummern, Adressen etc. automatisch aus unstrukturiertem Text extrahieren. |

---

## 3. KI Sub-Nodes

Sub-Nodes werden **innerhalb eines KI-Nodes** im Edit-Panel hinzugefügt. Sie erscheinen als kleine verschiebbare Karten (140×40px) unterhalb des Parent-Nodes, verbunden mit gestrichelten Linien. Ähnlich wie bei n8n.

| Node | Icon | Description |
|------|------|-------------|
| **Tool (Sub-Node)** | Wrench | Gibt dem KI-Agent Zugriff auf externe Tools und Funktionen. Beispiel: Websuche, Taschenrechner, API-Aufrufe. |
| **Gedächtnis (Sub-Node)** | Database | Langzeit-Erinnerung für den KI-Agent. Speichert Kontext über mehrere Ausführungen hinweg. |
| **Wissensbasis (Sub-Node)** | BookOpen | Dokumente und Wissen, das der Agent durchsuchen kann (RAG). Für firmenspezifische Informationen. |
| **Ausgabe-Format (Sub-Node)** | FileOutput | Definiert das erwartete Ausgabe-Format des Agents — z.B. JSON, Tabelle, Checkliste, Fließtext. |

---

## 4. Logik & Entscheidungen

Logik-Nodes steuern den **Ablauf** des Workflows — welcher Pfad genommen wird, ob gewartet wird, wie Fehler behandelt werden.

| Node | Icon | Description |
|------|------|-------------|
| **Wenn / Dann** | GitBranch | Verschiedene Pfade je nach Bedingung. Beispiel: Wenn Lead-Score > 80 → Sales-Team, sonst → Nurturing. |
| **Filter** | Filter | Nur bestimmte Einträge durchlassen. Beispiel: Nur Leads aus Deutschland weiterverarbeiten. |
| **Aufteilen** | Split | Daten in mehrere parallele Pfade aufteilen. Jeder Pfad verarbeitet die gleichen Daten unterschiedlich. |
| **Verteiler / Switch** | Shuffle | Daten an verschiedene Ziele verteilen, basierend auf Wert. Wie ein Weichensteller mit mehreren Ausgängen. |
| **Zusammenführen** | GitMerge | Mehrere parallele Pfade wieder in einen einzigen Pfad vereinen. Wartet bis alle Pfade fertig sind. |
| **Wiederholen** | Repeat | Aktion für jeden einzelnen Eintrag in einer Liste wiederholen. Beispiel: Für jeden Lead eine E-Mail senden. |
| **Warten / Delay** | Clock | Workflow für eine einstellbare Dauer pausieren. Essentiell für Drip-Campaigns und zeitgesteuerte Abläufe. |
| **Timer** | Timer | Aktion zu einem bestimmten Zeitpunkt ausführen. Unterschied zu Delay: absolute Zeit statt relative Wartezeit. |
| **A/B-Test** | Scale | Zufällige Aufteilung zum Testen von Varianten. Für das Vergleichen verschiedener Ansätze. |
| **Fehlerbehandlung** | ShieldAlert | Fehler abfangen und eine Alternative ausführen. Verhindert dass der ganze Workflow bei einem Fehler stoppt. |

---

## 5. Daten & Verarbeitung

Daten-Nodes verbinden externe Datenquellen, CRM-Systeme und ermöglichen Datenmanipulation.

| Node | Icon | Description |
|------|------|-------------|
| **Google Sheets** | Google Sheets | Tabellen lesen, schreiben und aktualisieren. Daten als Input verwenden oder Ergebnisse speichern. |
| **Datenbank (Airtable)** | Airtable | Einträge in einer Datenbank speichern, abfragen und aktualisieren. Strukturierte Datenverwaltung. |
| **CRM (HubSpot)** | HubSpot | Kontakte, Deals und Aktivitäten in HubSpot verwalten. Leads anlegen, Deals bewegen, Notizen hinzufügen. |
| **Salesforce** | Salesforce | Enterprise-CRM Anbindung. Für Unternehmen die Salesforce als primäres CRM nutzen. |
| **Pipedrive** | Pipedrive | Deals und Pipeline in Pipedrive verwalten. Für vertriebsorientierte Teams. |
| **Variable setzen** | Bookmark | Werte zwischenspeichern für spätere Schritte im Workflow. Beispiel: Kundennamen für spätere E-Mail merken. |
| **Duplikat-Check** | CopyCheck | Prüfen ob ein Eintrag schon existiert bevor er angelegt wird. Verhindert doppelte Kontakte oder Einträge. |
| **Sammler / Bündeln** | Package | Mehrere einzelne Einträge sammeln und als Gruppe weiterverarbeiten. Beispiel: 10 Leads sammeln → Tages-Report. |
| **Text-Template** | Type | Texte mit Platzhaltern personalisieren. Beispiel: "Hallo {name}, Ihr Meeting ist am {datum}." |
| **Daten umwandeln** | FileJson | Daten von einem Format in ein anderes umwandeln. JSON zu CSV, Datumsformate anpassen, Felder umbenennen. |
| **Suche / Lookup** | FileSearch | In Datenquellen nach bestimmten Einträgen suchen. Beispiel: Kundendaten anhand der E-Mail finden. |
| **Freigabe / Genehmigung** | ShieldCheck | Workflow pausieren bis eine manuelle Freigabe erfolgt. Für Inhalte die vor Veröffentlichung geprüft werden müssen. |
| **Code / Script** | Code | Eigene Logik als JavaScript oder Python Code ausführen. Für komplexe Berechnungen oder benutzerdefinierte Logik. |
| **API-Anfrage** | Globe | Daten von einer externen API abrufen oder an eine API senden. Für Integrationen ohne eigenen Node. |

---

## 6. Kommunikation

Kommunikations-Nodes senden Nachrichten über verschiedene Kanäle.

| Node | Icon | Description |
|------|------|-------------|
| **E-Mail senden** | Gmail | Personalisierte E-Mails versenden. Mit Templates, Anhängen und Scheduling. Der häufigste Output-Node. |
| **Slack-Nachricht** | Slack | Nachricht an einen Slack-Kanal oder Benutzer senden. Für Team-Benachrichtigungen und Updates. |
| **WhatsApp-Nachricht** | WhatsApp | Nachricht per WhatsApp Business API senden. Für direkte Kundenkommunikation. |
| **Benachrichtigung** | Bell | Push- oder In-App-Benachrichtigung senden. Für interne Alerts und Statusmeldungen. |
| **SMS senden** | Smartphone | SMS-Nachricht versenden. Für dringende Benachrichtigungen und zeitkritische Kommunikation. |
| **Teams-Nachricht** | MS Teams | Nachricht an Microsoft Teams Kanal senden. Für Unternehmen die Teams nutzen. |
| **Telegram-Nachricht** | Telegram | Nachricht per Telegram Bot senden. Für automatisierte Bot-Kommunikation. |
| **Newsletter / Mailchimp** | Mailchimp | E-Mail-Listen verwalten, Kontakte hinzufügen/entfernen, Newsletter-Kampagnen triggern. |

---

## 7. Inhalte & Dokumente

Content-Nodes erstellen, speichern und veröffentlichen Dokumente und Medien.

| Node | Icon | Description |
|------|------|-------------|
| **Google Docs** | Google Docs | Dokumente erstellen, bearbeiten und mit generiertem Inhalt füllen. Für Reports, Angebote, Briefings. |
| **Google Drive** | Google Drive | Dateien speichern, in Ordner organisieren und teilen. Zentraler Speicherort für Workflow-Outputs. |
| **Notion** | Notion | Seiten und Datenbanken in Notion verwalten. Content-Kalender, Wissensdatenbanken, Projektboards. |
| **WordPress / Website** | WordPress | Blog-Posts und Seiten auf WordPress veröffentlichen. Für Content-Marketing und SEO. |
| **PDF erstellen** | FileType | Reports, Angebote, Rechnungen oder Präsentationen als PDF generieren. Professionelle Dokumente. |
| **Bild erstellen** | ImagePlus | Social Media Grafiken, Banner oder Thumbnails generieren. Mit KI oder Templates. |
| **Video** | Video | Video-Content verarbeiten, konvertieren oder Metadaten extrahieren. Für Video-Marketing-Workflows. |

---

## 8. Social Media & Ads

Social-Nodes veröffentlichen Inhalte auf sozialen Plattformen und verwalten Werbekampagnen.

| Node | Icon | Description |
|------|------|-------------|
| **Meta (Facebook)** | Meta | Posts auf Facebook planen, erstellen und veröffentlichen. Für organisches Social Media Marketing. |
| **Instagram** | Instagram | Posts, Stories und Reels auf Instagram veröffentlichen. Bilder und Videos teilen. |
| **LinkedIn** | LinkedIn | Beiträge, Artikel und Carousel-Posts auf LinkedIn veröffentlichen. Für B2B-Marketing. |
| **TikTok** | TikTok | Videos auf TikTok veröffentlichen. Für kurze, virale Marketing-Inhalte. |
| **YouTube** | YouTube | Videos hochladen, Metadaten setzen und Playlists verwalten. Für Video-Content-Marketing. |
| **Google Ads** | Google Ads | Kampagnen erstellen, Budgets anpassen, Anzeigen verwalten. Performance-Marketing automatisieren. |

---

## 9. Analytics & Zahlungen

Analytics-Nodes überwachen Performance und verwalten Zahlungsprozesse.

| Node | Icon | Description |
|------|------|-------------|
| **Analytics / Dashboard** | Google Analytics | Website-Daten und Metriken auswerten. Traffic, Conversions, Bounce-Rate etc. in Workflows nutzen. |
| **Stripe / Zahlungen** | Stripe | Zahlungen, Abonnements und Rechnungen über Stripe verwalten. Für E-Commerce und SaaS. |
| **Monitoring** | Gauge | Workflow-Leistung überwachen. Ausführungszeiten, Erfolgsraten und Fehler tracken. |

---

## Tools Tab

Zusätzlich zur Nodes-Palette gibt es den **Tools-Tab** mit direktem Zugriff auf alle integrierten Plattformen, organisiert nach Kategorie:

| Kategorie | Tools |
|-----------|-------|
| **Google** | Google Drive, Gmail, Google Sheets, Google Docs, Google Calendar |
| **Communication** | Slack, WhatsApp, Telegram, Microsoft Teams |
| **CRM** | HubSpot, Salesforce, Pipedrive |
| **AI** | OpenAI, Claude |
| **Automation** | Make, n8n, Zapier |
| **Productivity** | Notion, Airtable |
| **Social** | LinkedIn, Meta, Instagram, TikTok, YouTube |
| **CMS** | WordPress |
| **Forms** | Typeform |
| **Booking** | Calendly |
| **Payment** | Stripe |
| **Ads** | Google Ads |
| **Analytics** | Google Analytics |
| **Email** | Mailchimp |
| **Dev** | GitHub, Jira |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-02-15 | Initial version — 73 nodes across 9 categories |
| 2026-02-15 | Sub-nodes moved from palette to in-node edit panel (69 palette + 4 sub-nodes) |
| 2026-02-15 | Updated descriptions to be more generic (Delay, A/B-Test). Sub-nodes redesigned as draggable cards. |
