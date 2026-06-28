# FTRN #5 Open Recruitment - Worklog

Project: Web form pendaftaran panitia FTRN #5 (Festival Teater Rakyat Nasional)
Theme: Nature ecology, minimalist, Poppins font
Stack: Next.js 16, TypeScript, Tailwind 4, shadcn/ui, Prisma/SQLite, Framer Motion

## Divisions (from uploaded image):
1. Dana Usaha & Stand
2. Dokumentasi
3. Konten Kreator
4. K3 (Kebersihan, Konsumsi, Kesehatan)
5. Akomodasi
6. LO Pengisi Acara
7. Tim Lighting
8. Tim Sound
9. Koordinator Lapangan
10. Keamanan
11. Komposer Jingle
12. Koreografer Jingle

---
Task ID: 1
Agent: Main (orchestrator)
Task: Setup Poppins font, nature ecology theme colors, metadata

Work Log:
- Read project structure (Next.js 16, shadcn/ui components available)
- Analyzed uploaded division image via VLM -> 12 divisions identified
- Will configure Poppins font + nature green/cream theme in layout.tsx and globals.css

Stage Summary:
- Layout.tsx: Poppins font (weights 200-900), metadata FTRN #5, Sonner toaster added
- globals.css: Nature ecology palette (forest green primary oklch(0.45 0.12 150), accent sage, cream background), custom scrollbar, grain texture, glass utilities, float/sway/marquee/pulse-ring animations
- prisma/schema.prisma: Registration model with all fields (data diri, 1st/2nd choice divisi + statements, optional fields, agree, timestamps). DB pushed successfully.
- src/lib/data.ts: 12 divisions with icons/desc/tasks, 6 benefits, FTRN_INFO (dates, organizer, contact Dinda Aprilia Hentari +62 882 1244 7588), FTRN4_DOCS gallery placeholders
- src/lib/schema.ts: Zod schema with validation (min lengths, phone regex, IG no-space, agree literal true, refine 1st!=2nd choice)

Components built (src/components/ftrn/):
- nature-decor.tsx: SVG Leaf/Sprout/Fern/Blob + animated NatureDecor (hero & section variants)
- navbar.tsx: sticky, transparent->blur on scroll, mobile hamburger menu
- hero.tsx: FTRN #5 big title, date pill, dual CTA (Daftar + Website FTRN), 3 stats, marquee strip
- about.tsx: FTRN description + website link + 4 stats cards (6 hari, HMJ Teater, Nasional, Edisi ke-5)
- divisions.tsx: 12 interactive division cards with hover effects + bottom CTA
- benefits-dialog.tsx: pop-up with 6 benefits (gradient header banner + grid)
- docs-dialog.tsx: pop-up gallery FTRN #4 (6 placeholder items with gradient backdrops + play icons)
- division-picker.tsx: Popover-based visual division selector (used for 1st & 2nd choice, excludes other selection)
- registration-form.tsx: multi-section form (Data Diri, Pilihan Divisi 1st+2nd with statements, Tambahan optional, Pernyataan) with progress bar, react-hook-form + zod, success state with celebration animation
- contact.tsx: Ketua Pelaksana card (Dinda Aprilia Hentari) with WhatsApp + Telepon buttons
- footer.tsx: brand, nav links, back-to-top, copyright, CSV export link

Backend API:
- POST /api/registrations: zod validation -> Prisma create -> 201
- GET /api/registrations: list all (JSON)
- GET /api/registrations/export: CSV with BOM (Google Sheets ready), division names translated

Verification (Agent Browser):
- Page loads, title correct, no console errors
- Hero renders with nature theme, stats, CTAs
- Form: filled all fields, division picker popover works, selected Konten Kreator (1st) + Dokumentasi (2nd), agreement checkbox, submit -> POST 201 -> DB INSERT confirmed in log
- Success state: celebration animation with checkmark + "Pendaftaran Terkirim!" + buttons
- Benefits pop-up: 6 benefits displayed
- Docs pop-up: 6 gallery items displayed
- CSV export: returns proper CSV with escaped fields + translated division names
- Mobile (iPhone 14): responsive hero, hamburger menu works (Tentang/Divisi/Daftar/Kontak + Daftar Sekarang)
- Footer: at bottom, sticky, with export link confirmed in DOM
- Full-page VLM eval: consistent green theme, professional layout, no broken sections, eye-catching

Status: COMPLETE - all features working end-to-end

