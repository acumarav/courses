package chat;

import javax.websocket.Endpoint;
import javax.websocket.server.ServerApplicationConfig;
import javax.websocket.server.ServerEndpointConfig;
import java.util.HashSet;
import java.util.Set;

/*public class EndpointConfig implements ServerApplicationConfig {

    @Override
    public Set<ServerEndpointConfig> getEndpointConfigs(Set<Class<? extends Endpoint>> set) {
        Set<ServerEndpointConfig> result = new HashSet<ServerEndpointConfig>();

        if (set.contains(EchoEndpoint.class)) {
            ServerEndpointConfig conf = ServerEndpointConfig.Builder
                    .create(EchoEndpoint.class, "/websocket/echo").build();
            result.add(conf);
        }
        return result;
    }

    @Override
    public Set<Class<?>> getAnnotatedEndpointClasses(Set<Class<?>> set) {
        return null;
    }
}*/
