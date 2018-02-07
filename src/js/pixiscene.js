import * as PIXI from 'pixi.js'
import TweenLite from 'gsap'

class PixiScene {

  constructor() {

    const app = new PIXI.Application(800, 600)
    document.body.appendChild(app.view)

    app.stage.interactive = true

    const container = new PIXI.Container()
    app.stage.addChild(container)

    const displacementSprite  = PIXI.Sprite.fromImage('assets/dmaps/512x512/clouds.jpg')
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)

    // repeat displacement image (tiles) to fill screen
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT

    app.stage.addChild(displacementSprite)

    container.filters = [displacementFilter]

    displacementFilter.scale.x = 300
    displacementFilter.scale.y = 300
    displacementSprite.anchor.set(0.5)

    const bg = PIXI.Sprite.fromImage('assets/6.jpg')
    bg.width = app.screen.width * 1.2
    bg.height = app.screen.height * 1.2

    container.addChild(bg)

    app.stage.on('mousedown', onClick)
    app.stage.on('mouseup', onMouseUp)

    let animating = false

    function onClick(eventData) {
      animating = true
    }

    function onMouseUp(eventData) {
      animating = false
      TweenLite.to( displacementFilter.scale, 1, { x: 100, y: 100});
    }

    app.ticker.add(function() {

        if (animating) {
          TweenLite.to( displacementFilter.scale, 1, { x: Math.sin( 200 ) * 350, y: Math.cos( 200 ) * 350});
          displacementSprite.rotation += 0.0005
        }

    })

  }
}

export { PixiScene as default}
