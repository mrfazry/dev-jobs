const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Account = mongoose.model('accounts', AccountSchema);
