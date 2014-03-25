require(['jquery', 'game/scene'], function($, GameScene) {
    var document = window.document;
    var scene = new GameScene(500, 500);

    $(document).ready(function() {
        $(document.body).append(scene.getCanvas());
        scene.run();
    });
});
