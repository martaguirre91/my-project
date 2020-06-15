class Movements {
  constructor(gameElement, secondLevel) {
    this._el = gameElement
    this.secondLevel = secondLevel
    console.log(this.secondLevel)
  }

  init() {
    document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case RIGHT_KEY:
          this._el.vx = 5
          break;
        case LEFT_KEY:
          this._el.vx = -5
          break;
        case TOP_KEY:
          this.secondLevel ? this._el.vy = -2 : this._el.jump()
          break;
        case DOWN_KEY:
          this.secondLevel ? this._el.vy = 4 : this._el.bend()
          break;
      }
    })

    document.addEventListener('keyup', (event) => {
      switch (event.keyCode) {
        case RIGHT_KEY:
          this._el.vx = 0
          break;
        case LEFT_KEY:
          this._el.vx = 0
          break;
        case TOP_KEY:
          if(this.secondLevel) this._el.vy = 0
          break;
        case DOWN_KEY:
          this.secondLevel ? this._el.vy = 0 : this._el.standUp()
          break;
      }
    })
  }
}