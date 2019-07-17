import * as PIXI from 'pixi.js'
import TweenLite from 'gsap'

class PixiScene {

  constructor() {

    this.speed = 5
    this.angle = 20

    this.size = {
      x: 223,
      y: 236
    }

    // this.app = new PIXI.Application(600, 500)
    this.app = new PIXI.Application(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.app.view)


    this.container = new PIXI.Container()
    this.container.interactive = true
    this.app.stage.addChild(this.container)

    const texture = PIXI.Texture.fromImage('assets/c.svg')
    this.c = new PIXI.Sprite(texture)

    this.container.addChild(this.c)

    this.container.on('pointerdown', this.onClick)



    this.app.ticker.add(() => {

      if ((this.c.x + this.size.x) > this.app.screen.width || this.c.x < 0 ) {
         this.angle = 180 - this.angle
      } else if ((this.c.y + this.size.y) > this.app.screen.height || this.c.y < 0) {
         this.angle = 360 - this.angle
      }

      let radians = this.angle * Math.PI/ 180
      let xunits = Math.cos(radians) * this.speed
      let yunits = Math.sin(radians) * this.speed

      this.c.x += xunits
      this.c.y += yunits
    })
  }

  onClick() {
    console.log('yolo');
  }
}

export { PixiScene as default}
