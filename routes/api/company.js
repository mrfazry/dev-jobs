const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load validation
const validateCompanyProfileInput = require('../../validation/company');

// load Company model
const Company = require('../../models/Company');
// load Account model
const Account = require('../../models/Account');

// @route  GET api/company
// @desc   get current company data/profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    const type = 'company';
    if (req.user.type !== type) {
      errors[type] = `This account is not ${type}`;
      return res.status(400).json(errors);
    }

    Company.findOne({ account: req.user.id })
      .populate('account', ['type'])
      .then(company => {
        if (!company) {
          errors.company = 'No profile found for this company';
          return res.status(404).json(errors);
        }

        res.json(company);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  GET api/company/all
// @desc   get all companies profiles
// @access Public
router.get('/all', (req, res) => {
  const errors = {};
  Company.find()
    .populate('account', ['type'])
    .then(companies => {
      if (!companies) {
        errors.company = 'No profiles found';
        return res.status(404).json(errors);
      }

      res.json(companies);
    })
    .catch(err => {
      errors.company = 'No profiles found';
      res.status(404).json(errors);
    });
});

// @route  GET api/company/handle/:handle
// @desc   get company profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Company.findOne({ handle: req.params.handle })
    .populate('account', ['type'])
    .then(company => {
      if (!company) {
        errors.company = 'There is no profile for this company';
        res.status(404).json(errors);
      }

      res.json(company);
    })
    .catch(err => res.status(404).json(err));
});

// @route  GET api/company/company_id/:company_id
// @desc   get user by company_id/:company_id
// @access Public
router.get('/company_id/:company_id', (req, res) => {
  const errors = {};
  Company.findById(req.params.company_id)
    .populate('account', ['type'])
    .then(company => {
      if (!company) {
        errors.company = 'There is no profile for this company';
        res.status(404).json(errors);
      }

      res.json(company);
    })
    .catch(err => {
      errors.company = 'There is no profile for this company';
      res.status(404).json(errors);
    });
});

// @route  POST api/company
// @desc   create and update current company data/profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //check account type
    const type = 'company';
    if (req.user.type !== type) {
      let errors = {};
      errors[type] = `This account is not ${type}`;
      return res.status(400).json(errors);
    }

    const { errors, isValid } = validateCompanyProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //get fields
    const companyProfileFields = {};
    companyProfileFields.account = req.user.id;

    if (req.body.handle) {
      companyProfileFields.handle = req.body.handle;
    }

    if (req.body.name) {
      companyProfileFields.name = req.body.name;
    }

    if (req.body.description) {
      companyProfileFields.description = req.body.description;
    }

    if (req.body.industry) {
      companyProfileFields.industry = req.body.industry;
    }

    if (req.body.location) {
      companyProfileFields.location = req.body.location;
    }

    if (req.body.founded) {
      companyProfileFields.founded = req.body.founded;
    }

    //contacts
    companyProfileFields.contacts = {};
    if (req.body.telephone) {
      companyProfileFields.contacts.telephone = req.body.telephone;
    }

    if (req.body.email) {
      companyProfileFields.contacts.email = req.body.email;
    }

    if (req.body.website) {
      companyProfileFields.contacts.website = req.body.website;
    }

    Company.findOne({ account: req.user.id }).then(company => {
      if (company) {
        Company.findOne({ handle: companyProfileFields.handle }).then(
          company => {
            if (company) {
              errors.handle =
                'The chosen handle is already taken, please choose another handle';
              res.status(400).json(errors);
            } else {
              //update company profile
              Company.findOneAndUpdate(
                { account: req.user.id },
                { $set: companyProfileFields },
                { new: true }
              ).then(company => res.json(company));
            }
          }
        );
      } else {
        //create new company profile

        //check if handle already exists
        Company.findOne({ handle: companyProfileFields.handle }).then(
          company => {
            if (company) {
              errors.handle =
                'The chosen handle is already taken, please choose another handle';
              return res.status(400).json(errors);
            }

            //save new company profile
            new Company(companyProfileFields)
              .save()
              .then(company => res.json(company));
          }
        );
      }
    });
  }
);

module.exports = router;
