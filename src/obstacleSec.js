class ObstacleSec extends Obstacle {
    constructor(ctx, city) {
        super (ctx, city)
        const max = this.ctx.canvas.width -150
        const min = 150
        this.x= Math.floor(Math.random() * (max - min + 1) + min);
        this.vy = 1
        this._imgRandomName = ['./images/' + this.city.obs2, './images/' + this.city.pr2]
        this.obstacleType = this._imgRandomName[Math.floor(Math.random() * this._imgRandomName.length)]
        this._img.src = this.obstacleType
    }
}
