const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load Job model
const Job = require('../../models/Job');

// validation job posting
const validateJobInput = require('../../validation/job');

//  @route  GET api/jobs/test
//  @desc   testing jobs route
//  @access Public
router.get('/test', (req, res) =>
  res.json({ message: 'api/jobs test success' })
);

//  @route  GET api/jobs
//  @desc   get all jobs
//  @access Public
router.get('/', (req, res) => {
  const errors = {};
  Job.find()
    .sort({ date: -1 })
    .then(jobs => res.json(jobs))
    .catch(err => {
      errors.jobs = 'No job posts found';
      res.status(404).json(errors);
    });
});

//  @route  GET api/jobs/:job_id
//  @desc   get jobs by id
//  @access Public
router.get('/:job_id', (req, res) => {
  const errors = {};
  Job.findById(req.params.job_id)
    .then(job => res.json(job))
    .catch(err => {
      errors.job = 'No job post found by that ID';
      res.status(404).json(errors);
    });
});

//  @route  POST api/jobs
//  @desc   create job post
//  @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const type = 'company';
    if (req.user.type !== type) {
      const errors = {};
      errors.type = 'Your account type is not company';
      return res.status(400).json(errors);
    }

    const { errors, isValid } = validateJobInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const jobFields = {};
    jobFields.company = req.user.id;

    jobFields.title = req.body.title;
    jobFields.jobdesc = req.body.jobdesc;
    jobFields.location = req.body.location;

    jobFields.requirements = {};
    jobFields.requirements.education = req.body.education;
    jobFields.requirements.experience = req.body.experience;

    if (typeof req.body.skills !== 'undefined') {
      jobFields.requirements.skills = req.body.skills.split(',');
    }

    jobFields.salary = {};
    jobFields.salary.min = req.body.min;
    jobFields.salary.max = req.body.max;

    new Job(jobFields).save().then(job => res.json(job));
  }
);

//  @route  DELETE api/jobs/:job_id
//  @desc   delete job post
//  @access Private
router.delete(
  '/:job_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ account: req.user.id }).then(user => {
      Job.findById(req.params.job_id)
        .then(job => {
          //check for job post owner
          const errors = {};
          if (job.company.toString() !== req.user.id) {
            errors.authorization = 'User (as company) is not authorized';
            return res.status(401).json(errors);
          }

          //delete
          job
            .remove()
            .then(() => {
              const message = {};
              message.delete = 'Job post is deleted successfully';
              res.json(message);
            })
            .catch(err => {
              const errors = {};
              errors.job = 'No job post found';
              res.status(404).json(errors);
            });
        })
        .catch(err => {
          const errors = {};
          errors.job = 'No job post found by that ID, may be already deleted';
          res.status(404).json(errors);
        });
    });
  }
);

module.exports = router;
