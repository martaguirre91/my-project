const ctx = document.getElementById('canvas').getContext('2d')
let clickResult = []

const gamesToPlay = [
    { name: 'bilbao', img: 'bilbao.png', bg: 'background.png', ch: 'character.png', obs: 'harria.png', pr: 'prize.png', obs2: 'gondolero.png'},
    { name: 'italy', img: 'italia.png', bg: 'duomo8bit.png', ch: 'character.png', obs: 'harria.png', pr: 'prize.png', obs2: 'gondolero.png'}
];

document.getElementById('canvas-wrap').style.display = "none";

window.addEventListener('load', event => {
    let html = '';

    document.querySelector('#choose-game').innerHTML = html;
    html += `<h2>8BIT TRAVELLERS</h2>`;
    gamesToPlay.forEach(g => {
        html += `<div class="board" city-name="${g.name}">`;
        html += `<img class="front" src='./images/${g.img}') no-repeat" onclick="myFunction('${g.name}')"></div>`;
        html += `</div>`;
    });
    html += `<button onclick="goToGame();">PLAY</button>`;
    document.querySelector('#choose-game').innerHTML = html;

});

function myFunction(clickedValue) {
    clickResult = gamesToPlay.filter(city => city.name === clickedValue);
}


function goToGame() {
    const country = clickResult[0]
    if (!country)
        window.alert('Please choose a city');
    else {
        document.getElementById('choose-game').style.display = "none";
        // document.getElementById('canvas-wrap-second-level').style.display = "none";
        document.getElementById('canvas-wrap').style.display = "block";

        const game = new Game(ctx, country)
        game.start()

    }
}