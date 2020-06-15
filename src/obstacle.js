class Obstacle {
    constructor(ctx, city) {
        this.ctx = ctx
        this.city = city

        this.w = this.ctx.canvas.width
        this.h = this.ctx.canvas.height

        this.x = Math.floor(Math.random() * (this.w - this.h * 0.001 + 1)) + this.h * 0.001
        this.y = 0

        this.wx = 50
        this.hx = 50

        this.vx = 0
        this.vy = 5

        this.ax = 0
        this.ay = 0

        this._img = new Image()

        this._imgRandomName = [ './images/'+this.city.obs, './images/'+this.city.pr]

        this.obstacleType = this._imgRandomName[Math.floor(Math.random() * this._imgRandomName.length)]
        this._img.src = this.obstacleType
    }

    draw() {
        this.ctx.drawImage(
            this._img,
            this.x,
            this.y,
            this.wx,
            this.hx
        )
    }

    move() {
        this.y += this.vy
    }

    drawSecond() {
        ctx.fillRect(
          this.x,
          this.y,
          this.x1,
          50);
      }

    moveSecond() {
        this.y += this.vy

        if (this.y - this.h >= 0) {
            this.x = Math.floor(Math.random() * (this.w - this.h * 0.1 + 1)) + this.h * 0.1
            this.y = 0
        }

        if (this.y <= 0) {
            this.x1 = Math.floor(Math.random() * 300)
        }
    }

    isVisible() {
        return (
            this.y < this.ctx.canvas.height * 2 &&
            this.y > -this.ctx.canvas.height
        )
    }

}
