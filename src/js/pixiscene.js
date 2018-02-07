import * as PIXI from 'pixi.js'

class PixiScene {

  constructor() {
    const renderer            = new PIXI.autoDetectRenderer();
    const stage               = new PIXI.Container();
    const slidesContainer     = new PIXI.Container();
    const displacementSprite  = new PIXI.Sprite.fromImage( 'img/dmaps/512x512/clouds.jpg' );
    const displacementFilter  = new PIXI.filters.DisplacementFilter( displacementSprite );

    // Add canvas to the HTML
    document.body.appendChild( renderer.view );

    // Add child container to the stage
    stage.addChild( slidesContainer );

    // Set the filter to stage
    stage.filters = [displacementFilter];

    // We load the sprites to the slides container and position them at the center of the stage
    // The sprites array is passed to our component upon its initialization
    // If our slide has text, we add it as a child to the image and center it
    function loadPixiSprites( sprites ) {

      for ( let i = 0; i < sprites.length; i++ ) {

        let texture = new PIXI.Texture.fromImage( sprites[i] );
        let image   = new PIXI.Sprite( texture );

        if ( texts ) {

          // Base styles for our Text
          let textStyle = new PIXI.TextStyle({
            fill: '#ffffff',
            wordWrap: true,
            wordWrapWidth: 400
          });

          let text = new PIXI.Text( texts[i], textStyle);
          image.addChild( text );

          // Center each to text to the image
          text.anchor.set(0.5);
          text.x = image.width / 2;
          text.y = image.height / 2;

        }

        image.anchor.set(0.5);
        image.x = renderer.width / 2;
        image.y = renderer.height / 2;

        slidesContainer.addChild( image );

      }

    };
  }

}

export { PixiScene as default};
