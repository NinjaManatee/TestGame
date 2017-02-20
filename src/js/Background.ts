/// <reference path="Drawable.ts" />

/**
 * Creates the Background object which will become a child of the Drawable object. The background is drawn on the 
 * "background" canvas and creates the illusion of moving by panning the image.
 */
class Background extends Drawable {
	/**
     * Initialize a new instance of the Background class.
     */
    constructor(public context: CanvasRenderingContext2D) {
        super(0, 0);
        this.speed = 1;
    }

    /**
	 * Draw the background.
	 */
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