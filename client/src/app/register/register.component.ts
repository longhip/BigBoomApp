import { Component } 			from '@angular/core';
import { UserRegistration } 	from './register.model';
import { RegisterService} 		from './register.service';



@Component({
	templateUrl: '/app/register/register.component.html',
	directives: [],
	providers: [RegisterService]
})

export class RegisterComponent {
	
	constructor(private registerService: RegisterService) {}

	userRegistration: UserRegistration = {
		firstname: '',
		lastname : '',
		email :'',
		password: '',
		repassword:''
	};

	register(userRegistration: UserRegistration) {
		this.registerService.register(userRegistration);
	}
}