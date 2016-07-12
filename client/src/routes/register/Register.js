/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../components/App/App.css';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import RegisterFormComponent from '../../components/Form/Register';

const title = 'New User Registration';
const mapStateToProps = (state) => {
  	return {
    	auth: state.auth
  	};
};

const mapDispatchToProps = (dispatch) => {
  	return {
    	submit: (data) => {
      		dispatch(register(data));
    	}
  	};
};

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);



function Register(props, context) {
  context.setTitle(title);
  return (
    <div className="page-container">
      <div className="container content">
        <div className="col-lg-6 col-lg-offset-3">
          <div className="panel registration-form">
            <div className="panel-body">
              <div className="text-center">
                <div className="icon-object border-success text-success"><i className="icon-plus3"></i></div>
                <h5 className="content-group-lg">Create account <small className="display-block">All fields are required</small></h5>
              </div>
              <RegisterFormComponent submit={props.submit}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(RegisterContainer);
