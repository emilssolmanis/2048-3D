define(['three', 'game/cube', 'game/field'], function(THREE, GameCube, GameField) {
    /** Constructs a new scene
     *
     * @param width The canvas width
     * @param height The canvas height
     * @constructor
     */
    var Scene = function(width, height) {
        this.scene = new THREE.Scene();

        var field = new GameField();
        this.scene.add(field.getMesh());

        this.cube = new GameCube();
        this.scene.add(this.cube.getMesh());

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
        this.camera.position.z = 10;
        this.camera.position.y = 2;
        this.camera.position.x = 2;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0xeeeeee, 1);
    };

    /** Gets the scene's <canvas> element.
     *
     * @returns {canvas}
     */
    Scene.prototype.getCanvas = function() {
        return this.renderer.domElement;
    };

    /** Runs this scene's render loop.
     */
    Scene.prototype.run = function() {
        var self = this;

        function handleKeyDown(event) {
            // 37 L, 39 R, 38 U, 40 D
            if (event.keyCode === 37) {
                self.cube.animate(-1, 0, 0);
            } else if (event.keyCode === 39) {
                self.cube.animate(1, 0, 0);
            } else if (event.keyCode === 38) {
                self.cube.animate(0, 1, 0);
            } else if (event.keyCode === 40) {
                self.cube.animate(0, -1, 0);
            }
        }

        function handleKeyUp(event) {
        }

        window.document.onkeydown = handleKeyDown;
        window.document.onkeyup = handleKeyUp;

        function _run() {
            requestAnimationFrame(_run);
            self.cube.frame();
            self.renderer.render(self.scene, self.camera);
        }
        _run();
    };

    return Scene;
});