/**
 * RSVP → Google Sheet (Spam-Schutz)
 *
 * Einrichtung:
 * 1. script.google.com → neues Projekt ODER bestehendes RSVP-Skript öffnen
 * 2. Diesen Code komplett einfügen (alten Code ersetzen)
 * 3. SHEET_NAME = exakter Tab-Name im Spreadsheet (oder leer lassen → erster Tab)
 * 4. Wenn das Skript NICHT am Sheet hängt (standalone): SPREADSHEET_ID setzen
 *    (aus der Sheet-URL: …/d/DIESE_ID/edit)
 * 5. RSVP_TOKEN muss exakt dem Hidden-Feld in index.html entsprechen
 * 6. Speichern → Bereitstellen → Web-App
 *    - Ausführen als: Ich
 *    - Zugriff: Jeder (auch anonym)
 * 7. Berechtigungen für Tabellen erlauben, wenn Google danach fragt
 * 8. Deployment auf neue Version aktualisieren; URL in index.html / CONTENT.md
 *
 * Sheet-Spalten: Zeitstempel | Name | Zusage | Erwachsene | Kinder | Kleinkinder | Nachricht
 */

var SHEET_NAME = 'Antworten'; // Tab-Name; '' = erster Tab
var SPREADSHEET_ID = ''; // nur nötig bei standalone-Skript, z. B. '1abc…'
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

    // Honeypot (Feldname bewusst nicht „website“ – Passwortmanager füllen das oft)
    if (String(p.fax_number || '').trim() !== '') {
      return json_({ ok: true });
    }

    if (String(p.rsvp_token || '') !== RSVP_TOKEN) {
      return json_({ ok: false, error: 'forbidden' });
    }

    if (!allowRate_()) {
      return json_({ ok: false, error: 'rate_limit' });
    }

    var name = String(p.name || '').trim();
    var zusage = String(p.zusage || '').trim();
    var erwachsene = parseCount_(p.erwachsene);
    var kinder = parseCount_(p.kinder);
    var kleinkinder = parseCount_(p.kleinkinder);
    var nachricht = String(p.nachricht || '').trim();

    if (!name || name.length > MAX_NAME) {
      return json_({ ok: false, error: 'invalid_name' });
    }
    if (!ALLOWED_ZUSAGE[zusage]) {
      return json_({ ok: false, error: 'invalid_zusage' });
    }
    if (erwachsene === null || kinder === null || kleinkinder === null) {
      return json_({ ok: false, error: 'invalid_counts' });
    }
    if (erwachsene < 1) {
      return json_({ ok: false, error: 'invalid_erwachsene' });
    }
    if (nachricht.length > MAX_NACHRICHT) {
      return json_({ ok: false, error: 'invalid_message' });
    }

    var sheet = getSheet_();
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
    return json_({
      ok: false,
      error: 'server',
      detail: String(err && err.message ? err.message : err)
    });
  }
}

function doGet() {
  try {
    getSheet_(); // prüft Sheet-Zugriff schon beim GET
    return ContentService
      .createTextOutput('RSVP endpoint OK')
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService
      .createTextOutput('RSVP endpoint ERROR: ' + (err && err.message ? err.message : err))
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function getSheet_() {
  var ss = null;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (ignore) {}

  if (!ss && SPREADSHEET_ID) {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  if (!ss) {
    throw new Error(
      'Kein Spreadsheet. Skript am Sheet öffnen (Erweiterungen → Apps Script) ' +
      'oder SPREADSHEET_ID in rsvp.gs setzen.'
    );
  }

  var sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : null;
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }
  if (!sheet) {
    throw new Error('Kein Tab im Spreadsheet gefunden. SHEET_NAME prüfen: ' + SHEET_NAME);
  }
  return sheet;
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
