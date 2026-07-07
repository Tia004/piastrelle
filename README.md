# Ceramica Nova - Prototipo Landing Page

<!-- VERSION-START -->
![Versione](https://img.shields.io/badge/version-v0.0.1-c5a880?style=flat-square)
<!-- VERSION-END -->

Un prototipo di sito web premium e altamente interattivo sviluppato per una SRL di piastrelle e rivestimenti di lusso (**Ceramica Nova**). Il sito include una vetrina per le collezioni di punta e un configuratore/visualizzatore di pavimenti interattivo in tempo reale sviluppato in Vanilla CSS e React.

---

## 💎 Caratteristiche del Progetto

- **Design Premium & Immersivo:** Look minimale scuro con dettagli dorati, caratteri tipografici curati (Playfair Display & Outfit) ed effetti di transizione fluidi.
- **Visualizzatore Interattivo:** Un configuratore che simula la posa delle piastrelle in uno showroom, consentendo al cliente di testare diverse combinazioni di materiali (Marmo Statuario, Ardesia Nera, Cotto Rustico) e colori di fuga in tempo reale.
- **Form Contatti Intelligente:** Con convalida dei campi integrata e feedback visivo.
- **Senza Tailwind CSS:** Sviluppato interamente in CSS puro (Vanilla CSS) strutturato all'interno di `src/app/globals.css` per la massima pulizia, prestazioni e flessibilità.

---

## 🛠️ Tecnologie Utilizzate

- **Next.js 16 (App Router)**
- **React 19**
- **Vanilla CSS** (con CSS Custom Properties e animazioni fluide)
- **Node.js** (per lo script di automazione)

---

## 📦 Installazione e Avvio Rapido

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

## 📈 Regole di Commit e Versionamento Automatico

Le versioni del progetto seguono lo standard `n.n.n` (SemVer) divise in:
1. **Versione Major** (cambiamenti strutturali importanti)
2. **Nuova Funzione / Feature** (nuove funzionalità o sezioni)
3. **Bug Fix / Patch** (correzioni o piccoli ritocchi)

### Formato dei Commit
Ogni push o commit di rilascio deve avere un messaggio strutturato nel seguente modo:
`vn.n.n - [Inserisci cambiamenti]`

*Esempio:*
`v1.2.4 - Nuovi strumenti e bug fix generali`

### Aggiornamento Automatico del README
Il file `README.md` (questo file) viene aggiornato automaticamente ad ogni **push** tramite una GitHub Action, oppure può essere aggiornato localmente eseguendo:

```bash
npm run update-readme
```

Lo script estrarrà la cronologia dei commit che corrispondono al pattern e aggiornerà sia il badge della versione in alto sia la tabella del registro versioni (changelog) qui sotto.

---

## Registro Versioni (Changelog)

<!-- CHANGELOG-START -->

| Versione | Data | Descrizione | Commit |
| :--- | :--- | :--- | :--- |
| **v0.0.1** | 2026-07-07 | Inizializzazione progetto Next.js e automazione README | `f026e48` |

<!-- CHANGELOG-END -->
