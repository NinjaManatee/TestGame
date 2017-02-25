/**
 * Creates the Game object which will hold all objects and data for the game.
 * 
 * @class Game
 */
class Game {
    /**
     * The background canvas.
     * 
     * @private
     * @type {HTMLCanvasElement}
     * @memberOf Game
     */
    private bgCanvas: HTMLCanvasElement;

    /**
     * The ship canvas.
     * 
     * @private
     * @type {HTMLCanvasElement}
     * @memberOf Game
     */
    private shipCanvas: HTMLCanvasElement;

    /**
     * The main canvas.
     * 
     * @private
     * @type {HTMLCanvasElement}
     * @memberOf Game
     */
    private mainCanvas: HTMLCanvasElement;

    /**
     * The background context.
     * 
     * @private
     * @type {CanvasRenderingContext2D}
     * @memberOf Game
     */
    private bgContext: CanvasRenderingContext2D;

    /**
     * The ship context.
     * 
     * @private
     * @type {CanvasRenderingContext2D}
     * @memberOf Game
     */
    private shipContext: CanvasRenderingContext2D;

    /**
     * The main context.
     * 
     * @private
     * @type {CanvasRenderingContext2D}
     * @memberOf Game
     */
    private mainContext: CanvasRenderingContext2D;

    /**
     * The background object.
     * 
     * @private
     * @type {Background}
     * @memberOf Game
     */
    private background: Background;

    /**
     * The ship object.
     * 
     * @private
     * @type {Ship}
     * @memberOf Game
     */
    private ship: Ship;

	/*
	 * Gets canvas information and context and sets up all game objects.
	 * @returns true if the canvas is supported and false if it is not. This is to stop the animation script from 
     * constantly running on older browsers.
	 */
    constructor() {
        // Get the canvas element
        this.bgCanvas = <HTMLCanvasElement>document.getElementById('background');
        this.shipCanvas = <HTMLCanvasElement>document.getElementById('ship');
        this.mainCanvas = <HTMLCanvasElement>document.getElementById('main');

        // Test to see if canvas is supported
        if (this.bgCanvas.getContext) {
            this.bgContext = <CanvasRenderingContext2D>this.bgCanvas.getContext('2d');
            this.shipContext = <CanvasRenderingContext2D>this.shipCanvas.getContext('2d');
            this.mainContext = <CanvasRenderingContext2D>this.mainCanvas.getContext('2d');

            // Initialize the background object
            this.background = new Background(
                this.bgContext, 0, 0, this.bgCanvas.height, this.bgCanvas.width, 1);
            
            // Initialize the ship object.
            this.ship = new Ship(this.shipContext, this.shipCanvas, this.mainContext, this.mainCanvas);
            
        } else {
            throw new Error("Canvas is not supported");
        }
    };
    
    /**
     * Start the animation loop
     */
    public start() {
        this.ship.draw();
        this.animate();
    };

    /**
     * The animation loop. Calls the requestAnimationFrame shim to optimize the game loop and draws all game objects. This
     * function must be a gobal function and cannot be within an object.
     */
    private animate() {
        window.requestAnimationFrame(() => {
            this.animate();    
        });
        this.background.draw();
        this.moveShip();
        this.ship.bulletPool.animate();
    }

    /**
     * Handles the moving of the ship.
     * 
     * @memberOf Game
     */
	private moveShip() {
		// Determine if the action is move action
		if (KEY_STATUS[KEY_CODE.Left] || KEY_STATUS[KEY_CODE.Right] ||
			KEY_STATUS[KEY_CODE.Down] || KEY_STATUS[KEY_CODE.Up]) {
            // Update x and y according to the direction to move and
			// redraw the ship. Change the else if's to if statements
			// to have diagonal movement.
			if (KEY_STATUS[KEY_CODE.Left]) {
                this.ship.move(KEY_CODE.Left);
			} else if (KEY_STATUS[KEY_CODE.Right]) {
                this.ship.move(KEY_CODE.Right);
			} else if (KEY_STATUS[KEY_CODE.Up]) {
                this.ship.move(KEY_CODE.Up);
			} else if (KEY_STATUS[KEY_CODE.Down]) {
                this.ship.move(KEY_CODE.Down);
			}
		}

		if (KEY_STATUS[KEY_CODE.Space]) {
			this.ship.fire();
		}
	};

    /**
     * requestAnim shim layer by Paul Irish
     * Finds the first API that works to optimize the animation loop,
     * otherwise defaults to setTimeout().
     */
    private requestAnimFrame(callback: Function) : Function {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    };
}