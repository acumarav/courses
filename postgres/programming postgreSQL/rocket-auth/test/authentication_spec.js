var assert = require("assert");
var Helpers = require("./helpers");
var helpers = new Helpers();

describe('Authentication', function () {
    before(function (done) {
        helpers.initDb(function (err, res) {
            db = res;
            db.membership.register(['test2@test.com','password'], function (err, res) {
                assert(err==null, err);
                done();
            });
        });
    });

    describe('with a valid login', function () {
        var authResult =null;
        before(function (done) {
           db.membership.authenticate(['test2@test.com','password'], function (err,res) {
               authResult=res;
               done();
           });
        });
        it('is successful', function () {
            assert(authResult===true,'expected successful authentication');
            
        });
    });
});