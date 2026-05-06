
/* ═══════════════════════════════════════════════
   HOTEL SHANVI LANDMARK — FORM HANDLER
   Sends data to Google Sheets + WhatsApp notify
   ═══════════════════════════════════════════════

   SETUP INSTRUCTIONS:
   1. Go to Google Sheets → Extensions → Apps Script
   2. Paste the Apps Script code from /js/apps-script.gs
   3. Deploy as Web App → Anyone → Copy the URL
   4. Replace GOOGLE_SHEET_URL below with your deployment URL
   ═══════════════════════════════════════════════ */

const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
// Example: 'https://script.google.com/macros/s/AKfycb.../exec'

const HOTEL_WHATSAPP = '919859858383';

const form = document.getElementById('bookingForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Hide messages
    formSuccess.style.display = 'none';
    formError.style.display = 'none';

    // Disable button
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitSpinner.style.display = 'inline';

    const data = {
      name:     form.name.value.trim(),
      phone:    form.phone.value.trim(),
      email:    form.email.value.trim(),
      checkin:  form.checkin.value,
      checkout: form.checkout.value,
      guests:   form.guests.value,
      room:     form.room.value,
      message:  form.message.value.trim(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // ── 1. Send to Google Sheets ──
    let sheetSuccess = false;
    if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      try {
        const params = new URLSearchParams(data);
        await fetch(GOOGLE_SHEET_URL + '?' + params.toString(), { method: 'GET', mode: 'no-cors' });
        sheetSuccess = true;
      } catch (err) {
        console.warn('Sheet submit failed:', err);
      }
    } else {
      // Dev mode — log data
      console.log('📋 Form Data (configure Google Sheets to save):', data);
      sheetSuccess = true;
    }

    // ── 2. Open WhatsApp for hotel owner ──
    // This opens WhatsApp with pre-filled message — hotel owner gets notified
    const waMsg = `🏨 *New Booking Enquiry — Shanvi Landmark*\n\n` +
      `👤 Name: ${data.name}\n` +
      `📞 Phone: ${data.phone}\n` +
      `✉️ Email: ${data.email}\n` +
      `📅 Check-in: ${data.checkin}\n` +
      `📅 Check-out: ${data.checkout}\n` +
      `👥 Guests: ${data.guests}\n` +
      `🛏️ Room: ${data.room}\n` +
      `💬 Message: ${data.message || 'None'}\n\n` +
      `🕐 Submitted: ${data.timestamp}`;

    // Re-enable button
    submitBtn.disabled = false;
    submitText.style.display = 'inline';
    submitSpinner.style.display = 'none';

    if (sheetSuccess) {
      formSuccess.style.display = 'block';
      form.reset();

      // Auto-open WhatsApp with enquiry details
      setTimeout(() => {
        window.open(`https://wa.me/${HOTEL_WHATSAPP}?text=${encodeURIComponent(waMsg)}`, '_blank');
      }, 800);
    } else {
      formError.style.display = 'block';
    }
  });
}
