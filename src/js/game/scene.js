define(['three', 'game/cube', 'game/field'], function(THREE, GameCube, GameField) {
    /** Constructs a new scene
     *
     * @param width The canvas width
     * @param height The canvas height
     * @constructor
     * @name GameScene
     */
    var GameScene = function(width, height) {
        var scene = new THREE.Scene();

        var field = new GameField();
        scene.add(field.getMesh());

        field.add(new GameCube());
        field.add(new GameCube(0, 1, 1.5));

        var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
        camera.position.z = 10;
        camera.position.y = 2;
        camera.position.x = 2;

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(0xeeeeee, 1);

        this.field = field;
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
                self.field.getCubes().forEach(function(c) {
                    c.animate(-1, 0, 0);
                });
            } else if (event.keyCode === 102) {
                self.field.getCubes().forEach(function(c) {
                    c.animate(1, 0, 0);
                });
            } else if (event.keyCode === 105) {
                self.field.getCubes().forEach(function(c) {
                    c.animate(0, 1, 0);
                });
            } else if (event.keyCode === 99) {
                self.field.getCubes().forEach(function(c) {
                    c.animate(0, -1, 0);
                });
            } else if (event.keyCode == 104) {
                self.field.getCubes().forEach(function(c) {
                    c.animate(0, 0, -1);
                });
            } else if (event.keyCode == 98) {
                self.field.getCubes().forEach(function(c) {
                    c.animate(0, 0, 1);
                });
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