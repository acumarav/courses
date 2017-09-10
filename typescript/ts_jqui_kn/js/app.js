var OptionsService = (function () {
    function OptionsService() {
    }
    OptionsService.prototype.getOptions = function () {
        var opt = [
            new Item(ko.observable(1), ko.observable("One"), ko.observable(100)),
            new Item(ko.observable(2), ko.observable("Two"), ko.observable(20)),
            new Item(ko.observable(7), ko.observable("Seven"), ko.observable(777)),
            new Item(ko.observable(9), ko.observable("Four"), ko.observable(444))
        ];
        return opt;
    };
    return OptionsService;
}());
///
/// <reference path="options.ts" />
///
var Item = (function () {
    function Item(id, name, quantity) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }
    return Item;
}());
var ListVM = (function () {
    function ListVM() {
        this.optService = new OptionsService();
        this.options = this.optService.getOptions();
        this.playlist = ko.observableArray([]);
    }
    ListVM.prototype.getOptions = function () {
        return this.options;
    };
    ListVM.prototype.initView = function () {
        var _this = this;
        $('#options li').draggable({
            revert: 'invalid',
            helper: 'clone'
        });
        $('#timelinePanel').droppable({
            accept: '.asset',
            drop: function (event, ui) {
                var data = ko.dataFor(ui.draggable[0]);
                _this.playlist.push(data);
                console.log("drop");
                console.log(ko.toJSON(_this.playlist));
            }
        });
        $("#frames").sortable({
            receive: function (event, ui) {
                console.log('receive');
            },
            change: function (event, ui) {
                console.log('change');
                console.log(ko.toJSON(_this.playlist));
            }
        });
    };
    return ListVM;
}());
var vm = new ListVM();
ko.applyBindings(vm);
vm.initView();
