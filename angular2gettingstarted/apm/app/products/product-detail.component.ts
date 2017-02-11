import {Component, OnInit} from "@angular/core";
import {IProduct} from "./product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "./product.service";

@Component(
    {moduleId:module.id,
    templateUrl:'product-detail.component.html',
    selector:'pm-detail'}
)
export class ProductDetail implements OnInit{
    private pageTitle:string='Product Detail'
    product: IProduct;

    constructor(private _route: ActivatedRoute, private _router: Router, private _productService: ProductService){

    }

    ngOnInit():void{
        let id=this._route.snapshot.params['id'];
        this.pageTitle+=`: ${id}`;
    }

    onBack():void{
        this._router.navigate(['/products']);
    }

}