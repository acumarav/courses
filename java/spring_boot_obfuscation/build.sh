#!/bin/bash

srcpath=`pwd`
profile=''
#-P obfuscation

count=1
for param in "$@"
do
#echo "\$@ Parameter #$count = $param"
count=$(( $count + 1 ))
if [ "$param" == "-P" ] 
then	
	nextparam=${!count}	
	profile="-P $nextparam"
	echo "building with maven Profile: $profile"
fi
done

while [ -n "$1" ]
do
case "$1" in
-b) echo "building bsmod"	
	pushd $srcpath/bsmod
	mvn -T 1C clean install -Dmaven.test.skip=true $profile
	popd ;;
-u)	echo "building uxmod"
	pushd $srcpath/uxmod	 
	mvn clean install -Dmaven.test.skip=true $profile
	popd ;;
esac
shift
done


