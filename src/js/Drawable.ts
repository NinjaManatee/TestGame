/**
 * Creates the Drawable interface which will be the base class for all drawable objects in the game. Sets up default 
 * variables that all child objects will inherit, as well as the default functions.
 */
abstract class Drawable {
    /**
     * The spead of the drawable object.
     */
    speed: number;

    /**
     * The x-position of the canvas.
     */
    x: number;

    /**
     * The y-postion of the canvas.
     */
    y: number;

    /**
     * The width of the drawable object.
     */
    width: number;

    /**
     * The height of the drawable object.
     */
	height: number;

    /**
     * Initializes a new instance of the Drawable class.
     */
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Define abstract function to be implemented in child objects
	 */
    abstract draw(): void;
}