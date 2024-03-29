var assert = require("assert");

var Helpers = require("./helpers");
var helpers = new Helpers();

describe('Registration', function () {
    let db;
    before(function (done) {
        helpers.initDb(function (err, res) {
            assert(err === null, err);
            db = res;
            done();
        });
    });

    describe("with valid creds", function () {
        var regResult = null;
        before(function (done) {
            db.membership.register(['test@test.com', 'password'], function (err, res) {
                assert(err === null, err);
                regResult = res[0];
                done();
            });
        });
        it("is successful", function () {
            assert(regResult.success);
        });
        it('returns a new id', function () {
            assert(regResult.new_id);
        });
        it('returns a validation token', function () {
            assert(regResult.validation_token);
        });
        it('adds them to a role', function (done) {
            db.run("select count(1) from membership.users_roles where user_id=$1", [regResult.new_id], function (err, res) {
                assert.equal(res[0].count, 1);
                done();
            });
        });
    });

    describe('trying an existing user', function () {
        var regResult = null;
        before(function (done) {
            db.membership.register(['test@test.com', 'password'], function (err, res) {
                regResult = res[0];
                done();
            });
        });
        it('is not successful', function () {
            assert.equal(false, regResult.success);
        });
    });

});