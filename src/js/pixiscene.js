import * as PIXI from 'pixi.js'
import TweenLite from 'gsap'

class PixiScene {

  constructor() {


    // this.app = new PIXI.Application(600, 500)
    console.log('window.innerWidth: ', window.innerWidth)
    this.app = new PIXI.Application(window.innerWidth, window.innerHeight)
    console.log('document.body: ', document.body)
    document.body.appendChild(this.app.view)

    this.app.stage.interactive = true

    this.container = new PIXI.Container()
    this.app.stage.addChild(this.container)

    // const bg = PIXI.Sprite.from('assets/inspirational-patterns-that-can-be-interpreted-by-sharpsicis-the-art-mosaic-factory-and-be-created-into-a-custom-sharpmosaic.jpg')
    // const bg = PIXI.Sprite.from('assets/Marbled_paper.jpg')
    // const bg = PIXI.Sprite.from('assets/tumblr_nnj1v1T4el1rclv0wo1_500.jpg')
    // const bg = PIXI.Sprite.from('assets/a3de5c91d073253d9b6a31bcc4a20a6d.jpg')
    const texture = PIXI.Texture.from('assets/marble_pattern.jpg')
    const bg = new PIXI.TilingSprite(
        texture,
        this.app.screen.width,
        this.app.screen.height
    );

    this.app.stage.addChild(bg)


    // bg.width = this.app.screen.width * 1.5
    // bg.height = this.app.screen.height * 1.5

    // this.container.x = -300
    // this.container.y = -300

    this.container.addChild(bg)

    this.addDisplacementMap()


  }

  addDisplacementMap() {
    const displacementSprite  = PIXI.Sprite.from('assets/dmaps/2048x2048/ripple.jpg')
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)

    // repeat displacement image (tiles) to fill screen
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT

    // console.log(this);

    this.app.stage.addChild(displacementSprite)

    this.container.filters = [displacementFilter]

    displacementFilter.scale.x = 300
    displacementFilter.scale.y = 300
    displacementSprite.anchor.set(0.5)

    this.app.stage.on('mousedown', onClick)
    this.app.stage.on('mouseup', onMouseUp)

    let animating = true

    function onClick() {
      animating = false
      TweenLite.to( displacementFilter.scale, 1, { x: 0, y: 0 });
    }

    function onMouseUp() {
      TweenLite.to( displacementFilter.scale, 1, { x: Math.sin( 200 ) * 350, y: Math.cos( 200 ) * 350, onComplete: () => { animating = true } });
    }

    this.app.ticker.add(function() {

      if (animating) {
        displacementFilter.scale.x = Math.sin( 200 ) * 350
        displacementFilter.scale.y = Math.cos( 200 ) * 350
        displacementSprite.rotation += 0.0005
      }

    })
  }
}

export { PixiScene as default}
