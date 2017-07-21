const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exApp = express();

// CONFIGURATION / CONNECT TO MONGO DB
const config = require('./db/config.js'); config.setConfigs();
mongoose.connect(process.env.MONGODB_URI);

// CONTROLLERS / LIBRARIES
exApp.use('/app', express.static(__dirname + '/app'));
exApp.use(bodyParser.json());
const flutController = require('./db/flut_ctrl.js');
const userController = require('./db/user_ctrl.js');

// ROUTING
exApp.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

exApp.post('/entry', function(req, res){
  userController.readUserByName(req.body.username, function(err, userDoc) {
    if (err) { 
      res.json({success: false, msg: 'Server error encountered'});    
      console.error(err);
    } else if (!userDoc) {
      res.json({success: false, msg: 'Wrong Username or Password'});    
    } else {
      if (req.body.password === userDoc.password) {
        res.json({success: true, user: userDoc});
      } else {
        res.json({success: false, msg: 'Password is Incorrect'});
      }
    }
  });
});

exApp.get('/flut/all', function(req, res){
  flutController.getFluts(function(err, flutDocs){
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});
      console.error(err);
    } else if (!flutDocs) {
      res.json({success: false, msg: 'No fluts found'});
    } else {
      res.json({success: true, fluts: flutDocs});
    }
  });
});

exApp.get('/flut/id/:id', function(req, res){
  flutController.getFlutById(req.params.id, function(err, flutDoc){
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});
      console.error(err);
    } else if (!flutDoc) {
      res.json({success: false, msg: 'No flut found with ID: ' + req.params.id});
    } else {
      res.json({success: true, flut: flutDoc});
    }
  });
});

exApp.get('/flut/user/:username', function(req, res){
  flutController.getFlutsByUsername(req.params.username, function(err, flutDocs){
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});
      console.error(err);
    } else if (!flutDocs) {
      res.json({success: false, msg: 'No fluts found'});
    } else {
      res.json({success: true, fluts: flutDocs});
    }
  });
});

exApp.post('/flut/add', function(req, res){
  flutController.createFlut(req.body, function(err, flutDoc){
    if (err) { console.error(err); }
    else { res.json({success: true, flut: flutDoc}); }
  });
});


exApp.get('/profile', function(req, res){}); // DEPRICATED
exApp.get('/profile/:username', function(req, res){
  userController.readUserByName(req.params.username, function(err, userDoc){
    if (err) { console.error(err); }
    else if (!userDoc) { res.json({success: false, msg: 'No User Found'}); }
    else { res.json({success: true, user: userDoc}); }
  });
});

exApp.post('/addUser', function(req, res){
  userController.createUser(req.body, function(err, userDoc){
    if (err) { console.error(err); }
    else { res.json({success: true, user: userDoc}); } // TODO: persist user thru
  });
});

// RUN IT
const PORT_NO = process.env.PORT_NO || 3000;
exApp.listen(PORT_NO, () => { console.log('LISTENING ON ', PORT_NO); });

