const page = document.querySelector('.page');

let gameTurn = {
    firstChosen : null,
    firstChosenCard : null,
    turnNum : 0,
    pairsfound : 0,
    cardsNum : 12
};

(() => {
    document.querySelector('.start-btn').addEventListener('click', startGame);
})()

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createCardsPairsArr(cardsNum) {
    let arr = [];

    for (let i = 0; i < cardsNum / 2; i++) {
         arr.push(i);
         arr.push(i);
    }

    // Randomize array
    shuffleArray(arr);

    return arr;
}

function createCardsDivs(cardsWarpperDivs, cardsPairsArray) {
    cardsWarpperDivs.classList.add('cards-divs-warpper');
    console.log(cardsPairsArray)

    // for every element in the card array create a vid
    cardsPairsArray.forEach((element) => {
        let c = document.createElement('div');
        c.classList.add('flip-card');
        c.setAttribute("id", `card-${element}`);
        c.innerHTML =
        `<div class="flip-card-front">
         </div>
         <div class="flip-card-back">${element}</div>`;
        cardsWarpperDivs.appendChild(c);
    });
    // upload all cards
    document.querySelector('.cards-table').appendChild(cardsWarpperDivs);
}

function clickOnCardHandler() {
    if (event.target.className !== 'flip-card-back') {
        if (gameTurn.firstChosenCard === null) {
            // save the card
            gameTurn.firstChosen = event.target.parentElement;
            gameTurn.firstChosenCard = gameTurn.firstChosen.children[1].innerText;
            // turn the card
            console.log(gameTurn)
            gameTurn.firstChosen.children[0].style.display = 'none';
            gameTurn.firstChosen.children[1].style.display = 'inline-block';
        } else {
            // save the card
            let secondChosen = event.target.parentElement;
            let secondChosenCard = secondChosen.children[1].innerText;
            // turn the card
            console.log(secondChosenCard)
            secondChosen.children[0].style.display = 'none';
            secondChosen.children[1].style.display = 'inline-block';
            gameTurn.turnNum++;

            // check if equal
            if (gameTurn.firstChosenCard !== secondChosenCard) {
                // wait a second
                setTimeout(() => {
                    gameTurn.firstChosen.children[1].style.display = 'none';
                    gameTurn.firstChosen.children[0].style.display = 'inline-block';
                    secondChosen.children[1].style.display = 'none';
                    secondChosen.children[0].style.display = 'inline-block';
                    gameTurn.firstChosen = null;
                    gameTurn.firstChosenCard = null;
                }, 1000)
            } else {
                gameTurn.pairsfound++;
                if (gameTurn.pairsfound === gameTurn.cardsNum / 2) {
                    let temp = document.createElement('h1');
                    temp.innerText = "you won!";
                    document.querySelector('.bar').appendChild(temp);
                    temp = document.createElement('button');
                    temp.innerText = "play again?";
                    document.querySelector('.bar').appendChild(temp);
                }
                gameTurn.firstChosen = null;
                gameTurn.firstChosenCard = null;
            }
        }

    }
}

function startGame() {
    
    // delete text and create the 2 main divs
    page.innerHTML = 
    `<div class="game-page">
        <div class="bar"></div>
        <div class="cards-table"></div>   
    </div>`;

    // create the cards array
    const cardsPairsArray = createCardsPairsArr(gameTurn.cardsNum);
    console.log(cardsPairsArray)

    // create the cards divs
    const cardsWarpperDivs = document.createElement('div');
    createCardsDivs(cardsWarpperDivs, cardsPairsArray);

    // add event listeners
    cardsWarpperDivs.addEventListener('click', clickOnCardHandler);
}