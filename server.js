/* REQUIREMENTS */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exApp = express();

/* CONFIGURATION / CONNECT TO MONGO DB */
const config = require('./db/config.js'); config.setConfigs();
mongoose.connect(process.env.MONGODB_URI);

/* CONTROLLERS / LIBRARIES */
exApp.use('/app', express.static(__dirname + '/app'));
exApp.use(bodyParser.json());
const flutController = require('./db/flut_ctrl.js');
const userController = require('./db/user_ctrl.js');

/* ROUTING -- /user/*, /flut/*, etc. */
exApp.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

exApp.post('/login', function(req, res){
  let loginRequest = req.body;
  userController.readUserByName(loginRequest, function(err, userDoc) {
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});    
      console.error(err);
    } else if (!userDoc) { res.json({success: false, msg: 'Wrong Username or Password'});    
    } else { res.json({success: true, user: userDoc}); }
  });
});

exApp.post('/user/add', function(req, res){
  let userRequest = req.body;
  userController.createUser(userRequest, function(err, userDoc){
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});
      console.error(err);
    } else if (!userDoc) { res.json({success: false, msg: 'User not added'});
    } else { res.json({success: true, user: userDoc}); }
  });
});

exApp.get('/user/:username', function(req, res){
  userController.readUserByName(req.params.username, function(err, userDoc){
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});
      console.error(err);
    } else if (!userDoc) { res.json({success: false, msg: 'No User Found'});
    } else { res.json({success: true, user: userDoc}); }
  });
});
exApp.get('/user', function(req, res){}); // DEPRICATED

exApp.post('/user/update', function(req, res){
  let userRequest = req.body;
  userController.updateUser(userRequest, function(err, userDoc){
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});
      console.error(err);
    } else if (!userDoc) { res.json({success: false, msg: 'Updating doc issue'});
    } else { res.json({success: true, user: userDoc}); }
  });
});

exApp.post('/user/follow', function(req, res){
  let followRequest = req.body;
  userController.followUser(followRequest, function(err, userDoc){
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});
      console.error(err);
    } else if (!userDoc) { res.json({success: false, msg: 'Following user issue'});
    } else { res.json({success: true, user: userDoc}); }
  });
});
exApp.post('/user/unfollow', function(req, res){});




exApp.post('/flut/add', function(req, res){
  let flutRequest = req.body;
  flutController.createFlut(flutRequest, function(err, flutDoc){
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});
      console.error(err);
    } else if (!flutDoc) { res.json({success: false, msg: 'Issue creating Flut'});
    } else { res.json({success: true, flut: flutDoc}); }
  });
});

exApp.get('/flut/all', function(req, res){
  flutController.getFluts(function(err, flutDocs){
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});
      console.error(err);
    } else if (!flutDocs) { res.json({success: false, msg: 'No fluts found'});
    } else { res.json({success: true, fluts: flutDocs}); }
  });
});

exApp.get('/flut/user/:username', function(req, res){
  flutController.getFlutsByUsername(req.params.username, function(err, flutDocs){
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});
      console.error(err);
    } else if (!flutDocs) { res.json({success: false, msg: 'No fluts found'});
    } else { res.json({success: true, fluts: flutDocs}); }
  });
});

exApp.get('/flut/id/:id', function(req, res){
  flutController.getFlutById(req.params.id, function(err, flutDoc){
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});
      console.error(err);
    } else if (!flutDoc) { res.json({success: false, msg: 'No flut found with ID: ' + req.params.id});
    } else { res.json({success: true, flut: flutDoc}); }
  });
});

exApp.post('/flut/like', function(req, res){
  let flutRequest = req.body;
  flutController.likeFlut(flutRequest, function(err, flutDoc){
    if (err) {
      res.json({success: false, msg: 'Server error encountered'});
      console.error(err);
    } else if (!flutDoc) { res.json({success: false, msg: 'Flut not liked'});
    } else { res.json({success: true, flut: flutDoc}); }
  });
});

/* RUN IT */
const PORT_NO = process.env.PORT_NO || 3000;
exApp.listen(PORT_NO, () => { console.log('LISTENING ON ', PORT_NO); });

