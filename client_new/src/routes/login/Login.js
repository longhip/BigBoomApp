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
import AlertComponent from '../../components/Alert/Alert';
import Formsy from 'formsy-react';
import InputComponent from '../../components/Form/Input';

class Login extends Component {

    static contextTypes = {
        setTitle: PropTypes.func.isRequired,
    };

    constructor(){
        super();
        this.state = {
          registerSuccess: false,
          registerFailed: false
        };
        this.data = {
            email: null,
            password: null
        }
        this.style = {
            marginTop: '20px'
        };
    }

    componentWillMount() {
        this.context.setTitle('Login');
    };

    componentWillUnMount() {

    };

    login(model) {
        console.log(model);
    }
    render() {
        Formsy.addValidationRule('isRequired', function (values, value) {
            return value != undefined && value != '' && value != null;
        });
        return (
            <div className="container" style={this.style}>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-white">
                            <div className="panel-heading">
                                <h6 className="panel-title text-primary"><i className="icon-user-plus"></i> Login to your accout</h6>
                                <a className="heading-elements-toggle"><i className="icon-more"></i></a>
                            </div>
                            <div className="panel-body">
                                <Formsy.Form onSubmit={()=>{}} onValidSubmit={this.login} noValidate>
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
                                                isRequired: 'This field is required',
                                                isEmail: 'You have to type valid email',
                                                maxLength: 'You can not type in more than 50 characters',
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="password">
                                        Password:
                                      </label>
                                        <InputComponent type="password" name="password" validations="minLength:6" validationError="This password more than 6 character"/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Login
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
export default Login;
