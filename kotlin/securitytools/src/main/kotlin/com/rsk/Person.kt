package com.rsk


interface Signatory {
    fun sign()
}

open class Person(val name: String, var age: Int, var isMarried: Boolean = false) : Signatory {
    /* var isMarried = false

     constructor(name: String, age: Int, isMarried: Boolean) : this(name, age) {
         this.isMarried = isMarried
     }*/

    var partnerName: String=""

    override fun sign() = println("I am $name, and I can sign documents")

    override fun toString(): String {
        return "$name, $age years old"
    }

    init {
        if (age < 1) throw Exception("invalid age")
    }

    companion object{
        @JvmStatic
        fun main(args: Array<String>) {
            println("running from command line....")
            val p = Person("Alex", 35)
            p.sign()
            println(p)

            p.partnerName="Alice"
            println("partner name is ${p.partnerName}")
            p.partnerName="Bob"
            println("partner name is ${p.partnerName}")
        }
    }
}

class Student(name: String, age: Int) : Person(name, age) {
}

