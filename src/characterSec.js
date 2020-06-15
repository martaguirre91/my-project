class CharacterSec {
  constructor(ctx, char) {
    this._ctx = ctx
    this.char = char
    console.log(this.char)
    this.w = 50
    this.h = 100
    this.h0 = this.h

    this.x = this._ctx.canvas.width * 0.05
    this.y = this._ctx.canvas.height * 0.97 - this.h
    this.y0 = this.y

    this.vx = 0
    this.vy = 0

    this.ax = 0
    this.ay = 0.01

    this._img = new Image()
    this._img.frames = 3
    this._img.frameIndex = 0
    this._img.src = './images/' + this.char

    this._ticks = 0
    new Movements(this, true).init()
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

  drawNoMovement() {
    this._ctx.drawImage(
      this._img,
      0,
      0,
      this._img.width,
      this._img.height,
      this.x,
      this.y,
      100,
      100
    );
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
    if (this.x <= 140) {
      this.x = 140
    }
    if (this.x > this._ctx.canvas.width - this.w - 140) {
      this.x = this._ctx.canvas.width - this.w - 140
    }
  }

  isFloor() {
    return this.y === this.y0
  }

  isBend() {
    return !(this.h === this.h0)
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