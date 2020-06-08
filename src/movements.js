class Movements {
    constructor(gameElement) {
      this._el = gameElement
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
            this._el.jump()
            break;
          case DOWN_KEY:
            this._el.bend()
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
          case DOWN_KEY:
            this._el.standUp()
            break;
        }
      })
    }
  }