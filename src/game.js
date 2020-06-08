class Game {
  constructor(ctx, city) {
    this.ctx = ctx
    this.city = city

    this.intervalId = null
    this.tick = 0
    this.bg = new Background(ctx, this.city.bg)
    this.character = new Character(ctx, this.city.ch)
    this.obstacles = []
    this.collisionCounter = 0
    this.prizeCounter = 0
    this.door = new Door(ctx)
    this.progress = document.getElementById('progress');
  }

  start() {
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
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
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
  }

  _youWin() {
    if (this.prizeCounter >= 10)
      this._drawDoor()
    if (this.collisionCounter >= 10)
      this._gameOver()
  }

  _gameOver() {
    this.collisionCounter++
    if (this.collisionCounter >= 50) {

      clearInterval(this.intervalId)
      this.ctx.font = "40px Comic Sans MS"
      this.ctx.textAlign = "center"
      this.ctx.fillText(
        "GAME OVER",
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      )
    }
  }

  _drawDoor() {
    clearInterval(this.intervalId)
    this.door = new Door(ctx)
    this.ctx.font = "40px Comic Sans MS"
    this.ctx.textAlign = "center"
    this.ctx.fillText(
      "YOU WIN",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    )

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
    this.ctx = 0
  }

  _goToNextLevel() {
    document.getElementById('choose-game').style.display = "none";
    document.getElementById('canvas-wrap').style.display = "block";
    canvas.style.width = '500px';
    canvas.style.height = '700px';
    // document.getElementById("canvas-wrap").style.width = "100px";
    document.getElementById("canvas-wrap").style.width = "800px";
    this._initialize()

    const sec = new SecondLevelEx(ctx, this.city)
    sec.start()
  }
}
