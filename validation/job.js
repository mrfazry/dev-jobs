const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateJobInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.jobdesc = !isEmpty(data.jobdesc) ? data.jobdesc : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  data.experience = !isEmpty(data.experience) ? data.experience : '';
  data.min = !isEmpty(data.min) ? data.min : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  if (Validator.isEmpty(data.jobdesc)) {
    errors.jobdesc = 'Job description is required';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills requirement is required';
  }

  if (Validator.isEmpty(data.experience)) {
    errors.experience = 'Experience (in years) is required';
  } else if (!Validator.isNumeric(data.experience)) {
    errors.experience = 'It is not valid type of experience';
  }

  if (Validator.isEmpty(data.min)) {
    errors.min = 'Minimum salary is required';
  } else if (!Validator.isNumeric(data.min)) {
    errors.min = 'It is not valid type of minimum salary';
  }

  if (!isEmpty(data.max)) {
    if (!Validator.isNumeric(data.max)) {
      errors.max = 'It is not valid type of maximum salary';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
