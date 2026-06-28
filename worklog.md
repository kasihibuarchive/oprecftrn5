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
