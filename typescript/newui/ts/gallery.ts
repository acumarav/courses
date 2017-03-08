///
/// <reference path="videoService.ts" />
///

class Gallery {

    private vidService: VideoService = new VideoService();
    private visibleVideos: KnockoutObservableArray<Video> = ko.observableArray([]);
    private videoWidth: KnockoutObservable<number> = ko.observable(160);
    private itemsPerRow: KnockoutObservable<number> = ko.observable(0);
    private rowsNumber: KnockoutObservable<number> = ko.observable(2);
    private offset: KnockoutObservable<number> = ko.observable(0);

    private videoFrames: KnockoutObservableArray<Video> = ko.observableArray([]);


    private fromFrame: KnockoutObservable<number> = ko.observable(0);
    private toFrame: KnockoutObservable<number> = ko.observable(3);


    private vidosBuffer: Video[];


    public initView() {
        this.vidosBuffer = this.vidService.getVideos(20, this.offset());

        //todo:  remove:
        this.videoFrames.push(this.vidosBuffer[4]);
        this.videoFrames.push(this.vidosBuffer[5]);
        this.videoFrames.push(this.vidosBuffer[6]);

        this.calcVideoWidth();
        this.layoutItems();

        $(window).resize(() => {
            this.calcVideoWidth();
        });

        this.itemsPerRow.subscribe(this.layoutItems);
        this.rowsNumber.subscribe(this.layoutItems);
        this.setupDragAndDrop();
        this.setupSlider();
    }

    private setupSlider(): void {
        $('#thumbnailsSliderDiv').slider({
            range: true,
            min: 0,
            max: 3,
            values: [0, 3]
        });

        console.log('setupSlider');
    }

    private setupDragAndDrop() {
        $('#gallery > .video').draggable({
            revert: 'invalid',
            helper: 'clone'
        });

        $('#frames').droppable(
            {
                accept: '.video',
                drop: (event, ui) => {
                    let data: Video = ko.dataFor(ui.draggable[0]);
                    this.videoFrames.push(data);
                }
            }
        );

        $("#frames").sortable({
            receive: (event, ui) => {
                console.log('receive');
            },
            update: (event, ui) => {
                console.log("update");
                let dropedFrame: Video = ko.dataFor(ui.item[0]);
                let deltaPx = ui.position.left + ui.originalPosition.left;
                let newPosition = deltaPx / ui.item[0].clientWidth;

                console.log("moved by: " + newPosition + " DELTA: " + deltaPx);

            }
        });
    }

    private layoutItems = () => {
        let pageSize = this.itemsPerRow() * this.rowsNumber();
        let frame = this.vidosBuffer.slice(this.offset(), pageSize);
        this.visibleVideos.removeAll();
        for (let vid of frame) {
            this.visibleVideos.push(vid);
        }
    }

    private calcVideoWidth() {
        let galleryWidth = $('#gallery').get(0).clientWidth;
        let marginWidth = 2 * 10 + 2 * 30;
        let aproxItemsPerRow = Math.floor(galleryWidth / (200 + marginWidth));
        let newVideoWidth = Math.floor(galleryWidth / aproxItemsPerRow) - marginWidth;

        console.log(galleryWidth + " per: " + aproxItemsPerRow);

        this.itemsPerRow(aproxItemsPerRow);
        this.videoWidth(newVideoWidth);
    }
}

//--bindings
ko.bindingHandlers.jqSlider = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        //initialize the control
        var options = allBindingsAccessor().jqOptions || {};
        $(element).slider(options);

        //handle the value changing in the UI
        ko.utils.registerEventHandler(element, "slidechange", function () {
            //would need to do some more work here, if you want to bind against non-observables
            var observable = valueAccessor();
            observable($(element).slider("value"));
        });

    },
    //handle the model value changing
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).slider("value", value);

    }
};
//
ko.bindingHandlers.rangeSlider = {
    init: function (element, valueAccessorFrom,  allBindingsAccessor) {

        //initialize the control
        debugger;
        var rangeOpts = allBindingsAccessor().jqOptions || {};

        var options = {
            range: true,
            min: rangeOpts.min,
            max: rangeOpts.max,
            values: [rangeOpts.min, rangeOpts.max]
        }
        //debugger;
        /*var from = ko.utils.unwrapObservable(valueAccessorFrom());
         var to = ko.utils.unwrapObservable(valueAccessorTo());
         var options = {
         range: true,
         min: from,
         to: to,
         values: [from, to]
         }*/

        $(element).slider(options);

        //handle the value changing in the UI
        /*  ko.utils.registerEventHandler(element, "slidechange", function () {
         //would need to do some more work here, if you want to bind against non-observables
         var observable = valueAccessorFrom();
         observable($(element).slider("value"));
         });*/

    },
    //handle the model value changing
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessorFrom());
        $(element).slider("value", value);

    }
};
//-------- binding end

let vm = new Gallery();
ko.applyBindings(vm);
vm.initView();