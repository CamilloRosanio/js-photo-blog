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
const requestedPhotos = 6;
const idRoot = 'myPostit_';

const postitList = document.getElementById('postitList');

const hiddenPostitZoom = document.getElementById('hidden-postit-zoom');
const closeZoomButton = document.getElementById('closeZoomButton');
const zoomImg = document.getElementById('zoomCard_img');
const zoomText = document.getElementById('zoomCard_text');
        


// #EVENT# CLOSE GREYOUT (BUTTON)
closeZoomButton.addEventListener('click', () => {
    hiddenPostitZoom.classList.add('d-none');
    hiddenPostitZoom.classList.remove('d-flex', 'flex-column');
})
hiddenPostitZoom.addEventListener('click', () => {
    hiddenPostitZoom.classList.add('d-none');
    hiddenPostitZoom.classList.remove('d-flex', 'flex-column');
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


let printedCards;

// #FX# PRINT OF THE DOM
const printDOM = async () => {
    const extractedPhotos = await fetchPhotos();

    let finalHTML = '';
    let counterVar = 0;

    for (let i=0; i < requestedPhotos; i++) {

        // ridondante: potevo usare la i
        counterVar += 1;

        finalHTML += `
        <div class="col-12 col-md-6 col-lg-4 postit-box" id="${idRoot + (counterVar)}">
            <div class="pinpoint">
                <img src="./img/pin.svg" alt="" class="img-fluid">
            </div>
            <div class="bg-white p-3 h-100 rounded zoomThisCard">
                <!-- POSTIT IMG -->
                <div class="mb-2">
                    <img src="${extractedPhotos[i].url}" alt="" class="img-fluid" id="${'postImg_' + (counterVar)}">
                </div>
                <!-- POSTIT TEXT -->
                <div>
                    <p class="mb-0" id="${'postText_' + (counterVar)}">
                        ${extractedPhotos[i].title}
                    </p>
                </div>
            </div>
        </div>
        `;
    }  

    postitList.innerHTML = finalHTML;


    /**********************************************************
    | # SOLUZIONE {1} INTERNA ALLA FUNZIONE PRINT DOM
    **********************************************************/

    // printedCards = document.querySelectorAll('#postitList .zoomThisCard');
    
    // console.log(printedCards);


    // // CARDS EVENT LISTENER
    
    // printedCards.forEach((item, index) => {
    //     item.addEventListener("click", () => {
    //         hiddenPostitZoom.classList.remove('d-none');
    //         hiddenPostitZoom.classList.add('d-flex', 'flex-column');

    //         let referenceIndex = index + 1;
    //         console.log(referenceIndex);

    //         referenceImgId = 'postImg_' + referenceIndex;
    //         referenceTextId = 'postText_' + referenceIndex;

    //         const catchedImg = document.getElementById(referenceImgId);
    //         const catchedText = document.getElementById(referenceTextId);

    //         zoomImg.setAttribute('src', catchedImg.getAttribute('src'));
    //         zoomText.innerHTML = catchedText.innerHTML;

    //     });
    // });
};


/**********************************************************
| # SOLUZIONE {1} INTERNA ALLA FUNZIONE PRINT DOM CON RICHIAMO DELL'ULTIMA FUNZIONE DELLA CATENA
**********************************************************/
// Richiamo la funzione di stampa Postits al caricamento della pagina
// printDOM();






/**********************************************************
| # SOLUZIONE {2} TERZA FUNZIONE ESTERNA CHE A CATENA COINVOLGE fetch => printDOM => inizializzazione
**********************************************************/

// funzione init che inizializza tutto a catena rispettando gli AWAITS


const init = async () => {

    // Specifico la funzione ASYNC di cui devo attendere lo svolgimento e i risultati
    await printDOM();

    // Dichiarazione NODES delle cards
    printedCards = document.querySelectorAll('#postitList .zoomThisCard');

    // CARDS EVENT LISTENER
    
    printedCards.forEach((item, index) => {
        item.addEventListener("click", () => {
            hiddenPostitZoom.classList.remove('d-none');
            hiddenPostitZoom.classList.add('d-flex', 'flex-column');

            let referenceIndex = index + 1;
            console.log(referenceIndex);

            referenceImgId = 'postImg_' + referenceIndex;
            referenceTextId = 'postText_' + referenceIndex;

            const catchedImg = document.getElementById(referenceImgId);
            const catchedText = document.getElementById(referenceTextId);

            zoomImg.setAttribute('src', catchedImg.getAttribute('src'));
            zoomText.innerHTML = catchedText.innerHTML;

        });
    });
}




/**********************************************************
| # SOLUZIONE {2} TERZA FUNZIONE ESTERNA CHE A CATENA COINVOLGE fetch => printDOM => inizializzazione
**********************************************************/

// Richiamo la funzione che a catena richiama tutte le ASYNC FUNCTIONS
init();