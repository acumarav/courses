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

echo "extracting file $1 into: $wrkfld"
cp $injar $wrkfld 
pushd $wrkfld
jar -xvf $jarname 
rm -f $jarname
#-------- repackage
parts=`ls -p`

partsparam=( "${parts[@]}" )

echo "running: jar c0mf ./META-INF/MANIFEST.MF $jarname $partsparam"

jar c0mf ./META-INF/MANIFEST.MF $jarname $partsparam

outjar=`readlink -f $jarname`
popd
mv "$outjar" "./$indir/out_$jarname"

rm -fR $wrkfld
echo "Done!"

