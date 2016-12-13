/// <reference path="./MdatInfo.ts"/>

class VstubPlayerVM {

    private _originalVideoFileUrl = "http://localhost:8090/mse/sample.mp4";
    private _vstubUrl = "http://localhost:8090/mse/sample.vstub";
    private _mdatInfoUrl = "http://localhost:8090/mse/mdatinfo.json";

    private mdatInfo: MdatInfo=null;

    private isMdatReady=ko.observable(false);

    get VideoFileUrl() {
        return this._originalVideoFileUrl;
    }

    loadMdatInfo() {
        $.get(this._mdatInfoUrl, (data: any, textStatus: string, jqXHR: JQueryXHR) => {
            //console.log("Data:  " + JSON.stringify(data));
            this.mdatInfo=<MdatInfo>data;
            console.log(this.mdatInfo);
            this.isMdatReady(true);
        },"text");



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
player.loadMdatInfo();
console.log("THE END");

