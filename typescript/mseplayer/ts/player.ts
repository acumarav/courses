class VstubPlayer {

    private _originalVideoFileUrl="http://localhost:8090/mse/sample.mp4";
    private _vstubUrl = "http://localhost:8090/mse/sample.vstub";
    private _mdatInfo = "http://localhost:8090/mse/mdatinfo.json";

    get VideoFileUrl(){
        return this._originalVideoFileUrl;
    }

    run(){

    }
}

let player= new VstubPlayer();
console.log(player.VideoFileUrl);

