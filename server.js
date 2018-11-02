const express = require('express');
const mongoose = require('mongoose');

const companies = require('./routes/api/companies');
const records = require('./routes/api/records');
const staff = require('./routes/api/staff');

const app = express();

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

app.get('/', (req, res) => {
  res.send('test');
});

// use routes
app.use('/api/companies', companies);
app.use('/api/records', records);
app.use('/api/staff', staff);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port: ${port}`));
