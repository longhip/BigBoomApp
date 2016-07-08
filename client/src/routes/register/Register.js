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
import { postRegister } from '../../actions/register';
import RegisterFormComponent from '../../components/Form/Register';

const title = 'New User Registration';
const mapStateToProps = (state) => {
  	return {
    	register: state.register
  	};
};

const mapDispatchToProps = (dispatch) => {
  	return {
    	postRegister: (registrationData) => {
      		dispatch(postRegister(registrationData));
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
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p className={s.lead}>Register with your username or company email address.</p>
        <RegisterFormComponent registerHandle={props.postRegister} customProps="a"/>
      </div>
    </div>
  );
}

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(RegisterContainer);
