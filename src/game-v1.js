class GameV1 {
    constructor(ctx) {
      this.ctx = ctx
      this.intervalId = null
      this.tick = 0
  
      this.bg = new Background(ctx)
      this.character = new Character(ctx)
      this.obstacles = []
      this.collisionCounter = 0
      this.door = new Door(ctx)
      this.progress = document.getElementById('progress');
      this.prizes = []
      this.prize = new Prize(ctx)
      this.prizeCounter = 0
      this.tickP = 0
    }
  
    start() {
      this.intervalId = setInterval(() => {
        this._clear()
        this._draw()
        this._move()
        this._addObstacle()
        this._checkCollisions()
        this._clearObstacles()
        // this._addPrize()
        // this._checkPrizeCollisions()
        // this._clearPrize()
        this._updateStatusBar()
        if (this._youWin()){
          console.log("win")
          this._drawDoor()
          
        }
        
      }, 1000 / 60)
    }
  
    _clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }
  
    _draw() {
      this.bg.draw()
      this.character.draw()
      this.obstacles.forEach((el) => el.draw())
      // this.prizes.forEach((el) => el.draw())
  
    }
  
    _move() {
      this.character.move()
      this.obstacles.forEach((el) => el.move())
      // this.prizes.forEach((el) => el.move())
  
    }
  
    _addObstacle() {
      this.tick++
      if (this.tick > 50) {
        const newObstacle = new Obstacle(ctx)
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
              this.obstacles[i]._img.src.includes('prize') ? this.prizeCounter++ : this.collisionCounter++
              //this._gameOver()
        }
      }
    }
  
    // _addPrize() {
    //   this.tickP++
    //   if (this.tickP > 50) {
    //     const newPrize = new Prize(ctx)
    //     this.prizes.push(newPrize)
    //     this.tickP = 0
    //   }
    // }
    
    // _clearPrize() {
    //   this.prizes = this.prizes.filter(el => el.isVisible())
    // }
  
    // _checkPrizeCollisions() {
    //   for (let i = 0; i < this.prizes.length; i++) {
    //     if (
    //       (this.character.x + this.character.w > this.prizes[i].x
    //         && this.character.x < this.prizes[i].x + this.prizes[i].wx)
    //       && (this.character.y < this.prizes[i].y + this.prizes[i].hx
    //         && this.character.y >= this.prizes[i].y)) {
    //       this.prizeCounter++
    //     }
    //   }
    // }
  
    _updateStatusBar() {
      this.progress.style.width = this.collisionCounter * 2 +'%';
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
    
    _youWin() {
      if (this.prizeCounter >= 10)
        this._drawDoor()
      if (this.collisionCounter >= 10)
        this._gameOver()
    }
  
    _drawDoor() {
      clearInterval(this.intervalId)
      this.ctx.font = "40px Comic Sans MS"
        this.ctx.textAlign = "center"
        this.ctx.fillText(
          "YOU WIN",
          this.ctx.canvas.width / 2,
          this.ctx.canvas.height / 2
        )
    }
  
    
  }
  