import * as PIXI from 'pixi.js'

class PixiScene {

  constructor() {

    const app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb})
    document.body.appendChild(app.view)

    const container = new PIXI.Container()
    app.stage.addChild(container)

    // const backgroundImageTexture = new PIXI.Texture.fromImage('assets/6.jpg')
    const backgroundImageSprite  = new PIXI.Sprite.fromImage('assets/6.jpg')

    app.stage.addChild(backgroundImageSprite)

    const displacementSprite  = new PIXI.Sprite.fromImage('assets/dmaps/512x512/crystalize.jpg')
    const displacementFilter  = new PIXI.filters.DisplacementFilter(displacementSprite)

    // app.stage.addChild(displacementFilter)

    container.filters = [displacementFilter]

    // Animate
      requestAnimationFrame(animate);

      function animate() {
          var offset = 2;

          displacementFilter.x += offset;
          displacementFilter.y += offset;

          app.renderer.render(app.stage);
          requestAnimationFrame(animate);
      }


  }

}

export { PixiScene as default};
