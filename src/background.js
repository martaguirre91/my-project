class Background {
    constructor(ctx, city) {
      this.city = city
      this.ctx = ctx;
      this.w = this.ctx.canvas.width
      this.h = this.ctx.canvas.height
      this.x = 0
      this.y = 0
  
      this.vx = -2
      this.vy = 2 // añadido para second level
  
      this.img = new Image()
      this.img.src = "./images/" + this.city
    }
  
    draw() {
      this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    drawToMove() {
      this.ctx.drawImage(
        this.img, 
        this.x,
        this.y,
        this.w,
        this.h);
  
        this.ctx.drawImage(
          this.img, 
          this.x,
          this.y - this.h,
          this.w,
          this.h);
    }

    move() {
      this.y += this.vy
      this.y - this.h >= 0 ? this.y = 0: this.y = this.y
      
    }
    
  }