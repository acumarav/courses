package chat;


import javax.websocket.MessageHandler;
import javax.websocket.OnOpen;
import javax.websocket.RemoteEndpoint;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

@ServerEndpoint("/websocket/echo_ant")
public class EchoEndpointAnnotationExample {

    @OnOpen
    public void onOpen(Session session, javax.websocket.EndpointConfig endpointConfig) {
        RemoteEndpoint.Basic remoteEndpoint = session.getBasicRemote();
        session.addMessageHandler(new EchoMessageHandler(remoteEndpoint));
    }

    private static class EchoMessageHandler implements MessageHandler.Whole<String> {

        private final RemoteEndpoint.Basic remoteEndpoint;

        private EchoMessageHandler(RemoteEndpoint.Basic remoteEndpoint) {
            this.remoteEndpoint = remoteEndpoint;
        }


        @Override
        public void onMessage(String message) {
            try {
                if (remoteEndpoint != null) {
                    remoteEndpoint.sendText("annotated: " + message);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }
}
