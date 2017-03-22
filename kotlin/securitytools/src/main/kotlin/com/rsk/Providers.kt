package com.rsk

import java.security.Provider
import java.security.Security

class Providers {
    fun getProviders(): List<Provider>{
        val providers = Security.getProviders()
        var lisfOfProviders:List<Provider> = providers.asList()
        return lisfOfProviders
    }

    companion object{
        fun getProviders(): List<Provider>{
            val providers = Security.getProviders()
            var lisfOfProviders:List<Provider> = providers.asList()
            return lisfOfProviders
        }
    }
}