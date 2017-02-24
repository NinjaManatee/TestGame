/**
 * Creates the Bullet object which the ship fires. The bullets are
 * drawn on the "main" canvas.
 */
class Bullet extends Drawable {
    /**
     * Value indicating whether the bullet is currently in use
     * 
     * @private
     * @type {boolean}
     * @memberOf Bullet
     */
	public isAlive: boolean = false; 

	/*
	 * Sets the bullet values
	 * 
     * @param {any} x The initial x-position.
     * @param {any} y The initial y-position.
     * @param {any} speed The speed.
     * 
     * @memberOf Bullet
     */
    spawn(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.isAlive = true;
	};

	/*
	 * Uses a "drity rectangle" to erase the bullet and moves it.
	 * Returns true if the bullet moved off the screen, indicating that
	 * the bullet is ready to be cleared by the pool, otherwise draws
	 * the bullet.
	 */
	draw() {
		this.context.clearRect(this.x, this.y, this.width, this.height);
		this.y -= this.speed;
		if (this.y <= 0 - this.height) {
			return true;
		}
		else {
			this.context.drawImage(ImageRepository.Bullet, this.x, this.y);
		}
	}

	/*
	 * Resets the bullet values
	 */
	clear() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.isAlive = false;
	};
}