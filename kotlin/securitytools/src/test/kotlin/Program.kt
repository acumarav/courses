fun main(args: Array<String>) {

    val providers = getProviders()

    val it = providers.iterator()
    while (it.hasNext()) {
        println(it.next().name)
    }
}