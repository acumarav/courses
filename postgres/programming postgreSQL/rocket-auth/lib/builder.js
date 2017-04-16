var fs = require("fs");
var path = require("path");

var _ = require("underscore")._;

var sourceDir = path.join(__dirname,"../sql/");
var tableDir = path.join(sourceDir, "tables");
var functionDir = path.join(sourceDir, "functions");
var indexesDir = path.join(sourceDir, "indexes");
var globalsDir = path.join(sourceDir, "globals");

var loadFiles = function(dir){
	var result = [];
	var files = fs.readdirSync(dir);
	_.each(files,function(file){
	if(path.extname(file)===".sql"){
		var sql = fs.readFileSync(path.join(dir, file),{encoding: "utf-8"});
		result.push(sql);
	}
});
return result.join("\r\n");
};

var readInit = function(){
 var initFile = path.join(sourceDir, "init.sql");
 return fs.readFileSync(initFile, {encoding:"utf-8"});
}

var readTables = function(){
	return loadFiles(tableDir);
}

var readFunctions = function(){
	return loadFiles(functionDir);
}

var readIndexes = function(){
	return loadFiles(indexesDir);
}

var readGlobals = function(){
	return loadFiles(globalsDir);
}

exports.readSql = function(){
	var sqlBits = [];
	sqlBits.push("--Generated "+ new Date());
	sqlBits.push(readInit());
	sqlBits.push(readGlobals());
    sqlBits.push(readTables());
    sqlBits.push(readFunctions());
    sqlBits.push(readIndexes());

	return sqlBits.join("\r\n");
}
