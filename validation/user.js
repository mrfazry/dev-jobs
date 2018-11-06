const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateUserProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.bio = !isEmpty(data.bio) ? data.bio : '';
  data.role = !isEmpty(data.role) ? data.role : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = 'Handle must be between 2 and 30 characters';
  } else if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle is required';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  } else if (!Validator.isLength(data.name, { min: 1, max: 40 })) {
    errors.name = 'Name must be between 1 and 40 characters';
  }

  if (Validator.isEmpty(data.bio)) {
    errors.bio = 'Bio is required as your mini resume';
  } else if (!Validator.isLength(data.bio, { min: 10, max: 200 })) {
    errors.bio = 'Bio must be between 10 and 200 characters';
  }

  if (Validator.isEmpty(data.role)) {
    errors.role = 'Role is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills is required';
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'It is not valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'It is not valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'It is not valid URL';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'It is not valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
