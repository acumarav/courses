package com.rsk


interface Signatory {
    fun sign()
}

class Person(val name: String) : Signatory {
    override fun sign() = println("I am $name, and I can sign documents")
}

fun main(args: Array<String>){
    val p=Person("Alex")
    p.sign()
}