---
Task ID: REVAMP-1
Agent: Main (orchestrator)
Task: Simplify to Google-Form style + correct FTRN name + prepare Google Sheet backend

Work Log:
- Corrected FTRN name: Festival Teater Remaja Nusantara (was: Rakyat Nasional)
- Updated website to https://ftrnv.vercel.app, IG to @ftrn.isijogja
- Created new SimpleForm component (single column, Select dropdowns for divisions, gform-like)
- Removed heavy sections: hero, about, divisions showcase, contact, navbar, footer-complex, division-picker (popover), registration-form (old multi-section)
- New page.tsx: single centered card with gradient header banner, quick-link buttons (Benefit + Dokumentasi), form body, contact line, minimal footer
- Created src/lib/google-sheet.ts helper (forwardToGoogleSheet + GOOGLE_SHEET_WEBHOOK_URL env)
- Updated POST /api/registrations: saves locally + forwards to Google Sheet webhook (if configured), returns googleSheet status
- Added GOOGLE_SHEET_WEBHOOK_URL= placeholder in .env with Apps Script example in comments
- Removed /api/registrations/export (CSV) route — now using Google Sheet
- Lint clean, dev server running, no errors

Verification (Agent Browser):
- Page loads: title "Festival Teater Remaja Nusantara" correct
- Form layout: gform-like single card, header banner + quick links + fields
- Filled all fields via Select dropdowns (Konten Kreator 1st, Dokumentasi 2nd)
- Submit -> POST /api/registrations 201, success state "Pendaftaran Terkirim!" with checkmark
- API response includes googleSheet: { forwarded: false, reason: "not_configured" } (correct until user provides webhook URL)
- Benefit pop-up works (6 benefits), Dokumentasi pop-up works (6 gallery items)
- Mobile (iPhone 14) full-page: responsive, no overflow, all elements readable

Stage Summary:
- Form is now as simple as Google Form (single centered card, no website sections)
- Backend ready for Google Spreadsheet: user just needs to set GOOGLE_SHEET_WEBHOOK_URL in .env with their Apps Script Web App URL
- All corrections applied (FTRN name, website, IG)
- Status: COMPLETE & verified

---
Task ID: REVAMP-2
Agent: Main (orchestrator)
Task: Update benefits to 5 items + remove AI-looking symbols + Google Sheet deploy info

Work Log:
- Updated BENEFITS in data.ts to 5-item array (E-Certificate, Networking, Pengalaman, Portofolio, Dokumentasi BTS) — removed icon field
- Rewrote benefits-dialog.tsx: simple checkmark list (green check in circle), no flashy icons, no gradient banner, clean header
- Removed Sparkles icon usage from page.tsx (Benefit button) and simple-form.tsx (success state)
- Removed PartyPopper from success state heading
- Replaced K3 division icon Sparkles -> Droplets (more neutral, no sparkle look)
- Lint clean, browser verified: benefit pop-up shows 5 items with only green checkmarks, no AI-looking symbols

Google Sheet note:
- User sent Apps Script EDITOR URL (/home/projects/.../edit), not deployment URL
- Need to guide user to Deploy > New deployment > Web app > "Anyone" access > copy /macros/s/.../exec URL
- Apps Script doPost code already documented in src/lib/google-sheet.ts comment

Stage Summary:
- Benefits = 5 items as requested, checkmark style only
- All sparkle/star/party-popper symbols removed
- Awaiting user to deploy Apps Script and send the /exec URL to enable Google Sheet forwarding

---
Task ID: REVAMP-3
Agent: Main (orchestrator)
Task: Configure Google Sheet webhook URL

Work Log:
- User provided Apps Script Web App URL (Workspace domain students.isi.ac.id)
- Direct curl test: POST returns 401, GET redirects to Google login with hd=students.isi.ac.id
- Diagnosis: Web App bound to ISI Yogyakarta Workspace domain — admin policy requires org login, blocks anonymous access
- Even though user selected "Anyone" at deploy, the /a/macros/students.isi.ac.id/ path forces domain auth
- Updated .env GOOGLE_SHEET_WEBHOOK_URL to user's URL (ready to work once access fixed)
- Tested local API: POST /api/registrations still returns success:true, saves to local DB, googleSheet:{forwarded:false,reason:http_error,status:404} — graceful fallback works

Fix needed from user:
- Redeploy the Apps Script from a PERSONAL @gmail.com account (not students.isi.ac.id)
- Personal accounts have no Workspace admin restrictions, so "Anyone" = truly anonymous
- The resulting URL will be https://script.google.com/macros/s/.../exec (no /a/domain/ part)

