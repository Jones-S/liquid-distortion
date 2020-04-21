import * as PIXI from 'pixi.js'
import TweenLite from 'gsap'

class PixiScene {

  constructor() {

    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1,
    })

    document.body.appendChild(this.app.view)

    console.log('this.app.view: ', this.app.view)

    this.container = new PIXI.Container()
    this.app.stage.addChild(this.container)

    // create a new Sprite from an image path
    const texture = PIXI.Texture.from('assets/marble_pattern.jpg')

    const bg = new PIXI.TilingSprite(
      texture,
      this.app.screen.width,
      this.app.screen.height
    )

    console.log('this.bg: ', this.bg)

    this.container.addChild(bg)

    console.log('this.container: ', this.container)

    this.addDisplacementMap()
  }

  addDisplacementMap() {
    const displacementSprite  = PIXI.Sprite.from('assets/dmaps/2048x2048/ripple.jpg')

    console.log('displacementSprite: ', displacementSprite)
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)

    console.log('displacementFilter: ', displacementFilter)

    // repeat displacement image (tiles) to fill screen
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT

    // console.log(this);

    this.app.stage.addChild(displacementSprite)

    this.container.filters = [displacementFilter]

    displacementFilter.scale.x = 300
    displacementFilter.scale.y = 300
    displacementSprite.anchor.set(0.5)

    this.app.stage.on('mousedown', this.onClick)
    this.app.stage.on('mouseup', this.onMouseUp)

    let animating = true

    console.log('animating: ', animating)

    this.app.ticker.add(function() {

      if (animating) {
        displacementFilter.scale.x = Math.sin( 200 ) * 350
        displacementFilter.scale.y = Math.cos( 200 ) * 350
        displacementSprite.rotation += 0.0005
      }

    })
  }

  onClick() {
    animating = false
    TweenLite.to(displacementFilter.scale, 1, {
      x: 0,
      y: 0
    })
  }

  onMouseUp() {
    TweenLite.to(displacementFilter.scale, 1, {
      x: Math.sin(200) * 350,
      y: Math.cos(200) * 350,
      onComplete: () => {
        animating = true
      }
    })
  }
}

export { PixiScene as default}
