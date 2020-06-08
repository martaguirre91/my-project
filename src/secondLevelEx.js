class SecondLevelEx extends Game {
  constructor(ctx, city) {
    super(ctx, city)
    this.bg = new Background(ctx, 'river.png')
    this.character = new Character(ctx, 'barqueroc.png')
    this.obstacles = []
  }

  start() {
    console.log(this.ctx)
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      super._move()
      this._addObstacle()
      super._checkCollisions()
      super._clearObstacles()
      super._updateStatusBar()
      this._youWin()
    }, 1000 / 60)
  }

  _draw() {
    this.bg.drawToMove()
    this.character.draw()
    this.obstacles.forEach((el) => el.draw())
  }

  _clear() {
    this.ctx.clearRect(0, 0, 500, 800)
  }
  
  _addObstacle() {
    this.tick++
    if (this.tick > 50) {
      const newObstacle = new ObstacleSec(ctx, this.city)
      this.obstacles.push(newObstacle)
      
      this.tick = 0
    }
  }

  _youWin() {
    if (this.prizeCounter >= 10)
      this._gameOver()
    if (this.collisionCounter >= 10)
      this._gameOver()
  }
}