Stage Summary:
- .env configured with user's URL
- Local fallback active: all registrations saved to SQLite regardless of Sheet status
- Awaiting personal-Gmail redeployment URL to enable live Google Sheet sync

---
Task ID: REVAMP-4
Agent: Main (orchestrator)
Task: Test 3rd Google Sheet URL + add CSV backup export

Work Log:
- User sent 3rd URL (still students.isi.ac.id Workspace domain)
- Tested GET (no follow): returns 302 redirect to google.com/a/students.isi.ac.id/ServiceLogin → requires ISI login
- Tested POST (json, text/plain, form-urlencoded): all return 401
- Tested stripped URL (removed /a/domain/): still 401
- Confirmed: Workspace admin policy blocks ALL anonymous access (GET+POST) for /a/students.isi.ac.id/ path
- Updated .env to latest URL (ready once access fixed)
- Re-added /api/registrations/export CSV route as reliable backup
- Added "Panitia — Export Data Pendaftar (CSV)" link in footer
- Lint clean, CSV export tested: returns proper CSV with 4 saved registrations
- Local DB has 4 registrations saved as fallback

Diagnosis confirmed:
- Path /a/macros/students.isi.ac.id/ = Workspace-bound, forces org auth regardless of deploy setting
- Only solution: redeploy Apps Script from personal @gmail.com account → URL becomes /macros/s/.../exec (no /a/domain/)

Stage Summary:
- Web form 100% functional, data saved locally (4 entries)
- CSV export available at /api/registrations/export (link in footer) — can import to Google Sheets manually
- Google Sheet auto-sync blocked by ISI Workspace policy — needs personal Gmail redeploy

---
Task ID: REVAMP-5
Agent: Main (orchestrator)
Task: Faculty cascade (Fakultas→Prodi→Angkatan) + NIM field + Google Sheet fix

Work Log:
- Added FACULTIES structure to data.ts (3 fakultas: FSMR, FSP, FSRD with all prodi)
- Added ANGKATAN array [2019-2025], facultyName() and getProdiList() helpers
- Updated prisma schema: added nim, prodi, angkatan fields + faculty index
- Force-reset DB (lost 4 test rows, acceptable)
- Updated zod schema: faculty=select(id), prodi=select(name), angkatan=select(year), nim=numeric string
- Added refine: prodi must belong to selected faculty
- Updated simple-form.tsx: cascade selects (Fakultas→Prodi disabled until faculty picked, auto-reset on change), NIM input, Angkatan dropdown
- Updated API route: saves nim/prodi/angkatan to DB, sends to Google Sheet payload (faculty name translated)
- Updated CSV export: added NIM, Fakultas, Program Studi, Angkatan columns
- Updated google-sheet.ts comment with new Apps Script doPost code (e.parameter approach)

Google Sheet BREAKTHROUGH:
- Previous URLs blocked (Workspace domain students.isi.ac.id forced login)
- 4th URL (personal Gmail, /macros/s/.../exec) was anonim but 405 on POST
- Diagnosis: Google edge blocks POST bodies starting with `{` (raw JSON)
- Fix: changed backend to send application/x-www-form-urlencoded (URLSearchParams)
- Apps Script reads e.parameter instead of JSON.parse(e.postData.contents)
- Tested: POST returns googleSheet:{forwarded:true} — DATA REACHES SPREADSHEET!

Server stability note:
- Dev server (Turbopack) crashes on first valid POST due to 3s compilation timeout
- Fix: warmup route with GET + invalid POST first, then valid POST works
- Route stays compiled after warmup, subsequent requests fast

Verification:
- Faculty cascade: pick Fakultas Seni Pertunjukan → 11 prodi appear (Teater, Teater Musikal, etc.)
- Pick Teater → prodi selected, form accepts
- NIM field: numeric input, validates min 6 digits
- Angkatan: dropdown 2019-2025
- Full submit: POST 201, DB INSERT with all fields, googleSheet forwarded:true
- CSV export: all 18 columns including new ones, proper escaping

Stage Summary:
- Faculty = cascade select (3 fakultas → prodi → angkatan 2019-2025)
- NIM field added (required, numeric)
- Google Sheet AUTO-SYNC WORKING (forwarded:true)
- CSV export backup also updated with new columns
- Status: COMPLETE & verified
