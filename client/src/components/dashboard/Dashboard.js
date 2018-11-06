import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../actions/userProfileActions';
import { getCurrentCompanyProfile } from '../../actions/companyProfileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    const { account } = this.props.auth;

    if (account.type === 'user') {
      this.props.getCurrentUserProfile();
    } else if (account.type === 'company') {
      this.props.getCurrentCompanyProfile();
    }
  }
  render() {
    const { account } = this.props.auth;
    let profile = null,
      loadingState;

    if (account.type === 'user') {
      const { userProfile, loading } = this.props.userProfile;
      profile = userProfile;
      loadingState = loading;
    } else if (account.type === 'company') {
      const { companyProfile, loading } = this.props.companyProfile;
      profile = companyProfile;
      loadingState = loading;
    }

    let dashboardContent;

    if (profile === null || loadingState) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>DISPLAY PROFILE</h4>;
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome!</p>
            <p>You have no profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  userProfile: PropTypes.object,
  companyProfile: PropTypes.object,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  companyProfile: state.companyProfile,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getCurrentUserProfile, getCurrentCompanyProfile }
)(Dashboard);
