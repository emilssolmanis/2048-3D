define(['three', 'game/cube', 'game/field'], function(THREE, GameCube, field) {
    /** Constructs a new scene
     *
     * @param width The canvas width
     * @param height The canvas height
     * @constructor
     */
    var GameScene = function(width, height) {
        var scene = new THREE.Scene();

        var gameField = new field.GameField();

        gameField.add(0);
        gameField.add(1);

        scene.add(gameField.getMesh());

        var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
        camera.position.z = 10;
        camera.position.y = 2;
        camera.position.x = 2;

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(0xeeeeee, 1);

        this.field = gameField;
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
    };

    /** Gets the scene's <canvas> element.
     *
     * @returns {canvas}
     */
    GameScene.prototype.getCanvas = function() {
        return this.renderer.domElement;
    };

    /** Runs this scene's render loop.
     */
    GameScene.prototype.run = function() {
        var self = this;

        function handleKeyDown(event) {
            if (self.field.isAnimating()) {
                return;
            }
            /*
            Numpad

                7 8 9
                4 5 6
                1 2 3

            is

                103 104 105
                100 101 102
                97  98  99
             */
            if (event.keyCode === 100) {
                self.field.minusX();
            } else if (event.keyCode === 102) {
                self.field.plusX();
            } else if (event.keyCode === 105) {
                self.field.plusY();
            } else if (event.keyCode === 99) {
                self.field.minusY();
            } else if (event.keyCode == 104) {
                self.field.minusZ();
            } else if (event.keyCode == 98) {
                self.field.plusZ();
            }
        }

        window.document.onkeydown = handleKeyDown;

        function _run() {
            requestAnimationFrame(_run);
            self.field.frame();
            self.renderer.render(self.scene, self.camera);
        }
        _run();
    };

    return GameScene;
});