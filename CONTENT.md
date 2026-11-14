# Inhalt – Hochzeit Anne & Chris

Kanonische Texte und technische Werte für die Website. Bei Änderungen hier und in `index.html` / `styles.css` synchron halten.

## Physische Einladungskarte (Druck)

- **Website-Link (QR + Kurz-URL):** `https://www.hochzeit-anne-und-chris.top/` (auf der Druckkarte nur Kurz: `hochzeit-anne-und-chris.top` ohne „www.“)
- **Auf der Karte:** Kicker, Namen, Ringe, Tagline (*„Wir sagen Ja …“* wie auf der Website), QR, **Passwort-Hinweis** für die Seite, Kurz-URL – Datum/Ort nur online.
- **Dateien:** `print-karte.html`, `print-karte.css`, `print-karte.pdf`; optional **A4-Bogen** `print-karte-a4.html`, `print-karte-a4.css`, `print-karte-a4.pdf` (4× Karte auf einer A4-Seite)
- **Neuerstellung PDF/QR:** `npm run print-karte:build` bzw. `npm run print-karte:build-a4` (siehe README)

## One-Page-Anker (Hash-Navigation)

Alle Inhalte sind auf `index.html`; **alte Bookmark-URLs** (Redirect-HTML) nutzen dieselben Anker:

| Bereich | Hash |
|--------|------|
| Einladung | `#einladung` |
| Ablauf | `#ablauf` |
| Rückmeldung | `#rueckmeldung` |
| Unterkünfte | `#uebernachtung` |

## Paar & Termin

- **Namen:** Anne & Chris  
- **Datum:** 28. August 2027 (Anzeige auch als `28 | 08 | 2027` möglich)  
- **Rückmeldung bis:** 28. Februar 2027  
- **Tagline (Einladung):** Wir sagen Ja – und laden euch von Herzen ein, mit uns diesen Tag zu feiern!

## Location

- **Edelfuchs Lodge**  
- Hundsbachstraße 3  
- 77830 Bühlertal  

## Tagesablauf

| Zeit | Programm |
|------|------------|
| ab 15:00 | Get together |
| 15:30 | Freie Trauung |
| 16:15 | Sektempfang |
| 17:30 | Essen |
| ab 20:00 | Party |
|  | Open End |

## Übernachtung

- **Edelfuchs-Lodge** (Location, besonders für Gäste mit kleinen Kindern): [edelfuchs-lodge.de](https://edelfuchs-lodge.de/) · Hundsbachstraße 3, 77830 Bühlertal  
- Weitere Unterkünfte: [Zur großen Tanne](https://www.zurgrossentanne.de/) (Unterstmatt 1, 77887 Bühl), [Hochkopfstub](http://www.hochkopf.de/) (Raue Halde 6, 77815 Bühl-Unterstmatt), [Bergwaldhütte Sand](https://bergwaldhuette.info/) (Am Stadtwald 2a, 77815 Bühl)  
- Camper auf dem Parkplatz möglich.  

## Rückmeldung (Google Apps Script)

- **Endpoint:** `https://script.google.com/macros/s/AKfycbwwtvRbugKJS26pmrL0oAlhoWBaScKjYJRWjdhWc3Mcci7g95uS4eMI9RKtDUJ2DD8OPA/exec`  
- **Skript-Vorlage:** [`apps-script/rsvp.gs`](apps-script/rsvp.gs) (Honeypot, Token, Validierung, Rate-Limit)  
- **Felder:** `name`, `zusage`, `erwachsene` (≥ 1), `kinder`, `kleinkinder`, `nachricht`, plus Spam-Schutz `rsvp_token` (hidden) und `fax_number` (Honeypot, leer lassen)  
- **`zusage` (Werte):** `Ja - selbstverständlich!` · `Nein - leider nicht :(`  
- **Methode:** POST in verstecktes `iframe` (kein CORS-Problem).  
- **Nach Script-Änderung:** Web-App-Deployment aktualisieren; Token in `index.html` und `rsvp.gs` synchron halten. Bei anhaltendem Spam neue Deployment-URL erzeugen, alte archivieren, URL hier und in `index.html` ersetzen.  

## Passwortschutz

- **Speicherung:** `sessionStorage`, Schlüssel `wedding_guest`.  
- **Validierung:** SHA-256 des eingegebenen Passworts (kleingeschrieben) gegen `EXPECTED_HASH` in den HTML-Dateien – **nicht** das Klartwort-Passwort im Repo ablegen.  

## Domain & Meta (anpassen bei anderem Host)

- Beispiel: `https://www.hochzeit-anne-und-chris.top/`  
- `og:image`: `og-image.svg` im Projektroot  
