#!/bin/sh

OUTFILE="./duplist.csv"

if [ -z $1 ]; then
    echo "Parameter not found";
    exit 1;
fi

if [[ -d $1 ]]; then
    echo "This is a directory! Running the process now :) ...";
    find $1 -type f -print0 | while read -d $'\0' FPATH
    do
    #for FPATH in `find $1 -type f`; do
        CHKSM=`md5 -q "$FPATH"`
        echo ".\c"
        echo "\"${CHKSM}\";\"${FPATH}\"" >> $OUTFILE
    done
else
    echo "The param is not a directory .... sorry ... "
    exit 1;
fi
