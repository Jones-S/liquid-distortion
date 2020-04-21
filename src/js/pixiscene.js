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

    this.container = new PIXI.Container()
    this.app.stage.addChild(this.container)

    // create a new Sprite from an image path
    const texture = PIXI.Texture.from('assets/marble_pattern.jpg')

    // // center the sprite's anchor point
    // sprite.anchor.set(0.5);

    // // move the sprite to the center of the screen
    // sprite.x = this.app.screen.width / 2;
    // sprite.y = this.app.screen.height / 2;

    // this.container.addChild(sprite);

    const bg = new PIXI.TilingSprite(
      texture,
      this.app.screen.width,
      this.app.screen.height
    )

    this.container.addChild(bg)

    // Listen for animate update
    this.app.ticker.add((delta) => {
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      texture.rotation += 0.002 * delta;
    });



    // // this.renderer.stage.interactive = true


    // console.log('texture: ', texture)

    // const sprite = new PIXI.Sprite(texture)
    // sprite.anchor.set(0.5)

    // this.container.addChild(sprite)





    // this.container.addChild(bg)

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
