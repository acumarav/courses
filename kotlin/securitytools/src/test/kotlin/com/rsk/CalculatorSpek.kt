package com.rsk;

import org.jetbrains.spek.api.Spek
import org.jetbrains.spek.api.dsl.describe
import org.junit.jupiter.api.Assertions

public class CalculatorSpek : Spek({
    val calculator = Calculator(NullResult())
    describe("the calculator"){
        val result= calculator.add(12,13)

        Assertions.assertEquals(25,result)
    }
})
