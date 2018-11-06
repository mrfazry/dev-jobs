import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import axios from 'axios';
import { withRouter } from 'react-router-dom';
//import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerAccount } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: '',
      userPassword: '',
      userPassword2: '',
      companyEmail: '',
      companyPassword: '',
      companyPassword2: '',
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  /*
    componentWillReceiveProps(nextProps) will be deprecated and replaced by static getDerivedStateFromProps(nextProps, prevState)

    componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  } 
  */

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    } else return null;
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let submitType = e.target.name;

    const newUser = {
      email: this.state.userEmail,
      password: this.state.userPassword,
      password2: this.state.userPassword2,
    };

    const newCompany = {
      email: this.state.companyEmail,
      password: this.state.companyPassword,
      password2: this.state.companyPassword2,
    };

    let newAccount = {};

    if (submitType === 'userSubmit') {
      newAccount = newUser;
    } else if (submitType === 'companySubmit') {
      newAccount = newCompany;
    }

    //console.log(submitType, newAccount);

    this.props.registerAccount(newAccount, submitType, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <div className="row">
                {
                  //className="col-md-8 m-auto"
                }
                <div className="col-md-6 mx-auto mt-1">
                  <p className="lead text-center">
                    Create your developer account
                  </p>
                  <form
                    noValidate
                    onSubmit={this.handleSubmit}
                    name="userSubmit"
                  >
                    <TextFieldGroup
                      type="email"
                      placeholder="Email Address"
                      name="userEmail"
                      value={this.state.userEmail}
                      onChange={this.handleChange}
                      error={errors.userEmail}
                    />
                    <TextFieldGroup
                      type="password"
                      placeholder="Password"
                      name="userPassword"
                      value={this.state.userPassword}
                      onChange={this.handleChange}
                      error={errors.userPassword}
                    />
                    <TextFieldGroup
                      type="password"
                      placeholder="Confirm Password"
                      name="userPassword2"
                      value={this.state.userPassword2}
                      onChange={this.handleChange}
                      error={errors.userPassword2}
                    />
                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                      value="Create Your Developer Account"
                    />
                  </form>
                </div>
                {
                  //className="col-md-8 m-auto"
                }
                <div className="col-md-6 mx-auto mt-1">
                  <p className="lead text-center">
                    Create your company account
                  </p>
                  <form
                    noValidate
                    onSubmit={this.handleSubmit}
                    name="companySubmit"
                  >
                    <TextFieldGroup
                      type="email"
                      placeholder="Email Address"
                      name="companyEmail"
                      value={this.state.companyEmail}
                      onChange={this.handleChange}
                      error={errors.companyEmail}
                    />
                    <TextFieldGroup
                      type="password"
                      placeholder="Password"
                      name="companyPassword"
                      value={this.state.companyPassword}
                      onChange={this.handleChange}
                      error={errors.companyPassword}
                    />
                    <TextFieldGroup
                      type="password"
                      placeholder="Confirm Password"
                      name="companyPassword2"
                      value={this.state.companyPassword2}
                      onChange={this.handleChange}
                      error={errors.companyPassword2}
                    />
                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                      value="Create Your Company Account"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ auth: state.auth, errors: state.errors });

export default connect(
  mapStateToProps,
  { registerAccount }
)(withRouter(Register));
