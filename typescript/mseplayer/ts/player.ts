/// <reference path="./MdatInfo.ts"/>

class VstubPlayerVM {

    private _originalVideoFileUrl = "http://localhost:8090/mse/sample.mp4";
    private _vstubUrl = "http://localhost:8090/mse/sample.vstub";
    private _mdatInfoUrl = "http://localhost:8090/mse/mdatinfo.json";

    get VideoFileUrl() {
        return this._originalVideoFileUrl;
    }

    run() {
        $.getJSON(this._mdatInfoUrl, md => {
            console.log("Callback.........");
            console.log("Echo:  " + JSON.stringify(md));
        });
    }
}

let player = new VstubPlayerVM();
console.log(player.VideoFileUrl);
player.run();
console.log("THE END");

