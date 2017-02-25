/**
 * Custom Pool object. Holds Bullet objects to be managed to prevent garbage collection.
 * 
 * @class Pool
 */
class Pool {
    /**
     * Pool of bullets
     * 
     * @private
     * @type {Array<Bullet>}
     * @memberOf Pool
     */
	private readonly pool: Array<Bullet>;

    /**
     * Creates an instance of Pool.
     * @param {number} maxSize 
     * 
     * @memberOf Pool
     */
    public constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, maxSize: number) {
        this.pool = new Array<Bullet>(maxSize);
        for (let i : number = 0; i < maxSize; i++) {
            // TODO: What should the context of the bullet be.
            let bullet: Bullet = new Bullet(
                context, 
                0, 
                0, 
                canvas.height, 
                canvas.width, 
                ImageRepository.Bullet.width, 
                ImageRepository.Bullet.height, 
                0);
            this.pool.push(bullet);
        }
    }

	/*
	 * Grabs the last item in the list and initializes it and pushes it to the front of the array.
	 * 
     * @param {number} x The x-position of the bullet.
     * @param {number} y The y-position of the bullet.
     * @param {number} speed The speed of the bullet.
     * 
     * @memberOf Pool
     */
	public get(x: number, y: number, speed: number) {
		if(!this.pool[ - 1].isAlive) {
			this.pool[this.pool.length - 1].spawn(x, y, speed);
			this.pool.unshift(this.pool.pop());
		}
	};
	/*
	 * Used for the ship to be able to get two bullets at once. If only the get() function is used twice, the ship is 
     * able to fire and only have 1 bullet spawn instead of 2.
	 * 
     * @param {any} x1 The x-positon of the first bullet.
     * @param {any} y1 The y-position of the first bullet.
     * @param {any} speed1 The speed of the first bullet.
     * @param {any} x2 The x-postion of the second bullet.
     * @param {any} y2 The y-postion of the second bullet.
     * @param {any} speed2 The speed of the second bullet.
     * 
     * @memberOf Pool
     */
	public getTwo(x1, y1, speed1, x2, y2, speed2) {
		if(!this.pool[this.pool.length - 1].isAlive && !this.pool[this.pool.length - 2].isAlive) {
            this.get(x1, y1, speed1);
			this.get(x2, y2, speed2);
        }
	};

	/**
	 * Draws any in use Bullets. If a bullet goes off the screen, clears it and pushes it to the front of the array.
     * 
     * @memberOf Pool
     */
	public animate() {
		for (var i = 0; i < this.pool.length; i++) {
			// Only draw until we find a bullet that is not alive
			if (this.pool[i].isAlive) {
				if (this.pool[i].draw()) {
					this.pool[i].clear();
					this.pool.push((this.pool.splice(i,1))[0]);
				}
			} else {
				break;
            }
		}
	}
}