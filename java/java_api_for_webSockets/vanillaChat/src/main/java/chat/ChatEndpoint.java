package chat;

import lombok.extern.slf4j.Slf4j;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Slf4j
@ServerEndpoint("/websocket/chat")
public class ChatEndpoint {

    private Session session;
    static List<ChatEndpoint> clients = new CopyOnWriteArrayList<ChatEndpoint>();

    @OnOpen
    public void onOpen(Session session, EndpointConfig config) {
        this.session = session;
        clients.add(this);

    }

    @OnClose
    public void onClose(Session session, CloseReason reason) {
        System.out.println("socket closed: "+reason.getReasonPhrase());
        clients.remove(this);
    }

    @OnMessage
    public void onMessage(String message){
        broadcast("bc"+message);
    }

    private void broadcast(String message) {
        for(ChatEndpoint client : clients){
            try {
                client.session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                clients.remove(this);
                try {
                    client.session.close();
                } catch (IOException e1) {
                    /*log.error("broadcast error: ",e);
                    log.error("broadcast error 1: ",e1);*/
                    //do nothing
                }

            }
        }
    }
}
