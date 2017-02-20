/**
 * Creates the Game object which will hold all objects and data for the game.
 */
class Game {
    /**
     * The background canvas.
     */
    bgCanvas: HTMLCanvasElement;

    /**
     * The background context.
     */
    bgContext: CanvasRenderingContext2D;

    /**
     * The background object.
     */
    background: Background;

	/*
	 * Gets canvas information and context and sets up all game objects.
	 * @returns true if the canvas is supported and false if it is not. This is to stop the animation script from 
     * constantly running on older browsers.
	 */
    constructor() {
        // Get the canvas element
        this.bgCanvas = <HTMLCanvasElement>document.getElementById('background');

        // Test to see if canvas is supported
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');

            // Initialize the background object
            this.background = new Background(this.bgContext);
            this.background.width = this.bgCanvas.width;
            this.background.height = this.bgCanvas.height
        } else {
            throw new Error("Canvas is not supported");
        }
    };
    
    /**
     * Start the animation loop
     */
    public start() {
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
    }

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