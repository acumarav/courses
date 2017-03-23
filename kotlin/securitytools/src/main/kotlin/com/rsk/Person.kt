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


            val kevin = User("Kevin",1)
            println(kevin)



            var (name, id)=kevin

            val otherUsser=kevin.copy(id=2)

            //id=4

            println("User is $name and their id is $id")
            println(kevin)
            println(otherUsser)
        }
    }
}

class Student(name: String, age: Int) : Person(name, age) {
}


data class User(val name: String, val id: Int)
