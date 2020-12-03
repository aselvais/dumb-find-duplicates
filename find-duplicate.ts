import { readFileSync } from 'fs';

let data = readFileSync('./duplist.csv', 'utf8');
let lines = data.split("\n");
let result = {};
let duplicates = [];
let _files_to_delete=[];
let _total_files = 0;
// create a key value pair md5 to array of files
lines.map(line => {
    try {
        let el = line.split('";"');
        let md5str = el[0].replace('"','');
        let filepath = el[1].replace('"','');
        _total_files++;
        if (result[md5str]) {
            result[md5str].push(filepath);
        } else {
            result[md5str] = [filepath];
        }
    } catch(e){}
});

// check for checksums with more than 1 file
for (let mdi in result) {
    let ll = result[mdi].length;
    if (ll > 1) {
        duplicates.push(mdi);
        for (let u=1; u < ll; u++)
        {
            _files_to_delete.push(result[mdi][u]);
        }
    }
}
let _dup_files = duplicates.length;
/*
console.log("\n\n" +
    "Total number of files: " + _total_files + "\n" +
    "Total number of duplicates: " + _dup_files + "\n" +
    "Percent of duplicates: " + (Math.round( (_dup_files/_total_files)*10000 )/100).toString() + "%\n\n"
);
*/
// Display files to delete
_files_to_delete.map(f => {
console.log('rm "' + f + '";');
});
