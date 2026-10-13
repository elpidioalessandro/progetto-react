# 📰 NYT Clone App
 
## Descrizione
 
NYT Clone è un'applicazione sviluppata in React che permette di consultare le notizie del New York Times in tempo reale utilizzando le API ufficiali NYT. L'interfaccia replica la homepage del giornale: l'utente può navigare tra sezioni (Home, World, Technology, Science, Health, Arts) e cliccare su ogni articolo per vederne i dettagli.
 
Il progetto include un ciclo DevOps completo: containerizzazione con Docker, pipeline CI/CD con GitHub Actions, deploy automatico su Netlify con ambienti separati di staging e produzione, gestione sicura dei secrets e monitoraggio con UptimeRobot e Sentry.
 
## Demo online
 
- Produzione: <https://progetto-react1.netlify.app>
- Staging: <https://staging--progetto-react1.netlify.app>

## Funzionalità
 
- Navigazione tra sezioni di notizie
- Visualizzazione articoli con immagine, titolo e abstract
- Pagina dettaglio articolo
- Gestione stati di caricamento ed errore
- Interfaccia responsive
- Chiave API NYT gestita lato server tramite proxy, mai esposta nel browser

## Tecnologie usate
 
**Applicazione**
 
- React
- Vite
- Axios
- React Router DOM
- Context API
- Express.js (proxy locale)
- Netlify Functions (proxy in produzione)
- NYT Top Stories API

**DevOps**
 
- Docker e Docker Compose
- GitHub Actions
- Netlify
- ESLint
- UptimeRobot
- Sentry

## Architettura
 
```
Browser → /api/news → proxy (Express in locale, Netlify Function online) → API NYT
```
 
Il front end non conosce la chiave API: chiama l'endpoint interno `/api/news`, e il proxy aggiunge la chiave lato server prima di inoltrare la richiesta al New York Times. Il proxy accetta solo le sezioni previste dall'applicazione, così la chiave non può essere usata per chiamare altri endpoint.
 
## Ambienti
 
| Ambiente    | Dove                                   | Quando si aggiorna     |
| ----------- | -------------------------------------- | ---------------------- |
| Development | Docker in locale (`localhost:5173`)    | Durante lo sviluppo    |
| Staging     | `staging--progetto-react1.netlify.app` | Push sul branch `devops` |
| Production  | `progetto-react1.netlify.app`          | Push sul branch `main` |
 
Le modifiche vengono sviluppate e verificate su `devops`, controllate sullo staging e portate in produzione tramite Pull Request verso `main`.
 
## Prerequisiti
 
