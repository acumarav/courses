package chat;

import javax.websocket.EndpointConfig;
import javax.websocket.MessageHandler;
import javax.websocket.RemoteEndpoint;
import javax.websocket.Session;
import java.io.IOException;

public class EchoEndpoint extends javax.websocket.Endpoint {

    @Override
    public void onOpen(Session session, EndpointConfig endpointConfig) {
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
                    remoteEndpoint.sendText(message);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }
}
