import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class RegisterService{


    private registerUrl = 'http://localhost:1337/api/v1/user/register';

    constructor(private http: Http){

    }

    register(userRegistration){
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http
               .post(this.registerUrl, JSON.stringify(userRegistration), {headers: headers})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }   

}