- Docker Desktop
- Node.js v22+ (solo per l'avvio senza Docker)
- Una chiave API NYT con Top Stories API abilitata, ottenibile su <https://developer.nytimes.com>

## Installazione e avvio
 
**Con Docker (consigliato)**
 
1. Clona la repository: `git clone https://github.com/elpidioalessandro/progetto-react.git`
2. Entra nella cartella del progetto: `cd progetto-react`
3. Crea il file `.env` nella root e aggiungi: `NYT_API_KEY=la_tua_chiave`
4. Avvia i container: `docker compose up --build`
5. Apri il browser su: <http://localhost:5173>
6. Per fermare i container: `docker compose down`

**Senza Docker**
 
1. Installa le dipendenze del front end: `npm install`
2. Installa le dipendenze del server: `cd server && npm install && cd ..`
3. Avvia il proxy in un terminale: `cd server && node --env-file=../.env index.js`
4. Avvia il front end in un secondo terminale: `npm run dev`
5. Apri il browser su: <http://localhost:5173>

## Variabili d'ambiente
 
```
NYT_API_KEY=la_tua_chiave
```
 
| Variabile            | Dove si trova                            | Uso                                   |
| -------------------- | ---------------------------------------- | ------------------------------------- |
| `NYT_API_KEY`        | `.env` locale, variabili segrete Netlify | Chiave API NYT, usata solo dal proxy  |
| `NETLIFY_AUTH_TOKEN` | GitHub Secrets                           | Autenticazione della pipeline su Netlify |
| `NETLIFY_SITE_ID`    | GitHub Secrets                           | Identificativo del sito Netlify       |
| `VITE_SENTRY_DSN`    | GitHub Variables                         | Collegamento a Sentry, attivo solo online |
 
## Pipeline CI/CD
 
Il workflow `.github/workflows/ci.yml` si attiva a ogni push su `main` e `devops` e a ogni Pull Request verso `main`.
 
| Job    | Step                                                        | Quando                                   |
| ------ | ----------------------------------------------------------- | ---------------------------------------- |
| CI     | Installazione dipendenze, lint, build delle immagini Docker | Sempre                                   |
| Deploy | Build del front end, deploy su Netlify                      | Solo sui push e solo se la CI è verde    |
 
- Se il lint fallisce, la pipeline si ferma e il codice non viene deployato
- Sulle Pull Request la pipeline esegue solo i controlli, senza deploy
- Il deploy su `devops` pubblica sullo staging, il deploy su `main` pubblica in produzione

## Strumenti scelti
 
- **GitHub Actions**: il codice è già su GitHub, quindi la pipeline vive accanto al repository senza servizi esterni aggiuntivi
- **Netlify**: hosting gratuito per front end statici e Functions serverless per il proxy, con URL dedicati per lo staging
- **Docker Compose**: avvia front end e proxy con un solo comando in un ambiente identico su qualsiasi macchina
- **UptimeRobot**: controllo della disponibilità ogni 5 minuti con avviso via email
- **Sentry**: tracciamento degli errori JavaScript lato browser, con dati salvati su server europei

## Sicurezza
 
- La chiave API NYT è usata solo lato server e non compare mai nel codice del browser
- Il file `.env` è escluso da Git (`.gitignore`) e dall'immagine Docker (`.dockerignore`); la sua assenza dalla cronologia è stata verificata con `git log --all -- .env`
- Token e identificativi della pipeline sono salvati in GitHub Secrets e non compaiono nei log
- La variabile su Netlify è marcata come segreta
- Il container del proxy non è esposto all'esterno: è raggiungibile solo dal container del front end
- Dipendenze verificate con `npm audit`: 0 vulnerabilità note
- La chiave API esposta nella versione precedente dell'app è stata revocata e sostituita

## Monitoraggio
 
**UptimeRobot** controlla ogni 5 minuti due indirizzi:
 
- `NYT Clone - Sito`: la homepage di produzione
- `NYT Clone - API`: l'endpoint `/api/news?section=home`, che verifica anche il funzionamento del proxy e della chiave NYT

**Sentry** registra gli errori JavaScript degli utenti, separati per ambiente (`staging` o `production`). Non vengono raccolti indirizzi IP né altri dati personali.
 
## Interpretazione degli alert
 
| Alert                               | Significato                                                            | Cosa fare                                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| UptimeRobot: Sito down              | Netlify non raggiungibile o deploy non funzionante                     | Controllare lo stato di Netlify e l'ultimo deploy; se necessario ripubblicare il deploy precedente |
| UptimeRobot: API down, Sito up      | Problema del proxy: chiave NYT scaduta o revocata, limite di richieste NYT superato, variabile mancante | Controllare i log della function su Netlify e la variabile `NYT_API_KEY`                       |
| Sentry: nuova issue in `production` | Errore JavaScript nel browser degli utenti                             | Analizzare messaggio, URL, browser e frequenza; riprodurre in locale; correggere su `devops`   |
| Sentry: picco di eventi dopo un deploy | Regressione introdotta dall'ultimo rilascio                         | Ripubblicare il deploy precedente su Netlify e correggere su `devops`                          |
| Sentry: nuova issue in `staging`    | Errore individuato prima della produzione                              | Non unire la Pull Request verso `main` finché non è risolto                                    |
 
Per verificare il funzionamento di Sentry è possibile simulare un errore aggiungendo `?test-sentry` all'URL del sito.
 
## Comandi utili
 
```
npm run lint            # controllo del codice
npm run build           # build di produzione
docker compose up --build
docker compose down
gh run watch            # segue la pipeline in tempo reale
```
 
## Note
 
- È necessaria una chiave API NYT da ottenere su <https://developer.nytimes.com>
- I dati provengono dall'API Top Stories NYT e si aggiornano in tempo reale
- Il file `.env` non è incluso nella repository per motivi di sicurezza