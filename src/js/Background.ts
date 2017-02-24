/// <reference path="Drawable.ts" />

/**
 * Creates the Background object which will become a child of the Drawable object. The background is drawn on the 
 * "background" canvas and creates the illusion of moving by panning the image.
 * 
 * @class Background
 * @extends {Drawable}
 */
class Background extends Drawable {
	/**
	 * Creates an instance of Background.
	 * 
	 * @param {CanvasRenderingContext2D} context The rendering context of the canvas.
	 * @param {number} x The x-position of the canvas.
	 * @param {number} y The y-position of the canvas.
	 * @param {number} height The height of the Drawbale.
	 * @param {number} width The width of the Drawable.
	 * @param {number} speed The speed of the canvas.
	 * 
	 * @memberOf Background
	 */
    constructor(
		context: CanvasRenderingContext2D, x: number, y: number, height: number, width: number, speed: number) {
        super(context, 0, 0, height, width, height, width, speed);
    }

    /** @inheritdoc */
	draw() {
		// Pan background
		this.y += this.speed;
		this.context.drawImage(ImageRepository.Background, this.x, this.y);

		// Draw another image at the top edge of the first image
		this.context.drawImage(ImageRepository.Background, this.x, this.y - this.height);

		// If the image scrolled off the screen, reset
		if (this.y >= this.height) {
			this.y = 0;
        }
	};
}