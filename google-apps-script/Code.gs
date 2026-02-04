// ============================================
// GOOGLE APPS SCRIPT - KONTAKTFORMULAR BACKEND
// Flowstack Systems
// ============================================

// ===========================================
// KONFIGURATION - HIER ANPASSEN!
// ===========================================

// TODO: Trage hier deine E-Mail-Adresse ein, an die Benachrichtigungen gesendet werden
const NOTIFICATION_EMAIL = "kontakt@flowstack-systems.de";

// Absendername für E-Mails
const SENDER_NAME = "Flowstack Systems";

// Reply-To Adresse (wohin Antworten gehen sollen)
const REPLY_TO = "kontakt@flowstack-systems.de";

// ===========================================
// HAUPTFUNKTION - POST REQUEST HANDLER
// ===========================================

function doPost(e) {
  try {
    // Formulardaten aus dem Request extrahieren
    const data = e.parameter;

    // Felder auslesen (mit Fallback auf leeren String)
    const name = data.name || "";
    const email = data.email || "";
    const telefon = data.telefon || "";
    const firma = data.firma || "";
    const nachricht = data.nachricht || "";

    // Zeitstempel für die Anfrage
    const timestamp = Utilities.formatDate(
      new Date(),
      "Europe/Berlin",
      "dd.MM.yyyy 'um' HH:mm 'Uhr'"
    );

    // 1) Benachrichtigungs-E-Mail an das Team senden
    sendNotificationEmail(name, email, telefon, firma, nachricht, timestamp);

    // 2) Bestätigungs-E-Mail an den Interessenten senden
    sendConfirmationEmail(name, email, telefon, firma, nachricht, timestamp);

    // Erfolgreiche Antwort zurückgeben
    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Fehler loggen und zurückgeben
    console.error("Fehler bei Formularverarbeitung:", error);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===========================================
// BENACHRICHTIGUNGS-E-MAIL AN DAS TEAM
// ===========================================

function sendNotificationEmail(name, email, telefon, firma, nachricht, timestamp) {
  const subject = `Neue Anfrage: ${name} - Prozess-Analyse`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
        .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .value { font-size: 16px; color: #111827; background: white; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; }
        .timestamp { font-size: 12px; color: #9ca3af; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px;">Neue Anfrage eingegangen</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Jemand möchte eine kostenlose Prozess-Analyse</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${escapeHtml(name)}</div>
          </div>
          <div class="field">
            <div class="label">E-Mail</div>
            <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
          </div>
          <div class="field">
            <div class="label">Telefon</div>
            <div class="value"><a href="tel:${escapeHtml(telefon)}">${escapeHtml(telefon)}</a></div>
          </div>
          ${firma ? `
          <div class="field">
            <div class="label">Firma</div>
            <div class="value">${escapeHtml(firma)}</div>
          </div>
          ` : ''}
          ${nachricht ? `
          <div class="field">
            <div class="label">Nachricht</div>
            <div class="value">${escapeHtml(nachricht).replace(/\n/g, '<br>')}</div>
          </div>
          ` : ''}
          <div class="timestamp">Eingegangen am ${timestamp}</div>
        </div>
      </div>
    </body>
    </html>
  `;

  const plainBody = `
Neue Anfrage eingegangen
========================

Name: ${name}
E-Mail: ${email}
Telefon: ${telefon}
${firma ? `Firma: ${firma}` : ''}
${nachricht ? `Nachricht: ${nachricht}` : ''}

Eingegangen am ${timestamp}
  `.trim();

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    replyTo: email,
    name: SENDER_NAME
  });
}

// ===========================================
// BESTÄTIGUNGS-E-MAIL AN DEN INTERESSENTEN
// ===========================================

function sendConfirmationEmail(name, email, telefon, firma, nachricht, timestamp) {
  // Vorname extrahieren für persönliche Anrede
  const vorname = name.split(" ")[0];

  const subject = "Deine Anfrage bei Flowstack Systems";

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #374151; background: #f3f4f6; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #0a0a0e, #1f1f2e); padding: 40px 30px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; color: white; }
        .logo span { color: #a855f7; }
        .content { padding: 40px 30px; }
        h1 { color: #111827; font-size: 22px; margin: 0 0 20px 0; }
        p { margin: 0 0 16px 0; }
        .summary { background: #f9fafb; border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid #e5e7eb; }
        .summary-title { font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }
        .summary-item { display: flex; margin-bottom: 12px; }
        .summary-label { color: #6b7280; min-width: 100px; }
        .summary-value { color: #111827; font-weight: 500; }
        .highlight { background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; padding: 24px; border-radius: 12px; margin: 24px 0; }
        .highlight p { margin: 0; }
        .footer { background: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb; }
        .footer p { font-size: 13px; color: #6b7280; margin: 0; }
        .footer a { color: #8b5cf6; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Flowstack <span>Systems</span></div>
        </div>
        <div class="content">
          <h1>Hallo ${escapeHtml(vorname)},</h1>
          <p>vielen Dank für deine Anfrage. Wir haben deine Nachricht erhalten und melden uns innerhalb der nächsten 48 Stunden bei dir.</p>

          <div class="summary">
            <div class="summary-title">Zusammenfassung deiner Angaben</div>
            <div class="summary-item">
              <span class="summary-label">Name:</span>
              <span class="summary-value">${escapeHtml(name)}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">E-Mail:</span>
              <span class="summary-value">${escapeHtml(email)}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Telefon:</span>
              <span class="summary-value">${escapeHtml(telefon)}</span>
            </div>
            ${firma ? `
            <div class="summary-item">
              <span class="summary-label">Firma:</span>
              <span class="summary-value">${escapeHtml(firma)}</span>
            </div>
            ` : ''}
            ${nachricht ? `
            <div class="summary-item">
              <span class="summary-label">Nachricht:</span>
              <span class="summary-value">${escapeHtml(nachricht)}</span>
            </div>
            ` : ''}
          </div>

          <div class="highlight">
            <p><strong>Was passiert als nächstes?</strong></p>
            <p style="margin-top: 8px; opacity: 0.95;">Wir prüfen deine Anfrage und melden uns zeitnah mit einem Terminvorschlag für dein kostenloses Erstgespräch.</p>
          </div>

          <p>Bei dringenden Fragen erreichst du uns jederzeit unter <a href="mailto:${REPLY_TO}" style="color: #8b5cf6;">${REPLY_TO}</a>.</p>

          <p style="margin-top: 24px;">Beste Grüße,<br><strong>Claudio Di Franco</strong><br>Flowstack Systems</p>
        </div>
        <div class="footer">
          <p>Diese E-Mail wurde automatisch versendet.<br>
          <a href="https://flowstack-systems.de">flowstack-systems.de</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const plainBody = `
Hallo ${vorname},

vielen Dank für deine Anfrage. Wir haben deine Nachricht erhalten und melden uns innerhalb der nächsten 48 Stunden bei dir.

ZUSAMMENFASSUNG DEINER ANGABEN
------------------------------
Name: ${name}
E-Mail: ${email}
Telefon: ${telefon}
${firma ? `Firma: ${firma}` : ''}
${nachricht ? `Nachricht: ${nachricht}` : ''}

WAS PASSIERT ALS NÄCHSTES?
--------------------------
Wir prüfen deine Anfrage und melden uns zeitnah mit einem Terminvorschlag für dein kostenloses Erstgespräch.

Bei dringenden Fragen erreichst du uns jederzeit unter ${REPLY_TO}.

Beste Grüße,
Claudio Di Franco
Flowstack Systems

--
Diese E-Mail wurde automatisch versendet.
flowstack-systems.de
  `.trim();

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    replyTo: REPLY_TO,
    name: SENDER_NAME
  });
}

// ===========================================
// HILFSFUNKTIONEN
// ===========================================

// HTML-Zeichen escapen für sichere Ausgabe
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ===========================================
// TEST-FUNKTION (zum Testen im Script Editor)
// ===========================================

function testDoPost() {
  const testEvent = {
    parameter: {
      name: "Max Mustermann",
      email: "max@beispiel.de",
      telefon: "+49 123 456789",
      firma: "Musterfirma GmbH",
      nachricht: "Ich interessiere mich für eure Automatisierungslösungen."
    }
  };

  const result = doPost(testEvent);
  console.log(result.getContent());
}
