# UI Feature Blueprint — Vollständiger Funktionsplan

> Ziel: Jedes einzelne Element muss wie in einer echten App funktionieren.
> Basiert auf: Komplett-Audit des bestehenden Codes.

---

## ENTSCHEIDUNGEN / KONFIGURATION

> Alle bisher getroffenen Design- und Verhaltens-Entscheidungen.

### Canvas-Modi
- **Bearbeitungsmodus**: Standard. Alles editierbar.
- **Präsentationsmodus**: Vollbild. Standardmäßig read-only. Toggle-Switch oben links zum Aktivieren von Bearbeitung.
- **Live-Modus**: ENTFERNT. Wird nicht mehr benötigt.

### Node-Verhalten
- Edit-Panel schließt automatisch bei Klick auf leere Canvas-Fläche ✅
- Löschen: Direkt ohne Bestätigungs-Dialog. Rückgängig mit Ctrl+Z ✅
- Duplizieren: Kopie wird selektiert (nicht das Original) ✅
- Edit-Panel: Schwebt unter/über dem Node (nicht als Modal)
- Keine individuelle Node-Farbe (erstmal nicht)
- Node hat bereits Label + Beschreibung (kein extra Notiz-Feld nötig)

### Verbindungen
- Farb-Theme wird über Canvas-Settings gesteuert ✅
- Connection Labels: Ja, optional. Text an Verbindungslinien (z.B. "wenn Ja"/"wenn Nein"). Muss extra eingestellt werden.
- Selektierte Verbindung: Bleibt wie aktuell

