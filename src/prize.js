class Prize { // Esto no sé si hacerlo así 
    constructor(ctx) {
        this.ctx = ctx

        this.w = this.ctx.canvas.width
        this.h = this.ctx.canvas.height

        // this.x = Math.floor(Math.random() * (this.w - this.hx + 1)) + this.hx
        this.x = Math.floor(Math.random() * (this.w - this.h * 0.001 + 1)) + this.h * 0.001
        this.y = 0

        this.wx = 50
        this.hx = 50

        this.vx = 0
        this.vy = 5

        this.ax = 0
        this.ay = 0

        this._img = new Image()
        this._img.src = './images/prize.png'

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
    isVisible() {
        return (
            this.y < this.ctx.canvas.height * 2 &&
            this.y > -this.ctx.canvas.height
        )
    }

}
