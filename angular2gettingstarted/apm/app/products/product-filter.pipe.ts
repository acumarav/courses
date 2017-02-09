import {PipeTransform, Pipe} from "@angular/core";
import {IProduct} from "./product";

@Pipe({
    name: 'productFilter'

})
export class ProductFilterPipe implements PipeTransform {

    transform(value: IProduct[], filterBy: string): IProduct[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

        return filterBy ? value.filter((prod:IProduct)=>
            prod.productName.toLocaleLowerCase().indexOf(filterBy) !==-1) : value;
    }
}