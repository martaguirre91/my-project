let clickResult = []
const main = document.getElementById('main')
this.game;
const gamesToPlay = [
    { name: 'Bilbao', img: 'vasco.png', bg: 'background.png', ch: 'character.png', ch2: 'barqueroc.png', obs: 'stone.png', obsName: 'piedras', pr: 'prize.png', prizeName: 'monedas', obs2: 'barca.png', pr2: 'prize.png' },
    { name: 'Milano', img: 'cocinero.png', bg: 'duomo8bit.png', ch: 'character_it.png', ch2: 'barquero_it.png', obs: 'stone.png', obsName: 'piedras', pr: 'pizza_prize.png', prizeName: 'pizzas', obs2: 'gondolero.png', pr2: 'prize.png' },
    { name: 'Viena', img: 'mujer.png', bg: 'duomo8bit.png', ch: 'character.png', ch2: 'barqueroc.png', obs: 'stone.png', obsName: 'piedras', pr: 'prize.png', prizeName: 'monedas', obs2: 'gondolero.png', pr2: 'prize.png' },
    { name: 'NOLA', img: 'negros.png', bg: 'nola.png', ch: 'character_nola.png', ch2: 'barco_nola.png', obs: 'stone.png', obsName: 'piedras', pr: 'prize.png', prizeName: 'monedas', obs2: 'stone.png', pr2: 'prize.png' }

];

window.addEventListener('load', event => {
    let html = '';

    document.querySelector('#choose-game').innerHTML = html;
    html += `<div class="grid">`
    html += `<div class ="row align-items-center">`
    html += `<div class= "col-6"><h2>8BIT TRAVELLERS</h2></div>`;
    gamesToPlay.forEach(g => {
        html += `<div class="col-1">`

        html += `<div class="center"><img front" src='./images/${g.img}') no-repeat" onclick="myFunction('${g.name}')">`;
        html += `<p class="board-name" city-name="${g.name}">${g.name}`;
        html += `</div></div>`;
    });
    html += `</div>`
    html += `<div class="row justify-content-center"><div class="col-md-3"> <button class="btn btn-block" onclick="goToGame();">PLAY</button></div></div></div>`;
    document.querySelector('#choose-game').innerHTML = html;

});

function myFunction(clickedValue) {
    clickResult = gamesToPlay.filter(city => city.name === clickedValue);
}


function goToGame() {
    const country = clickResult[0]

    main.innerHTML = `
    <img id ="TurnButton" src='./images/arrow.png' no-repeat" onClick="window.location.reload();">

    <div id="canvas-wrap">
    <canvas id="canvas" width="800" height="500"></canvas>

    <div class="progress-bar ">
      <div id="progress-holder">
        <div id="progress"></div>
        <div id="progress-life"></div>
      </div>
    </div>
  </div>
    `

    if (!country)
        window.alert('Please choose a city');
    else {
        document.getElementById('TurnButton').style.display = "block";
        document.getElementById('choose-game').style.display = "none";
        document.getElementById('canvas-wrap').style.display = "block";
        document.getElementById('canvas-wrap').style.width = '800px'
        document.getElementById('canvas-wrap').style.height = '500px'
        document.getElementById('canvas-wrap').style.margin = '0 auto'
        this.ctx = document.getElementById('canvas').getContext('2d')
        this.game = new Game(this.ctx, country)
        this.game.initGame()

    }
}
