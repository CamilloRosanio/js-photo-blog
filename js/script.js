/**********************************************************
| # CONSEGNA
**********************************************************/

/*
Milestone 1
Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: utilizzando soltanto HTML e CSS e riproducendo una singola fotografia (usiamo una qualunque immagine a piacimento)
Milestone 2
Utilizzando Postman, testiamo una chiamata all’endpoint di JSON Placeholder:
https://jsonplaceholder.typicode.com/photos?_limit=6
Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.
Milestone 3
Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto!
Bonus
rendi la pagina responsive, in modo che su mobile e tablet le foto si dispongano man mano una sotto l’altra ed il titolo abbia una dimensione adeguata
*/






/**********************************************************
| # SVOLGIMENTO
**********************************************************/



// Dichiarazione variabili di utilità
const requestedPhotos = 2;
let ApiOutput = [];


// #EVENT# OPEN GREYOUT
const cardClick = document.getElementById('cardClick');

cardClick.addEventListener('click', () => {
    postitZoom.classList.remove('d-none');
    postitZoom.classList.add('d-flex', 'flex-column');
})


// #EVENT# CLOSE GREYOUT (BUTTON)
const postitZoom = document.getElementById('postit-zoom');
const closeZoomButton = document.getElementById('closeZoomButton');


closeZoomButton.addEventListener('click', () => {
    postitZoom.classList.add('d-none');
    postitZoom.classList.remove('d-flex', 'flex-column');
})





// #FX# FETCH FUNCTION (ASYNC AWAIT)
const fetchPhotos = async () => {
    // # ASYNC AWAIT FETCH
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?` + new URLSearchParams({_limit: requestedPhotos, _start: 10,}));
    const photoArray = await response.json();
    console.log(photoArray);
    return photoArray;
};


// #FX# EXTRACTION FROM FETCH
const initData = async () => {
    const extractedPhotos = await fetchPhotos();
    console.log(extractedPhotos);
};


initData();
