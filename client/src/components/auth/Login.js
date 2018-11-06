import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import classnames from 'classnames';
import { loginAccount } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: '',
      userPassword: '',
      companyEmail: '',
      companyPassword: '',
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //  I don't know why the if(nextProps.auth.isAuthenticated) undefined

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   }

  //   if (nextProps.errors !== prevState.errors) {
  //     return { errors: nextProps.errors };
  //   } else return null;
  // }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let submitType = e.target.name;

    const user = {
      email: this.state.userEmail,
      password: this.state.userPassword,
    };

    const company = {
      email: this.state.companyEmail,
      password: this.state.companyPassword,
    };

    let account = {};

    if (submitType === 'userSubmit') {
      account = user;
    } else if (submitType === 'companySubmit') {
      account = company;
    }

    this.props.loginAccount(account, submitType);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <div className="row">
                <div className="col-md-6 mx-auto mt-1">
                  <p className="lead text-center">Sign in as developer</p>
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
                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                      value="Sign in as developer"
                    />
                  </form>
                </div>
                <div className="col-md-6 mx-auto mt-1">
                  <p className="lead text-center">Sign in as company</p>
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
                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                      value="Sign in as company"
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

Login.propTypes = {
  loginAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { loginAccount }
)(Login);
