import * as PIXI from 'pixi.js'
import TweenLite from 'gsap'

class PixiScene {

  constructor() {


    // this.app = new PIXI.Application(600, 500)
    this.app = new PIXI.Application(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.app.view)

    this.app.stage.interactive = true

    this.container = new PIXI.Container()
    this.app.stage.addChild(this.container)

    const texture = PIXI.Texture.fromImage('assets/c.svg')
    this.c = new PIXI.Sprite(texture)

    this.container.addChild(this.c)

    this.app.ticker.add(this.animate(this.c))

    this.app.ticker.start()
  }

  animate(item) {
    console.log('animate');
    item.x += 1
  }
}

export { PixiScene as default}
