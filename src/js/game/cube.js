define(['three'], function(THREE) {
    var animationLength = 300;

    /** Constructs a GameCube
     *
     * @param x - the initial X
     * @param y - the initial Y
     * @param z - the initial Z
     * @constructor
     */
    var GameCube = function(x, y, z) {
        x = x || 0;
        y = y || 0;
        z = z || 0;

        var geometry = new THREE.CubeGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            opacity: 0.5,
            transparent: true
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;

        var wireGeometry = new THREE.CubeGeometry(1.05, 1.05, 1.05);
        var wireMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true,
            wireframeLinewidth: 5
        });
        var wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
        mesh.add(wireMesh);

        this._animating = false;
        this.mesh = mesh;
    };

    /** Get whether this cube is animating
     *
     * @returns {boolean} Whether this cube is in the middle of an animatino now
     */
    GameCube.prototype.isAnimating = function() {
        return this._animating;
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

            if (currTime > this._animation.startTime + animationLength) {
                this.mesh.position.x = this._animation.start.x + animationLength * this._animation.deltas.x;
                this.mesh.position.y = this._animation.start.y + animationLength * this._animation.deltas.y;
                this.mesh.position.z = this._animation.start.z + animationLength * this._animation.deltas.z;
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
     * @param {THREE.Vector3} d - The difference to move
     */
    GameCube.prototype.animate = function(d) {
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
                x: d.x / animationLength,
                y: d.y / animationLength,
                z: d.z / animationLength
            },
            startTime: new Date().getTime()
        };
    };

    return GameCube;
});
