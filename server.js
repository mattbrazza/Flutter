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
  userController.readUserByName(req.body.username, function(err, user) {
    if (err) { console.error(err); }
    else if (!user) { res.json({success: false, msg: 'No User Found'}); }
    else {
      if (req.body.password === user.password) {
        let userData = user; //{ id: user._id, username: user.username };
        res.json({success: true, user: userData});
      } else { res.json({success: false, msg: 'Password is Incorrect'}); }
    }
  });
});

exApp.get('/timeline', function(req, res){
  flutController.getFluts(function(err, docs){
    if (err) { console.error(err); } else { res.json(docs); }
  });
});

exApp.post('/flut/add', function(req, res){
  console.log('FLUT-ADD: ', req.body);
  flutController.createFlut(req.body, function(err, flut){
    if (err) { console.error(err); }
    else { res.json(flut); }
  });
});

exApp.get('/profile', function(req, res){
  console.log('IN SERVER-PROF: ', req.body);
//  let userId = '596a6352b3c9b44fb452873b';
//  userController.readUserById(userId, function(err, user){
//    if (err) { console.error(err); }
//    else { res.json(user); }
//  });
});

exApp.get('/profile/:username', function(req, res){
console.log('IN SPUN: ', req.body);
//  console.log('IN SERVER-PROF-(', req.param.username, '): ', req.body);
  userController.readUserByName(req.params.username, function(err, user){
    if (err) { console.error(err); }
    else if (!user) { console.error('>>>>NO USER FOUND!!'); }
    else { 
console.log('RETURNING: ', user);
res.json(user); }
  });
});

exApp.post('/addUser', function(req, res){
  console.log('IN SERVER-ADDU: ', req.body);
  let result = {'success': false};
  userController.createUser(req.body, function(err, user){
    if (err) { console.error(err); }
    else {
//      console.log(user);
      // TODO: persist user during session (Storage vs Cookie ?)
      result = {'success': true};
      res.json(result);
    }
  });
});

// RUN IT
const PORT_NO = process.env.PORT_NO || 3000;
exApp.listen(PORT_NO, () => { console.log('LISTENING ON ', PORT_NO); });

