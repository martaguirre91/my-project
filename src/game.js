class Game {
  constructor(ctx, city) {
    this.ctx = ctx

    this.w = this.ctx.canvas.width
    this.h = this.ctx.canvas.height
    this.city = city

    this.intervalId = null
    this.tick = 0
    this.bg = new Background(ctx, this.city.bg)
    this.character = new Character(ctx, this.city.ch)
    this.obstacles = []
    this.collisionCounter = 0
    this.prizeCounter = 0

    this.progress = document.getElementById('progress');
    this.progresslife = document.getElementById('progress-life');
  }

  async initGame() {
    this._drawInit();
    await new Promise(r => setTimeout(r, 2000));
    this.start();
  }

  _drawInit() {
    document.getElementById('progress-holder').style.display = 'none'
    var background = new Image();
    background.src = "./images/" + this.city.bg;
    var texto1 = `recoge las ${this.city.prizeName} `
    var texto2 = `y esquiva las ${this.city.obsName}`
    var texto3 = `usando las flechas`

    background.onload = function () {
      ctx.drawImage(background, 0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.font = "15px 'Press Start 2P', cursive"
      ctx.fillRect(ctx.canvas.width / 4, ctx.canvas.height / 2.9, 400, 220)
      ctx.fillStyle = "white";
      ctx.textAlign = "center"
      ctx.fillText(
        texto1,
        ctx.canvas.width / 2,
        ctx.canvas.height / 2
      )
      ctx.fillText(
        texto2,
        ctx.canvas.width / 2,
        ctx.canvas.height / 2 + 50
      )
      ctx.fillText(
        texto3,
        ctx.canvas.width / 2,
        ctx.canvas.height / 2 + 100
      )
    }

  }

  start() {
    document.getElementById('progress-holder').style.display = 'block'
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._addObstacle()
      this._checkCollisions()
      this._clearObstacles()
      this._updateStatusBar()
      this._youWin()
    }, 1000 / 60)
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  _draw() {
    this.bg.draw()
    this.character.draw()
    this.obstacles.forEach((el) => el.draw())
  }

  _move() {
    this.character.move()
    this.obstacles.forEach((el) => el.move())
  }

  _addObstacle() {
    this.tick++
    if (this.tick > 50) {
      const newObstacle = new Obstacle(ctx, this.city)
      this.obstacles.push(newObstacle)
      this.tick = 0
    }
  }

  _clearObstacles() {
    this.obstacles = this.obstacles.filter(el => el.isVisible())
  }

  _checkCollisions() {
    for (let i = 0; i < this.obstacles.length; i++) {
      if (
        (this.character.x + this.character.w > this.obstacles[i].x
          && this.character.x < this.obstacles[i].x + this.obstacles[i].wx)
        && (this.character.y < this.obstacles[i].y + this.obstacles[i].hx
          && this.character.y >= this.obstacles[i].y)) {
        this.obstacles[i]
        this.obstacles[i].obstacleType.includes('prize') ? this._prizeCollision() : this._objectCollision()
      }
    }
  }

  _prizeCollision() {
    this.prizeCounter++
  }

  _objectCollision() {
    this.collisionCounter++
  }

  _updateStatusBar() {
    this.progress.style.width = this.collisionCounter * 2 + '%';
    this.progresslife.style.width = this.prizeCounter * 2 + '%';
  }

  _youWin() {
    if (this.prizeCounter >= 50) {
      this.character.finished = true;
      this._drawDoor()
    }
    if (this.collisionCounter >= 50)
      this._gameOver()
  }

  _gameOver() {
    clearInterval(this.intervalId)
    this.door = new Door(ctx, './images/gameOver.png')

    this.intervalId = setInterval(() => {
      this.door.draw()

    }, 1000 / 60)

  }

  _drawDoor() {
    clearInterval(this.intervalId)
    this.door = new Door(ctx, './images/levelUp.png')

    this.intervalId = setInterval(() => {
      this._clear()
      this._drawNextLevel()
      if (this.character.x < this.ctx.canvas.width) {
        this.character.x += 5
        this.character.jump()
        this._moveToNextLevel()
      }
      else
        this._goToNextLevel()

    }, 1000 / 60)
  }

  _drawNextLevel() {
    this.bg.draw()
    this.door.draw()
    this.character.draw()
  }

  _moveToNextLevel() {
    this.character.move()
  }

  _initialize() {
    this.intervalId = null
    this.tick = 0
    this.obstacles = []
    this.collisionCounter = 0
    this.prizeCounter = 0
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  _goToNextLevel() {
    clearInterval(this.intervalId)
    canvas.style.width = '500px';
    canvas.style.height = '700px';
    document.getElementById('canvas-wrap').style.width = '500px'
    document.getElementById('canvas-wrap').style.height = '700px'
    document.getElementById('canvas-wrap').style.margin = '0 auto'
    this._initialize()
    const sec = new SecondLevelEx(this.ctx, this.city)
    sec.start()
  }
}