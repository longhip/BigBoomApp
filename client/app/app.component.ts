import { Component } 					from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } 	from '@angular/router';
import { StoreComponent } 				from './store/store.component';


@Component({
	selector: 'bigboom',
  	templateUrl: '../app/app.component.html',
	directives: [ROUTER_DIRECTIVES]
})

@Routes([
	{ path: '/store', component: StoreComponent }
])

export class AppComponent {

	constructor(){

	}

	name = 'Long'

}