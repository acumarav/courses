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
            if (id % 5 == 0) {
                url = "http://big-bunny.com/bigbunny.jpg";
            }
            var vid = new Video(id.toString(), "Video " + id, url);
            videos.push(vid);
            index++;
        }
        return videos;
    };
    VideoService.prototype.getThumbnails = function (video) {
        return [
            "https://pocasi.seznam.cz/img/hp-large/jihlava/winter/6.jpg",
            "https://pocasi.seznam.cz/img/hp-large/karlovy-vary/winter/6.jpg",
            "https://pocasi.seznam.cz/img/hp-large/kladno/winter/6.jpg",
            "https://pocasi.seznam.cz/img/hp-large/pardubice/winter/4.jpg",
            "https://pocasi.seznam.cz/img/hp-large/praha/winter/8.jpg",
            "https://pocasi.seznam.cz/img/hp-large/usti-nad-labem/winter/7.jpg",
            "https://pocasi.seznam.cz/img/hp-large/zlin/winter/7.jpg",
            "https://pocasi.seznam.cz/img/hp-large/jihlava/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/karlovy-vary/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/kladno/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/pardubice/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/praha/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/usti-nad-labem/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/zlin/winter/1.jpg",
            "https://pocasi.seznam.cz/img/hp-large/jihlava/winter/2.jpg",
            "https://pocasi.seznam.cz/img/hp-large/karlovy-vary/winter/2.jpg",
            "https://pocasi.seznam.cz/img/hp-large/kladno/winter/2.jpg",
            "https://pocasi.seznam.cz/img/hp-large/pardubice/winter/2.jpg",
            "https://pocasi.seznam.cz/img/hp-large/praha/winter/2.jpg",
            "https://pocasi.seznam.cz/img/hp-large/usti-nad-labem/winter/2.jpg",
            "https://pocasi.seznam.cz/img/hp-large/zlin/winter/2.jpg"
        ];
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
        this.rowsNumber = ko.observable(2);
        this.offset = ko.observable(0);
        this.videoFrames = ko.observableArray([]);
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
        //todo:  remove:
        this.videoFrames.push(this.vidosBuffer[4]);
        this.videoFrames.push(this.vidosBuffer[5]);
        this.videoFrames.push(this.vidosBuffer[6]);
        this.calcVideoWidth();
        this.layoutItems();
        $(window).resize(function () {
            _this.calcVideoWidth();
        });
        this.itemsPerRow.subscribe(this.layoutItems);
        this.rowsNumber.subscribe(this.layoutItems);
        this.setupDragAndDrop();
        this.setupSlider();
    };
    Gallery.prototype.setupSlider = function () {
        $('#thumbnailsSliderDiv').slider({
            range: true,
            min: 0,
            max: 3,
            values: [0, 1, 2, 3]
        });
        console.log('setupSlider');
    };
    Gallery.prototype.setupDragAndDrop = function () {
        var _this = this;
        $('#gallery > .video').draggable({
            revert: 'invalid',
            helper: 'clone'
        });
        $('#frames').droppable({
            accept: '.video',
            drop: function (event, ui) {
                var data = ko.dataFor(ui.draggable[0]);
                _this.videoFrames.push(data);
            }
        });
        $("#frames").sortable({
            receive: function (event, ui) {
                console.log('receive');
            },
            update: function (event, ui) {
                console.log("update");
                var dropedFrame = ko.dataFor(ui.item[0]);
                var deltaPx = ui.position.left + ui.originalPosition.left;
                var newPosition = deltaPx / ui.item[0].clientWidth;
                console.log("moved by: " + newPosition + " DELTA: " + deltaPx);
            }
        });
    };
    Gallery.prototype.calcVideoWidth = function () {
        var galleryWidth = $('#gallery').get(0).clientWidth;
        var marginWidth = 2 * 10 + 2 * 30;
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
