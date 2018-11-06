const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// load register validation
const validateRegisterInput = require('../../validation/register');

// load login validation
const validateLoginInput = require('../../validation/login');

// load Account model
const Account = require('../../models/Account');

//  routes for company
//  routes for company
//  routes for company
//  routes for company

//  @route  GET api/accounts/company/test
//  @desc   testing accounts/company route
//  @access Public
router.get('company/test', (req, res) =>
  res.json({ message: 'api/accounts/company/test success' })
);

//  @route  POST api/accounts/company/register
//  @desc   register new company
//  @access Public
router.post('/company/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //if input is not valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Account.findOne({ email: req.body.email }).then(account => {
    if (account) {
      errors.email = 'Email is already registered';
      return res.status(400).json(errors);
    } else {
      const newAccount = new Account({
        email: req.body.email,
        password: req.body.password,
        type: 'company',
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAccount.password, salt, (err, hash) => {
          if (err) throw err;
          newAccount.password = hash;
          newAccount
            .save()
            .then(account => res.json(account))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//  @route  POST api/accounts/company/login
//  @desc   login company
//  @access Public
router.post('/company/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //if input is invalid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const type = 'company';

  //find account by email and type
  Account.findOne({ email, type }).then(account => {
    //check whether email is registered or not
    if (!account) {
      errors.email = 'Email is not registered yet';
      return res.status(404).json(errors);
    }

    //check email - password pair
    bcrypt.compare(password, account.password).then(isMatch => {
      if (isMatch) {
        //create jwt payload
        const payload = { id: account.id, type: account.type };

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: `Bearer ${token}` });
          }
        );
      } else {
        errors.password = 'Password is incorrect';
        res.status(400).json(errors);
      }
    });
  });
});

//  @route  GET api/accounts/company/current
//  @desc   return current companies
//  @access Private
router.get(
  '/company/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.type !== 'company') {
      res.status(400).json({ type: 'Your account is not company' });
    } else {
      res.json({
        id: req.user.id,
        email: req.user.email,
        date: req.user.date,
      });
    }
  }
);

//  routes for user
//  routes for user
//  routes for user
//  routes for user

//  @route  GET api/accounts/user/test
//  @desc   testing accounts/user route
//  @access Public
router.get('/user/test', (req, res) =>
  res.json({ message: 'api/users test success' })
);

//  @route  POST api/accounts/user/register
//  @desc   register new user/jobseeker
//  @access Public
router.post('/user/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //if input is invalid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Account.findOne({ email: req.body.email }).then(account => {
    errors.email = 'Email is already registered';
    if (account) {
      return res.status(400).json(errors);
    } else {
      const newAccount = new Account({
        email: req.body.email,
        password: req.body.password,
        type: 'user',
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAccount.password, salt, (err, hash) => {
          if (err) throw err;
          newAccount.password = hash;
          newAccount
            .save()
            .then(account => res.json(account))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//  @route  POST api/accounts/user/login
//  @desc   login user/jobseeker
//  @access Public
router.post('/user/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //if input is invalid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const type = 'user';

  //find account by email and type
  Account.findOne({ email, type }).then(account => {
    //check whether email registered or not
    if (!account) {
      errors.email = 'Email is not registered yet';

      return res.status(404).json(errors);
    }

    //check email - password pair
    bcrypt.compare(password, account.password).then(isMatch => {
      if (isMatch) {
        //create jwt payload
        const payload = { id: account.id, type: account.type };

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`,
            });
          }
        );
      } else {
        errors.password = 'Password is incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

//  @route  GET api/accounts/user/current
//  @desc   return current user
//  @access Private
router.get(
  '/user/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.type !== 'user') {
      res.status(400).json({ type: 'Your account is not user/jobseeker' });
    } else {
      res.json({
        id: req.user.id,
        email: req.user.email,
        date: req.user.date,
      });
    }
  }
);

module.exports = router;
