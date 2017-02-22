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

    private videoFrames: KnockoutObservableArray<Video>=ko.observableArray([]);

    private vidosBuffer: Video[];


    public initView() {
        this.vidosBuffer = this.vidService.getVideos(20, this.offset());
        this.calcVideoWidth();
        this.layoutItems();

        $(window).resize(() => {
            this.calcVideoWidth();
        });

        this.itemsPerRow.subscribe(this.layoutItems);
        this.rowsNumber.subscribe(this.layoutItems);
        this.setupDragAndDrop();
    }

    private setupDragAndDrop(){
        $('#gallery div').draggable({
            revert: 'invalid',
            helper: 'clone'
        });

        $('#frames').droppable(
            {
                accept:'.video',
                drop: (event, ui) => {
                    let data:Video=ko.dataFor(ui.draggable[0]);
                    this.videoFrames.push(data);
                    console.log("drop");
                }
            }
        );
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
        let marginWidth = 2*10;
        let aproxItemsPerRow = Math.floor(galleryWidth / (200+ marginWidth));
        let newVideoWidth = Math.floor(galleryWidth / aproxItemsPerRow)- marginWidth;

        console.log(galleryWidth + " per: " + aproxItemsPerRow);

        this.itemsPerRow(aproxItemsPerRow);
        this.videoWidth(newVideoWidth);
    }
}

let vm = new Gallery();
ko.applyBindings(vm);
vm.initView();