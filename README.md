# Emelinn Heikkinen — Tattoo (minimal)

En ren, minimalistisk hemsida för en tatuerare. Galleri-känsla, mycket luft, nästan helt monokrom. Sidan är informativ — den förklarar hur man bokar och länkar sedan till Instagram eller mejl. Det finns inget bokningsformulär.

## Kom igång
```bash
npm install
npm start
```
Öppna http://localhost:3000

## Bygg för produktion
```bash
npm run build
```
Lägg upp `build/`-mappen på Netlify, Vercel eller annan static host.

---

## Anpassa

**Kontaktuppgifter** — Instagram (`@emelinn`) och mejladress sätts i `Book`-komponenten i `src/App.jsx`.

**Lägg till riktiga bilder** — work-sektionen visar minimala SVG-streckmärken som standard. Vill du visa riktiga foton istället, ersätt `MARK[...]` i `work__card-frame` med en `<img>` per piece, t.ex.:
```jsx
<img src={`/images/${PIECES[active].mark}.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />
```
Lägg bilderna i `public/images/`.

**Ofyllda detaljer** — några uppgifter (väntetid, minimipris) är markerade med `[ hakparenteser ]` i About-sektionen — sök efter `placeholder` i `src/App.jsx` och fyll i de riktiga siffrorna.

**Färger** (`src/App.css`, `:root`):
```css
--paper: #F7F5F0;  /* bakgrund */
--ink:   #17161B;  /* text */
--ash:   #837E76;  /* sekundär text */
--dark:  #1A191E;  /* boka-sektion */
```

**Typsnitt** — laddas från Google Fonts i `public/index.html` (Bricolage Grotesque + Inter + Space Mono).

## Struktur
```
tattoo-site/
├── public/index.html
├── src/
│   ├── App.jsx   ← alla komponenter
│   ├── App.css   ← all stil
│   └── index.js
├── package.json
└── README.md
```
