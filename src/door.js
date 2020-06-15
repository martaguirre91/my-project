class Door {
    constructor(ctx, imName) {
      this.ctx = ctx;
      this.imName = imName
      this.w = this.ctx.canvas.width
      this.h = this.ctx.canvas.height
      
      this.img = new Image()
      this.img.src = this.imName
    }
  
    draw() {
      this.ctx.drawImage(this.img, this.w/2 - 75, this.h/2 -100, 200, 200)
    }
  }