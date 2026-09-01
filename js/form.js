/* HOTEL SHANVI LANDMARK — FORM HANDLER (updated)
   - Date validation (checkin < checkout)
   - Prefill room when clicking Book This Room (data-room)
   - Clearer UX on submit
   - Keep GOOGLE_SHEET_URL placeholder — replace with your deployed Apps Script URL
*/

const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'; // e.g. https://script.google.com/macros/s/AKfycb.../exec
const HOTEL_WHATSAPP = '919859858383';

const form = document.getElementById('bookingForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

function showError(msg) {
  formError.textContent = '❌ ' + msg;
  formError.style.display = 'block';
  formSuccess.style.display = 'none';
}

function clearMessages() {
  formError.style.display = 'none';
  formError.textContent = '';
  formSuccess.style.display = 'none';
}

// Prefill room when a ".btn-room" with data-room is clicked
document.querySelectorAll('.btn-room[data-room]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // If link is anchor to #booking, let it scroll; prefill first
    const room = btn.dataset.room;
    const roomSelect = document.querySelector('#bookingForm select[name="room"]');
    if (roomSelect) {
      // Try to set exact match, otherwise append an option
      let found = Array.from(roomSelect.options).some(opt => {
        if (opt.textContent.trim() === room) {
          roomSelect.value = opt.value;
          return true;
        }
        return false;
      });
      if (!found) {
        const opt = document.createElement('option');
        opt.text = room;
        opt.selected = true;
        roomSelect.add(opt);
      }
    }
    // small delay to allow browser to scroll to form
    setTimeout(() => {
      const el = document.getElementById('checkin');
      if (el) el.focus();
    }, 350);
  });
});

// Basic client-side validation helpers
function isValidPhone(p) {
  // Allow + and digits, length check
  if (!p) return false;
  const digits = p.replace(/\D/g,'');
  return digits.length >= 8 && digits.length <= 15;
}

function validateDates(checkin, checkout) {
  if (!checkin || !checkout) return false;
  const ci = new Date(checkin);
  const co = new Date(checkout);
  if (isNaN(ci) || isNaN(co)) return false;
  return co > ci;
}

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearMessages();

    // Gather form values
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const checkin = form.checkin.value;
    const checkout = form.checkout.value;
    const guests = form.guests.value;
    const room = form.room.value;
    const message = form.message.value.trim();

    // Simple validation
    if (!name) { showError('Please enter your name.'); return; }
    if (!isValidPhone(phone)) { showError('Please enter a valid phone number.'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('Please enter a valid email address.'); return; }
    if (!validateDates(checkin, checkout)) { showError('Please ensure check-out is after check-in.'); return; }

    // UI: disable submit
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitSpinner.style.display = 'inline';

    const data = {
      name, phone, email, checkin, checkout, guests, room, message,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // Send to Google Sheets (Apps Script) — if you have a deployed Apps Script URL, set GOOGLE_SHEET_URL above.
    let sheetSuccess = false;
    if (GOOGLE_SHEET_URL && !GOOGLE_SHEET_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_URL_HERE')) {
      try {
        // Prefer POST if your Apps Script accepts POST; fallback to GET/no-cors
        const canPost = true;
        if (canPost) {
          // Try POST with CORS — deploy your Apps Script to allow CORS if you want to read response
          await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            mode: 'no-cors' // keep no-cors fallback if script not configured for CORS
          });
        } else {
          const params = new URLSearchParams(data);
          await fetch(GOOGLE_SHEET_URL + '?' + params.toString(), { method: 'GET', mode: 'no-cors' });
        }
        sheetSuccess = true;
      } catch (err) {
        console.warn('Sheet submit failed:', err);
      }
    } else {
      // Dev: log
      console.log('📋 Form Data (configure Google Sheets to save):', data);
      sheetSuccess = true;
    }

    // Prepare WhatsApp message for owner
    const waMsg = `🏨 *New Booking Enquiry — Shanvi Landmark*%0A%0A` +
      `👤 Name: ${data.name}%0A` +
      `📞 Phone: ${data.phone}%0A` +
      `✉️ Email: ${data.email}%0A` +
      `📅 Check-in: ${data.checkin}%0A` +
      `📅 Check-out: ${data.checkout}%0A` +
      `👥 Guests: ${data.guests}%0A` +
      `🛏️ Room: ${data.room}%0A` +
      `💬 Message: ${data.message || 'None'}%0A%0A` +
      `🕐 Submitted: ${data.timestamp}`;

    // Re-enable UI
    submitBtn.disabled = false;
    submitText.style.display = 'inline';
    submitSpinner.style.display = 'none';

    if (sheetSuccess) {
      formSuccess.style.display = 'block';
      form.reset();
      // open WhatsApp in new tab to notify staff
      setTimeout(() => {
        window.open(`https://wa.me/${HOTEL_WHATSAPP}?text=${waMsg}`, '_blank');
      }, 700);
    } else {
      showError('Could not submit the enquiry. Please call or WhatsApp us directly.');
    }
  });
}
