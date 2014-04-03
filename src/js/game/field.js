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

    /** Gets the GameCube at the queried position
     *
     * @param {number} idx - The index to get
     * @returns {GameCube} The element at the given index
     */
    GameField.prototype.get = function(idx) {
        return this.cubes[idx];
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

    /** Makes a positive move along an axis
     *
     * @param axis - the axis to move along, 'x', 'y' or 'z'
     * @private
     */
    GameField.prototype._positiveMove = function(axis) {
        console.log('GameField.plus%s()', axis.toUpperCase());
        var newCubes = [];

        var self = this;

        this.cubes.forEach(function(c, i) {
            var pos = idxToPos(i);

            var numCubesInFront = 0;
            var aboveIdx;
            for (aboveIdx = pos[axis] + 1; aboveIdx < 4; aboveIdx++) {
                var posVector = new THREE.Vector3();
                posVector['set' + axis.toUpperCase()](aboveIdx);
                if (self.cubes[posToIdx(posVector)]) {
                    numCubesInFront++;
                }
            }

            console.log('Curr pos for idx %s: %s', i, pos.toArray());
            console.log('Animating, dX: %s', posToCoord(3 - numCubesInFront) - posToCoord(pos[axis]));

            c.animate(posToCoord(3 - numCubesInFront) - posToCoord(pos[axis]), 0, 0);
            pos['set' + axis.toUpperCase()](3 - numCubesInFront);

            console.log('Setting new idx to %s', posToIdx(pos));

            newCubes[posToIdx(pos)] = c;
        });

        this.cubes = newCubes;
    };

    /** Makes a negative move along an axis
     *
     * @param axis - the axis to move along, 'x', 'y' or 'z'
     * @private
     */
    GameField.prototype._negativeMove = function(axis) {
        console.log('GameField.minus%s()', axis.toUpperCase());
        var newCubes = [];

        var self = this;

        this.cubes.forEach(function(c, i) {
            var pos = idxToPos(i);

            var numCubesInFront = 0;
            var belowIdx;
            for (belowIdx = 0; belowIdx < pos[axis]; belowIdx++) {
                var posVector = new THREE.Vector3();
                posVector['set' + axis.toUpperCase()](belowIdx);
                if (self.cubes[posToIdx(posVector)]) {
                    numCubesInFront++;
                }
            }

            console.log('Curr pos for idx %s: %s', i, pos.toArray());
            console.log('Animating, dX: %s', posToCoord(pos[axis]) - posToCoord(numCubesInFront));

            c.animate(posToCoord(pos[axis]) - posToCoord(numCubesInFront), 0, 0);
            pos['set' + axis.toUpperCase()](numCubesInFront);

            console.log('Setting new idx to %s', posToIdx(pos));

            newCubes[posToIdx(pos)] = c;
        });

        this.cubes = newCubes;
    };

    /** Moves cubes in this field along the X axis in the positive direction
     */
    GameField.prototype.plusX = function() {
        this._positiveMove('x');
    };

    /** Moves cubes in this field along the X axis in the negative direction
     */
    GameField.prototype.minusX = function() {
        this._negativeMove('x');
    };

    /** Moves cubes in this field along the Y axis in the positive direction
     */
    GameField.prototype.plusY = function() {
        this._positiveMove('y');
    };

    /** Moves cubes in this field along the Y axis in the negative direction
     */
    GameField.prototype.minusY = function() {
        this._negativeMove('y');
    };

    /** Moves cubes in this field along the Z axis in the positive direction
     */
    GameField.prototype.plusZ = function() {
        this._positiveMove('z');
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