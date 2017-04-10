var Massive = require("massive");
var fs 		= require("fs");
var path 	= require("path");

var db= Massive.loadSync({ db: "rocket-auth"});

var Helpers = function Helpers(){
	var builder = require("../../lib/builder");
	var sql = builder.readSql();

	this.initDb = function(next){
		db.run(sql, function(err, res){
			if(err){
				next(err, null);
			}else{
				next(null, res);	
			}
		});
	};
};

module.exports = Helpers;
