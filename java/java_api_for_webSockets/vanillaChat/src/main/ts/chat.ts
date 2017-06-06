/// <reference path="typings/jquery.d.ts" />

class Chat {

    constructor(private chatWSEndpoint: string) {
        console.log("WS URL: " + chatWSEndpoint);
        $("#join").click(this.joinChat);
    }

    private joinChat = () => {
        console.log("JOin Chat!");
    }

}

console.log("starting....");
const wsUrl = `${window.location.host}/websocket/chat`;
let app = new Chat(wsUrl);




