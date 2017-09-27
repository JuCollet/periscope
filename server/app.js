'use strict';

const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      albumRouter = require('./routes/albums'),
      uploadRouter = require('./routes/upload'),
      photosRouter = require('./routes/photos'),
      userRouter = require('./routes/users'),
      app = express();

require('./db');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Automatically redirect to http request to https
// this method is specific for Heroku and found here :
// https://stackoverflow.com/questions/32952085/express-js-redirect-to-https-and-send-index-html
app.all('/*', function(req,res,next){
  if(req.headers["x-forwarded-proto"] === "https"){
    return next();
  }
  res.redirect('https://'+req.hostname+req.url);  
});

app.use('/api/albums', albumRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/photos', photosRouter);
app.use('/api/users', userRouter);

app.use(express.static(path.join(__dirname, '/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});


app.use(function(err,req,res,next){
  res.status(err.status || 500);
  res.json({
    error : {
      message : err.message
    }
  });
});

app.listen(process.env.PORT || 8080, function(){
  console.log('Server running');
});