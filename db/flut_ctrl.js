// FLUT MONGO DB SCHEMA AND CONTROLLER
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlutSchema = new Schema({
  username: String,
  user: { type: Schema.ObjectId, ref: 'User' },
  text: String,
  postDate: { type: Date, default: Date.now },
  likes: {
    count: {type: Number, default: 0, min: 0},
    users: [{type: Schema.ObjectId, ref: 'User'}]
  }
});

const Flut = mongoose.model('Flut', FlutSchema);

// CREATE FLUT
module.exports.createFlut = function(flutData, callback){
//  let schemaData = {};
  let flut = new Flut(flutData);
  flut.save(callback);
};

// READ FLUTS
module.exports.getFluts = function(callback){
  Flut.find({}).sort({'postDate': -1}).exec(callback);
};

