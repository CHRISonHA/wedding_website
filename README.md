# Hochzeitseinladung – Webseite

Einfache HTML-Webseite für die Hochzeitseinladung.

## Design

Die **Design-Guideline** (Stimmung, Farben, Typo, Komponenten): [`DESIGN_GUIDELINE.md`](DESIGN_GUIDELINE.md).

## Inhalte

Zentrale Fakten, Ablauf, Location, RSVP-Endpoint und Passwort-Hinweis: [`CONTENT.md`](CONTENT.md).

## Druckvorlage (Einladungskarte mit QR)

- **HTML/CSS:** [`print-karte.html`](print-karte.html) + [`print-karte.css`](print-karte.css) – minimalistisch, gleiche Farb-/Typo-Welt wie die Website, QR zur Hochzeitsseite.
- **PDF:** [`print-karte.pdf`](print-karte.pdf) – für Druck oder Versand; neu erzeugen nach Layout- oder Textänderungen (siehe unten).
- **QR-Bild:** [`images/qr-hochzeit-anne-chris.png`](images/qr-hochzeit-anne-chris.png) – Ziel-URL `https://www.hochzeit-anne-und-chris.top/`

**PDF und QR neu erzeugen** (einmal `npm install` und `npx playwright install chromium` im Projektordner):

```bash
npm run print-karte:build
```

Erzeugt zuerst das QR-PNG, dann `print-karte.pdf` per Playwright (Chromium). Alternativ: `print-karte.html` im Browser öffnen und **Drucken → Als PDF speichern**.

### A4-Bogen mit 4 Karten (2×2)

- **Dateien:** [`print-karte-a4.html`](print-karte-a4.html), [`print-karte-a4.css`](print-karte-a4.css), PDF [`print-karte-a4.pdf`](print-karte-a4.pdf)
- **Format:** Eine **A4-Seite im Hochformat** mit **vier** identischen Karten im Raster – jede Kachel entspricht **A6** (105×148 mm), passend zum direkten Druck und anschließendem Zuschneiden. *(A4 Querformat würde für vier klassische A6-Karten im Hochformat nicht passen.)*
- **Erzeugen:** `npm run print-karte:build-a4` (QR + `print-karte-a4.pdf`)

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
- **Statische Seite:** keine Laufzeit-Abhängigkeiten außer Google Fonts (Great Vibes, Montserrat, Playfair Display).
- **Optional (nur für PDF/QR-Build):** Node.js, siehe [`package.json`](package.json) (`playwright`, `qrcode`).
- Responsive, funktioniert auf Smartphone und Desktop
