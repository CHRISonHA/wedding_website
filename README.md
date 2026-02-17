# Hochzeitseinladung – Webseite

Einfache HTML-Webseite für die Hochzeitseinladung.

## Anpassen

Öffne `index.html` in einem Editor und ersetze die Platzhalter in eckigen Klammern:

- **[Datum]** – Hochzeitsdatum (z. B. 10. August 2030)
- **[Uhrzeit]** – z. B. 14:00 Uhr
- **[Ort / Venue]** – Name der Location
- **[Adresse]** / **[PLZ Ort]** – Anschrift
- **[Datum]** bei Rückmeldung – z. B. 1. Mai 2026
- Optional: Kontakt oder Link zur Rückmeldung (RSVP)

## Passwortschutz

Die Einladung ist durch eine Passwortabfrage geschützt. Das Passwort wird **nicht im Quelltext** gespeichert, sondern nur als SHA-256-Hash (sicher für öffentliche Repos).

- Groß-/Kleinschreibung spielt keine Rolle.
- Nach erfolgreicher Eingabe bleibt die Seite in derselben Browser-Sitzung freigegeben (sessionStorage).

**Passwort ändern:** Neuen Hash berechnen (z. B. mit Node:  
`node -e "console.log(require('crypto').createHash('sha256').update('DEIN_NEUES_PASSWORT').digest('hex'))"`),  
dann in `index.html` den Wert von `EXPECTED_HASH` ersetzen.

## Ansehen

- **Lokal:** `index.html` im Browser öffnen (Doppelklick oder Rechtsklick → „Öffnen mit“ → Browser).
- **Online:** Projekt z. B. auf GitHub Pages veröffentlichen (Repository → Settings → Pages → Source: main branch).

## Technik

- Eine Datei: `index.html` (HTML + CSS eingebettet)
- Keine Abhängigkeiten außer Google Fonts (Great Vibes, Montserrat)
- Responsive, funktioniert auf Smartphone und Desktop
