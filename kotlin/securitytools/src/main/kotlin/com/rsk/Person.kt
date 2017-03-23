package com.rsk


interface Signatory {
    fun sign()
}

open class Person(val name: String, var age: Int) : Signatory {
    override fun sign() = println("I am $name, and I can sign documents")
    override fun toString(): String {
        return "$name, $age years old"
    }
}

class Student( name: String,  age: Int): Person(name,age){

}

fun main(args: Array<String>){
    val p=Person("Alex", 35)
    p.sign()
    println(p)
}