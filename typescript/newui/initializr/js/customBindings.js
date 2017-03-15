ko.bindingHandlers.sortableList = {
    init: function (element, valueAccessor, allBindingsAccessor, context) {
        //$(element).data("sortList", valueAccessor()); //attach meta-data
        $(element).sortable({
            update: function (event, ui) {
                console.log("update ");
                console.log("context "+context);
                var dropedFrame = ko.dataFor(ui.item[0]);
                var pdata = ko.dataFor(ui.item.parent());
                var position = ko.utils.arrayIndexOf(ui.item.parent().children(), ui.item[0]);
                console.log("NEW POSITON: " + position);
                context.moveFrameToPosition(position,dropedFrame);
            }
        });
    }
};