# 📰 NYT Clone App

## Descrizione
NYT Clone è un'applicazione sviluppata in React che permette di consultare le notizie del New York Times in tempo reale utilizzando le API ufficiali NYT. L'interfaccia replica la homepage del giornale: l'utente può navigare tra sezioni (Home, World, Technology, Science, Health, Sports, Arts) e cliccare su ogni articolo per vederne i dettagli.

## Demo online
Link: https://progetto-react1.netlify.app

## Screenshot
<img width="1440" height="795" alt="Screenshot 2026-04-18 alle 14 09 39" src="https://github.com/user-attachments/assets/06443a8c-bea5-425d-9f6b-9ba9675e4f36" />


## Funzionalità
* Navigazione tra sezioni di notizie
* Visualizzazione articoli con immagine, titolo e abstract
* Pagina dettaglio articolo
* Gestione stati di caricamento ed errore
* Interfaccia responsive

## Tecnologie usate
* React
* Vite
* Axios
* React Router DOM
* Context API
* NYT Top Stories API

## Installazione e avvio
1. Clona la repository: `git clone https://github.com/elpidioalessandro/progetto-react.git`
2. Entra nella cartella del progetto: `cd progetto-react`
3. Installa le dipendenze: `npm install`
4. Crea il file `.env` nella root e aggiungi: `VITE_NYT_API_KEY=la_tua_chiave`
5. Avvia il progetto: `npm run dev`
6. Apri il browser su: http://localhost:5173/

## Note
* È necessaria una chiave API NYT da ottenere su https://developer.nytimes.com
* I dati provengono dall'API Top Stories NYT e si aggiornano in tempo reale
