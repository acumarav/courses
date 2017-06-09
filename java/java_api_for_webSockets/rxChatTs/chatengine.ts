
export class ChatEngine{

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
            //let msg = new TextMessage("Join", name);
            let msg = {id: 1, message: name};
            this.sendMessage(JSON.stringify(msg));
        }
    }

private sendMessage(msg: any) {
        this.socket.send(msg);
    }

}