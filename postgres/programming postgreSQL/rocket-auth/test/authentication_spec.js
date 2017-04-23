var assert = require("assert");
var Helpers = require("./helpers");
var helpers = new Helpers();
var db = null;

describe('Authentication', function () {
    before(function (done) {
        helpers.initDb(function (err, res) {
            db = res;
            db.membership.register(['test2@test.com','password'], function (err, res2) {
                assert(err==null, err);
                done();
            });
        });
    });

    describe('with a valid login', function () {
        let authResult =null;
        before(function (done) {
           db.membership.authenticate(['test2@test.com','password','local'], function (err,res) {
               authResult=res[0];
               done();
           });
        });
        it('is successful', function () {
            assert(authResult.success===true,'expected successful authentication');
            
        });
    });
});