import {Component, OnInit} from '@angular/core'
import {IProduct} from "./product";
import {ProductService} from "./product.service";

@Component({
    selector: 'pm-products',
    moduleId: module.id,
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.css']
})

export class ProductListComponent implements OnInit {


    constructor(private _productService: ProductService) {
    }

    pageTitle: string = "Product List!";
    errorMessage: string;

    products:Array<IProduct>;

    imageWidth: number = 50;
    imageMargin: number = 2;


    ngOnInit(): void {
        this._productService.getProducts()
            .subscribe(prods=>this.products=prods, error => this.errorMessage=error);
    }

    onRatingClicked(message: number) {
        console.log('OnNotify : ' + message);
    }

    showImage: boolean = false;

    listFilter: string = '';

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}