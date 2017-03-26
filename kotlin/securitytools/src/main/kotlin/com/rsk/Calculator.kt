package com.rsk

class Calculator(val output: Result) {
    fun add(x: Int, y: Int): Int = x + y
}

interface Result {
    fun write(answer: Int)
}

class NullResult : Result {
    override fun write(answer: Int) {

    }
}