// FLUT MONGO DB SCHEMA AND CONTROLLER
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlutSchema = new Schema({
  username: String,
  text: String,
  _user: { type: Schema.ObjectId, ref: 'User' },
  likes: {
    count: {type: Number, default: 0, min: 0},
    _users: [{type: Schema.ObjectId, ref: 'User'}]
  },
  postDate: { type: Date, default: Date.now }
});

const Flut = mongoose.model('Flut', FlutSchema);

/* CREATE FLUT */
module.exports.createFlut = function(flutData, callback){
//  let schemaData = {};
  let flut = new Flut(flutData);
  flut.save(callback);
};

/* READ FLUTS */
module.exports.getFluts = function(callback){
  Flut.find({})
    .populate('_user', 'username profPicUrl')
//    .populate('likes._users', 'username')
    .sort({'postDate': -1}).exec(callback);
};

module.exports.getFlutsByUsername = function(username, callback){
  Flut.find({})
    .where('username').equals(username)
    .populate('_user', 'username profPicUrl')
//    .populate('likes._users', 'username')
    .sort({'postDate': -1})
    .exec(callback);
};

module.exports.getFlutById = function(id, callback) {
  Flut.find({})
    .where('_id').equals(id)
    .populate('_user', 'username profPicUrl')
//    .populate('likes._users', 'username')
    .exec(callback);
}

