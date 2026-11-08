# KEYTOZ Creative Website

Bilingual (English / Arabic, RTL) mobile-first landing page. Plain HTML, CSS and JavaScript, no build step.

## Run
Open `index.html` in a browser, or serve the folder: `python3 -m http.server 8000` then visit http://localhost:8000.
Fonts (Montserrat, Manrope, IBM Plex Sans Arabic) load from Google Fonts when online; system fonts are used as fallback offline. To self-host, put font files in `assets/fonts/` and add `@font-face` rules.

## Structure
- `index.html` – markup and sections
- `css/style.css` (base + components), `css/animations.css`, `css/responsive.css`
- `js/translations.js` – all EN/AR copy · `js/main.js` – language, lists, menu, filter, form · `js/animations.js` – motion
- `assets/logo/keytoz-mark.svg` – key mark (also the favicon); `assets/images/og-keytoz.jpg` – share image

## Edit before launch
1. **Contact details** – the `<ul class="info">` block in `index.html` and the footer social links (placeholders: email@example.com, wa.me, Instagram, LinkedIn).
2. **Contact form** – in `js/main.js` set `CONTACT_EMAIL`. With no `FORM_ENDPOINT` the form opens the visitor's email app. To send directly, paste a form-service URL (e.g. Formspree) into `FORM_ENDPOINT`.
3. **Portfolio** – add items to the `PROJECTS` array in `js/main.js` (`cat`, `title`, `text`). Categories are in `translations.js` (`cats`).
4. **Team** – photo placeholders and names are in `js/main.js` / `translations.js` (`tn`, `tr`). Replace the placeholder block with `<img>` tags when photos are ready.
5. **Open Graph** – change `og:image` in `index.html` to an absolute URL once the site is hosted.
6. **Logo** – the header/footer wordmark is rebuilt in HTML/SVG from the brand sheets. Swap in your official SVG if you have one.

Motion respects `prefers-reduced-motion`. Magnetic buttons and key tilt are desktop-pointer only.
