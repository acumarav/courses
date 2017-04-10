var builder = require("../lib/builder");
var assert  = require("assert");
var Helpers = require("./helpers");
var Mod = require("./helpers/index");

var helper = new Helpers();


describe("SQL Builder", function(){
	
	before(function(done){
		helper.initDb(done);
        done();
	});
	
	it("loads", function(){
		assert(builder);
	});
	describe("loading sql", function(){
		it('returns a sql string', function(){
		var sql = builder.readSql();
		console.log(sql);
		assert(builder.readSql());
		});

		it('helpers should be load', function () {
            assert(helper);
            /*console.log(Helpers);
            var hlp=new Helpers();
            assert(hlp);*/
        });

	});
});
