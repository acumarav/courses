package com.rsk;

import com.nhaarman.mockito_kotlin.mock
import org.jetbrains.spek.api.Spek
import org.jetbrains.spek.api.dsl.describe
import org.jetbrains.spek.api.dsl.it
import org.junit.jupiter.api.Assertions

class CalculatorSpek : Spek({
    var calculator: Calculator? = null
    describe("the calculator") {
        beforeEachTest {
            val result:Result=mock()
            calculator = Calculator(result)
        }

        it("should add two number") {
            val result = calculator?.add(12, 13)
            Assertions.assertEquals(25, result)
        }

        it("should accumulate  one number") {
            calculator?.accumulate(47)
            Assertions.assertEquals(47, calculator?.total)
        }

        it("should accumulate  two number") {
            calculator?.accumulate(4)
            calculator?.accumulate(7)
            Assertions.assertEquals(11, calculator?.total)
        }
    }
})
