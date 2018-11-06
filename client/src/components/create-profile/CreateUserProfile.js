import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      name: '',
      bio: '',
      city: '',
      website: '',
      role: '',
      skills: '',
      githubusername: '',
      twitter: '',
      facebook: '',
      linkedin: '',
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
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.state.handleChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.state.handleChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="LinkedIn URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.state.handleChange}
            error={errors.linkedin}
          />
        </div>
      );
    }

    const options = [
      {
        label: 'Select Main Role',
        value: 0,
      },
      {
        label: 'Front End Developer',
        value: 'Front End Developer',
      },
      {
        label: 'Back End Developer',
        value: 'Back End Developer',
      },
      {
        label: 'Full Stack Developer',
        value: 'Full Stack Developer',
      },
      {
        label: 'Mobile Developer',
        value: 'Mobile Developer',
      },
      {
        label: 'DevOps Engineer',
        value: 'DevOps Engineer',
      },
      {
        label: 'Embedded Systems Engineer',
        value: 'Embedded Systems Engineer',
      },
      {
        label: 'Other',
        value: 'Other',
      },
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's make your profile stands out
              </p>
              <small className="d-block pb-3">* = required</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.handleChange}
                  error={errors.handle}
                  info="Handle is a unique thing similar to username as URL for your profile"
                />

                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  error={errors.name}
                />

                <TextAreaFieldGroup
                  placeholder="* Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  error={errors.bio}
                  info="Bio is a mini-resume about you"
                />

                <TextFieldGroup
                  placeholder="City"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                  error={errors.city}
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleChange}
                  error={errors.website}
                />

                <SelectListGroup
                  placeholder="Your main role"
                  name="role"
                  value={this.state.role}
                  onChange={this.handleChange}
                  options={options}
                  error={errors.role}
                />

                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.handleChange}
                  error={errors.skills}
                  info="Please use comma without space to separate different skills (e.g. HTML,CSS,JavaScript)"
                />

                <TextFieldGroup
                  placeholder="Your Github username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.handleChange}
                  error={errors.githubusername}
                  info="If you want to show your latest repos, you can include your username here"
                />
                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}
                  >
                    Add Social Networks
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
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

CreateUserProfile.propTypes = {
  userProfile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  errors: state.errors,
});

export default connect(mapStateToProps)(CreateUserProfile);
