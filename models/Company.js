const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const CompanySchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'accounts',
  },

  handle: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  industry: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  founded: {
    type: Date,
  },

  contacts: {
    telephone: {
      type: Number,
    },

    email: {
      type: String,
    },

    website: {
      type: String,
    },
  },
});

module.exports = Company = mongoose.model('companies', CompanySchema);
