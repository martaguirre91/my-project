class SecondLevelEx extends Game {
  constructor(ctx, city) {
    super(ctx, city)
    this.bg = new Background(ctx, 'river.png')
    this.character = new CharacterSec(ctx, city.ch2)
    this.obstacles = []

  }

  start() {
    this.intervalId = setInterval(() => {
      this._clearS()
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
    if (this.city.name =='NOLA')
      this.character.drawNoMovement()
    else this.character.draw()
    this.obstacles.forEach((el) => el.draw())
  }

  _clearS() {
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
