import com.rsk.Providers

fun main(args: Array<String>) {

    val providers = Providers()

    val details = providers.getAllProviders()
    details.forEach (::println)

}

private fun getAllProviders(fn: (String, String) -> Unit) {
    val allProviders = Providers.getProviders();

    val it = allProviders.iterator()
    while (it.hasNext()) {
        val provider = it.next()
        println(provider.name)

        provider.forEach { key, value -> fn.invoke(key.toString(), value.toString()) }
    }
}
