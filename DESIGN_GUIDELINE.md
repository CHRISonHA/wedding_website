# Design-Guideline – Hochzeitswebsite

Diese Guideline beschreibt die **visuelle und inhaltliche Richtung** der Seite: **Schleierkraut**, **Eukalyptus**, **Holz**, **weiße Kerzen**, **Lodge im Wald** – rustikal-elegant, botanisch, mit viel Weißraum.

Technische Umsetzung: statisches HTML/CSS ([`styles.css`](styles.css)). Farben und Schriften sind über **CSS-Variablen** zentral steuerbar.

---

## 1. Marken & Stimmung

| Stichwort | Umsetzung |
|-----------|-----------|
| **Eukalyptus** | Aquarell-artige, weiche Grüntöne; Zweige als Dekor (z. B. SVG oben links / unten rechts). |
| **Schleierkraut** | Dezente, kleine Punkte oder filigrane Akzente (z. B. in Hintergrund- oder Social-Grafiken), nie dominant. |
| **Holz** | Warme Braun-Töne für Akzente, Links, subtile Ränder (`--holz`, `--holz-hell`). |
| **Kerzenlicht** | Warmes Gold/Champagner für Highlights (`--gold`, `--gold-soft`), keine grellen Gelbtöne. |
| **Lodge im Wald** | Ruhige, natürliche Palette; Karten wie „Papier auf Holz“; keine kühlen Tech-Blues. |

**Ton:** einladend, feierlich, reduziert – keine verspielten Cliparts, keine grellen Kontraste.

---

## 2. Farbwelt

Alle Primärwerte in `:root` in [`styles.css`](styles.css). Änderungen dort wirken global.

| Token | Hex / Wert | Verwendung |
|-------|------------|------------|
| `--beige` | `#f9f9f7` | Seitenhintergrund, Kartenfläche |
| `--beige-dunkel` | `#e8e8e4` | Trennlinien, dezente Rahmen |
| `--text` | `#2d2d2d` | Haupttext |
| `--text-hell` | `#5c5c5c` | Sekundärtext, Labels, Navigation |
| `--sage` | `#7a9b92` | Akzentfarbe, botanisch |
| `--sage-dunkel` | `#556d66` | dunklere Akzente, z. B. Ring-Symbol |
| `--sage-soft` | rgba | sehr flächige Hintergründe |
| `--holz` / `--holz-hell` | `#8b7355` / `#a0826d` | Holz/Kerzenlicht, Hover von Links |
| `--gold` / `--gold-soft` | `#c4a574` / rgba | Kerzenlicht-Glanz, sparsam |
| `--card-shadow` | siehe CSS | Weiche, neutrale Kartenschatten |

**Theme (Browser UI):** `theme-color` `#F9F9F7` (Meta in HTML).

---

## 3. Typografie

Laden über Google Fonts (siehe `index.html` / Unterseiten).

| Rolle | Schrift | Einsatz |
|-------|---------|---------|
| **Serif (Einladung)** | **Playfair Display** (`--font-invite-serif`) | Namen, Datum, Adresse auf der Startkarte |
| **Script** | **Great Vibes** | Überschriften auf Unterseiten (`.script`), emotionale Zeilen |
| **Sans** | **Montserrat** (300/400/500) | Fließtext, Formulare, Navigation, `.sans` |

**Regeln**

- Namen und Datum: oft **Uppercase** + großzügiger **Letter-Spacing** (Einladungs-Ästhetik).
- Überschriften-Fließtext: nicht mehr als **zwei** Schriftfamilien gleichzeitig im Blickfeld kombinieren (Serif + Script + Sans sind aufgeteilt nach Ebenen).
- Mindestgrößen für Lesbarkeit auf Mobilgeräten beibehalten (`clamp()` wo vorhanden).

---

## 4. Layout & Weißraum

- **Maximalbreite Karte:** ca. **480px** (`.karte`), schmale Seiten z. B. **420px** (`.karte--narrow` für Rückmeldung).
- **Zentrierung:** Inhalt primär **horizontal zentriert**; vertikal genug Padding, damit die Karte „atmet“.
- **Navigation:** **One-Page** ohne feste Fuß-Leiste; Abschnitte in dieser Reihenfolge: Einladung → Ablauf → Rückmeldung → **Unterkünfte** (Anker `#uebernachtung`); früher: Menü als Fußzeile je Unterseite.
- **Abstände:** Großzügiger Abstand zwischen Datum, optionalem Lodge-Logo und Adresse; kein gedrängelter Block.

---

## 5. Komponenten (Kurz)

| Element | Hinweis |
|---------|---------|
| **`.karte`** | Zentrale „Karte“ mit Schatten und abgerundeten Ecken. |
| **Einladungs-Header** | Eukalyptus-SVG-Dekor + `.invite-ref` (Namen, Ringe, Datum, Logo, Adresse). |
| **Edelfuchs-Logo** | PNG unter `images/edelfuchs-lodge-logo.png`; **Zuschnitt per CSS** (`.invite-ref__lodge-logo`: `object-fit: cover`, `object-position: top`, `aspect-ratio` – siehe CSS). Kein zweites Logo ohne Marken-Check. |
| **Navigation** | `.menu` / `.site-footer`: kleine Uppercase-Links, dezente Letter-Spacing. |
| **Formular Rückmeldung** | Struktur und **POST-Ziel** nicht ändern ohne Backend-Anpassung (Google Apps Script). |
| **Passwort-Overlay** | Gleicher Hash auf allen geschützten Seiten; Design: dezent, lesbar. |
| **Druckvorlage** | [`print-karte.html`](print-karte.html) / [`print-karte.css`](print-karte.css): eine Karte A6 → [`print-karte.pdf`](print-karte.pdf). **A4-Bogen** [`print-karte-a4.html`](print-karte-a4.html) + [`print-karte-a4.css`](print-karte-a4.css): 2×2 gleiche Karten auf **A4 Hochformat** → [`print-karte-a4.pdf`](print-karte-a4.pdf). Inhalt: Kicker, Namen, Ringe, Tagline, QR, Passwort, Domain (ohne „www.“); ohne Botanik-Dekor. |

