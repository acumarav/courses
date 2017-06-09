var casper = require('casper').create(
  {
    viewportSize: {
      width: 1280,
      height: 1024
    }
  });

casper.start('http://vveplay.com', function () {
  //this.capture('./output/img.png');

  var title = "default";
  /*casper.evaluate(function () {
   var t = this.getTitle();
   console.log('Title: '+t);
   title=t;
   });*/

  casper.waitForSelector('#galleryPanel', function _then() {
    var stamp = new Date().getTime();
    casper.capture('./output/' + stamp + '_img.png');
  }, 5000);

  casper.wait(5000, function () {
    casper.capture('./output/def_img.png');
    casper.thenOpen('http://vveplay.com/embed/186489208', function _then() {
      casper.capture('./output/emb_img.png');

    });
  });


  /*this.waitForSelector('.gallery .video', function () {
   var videos = document.querySelector('.gallery .video');
   casper.capture('./output/img.png');
   console.log(videos);
   },5000);*/
  //this.capture('./output/img.png');
});

casper.run();


