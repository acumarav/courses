import {ChatEngine} from "./chatengine";

console.log("JS script executed");

class App {

    private chatEngine: ChatEngine;

    public run(): void {
        let url = this.getWsProtocol();
        this.chatEngine = new ChatEngine(url);
        console.log("Chat App has been run, listening on: " + url);
    }

    private getWsProtocol(): string {
        //CHAT_ENDPOINT_URL
        if (window.location.protocol == 'http:') {
            return 'ws://localhost:8080/websocket/chat';
        }
        else {
            return 'wss://localhost:8080/websocket/chat';
        }
    }
}

let app = new App();
app.run();