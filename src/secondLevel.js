class SecondLevel {
  constructor(ctx, city) {
    this.city = city
    this.tick = 0
    this.ctx = ctx
    this.intervalId = null
    this.obstacles = []
    this.bg = new Background(ctx, 'river.png')
    this.character = new Character(ctx, 'barqueroc.png')
    this.prizeCounter = 0
    this.collisionCounter = 0

  }

  start() {
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._addObstacle()
      this._clearObstacles()
      this._checkCollisions()
    }, 1000 / 60)
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    this.bg.drawToMove()
    this.character.draw()
    this.obstacles.forEach((el) => el.draw())

  }

  _move() {
    this.bg.move()
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
            console.log("COLLISION")
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
    if (this.prizeCounter >= 10) {
      clearInterval(this.intervalId)
      this.ctx.font = "40px Comic Sans MS"
      this.ctx.textAlign = "center"
      this.ctx.fillText(
        "GAME OVER",
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      )
    }
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

}
