/**
 * Create the Ship object that the player controls. The ship is drawn on the "ship" canvas and uses dirty rectangles to
 * move around the screen.
 * 
 * @class Ship
 * @extends {Drawable}
 */
class Ship extends Drawable {
	/**
	 * The fraction of the vertical screen height where the ship can reside. Ship wills stay in the bottom fraciton.
	 * 
	 * @private
	 * @type {number}
	 * @memberOf Ship
	 */
	private static readonly SHIP_SCREEN_FRACTION: number = 0.25;
    
	/**
     * The pool of bullets for the ship.
     * 
     * @private
     * @type {Pool}
     * @memberOf Ship
     */
	private readonly bulletPool: Pool;
	
    /**
     * The Fire rate for the ship.
     * 
     * @private
     * @type {number}
     * @memberOf Ship
     */
    private fireRate: number = 15;

    /**
     * The number of fired bullets.
     * 
     * @private
     * @type {number}
     * @memberOf Ship
     */
	private counter: number = 0;
	
	/**
	 * The initial ship speed.
	 */
	private static readonly INITIAL_SHIP_SPEED: number = 3;

	/**
	 * Creates an instance of Ship.
	 * @param {CanvasRenderingContext2D} context 
	 * @param {HTMLCanvasElement} canvas 
	 * 
	 * @memberOf Ship
	 */
	constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		super(
			context, 
			Ship.getInitialX(canvas), 
			Ship.getInitialY(canvas), 
			ImageRepository.Spaceship.height, 
			ImageRepository.Spaceship.width, 
			canvas.height,
			canvas.width,
			Ship.INITIAL_SHIP_SPEED);
		this.bulletPool = new Pool(context, canvas, 30);
	}

    /**
     * Draws the ship. 
     * 
     * @memberOf Ship
     */
    public draw() {
		this.counter++;
		this.context.drawImage(ImageRepository.Spaceship, this.x, this.y);
	};

	/**
	 * Fires two bullets
	 * 
     * @memberOf Ship
     */
	public fire() {
		if (this.counter >= this.fireRate) {
			this.bulletPool.getTwo(this.x + 6, this.y, 3, this.x + 33, this.y, 3);
			
			// Reset counter
			this.counter = 0;
		}
	};


	public move(direction: KEY_CODE) {
		switch (direction) {
			case KEY_CODE.Left: {
				this.moveBy(-this.speed, 0);
				break;
			}
			case KEY_CODE.Right: {
				this.moveBy(this.speed, 0);
				break;
			}
			case KEY_CODE.Up: {
				this.moveBy(0, this.speed);
				break;
			} 
			case KEY_CODE.Down: {
				this.moveBy(0, -this.speed);
				break;
			}
			default: {
				// do nothing
				console.log('Unsupported move direction: ' + direction);
				break;
			}
		}
	}

	/**
	 * Moves the ship by a specified delta. Limits movement if it exceeds range allowed to the ship.
	 * 
	 * @protected
	 * @param {number} deltaX 
	 * @param {number} deltaY 
	 * 
	 * @memberOf Ship
	 */
	protected moveBy(deltaX: number, deltaY: number) {
		let newX: number = this.x + deltaX;
		let newY: number = this.y + deltaY;

		// Make sure new x is inside the canvas.
        if (newX < 0) {
            newX = 0;
        } else if (newX >= this.canvasWidth - this.width) {
            newX = this.canvasWidth - this.width;
        }

		// Make sure ship stays in the bottom fraction of the ship.
		let screenFraction = 1 - Ship.SHIP_SCREEN_FRACTION;
        if (newY < 0) {
            newY = 0;
        } else if (newY <= this.canvasHeight * screenFraction) {
			newY = this.canvasHeight * screenFraction;
		}

		// Calculate deltas off of new limited region and send to super to move.
		deltaX = newX - this.x;
		deltaY = newY - this.y;
		super.moveBy(deltaX, deltaY);
	}

	/**
	 * Gets the initial X position of the ship.
	 * 
	 * @private
	 * @static
	 * @param {HTMLCanvasElement} canvas 
	 * @returns {number} 
	 * 
	 * @memberOf Ship
	 */
	private static getInitialX(canvas: HTMLCanvasElement): number {
		// Set the ship to start near the bottom middle of the canvas
		let shipStartX: number = canvas.height / 2 - ImageRepository.Spaceship.width;
			
		return shipStartX;
	}

	/**
	 * Gets the initial Y position of the ship.
	 * 
	 * @private
	 * @static
	 * @param {HTMLCanvasElement} canvas 
	 * @returns {number} 
	 * 
	 * @memberOf Ship
	 */
	private static getInitialY(canvas: HTMLCanvasElement): number {
		let shipStartY: number = canvas.width * (1 - Ship.SHIP_SCREEN_FRACTION) + ImageRepository.Spaceship.height * 2;
		return shipStartY;
	}
}