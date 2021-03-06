class Character {
  constructor(ctx, char) {
    this._ctx = ctx
    this.char = char

    this.w = 50
    this.h = 100
    this.h0 = this.h

    this.x = ctx.canvas.width * 0.05
    this.y = ctx.canvas.height * 0.97 - this.h
    this.y0 = this.y

    this.vx = 0
    this.vy = 0

    this.ax = 0
    this.ay = 0.9

    this._img = new Image()
    this._img.frames = 3
    this._img.frameIndex = 0
    this._img.src = './images/' + this.char

    this._ticks = 0
    this.finished = false;

    this._jumpAudio = new Audio('http://www.sonidosmp3gratis.com/sounds/mario-bros-jump')

    new Movements(this, false).init()
  }

  draw() {
    this._ctx.drawImage(
      this._img,
      this._img.frameIndex * this._img.width / this._img.frames,
      0,
      this._img.width / this._img.frames,
      this._img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this._animate()
  }

  move() {
    this.vx += this.ax
    this.vy += this.ay

    this.x += this.vx
    this.y += this.vy

    if (this.y >= this.y0) {
      this.vy = 0
      this.y = this.y0
    }
    if (this.x <= 0) {
      this.x = 0
    }
    if (!this.finished) { // esto es para que el muñeco pueda desaparecer cuando se acaba el nivel
      if (this.x > this._ctx.canvas.width - this.w)
        this.x = this._ctx.canvas.width - this.w
    }
  }

  isFloor() {
    return this.y === this.y0
  }

  isBend() {
    return !(this.h === this.h0)
  }

  jump() {
    if (this.isFloor()) {
      this._jumpAudio.play()
      this.vy -= 15
      this.y -= 10
    }
  }

  bend() {
    if (!this.isBend()) {
      this.h = this.h0 / 2
      this.y += this.h0 / 2
      this.y0 += this.h0 / 2
    }
  }

  standUp() {
    this.h = this.h0
    this.y -= this.h0 / 2
    this.y0 -= this.h0 / 2
  }

  _animate() {
    if (this._ticks++ > 10) {
      this._ticks = 0

      if (!this.isFloor()) {
        this._img.frameIndex = 2
      } else if (++this._img.frameIndex >= this._img.frames) {
        this._img.frameIndex = 0
      }
    }
  }

}