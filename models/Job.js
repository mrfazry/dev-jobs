const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const JobSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'companies',
  },
  title: {
    type: String,
    required: true,
  },
  jobdesc: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  requirements: {
    education: {
      type: String,
    },
    skills: {
      type: [String],
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
  },
  salary: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
    },
  },
});

module.exports = Job = mongoose.model('jobs', JobSchema);
