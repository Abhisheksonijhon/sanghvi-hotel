// ═══════════════════════════════════════════════════════
//  HOTEL SHANVI LANDMARK — Google Apps Script
//  Saves form submissions to Google Sheets
//
//  HOW TO USE:
//  1. Open Google Sheets (create a new one named "Shanvi Hotel Enquiries")
//  2. Go to Extensions → Apps Script
//  3. Delete default code, paste this entire file
//  4. Click Deploy → New Deployment
//  5. Type: Web App
//  6. Execute as: Me (your Gmail)
//  7. Who has access: Anyone
//  8. Click Deploy → Copy the Web App URL
//  9. Paste that URL into js/form.js as GOOGLE_SHEET_URL
// ═══════════════════════════════════════════════════════

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Enquiries');

    // Create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet('Enquiries');
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Phone',
        'Email',
        'Check-in',
        'Check-out',
        'Guests',
        'Room Type',
        'Message',
        'Status'
      ]);

      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setBackground('#c9a84c');
      headerRange.setFontColor('#1a0f00');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const p = e.parameter;

    // Append the data row
    sheet.appendRow([
      p.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      p.name    || '',
      p.phone   || '',
      p.email   || '',
      p.checkin  || '',
      p.checkout || '',
      p.guests  || '',
      p.room    || '',
      p.message || '',
      'New'
    ]);

    // Auto-resize columns
    sheet.autoResizeColumns(1, 10);

    // ── Optional: Send email alert to hotel ──
    // Uncomment and replace with hotel's email to get email alerts
    /*
    MailApp.sendEmail({
      to: 'info@hotelshanvi.com',
      subject: `New Booking Enquiry from ${p.name}`,
      body: `New enquiry received:\n\nName: ${p.name}\nPhone: ${p.phone}\nEmail: ${p.email}\nCheck-in: ${p.checkin}\nCheck-out: ${p.checkout}\nGuests: ${p.guests}\nRoom: ${p.room}\nMessage: ${p.message}\n\nView all enquiries: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`
    });
    */

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
