import {Page, NavController, Storage, LocalStorage, Alert} from 'ionic-angular';
import { RegisterService } from './register.service';
import { StorePage} from '../store/store';

export class UserRegistration {
    name: {
		firstname: String;
    	lastname: String;
	}
    email: String;
    password: String;
    re_password: String;
}
@Page({
  templateUrl: 'build/pages/register/register.html',
  providers: [RegisterService]
})
export class RegisterPage {

	userRegistration: UserRegistration = {
		name: {
			firstname: '',
			lastname: '',
		},
		email: '',
		password: '',
		re_password: ''
	}

	constructor(public nav: NavController, private service: RegisterService) {}

	register(userRegistration: UserRegistration){
		this.service.register(userRegistration).then(response => {
			if(response.status){
				let local = new Storage(LocalStorage);
				local.set('member', response.data.member);
				local.set('token', response.data.token);
				let alert = Alert.create({
					title: 'Register successfully!',
					message: 'Please click Ok for continue',
					buttons: [
						{
							text: 'Ok',
							handler: () => {
								this.nav.setRoot(StorePage);
							}
						}
					]
				});
				this.nav.present(alert);
			} else {
				let alert = Alert.create({
					title: 'Register failed!',
					message: 'Description',
					buttons: ['Dismiss']
				});
				this.nav.present(alert);
			}
		})
	}
}