---

## 6. Bilder & Grafiken

- **Favicon / Social:** [`og-image.svg`](og-image.svg) – Stimmung Eukalyptus/Lodge; Domain in Meta-Tags bei Bedarf anpassen.
- **Referenzfotos** für künftige Anpassungen können im Repo unter `docs/design-refs/` abgelegt werden (optional).

---

## 7. Barrierefreiheit & Qualität

- **Kontrast:** Text `--text` auf `--beige` erfüllt in der Regel guten Kontrast; helles Grau nur für Nebeninfos.
- **Fokus:** Links und Formularfelder sichtbar fokussierbar (bestehende `:focus`-Styles beibehalten).
- **Dekor:** `aria-hidden="true"` bei rein dekorativen SVGs; Logo zwischen Datum und Adresse mit sinnvollem `alt` oder leerem `alt`, wenn der Ort im Text steht.

---

## 8. Was vermieden werden soll

- Neonfarben, reines Schwarz-Weiß ohne Warmton, kaltes Blau als Fläche.
- Volle Breite Text ohne Max-Width auf Desktop.
- Stockfotos mit kitschigen Hochzeits-Klischees statt der definierten Natur-Ästhetik.
- Änderungen an **Rückmeldeformular**-Feldern oder **Action-URL** ohne Abstimmung mit dem Google-Script.

---

## 9. Referenz-Stil: „Wedding-Look“ (React-/Tailwind-Prototyp)

Als **gewünschte Richtung** für den Neuaufbau gilt ein Prototyp im Stil: **mehr Hochzeit, weniger „Wald“ im Hero** – luftig, elegant, Serif-fokussiert, mit dezenten warmen Grautönen statt kräftigem Sage im Vordergrund.

**Struktur (eine Seite oder mehrere):**

- **Hero (Vollbild-Höhe):** zentriert; kleines Label „Hochzeitseinladung“ (Uppercase, sehr weites Tracking); Namen **ANNE** / **CHRIS** als große Serif-Zeilen; **&** dazwischen kursiv, etwas heller; optionaler **Fließtext** darunter (italic, warmes Grau); **horizontale Linie** (`h-px`, ca. 6rem breit) als Trenner; **Datum** als große Serif-Zeile; **Ort** eine Zeile darunter (Uppercase, muted).
- **Ablauf:** Section mit viel vertikalem Padding; Label „Ablauf“, Überschrift „Unser Tag“ (Serif); **Zeilen** je `flex justify-between`: Uhrzeit links (muted), Titel rechts (Serif); luftige `space-y`.
- **RSVP:** Section auf **weißem Hintergrund** (`bg-white`) zur Absetzung; gleiche Label-/Überschrift-Logik; **Formular** mit nur **unterem Rand** (Underline-Inputs), Button outline mit Hover-Invert.
- **Übernachtung:** wieder auf Creme-Hintergrund; kurzer Fließtext, Orte als Serif-Zeilen, optionaler Hinweis kursiv.

**Farben aus dem Prototyp (in `:root` ergänzen oder angleichen):**

| Verwendung | Hex | Vorschlag Token |
|------------|-----|-----------------|
| Seitenhintergrund | `#f8f6f2` | `--beige` anpassen oder `--bg-cream` |
| Haupttext | `#2a2a2a` | nahe `--text` (`#2d2d2d`) |
| Label / kleine Uppercase | `#9a948c` | `--label-muted` |
| Fließtext sekundär | `#5c5852` | `--body-muted` |
| Uhrzeiten Timeline | `#7a756d` | `--timeline-muted` |
| Ort / Meta-Zeile | `#6b665f` | `--meta-muted` |
| Trennlinie | `#d6d0c6` | `--divider` |
| Form-Ränder | `#d6d0c6` | wie `--divider` |

**Typografie im Prototyp:** durchgängig **Serif** für Namen, Datum, Überschriften und Timeline-Titel; **kein** Great-Vibes-Pflicht im Hero (der Prototyp nutzt nur Serif + kursives &). Optional kann Great Vibes nur für eine Zeile bleiben – konsistent **eine** Entscheidung treffen.

**Technik:** Der gezeigte Code ist **React + Tailwind**; die Live-Site kann **statisch** bleiben – dieselbe Optik über **CSS** (`max-w-xl`, `min-h-screen`, Flex, gleiche Abstände) nachbauen. Ein späterer Wechsel zu Next.js/React wäre dann optisch vorgezeichnet.

---

## 10. Änderungen an dieser Guideline

Bei Relaunch oder größeren Designänderungen: Guideline und [`styles.css`](styles.css) `:root` gemeinsam pflegen, damit Design und Code synchron bleiben.

**Letzte Ausrichtung:** Lodge im Wald, Eukalyptus, Schleierkraut, Holz, Kerzenlicht – reduziert und festlich; **Hero/Seitenaufbau** zusätzlich an **Abschnitt 9 (Wedding-Look-Prototyp)** ausrichten.
