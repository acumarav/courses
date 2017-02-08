/*
import {Component} from '@angular/core';

@Component({
    selector: 'pm-app',
    template: `
        <h1>{{pageTitle}}</h1>
        <div>My first component</div>
    `
})
export class AppComponent {
    pageTitle: string = "Angular2: Getting Started!";
}
*/

import {Component} from '@angular/core';
@Component({
    selector: 'pm-app',
    template:`
<div><h1>{{pageTitle}}</h1>
<div>My first component</div>
</div>
`
})
export class AppComponent{
    pageTitle:string = "Acme Product Manager";
}