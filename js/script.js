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
const requestedPhotos = 5;
const idRoot = 'myPostit_';

const postitList = document.getElementById('postitList');

const postitZoom = document.getElementById('postit-zoom');
const closeZoomButton = document.getElementById('closeZoomButton');



// #EVENT# OPEN GREYOUT
// const cardClick = document.getElementById('cardClick');

// cardClick.addEventListener('click', () => {
//     postitZoom.classList.remove('d-none');
//     postitZoom.classList.add('d-flex', 'flex-column');
// })


// #EVENT# CLOSE GREYOUT (BUTTON)
closeZoomButton.addEventListener('click', () => {
    postitZoom.classList.add('d-none');
    postitZoom.classList.remove('d-flex', 'flex-column');
})



// #FX# FETCH FUNCTION (ASYNC AWAIT)
const fetchPhotos = async () => {
    // # ASYNC AWAIT FETCH
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?` + new URLSearchParams({_limit: requestedPhotos, _start: 10,}));
    const photoArray = await response.json();
    // console.log(typeof photoArray);
    // console.log(photoArray);
    // console.table(photoArray[0].title);
    return photoArray;
};


// #FX# EXTRACTION FROM FETCH
const printDOM = async () => {
    const extractedPhotos = await fetchPhotos();

    let arrayTitle = [];
    let arrayUrl = [];

    for(let i=0; i < requestedPhotos; i++) {
        arrayTitle.push(extractedPhotos[i].title);
        arrayUrl.push(extractedPhotos[i].url);
    }

    let finalHTML = '';
    let counterVar = 0;

    for (let i=0; i < requestedPhotos; i++) {

        counterVar += 1;

        finalHTML += `
        <div class="col-12 col-md-6 col-lg-4 postit-box" id="${idRoot + (counterVar)}">
            <div class="pinpoint">
                <img src="./img/pin.svg" alt="" class="img-fluid">
            </div>
            <div class="bg-white p-3 h-100" id="cardClick">
                <!-- POSTIT IMG -->
                <div class="mb-2">
                    <img src="${arrayUrl[i]}" alt="" class="img-fluid">
                </div>
                <!-- POSTIT TEXT -->
                <div>
                    <p class="mb-0">
                        ${arrayTitle[i]}
                    </p>
                </div>
            </div>
        </div>
        `;
    }  

    postitList.innerHTML = finalHTML;
};


// Richiamo la funzione al caricamento della pagina
printDOM();