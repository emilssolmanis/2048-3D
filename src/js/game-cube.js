define(['three'], function(THREE) {
    /** Encapsulates the game cubes logic.
     *
     * @constructor
     */
    var GameCube = function() {
        this.geometry = new THREE.CubeGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            opacity: 0.5,
            transparent: true
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this._animating = false;
    };

    /** Returns the cube's Mesh object
     *
     * @returns {THREE.Mesh}
     */
    GameCube.prototype.getMesh = function() {
        return this.mesh;
    };

    /** Callback for each rendered frame.
     */
    GameCube.prototype.frame = function() {
        if (this._animating) {
            var currTime = new Date().getTime();

            if (currTime > this._animation.startTime + 1000) {
                this.mesh.position.x = this._animation.start.x + 1000 * this._animation.deltas.x;
                this.mesh.position.y = this._animation.start.y + 1000 * this._animation.deltas.y;
                this.mesh.position.z = this._animation.start.z + 1000 * this._animation.deltas.z;
                this._animating = false;
                this._animation = {};
            } else {
                var currStep = currTime - this._animation.startTime;
                this.mesh.position.x = this._animation.start.x + currStep * this._animation.deltas.x;
                this.mesh.position.y = this._animation.start.y + currStep * this._animation.deltas.y;
                this.mesh.position.z = this._animation.start.z + currStep * this._animation.deltas.z;
            }
        }
    };

    /** Moves the cube to a new location over a fixed period of time.
     *
     * @param dx - The amount of X to move
     * @param dy - The amount of Y to move
     * @param dz - The amount of Z to move
     */
    GameCube.prototype.animate = function(dx, dy, dz) {
        if (this._animating) {
            return;
        }

        this._animating = true;

        var self = this;
        this._animation = {
            start: {
                x: self.mesh.position.x,
                y: self.mesh.position.y,
                z: self.mesh.position.z
            },
            deltas: {
                x: dx / 1000,
                y: dy / 1000,
                z: dz / 1000
            },
            startTime: new Date().getTime()
        };
    };

    return GameCube;
});
