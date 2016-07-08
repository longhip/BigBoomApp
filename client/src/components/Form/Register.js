import React from 'react';
import {reduxForm} from 'redux-form';
import {getValues} from 'redux-form';

class RegisterFormComponent extends React.Component{
  render(){
    const {fields: {firstname, lastname, email, password}, handleSubmit, registerHandle, submitting} = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(data => {
          this.props.registerHandle(data);
        })}>
          <div className="form-group">
              <label htmlFor="usernameOrEmail">
                First name:
              </label>
              <input
                  className="form-control"
                  id="fistname"
                  type="text"
                  name="fistname"
                  autoFocus
                  {...firstname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="usernameOrEmail">
                  Last name:
              </label>
              <input
                  className="form-control"
                  id="lastname"
                  type="text"
                  name="lastname"
                  {...lastname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="usernameOrEmail">
                Username or email address:
              </label>
              <input
                  className="form-control"
                  id="email"
                  type="text"
                  name="email"
                  {...email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password:
              </label>
              <input
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  {...password}
              />
            </div>
            <div className="form-group">
              <button className="btn bg-slate-700 btn-block" type="submit" disabled={submitting}>
                  Register
              </button>
            </div>
        </form>
      </div>
    );
  }
}
RegisterFormComponent = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'registerForm',                           // a unique name for this form
  fields: ['firstname', 'lastname', 'email','password'] // all the fields in your form
})(RegisterFormComponent);
export default RegisterFormComponent;
