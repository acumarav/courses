import {Component} from "@angular/core";
import {IProduct} from "./products/product";

@Component(
    {moduleId:module.id,
    templateUrl:'product-detail.component.html',
    selector:'pm-detail'}
)
export class ProductDetail {
    private pageTitle:string='Product Detail'
    product: IProduct;

}