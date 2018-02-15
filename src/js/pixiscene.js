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

    this.app.stage.interactive = true

    this.container = new PIXI.Container()
    this.app.stage.addChild(this.container)

    const texture = PIXI.Texture.fromImage('assets/c.svg')
    this.c = new PIXI.Sprite(texture)

    this.container.addChild(this.c)

    this.app.ticker.add(() => {
      console.log('animate');

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

  animate(item) {

  }
}

export { PixiScene as default}
