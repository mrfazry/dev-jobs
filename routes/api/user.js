const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load validation
const validateUserProfileInput = require('../../validation/user');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// load User model
const User = require('../../models/User');
// load Account model
const Account = require('../../models/Account');

// @route  GET api/user
// @desc   get current user data/profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    const type = 'user';
    if (req.user.type !== type) {
      errors[type] = `This account is not ${type}`;
      return res.status(400).json(errors);
    }

    User.findOne({ account: req.user.id })
      .populate('account', ['type'])
      .then(user => {
        if (!user) {
          errors.user = 'No profile found for this user';
          return res.status(404).json(errors);
        }

        res.json(user);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  GET api/user/all
// @desc   get all users
// @access Public
router.get('/all', (req, res) => {
  const errors = {};
  User.find()
    .populate('account', ['type'])
    .then(users => {
      if (!users) {
        errors.user = 'No profiles found';
        return res.status(404).json(errors);
      }

      res.json(users);
    })
    .catch(err => {
      errors.user = 'No profiles found';
      res.status(404).json(errors);
    });
});

// @route  GET api/user/handle/:handle
// @desc   get user profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  User.findOne({ handle: req.params.handle })
    .populate('account', ['type'])
    .then(user => {
      if (!user) {
        errors.user = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(user);
    })
    .catch(err => res.status(404).json(err));
});

// @route  GET api/user/user_id/:user_id
// @desc   get user by user_id/:user_id
// @access Public
router.get('/user_id/:user_id', (req, res) => {
  const errors = {};
  User.findOne({ id: req.params.user_id })
    .populate('account', ['type'])
    .then(user => {
      if (!user) {
        errors.user = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(user);
    })
    .catch(err => {
      errors.user = 'There is no profile for this user';
      res.status(404).json(errors);
    });
});

// @route  POST api/user
// @desc   create and update current user data/profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //check account type
    const type = 'user';
    if (req.user.type !== type) {
      let errors = {};
      errors[type] = `This account is not ${type}`;
      return res.status(400).json(errors);
    }

    const { errors, isValid } = validateUserProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const userProfileFields = {};
    userProfileFields.account = req.user.id;

    if (req.body.handle) {
      userProfileFields.handle = req.body.handle;
    }

    if (req.body.name) {
      userProfileFields.name = req.body.name;
    }

    if (req.body.bio) {
      userProfileFields.bio = req.body.bio;
    }

    if (req.body.city) {
      userProfileFields.city = req.body.city;
    }

    if (req.body.website) {
      userProfileFields.website = req.body.website;
    }

    if (req.body.role) {
      userProfileFields.role = req.body.role;
    }

    if (req.body.githubusername) {
      userProfileFields.githubusername = req.body.githubusername;
    }

    //skills has to be split into array
    if (typeof req.body.skills !== 'undefined') {
      userProfileFields.skills = req.body.skills.split(',');
    }

    //social
    userProfileFields.social = {};
    if (req.body.twitter) {
      userProfileFields.social.twitter = req.body.twitter;
    }

    if (req.body.facebook) {
      userProfileFields.social.facebook = req.body.facebook;
    }

    if (req.body.linkedin) {
      userProfileFields.social.linkedin = req.body.linkedin;
    }

    User.findOne({ account: req.user.id }).then(user => {
      if (user) {
        User.findOne({ handle: userProfileFields.handle })
          .then(user => {
            if (user) {
              errors.handle =
                'The chosen handle is already taken, please choose another handle';
              res.status(400).json(errors);
            } else {
              //update user profile
              User.findOneAndUpdate(
                { account: req.user.id },
                { $set: userProfileFields },
                { new: true }
              ).then(user => res.json(user));
            }
          })
          .catch(err => res.status(400).json(err));
      } else {
        //create new user profile

        //check if handle exists
        User.findOne({ handle: userProfileFields.handle }).then(user => {
          if (user) {
            errors.handle =
              'The chosen handle is already taken, please choose another handle';
            res.status(400).json(errors);
          }

          //save new user profile
          new User(userProfileFields).save().then(user => res.json(user));
        });
      }
    });
  }
);

// @route  POST api/user/experience
// @desc   add experience to current user
// @access Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ account: req.user.id }).then(user => {
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      //add experience
      user.experience.unshift(newExperience);
      user.save().then(user => res.json(user));
    });
  }
);

// @route  POST api/user/education
// @desc   add education to current user
// @access Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ account: req.user.id }).then(user => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      //add education
      user.education.unshift(newEducation);
      user.save().then(user => res.json(user));
    });
  }
);

// @route  DELETE api/user/experience/:exp_id
// @desc   delete experience of current user's profile
// @access Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ account: req.user.id })
      .then(user => {
        //get index to be removed
        const removeIndex = user.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //splice out of array
        user.experience.splice(removeIndex, 1);

        //save
        user.save().then(user => res.json(user));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  DELETE api/user/education/:education_id
// @desc   delete education of current user's profile
// @access Private
router.delete(
  '/education/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ account: req.user.id })
      .then(user => {
        //get index to be removed
        const removeIndex = user.education
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //splice out of array
        user.education.splice(removeIndex, 1);

        //save
        user.save().then(user => res.json(user));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
