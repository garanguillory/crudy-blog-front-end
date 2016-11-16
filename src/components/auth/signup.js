import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';
import validate from '../validate'


const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} className="form-control" placeholder={label} type={type}/>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
)

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const {handleSubmit, pristine} = this.props;

    return (
      <form className="container" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="row">
          <div className="col-xs-10 offset-xs-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 signup-form">
            <fieldset className="form-group">
              <Field name="email" type="email" component={renderField} label="Email" />
            </fieldset>
            <fieldset className="form-group">
              <Field name="password" type="password" component={renderField} label="Password" />
            </fieldset>
            {/*<fieldset className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <Field name="confirm_password" className="form-control" component="input" type="password"/>
            </fieldset>*/}
            {/*this.renderAlert()*/}
            <button action="submit" disabled={pristine} className="btn btn-primary col-xs-12">Sign Up</button>
          </div>
        </div>
      </form>
    );
  }
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup);

Signup = connect(
  state => ({
    errorMessage: state.auth.error
  }), actions)(Signup)

export default Signup
















