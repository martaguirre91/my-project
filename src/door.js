class Door {
    constructor(ctx) {
      this.ctx = ctx;
      this.w = this.ctx.canvas.width
      this.h = this.ctx.canvas.height
      this.x = 0
      this.y = 0
  
      this.vx = -2
  
      this.img = new Image()
      this.img.src = "./images/door.png"
    }
  
    draw() {
      this.ctx.drawImage(this.img, 650, 350, 150, 150)
    }
    
  }