import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, Cookie, Shield, BarChart3, Megaphone, Sparkles } from 'lucide-react';

interface CookieSettings {
  notwendig: boolean;
  statistik: boolean;
  marketing: boolean;
  komfort: boolean;
}

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    notwendig: true,
    statistik: false,
    marketing: false,
    komfort: false
  });

  // Banner beim Laden prüfen
  useEffect(() => {
    const existingConsent = localStorage.getItem("cookieConsent");
    if (!existingConsent) {
      setVisible(true);
    }
  }, []);

  // Event-Listener für Cookie-Einstellungen zurücksetzen
  useEffect(() => {
    const handleResetConsent = () => {
      localStorage.removeItem("cookieConsent");
      setVisible(true);
    };

    window.addEventListener('resetCookieConsent', handleResetConsent);
    return () => window.removeEventListener('resetCookieConsent', handleResetConsent);
  }, []);

  // Event-Listener für Einstellungen öffnen
  useEffect(() => {
    const handleOpenSettings = () => {
      setShowSettings(true);
      setVisible(true);
    };

    window.addEventListener('openCookieSettings', handleOpenSettings);
    return () => window.removeEventListener('openCookieSettings', handleOpenSettings);
  }, []);

  // Consent verarbeiten und speichern
  const handleConsent = (type: 'accepted' | 'rejected') => {
    const consentData = {
      marketing: type === "accepted",
      statistik: type === "accepted",
      komfort: type === "accepted"
    };

    // Cookie speichern (1 Jahr)
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `cookieConsent=${JSON.stringify(consentData)}; path=/; max-age=31536000${secure}; SameSite=Lax`;

    // GTM Event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cookieConsentUpdate",
      ...consentData,
      timestamp: new Date().toISOString(),
    });

    localStorage.setItem("cookieConsent", JSON.stringify(consentData));
    setVisible(false);
    setShowSettings(false);
  };

  // Custom Settings speichern
  const saveCustomSettings = () => {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `cookieConsent=${JSON.stringify(cookieSettings)}; path=/; max-age=31536000${secure}; SameSite=Lax`;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cookieConsentUpdate",
      ...cookieSettings,
      timestamp: new Date().toISOString(),
    });

    localStorage.setItem("cookieConsent", JSON.stringify(cookieSettings));
    setVisible(false);
    setShowSettings(false);
  };

  if (!visible) return null;

  return createPortal(
    <>
      {/* Cookie Banner */}
      {!showSettings && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-full sm:max-w-2xl z-50">
          <div className="bg-card border border-border shadow-2xl rounded-2xl p-6 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-foreground font-semibold text-lg">
                Cookie-Einstellungen
              </h3>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              Wir verwenden Cookies, um Inhalte zu personalisieren und die Zugriffe auf unsere Website zu analysieren.
              Du kannst selbst entscheiden, welche Kategorien du zulassen möchtest. Weitere Infos findest du in unserer{" "}
              <Link
                to="/datenschutz"
                className="text-primary hover:underline"
              >
                Datenschutzerklärung
              </Link>.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleConsent("accepted")}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={() => handleConsent("rejected")}
                className="flex-1 bg-card hover:bg-accent border border-border text-foreground rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                Nur notwendige
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="text-sm text-muted-foreground hover:text-foreground underline transition-colors px-2 py-1"
              >
                Einstellungen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Cookie-Einstellungen
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 mb-6">
              <p className="text-muted-foreground text-sm">
                Wähle aus, welche Arten von Cookies du zulassen möchtest.
              </p>

              {/* Cookie Categories */}
              <div className="space-y-3">
                {/* Notwendig - immer aktiv */}
                <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">Notwendig</h4>
                      <p className="text-xs text-muted-foreground">Erforderlich für den Betrieb</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Statistik */}
                <div className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium text-foreground">Statistik</h4>
                      <p className="text-xs text-muted-foreground">Für Website-Analysen</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCookieSettings(prev => ({ ...prev, statistik: !prev.statistik }))}
                    className={`w-11 h-6 rounded-full flex items-center transition-colors duration-300 ${
                      cookieSettings.statistik ? 'bg-primary justify-end' : 'bg-muted justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm"></div>
                  </button>
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Megaphone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium text-foreground">Marketing</h4>
                      <p className="text-xs text-muted-foreground">Für personalisierte Werbung</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCookieSettings(prev => ({ ...prev, marketing: !prev.marketing }))}
                    className={`w-11 h-6 rounded-full flex items-center transition-colors duration-300 ${
                      cookieSettings.marketing ? 'bg-primary justify-end' : 'bg-muted justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm"></div>
                  </button>
                </div>

                {/* Komfort */}
                <div className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium text-foreground">Komfort</h4>
                      <p className="text-xs text-muted-foreground">Für bessere Benutzerfreundlichkeit</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCookieSettings(prev => ({ ...prev, komfort: !prev.komfort }))}
                    className={`w-11 h-6 rounded-full flex items-center transition-colors duration-300 ${
                      cookieSettings.komfort ? 'bg-primary justify-end' : 'bg-muted justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={saveCustomSettings}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-5 py-3 text-sm font-semibold transition-colors"
              >
                Auswahl speichern
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 bg-card hover:bg-accent border border-border text-foreground rounded-lg px-5 py-3 text-sm font-semibold transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

// Declare dataLayer for TypeScript
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default CookieBanner;
