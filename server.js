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

// ROUTING
exApp.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

exApp.post('/entry', function(req, res){
  console.log('IN SERVER-POST: ', req.body);
  let result = {'success': false};
  if (req.body.username === 'user1') {
    if (req.body.password === 'pass') {
        result = {'success': true};
    } else {}
  } else {}
  res.json(result);
});

exApp.get('/timeline', function(req, res){
  flutController.getFluts(function(err, docs){
    if (err) { console.error(err); } else { res.json(docs); }
  });
});


// RUN IT
const PORT_NO = process.env.PORT_NO || 3000;
exApp.listen(PORT_NO, () => { console.log('LISTENING ON ', PORT_NO); });
