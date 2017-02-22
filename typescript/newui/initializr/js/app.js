var Video = (function () {
    function Video(id, name, thumbnailUrl) {
        this.id = id;
        this.name = name;
        this.thumbnailUrl = thumbnailUrl;
    }
    return Video;
}());
var VideoService = (function () {
    function VideoService() {
    }
    VideoService.prototype.getVideos = function (count, offset) {
        var videos = [];
        var index = 0;
        while (index < count) {
            var id = index + offset + 1;
            var url = (id % 2 == 0) ? "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg02.jpg" : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg04.jpg";
            if (id % 7 == 0) {
                url = "http://big-bunny.com/bigbunny.jpg";
            }
            var vid = new Video(id.toString(), "Video " + id, url);
            videos.push(vid);
            index++;
        }
        return videos;
    };
    return VideoService;
}());
///
/// <reference path="videoService.ts" />
///
var Gallery = (function () {
    function Gallery() {
        var _this = this;
        this.vidService = new VideoService();
        this.visibleVideos = ko.observableArray([]);
        this.videoWidth = ko.observable(160);
        this.itemsPerRow = ko.observable(0);
        this.rowsNumber = ko.observable(3);
        this.offset = ko.observable(0);
        this.layoutItems = function () {
            var pageSize = _this.itemsPerRow() * _this.rowsNumber();
            var frame = _this.vidosBuffer.slice(_this.offset(), pageSize);
            _this.visibleVideos.removeAll();
            for (var _i = 0, frame_1 = frame; _i < frame_1.length; _i++) {
                var vid = frame_1[_i];
                _this.visibleVideos.push(vid);
            }
        };
    }
    Gallery.prototype.initView = function () {
        var _this = this;
        this.vidosBuffer = this.vidService.getVideos(20, this.offset());
        this.calcVideoWidth();
        this.layoutItems();
        $(window).resize(function () {
            _this.calcVideoWidth();
        });
        this.itemsPerRow.subscribe(this.layoutItems);
        this.rowsNumber.subscribe(this.layoutItems);
    };
    Gallery.prototype.calcVideoWidth = function () {
        var galleryWidth = $('#gallery').get(0).clientWidth;
        var marginWidth = 2 * 10;
        var aproxItemsPerRow = Math.floor(galleryWidth / (200 + marginWidth));
        var newVideoWidth = Math.floor(galleryWidth / aproxItemsPerRow) - marginWidth;
        console.log(galleryWidth + " per: " + aproxItemsPerRow);
        this.itemsPerRow(aproxItemsPerRow);
        this.videoWidth(newVideoWidth);
    };
    return Gallery;
}());
var vm = new Gallery();
ko.applyBindings(vm);
vm.initView();
