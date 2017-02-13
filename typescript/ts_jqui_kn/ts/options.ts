

 class OptionsService{

    public constructor(){}

    public getOptions():Item[]{
        let opt:[Item]=[
            new Item(ko.observable(1),ko.observable("One"),ko.observable(100)),
            new Item(ko.observable(2),ko.observable("Two"),ko.observable(20)),
            new Item(ko.observable(7),ko.observable("Seven"),ko.observable(777)),
            new Item(ko.observable(9),ko.observable("Four"),ko.observable(444))
        ]

        return opt;

    }
}