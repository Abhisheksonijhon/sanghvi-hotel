# 🏨 Hotel Shanvi Landmark — Website Package
## Complete Luxury Hotel Website for Panna, Madhya Pradesh

---

## 📁 File Structure

```
sanghvi-hotel/
│
├── index.html              ← Main website (open this in browser)
│
├── css/
│   ├── style.css           ← Main styles (luxury gold/burgundy/ivory palette)
│   ├── animations.css      ← Scroll reveal & hero animations
│   └── responsive.css      ← Mobile & tablet responsiveness
│
├── js/
│   ├── main.js             ← Navbar, slider, gallery, WhatsApp widget
│   ├── form.js             ← Contact form → Google Sheets + WhatsApp
│   └── apps-script.gs      ← Google Apps Script (copy to Google Sheets)
│
└── images/                 ← Add your hotel photos here
    ├── room-deluxe.jpg
    ├── room-family.jpg
    ├── room-premium.jpg
    ├── banquet-hall.jpg
    └── dining.jpg
```

---

## 🚀 Quick Setup Guide

### Step 1: Add Hotel Photos
1. Place real hotel photos in the `/images/` folder
2. In `index.html`, find the `img-placeholder` divs in the Rooms section
3. Replace them with: `<img src="images/room-deluxe.jpg" alt="Deluxe Room">`

### Step 2: Set Up Google Sheets (Form Data)
1. Create a new Google Sheets document
2. Go to **Extensions → Apps Script**
3. Paste the code from `js/apps-script.gs`
4. Click **Deploy → New Deployment → Web App**
5. Set Execute as: **Me**, Who has access: **Anyone**
6. Copy the Web App URL
7. Open `js/form.js` and replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your URL

### Step 3: Enable Email Alerts (Optional)
- In `apps-script.gs`, uncomment the `MailApp.sendEmail(...)` block
- Change the email to hotel's actual email address

### Step 4: Update Contact Info (if changed)
- In `index.html`, search for `+91 98598 58383` and update if number changes
- WhatsApp links use: `https://wa.me/919859858383`

---

## ✅ Features Included

| Feature | Status |
|---------|--------|
| Luxury Gold/Burgundy/Ivory design | ✅ |
| Hero slideshow (3 slides, auto-play) | ✅ |
| Mobile responsive (hamburger menu) | ✅ |
| WhatsApp chatbot widget (fixed) | ✅ |
| Contact form → Google Sheets | ✅ |
| Form → WhatsApp notification | ✅ |
| Explore Panna section (6 attractions) | ✅ |
| Photo gallery with lightbox | ✅ |
| Scroll reveal animations | ✅ |
| Active nav link on scroll | ✅ |
| Photo placeholders (easy to replace) | ✅ |
| Google Maps embed | ✅ |
| Guest reviews section | ✅ |
| Events/Banquet section | ✅ |
| Footer with all details | ✅ |

---

## 📞 Hotel Contact Info (Pre-filled)
- Phone 1: +91 98598 58383
- Phone 2: +91 91291 20083
- Address: Gehra Road Kunjvan, Panna MP 488001
- Google Maps: https://maps.app.goo.gl/8oGjP77grbRZjbnB8

---

## 🎨 Color Palette
```
Deep Background:  #0c0a07
Burgundy:         #6b1a1a
Gold:             #c9a84c
Gold Light:       #e2c76e
Ivory:            #faf7f0
Text:             #e8dfc8
```

---

## 🔧 To Customize
- **Logo**: Update `.logo-main` text in navbar
- **Hero Images**: Replace Unsplash URLs in `css/style.css` `.slide-1`, `.slide-2`, `.slide-3`
- **Google Maps**: Replace the `<iframe>` src with actual hotel coordinates embed URL from Google Maps
- **Reviews**: Update names/text in the Reviews section of `index.html`

---

*Website created as a premium showcase for Sanghvi Hotel, Panna — demonstrating full digital potential.*
