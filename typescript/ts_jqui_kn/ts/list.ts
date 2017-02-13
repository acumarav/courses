///
/// <reference path="options.ts" />
///
class Item {
    constructor(public id: KnockoutObservable<number>, public name: KnockoutObservable<string>, public quantity: KnockoutObservable<number>) {
    }
}

class ListVM {
    private optService: OptionsService = new OptionsService();

    private options: Item[];
    private playlist: KnockoutObservableArray<Item>;

    constructor() {
        this.options = this.optService.getOptions();
        this.playlist = ko.observableArray([]);
    }

    public getOptions() {
        return this.options;
    }

    public initView() {
        $('#options li').draggable({
            revert: 'invalid',
            helper: 'clone'
        });

        $('#timelinePanel').droppable(
            {
                accept:'.asset',
                drop: (event, ui) => {
                   let data:Item=ko.dataFor(ui.draggable[0]);
                   this.playlist.push(data);
                   console.log("drop");
                    console.log(ko.toJSON(this.playlist));
                }
            }
        );

        $("#frames").sortable({
            receive:(event,ui)=>{
                console.log('receive');
            },
            change:(event,ui)=>{
                console.log('change');
                console.log(ko.toJSON(this.playlist));
            }
        });

    }
}


let vm = new ListVM();
ko.applyBindings(vm);
vm.initView();
