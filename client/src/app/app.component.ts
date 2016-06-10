import {Component, Directive, ElementRef, Renderer} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES}             from '@angular/router-deprecated';
import {Http}                                       from '@angular/http';
// import { StoreComponent }                           from './store/store.component';
// import { RegisterComponent }                        from './register/register.component';
// import { LoginComponent }                           from './login/login.component';
// import { HomeComponent }                            from './home/home.component';

/////////////////////////
// ** Example Directive
// Notice we don't touch the Element directly
@Directive({
  selector: '[x-large]'
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
  }
}

@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES,
    XLarge
  ],
  styles: [],
  templateUrl: 'http://localhost:3000/src/app/app.component.html'
})
@RouteConfig([
    // { path: '/',          component: HomeComponent, name: 'Home', useAsDefault: true },
    // { path: '/store',     component: StoreComponent, name: 'Store'},
    // { path: '/register',  component: RegisterComponent, name: 'Register' },
    // { path: '/login',     component: LoginComponent, name: 'Login' },
    // { path: '/**',        redirectTo: ['Home'] }
])
export class App {
 
}
// 