class ImageRepository {
    /**
     * Define an object to hold all our images for the game so images are only ever created once. This type of object is 
     * known as a singleton.
     * 
     * @static
     * @type {HTMLImageElement}
     * @memberOf ImageRepository
     */
    static readonly Background: HTMLImageElement = new Image();

    /**
     * The image to use for player spaceship.
     * 
     * @static
     * @type {HTMLImageElement}
     * @memberOf ImageRepository
     */
    static readonly Spaceship: HTMLImageElement = new Image();

    /**
     * The image to use for the player buillet.
     * 
     * @static
     * @type {HTMLImageElement}
     * @memberOf ImageRepository
     */
    static readonly Bullet: HTMLImageElement = new Image();

    /**
     * The number of images that need to be loaded for progress bar purposes.
     * 
     * @private
     * @static
     * 
     * @memberOf ImageRepository
     */
    private static readonly NumberOfImages: number = 3;

    /**
     * The number of images that have been loaded.
     * 
     * @private
     * @static
     * 
     * @memberOf ImageRepository
     */
    private static numberOfImagesLoaded: number = 0;

    /**
     * Method to initialize static class.
     * 
     * @static
     * 
     * @memberOf ImageRepository
     */
    public static initialize() {
        // Set onload events
        this.Background.onload = () => { this.imageLoaded(); }
        this.Spaceship.onload = () => { this.imageLoaded(); }
        this.Bullet.onload = () => { this.imageLoaded(); }

        // Set images src
        this.Background.src = 'img/bg.png';
        this.Spaceship.src = 'img/ship.png';
        this.Bullet.src = 'img/bullet.png';
    };

    /**
     * Increment image load count and intialize window when all images are loaded.
     * 
     * @private
     * @static
     * 
     * @memberOf ImageRepository
     */
    private static imageLoaded() {
        this.numberOfImagesLoaded++;
        if (this.numberOfImagesLoaded >= this.NumberOfImages) {
            initialize();
        }
    }
}

/**
 * Function to start game.
 */
var initialize = () => {
    // The game object.
    let game: Game = new Game();

    // Initialize the image repository        
    ImageRepository.initialize();

    // Start game if it initializes properly.
    game.start();
}

/**
 * The keycodes that will be mapped when a user presses a button.
 * 
 * @enum {number}
 */
enum KEY_CODE {
  Space = 32,
  Left = 37,
  Up = 38,
  Right = 39,
  Down = 40
}

// Creates the array to hold the KEY_CODES and sets all their values
// to false. Checking true/flase is the quickest way to check status
// of a key press and which one was pressed when determining
// when to move and which direction.
var KEY_STATUS = {};
for (let code in KEY_CODE) {
  KEY_STATUS[ KEY_CODE[ code ]] = false;
}

/**
 * Sets up the document to listen to onkeydown events (fired when
 * any key on the keyboard is pressed down). When a key is pressed,
 * it sets the appropriate direction to true to let us know which
 * key it was.
 */
document.onkeydown = (e) => {
  // Firefox and opera use charCode instead of keyCode to
  // return which key was pressed.
  let keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODE[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODE[keyCode]] = true;
  }
}

/**
 * Sets up the document to listen to ownkeyup events (fired when
 * any key on the keyboard is released). When a key is released,
 * it sets teh appropriate direction to false to let us know which
 * key it was.
 */
document.onkeyup = (e) => {
  let keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODE[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODE[keyCode]] = false;
  }
}