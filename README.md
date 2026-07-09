# Ceramica Nova - Prototipo Landing Page

<!-- VERSION-START -->
![Versione](https://img.shields.io/badge/version-v0.4.3-c5a880?style=flat-square)
<!-- VERSION-END -->

Un prototipo di sito web premium e altamente interattivo sviluppato per una SRL di piastrelle e rivestimenti di lusso (**Ceramica Nova**). Il sito include una vetrina per le collezioni di punta e un configuratore/visualizzatore di pavimenti interattivo in tempo reale sviluppato in Vanilla CSS e React.

---

## Caratteristiche del Progetto

- **Design Premium & Immersivo:** Look minimale scuro con dettagli dorati, caratteri tipografici curati (Playfair Display & Outfit) ed effetti di transizione fluidi.
- **Visualizzatore Interattivo:** Un configuratore che simula la posa delle piastrelle in uno showroom, consentendo al cliente di testare diverse combinazioni di materiali (Marmo Statuario, Ardesia Nera, Cotto Rustico) e colori di fuga in tempo reale.
- **Form Contatti Intelligente:** Con convalida dei campi integrata e feedback visivo.
- **Senza Tailwind CSS:** Sviluppato interamente in CSS puro (Vanilla CSS) strutturato all'interno di `src/app/globals.css` per la massima pulizia, prestazioni e flessibilità.

---

## Tecnologie Utilizzate

- **Next.js 16 (App Router)**
- **React 19**
- **Vanilla CSS** (con CSS Custom Properties e animazioni fluide)
- **Node.js** (per lo script di automazione)

---

## Installazione e Avvio Rapido

### 1. Clona il repository e installa le dipendenze
```bash
npm install
```

### 2. Avvia il server di sviluppo locale
```bash
npm run dev
```
Apri [http://localhost:3000](http://localhost:3000) nel browser per visualizzare il sito.

### 3. Compila per la produzione
```bash
npm run build
npm start
```

---

## Registro Versioni (Changelog)

<!-- CHANGELOG-START -->

| Versione | Data | Descrizione | Commit |
| :--- | :--- | :--- | :--- |
| **v0.4.3** | 2026-07-09 | Risolti alcuni bug e sistemato un po' dell'interfaccia grafica | `c59edb4` |
| **v0.4.2** | 2026-07-08 | Risolte alcune cosine | `976dccc` |
| **v0.4.1** | 2026-07-08 | Risolto major issue riguardante il mobile e un po' di spazio bianco accumulato | `c59c1a4` |
| **v0.4.0** | 2026-07-08 | Sistemato un po' tutto il sito per demo navigabilità. | `9b39ca4` |
| **v0.3.0** | 2026-07-07 | Sostituito la hero principale con il video background PrismaHero, tradotto i testi e aggiunto selettore lingua dropdown con bandiere | `bde26a6` |
| **v0.2.0** | 2026-07-07 | Aggiunto componente PrismaHero e rotta /prisma con video stock | `59a3490` |
| **v0.1.1** | 2026-07-07 | Risolto l'overlapping del menu mobile e della badge delle specifiche tecniche nella Hero | `0fb9f8f` |
| **v0.1.0** | 2026-07-07 | Rifatto il design con alternanza di temi scuro/chiaro ad alto contrasto, sistemato le immagini ed email di contatto | `3bc38c0` |
| **v0.0.2** | 2026-07-07 | Sito inizializzato con design minimalista fatto bene | `679cdd1` |
| **v0.0.1** | 2026-07-07 | Inizializzazione progetto Next.js | `4296d49` |
| **v0.0.1** | 2026-07-07 | Inizializzazione progetto Next.js e automazione README | `ff78b0d` |

<!-- CHANGELOG-END -->
