fun main(args: Array<String>) {

    val providers = getProviders()

    val it = providers.iterator()
    while (it.hasNext()) {
        val provider = it.next()
        println(provider.name)
        provider.forEach { key, value -> println("\t$key: $value") }
    }
}