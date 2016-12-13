/// <reference path="./MdatInfo.ts"/>

class VstubPlayerVM {

    private _originalVideoFileUrl = "http://localhost:8090/mse/sample.mp4";
    private _vstubUrl = "http://localhost:8090/mse/sample.vstub";
    private _mdatInfoUrl = "http://localhost:8090/mse/mdatinfo.json";

    get VideoFileUrl() {
        return this._originalVideoFileUrl;
    }

    run() {
        console.log("enter run...");

        $.get(this._mdatInfoUrl,null, (data: any, textStatus: string, jqXHR: JQueryXHR) => {
            console.log("status: "+textStatus);
            console.log("Echo:  " + JSON.stringify(data));
        });

        /*$.getJSON(this._mdatInfoUrl, (data: any, textStatus: string, jqXHR: JQueryXHR) => {
            console.log("Echo:  " + JSON.stringify(data));
        });*/
        /*.error( (xhr:JQueryXHR,status:string,err:string)=>{
          console.log("err");
            });*/
    }
}

let player = new VstubPlayerVM();
console.log(player.VideoFileUrl);
player.run();
console.log("THE END");

