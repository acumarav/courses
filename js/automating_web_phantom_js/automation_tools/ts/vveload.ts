import {Casper, CasperOptions} from "casperjs";

let options: CasperOptions = {};

options.viewportSize = {width: 1280, height: 1024};


let casper: Casper = new Casper(options);

casper.start('http://vveplay.com').then(() => {
    //let title:String =  this.evaluate(()=>this.getTitle())
    let title: String = this.getTitle();
    this.capture("./output/img.png")

});

casper.run(() => {
    console.log("run Complete");
}, 3000);

/*
 casper.start('http://vveplay.com', function () {
 //this.capture('./output/img.png');

 var title = this.evaluate(function () {
 return this.getTitle();
 });

 var casper = this;

 this.waitForSelector('.gallery .video', function () {
 var videos = document.querySelector('.gallery .video');
 casper.capture('./output/img.png');
 console.log(videos);
 }, 5000);
 console.log('Title: ' + title);
 //this.capture('./output/img.png');

 });
 casper.run();*/


