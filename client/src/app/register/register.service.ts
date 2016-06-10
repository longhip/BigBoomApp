import { Injectable } 			from '@angular/core';
import { Http, Headers } 		from '@angular/http';
import { UserRegistration } 	from './register.model';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class RegisterService {	

	private heroesUrl = 'app/heroes';

	constructor(private http: Http) { }

	register(userRegistration: UserRegistration): Promise<UserRegistration> {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});
		return this.http.post(this.heroesUrl, JSON.stringify(userRegistration), { headers: headers })
			.toPromise()
			.then(response => response.json().data)
			.catch(this.handleError);
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}