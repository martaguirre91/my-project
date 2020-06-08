class ObstacleSec extends Obstacle {
    constructor(ctx, city) {
        super (ctx, city)
        this.vy = 1
        this._imgRandomName = ['./images/' + this.city.obs2, './images/' + this.city.pr]
        this.obstacleType = this._imgRandomName[Math.floor(Math.random() * this._imgRandomName.length)]
        this._img.src = this.obstacleType
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


}
