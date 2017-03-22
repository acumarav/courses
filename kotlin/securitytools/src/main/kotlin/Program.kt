import com.rsk.Providers

fun main(args: Array<String>) {

    val allProviders=Providers.getProviders();

    val it = allProviders.iterator()
    while (it.hasNext()) {
        val provider = it.next()
        println(provider.name)
        provider.forEach { key, value -> println("\t$key: $value") }
    }
}
