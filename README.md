# Hochzeitseinladung – Webseite

Einfache HTML-Webseite für die Hochzeitseinladung.

## Design

Die **Design-Guideline** (Stimmung, Farben, Typo, Komponenten): [`DESIGN_GUIDELINE.md`](DESIGN_GUIDELINE.md).

## Inhalte

Zentrale Fakten, Ablauf, Location, RSVP-Endpoint und Passwort-Hinweis: [`CONTENT.md`](CONTENT.md).

## Anpassen

Inhaltliche Texte und Links stehen in den jeweiligen HTML-Dateien. Die **Farbwelt** (Eukalyptus, Kerzenlicht, Holzakzente) ist zentral in [`styles.css`](styles.css) über CSS-Variablen (`:root`) definiert.

- Rückmeldefrist: Text auf der Startseite im Bereich „weitere Details“ (`index.html`).
- **Passwort-Hash** für alle geschützten Seiten: `EXPECTED_HASH` in jeder HTML-Datei mit Passwort-Skript (gleicher Wert).

## Passwortschutz

Die Einladung ist durch eine Passwortabfrage geschützt. Das Passwort wird **nicht im Quelltext** gespeichert, sondern nur als SHA-256-Hash (sicher für öffentliche Repos).

- Groß-/Kleinschreibung spielt keine Rolle.
- Nach erfolgreicher Eingabe bleibt die Seite in derselben Browser-Sitzung freigegeben (sessionStorage).

**Passwort ändern:** Neuen Hash berechnen (z. B. mit Node:  
`node -e "console.log(require('crypto').createHash('sha256').update('DEIN_NEUES_PASSWORT').digest('hex'))"`),  
dann den Wert von `EXPECTED_HASH` in **allen** HTML-Dateien mit Passwort-Overlay ersetzen.

## Ansehen

- **Lokal:** `index.html` im Browser öffnen (Doppelklick oder Rechtsklick → „Öffnen mit“ → Browser). `styles.css`, `og-image.svg` und der Ordner `images/` (Logo) müssen mit ausgeliefert werden.
- **Logo Edelfuchs Lodge:** [`images/edelfuchs-lodge-logo.png`](images/edelfuchs-lodge-logo.png) – offizielles Logo von [edelfuchs-lodge.de](https://edelfuchs-lodge.de/) (`/wp-content/uploads/2021/07/Logo_web.png`). Bei Aktualisierung der Marke dieselbe Datei ersetzen oder `src` in `index.html` anpassen.
- **Online:** Projekt z. B. auf GitHub Pages veröffentlichen (Repository → Settings → Pages → Source: main branch).

## Technik

- **Hauptseite:** [`index.html`](index.html) – **eine scrollbare Seite** mit Abschnitten (Einladung, Ablauf, Rückmeldung, Übernachtung); Navigation über Scroll bzw. Anker-URLs (`#einladung`, …).
- **Alte URLs:** `ablauf.html`, `rückmeldung.html`, `uebernachtung.html`, `kontakt.html` leiten per Meta-Refresh auf die entsprechenden Anker auf `index.html` weiter (Bookmarks bleiben nutzbar).
- Gemeinsames Stylesheet: [`styles.css`](styles.css)
- Social Preview: [`og-image.svg`](og-image.svg), Meta-Tags (`og:*`, `theme-color`) in den HTML-Dateien; Vorschau-URL: Domain in `og:url` / `og:image` anpassen, falls abweichend.
- Keine Abhängigkeiten außer Google Fonts (Great Vibes, Montserrat, Playfair Display)
- Responsive, funktioniert auf Smartphone und Desktop
