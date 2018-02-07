import * as PIXI from 'pixi.js'

class PixiScene {

  constructor() {

    const app = new PIXI.Application(800, 600);
    document.body.appendChild(app.view);

    app.stage.interactive = true;

    const container = new PIXI.Container();
    app.stage.addChild(container);

    const displacementSprite  = PIXI.Sprite.fromImage('assets/dmaps/512x512/clouds.jpg')
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

    // repeat displacement image (tiles) to fill screen
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    app.stage.addChild(displacementSprite);

    container.filters = [displacementFilter];

    // displacementFilter.scale.x = 1;
    // displacementFilter.scale.y = 1;
    displacementSprite.anchor.set(0.5);

    const bg = PIXI.Sprite.fromImage('assets/6.jpg');
    bg.width = app.screen.width * 2;
    bg.height = app.screen.height * 2;

    container.addChild(bg);

    app.stage.on('mousedown', onClick)
    app.stage.on('mouse', onClick)

    let animating = false;

    function onClick(eventData) {
      animating = true;
        // let mouseX = eventData.data.global.x
        // let mouseY = eventData.data.global.y
        // // TweenMax.to( displacementFilter.scale, 1, { x: "+=" + Math.sin( mouseX ) * 1200 + "", y: "+=" + Math.cos( mouseY ) * 200 + ""  });
        // displacementFilter.scale.x = mouseX
        // displacementFilter.scale.y = mouseX
    }

    app.ticker.add(function() {

        if (animating) {
          displacementFilter.scale.x = displacementFilter.scale.x + 7
        }

    });

  }
}

export { PixiScene as default};
