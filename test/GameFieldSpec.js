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

    function testMovement(gameField, startPositions, targetPositions, move) {
        startPositions.forEach(function(posIdx) {
            gameField.add(posIdx);
        });

        startPositions.forEach(function(posIdx) {
            chai.assert.ok(gameField.get(posIdx));
        });

        targetPositions.forEach(function(posIdx) {
            chai.assert.notOk(gameField.get(posIdx));
        });

        gameField[move]();

        startPositions.forEach(function(posIdx) {
            chai.assert.notOk(gameField.get(posIdx));
        });

        targetPositions.forEach(function(posIdx) {
            chai.assert.ok(gameField.get(posIdx));
        });
    }

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

                testMovement(gameField, startPositions, targetPositions, 'plusX');
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

                testMovement(gameField, startPositions, targetPositions, 'plusX');
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

                testMovement(gameField, startPositions, targetPositions, 'plusX');
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

                testMovement(gameField, startPositions, targetPositions, 'plusX');
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

        it('should not collapse game cubes arbitrarily', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(1, 0, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(2, 0, 0)),
                    field.posToIdx(new THREE.Vector3(3, 0, 0))
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
    });

    describe('GameField.minusX(), move backward along X', function() {
        it('should move single cube to min X', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();
                gameField.add(3);
                chai.assert.ok(gameField.get(3));
                chai.assert.notOk(gameField.get(0));

                gameField.minusX();

                chai.assert.notOk(gameField.get(3));
                chai.assert.ok(gameField.get(0));

                done();
            });
        });

        it('should move multiple cubes with different Z positions to min X', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(3, 0, 0)),
                    field.posToIdx(new THREE.Vector3(3, 0, 1)),
                    field.posToIdx(new THREE.Vector3(3, 0, 2))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(0, 0, 1)),
                    field.posToIdx(new THREE.Vector3(0, 0, 2))
                ];

                testMovement(gameField, startPositions, targetPositions, 'minusX');
                done();
            });
        });

        it('should move multiple cubes with different Y positions to min X', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(3, 0, 0)),
                    field.posToIdx(new THREE.Vector3(3, 1, 0)),
                    field.posToIdx(new THREE.Vector3(3, 2, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(0, 1, 0)),
                    field.posToIdx(new THREE.Vector3(0, 2, 0))
                ];

                testMovement(gameField, startPositions, targetPositions, 'minusX');
                done();
            });
        });

        it('should move multiple cubes with different Y and Z positions to min X', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(3, 0, 2)),
                    field.posToIdx(new THREE.Vector3(3, 1, 1)),
                    field.posToIdx(new THREE.Vector3(3, 2, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 2)),
                    field.posToIdx(new THREE.Vector3(0, 1, 1)),
                    field.posToIdx(new THREE.Vector3(0, 2, 0))
                ];

                testMovement(gameField, startPositions, targetPositions, 'minusX');
                done();
            });
        });

        it('should move multiple cubes with different X, Y and Z positions to min X', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(2, 0, 2)),
                    field.posToIdx(new THREE.Vector3(3, 1, 1)),
                    field.posToIdx(new THREE.Vector3(1, 2, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 2)),
                    field.posToIdx(new THREE.Vector3(0, 1, 1)),
                    field.posToIdx(new THREE.Vector3(0, 2, 0))
                ];

                testMovement(gameField, startPositions, targetPositions, 'minusX');
                done();
            });
        });

        it('should not move cubes any further after they are at min X', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();
                gameField.add(3);

                chai.assert.notOk(gameField.get(0));
                chai.assert.ok(gameField.get(3));

                gameField.minusX();

                chai.assert.ok(gameField.get(0));
                chai.assert.notOk(gameField.get(3));

                var cubeMesh = gameField.get(0).getMesh();
                var currPos = {
                    x: cubeMesh.position.x,
                    y: cubeMesh.position.y,
                    z: cubeMesh.position.z
                };

                gameField.minusX();

                chai.assert.ok(gameField.get(0));

                var newCubeMesh = gameField.get(0).getMesh();
                var newPos = {
                    x: newCubeMesh.position.x,
                    y: newCubeMesh.position.y,
                    z: newCubeMesh.position.z
                };

                chai.assert.deepEqual(currPos, newPos);

                done();
            });
        });

        it('should not collapse game cubes arbitrarily', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(2, 0, 0)),
                    field.posToIdx(new THREE.Vector3(3, 0, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(1, 0, 0))
                ];

                testMovement(gameField, startPositions, targetPositions, 'minusX');
                done();
            });
        });
    });

    describe('GameField.plusY(), move forward along Y', function() {
        it('should move single cube to max Y', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();
                var targetIdx = field.posToIdx(new THREE.Vector3(0, 3, 0));
                gameField.add(0);

                chai.assert.ok(gameField.get(0));
                chai.assert.notOk(gameField.get(targetIdx));

                gameField.plusY();

                chai.assert.notOk(gameField.get(0));
                chai.assert.ok(gameField.get(targetIdx));

                done();
            });
        });

        it('should move multiple cubes with different Z positions to max Y', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(0, 0, 1)),
                    field.posToIdx(new THREE.Vector3(0, 0, 2))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 3, 0)),
                    field.posToIdx(new THREE.Vector3(0, 3, 1)),
                    field.posToIdx(new THREE.Vector3(0, 3, 2))
                ];

                testMovement(gameField, startPositions, targetPositions, 'plusY');
                done();
            });
        });

        it('should move multiple cubes with different X positions to max Y', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(1, 0, 0)),
                    field.posToIdx(new THREE.Vector3(2, 0, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 3, 0)),
                    field.posToIdx(new THREE.Vector3(1, 3, 0)),
                    field.posToIdx(new THREE.Vector3(2, 3, 0))
                ];

                testMovement(gameField, startPositions, targetPositions, 'plusY');
                done();
            });
        });

        it('should move multiple cubes with different X and Z positions to max Y', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 2)),
                    field.posToIdx(new THREE.Vector3(1, 0, 1)),
                    field.posToIdx(new THREE.Vector3(2, 0, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 3, 2)),
                    field.posToIdx(new THREE.Vector3(1, 3, 1)),
                    field.posToIdx(new THREE.Vector3(2, 3, 0))
                ];

                testMovement(gameField, startPositions, targetPositions, 'plusY');
                done();
            });
        });

        it('should move multiple cubes with different X, Y and Z positions to max Y', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(2, 0, 2)),
                    field.posToIdx(new THREE.Vector3(3, 1, 1)),
                    field.posToIdx(new THREE.Vector3(1, 2, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(2, 3, 2)),
                    field.posToIdx(new THREE.Vector3(3, 3, 1)),
                    field.posToIdx(new THREE.Vector3(1, 3, 0))
                ];

                testMovement(gameField, startPositions, targetPositions, 'plusY');
                done();
            });
        });

        it('should not move cubes any further after they are at max Y', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();
                var targetIdx = field.posToIdx(new THREE.Vector3(0, 3, 0));
                gameField.add(0);

                chai.assert.notOk(gameField.get(targetIdx));
                chai.assert.ok(gameField.get(0));

                gameField.plusY();

                chai.assert.ok(gameField.get(targetIdx));
                chai.assert.notOk(gameField.get(0));

                var cubeMesh = gameField.get(targetIdx).getMesh();
                var currPos = {
                    x: cubeMesh.position.x,
                    y: cubeMesh.position.y,
                    z: cubeMesh.position.z
                };

                gameField.plusY();

                chai.assert.ok(gameField.get(targetIdx));

                var newCubeMesh = gameField.get(targetIdx).getMesh();
                var newPos = {
                    x: newCubeMesh.position.x,
                    y: newCubeMesh.position.y,
                    z: newCubeMesh.position.z
                };

                chai.assert.deepEqual(currPos, newPos);

                done();
            });
        });

        it('should not collapse game cubes arbitrarily', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(0, 1, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 2, 0)),
                    field.posToIdx(new THREE.Vector3(0, 3, 0))
                ];

                testMovement(gameField, startPositions, targetPositions, 'plusY');
                done();
            });
        });
    });

    describe('GameField.minusY(), move backward along Y', function() {
        it('should move single cube to min Y', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();
                var upperY = field.posToIdx(new THREE.Vector3(0, 3, 0));
                gameField.add(upperY);
                chai.assert.ok(gameField.get(upperY));
                chai.assert.notOk(gameField.get(0));

                gameField.minusY();

                chai.assert.notOk(gameField.get(upperY));
                chai.assert.ok(gameField.get(0));

                done();
            });
        });

        it('should move multiple cubes with different Z positions to min Y', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 3, 0)),
                    field.posToIdx(new THREE.Vector3(0, 3, 1)),
                    field.posToIdx(new THREE.Vector3(0, 3, 2))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(0, 0, 1)),
                    field.posToIdx(new THREE.Vector3(0, 0, 2))
                ];

                testMovement(gameField, startPositions, targetPositions, 'minusY');
                done();
            });
        });

        it('should move multiple cubes with different X positions to min Y', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 3, 0)),
                    field.posToIdx(new THREE.Vector3(1, 3, 0)),
                    field.posToIdx(new THREE.Vector3(2, 3, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(1, 0, 0)),
                    field.posToIdx(new THREE.Vector3(2, 0, 0))
                ];

                testMovement(gameField, startPositions, targetPositions, 'minusY');
                done();
            });
        });

        it('should move multiple cubes with different X and Z positions to min Y', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 3, 2)),
                    field.posToIdx(new THREE.Vector3(1, 3, 1)),
                    field.posToIdx(new THREE.Vector3(2, 3, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 2)),
                    field.posToIdx(new THREE.Vector3(1, 0, 1)),
                    field.posToIdx(new THREE.Vector3(2, 0, 0))
                ];

                testMovement(gameField, startPositions, targetPositions, 'minusY');
                done();
            });
        });

        it('should move multiple cubes with different X, Y and Z positions to min Y', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 2, 2)),
                    field.posToIdx(new THREE.Vector3(1, 3, 1)),
                    field.posToIdx(new THREE.Vector3(2, 1, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 2)),
                    field.posToIdx(new THREE.Vector3(1, 0, 1)),
                    field.posToIdx(new THREE.Vector3(2, 0, 0))
                ];

                testMovement(gameField, startPositions, targetPositions, 'minusY');
                done();
            });
        });

        it('should not move cubes any further after they are at min Y', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();
                var upperY = field.posToIdx(new THREE.Vector3(0, 3, 0));
                gameField.add(upperY);

                chai.assert.notOk(gameField.get(0));
                chai.assert.ok(gameField.get(upperY));

                gameField.minusY();

                chai.assert.ok(gameField.get(0));
                chai.assert.notOk(gameField.get(upperY));

                var cubeMesh = gameField.get(0).getMesh();
                var currPos = {
                    x: cubeMesh.position.x,
                    y: cubeMesh.position.y,
                    z: cubeMesh.position.z
                };

                gameField.minusY();

                chai.assert.ok(gameField.get(0));

                var newCubeMesh = gameField.get(0).getMesh();
                var newPos = {
                    x: newCubeMesh.position.x,
                    y: newCubeMesh.position.y,
                    z: newCubeMesh.position.z
                };

                chai.assert.deepEqual(currPos, newPos);

                done();
            });
        });

        it('should not collapse game cubes arbitrarily', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 2, 0)),
                    field.posToIdx(new THREE.Vector3(0, 3, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(0, 1, 0))
                ];

                testMovement(gameField, startPositions, targetPositions, 'minusY');
                done();
            });
        });
    });

    describe('GameField.plusZ(), move forward along Z', function() {
        it('should move single cube to max Z', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();
                var targetIdx = field.posToIdx(new THREE.Vector3(0, 0, 3));
                gameField.add(0);

                chai.assert.ok(gameField.get(0));
                chai.assert.notOk(gameField.get(targetIdx));

                gameField.plusZ();

                chai.assert.notOk(gameField.get(0));
                chai.assert.ok(gameField.get(targetIdx));

                done();
            });
        });

        it('should move multiple cubes with different Y positions to max Z', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(0, 1, 0)),
                    field.posToIdx(new THREE.Vector3(0, 2, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 3)),
                    field.posToIdx(new THREE.Vector3(0, 1, 3)),
                    field.posToIdx(new THREE.Vector3(0, 2, 3))
                ];

                testMovement(gameField, startPositions, targetPositions, 'plusZ');
                done();
            });
        });

        it('should move multiple cubes with different X positions to max Z', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(1, 0, 0)),
                    field.posToIdx(new THREE.Vector3(2, 0, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 3)),
                    field.posToIdx(new THREE.Vector3(1, 0, 3)),
                    field.posToIdx(new THREE.Vector3(2, 0, 3))
                ];

                testMovement(gameField, startPositions, targetPositions, 'plusZ');
                done();
            });
        });

        it('should move multiple cubes with different X and Y positions to max Z', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 2, 0)),
                    field.posToIdx(new THREE.Vector3(1, 1, 0)),
                    field.posToIdx(new THREE.Vector3(2, 0, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 2, 3)),
                    field.posToIdx(new THREE.Vector3(1, 1, 3)),
                    field.posToIdx(new THREE.Vector3(2, 0, 3))
                ];

                testMovement(gameField, startPositions, targetPositions, 'plusZ');
                done();
            });
        });

        it('should move multiple cubes with different X, Y and Z positions to max Z', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(2, 0, 2)),
                    field.posToIdx(new THREE.Vector3(3, 1, 1)),
                    field.posToIdx(new THREE.Vector3(1, 2, 0))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(2, 0, 3)),
                    field.posToIdx(new THREE.Vector3(3, 1, 3)),
                    field.posToIdx(new THREE.Vector3(1, 2, 3))
                ];

                testMovement(gameField, startPositions, targetPositions, 'plusZ');
                done();
            });
        });

        it('should not move cubes any further after they are at max Z', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();
                var targetIdx = field.posToIdx(new THREE.Vector3(0, 0, 3));
                gameField.add(0);

                chai.assert.notOk(gameField.get(targetIdx));
                chai.assert.ok(gameField.get(0));

                gameField.plusZ();

                chai.assert.ok(gameField.get(targetIdx));
                chai.assert.notOk(gameField.get(0));

                var cubeMesh = gameField.get(targetIdx).getMesh();
                var currPos = {
                    x: cubeMesh.position.x,
                    y: cubeMesh.position.y,
                    z: cubeMesh.position.z
                };

                gameField.plusZ();

                chai.assert.ok(gameField.get(targetIdx));

                var newCubeMesh = gameField.get(targetIdx).getMesh();
                var newPos = {
                    x: newCubeMesh.position.x,
                    y: newCubeMesh.position.y,
                    z: newCubeMesh.position.z
                };

                chai.assert.deepEqual(currPos, newPos);

                done();
            });
        });

        it('should not collapse game cubes arbitrarily', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                var gameField = new field.GameField();

                var startPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 0)),
                    field.posToIdx(new THREE.Vector3(0, 0, 1))
                ];

                var targetPositions = [
                    field.posToIdx(new THREE.Vector3(0, 0, 2)),
                    field.posToIdx(new THREE.Vector3(0, 0, 3))
                ];

                testMovement(gameField, startPositions, targetPositions, 'plusZ');
                done();
            });
        });
    });
});