### Gruppen (Phasen)
- Nur visuelle Rahmen, KEINE Zuordnung von Nodes (#9: Nein)
- Verschieben bewegt NICHT die enthaltenen Nodes (#10: Nein)
- Farben: 8 Standard-Farben + zusätzlicher Color-Picker für eigene Farben
- Gruppen können optional eine Beschreibung haben
- Keine Transparenz-Einstellung (verschiedene Stile reichen)

### Sticky Notes
- Werden UNTER den Nodes gerendert
- Sichtbar im Präsentationsmodus
- Können mit Nodes verbunden werden (Linie von Sticky zu Node) — geplant

### Palette (Node-Auswahl)
- Toggle-Sidebar links (bleibt wie es ist)
- Suchfeld zum Filtern ✅
- Drag & Drop UND Klick zum Hinzufügen
- Keine Favoriten/Zuletzt verwendet (zu wenige Nodes)

### Canvas-Einstellungen
- Settings werden PRO SYSTEM gespeichert (nicht global)
- Kein "Settings zurücksetzen" Button nötig
- Connection Presets: Eigene Presets speicherbar (geplant)

### Keyboard Shortcuts
- Ctrl+C / Ctrl+V: Copy/Paste ✅
- Ctrl+A: Alle Nodes selektieren ✅
- Ctrl+S: Speichern ✅
- Ctrl+Z: Undo ✅
- Ctrl+Y / Ctrl+Shift+Z: Redo ✅
- Delete/Backspace: Direkt löschen (mit Undo) ✅
- Space + Drag: Pan ✅
- Escape: Deselektieren, Panels schließen ✅

### Multi-Select
- Shift+Klick: Toggle-Auswahl ✅
- Rubber-Band: Linksklick + Ziehen auf leerer Fläche ✅
- Ctrl+A: Alle auswählen ✅

### Rechtsklick Context-Menu
- Auf Node: Bearbeiten, Duplizieren, Löschen ✅
- Auf Verbindung: Node einfügen, Löschen ✅
- Auf Gruppe: Bearbeiten, Löschen ✅
- Auf Sticky: Bearbeiten, Löschen ✅
- Auf leere Fläche: Node hinzufügen (nach Typ), Gruppe, Sticky Note, Palette öffnen ✅

### Toolbar
- Position: Oben (bleibt)
- System-Name editierbar in Toolbar
- Export: PNG + PDF (+ SVG optional)

### Speichern & Laden
- Manuelles Speichern (kein Auto-Save)
- "Änderungen verwerfen" Button: Ja (geplant)
- Versions-Historie: Ja (geplant)

### Dashboard-Übersicht
- System-Karten: Grid UND Liste darstellbar (geplant)
- Sortierung: Ja (geplant)
- Keine Quick-Actions auf Karten
- Kein Aktivitäts-Widget
- KPI-Karten: Klickbar (geplant)

### Content Dashboard
- Drag & Drop zwischen Status-Spalten: Zu klären
- Kalender Drag & Drop: Zu klären
- Mindmap: Bleibt statisch (nur Expand/Collapse)
- Performance: Echte Daten geplant (über API)
- Task-Dependencies: Nur Badge "Blockiert" (keine Pfeile in Plan-Ansicht)

### Übergreifend
- Sidebar: Code-Entscheidung (eine vs. mehrere) — bringt keine Design-Änderung
- ConfirmDialog: Code-Entscheidung — bringt keine Design-Änderung

### Content Board / Pipeline
- Drag & Drop zwischen Status-Spalten: Ja ✅ (geplant)
- Kanban-Ansicht: Nein, bleibt wie es ist (Listen-Ansicht mit Status-Badge)
- Standard-Checklisten pro Plattform: Ja (z.B. YouTube: "Thumbnail", "SEO-Tags", "Beschreibung")
- Archiv-Ansicht: Wenn sinnvoll, optional
- Content-Karten Drag & Drop im Kalender: Ja ✅ (geplant)

### Kalender
- Monats-Ansicht: Ja (zusätzlich zur Wochen-Ansicht) ✅ (geplant)
- Wiederkehrende Posts: Nein (erstmal nicht, zu komplex)

### Dateien / Ressourcen
- Datei-Upload: Beides (echte Uploads + URL-Referenzen)
- Tags: Bereits vorhanden
- Bild/PDF-Vorschau: Ja ✅ (geplant)

### Planung / Strategie
- AI Plan-Generierung: Ja, geplant (API noch nicht angebunden)
- Pläne duplizieren: Ja ✅ (geplant)
- Tasks zwischen Plänen verschieben: Nein (nicht sinnvoll genug)
- Gantt-Chart: Nein

### Performance
- Datenquelle: Beides (manuell + API geplant)
- Vergleichs-Diagramme: Ja ✅ (geplant)

### Templates & Research
- Templates aus Content erstellen: Ja ✅ (geplant)
- Research mit Content verknüpfbar: Ja ✅ (geplant)

### Content Detail-Modal
- Vollbild-Modus: Ja ✅ (geplant)
- Rich-Text-Editor: Ja — Bold, Italic, Listen, Überschriften. Toolbar mit klickbaren Buttons (kein Markdown-Syntax). Für alle Textfelder (Beschreibung, Notizen, Konzept).
- Wort-/Zeichenzähler: Nein (weggelassen)
- Kommentare/Feedback: Nicht beantwortet

### System-Detail (Automation)
- Erweiterte Output-Typen (JSON, Tabellen, Bilder): Ja, wenn Platz
- Ausführungs-Log (Timeline): Ja ✅ (geplant)
- Ressourcen im Canvas (Sidebar rechts): Optional, zu klären

### Template-Picker
- Kategorien-Tags: Bereits vorhanden
- Vorschau: Bleibt wie es ist (Live-Canvas)
- Bewertung/Rating: Nein

### Übergreifend (Priorisierung)
- Globale Suche: Nein
- Notifications: Erstmal nicht
- Onboarding-Tour: Nein
- User-Rollen: Langfristig ja, aktuell nein

### UI-Details
- Leere Zustände: Icon + Text + Action-Button (bleibt wie es ist)
- Ladeanimationen: Ja (Spinner/Skeleton beim Speichern, Laden, Ausführen)
- "Zuletzt bearbeitet" auf Karten: Nicht entschieden

### Sidebar
- Footer: Bleibt wie es ist (Systemanzahl, Aktive, Runs)
- Quick-Add Button: Ja — "+" in der Sidebar zum schnellen Erstellen

### Mobile Responsiveness — KERN-ANFORDERUNG
- **ALLES muss auf dem Handy funktionieren und bedienbar sein**
- Nicht nur "gut aussehen", sondern wirklich benutzbar
- Dashboards müssen auf Mobile zeigbar sein (z.B. für Präsentationen)
- Canvas/Workflow-Editor: Touch-optimiert (Pinch-to-Zoom, Touch-Drag)
- Content-Board: Swipe zwischen Status-Spalten
- Sidebar: Mobile Overlay mit Hamburger-Menu
- Bottom-Navigation auf Mobile (wie bei Apps)
- Formulare und Modals: Vollbild auf Mobile
- Tabellen: Horizontal scrollbar oder Card-Layout auf Mobile

### Workflow Canvas — Letzte Details
- Raster (Hintergrund-Punkte): Bleibt immer sichtbar, kein Toggle
- Zoom-Stufe pro System gespeichert: Ja
- Node-Tooltip bei Hover: Ja (zeigt vollständige Beschreibung)
- Animations-Effekte bei Add/Delete: Nein (nicht nötig)
- Ressourcen-Sidebar rechts im Canvas: Ja, optional einblendbar

### Content — Letzte Details
- Preview wie echtes Social-Media-Post: Ja (Instagram-Rahmen, YouTube-Player-Look)
- Automatischer Content-Score: Nein
- Farbliche Status-Indikatoren (überfällig etc.): Nein, bleibt wie es ist

### i18n (Internationalisierung) — KERN-ANFORDERUNG
- **JEDES einzelne UI-Element** muss in DE und EN verfügbar sein
- Buttons, Labels, Platzhalter, Tooltips
- Toast-Nachrichten und Dialog-Texte
- Default-Checklisten (DE + EN Versionen)
- Palette-Items, Node-Typen, Status-Labels
- Beschreibungen, Fehlermeldungen, leere Zustände
- Keine hardcodierten deutschen/englischen Strings
- Alles über das Translation-System (`useLanguage()` → `{ lang, tx }`)
- Switch zwischen DE/EN muss sofort alle Texte ändern

---

## TEIL 1: AUTOMATION DASHBOARD (`/system`)

### 1.1 Dashboard-Übersicht (System-Liste)

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 1 | KPI-Karten (3x) | Gesamtsysteme, Aktive Systeme, Gesamte Ausführungen — Werte müssen live aktualisieren | [ ] |
| 2 | Suchfeld | Durchsucht Name, Beschreibung, Kategorie (case-insensitive). X-Button zum Leeren | [ ] |
| 3 | Status-Filter | 3 Tabs: Alle / Aktiv / Entwurf — Mutually exclusive, visuelles Feedback | [ ] |
| 4 | Gefilterte Anzahl | "X / Y" wird angezeigt wenn Filter aktiv sind | [ ] |
| 5 | System-Karten | Klick → öffnet System-Detail. Zeigt: Icon, Status-Badge, Kategorie, Name, Beschreibung (2 Zeilen), Ausführungen, Letztes Datum | [ ] |
| 6 | Hover auf Karte | "System öffnen →" Text erscheint | [ ] |
| 7 | Leerer Zustand | Wenn keine Systeme: Such-Icon, Nachricht, "Filter zurücksetzen" Button | [ ] |
| 8 | Template-Button | Header-Button → navigiert zu Template-Picker | [ ] |

### 1.2 System-Detail-Ansicht

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 9 | Header-Karte | Icon (Gradient-BG), Name, Status-Badge, Beschreibung, Kategorie-Badge, Letztes Datum | [ ] |
| 10 | Status-Toggle | Klick auf Badge wechselt aktiv↔Entwurf. Persists in localStorage. Toast-Nachricht | [ ] |
| 11 | Löschen-Button | Nur für User-Systeme + Demo-Systeme. Rot. Öffnet Bestätigungs-Dialog | [ ] |
| 12 | Löschen bestätigen (User) | Dialog: "System löschen?" → Löscht dauerhaft, navigiert zurück, Toast | [ ] |
| 13 | Löschen bestätigen (Demo) | Dialog: "Demo ausblenden?" → Blendet aus, navigiert zurück, Toast | [ ] |
| 14 | Stats-Grid (3x) | Ausführungen, Schritte/Nodes, Verbindungen — korrekte Zahlen | [ ] |
| 15 | Tab: Workflow | Zeigt Canvas-Editor + Dokumente/Outputs | [ ] |
| 16 | Tab: Ressourcen | Zeigt Ressourcen-Panel | [ ] |
| 17 | Canvas-Modus Toggle | Edit / Live — Umschalten zwischen Editor und Vollbild-Live-Modus | [ ] |
| 18 | Canvas-Höhe Resizer | Drag-Handle unten am Canvas. Min 300px, Max 1200px | [ ] |
| 19 | Live-Modus | Vollbild-Overlay. System-Name + "Live" Badge. Exit-Button + ESC zum Schließen | [ ] |
| 20 | Dokumente-Sektion | Zeigt system.outputs in OutputTable | [ ] |
| 21 | Verarbeitungsergebnisse | Zeigt Execution-Artefakte oder leeren Zustand | [ ] |

### 1.3 Template-Picker

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 22 | Such-Feld | Durchsucht Template-Name + Beschreibung | [ ] |
| 23 | Kategorie-Filter | "Alle" + dynamische Kategorien aus Templates | [ ] |
| 24 | "Neues Template erstellen" | Button → öffnet Create-Modal | [ ] |
| 25 | Create-Modal Felder | Name (required), Beschreibung, Kategorie (5 Buttons), Icon-Picker (16 Icons) | [ ] |
| 26 | Create-Modal validierung | Button disabled wenn Name leer | [ ] |
| 27 | Create-Modal absenden | Erstellt Template, navigiert zu Editor | [ ] |
| 28 | User-Templates Sektion | "MEINE TEMPLATES" Header, lila-Rand-Karten, "User" Badge | [ ] |
| 29 | Built-in Templates | Standard-Karten mit Kategorie-Badge | [ ] |
| 30 | Template-Karte Klick | Öffnet Template-Vorschau | [ ] |
| 31 | Template-Karte Hover | "Ansehen" Text + ggf. Löschen-Button (nur User) erscheint | [ ] |
| 32 | Template-Vorschau | Zurück-Button, Name, Kategorie, Delete (nur User), "Duplizieren" Button | [ ] |
| 33 | Template duplizieren | Erstellt neues System aus Template, navigiert dorthin | [ ] |
| 34 | Template löschen | Bestätigungs-Dialog, löscht nur User-Templates | [ ] |
| 35 | Template-Vorschau Canvas | Read-only Canvas mit 400px Höhe zeigt Workflow | [ ] |
| 36 | Leerer Zustand | Wenn keine Templates: "Filter zurücksetzen" Button | [ ] |

### 1.4 Ressourcen-Panel

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 37 | Ressourcen-Anzahl | Header zeigt Gesamtanzahl | [ ] |
| 38 | "Hinzufügen" Button | Öffnet Add/Edit-Modal | [ ] |
| 39 | Suchfeld | Durchsucht Titel + Inhalt | [ ] |
| 40 | Sortierung | 2 Tabs: Datum (Standard, absteigend) / Name (alphabetisch) | [ ] |
| 41 | Typ-Filter | "Alle" + ein Tab pro Typ (Transkript, Dokument, Notiz, Dataset, Formular, Seite) | [ ] |
| 42 | Typ-Filter Counts | Zeigt Anzahl pro Typ | [ ] |
| 43 | Ressourcen-Karten | Typ-Icon, Titel, Typ-Badge, Quelle-Badge, Datum | [ ] |
| 44 | Kopieren-Button | Kopiert Inhalt in Zwischenablage, Toast | [ ] |
| 45 | Bearbeiten-Button | Öffnet Modal mit vorausgefüllten Daten | [ ] |
| 46 | Erweitern-Button | Zeigt/versteckt Inhalt-Vorschau (monospace, scrollbar) | [ ] |
| 47 | Löschen-Button | Bestätigungs-Dialog | [ ] |
| 48 | Add/Edit-Modal | Felder: Titel (required), Typ (6 Tabs), Inhalt (required, textarea), Datei-Referenz (optional URL) | [ ] |
| 49 | Modal-Validierung | Save deaktiviert wenn Titel oder Inhalt leer | [ ] |
| 50 | Modal schließen | Backdrop-Klick, ESC, Cancel-Button — alle schließen ohne Speichern | [ ] |
| 51 | Leerer Zustand | Verschiedene Messages für "leer" vs "Suche ohne Ergebnisse" | [ ] |

### 1.5 Output-Tabelle

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 52 | Typ-Filter-Tabs | "Alle" + typ-spezifische Tabs mit Counts. Nur sichtbar bei 2+ Typen | [ ] |
| 53 | Output-Zeilen | Icon, Name, Typ, Datum/Uhrzeit | [ ] |
| 54 | Text-Outputs erweitern | Toggle-Button zeigt/versteckt Inhalt | [ ] |
| 55 | Text bearbeiten | Bei erweitertem Text: Hover → Edit-Button → Inline-Textarea | [ ] |
| 56 | Speichern bestätigung | Grüner Haken erscheint kurz nach Speichern | [ ] |
| 57 | Datei-Outputs | "Öffnen" Link → target="_blank" | [ ] |
| 58 | Leerer Zustand | Ordner-Icon, Nachricht, Hinweis-Text | [ ] |

### 1.6 Settings

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 59 | Auto-Execute Toggle | An/Aus, persists in localStorage, Toast | [ ] |
| 60 | Notifications Toggle | An/Aus, persists in localStorage, Toast | [ ] |
| 61 | Webhook-Logs Toggle | An/Aus, persists in localStorage, Toast | [ ] |
| 62 | Compact-View Toggle | An/Aus, persists in localStorage, Toast | [ ] |
| 63 | System-Stats (4x) | Gesamt, Aktiv, Entwurf, Ausführungen — korrekte Zahlen | [ ] |
| 64 | Danger Zone | "Einstellungen zurücksetzen" Button → Reset auf Defaults, Info-Toast | [ ] |

### 1.7 Sidebar

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 65 | Logo + Theme-Toggle | Sun/Moon Icons, wechselt Dark/Light | [ ] |
| 66 | Collapse-Button | Desktop: Sidebar ein-/ausklappen. Animation | [ ] |
| 67 | Dashboard-Nav | Klick → Dashboard-Übersicht | [ ] |
| 68 | System-Liste | Alle Systeme mit Icon, Name (truncated), Status-Punkt (grün/grau) | [ ] |
| 69 | System-Klick | Navigiert zu System-Detail | [ ] |
| 70 | Active-State | Aktueller Bereich hervorgehoben | [ ] |
| 71 | Templates-Nav | Klick → Template-Picker | [ ] |
| 72 | Builder-Nav | Klick → Leerer Canvas | [ ] |
| 73 | Visualizer-Nav | Klick → Funnel-Visualizer | [ ] |
| 74 | Settings-Nav | Klick → Einstellungen | [ ] |
| 75 | Footer-Karte | System-Anzahl, Aktive + Runs, Status-Punkte pro System | [ ] |
| 76 | Mobile: Overlay | Menu-Button öffnet Sidebar, Klick außerhalb schließt | [ ] |
| 77 | Mobile: ESC | Schließt Sidebar | [ ] |

### 1.8 Header

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 78 | Dynamischer Titel | Ändert sich je nach aktuellem Bereich | [ ] |
| 79 | Dynamischer Untertitel | Ändert sich je nach aktuellem Bereich | [ ] |
| 80 | Sprach-Toggle | DE / EN — Wechselt alle UI-Texte | [ ] |
| 81 | Mobile Menu-Button | Öffnet Sidebar-Overlay | [ ] |
| 82 | Sidebar-Expand Button | Sichtbar wenn Sidebar collapsed | [ ] |

---

## TEIL 2: WORKFLOW-CANVAS (Editor)

### 2.1 Node-Interaktionen

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 83 | Node Klick | Selektiert Node. Deselektiert andere Nodes/Connections/Groups | [ ] |
| 84 | Node Shift+Klick | Multi-Select Toggle (Hinzufügen/Entfernen) | [ ] |
| 85 | Node Doppelklick | Öffnet Edit-Panel unterhalb des Nodes | [ ] |
| 86 | Node Drag | Smooth. Snap-Guides wenn aktiviert. Offset-Tracking | [ ] |
| 87 | Node Snap (Kanten) | Snappt an linke/rechte/obere/untere Kante anderer Nodes | [ ] |
| 88 | Node Snap (Center) | Snappt an horizontale/vertikale Mitte anderer Nodes | [ ] |
| 89 | Node Snap (Equal Spacing) | Erkennt und zeigt gleiche Abstände zwischen Nodes | [ ] |
| 90 | Node Snap (zu Gruppen) | Snappt auch an Gruppen-Zentren | [ ] |
| 91 | Node Delete | Delete/Backspace → Bestätigungs-Dialog. Löscht Node + alle Verbindungen | [ ] |
| 92 | Node Duplicate | Context-Menu oder Toolbar → Kopie +30px versetzt | [ ] |
| 93 | Multi-Select Duplicate | Dupliziert alle selektierten Nodes + interne Verbindungen | [ ] |
| 94 | Multi-Select Delete | Bestätigung: "X Elemente und ihre Verbindungen löschen?" | [ ] |
| 95 | Node Hover | Ports werden sichtbar (4 Richtungen) | [ ] |
| 96 | Node Context-Menu | Rechtsklick → Bearbeiten, Duplizieren, Löschen (rot) | [ ] |

### 2.2 Verbindungen

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 97 | Verbindung erstellen | Port klicken → Linie folgt Maus → Ziel-Port klicken | [ ] |
| 98 | Verbindung selektieren | Klick auf Linie → Hervorgehoben | [ ] |
| 99 | Verbindung löschen | Delete/Backspace oder Context-Menu → Bestätigung | [ ] |
| 100 | Verbindung Context-Menu | Rechtsklick → "Node einfügen", "Löschen" | [ ] |
| 101 | Node auf Verbindung einfügen | Popup mit Palette-Items. Node wird am Mittelpunkt eingefügt, Verbindung gesplittet | [ ] |
| 102 | Zyklus-Erkennung | Verhindert zirkuläre Verbindungen, zeigt Toast | [ ] |
| 103 | Selbst-Verbindung | Verhindert: Klick auf eigenen Port bricht ab | [ ] |
| 104 | Doppelte Verbindung | Verhindert: Toast "Verbindung existiert bereits" | [ ] |
| 105 | Temp-Linie beim Ziehen | Animierte gestrichelte Linie folgt dem Cursor | [ ] |
| 106 | Hover auf Verbindung | Plus-Icon am Mittelpunkt zum Einfügen | [ ] |

### 2.3 Ports

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 107 | Port-Sichtbarkeit | Nur bei Hover über Node oder im Verbindungsmodus | [ ] |
| 108 | Alle 4 Richtungen | Top, Right, Bottom, Left — alle funktionieren | [ ] |
| 109 | Visuelles Feedback | Port-Highlight beim Überfahren während Verbindungsmodus | [ ] |
| 110 | Port als Source und Target | Jeder Port kann Quelle oder Ziel sein | [ ] |

### 2.4 Canvas-Interaktionen

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 111 | Pan (Drag leere Fläche) | Linksklick + Ziehen auf leerer Canvas-Fläche | [ ] |
| 112 | Pan (Space + Drag) | Space gedrückt halten → Pan-Modus | [ ] |
| 113 | Pan Schwelle | 4px Threshold bevor Pan startet (verhindert versehentliches Pan) | [ ] |
| 114 | Zoom (Scrollrad) | Smooth Zoom. Geschwindigkeit einstellbar (1-5x) | [ ] |
| 115 | Zoom Bereich | Min 10%, Max 500% | [ ] |
| 116 | Zoom-Buttons (Toolbar) | -, %, + Buttons | [ ] |
| 117 | Zoom zurücksetzen | Klick auf % → setzt auf 100%, Pan auf (40,40) | [ ] |
| 118 | Fit to Content | Button → Auto-Zoom + Pan um alles zu zeigen (40px Padding) | [ ] |
| 119 | Scroll-Geschwindigkeit Slider | 1-5x Multiplikator für Mausrad-Geschwindigkeit | [ ] |

### 2.5 Gruppen (Phasen)

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 120 | Gruppe erstellen | Palette → "Gruppen" Tab → Farbe wählen → Gruppe am Canvas-Zentrum | [ ] |
| 121 | Gruppe ziehen | Header anklicken + ziehen. Smooth, mit Snap-Guides | [ ] |
| 122 | Gruppe Größe ändern | Drag unten-rechts. Min/Max Limits | [ ] |
| 123 | Gruppe löschen | Delete/Backspace oder Context-Menu → Bestätigung. "Nodes bleiben" | [ ] |
| 124 | Gruppe Label bearbeiten | Doppelklick → Edit-Panel mit Textfeld (max 40 Zeichen) | [ ] |
| 125 | Gruppe Context-Menu | Rechtsklick → Bearbeiten, Löschen | [ ] |
| 126 | Phasen-Navigation | Im Vollbild: Navigator zeigt aktuelle Phase (1/N) | [ ] |
| 127 | Phasen Auto-Zoom | Setting: Auto-Zoom auf aktuelle Phase | [ ] |
| 128 | Phasen-Animation | Setting: Smooth vs. Instant Übergänge (200-1500ms) | [ ] |

### 2.6 Sticky Notes

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 129 | Sticky erstellen | Palette → "Gruppen" Tab → Farbe wählen → Sticky am Canvas-Zentrum | [ ] |
| 130 | Sticky bearbeiten | Doppelklick → Edit-Overlay mit: Farbwahl, Bold/Italic, Schriftgröße, Textfarbe, Textarea | [ ] |
| 131 | Sticky ziehen | Klick + Ziehen. Smooth, mit Snap-Guides | [ ] |
| 132 | Sticky Größe ändern | Drag unten-rechts. Min 100x60, Max 800x600 | [ ] |
| 133 | Sticky Farbe ändern | Edit-Overlay → 8 Farb-Buttons | [ ] |
| 134 | Sticky formatieren | Bold, Italic, Schriftgröße (10-24px), Textfarbe (6 Presets) | [ ] |
| 135 | Sticky löschen | Delete/Backspace oder Context-Menu → Bestätigung | [ ] |
| 136 | Sticky Max-Zeichen | 500 Zeichen Limit | [ ] |

### 2.7 Node-Edit-Panel

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 137 | Label-Feld | Text-Input, max 40 Zeichen, Auto-Focus | [ ] |
| 138 | Beschreibung | Text-Input, max 120 Zeichen, optional | [ ] |
| 139 | Icon-Picker | Button → Dropdown mit allen Lucide-Icons + Tool-Logos | [ ] |
| 140 | Icon auswählen | Klick auf Icon → sofort übernommen, Ring-Highlight | [ ] |
| 141 | Ressource verlinken | Dropdown: Form, Page, Transcript, Document, Note, Dataset | [ ] |
| 142 | Linked Page | Dropdown: /onboarding, /kostenlose-beratung, /dashboard, /systems, none | [ ] |
| 143 | Speichern | Button → Updates Node, schließt Panel, History-Push | [ ] |
| 144 | Abbrechen | Button → schließt Panel, Änderungen verworfen | [ ] |
| 145 | Panel-Position | Unter Node (oder über Node wenn kein Platz unten) | [ ] |

### 2.8 Toolbar-Buttons

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 146 | Palette Toggle | Plus-Icon → Öffnet/schließt linke Sidebar | [ ] |
| 147 | System-Name Input | Editierbares Textfeld, max 40 Zeichen | [ ] |
| 148 | Undo | Macht letzte Aktion rückgängig. Disabled wenn keine History | [ ] |
| 149 | Redo | Stellt letzte rückgängig gemachte Aktion wieder her | [ ] |
| 150 | Snap Toggle | Aktiviert/deaktiviert Snap-to-Grid. Visuelles Feedback | [ ] |
| 151 | Auto-Layout | Ordnet alle Nodes automatisch in Ebenen (BFS) | [ ] |
| 152 | Export PNG | Exportiert Canvas als PNG. Disabled wenn keine Nodes | [ ] |
| 153 | Suche (Ctrl+F) | Öffnet Such-Panel, durchsucht Node-Labels | [ ] |
| 154 | Zoom Out (-) | Multipliziert Zoom × 0.8 (Min 0.1) | [ ] |
| 155 | Zoom Display (%) | Zeigt aktuelle Zoom-Stufe. Klick → Reset auf 100% | [ ] |
| 156 | Zoom In (+) | Multipliziert Zoom × 1.25 (Max 5.0) | [ ] |
| 157 | Fit to Screen | Auto-Zoom + Center auf alle Inhalte | [ ] |
| 158 | Settings | Öffnet Settings-Panel | [ ] |

### 2.9 Settings-Panel (Canvas)

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 159 | Phasen-Zoom | Auto / Manual Toggle | [ ] |
| 160 | Phasen-Animation | An/Aus Toggle | [ ] |
| 161 | Phasen-Geschwindigkeit | Slider 200-1500ms (nur wenn Animation an) | [ ] |
| 162 | Kurven-Stil | 3 Buttons: Bezier, Straight, Elbow — sofortiger Effekt | [ ] |
| 163 | Linien-Stil | 3 Buttons: Solid, Dashed, Dotted — sofortiger Effekt | [ ] |
| 164 | Pfeilspitze | 4 Buttons: None, Arrow, Diamond, Circle — sofortiger Effekt | [ ] |
| 165 | Farb-Theme | 8 Farb-Punkte: Purple, Neon, Ocean, Forest, Sunset, Rose, Gold, Cyber | [ ] |
| 166 | Linien-Stärke | 3 Buttons: Thin (1), Normal (2), Bold (3) | [ ] |
| 167 | Glow Toggle | An/Aus für Leuchteffekt auf Verbindungen | [ ] |
| 168 | Node Design Theme | 8 Buttons: Default, Glass, Minimal, Outlined, Neon, Gradient, Solid, Wire | [ ] |
| 169 | Node Layout | 4 Buttons: Standard, Centered, Compact, Icon-Focus | [ ] |
| 170 | Connection Presets | Vorkonfigurierte Kombinationen (Default, Neon-Glow, etc.) | [ ] |
| 171 | Alle Settings sofort | Jede Änderung hat sofort sichtbaren Effekt auf Canvas | [ ] |

### 2.10 Keyboard Shortcuts

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 172 | Space | Pan-Modus (gehalten) | [ ] |
| 173 | Scrollrad | Zoom In/Out | [ ] |
| 174 | Delete/Backspace | Löscht selektiertes Element (mit Bestätigung) | [ ] |
| 175 | Escape | Deselektiert, schließt Panels, Context-Menu, Präsentation | [ ] |
| 176 | Ctrl+Z | Undo (deaktiviert während Bearbeitung) | [ ] |
| 177 | Ctrl+Y / Ctrl+Shift+Z | Redo (deaktiviert während Bearbeitung) | [ ] |
| 178 | Ctrl+F | Such-Panel Toggle | [ ] |
| 179 | Ctrl+S | Speichern (Workflow) | [ ] |
| 180 | ? | Shortcuts-Hilfe anzeigen/verstecken | [ ] |
| 181 | Shift+Klick | Multi-Select Toggle | [ ] |

### 2.11 Speichern/Laden & Execute

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 182 | Speichern | Ctrl+S oder Button → Nodes, Connections, Groups, Stickies gespeichert | [ ] |
| 183 | Laden | System-Nodes, Connections, Groups, Stickies korrekt wiederhergestellt | [ ] |
| 184 | Fit on Load | Auto-Fit-to-Screen beim Laden wenn Nodes vorhanden | [ ] |
| 185 | Execute/Play | Startet Animation: Start-Nodes → BFS-Reihenfolge → Sequenzielles Highlighting | [ ] |
| 186 | Execute Timing | 600ms zwischen Ebenen, 800ms am Ende, 2500ms bis Clear | [ ] |
| 187 | PNG Export | SVG → Canvas API → PNG Download. Enthält alle Elemente. Filename: workflow-{name}.png | [ ] |
| 188 | Leerer Canvas | Empty-State Nachricht wenn keine Nodes vorhanden | [ ] |

---

## TEIL 3: CONTENT DASHBOARD (`/content`)

### 3.1 Content-Übersicht (Board/Pipeline)

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 189 | Content-Karten | Platform-Badge, Status-Badge, Titel, Konzept (2 Zeilen), Tags (max 3), relative Zeit | [ ] |
| 190 | Plattform-spezifisch | YouTube: Thumbnail. Instagram: Cover. FB/LinkedIn: Cover | [ ] |
| 191 | Gepinnte Inhalte | Stern-Indikator sichtbar | [ ] |
| 192 | Checklist-Fortschritt | done/total auf Karte sichtbar | [ ] |
| 193 | "+ Neue Idee" Button | Öffnet NewContentModal | [ ] |
| 194 | NewContentModal | Plattform-Auswahl (3 Buttons), Titel (required), Konzept (optional) | [ ] |
| 195 | Modal-Validierung | "Idee erstellen" deaktiviert wenn Titel leer | [ ] |
| 196 | Karte klicken | Öffnet ContentItemModal (Detail-Ansicht) | [ ] |
| 197 | Content löschen | Papierkorb-Icon im Modal → "Bist du sicher?" → "Ja, Löschen" / "Nein" | [ ] |
| 198 | Content duplizieren | Kopier-Icon im Modal → Kopie mit "(Copy)" Suffix, Toast | [ ] |

### 3.2 Suche/Filter/Sortierung

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 199 | Suchfeld | Durchsucht Titel, Konzept, Tags (case-insensitive). X zum Leeren | [ ] |
| 200 | Plattform-Filter | Dropdown: Alle / YouTube / Instagram / FB & LinkedIn. Counts | [ ] |
| 201 | Status-Filter | Dropdown: Alle + 6 Status-Optionen | [ ] |
| 202 | Prioritäts-Filter | Dropdown: Alle / Hoch / Mittel / Niedrig | [ ] |
| 203 | Sortierung | Dropdown: Datum, Priorität, Status, Titel, Score. + Auf/Ab Toggle | [ ] |
| 204 | Gefilterte Anzahl | Zeigt gefiltert vs. gesamt | [ ] |

### 3.3 Bulk-Modus

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 205 | Bulk Toggle | CheckSquare Icon aktiviert/deaktiviert Bulk-Modus | [ ] |
| 206 | Checkboxen | Erscheinen auf Karten wenn Bulk aktiv | [ ] |
| 207 | Alle auswählen/abwählen | Buttons in Bulk-Aktionsleiste | [ ] |
| 208 | Bulk Status ändern | Dropdown → ändert Status aller selektierten | [ ] |
| 209 | Bulk Priorität ändern | Dropdown → ändert Priorität aller selektierten | [ ] |
| 210 | Bulk Löschen | Papierkorb + Bestätigung → löscht alle selektierten | [ ] |

### 3.4 Content-Detail-Modal (ContentItemModal)

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 211 | Tab: Details | Hauptbearbeitung aller Felder | [ ] |
| 212 | Tab: Preview | Plattform-spezifische Vorschau-Darstellung | [ ] |
| 213 | Tab: Versionen | Versionierung mit Labels | [ ] |
| 214 | Tab: Thumbnails | Nur YouTube — Upload bis zu 3 Bilder (max 500KB) | [ ] |
| 215 | Titel-Feld | Text-Input | [ ] |
| 216 | Konzept/Idee | Textarea | [ ] |
| 217 | Angle/Hook | Text-Input | [ ] |
| 218 | Status-Buttons | 6 klickbare Buttons (Idee→Entwurf→Bereit→Geplant→Live→Archiviert) | [ ] |
| 219 | Prioritäts-Buttons | 3 Buttons (Hoch/Mittel/Niedrig) mit Farben | [ ] |
| 220 | Qualitäts-Bewertung | 3 Buttons (Gut👍/Neutral🤔/Schlecht👎) | [ ] |
| 221 | Tags | Hinzufügen/Entfernen, farbige Chips, "+ Tag hinzufügen" | [ ] |
| 222 | Notizen | Textarea | [ ] |
| 223 | Geplantes Datum | datetime-local Input (bei Status "geplant"/"bereit") | [ ] |
| 224 | Ctrl+S | Speichern und Schließen | [ ] |

### 3.5 Plattform-spezifische Felder

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 225 | YouTube: videoTitle | Text-Input | [ ] |
| 226 | YouTube: videoDescription | Textarea mit Zeichenzähler | [ ] |
| 227 | YouTube: Keywords | Hinzufügen/Entfernen, Chips, Anzahl | [ ] |
| 228 | YouTube: Kategorie | Dropdown (8 Optionen) | [ ] |
| 229 | YouTube: Zielgruppe | Text-Input | [ ] |
| 230 | YouTube: Thumbnails | Upload (Drag-Drop, max 3, max 500KB), Grid mit Löschen | [ ] |
| 231 | Instagram: postType | 4 Buttons (Reel/Carousel/Story/Post) | [ ] |
| 232 | Instagram: Caption | Textarea mit Zeichenzähler | [ ] |
| 233 | Instagram: Hashtags | Hinzufügen/Entfernen, Chips | [ ] |
| 234 | Instagram: Audio-Referenz | Text-Input | [ ] |
| 235 | Instagram: Cover-Bild | Upload (max 500KB), Vorschau + Löschen | [ ] |
| 236 | FB/LinkedIn: postType | 5 Buttons (Post/Carousel/Video/Story/Article) | [ ] |
| 237 | FB/LinkedIn: Caption | Textarea mit Zeichenzähler | [ ] |
| 238 | FB/LinkedIn: Hashtags | Hinzufügen/Entfernen | [ ] |
| 239 | FB/LinkedIn: Link-URL | Text-Input | [ ] |

### 3.6 Checklist & Media

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 240 | Checklist Toggle | Checkbox klicken → erledigt/offen. Durchgestrichen bei erledigt | [ ] |
| 241 | Checklist Zähler | "X/Y erledigt" | [ ] |
| 242 | Media Upload | Drag-Drop oder Datei-Input. Max 5, max 2MB pro Datei | [ ] |
| 243 | Media Grid | Bilder + Videos (Play-Icon). Löschen bei Hover | [ ] |
| 244 | Versionen erstellen | Input + "Version speichern" → Speichert Titel, Beschreibung, Notizen | [ ] |
| 245 | Version laden | "Laden" Button → Stellt Daten wieder her | [ ] |

### 3.7 Kalender-Ansicht

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 246 | Wochen-Ansicht | 7 Spalten (Mo-So) mit Tageslabels und Datum | [ ] |
| 247 | Navigation | "Vorherige Woche", "Heute", "Nächste Woche" Buttons | [ ] |
| 248 | Heute-Markierung | Heutige Spalte mit blauem Hintergrund + Rand + "Heute" Label | [ ] |
| 249 | Inhalte auf Daten | Gefilterte Items mit scheduledDate auf korrektem Tag | [ ] |
| 250 | Item klicken | Öffnet ContentItemModal | [ ] |
| 251 | Geplante Items Liste | Unter Kalender: Karten mit Uhrzeit, Titel, Plattform, Edit/Delete | [ ] |

### 3.8 Dateien/Ressourcen

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 252 | Datei-Tabelle | Name, Kategorie, Labels, Datum, Aktionen | [ ] |
| 253 | Datei hinzufügen | Modal: Name (required), URL, Beschreibung, Kategorie (6 Tiles), Labels | [ ] |
| 254 | Labels | Vorgeschlagene Labels + Custom-Labels mit "+" Button | [ ] |
| 255 | Auto-Prefix | Label-Match → fügt Prefix hinzu (z.B. "Script: " für Sales Skript) | [ ] |
| 256 | Datei bearbeiten | Klick auf Name oder Edit-Icon → gleiches Modal vorausgefüllt | [ ] |
| 257 | Datei löschen | Papierkorb → Bestätigung | [ ] |
| 258 | Dateien suchen | Name + Beschreibung | [ ] |
| 259 | Kategorie-Filter | Dropdown mit 6 Kategorien + "Alle" | [ ] |
| 260 | Label-Filter | Multi-Select mit aktiven Label-Chips + "Alle löschen" | [ ] |

### 3.9 Planung/Strategie

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 261 | Plan-Karten | Name, Beschreibung, Sections, Tasks, Deadline, Donut-Chart (% done) | [ ] |
| 262 | Plan erstellen | "+ Neuer Plan" → PlanBuilder Modal | [ ] |
| 263 | PlanBuilder | Basics, Ziele, Team, Kanäle, Konfiguration. "Leeren Plan" oder "Plan generieren" | [ ] |
| 264 | Plan-Detail | Zurück, Name, Suche, Modus-Toggles (Plan/Woche/Todos/Mindmap) | [ ] |
| 265 | Strategie-Karte | Editierbar: Name, Beschreibung, Deadline, Stats, Team, Kanäle | [ ] |
| 266 | Freitext-Felder | Strategy-Textarea, Notes-Textarea | [ ] |

### 3.10 Tasks in Plänen

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 267 | Tasks pro Sektion | Expandierbare Sektionen mit Fortschrittsbalken | [ ] |
| 268 | Task Klick | Öffnet Detail-Panel (ClickUp-Style) rechts | [ ] |
| 269 | Quick-Add | "+ Task hinzufügen + Enter" am Ende jeder Sektion | [ ] |
| 270 | "+ Detail" Button | Task mit voller Bearbeitung hinzufügen | [ ] |
| 271 | Task-Status | Dropdown: To Do / In Progress / Done | [ ] |
| 272 | Task-Priorität | 3 Toggle-Buttons (Hoch/Mittel/Niedrig) | [ ] |
| 273 | Task-Fälligkeit | Datum-Input | [ ] |
| 274 | Task-Frequenz | Dropdown: Einmalig, Täglich, Wöchentlich, 2-wöchentlich, Monatlich | [ ] |
| 275 | Task-Sektion verschieben | Dropdown zum Verschieben in andere Sektion | [ ] |
| 276 | Task-MMA Toggle | Button An/Aus | [ ] |
| 277 | Task-Zuständige | Multi-Select Buttons (ein Button pro Teammitglied) | [ ] |
| 278 | Task-Wochentag | 7 Buttons (bei Frequenz wöchentlich) | [ ] |
| 279 | Task-Beschreibung | Textarea | [ ] |
| 280 | Task-Dependencies | Hinzufügen/Entfernen, "Blockiert" Badge, Link-Icon | [ ] |
| 281 | Task-Subtasks | Rekursive Baumstruktur mit Checkboxen | [ ] |
| 282 | Verlinkte Dateien | Multi-Select Datei-Picker | [ ] |
| 283 | Verlinkte Content-Ideen | Multi-Select Content-Picker | [ ] |
| 284 | Verlinkte Dashboard-Items | Dropdown (Content, Dateien, LinkedIn, Cold Mail, Automation) | [ ] |
| 285 | Task löschen | Button mit Bestätigung | [ ] |

### 3.11 Mindmap (4 Stile)

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 286 | Tree-Stil | SVG: Root oben, Sektionen horizontal, Tasks darunter | [ ] |
| 287 | Radial-Stil | Kreisförmig: Root zentral, Sektionen im Kreis, Tasks außen | [ ] |
| 288 | Horizontal-Stil | Spalten: Sektionen als Header, Tasks darunter | [ ] |
| 289 | Kanban-Stil | Grid: Sektions-Spalten mit Task-Karten | [ ] |
| 290 | Expand/Collapse | Klick auf Sektion erweitert/reduziert Tasks | [ ] |
| 291 | Expand All/Collapse All | Buttons zum Alle-Auf/Zu | [ ] |
| 292 | Task klicken in Mindmap | Wechselt zu Plan-Modus und öffnet Task | [ ] |
| 293 | Dependency-Pfeile | Gestrichelte Verbindungen zwischen abhängigen Tasks | [ ] |

### 3.12 Wochen-Ansicht & Todos

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 294 | Wochen-Ansicht | Mo-Fr als 5 Spalten, Sa-So als 2 Spalten | [ ] |
| 295 | Tasks auf Tage | Fällige oder wiederkehrende Tasks auf korrektem Tag | [ ] |
| 296 | Nicht-geplante Tasks | Unter Kalender als Chips | [ ] |
| 297 | Todos-Filter | Plan, Priorität, MMA, Sektion, Status | [ ] |
| 298 | Todos-Ansicht Toggle | Liste / Board (Kanban: To Do / In Progress / Done) | [ ] |

### 3.13 Weitere Content-Features

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 299 | Performance-Ansicht | KPI-Karten: Views, Likes, Comments, Shares, Avg Score | [ ] |
| 300 | Top 5 Performer | Sortiert nach Views | [ ] |
| 301 | Templates-Sektion | Serien-Karten + Template-Karten, Vorschau-Modal, Duplizieren | [ ] |
| 302 | Research-Sektion | Notizen erstellen, Grid-Ansicht, ResearchNoteModal (Titel, Plattform, Content, Links, Tags) | [ ] |
| 303 | Settings: Export CSV | Exportiert Content als CSV | [ ] |
| 304 | Settings: Export JSON | Exportiert kompletten Backup als JSON | [ ] |
| 305 | Settings: Import JSON | Importiert Backup | [ ] |
| 306 | Settings: Daten zurücksetzen | Bestätigung → Reset auf Demo-Daten | [ ] |

### 3.14 Content Sidebar & Persistenz

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 307 | Sidebar-Navigation | Dashboard, Content Ideas, YouTube, Instagram, FB&LinkedIn, Pipeline, Calendar, Files, Planning, Performance, Templates, Research, Settings | [ ] |
| 308 | Plattform-Counts | YouTube/Instagram/FB Counts in Sidebar | [ ] |
| 309 | Collapse/Expand | Desktop: Chevron. Mobile: Overlay | [ ] |
| 310 | Active-State | Aktueller Bereich hervorgehoben | [ ] |
| 311 | localStorage Keys | `flowstack-content-items`, `flowstack-content-research`, `flowstack-content-files`, `flowstack-content-plans` | [ ] |
| 312 | Auto-Save | Speichert bei jeder State-Änderung automatisch | [ ] |
| 313 | Demo-Daten Fallback | Lädt Demo-Daten wenn localStorage leer | [ ] |

---

## TEIL 4: ÜBERGREIFEND

### 4.1 Navigation & Routing

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 314 | Alle Routen | /dashboard, /content, /system, /linkedin, /cold-mail, /hub, /onboarding, /formular | [ ] |
| 315 | 404-Seite | Zeigt "Seite nicht gefunden" bei ungültigen URLs | [ ] |
| 316 | Navigation zwischen Seiten | Alle Links in Sidebars funktionieren | [ ] |

### 4.2 Theme & i18n

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 317 | Dark/Light Mode | Toggle auf jeder Seite. Alle Elemente respektieren Theme | [ ] |
| 318 | DE/EN Toggle | Alle UI-Texte wechseln sofort. Keine fehlenden Keys | [ ] |

### 4.3 Toast-System

| # | Feature | Was muss passieren | Status prüfen |
|---|---------|-------------------|---------------|
| 319 | Success Toast | Grün, mit Icon, 3s Auto-Dismiss | [ ] |
| 320 | Error Toast | Rot, mit Icon, 3s Auto-Dismiss | [ ] |
| 321 | Info Toast | Lila, mit Icon, 3s Auto-Dismiss | [ ] |
| 322 | Manuell schließen | X-Button auf jedem Toast | [ ] |

---

## ZUSAMMENFASSUNG

| Bereich | Anzahl Features |
|---------|----------------|
| Automation Dashboard (Übersicht) | 8 |
| System-Detail | 13 |
| Template-Picker | 15 |
| Ressourcen-Panel | 15 |
| Output-Tabelle | 7 |
| Settings | 6 |
| Sidebar & Header | 18 |
| Workflow-Canvas Nodes | 14 |
| Workflow-Canvas Verbindungen | 10 |
| Workflow-Canvas Ports | 4 |
| Workflow-Canvas Interaktionen | 9 |
| Workflow-Canvas Gruppen | 9 |
| Workflow-Canvas Sticky Notes | 8 |
| Workflow-Canvas Node-Edit | 9 |
| Workflow-Canvas Toolbar | 13 |
| Workflow-Canvas Settings | 13 |
| Workflow-Canvas Shortcuts | 10 |
| Workflow-Canvas Save/Execute | 7 |
| Content Dashboard Übersicht | 10 |
| Content Suche/Filter | 6 |
| Content Bulk-Modus | 6 |
| Content Detail-Modal | 14 |
| Content Plattform-Felder | 15 |
| Content Checklist/Media | 6 |
| Content Kalender | 6 |
| Content Dateien | 9 |
| Content Planung | 6 |
| Content Tasks | 19 |
| Content Mindmap | 8 |
| Content Wochen/Todos | 5 |
| Content Weitere | 8 |
| Content Sidebar/Persistenz | 7 |
| Übergreifend | 9 |
| **GESAMT** | **~322 Features** |
