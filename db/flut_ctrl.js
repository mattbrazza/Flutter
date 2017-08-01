/* FLUT - MONGO DB SCHEMA and CONTROLLER */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlutSchema = new Schema({
  username: { type: String, lowercase: true },
  text: String,
  _user: { type: Schema.ObjectId, ref: 'User' },
  _likes: [{type: Schema.ObjectId, ref: 'User'}],
  postDate: { type: Date, default: Date.now }
}, { runSettersOnQuery: true });

const Flut = mongoose.model('Flut', FlutSchema);

/**************************************************
***************************************************/

/* CREATE FLUT -- createFlut */
module.exports.createFlut = function(flutData, callback){
  let flut = new Flut(flutData);
  flut.save(callback);
};

/* READ FLUTS -- getFluts, getFlutsByUsername, getFlutById */
module.exports.getFluts = function(callback){
  Flut.find({})
    .populate('_user', 'username profPicUrl')
    .populate('_likes', 'username profPicUrl')
    .sort({'postDate': -1})
    .exec(callback);
};

module.exports.getFlutsByUsername = function(username, callback){
  Flut.find({})
    .where('username').equals(username)
    .populate('_user', 'username profPicUrl')
    .populate('_likes', 'username profPicUrl')
    .sort({'postDate': -1})
    .exec(callback);
};

module.exports.getFlutById = function(id, callback) {
  Flut.find({})
    .where('_id').equals(id)
    .populate('_user', 'username profPicUrl')
    .populate('_likes', 'username profPicUrl')
    .exec(callback);
};

/* UPDATE FLUT -- likeFlut */
module.exports.likeFlut = function(request, callback){
  let query = { _id: request.flut_id };
  let updateSet = { 'likes._users': request.user_id };

  // TODO: Check for already liked, and PASS
  Flut.findOneAndUpdate(query,{$push: updateSet},{new: true})
    .populate('_user', 'username profPicUrl')
    .populate('_likes', 'username profPicUrl')
    .exec(callback);
};

/* DELETE FLUT */

