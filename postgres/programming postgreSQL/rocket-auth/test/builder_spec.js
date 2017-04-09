var builder = require("../lib/builder");
var assert = require("assert");

describe("SQL Builder", function(){
	it("loads", function(){
		assert(builder);
	});
	describe("loading sql", function(){
		it('returns a sql string', function(){
		var sql = builder.readSql();
		console.log(sql);
		assert(builder.readSql());
		});
	});
});
