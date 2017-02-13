import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpModule} from "@angular/http";

import { AppComponent }  from './app.component';
import {ProductListComponent} from './products/product-list.component';
import {ProductFilterPipe} from './products/product-filter.pipe'
import {StarComponent} from "./shared/star.component";
import {ProductDetail} from "./products/product-detail.component";
import {WelcomeComponent} from "./home/welcome.component";
import {RouterModule} from "@angular/router";
import {ProductDetailGuard} from "./products/product-guard.service";


@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule ,
    RouterModule.forRoot([
        {path:'products',component:ProductListComponent},
        {path:'product/:id',component:ProductDetail, canActivate:[ProductDetailGuard]},
        {path:'welcome',component:WelcomeComponent},
        {path:'',redirectTo:'welcome', pathMatch:'full'}
        /*{path:'**',component:PageNotFoundComponent}*/
    ],{useHash:false})],
  declarations: [ AppComponent, ProductListComponent, ProductFilterPipe,
    StarComponent, ProductDetail, WelcomeComponent ],
    providers:[ProductDetailGuard],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
