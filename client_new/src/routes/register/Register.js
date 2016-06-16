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
import s from './Register.css';

const title = 'New User Registration';

function Register(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <form method="post">
          	<div className={s.formGroup}>
	            <label className={s.label} htmlFor="firstname">
	              First name:
	            </label>
	            <input
	              className={s.input}
	              id="firstname"
	              type="text"
	              name="firstname"
	              autoFocus
	            />
	        </div>
          	<div className={s.formGroup}>
	            <label className={s.label} htmlFor="lastname">
	              Last name:
	            </label>
	            <input
	              className={s.input}
	              id="lastname"
	              type="text"
	              name="lastname"
	            />
          	</div>
          	<div className={s.formGroup}>
	            <label className={s.label} htmlFor="email">
	              Email name:
	            </label>
	            <input
	              className={s.input}
	              id="email"
	              type="text"
	              name="email"
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
	            <button className={s.button} type="submit">
	              Register
	            </button>
	        </div>
        </form>
      </div>
    </div>
  );
}

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Register);
