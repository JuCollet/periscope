'use strict';

const express = require('express'),
      path = require('path'),
      app = express();
      
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.listen(process.env.PORT || 8080, function(){
  console.log('Server running');
});