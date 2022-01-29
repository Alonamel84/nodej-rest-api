const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const createError = require('http-errors');
const multer = require('./multer/multer');
const path = require('path');
const fs = require('fs').promises;

const app = express();
app.use(express.json());
// cors
app.use(cors());
require('./config/config-passport');
const routerApiContacts = require('./routes/api/contacts');
const routerApiUser = require('./routes/api/users');
app.use(express.static('public'));

//===========================================//

app.use('/api/contacts', routerApiContacts);
app.use('/api/users', routerApiUser);

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});
const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST_REMOTE;
mongoose.Promise = global.Promise;
const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
