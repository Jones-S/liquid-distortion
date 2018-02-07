import * as PIXI from 'pixi.js'

class PixiScene {

  constructor() {

    var app = new PIXI.Application(800, 600);
    document.body.appendChild(app.view);

    app.stage.interactive = true;

    var container = new PIXI.Container();
    app.stage.addChild(container);

    var padding = 100;
    var bounds = new PIXI.Rectangle(
        -padding,
        -padding,
        app.screen.width + padding * 2,
        app.screen.height + padding * 2
    );

    const displacementSprite  = PIXI.Sprite.fromImage('assets/dmaps/512x512/clouds.jpg')
    var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

    app.stage.addChild(displacementSprite);

    container.filters = [displacementFilter];

    displacementFilter.scale.x = 150;
    displacementFilter.scale.y = 150;
    displacementSprite.anchor.set(0.5);

    var bg = PIXI.Sprite.fromImage('assets/6.jpg');
    bg.width = app.screen.width;
    bg.height = app.screen.height;

    container.addChild(bg);

    app.stage
        .on('mousemove', onPointerMove)
        .on('touchmove', onPointerMove);

    function onPointerMove(eventData)
    {
        displacementSprite.position.set(eventData.data.global.x - 25, eventData.data.global.y);
    }

    var count = 0;

    app.ticker.add(function() {

        count += 0.05;

    });

  }
}

export { PixiScene as default};
