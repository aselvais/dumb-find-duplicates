"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var data = fs_1.readFileSync('./duplist.csv', 'utf8');
var lines = data.split("\n");
var result = {};
var duplicates = [];
var _files_to_delete = [];
var _total_files = 0;
// create a key value pair md5 to array of files
lines.map(function (line) {
    try {
        var el = line.split('";"');
        var md5str = el[0].replace('"', '');
        var filepath = el[1].replace('"', '');
        _total_files++;
        if (result[md5str]) {
            result[md5str].push(filepath);
        }
        else {
            result[md5str] = [filepath];
        }
    }
    catch (e) { }
});
// check for checksums with more than 1 file
for (var mdi in result) {
    var ll = result[mdi].length;
    if (ll > 1) {
        duplicates.push(mdi);
        for (var u = 1; u < ll; u++) {
            _files_to_delete.push(result[mdi][u]);
        }
    }
}
var _dup_files = duplicates.length;
/*
console.log("\n\n" +
    "Total number of files: " + _total_files + "\n" +
    "Total number of duplicates: " + _dup_files + "\n" +
    "Percent of duplicates: " + (Math.round( (_dup_files/_total_files)*10000 )/100).toString() + "%\n\n"
);
*/
// Display files to delete
_files_to_delete.map(function (f) {
    console.log('rm "' + f + '";');
});
