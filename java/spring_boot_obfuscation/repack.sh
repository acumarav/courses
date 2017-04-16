#!/bin/bash

if [ -z $1 ] 
then
echo 'Input jar name should be provided'
exit
fi

injar=`readlink -f $1`
jarname=`basename $1`
indir=`dirname $1`
wrkfld="$indir/tmp"
rm -fR $wrkfld
mkdir $wrkfld
#pushd $wrkfld
echo "extracting file $1 into: $wrkfld"
cp $injar $wrkfld 
pushd $wrkfld
jar -xvf $jarname 
rm -f $jarname
#jar -xvf $1 -C $wrkfld

