import React from 'react';
import {reduxForm} from 'redux-form';
import {getValues} from 'redux-form';
import ValidateMessageComponent from '../Validate/Message';

const validate = values => {
  const errors = {}
  if (!values.firstname) {
    errors.firstname = 'Required';
  } else if(values.firstname.length > 50){
    errors.firstname = 'Must be 50 character or less';
  } else if(values.firstname.length < 6){
    errors.firstname = 'Must be 5 character or more';
  }
  if (!values.lastname) {
    errors.lastname = 'Required';
  } else if(values.lastname.length > 50){
    errors.lastname = 'Must be 50 character or less';
  } else if(values.lastname.length < 6){
    errors.lastname = 'Must be 6 character or more';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    errors.email = 'Email Invalid';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if(values.password.length > 30){
    errors.password = 'Must be 30 character or less';
  } else if(values.password.length < 6){
    errors.password = 'Must be 6 character or more';
  }
  if (!values.re_password) {
    errors.re_password = 'Required';
  } else if(values.re_password != values.password){
    errors.re_password = 'Re password not pass';
  }
  return errors
}

class RegisterFormComponent extends React.Component{
  render(){
    const {fields: {firstname, lastname, email, password, re_password}, handleSubmit, registerHandle, submitting} = this.props;
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
              {firstname.touched && firstname.error && <ValidateMessageComponent message={firstname.error} />}
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
              {lastname.touched && lastname.error && <ValidateMessageComponent message={lastname.error} />}
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
              {email.touched && email.error && <ValidateMessageComponent message={email.error} />}
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
              {password.touched && password.error && <ValidateMessageComponent message={password.error} />}
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Re-Password:
              </label>
              <input
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  {...re_password}
              />
              {re_password.touched && re_password.error && <ValidateMessageComponent message={re_password.error} />}
            </div>
            <div className="form-group">
              <button className="btn bg-danger btn-block" type="submit" disabled={submitting}>
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
  fields: ['firstname', 'lastname', 'email', 'password', 're_password'], // all the fields in your form
  asyncBlurFields: [ 'fistname', 'lastname', 'email', 'password', 're_password' ],
  validate 
})(RegisterFormComponent);
export default RegisterFormComponent;
