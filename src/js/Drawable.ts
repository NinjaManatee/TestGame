/**
 * Creates the Drawable interface which will be the base class for all drawable objects in the game. Sets up default 
 * variables that all child objects will inherit, as well as the default functions.
 * 
 * @abstract
 * @class Drawable
 */
abstract class Drawable {
    /**
     * Creates an instance of Drawable.
     * 
     * @param {number} x The x-position of the Drawable.
     * @param {number} y The y-position of the Drawable.
     * @param {number} height The height of the Drawable.
     * @param {number} width The width of the Drawable.
     * @param {number} canvasHeight The height of the canvas the Drawable is drawn on.
     * @param {number} canvasWidth The width of the canvas the Drawable is drawn on.
     * @param {number} speed The speed of th Drawable.
      * 
     * @memberOf Drawable
     */
    public constructor(
        public readonly context: CanvasRenderingContext2D, 
        public x: number, 
        public y: number, 
        public readonly height: number, 
        public readonly width: number,
        protected readonly canvasHeight: number,
        protected readonly canvasWidth: number,
        public speed: number) {
    }

    /**
     * Define abstract function to be implemented in child objects
     * 
     * @abstract
     * 
     * @memberOf Drawable
     */
    public abstract draw(): void;

    /**
	 * Moves the Drawable.
	 * 
	 * @private
	 * @param {number} deltaX The amount to move in the x-direction.
	 * @param {number} deltaY The amount to move in the y-direction.
	 * 
	 * @memberOf Drawable
	 */
	protected moveBy(deltaX: number, deltaY: number): void {
		// The ship moved, so erase it's current image so it can
		// be redrawn in it's new location
		this.context.clearRect(this.x, this.y, this.width, this.height);
			
		let newX: number = this.x + deltaX;
		let newY: number = this.y + deltaY;

		this.draw();
	}

    public moveLeft() {
// Update x and y according to the direction to move and
			// redraw the ship. Change the else if's to if statements
			// to have diagonal movement.
			if (KEY_STATUS[KEY_CODE.Left]) {
			this.x -= this.speed
				if (this.x <= 0) {
					// Keep player within the screen
					this.x = 0;
				}
				} else if (KEY_STATUS[KEY_CODE.Right]) {
				this.x += this.speed
				if (this.x >= this.canvasWidth - this.width) {
					this.x = this.canvasWidth - this.width;
                }
			} else if (KEY_STATUS[KEY_CODE.Up]) {
				this.y -= this.speed
				if (this.y <= this.canvasHeight/4*3) {
					this.y = this.canvasHeight/4*3;
                }
			} else if (KEY_STATUS[KEY_CODE.Down]) {
				this.y += this.speed
				if (this.y >= this.canvasHeight - this.height) {
					this.y = this.canvasHeight - this.height;
                }
			}
	}
}