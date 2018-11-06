const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateCompanyProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.industry = !isEmpty(data.industry) ? data.industry : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.founded = !isEmpty(data.founded) ? data.founded : '';

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle is required';
  } else if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = 'Handle must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  } else if (!Validator.isLength(data.name, { min: 1, max: 40 })) {
    errors.name = 'Name must be between 1 and 40 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description is required';
  } else if (!Validator.isLength(data.description, { min: 10, max: 200 })) {
    errors.description = 'Description must be between 10 and 200 characters';
  }

  if (Validator.isEmpty(data.industry)) {
    errors.industry = 'Industry is required';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location is required';
  }

  if (Validator.isEmpty(data.founded)) {
    errors.founded = 'Year founded is required';
  }

  if (!isEmpty(data.telephone)) {
    if (!Validator.isNumeric(data.telephone)) {
      errors.telephone = 'It is not valid telephone number';
    }
  }

  if (!isEmpty(data.email)) {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'It is not valid email';
    }
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'It is not valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
