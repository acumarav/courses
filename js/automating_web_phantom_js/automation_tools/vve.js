var casper = require('casper').create(
  {
  viewportSize: {
  width: 1280,
  height: 1024}
});

casper.start('http://vveplay.com', function () {
  //this.capture('./output/img.png');

  var title = this.evaluate(function () {
    return this.getTitle();
  });

  var casper=this;

  this.waitForSelector('.gallery .video', function () {
    var videos = document.querySelector('.gallery .video');
    casper.capture('./output/img.png');
    console.log(videos);
  },5000);
  console.log('Title: '+title);
  //this.capture('./output/img.png');

});
casper.run();


