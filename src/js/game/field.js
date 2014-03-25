define(['three'], function(THREE) {
    /** Creates the playing field.
     *
     * @constructor
     */
    var Field = function() {
        var geometry = new THREE.CubeGeometry(6, 6, 6);
        var material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            opacity: 0.8,
            transparent: true,
            wireframe: true,
            wireframeLinewidth: 5
        });

        this.mesh = new THREE.Mesh(geometry, material);
    };

    Field.prototype.getMesh = function() {
        return this.mesh;
    };

    return Field;
});