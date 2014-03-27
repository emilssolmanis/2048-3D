define(['three'], function(THREE) {
    /** Creates the playing field.
     *
     * @constructor
     * @name GameField
     */
    var GameField = function() {
        var geometry = new THREE.CubeGeometry(6, 6, 6);
        var material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            opacity: 0.8,
            transparent: true,
            wireframe: true,
            wireframeLinewidth: 5
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.cubes = [];
    };

    /** Gets this field's underlying mesh object
     *
     * @returns {THREE.Mesh}
     */
    GameField.prototype.getMesh = function() {
        return this.mesh;
    };

    /** Adds a {GameCube} to this field
     *
     * @param {GameCube} object
     */
    GameField.prototype.add = function(object) {
        this.mesh.add(object.getMesh());
        this.cubes.push(object);
    };

    /** Gets all the cubes this field contains
     *
     * @returns {Array} - Array of {GameCube} objects contained by this field
     */
    GameField.prototype.getCubes = function() {
        return this.cubes;
    };

    /** Animation callback for each frame
     */
    GameField.prototype.frame = function() {
        this.cubes.forEach(function(c) {
            c.frame();
        })
    };

    return GameField;
});