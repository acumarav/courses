import java.security.Provider
import java.security.Security

fun getProviders(): List<Provider>{
    val providers = Security.getProviders()
    var lisfOfProviders:List<Provider> = providers.asList()
    return lisfOfProviders
}