#!/bin/bash

srcpath=`pwd`

while [ -n "$1" ]
do
case "$1" in
-b) echo "building bsmod"	
	pushd $srcpath/bsmod
	mvn -T 1C clean install -Dmaven.test.skip=true -P obfuscation	
	popd ;;
-u)	echo "building uxmod"
	pushd $srcpath/uxmod	 
	mvn clean install -Dmaven.test.skip=true -P obfuscation
	popd ;;
esac
shift
done


