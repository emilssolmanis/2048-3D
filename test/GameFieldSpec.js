describe("GameField's coordinate translation tests", function() {
    describe('field.posToIdx()', function() {
        it('should translate position (0, 0, 0) into index 0', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var res = field.posToIdx(new THREE.Vector3(0, 0, 0));
                chai.assert.equal(res, 0);
                done();
            });
        });

        it('should translate position (1, 0, 0) into index 1', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var res = field.posToIdx(new THREE.Vector3(1, 0, 0));
                chai.assert.equal(res, 1);
                done();
            });
        });

        it('should translate position (0, 1, 0) into index 16', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var res = field.posToIdx(new THREE.Vector3(0, 1, 0));
                chai.assert.equal(res, 16);
                done();
            });
        });

        it('should translate position (0, 0, 1) into index 4', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var res = field.posToIdx(new THREE.Vector3(0, 0, 1));
                chai.assert.equal(res, 4);
                done();
            });
        });
    });

    describe('field.idxToPos()', function() {
        it('should translate index 0 into position (0, 0, 0)', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var pos = field.idxToPos(0);
                chai.assert.equal(pos.x, 0);
                chai.assert.equal(pos.y, 0);
                chai.assert.equal(pos.z, 0);
                done();
            });
        });
        it('should translate index 1 into position (1, 0, 0)', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var pos = field.idxToPos(1);
                chai.assert.equal(pos.x, 1);
                chai.assert.equal(pos.y, 0);
                chai.assert.equal(pos.z, 0);
                done();
            });
        });
        it('should translate index 16 into position (0, 1, 0)', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var pos = field.idxToPos(16);
                chai.assert.equal(pos.x, 0);
                chai.assert.equal(pos.y, 1);
                chai.assert.equal(pos.z, 0);
                done();
            });
        });
        it('should translate index 4 into position (0, 0, 1)', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var pos = field.idxToPos(4);
                chai.assert.equal(pos.x, 0);
                chai.assert.equal(pos.y, 0);
                chai.assert.equal(pos.z, 1);
                done();
            });
        });
    });

    describe('GameField.plusX(), move forward along X', function() {
        it('should move single cube to max X', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();
                gameField.add(0);
                chai.assert.notOk(gameField.get(3));
                chai.assert.ok(gameField.get(0));

                gameField.plusX();

                chai.assert.ok(gameField.get(3));
                chai.assert.notOk(gameField.get(0));

                done();
            });
        });

        it('should move multiple cubes with different Z positions to max X', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(0, 0, 1)),
                    field.posToIdx(new THREE.Vector3(0, 0, 2))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(3, 0, 0)),
                    field.posToIdx(new THREE.Vector3(3, 0, 1)),
                    field.posToIdx(new THREE.Vector3(3, 0, 2))
                ];

                startPositions.forEach(function(posIdx) {
                    gameField.add(posIdx);
                });

                startPositions.forEach(function(posIdx) {
                    chai.assert.ok(gameField.get(posIdx));
                });

                targetPositions.forEach(function(posIdx) {
                    chai.assert.notOk(gameField.get(posIdx));
                });

                gameField.plusX();

                startPositions.forEach(function(posIdx) {
                    chai.assert.notOk(gameField.get(posIdx));
                });

                targetPositions.forEach(function(posIdx) {
                    chai.assert.ok(gameField.get(posIdx));
                });

                done();
            });
        });

        it('should move multiple cubes with different Y positions to max X', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(0, 1, 0)),
                    field.posToIdx(new THREE.Vector3(0, 2, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(3, 0, 0)),
                    field.posToIdx(new THREE.Vector3(3, 1, 0)),
                    field.posToIdx(new THREE.Vector3(3, 2, 0))
                ];

                startPositions.forEach(function(posIdx) {
                    gameField.add(posIdx);
                });

                startPositions.forEach(function(posIdx) {
                    chai.assert.ok(gameField.get(posIdx));
                });

                targetPositions.forEach(function(posIdx) {
                    chai.assert.notOk(gameField.get(posIdx));
                });

                gameField.plusX();

                startPositions.forEach(function(posIdx) {
                    chai.assert.notOk(gameField.get(posIdx));
                });

                targetPositions.forEach(function(posIdx) {
                    chai.assert.ok(gameField.get(posIdx));
                });

                done();
            });
        });

        it('should move multiple cubes with different Y and Z positions to max X', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 2)),
                    field.posToIdx(new THREE.Vector3(0, 1, 1)),
                    field.posToIdx(new THREE.Vector3(0, 2, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(3, 0, 2)),
                    field.posToIdx(new THREE.Vector3(3, 1, 1)),
                    field.posToIdx(new THREE.Vector3(3, 2, 0))
                ];

                startPositions.forEach(function(posIdx) {
                    gameField.add(posIdx);
                });

                startPositions.forEach(function(posIdx) {
                    chai.assert.ok(gameField.get(posIdx));
                });

                targetPositions.forEach(function(posIdx) {
                    chai.assert.notOk(gameField.get(posIdx));
                });

                gameField.plusX();

                startPositions.forEach(function(posIdx) {
                    chai.assert.notOk(gameField.get(posIdx));
                });

                targetPositions.forEach(function(posIdx) {
                    chai.assert.ok(gameField.get(posIdx));
                });

                done();
            });
        });

        it('should move multiple cubes with different X, Y and Z positions to max X', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(1, 0, 2)),
                    field.posToIdx(new THREE.Vector3(2, 1, 1)),
                    field.posToIdx(new THREE.Vector3(0, 2, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(3, 0, 2)),
                    field.posToIdx(new THREE.Vector3(3, 1, 1)),
                    field.posToIdx(new THREE.Vector3(3, 2, 0))
                ];

                startPositions.forEach(function(posIdx) {
                    gameField.add(posIdx);
                });

                startPositions.forEach(function(posIdx) {
                    chai.assert.ok(gameField.get(posIdx));
                });

                targetPositions.forEach(function(posIdx) {
                    chai.assert.notOk(gameField.get(posIdx));
                });

                gameField.plusX();

                startPositions.forEach(function(posIdx) {
                    chai.assert.notOk(gameField.get(posIdx));
                });

                targetPositions.forEach(function(posIdx) {
                    chai.assert.ok(gameField.get(posIdx));
                });

                done();
            });
        });

        it('should not move cubes any further after they are at max X', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();
                gameField.add(0);

                chai.assert.notOk(gameField.get(3));
                chai.assert.ok(gameField.get(0));

                gameField.plusX();

                chai.assert.ok(gameField.get(3));
                chai.assert.notOk(gameField.get(0));

                var cubeMesh = gameField.get(3).getMesh();
                var currPos = {
                    x: cubeMesh.position.x,
                    y: cubeMesh.position.y,
                    z: cubeMesh.position.z
                };

                gameField.plusX();

                chai.assert.ok(gameField.get(3));

                var newCubeMesh = gameField.get(3).getMesh();
                var newPos = {
                    x: newCubeMesh.position.x,
                    y: newCubeMesh.position.y,
                    z: newCubeMesh.position.z
                };

                chai.assert.deepEqual(currPos, newPos);

                done();
            });
        });
    });
});
