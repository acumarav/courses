package com.rsk.kotlin

import com.rsk.java.Person

/**
 * Created by alex on 3/25/2017.
 */
class Program {
    companion object{
        @JvmStatic
        fun main(args: Array<String>){
            val p= Person()
            p.name="Kevin"
            p.age=45

            println("${p.name} ${p.age} years old")


            try {
                p.name = ""
            }catch (e: Exception){
                println(e.message)
            }

            val partner= p.partner
            println(partner?.name)

        }
    }
}

class Student: Person(){

}