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
        it('should move all cubes to max X without collisions', function(done) {
            require(['three', 'game/field'], function(THREE, field) {
                done();
            });
        });
    });
});
