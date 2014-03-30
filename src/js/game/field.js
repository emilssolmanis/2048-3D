/** @namespace field */
define(['three', 'game/cube'], function(THREE, GameCube) {
    /** Translates a field object array index into position coordinates
     *
     * @param {number} idx - The array index
     */
    function idxToPos(idx) {
        var y = Math.floor(idx / 16);
        var z = Math.floor((idx % 16) / 4);
        var x = (idx % 16) % 4;
        return new THREE.Vector3(x, y, z);
    }

    /** Translates a discreet position vector to an index into the object array
     *
     * @param {THREE.Vector3} pos - An [x, y, z] array
     */
    function posToIdx(pos) {
        return (pos.y * 16) + (pos.z) * 4 + (pos.x);
    }

    /** Converts a single position to coordinate, since the scales are equal on all axis
     *
     * @param p  - The value to convert
     * @returns {number} The value in GL space
     */
    function posToCoord(p) {
        return (p + 1) * 0.1 + p;
    }

    /** Translates position vector into GL coordinate space
     *
     * @param {THREE.Vector3} pos - discreet position coordinates
     * @returns {THREE.Vector3} Position array mapped into GL coordinates
     */
    function posToCoords(pos) {
        return new THREE.Vector3(posToCoord(pos.x), posToCoord(pos.y), posToCoord(pos.z));
    }

    /** Creates the playing field.
     *
     * @constructor
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

        var mesh = new THREE.Mesh(geometry, material);

        this.cubes = [];
        this.mesh = mesh;
    };

    /** Adds a {GameCube} instance at the given index
     *
     * @param {number} idx - The index at which to add the cube
     */
    GameField.prototype.add = function(idx) {
        var pos = posToCoords(idxToPos(idx));
        var cube = new GameCube(pos.x, pos.y, pos.z);
        this.cubes[idx] = cube;
        this.mesh.add(cube.getMesh());
    };

    /** Gets this field's underlying mesh object
     *
     * @returns {THREE.Mesh}
     */
    GameField.prototype.getMesh = function() {
        return this.mesh;
    };

    /** Animation callback for each frame
     */
    GameField.prototype.frame = function() {
        this.cubes.forEach(function(c) {
            c.frame();
        });
    };

    /** Checks whether this field is animating currently
     *
     *
     * @returns {boolean} - Whether this field is in the process of an animation
     */
    GameField.prototype.isAnimating = function() {
        this.cubes.forEach(function(c) {
            if (c.isAnimating()) {
                return true;
            }
        });
        return false;
    };

    GameField.prototype.plusX = function() {
        var newCubes = [];

        this.cubes.forEach(function(c, i) {
            var pos = idxToPos(i);
            console.log('Curr pos for idx %s: %s', i, pos.toArray());
            console.log('Animating, dX: %s', posToCoord(3) - posToCoord(pos.x));
            c.animate(posToCoord(3) - posToCoord(pos.x), 0, 0);
            pos.setX(3);
            console.log('Setting new idx to %s', posToIdx(pos));
            newCubes[posToIdx(pos)] = c;
        });
//        this.cubes = newCubes;
    };

    GameField.prototype.minusX = function() {
        this.cubes.forEach(function(c) {
            c.animate(-1, 0, 0);
        });
    };

    GameField.prototype.plusY = function() {
        var newCubes = [];

        this.cubes.forEach(function(c, i) {
            var pos = idxToPos(i);
            c.animate(0, posToCoord(3) - posToCoord(pos.y), 0);
            pos.y = 3;

            newCubes[posToIdx(pos)] = c;
        });
    };

    GameField.prototype.minusY = function() {
        this.cubes.forEach(function(c) {
            c.animate(0, -1, 0);
        });
    };

    GameField.prototype.plusZ = function() {
        this.cubes.forEach(function(c) {
            c.animate(0, 0, 1);
        });
    };

    GameField.prototype.minusZ = function() {
        this.cubes.forEach(function(c) {
            c.animate(0, 0, -1);
        });
    };

    return {
        GameField: GameField,
        idxToPos: idxToPos,
        posToIdx: posToIdx,
        posToCoord: posToCoord,
        posToCoords: posToCoords
    };
});