const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const accounts = require('./routes/api/accounts');
const company = require('./routes/api/company');
const jobs = require('./routes/api/jobs');
const user = require('./routes/api/user');

const app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB is connected successfully'))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// use routes
app.use('/api/accounts', accounts);
app.use('/api/company', company);
app.use('/api/jobs', jobs);
app.use('/api/user', user);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port: ${port}`));
