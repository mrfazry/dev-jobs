import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class CreateCompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      name: '',
      description: '',
      industry: '',
      location: '',
      founded: '',
      telephone: '',
      email: '',
      website: '',
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submit');
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Create Your Company Profile
              </h1>
              <p className="lead text-center">
                Let's make your company stands out
              </p>
              <small className="d-block pb-3">* = required</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Company profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.handleChange}
                  error={errors.handle}
                  info="Handle is a unique thing similar to username as URL for your company profile"
                />

                <TextFieldGroup
                  placeholder="* Company name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  error={errors.name}
                />

                <TextAreaFieldGroup
                  placeholder="* Company description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  error={errors.description}
                  info="Short description about your company"
                />

                <TextFieldGroup
                  placeholder="* Industry"
                  name="industry"
                  value={this.state.industry}
                  onChange={this.handleChange}
                  error={errors.industry}
                  info="Main business sector"
                />

                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                  error={errors.location}
                  info="Headquarter or area of operation"
                />

                <TextFieldGroup
                  placeholder="Year company founded"
                  name="founded"
                  value={this.state.founded}
                  onChange={this.handleChange}
                  error={errors.founded}
                />

                <TextFieldGroup
                  placeholder="Company telephone"
                  name="telephone"
                  value={this.state.telephone}
                  onChange={this.handleChange}
                  error={errors.telephone}
                />

                <TextFieldGroup
                  placeholder="Company email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Company website"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleChange}
                  error={errors.website}
                />
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateCompanyProfile.propTypes = {
  userProfile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  errors: state.errors,
});

export default connect(mapStateToProps)(CreateCompanyProfile);
