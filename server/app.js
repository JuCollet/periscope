'use strict';

const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      albumRouter = require('./routes/albums'),
      app = express();

require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/../dist')));

app.use('/albums', albumRouter);

app.listen(process.env.PORT || 8080, function(){
  console.log('Server running');
});