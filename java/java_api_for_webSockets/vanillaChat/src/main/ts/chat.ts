/// <reference path="typings/jquery.d.ts" />

class Chat {

    private socket: WebSocket;

    constructor(private chatWSEndpoint: string) {
        console.log("WS URL: " + chatWSEndpoint);

        if ('WebSocket' in window) {
            console.log("connecting....");
            this.socket = new WebSocket(chatWSEndpoint);
            this.socket.onopen = () => {
                console.log("Info: connection opened");
            }
        }
        else {
            console.error('web socket is not supported by your browser!');
            return;
        }

        $("#join").click(this.joinChat);
    }

    private joinChat = () => {
        let name: String = $("#name").val();
        if (name != null && name.length > 0) {

        }
    }

}

let protocol: String;
if (window.location.protocol == 'http:') {
    protocol = 'ws://';
}
else {
    protocol = 'wss://';
}

const wsUrl = `${protocol}${window.location.host}/websocket/chat`;
let app = new Chat(wsUrl);




