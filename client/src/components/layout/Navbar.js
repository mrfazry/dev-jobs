import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutAccount } from '../../actions/authActions';
import { clearCurrentUserProfile } from '../../actions/userProfileActions';
import { clearCurrentCompanyProfile } from '../../actions/companyProfileActions';

class Navbar extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.clearCurrentUserProfile();
    this.props.clearCurrentCompanyProfile();
    this.props.logoutAccount();
  }

  render() {
    const { isAuthenticated, account } = this.props.auth;

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            href="/"
            onClick={this.handleClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Dev Jobs
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  {' '}
                  Developers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/companies">
                  {' '}
                  Companies
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { logoutAccount, clearCurrentUserProfile, clearCurrentCompanyProfile }
)(Navbar);
