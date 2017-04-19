var assert = require("assert");

var Helpers = require("./helpers");
var helpers = new Helpers();


describe('Registration', function () {
    let db = null;
    before(function (done) {
            helpers.initDb(function (err, res) {
                db = res;
                console.log("DB Init done");
                done();
            });
        }
    );

    describe("with valid creds", function () {
        var regResult = null;
        before(function (done) {
            console.log("db: ",db);
            console.dir("db: ",db);
            db.membership.register(['test1@test.com', 'password'], function (err, res) {
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
    });
});