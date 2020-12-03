# Introduction

This is a simple project for finding and deleting 
duplicates on my mac M1. It is a bit crazy as my usual libs and things don't work yet on this new M1 released a few days ago.

It is a quick and dirty set of shell and js/node scripts... Dirty but it is working... pretty fast I guess :)

Sorry for the lack of elegance, I've just coded that in less than 30 mins :) Then put it here to have a saved copy of it and a documentation in case I need to re-use it one day.

# Build

If you modify the main code found in find-duplicate.js, just transpile the thing with:

```
tsc find-duplicate.ts
```

The other custom thing is a shell script: get-file-list.sh

# Usage

## 1. Create a CSV listing the files

The 1st script to run is a simple shell script which will find all the files (not folders) in a directory and create a CSV with the following structure:

- "md5 checksum";"full file path"

Example on how to run the script; the param being the directory:

```
rm duplist.csv;
./get-file-list.sh ~/some_directory
```
The result will be written in a file named: duplist.csv

Be careful to remove the previously created file as if you run the script again it will append the new results. (This could be useful if you wanted to work on different directories at once and find duplicates in 2 different locations; not sure I make sense here...)

## 2. Finding duplicates

The second step is running a node script which will find duplicates and output a list of duplicate files we might want to delete. 

The duplicates are based on the file checksum (so it is real duplicates based on the content of the file, not the filename).

Example here where we will create a file named TODELETE.sh, which will contain all the shell commands deleting each file.

```
rm TODELETE.sh;
./get-file-list.sh /Volumes/ExtM2sata/projects; node find-duplicate.js > TODELETE.sh;
```

## 3. Run the generated script to delete the duplicates

Then to really delete the files, execute the newly created file:

```
chmod 700 TODELETE.sh;
TODELETE.sh;
```
