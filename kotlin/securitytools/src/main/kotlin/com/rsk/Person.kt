package com.rsk


interface Signatory {
    fun sign()
}

open class Person(val name: String, var age: Int) : Signatory {
    var isMarried = false

    constructor(name: String, age: Int, isMarried: Boolean) : this(name, age) {
        this.isMarried = isMarried
    }

    override fun sign() = println("I am $name, and I can sign documents")

    override fun toString(): String {
        return "$name, $age years old"
    }

    init {
        if (age < 1) throw Exception("invalid age")
    }
}

class Student(name: String, age: Int) : Person(name, age) {
}

fun main(args: Array<String>) {
    val p = Person("Alex", 35)
    p.sign()
    println(p)
}