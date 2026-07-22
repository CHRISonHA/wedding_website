/**
 * RSVP → Google Sheet (Spam-Schutz)
 *
 * Einrichtung:
 * 1. script.google.com → neues Projekt ODER bestehendes RSVP-Skript öffnen
 * 2. Diesen Code komplett einfügen (alten Code ersetzen)
 * 3. SHEET_NAME ggf. anpassen (Tab-Name im Spreadsheet)
 * 4. RSVP_TOKEN muss exakt dem Hidden-Feld in index.html entsprechen
 * 5. Speichern → Bereitstellen → Web-App
 *    - Ausführen als: Ich
 *    - Zugriff: Jeder (auch anonym)  ← nötig für das Formular
 * 6. Bei bestehender Web-App: „Neue Version bereitstellen“ / Deployment aktualisieren
 * 7. Optional: alte Deployments archivieren, wenn eine neue URL erzeugt wurde
 * 8. Neue /exec-URL in index.html und CONTENT.md eintragen (nur bei neuer URL)
 *
 * Sheet-Spalten (Reihenfolge): Zeitstempel | Name | Zusage | Erwachsene | Kinder | Kleinkinder | Nachricht
 */

var SHEET_NAME = 'Antworten'; // Tab-Name anpassen
var RSVP_TOKEN = '0cZNUOQhYy1FFluoQ0azMwDu'; // muss zu index.html passen
var MAX_PER_MINUTE = 8;
var MAX_NAME = 120;
var MAX_NACHRICHT = 2000;
var MAX_PERSONEN = 20;

var ALLOWED_ZUSAGE = {
  'Ja - selbstverständlich!': true,
  'Nein - leider nicht :(': true
};

function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};

    // Honeypot: Bots füllen oft versteckte Felder
    if (String(p.website || '').trim() !== '') {
      return json_({ ok: true }); // stiller Erfolg, nichts speichern
    }

    if (String(p.rsvp_token || '') !== RSVP_TOKEN) {
      return json_({ ok: false, error: 'forbidden' }, 403);
    }

    if (!allowRate_()) {
      return json_({ ok: false, error: 'rate_limit' }, 429);
    }

    var name = String(p.name || '').trim();
    var zusage = String(p.zusage || '').trim();
    var erwachsene = parseCount_(p.erwachsene);
    var kinder = parseCount_(p.kinder);
    var kleinkinder = parseCount_(p.kleinkinder);
    var nachricht = String(p.nachricht || '').trim();

    if (!name || name.length > MAX_NAME) {
      return json_({ ok: false, error: 'invalid_name' }, 400);
    }
    if (!ALLOWED_ZUSAGE[zusage]) {
      return json_({ ok: false, error: 'invalid_zusage' }, 400);
    }
    if (erwachsene === null || kinder === null || kleinkinder === null) {
      return json_({ ok: false, error: 'invalid_counts' }, 400);
    }
    if (erwachsene < 1) {
      return json_({ ok: false, error: 'invalid_erwachsene' }, 400);
    }
    if (nachricht.length > MAX_NACHRICHT) {
      return json_({ ok: false, error: 'invalid_message' }, 400);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return json_({ ok: false, error: 'sheet_missing' }, 500);
    }

    sheet.appendRow([
      new Date(),
      name,
      zusage,
      erwachsene,
      kinder,
      kleinkinder,
      nachricht
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'server' }, 500);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('RSVP endpoint OK')
    .setMimeType(ContentService.MimeType.TEXT);
}

function parseCount_(v) {
  if (v === undefined || v === null || v === '') return 0;
  var n = Number(v);
  if (!isFinite(n) || n < 0 || n > MAX_PERSONEN || Math.floor(n) !== n) return null;
  return n;
}

function allowRate_() {
  var cache = CacheService.getScriptCache();
  var key = 'rsvp_rate_' + Math.floor(Date.now() / 60000);
  var raw = cache.get(key);
  var count = raw ? Number(raw) : 0;
  if (count >= MAX_PER_MINUTE) return false;
  cache.put(key, String(count + 1), 90);
  return true;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
