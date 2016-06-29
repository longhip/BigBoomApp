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

const title = 'New User Registration';

const mapStateToProps = (state) => {
  	return {
    	register: state.register
  	}
}

const mapDispatchToProps = (dispatch) => {
  	return {
    	postRegister: (registrationData) => {
      		dispatch(postRegister(registrationData))
    	}
  	}
}

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)



function Register(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p className={s.lead}>Register with your username or company email address.</p>
        <form >
        	<div className={s.formGroup}>
	            <label className={s.label} htmlFor="usernameOrEmail">
	              First name:
	            </label>
	            <input
	              	className={s.input}
	              	id="usernameOrEmail"
	              	type="text"
	              	name="usernameOrEmail"
	              	autoFocus
	            />
          	</div>
          	<div className={s.formGroup}>
	            <label className={s.label} htmlFor="usernameOrEmail">
	              	Last name:
	            </label>
	            <input
	              	className={s.input}
	              	id="usernameOrEmail"
	              	type="text"
	              	name="usernameOrEmail"
	            />
          	</div>
          	<div className={s.formGroup}>
	            <label className={s.label} htmlFor="usernameOrEmail">
	              Username or email address:
	            </label>
	            <input
	              	className={s.input}
	              	id="usernameOrEmail"
	              	type="text"
	              	name="usernameOrEmail"
	            />
          	</div>
          	<div className={s.formGroup}>
	            <label className={s.label} htmlFor="password">
	              Password:
	            </label>
	            <input
	              	className={s.input}
	              	id="password"
	              	type="password"
	              	name="password"
	            />
          	</div>
          	<div className={s.formGroup}>
	            <button className="btn bg-slate-700 btn-block" type="submit">
	              	Register
	            </button>
          	</div>
        </form>
      </div>
    </div>
  );
}

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(RegisterContainer);
