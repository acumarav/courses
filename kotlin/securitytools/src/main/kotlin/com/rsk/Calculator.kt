package com.rsk

import kotlin.coroutines.experimental.buildIterator

class Calculator(val output: Result) {
    var total = 0;

    fun add(x: Int, y: Int): Int = x + y

    fun accumulate(x: Int): Unit {
        total += x
        output.write(total)
    }
}

interface Result {
    fun write(answer: Int)
}

class NullResult : Result {
    override fun write(answer: Int) {

    }
}