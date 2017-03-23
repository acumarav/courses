package com.rsk


interface Signatory {
    fun sign()
}

class Person : Signatory {
    override fun sign() = println("I can sign documents")
}

fun main(args: Array<String>){
    val p=Person()
    p.sign()
}