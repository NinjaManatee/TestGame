class ImageRepository {
    /**
     * Define an object to hold all our images for the game so images are only ever created once. This type of object is 
     * known as a singleton.
     */
    static readonly Background: HTMLImageElement = new Image();
    
    /**
     * Method to initialize static class.
     */
    static initialize() {
        // Set images src
        this.Background.src = 'img/bg.png';
    };
}

ImageRepository.initialize();

function init() {
    // The game object.
    var game = null;

    try {
        game = new Game();
        
        // Start game if it initializes properly.
        game.start();
    } catch (e) {
        alert(e.message);
    }
}