/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import RegisterStore from '../../stores/register/register.store';
import * as RegisterAction from '../../actions/register/register.action';
import AlertComponent from '../../components/Alert/Alert';
import InputComponent from '../../components/Form/Input';
import Formsy from 'formsy-react';


let VALIDATION_MESSAGES = {
	'REQUIRED':'This field is required!',
	'MAX_LENGTH':'Too long!',
	'MIN_LENGTH':'Too short!',
	'EMAIL':'This field is invalid email!'
}

class Register extends Component {

	static contextTypes = {
    	setTitle: PropTypes.func.isRequired,
  	};

	constructor(){
		super();
		this.state = {
			registerSuccess: false,
			registerFailed: false
		};
		this.style = {
			marginTop: '20px'
		};
	}

	componentWillMount() {
		this.context.setTitle('Register');
		RegisterStore.on('change', (data) => {
			if(data.status) {
				this.setState({
					registerSuccess: true,
					registerFailed: false
				});
				this.refs.form.reset();
			} else {
				this.setState({
					registerSuccess: false,
					registerFailed: true
				});
			}
		});
	}

	componentWillUnMount() {

	}

	register(model) {
		RegisterAction.register(model);
	}

  	render() {
  		
  		Formsy.addValidationRule('isRequired', function (values, value) {
            return value != undefined && value != '' && value != null;
        });
		return (
		    <div className="container" style={this.style}>
	          	<div className="row">
	          		<div className="col-md-6 col-md-offset-3">
	          			{this.state.registerSuccess ? <AlertComponent message="Register success!" type="success" description="Please check your email for confirm this account!" /> : false}
	          			{this.state.registerFailed ? <AlertComponent message="Register failed!" type="danger" description="Please check your data" /> : false}
	          			<div className="panel panel-white">
	          				<div className="panel-heading">
								<h6 className="panel-title text-primary"><i className="icon-user-plus"></i> Register</h6>
								<a className="heading-elements-toggle"><i className="icon-more"></i></a>
							</div>
	          				<div className="panel-body">
	          					<Formsy.Form onSubmit={()=>{}} onValidSubmit={this.register} ref="form">
		          					<div className="form-group">
							            <label htmlFor="firstname">
							              First name:
							            </label>
							            <InputComponent type="text" name="name.firstname" 
	                                        validations={{
	                                            isRequired:true,
	                                            maxLength: 50
	                                        }}
	                                        validationErrors={{
	                                            isRequired: VALIDATION_MESSAGES.REQUIRED,
	                                            maxLength: VALIDATION_MESSAGES.MAX_LENGTH,
	                                        }}
	                                    />
							        </div>
						          	<div className="form-group">
							            <label htmlFor="lastname">
							              Last name:
							            </label>
							            <InputComponent type="text" name="name.lastname" 
	                                        validations={{
	                                            isRequired:true,
	                                            maxLength: 50
	                                        }}
	                                        validationErrors={{
	                                            isRequired: VALIDATION_MESSAGES.REQUIRED,
	                                            maxLength: VALIDATION_MESSAGES.MAX_LENGTH,
	                                        }}
	                                    />
						          	</div>
						          	<div className="form-group">
							            <label htmlFor="email">
							              Email:
							            </label>
							            <InputComponent type="email" name="email" 
	                                        validations={{
	                                            isRequired:true,
	                                            isEmail: true,
	                                            maxLength: 50
	                                        }}
	                                        validationErrors={{
	                                            isRequired: VALIDATION_MESSAGES.REQUIRED,
	                                            isEmail: VALIDATION_MESSAGES.EMAIL,
	                                            maxLength: VALIDATION_MESSAGES.MAX_LENGTH,
	                                        }}
	                                    />
						          	</div>
						          	<div className="form-group">
							            <label htmlFor="password">
							              Password:
							            </label>
							            <InputComponent type="password" name="password" 
	                                        validations={{
	                                            isRequired:true,
	                                            maxLength: 50
	                                        }}
	                                        validationErrors={{
	                                            isRequired: VALIDATION_MESSAGES.REQUIRED,
	                                            maxLength: VALIDATION_MESSAGES.MAX_LENGTH,
	                                        }}
	                                    />
						          	</div>
							        <div className="form-group">
							            <button type="submit" className="btn btn-primary btn-block">
							              Register
							            </button>
							        </div>
						        </Formsy.Form>
	          				</div>
	          			</div>
	          		</div>	
	          	</div>
		    </div>
		);
	}
}
export default Register;
