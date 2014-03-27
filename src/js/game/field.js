define(['three', 'game/cube'], function(THREE, GameCube) {
    /** Translates a field object array index into position coordinates
     *
     * @param {number} idx - The array index
     */
    function idxToPos(idx) {
        var y = Math.floor(idx / 16);
        var z = Math.floor((idx % 16) / 4);
        var x = (idx % 16) % 4;
        return [x, y, z];
    }

    /** Translates a discreet position vector to an index into the object array
     *
     * @param {Array} pos - An [x, y, z] array
     */
    function posToIdx(pos) {
        var x = pos[0];
        var y = pos[1];
        var z = pos[2];
        return y * 16 + z * 4 + x;
    }

    function posToCoord(p) {
        return (p + 1) * 0.1 + p;
    }

    /** Translates position vector into GL coordinate space
     *
     * @param {Array} pos - discreet position coordinates
     * @returns {Array} Position array mapped into GL coordinates
     */
    function posToCoords(pos) {
        return pos.map(posToCoord);
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

        var firstPos = posToCoords(idxToPos(0));
        var secondPos = posToCoords(idxToPos(1));
        var cubes = [
            new GameCube(firstPos[0], firstPos[1], firstPos[2]),
            new GameCube(secondPos[0], secondPos[1], secondPos[2])
        ];
        cubes.forEach(function(c) {
            mesh.add(c.getMesh());
        });

        this.cubes = cubes;
        this.mesh = mesh;
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
        })
    };

    GameField.prototype.plusX = function() {
        var newCubes = [];

        this.cubes.forEach(function(c, i) {
            var pos = idxToPos(i);
            c.animate(posToCoord(3) - posToCoord(pos[0]), 0, 0);
            pos[0] = 3;
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
            c.animate(0, posToCoord(3) - posToCoord(pos[1]), 0);
            pos[1] = 3;

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

    return GameField;
});